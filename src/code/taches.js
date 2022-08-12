import { bdFirestore } from "./init";
import { getDocs, query, collection, orderBy, addDoc, getDoc } from "firebase/firestore";

export async function lireTout(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches')
            , orderBy('titre', 'desc'))
    )
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

export async function creer(idUtilisateur, infoTache) {
    let refDoc = await addDoc(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), infoTache);
    return await getDoc(refDoc);
}