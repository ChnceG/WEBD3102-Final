import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import InfoBox from './Infobox';

interface Account {
    accountId: number;
    name: string;
}

export default function AddTransfer() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [sourceAccount, setSourceAccount] = useState('');
    const [destinationAccount, setDestinationAccount] = useState('');
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;
    const navigate = useNavigate();

    useEffect(() => {
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

        axios.post(`/api/users/${userId}/transfers`, {
            sourceAccountId: parseInt(sourceAccount),
            destinationAccountId: parseInt(destinationAccount),
            amount: parseFloat(amount),
            description: description
        })
            .then(() => {
                console.log('Transfer added successfully');
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error adding transfer:', error);
            });
    };

    return (
        <InfoBox className="w-[600px] mx-auto p-2 bg-white">
            <div className="flex flex-col">
                <h2 className="text-lg font-bold bg-white text-center">Add Transfer</h2>
                <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-2">
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">From Account:</label>
                        <select value={sourceAccount} onChange={(e) => setSourceAccount(e.target.value)} className="rounded">
                            <option value="">Select source account</option>
                            {accounts.map(account => (
                                <option key={account.accountId} value={account.accountId}>{account.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">To Account:</label>
                        <select value={destinationAccount} onChange={(e) => setDestinationAccount(e.target.value)} className="rounded">
                            <option value="">Select destination account</option>
                            {accounts.map(account => (
                                <option key={account.accountId} value={account.accountId}>{account.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='$000.00' className="rounded"/>
                    </div>
                    <div className="bg-white text-center">
                        <label className="bg-white mr-1">Description:</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className="rounded"/>
                    </div>
                    <div className="flex flex-col items-center bg-white">
                        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Transfer</button>
                    </div>
                </form>
            </div>
        </InfoBox>
    );
}