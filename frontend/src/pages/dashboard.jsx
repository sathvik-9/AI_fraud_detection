import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';

function Dashboard(){

  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await api.get("http://localhost:5000/api/transactions");
    setTransactions(res.data);
  }

  const fetchStats = async () => {
    const res = await api.get("http://localhost:5000/api/transactions/stats");
    console.log("Stats response:", res.data);
    setStats(res.data);
  }

  const handleLogout = () =>{
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div className="p-9 bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center gap-10">
      <div>
        <h1 className="text-3xl font-bold text-center">AI Fraud Detection Dashboard</h1>
        <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {stats && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <p>Total Transactions: {stats.total_transactions}</p>
          <p>Fraudulent Transactions: {stats.fraud_transactions}</p>
          <p>Fraud percentage: {stats.fraud_percentage}%</p>
        </div>
      )}

      <h2 className="text-xl font-semibold">Recent Transactions</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        {transactions.map(tx => (
          <div key={tx._id} className="border-b py-2">
            <p>Transaction ID: {tx._id}</p>
            <p>Amount: ${tx.transactionData.amount}</p>
            <p>Status: {tx.is_fraud ? "Fraudulent" : "Legitimate"}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard;