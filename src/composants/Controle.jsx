import './Controle.scss';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect} from 'react';
import * as tachesModele from "../code/taches";

export default function Controle({idUtilisateur, taches, setTaches}) {
  const [NbActives, setNbActives] = useState('');

  useEffect(() =>
  () => tachesModele.lireActives(idUtilisateur).then(
        NbActivesFS => {
          NbActivesFS = NbActivesFS.length
          setNbActives(NbActivesFS);
          console.log('Nombre de tâches retournés par Firestore : ', NbActivesFS);
        }
  ));

  function gererCompletees() {
      tachesModele.lireCompletees(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS);
          console.log('Tâches retournés par Firestore : ', tachesFS);
        }
      )
  };

  function gererToutes() {
      tachesModele.lireTout(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS);
          console.log('Tâches retournés par Firestore : ', tachesFS);
        }
      )
  };

  function gererActives() {
      tachesModele.lireActives(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS);
          console.log('Tâches retournés par Firestore : ', tachesFS);
        }
      )
  };

  function gererSupprimerCompletees() {
      tachesModele.supprimerCompletees(idUtilisateur);
  };

  return (
    <footer className="Controle">
      {
        <>
          <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
              <Button onClick={gererToutes}>Toutes</Button>
              <Button onClick={gererCompletees}>Complétées</Button>
              <Button onClick={gererActives}>Actives</Button>
          </ButtonGroup>
          <span>Tâches restante : {NbActives}</span>
          <IconButton onClick={gererSupprimerCompletees} className="supprimer" color="error" aria-label="supprimer" size="small" title="Cliquez pour supprimer cette tâche">
            <DeleteIcon />
          </IconButton>
        </>
      }
    </footer>
  );
}