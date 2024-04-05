import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import InfoBox from './Infobox';

interface Category {
    categoryId: number;
    name: string;
}

interface Account {
    accountId: number;
    name: string;
}

export default function AddExpense() {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch categories and accounts from backend
        axios.get('/api/categories')
            .then(response => {
                console.log('Response data:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        axios.get(`/api/users/${userId}/accounts`)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, [userId]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Selected category:', selectedCategory);
        console.log('Selected account:', selectedAccount);
        console.log('Categories:', categories);
        console.log('Accounts:', accounts);

        const selectedCategoryObj = categories.find(category => category.categoryId === parseInt(selectedCategory));
        const selectedAccountObj = accounts.find(account => account.accountId === parseInt(selectedAccount));

        if (!selectedCategoryObj || !selectedAccountObj) {
            console.error('Selected category or account not found');
            return;
        }

        const expenseData = {
            amount: parseFloat(amount),
            date,
            description,
            category: selectedCategoryObj,
            account: selectedAccountObj
        };

        // Send POST request to backend to add expense
        axios.post(`/api/expenses?accountId=${expenseData.account.accountId}`, expenseData)
            .then(() => {
                console.log('Expense added successfully');
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error adding expense:', error);
            });
    };

    return (
        <InfoBox className="w-[600px] mx-auto p-2 bg-white">
            <div className="flex flex-col">
                <h2 className="text-lg font-bold bg-white text-center">Add Expense</h2>
                <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-2">
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='$000.00' className="rounded"/>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='rounded'/>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Description:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className="rounded"/>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Category:</label>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="rounded">
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Account:</label>
                        <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="rounded">
                            <option value="">Select account</option>
                            {accounts.map(account => (
                                <option key={account.accountId} value={account.accountId}>{account.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col items-center bg-white">
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Expense</button>
                    </div>
                </form>
            </div>
        </InfoBox>
    );
}