import axios from "axios";
import React, { useState }  from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast';




const Register=({navigation})=>{


    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    function validator(){


        const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const pattern = /^.{4,}$/
    
if(name.trim()  === ''){
    throw new Error('Name Error');

}
        else if ( !email.match(mailPattern)) {
            throw new Error('Email Error');

    
          }else if (!password.match(pattern) ) {
            throw new Error('password Error');
    
          }
    
       }
    const  registerReq =async ()=>  {
    
        const payLoad={
            name,
            email,
            password
        };
        console.log({payLoad})
        try{
            validator()
            const response = await axios.post('http://192.168.1.3:4000/api/v1/signUp',payLoad);
            // const response = await axios.get('https://google.com');

        console.log('Response:', response.data);
        navigation.navigate('Login')
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
    

    return (
        <View style={{ background:'#fff',height:"100%" }}>
 <Image source={require('../images/1.jpg')} style={styles.logo}/>
            
      <Text style={styles.registeration}>Regesteration Form</Text>
      <View style={styles.inputs}> 
<TextInput value={name} onChangeText={(text) => setName(text)}  placeholder='please Enter your Name' style={styles.input} />
      </View>
      <View style={styles.inputs2}> 
<TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder='please Enter your Email' style={styles.input} />
      </View>
      <View style={styles.inputs2}> 
<TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} placeholder='please Enter your Password' style={styles.input} />
      </View>
      <Text onPress={registerReq} style={{alignSelf:'center',color:'#00716f',fontWeight:900  }}  >Register</Text>

      <View style={{ 
        marginHorizontal:55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        backgroundColor:"#00716f",
        borderRadius:23,
       }}>
<Text onPress={()=>navigation.navigate('Login')} style={{ color:"white" }}>Already Member</Text>

       </View>
       <Text style={{ 
        alignSelf:"center",
        color:"#00716f",
        paddingVertical:10
        }}>New User</Text>
            </View>
    )
}



const styles = StyleSheet.create({

logo:{
    width: '99%',
     height: '55%',
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
    paddingVertical:2,
    borderRadius:23,

},
input:{
paddingHorizontal:10

},



})

export default Register