import { state } from './state.js';
import { updateDashboard } from './main.js';
import { debounce } from './utils.js';

export function setupEventListeners() {
    // Search Filter (Debounced)
    const searchFilter = document.getElementById('searchFilter');
    if (searchFilter) {
        searchFilter.addEventListener('input', debounce((e) => {
            state.filters.searchTerm = e.target.value.trim();
            state.pagination.page = 1; 
            updateDashboard();
        }, 300));
    }

    // Filter by Status
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            state.filters.status = e.target.value;
            // Reset to page 1 on filter change
            state.pagination.page = 1; 
            updateDashboard();
        });
    }

    // Sort by Field
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            state.filters.sortBy = e.target.value;
            updateDashboard();
        });
    }

    // Pagination Controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.pagination.page > 1) {
                state.pagination.page--;
                updateDashboard();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
             state.pagination.page++;
             updateDashboard();
        });
    }
    
    // Form Submit
    const form = document.getElementById('transactionForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amountInput = document.getElementById('amount');
            const typeInput = document.getElementById('type');
            const statusInput = document.getElementById('status');
            const dateInput = document.getElementById('date');

            const amount = parseFloat(amountInput.value);
            const type = typeInput.value;
            const status = statusInput.value;
            const dateVal = dateInput.value; // YYYY-MM-DD

            // Basic Validation
            if (!amount || amount <= 0) {
                alert("Please enter a valid amount greater than 0.");
                return;
            }

            const newTransaction = {
                id: Date.now(), // Simple ID generation
                amount: amount,
                type: type,
                status: status,
                date: dateVal ? new Date(dateVal).toISOString() : new Date().toISOString()
            };

            import('./main.js').then(module => {
                module.addTransaction(newTransaction);
            });

            // Reset Form
            form.reset();
        });
    }
}
