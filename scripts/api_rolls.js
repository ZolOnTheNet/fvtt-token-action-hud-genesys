//import DicePrompt from "/systems/genesys/Genesys.js"
/* Code Dé
* Ability (Green) 	dA
* Proficiency (Yellow) 	dP
* Boost (Blue) 	dB
* Difficulty (Purple) 	dI
* Challenge (Red) 	dC
* Setback (Black) 	dS
*/           
/**
 *
 *
 * @export
 * @param {object} actor
 * @param {object} item
 * @param {object} [cmd={ "code":"" }]
 */
export function lancerDeDes(actor, item, cmd= { "code":"" }){
    let val1 = 0; let val2 = 0
    
    if(item == undefined) item = "-"
    if(item == "-" ){ // lancer de caract
        // actuellement une seul caract
        val1 = actor.system.characteristics["braw"]
        val2 = 0
    } else { // lancer de compétence ou de combat
        val1 = actor.system.characteristics[item.system.characteristic] // la caractéristique du personnage
        val2 = item.system.rank
    }
    let ProD =  Math.min(val1,val2); // le minimum est le nombre de D10
    let AbD = Math.max(val1,val2);
    AbD = AbD - ProD; // le reste est en D6
    let R = new Roll(AbD + "DA+"+ ProD+"dP + 2dI");
    R.evaluate({async :false });
    // Forme de terms (array(3)) contient trois membre chacun avecs D10 et D6 resultat
    
    R.toMessage({
        user: game.user.id,
//        flavor: msgFlavor,
        speaker: ChatMessage.getSpeaker({actor: actor}),
        flags : {msgType : "damage"}
    });
    let description = "Jet de " + item.name + " de " + actor.name
    const results = parseRollResults(R)
    console.log("Resultat",results);
    const rollData = {
        description: description,
        results,
    };
    renderTemplate('systems/genesys/templates/chat/rolls/skill.hbs', rollData).then(html => {
        //console.log("Texte HTLM",html)
        const chatData = {
            user: game.user.id,
            speaker: { actor: actor?.id },
            rollMode: game.settings.get('core', 'rollMode'),
            content: html,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            R
        };
        ChatMessage.create(chatData);

    })
    
    
    if(true)return 
    let AbDr = R.terms[2].results; // le tableau de résultat D6
    let D10r = R.terms[0].results; // le trableau de résultat D10
    let Rr = []; // tableau des résultats
    for(let i = 0; i < D10; i++) {
        Rr.push(D10r[i].result);
    }
    for(let i = 0; i < D6; i++) {
        Rr.push(AbD[i].result);
    }
    console.log("Resultat Eval :",Rr);

}

function parseRollResults(roll) {
    const faces = roll.dice.reduce((faces, die) => {
        const genDie = die;
        if (faces[genDie.denomination] === undefined) {
            faces[genDie.denomination] = die.results.map((r) => genDie.getResultLabel(r));
        }
        else {
            faces[genDie.denomination].concat(die.results.map((r) => genDie.getResultLabel(r)));
        }
        return faces;
    }, {});
    // Get symbols from the dice results.
    const results = Object.values(faces)
        .flatMap((v) => v)
        .flatMap((v) => v.split(''))
        .filter((v) => v !== ' ')
        .reduce((results, result) => {
        results[result] += 1;
        return results;
    }, {
        a: 0,
        s: 0,
        t: 0,
        h: 0,
        f: 0,
        d: 0,
    });
    // Add extra symbols specified by the roll.
    const extraSymbols = roll.data.symbols;
    if (extraSymbols) {
        for (const symbol of ['a', 's', 't', 'h', 'f', 'd']) {
            results[symbol] += extraSymbols[symbol] ?? 0;
        }
    }
    // Threat & Triumph add successes & failures.
    results['s'] += results['t'];
    results['f'] += results['d'];
    return {
        totalSuccess: results['s'],
        totalFailures: results['f'],
        totalAdvantage: results['a'],
        totalThreat: results['h'],
        totalTriumph: results['t'],
        totalDespair: results['d'],
        netSuccess: results['s'] - results['f'],
        netFailure: results['f'] - results['s'],
        netAdvantage: results['a'] - results['h'],
        netThreat: results['h'] - results['a'],
        faces,
        extraSymbols,
    };
}