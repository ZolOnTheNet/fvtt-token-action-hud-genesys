var RollType = /* @__PURE__ */ ((RollType2) => {
RollType2[RollType2["Skill"] = 0] = "Skill";
RollType2[RollType2["Attack"] = 1] = "Attack";
RollType2[RollType2["Initiative"] = 2] = "Initiative";
return RollType2;
})(RollType || {});
class DicePrompt extends VueSheet(Application) {
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