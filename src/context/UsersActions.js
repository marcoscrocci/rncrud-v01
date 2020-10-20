import axios from 'axios'
import UsersContext from './UsersContext'


export const getUsers = (dispatch) => {
    try {
        console.log('getUsers')
        axios.get('http://192.168.0.131:3003/users')
        .then((response) => {
            if (response.data && response.data.message) {
                console.log(response.data.message.text)
            } else {
                dispatch({ 
                    type: 'getUsers',
                    payload: response.data
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

