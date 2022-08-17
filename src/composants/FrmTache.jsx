import './FrmTache.scss'; 
import { useState } from 'react';

export default function FormTache({gererActionTache, tachesRequises, gestionAffichage}) {
  const [titre, setTitre] = useState('');

  /**
   * Gère le titre d'une tâche
   * @param  {string} event 
   */
  function gererSoumettre(event) {
    event.preventDefault();
    if (titre.length > 0 ) {
      gererActionTache(titre);
      setTitre('');
    }
    gestionAffichage();
  }

  /**
   * Gère le titre d'une tâche
   * @param  {string} event 
   */
  function gererChangement(event) {
    setTitre(event.target.value)
  }

  return (
      <form className="formTache" onSubmit={gererSoumettre}>
        <input type="text" onChange={gererChangement} value={titre} placeholder="Ajoutez une tâche ..." name="texteTache" autoComplete="off"/>
      </form>
  );
}