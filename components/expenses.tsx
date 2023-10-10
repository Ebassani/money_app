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

import { read, deleteExpenses, changeExpenseWallet, getExpenseType } from '../database/database';

export const ViewExpenses = () => {
    const [Expenses,SetExpenses]=useState([]);

    async function readExpenses () {
        await  read('expenses')
        .then((result) => {
            SetExpenses(result);
        });
    
        Expenses.forEach((element: any) => {
            getExpenseType(element.expense_type_id).then(result=> {console.log(result);})
        });
    }

    readExpenses()
    

    //console.log(Expenses);
    return <Text>Hello, Hello component</Text>
}


