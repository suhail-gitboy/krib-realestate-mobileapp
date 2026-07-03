import { Image, View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'

export default function SignIn() {
    const { signIn, errors, fetchStatus } = useSignIn()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, Setcode] = useState("")
    const isLoading = fetchStatus === "fetching";
    const onVerify = async () => {
        await signIn.mfa.verifyEmailCode({
            code,
        })

        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        }

    }
    const onSigninPress = async () => {
        const { error } = await signIn.password({
            emailAddress: email,
            password: password,

        })

        if (error) {
            alert(error.message)
        }

        if (signIn.status == "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return

                    }
                    const url = decorateUrl("/");
                    router.replace(url as any)
                }
            })
        } else if (signIn.status == "needs_second_factor") {
            await signIn.mfa.sendPhoneCode();
        } else if (signIn.status == "needs_client_trust") {
            const emailcode = signIn.supportedSecondFactors.find((factor) => factor.strategy == "email_code")

            if (emailcode) {
                await signIn.mfa.sendEmailCode();

            }
        } else {
            console.log("sign-in attempt npt complete");

        }
    }

    if (signIn.status == "needs_client_trust") {
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
                        errors?.fields?.code && (
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
                <TouchableOpacity onPress={() => signIn.mfa.sendEmailCode()} >

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
                    Welcome back

                </Text>
                <Text className=' text-gray-500 font-bold mb-2 '>
                    sign to your account


                </Text>

                <TextInput className='text-gray-500 mb-2 flex w-full border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='email'
                    placeholderTextColor={"#9ca3af"}
                    autoCapitalize='words' value={email} onChangeText={setEmail} />
                {
                    errors.fields.identifier && (
                        <Text className='text-red-500'>{errors.fields.identifier.message}</Text>
                    )
                }
                <TextInput className='text-gray-500 mb-2 flex w-full border-[1px] border-gray-200 rounded-xl px-4 py-3   ' placeholder='password'
                    placeholderTextColor={"#9ca3af"}
                    secureTextEntry={true}
                    autoCapitalize='words' value={password} onChangeText={setPassword} />
                {
                    errors.fields.password && (
                        <Text className='text-red-500'>{errors.fields.password.message}</Text>
                    )
                }
                <TouchableOpacity disabled={isLoading} onPress={onSigninPress} className=' text-md py-3 text-center bg-blue-600  w-full rounded-md '>
                    {
                        isLoading ? (<ActivityIndicator color={"white"} />) : (
                            <Text className='text-center text-white font-semibold'>sign in</Text>
                        )
                    }

                </TouchableOpacity>
                <View className='flex-row justify-center mt-2'>
                    <Text>dont have an account?</Text>
                    <Link href="/sign-up">
                        <Text className='text-blue-600'>Sign up</Text>
                    </Link>

                </View>


            </View>


        </ScrollView>
    )
}