// ==UserScript==
// @name       Shivtr WoW App Filter
// @namespace  http://leothps.com/
// @version    0.1
// @description  Check applications for wowhead copy/paste.
// @match      http://*.shivtr.com/site_applications/*
// @copyright  2014+, LeoTHPS Designs
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var search = {
	// General
	"Berserk": "Increases the caster's attack and movement speeds by",
	
	// Halion
	"Cleave": "Inflicts 75% weapon damage to an enemy and its nearest allies, affecting up to 10 targets",
	"Corporeality": "Phases the caster between the physical and Twilight realms, altering his damage dealt and received in each realm according to his corporeality there",
	"Fiery Combustion": "Engulfs an enemy target in flame,",
	"Flame Breath": "Fire damage to enemies in a cone in front of the caster",
	"Tail Lash": "A sweeping tail strike hits all enemies behind the caster, inflicting ",
	
	// Marrowgar
	"Bone Slice": "Splits 200% of normal melee damage to an enemy and its two nearest allies",
	"Bone Spike Graveyard": "Hurls a massive bone spike which impales any enemies in the way",
	"Bone Storm": "Attacks nearby enemies in a whirlwind of bone",
	
	// Lady Deathwhisper
	"Death and Decay": " Shadow damage inflicted every 1 sec to all targets in the affected area for 10 sec.",
	"Dominate Mind": "Subdues the will of target enemy, causing them to become charmed for 12 sec, with their damage dealt increased by 200% and healing done increased by 500% during that time",
	"Frostbolt": " Frost damage to an enemy and reduces its movement speed by 50% for 4 sec",
	"Frostbolt Volley": " Frost damage to nearby enemies, reducing their movement speed for 4 sec",
	"Mana Barrier": "Envelops the caster in a powerful barrier that continually replenishes any lost health, at the expense of the caster's mana",
	"Physical Vulnerability": "Weakens the constitution of an enemy target, increasing their physical damage taken by 4% for 30 sec",
	"Shadow Bolt": " Shadow damage to an enemy",
	"Slow": "Reduces target's movement speed by 50%, and increases casting time by 50% (25% on player targets) for 15 sec. Slow can only affect one target at a time",
	"Touch of Insignificance": "Reduces the target's threat generation by 20%",
	
	// Deathbringer Saurfang
	"Blood Nova": "Blood explodes outward from a random enemy target, inflicting 1 Physical damage to nearby enemies",
	"Blood Power": "Saurfang grows 1% larger and deals 1% more damage for each point of Blood Power he has",
	"Boiling Blood": "Boils the blood of an enemy, inflicting 5000 Physical damage every 3 sec for 15 sec",
	"Call Blood Beast": "Saurfang calls forth a pair of blood beasts",
	"Frenzy": "Saurfang goes into a frenzy, increasing his attack speed by 30%",
	"Mark of the Fallen Champion": "Deathbringer Saurfang's melee attacks splash to the target, inflicting additional Physical damage. If the target dies while under this effect Saurfang is healed for 5% of his total health",
	"Rune of Blood": "Saurfang's melee attacks leech health from the target. Saurfang is healed for many times amount leeched",
	"Saurfang's Revenge": "Saurfang explodes the heart of his target in a fit of rage, inflicting 200000 to 300000 Physical damage",
	"Scent of Blood": "Saurfang's Blood Beasts catch the scent of blood, reducing all nearby enemies movement speed by 80% and increasing their damage by 300% for 10 sec",
	
	// Festergut
	"Gas Spore": "Unleashes a Gas Spore, inflicting 2 random targets with a gaseous spore.  The Spore will explode after 12 seconds, inflicting 1950 to 2050 damage to all nearby friends.  The damage from the Gas Spore builds the targets immune system, giving them a resistance to the blight",
	"Gastric Bloat": "Inflicts 9750 to 10250 damage and applies Gastric Bloat to the target, increasing damage done by 10% for 1.67 min and will cause a Gastric Explosion at 10 stacks inflicting massive damage to nearby allies",
	"Inhale Blight": "Inhales the Gaseous Blight in the room, increasing damage dealt by 25%",
	"Inhaled Blight": "Inhaling the Gaseous Blight increases damage dealt by 25% and attack speed by 25%",
	"Pungent Blight": "Violently releases the Gaseous Blight, dealing 42900 to 45100 Shadow damage to all enemy players, releasing the deadly Blight back into the room",
	"Vile Gas": "Inflicts a Vile plague in targeted area, inflicting 3900 to 4100 damage every 2 sec for 6 sec. The plague causes the infected targets to vomit uncontrollably inflicting 3900 to 4100 damage to nearby allies",
	
	// Rotface
	"Mutated Infection": "The Mutated Infection inflicts 3413 to 3587 damage every 1 sec and reduces healing received by 50% for 12 sec.  After the Infection is removed a small ooze is created at the target's location",
	"Slime Spray": "Raining Green Ooze. Deals 5363 to 5637 Nature to enemies in cone",
	
	// Professor Putricide
	"Choking Gas Bomb": "Professor Putricide throws Gas Bombs around him, the Gas Bomb deals 5363 to 5637 damage every 1 sec and explodes for 15600 to 16400 damage after 20 sec",
	"Malleable Goo": " damage in a 5 yard radius and slows casting and attack speed by 2",
	"Malleable Goo": " damage and slowing attack and cast speed by 2",
	"Mutated Plague": "Inflicts damage every 3 sec",
	"Mutated Strength": "Increases damage done by 50% and increases attack speed by 50% also attacks cause the caster to become more mutated, inflicting increasing damage every 3 sec",
	"Slime Puddle": "Throws a vial of Mutated Slime, creating a puddle of slime at the targets location",
	"Tear Gas": "You are dazed by the tear gas, preventing you from moving",
	"Tear Gas": "Throws a vial of tear gas, stunning all targets in the room",
	"Unbound Plague": "Inflicts damage every 1 sec, the damage is increased every second the Blight remains on you!  If you get too near to a friendly target, you will transfer the Plague from you to them",
	"Vile Gas": "Inflicts a Vile plague in targeted area, inflicting 3900 to 4100 damage every 2 sec for 6 sec. The plague causes the infected targets to vomit uncontrollably inflicting 3900 to 4100 damage to nearby allies",
	
	// Blood Prince Council
		
		// Prince Valanar
		"Empowered Shock Vortex": "Creates force vortices on all nearby enemies, inflicting 5000 Physical damage and knocking enemies near the target away",
		"Shock Vortex": "Creates a vortex of swirling force near an enemy target that inflicts damage and knocks back enemies near it",
		
		// Prince Keleseth
		"Shadow Resonance": "Summons a Dark Nucleus. Dark Nuclei feed on their own energy, causing them to destroy themselves over time",
		"Shadow Prison": "Binds an enemy. Movement by a bound enemy inflicts 350 initial Shadow damage, increasing by 500 for each second of movement. Remaining motionless for 10 sec will reset the stack",
		"Shadow Lance": "Hurls a bolt of dark magic at an enemy, inflicting 15600 to 16400 Shadow damage",
		"Empowered Shadow Lance": "Hurls a bolt of dark magic at an enemy, inflicting 78000 to 82000 Shadow damage",
		
		// Prince Taldaram
		"Conjure Empowered Flame": "Conjures an empowered ball of flames that flies through the air toward the target and explodes on impact",
		"Conjure Flame": "Conjures a ball of flames that flies through the air toward the target and explodes on impact",
		"Glittering Sparks": "Glittering sparks shoot from the caster's hands in a cone, burning enemies for 12920 to 14280 Fire damage over 8 sec and reducing their movement speed by 20%",
	
	// Blood-Queen Lana'thel
	"Bloodbolt Whirl": "Hurls a bolt of dark blood at the target, dealing 9250 to 10750 damage to the target and surrounding allies within 0a1 yards",
	"Delirious Slash": "Inflicts 50% of weapon damage to an enemy and causes it to bleed for 4500 to 5500 damage per application every 3 sec. for 15 sec",
	"Essence of the Blood Queen": "You are infused with the blood of the Vampyr Queen. Damage done increased by 100%.",
	"Incite Terror": "Strikes fear into enemies, causing them to flee in terror for up to 4 sec",
	"Pact of the Darkfallen": "Deals growing Shadow damage to you and nearby non-linked allies.  This effect expires when all linked targets are within 5 yards of each other",
	"Shroud of Sorrow": "An aura of sorrow and despair emanates from the caster, inflicting 4000 Shadow damage every 2 sec. to nearby enemies",
	"Swarming Shadows": "A swarming void consumes the target, causing a mass of shadows to appear beneath the target every 0.5 seconds",
	"Uncontrollable Frenzy": "Charmed. Increases damage done by 100%. Health increased by 300%. Increases healing done by 1000%",
	
	// Valithria Dreamwalker
	"Nature's Barrier": "When Earth Shield heals a target, the target will gain 300% of the amount healed as an absorb.",
	
	// Sindragosa
	"Blistering Cold": "Deals 30000 Frost damage to enemies within 25 yards",
	"Cleave": "Inflicts normal damage plus 50 to an enemy and its nearest allies, affecting up to 10 targets",
	"Frost Aura": "Deals 2500 Frost damage to all nearby enemies every 3 sec",
	"Frost Beacon": "Marks a target for imprisonment in an Ice Tomb",
	"Frost Breath": "Inflicts 27750 to 32250 Frost damage to enemies in a 60 yard cone in front of the caster. In addition, the targets' attack speed is decreased by",
	"Ice Tomb": "Entombs the targeted foe and all enemies within 10 yards in ice, dealing 15600 to 16400 Frost damage",
	"Icy Grip": "Extend tendrils of frigid wind to pull all nearby enemies to the caster",
	"Mystic Buffet": "Buffets all nearby foes with Arcane energy, increasing all magic damage taken by 10% per application",
	"Permeating Chill": "Causes those who attack Sindragosa with physical attacks to be chilled to the bone, dealing 1000 Frost damage per 2 sec for each application",
	"Tail Smash": "Inflicts 11250 to 18750 damage on enemies within 20 yards of the tail's impact point, knocking them back",
	"Unchained Magic": "Inflicts an arcane malediction on the target, causing any spells cast to result in a backlash of Arcane power after 5 sec.  Multiple spellcasts by the afflicted target will intensify the backlash",
	
	// The Lich King
	"Defile": "Defiles the area under a random target. Any enemies got within this area will be dealt shadow damage and cause the area to grow. Lasts 30s",
	"Fury of Frostmourne": "Deals 1000000 Shadow damage to all enemies and rendering them unable to release spirit or resurrect",
	"Harvest Soul": "Attempts to harvest the target's soul, dealing 7500 Shadow damage per second for 6 sec. If the target is still alive after the channel is completed, the target's soul will be transfered into Frostmourne to be devoured",
	"Harvest Souls": "Attempts to harvest the soul of all nearby enemies, dealing 2000 Shadow damage per second for until cancelled. If a target is still alive after the channel is completed, that target's soul will be transfered into Frostmourne to be devoured.",
	"Infest": "Deals 6598 to 7402 Shadow damage to all enemy players within 0 yards. In addition, the targets will take increasing Shadow damage per second. This effect is removed when the target has more than 90% health",
	"Necrotic Plague": "Infests the target with a deadly plague, causing 50000 Shadow damage every 5 sec for 15 sec. If the target dies while afflicted or the effect ends, this effect will gain an additional stack and jump to a nearby unit. If this effect is dispeled, it will lose a stack and jump to a nearby unit. Whenever this effect jumps, The Lich King's power will increase",
	"Pain and Suffering": "Deals 2828 to 3172 Shadow damage in a cone effect in front of the caster. In addition, the targets will take 500 Shadow damage per second for 3 sec",
	"Quake": "Sends out underground shockwaves, causing the edge of the platform to crumble",
	"Raging Spirit": "Rips out a piece of the target's spirit, causing it to attack them.",
	"Soul Shriek": "Deals 18850 to 21150 Shadow damage to all enemies in a 15 yard cone in front of the caster, silencing them for 5 sec",
	"Raise Dead": "Raises the dead back to life to serve as undead slaves to the Lich King",
	"Remorseless Winter": "Creates a massive winter storm, dealing 7069 to 7931 Frost damage per second to all surrounding enemies within 45 yards",
	"Soul Reaper": "Strikes the target for 50% weapon damage and afflicts the target with Soul Reaper. This effect deals 50000 Shadow damage after 5 sec and increases the caster's haste by 100% for 5 sec",
	"Summon Drudge Ghouls": "Summons 3 Drudge Ghouls over 3 sec",
	"Summon Shadow Trap": "Summons a Shadow Trap that deals 23563 to 26437 Shadow damage to all enemies within 10 yards, knocking them back",
	"Vile Spirits": "Creates 10 Vile Spirits which will attack enemies after 30 seconds",
};

$.each(search, function(k, v) {
	$("div.pad_bottom:contains('" + v + "')").children(".other_text").append(' <font color="#ff0000">(Copied from ' + k + ')</font>');
});