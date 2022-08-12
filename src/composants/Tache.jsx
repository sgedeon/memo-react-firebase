import './Tache.scss'; 
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Tache({id, titre, statut, dateModif}) {
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <div className="Tache">
      <IconButton className="supprimer" aria-label="supprimer" size="small" title="Cliquez pour marquer cette tâche complétée">
        <CheckIcon />
      </IconButton>
      <div className="info">
        <h2>{titre}</h2>
        <p>{dateModif}</p>
      </div>
      <IconButton className="supprimer" aria-label="supprimer" size="small" title="Cliquez pour supprimer cette tâche">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}