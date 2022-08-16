import './Controle.scss';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import * as tachesModele from "../code/taches";

export default function Controle({idUtilisateur, taches, setTaches}) {

   // État des taches actives de l'utilisateur
  const [NbActives, setNbActives] = useState('');

   // État du texte soumis par l'utilisateur
  const [TxtTache, setTxtTache] = useState('');

  useEffect(
    () => {
       tachesModele.lireActives(idUtilisateur).then(
          NbActivesFS => {
            NbActivesFS = NbActivesFS.length
            setNbActives(NbActivesFS);
            if (NbActivesFS > 1) {
              setTxtTache('Tâches restantes')
            } else {
              setTxtTache('Tâche restante')
            }
          }
      )
    }
  ,[idUtilisateur, taches]);

  /**
   * Gère l'affichage des tâches complétées
   *
   */
  function gererCompletees() {
      tachesModele.lireTout(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS.filter(
            tachesFS => tachesFS.statut !== false
          ))
        }
      )
  };

  /**
   * Gère l'affichage des tâches actives
   *
   */
  function gererActives() {
      tachesModele.lireTout(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS.filter(
            tachesFS => tachesFS.statut !== true
          ))
        }
      )
   };

  /**
   * Gère l'affichage de toutes les tâches
   *
   */
  function gererToutes() {
      tachesModele.lireTout(idUtilisateur).then(
        tachesFS => {
          setTaches(tachesFS);
        }
      )
  };

  /**
   * Gère la suppression des tâches complétées
   *
   */
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