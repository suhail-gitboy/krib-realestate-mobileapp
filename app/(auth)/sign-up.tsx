import { Image, View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useReducer, useState } from 'react'
import { useAuth, useSignIn, useSignUp } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'


export default function SignUp() {
    const { isSignedIn } = useAuth()
    const { signUp, errors, fetchStatus } = useSignUp()
    const router = useRouter()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, Setcode] = useState(null)
    const isLoading = fetchStatus === "fetching";

    if (signUp.status == "complete" || isSignedIn) {
        return null
    }
    const onSignup = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password: password,
            firstName: firstname,
            lastName: lastname
        })

        if (error) {
            alert(error.message)
        }

        if (!error) await signUp.verifications.sendEmailCode();
    }
    const onVerify = async () => {
        await signUp.verifications.verifyEmailCode({
            code,
        })

        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        }

    }

    if (signUp.status === "missing_requirements" && signUp.unverifiedFields.includes("email_address") && signUp.missingFields.length === 0) {
        return (
            <View className=' flex-1 justify-center px-4 '>
                <Image className='w-32 h-16 mb-8' resizeMode='contain' source={require('../../assets/images/kribb.png')} />
                <Text className='text-3xl text-gray-500 font-bold mb-2 '>
                    verify your account

                </Text>
                <Text className=' text-gray-500 font-bold mb-2 '>
                    we have sent an email


                </Text>
                <View className=' gap-3 mb-4'>
                    <TextInput className='text-gray-500 p-3 w-full  border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='enter verification code'
                        placeholderTextColor={"#9ca3af"}
                        keyboardType='number-pad'
                        autoCapitalize='words' value={code} onChangeText={Setcode} />
                    {
                        errors.fields.code && (
                            <Text className='text-red-500 my-1'>{errors.fields.code.message}</Text>
                        )
                    }
                </View>
                <TouchableOpacity onPress={onVerify} disabled={isLoading} className=' text-md py-3 mb-2 text-center bg-blue-600  w-full rounded-md '>
                    {
                        isLoading ? (<ActivityIndicator color={"white"} />) : (
                            <Text className='text-center text-white font-semibold'>Verify</Text>
                        )
                    }

                </TouchableOpacity>
                <TouchableOpacity onPress={() => signUp.verifications.sendEmailCode()} >

                    <Text className='text-center text-blue font-semibold'>Resend Code</Text>


                </TouchableOpacity>
            </View>
        )

    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            className='bg-white/30'
            keyboardShouldPersistTaps="handled">
            <View className=' flex-1 justify-center px-4 '>
                <Image className='w-32 h-16 mb-8' resizeMode='contain' source={require('../../assets/images/kribb.png')} />
                <Text className='text-3xl text-gray-500 font-bold mb-2 '>
                    create an account

                </Text>
                <Text className=' text-gray-500 font-bold mb-2 '>
                    Find your dream home today


                </Text>
                <View className='flex-row gap-3 mb-4'>
                    <TextInput className='text-gray-500 flex-1 border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='First name'
                        placeholderTextColor={"#9ca3af"}
                        autoCapitalize='words' value={firstname} onChangeText={setFirstname} />
                    <TextInput className='text-gray-500 flex-1 border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='First name'
                        placeholderTextColor={"#9ca3af"}
                        autoCapitalize='words' value={lastname} onChangeText={setLastname} />




                </View>
                <TextInput className='text-gray-500 mb-2 flex w-full border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='email'
                    placeholderTextColor={"#9ca3af"}
                    autoCapitalize='words' value={email} onChangeText={setEmail} />
                {
                    errors.fields.emailAddress && (
                        <Text className='text-red-500'>{errors.fields.emailAddress.message}</Text>
                    )
                }
                <TextInput className='text-gray-500 mb-2 flex w-full border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='password'
                    placeholderTextColor={"#9ca3af"}
                    secureTextEntry={true}
                    autoCapitalize='words' value={password} onChangeText={setPassword} />
                {
                    errors.fields.emailAddress && (
                        <Text className='text-red-500'>{errors.fields.emailAddress.message}</Text>
                    )
                }
                <TouchableOpacity onPress={onSignup} disabled={isLoading} className=' text-md py-3 text-center bg-blue-600  w-full rounded-md '>
                    {
                        isLoading ? (<ActivityIndicator color={"white"} />) : (
                            <Text className='text-center text-white font-semibold'>sign Up</Text>
                        )
                    }

                </TouchableOpacity>
                <View className='flex-row justify-center mt-2'>
                    <Text>already have an account?</Text>
                    <Link href="/sign-in">
                        <Text className='text-blue-600'>Sign In</Text>
                    </Link>

                </View>


                <View nativeID='clerk-captcha'>

                </View>
            </View>


        </ScrollView>
    )
}