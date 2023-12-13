/* objectif : donner les api pour les macros
 *
 * game.api.just1Roll(initDice : {})
 * game.api.roll(ActorName, name, code) with
 *  code = s/c for skill, a for attributes, w for weapeon
 * in this case the name it the "item" or attribute name
 *
 */
import { lancerDesUi, LancerDesUiObj } from "./api_rolls.js"

/**
 *
 * @param {*} des not necessarie to have attrib and attrib 2, use skill chat
 */
export function just1Roll(des = { attrib:"-", attrib2:"-", A:0, P:0, B:0, I:-1, C:0, S:0, a:0, s:0, t: 0, h:0, f:0, d:0}) {
    // ajoute les champs attrib et attrib2 si n'existe pas
    if(des.attrib === undefined ) des.attrib = "-"
    if(des.attrib2 == undefined) des.attrib2 = "-"
    des.Actor = '-'
    des.skill = '-'
    lancerDesUi(des)
}

/**
 * launch dice dialog with a textual name of caractere and textual item of this caractere
 * @param {*} aName the textual name of the caractere
 * @param {*} bName the textual name of the item
 * @param {*} code choise betwenn s(kill),c(ompétence), a(ttribut), w(eapons)
 */
export function itemRoll(aName = "-", bName = "-", code ="a"){
    let acteur = game.actors.getName(aName)
    let item = '-'
    let des = { Actor : "-", skill : '-', attrib:'-', attrib2:"-", A:0, P:0, B:0, I:-1, C:0, S:0, a:0, s:0, t: 0, h:0, f:0, d:0}
    if(acteur === undefined)
        acteur = "-"
    else {
        des.Actor = acteur.id
        if(bName != "-")  {
            item = acteur.items.getName(bName)
            if(item == undefined) item = '-'
            else des.skill = item?.id // les attrib sont rempli dans les fonctions
        }
        if(item != null) switch(code){
            case 's':
            case 'c':
                LancerDesUiObj(acteur, item, des)
                break
            case 'a':
                LancerDesUiObj(acteur, item, des)
                break
            case 'w':
                LancerDesUiObj(acteur, item, des)
                break
        }

    }
}