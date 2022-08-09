import { bdFirestore } from "./init";
import { getDocs, query, collection, orderBy, addDoc, getDoc } from "firebase/firestore";

export async function lireTout(idUtilisateur) {
    const dossiers = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'dossiers')
            , orderBy('titre', 'desc'))
    )
    return dossiers.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export async function creer(idUtilisateur, infoDossier) {
    let refDoc = await addDoc(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'dossiers'), infoDossier);
    return await getDoc(refDoc);
}