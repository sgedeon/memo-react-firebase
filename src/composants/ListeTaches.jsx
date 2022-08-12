import './ListeTaches.scss';
import Tache from './Tache';
import { useEffect } from 'react';
import * as tachesModele from "../code/taches";

export default function ListeTaches({idUtilisateur, taches, setTaches}) {

  useEffect(() =>
    () => tachesModele.lireTout(idUtilisateur).then(
      tachesFS => {
        setTaches(tachesFS);
        console.log('Tâches retournés par Firestore : ', tachesFS);
      }
    )
  , []);

  return (
    <ul className="ListeTaches">
      {
        taches.map( 
          tache =>  <li key={tache.id}><Tache {...tache} /></li>
        )
      }
    </ul>
  );
}