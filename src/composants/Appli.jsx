import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import FrmTache from './FrmTache';
import ListeTaches from './ListeTaches';
import Controle from './Controle';
import { creer } from "../code/taches";
import { useEffect, useState } from 'react';
import { observerEtatConnexion } from "../code/utilisateur";

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

    // État des dossiers de l'utilisateur
  const [taches, setTaches] = useState([]);

  useEffect(
    ()  => observerEtatConnexion(setUtilisateur)
  , []);

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

        </section>
  
    </div>
    :
    <Accueil/>
  );
}