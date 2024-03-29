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

import { read, addExpenses, getAmountExpenseType } from '../database/database';

export const ViewExpenseTypes = (walletId: any) => {
    const [Types,SetTypes]=useState([]);

    async function readTypes() {
        await  read('expense_type')
        .then((result) => {
            SetTypes(result);
        });
    
    }
    
    readTypes()

    const [SelectedType, SetSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (type: any) => {
        SetSelectedType(type);
    }

    const [modalAmount, setModalAmount] = useState(0);

    const handleInputChange = (value:any) => {
        const parsedValue = parseFloat(value) || 0;
        setModalAmount(parsedValue);
    };

    const [modalState, setModalState] = useState(false);

    const anyArray: any = [];
    const [TotalAmount,SetTotalAmount] = useState(anyArray);

    async function readValues(type: any) {
        await getAmountExpenseType(type.id).then(amount => { 
            SetTotalAmount((TotalAmount: any)=>[...TotalAmount, amount]);
        });
    }
    
    
    const updateValues=()=> {
        Types.forEach(element => {
            readValues(element);
        });
    }

    updateValues();
    
    return ( 
        <View><TouchableOpacity onPress={() => {
            setModalState(!modalState);
            }}><Text>Spend</Text></TouchableOpacity>
            
        <Modal
        visible={modalState}
        >
        <View>
            <ScrollView>
                {Types.map((item: any, index)=>{
                return (
                    <TouchableOpacity key={index} onPress={()=> {
                        handleClick(item);
                        setShowModal(!showModal);
                        handleInputChange(0);
                    }}>
                        <ExpenseTypes type={item} amount={TotalAmount[index]} />
                    </TouchableOpacity>
                )
                })}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => setModalState(!modalState)}>
                <Text style={styles.button_text}>Close</Text>
            </TouchableOpacity>

            <Modal visible={showModal}>
                <View>
                    <TextInput 
                        onChangeText={handleInputChange}
                        value={modalAmount.toString()}
                        keyboardType="numeric"
                        style={styles.input}
                        textAlign={'center'}
                        />
                    <View style={styles.wrapper}>
                        <TouchableOpacity style={styles.button} onPress={() => setShowModal(!showModal)}>
                            <Text style={styles.button_text}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            addExpenses(walletId.walletId,(SelectedType as any)?.id, modalAmount, getCurrentDate())
                            setShowModal(!showModal)}
                        }>
                            <Text style={styles.button_text}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        </Modal>
        </View>
    )
}

const ExpenseTypes = (data: any) => {
    const type = data.type;
    const amount = data.amount;

    return (
        <View style={[styles.expense, styles.row]}>
            <Text>{type.name}</Text>
            <Text style={styles.red}>- {amount} €</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    expense: {
        flex: 0,
        justifyContent: 'space-between',
        alignContent: 'center',
        margin: 3,
        borderWidth:3,
        borderColor: 'rgb(24,24,24)',
        padding: 5
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
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(24,24,24)',
        padding: 2,
        margin: 5,
        width: 100
    },
      button_text: {
        color: 'white',
        fontSize:20
    },
    input: {
        color: 'red',
        fontSize: 30,
        borderWidth: 2,
        borderColor: 'rgb(24,24,24)',
        margin: 3,
        padding: 3,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});


function getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }