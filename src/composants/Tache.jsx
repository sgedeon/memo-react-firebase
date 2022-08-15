import './Tache.scss'; 
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
export default function Tache({id, titre, statut, dateAjout, supprimerTache, modifierTache}) {
  const [nvStatut, setNvStatut] = useState(!statut);

  /**
   * Gère la suppresssion d'une tâche
   */
  function gererSupprimer() {
    supprimerTache(id);
  }

  /**
   * Gère la modification d'une tâche
   */
  function gererModifier() {
    setNvStatut(statut => !statut);
    modifierTache(id, nvStatut);
  }

  return (
      <>
        <IconButton className="modifier" onClick={gererModifier} aria-label="supprimer" size="small" title="Cliquez pour marquer cette tâche complétée">
          <CheckIcon />
        </IconButton>
          <span className="texte">{titre}</span>
          <span className="date">Créée le :&nbsp;<b>
            {new Date(dateAjout.seconds*1000).toLocaleDateString([],{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })} 
            <span>&nbsp;à&nbsp;</span>
            {new Date (dateAjout.seconds*1000).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute:'2-digit',
              second:'2-digit',
            })}
          </b></span>
        <IconButton className="supprimer" onClick={gererSupprimer} aria-label="supprimer" size="small" title="Cliquez pour supprimer cette tâche">
          <DeleteIcon />
        </IconButton>
      </>
  );
}