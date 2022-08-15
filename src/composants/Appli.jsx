import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import FrmTache from './FrmTache';
import ListeTaches from './ListeTaches';
import Controle from './Controle';
import { creer } from "../code/taches";
import { useEffect, useState} from 'react';
import { observerEtatConnexion } from "../code/utilisateur";

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

  // État des taches de l'utilisateur
  const [taches, setTaches] = useState([]);


  // Écoute la connexion de l'utilisateur au chargement de la page
  useEffect(
    ()  => observerEtatConnexion(setUtilisateur)
  , []);

  /**
   * Gère l'ajout d'une tâche
   *
   * @param  {string} titre Titre de la tâche 
   */
  function ajouterTache(titre) {
    console.log('Valeurs du formulaire : ', titre);
    creer(utilisateur.uid, {
      titre: titre,
      statut: false,
    }).then(
      doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
    )
  }
  
  return (
    utilisateur ?
    <div className="Appli">
        <Entete utilisateur={utilisateur}/>
        <section className="Taches">
          <FrmTache gererActionTache={ajouterTache} />
          <ListeTaches idUtilisateur={utilisateur.uid} taches={taches} setTaches={setTaches} />
        </section>
        <Controle idUtilisateur={utilisateur.uid} taches={taches} setTaches={setTaches} />
    </div>
    :
    <Accueil/>
  );
}