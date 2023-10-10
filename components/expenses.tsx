import React, { useState } from 'react';

import {
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
  } from 'react-native';

import { read, deleteExpenses, changeExpenseWallet, getExpenseType, getWalletName } from '../database/database';

export const ViewExpenses = () => {
    const [Expenses,SetExpenses]=useState([]);

    async function readExpenses() {
        await  read('expenses')
        .then((result) => {
            SetExpenses(result);
        });
    
    }
    
    readExpenses()
    
    return ( 
        <View>
            <ScrollView>
                {Expenses.map((item, index)=>{
                return <PriceExpense expense={item} key={index} />
                })}
            </ScrollView>
        </View>
    )
}

const PriceExpense = (data: any, key: any) => {
    const [Type,SetType]=useState('');
    const [Wallet,SetWallet]=useState('');

    const expense = data.expense

    async function readValues() {
        await getExpenseType(expense.expense_type_id).then(type => { 
            SetType(type);
        });
        await getWalletName(expense.wallet_id).then(wallet => SetWallet(wallet));
    }
    
    readValues()

    return (
        <View key={key}>
            <View>
                <Text>{Type}</Text>
                <Text>{Wallet}</Text>
            </View>
            <View>
                <Text>{expense.amount}</Text>
            </View>
        </View>
    );
}
