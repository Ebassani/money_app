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

import { read, deleteExpenses, getExpenseType, getWalletName, changeExpenseAmount } from '../database/database';

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
    }

    const [modalAmount, setModalAmount] = useState(0);

    const handleInputChange = (value:any) => {
        const parsedValue = parseFloat(value) || 0;
        setModalAmount(parsedValue);
    };

    const [modalState, setModalState] = useState(false);
    
    return ( 
        <View>

        <TouchableOpacity onPress={() => {
            setModalState(!modalState);
        }}><Text>View Expenses</Text></TouchableOpacity>
            
        <Modal
        visible={modalState}
        >
            <Text>Expenses:</Text>
            <ScrollView>
                {Expenses.map((item: any, index)=>{
                return (
                    <TouchableOpacity key={index} onPress={()=> {
                        handleClick(item);
                        setShowModal(!showModal);
                        handleInputChange(item.amount);
                    }}>
                        <PriceExpense expense={item} />
                    </TouchableOpacity>
                )
                })}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalState(!modalState)}>
                <Text>Close</Text>
            </TouchableOpacity>
                </Modal>
            <Modal visible={showModal}>
                <View>
                    <TextInput 
                        onChangeText={handleInputChange}
                        value={modalAmount.toString()}
                        keyboardType="numeric"
                        />
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                            deleteExpenses((SelectedExpense as any)?.id);
                            readExpenses();
                            setShowModal(!showModal);
                        }}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeExpenseAmount((SelectedExpense as any)?.id, modalAmount)
                        setShowModal(!showModal)}
                    }>
                        <Text>Update</Text>
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
        <View style={[styles.expense, styles.row]}>
            <View>
                <Text>{Type}</Text>
                <Text>{Wallet}</Text>
            </View>
            <View style={styles.money}>
                <Text style={styles.red}>- {expense.amount} €</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    expense: {
        flex: 0,
        justifyContent: 'space-between',
        alignContent: 'center',
        margin: 3
    },
    row: {
        flexDirection:'row'
    },
    red: {
        color: 'red'
    },
    money: {
        flex: 0,
        justifyContent: 'center',
    }
});
