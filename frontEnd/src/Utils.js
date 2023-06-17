import AsyncStorage from '@react-native-async-storage/async-storage';


export const getTokenFromStorage = async () => {
    let token = "";
    try {
        token = await AsyncStorage.getItem('token');
        if (token !== null) {
            console.log('Token retrieved successfully.');
            console.log({token})
            // Use the token for authentication or authorization
        } else {
            console.log('No token found');
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
    return token;
};

export const saveTokenToStorage = async (token) => {
    try {
        const tokenn =  "Bearer " + token;
        
        await AsyncStorage.setItem('token',tokenn);
        console.log('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

