import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import React from "react";


export default function AuthStructure() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {

        return <Redirect href={"/"} />
    }

    return <Stack screenOptions={{ headerShown: false }} />
}