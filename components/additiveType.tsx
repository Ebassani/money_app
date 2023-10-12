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

import { read, getAmountAdditiveType, addAdditive } from '../database/database';

export const ViewAdditiveTypes = (walletId: any) => {
    const [Types,SetTypes]=useState([]);

    async function readTypes() {
        await  read('add_type')
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
    
    return ( 
        <View><TouchableOpacity onPress={() => {
            setModalState(!modalState);
            }}><Text>Add</Text></TouchableOpacity>
            
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
                            <AdditiveTypes type={item} />
                        </TouchableOpacity>
                    )
                    })}
                </ScrollView>

                <TouchableOpacity onPress={() => setModalState(!modalState)}>
                    <Text>Close</Text>
                </TouchableOpacity>

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
                            addAdditive(walletId.walletId,(SelectedType as any)?.id, modalAmount, getCurrentDate())
                            setShowModal(!showModal)}
                        }>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </Modal>
        </View>
    )
}

const AdditiveTypes = (data: any) => {
    const [TotalAmount,SetTotalAmount]=useState(0);

    const type = data.type;
    

    async function readValues() {
        await getAmountAdditiveType(type.id).then(amount => { 
            SetTotalAmount(amount);
        });
    }
    
    readValues()

    return (
        <View style={[styles.expense, styles.row]}>
            <Text>{type.name}</Text>
            <Text>{TotalAmount}</Text>
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


function getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }