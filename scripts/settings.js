import { MODULE } from './constants.js'
import { itemRoll, just1Roll } from './forMacroApi.js'

function simpleDialogue(){
    console.log("Fonction Simple Dialogue appelée")
}
function lanceLesDes(){
    console.log("Fonction lance Les Des appelée")
}
function simpleDialogueYaze(){
    console.log("Fonction yazeDiag appelée")
}


/**
 * Register module settings
 * Called by Token Action HUD Core to register Token Action HUD system module settings
 * @param {function} coreUpdate Token Action HUD Core update function
 */
export function register (coreUpdate) {
    game.settings.register(MODULE.ID, 'displayUnequipped', {
        name: game.i18n.localize('tokenActionHud.template.settings.displayUnequipped.name'),
        hint: game.i18n.localize('tokenActionHud.template.settings.displayUnequipped.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            coreUpdate(value)
        }
    })
    game.api = {
        "rollCmp": itemRoll,
        "rollSimple" : just1Roll
      };
}
