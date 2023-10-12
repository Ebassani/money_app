import React, {useState} from 'react';

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

import {
  read,
  deleteExpenses,
  getExpenseType,
  getWalletName,
  changeExpenseAmount,
} from '../database/database';

export const ViewExpenses = () => {
  const [Expenses, SetExpenses] = useState([]);

  async function readExpenses() {
    await read('expenses').then(result => {
      SetExpenses(result);
    });
  }

  readExpenses();

  const [SelectedExpense, SetSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (expense: any) => {
    SetSelectedExpense(expense);
  };

  const [modalAmount, setModalAmount] = useState(0);

  const handleInputChange = (value: any) => {
    const parsedValue = parseFloat(value) || 0;
    setModalAmount(parsedValue);
  };

  const [modalState, setModalState] = useState(false);

  return (
    <View>
      <Button title="View Expenses" onPress={() => setModalState(!modalState)}></Button>

      <Modal visible={modalState}>
        <View style={styles.back}>
            <Text style={styles.back_text}>Expenses:</Text>
        </View>
        <ScrollView>
          {Expenses.map((item: any, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(item);
                  setShowModal(!showModal);
                  handleInputChange(item.amount);
                }}>
                <PriceExpense expense={item} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => setModalState(!modalState)}>
            <Text style={styles.back_text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
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
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                    deleteExpenses((SelectedExpense as any)?.id);
                    readExpenses();
                    setShowModal(!showModal);
                    }}>
                    <Text style={styles.button_text}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                    changeExpenseAmount((SelectedExpense as any)?.id, modalAmount);
                    setShowModal(!showModal);
                    }}>
                    <Text style={styles.button_text}>Update</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => setShowModal(!showModal)}>
                    <Text style={styles.button_text}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const PriceExpense = (data: any) => {
  const [Type, SetType] = useState('');
  const [Wallet, SetWallet] = useState('');

  const expense = data.expense;

  async function readValues() {
    await getExpenseType(expense.expense_type_id).then(type => {
      SetType(type);
    });
    await getWalletName(expense.wallet_id).then(wallet => SetWallet(wallet));
  }

  readValues();

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
};

const styles = StyleSheet.create({
  expense: {
    flex: 0,
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: 3,
  },
  row: {
    flexDirection: 'row',
  },
  red: {
    color: 'red',
  },
  money: {
    flex: 0,
    justifyContent: 'center',
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(24,24,24)',
    padding: 2
  },
  back_text: {
    color: 'white',
  },
  input: {
    color: 'red',
    fontSize: 30,
    borderWidth: 2,
    borderColor: 'rgb(24,24,24)',
    margin: 3,
    padding:3,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});
