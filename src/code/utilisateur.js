import { authFirebase, authGoogle, bdFirestore } from "./init";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


/**
 * Authentifie un utilisateur
 * 
 */
export function connexion() {
    signInWithPopup(authFirebase, authGoogle);
}

/**
 * Observe l'état de la connexion d'utilisateur
 *
 * @param {} mutateurEtatUtilisateur, Mutateur de la propriété utilisateur 
 */
export function observerEtatConnexion(mutateurEtatUtilisateur) {
    onAuthStateChanged(authFirebase, 
        util => {
            if(util) {
                sauvegarderProfil(util);
            }

            mutateurEtatUtilisateur(util);
            console.log('Utilisateur', util);
        }
    )
}

/**
 * Detruit la session d'un utilisateur
 * 
 */
export function deconnexion() {
    authFirebase.signOut();
}

/**
 * Sauvegarde le profil d'un utilisateur
 * 
 * @param {object} util, Informations de l'utilisateur
 */
function sauvegarderProfil(util) {
    setDoc(
        doc(bdFirestore, 'utilisateurs', util.uid),
        {
            nom: util.displayName,
            courriel: util.email,
            avatar: util.photoURL
        }, 
        {merge: true}
    );
}