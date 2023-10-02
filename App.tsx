/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren, ReactNode} from 'react';
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
  return (
    <View style={styles.mainpage}>
      <View style={styles.head}>
        <View>
        <Text style={styles.heading}> Current cash : </Text>
        </View>
        <View >
      <Text style={styles.cash}>5000.01 $</Text>
      </View></View>

    </View>
  );
};
//idea for convertion function + change variable names to be similar with db
const CurCash = (Overview:{TotalAmount:Float}) => {
<Text>{Overview.TotalAmount} $</Text>
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
});

export default App;
