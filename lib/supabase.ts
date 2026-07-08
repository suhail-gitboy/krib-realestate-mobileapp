import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY!
export const supabase = createClient(
    supabaseUrl,
    key
)
export function createClerkSupabaseClient(getToken: () => Promise<string | null>) {

    return createClient(supabaseUrl, key, {
        async accessToken() {
            return getToken();
        }
    });
}