import { useUserstore } from "@/store/userStore";
import { useUser } from "@clerk/expo";
import { useSupabase } from "./useSupabase";
import { useEffect } from "react";


export const useUserSync = () => {
    const { user } = useUser()
    const setIsadmin = useUserstore((state) => state.setIsadmin)
    const authSupabase = useSupabase()


    const synCUser = async () => {
        const { data } = await authSupabase.from("users")
            .select("clerk_id, is_admin")
            .eq("clerk_id", user!.id)
            .single()

        if (data) {
            setIsadmin(data.is_admin ?? false)
            return;
        }

        const { data: newUser } = await authSupabase
            .from("users")
            .insert({
                clerk_id: user!.id,
                email: user!.emailAddresses[0].emailAddress,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl
            })
            .select("isAdmin").single();
        setIsadmin(newUser?.isAdmin ?? false)
    }
    useEffect(() => {
        if (!user) return

        synCUser();
    }, [user])
}