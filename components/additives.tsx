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
  getWalletName,
  deleteAdditive,
  changeAdditiveAmount,
  getAdditiveType,
} from '../database/database';

export const ViewAdditives = () => {
  const [Additives, SetAdditives] = useState([]);

  async function readAdditive() {
    await read('additives').then(result => {
      SetAdditives(result);
    });
  }

  readAdditive();

  const [SelectedAdditive, SetSelectedAdditive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (expense: any) => {
    SetSelectedAdditive(expense);
  };

  const [modalAmount, setModalAmount] = useState(0);

  const handleInputChange = (value: any) => {
    const parsedValue = parseFloat(value) || 0;
    setModalAmount(parsedValue);
  };

  const [modalState, setModalState] = useState(false);

  return (
    <View>
      <Button title="View Gains" onPress={() => setModalState(!modalState)}></Button>

      <Modal visible={modalState}>
        <View style={styles.back}>
          <Text style={styles.back_text}>Gains:</Text>
        </View>
        <ScrollView>
          {Additives.map((item: any, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleClick(item);
                  setShowModal(!showModal);
                  handleInputChange(item.amount);
                }}>
                <PriceAdditive additive={item} />
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
        <TextInput
        onChangeText={handleInputChange}
        value={modalAmount.toString()}
        keyboardType="numeric"
        style={styles.input}
        textAlign={'center'}
        />
        <View style={styles.wrapper}>
          <View>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                deleteAdditive((SelectedAdditive as any)?.id);
                readAdditive();
                setShowModal(!showModal);
                }}>
                <Text style={styles.button_text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                changeAdditiveAmount((SelectedAdditive as any)?.id, modalAmount);
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

const PriceAdditive = (data: any) => {
  const [Type, SetType] = useState('');
  const [Wallet, SetWallet] = useState('');

  const additive = data.additive;

  async function readValues() {
    await getAdditiveType(additive.add_type_id).then(type => {
      SetType(type);
    });
    await getWalletName(additive.wallet_id).then(wallet => SetWallet(wallet));
  }

  readValues();

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
  green: {
    color: 'green',
  },
  money: {
    flex: 0,
    justifyContent: 'center',
  },
  back: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(24,24,24)',
    padding: 2,
  },
  back_text: {
    color: 'white',
  },
  input: {
    color: 'green',
    fontSize: 30,
    borderWidth: 2,
    borderColor: 'rgb(24,24,24)',
    margin: 3,
    padding: 3,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(24,24,24)',
    padding: 2,
    margin: 5,
    width: 100,
  },
  button_text: {
    color: 'white',
    fontSize: 20,
  },
});
