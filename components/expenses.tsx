import React, { useState } from 'react';

import {
    Button,
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
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

    const [SelectedExpense, SetSelectedExpense] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (expense: any) => {
        SetSelectedExpense(expense);
        console.log(expense);
        
    }
    
    return ( 
        <View>
            <ScrollView>
                {Expenses.map((item: any, index)=>{
                return (
                    <TouchableOpacity key={index} onPress={()=> {
                        handleClick(item);
                        setShowModal(!showModal);
                    }}>
                        <PriceExpense expense={item} />
                    </TouchableOpacity>
                )
                })}
            </ScrollView>

            <Modal visible={showModal}>
                <View>
                    <Text>{(SelectedExpense as any)?.amount}</Text>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const PriceExpense = (data: any) => {
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
        <View>
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
