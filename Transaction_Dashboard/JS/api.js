export async function fetchTransactions() {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulate network failure
        if (Math.random() < 0.1) {
            throw new Error("Network Error: Failed to connect to server");
        }

        const mockData = JSON.stringify([
            { id: 1, amount: 1200.50, type: 'credit', status: 'success', date: '2023-12-01' },
            { id: 2, amount: 85.00, type: 'debit', status: 'pending', date: '2023-12-02' },
            { id: 3, amount: 50.00, type: 'debit', status: 'failed', date: '2023-12-03' },
            { id: 4, amount: 3200.00, type: 'credit', status: 'success', date: '2023-12-04' },
            { id: 5, amount: 12.99, type: 'debit', status: 'success', date: '2023-12-05' },
            { id: 6, amount: 150.00, type: 'debit', status: 'pending', date: '2023-12-06' },
            { id: 7, amount: 900.00, type: 'credit', status: 'failed', date: '2023-12-07' },
            { id: 8, amount: 45.00, type: 'debit', status: 'success', date: '2023-12-08' }
        ]);

        // Parse JSON
        const transactions = JSON.parse(mockData);

        // Check for empty response
        if (!transactions || transactions.length === 0) {
            console.warn("API returned empty transactions list");
            return [];
        }

        return transactions;

    } catch (error) {
        // Error Handling Logic
        console.error("Fetch Transactions Failed:", error.message);
        // Return empty array to prevent app crash
        return [];
    }
}
