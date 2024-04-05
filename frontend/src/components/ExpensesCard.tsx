import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

interface Expense {
    expenseId: string;
    amount: number;
    date: string;
    description: string;
    category: {
        categoryId: number;
        name: string;
    };
}

export default function ExpensesCard() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    useEffect(() => {
        if(userId) {
            axios.get(`/api/expenses/user/${userId}`)
                .then(response => {
                    setExpenses(response.data);
                })
                .catch(error => {
                    console.error('Error fetching expenses:', error);
                });
            }
        }, [userId]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="bg-white text-lg font-bold mb-4">Recent Expenses</h2>
            {expenses.length === 0 ? (
                <p className="bg-white w-[350px]">No recent expenses</p>
            ) : (
                <ul className="w-[350px]">
                    {expenses.map(expense => (
                        <li key={expense.expenseId} className="bg-white p-2">
                            <div className="mb-shadow p-1 rounded">
                                <p className="mt-1">-${expense.amount}</p>
                                <p>{formatDate(expense.date)}</p>
                                <p className="mb-1">{expense.category.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}