/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren, ReactNode } from 'react';
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
import { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { addAdditive, addExpenses, init, read, getMoney,addWallet, updateWallet, deleteWallet} from './database/database';
import { ViewExpenses } from './components/expenses'
import { ViewAdditives } from './components/additives';
init();
const App: () => ReactNode = () => {
  const [AddMode,SwapAddMode]=useState(false);
  const [EditMode,SwapEditMode]=useState(false);
  const [FormOutput,GetForm]=useState();
  const [ListItem,SetItem]=useState([]);
  const [CashTotal,SetTCash]=useState();
  const [WalletName,SetName]=useState('');
  const [WalletAmount,SetAmount]=useState(0);
  const [WalletIcon,SetIcon]=useState('');
  const [CurrID,SetCurID]=useState(0);
//  const [ListItem,AddItem]=useState([{"amount": 0, "icon": "icon1.png", "id": 1, "name": "Example Wallet"}])
 const Formhandler =(forminput:any)=>{
  GetForm(forminput)
  //console.log(forminput)
 } 
 const Namelock = (name:string) => {
 SetName(name) ;
 }
 const Amountlock = (amount:string) => {
  SetAmount(+amount);
 }
 const IconLock = (icon:string) => {
 SetIcon(icon) 
 }
async function ReadAllWallets () {
   await  read("wallets")
   .then((result) => {
       SetItem(result);
      //console.log(result);
   });
  }
  ReadAllWallets();
  async function Cashdisplay() {
    await getMoney()
    .then((result) => {
      SetTCash(result);
    });
  }
 Cashdisplay();
  async function Insertwallet() {
    addWallet(WalletName,WalletAmount,WalletIcon);
 }
 async function EditAWallet(id:number,name:Text,amount:number,icon:Text) {
 updateWallet(id,name,amount,icon)
 }
  const ModalON =()=>
  {
  SwapAddMode(true);
  } 
  const ModalOFF=()=>
 {
  SwapAddMode(false);
  SwapEditMode(false);
 }
 const EnableEdit =()=> {
 SwapEditMode(true); 
 }
 
 async function EditPrepare(id:number,name:string,amount:number,icon:string) {
  SetName(name);
  SetAmount(Number);
  SetIcon(icon);
  SetCurID(id);
  SwapEditMode(true);
 }

 async function Stash() {
  updateWallet(CurrID,WalletName,WalletAmount,WalletIcon)
  
 }

 async function DeletePrep(id:number) {
  SetCurID(id);
  deleteWallet(CurrID);
 }
 //addWallet("New Wallet", 30, 'icon2.png');
 //console.log(ListItem);
  return (
    <View style={styles.mainpage}>
      <View style={styles.head}>
        <View>
        <Text style={styles.heading}> Current cash : </Text>
        </View>
        <View>
      <Text style={styles.cash}>{CashTotal} $  </Text>
      </View>
      <View>
        <Button title='New wallet' onPress={ModalON}></Button>
        </View>
      </View>
      <View style={styles.pagebody}>
        <Modal visible={AddMode}  animationType='slide'>
          <View style={styles.fields}>
          <TextInput placeholder='name' onChangeText={Namelock}/>
          <TextInput placeholder='amount'onChangeText={Amountlock}/>
          <TextInput placeholder='icon' onChangeText={IconLock} /> 
          <Button title='add wallet' onPress={Insertwallet}></Button>
          <Button title='Cancel' onPress={ModalOFF}></Button>
          </View>
        </Modal>

        <Modal visible={EditMode} animationType='slide'>
          <View style={styles.fields}>
          <TextInput placeholder='name' onChangeText={Namelock} value={WalletName}/  >
          <TextInput placeholder='amount'onChangeText={Amountlock} value={WalletAmount.toString()}/>
          <TextInput placeholder='icon' onChangeText={IconLock} value={WalletIcon} />
          <Button title='confirm edit' onPress={Stash} ></Button>
          <Button title='Cancel' onPress={ModalOFF}></Button>
          </View>
        </Modal>
        <View style={styles.walletlist}>
        <ScrollView style={styles.scrolllist} contentContainerStyle={styles.walletlist}>
        { ListItem.map((item: any,index)=>{
        return <View  key={index} ><Text style={styles.walletitem}>{item.id} {item.name} {item.amount} {item.icon}  </Text>
        <View style={styles.buttons}><TouchableOpacity onLongPress={()=>DeletePrep(item.id)}  onPress={()=>EditPrepare(item.id ,item.name,item.amount,item.icon)}><Text>Edit/hold to Delete</Text></TouchableOpacity></View>
        </View>
        })} 
        </ScrollView>  
        </View>
        <ViewExpenses />
        <ViewAdditives />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  mainpage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0 ,
    width: '100%',
  },
  head: {
    flex: 1 ,
    position: 'absolute',
    top: 0,
    width : '100%',
    alignItems: 'center',
    padding:30 ,
    borderBottomWidth: 5 ,
    borderColor:"blue",
    borderRadius: 5 ,
  },
  heading: {
    fontSize: 20 ,
    color : "blue",
  },
  cash:{
    fontSize : 30,
    color:"green",
  },
  pagebody : {
    flex:2 ,
    position: 'absolute',
    top : 150 ,

  },
  walletlist : {
    flex: 1 ,
    textShadowColor : 'gray',
    backgroundColor: 'whitesmoke',
    width: '100%',
    alignItems:'center',
    
  },
  scrolllist : {
 flexGrow : 1
  },
  walletitem : {
    fontSize : 20 ,
    color : 'black' ,

    
  },
  fields : {
    width : '100%'
  },
  buttons : {
 width : 100 ,
 alignSelf: 'center',
  },
});

export default App;
