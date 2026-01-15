export const state = {
    transactions: [],
    filters: {
        status: "all",
        sortBy: "date",
        searchTerm: ""
    },
    pagination: {
        page: 1,
        pageSize: 5
    }
};

export function saveTransactions(transactions) {
    try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}

export function loadTransactions() {
    try {
        const stored = localStorage.getItem('transactions');
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error("Failed to load from localStorage:", error);
        return null;
    }
}
