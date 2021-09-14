import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Post(){
    return (
        <View style={styles.post}>
            <View style={styles.userPost}>
                <View style={styles.perfil}></View>
                <Text style={styles.name}>Nome de usuário</Text>
            </View>
            <Text>Nome do livro</Text>
            <View style={styles.bookImage}>
                
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    post: {
        height: 400,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10
    },
    userPost: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    perfil: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
        borderRadius: 30,
        margin: 15
    },
    bookImage: {
        backgroundColor: '#ccc',
        width: '90%',
        height: '60%',
        margin: '5%'
    }
})