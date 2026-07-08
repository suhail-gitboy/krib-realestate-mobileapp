import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Property } from '@/types'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Formatprice } from '@/lib/Formats'

export default function FeaturedCard({ property }: { property: Property }) {
    const router = useRouter()
    return (
        <TouchableOpacity style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 12,
            shadowOpacity: 0.08,
            elevation: 4,
            opacity: property.is_sold ? 0.5 : 1,
        }} onPress={() => router.push(`/(root)/property/${property.id}`)} className='w-72 mr-2 rounded-3xl overflow-hidden bg-white'>
            <Image className="w-full h-44" resizeMode='cover' source={{ uri: property.images[0] }} />
            <View className='absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full'>
                <Text className='text-xs font-semibold text-blue-600 capitalize'>
                    {property.type}
                </Text>

            </View>
            <Text numberOfLines={1} className='text-base font-bold text-gray-800 mb-1'>
                {property.title}
            </Text>
            <View className='flex-row items-center gap-1 mb-3'>
                <Ionicons name="location-outline" size={12} color="gray" />
                <Text className='text-xs text-gray-500'>{property.address},{property.city}</Text>
            </View>
            <View className='flex-row items-center justify-center'>
                <Text className='text-xs text-blue-500 font-bold'>{Formatprice(property.price)}</Text>
            </View>
        </TouchableOpacity>
    )
}