import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

interface Account {
    accountId: string;
    name: string;
    balance: number;
}

export default function AccountsCard() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    useEffect(() => {
        if (userId) {
            axios.get(`/api/users/${userId}/accounts`)
                .then(response => {
                    console.log(response.data);
                    setAccounts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user accounts:', error);
                });
        }
    }, [userId]);

    return (
        <div>
            <h2 className='text-center text-lg'>Your Accounts</h2>
            <div>
                <ul className='flex gap-4 justify-center'>
                    {accounts.map(account => (
                        <li key={account.accountId} className='bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4'>
                            <div className="bg-white w-[565px] font-bold text-xl text-center mb-2">{account.accountId}. {account.name}</div>
                            <div className="bg-white text-gray-700 text-center">Balance: ${account.balance}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}