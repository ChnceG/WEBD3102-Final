import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { AuthContext } from '../context/AuthProvider';

interface Transaction {
    id: number;
    type: string;
    amount: number;
    date: string;
}

export default function TransactionChart() {
    const [, setTotalIncome] = useState(0);
    const [, setTotalExpenses] = useState(0);
    const [currentMonth, setCurrentMonth] = useState('');
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    useEffect(() => {
        const currentDate = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonthName = monthNames[currentDate.getMonth()];
        setCurrentMonth(currentMonthName);

        // Fetch both expenses and income from backend API for the current month
        Promise.all([
            axios.get(`/api/expenses/user/${userId}?month=${currentDate.getMonth() + 1}`),
            axios.get(`/api/income/user/${userId}?month=${currentDate.getMonth() + 1}`)
        ])
        .then(([expensesResponse, incomeResponse]) => {
            const totalIncome = incomeResponse.data.reduce((acc: number, income: Transaction) => acc + income.amount, 0);
            const totalExpenses = expensesResponse.data.reduce((acc: number, expense: Transaction) => acc + expense.amount, 0);
            setTotalIncome(totalIncome);
            setTotalExpenses(totalExpenses);
            
            // Call function to draw chart
            drawChart(totalIncome, totalExpenses);
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
        });
    }, [userId]);

    const drawChart = (totalIncome: number, totalExpenses: number) => {
        const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Money In', 'Money Out'],
                datasets: [{
                    label: 'Money In vs Money Out',
                    data: [totalIncome, totalExpenses],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', 
                aspectRatio: 12, 
                scales: {
                    x: {
                        beginAtZero: true
                    }
                },
            }
        });
    };

    return (
        <div className="bg-white rounded shadow-md mx-[315px] mt-4 p-8">
            <h2 className="bg-white text-lg font-bold mb-4">Transactions for the month of {currentMonth}</h2>
            <canvas id="transactionChart"></canvas>
        </div>
    );
}