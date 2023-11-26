import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
    })
    const groupsArray = Object.values(groups)
    console.log("Juste pour arreter")
    DEFAULTS = {
        layout: [
            {
                nestId: 'personnage',
                id: 'personnage',
                name: coreModule.api.Utils.i18n('tokenActionHud.template.perso'),
                groups: [
                    { ...groups.skill, nestId: 'personnage_skill' },
                    { ...groups.carac, nestId: 'personnage_carac' }
                ]
            },
            {
                nestId: 'inventory',
                id: 'inventory',
//                name: coreModule.api.Utils.i18n('template.inventory'),
                name:game.i18n.localize('tokenActionHud.template.inventory'),
                groups: [
                    { ...groups.weapons, nestId: 'inventory_weapons' },
                    { ...groups.armor, nestId: 'inventory_armor' },
                    { ...groups.equipment, nestId: 'inventory_equipment' },
                    { ...groups.consumables, nestId: 'inventory_consumables' },
                    { ...groups.containers, nestId: 'inventory_containers' },
                    { ...groups.treasure, nestId: 'inventory_treasure' }
                ]
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                groups: [
                    { ...groups.combat, nestId: 'utility_combat' },
                    { ...groups.token, nestId: 'utility_token' },
                    { ...groups.rests, nestId: 'utility_rests' },
                    { ...groups.utility, nestId: 'utility_utility' }
                ]
            }
        ],
        groups: groupsArray
    }
})
