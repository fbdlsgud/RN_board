import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";



export const uploadImg = async (uri, storagePath) => {

    
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, storagePath);

    await uploadBytes(imageRef,blob);
    const downloadUrl = await getDownloadURL(imageRef);
    
    return downloadUrl;
} 