export function renderTransactions(transactions) {
    const tbody = document.getElementById('transactionBody');
    
    // Clear existing content safely
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (!transactions || transactions.length === 0) {
        renderEmptyState();
        return;
    }

    const fragment = document.createDocumentFragment();

    transactions.forEach(transaction => {
        const row = document.createElement('tr');

        // Date
        const dateCell = document.createElement('td');
        const dateObj = new Date(transaction.date);
        dateCell.textContent = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        row.appendChild(dateCell);

        // Amount
        const amountCell = document.createElement('td');
        amountCell.textContent = `₹ ${parseFloat(transaction.amount).toLocaleString('en-IN')}`;
        amountCell.style.fontWeight = "500";
        row.appendChild(amountCell);

        // Status
        const statusCell = document.createElement('td');
        const statusSpan = document.createElement('span');
        statusSpan.textContent = transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1);
        statusSpan.className = `status-pill status-${transaction.status}`;
        statusCell.appendChild(statusSpan);
        row.appendChild(statusCell);

        // Type
        const typeCell = document.createElement('td');
        const typeLabel = transaction.type === 'debit' ? 'Expense' : 
                          transaction.type === 'credit' ? 'Income' : transaction.type;
        typeCell.textContent = typeLabel;
        row.appendChild(typeCell);

        fragment.appendChild(row);
    });

    tbody.appendChild(fragment);
}

export function renderEmptyState() {
    const tbody = document.getElementById('transactionBody');
    // Clear explicitly just in case called directly
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4; // Span all 4 columns (Date, Amount, Status, Type)
    cell.textContent = "No transactions found matching your criteria.";
    cell.style.textAlign = "center";
    cell.style.padding = "20px";
    cell.style.color = "#666";

    row.appendChild(cell);
    tbody.appendChild(row);
}

export function renderPagination(currentPage, totalPages) {
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${Math.max(1, totalPages)}`;
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
    }
}

export function showLoading() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    if (loading) loading.classList.remove('hidden');
    if (error) error.classList.add('hidden');
}

export function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
}

export function showError(message) {
    const error = document.getElementById('error');
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
    
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}

export function hideError() {
    const error = document.getElementById('error');
    if (error) error.classList.add('hidden');
}
