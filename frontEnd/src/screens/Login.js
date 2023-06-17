import axios from "axios";
import React, { useEffect, useState }  from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast';
import { saveTokenToStorage, removeAllData } from "../Utils";

  
  
const Login =({navigation})=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const  loginReq =async ()=>  {
    
        const payLoad={
            email,
            password
        };
        try{
            validator()
           
const response = await axios.post('http://192.168.1.3:4000/api/v1/signIn',payLoad);
            await saveTokenToStorage(response.data.data.token);
            setEmail('')
            setPassword('')
            navigation.navigate('ToDoList')
      } catch (error) {
        Toast.show((error.message), Toast.LONG,
        {
          backgroundColor: "red",
          fontSize: 19,
          position: 660,
          mask: true,

        })
    
        }
    };

   
   function validator(){


    const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const pattern = /^.{4,}$/

    if ( !email.match(mailPattern)) {

        throw new Error('Email Error');

      }else if (!password.match(pattern) ) {
        throw new Error('password Error');

      }

   }


    return (
        <View style={{ background:'#fff',height:"100%" }}>
 <Image source={require('../images/1.jpg')} style={styles.logo}/>
            
      <Text style={styles.registeration}>Regesteration Form</Text>
      <View   style={styles.inputs}> 
<TextInput value={email} onChangeText={(text) => setEmail(text)}  placeholder='please Enter your Email' style={styles.input} />
      </View>
      <View style={styles.inputs2}> 
<TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} placeholder='please Enter your Password' style={styles.input} />

      </View>
      <Text style={{alignSelf:'center',color:'#00716f',fontWeight:900  }} onPress={loginReq} >Login</Text>

      <View style={{ 
        marginHorizontal:55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        backgroundColor:"#00716f",
        paddingVertical:8,
        borderRadius:23,
       }}>
<Text onPress={()=>navigation.navigate('ToDoList')} style={{ color:"white" }}>Already Member</Text>

       </View>
       <Text onPress={ ()=>navigation.navigate('Register')
} style={{ 
        alignSelf:"center",
        color:"#00716f",
        paddingVertical:15
        }}>New User</Text>
            </View>
    )
}


const styles = StyleSheet.create({

    logo:{
        width: '99%',
         height: '60%',
         alignSelf:"center",
         borderRadius:10
    
        
    },
    registeration:{
        flex:1,
    fontSize:20,
    fontWeight:800,
    alignSelf:"center"
    
    
    },
    inputs:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff",
        borderColor:"#00716f",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:50,
        paddingHorizontal:10,
        borderRadius:23,
    
    },
    inputs2:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff",
        borderColor:"#00716f",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:15,
        
        paddingHorizontal:10,
        borderRadius:23,
    
    },
    input:{
    paddingHorizontal:10
    
    },
    
    
    
    })

    export default Login