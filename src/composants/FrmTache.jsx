import './FrmTache.scss'; 
import { useState } from 'react';

export default function FormTache({gererActionTache}) {
  const [titre, setTitre] = useState('');

  function gererSoumettre(event) {
    event.preventDefault(); //stop default action of form
    // Appeler gererActionDossier avec les valeurs du formulaire
    gererActionTache(titre);
    setTitre('');
  }

  function gererChangement(event) {
    setTitre(event.target.value)
  }

  return (
      <form className="formTache" onSubmit={gererSoumettre}>
        <input type="text" onChange={gererChangement} value={titre} placeholder="Ajoutez une tâche ..." name="texteTache" autoComplete="off"/>
      </form>
  );
}