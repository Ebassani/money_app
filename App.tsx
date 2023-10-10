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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import { init, read,getMoney,addWallet } from './database/database';
init();
const App: () => ReactNode = () => {
  const [ListItem,SetItem]=useState();
  const [CashTotal,SetTCash]=useState();
//  const [ListItem,AddItem]=useState([{"amount": 0, "icon": "icon1.png", "id": 1, "name": "Example Wallet"}])
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
 //addWallet("New Wallet", 30, 'icon2.png');
 //console.log(ListItem);
  return (
    <View style={styles.mainpage}>
      <View style={styles.head}>
        <View>
        <Text style={styles.heading}> Current cash : </Text>
        </View>
        <View >
      <Text style={styles.cash}>{CashTotal} $  </Text>
      </View>
      
      </View>
      <View style={styles.pagebody}>
        <View style={styles.walletlist}>
        <FlatList
          data={ListItem}
          renderItem={(item)=><View><Text style={styles.walletitem}>{item.item.id} {item.item.name} : {item.item.amount} {item.item.icon}  </Text></View>}/> 
        </View>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  mainpage: {
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0 ,
    width: '100%',
  },
  head: {
    flex: 1,
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
    position: 'absolute',
    top : 150 ,

  },
  walletlist : {
    textShadowColor : 'gray',
    backgroundColor: 'whitesmoke',
    width: '100%',
    alignItems:'center',
  },
  walletitem : {
    fontSize : 25 ,
    color : 'black' ,

    
  }
});

export default App;
