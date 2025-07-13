import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../firebase/firebase";


const useUserStore = create((set) => ({
    user : null,

    setUser : (userInfo) => {
        AsyncStorage.setItem("user", JSON.stringify(userInfo));
        set({user: userInfo});
    },

    userLogout: async () => {
        await AsyncStorage.removeItem("user");
        await signOut(auth);
        set({user: null});
    },
}));

export default useUserStore;