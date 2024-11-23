import {database, app} from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export default async function editData(collectionName, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(database, collectionName, id), data, {
            merge: true
        })
    } catch (e) {
        error = e;
    }

    return{ result, error };
}