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

const App: () => ReactNode = () => {
 // {amount icon name id }
 let wallet : {amount : Int32 ,icon: String,name : String , id : Int32} = {amount: 50.41 ,icon:"Image.png" ,name:"bank1" , id:1}
//  let wallet : {name : String , amount: Int32} = {name : 'banker' , amount : 50.01 };
  const [NewItem,SetItem]=useState('');
  const [ListItem,AddItem]=useState([wallet.amount +" "+ wallet.icon + " " + wallet.name +" " + wallet.id])
  const InputHandler =(inputtext: React.SetStateAction<string>)=> {
    SetItem (inputtext);
  }
  const AddItemToList = () => {
      
    AddItem(ListItem=>[...ListItem , NewItem]);
  }


  return (
    <View style={styles.mainpage}>
      <View style={styles.head}>
        <View>
        <Text style={styles.heading}> Current cash : </Text>
        </View>
        <View >
      <Text style={styles.cash}>5000.01 $</Text>
      </View>
      
      </View>
      <View style={styles.pagebody}>
        <View style={styles.walletlist}>
        {/* {ListItem.map ((wallet)=>{
          return <Text style={styles.walletitem} key={wallet.id}>{wallet.id}: {wallet} </Text> 
      })}*/}
        </View>
      </View>
    </View>
  );
};
//idea for convertion function + change variable names to be similar with db
const CurCash = (Overview:{TotalAmount:Float}) => {
<Text>{Overview.TotalAmount} $</Text>
}
//front-end for reading wallets
const WalletOverview = (wallet:{name:String,amount:Float}) => {

}

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
    color : 'blue' ,

    
  }
});

export default App;
