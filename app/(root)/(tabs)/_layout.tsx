import { useUserstore } from '@/store/userStore';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

function IOSTAB() {


    const isAdmin = useUserstore(state => state.isAdmin)

    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="search">
                <Icon sf="magnifyingglass" />
                <Label>search</Label>
            </NativeTabs.Trigger>
            {
                isAdmin && (
                    <NativeTabs.Trigger name="create">
                        <Label>Add Property</Label>
                        <Icon sf="plus.circle.fill" />
                    </NativeTabs.Trigger>

                )
            }
            <NativeTabs.Trigger name="saved">
                <Icon sf="heart.fill" />
                <Label>Saved</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon sf="person.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
function Androidtab() {


    const isAdmin = useUserstore(state => state.isAdmin)

    return (
        <NativeTabs>
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                <Icon sf="house.fill" />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="search">
                <Icon sf="magnifyingglass" />
                <Label>search</Label>
            </NativeTabs.Trigger>
            {
                isAdmin && (
                    <NativeTabs.Trigger name="create">
                        <Label>Add Property</Label>
                        <Icon sf="plus.circle.fill" />
                    </NativeTabs.Trigger>

                )
            }
            <NativeTabs.Trigger name="saved">
                <Icon sf="heart.fill" />
                <Label>Saved</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon sf="person.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}


export default function Tablayout() {
    return Platform.OS == "ios" ? <IOSTAB /> : <Androidtab />;
}

