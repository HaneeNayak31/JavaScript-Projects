import { state, saveTransactions, loadTransactions } from './state.js';
import { fetchTransactions } from './api.js';
import { renderTransactions, renderPagination, renderEmptyState, showLoading, hideLoading, showError } from './ui.js';
import { setupEventListeners } from './events.js';

// Initialization
async function init() {
    setupEventListeners();
    
    // Load stored data
    const storedTransactions = loadTransactions();
    
    if (storedTransactions && storedTransactions.length > 0) {
        console.log("Loaded transactions from LocalStorage");
        state.transactions = storedTransactions;
        updateDashboard();
    } else {
        console.log("Fetching mock transactions...");
        showLoading(); // UI: Show Spinner
        
        try {
            const transactions = await fetchTransactions();
            
            // Handle API response
            state.transactions = transactions;
            saveTransactions(transactions);
            updateDashboard();

        } catch (err) {
            console.error("Init Error:", err);
            showError("Failed to load transactions. Please try again later.");
        } finally {
            hideLoading(); // UI: Hide Spinner
        }
    }
}

export function updateDashboard() {
    let result = [...state.transactions];

    // Filter Logic
    if (state.filters.status !== 'all') {
        result = result.filter(transaction => transaction.status === state.filters.status);
    }
    
    // Search Logic
    if (state.filters.searchTerm) {
        const term = state.filters.searchTerm.toLowerCase();
        result = result.filter(transaction => 
            String(transaction.id).toLowerCase().includes(term)
        );
    }

    // Sort Logic
    const sortBy = state.filters.sortBy || 'date-desc';
    
    result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);

        switch (sortBy) {
            case 'date-desc': return dateB - dateA;
            case 'date-asc': return dateA - dateB;
            case 'amount-desc': return amountB - amountA;
            case 'amount-asc': return amountA - amountB;
            default: return 0;
        }
    });

    // Pagination Logic
    const totalTransactions = result.length;
    const pageSize = state.pagination.pageSize;
    const totalPages = Math.ceil(totalTransactions / pageSize);

    // Validate current page
    if (state.pagination.page > totalPages && totalPages > 0) {
        state.pagination.page = totalPages;
    } else if (state.pagination.page < 1) {
        state.pagination.page = 1;
    }

    // Calculate Slice
    const startIndex = (state.pagination.page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTransactions = result.slice(startIndex, endIndex);

    // Render
    renderTransactions(paginatedTransactions);
    renderPagination(state.pagination.page, totalPages);
}

export function addTransaction(transaction) {
    // Add to state
    state.transactions.unshift(transaction);
    
    // Persist
    saveTransactions(state.transactions);

    updateDashboard();
}

// Start App
init();
