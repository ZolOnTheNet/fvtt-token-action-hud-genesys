// System Module Imports
import { ACTION_TYPE, ITEM_TYPE } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */a
        async buildSystemActions (groupIds) {
            // Set actor and token variables
            this.actors = (!this.actor) ? this._getActors() : [this.actor]
            this.actorType = this.actor?.type

            // Settings
            this.displayUnequipped = Utils.getSetting('displayUnequipped')

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            if (this.actorType === 'character') {
                this.#buildCharacterActions()
            } else if (this.actorType === 'minion') {
                this.#buildMinionActions()
            } else if (this.actorType === 'rival') {
                this.#buildRivalActions()
            } else if (this.actorType === 'nemesis') {
                this.#buildNemesisActions()
            } else if (!this.actor) {
                this.#buildMultipleTokenActions()
            }
        }

        /**
         * Build character actions
         * @private
         */
        #buildCharacterActions () {
            this.#buildInventory()
            this.#buildCarac()
        }

        #buildMinionActions () {
            this.#buildInventory()
            this.#buildCarac()
        }

        #buildRivalActions () {
            this.#buildInventory()
            this.#buildCarac()
        }

        #buildNemesisActions () {
            this.#buildInventory()
            this.#buildCarac()
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        #buildMultipleTokenActions () {
        }

        async #buildCarac () {
            const groupData = { id: 'carac', type: 'system' }
            const actions = ['Brawn','Agility','Intellect','Cunning','Willpower','Presence'].map((itemId) => {
                const id = itemId
                const name = coreModule.api.Utils.i18n("Genesys.Characteristics."+itemId)
                const actionTypeName = 'carac'
                const listName = `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`
                const encodedValue = [actionTypeName, id].join('|')

                return {
                    id,
                    name,
                    listName,
                    encodedValue
                }
            })
            this.addActions(actions, groupData)
        }
        /**
         * Build inventory
         * @private
         */
        async #buildInventory () {
            if (this.items.size === 0) return

            const actionTypeId = 'item'
            const inventoryMap = new Map()

            for (const [itemId, itemData] of this.items) {
                const type = itemData.type
                const equipped = itemData.equipped

                if (equipped || this.displayUnequipped) {
                    const typeMap = inventoryMap.get(type) ?? new Map()
                    typeMap.set(itemId, itemData)
                    inventoryMap.set(type, typeMap)
                }
            }

            for (const [type, typeMap] of inventoryMap) { // devrait etre dans carac
                const groupId = ITEM_TYPE[type]?.groupId

                if(type==='skill') {
                    const groupData = { id: 'skill', type: 'system' }
                    const actions = [...typeMap].map(([itemId, itemData]) => {
                        const id = itemId
                        const name = itemData.name
                        const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
                        const listName = `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`
                        const encodedValue = [actionTypeId, id].join(this.delimiter)

                        return {
                            id,
                            name,
                            listName,
                            encodedValue
                        }
                    })

                    // TAH Core method to add actions to the action list
                    //console.log("Action et Groupe "+type+" GRP:"+groupId, actions, groupData)
                    this.addActions(actions, groupData)
                    continue
                }
                if (!groupId) continue

                const groupData = { id: groupId, type: 'system' }

                // Get actions
                const actions = [...typeMap].map(([itemId, itemData]) => {
                    const id = itemId
                    const name = itemData.name
                    const actionTypeName = coreModule.api.Utils.i18n(ACTION_TYPE[actionTypeId])
                    const listName = `${actionTypeName ? `${actionTypeName}: ` : ''}${name}`
                    const encodedValue = [actionTypeId, id].join(this.delimiter)

                    return {
                        id,
                        name,
                        listName,
                        encodedValue
                    }
                })

                // TAH Core method to add actions to the action list
                console.log("This "+type+" GRP:"+groupId, groupData, this)
                this.addActions(actions, groupData)
            }
        }
    }
})
