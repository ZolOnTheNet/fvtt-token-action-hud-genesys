//import  GenesysRoller from './genesys-roll.js'
//import DicePrompt from './DicePromtCpy.js'
import { lancerDeDes, LancerDesUiObj } from "./api_rolls.js"
export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
     */
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
        /**
         * Handle action click
         * Called by Token Action HUD Core when an action is left or right-clicked
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionClick (event, encodedValue) {
            const [actionTypeId, actionId] = encodedValue.split('|')

            const renderable = ['item']

            if (renderable.includes(actionTypeId) && this.isRenderItem()) {
                return this.doRenderItem(this.actor, actionId)
            }

            const knownCharacters = ['character','minions','rival','nemesys']

            // If single actor is selected
            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, actionTypeId, actionId)
                return
            }

            const controlledTokens = canvas.tokens.controlled
                .filter((token) => knownCharacters.includes(token.actor?.type))

            // If multiple actors are selected
            for (const token of controlledTokens) {
                const actor = token.actor
                await this.#handleAction(event, actor, token, actionTypeId, actionId)
            }
        }

        /**
         * Handle action hover
         * Called by Token Action HUD Core when an action is hovered on or off
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionHover (event, encodedValue) {}

        /**
         * Handle group click
         * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
         * @override
         * @param {object} event The event
         * @param {object} group The group
         */
        async handleGroupClick (event, group) {}

        /**
         * Handle action
         * @private
         * @param {object} event        The event
         * @param {object} actor        The actor
         * @param {object} token        The token
         * @param {string} actionTypeId The action type id
         * @param {string} actionId     The actionId
         */
        async #handleAction (event, actor, token, actionTypeId, actionId) {
            switch (actionTypeId) {
            case 'carac':
                // actionId contien le nom de l'attribut à lancer...
                let des= {Actor:"-", skill:"-", attrib:"-", attrib2:"-", A:0, P:0, B:0, D:0, C:0, S:0, a:0, s:0, t: 0, h:0, f:0, d:0}
                des.Actor = actor.id
                des.attrib = actionId.toLowerCase()
                des.attrib2 = des.attrib // deux fois le même.
                LancerDesUiObj(actor,"-",des)
                break
            case 'item':
                this.#handleItemAction(event, actor, actionId)
                break
            case 'utility':
                this.#handleUtilityAction(token, actionId)
                break
            }
        }

        /**
         * Handle item action
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        #handleItemAction (event, actor, actionId) {
            const item = actor.items.get(actionId)
            //ici pour action sur item
            // const baseRollData = {
            //     actor: toRaw(context.actor),
            //     characteristic: selectedCharacteristic.value === '-' ? undefined : (selectedCharacteristic.value),
            //     skillId: selectedSkill.value?.id ?? '-',
            //     formula,
            //     symbols: symbols
            // }
            // faire un simple lancer de dés
            //lancerDeDes(actor, item, {code:"action"})
            let des= {Actor:"-", skill:"-", attrib:"-", attrib2:"-", A:0, P:0, B:0, D:0, C:0, S:0, a:0, s:0, t: 0, h:0, f:0, d:0}
            LancerDesUiObj(actor, item, des)
           // await GenesysRoller.skillRoll(baseRollData);
            console.log("INFO :",actor, item, actionId)
            //item.toChat(event)
        }

        /**
         * Handle utility action
         * @private
         * @param {object} token    The token
         * @param {string} actionId The action id
         */
        async #handleUtilityAction (token, actionId) {
            switch (actionId) {
            case 'endTurn':
                if (game.combat?.current?.tokenId === token.id) {
                    await game.combat?.nextTurn()
                }
                break
            }
        }
    }
})
