import React from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Post from '../components/Post'

export default function Home(){
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#00FA9A'}}
        >
            <View style={styles.postsContainer}>
                <Post />
                <Post />
                <Post />
            </View>
        </ScrollView>
    )
}

export const styles = StyleSheet.create({
    postsContainer: {
        width: '90%',
        // borderWidth: 1,
        // borderColor: 'red',
        margin: '5%',
        
    }
})