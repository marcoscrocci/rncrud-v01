import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, TextInput, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default ({route, navigation}) => {
    //console.warn(Object.keys(props.route.params))
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <SafeAreaView>
            <View style={styles.form}>
                <Text>Nome</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={name => setUser({ ...user, name })}
                    placeholder="Informe o Nome"
                    value={user.name}
                />
                <Text>E-mail</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={email => setUser({ ...user, email })}
                    placeholder="Informe o E-mail"
                    value={user.email}
                />
                <Text>URL do Avatar</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                    placeholder="Informe a URL do Avatar"
                    value={user.avatarUrl}
                />
                <Button 
                    title="Salvar"
                    onPress={() => {
                        dispatch({ 
                            type: user.id ? 'updateUser' : 'createUser', 
                            payload: user
                        })
                        navigation.goBack()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
})