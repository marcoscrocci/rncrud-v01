import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Alert, View } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import UsersContext from '../context/UsersContext'
import { getUsers } from '../context/UsersActions'

export default props => {
    //console.warn(Object.keys(props))

    const { state, dispatch } = useContext(UsersContext)
    const [users, setUsers] = useState([])
    const [executou, setExecutou] = useState(false)

    useEffect(() => {
        //Alert.alert('Teste')
        //if (!executou) {
        //    setExecutou(true)
            getUsers(dispatch)

        //}
    }, []) // O segundo parâmetro com valor [] faz o useEffect executar uma única vez.


    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            { 
                text: 'Sim',
                onPress() {
                    dispatch({ 
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user) {
        return (
            <>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='red' />}
                />
            </>
        )
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                leftAvatar={{source: {uri: user.avatarUrl}}}
                key={user.id}
                title={user.name}
                subtitle={user.email}
                bottomDivider 
                rightElement={getActions(user)}
                onPress={() => props.navigation.navigate('UserForm', user)}
            />
        )
        //<Text>{user.name} - {user.email}</Text>
    }

    return (
        <SafeAreaView>
            <View>
                <FlatList 
                    keyExtractor={user => user.id.toString()}
                    data={state.users}
                    renderItem={getUserItem}
                />
            </View>
        </SafeAreaView>
    )
}