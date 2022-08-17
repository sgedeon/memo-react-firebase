import { bdFirestore } from "./init";
import { getDocs, query, collection, orderBy, addDoc, getDoc, Timestamp, doc, deleteDoc, updateDoc, where} from "firebase/firestore";

/**
 * Retourne toute les tâches
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @return {array}
 */
export async function lireTout(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), orderBy('dateAjout', 'desc'))
    );
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}


/**
 * Retourne toute les tâches actives
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @return {array}
 */
export async function lireActives(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), where("statut", "==", false))
    );
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}


/**
 * Retourne toute les tâches complétées
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @return {array}
 */
export async function lireCompletees(idUtilisateur) {
    const taches = await getDocs(
        query(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), where("statut", "==", true))
    );
    return taches.docs.map(doc => ({id: doc.id, ...doc.data()}))
}


/**
 * Créé une tâche 
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @param  {object} idTache, Informations de la tâche
 * @return {getDoc}
 */
export async function creer(idUtilisateur, infoTache) {
    infoTache.dateAjout = Timestamp.now();
    let refDoc = await addDoc(collection(bdFirestore, 'utilisateurs', idUtilisateur, 'taches'), infoTache);
    return await getDoc(refDoc);
}

/**
 * Supprime une tâche 
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @param  {string} idTache, Identifiant de la tâche
 * @return {deleteDoc}
 */
export async function supprimer(idUtilisateur, idTache) {
    let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await deleteDoc(refDoc);
}

/**
 * Supprime les tâches complétées
 *
 * @param  {string} idUtilisateur, Identifiant de l'utilisateur 
 * @return {Promise}
 */
export async function supprimerCompletees(idUtilisateur) {
    lireCompletees(idUtilisateur).then(
        tachesFS => {
            const promises = tachesFS.map((tachesFS) => deleteDoc(doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', tachesFS['id'])))
            return Promise.all(promises) 
        }
    );
}

/**
 * Modifie une tâche 
 *
 * @param  {string} idUtilisateur Identifiant de l'utilisateur 
 * @param  {string} idTache, Identifiant de la tâche
 * @param  {object} objModif, Informations de l'objet à modifier
 * @return {updateDoc}
 */
export async function modifier(idUtilisateur, idTache, objModif) {
    let refDoc = doc(bdFirestore, 'utilisateurs', idUtilisateur, 'taches', idTache);
    return await updateDoc(refDoc, objModif);
}