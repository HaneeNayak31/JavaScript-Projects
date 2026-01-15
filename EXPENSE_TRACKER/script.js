document.addEventListener("DOMContentLoaded", () => {
  let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  let totalAmount = calculateTotal();
  // Update the display immediately
  updateTotal();

  renderExpenses();
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();
      //clear input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      
      // Safe rendering to prevent XSS
      li.textContent = `${expense.name} - $${expense.amount.toFixed(2)}`;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("data-id", expense.id);
      li.appendChild(deleteBtn);

      expenseList.appendChild(li);
    });
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
  //to save expenses in localstorage
  function saveExpensesTolocal() {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } catch (error) {
      console.warn("Could not save expenses to localStorage:", error);
    }
  }
  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensesTolocal();
      renderExpenses();
      updateTotal();
    }
  });
});
