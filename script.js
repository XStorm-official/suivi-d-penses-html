document.addEventListener('DOMContentLoaded', () => {
    updateTotalExpenses();
    updateExpensesByCategory();
  });
  
  function addExpense() {
    var amountInput = document.getElementById("expense-amount");
    var categoryInput = document.getElementById("expense-category");
  
    var amount = amountInput.value;
    var category = categoryInput.value;
  
    if (amount !== "" && category !== "") {
      fetch('/add_expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'amount': amount,
          'category': category
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          amountInput.value = "";
          categoryInput.value = "";
          updateTotalExpenses();
          updateExpensesByCategory();
        }
      });
    }
  }
  
  function updateTotalExpenses() {
    fetch('/total_expenses')
      .then(response => response.json())
      .then(data => {
        var totalExpensesElement = document.getElementById("total-expenses");
        totalExpensesElement.textContent = "Total des dépenses : " + data.total;
      });
  }
  
  function updateExpensesByCategory() {
    fetch('/expenses_by_category')
      .then(response => response.json())
      .then(data => {
        var expensesByCategoryElement = document.getElementById("category-list");
        expensesByCategoryElement.innerHTML = "";
        for (var category in data.expenses_by_category) {
          var listItem = document.createElement("li");
          listItem.textContent = category + ": " + data.expenses_by_category[category];
          expensesByCategoryElement.appendChild(listItem);
        }
      });
  }
  