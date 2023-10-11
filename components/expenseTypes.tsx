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

export const ExpenseTypeView = (wallet_id: any) => {
    const [ExpenseTypes,SetExpensesTypes]=useState([]);

    async function readExpenseTypes() {
        await  read('expense_type')
        .then((result) => {
            SetExpensesTypes(result);
        });
    
    }
    
    readExpenseTypes()

    
    return ( 
        <View>
            <ScrollView>
                {ExpenseTypes.map((item: any, index)=>{
                return (
                    <TouchableOpacity key={index} onPress={()=> {
                        
                    }}>
                        <Type type={item}  id={wallet_id}/>
                    </TouchableOpacity>
                )
                })}
            </ScrollView>
        </View>
    )
}

const Type = (data: any) => {

    const type = data.type

    console.log(type);
    

    return (
        <View>
            <Text>{type.name}</Text>
        </View>
    );
}