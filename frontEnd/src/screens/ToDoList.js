import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../../components/Task';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { getTokenFromStorage } from "../Utils";

export default function ToDoList() {


    const [task, setTask] = useState('');
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        fetchTodoList();
      }, []);
   
      function validator(){
       if (task.trim() === '') {
            throw new Error('No content to create to !');
        }
    }
      const handleAddTask = async () => {

        const payload = {
                title:"_____",
                content:task
        }
        try {
        validator();
        const token = await getTokenFromStorage();

            const response = await axios.post('http://192.168.1.3:4000/todo',payload,{
                headers: {
                    "Authorization":token
                  }
            });
         console.log({thereponse:response.data.data.toDo})
            setTodoList(prevList => [...prevList,response.data.data.toDo]);
            
          setTask('');
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


      const fetchTodoList = async () => {
        try {
        const token = await getTokenFromStorage();
        console.log(token);


          const response = await axios.get('http://192.168.1.3:4000/todo',{
              headers: {
                  "Authorization": token
                }
          });
          console.log(response);
          setTodoList(response.data.data.todos);
        // console.log({s:response.data});
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
    
      const deleteTodo = async (id) => {
        try {
        const token = await getTokenFromStorage();

          await axios.delete(`http://192.168.1.3:4000/todo/${id}`,{
            headers: {
                "Authorization": token 
              }
        });
        setTodoList((prevList) => prevList.filter((item) => item._id !== id));
        } catch (error) {  Toast.show((error.message), Toast.LONG,
            {
              backgroundColor: "red",
              fontSize: 19,
              position: 660,
              mask: true,
    
            })
        }
        // setTodoList(prevList => prevList.filter(todo => todo.id !== id));



      };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {todoList.map((item, index) => {
              return (
                <TouchableOpacity key={index} >
                 
            
                  <Task item={item} onDelete={deleteTodo} /> 
                

                </TouchableOpacity>
              )
            })}
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});