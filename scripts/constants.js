/**
 * Module-based constants
 */
export const MODULE = {
    //ID: 'fvtt-token-action-hud-template'
    ID: 'fvtt-token-action-hud-genesys'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '1.5'

/**
 * Action types
 */
export const ACTION_TYPE = {
    //carac: 'tokenActionHud.template.carac',
    item: 'tokenActionHud.template.item',
    utility: 'tokenActionHud.utility'
}

/**
 * Groups
 */
export const GROUP = {
    armor: { id: 'armor', name: 'tokenActionHud.template.armor', type: 'system' },
    equipment: { id: 'equipment', name: 'tokenActionHud.template.equipment', type: 'system' },
    // manque carac
    personnage: { id: 'personnage', name: 'tokenActionHud.template.perso', type: 'system' },
    carac: { id: 'carac', name: 'tokenActionHud.template.carac', type: 'system' },
    consumables: { id: 'consumables', name: 'tokenActionHud.template.consumables', type: 'system' },
    containers: { id: 'containers', name: 'tokenActionHud.template.containers', type: 'system' },
    skill: { id: 'skill', name: 'tokenActionHud.template.skills', type: 'system' },
    treasure: { id: 'treasure', name: 'tokenActionHud.template.treasure', type: 'system' },
    weapons: { id: 'weapons', name: 'tokenActionHud.template.weapons', type: 'system' },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' }
}

/**
 * Item types
 */
export const ITEM_TYPE = {
    armor: { groupId: 'armor' },
    backpack: { groupId: 'containers' },
    consumable: { groupId: 'consumables' },
    equipment: { groupId: 'equipment' },
    treasure: { groupId: 'treasure' },
//    skill: { groupId: 'skill' },
    weapon: { groupId: 'weapons' }
}
