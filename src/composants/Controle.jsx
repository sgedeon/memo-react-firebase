import './Controle.scss';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import * as tachesModele from "../code/taches";

export default function Controle({idUtilisateur, taches, setTaches}) {
  const [NbActives, setNbActives] = useState('');
  const [TxtTache, setTxtTache] = useState('');

  useEffect(() =>
  () => tachesModele.lireActives(idUtilisateur).then(
        NbActivesFS => {
          NbActivesFS = NbActivesFS.length
          setNbActives(NbActivesFS);
          if (NbActivesFS > 1) {
            setTxtTache('Tâches restantes')
          } else {
            setTxtTache('Tâche restante')
          }
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
      gererActives();
  };

  return (
    <footer className="Controle">
      {
        <>
          <ButtonGroup variant="outlined" color="error" aria-label="outlined button group">
              <Button onClick={gererToutes} aria-label="toutes" title="Cliquez pour voir toutes les tâches">Toutes</Button>
              <Button onClick={gererCompletees} aria-label="complétées" title="Cliquez pour voir toutes les tâches complétées">Complétées</Button>
              <Button onClick={gererActives} aria-label="actives" title="Cliquez pour voir toutes les tâches actives">Actives</Button>
          </ButtonGroup>
          <span>{TxtTache} : {NbActives}</span>
          <IconButton onClick={gererSupprimerCompletees} className="supprimer" color="error" aria-label="supprimer" size="small" title="Cliquez pour supprimer toutes les tâches complétées">
            <DeleteIcon />
          </IconButton>
        </>
      }
    </footer>
  );
}