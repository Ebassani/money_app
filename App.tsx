/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren, ReactNode} from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
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
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Float, Int32} from 'react-native/Libraries/Types/CodegenTypes';
import {
  addAdditive,
  addExpenses,
  init,
  read,
  getMoney,
  addWallet,
  updateWallet,
  deleteWallet,
  addExpenseType,
  addAdditiveType,
} from './database/database';
import {ViewExpenses} from './components/expenses';
import {ViewAdditives} from './components/additives';
import { ViewAdditiveTypes } from './components/additiveType';
import { ViewExpenseTypes } from './components/expenseType';
init();

const App: () => ReactNode = () => {
  const [AddMode, SwapAddMode] = useState(false);
  const [EditMode, SwapEditMode] = useState(false);
  const [FormOutput, GetForm] = useState();
  const [ListItem, SetItem] = useState([]);
  const [CashTotal, SetTCash] = useState();
  const [WalletName, SetName] = useState('');
  const [WalletAmount, SetAmount] = useState(0);
  const [CurrID, SetCurID] = useState(0);
  
  const Formhandler = (forminput: any) => {
    GetForm(forminput);
    //console.log(forminput)
  };
  const Namelock = (name: string) => {
    SetName(name);
  };
  const Amountlock = (amount: string) => {
    SetAmount(+amount);
  };
  async function ReadAllWallets() {
    await read('wallets').then(result => {
      SetItem(result);
      //console.log(result);
    });
  }
  ReadAllWallets();
  async function Cashdisplay() {
    await getMoney().then(result => {
      SetTCash(result);
    });
  }
  Cashdisplay();
  async function Insertwallet() {
    addWallet(WalletName, WalletAmount, 'WalletIcon');
  }
  async function EditAWallet(
    id: number,
    name: Text,
    amount: number,
  ) {
    updateWallet(id, name, amount, 'WalletIcon');
  }
  const ModalON = () => {
    SwapAddMode(true);
  };
  const ModalOFF = () => {
    SwapAddMode(false);
    SwapEditMode(false);
  };
  const EnableEdit = () => {
    SwapEditMode(true);
  };

  async function EditPrepare(
    id: number,
    name: string,
    amount: number,
  ) {
    SetName(name);
    SetAmount(Number);
    SetCurID(id);
    SwapEditMode(true);
  }

  async function Stash() {
    updateWallet(CurrID, WalletName, WalletAmount);
  }

  async function DeletePrep(id: number) {
    SetCurID(id);
    deleteWallet(CurrID);
  }
  
  return (
    <View style={styles.mainpage}>
      <View style={styles.head}>
        <View>
          <Text style={styles.heading}> Current amount : </Text>
        </View>
        <View>
          <Text style={styles.cash}>{CashTotal} € </Text>
        </View>
        <View style={styles.button} >
          <View style={styles.addbut}>
          <Button title="Add wallet" onPress={ModalON}></Button></View>
          <View style={styles.addbut}><ViewExpenses /></View>
          <View style={styles.addbut}><ViewAdditives /></View>
        </View>
      </View>
      <View style={styles.pagebody}>
        <Modal visible={AddMode} animationType="slide">
          <View style={styles.fields}>
            <TextInput placeholder="name" onChangeText={Namelock} />
            <TextInput placeholder="amount" onChangeText={Amountlock} />
            <Button title="Add wallet" onPress={Insertwallet}></Button>
            <Button title="Cancel" onPress={ModalOFF}></Button>
          </View>
        </Modal>

        <Modal visible={EditMode} animationType="slide">
          <View style={styles.fields}>
            <TextInput
              placeholder="name"
              onChangeText={Namelock}
              value={WalletName}
            />
            <TextInput
              placeholder="amount"
              onChangeText={Amountlock}
              value={WalletAmount.toString()}
            />
            <Button title="confirm edit" onPress={Stash}></Button>
            <Button title="Cancel" onPress={ModalOFF}></Button>
          </View>
        </Modal>


        <View style={styles.walletlist}>
          <ScrollView
            style={styles.scrolllist}
            contentContainerStyle={styles.walletlist}>
            {ListItem.map((item: any, index) => {
              return (
                <View style={styles.walletwhole} key={index}>
                  <TouchableOpacity
                      onLongPress={() => DeletePrep(item.id)}
                      onPress={() =>
                        EditPrepare(item.id, item.name, item.amount)
                      }>
                        <Text style={styles.walletitem}>
                          {item.name} {item.amount}{' '}
                        </Text>
                  
                    </TouchableOpacity><View style={styles.button}>
                    <View style={styles.addbut}><ViewAdditiveTypes walletId={item.id} /></View>
                    <View style={styles.addbut}><ViewExpenseTypes  walletId={item.id} /></View>
                    </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: '100%',
  },
  head: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    padding: 0,
    borderBottomWidth: 5,
    borderColor: 'blue',
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    color: 'blue',
  },
  cash: {
    fontSize: 30,
    color: 'green',
    padding: 10 ,
  },
  pagebody: {
    flex: 2,
    position: 'absolute',
    top: 200,
    width: '80%'
  },

  walletwhole :{
    borderWidth :3,
    borderBottomColor : 'rgb(24,24,24)',
    width: '100%',
  },
  walletlist: {
    flex: 1,
    alignItems: 'center',

  },
  scrolllist: {
    flexGrow: 1,
    width:'100%'
  },
  walletitem: {
    fontSize: 25,
    color: 'black',
 width: '100%',
 textAlign:'center',
 padding:5,

  },
  walletbuttons :{
    height:50,
  },
  fields: {
    width: '100%',
  },
button: {
 fontSize: 20 ,
 shadowColor: 'black',
  flexDirection: "row" ,
    marginLeft: 20, 
    justifyContent: 'space-evenly',
    padding : 5 ,

},
  buttontext: {
    alignSelf: 'center',
    color:'black',
    shadowColor:'gray',
    fontSize:20,
  },
  addbut : {
    margin: 10,
   
  },
});

export default App;
