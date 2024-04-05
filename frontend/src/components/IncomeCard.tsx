import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

interface Income {
    incomeId: string;
    amount: number;
    date: string;
    description: string;
    category: {
        categoryId: number;
        name: string;
    };
}

export default function IncomeCard() {
    const [income, setIncome] = useState<Income[]>([]);
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    useEffect(() => {
        if(userId) {
            axios.get(`/api/income/user/${userId}`)
                .then(response => {
                    setIncome(response.data);
                })
                .catch(error => {
                    console.error('Error fetching income:', error);
                });
            }
        }, [userId]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="bg-white text-lg font-bold mb-4">Recent Income</h2>
            {income.length === 0 ? (
                <p className="bg-white w-[350px]">No recent income</p>
            ) : (
                <ul className="w-[350px]">
                    {income.map(income => (
                        <li key={income.incomeId} className="bg-white p-1">
                            <div className="p-2 rounded">
                                <p className="mt-1">+${income.amount}</p>
                                <p>{formatDate(income.date)}</p>
                                <p className="mb-1">{income.category.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}