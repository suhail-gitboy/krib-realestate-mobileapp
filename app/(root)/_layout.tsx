import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { useUserSync } from '@/hooks/useUserSync';

export default function Rootlayout() {

    const { isSignedIn, isLoaded } = useAuth();
    useUserSync()
    if (!isLoaded) return null

    if (!isSignedIn) return <Redirect href={"/sign-in"} />

    return <Slot />

}