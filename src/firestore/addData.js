import {database} from "../firebase-config";
import {addDoc, collection} from "firebase/firestore";

export default async function addData(path, data) {
    const collectionRef = collection(database, path);
    let result = null;
    let error = null;

    try {
        result = await addDoc(collectionRef, data)
    } catch (e) {
        error = e;
    }

    return{ result, error };
}