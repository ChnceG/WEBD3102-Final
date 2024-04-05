import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

interface Transaction {
    id: number;
    type: string;
    amount: number;
    date: string;
}

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    useEffect(() => {
        // Fetch both expenses and income from backend API
        Promise.all([
            axios.get(`/api/expenses/user/${userId}`),
            axios.get(`/api/income/user/${userId}`)
        ])
        .then(([expensesResponse, incomeResponse]) => {
            const expenses = expensesResponse.data.map((expense: Transaction) => ({
                ...expense,
                type: 'expense'
            }));
            const income = incomeResponse.data.map((income: Transaction) => ({
                ...income,
                type: 'income'
            }));
            const allTransactions = [...expenses, ...income];

            // Sort transactions by date in descending order
            allTransactions.sort((a, b) => { 
                const dateA = new Date(b.date); 
                const dateB = new Date(a.date);
                return dateB.getTime() - dateA.getTime();
            });

            // Get the last 10 transactions
            const recentTransactions = allTransactions.slice(0, 10);

            setTransactions(recentTransactions);
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
        });
    }, [userId]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="bg-white text-lg font-bold mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
                <p className="w-[350px] bg-white">No recent transactions</p>
            ) : (
                <ul className="w-[350px]">
                    {transactions.map(transaction => (
                        <li key={transaction.id} className="bg-white p-1">
                            <div className="shadow-md p-1 rounded">
                                <p className="mt-1">
                                    {transaction.type === 'expense' ? `-$${transaction.amount}` : `+$${transaction.amount}`}
                                </p>
                                <p className="mb-1">{formatDate(transaction.date)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}