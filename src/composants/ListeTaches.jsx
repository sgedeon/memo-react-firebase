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
  ,[idUtilisateur,setTaches]);

  function supprimerTache(idTache) {
    tachesModele.supprimer(idUtilisateur, idTache).then(
      () => setTaches(taches.filter(
        tache => tache.id !== idTache
      ))
    );
  }

  function modifierTache(idTache,  nvStatut) {
    const objetNouvellesValeursTache = {
      statut: nvStatut,
    }

    tachesModele.modifier(idUtilisateur, idTache, objetNouvellesValeursTache).then(
      () => setTaches(taches.map(
        tache => {
          if(tache.id === idTache) {
            tache.statut = nvStatut;
          }
          return tache;
        }
      ))
    );
  }

  return (
    <div className="ListeTaches">
      {
        taches.map(
          tache =><div className={`Tache ${tache.statut}`} key={tache.id}>
                    <Tache
                      {...tache}
                      supprimerTache={supprimerTache} 
                      modifierTache={modifierTache} 
                    />
                  </div>
        )
      }
    </div>
  );
}