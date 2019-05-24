import React from 'react';
import ExpenseListContainer from './components/containers/ExpenseListContainer';
import AddExpense from './components/forms/AddExpense'

function App() {
  return (
    <div>
      <AddExpense />
      <ExpenseListContainer />
    </div>
  );
}

export default App;
