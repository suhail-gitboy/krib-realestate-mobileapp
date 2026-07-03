import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'

export default function profile() {

    const { signOut } = useAuth()
    const router = useRouter()
    const handleSignout = async () => {
        try {
            await signOut()
            router.replace("/sign-in")

        } catch (error) {
            console.error(error);

        }
    }
    return (
        <SafeAreaView className='flex-1 justify-center'>
            <Text>profile</Text>
            <TouchableOpacity onPress={handleSignout}>
                <Text>Signout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}