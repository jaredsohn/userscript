// ==UserScript==
// @author      Jactari
// @description In MMHK game, in a battle frame, displays a button to simulate fight
// @icon        http://mmhk.jactari.info/images/icone-combat.png
// @include     http://mightandmagicheroeskingdoms.ubi.com/play
// @name        MMHK-Jactari combat
// @namespace   mmhk.jactari.info
// @version     5.2
// ==/UserScript==

var capsule = (function() {

var	H = window.HOMMK || unsafeWindow.HOMMK;

var base_url = 'http://mmhk.jactari.info/';
var url_combat = '';

var _base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var _camps = ['attaquant','defenseur'];
var _camps_abr = ['a','d'];
var _factions = {ACADEMY:0,HAVEN:1,INFERNO:2,NECROPOLIS:3,SYLVAN:4,FORTRESS:5,DUNGEON:6,NEUTRAL:7};
var _rangs = {T1:0, T1P:1, T2:2, T2P:3, T3:4, T3P:5, T4:6, T4P:7, T5:8, T5P:9, T6:10, T6P:11, T7:12, T7P:13, T8:14, T8P:15};
var _neutres = {WIND:64, WATER:65, EARTH:66, FIRE:67, DEATHKNIGHT:68, WOLF:86, GNOMESHOOTER:87, GNOME:85, WANDERINGGHOST:88, MANTICORE:89, MINOTAUR:90};
var _archetypes = {ARCANE_MAGE:0, DISTURBED_WIZARD:1, FANATIC_SORCERER:2, ILLUMINATED_PROTECTOR:3, MERCENARY:4, OUTLAND_WARRIOR:5, PALADIN:6, PIT_WARRIOR:7,
	PROTECTOR:8, WARMAGE:9, WARMASTER:10, WARRIOR_MAGE:11, SENACHAL:12, SOBERED_WIZARD:13, EXPLORER:14};
var _slots = {HEAD:0, NECKLACE:1, RING:2, LEFT_HAND:3, CHEST:4, RIGHT_HAND:5, FEET:6, CAPE:7};
var _sorts = {
	FIST_OF_WRATH:0, WASP_SWARM:1, FIRE_TRAP:2, RAISE_DEAD:3, EARTHQUAKE:4, PHANTOM_FORCES:5, SUMMON_ELEMENTALS:6, FIREWALL:7, CONJURE_PHOENIX:8,
	WEAKNESS:9, SICKNESS:10, GUARD_BREAK:11, DISEASE:12, VULNERABILITY:13, SLOW:14, PLAGUE:15, DEATH_TOUCH:16, WORD_OF_DEATH:17,
	DIVINE_STRENGTH:18, BLESS:19, MYSTIC_SHIELD:20, HASTE:21, RIGHTEOUS_MIGHT:22, DEFLECT_MISSILE:23, TELEPORTATION:24, WORD_OF_LIGHT:25, RESURRECTION:26,
	STONE_SPIKES:27, ELDERTICH_ARROW:28, ICE_BOLT:29, LIGHTNING_BOLT:30, CIRCLE_OF_WINTER:31, FIREBALL:32, METEOR_SHOWER:33, CHAIN_LIGHTNING:34, IMPLOSION:35
};
var _competences_hereditaires = {BARRAGE_FIRE: 'tir_de_barrage', MAGIC_RESISTANCE: 'resistance_magique', SPELL_MASTERY: 'maitrise_des_sorts', RESURRECTION: 'resurrection',
	BATTLE_LOOT: 'butin_de_guerre', CHARACTERISTICS_ILLUMINATION: 'revelation_de_caracteristiques', MORAL_BOOST: 'moral_eleve', TOUGHER_HERO: 'heros_superieur', RAISE_DEAD: 'relever_les_morts'};
var _fortifications = {FORT:1, CITADEL:2, CASTLE:3};

function prepare_troupe(donnees) {
	var u = 0;
	if (donnees.factionEntityTagName == 'NEUTRAL' ) u = _neutres[donnees.tier];
	else {
		var rang = _rangs[donnees.tier];
		var faction = _factions[donnees.factionEntityTagName];
		u = (faction * 16) + (rang & 15) + (faction == 4 ? 5 : 0) + (faction >= 5 ? 11 : 0);
	}
	return {unite:u, nombre:donnees.quantity};
};
function prepare_talent(a,talent) {
	switch (talent.heroClassSkillEntityTagName) {
		case 'ARMY_ATTACK_POWER_INCREASE': a.tacticien = talent.level; break;
		case 'CAVALRY_ATTACK_POWER_INCREASE': a.ecuyer = talent.level; break;
		case 'SHOOTER_ATTACK_POWER_INCREASE': a.tireur_elite = talent.level; break;
		case 'INFANTRY_ATTACK_POWER_INCREASE': a.commandant_infanterie = talent.level; break;
		case 'ARMY_DEFENSE_POWER_INCREASE': break;
		case 'CAVALRY_DEFENSE_POWER_INCREASE': break;
		case 'SHOOTER_DEFENSE_POWER_INCREASE': break;
		case 'INFANTRY_DEFENSE_POWER_INCREASE': break;
		case 'ATTRITION_RATE_DECREASE': a.logisticien = talent.level; break;
		case 'SUMMON_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'SUMMON_SPELLBOOK_SPELL_NUMBER': break;
		case 'SUMMON_SPELL_EFFICIENCY': a.expert[0] = talent.level; break;
		case 'SUMMON_ADDED_MAGIC_POINTS': a.instinct[0] = talent.level; break;
		case 'DARK_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'DARK_SPELLBOOK_SPELL_NUMBER': break;
		case 'DARK_SPELL_EFFICIENCY': a.expert[1] = talent.level; break;
		case 'DARK_ADDED_MAGIC_POINTS': a.instinct[1] = talent.level; break;
		case 'LIGHT_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'LIGHT_SPELLBOOK_SPELL_NUMBER': break;
		case 'LIGHT_SPELL_EFFICIENCY': a.expert[2] = talent.level; break;
		case 'LIGHT_ADDED_MAGIC_POINTS': a.instinct[2] = talent.level; break;
		case 'DESTRUCTION_ADDED_BATTLE_SPELL_LEVEL': a.arcanes = talent.level; break;
		case 'DESTRUCTION_SPELLBOOK_SPELL_NUMBER': break;
		case 'DESTRUCTION_SPELL_EFFICIENCY': a.expert[3] = talent.level; break;
		case 'DESTRUCTION_ADDED_MAGIC_POINTS': a.instinct[3] = talent.level; break;
		case 'UNIT_PRODUCTION_INCREASE': break;
		case 'UNIT_RECRUITMENT_SPEED_INCREASE': break;
		case 'NEUTRAL_STACK_RECRUITMENT_INCREASE': break;
		case 'ATTACK_POWER_PER_UNIT_INCREASE': a.harangueur = talent.level; break;
		case 'SCOUTING_DETECT_LEVEL_INCREASE': break;
		case 'ATTRITION_RATE_INCREASE': a.massacreur = talent.level; break;
		case 'PILLAGE_INCREASE': break;
		case 'DEFENSE_POWER_PER_UNIT_INCREASE': a.bon_payeur = talent.level; break;
	}
};
function prepare_heros(a,heros) {
	a.faction = _factions[heros.factionEntityTagName];
	a.statut = 1;
	a.heros = 1;
	a.niveau = heros._level;
	a.archetype = _archetypes[heros.heroTrainingEntityTagName];
	a.malus_attaque = 0;
};
function prepare_artefacts(a,artefacts) {
	var artefact, slot;
	for (var i = 0; i < artefacts.length; i++ )	{
		artefact = artefacts[i].artefactEntity;
		slot = _slots[artefact.bodyPart];
		a.artefacts[slot] = artefact.id;
	}
};
var heredite = (function() {
	var competences = [];
	var cv = {d:0, w:0, h:0};

	function init() {
		determine_heredite(20);
		function determine_heredite(tentatives) {
			var determinee = false;
			for (var f = 0; f < H.displayedFrameList.length; f++) {
				var frame = H.displayedFrameList[f];
				if (frame.mainElementId == ('ProfileFrame' + H.player.content.id)) {
					determinee = true;
					for (var c = 0; c < frame.content.playerHeredityAbilityList.length; c++) {
						var comp = frame.content.playerHeredityAbilityList[c];
						competences.push(comp);
						var voie = comp.heredityAbilityEntity.rankingPath.substr(0,1).toLowerCase();
						if (comp.bonus == true) cv[voie] = 3;
						else if (comp.malus == true) cv[voie] = 1;
						else cv[voie] = 2;
					}
					H.closeAllOpenedFrames();
				}
			}
			if (!determinee) {
				tentatives--;
				try { H.openPlayerProfileFrame(); } catch (err) {}
				if (tentatives > 0) window.setTimeout(determine_heredite, 500, tentatives);
			}
		}
	}
	return {init:init, competences:competences, cv:cv};
})();

function encode_donnees_combat(donnees) {
	var triplets = [];
	var version = 5;
	triplets[0] |= (version & 63) << 18;
	triplets[0] |= (donnees.d.lieu & 3) << 16;
	triplets[0] |= (donnees.a.statut & 1) << 15;
	triplets[0] |= (donnees.a.heros & 1) << 14;
	triplets[0] |= (donnees.a.cri_de_guerre & 3) << 12;
	triplets[0] |= (donnees.a.inspiration & 3) << 10;
	triplets[0] |= (donnees.a.dolmens & 15) << 6;
	triplets[0] |= (donnees.a.niveau & 63);
	triplets[1] |= (donnees.a.artefacts[0] & 2047) << 13;
	triplets[1] |= (donnees.a.tacticien & 3) << 11;
	triplets[1] |= (donnees.a.artefacts[1] & 2047);
	triplets[2] |= (donnees.a.artefacts[2] & 2047) << 13;
	triplets[2] |= (donnees.a.ecuyer & 3) << 11;
	triplets[2] |= (donnees.a.artefacts[3] & 2047);
	triplets[3] |= (donnees.a.artefacts[4] & 2047) << 13;
	triplets[3] |= (donnees.a.tireur_elite & 3) << 11;
	triplets[3] |= (donnees.a.artefacts[5] & 2047);
	triplets[4] |= (donnees.a.artefacts[6] & 2047) << 13;
	triplets[4] |= (donnees.a.commandant_infanterie & 3) << 11;
	triplets[4] |= (donnees.a.artefacts[7] & 2047);
	triplets[5] |= (donnees.a.logisticien & 3) << 22;
	triplets[5] |= (donnees.a.harangueur & 3) << 20;
	triplets[5] |= (donnees.a.sapeur & 3) << 18;
	triplets[5] |= (donnees.a.massacreur & 3) << 16;
	triplets[5] |= (donnees.a.instinct[0] & 3) << 14;
	triplets[5] |= (donnees.a.expert[0] & 3) << 12;
	triplets[5] |= (donnees.a.instinct[1] & 3) << 10;
	triplets[5] |= (donnees.a.expert[1] & 3) << 8;
	triplets[5] |= (donnees.a.instinct[2] & 3) << 6;
	triplets[5] |= (donnees.a.expert[2] & 3) << 4;
	triplets[5] |= (donnees.a.instinct[3] & 3) << 2;
	triplets[5] |= (donnees.a.expert[3] & 3);
	triplets[6] |= (donnees.a.bonus_ecole[0] & 15) << 20;
	triplets[6] |= (donnees.a.bonus_ecole[1] & 15) << 16;
	triplets[6] |= (donnees.a.bonus_ecole[2] & 15) << 12;
	triplets[6] |= (donnees.a.bonus_ecole[3] & 15) << 8;
	triplets[6] |= (donnees.a.larmes & 31) << 3;
	triplets[6] |= (donnees.a.faction & 7);
	triplets[7] |= (donnees.a.mhr.signe & 1) << 23;
	triplets[7] |= (donnees.a.mhr.valeur & 131071) << 6;
	triplets[7] |= (donnees.a.archetype & 15) << 2;
	triplets[7] |= (donnees.a.arcanes & 3);
	triplets[8] |= (donnees.d.mhr.signe & 1) << 23;
	triplets[8] |= (donnees.d.mhr.valeur & 131071) << 6;
	triplets[8] |= (donnees.d.larmes & 31) << 1;
	triplets[9] |= (donnees.d.statut & 1) << 23;
	triplets[9] |= (donnees.d.heros & 1) << 22;
	triplets[9] |= (donnees.d.fortification & 3) << 20;
	triplets[9] |= (donnees.d.dolmens & 15) << 16;
	triplets[9] |= (donnees.d.forts & 7) << 13;
	triplets[9] |= (donnees.d.fort_principal & 1) << 12;
	triplets[9] |= (donnees.d.ralliement & 3) << 10;
	triplets[9] |= (donnees.d.inspiration & 3) << 8;
	triplets[9] |= (donnees.d.archetype & 15) << 4;
	triplets[9] |= (donnees.d.faction & 7) << 1;
	triplets[10] |= (donnees.d.bonus_ecole[0] & 15) << 20;
	triplets[10] |= (donnees.d.bonus_ecole[1] & 15) << 16;
	triplets[10] |= (donnees.d.bonus_ecole[2] & 15) << 12;
	triplets[10] |= (donnees.d.bonus_ecole[3] & 15) << 8;
	triplets[10] |= (donnees.d.arcanes & 3) << 6;
	triplets[10] |= (donnees.d.niveau & 63);
	triplets[11] |= (donnees.d.artefacts[0] & 2047) << 13;
	triplets[11] |= (donnees.d.tacticien_defenseur & 3) << 11;
	triplets[11] |= (donnees.d.artefacts[1] & 2047);
	triplets[12] |= (donnees.d.artefacts[2] & 2047) << 13;
	triplets[12] |= (donnees.d.ecuyer_defenseur & 3) << 11;
	triplets[12] |= (donnees.d.artefacts[3] & 2047);
	triplets[13] |= (donnees.d.artefacts[4] & 2047) << 13;
	triplets[13] |= (donnees.d.expert_tirs_barrage & 3) << 11;
	triplets[13] |= (donnees.d.artefacts[5] & 2047);
	triplets[14] |= (donnees.d.artefacts[6] & 2047) << 13;
	triplets[14] |= (donnees.d.inebranlable & 3) << 11;
	triplets[14] |= (donnees.d.artefacts[7] & 2047);
	triplets[15] |= (donnees.d.logisticien & 3) << 22;
	triplets[15] |= (donnees.d.bon_payeur & 3) << 20;
	triplets[15] |= (donnees.d.batisseur_fortifications & 3) << 18;
	triplets[15] |= (donnees.d.massacreur & 3) << 16;
	triplets[15] |= (donnees.d.instinct[0] & 3) << 14;
	triplets[15] |= (donnees.d.expert[0] & 3) << 12;
	triplets[15] |= (donnees.d.instinct[1] & 3) << 10;
	triplets[15] |= (donnees.d.expert[1] & 3) << 8;
	triplets[15] |= (donnees.d.instinct[2] & 3) << 6;
	triplets[15] |= (donnees.d.expert[2] & 3) << 4;
	triplets[15] |= (donnees.d.instinct[3] & 3) << 2;
	triplets[15] |= (donnees.d.expert[3] & 3);
	for (var c in _camps) {
		for (var p = 1; p < 8; p++) {
			var u = donnees[_camps_abr[c]].troupes[p].unite;
			if (u == -1) u = 255;
			triplets[15+p+(c*7)] |= (u & 255) << 16;
			triplets[15+p+(c*7)] |= (donnees[_camps_abr[c]].troupes[p].nombre & 65535);
		}
	}
	triplets[30] |= (donnees.a.sort[0].id & 63) << 18;
	triplets[30] |= (donnees.a.sort[0].tour & 15) << 14;
	triplets[30] |= (donnees.a.sort[1].id & 63) << 6;
	triplets[30] |= (donnees.a.sort[1].tour & 15) << 2;
	triplets[30] |= (donnees.saison & 12);
	triplets[31] |= (donnees.d.sort[0].id & 63) << 18;
	triplets[31] |= (donnees.d.sort[0].tour & 15) << 14;
	triplets[31] |= (donnees.d.sort[1].id & 63) << 6;
	triplets[31] |= (donnees.d.sort[1].tour & 15) << 2;
	triplets[31] |= (donnees.saison & 3);
	triplets[32] |= (donnees.a.butin_de_guerre & 15) << 20;
	triplets[32] |= (donnees.a.relever_les_morts & 15) << 16;
	triplets[32] |= (donnees.a.resistance_magique & 15) << 12;
	triplets[32] |= (donnees.a.moral_eleve & 15) << 8;
	triplets[32] |= (donnees.a.resurrection & 15) << 4;
	triplets[32] |= (donnees.a.tir_de_barrage & 15);
	triplets[33] |= (donnees.a.heros_superieur & 15) << 20;
	triplets[33] |= (donnees.a.maitrise_des_sorts & 15) << 16;
	triplets[33] |= (donnees.a.revelation_de_caracteristiques & 15) << 12;
	triplets[33] |= (donnees.d.butin_de_guerre & 15) << 8;
	triplets[33] |= (donnees.d.relever_les_morts & 15) << 4;
	triplets[33] |= (donnees.d.resistance_magique & 15);
	triplets[34] |= (donnees.d.moral_eleve & 15) << 20;
	triplets[34] |= (donnees.d.resurrection & 15) << 16;
	triplets[34] |= (donnees.d.tir_de_barrage & 15) << 12;
	triplets[34] |= (donnees.d.heros_superieur & 15) << 8;
	triplets[34] |= (donnees.d.maitrise_des_sorts & 15) << 4;
	triplets[34] |= (donnees.d.revelation_de_caracteristiques & 15);
	triplets[35] |= (donnees.a.classement_voies & 7) << 21;
	triplets[35] |= (donnees.d.classement_voies & 7) << 18;
	triplets[35] |= (donnees.a.malus_attaque & 63) << 12;
	if (donnees.a.statut == 0) {
		triplets[35] |= (donnees.a.antimagie & 15) << 8;
		triplets[35] |= (donnees.a.baliste & 15) << 4;
		triplets[35] |= (donnees.a.pieges & 15);
	}
	if (donnees.d.statut == 0) {
		triplets[35] |= (donnees.d.antimagie & 15) << 8;
		triplets[35] |= (donnees.d.baliste & 15) << 4;
		triplets[35] |= (donnees.d.pieges & 15);
	}
	var code = '';
	for (var t = 0; t < 36; t++) {
		code += _base64.charAt((triplets[t] >> 18) & 63);
		code += _base64.charAt((triplets[t] >> 12) & 63);
		code += _base64.charAt((triplets[t] >> 6) & 63);
		code += _base64.charAt((triplets[t]) & 63);
	}
	return code;
}

function permalien(frame) {
	var n = document.getElementById('permalien_jactari');
	var donnees = {
		saison:0,
		a:{ statut:1, dolmens:0, cri_de_guerre:0, inspiration:0, heros:0, niveau:1, faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
			tacticien:0, ecuyer:0, tireur_elite:0, commandant_infanterie:0, logisticien:0, harangueur:0, sapeur:0, massacreur:0,
			instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
			sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
			troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
			butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
			maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
		},
		d:{
			statut:0, lieu:0, fortification:0, forts:0, fort_principal:0, dolmens:0, ralliement:0, inspiration:0, heros:0, niveau:1,
			faction:0, archetype:0, artefacts:[0,0,0,0,0,0,0,0],
			tacticien_defenseur:0, ecuyer_defenseur:0, expert_tirs_barrage:0, inebranlable:0, logisticien:0, bon_payeur:0, batisseur_fortifications:0, massacreur:0,
			instinct:[0,0,0,0], expert:[0,0,0,0], arcanes:0, bonus_ecole:[0,0,0,0], larmes:0, mhr:{signe:0, valeur:0},
			sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
			troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
			butin_de_guerre:0, relever_les_morts:0, resistance_magique:0, moral_eleve:0, resurrection:0, tir_de_barrage:0, heros_superieur:0,
			maitrise_des_sorts:0, revelation_de_caracteristiques:0, classement_voies:0
		}
	};
	donnees.saison = H.player.content.worldSeasonNumber;
	var heros = (frame.linkedHero || frame.hero || frame.selectedHero).content;
	prepare_heros(donnees.a, heros);
	if (heros.heroBonuses) {
		var talents = heros.heroBonuses.skills.local;
		if (talents !== undefined) for (var t = 0; t < talents.length; t++) {
			var talent = talents[t];
			prepare_talent(donnees.a, talent);
		}
		var artefacts = heros.heroBonuses.artefacts.local;    
		prepare_artefacts(donnees.a, artefacts);
	}
    if (heros.isMainHero) {
		for (var c in heredite.competences) {
			var competence = heredite.competences[c];
			var c_nom = competence.heredityAbilityEntity.tagName;
			var c_niveau = competence.level;
			donnees.a[_competences_hereditaires[c_nom]] = c_niveau;
		}
		var cv = heredite.cv;
		var c = 0;
		if (cv.d == 0 && cv.w > 0 && cv.h > 0) cv.d = 6 - cv.w - cv.h;
		if (cv.d > 0 && cv.w == 0 && cv.h > 0) cv.w = 6 - cv.d - cv.h;
		if (cv.d > 0 && cv.w > 0 && cv.h == 0) cv.h = 6 - cv.w - cv.d;
		if (cv.d > 0 && cv.w == 0 && cv.h == 0 && cv.d != 2) c = ((cv.d == 3)?1:6);
		if (cv.d == 0 && cv.w > 0 && cv.h == 0 && cv.w != 2) c = ((cv.w == 3)?3:5);
		if (cv.d == 0 && cv.w == 0 && cv.h > 0 && cv.h != 2) c = ((cv.h == 3)?6:1);
		if (cv.d > 0 && cv.w > 0 && cv.h > 0) {
			if (cv.d == 3) c = ((cv.w == 2)?1:2);
			if (cv.w == 3) c = ((cv.d == 2)?3:4);
			if (cv.h == 3) c = ((cv.d == 2)?5:6);
		}
		donnees.a.classement_voies = c;
    }
    var sorts = frame.RoundSpellStackList.elementList;
	for (var i = 0; i < sorts.length; i++) {
		var sort = sorts[i].content;
		donnees.a.sort[i].id = _sorts[sort.spellEntityTagName];
		donnees.a.sort[i].tour = sort.roundPosition;
	}
	var troupes = (frame.attackerUnitStackList || frame.heroUnitStackList || hero.unitStackList).elementList;
	for (var t = 0; t < troupes.length; t++) {
		var troupe = troupes[t].content;
		donnees.a.troupes[troupe.stackPosition] = prepare_troupe(troupe);
	}
	var troupes = (frame.defenderUnitStackList || frame.npcUnitStackList).elementList;
	for (var t = 0; t < troupes.length; t++) {
		var troupe = troupes[t].content;
		var position = troupe.powerPosition || troupe.stackPosition;
		donnees.d.troupes[position] = prepare_troupe(troupe);
	}
	var reconnaissances = frame.content.scoutingResultList;
	if (reconnaissances && reconnaissances.length >= 1) {
		var reco = reconnaissances[0].contentJSON;
		donnees.d.statut = 1;
		if (reco.cityFortificationTagName) {
			donnees.d.fortification = _fortifications[reco.cityFortificationTagName];
		}
		if (reco.heroList && reco.heroList.length >= 1) {
			var heros = reco.heroList[0];
			for (var h = 0; h < reco.heroList.length; h++) {
				if (reco.heroList[h].defense > heros.defense) heros = reco.heroList[h];
			}
			prepare_heros(donnees.d, heros);
			prepare_artefacts(donnees.d, heros.artefactList);
		}
	}
	n.href = url_combat + '?info=' + encode_donnees_combat(donnees);
	return true;
};

function injectAfter(S,A) {
	return function() {
		var arg = Array.prototype.slice.call(arguments, 0);
		arg.unshift(S.apply(this,arguments));
		return A.apply(this, arg);
	};
};

function init() {
	var lang = H.locale.substr(0,2);
	switch (lang) {
		case 'en': url_combat = base_url + 'fight'; break;
		case 'de': url_combat = base_url + 'Kampf'; break;
		case 'ru': url_combat = base_url + 'бой'; break;
		case 'fr':
		default: url_combat = base_url + 'combat'; break;
	};
	var head = document.getElementsByTagName('HEAD')[0];
	var style = head.appendChild(document.createElement('style'));
	style.type = 'text/css';
	style.appendChild(document.createTextNode('#permalien_jactari { position: absolute; top: 60px; left: 362px; width: 16px; height: 17px; background-image: url(' + base_url + 'images/icone-combat.png); z-index: 1000; }'));
	heredite.init();

	function ajout_bouton(r) {
		var frame = this;
		var n;
		var c = frame.getChildElement('Defender');
		if (c) {
			n = document.getElementById('permalien_jactari');
			if (n) n.parentNode.removeChild(n);
			n = document.createElement('a');
			n.id = 'permalien_jactari';
			n.href = url_combat;
			n.title = 'simulation';
			n.target = '_blank';
			n.addEventListener('click', function(E) { return permalien(frame); }, true);
			c.appendChild(n);
		};
		return r;
	};
	H.BattlePrepFrame.prototype.display = injectAfter(H.BattlePrepFrame.prototype.display, ajout_bouton);
	H.ZoneBuildingPortalUpgradeFrame.prototype.display = injectAfter(H.ZoneBuildingPortalUpgradeFrame.prototype.display, ajout_bouton);
};

return {init:init};

}());

document.addEventListener('DOMContentLoaded', capsule.init, true);
