import { create } from "zustand";


interface UserStore {
    isAdmin: boolean;
    setIsadmin: (value: boolean) => void
}
export const useUserstore = create<UserStore>((set) => ({
    isAdmin: false,
    setIsadmin: (value) => set({ isAdmin: value })
}))