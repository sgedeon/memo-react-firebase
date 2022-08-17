import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import FrmTache from './FrmTache';
import ListeTaches from './ListeTaches';
import Controle from './Controle';
import { creer } from "../code/taches";
import * as tachesModele from "../code/taches";
import { useEffect, useState} from 'react';
import { observerEtatConnexion } from "../code/utilisateur";

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

  // État des tâches  de l'utilisateur
  const [taches, setTaches] = useState([]);

  // États du choix de tâches à afficher de l'utilisateur
  const [tachesRequises, setTachesRequises] = useState([]);


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
    creer(utilisateur.uid, {
      titre: titre,
      statut: false,
    })
  }

  /**
   * Gère l'affichage des tâches complétées
   *
   */
  function afficherCompletees() {
    tachesModele.lireTout(utilisateur.uid).then(
      tachesFS => {
        setTaches(tachesFS.filter(
          tachesFS => tachesFS.statut !== false
        ))
      }
    )
  }

  /**
   * Gère l'affichage des tâches actives
   *
   */
  function afficherActives() {
    tachesModele.lireTout(utilisateur.uid).then(
      tachesFS => {
        setTaches(tachesFS.filter(
          tachesFS => tachesFS.statut !== true
        ))
      }
    )
  }

  /**
   * Gère l'affichage de toutes les tâches 
   *
   */
  function afficherToutes() {
    tachesModele.lireTout(utilisateur.uid).then(
      tachesFS => {
        setTaches(tachesFS);
      }
    )
  }
  
  return (
    utilisateur ?
    <div className="Appli">
        <Entete utilisateur={utilisateur}/>
        <section className="Taches">
          <FrmTache gererActionTache={ajouterTache} tachesRequises={tachesRequises} afficherActives={afficherActives} 
          afficherCompletees={afficherCompletees} afficherToutes={afficherToutes}/>
          <ListeTaches idUtilisateur={utilisateur.uid} taches={taches} setTaches={setTaches} tachesRequises={tachesRequises} 
          afficherActives={afficherActives} 
          afficherCompletees={afficherCompletees} afficherToutes={afficherToutes}/>
        </section>
        <Controle idUtilisateur={utilisateur.uid} taches={taches} setTachesRequises={setTachesRequises}/>
    </div>
    :
    <Accueil/>
  );
}