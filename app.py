from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

expenses = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_expense', methods=['POST'])
def add_expense():
    amount = float(request.form['amount'])
    category = request.form['category']
    expense = {'amount': amount, 'category': category}
    expenses.append(expense)
    return jsonify(success=True)

@app.route('/total_expenses')
def total_expenses():
    total = sum(expense['amount'] for expense in expenses)
    return jsonify(total=total)

@app.route('/expenses_by_category')
def expenses_by_category():
    expenses_by_category = {}
    for expense in expenses:
        category = expense['category']
        amount = expense['amount']
        if category in expenses_by_category:
            expenses_by_category[category] += amount
        else:
            expenses_by_category[category] = amount
    return jsonify(expenses_by_category)

if __name__ == '__main__':
    app.run(debug=True)
