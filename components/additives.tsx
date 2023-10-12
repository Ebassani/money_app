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

import { read, getWalletName, deleteAdditive, changeAdditiveAmount, getAdditiveType } from '../database/database';

export const ViewAdditives = () => {
    const [Additives,SetAdditives]=useState([]);

    async function readAdditive() {
        await  read('additives')
        .then((result) => {
            SetAdditives(result);
        });
    }
    
    readAdditive()

    const [SelectedAdditive, SetSelectedAdditive] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (expense: any) => {
        SetSelectedAdditive(expense);
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
        }}><Text>View Gains</Text></TouchableOpacity>
            
        <Modal
        visible={modalState}
        >
            <Text>Gains:</Text>
            <ScrollView>
                {Additives.map((item: any, index)=>{
                return (
                    <TouchableOpacity key={index} onPress={()=> {
                        handleClick(item);
                        setShowModal(!showModal);
                        handleInputChange(item.amount);
                    }}>
                        <PriceAdditive additive={item} />
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
                            deleteAdditive((SelectedAdditive as any)?.id);
                            readAdditive();
                            setShowModal(!showModal);
                        }}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        changeAdditiveAmount((SelectedAdditive as any)?.id, modalAmount)
                        setShowModal(!showModal)}
                    }>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const PriceAdditive = (data: any) => {
    const [Type,SetType]=useState('');
    const [Wallet,SetWallet]=useState('');

    const additive = data.additive

    async function readValues() {
        await getAdditiveType(additive.add_type_id).then(type => { 
            SetType(type);
        });
        await getWalletName(additive.wallet_id).then(wallet => SetWallet(wallet));
    }
    
    readValues()

    return (
        <View style={[styles.expense, styles.row]}>
            <View>
                <Text>{Type}</Text>
                <Text>{Wallet}</Text>
            </View>
            <View style={styles.money}>
                <Text style={styles.green}>+ {additive.amount} €</Text>
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
    green: {
        color: 'green'
    },
    money: {
        flex: 0,
        justifyContent: 'center',
    }
});