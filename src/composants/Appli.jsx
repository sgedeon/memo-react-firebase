import './Appli.scss';
import Accueil from './Accueil';
import Entete from './Entete';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import { observerEtatConnexion } from "../code/utilisateur";

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(
    ()  => observerEtatConnexion(setUtilisateur)
  , []);
  
  return (
    utilisateur ?
    <div className="Appli">
        <Entete utilisateur={utilisateur} />
    </div>
    :
    <Accueil/>
  );
}
