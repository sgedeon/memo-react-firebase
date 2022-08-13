import { bdFirestore } from "./init";
import { getDocs, query, collection, orderBy, addDoc, getDoc, Timestamp, doc, deleteDoc, updateDoc, where} from "firebase/firestore";

//Retourne toutes les tâches 
export async function lireTout(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), orderBy('titre', 'desc'))
    )
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

//Retourne les tâches actives
export async function lireActives(idUtilisateur) {
    const tachesALL = collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches');
    const taches = await getDocs(query(tachesALL, where("statut", "==", false)));
    console.log(taches);
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

//Retourne les tâches complétées
export async function lireCompletees(idUtilisateur) {
    const tachesALL = collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches');
    const taches = await getDocs(query(tachesALL, where("statut", "==", true)));
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}

//Create
export async function creer(idUtilisateur, infoTache) {
    infoTache.dateAjout = Timestamp.now();
    let refDoc = await addDoc(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), infoTache);
    return await getDoc(refDoc);
}

// Delete
export async function supprimer(idUtilisateur, idTache) {
    let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await deleteDoc(refDoc);
}

// Delete all
export async function supprimerCompletees(idUtilisateur) {
    lireCompletees(idUtilisateur).then(
        tachesFS => {
            const promises = tachesFS.map((tachesFS) => deleteDoc(doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', tachesFS['id'])))
            lireTout(idUtilisateur);
            return Promise.all(promises) 
        }
    );
}

// Update
export async function modifier(idUtilisateur, idTache, objModif) {
    let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await updateDoc(refDoc, objModif);
}