
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Simulate fetching initial data
    const mockData = [
      { id: 1, amount: 200, desc: 'Groceries' },
      { id: 2, amount: 500, desc: 'Rent' },
    ];
    setExpenses(mockData);
  }, []);

  const addExpense = useCallback(() => {
    if (!amount || !desc) return;
    const newExpense = {
      id: expenses.length + 1,
      amount: parseFloat(amount),
      desc,
    };
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDesc('');
    inputRef.current.focus();
  }, [amount, desc, expenses]);

  const total = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Expense Tracker</h2>
      <input
        ref={inputRef}
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /><br />
      <input
        placeholder="Description"
 value={desc}
        onChange={(e) => setDesc(e.target.value)}
      /><br />
      <button onClick={addExpense}>Add Expense</button>

      <h3>Total: ₹{total}</h3>
      <ul>
        {expenses.map((item) => (
          <li key={item.id}>{item.desc} - ₹{item.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
