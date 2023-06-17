import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ToDoList from '../screens/ToDoList'
const stackNavigatorOptions = {

headerShow: false

}
createStackNavigator
const AppNavigator=createStackNavigator({

    Login:{screen:Login},
    Register:{screen:Register},
    ToDoList:{screen:ToDoList},

},
{
dafaultNavigationOptions: stackNavigatorOptions,



})

export default createAppContainer(AppNavigator)