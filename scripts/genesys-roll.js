/* 
 * tentative de reprise de code direct dans genesys.js pour éviter à devoir refaire tout ça
 */
const DicePrompt_vue_vue_type_style_index_0_scoped_a942ba1d_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const VueDicePrompt = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-a942ba1d"]]);
function VueSheet(base) {
  return class extends base {
    constructor() {
      super(...arguments);
      __publicField(this, "form");
      /**
       * Handle for the active Vue app.
       */
      __publicField(this, "vueApp");
      /**
       * Reactive context data that is injected into the active Vue app.
       */
      __publicField(this, "vueContext");
    }
    /**
     * This component must be implemented by children to define the Vue component to use for the sheet.
     */
    get vueComponent() {
      return null;
    }
    /**
     * Similar in purpose to {@link Application.getData}, but with some potentially Vue-specific context data.
     */
    async getVueContext() {
      return void 0;
    }
    async _renderInner(_data, options) {
      var _a2, _b;
      const vueContext = await this.getVueContext();
      if (!this.form) {
        const form = document.createElement("form");
        const cssClass = ((_a2 = vueContext == null ? void 0 : vueContext.data) == null ? void 0 : _a2.cssClass) ?? ((_b = (options == null ? void 0 : options.classes) && (options == null ? void 0 : options.classes)) == null ? void 0 : _b.join(" ")) ?? "";
        form.className = `${cssClass} vue-app`;
        form.setAttribute("autocomplete", "off");
        this.form = form;
      }
      if (!this.vueContext && vueContext) {
        this.vueContext = vt(vueContext);
      }
      if (!this.vueApp) {
        this.vueApp = _l(this.vueComponent);
        this.vueApp.provide(RootContext, this.vueContext);
        this.vueApp.mount(this.form);
      } else if (this.vueContext && vueContext) {
        for (const key of Object.keys(vueContext)) {
          this.vueContext[key] = vueContext[key];
        }
      }
      return $(this.form);
    }
    /**
     * Unmount and destroy the sfc app for this sheet on close.
     */
    async close(options = {}) {
      var _a2;
      (_a2 = this.vueApp) == null ? void 0 : _a2.unmount();
      this.vueApp = void 0;
      this.vueContext = void 0;
      await super.close(options);
    }
    /**
     * Deactivate JQuery event listeners to prevent them triggering multiple times.
     */
    deactivateListeners(html) {
      html.find("img[data-edit]").off("click");
      html.find("input,select,textarea").off("change");
      html.find("button.file-picker").off("click");
    }
    activateListeners(html) {
      this.deactivateListeners(html);
      super.activateListeners(html);
    }
    _activateEditor(_2) {
    }
    async saveEditor(name2, _2 = {}) {
    }
  };
}
var RollType = /* @__PURE__ */ ((RollType2) => {
  RollType2[RollType2["Skill"] = 0] = "Skill";
  RollType2[RollType2["Attack"] = 1] = "Attack";
  RollType2[RollType2["Initiative"] = 2] = "Initiative";
  return RollType2;
})(RollType || {});
export class DicePrompt extends VueSheet(Application) {
  constructor(actor, skillId, { rollType, startingDifficulty, rollUnskilled, rollData } = {}) {
    super();
    __publicField(this, "actor");
    __publicField(this, "skillId");
    __publicField(this, "startingDifficulty");
    __publicField(this, "rollType");
    __publicField(this, "rollUnskilled");
    __publicField(this, "rollData");
    this.actor = actor;
    this.skillId = skillId;
    this.startingDifficulty = startingDifficulty ?? 2;
    this.rollType = rollType ?? 0;
    this.rollUnskilled = rollUnskilled;
    this.rollData = rollData;
  }
  get vueComponent() {
    return VueDicePrompt;
  }
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      classes: ["app-dice-prompt"],
      width: 500
    };
  }
  static async promptForRoll(actor, skillId, options = {}) {
    const app = new DicePrompt(actor, skillId, options);
    await app.render(true);
  }
  static async promptForInitiative(actor, skillId, options = {}) {
    return new Promise((resolve, reject) => {
      const app = new DicePrompt(actor, skillId, {
        ...options,
        rollType: 2,
        rollData: { resolvePromise: resolve, rejectPromise: reject }
      });
      app.render(true);
    });
  }
  get actorSkills() {
    return this.actor.items.filter((i2) => i2.type === "skill");
  }
  async close(options = {}) {
    if (this.rollType === 2) {
      this.rollData.rejectPromise();
    }
    await super.close(options);
  }
  async getVueContext() {
    return {
      actor: this.actor,
      skills: this.actorSkills,
      startingDifficulty: this.startingDifficulty,
      startingSkillId: this.skillId,
      app: this,
      rollType: this.rollType,
      rollUnskilled: this.rollUnskilled,
      rollData: this.rollData
    };
  }
}
// class GenesysRoller {
// 	static async skillRoll({ actor, characteristic, skillId, formula, symbols }) {
// 	  var _a2, _b;
// 	  const roll = new Roll(formula, { symbols });
// 	  await roll.evaluate({ async: true });
// 	  const results = this.parseRollResults(roll);
// 	  let description = void 0;
// 	  if (skillId === "-") {
// 		if (characteristic) {
// 		  description = game.i18n.format("Genesys.Rolls.Description.Characteristic", {
// 			characteristic: game.i18n.localize(`Genesys.Characteristics.${characteristic.capitalize()}`)
// 		  });
// 		}
// 	  } else if (actor) {
// 		if (characteristic) {
// 		  description = game.i18n.format("Genesys.Rolls.Description.Skill", {
// 			skill: ((_a2 = actor.items.get(skillId)) == null ? void 0 : _a2.name) ?? "UNKNOWN",
// 			characteristic: game.i18n.localize(`Genesys.CharacteristicAbbr.${characteristic.capitalize()}`)
// 		  });
// 		} else {
// 		  description = game.i18n.format("Genesys.Rolls.Description.SkillWithoutCharacteristic", {
// 			skill: ((_b = actor.items.get(skillId)) == null ? void 0 : _b.name) ?? "UNKNOWN"
// 		  });
// 		}
// 	  }
// 	  const rollData = {
// 		description,
// 		results
// 	  };
// 	  const html = await renderTemplate("systems/genesys/templates/chat/rolls/skill.hbs", rollData);
// 	  const chatData = {
// 		user: game.user.id,
// 		speaker: { actor: actor == null ? void 0 : actor.id },
// 		rollMode: game.settings.get("core", "rollMode"),
// 		content: html,
// 		type: CONST.CHAT_MESSAGE_TYPES.ROLL,
// 		roll
// 	  };
// 	  await ChatMessage.create(chatData);
// 	}
// 	static async attackRoll({
// 	  actor,
// 	  characteristic,
// 	  skillId,
// 	  formula,
// 	  symbols,
// 	  weapon
// 	}) {
// 	  var _a2, _b;
// 	  const roll = new Roll(formula, { symbols });
// 	  await roll.evaluate({ async: true });
// 	  const results = this.parseRollResults(roll);
// 	  let description = void 0;
// 	  let totalDamage = weapon.systemData.baseDamage;
// 	  let damageFormula = weapon.systemData.baseDamage.toString();
// 	  if (actor && weapon.systemData.damageCharacteristic !== "-") {
// 		totalDamage += actor.system.characteristics[weapon.systemData.damageCharacteristic];
// 		damageFormula = game.i18n.localize(`Genesys.CharacteristicAbbr.${weapon.systemData.damageCharacteristic.capitalize()}`) + ` + ${damageFormula}`;
// 	  }
// 	  if (results.netSuccess > 0) {
// 		totalDamage += results.netSuccess;
// 	  }
// 	  if (skillId === "-") {
// 		if (characteristic) {
// 		  description = game.i18n.format("Genesys.Rolls.Description.AttackCharacteristic", {
// 			name: weapon.name,
// 			characteristic: game.i18n.localize(`Genesys.Characteristics.${characteristic.capitalize()}`)
// 		  });
// 		}
// 	  } else if (actor) {
// 		if (characteristic) {
// 		  description = game.i18n.format("Genesys.Rolls.Description.AttackSkill", {
// 			name: weapon.name,
// 			skill: ((_a2 = actor.items.get(skillId)) == null ? void 0 : _a2.name) ?? "UNKNOWN",
// 			characteristic: game.i18n.localize(`Genesys.CharacteristicAbbr.${characteristic.capitalize()}`)
// 		  });
// 		} else {
// 		  description = game.i18n.format("Genesys.Rolls.Description.AttackSkillWithoutCharacteristic", {
// 			name: weapon.name,
// 			skill: ((_b = actor.items.get(skillId)) == null ? void 0 : _b.name) ?? "UNKNOWN"
// 		  });
// 		}
// 	  }
// 	  const attackQualities = weapon.systemData.qualities;
// 	  await Promise.all(
// 		attackQualities.map(async (quality) => {
// 		  quality.description = await TextEditor.enrichHTML(quality.description, { async: true });
// 		})
// 	  );
// 	  const rollData = {
// 		description,
// 		results,
// 		totalDamage,
// 		damageFormula,
// 		critical: weapon.systemData.critical,
// 		// tbh I can't be assed to implement another Handlebars helper for array length so let's just do undefined. <.<
// 		qualities: weapon.systemData.qualities.length === 0 ? void 0 : attackQualities,
// 		showDamageOnFailure: game.settings.get(NAMESPACE, KEY_SHOW_DAMAGE_ON_FAILURE)
// 	  };
// 	  const html = await renderTemplate("systems/genesys/templates/chat/rolls/attack.hbs", rollData);
// 	  const chatData = {
// 		user: game.user.id,
// 		speaker: { actor: actor == null ? void 0 : actor.id },
// 		rollMode: game.settings.get("core", "rollMode"),
// 		content: html,
// 		type: CONST.CHAT_MESSAGE_TYPES.ROLL,
// 		roll
// 	  };
// 	  await ChatMessage.create(chatData);
// 	}
// 	static parseRollResults(roll) {
// 	  const faces = roll.dice.reduce((faces2, die) => {
// 		const genDie = die;
// 		if (faces2[genDie.denomination] === void 0) {
// 		  faces2[genDie.denomination] = die.results.map((r2) => genDie.getResultLabel(r2));
// 		} else {
// 		  faces2[genDie.denomination].concat(die.results.map((r2) => genDie.getResultLabel(r2)));
// 		}
// 		return faces2;
// 	  }, {});
// 	  const results = Object.values(faces).flatMap((v2) => v2).flatMap((v2) => v2.split("")).filter((v2) => v2 !== " ").reduce(
// 		(results2, result) => {
// 		  results2[result] += 1;
// 		  return results2;
// 		},
// 		{
// 		  a: 0,
// 		  s: 0,
// 		  t: 0,
// 		  h: 0,
// 		  f: 0,
// 		  d: 0
// 		}
// 	  );
// 	  const extraSymbols = roll.data.symbols;
// 	  if (extraSymbols) {
// 		for (const symbol of ["a", "s", "t", "h", "f", "d"]) {
// 		  results[symbol] += extraSymbols[symbol] ?? 0;
// 		}
// 	  }
// 	  results["s"] += results["t"];
// 	  results["f"] += results["d"];
// 	  return {
// 		totalSuccess: results["s"],
// 		totalFailures: results["f"],
// 		totalAdvantage: results["a"],
// 		totalThreat: results["h"],
// 		totalTriumph: results["t"],
// 		totalDespair: results["d"],
// 		netSuccess: results["s"] - results["f"],
// 		netFailure: results["f"] - results["s"],
// 		netAdvantage: results["a"] - results["h"],
// 		netThreat: results["h"] - results["a"],
// 		faces,
// 		extraSymbols
// 	  };
// 	}
//   }