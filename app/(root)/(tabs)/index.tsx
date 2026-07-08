import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { useUser } from '@clerk/expo';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import FeaturedCard from '@/components/FeaturedCard';
import PropertyCard from '@/components/PropertyCard';

export function Homescreen() {

    const { user } = useUser();
    const router = useRouter()
    const [featured, setFeatured] = useState<Property[]>([])
    const [recommended, setRecommended] = useState<Property[]>([])
    const [loading, setLoading] = useState<boolean>(true)



    const Fetchproperties = async () => {
        setLoading(true)
        const { data: featureData } = (await supabase.from('properties').select('*').eq('is_featured', true).order("created_at", { ascending: false }))
        const { data: recommendedData } = await supabase.from('properties').select('*').eq('is_featured', false).order("created_at", { ascending: false })
        setFeatured(featureData ?? [])
        setRecommended(recommendedData ?? [])
        setLoading(false)
    }

    useFocusEffect(
        useCallback(() => {
            Fetchproperties()
        }, [])
    )


    return (
        <SafeAreaView className='text-center p-3  bg-white'>
            <FlatList
                data={recommended}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* header */}
                        <View className='flex-row items-center justify-between px-5 pt-4 pb-5'>
                            <Image resizeMode='contain' style={{ width: 90, height: 36 }} source={require("../../../assets/images/kribb.png")} />
                            <View className='items-end'>
                                <Text> 👋good morning</Text>
                                <Text className='text-gray-900 font-bold text-base'>{user?.firstName ?? "user"}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowRadius: 6,
                                elevation: 2
                            }} className='mx-5 mb-6 px-4 py-3 gap-3 flex-row items-center bg-neutral-100 rounded-xl' onPress={() => router.push("/(root)/(tabs)/search")}>
                            <Ionicons name='search-outline' size={18} color='gray' />
                            <Text className='text-gray-400 text-sm flex-1'>Search properties</Text>
                            <TouchableOpacity className='h-8 w-8 bg-blue-500 rounded-xl justify-center items-center' onPress={() => router.push("/(root)/(tabs)/search?openFilters=true")}>
                                <Ionicons name='options-outline' size={15} color='white' />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <View className='mb-6'>
                            <Text className='text-gray-900 text-lg font-bold px-5 mb-4'>
                                Featured
                            </Text>
                            {
                                loading ? (
                                    <ActivityIndicator className='py-10' size="small" color="#2563eb" />
                                ) : (
                                    <FlatList data={featured} horizontal contentContainerStyle={{ padding: 20 }} showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id} renderItem={({ item }) => (<FeaturedCard property={item} />
                                    )} />
                                )
                            }

                        </View>

                        <Text className='text-lg font-bold px-4 mb-4 text-gray-900'>Recommended Properties</Text>
                    </View>
                }

                renderItem={({ item }) => (
                    <View className='px-5'>
                        <PropertyCard property={item} />

                    </View>
                )}

                ListEmptyComponent={!loading ? (<View className='items-center py-10'>
                    <Text className='text-gray-400'>No  properties found.</Text>
                </View>) : null}
            />
        </SafeAreaView >
    )
}

export default Homescreen
