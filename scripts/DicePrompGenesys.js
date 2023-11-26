/* Creration d'un module pour simuler le lancer de dél à la génésys
 * une zone pour ajouter les dés positifs, une pour les dés négative,
 * une zone pour la manipulation des dés
 * une zone pour le choix de la compétences et de l'attribut
 * un bouton ok, un bouton cancel
 * sur le modèle du formulaire Genesys
 */ 

function handleSubmit(html) {
    const formElement = html[0].querySelector('form');
    const formData = new FormDataExtended(formElement);
    const formDataObject = formData.toObject();
  
    // expects an object: { input-1: 'some value' }
    console.log('output form data object', formDataObject);
}
  
function simpleDialogue(form){
    let i = 10;
    new Dialog({
        title: "A custom dialog title",
        content: form,
        buttons: {
            submit: { label: "Submit", callback: handleSubmit },
            cancel: { label: "Cancel" },
        }
    }).render(true);
}
  
export function DicePromptGenesys(){

}  