import './Entete.scss';
import Avatar from '@mui/material/Avatar';
import { deconnexion } from "../code/utilisateur";

export default function Entete({utilisateur}) {
  return (
    <header className="Entete">
      <img className="logo" src={require('../images/memo-logo.png')} alt="" />
      <div className="utilisateur">
        <div className="utilisateur_infos">
          {utilisateur.displayName}
          <button onClick={deconnexion} type="button">Déconnexion</button>
        </div>
        <div className="utilisateur_avatar">
          <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
        </div>
      </div>
    </header>
  );
}