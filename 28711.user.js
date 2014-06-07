// -*- coding: utf-8 -*-
// ==UserScript==
// @namespace     http://epicwar.baba0rum.com
// @name          EpicFriend
// @version       2.2.5
// @author        Babaorum
// @description   Informations stratégiques supplémentaires pour le jeu EpicWar (version béta)
// @include       http://*.epic-war.net/frames.php*
// @include       http://*.epic-war.net/frame_map.php*
// @include       http://*.epic-war.net/frame_inventaire.php*
// @include       http://*.epic-war.net/frame_escouade.php*
// @include       http://*.epic-war.net/frame_events.php*
// @include       http://*.epic-war.net/soigner.php*
// @include       http://*.epic-war.net/att_p_cac.php*
// @include       http://*.epic-war.net/att_pet.php*
// @include       http://*.epic-war.net/att_ench.php*
// @include       http://*.epic-war.net/obj_util.php*
// @include       http://*.epic-war.net/obj_don_or.php*
// @include       http://*.epic-war.net/obj_donner.php*
// @include       http://*.epic-war.net/dieu_ench.php*
// @include       http://*.epic-war.net/dieu_ench_fin.php*
// @include       http://*.epic-war.net/att_neige.php*
// @include       http://*.epic-war.net/metiers.php*
// @include       http://*.epic-war.net/frame_messagerie.php*
// @include       http://*.epic-war.net/msg_send.php*
// @include       http://*.epic-war.net/index/ind_skeleton.php*
// @require       http://www.baba0rum.com/lib/babadom2.js
// @require       http://roux.lescigales.org/includes/json.js
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_deleteValue
// @grant         GM_log
// @grant         GM_addStyle
// @grant         GM_xmlhttpRequest
// @grant         GM_registerMenuCommand
// ==/UserScript==

/**************************************************************************
 *    O B J E T    P R I N C I P A L
 **************************************************************************/

EpicFriend = {


	/**************************************************************************
	 *    C O N F I G U R A T I O N - P R E F E R E N C E S
	 **************************************************************************/


	// OPTIONS QUE L'UTILISATEUR PEUT MODIFIER
	Preferences : {
		General : {
			MonEscouade : "",
		},
		Inventaire : {
			ObjetFavori01: {
				nom: "",
				code: ""
			},
			ObjetFavori02: {
				nom: "",
				code: ""
			},
			ObjetFavori03: {
				nom: "",
				code: ""
			},
			ObjetFavori04: {
				nom: "",
				code: ""
			},
			ObjetFavori05: {
				nom: "",
				code: ""
			},
			ObjetFavori06: {
				nom: "",
				code: ""
			},
			ObjetFavori07: {
				nom: "",
				code: ""
			},
			ObjetFavori08: {
				nom: "",
				code: ""
			},
			ObjetFavori09: {
				nom: "",
				code: ""
			},
			ObjetFavori10: {
				nom: "",
				code: ""
			},
			ObjetFavori11: {
				nom: "",
				code: ""
			},
			ObjetFavori12: {
				nom: "",
				code: ""
			},
			ObjetFavori13: {
				nom: "",
				code: ""
			},
			ObjetFavori14: {
				nom: "",
				code: ""
			},
			ObjetFavori15: {
				nom: "",
				code: ""
			},
			ObjetFavori16: {
				nom: "",
				code: ""
			},
			ObjetFavori17: {
				nom: "",
				code: ""
			},
			ObjetFavori18: {
				nom: "",
				code: ""
			},
			ObjetFavori19: {
				nom: "",
				code: ""
			},
			ObjetFavori20: {
				nom: "",
				code: ""
			}
		},
		Cibles2 : {
			AfficherTous: true
		},
		MesListesMessagerie : {},
		MobilEpic : {
			CoutAttaque : 7,
			VitesseDeplacement : 7
		},
		Vue : {
			DeplacementRapide : {
				Activer : true
			},
			MemeEscouade : {
				couleurFond : "cyan",
				couleurBord : "black",
				styleBord : "dotted",
				epaisseurBord : "1px",  //valeur numérique en pixel: "1px", "2px", etc
				opacite : "0.55",  //uniquement valable pour le type "point" ou "fond"
				type: "point",  //"bordure" ou "point" ou "fond"
				CSS : "left: 2px !important;",
				Afficher: true
			},
			Fidele : {
				couleurFond : "lime",
				couleurBord : "black",
				styleBord : "dotted",
				epaisseurBord : "1px",  //valeur numérique en pixel: "1px", "2px", etc
				opacite : "0.55",  //uniquement valable pour le type "point" ou "fond"
				type: "point",  //"bordure" ou "point" ou "fond"
				CSS : "left: 2px !important;",
				Afficher: true
			},
			Dieu : {
				couleurFond : "yellow",
				couleurBord : "black",
				styleBord : "dotted",
				epaisseurBord : "1px",  //valeur numérique en pixel: "1px", "2px", etc
				opacite : "0.25",  //uniquement valable pour le type "point" ou "fond"
				type: "fond",  //"bordure" ou "point" ou "fond"
				CSS : "",
				Afficher: true
			},
			Enchantements : {
				SeparateurCodesAbreges : "",
				TaillePolice : 7,   //valeur de pixels
				EpaisseurPolice : "normal",
				CSS: "",
				Afficher : true
			},
			NiveauRace : {
				TaillePolice : 8,   //valeur de pixels
				EpaisseurPolice : "normal",
				CSS: "",
				Afficher : true
			},
			PV : {
				TaillePolice : 8,   //valeur de pixels
				EpaisseurPolice : "normal",
				CSS: "",
				Afficher : true
			},
			PA : {
				CSS: "",
				Afficher : true,
			},
			Divers : {
				TransparenceAnnotations : 0.80,
				DesactiverToutesAnnotations: false,
				AnnoterMonstres : true
			}
		},
		Rapport : {
			CouleurDieu: "darkorange",
			CouleurMemeEscouade: "maroon",
			AfficherMonstres : false
		},
		CouleursRaces : {
			Humain : "mediumvioletred",
			Elfe : "#710000",
			'Mort-vivant' : "#222222",
			MortVivant : "#222222",
			Orque : "#2EC901",
			Nain : "#0701F9",
			Monstre : "#95951F"
		},
		/* les **noms** des propriétés doivent être des chaînes de caractère d'un seul tenant, sans accent ni espace.
		   Il faut reprendre exactement parmi celles définies dans **EpicFriend.CodesEnchantements**  */
		CodesAbregesEnchantements : {
			BenedictionDuGuerrier : "B",
			Resistance : "R",
			ResistanceAccrue : "R",
			DexteriteFeline : "D",
			AlterationVersPerforant : "Pf",
			AlterationVersEnchantement : "En",
			AlterationVersElementaire : "El",
			AlterationVersPsychique : "Ps",
			AlterationVersTranchant : "Tr",
			AlterationVersContondant : "Cn",
			Aura : "A",
			Surpuissance : "C", //buff Constitution
			DeveloppementCerebral : "S", //buff Sagesse
			Furtivite : "F",
			GardeDuCorps : "G",
			ArmeSalvatrice : "As",
			ResistanceAccrue : "R",
			EntravePsychique : "E*",
			Poison : "P*",
			Faiblesse : "F*",
			Maladresse : "M*",
			RuptureDeLien : "L*",
			EntraveAnimale : "E*",
			AlterationVersPsychiqueEnnemi : "Ps*",
			AlterationVersTranchantEnnemi : "Tr*",
			AlterationVersPerforantEnnemi : "Pf*",
			AlterationVersEnchantementEnnemi : "En*",
			AlterationVersElementaireEnnemi : "El*",
			AlterationVersContondantEnnemi : "Cn*"
		},
		CouleursAlignements : {
			Aventurier: "black",
			//~ Combattant: "blue",
			Combattant: "SteelBlue",
			Rodeur: "green",
			'Rôdeur': "green",
			Apprenti: "purple"
		},
		CouleursBlessuresEscouadeEpicVue : {
			Palier0: "black",  //pas blessé
			Palier1: "#471600",
			Palier2: "#710000",
			Palier3: "#9E0000",
			Palier4: "red"  //mourant
		},
		CouleursBlessuresVue : {
			Palier0: "#FFFFCC",  //pas blessé
			Palier1: "yellow",
			Palier2: "#FFCC00",
			Palier3: "#FF6600",
			Palier4: "#FF0000"  //mourant
		},
		VuePartagee : { Activer : true },
		CSS : ""
	},
	
	LocDecorsCarteEsc: {
	// --- Villes ---
		VillageHumain: ["Centre-ville humain", 35, 35, "yellow", "surface"],
		VillageElfe: ["Centre-ville elfe", 105, 105, "yellow", "surface"],
		VillageMV: ["Centre-ville mort-vivant", 35, 105, "yellow", "surface"],
		VillageOrque: ["Centre-ville orque", 105, 35, "yellow", "surface"],
		VillageNain: ["Centre-ville nain", 40, 22, "yellow", "cloaque"],
	// --- Points de résurrection secondaires ---
		PRJolmat: ["PR de la Plaine de Jolmat", 12, 4, "red", "surface"],
		PRForet: ["PR de la Forêt des Murmures", 114, 137, "red", "surface"],
		PRCimetiere: ["PR du Cimetière des Innocents", 5, 112, "red", "surface"],
		PRDesert: ["PR du Désert Infini", 134, 54, "red", "surface"],
		PRCentre: ["PR du Centre", 75, 65, "red", "surface"],
		PRBerges: ["PR des Berges du Pleureur", 63, 39, "red", "surface"],
		PRChemin: ["PR du Chemin Perdu", 72, 102, "red", "surface"],
		PRBourbier: ["PR du Bourbier", 34, 73, "red", "surface"],
		PRDedale: ["PR du Dédale", 41, 26, "red", "souterrain"],
	// --- Téléporteurs ---
		Teleporteur1: ["Téléporteur", 0, 0, "blue", "surface"],
		Teleporteur2: ["Téléporteur", 75, 5, "blue", "surface"],
		Teleporteur3: ["Téléporteur", 69, 69, "blue", "surface"],
		Teleporteur4: ["Téléporteur", 0, 80, "blue", "surface"],
	// --- Temples ---
		TempleBourbier1: ["Temple du Bourbier", 28, 73, "lime", "surface"],
		TempleBourbier2: ["Temple du Bourbier", 29, 73, "lime", "surface"],
		TempleBourbier3: ["Temple du Bourbier", 30, 73, "lime", "surface"],
		TempleBourbier4: ["Temple du Bourbier", 28, 74, "lime", "surface"],
		TempleBourbier5: ["Temple du Bourbier", 29, 74, "lime", "surface"],
		TempleBourbier6: ["Temple du Bourbier", 30, 74, "lime", "surface"],
		TempleBourbier7: ["Temple du Bourbier", 28, 75, "lime", "surface"],
		TempleBourbier8: ["Temple du Bourbier", 29, 75, "lime", "surface"],
		TempleBourbier9: ["Temple du Bourbier", 30, 75, "lime", "surface"],
		TempleForet1: ["Temple de la Forêt des Murmures", 113, 132, "lime", "surface"],
		TempleForet2: ["Temple de la Forêt des Murmures", 114, 132, "lime", "surface"],
		TempleForet3: ["Temple de la Forêt des Murmures", 115, 132, "lime", "surface"],
		TempleForet4: ["Temple de la Forêt des Murmures", 113, 133, "lime", "surface"],
		TempleForet5: ["Temple de la Forêt des Murmures", 114, 133, "lime", "surface"],
		TempleForet6: ["Temple de la Forêt des Murmures", 115, 133, "lime", "surface"],
		TempleForet7: ["Temple de la Forêt des Murmures", 113, 134, "lime", "surface"],
		TempleForet8: ["Temple de la Forêt des Murmures", 114, 134, "lime", "surface"],
		TempleForet9: ["Temple de la Forêt des Murmures", 115, 134, "lime", "surface"],
	// --- Sanctuaires ---
		SanctuaireDesert1: ["Sanctuaire du Désert Infini", 135, 57, "lime", "surface"],
		SanctuaireDesert2: ["Sanctuaire du Désert Infini", 136, 57, "lime", "surface"],
		SanctuaireDesert3: ["Sanctuaire du Désert Infini", 137, 57, "lime", "surface"],
		SanctuaireDesert4: ["Sanctuaire du Désert Infini", 135, 58, "lime", "surface"],
		SanctuaireDesert5: ["Sanctuaire du Désert Infini", 136, 58, "lime", "surface"],
		SanctuaireDesert6: ["Sanctuaire du Désert Infini", 137, 58, "lime", "surface"],
		SanctuaireDesert7: ["Sanctuaire du Désert Infini", 135, 59, "lime", "surface"],
		SanctuaireDesert8: ["Sanctuaire du Désert Infini", 136, 59, "lime", "surface"],
		SanctuaireDesert9: ["Sanctuaire du Désert Infini", 137, 59, "lime", "surface"],
		SanctuaireChemin1: ["Sanctuaire du Chemin Perdu", 69, 95, "lime", "surface"],
		SanctuaireChemin2: ["Sanctuaire du Chemin Perdu", 70, 95, "lime", "surface"],
		SanctuaireChemin3: ["Sanctuaire du Chemin Perdu", 71, 95, "lime", "surface"],
		SanctuaireChemin4: ["Sanctuaire du Chemin Perdu", 69, 96, "lime", "surface"],
		SanctuaireChemin5: ["Sanctuaire du Chemin Perdu", 70, 96, "lime", "surface"],
		SanctuaireChemin6: ["Sanctuaire du Chemin Perdu", 71, 96, "lime", "surface"],
		SanctuaireChemin7: ["Sanctuaire du Chemin Perdu", 69, 97, "lime", "surface"],
		SanctuaireChemin8: ["Sanctuaire du Chemin Perdu", 70, 97, "lime", "surface"],
		SanctuaireChemin9: ["Sanctuaire du Chemin Perdu", 71, 97, "lime", "surface"],
	// --- Guildes des chasseurs de primes ---
		GuildeJolmat1: ["Guilde des chasseurs de primes de la Plaine de Jolmat", 17, 0, "lime", "surface"],
		GuildeJolmat2: ["Guilde des chasseurs de primes de la Plaine de Jolmat", 18, 0, "lime", "surface"],
		GuildeJolmat3: ["Guilde des chasseurs de primes de la Plaine de Jolmat", 17, 1, "lime", "surface"],
		GuildeJolmat4: ["Guilde des chasseurs de primes de la Plaine de Jolmat", 18, 1, "lime", "surface"],
		GuildeCentre1: ["Guilde des chasseurs de primes du Centre", 71, 67, "lime", "surface"],
		GuildeCentre2: ["Guilde des chasseurs de primes du Centre", 72, 67, "lime", "surface"],
		GuildeCentre3: ["Guilde des chasseurs de primes du Centre", 71, 68, "lime", "surface"],
		GuildeCentre4: ["Guilde des chasseurs de primes du Centre", 72, 68, "lime", "surface"],
	// --- Batiments ---
		SortBerges1: ["Marchand de sorts des Berges du Pleureur", 68, 36, "lime", "surface"],
		SortBerges2: ["Marchand de sorts des Berges du Pleureur", 69, 36, "lime", "surface"],
		SortBerges3: ["Marchand de sorts des Berges du Pleureur", 68, 37, "lime", "surface"],
		SortBerges4: ["Marchand de sorts des Berges du Pleureur", 69, 37, "lime", "surface"],
		EcuriesBerges1: ["Ecuries des Berges du Pleureur", 71, 42, "lime", "surface"],
		EcuriesBerges2: ["Ecuries des Berges du Pleureur", 72, 42, "lime", "surface"],
		EcuriesBerges3: ["Ecuries des Berges du Pleureur", 71, 43, "lime", "surface"],
		EcuriesBerges4: ["Ecuries des Berges du Pleureur", 72, 43, "lime", "surface"],
		ArmesCentre1: ["Marchand d armes du Centre", 67, 69, "lime", "surface"],
		ArmesCentre2: ["Marchand d armes du Centre", 68, 69, "lime", "surface"],
		ArmesCentre3: ["Marchand d armes du Centre", 67, 70, "lime", "surface"],
		ArmesCentre4: ["Marchand d armes du Centre", 68, 70, "lime", "surface"],
		EcuriesCimetiere1: ["Ecuries du Cimetière des Innocents", 139, 109, "lime", "surface"],
		EcuriesCimetiere2: ["Ecuries du Cimetière des Innocents", 0, 109, "lime", "surface"],
		EcuriesCimetiere3: ["Ecuries du Cimetière des Innocents", 139, 110, "lime", "surface"],
		EcuriesCimetiere4: ["Ecuries du Cimetière des Innocents", 0, 110, "lime", "surface"],
		ArmuresCimetiere1: ["Marchand d armures du Cimetière des Innocents", 4, 117, "lime", "surface"],
		ArmuresCimetiere2: ["Marchand d armures du Cimetière des Innocents", 5, 117, "lime", "surface"],
		ArmuresCimetiere3: ["Marchand d armures du Cimetière des Innocents", 4, 118, "lime", "surface"],
		ArmuresCimetiere4: ["Marchand d armures du Cimetière des Innocents", 5, 118, "lime", "surface"],
		EchoppeDedale1: ["Echoppe souterraine du Dédale", 36, 24, "lime", "souterrain"],
		EchoppeDedale2: ["Echoppe souterraine du Dédale", 37, 24, "lime", "souterrain"],
		EchoppeDedale3: ["Echoppe souterraine du Dédale", 36, 25, "lime", "souterrain"],
		EchoppeDedale4: ["Echoppe souterraine du Dédale", 37, 25, "lime", "souterrain"],
		EnchantementsDedale1: ["Marchand d enchantements du Dédale", 42, 29, "lime", "souterrain"],
		EnchantementsDedale2: ["Marchand d enchantements du Dédale", 43, 29, "lime", "souterrain"],
		EnchantementsDedale3: ["Marchand d enchantements du Dédale", 42, 30, "lime", "souterrain"],
		EnchantementsDedale4: ["Marchand d enchantements du Dédale", 43, 30, "lime", "souterrain"],
	// --- Batiments humains ---
		ArmesHumain1: ["Marchand d armes humain", 30, 30, "lime", "surface"],
		ArmesHumain2: ["Marchand d armes humain", 31, 30, "lime", "surface"],
		ArmesHumain3: ["Marchand d armes humain", 30, 31, "lime", "surface"],
		ArmesHumain4: ["Marchand d armes humain", 31, 31, "lime", "surface"],
		ArmuresHumain1: ["Marchand d armures humain", 41, 32, "lime", "surface"],
		ArmuresHumain2: ["Marchand d armures humain", 42, 32, "lime", "surface"],
		ArmuresHumain3: ["Marchand d armures humain", 41, 33, "lime", "surface"],
		ArmuresHumain4: ["Marchand d armures humain", 42, 33, "lime", "surface"],
		SortHumain1: ["Marchand de sorts humain", 34, 29, "lime", "surface"],
		SortHumain2: ["Marchand de sorts humain", 35, 29, "lime", "surface"],
		SortHumain3: ["Marchand de sorts humain", 34, 30, "lime", "surface"],
		SortHumain4: ["Marchand de sorts humain", 35, 30, "lime", "surface"],
		EnchantementsHumain1: ["Marchand d enchantements humain", 29, 34, "lime", "surface"],
		EnchantementsHumain2: ["Marchand d enchantements humain", 30, 34, "lime", "surface"],
		EnchantementsHumain3: ["Marchand d enchantements humain", 29, 35, "lime", "surface"],
		EnchantementsHumain4: ["Marchand d enchantements humain", 30, 35, "lime", "surface"],
		EcuriesHumain1: ["Ecuries humaines", 40, 36, "lime", "surface"],
		EcuriesHumain2: ["Ecuries humaines", 41, 36, "lime", "surface"],
		EcuriesHumain3: ["Ecuries humaines", 40, 37, "lime", "surface"],
		EcuriesHumain4: ["Ecuries humaines", 41, 37, "lime", "surface"],
		BazarHumain1: ["Bazar humain", 38, 29, "lime", "surface"],
		BazarHumain2: ["Bazar humain", 39, 29, "lime", "surface"],
		BazarHumain3: ["Bazar humain", 38, 30, "lime", "surface"],
		BazarHumain4: ["Bazar humain", 39, 30, "lime", "surface"],
		AcademieHumain1: ["Académie humaine", 32, 42, "lime", "surface"],
		AcademieHumain2: ["Académie humaine", 33, 42, "lime", "surface"],
		AcademieHumain3: ["Académie humaine", 32, 43, "lime", "surface"],
		AcademieHumain4: ["Académie humaine", 33, 43, "lime", "surface"],
	// --- Batiments elfes ---
		ArmesElfe1: ["Marchand d armes elfe", 110, 105, "lime", "surface"],
		ArmesElfe2: ["Marchand d armes elfe", 111, 105, "lime", "surface"],
		ArmesElfe3: ["Marchand d armes elfe", 110, 106, "lime", "surface"],
		ArmesElfe4: ["Marchand d armes elfe", 111, 106, "lime", "surface"],
		ArmuresElfe1: ["Marchand d armures elfe", 107, 100, "lime", "surface"],
		ArmuresElfe2: ["Marchand d armures elfe", 108, 100, "lime", "surface"],
		ArmuresElfe3: ["Marchand d armures elfe", 107, 101, "lime", "surface"],
		ArmuresElfe4: ["Marchand d armures elfe", 108, 101, "lime", "surface"],
		SortElfe1: ["Marchand de sorts elfe", 100, 101, "lime", "surface"],
		SortElfe2: ["Marchand de sorts elfe", 101, 101, "lime", "surface"],
		SortElfe3: ["Marchand de sorts elfe", 100, 102, "lime", "surface"],
		SortElfe4: ["Marchand de sorts elfe", 101, 102, "lime", "surface"],
		EnchantementsElfe1: ["Marchand d enchantements elfe", 111, 101, "lime", "surface"],
		EnchantementsElfe2: ["Marchand d enchantements elfe", 112, 101, "lime", "surface"],
		EnchantementsElfe3: ["Marchand d enchantements elfe", 111, 102, "lime", "surface"],
		EnchantementsElfe4: ["Marchand d enchantements elfe", 112, 102, "lime", "surface"],
		EcuriesElfe1: ["Ecuries elfes", 103, 98, "lime", "surface"],
		EcuriesElfe2: ["Ecuries elfes", 104, 98, "lime", "surface"],
		EcuriesElfe3: ["Ecuries elfes", 103, 99, "lime", "surface"],
		EcuriesElfe4: ["Ecuries elfes", 104, 99, "lime", "surface"],
		BazarElfe1: ["Bazar elfe", 99, 105, "lime", "surface"],
		BazarElfe2: ["Bazar elfe", 100, 105, "lime", "surface"],
		BazarElfe3: ["Bazar elfe", 99, 106, "lime", "surface"],
		BazarElfe4: ["Bazar elfe", 100, 106, "lime", "surface"],
		AcademieElfe1: ["Académie elfe", 108, 111, "lime", "surface"],
		AcademieElfe2: ["Académie elfe", 109, 111, "lime", "surface"],
		AcademieElfe3: ["Académie elfe", 108, 112, "lime", "surface"],
		AcademieElfe4: ["Académie elfe", 109, 112, "lime", "surface"],
	// --- Batiments mort-vivants ---
		ArmesMV1: ["Marchand d armes mort-vivant", 30, 104, "lime", "surface"],
		ArmesMV2: ["Marchand d armes mort-vivant", 31, 104, "lime", "surface"],
		ArmesMV3: ["Marchand d armes mort-vivant", 30, 105, "lime", "surface"],
		ArmesMV4: ["Marchand d armes mort-vivant", 31, 105, "lime", "surface"],
		ArmuresMV1: ["Marchand d armures mort-vivant", 33, 100, "lime", "surface"],
		ArmuresMV2: ["Marchand d armures mort-vivant", 34, 100, "lime", "surface"],
		ArmuresMV3: ["Marchand d armures mort-vivant", 33, 101, "lime", "surface"],
		ArmuresMV4: ["Marchand d armures mort-vivant", 34, 101, "lime", "surface"],
		SortMV1: ["Marchand de sorts mort-vivant", 40, 102, "lime", "surface"],
		SortMV2: ["Marchand de sorts mort-vivant", 41, 102, "lime", "surface"],
		SortMV3: ["Marchand de sorts mort-vivant", 40, 103, "lime", "surface"],
		SortMV4: ["Marchand de sorts mort-vivant", 41, 103, "lime", "surface"],
		EnchantementsMV1: ["Marchand d enchantements mort-vivant", 41, 106, "lime", "surface"],
		EnchantementsMV2: ["Marchand d enchantements mort-vivant", 42, 106, "lime", "surface"],
		EnchantementsMV3: ["Marchand d enchantements mort-vivant", 41, 107, "lime", "surface"],
		EnchantementsMV4: ["Marchand d enchantements mort-vivant", 42, 107, "lime", "surface"],
		EcuriesMV1: ["Ecuries mort-vivantes", 29, 100, "lime", "surface"],
		EcuriesMV2: ["Ecuries mort-vivantes", 30, 100, "lime", "surface"],
		EcuriesMV3: ["Ecuries mort-vivantes", 29, 101, "lime", "surface"],
		EcuriesMV4: ["Ecuries mort-vivantes", 30, 101, "lime", "surface"],
		BazarMV1: ["Bazar mort-vivant", 37, 100, "lime", "surface"],
		BazarMV2: ["Bazar mort-vivant", 38, 100, "lime", "surface"],
		BazarMV3: ["Bazar mort-vivant", 37, 101, "lime", "surface"],
		BazarMV4: ["Bazar mort-vivant", 38, 101, "lime", "surface"],
		AcademieMV1: ["Académie mort-vivante", 31, 111, "lime", "surface"],
		AcademieMV2: ["Académie mort-vivante", 32, 111, "lime", "surface"],
		AcademieMV3: ["Académie mort-vivante", 31, 112, "lime", "surface"],
		AcademieMV4: ["Académie mort-vivante", 32, 112, "lime", "surface"],
	// --- Batiments orques ---
		ArmesOrque1: ["Marchand d armes orque", 110, 35, "lime", "surface"],
		ArmesOrque2: ["Marchand d armes orque", 111, 35, "lime", "surface"],
		ArmesOrque3: ["Marchand d armes orque", 110, 36, "lime", "surface"],
		ArmesOrque4: ["Marchand d armes orque", 111, 36, "lime", "surface"],
		ArmuresOrque1: ["Marchand d armures orque", 103, 31, "lime", "surface"],
		ArmuresOrque2: ["Marchand d armures orque", 104, 31, "lime", "surface"],
		ArmuresOrque3: ["Marchand d armures orque", 103, 32, "lime", "surface"],
		ArmuresOrque4: ["Marchand d armures orque", 104, 32, "lime", "surface"],
		SortOrque1: ["Marchand de sorts orque", 100, 35, "lime", "surface"],
		SortOrque2: ["Marchand de sorts orque", 101, 35, "lime", "surface"],
		SortOrque3: ["Marchand de sorts orque", 100, 36, "lime", "surface"],
		SortOrque4: ["Marchand de sorts orque", 101, 36, "lime", "surface"],
		EnchantementsOrque1: ["Marchand d enchantements orque", 110, 31, "lime", "surface"],
		EnchantementsOrque2: ["Marchand d enchantements orque", 111, 31, "lime", "surface"],
		EnchantementsOrque3: ["Marchand d enchantements orque", 110, 32, "lime", "surface"],
		EnchantementsOrque4: ["Marchand d enchantements orque", 111, 32, "lime", "surface"],
		EcuriesOrque1: ["Ecuries orques", 99, 31, "lime", "surface"],
		EcuriesOrque2: ["Ecuries orques", 100, 31, "lime", "surface"],
		EcuriesOrque3: ["Ecuries orques", 99, 32, "lime", "surface"],
		EcuriesOrque4: ["Ecuries orques", 100, 32, "lime", "surface"],
		BazarOrque1: ["Bazar orque", 106, 29, "lime", "surface"],
		BazarOrque2: ["Bazar orque", 107, 29, "lime", "surface"],
		BazarOrque3: ["Bazar orque", 106, 30, "lime", "surface"],
		BazarOrque4: ["Bazar orque", 107, 30, "lime", "surface"],
		AcademieOrque1: ["Académie orque", 102, 40, "lime", "surface"],
		AcademieOrque2: ["Académie orque", 103, 40, "lime", "surface"],
		AcademieOrque3: ["Académie orque", 102, 41, "lime", "surface"],
		AcademieOrque4: ["Académie orque", 103, 41, "lime", "surface"],
	// --- Entrées du dédale ---
		EntreeColonnes: ["Entrée du Dédale des colonnes (-> niveau 2 en 35/62)", 14, 57, "lime", "surface"],
		EntreeHumaine: ["Entrée du Dédale humaine (-> niveau 2 en 24/19)", 18, 36, "lime", "surface"],
		EntreeOrque1: ["Entrée du Dédale orque (-> niveau 1 en 3/1)", 120, 23, "lime", "surface"],
		EntreeOrque2: ["Entrée du Dédale orque (-> niveau 1 en 10/11)", 123, 35, "lime", "surface"],
		EntreeInterm: ["Entrée du Dédale niveau 1 (-> niveau 2 en 53/2)", 6, 8, "lime", "souterrain"],
		EntreeMV: ["Entrée du Dédale mort-vivante (-> niveau 2 en 29/50)", 27, 121, "lime", "surface"],
		EntreeElfe: ["Entrée du Dédale elfe (-> niveau 2 en 57/37)", 105, 123, "lime", "surface"],
		SortieColonnes: ["Sortie du Dédale (-> surface en 14/57)", 35, 62, "lime", "souterrain"],
		SortieHumaine: ["Sortie du Dédale humaine (-> surface en 18/36)", 24, 19, "lime", "souterrain"],
		SortieOrque: ["Sortie du Dédale orque (-> niveau 1 en 6/8)", 53, 2, "lime", "souterrain"],
		SortieInterm1: ["Sortie du Dédale niveau 1 (-> surface en 120/23)", 3, 1, "lime", "souterrain"],
		SortieInterm2: ["Sortie du Dédale niveau 1 (-> surface en 123/35)", 10, 11, "lime", "souterrain"],
		SortieElfe: ["Sortie du Dédale elfe (-> surface en 105/123)", 57, 37, "lime", "souterrain"],
		SortieMV: ["Sortie du Dédale mort-vivante (-> surface en 27/121)", 29, 50, "lime", "souterrain"],
	// --- Puits ---
		PuitsHumain: ["Puits humain", 13, 15, "#ddd", "surface"],
		PuitsElfe: ["Puits elfe", 86, 104, "#ddd", "surface"],
		PuitsMV: ["Puits mort-vivant", 10, 109, "#ddd", "surface"],
		PuitsOrque: ["Puits orque", 127, 60, "#ddd", "surface"],
		PuitsDedale: ["Puits du Dédale", 37, 21, "lime", "souterrain"],
	// --- Décors ---
		StatueJolmat1: ["Statue de Jolmat", 21, 25, "#a80", "surface"],
		StatueJolmat2: ["Statue de Jolmat", 22, 25, "#a80", "surface"],
		StatueJolmat3: ["Statue de Jolmat", 21, 26, "#a80", "surface"],
		StatueJolmat4: ["Statue de Jolmat", 22, 26, "#a80", "surface"],
		CactusQuete: ["Cactus", 132, 58, "#465", "surface"],
		CerclePierres: ["Centre du cercle de pierres", 118, 91, "#aa6", "surface"],
		Alcalyse1: ["Gisement d Alcalyse", 33, 1, "#672", "souterrain"],
		Alcalyse2: ["Gisement d Alcalyse", 30, 8, "#672", "souterrain"],
		Alcalyse3: ["Gisement d Alcalyse", 57, 18, "#672", "souterrain"],
		Alcalyse4: ["Gisement d Alcalyse", 44, 22, "#672", "souterrain"],
		Alcalyse5: ["Gisement d Alcalyse", 39, 38, "#672", "souterrain"],
		Alcalyse6: ["Gisement d Alcalyse", 33, 42, "#672", "souterrain"],
		Alcalyse7: ["Gisement d Alcalyse", 50, 43, "#672", "souterrain"],
		Alcalyse8: ["Gisement d Alcalyse", 42, 48, "#672", "souterrain"],
		//~ VieilErmite: ["Vieil ermite blessé", 50, 32, "#888", "souterrain"],
		StatueZirdegalik: ["Statue de Zirdegalik tenant un fléau", 28, 55, "#a80", "souterrain"]
	},
	// ---------- FIN DES OPTIONS QUE L'UTILISATEUR PEUT MODIFIER ------------
	
	
	// AUTRES VARIABLES DE CLASSE: NE PAS MODIFIER
	
	Version : "2.2.5",
	Serveurs : ["venice", "xaeno", "babel"],
	News : "Correctif de la carte partagée pour Firefox v23+",
	Joueurs : [],
	Decors : [],
	CasesVue : [],
	RapportVue : [],
	RapportVueBBCode : [],
	RapportVueCoolForum : [],
	RapportVueLesForums : [],
	JoueursEscouade : [],
	CodesRaces : {
		"1" : "Humain",
		"2" : "Elfe",
		"3" : "Mort-vivant",
		"4" : "Orque",
		"5" : "Nain"
	},
	CodesAlignements : {
		"0" : "Aventurier",
		"1" : "Combattant",
		"10" : "Magicien",
		"11" :  "Enchanteur",
		"12" : "Invocateur",
		"13" : "Berserk",
		"14" : "Fou de guerre",
		"15" : "Hussard",
		"16" : "Garde impérial",
		"17" : "Paladin",
		"18" : "Chevalier noir",
		"19" : "Bandit",
		"2" : "Rôdeur",
		"22" : "Ménestrel",
		"25" : "Mage de guerre",
		"26" : "Sorcier",
		"27" : "Illusionniste",
		"28" : "Elémentaliste",
		"29" : "Nécromant",
		"3" : "Apprenti",
		"30" : "Conjurateur",
		"31" : "Dieu (Berserk)",
		"32" : "Dieu (Fou de guerre)",
		"33" : "Dieu (Hussard)",
		"34" : "Dieu (Garde impérial)",
		"35" : "Dieu (Paladin)",
		"36" : "Dieu (Chevalier noir)",
		"37" : "Dieu (Bandit)",
		"38" : "Dieu (Hors-la-loi)",
		"39" : "Dieu (Troubadour)",
		"4" : "Barbare",
		"40" : "Dieu (Ménestrel)",
		"41" : "Dieu (Assassin)",
		//~ "42" : "Dieu (Pisteur) (ceci n'est PAS un canular ^^)",
		"42" : "Dieu (Pisteur)",
		"43" : "Dieu (Mage de guerre)",
		"44" : "Dieu (Sorcier)",
		"45" : "Dieu (Illusionniste)",
		"46" : "Dieu (Elémentaliste)",
		"47" : "Dieu (Nécromant)",
		"48" : "Dieu (Conjurateur)",
		"49" : "Enfant",
		"5" : "Soldat",
		"7" : "Brigand",
		"8" : "Barde",
		"9" : "Prédateur",
		"6" : "Chevalier",
		"20" : "Hors-la-loi",
		"21" : "Troubadour",
		"23" : "Assassin",
		"24" : "Pisteur"
	},
	CodesEnchantements : {
		bene : "BenedictionDuGuerrier",
		resist : "Resistance",
		feline : "DexteriteFeline",
		a4 : "AlterationVersElementaire",
		a14 : "AlterationVersElementaire",
		a12 : "AlterationVersPerforant",
		a16 : "AlterationVersEnchantement",
		aura : "Aura",
		surpuissance : "Surpuissance",
		cerebral : "DeveloppementCerebral",
		immo : "EntravePsychique",
		furtif : "Furtivite",
		gardecorps2 : "GardeDuCorps",
		salvatrice : "ArmeSalvatrice",
		poison : "Poison",
		faible : "Faiblesse",
		rupture : "RuptureDeLien",
		idiotie : "Idiotie",
		epuisement : "Epuisement",
		stoicisme : "Stoicisme",
		a11 : "AlterationVersTranchant",
		a12 : "AlterationVersPerforant",
		a13: "AlterationVersContondant",
		a14 : "AlterationVersElementaire",
		a15 : "AlterationVersPsychique",
		a16 : "AlterationVersEnchantement",
		a1 : "AlterationVersTranchantEnnemi",
		a2 : "AlterationVersPerforantEnnemi",
		a3: "AlterationVersContondantEnnemi",
		a4 : "AlterationVersElementaireEnnemi",
		a5 : "AlterationVersPsychiqueEnnemi",
		a6 : "AlterationVersEnchantementEnnemi",
		nata : "ArmureNautique",
		maladresse : "Maladresse",
		rupture : "RuptureDeLien",
		immofam : "EntraveAnimale",
		resistfam : "ResistanceAccrue"
	},
	XPParNiveau : [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000, 21000, 23100, 25300, 27600, 30000, 32500, 35100, 37800, 40600, 43500, 46500],
	

	/***********************************************************************
	 *   I N T E R F A C E   D E   V U E
	 ***********************************************************************/

	//fonction d'extraction des chefs d'escouades de la race
	ChefsEscouades : function(listeEsc)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
			{
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						if (xhr.responseText)
						{
							var sHtml = xhr.responseText;
							//~ console.log(/\u00e2/.test(sHtml));
							//~ sHtml = utils.encode(sHtml);
							var oDummyDiv = dom.el("div", { html: sHtml });
							var aLI = dom.tag(oDummyDiv, "li");
							if (utils.defined(listeEsc) && listeEsc != "")
							{
								var sChefs = "";
								var aEscouades = listeEsc.split(/;/);
								for (var n = 0; n < aLI.length; n += 5)
								{
									var sEscouade = aLI[n].textContent.replace(/Nom de l\'escouade *: */, "");
									var sChef = aLI[n+2].textContent.replace(/Chef *: */, "");
									if (aEscouades.indexOf(sEscouade) > -1) //si l'escouade sEscouade est parmi celles recherchées dans aEscouade
										sChefs += (sChefs.length > 0 ? ";" : "") + sChef;
								}
								return sChefs;
							}
							else
							{
								var oDummyDiv2 = dom.el("div", { html: "<p>Choisissez les chefs d'escouade à qui adresser le message</p><p><em>Désolé pour la différence d'encodage des caractères... :-(</em></p>" });
								var oTable = dom.el("table", { id: "escoal_tableau" });
								for (var n = 0; n < aLI.length; n += 5)
								{
									var sEscouade = aLI[n].textContent.replace(/Nom de l\'escouade *: */, "");
									var sChef = aLI[n+2].textContent.replace(/Chef *: */, "");
									dom.add(oTable, dom.add(dom.el("tr"), [
										dom.add(dom.el("td", {}, { backgroundColor: "white", color: "black" }), [
											dom.el("input", { type: "checkbox", name: "checkbox", value: sChef }),
											dom.el("span", { html: sEscouade })
										]),
										dom.el("td", { html: sChef }, { backgroundColor: "white", color: "black" })
									]));
								}
								dom.add(oDummyDiv2, [
									oTable,
									dom.el("button", { type: "button", id: "escoal_button", text: "Générer le message" })
								]);
								ui.popup("escoal", oDummyDiv2.innerHTML,
									{
										title: "Message aux chefs d'escouades",
										anchor: dom.id("map") || null
									},
									null,
									null,
									{ padding: "0.25em" });
								dom.id("escoal_button").addEventListener("click", function()
									{
										var aCheckboxes = dom.get(this.parentNode, "input", { type: "checkbox" });
										var aChefs = [];
										var aEscouades = [];
										for (var n = 0, oBox; oBox = aCheckboxes[n]; n++)
											if (oBox.checked)
											{
												aChefs.push(oBox.value);
												aEscouades.push(oBox.parentNode.textContent);
											}
										if (aChefs.length > 0)
										{
											top.frames[2].location.href = "http://" + serveur + ".epic-war.net/frame_messagerie.php?x=2&dest=" + aChefs.join(";");
										}
									}, true);
							}
						}
					}
				}
			};
		xhr.open("GET", "http://" + serveur + ".epic-war.net/frame_escouade.php?x=3", true);
		xhr.setRequestHeader("Content-type", "text/html; charset=ISO-8859-1");
		//~ xhr.setRequestHeader("Content-type", "text/html; charset=UTF-8");
		xhr.send();
	},
	
	ClassementJoueur : function()
	{
		var sReponse = window.prompt("Nom du joueur", "");
		if (typeof sReponse != "undefined" && sReponse != null)
		{
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function ()
			{
				if (xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						var aA = xhr.responseText.match(/<tr><td>(\d+)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(.+?)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(\d+)<\/td><td>(.*?)<\/td>/);
						if (aA == null) alert("Ce joueur est introuvable dans le classement des joueurs sur " + serveur.charAt(0).toUpperCase() + serveur.substr(1));
						else
						{
							var rang = aA[1], nom = aA[2], race = aA[3], xp = aA[5], niv = aA[6], meurtres = aA[7], offrandes = aA[8], esc = aA[9];
							var alignement = (/N.*?cromant/.test(aA[4]) ? "Nécromant" : 
								/Garde imp.*?rial/.test(aA[4]) ? "Garde impérial" : 
									/Pr.*?dateur/.test(aA[4]) ? "Prédateur" : 
										/R.*?deur/.test(aA[4]) ? "Rôdeur" : 
											/M.*?nestrel/.test(aA[4]) ? "Ménestrel" : 
												/.*?l.*?mentaliste/.test(aA[4]) ? "Elémentaliste" : aA[4]);
							var popup_classement = ui.popup("classement_joueur",
								alignement + " " + race + " niveau " + niv + "<hr/>" + (esc && esc != "" ? "Escouade : " + esc + "<br/>" : "") + "Rang : " + rang + ", " + xp + " XP, " + meurtres + " meurtres, " + offrandes + " offrandes",
								{ title: "Information sur " + sReponse.charAt(0).toUpperCase() + sReponse.substr(1), anchor: dom.id("map") || null },
								{
									fontWeight: "normal",
									fontSize: "11px !important",
									backgroundColor: "white",
									color: "black",
									fontVariant: "normal !important",
									borderSize: "1px",
									borderColor: "#444",
									borderStyle: "solid",
									opacity: 0.75
								},
								{},
								{ padding: "0.25em" });
							dom.style(popup_classement, "fontVariant", "normal");
						}
					}
				}
			};
			xhr.open("GET",
				"http://" + serveur + ".epic-war.net/index/ind_skeleton.php?act=rank_pj&uni=" + (serveur == "venice" ? "1" : serveur == "xaeno" ? "2" : serveur == "babel" ? "3" : "1") + "&race=0&align=0&order=xp&pj=" + sReponse + "&escouade=",
				true);
			xhr.send();
		}
	},
	
	LocalisationJoueur : function()
	{
		var sNom = prompt("Nom du joueur à repérer dans la vue ?");
		if (! (aJ = EpicFriend.Joueurs.filter(function(elt) { return elt.nom.toLowerCase() == sNom.toLowerCase() })))
			window.alert(sNom + " est introuvable...");
		else
		{
			x = aJ[0].x; y = aJ[0].y;
			oCase = document.getElementById("epicfriend_" + x + "_" + y);
			dom.att(oCase, "alt", dom.style(oCase, "backgroundColor"));
			oCase.style.backgroundColor = "yellow";
			sCode = 'var oCase = document.getElementById("epicfriend_' + x + '_' + y + '");';
			sCode += 'oCase.style.backgroundColor = oCase.getAttribute("alt");';
			sCode += 'oCase.removeAttribute("alt");';
			window.setTimeout(sCode, 3000);
		}
	},

	// Amélioration de l'interface utilisateur de la vue/carte
	AmeliorerInterfaceVue : function()
	{
		//menu EpicFriend et mise en forme des liens au-dessus de la vue
		var oDernierItemMenu;
		for(var n = 0, oLien; oLien = dom.tag(document, "a", n); n++)
		{
			if(dom.att(oLien, "class") == "EW_LinkLight")
			{
				dom.style(oLien, { fontSize: "10px" });
				if(/deco\.php/.test(oLien.href)) dom.att(oLien, "id", "deconnexion");
				if(/frame_infocarte\.php/.test(oLien.href))
				{
					dom.att(oLien, "id", "infocarte");
					oDivMenu = oLien.parentNode;
					dom.att(oDivMenu, "id", "epicfriend_commandes_joueur");
				}
			}
		}
		if(document.getElementById("map"))
		{
			EpicFriend.AjouterLienMenu("EpicVue", "#", "Afficher le rapport de vue", "", { id: "epicfriend_afficher_epicvue" });
			dom.id("epicfriend_afficher_epicvue").addEventListener("click", EpicFriend.ConstruireRapportVue, true);
		}
		EpicFriend.AjouterLienMenu("Log", "#", "Afficher le log", "", { id: "epicfriend_afficher_log" });
		EpicFriend.AjouterLienMenu("ADP", "http://www.aidedespics.net/index.php?version=" + (serveur == "venice" ? "1" : serveur == "xaeno" ? "2" : serveur == "babel" ? "3" : "") + (maLoc != ["", ""]? "&menu=cible&x=" + maLoc[0] + "&y=" + maLoc[1] : ""), "Aide des Pics", "_blank");
		EpicFriend.AjouterLienMenu("EpicFriend", "#", "Menu supplémentaire EpicFriend", "", { id: "epicfriend_afficher_menu_supplementaire" });
		dom.id("epicfriend_afficher_menu_supplementaire").addEventListener("click", function(e)
			{
				sHtml = "<p><em>Tapez \"?\" pour afficher l'aide rapide</em></p>";
				sHtml += "<ul>";
				sHtml += "<li><a href=\"http://epicfriend.baba0rum.com\" target=\"_blank\"><strong>Site officiel</strong></a></li>";
				sHtml += "<li><a href=\"http://epicfriend.les-forums.com\" target=\"_blank\"><strong>Forum officiel</strong></a></li>";
				sHtml += "<li><a href=\"http://userscripts.org/scripts/show/28711\" target=\"_blank\"><strong>Projet &mdash; Télécharger</strong></a></li>";
				sHtml += "<li>EpicFriend sur le forum du jeu: serveur <a href=\"http://venice.epic-war.net/forum/detail.php?forumid=1&id=8950&page=1\">Venice</a>, <a href=\"http://xaeno.epic-war.net/forum/detail.php?forumid=1&id=2882&page=1\">Xaeno</a>, <a href=\"http://babel.epic-war.net/forum/detail.php?forumid=1&id=3191&page=1\">Babel</a></li>";
				sHtml += "<li><hr/></li>";
				sHtml += "<li><a href=\"#\" id=\"epicfriend_lien_qui\">Qui ?</a> : classement d'un joueur</li>";
				sHtml += "<li><a href=\"http://www.epic-war.net/index/ind_skeleton.php?act=rank_pj&uni=" + {venice:1, xaeno:2, babel:3}[serveur] + "\" target=\"_blank\">Classement</a> du serveur " + serveur + "</li>";
				sHtml += "<li><a href=\"#\" id=\"epicfriend_lien_ou\">Où ?</a> : montrer un joueur dans la vue</li>";
				sHtml += "<li><a href=\"http://epicwar.baba0rum.com/mobilepic.php?xd=" + maLoc[0] + "&yd=" + maLoc[1] + "&vitesse=" + EpicFriend.Preferences.MobilEpic.VitesseDeplacement + "&atk=" + EpicFriend.Preferences.MobilEpic.CoutAttaque[serveur] + "&pa=" + mesPA[0] + "&pamax=" + mesPA[1] + "\" target=\"f2\">MobilEpic</a> : calculateur de rush</li>";
				sHtml += "<li><a href=\"http://epicwar.baba0rum.com/epicshop/epicshop.html\" target=\"_blank\">EpicShop</a> : tout l'équipement, négoce, offrandes</li>";
				sHtml += "<li><a href=\"http://epicwar.baba0rum.com/epiclog/epiclog.html\" target=\"_blank\">EpicLog</a> : compilateur de rapport</li>";
				//sHtml += "<li><a href=\"http://epicfriend.baba0rum.com/update_log.cgi\" target=\"_blank\">Mise à jour du log</a></li>";
				sHtml += "<li><a href=\"http://epicfriend.baba0rum.com/log_conversion.html\" target=\"blank\">Conversion du log</a> : au nouveau format \"1 perso/serveur\"</li>";
				ui.popup("epicfriend_menu_supplementaire", sHtml, { title: "EpicFriend version " + EpicFriend.Version }, null, null, { padding: "0.5em 1em", fontSize: "10px", fontVariant: "normal" });
				dom.id("epicfriend_lien_qui").addEventListener("click", EpicFriend.ClassementJoueur, true);
				dom.id("epicfriend_lien_ou").addEventListener("click", EpicFriend.LocalisationJoueur, true);
			}, true);
		GM_addStyle("#epicfriend_menu_supplementaire ul { list-style-type: none; padding-left: 0; }");
		if (utils.defined(dom.id("map")))
		{
			//Ajout lien menu options rapides
			var oMapTopLeftTD = dom.tag(dom.id("map").parentNode.parentNode.parentNode, "td", 0);
			var oLien = dom.el("a",
				{
					html: "&#8226;",
					href: "#",
					id: "epicfriend_lien_menu_options_rapides",
					title: "Menu d'options rapides (cliquez pour afficher/cacher)"
				},
				{ color: "orange", textDecoration: "none", fontSize: "10px", lineHeight: "10px", fontWeight: "bold", marginRight: "0px" });
			dom.add(oMapTopLeftTD, oLien);
			oLien.addEventListener("click", function()
				{
					dom.toggleDisplay(dom.id("epicfriend_menu_options_rapides"), "block");
				}
				, true);
			//Ajout menu options rapides
			var oMenuOptionsRapides = ui.popup("epicfriend_menu_options_rapides", "", {anchor: oMapTopLeftTD},
				{
					fontSize: "10px !important",
					width: "15em",
					height: "auto",
					backgroundColor: "white",
					color: "#444",
					opacity: "0.65",
					position: "absolute",
					fontVariant: "normal",
					marginTop: "-5em"
				});
			dom.hide(oMenuOptionsRapides);
			dom.add(dom.get(oMenuOptionsRapides, "div", {class: "babadom2_popup_content"}, 0),
				[
					dom.el("input", { type: "checkbox", id: "epicfriend_coche_deplacement_rapide" }),
					dom.txt("Déplacement rapide"),
					dom.el("br"),
					dom.el("input", { type: "checkbox", id: "epicfriend_coche_grille" }),
					dom.txt("Grille")
				]
			);
			dom.id("epicfriend_coche_deplacement_rapide").checked = EpicFriend.Preferences.Vue.DeplacementRapide.Activer;
			dom.id("epicfriend_coche_deplacement_rapide").addEventListener("click", function()
				{
					for (var nDiv = 0, oDiv ; oDiv = dom.tag(dom.id("map"), "div")[nDiv] ; nDiv++)
						if (dom.hasClass(oDiv, "epicfriend_deplacement_rapide"))
							dom.toggleDisplay(oDiv, "block");
					EpicFriend.Preferences.Vue.DeplacementRapide.Activer = (EpicFriend.Preferences.Vue.DeplacementRapide.Activer ? false : true);
					EpicFriend.SauverPreferences("quiet");
				}, true);
			$("#epicfriend_coche_grille").click(function () { $("#map img.bg").toggleClass("epicfriend_grille"); });
			sStyle = "#epicfriend_menu_options_rapides:hover { display: block; }";
			sStyle += "#map img.epicfriend_grille { outline: 1px dotted #444; }";
			GM_addStyle(sStyle);
		}
		
		//Ajout du lien pour le configurateur d'EpicFriend
		var oLienConfiguration = dom.el("a", {
			id: "epicfriend_lien_configuration",
			title: "Configuration graphique d'EpicFriend",
			text: "EF.Conf",
			class: "EW_LinkLight",
			href: "#"
		}, { fontSize: "10px" });
		oLienConfiguration.addEventListener("click", EpicFriend.InterfaceConfiguration, true);
		dom.before(dom.id("deconnexion"), oLienConfiguration);
		dom.before(dom.id("deconnexion"), dom.txt(" "));
		
		//Remplacement et modification de certaines commandes (au-dessus de la vue)
		for(var nLien = 0, oLien ; oLien = dom.tag(dom.id("epicfriend_commandes_joueur"), "a", nLien) ; nLien++)
		{
			if(dom.att(oLien, "class") == "EW_LinkLight")
			{
				dom.style(oLien, { fontSize: "10px" });
				//Messagerie
				if(/Missive/.test(oLien.textContent))
				{
					var oDummyDiv = dom.el("div");
					dom.add(oDummyDiv,
						dom.add(dom.el("li"),
							dom.el("a", {
								href: "frame_messagerie.php?x=0",
								target: "f2",
								text: "Lire les messages",
								onclick: 'dom.hide(dom.id("ef_vue_popup_messagerie"));'
							 })
						));
					var oLIEcrire = dom.add(dom.el("li"),
						dom.el("a", {
							id: "ef_vue_popup_messagerie_lien_ecrire",
							href: "frame_messagerie.php?x=2",
							target: "f2",
							text: "Ecrire un message...",
							onclick: 'dom.hide(dom.id("ef_vue_popup_messagerie"));'
						}));
					if (utils.defined(EpicFriend.Preferences.MesListesMessagerie) && EpicFriend.Preferences.MesListesMessagerie != {})
					{
						var oSelectListes = dom.add(dom.el("select", { id: "ef_vue_popup_messagerie_select_listes" }, { marginLeft: "0.5em" }),
							dom.el("option", { value: "", text: "Choisir une liste" }, { fontStyle: "italic", color: "silver" }));
						for (var sNomListe in EpicFriend.Preferences.MesListesMessagerie)
							dom.add(oSelectListes, dom.el("option", {
								value: EpicFriend.Preferences.MesListesMessagerie[sNomListe],
								text: sNomListe,
								title: EpicFriend.Preferences.MesListesMessagerie[sNomListe]
							}));
						dom.add(oLIEcrire, oSelectListes);
					}
					dom.add(oDummyDiv, oLIEcrire);
					if (EpicFriend.Preferences.General.MonEscouade != "")
					{
						dom.add(oDummyDiv,
							dom.add(dom.el("li"),
								dom.el("a", {
									href: "frame_messagerie.php?x=2&tm=2&dest=" + EpicFriend.Preferences.General.MonEscouade,
									target: "f2",
									text: "... à mon escouade",
									onclick: 'dom.hide(dom.id("ef_vue_popup_messagerie"));'
								})
							));
					}
					dom.add(oDummyDiv, [
						dom.add(dom.el("li"),
							dom.el("a", {
								href: "javascript:chefsEscouades();",
								text: "... aux chefs d'escouade",
								onclick: 'dom.hide(dom.id("ef_vue_popup_messagerie"));'
							})),
						dom.add(dom.el("li"),
							dom.el("a", {
								href: "frame_messagerie.php?x=1",
								target: "f2",
								text: "Voir les messages envoyés",
								onclick: 'dom.hide(dom.id("ef_vue_popup_messagerie"));'
							}))
					]);
					var oPopupMessagerie = ui.popup("ef_vue_popup_messagerie",
						"<ul>" + oDummyDiv.innerHTML + "</ul>",
						{ title: "Messagerie" },
						null, null, { paddingRight: "0.25em" }
					);
					dom.hide(oPopupMessagerie);
					dom.style(oPopupMessagerie, {
						left: (oLien.offsetLeft + 20) + "px",
						top: (oLien.offsetTop + 30) + "px"
					});
					oLien.addEventListener("mousedown", function()
						{
							dom.show(dom.id("ef_vue_popup_messagerie"), "block");
							dom.id("ef_vue_popup_messagerie_select_listes").selectedIndex = 0;
							dom.id("ef_vue_popup_messagerie_select_listes").previousSibling.href = dom.id("ef_vue_popup_messagerie_select_listes").previousSibling.href.replace(/x=2.*$/, "x=2");
						}, true);
					dom.id("ef_vue_popup_messagerie_select_listes").addEventListener("change", function()
						{
							if (this.selectedIndex > 0)
								dom.id("ef_vue_popup_messagerie_lien_ecrire").href = "frame_messagerie.php?x=2&dest=" + this.options[this.selectedIndex].value;
							else
								dom.id("ef_vue_popup_messagerie_lien_ecrire").href = "frame_messagerie.php?x=2";
						}, true);
					oLien.addEventListener("click", function()
						{
							if (utils.defined(dom.id("ef_vue_popup_messagerie")))
								dom.hide(dom.id("ef_vue_popup_messagerie"));
							oLien.click();
						}, false);
					
					//~ if (EpicFriend.Preferences.General.MonEscouade != "")
					//~ {
						//~ dom.att(
							//~ oLien,
							//~ "onmousedown",
							//~ "return overlib('\
								//~ <li><a href=\"frame_messagerie.php?x=0\" target=\"f2\">Lire les messages</a></li>\
								//~ <li><a href=\"frame_messagerie.php?x=2\" target=\"f2\">Ecrire un message...</a></li>\
								//~ <li><a href=\"frame_messagerie.php?x=2&tm=2&dest=" + EpicFriend.Preferences.General.MonEscouade + "\" target=\"f2\">... à son escouade</a></li>\
								//~ <li><a href=\"javascript:chefsEscouades();\">... aux chefs d\\'escouades</a></li>\
								//~ <li><a href=\"frame_messagerie.php?x=1\" target=\"f2\">Voir les messages envoyés</a></li>\
								//~ ', STICKY, CAPTION, '<b>Messagerie</b>');");
					//~ }
					//~ else
					//~ {
						//~ dom.att(
							//~ oLien,
							//~ "onmousedown",
							//~ "return overlib('\
								//~ <li><a href=\"frame_messagerie.php?x=0\" target=\"f2\">Lire les messages</a></li>\
								//~ <li><a href=\"frame_messagerie.php?x=2\" target=\"f2\">Ecrire un message...</a></li>\
								//~ <li><a href=\"javascript:chefsEscouades();\">... aux chefs d\\'escouades</a></li>\
								//~ <li><a href=\"frame_messagerie.php?x=1\" target=\"f2\">Voir les messages envoyés</a></li>\
								//~ ', STICKY, CAPTION, '<b>Messagerie</b>');");
					//~ }
					//~ dom.att(oLien, "mouseout", "return nd();");
					var nMessages = (/Missive\((\d+)\)/.exec(oLien.textContent))[1];
					if(parseInt(nMessages) > 0) dom.att(oLien, "class", "EW_LinkDark");
				}
			}
		}
		
		//Ajout de la confirmation de déconnexion
		dom.id('deconnexion').setAttribute('href', 'javascript:if(confirm(\'Déconnecter ?\')) location.href=\'deco.php\';');
		
		//Ajout de l'option pour MobilEpic dans chaque infobulle valide (pas un décor)
		if (utils.defined(dom.id("map")))
		{
			var oDivMap = dom.id("map");
			for(var nLien = 0, oLien ; oLien = dom.tag(oDivMap, "a")[nLien] ; nLien++)
			{
				if (utils.defined(dom.att(oLien, "onmouseover")))
				{
					var sOmo = dom.att(oLien, "onmouseover");
					var aA = /<b>(\d+) \/ (\d+)/.exec(sOmo);
					var sX = aA[1]; var sY = aA[2];
					var sOc = dom.att(oLien, "onclick");
					if(/Se déplacer/.test(sOc)  || /déplacement impossible/.test(sOc))
					{
						oLien.setAttribute("onclick", sOc.replace(/(Enchanter<\/a>)/, "$1<li><a href=\"http://epicwar.baba0rum.com/mobilepic.php?xd=" + maLoc[0] + "&yd=" + maLoc[1]+"&xa=" + sX + "&ya=" + sY + "&vitesse=" + EpicFriend.Preferences.MobilEpic.VitesseDeplacement + "&atk=" + EpicFriend.Preferences.MobilEpic.CoutAttaque + "&pa=" + mesPA[0] + "&pamax=" + mesPA[1] + "&style=embedded" + "\" target=f2>Calculer un déplacement (MobilEpic)</a></li>"));
					}
				}
			}
		}
		
		//Recherche de nouvelle version et affichage si nécessaire
		GM_log("recherche de la dernière version");
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://epicwar.baba0rum.com/epicfriend/derniere_version.txt",
			onload : function(response)
			{
				if(response.responseText && response.responseText != "")
				{
					GM_log("réponse: " + response.responseText);
					derniereVersion = response.responseText.split(/\n/)[0];
					var majorDerniere = parseInt((/^(\d+)/.exec(derniereVersion))[1]);
					var majorActuelle = parseInt((/^(\d+)/.exec(EpicFriend.Version))[1]);
					var minorDerniere = parseInt((/^\d+\.(\d+)/.exec(derniereVersion))[1]);
					var minorActuelle = parseInt((/^\d+\.(\d+)/.exec(EpicFriend.Version))[1]);
					if (/^\d+\.\d+\.\d+$/.test(derniereVersion)) var bugDerniere = parseInt((/^\d+\.\d+\.(\d+)$/.exec(derniereVersion))[1]);
					else bugDerniere = 0;
					if (/^\d+\.\d+\.\d+$/.test(EpicFriend.Version)) var bugActuelle = parseInt((/^\d+\.\d+\.(\d+)$/.exec(EpicFriend.Version))[1]);
					else bugActuelle = 0;
					GM_log(derniereVersion);
					GM_log("Version actuelle: " + [majorActuelle, minorActuelle, bugActuelle].join(".") + ", dernière version: " + [majorDerniere, minorDerniere, bugDerniere].join("."));
					//~ if(parseFloat(derniereVersion) > parseFloat(EpicFriend.Version))
					if (majorDerniere >  majorActuelle
						|| (majorDerniere == majorActuelle && minorDerniere > minorActuelle)
						|| (majorDerniere == majorActuelle && minorDerniere == minorActuelle && bugDerniere > bugActuelle))
					{
						dom.add(dom.id("epicfriend_commandes_joueur"), dom.el("a", {
							id: "epicfriend_nouvelle_version",
							text: "Nouvelle version d'EpicFriend : "+derniereVersion+ " !",
							href : "http://userscripts.org/scripts/source/28711.user.js",
							title: "Cliquez ce lien pour installer directement la nouvelle version",
							target: "_blank"
						},
						{
							fontWeight: "bold",
							fontSize: "11px",
							color: "yellow",
							display: "block",
							textAlign: "center"
						}));
					}
				}
			},
			onerror: function()
			{
				GM_log("erreur de recherche de la dernière version en ligne");
			}
		});
		GM_log("recherche terminée");
	},
	
	AjouterLienMenu : function(sTexte, sHref, sTitre, sCible, oAutresParams)
	{
		var oConteneur = dom.id("epicfriend_commandes_joueur");
		dom.add(oConteneur, dom.txt(" "));
		var oLien = dom.el("a", {class:"EW_LinkLight", href:sHref, title:sTitre, text:sTexte, style:"font-size:10px;"});
		if(utils.defined(sCible)) oLien.target = sCible;
		if(typeof oAutresParams != "undefined")
			for(var sNomParam in oAutresParams) oLien.setAttribute(sNomParam, oAutresParams[sNomParam]);
		dom.add(oConteneur, oLien);
	},
	
	AjouterLienMenuEF : function (aParametres)
	{
		if (utils.isArray(aParametres)) //si c'est une liste (Array)
		{
			var s = "<ul style=\"list-style-type:none;padding:0.25em;margin:0.25em;height:120px;overflow:auto;\">";
			for (var nParam = 0, oParam ; oParam = aParametres[nParam] ; nParam++)
			{
				s += "<li>";
				if (utils.defined(oParam.html))
				{
					s += oParam.html
				}
				else
				{
					s += "<a ";
					for (var sProp in oParam)
					{
						if (sProp == "url" && utils.defined(oParam.url)) s += " href=\"" + oParam.url + "\"";
						else if (sProp == "cible" && utils.defined(oParam.cible)) s += " target=\"" + oParam.cible + "\"";
						else if (sProp == "autres" && utils.isObject(oParam.autres))
						{
							var oAutresParams = oParam.autres;
							for (var sProp2 in oAutresParams)
								if (utils.defined(oAutresParams[sProp2])) s += " " + sProp2 + "=\"" + oAutresParams[sProp2] + "\"";
						}
					}
					s += ">" + oParam.texteLien + "</a>";
					if (utils.defined(oParam.texteGeneral))
						s += oParam.texteGeneral
				}
				s += "</li>"
			}
			s += "</ul>";
			EpicFriend.AjouterLienMenu(
				"EpicFriend",
				"javascript:void(0);",
				"Menu supplémentaire d'EpicFriend",
				"",
				{
					onclick: "return overlib('<i>Version " + EpicFriend.Version + "</i><br/><span style=\"color:blue;\">? => aide rapide</span>" + s + "', STICKY, ABOVE, CAPTION, '<b>Menu supplémentaire d\\'EpicFriend</b>');",
					onmouseout: "return nd();",
					id: "epicfriend_menu_epicfriend"
				}
			);
		}
	},
	
	
	/***********************************************************************
	 *   C A R T E    E T    R A P P O R T    D E    V U E
	 ***********************************************************************/
	
	// Peuplement de la base de données JSON des créatures de la carte
	AnalyserJoueurs : function()
	{
		var s = "";
		var aImages = document.getElementById("map").getElementsByTagName("img");
		for(var n=0; n<aImages.length; n++)
		{
			try
			{
				var sRace, sCouleurRace, sAlignement, sCodeAlignement = null, sAlignementInfobulle, sX, sY, sPV = "?", sPVMax = "?", sPA = "?", sPAMax = "?", sNiveau, sNom, aEnchantements = [], sEscouade = "", sCreature; sMA = ""; 
				//Créature monstre (la tempête aussi)
				if(/\/img\/m\/\d\/\d*\.gif/.test(aImages[n].src) 
				 && (dom.att(aImages[n], "class") == "pj" || aImages[n].className.indexOf("tempete") == 0))
				{
					sCreature = "monstre";
					sRace = (aImages[n].className.indexOf("tempete") == 0 ? "Tempête" : "Monstre");
					var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];
					//~ if(/<\/b>Temp.te du [Mm]al/.test(sOmo)) { continue; }
					var sData = "";
					var aA = /<b>(\d+) \/ (\d+).+?<b>(?:Monstre|(?:Temp.te du Mal)) : <\/b>(.+?)<br><u>(?:lvl|Niveau) :<\/u> (\d+)(.*)/.exec(sOmo);
					sX = aA[1]; sY = aA[2]; sNom = aA[3], sNiveau = aA[4]; sData = aA[5];
					sCouleurRace = EpicFriend.Preferences.CouleursRaces[sRace];
					if(/<u>Pv :<\/u>/.test(sData))
					{
						var aA = /<u>Pv :<\/u> (\d+) \/ (\d+)/.exec(sData);
						sPV = aA[1]; sPVMax = aA[2];
					}
					var oJoueur = {
						x : sX,
						y : sY,
						nom : sNom,
						creature : sCreature,
						race : sRace,
						couleurRace : sCouleurRace,
						alignement : "",
						niveau : sNiveau,
						proprio : "",
						PV : sPV,
						PVMax : sPVMax,
						enchantements : []
					};
					EpicFriend.Joueurs.push(oJoueur);
				}
				//joueur
				else if(/\/img\/p\/\d\/(?:\d|\/luxe)/.test(aImages[n].src) && dom.att(aImages[n], "class") == "pj")
				{
					sCreature = "joueur";
					var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\(\'(.+?)\',/)[1];
					if(/<\/b>Temp.te du [Mm]al/.test(sOmo)) { continue; }
					//moi
					if(/Cliquez pour visualiser le menu/.test(sOmo))
					{
						sAlignement = maClasse;
						sRace = maRace;
						sNiveau = monNiveau;
						sEscouade = monEscouade;
						sX = maLoc[0]; sY = maLoc[1];
						var aA = /PV : (\d+) \/ (\d+)/.exec(dom.id("sts_pv").textContent);
						sPV = aA[1]; sPVMax = aA[2];
						sNom = monNom;
						var oDivEnchantements = dom.tag(dom.tag(dom.id("EW_Content_UserStatus"), "td", 0), "div", 1);
						if(dom.tag(oDivEnchantements, "a").length > 0)
							aEnchantements = EpicFriend.ParserEnchantements(oDivEnchantements.innerHTML);
						sPA = mesPA[0]; sPAMax = mesPA[1];
						bFidele = false;
					}
					//n'importe quel autre joueur que moi
					else
					{					
						var sData = "", bFidele = (/<font color=.+?>C.+? un\(e\) de vos fid.les\.<\/font>/.test(sOmo));
						var aA = /<b>(\d+) \/ (\d+).+?<b>(.+?)<\/b>, (.+?) (Humain|Elfe|Orque|Mort\-vivant|Nain) <br>.*?<u>Niveau(?: Divin)? :<\/u> <b>(\d+)<\/b>(.*)/.exec(sOmo);
						sX = aA[1]; sY = aA[2]; sNom = aA[3]; sAlignementAlternatif = aA[4]; sRace = aA[5]; sNiveau = aA[6]; sData = aA[7];
						if(/http:\/\/.+?\.epic\-war\.net\/img\/p\/\d\/\d\/\d_(\d+?)\.gif/.test(aImages[n].src)) var sCodeAlignement = aImages[n].src.match(/http:\/\/.+?\.epic\-war\.net\/img\/p\/\d\/\d\/\d_(\d+?)\.gif/)[1];
						sAlignement = (typeof EpicFriend.CodesAlignements[sCodeAlignement] == "undefined"? sAlignementAlternatif : EpicFriend.CodesAlignements[sCodeAlignement]);
						if(/<u>Escouade :<\/u>/.test(sData)) sEscouade = sData.match(/<u>Escouade :<\/u> (?:<img src=.+?> )?([^<>]+)/)[1];
						if(/<u>Pv :<\/u>/.test(sData)) [, sPV, sPVMax] = /<u>Pv :<\/u> (\d+) \/ (\d+)/.exec(sData);
						if(/<u>Pa :<\/u>/.test(sData)) [, sPA, sPAMax] = /<u>Pa :<\/u> (\d+) \/ (\d+)/.exec(sData);
						if(/<u>Enchantement\(s\) actif\(s\) :<\/u>/.test(sData)) aEnchantements = EpicFriend.ParserEnchantements(sData);
					}
					sCouleurRace = EpicFriend.Preferences.CouleursRaces[sRace];
					//pour tout joueur (moi ou un autre)
					var oJoueur = {
						x : sX,
						y : sY,
						nom : sNom,
						creature : sCreature,
						race : sRace,
						couleurRace : sCouleurRace,
						alignement : sAlignement,
						niveau : sNiveau,
						escouade : sEscouade,
						PV : sPV,
						PVMax : sPVMax,
						PA : sPA,
						PAMax : sPAMax,
						enchantements : aEnchantements,
						fidele: bFidele
					};
					EpicFriend.Joueurs.push(oJoueur);
				}
				//Créature familier
				else if(/\/img\/a\/\d\/\d\d*\.gif/.test(aImages[n].src) && dom.att(aImages[n], "class") == "pj")
				{
					sCreature = "familier";
					var aA = /\/img\/a\/\d\/(\d)\d*/.exec(aImages[n].src);
					sRace = EpicFriend.CodesRaces[aA[1]];
					sCouleurRace = EpicFriend.Preferences.CouleursRaces[sRace];
					sAlignement = "Familier";
					var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];
					if(/<\/b>Temp.te du [Mm]al/.test(sOmo)) { continue; }
					var sData = "", sProprio;
					var aA = /<b>(\d+) \/ (\d+).+?<b>Familier : <\/b>(.+?) \(.+?\)<br><u>Proprio :<\/u> (.+?)<br><u>(?:lvl|Niveau) :<\/u> (\d+)(.*)/.exec(sOmo);
					sX = aA[1]; sY = aA[2]; sNom = aA[3]; sProprio = aA[4]; sNiveau = aA[5]; sData = aA[6];
					if(/<u>Pv :<\/u>/.test(sData))
					{
						var aA = /<u>Pv :<\/u> (\d+) \/ (\d+)/.exec(sData);
						sPV = aA[1]; sPVMax = aA[2];
					}
					if(/<u><hr>Enchantement\(s\) actif\(s\) :<\/u>/.test(sData))
					{
						aEnchantements = EpicFriend.ParserEnchantements(sData);
					}
					var oJoueur = {
						x : sX,
						y : sY,
						nom : sNom,
						creature : sCreature,
						race : sRace,
						couleurRace : sCouleurRace,
						alignement : sAlignement,
						niveau : sNiveau,
						proprio : sProprio,
						PV : sPV,
						PVMax : sPVMax,
						enchantements : aEnchantements
					};
					EpicFriend.Joueurs.push(oJoueur);
				}
				//Créature squelette
				else if(/\/img\/q\/\d\/\d*\.gif/.test(aImages[n].src) && dom.att(aImages[n], "class") == "pj")
				{
					sCreature = "squelette";
					var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];
					if(/<\/b>Temp.te du [Mm]al/.test(sOmo)) { continue; }
					var sData = "";
					var aA = /<b>(\d+) \/ (\d+).+?<b>Squelette : <\/b>(.+?) ((?:Elfe)|(?:Humain)|(?:Orque)|(?:Mort\-vivant)|(?:Nain))<br><u>(?:lvl|Niveau) :<\/u> (\d+)(.*)/.exec(sOmo);
					sX = aA[1]; sY = aA[2]; sAlignement = aA[3]; sRace = aA[4]; sNiveau = aA[5]; sData = aA[6];
					sCouleurRace = EpicFriend.Preferences.CouleursRaces[sRace];
					if(/<u>Pv :<\/u>/.test(sData))
					{
						var aA = /<u>Pv :<\/u> (\d+) \/ (\d+)/.exec(sData);
						sPV = aA[1]; sPVMax = aA[2];
					}
					var oJoueur = {
						x : sX,
						y : sY,
						nom : "",
						creature : sCreature,
						race : sRace,
						couleurRace : sCouleurRace,
						alignement : sAlignement,
						niveau : sNiveau,
						proprio : "",
						PV : sPV,
						PVMax : sPVMax,
						enchantements : []
					};
					EpicFriend.Joueurs.push(oJoueur);
				}
				//Caravane nomade
				else if(/\/img\/b\d?\/\d\/\/53\.gif/.test(aImages[n].src))
				{
					var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];
					var aA = /<b>(\d+) \/ (\d+).*?/.exec(sOmo);
					sX = aA[1]; sY = aA[2];
					var oJoueur = {
						x : sX,
						y : sY,
						nom : "Caravane Nomade",
						creature : "caravane",
						race : "",
						couleurRace : "",
						alignement : "",
						niveau : "",
						proprio : "",
						PV : "",
						PVMax : "",
						enchantements : []
					};
					EpicFriend.Joueurs.push(oJoueur);
				}
				//Gargouille
				else if(/\/img\/b\/0\/\/698\.gif/.test(aImages[n].src))
				{
                    var sOmo = aImages[n].parentNode.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];
                    var aA = /<b>(\d+) \/ (\d+).*?/.exec(sOmo);
					sX = aA[1]; sY = aA[2];
					var oJoueur = {
						x : sX,
						y : sY,
						nom : "Gargouille",
						creature : "gargouille",
						race : "",
						couleurRace : "",
						alignement : "",
						niveau : "",
						proprio : "",
						PV : "",
						PVMax : "",
						enchantements : []
					};
					EpicFriend.Joueurs.push(oJoueur);
					EpicFriend.CasesVue.push({
						x: sX,
						y: sY,
						nom : "Gargouille",
						region: EpicFriend.MaProfondeur(),
						terrain: true,
						decor: "gargouille",
						batiment: null,
						piege: null,
						creature: "gargouille",
						race: null,
						alignement: null,
						niveau: null,
						escouade: null,
						proprietaire: null,
						PV: null,
						PVMax: null,
						enchantements: null,
						fidele: null,
						visible: true
					});
				}
				//Décors: bâtiments, obstacles non franchissables
				else if (/\/img\/b\d?\/\d\//.test(aImages[n].src) && dom.att(aImages[n], "class") == "pj")
				{
					var sOmo = dom.att(aImages[n].parentNode, "onmouseover").match(/return overlib\('(.+?)',/)[1];
					var aA = /<b>(\d+) \/ (\d+) *<\/b>\s*distance : \d+<br><hr>(.*)$/.exec(sOmo);
					var sX = aA[1], sY = aA[2], sNom = aA[3].replace(/\\'/g, "'");
					EpicFriend.Decors.push({
						x : parseInt(sX),
						y : parseInt(sY),
						nom : sNom
					});
				}
			}
			catch(e) {}
			
		}
		
		// [TEST] Nouvelle collection CasesVue
		for (var nlien = 0, lien ; lien = dom.tag(dom.id("map"), "a")[nlien] ; nlien++)
		{
			var omo = dom.att(lien, "onmouseover").replace(/^return overlib\(\'\s*(.+?)\'.*$/, "$1");
			var a = /<b>(\d+) \/ (\d+)/.exec(omo);
			var x = parseInt(a[1]), y = parseInt(a[2]);
			var oCase = {
				x : x,
				y : y,
				nom : null,
				visible : true,
				region: EpicFriend.MaProfondeur(),
				terrain: null,
				decor: null ,
				piege: null ,
				creature: null,
				obj: null
			};
			for (var nimg = 0, img ; img = dom.tag(lien, "img")[nimg] ; nimg++)
			{
				if (dom.att(img, "class") == "ovo") oCase.visible = false;
				if (dom.att(img, "class") == "bg")
				{
					oCase.terrain = true;
					//tester plus tard par type de terrain, selon une liste de correspondances
				}
				if (dom.att(img, "class") == "pj")
				{
					if (/\/img\/b\d?\/.*?\.gif$/.test(img.src))
					{
						oCase.decor = true;
						oCase.obj = EpicFriend.Decors.filter(function(element) { return element.x == x && element.y == y; })[0];
						//à affiner
					}
					if (/\/img\/(?:p|a|q|m)\d?\//.test(img.src))
					{
						oCase.obj = EpicFriend.Joueurs.filter(function(element) { return element.x == x && element.y == y; })[0];
						oCase.creature = true;
					}
				}
			}
			EpicFriend.CasesVue.push(oCase);
		}
	},
	
	// Annotation de la carte du joueur: niveau, race, PV et enchantements, même escouade, fidèles d'un dieu, dieux
	AnnoterVue : function()
	{
		var iCompteur = 0;
		var s = "";
		var nMonX = parseInt(maLoc[0]), nMonY = parseInt(maLoc[1]);
		//~ var aHautGauche = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oOaTCWX8AAADvSURBVFjD7ZjNDcMgDEb5qk7UTTKRxUI5ZoceMpN7SSSE+HEqDD6YUxQJ6fE+iE3AzMHyeAXjwwEd0AEd0AEd0AEd0AHtA0aAI8DmDWqAYlTLXwIjZpgySNliR9jEyEtTBJiYQwTCKJsqp5gKi/53f46OGLc9qiTzFBIa9+I76uu5uaDlH2pqCJDErrUHkZqjTkotyGmlTgJZAoXmv5l0LybvxCmoG8yjlpjMY1/SzTyBnHGKUaksovnv1f3ed/9gecNas9gbx3bOM3hBsiTaYzvttvwp3HTAXtQ5nCmDJbglgCWLNTj1UiepFL2W6we05IRm6htddgAAAABJRU5ErkJggg%3D%3D", -1, -1, "haut_gauche" ];
		//~ var aHaut       = [ nMonX                         , (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oONPFaekAAACgSURBVFjD7dixDYAgFARQjpFs3MOFCAu5h40rnMonY0FhSZGT/yJR0lBXv6/kA8gmSKvrDysAqwAwwJDV7ACLHtclFX8TwUNVOWv3XMFDewBPMqfModusYF386fKoVts4JP8KXLoFkd7NMUAnsx/aZkHLPMAZQ5VA2tqYWfIr6aZQ5AKmd/AKZG4+/VRAV4FjNPKQqIr0PeggQYaaKCBBkrWBrTzRS6UJ2YAAAAAAElFTkSuQmCC", 0, -1, "haut" ];
		//~ var aHautDroite = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oN0N6dHgAAADpSURBVFjD7dgxEsIgEIXh9zK5kYV3sNMLRU5k5y30SmuTOBgDiQgLmVmqFCm+/AwTgCKClkeHxocBDWhAAxrQgAY0oAH3B3SkODLLTrjPDcv9sX1O2CACR2J8ZhNAR8ownmsmXBMF/WpzXK56ScA5rFS5JKA/nSFcznqbgUvVNHCrwBCs9LRuAi5NZwxXot4iMFZNs9wXcA0Ww5Wq9wbGprMmDgC6f3Aag1cg+Qdfuh4A9IMIT7dD8IXj5Vn1ArEDgPv50WS95A2rFu4DmFJRveAWpGa9XRyaGLrln1a2v4q16/1UsAYOAF5+WnHjH+7s9AAAAABJRU5ErkJggg%3D%3D", 1, -1, "haut_droite" ];
		//~ var aGauche     = [ (nMonX == 0 ? 139 : nMonX - 1), nMonY                         , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oNa10FVQAAACrSURBVFjD7djRCYAwDARQT5zITZxIupCf7uCHM8UvRasgoRcpchkgPFKaHoWZNTVX21ReAgoooIACCvhzYBfZPAGXJDKawdsDzDSTg57Ki+yiQedaph6hR+wFleJegSUgBu4GZIFYuAMYAWPgbhMcuTea0ueyZh72VjEyn+I8rLw9yADnSCqQBT4jQ4El4B35KdALToD7qUPkz0J1YUGBVUABBRRQQAH/B9wAErJhF+yvbmQAAAAASUVORK5CYII%3D", -1, 0, "gauche" ];
		//~ var aDroite     = [ (nMonX == 139 ? 0 : nMonX + 1), nMonY                         , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oMaoZ0U0AAACqSURBVFjD7djBDcMgDAVQ/8gb9ZAdcuxCKBN1k67kXhMakQIOtaLvO+gJhP0FzEwi1yTBi0ACCSSQQAJvDtSWRSuwSxjJDGGAK2ApS0BXglEbt5bXQ+bn+wuZgcUL3AQUkVOkF7gZWItsBXcBe5C/gruBXsgjcDKDem8aog/mp+eN2l6xRsCVHon+A1fTZnQEbmijzseaN6gbODosgF8fBBJIIIEEEkhgqT7YHHANaQ7AnAAAAABJRU5ErkJggg%3D%3D", 1, 0, "droite" ];
		//~ var aBasGauche  = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oMN0e4dsAAADdSURBVFjD7dfBEoMgDEXR95j8N8OXx02ZUYpILRAWybZdHG9URqoqLCaRCgBRla3/BUscAIBN33rgBdeBNClYnRtkMK/3gnMonYnIACofiHDNvXy26RAhq1wlZJivdUE6O1TTM4HturFh0MikXYPSQ8uqlIs6rVw6bPufATKLrgSlkd2WGteZ+03WVWvhrurtrxgieuBTQOW9Wq4HtgUYAv3S7UlK864t7DhwHO9M+4tbFrBqPp3tctxPOKjqXLvcdQFy+B6HL0RWn129k7A5uNABzrQgQ50oAMd6MCpcwCse3DntuuWBAAAAABJRU5ErkJggg%3D%3D", -1, 1, "bas_gauche" ];
		//~ var aBas        = [ nMonX                         , (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oLicR3LgAAACqSURBVFjD7ZhBCoAgEEXnRydq0z26kHih7tGmK00rIyJEnEmD/l8rPvxPsaCq8uUM8vEQkIAEJCABCWjLWDsxArqtE0rGzsuuQRXNdjACmhYuhDvnNK84B5ngujv4BOkB53pIrpBecCIiqH2w5py6w0VAmh6SXILzC50XdTfAUqcs/rFiAlo9tPrHiglo8dDDP1ZMwFoPvfxjxb8AhOdP9PSd4uXf/3bwjRyyO1dkNC6wzAAAAABJRU5ErkJggg%3D%3D", 0, 1, "bas" ];
		//~ var aBasDroite  = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oLMkfvZQAAADhSURBVFjD7ZbBDcMgDEVtKxvlkB1y7EKIibJJV3Iv7SUBYifBRpV9Bvz0PsIgM0Ot1m2G5fVmAIDEjOBQJFmUmCEj8lCA6zYPAUkSOM8iDZyHxWlEaweDGjhri3RlkyXklBF5gXFLZDAjulkk6YQoQZoZvAppYRH3s1jSMB33dJvVVGiOZ80s46aGJTFkz6jpJMqmTQuT2PoPFoC4dSd73EXVJKk1/5nsEbV61NVi7xW3KmJJ7F+Lj0VNdw/Ygzxt8rbBE5voblD7yLsaHObDGoABGIABGIABGIABGIB/A/gBzgeByis4vrgAAAAASUVORK5CYII%3D", 1, 1, "bas_droite" ];
		
		//~ var aHautGauche = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAnElEQVRYw%2B2WUQ7AIAhDkewq3P9AXma%2Fi9ENEUqy0O9lr0VTISqVSqWfqRP1mD9fn1%2FIgy1%2B4KYJvTKUAz504AC2OWjKK7YlyQJrTISDVw5w4AHf9E3iG5phJTiMmlOoG6M%2Bmfb0YjM%2BKwIshwVim%2FZ7fzE%2BayDYrasjXknGZ%2FUHb73HnEK1nPH0mA3bD%2BOz%2BoCFsIpb9HE7SSlaN6PtEyos3Z8QAAAAAElFTkSuQmCC", -1, -1, "haut_gauche" ];
		//~ var aHaut       = [ nMonX                      , (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAkklEQVRYw%2B2Uyw3AMAhDSXbx%2FgN5md56a5SCA63EGyCWP8Gs2YJmjL0wfKo38ArPqsxGxG7E9JT0fVyYJVGvVVE1Lh4SpnrVyu9EecevXoTKMe0I%2BstFSdRuu8h3LBhXsF1UOaZPmCVRC1VRNS7uCzNl1RnfiTsdn7OLhWNaHnmXi09R59jFV251Zruwpmmaf3IBV00X3WP51RQAAAAASUVORK5CYII%3D", 0, -1, "haut" ];
		//~ var aHautDroite = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 0 ? 139 : nMonY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAmUlEQVRYw%2B2WwQ2AMAwDQ9RVsv9AXoYHP4SgpHbgEb%2BLLme1tGadTqfTMTOY4WnN4PKOxAR4Y8FOCZExlusZxbx3Vb%2FlxYoxxDt%2FFPMuwKg96xtdN%2BaWeeIbSjw3r%2Bo4QdzzhXGZt6%2FPLvlzQdPznbHa27ke5EtipvOgG4u8XbR3mGAuO%2FPmAmMgT4CjvupP7rHkw13I7vw8O7HuEzZhlatEAAAAAElFTkSuQmCC", 1, -1, "haut_droite" ];
		//~ var aGauche     = [ (nMonX == 0 ? 139 : nMonX - 1), nMonY                      , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAr0lEQVRYw%2B3WQQrAMAgEwEb6Ff%2F%2FID%2FTQ0%2BBgDGuK4V6ThlWY8l1%2FYUp8w7cfPItaVGRiS14XlpUQGI7%2FVBa1PPElp6OtKjhxIZbPGlRdxNjyd3EFaqTuIh0Epeq68TV5DoxR50S08gpMVnFPwTCsNLhUXe5NAQDeT2YsfJbDYyuGTjDa36dlN%2FqTHQFwiEeD2%2FygBlXDH7kr4mRW%2B3yVa1Odn7AF9SI%2F92Gt%2BIH6wGDFxwiESMp4AAAAABJRU5ErkJggg%3D%3D", -1, 0, "gauche" ];
		//~ var aDroite     = [ (nMonX == 139 ? 0 : nMonX + 1), nMonY                      , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAp0lEQVRYw%2B3Y0Q2AIAwEUEq6SvcfyGX8M1EDgfZ6%2FVAG4HEVlNraP27jSJtZFmGrguF8r6q8%2BCSrguN8r9rzApnaqmAHL%2FBiGuEZR9YqedvHquA5jy%2F14tLTE4%2Bi8%2BAHn17qURI23Krgq9TKJ6mJ36dZ%2BSQj8eStqXwyMfHKl1H5JD7x1g1E%2BSQsse%2BSq3wymjjYTCifdCZGnMonYzKJ%2FcSwxvzsl8R3xsne%2FATvEA3RiUAAAAASUVORK5CYII%3D", 1, 0, "droite" ];
		//~ var aBasGauche  = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAkUlEQVRYw%2B2XOxKAIAxE3QxXyf0PxGWsbPwgCruhyA41Ly%2BZOLJtmbVTh2%2BwKDYGka43HvS2qHljFsb1xv%2B8LWrHLGq%2FwbjX9cb99VHAPWxQ99X1xq%2B1csENNnh9bvecbvxUtwh8ZUPQ59ueF5nMonXacxFzOOCe77VmDjgT%2F8CReM3E%2ByC5avHkb4YpLxMJpNZOTtNzBgu7wkWcwAAAABJRU5ErkJggg%3D%3D", -1, 1, "bas_gauche" ];
		//~ var aBas        = [ nMonX                      , (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAk0lEQVRYw%2B2XUQqAIBBEbe%2Fy7n8gL9NHBEIFWu6shvOj0Mcwb3YDU1paWlqaTdtxZKElpbHMm%2FNiwag1oSnu9vTBWyaeqXvUfsCpScxvUFNvjHidPMomBDXvOiYK9UfgDPIDaU78LjRd9tijbBMPcxvqJuB0T8zIqHEyRrxOlWUTghpBx0ShvgInfKpFytq3z%2BTaASgaDens5VFjAAAAAElFTkSuQmCC", 0, 1, "bas" ];
		//~ var aBasDroite  = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 139 ? 0 : nMonY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAABnRSTlMAAAAAAABupgeRAAAAmElEQVRYw%2B2WQQ6AMAgEaf%2By%2F38Qn%2FHkQVO1wlKiYe%2FN7NCUVKTykaj1YE%2BhikijULHMWN131FOollFfURFqrLzn0FOoL8DKXgCNSAXXmO46BQ6iPozaQIXfOM71DhxNHY%2FaSYXNeIHrALyMehg1kQrDHWsWmNIAzgViLkEDGxqAC55vEAWm%2F4S8JXSvsnIlnBtUKpXK37IB1RMcZiNPVeUAAAAASUVORK5CYII%3D", 1, 1, "bas_droite" ];
		
		//~ var aHautGauche = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 0 ? 139 : nMonY - 1), "http://perso.numericable.fr/garneuil/boussole/boussole-0-0.png", -1, -1, "haut_gauche" ];
		//~ var aHaut       = [ nMonX                         , (nMonY == 0 ? 139 : nMonY - 1), "http://perso.numericable.fr/garneuil/boussole/boussole-1-0.png", 0, -1, "haut" ];
		//~ var aHautDroite = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 0 ? 139 : nMonY - 1), "http://perso.numericable.fr/garneuil/boussole/boussole-2-0.png", 1, -1, "haut_droite" ];
		//~ var aGauche     = [ (nMonX == 0 ? 139 : nMonX - 1), nMonY                         , "http://perso.numericable.fr/garneuil/boussole/boussole-0-1.png", -1, 0, "gauche" ];
		//~ var aDroite     = [ (nMonX == 139 ? 0 : nMonX + 1), nMonY                         , "http://perso.numericable.fr/garneuil/boussole/boussole-2-1.png", 1, 0, "droite" ];
		//~ var aBasGauche  = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 139 ? 0 : nMonY + 1), "http://perso.numericable.fr/garneuil/boussole/boussole-0-2.png", -1, 1, "bas_gauche" ];
		//~ var aBas        = [ nMonX                         , (nMonY == 139 ? 0 : nMonY + 1), "http://perso.numericable.fr/garneuil/boussole/boussole-1-2.png", 0, 1, "bas" ];
		//~ var aBasDroite  = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 139 ? 0 : nMonY + 1), "http://perso.numericable.fr/garneuil/boussole/boussole-2-2.png", 1, 1, "bas_droite" ];
		
		var aHautGauche = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 0 ? 139 : nMonY - 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_hautgauche.png", -1, -1, "haut_gauche" ];
		var aHaut       = [ nMonX                         , (nMonY == 0 ? 139 : nMonY - 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_haut.png", 0, -1, "haut" ];
		var aHautDroite = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 0 ? 139 : nMonY - 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_hautdroite.png", 1, -1, "haut_droite" ];
		var aGauche     = [ (nMonX == 0 ? 139 : nMonX - 1), nMonY                         , "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_gauche.png", -1, 0, "gauche" ];
		var aDroite     = [ (nMonX == 139 ? 0 : nMonX + 1), nMonY                         , "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_droite.png", 1, 0, "droite" ];
		var aBasGauche  = [ (nMonX == 0 ? 139 : nMonX - 1), (nMonY == 139 ? 0 : nMonY + 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_basgauche.png", -1, 1, "bas_gauche" ];
		var aBas        = [ nMonX                         , (nMonY == 139 ? 0 : nMonY + 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_bas.png", 0, 1, "bas" ];
		var aBasDroite  = [ (nMonX == 139 ? 0 : nMonX + 1), (nMonY == 139 ? 0 : nMonY + 1), "http://epicfriend.baba0rum.com/img/epicfriend_deplarapide_basdroite.png", 1, 1, "bas_droite" ];
		
		var aDeplacementRapide = [aHautGauche, aHaut, aHautDroite, aGauche, aDroite, aBasGauche, aBas, aBasDroite];

		for(var n = 0, oLien; oLien = document.getElementById("map").getElementsByTagName("a")[n]; n++)
		{
			var sOmo = dom.att(oLien, "onmouseover");
			var sOmo2 = sOmo.match(/^return overlib\(\'(.+?)\',/)[1];
			var aA = sOmo2.match(/<b>(\d+) \/ (\d+) <\/b>/);
			var sX = aA[1], sY = aA[2];
			dom.att(oLien, "id", "epicfriend_vue_lien_" + sX+ "_" + sY);
			var sOc = dom.att(oLien, "onclick");
			
			//on construit un cadre d'annotation qu'il y ait quelque chose à mettre dedans ou pas
			dom.add(oLien,
				dom.el("div",
					{
						id      : "epicfriend_" + sX + "_" + sY,
						"class" : "epicfriend_annotation"
					},
					{
						borderRadius    : "6px",
						position        : "absolute",
						top             : 0,
						left            : 0,
						width           : "40px",
						height          : "40px",
						zIndex          : "999",
						backgroundColor : "none",
						opacity         : EpicFriend.Preferences.Vue.Divers.TransparenceAnnotations,
						fontStyle       : "normal"
					})
				);

			//~ if(/(?:<u>Niveau(?: Divin)? :<\/u>)|(?:Cliquez pour visualiser le menu\.)|(?:[Cc]aravane [Nn]omade)|Gargouille/.test(sOmo) && ! /<\/b>Temp.te du [Mm]al/.test(sOmo))
			//~ if(/(?:<u>Niveau(?: Divin)? :<\/u>)|(?:Cliquez pour visualiser le menu\.)|(?:[Cc]aravane [Nn]omade)|Gargouille/.test(sOmo))
			var aAnnotationIci = EpicFriend.Joueurs.filter(function(element, index, array) { return element.x == sX && element.y == sY; });
			if (aAnnotationIci && aAnnotationIci.length > 0)
			{
				//~ iCompteur++;
				//~ var oJoueur = EpicFriend.Joueurs[iCompteur - 1];
				var oJoueur = aAnnotationIci[0];
				//On saute le tour pour les créatures à ne pas annoter (sous condition(s) pour certaines d'entre elles)
				if (oJoueur.creature == "monstre" && ! EpicFriend.Preferences.Vue.Divers.AnnoterMonstres) continue;
				if (oJoueur.creature == "caravane" || oJoueur.creature == "gargouille") continue;
				if (oJoueur.race == "Tempête") continue;
				//Ajout de l'alignement d'un dieu
				if (/Niveau Divin/.test(sOmo)) oLien.setAttribute("onmouseover", sOmo.replace(/<u>Niveau Divin/, oJoueur.alignement + "<br><u>Niveau Divin"));
				//On ajoute à l'URL du lien de don d'objet le nom du joueur destinataire en clair (pour être utilisé sur la page de don)
				if(/Donner/.test(sOc))
					oLien.setAttribute("onclick", sOc.replace(/<a href=(.+) target=f2>Donner<\/a>/, "<a href=$1&joueur=" + oJoueur.nom + " target=f2>Donner</a>"));	
				//Construction du cadre d'annotations
				//~ var oDivEpicFriend = document.createElement("div");
				var oDivEpicFriend = dom.id("epicfriend_" + oJoueur.x + "_" + oJoueur.y);
				if (! dom.id("epicfriend_" + oJoueur.x + "_" + oJoueur.y)) GM_log("pas de div d'annotation !");
				with(oDivEpicFriend)
				{
					//~ setAttribute("class", "epicfriend_annotation");
					//~ setAttribute("id", "epicfriend_" + oJoueur.x + "_" + oJoueur.y);
					//~ setAttribute("style", "-moz-border-radius: 6px;");
					//~ style.position = "absolute";
					//~ style.top = "0px";
					//~ style.left = "0px";
					//~ style.width = "40px";
					//~ style.height = "40px";
					//~ style.zIndex = "999";
					//~ style.backgroundColor = "none";
					//~ style.opacity = EpicFriend.Preferences.Vue.Divers.TransparenceAnnotations;
					//~ style.fontStyle = "normal";
					setAttribute("onmouseover", "this.style.opacity = 1.0");
					setAttribute("onmouseout", "this.style.opacity = " + EpicFriend.Preferences.Vue.Divers.TransparenceAnnotations);
					//Cibles v2
					if(EpicFriend.Preferences.Cibles2.AfficherTous)
					{
						for(var sNomCible in EpicFriend.Preferences.Cibles2)
						{
							if (sNomCible == "AfficherTous") continue;
							var oCible = EpicFriend.Preferences.Cibles2[sNomCible];
							if(! oCible.afficher) continue;
							var cibleTrouvee = true;
							for(var sCritere in oCible.criteres)
							{
								if(! cibleTrouvee) break;
								if(typeof oJoueur[sCritere] != "undefined")
								{
									var critereJoueur = oJoueur[sCritere];
									var critereTest = oCible.criteres[sCritere];
									if(! /[&\|]/.test(critereTest) && ! /^!/.test(critereTest))
									{
										if(sCritere == "niveau") var condition = eval("oJoueur.niveau" + critereTest);
										else var condition = (critereJoueur == critereTest);
										cibleTrouvee = cibleTrouvee && condition;
									}
									else if(/\|/.test(critereTest))
									{
										var aSousCriteres = critereTest.split(/\|/);
										var critereTrouve = false;
										for(var nsc = 0, sc; sc = aSousCriteres[nsc]; nsc++)
										{
											if(sCritere == "niveau") var condition = eval("oJoueur.niveau" + sc);
											else var condition = (critereJoueur == sc);
											critereTrouve = critereTrouve || condition;
										}
										cibleTrouvee = cibleTrouvee && critereTrouve;
										
									}
									else if(/&/.test(critereTest))
									{
										var aSousCriteres = critereTest.split(/&/);
										var critereTrouve = true;
										for(var nsc = 0, sc; sc = aSousCriteres[nsc]; nsc++)
										{
											if(sCritere == "niveau") var condition = eval("oJoueur.niveau" + sc);
											else var condition = (critereJoueur == sc);
											critereTrouve = critereTrouve && condition;
										}
										cibleTrouvee = cibleTrouvee && critereTrouve;
									}
									else if (/^!/.test(critereTest))
									{
										var nonCritereTest = critereTest.substr(1);
										condition = (critereJoueur != nonCritereTest);
										cibleTrouvee = cibleTrouvee && condition;
									}
								}
								else cibleTrouvee = false;
							}
							if(cibleTrouvee)
							{
								if(oCible.apparence.type == "point")
									dom.add(oDivEpicFriend, oDivCible = dom.el("div", {
										class: "epicfriend_cible2",
										style: "opacity:"+(typeof oCible.apparence.opacite != "undefined" ? oCible.apparence.opacite : 1)+"; position:absolute; top:16px; left:16px; width:8px; height:8px; -moz-border-radius:6px; border:1px solid "+(typeof oCible.apparence.couleurBord != "undefined" ? oCible.apparence.couleurBord : "")+"; background-color:"+(typeof oCible.apparence.couleurFond != "undefined" ? oCible.apparence.couleurFond : "") + "; z-index:998; " +(typeof oCible.apparence.CSS != "undefined" ? oCible.apparence.CSS : "")
									}));
								else if(oCible.apparence.type == "fond")
									dom.add(oDivEpicFriend, oDivCible = dom.el("div", {
										class: "epicfriend_cible2",
										style: "opacity:"+(typeof oCible.apparence.opacite != "undefined" ? oCible.apparence.opacite : 1)+"; position:absolute; top:0px; left:0px; width:40px; height:40px; background-color:"+(typeof oCible.apparence.couleurFond != "undefined" ? oCible.apparence.couleurFond : "") + "; z-index:997; " +(typeof oCible.apparence.CSS != "undefined" ? oCible.apparence.CSS : "")
									}));
								else if(oCible.apparence.type == "bordure")
								{
									style.borderColor = (typeof oCible.apparence.couleurBord != "undefined" ? oCible.apparence.couleurBord : "");
									style.borderWidth = (typeof oCible.apparence.epaisseurBord != "undefined" ? oCible.apparence.epaisseurBord : "");
									style.borderStyle = (typeof oCible.apparence.styleBord != "undefined" ? oCible.apparence.styleBord : "");
								}
							}
						}
					}

					if(oJoueur.creature == "joueur")
					{
						//Si un de mes fidèles
						if(oJoueur.fidele && EpicFriend.Preferences.Vue.Fidele.Afficher)
						{
							if(EpicFriend.Preferences.Vue.Fidele.type == "point")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_fidele",
									style: "opacity:"+EpicFriend.Preferences.Vue.Fidele.opacite+"; position:absolute; top:16px; left:16px; width:8px; height:8px; -moz-border-radius:6px; border:1px solid "+EpicFriend.Preferences.Vue.Fidele.couleurBord+"; background-color:"+EpicFriend.Preferences.Vue.Fidele.couleurFond + "; " +EpicFriend.Preferences.Vue.Fidele.CSS
								}));
							else if(EpicFriend.Preferences.Vue.Fidele.type == "fond")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_fidele",
									style: "opacity:"+EpicFriend.Preferences.Vue.Fidele.opacite+"; position:absolute; top:0px; left:0px; width:40px; height:40px; background-color:"+EpicFriend.Preferences.Vue.Fidele.couleurFond
								}));
							else if(EpicFriend.Preferences.Vue.Fidele.type == "bordure")
							{
								style.borderColor = EpicFriend.Preferences.Vue.Fidele.couleurBord;
								style.borderWidth = EpicFriend.Preferences.Vue.Fidele.epaisseurBord;
								style.borderStyle = EpicFriend.Preferences.Vue.Fidele.styleBord;
							}
						}
						//Si de mon escouade (et que j'AI une escouade...)
						if(oJoueur.escouade == monEscouade && monEscouade != "" && EpicFriend.Preferences.Vue.MemeEscouade.Afficher)
						{
							if(EpicFriend.Preferences.Vue.MemeEscouade.type == "point")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_meme_escouade",
									style: "opacity:"+EpicFriend.Preferences.Vue.MemeEscouade.opacite+"; position:absolute; top:16px; left:16px; width:8px; height:8px; -moz-border-radius:6px; border:1px solid "+EpicFriend.Preferences.Vue.MemeEscouade.couleurBord+"; background-color:"+EpicFriend.Preferences.Vue.MemeEscouade.couleurFond + "; " +EpicFriend.Preferences.Vue.MemeEscouade.CSS
								}));
							else if(EpicFriend.Preferences.Vue.MemeEscouade.type == "fond")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_meme_escouade",
									style: "opacity:"+EpicFriend.Preferences.Vue.MemeEscouade.opacite+"; position:absolute; top:0px; left:0px; width:40px; height:40px; background-color:"+EpicFriend.Preferences.Vue.MemeEscouade.couleurFond
								}));
							else if(EpicFriend.Preferences.Vue.MemeEscouade.type == "bordure")
							{
								style.borderColor = EpicFriend.Preferences.Vue.MemeEscouade.couleurBord;
								style.borderWidth = EpicFriend.Preferences.Vue.MemeEscouade.epaisseurBord;
								style.borderStyle = EpicFriend.Preferences.Vue.MemeEscouade.styleBord;
							}
						}
						//Si c'est un dieu
						if(oJoueur.alignement.indexOf("Dieu") > -1 && EpicFriend.Preferences.Vue.Dieu.Afficher)
						{
							if(EpicFriend.Preferences.Vue.Dieu.type == "point")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_dieu",
									style: "opacity:"+EpicFriend.Preferences.Vue.Dieu.opacite+"; position:absolute; top:16px; left:16px; width:8px; height:8px; -moz-border-radius:6px; border:1px solid "+EpicFriend.Preferences.Vue.Dieu.couleurBord+"; background-color:"+EpicFriend.Preferences.Vue.Dieu.couleurFond + "; "+EpicFriend.Preferences.Vue.Dieu.CSS
								}));
							else if(EpicFriend.Preferences.Vue.Dieu.type == "fond")
								dom.add(oDivEpicFriend, oDivMarquage = dom.el("div", {
									class: "epicfriend_dieu",
									style: "opacity:"+EpicFriend.Preferences.Vue.Dieu.opacite+"; position:absolute; top:0px; left:0px; width:40px; height:40px; -moz-border-radius:6px; background-color:"+EpicFriend.Preferences.Vue.Dieu.couleurFond +"; "+EpicFriend.Preferences.Vue.Dieu.CSS
								}));
							else if(EpicFriend.Preferences.Vue.Dieu.type == "bordure")
							{
								style.borderColor = EpicFriend.Preferences.Vue.Dieu.couleurBord;
								style.borderWidth = EpicFriend.Preferences.Vue.Dieu.epaisseurBord;
								style.borderStyle = EpicFriend.Preferences.Vue.Dieu.styleBord;
							}
						}
					}
					appendChild(document.createTextNode(" "));
				}
				//Niveau et race
				if(EpicFriend.Preferences.Vue.NiveauRace.Afficher)
				{
					var oDivNivRace = document.createElement("div");
					with(oDivNivRace)
					{
						setAttribute("class", "epicfriend_niveau_race");
						style.fontSize = (parseInt(oJoueur.niveau) >= 25) ? ((EpicFriend.Preferences.Vue.NiveauRace.TaillePolice+4)+"px") : (parseInt(oJoueur.niveau) <25 && parseInt(oJoueur.niveau) >= 20) ? ((EpicFriend.Preferences.Vue.NiveauRace.TaillePolice+3)+"px") : (parseInt(oJoueur.niveau) <20 && parseInt(oJoueur.niveau) >= 15) ? ((EpicFriend.Preferences.Vue.NiveauRace.TaillePolice+2)+"px") : (parseInt(oJoueur.niveau) <15 && parseInt(oJoueur.niveau) >= 10) ? ((EpicFriend.Preferences.Vue.NiveauRace.TaillePolice+1)+"px") : (EpicFriend.Preferences.Vue.NiveauRace.TaillePolice+"px");
						style.backgroundColor = oJoueur.couleurRace;
						setAttribute('style', (getAttribute('style') || "") + EpicFriend.Preferences.Vue.NiveauRace.CSS);
						appendChild(document.createTextNode(oJoueur.niveau));
					}
					oDivEpicFriend.appendChild(oDivNivRace);
				}
				//PV
				if(oJoueur.PV != "?" && EpicFriend.Preferences.Vue.PV.Afficher)
				{
					var nRapportPV = parseInt(oJoueur.PV) / parseInt(oJoueur.PVMax);
					var oDivPV = document.createElement("div");
					with(oDivPV)
					{
						setAttribute("class", "epicfriend_pv " + ((nRapportPV < 0.2 || parseInt(oJoueur.PV) < 50)? "palier4": (nRapportPV < 0.5 && nRapportPV >= 0.2)? "palier3" : (nRapportPV < 0.8 && nRapportPV >= 0.5)? "palier2" : (nRapportPV >= 0.8 && nRapportPV < 1 && (oJoueur.PVMax - oJoueur.PV) >= 20)? "palier1" : "palier0"));
						setAttribute('style', (getAttribute('style') || "") + EpicFriend.Preferences.Vue.PV.CSS);
						appendChild(dom.txt(oJoueur.PV));
					}
					dom.add(oDivEpicFriend, oDivPV);
				}
				//PA
				//~ if(EpicFriend.Preferences.Vue.PA.Afficher && utils.defined(oJoueur.PA) && oJoueur.PA != "?")
				if(EpicFriend.Preferences.Vue.PA.Afficher && utils.defined(oJoueur.PA) && oJoueur.PA != "?" && oJoueur.creature == "joueur")
				{
					var oDivPA = dom.el("div", { "class": "epicfriend_pa", text: oJoueur.PA });
					//~ dom.att(oDivPA, "style", ((dom.att(oDivPA, "style") || "") + EpicFriend.Preferences.Vue.PA.CSS));
					dom.add(oDivEpicFriend, oDivPA);
				}
				//Enchantements
				if(oJoueur.enchantements.length>0 && EpicFriend.Preferences.Vue.Enchantements.Afficher)
				{
					var oDivEnchantements = document.createElement("div");
					with(oDivEnchantements)
					{
						setAttribute("class", "epicfriend_enchantements");
						style.visibility = EpicFriend.Preferences.Vue.Enchantements.Afficher ? "visible" : "hidden";
						setAttribute('style', (getAttribute('style') || "") + EpicFriend.Preferences.Vue.Enchantements.CSS);
						var aEnchantements = oJoueur.enchantements.map(function(element) { return EpicFriend.Preferences.CodesAbregesEnchantements[element]; });
					}
					for(var p = 0, sEnchantement; sEnchantement = aEnchantements[p]; p++)
					{
						var oSpan = document.createElement("span");
						if(sEnchantement.indexOf("*") > -1)
						{
							oSpan.style.color = "#AE0006";
							oSpan.style.fontWeight = "bold";
							sEnchantement = sEnchantement.replace(/\*/, "");
						}
						oSpan.appendChild(document.createTextNode(sEnchantement));
						oDivEnchantements.appendChild(oSpan);
						//~ if(aEnchantements[p+1] != null) oDivEnchantements.appendChild(document.createTextNode(EpicFriend.Preferences.Vue.Enchantements.SeparateurCodesAbreges));
						if(aEnchantements[p+1] != null) dom.add(oDivEnchantements, dom.txt(EpicFriend.Preferences.Vue.Enchantements.SeparateurCodesAbreges));
					}
					oDivEpicFriend.appendChild(oDivEnchantements);
				}
				//~ oLien.appendChild(oDivEpicFriend);
				
				
				//Déplacement rapide
				/*
				if (oJoueur.nom == monNom)
				{
					var bNuit = false;
					for (var nImg = 0, oImg ; oImg = dom.tag(dom.id("EW_Content_UserStatus"), "img")[nImg] ; nImg++)
					{
						if (/img\/n\/t0.png/.test(oImg.src))
						{
							bNuit = true;
							break;
						}
					}
					var nX = parseInt(oJoueur.x), nY = parseInt(oJoueur.y);
					if (bNuit)
					{
						var nXAbsolute = 40 * 4;
						var nYAbsolute = 40 * 4;
					}
					else
					{
						var nXAbsolute = 40 * 5;
						var nYAbsolute = 40 * 5;
					}
					var oMonAnnotation = dom.id("epicfriend_" + nX + "_" + nY);
					var aHautGauche = [ (nX == 0 ? 139 : nX - 1), (nY == 0 ? 139 : nY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oOaTCWX8AAADvSURBVFjD7ZjNDcMgDEb5qk7UTTKRxUI5ZoceMpN7SSSE+HEqDD6YUxQJ6fE+iE3AzMHyeAXjwwEd0AEd0AEd0AEd0AHtA0aAI8DmDWqAYlTLXwIjZpgySNliR9jEyEtTBJiYQwTCKJsqp5gKi/53f46OGLc9qiTzFBIa9+I76uu5uaDlH2pqCJDErrUHkZqjTkotyGmlTgJZAoXmv5l0LybvxCmoG8yjlpjMY1/SzTyBnHGKUaksovnv1f3ed/9gecNas9gbx3bOM3hBsiTaYzvttvwp3HTAXtQ5nCmDJbglgCWLNTj1UiepFL2W6we05IRm6htddgAAAABJRU5ErkJggg%3D%3D", -1, -1, "haut_gauche" ];
					var aHaut       = [ nX                      , (nY == 0 ? 139 : nY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oONPFaekAAACgSURBVFjD7dixDYAgFARQjpFs3MOFCAu5h40rnY0FhSZGT/yJR0lBXv6/kA8gmSKvrDysAqwAwwJDV7ACLHtclFX8TwUNVOWv3XMFDewBPMqfModusYF386fKoVts4JP8KXLoFkd7NMUAnsx/aZkHLPMAZQ5VA2tqYWfIr6aZQ5AKmd/AKZG4+/VRAV4FjNPKQqIr0PeggQYaaKCBBkrWBrTzRS6UJ2YAAAAAAElFTkSuQmCC", 0, -1, "haut" ];
					var aHautDroite = [ (nX == 139 ? 0 : nX + 1), (nY == 0 ? 139 : nY - 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oN0N6dHgAAADpSURBVFjD7dgxEsIgEIXh9zK5kYV3sNMLRU5k5y30SmuTOBgDiQgLmVmqFCm+/AwTgCKClkeHxocBDWhAAxrQgAY0oAH3B3SkODLLTrjPDcv9sX1O2CACR2J8ZhNAR8ownmsmXBMF/WpzXK56ScA5rFS5JKA/nSFcznqbgUvVNHCrwBCs9LRuAi5NZwxXot4iMFZNs9wXcA0Ww5Wq9wbGprMmDgC6f3Aag1cg+Qdfuh4A9IMIT7dD8IXj5Vn1ArEDgPv50WS95A2rFu4DmFJRveAWpGa9XRyaGLrln1a2v4q16/1UsAYOAF5+WnHjH+7s9AAAAABJRU5ErkJggg%3D%3D", 1, -1, "haut_droite" ];
					var aGauche     = [ (nX == 0 ? 139 : nX - 1), nY                      , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oNa10FVQAAACrSURBVFjD7djRCYAwDARQT5zITZxIupCf7uCHM8UvRasgoRcpchkgPFKaHoWZNTVX21ReAgoooIACCvhzYBfZPAGXJDKawdsDzDSTg57Ki+yiQedaph6hR+wFleJegSUgBu4GZIFYuAMYAWPgbhMcuTea0ueyZh72VjEyn+I8rLw9yADnSCqQBT4jQ4El4B35KdALToD7qUPkz0J1YUGBVUABBRRQQAH/B9wAErJhF+yvbmQAAAAASUVORK5CYII%3D", -1, 0, "gauche" ];
					var aDroite     = [ (nX == 139 ? 0 : nX + 1), nY                      , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oMaoZ0U0AAACqSURBVFjD7djBDcMgDAVQ/8gb9ZAdcuxCKBN1k67kXhMakQIOtaLvO+gJhP0FzEwi1yTBi0ACCSSQQAJvDtSWRSuwSxjJDGGAK2ApS0BXglEbt5bXQ+bn+wuZgcUL3AQUkVOkF7gZWItsBXcBe5C/gruBXsgjcDKDem8aog/mp+eN2l6xRsCVHon+A1fTZnQEbmijzseaN6gbODosgF8fBBJIIIEEEkhgqT7YHHANaQ7AnAAAAABJRU5ErkJggg%3D%3D", 1, 0, "droite" ];
					var aBasGauche  = [ (nX == 0 ? 139 : nX - 1), (nY == 139 ? 0 : nY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oMN0e4dsAAADdSURBVFjD7dfBEoMgDEXR95j8N8OXx02ZUYpILRAWybZdHG9URqoqLCaRCgBRla3/BUscAIBN33rgBdeBNClYnRtkMK/3gNynIACofiHDNvXy26RAhq1wlZJivdUE6O1TTM4HturFh0MikXYPSQ8uqlIs6rVw6bPufATKLrgSlkd2WGteZ+03WVWvhrurtrxgieuBTQOW9Wq4HtgUYAv3S7UlK864t7DhwHO9M+4tbFrBqPp3tctxPOKjqXLvcdQFy+B6HL0RWn129k7A5uNABzrQgQ50oAMd6MCpcwCse3DntuuWBAAAAABJRU5ErkJggg%3D%3D", -1, 1, "bas_gauche" ];
					var aBas        = [ nX                      , (nY == 139 ? 0 : nY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oLicR3LgAAACqSURBVFjD7ZhBCoAgEEXnRydq0z26kHih7tGmK00rIyJEnEmD/l8rPvxPsaCq8uUM8vEQkIAEJCABCWjLWDsxArqtE0rGzsuuQRXNdjACmhYuhDvnNK84B5ngujv4BOkB53pIrpBecCIiqH2w5py6w0VAmh6SXILzC50XdTfAUqcs/rFiAlo9tPrHiglo8dDDP1ZMwFoPvfxjxb8AhOdP9PSd4uXf/3bwjRyyO1dkNC6wzAAAAABJRU5ErkJggg%3D%3D", 0, 1, "bas" ];
					var aBasDroite  = [ (nX == 139 ? 0 : nX + 1), (nY == 139 ? 0 : nY + 1), "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9sHAg4oLMkfvZQAAADhSURBVFjD7ZbBDcMgDEVtKxvlkB1y7EKIibJJV3Iv7SUBYifBRpV9Bvz0PsIgM0Ot1m2G5fVmAIDEjOBQJFmUmCEj8lCA6zYPAUkSOM8iDZyHxWlEaweDGjhri3RlkyXklBF5gXFLZDAjulkk6YQoQZoZvAppYRH3s1jSMB33dJvVVGiOZ80s46aGJTFkz6jpJMqmTQuT2PoPFoC4dSd73EXVJKk1/5nsEbV61NVi7xW3KmJJ7F+Lj0VNdw/Ygzxt8rbBE5voblD7yLsaHObDGoABGIABGIABGIABGIB/A/gBzgeByis4vrgAAAAASUVORK5CYII%3D", 1, 1, "bas_droite" ];
					for(var nListe  = 0, aListe ; aListe = [aHautGauche, aHaut, aHautDroite, aGauche, [nX, nY], aDroite, aBasGauche, aBas, aBasDroite][nListe] ; nListe++)
					{
						var aVoisin = EpicFriend.Joueurs.filter(function(element) { return element.x == aListe[0] && element.y == aListe[1]; });
						var aBatiment = EpicFriend.Decors.filter(function(element) { return element.x == aListe[0] && element.y == aListe[1]; });
						if (aVoisin.length == 0 && aBatiment.length == 0) //si personne et aucun décor dans la case
						{
							//~ var oDivEF = dom.el("div", { id: "epicfriend_" + aListe[0] + "_" + aListe[1], class: "epicfriend_annotation" });
							//~ var oDivDepla = dom.el("div",
								//~ {
									//~ class: "epicfriend_deplacement_rapide " + aListe[5],
									//~ onclick: 'self.location.href = "http://' + serveur + '.epic-war.net/mouvement1.php?xdest=' + aListe[0] + '&ydest=' + aListe[1] + '";'
								//~ },
								//~ {
									//~ zIndex: "999",
									//~ position: "absolute",
									//~ left: nXAbsolute + 40 * aListe[3],
									//~ top: nYAbsolute + 40 * aListe[4],
									//~ width: "40px",
									//~ height: "40px",
									//~ opacity: "0.4",
									//~ "display": (EpicFriend.Preferences.Vue.DeplacementRapide.Activer ? "block" : "none"),
									//~ background: "transparent url(" + aListe[2] + ") top left no-repeat"
								//~ });
							//~ dom.add(dom.id("map"),
								//~ dom.add(oDivEF, oDivDepla)
							//~ );
							if (dom.id("epicfriend_vue_lien_" + aListe[0] + "_" + aListe[1]))
							{
							}
						}
					}
				}
				*/
				
			}
			else
			{
				//Déplacement rapide
				if (aDeplacementRapide.some(function(e,i,a) { return e[0] == sX && e[1] == sY; })
				    && ! EpicFriend.Decors.some(function(e,i,a) { return e.x == sX && e.y == sY; }))
				{
					var aDeplacement = aDeplacementRapide.filter(function(e,i,a) { return e[0] == sX && e[1] == sY; })[0];
					dom.add(dom.id("epicfriend_" + sX + "_" + sY),
						dom.el("div",
							{
								"class" : "epicfriend_deplacement_rapide " + aDeplacement[5],
								onclick : 'self.location.href = "http://' + serveur + '.epic-war.net/mouvement1.php?xdest=' + sX + '&ydest=' + sY + '";'
							},
							{
								zIndex: "998",
								width: "40px",
								height: "40px",
								opacity: "0.4",
								"display": (EpicFriend.Preferences.Vue.DeplacementRapide.Activer ? "block" : "none"),
								background: "transparent url(" + aDeplacement[2] + ") top left no-repeat"
							})
						);
					//~ oLien.removeAttribute("onmouseover");
					dom.att(oLien, "onmouseover", dom.att(oLien, "onmouseover").replace(/\);?$/, ", OFFSETX, 10, OFFSETY, 10);"));
					//~ oLien.removeAttribute("onclick");
				}
			}
		}
		//CSS
		var sStyle = "";
		sStyle += "#map a:hover { text-decoration: none; }";
		sStyle += ".epicfriend_niveau_race { position: absolute; display: table-cell; vertical-align: top; top: 1px; left: 1px; width: auto; margin: 0; padding: 1px 1px 2px 1px; line-height: " + EpicFriend.Preferences.Vue.NiveauRace.TaillePolice + "px; font-family: sans-serif; font-weight: " + EpicFriend.Preferences.Vue.NiveauRace.EpaisseurPolice + "px; color: white; opacity: 0.75; z-index: 999; }\n";
		sStyle += ".epicfriend_pv { position: absolute; top: 1px; right: 1px; width: auto; margin: 0; padding: 0 0 1px 0; font-weight: " + EpicFriend.Preferences.Vue.PV.EpaisseurPolice + "; color: black; line-height: 1.05em; z-index: 999; }\n";
		sStyle += ".epicfriend_pa { position: absolute; top: 1.1em; right: 1px; width: auto; margin: 1px 0 0 0; padding: 0 0 1px 0; font-size: 9px; font-style: italic; background-color: lime; color: black; line-height: 1.05em; z-index: 999; " + EpicFriend.Preferences.Vue.PA.CSS + "}\n";
		sStyle += ".palier0 { font-size: " + (EpicFriend.Preferences.Vue.PV.TaillePolice + 0) + "px; background-color: " + EpicFriend.Preferences.CouleursBlessuresVue.Palier0 + "; }\n";
		sStyle += ".palier1 { font-size: " + (EpicFriend.Preferences.Vue.PV.TaillePolice + 1) + "px; background-color: " + EpicFriend.Preferences.CouleursBlessuresVue.Palier1 + "; }\n";
		sStyle += ".palier2 { font-size: " + (EpicFriend.Preferences.Vue.PV.TaillePolice + 2) + "px; background-color: " + EpicFriend.Preferences.CouleursBlessuresVue.Palier2 + "; }\n";
		sStyle += ".palier3 { font-size: " + (EpicFriend.Preferences.Vue.PV.TaillePolice + 3) + "px; background-color: " + EpicFriend.Preferences.CouleursBlessuresVue.Palier3 + "; }\n";
		sStyle += ".palier4 { font-size: " + (EpicFriend.Preferences.Vue.PV.TaillePolice + 4) + "px; background-color: " + EpicFriend.Preferences.CouleursBlessuresVue.Palier4 + "; }\n";
		sStyle += ".epicfriend_enchantements { position: absolute; bottom: 1px; left: 1px; width: auto; margin: 0; padding: 0 1px 0 0; font-family: sans-serif; font-size: " + EpicFriend.Preferences.Vue.Enchantements.TaillePolice + "px; font-weight: " + EpicFriend.Preferences.Vue.Enchantements.EpaisseurPolice + "; line-height: 1em; background-color: white; color: black; z-index: 999; }\n";
		sStyle += "div.epicfriend_deplacement_rapide { vertical-align: middle !important; }";
		sStyle += "div.epicfriend_deplacement_rapide:hover { background-color: white !important; cursor: pointer !important; }";
		GM_addStyle(sStyle);
	},
	
	//Construire le rapport de la vue de la carte
	ConstruireRapportVue : function()
	{
		var wEpicVue = window.open("wEpicVue");
		wEpicVue.document.open();
		wEpicVue.document.writeln('\
<!DOCTYPE html>\n\
<html>\n\
	<head>\n\
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n\
		<style type="text/css">\n\
			body { font-size: small; }\n\
			table { border-collapse: collapse; }\n\
			tr:hover { background-color: yellow; }\n\
			td { padding: 0 0.5em; }\n\
			.familier { color: #333; opacity: 0.7; }\n\
			.loc { font-family: monospace; text-align: right; }\n\
			.dieu { text-shadow: yellow 0 0 4px, gold 0 0 3px, orange 0 0 2px, orange 0 0 1px; }\n\
			.mon_escouade { font-weight: bold; }\n\
			.Combattant { color: ' +  EpicFriend.Preferences.CouleursAlignements.Combattant + ';}\n\
			.Rodeur { color: ' + EpicFriend.Preferences.CouleursAlignements.Rodeur + ';}\n\
			.Apprenti { color: ' + EpicFriend.Preferences.CouleursAlignements.Apprenti + ';}\n\
			.niveau { text-align: right; }\n\
			.pv > span { font-weight: bold; }\n\
			.palier0 { color: ' + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier0 + ';}\n\
			.palier1 { color: ' + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier1 + ';}\n\
			.palier2 { color: ' + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier2 + ';}\n\
			.palier3 { color: ' + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier3 + ';}\n\
			.palier4 { color: ' + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier4 + ';}\n\
			.ench_positif, .ench_negatif { margin-right: 0.25em; }\n\
			.ench_negatif { color: darkred; }\n\
			#atext { width: 100%; height: 6em; font-size: xx-small; }\n\
			#messagerie { margin-top: 1em; margin-left: 2em; margin-right: 2em; padding: 0.25em 0.5em; background-color: #ECEFC5; }\n\
			#messagerie div:nth-child(odd) { float: left; width: 18em; font-weight: bold; }\n\
			#messagerie div:nth-child(even) { margin-left: 19em; }\n\
			#messagerie div:nth-child(even):hover { background-color: yellow; cursor: pointer; }\n\
		</style>\n\
		<title>[EpicFriend] EpicVue sur ' + serveur.charAt(0).toUpperCase() + serveur.substr(1).toLowerCase() + '</title>\n\
	</head>\n\
	<body>\n\
		<div id="choix_race">\n\
			<label>Inclure dans le rapport :</label>\n\
		</div>\n\
		<div id="choix_format_export">\n\
			<label>Format d\'exportation :</label>\n\
			<input id="choix_bbcode" type="radio" name="format_export" checked="true" />\n\
			<label>BBCode (messagerie ingame)</label>\n\
			<input id="choix_coolforum" type="radio" name="format_export" />\n\
			<label>CoolForum (forum officiel)</label>\n\
		</div>\n\
		<div id="resultat">\n\
			<textarea id="atext"></textarea>\n\
		</div>\n\
		<div id="epicvue"></div>\n\
	</body>\n\
</html>\n\
		');
		wEpicVue.document.close();

		var aHumains      = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Humain"; });
		var aElfes        = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Elfe"; });
		var aOrques       = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Orque"; });
		var aMortsVivants = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Mort-vivant"; });
		var aNains        = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Nain"; });
		var aMonstres     = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Monstre"; });
		var aMetaListes = EpicFriend.Preferences.Rapport.AfficherMonstres ?
		 [[aHumains, "HUMAINS"], [aElfes, "ELFES"], [aOrques, "ORQUES"], [aMortsVivants, "MORTS-VIVANTS"], [aNains, "NAINS"], [aMonstres, "MONSTRES"]]
		 : [[aHumains, "HUMAINS"], [aElfes, "ELFES"], [aOrques, "ORQUES"], [aMortsVivants, "MORTS-VIVANTS"], [aNains, "NAINS"]];
		var oBBCode = {};
		var thedoc = wEpicVue.document;
		var	oDivEpicVue            = thedoc.getElementById("epicvue"),
			oDivChoixRace          = thedoc.getElementById("choix_race"),
			oDivChoixFormatExport  = thedoc.getElementById("choix_format_export"),
			oTextarea              = thedoc.getElementById("atext");
		var aRacesExportees = [];
		
		for(var n = 0, aMetaListe; aMetaListe = aMetaListes[n]; n++)
		{
			var oMessagerie = {
				tous: new Array(),
				dieux: new Array(),
				solitaires: new Array(),
				maitresDeFam: new Array(),
				escouades: new Array()
			};
			var aListe = aMetaListe[0];
			var sRace = aMetaListe[1];
			oBBCode[sRace] = [];
			if(aListe.length > 0)
			{
				var oDivRace = dom.el("div", { class: "race", id: sRace.toLowerCase() });
				dom.add(oDivRace, dom.el("h2", { text: sRace + " (" + aListe.length + ")" }));
				dom.add(oDivChoixRace,
					[
						dom.el("input", { type: "checkbox", value: sRace, id: "check_" + sRace }),
						dom.el("label", { text: sRace }, { "display": "inline-block", marginRight: "1em" }),
					]);
				var oTable = dom.el("table", { id: "table_" + sRace });
				for(var nJoueur = 0, oJoueur ; oJoueur = aListe[nJoueur] ; nJoueur++)
				{
					//affichage du rapport par race, joueur par joueur
					aEnchantementsValides = oJoueur.enchantements.filter(function(el)
						{
							return utils.defined(EpicFriend.Preferences.CodesAbregesEnchantements[el]);
						});
					aEnchantementsAbreges = aEnchantementsValides.map(function(element)
						{
							return EpicFriend.Preferences.CodesAbregesEnchantements[element];
						});
					nRapportPV = (parseInt(oJoueur.PV)/parseInt(oJoueur.PVMax)) || null;
					nPalierPV = nRapportPV < 0.2 ? 4 :
						(nRapportPV >= 0.2 && nRapportPV < 0.5 ? 3 :
							(nRapportPV > 0.5 && nRapportPV < 0.8 ? 2 :
								(nRapportPV >= 0.8 && nRapportPV < 1 ? 1 : 0)));
					var alignement_primitif = EpicFriend.AlignementPrimitif(oJoueur.alignement).replace(/ô/, "o");
					var
						bDieu = (oJoueur.alignement.indexOf("Dieu") > -1),
						bJoueur = (oJoueur.creature == "joueur"),
						bFamilier = (oJoueur.creature == "familier"),
						bSquelette = (oJoueur.creature == "squelette"),
						bMonstre = (oJoueur.creature == "monstre"),
						bMaRace = (oJoueur.race == maRace),
						bEscouade = (oJoueur.escouade != "")
						bMonEscouade = (oJoueur.escouade == monEscouade);
						bMoi = (oJoueur.nom === monNom);
						bSolitaire = (bJoueur && oJoueur.escouade == "");
					var oDivCreature = dom.el("tr", { class: oJoueur.creature, id: oJoueur.nom });
					dom.add(oDivCreature,
						[
							dom.el("td", { class: "loc", text: oJoueur.x + "/" + oJoueur.y }),
							dom.el("td", { class: "nom" + (bDieu ? " dieu" : "") + (bMonEscouade ? " mon_escouade" : ""), text: (bSquelette ? "Squelette" : oJoueur.nom) }),
							dom.el("td", { class: "alignement" + (bJoueur ? " " + alignement_primitif : ""), text: oJoueur.alignement }),
							dom.el("td", { class: "race", text: oJoueur.race }),
							dom.el("td", { class: "niveau", text: oJoueur.niveau }),
							dom.el("td",
								{
									class: "escouade",
									text: (bJoueur && bEscouade ? "(" + oJoueur.escouade + ")" : (bFamilier ? " de " + oJoueur.proprio : ""))
								},
								{
									fontStyle: bJoueur && bEscouade ? "italic" : "normal",
									fontWeight: bJoueur && bEscouade && bMonEscouade ? "bold" : "normal"
								}),
							dom.add(dom.el("td", { "class": "pv" }),
								[
									dom.txt("PV "),
									dom.el("span",
										{
											class: (nRapportPV == null ? "" : " palier" + nPalierPV),
											text: oJoueur.PV
										}),
									dom.txt(" / " + oJoueur.PVMax)
								]),
							dom.el("td",
								{
									class: "pa",
									text: bJoueur && oJoueur.PA != "" && oJoueur.PA != "?" ? "PA " + oJoueur.PA + " / " + oJoueur.PAMax :
										""
								})
						]);
					var oSpanEnchantements = dom.el("td", { class: "enchantements" });
					if (aEnchantementsAbreges.length > 0)
					{
						dom.add(oSpanEnchantements, dom.txt("("));
						for (var nEnch = 0, sEnch; sEnch = aEnchantementsAbreges[nEnch]; nEnch++)
						{
							var sTitle = "";
							for (var sEnchLong in EpicFriend.Preferences.CodesAbregesEnchantements)
								if (EpicFriend.Preferences.CodesAbregesEnchantements[sEnchLong] == sEnch)
								{
									sTitle = sEnchLong;
									break;
								}
							dom.add(oSpanEnchantements, dom.el("span",
								{
									class: /\*$/.test(sEnch) ? "ench_negatif" : "ench_positif",
									text: sEnch.replace(/\*$/, ""),
									title: sTitle
								}));
						}
						dom.add(oSpanEnchantements, dom.txt(")"));
						dom.add(oDivCreature, oSpanEnchantements);
					}
					dom.add(oTable, oDivCreature);
					//messagerie: entrée des données pour la race jouée, joueur par joueur
					if (bMaRace && ! bMoi)
					{
						if (bJoueur) oMessagerie.tous.push(oJoueur.nom);
						if (bJoueur && bDieu) oMessagerie.dieux.push(oJoueur.nom);
						if (bJoueur && bSolitaire && ! bDieu) oMessagerie.solitaires.push(oJoueur.nom);
						if (bFamilier) oMessagerie.maitresDeFam.push(oJoueur.proprio);
						var aSquelettes = aListe.filter(function (e) { return e.creature == "squelette"; });
						if (aSquelettes.length > 0 && bJoueur && oJoueur.alignement == "Nécromant" && oMessagerie.maitresDeFam.indexOf(oJoueur.nom) == -1)
							oMessagerie.maitresDeFam(oJoueur.nom);
						if (bJoueur && bEscouade && ! bMonEscouade && oMessagerie.escouades.indexOf(oJoueur.escouade) < 0)
							oMessagerie.escouades.push(oJoueur.escouade);
					}
					//BBCode par race, joueur par joueur
					var s = oJoueur.x + "/" + oJoueur.y + " [b]";
					if (bMonEscouade) s += "[color=maroon]" + oJoueur.nom + "[/color]";
					else if (bDieu) s += "[color=orange]" + oJoueur.nom + "[/color]";
					else s += oJoueur.nom;
					s += "[/b] : ";
					s += "[color=" + EpicFriend.Preferences.CouleursAlignements[alignement_primitif] + "]" + oJoueur.alignement + "[/color]";
					s += " " + oJoueur.race + " " + oJoueur.niveau;
					if (bJoueur && bEscouade) s += " [i](" + oJoueur.escouade + ")[/i]";
					else if (bFamilier) s += " de " + oJoueur.proprio;
					s += " - PV ";
					if (nRapportPV == null) s += oJoueur.PV + "/" + oJoueur.PVMax;
					else s += "[color=" + EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue["Palier" + nPalierPV] + "]" 
						+ oJoueur.PV + "[/color]" + " / " + oJoueur.PVMax;
					if (utils.defined(oJoueur.PA) && oJoueur.PA != "?")
						s += " - PA " + oJoueur.PA + " / " + oJoueur.PAMax;
					if (aEnchantementsAbreges.length > 0)
					{
						s += " (";
						for (var nench = 0, sEnch; sEnch = aEnchantementsAbreges[nench]; nench++)
						{
							if (nEnch > 0) s += " ";
							if (! /\*$/.test(sEnch)) //pas un enchantement négatif ==> enchantement positif
								s += sEnch;
							else s += "[color=red]" + sEnch.replace(/\*$/, "") + "[/color]";
						}
						s += ")";
					}
					oBBCode[sRace].push(s);
				}
				dom.add(oDivRace, oTable);
				dom.add(oDivEpicVue, oDivRace);
				//affichage de la messagerie
				var sRace2 = sRace.charAt(0).toUpperCase() + sRace.substr(1).toLowerCase().replace(/s$/, "");
				var oLibellesMess = {
					tous: "Tous les joueurs " + sRace2 + "s",
					dieux: "Dieux",
					solitaires: "Solitaires",
					maitresDeFam: "Maîtres de fams/skulls",
					escouades: "Autres escouades présentes"
				};
				if (sRace2 == maRace && oMessagerie.tous.length > 0)
				{
					var oDivMessagerie = dom.el("div", { id: "messagerie" });
					for (type in oMessagerie)
					{
						if (utils.defined(oMessagerie[type])
						 && utils.isArray(oMessagerie[type])
						 && oMessagerie[type].length > 0)
						{
							dom.add(oDivMessagerie,
								[
									dom.el("div", { text: oLibellesMess[type] + " : " }),
									dom.el("div",
										{
											text: oMessagerie[type].join("; "),
											onclick: 'prompt("' + oLibellesMess[type] + '", this.textContent.replace(/; /g, ";"));',
											title: "Cliquer ici pour copier la liste des destinataires \"" + oLibellesMess[type] + "\""
										}),
								]);
						}
					}
					dom.add(oDivEpicVue, oDivMessagerie);
				}
				//choix d'une race à exporter (clic sur case à cocher INPUT[type=checkbox]#choix_<sRace> )
				thedoc.getElementById("check_" + sRace).addEventListener("click",
					function ()
					{
						var sRace = dom.att(this, "id").replace(/check_/, "");
						var sBBCode    = sRace + " (" + oBBCode[sRace].length + ")\n\n" + oBBCode[sRace].join("\n") + "\n\n",
						    oTextarea  = thedoc.getElementById("atext");
						if (this.checked) oTextarea.value += sBBCode;
						thedoc.getElementById("choix_bbcode").checked = true;
					},
					true);
			}
		}
		//choix d'un format d'exportation (clic sur case à cocher INPUT[type=radio][name=format_export] )
		thedoc.getElementById("choix_coolforum").addEventListener("click",
			function ()
			{
				var oTextarea = thedoc.getElementById("atext");
				if (this.checked && oTextarea.value != "")
				{
					var sCFCode = oTextarea.value
						.replace(/\[b\]/g, "[bold]")
						.replace(/\[\/b\]/g, "[/bold]")
						.replace(/\[i\]/g, "[ita]")
						.replace(/\[\/i\]/g, "[/ita]")
						.replace(/\[u\]/g, "[under]")
						.replace(/\[\/u\]/g, "[/under]");
					oTextarea.value = sCFCode;
				}
			},
			true);
		thedoc.getElementById("choix_bbcode").addEventListener("click",
			function ()
			{
				var oTextarea = thedoc.getElementById("atext");
				if (this.checked && oTextarea.value != "")
				{
					var sBBCode = oTextarea.value
						.replace(/\[bold\]/g, "[b]")
						.replace(/\[\/bold\]/g, "[/b]")
						.replace(/\[ita\]/g, "[i]")
						.replace(/\[\/ita\]/g, "[/i]")
						.replace(/\[under\]/g, "[u]")
						.replace(/\[\/under\]/g, "[/u]");
					oTextarea.value = sBBCode;
				}
			},
			true);
		//expansion verticale du TEXTAREA selon qu'il a le focus ou non
		oTextarea.addEventListener("focus", function () { dom.style(this, "height", "25em"); }, true);
		oTextarea.addEventListener("blur", function () { dom.style(this, "height", "6em"); }, true);
	},
	
	/*
	ConstruireRapportVue : function()
	{
		var aA = [];
		var aHumains = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Humain"; });
		var aElfes = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Elfe"; });
		var aOrques = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Orque"; });
		var aMortsVivants = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Mort-vivant"; });
		var aNains = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Nain"; });
		var aMonstres = EpicFriend.Joueurs.filter(function(element, indice, array) { return element.race == "Monstre"; });
		var aTousLesDestinataires = [];
		var aDestinatairesHorsEscouade = [];
		var aEscouadesPresentes = [];
		var aSansEscouade = [];
		var aDieux = [];
		var aProprietairesFamiliers = [];
		var aMetaListes = (EpicFriend.Preferences.Rapport.AfficherMonstres ? [[aHumains, "HUMAINS"], [aElfes, "ELFES"], [aOrques, "ORQUES"], [aMortsVivants, "MORTS-VIVANTS"], [aNains, "NAINS"], [aMonstres, "MONSTRES"]] : [[aHumains, "HUMAINS"], [aElfes, "ELFES"], [aOrques, "ORQUES"], [aMortsVivants, "MORTS-VIVANTS"], [aNains, "NAINS"]]);
		for(var n = 0, aMetaListe; aMetaListe = aMetaListes[n]; n++)
		{
			var aListe = aMetaListe[0];
			var sRace = aMetaListe[1];
			if(aListe.length > 0)
			{
				if(aA.length > 0) aA.push("");
				aA.push(sRace + " (" + aListe.length + ")");
				aA.push("");
				for(var nJoueur = 0, oJoueur ; oJoueur = aListe[nJoueur] ; nJoueur++)
				{
					aEnchantementsValides = oJoueur.enchantements.filter(function(el) { return utils.defined(EpicFriend.Preferences.CodesAbregesEnchantements[el]); });
					aEnchantementsAbreges = aEnchantementsValides.map(function(element) { return EpicFriend.Preferences.CodesAbregesEnchantements[element]; });
					nRapportPV = (parseInt(oJoueur.PV)/parseInt(oJoueur.PVMax)) || null;
					if(oJoueur.creature == "joueur")
					{
						aA.push(oJoueur.x+"/"+oJoueur.y+" <b>"+(oJoueur.alignement.indexOf("Dieu") > -1? "<span style='color:"+EpicFriend.Preferences.Rapport.CouleurDieu+";'>" : oJoueur.escouade == monEscouade && monEscouade != ""? "<span style='color:"+EpicFriend.Preferences.Rapport.CouleurMemeEscouade+";'>" : "")+oJoueur.nom+((oJoueur.alignement.indexOf("Dieu") > -1 || (oJoueur.escouade == monEscouade && monEscouade != ""))? "</span>" : "")+"</b> : <span style='color:"+(EpicFriend.AlignementPrimitif(oJoueur.alignement) == "Combattant"? "blue" : EpicFriend.AlignementPrimitif(oJoueur.alignement) == "Rôdeur"? "green" : EpicFriend.AlignementPrimitif(oJoueur.alignement) == "Apprenti"? "purple" : "black")+";'>"+oJoueur.alignement+"</span> "+oJoueur.race+" "+oJoueur.niveau+(oJoueur.escouade.length != ""? " <i>("+oJoueur.escouade+")</i>":"")+" - PV <b><span style='color:"+(nRapportPV != null && nRapportPV<0.2? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier4: (nRapportPV != null && nRapportPV<0.5 && nRapportPV>=0.2)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier3: (nRapportPV != null && nRapportPV<0.8 && nRapportPV>=0.5)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier2: (nRapportPV != null && nRapportPV>=0.8 && nRapportPV<1 && (parseInt(oJoueur.PVMax)-parseInt(oJoueur.PV))>=20)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier1: EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier0)+";'>"+oJoueur.PV+"</span></b>/"+oJoueur.PVMax+(oJoueur.PA != "?" ? " - PA "+oJoueur.PA+"/"+oJoueur.PAMax : "")+(aEnchantementsAbreges.length > 0 ? " <span style='color:gray;'>("+aEnchantementsAbreges.map(function(element) {return element.replace(/^(.*?)\*$/, "<span style=\'color:red;\'>$1</span>");}).join(",")+")</span>":""));
					}
					if(oJoueur.creature == "familier")
					{
						aA.push("<i><span style='color:#333;'>"+oJoueur.x+"/"+oJoueur.y+" "+oJoueur.nom+" : familier "+oJoueur.race+" "+oJoueur.niveau+" de "+oJoueur.proprio+" - PV <b><span style='color:"+(nRapportPV != null && nRapportPV<0.2? "#ff0000": (nRapportPV != null && nRapportPV<0.5 && nRapportPV>=0.2)? "#bb1111": (nRapportPV != null && nRapportPV<0.8 && nRapportPV>=0.5)? "#882222": (nRapportPV != null && nRapportPV>=0.8 && nRapportPV<1 && (parseInt(oJoueur.PVMax)-parseInt(oJoueur.PV))>=20)? "#663333": "black")+";'>"+oJoueur.PV+"</span></b>/"+oJoueur.PVMax+ (aEnchantementsAbreges.length > 0 ? " <span style='color:gray;'>("+aEnchantementsAbreges.map(function(element) {return element.replace(/^(.*?)\*$/, "<span style=\'color:red;\'>$1</span>");}).join(",")+")</span>":"")+"</span></i>");
					}
					if(oJoueur.creature == "squelette")
					{
						aA.push("<i><span style='color:#333;'>"+oJoueur.x+"/"+oJoueur.y+" Squelette : "+oJoueur.alignement+" "+oJoueur.race+" "+oJoueur.niveau+" - PV <b>"+oJoueur.PV+"</b>/"+oJoueur.PVMax + (aEnchantementsAbreges.length > 0 ? " <span style='color:gray;'>("+aEnchantementsAbreges.map(function(element) {return element.replace(/^(.*?)\*$/, "<span style=\'color:red;\'>$1</span>");}).join(",")+")</span>":"")+"</span></i>");
					}
					if(oJoueur.creature == "monstre")
					{
						aA.push("<i><span style='color:#333;'>"+oJoueur.x+"/"+oJoueur.y+" "+oJoueur.nom+" "+oJoueur.niveau+" - PV <b>"+oJoueur.PV+"</b>/"+oJoueur.PVMax + (aEnchantementsAbreges.length > 0 ? " <span style='color:gray;'>("+aEnchantementsAbreges.map(function(element) {return element.replace(/^(.*?)\*$/, "<span style=\'color:red;\'>$1</span>");}).join(",")+")</span>":"")+"</span></i>");
					}
					if(oJoueur.race == maRace)
					{
						if(oJoueur.creature == "joueur")
						{
							if(aTousLesDestinataires.indexOf(oJoueur.nom) == -1 && oJoueur.nom != monNom) aTousLesDestinataires.push(oJoueur.nom);
							if(oJoueur.escouade != monEscouade && monEscouade != "" && ! /Dieu/.test(oJoueur.alignement) && aDestinatairesHorsEscouade.indexOf(oJoueur.nom) == -1) aDestinatairesHorsEscouade.push(oJoueur.nom);
							if(oJoueur.escouade != "" && oJoueur.escouade != monEscouade && aEscouadesPresentes.indexOf(oJoueur.escouade) == -1) aEscouadesPresentes.push(oJoueur.escouade);
							if(oJoueur.escouade == "" && ! /Dieu/.test(oJoueur.alignement) && oJoueur.nom != monNom) aSansEscouade.push(oJoueur.nom);
							if(/Dieu/.test(oJoueur.alignement) && aDieux.indexOf(oJoueur.nom) == -1 && oJoueur.nom != monNom) aDieux.push(oJoueur.nom);
						}
						if(oJoueur.creature == "familier" && aProprietairesFamiliers.indexOf(oJoueur.proprio) == -1 && oJoueur.proprio != monNom) aProprietairesFamiliers.push(oJoueur.proprio);
					}
				}
			}
		}
		aA.push("");
		aA.push("<b>MESSAGERIE</b> ("+maRace.toUpperCase()+") :");
		aA.push("- <u>Tous les " + maRace + "s dans la vue <i>(dieux inclus)</i></u>:");
		aA.push(aTousLesDestinataires.join("; "));
		if(aDestinatairesHorsEscouade.length > 0)
		{
			aA.push("- <u>Non " + monEscouade + "</u>:");
			aA.push(aDestinatairesHorsEscouade.join("; "));
		}
		if(aSansEscouade.length > 0)
		{
			aA.push("- <u>Solitaires <i>(sans escouade)</i></u>:");
			aA.push(aSansEscouade.join("; "));
		}
		if(aDieux.length > 0)
		{
			aA.push("- <u>Dieux</u>:");
			aA.push(aDieux.join("; "));
		}
		if(aEscouadesPresentes.length > 0)
		{
			aA.push("- <u>Escouades présentes" + (monEscouade != "" ? " <i>(hors " + monEscouade + ")</i>" : "") + "</u>:");
			aA.push(aEscouadesPresentes.join(", "));
		}
		if(aProprietairesFamiliers.length > 0)
		{
			aA.push("- <u>Propriétaires de familiers</u>:");
			aA.push(aProprietairesFamiliers.join("; "));
		}
		EpicFriend.RapportVue = aA;
		EpicFriend.RapportVueBBCode = aA.map(function(element) { return element.replace(/</g, "[").replace(/>/g, "]").replace(/span style=\'color:(.+?);\'/g, "color=$1").replace(/\[\/span\]/g, "[/color]"); });
		EpicFriend.RapportVueLesForums = aA.map(function(element) { return element.replace(/</g, "[").replace(/>/g, "]").replace(/span style=\'color:(.+?);\'/g, "c $1").replace(/\[\/span\]/g, "[/c]"); });	
		EpicFriend.RapportVueCoolForum = aA.map(function(element) { return element.replace(/<b>(.+?)<\/b>/g, "[bold]$1[/bold]").replace(/<i>(.+?)<\/i>/g, "[ita]$1[/ita]").replace(/<u>(.+?)<\/u>/g, "[under]$1[/under]").replace(/<span style=\'color:(.+?);\'>(.+?)<\/span>/g, "[color=$1]$2[/color]"); });		
	},
	
	InsererScriptRapport : function()
	{
		var oHead = document.getElementsByTagName("head")[0];
		var oScript = document.createElement("script");
		with(oScript)
		{
			setAttribute("type", "text/javascript");
			setAttribute("language", "Javascript");
			setAttribute("id", "epicfriend_epicvue");
		}
		var sCode = "function epicfriendEpicVue() { var wEFEpicVue = window.open(); wEFEpicVue.document.write(\"<html><head><title>EpicVue</title></head><body style='margin:0;padding:1em;'><div>\"+\"" + EpicFriend.RapportVue.join("<br/>") + "\"+\"</div><h3>BBCode</h3><textarea onclick='this.select();' style='width:98%;height:15em;font-size:x-small;'>\"+\"" + EpicFriend.RapportVueBBCode.join("\\n") + "\"+\"</textarea></a><h3>CoolForum (forum officiel)</h3><textarea onclick='this.select();' style='width:98%;height:15em;font-size:x-small;'>\"+\"" + EpicFriend.RapportVueCoolForum.join("\\n") + "\"+\"</textarea><h3>Les-forums</h3><textarea onclick='this.select();' style='width:98%;height:15em;font-size:x-small;'>\"+\"" + EpicFriend.RapportVueLesForums.join("\\n") + "\"+\"</textarea></body></html>\"); wEFEpicVue.document.close(); }";
		sCode += "\n\naJoueurs = "+EpicFriend.Joueurs.toSource();
		oScript.appendChild(document.createTextNode(sCode));
		oHead.appendChild(oScript);
	},
	*/
	
	// Générateur de rapport textuel des créatures sur la carte (joueurs alliés et ennemis, ainsi que les familiers et les squelettes; pas les monstres)
	ParserEnchantements : function(sChaine)
	{
		var aListe = sChaine.match(/img\/s\/.+?\.gif/g);
		var aA = [];
		for(var n in aListe)
		{
			var sCode = aListe[n].match(/img\/s\/(.+?)\.gif/)[1];
			if(utils.defined(EpicFriend.CodesEnchantements[sCode]) && EpicFriend.CodesEnchantements[sCode] != "")
				aA.push(EpicFriend.CodesEnchantements[sCode]);
		}
		return aA;
	},
	
	
	/******************************************************************
	 *   I N V E N T A I R E
	 ******************************************************************/
	
	//Nouvelle interface d'inventaire
	AmeliorerInterfaceInventaire2 : function()
	{
		var oDivConteneur = dom.tag(dom.id("EW_Content_Inventaire"), "center", 0);
		var oDivInv = dom.id("invent_combattant") || dom.id("invent_rodeur") || dom.id("invent_apprenti");
		var oDivSac = dom.id("inventbag");
		var oDivEntete = dom.el("div", {id:"epicfriend_inventaire_entete"});
		oDivConteneur.insertBefore(oDivEntete, oDivInv);
		//Ajout du nom du joueur dans l'URL de l'affichage de la cape et de l'inventaire classique (en mode don d'objet bien sûr)
		//(dans le cas où le joueur bascule de l'un à l'autre en mode don, pour garder le nom du joueur)
		if(/ac=don/.test(location.href))
		{
			//Ajout du nom du joueur en clair dans les liens vers l'inventaire normal et la cape
			var sNomJoueur = self.location.search.match(/&joueur=([^&= ]+)/)[1];
			if (utils.defined(dom.tag(dom.id("linkcape"), "a", 0)))
			{
				//on rajoute aussi "&ac=don" à la main si nécessaire, en attendant que le bug soit corrigé côté serveur
				var oLienCape = dom.tag(dom.id("linkcape"), "a", 0);
				oLienCape.href += "&joueur=" + sNomJoueur + (! /ac=don/.test(oLienCape.href) ? "&ac=don" : "");
			}
			var oLienInvent = dom.tag(dom.id("linkinvent"), "a", 0);
			oLienInvent.href += "&joueur=" + sNomJoueur + (! /ac=don/.test(oLienInvent.href) ? "&ac=don" : "");
		}
		//Construction des bases de données des objets de l'inventaire: équipé, non équipé hors-cape et dans la cape
		var aEquipe = [], aProtections = [], aArmesCAC = [], aArmesDistance =[], aSortsCAC = [], aSortsDistance = [], aEnchantements = [], aDivers = [];
		var aCode = [];
		//N'importe quelle page d'inventaire (normal/cape, mode normal/don): recherche des objets équipés
		if(/.*/.test(self.location.toString()))
		{
			for(var n = 0, oDiv; oDiv = dom.tag(oDivInv, "div", n); n++)
			{
				if(/.+?vide/.test(dom.att(oDiv, "id"))) //c'est un item équipé, en-dehors du sac normal et d'une cape
				{
					var sCategorie = dom.att(oDiv, "id").match(/^selected|equip(armedist|armecac|armure|bouclier|casque|gants|bottes|amulette|cape|raquettes)vide/)[1];
					var sData = dom.att(oDiv.firstChild, "onmouseover").match(/return overlib\(\'\s*(.+?)\'\)/)[1];
					var sNom = "", sNiveau = "", sAlign = "", sPoids = "", sPA = "", sPortee = 0, sDegats = "", sCategorie = "Divers";
					var sOmo = (oDiv.firstChild.nodeName == "A")? oDiv.firstChild.getAttribute("onmouseover") : oDiv.getAttribute("onmouseover");
					var aA = /overlib\(\'\s+<b>(.+?)<\/b>.+?<li>Niveau requis : (\d+)<li>Classe requise : (.+?)<li>Poids : (\d+\.?\d?)(.+)$/.exec(sOmo);
					sNom = aA[1]; sNiveau = aA[2]; sAlign = aA[3]; sPoids = aA[4]; sData = aA[5];
					var sOc = (oDiv.firstChild.nodeName == "A")? oDiv.firstChild.getAttribute("onclick") : oDiv.getAttribute("onclick");
					var sCraft = (sOc.match(/craft=\d+/) ? sOc.match(/&craft=(\d+)/)[1] : 0);
					var sId = sOc.match(/ido=(\d+)/)[1];
					var sURLDesequiper = "http://venice.epic-war.net/obj_deposer.php?ido=" + sId + "&craft=" + sCraft;
					var sImgUrl = dom.tag(oDiv, "img", 0).src;
					if(/<li>Equipé : (?:Oui|Non)<li>/.test(sData)) //Protection
					{
						sCategorie = "Protection";
					}
					if(/<li>Coût PA : \d+<li>/.test(sData)) //Enchantement, sort ou arme
					{
						var aA = /<li>Coût PA : (\d+?)(<li>.+)/.exec(sData);
						sPA = aA[1]; sData = aA[2];
						if(/<li>Distance maximale : \d+<li>Dans la cape/.test(sData)) //enchantement
						{
							sPortee = sData.match(/<li>Distance maximale : (\d+)<li>Dans la cape/)[1];
							sCategorie = "Enchantement";//
						}
						if(/<li><u>Type de dégâts :<\/u>.+?<li>.+/.test(sData)) //arme/sort CAC/distance
						{
							var aA = /<li><u>Type de dégâts :<\/u>(.+?)(<li>.+)/.exec(sData);
							sDegats = aA[1]; sData = aA[2];
							if(/<li><u>Type d\\'arme :<\/u> Corps à corps<li>/.test(sData)) sPortee = 0; //arme/sort de CAC
							if(/<li><u>Distance d\\'attaque :<\/u>\d+<li>/.test(sData)) sPortee = sData.match(/<li><u>Distance d\\'attaque :<\/u>(\d+)<li>/)[1]; //arme/sort de distance
							var sPremierAlignement = (/ \/ /.test(sAlign)? sAlign.split(" / ")[0]: sAlign);
							if(EpicFriend.AlignementPrimitif(sPremierAlignement) == "Apprenti" || /.tincelle|Blessure mentale|Projectile magique/.test(sData))
								sCategorie = "Sort ";
							else sCategorie = "Arme ";
							sCategorie += (sPortee == 0 ? "de corps à corps" : "de distance");
						}
					}
					var oObjet = {
						id: sId,
						nom: sNom.replace(/\\/g,''),
						niveau: parseInt(sNiveau), 
						alignements: sAlign.split(" / "), 
						poids: parseFloat(sPoids), 
						PA: parseInt(sPA), 
						portee: parseInt(sPortee), 
						degats: sDegats, 
						craft: sCraft, 
						categorie: sCategorie,
						URLDesequiper: sURLDesequiper,
						URLImage: sImgUrl
					};
					aEquipe.push(oObjet);
				}
			}
		}
		//On passe au contenu du sac (normal/cape, mode normal/don, mais pas équipés)
		for(var n = 0, oDiv; oDiv = dom.tag(oDivSac, "div", n); n++)
		{
			if(oDiv.getAttribute("id") == "inventbagslot")
			{
				var sNom = "", sNiveau = "", sAlign = "", sPoids = "", sPA = 0, sPortee = 0, sDegats = "", sCategorie = "", sNombre = 1, sURLSortieCape="", sURLRangementCape="", sURLDon="";
				var oObjet = {};
				//On vérifie s'il y a plusieurs exemplaires (si oui: on stocke le chiffre du DIV suivant et on prévoit de sauter ce DIV suivant qui ne sera pas à analyser)
				if(oDiv.nextSibling && dom.tag(oDiv.nextSibling, "p").length > 0 && dom.tag(oDiv.nextSibling, "p", 0).getAttribute("id") == "inventslotquantity")
				{
					sNombre = oDiv.nextSibling.firstChild.firstChild.nodeValue;
					n++;
				}
				var sOmo = (oDiv.firstChild.nodeName == "A")? oDiv.firstChild.getAttribute("onmouseover") : oDiv.getAttribute("onmouseover");
				var sOc = (oDiv.firstChild.nodeName == "A")? oDiv.firstChild.getAttribute("onclick") : oDiv.getAttribute("onclick");
				var sId = sOc.match(/ido=(\d+)/)[1];
				if (sOc.match(/<li><a href=obj_deposer\.php\?.+?>/)) sURLDeposer = sOc.match(/<li><a href=(obj_deposer\.php\?.+?)>/)[1];
				else sURLDeposer = "";
				var aA = /overlib\(\'\s+<b>(.+?)<\/b>.+?<li>Niveau requis : (\d+)<li>Classe requise : (.+?)<li>Poids : (\d+\.?\d?)(.+)$/.exec(sOmo);
				sNom = aA[1]; sNiveau = aA[2]; sAlign = aA[3]; sPoids = aA[4]; sData = aA[5];
				if(/bag=mgc/.test(location.href) && /Sortir de la cape/.test(dom.att(oDiv.firstChild, "onclick")))
				{
					var aA = /<a href="?(inv_sac\.php\?act=0&ido=\d+&craft=(\d+))"?> Sortir de la cape<\/a>/.exec(dom.att(oDiv.firstChild, "onclick"));
					sURLSortieCape = aA[1]; sCraft = aA[2];
				}
				else if(/Ranger dans la cape/.test(dom.att(oDiv.firstChild, "onclick")) && ! /Aucune cape équipée/.test(dom.id("linkcape").innerHTML))
				{
					var aA = /<a href="?(inv_sac\.php\?act=1&ido=\d+&craft=(\d+)(?:&e=\d+))"?> Ranger dans la cape<\/a>/.exec(dom.att(oDiv.firstChild, "onclick"));
					sURLRangementCape = aA[1]; sCraft = aA[2];
				}
				if(/ac=don/.test(location.href))
				{
					var aA = /a href=(.+?&craft=(\d+).*?)>/.exec(dom.att(oDiv.firstChild, "onclick"));
					sURLDon = aA[1]; sCraft = aA[2];
				}
				var sImgUrl = dom.tag(oDiv, "img", 0).src;
				oObjet = {
					nom: sNom.replace(/\\/g, ''),
					id: sId,
					nombre: parseInt(sNombre),
					niveau: parseInt(sNiveau),
					alignements: sAlign.split(" / "),
					poids: parseFloat(sPoids),
					URLSortieCape: sURLSortieCape,
					URLRangementCape: sURLRangementCape,
					URLDon: sURLDon,
					URLDeposer: sURLDeposer,
					craft: sCraft,
					URLImage: sImgUrl
				};
				if(/<li>Equipé : (?:Oui|Non)/.test(sData)) //Protection
				{
					sCategorie = "Protection";
					oObjet.PA = parseInt(sPA);
					oObjet.portee = parseInt(sPortee);
					oObjet.degats = sDegats;
					oObjet.categorie = sCategorie;
					aProtections.push(oObjet);
				}
				else if(/<li>Coût PA : \d+/.test(sData)) //Enchantement, sort, arme ou divers
				{
					var aA = /<li>Coût PA : (\d+)(.*)/.exec(sData);
					sPA = aA[1]; sData = aA[2];
					oObjet.PA = parseInt(sPA);
					if(/<li>Distance maximale : \d+/.test(sData)) //enchantement
					{
						sPortee = sData.match(/<li>Distance maximale : (\d+)/)[1];
						sCategorie = "Enchantement";
						oObjet.portee = parseInt(sPortee);
						oObjet.degats = sDegats;
						oObjet.categorie = sCategorie;
						aEnchantements.push(oObjet);
					}
					else if(/<li><u>Type de dégâts\s*:\s*<\/u>\s*.+?<li>.+/.test(sData)) //arme/sort CAC/distance
					{
						var aA = /<li><u>Type de dégâts\s*:\s*<\/u>\s*(.+?)(<li>.+)/.exec(sData);
						sDegats = aA[1]; sData = aA[2];
						oObjet.degats = sDegats;
						if(/<li><u>Type d\\'arme\s*:\s*<\/u>\s*Corps à corps<li>/.test(sData)) sPortee = 0; //arme/sort de CAC
						else sPortee = sData.match(/<li><u>Distance d\\'attaque\s*:\s*<\/u>\s*(\d+)<li>/)[1]; //arme/sort de distance
						oObjet.portee = parseInt(sPortee);
						var sPremierAlignement = (/ \/ /.test(sAlign)? sAlign.split(" / ")[0]: sAlign);
						if((EpicFriend.AlignementPrimitif(sPremierAlignement) == "Apprenti" || /[ÉE]tincelle|Blessure mentale|Projectile magique/.test(sNom)) && ! /Sceptre/.test(sNom))
							sCategorie = "Sort ";
						else sCategorie = "Arme ";
						sCategorie += (sPortee == 0 ? "de corps à corps" : "de distance");
						oObjet.categorie = sCategorie;
						if(oObjet.categorie == "Arme de corps à corps") aArmesCAC.push(oObjet);
						if(oObjet.categorie == "Arme de distance") aArmesDistance.push(oObjet);
						if(oObjet.categorie == "Sort de corps à corps") aSortsCAC.push(oObjet);
						if(oObjet.categorie == "Sort de distance") aSortsDistance.push(oObjet);
					}
					else  //divers
					{
						sCategorie = "Divers";
						oObjet.PA = parseInt(sPA);
						oObjet.portee = parseInt(sPortee);
						oObjet.degats = sDegats;
						oObjet.categorie = sCategorie;
						aDivers.push(oObjet);
					}
				}
			}
		}
		//Construction du résumé et de son UI
		var oDivLiens = dom.el("div", {id: "ef_inv_liens", style: "text-align:center"});
		var aTousObjets = aProtections.concat(aArmesCAC, aArmesDistance, aEnchantements, aSortsCAC, aSortsDistance, aDivers);
		if(/frame_inventaire\.php/.test(self.location.toString()))
		{
			var oMetaListe = {
				Equipe: "Matériel équipé",
				Protections: "Protections",
				Enchantements: "Enchantements",
				ArmesCAC: "Armes de corps à corps",
				ArmesDistance: "Armes de distance",
				SortsCAC: "Sorts de corps à corps",
				SortsDistance: "Sorts de distance",
				Divers: "Divers"
			};
			function couleurAP(aListe) {
				var sAP = EpicFriend.AlignementPrimitif(aListe[0]);
				if(sAP == "Rôdeur") sAP = "Rodeur";
				return EpicFriend.Preferences.CouleursAlignements[sAP];
			}
			var oResume = dom.el("div");
			for(var sNomListe in oMetaListe)
			{
				var aListe = eval("a" + sNomListe), sCat = oMetaListe[sNomListe];
				if(aListe.length > 0)
				{
					dom.add(oResume, dom.el("h2", {text: sCat}));
					aCode.push("[size=18][b]" + sCat + "[/b][/size]\n");
					for(var p in aListe)
					{
						var oO = aListe[p];
						dom.add(oResume, dom.txt("- "));
						if(oO.nombre > 1) dom.add(oResume, dom.txt(oO.nombre+"x "));
						dom.add(oResume, dom.el("a", {
							href: ("http://epicwar.baba0rum.com/epicshop/epicshop.html?chercher="+encodeURI(oO.nom.replace(/\\/g, "").replace(/^E/, "[ÊE]").replace(/^A/, "[ÂA]"))),
							title: "Voir dans l'EpicShop",
							style: "text-decoration:none; color:black; font-weight:bold;",
							text: oO.nom.replace(/\\/g, "")}));
						if(utils.defined(oO.id))
							dom.add(oResume, dom.el("span", {text: "("+oO.id+")"}, {marginLeft:"0.25em", marginRight:"0.25em", fontSize:"0.85em", color:"#333"}));
						dom.add(oResume, dom.txt(" : "));
						dom.add(oResume, dom.el("span", {style: "color:"+couleurAP(oO.alignements), text: oO.alignements.join("/")+" "+oO.niveau}));
						dom.add(oResume, dom.txt(", "+oO.poids+"kg"+(oO.PA>0 ? ", "+oO.PA+"PA": "")+(oO.portee>1? ", "+oO.portee+" cases": oO.portee==1? ", CAC": "")+(oO.degats!=""? ", "+oO.degats: "")));
						dom.add(oResume, dom.el("br"));
						aCode.push("- "+(oO.nombre > 1? oO.nombre+"x ": "")+"[b]"+oO.nom.replace(/\\/g, "")+"[/b] : [color="+couleurAP(oO.alignements)+"]"+oO.alignements.join(" ou ")+" "+oO.niveau+"[/color], "+oO.poids+"kg"+(oO.PA>0 ? ", "+oO.PA+"PA": "")+(oO.portee>=1? ", "+oO.portee+" cases": "")+(oO.degats!=""? ", "+oO.degats: ""));
					}
					aCode.push("\n");
				}
			}
			dom.add(oResume, dom.el("hr"));
			dom.add(oResume, dom.el("h5", {text: "BBCode"}));
			dom.add(oResume, dom.el("textarea", {style: "width:100%; height:10em;", text: aCode.join("\n")}));
			dom.add(oResume, dom.el("h5", {text: "CoolForum (forum officiel)"}));
			var aCodeCF = aCode.map(function(element) {return element.replace(/b\]/g, "bold]");});
			dom.add(oResume, dom.el("textarea", {style: "width:100%; height:10em;", text: aCodeCF.join("\n")}));
			dom.add(oResume, dom.el("h5", {text: "Les-forums.com"}));
			var aCodeLF = aCode.map(function(element) {return element.replace(/olor=/g, " ").replace(/olor\]/g, "]").replace(/\[size=18\](.+?)\[\/size\]/g, "[s 3]$1[/s]");});
			dom.add(oResume, dom.el("textarea", {style: "width:100%; height:10em;", text: aCodeLF.join("\n")}));
			sHeight = window.getComputedStyle(oDivInv, null).getPropertyValue("height");
			var aA = /^(\d+)(.*)/.exec(sHeight);
			var sValeur = aA[1]; var sUnite = aA[2];
			var oPopupResume = ui.popup("epicfriend_resume_inventaire", oResume.innerHTML,
				{
					title: "Résumé de l'inventaire",
					anchor: oDivInv
				},
				{
					zIndex: 10,
					opacity: 0.85,
					width: "100%",
					height: sHeight,
					overflow: "auto",
					backgroundColor: "#fffbfa",
					fontSize: "11px",
					textAlign: "left",
					color: "black"
				},
				{},
				{ padding: "0.5em" });
			oPopupResume.style.display = "none";
			//Ajout du lien d'affichage du résumé et de liens de sortie rapide de la cape pour les objets favoris
			dom.add(oDivLiens, dom.el("a",
				{
					href: "javascript:(function() {var disp=document.getElementById('epicfriend_resume_inventaire').style.display; document.getElementById('epicfriend_resume_inventaire').style.display=(disp=='block'? 'none': 'block');})()",
					title: "Résumé textuel du contenu de l'inventaire",
					text: "[Résumé]"
				},
				{
					fontSize: "75%",
					margin: "0 0.3em",
					color: "white",
					fontWeight: "bold",
					display: "block"
				})
			);
			var nObjFavori = -1;
			for (var sNomObjFavori in EpicFriend.Preferences.Inventaire)
			{
				nObjFavori++;
				var objFavori = EpicFriend.Preferences.Inventaire[sNomObjFavori];
				var sNom = objFavori.nom, sCode = objFavori.code;
				if (sNom != "" && sCode != "")
				{
					var sImgURL = "img/o/" + sCode + ".gif";
					var sURLSortieCape = "inv_sac.php?act=0&ido=" + sCode + "&craft=0";
					var oLienFavori = dom.el("a",
						{
							id: "epicfriend_inventaire_objet_Favori_" + nObjFavori + "_" + sCode,
							"class": "epicfriend_inventaire_objet_Favori",
							title: "Sortir " + sNom + " de la cape",
							href: sURLSortieCape
						},
						{ "display": "inline-block", marginRight: "1px", backgroundImage: "url(" + sImgURL + ")", width: "40px", height: "40px", cursor: "pointer" });
					dom.add(oDivLiens, oLienFavori);
				}
			}
		}
		//Ajout de la liste déroulante pour sortie rapide des objets de la cape (si on est dans la cape, bien sûr)
		if(! /Aucune cape équipée/.test(dom.id("linkcape").innerHTML) && /\?bag=mgc/.test(location.href))
		{
			dom.add(oDivLiens, dom.el("br"));
			dom.add(oDivLiens, dom.el("label", { text: "Sortir de la cape :" }, { fontSize: "small" }));
			var oSelObjets = dom.el("select", {id: "epicfriend_inventaire_cape_sortie_rapide_objet_selecteur", style: "font-size:10px; background-color:#444; border:none; margin-left:0.5em;", title: "Sortie rapide d'un objet de la cape", onchange: "if(this.options[this.selectedIndex].value != '') window.location.href = this.options[this.selectedIndex].value;"});
			for(var n = 0, sNomListe; sNomListe = ["aProtections", "aArmesCAC", "aArmesDistance", "aEnchantements", "aSortsCAC", "aSortsDistance", "aDivers"][n]; n++)
			{
				var aListe = eval(sNomListe);
				dom.add(oSelObjets, dom.el("option", {value: "", text: "----------"}));
				for(var p = 0, oO; oO = aListe[p]; p++)
					dom.add(oSelObjets, dom.el("option", {
						value: oO.URLSortieCape,
						text: oO.nom+(oO.craft != "0"? " (crafté)": ""),
						style: "color:#eee;" + (oO.craft != "0"? "color:orange; font-style:italic;": ""),
						title: (oO.craft != "0"? "Attention objet crafté !": "")
					}));
			}
			dom.add(oDivLiens, oSelObjets);
			
			//Ajout du champ de recherche rapide d'objet et div d'affichage des résultats
			var aTousObjets=aProtections.concat(aArmesCAC, aArmesDistance, aEnchantements, aSortsCAC, aSortsDistance, aDivers);
			var oInpRechObjet=dom.el('input', {
				id: 'epicfriend_inventaire_cape_rech_rapide_objet_champ',
				type: 'text',
				style: 'font-size:small; width:6em; background-color:#444; color:#eee;',
				title: 'recherche rapide d\'objet (4 caractères mini, expressions régulières activées, presser TAB ou ENTREE pour valider)'
			});
			dom.add(oDivLiens, oInpRechObjet);
			var oDivResultat=dom.el('div', {
				id:'epicfriend_inventaire_cape_rech_rapide_objet_affichage',
				style: 'display:none; margin:0 30%; padding:0; text-align:left; font-size:10px !important; max-height:5em; overflow:auto; text-align:center;'
			});
			dom.add(oDivLiens, oDivResultat);
			oInpRechObjet.addEventListener('change', function() {
				var sRech = document.getElementById('epicfriend_inventaire_cape_rech_rapide_objet_champ').value;
				if(sRech.length > 3)  //minimum 4 caractères
				{
					var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
					if(aObjetsTrouves.length > 0)
					{
						var oDiv=document.getElementById('epicfriend_inventaire_cape_rech_rapide_objet_affichage');
						oDiv.innerHTML='';
						for(var n=0,oObjet; oObjet=aObjetsTrouves[n]; n++)
						{
							var oA=document.createElement('a');
							oA.setAttribute('href', oObjet.URLSortieCape);
							oA.setAttribute('title', 'Cliquer pour sortir directement '+oObjet.nom+' de la cape');
							oA.style.display='block';
							if(oObjet.craft.toString()!='0')
							{
								oA.style.color='red';
								oA.style.fontStyle='italic';
							}
							oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
							oDiv.appendChild(oA);
						}
						oDiv.style.display='block';
					}
				}
			}, false);
			oInpRechObjet.addEventListener('focus', function() {
				document.removeEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
				document.getElementById('epicfriend_inventaire_cape_rech_rapide_objet_affichage').style.display='none';
			}, false);
			oInpRechObjet.addEventListener('blur', function() {
				document.addEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
			}, false);
			oInpRechObjet.addEventListener("keypress", function(e)
				{
					if (e.keyCode == 13)  //touche "Entrée"
					{
						var sRech = document.getElementById('epicfriend_inventaire_cape_rech_rapide_objet_champ').value;
						if(sRech.length > 3)  //minimum 4 caractères
						{
							var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
							if(aObjetsTrouves.length > 0)
							{
								var oDiv=document.getElementById('epicfriend_inventaire_cape_rech_rapide_objet_affichage');
								oDiv.innerHTML='';
								for(var n=0,oObjet; oObjet=aObjetsTrouves[n]; n++)
								{
									var oA=document.createElement('a');
									oA.setAttribute('href', oObjet.URLSortieCape);
									oA.setAttribute('title', 'Cliquer pour sortir directement '+oObjet.nom+' de la cape');
									oA.style.display='block';
									if(oObjet.craft.toString()!='0')
									{
										oA.style.color='red';
										oA.style.fontStyle='italic';
									}
									oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
									oDiv.appendChild(oA);
								}
								oDiv.style.display='block';
							}
						}
						this.blur();
					}
				}, false);
			/*
			document.addEventListener("keypress", function(e)
				{
					if (e.charCode == 114) //lettre "r"
						dom.id("epicfriend_inventaire_cape_rech_rapide_objet_champ").focus();
				}, false);
			*/
		}
		//Ajout de la liste déroulante pour rangement rapide des objets dans la cape (si on est hors-cape et qu'il y a une cape)
		if(! /Aucune cape équipée/.test(dom.id("linkcape").innerHTML) && /\/frame_inventaire\.php(?:\?bag=std)?$/.test(location.href))
		{
			dom.add(oDivLiens,
				[
					dom.el("br"),
					dom.el("label", { text: "Ranger dans la cape :" }, { fontSize: "small" })
				]);
			var oSelObjets = dom.el("select", {
				id: "epicfriend_inventaire_cape_rangement_rapide_objet_selecteur",
				style: "font-size:10px; background-color:#444; border:none; margin-left:0.5em;",
				title: "Rangement rapide d'un objet dans la cape",
				onchange: "if(this.options[this.selectedIndex].value != '') window.location.href = this.options[this.selectedIndex].value;"
			});
			for(var n = 0, sNomListe; sNomListe = ["aProtections", "aArmesCAC", "aArmesDistance", "aEnchantements", "aSortsCAC", "aSortsDistance", "aDivers"][n]; n++)
			{
				var aListe = eval(sNomListe);
				dom.add(oSelObjets, dom.el("option", {value: "", text: "----------"}));
				for(var p = 0, oO; oO = aListe[p]; p++)
					dom.add(oSelObjets, dom.el("option", {
						value: oO.URLRangementCape,
						text: oO.nom+(oO.craft != "0"? " (crafté)": ""),
						style: "color:#eee;" + (oO.craft != "0"? "color:red; font-style:italic;": ""),
						title: (oO.craft != "0"? "Attention objet crafté !": "")
					}));
			}
			dom.add(oDivLiens, oSelObjets);
			
			//Ajout du champ de recherche rapide d'objet et div d'affichage des résultats
			var aTousObjets = aProtections.concat(aArmesCAC, aArmesDistance, aEnchantements, aSortsCAC, aSortsDistance, aDivers);
			var oInpRechObjet = dom.el('input',
				{
					id: 'epicfriend_inventaire_noncape_rech_rapide_objet_champ',
					type: 'text',
					style: 'font-size:small; width:6em; background-color:#444; color:#eee;',
					title: 'recherche rapide d\'objet (4 caractères mini, expressions régulières activées, presser TAB ou ENTREE pour valider)'
				});
			dom.add(oDivLiens, oInpRechObjet);
			var oDivResultat = dom.el('div',
				{
					id:'epicfriend_inventaire_noncape_rech_rapide_objet_affichage',
					style: 'display:none; margin:0 30%; padding:0; text-align:left; font-size:10px !important; max-height:5em; overflow:auto; text-align:center;'
				});
			dom.add(oDivLiens, oDivResultat);
			oInpRechObjet.addEventListener('change', function() {
				var sRech = document.getElementById('epicfriend_inventaire_noncape_rech_rapide_objet_champ').value;
				if(sRech.length > 3)  //minimum 4 caractères
				{
					var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
					if (aObjetsTrouves.length > 0)
					{
						var oDiv = document.getElementById('epicfriend_inventaire_noncape_rech_rapide_objet_affichage');
						oDiv.innerHTML = '';
						for (var n = 0, oObjet; oObjet = aObjetsTrouves[n]; n++)
						{
							var oA = document.createElement('a');
							oA.setAttribute('href', oObjet.URLRangementCape);
							oA.setAttribute('title', 'Cliquer pour ranger directement ' + oObjet.nom + ' dans la cape');
							oA.style.display = 'block';
							if (oObjet.craft.toString() != '0')
							{
								oA.style.color='red';
								oA.style.fontStyle='italic';
							}
							oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
							oDiv.appendChild(oA);
						}
						oDiv.style.display='block';
					}
				}
			}, false);
			oInpRechObjet.addEventListener('focus', function() {
				document.removeEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
				document.getElementById('epicfriend_inventaire_noncape_rech_rapide_objet_affichage').style.display='none';
			}, false);
			oInpRechObjet.addEventListener('blur', function() {
				document.addEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
			}, false);
			oInpRechObjet.addEventListener("keypress", function(e)
				{
					if (e.keyCode == 13)  //touche "Entrée"
					{
						var sRech = document.getElementById('epicfriend_inventaire_noncape_rech_rapide_objet_champ').value;
						if(sRech.length > 3)  //minimum 4 caractères
						{
							var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
							if(aObjetsTrouves.length > 0)
							{
								var oDiv=document.getElementById('epicfriend_inventaire_noncape_rech_rapide_objet_affichage');
								oDiv.innerHTML='';
								for(var n=0,oObjet; oObjet=aObjetsTrouves[n]; n++)
								{
									var oA=document.createElement('a');
									oA.setAttribute('href', oObjet.URLSortieCape);
									oA.setAttribute('title', 'Cliquer pour ranger directement '+oObjet.nom+' de la cape');
									oA.style.display='block';
									if(oObjet.craft.toString()!='0')
									{
										oA.style.color='red';
										oA.style.fontStyle='italic';
									}
									oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
									oDiv.appendChild(oA);
								}
								oDiv.style.display='block';
							}
						}
						this.blur();
					}
				}, false);
			/*
			document.addEventListener("keypress", function(e)
				{
					bTextInput = e.target.nodeName.toLowerCase() == "input" && dom.att(e.target, "type") == "text";
					if (e.charCode == 114 && ! bTextInput) //lettre "r"
						dom.id("epicfriend_inventaire_don_rech_rapide_objet_champ").focus();
				}, false);
			document.addEventListener("keypress", function(e)
				{
					if (e.charCode == 99) //lettre "c"
						self.location.href = dom.tag(dom.id("linkcape"), "a", 0).href;
				}, true);
			document.addEventListener("keypress", function(e)
				{
					if (e.charCode == 105) //lettre "i"
						self.location.href = dom.tag(dom.id("linkinvent"), "a", 0).href;
				}, true);
			*/
		}
		//Ajout de la liste déroulante pour don rapide des objets (dans la cape ou pas)
		if(/frame_inventaire\.php\?.*?ac=don/.test(location.href))
		{
			var sJoueur = location.href.match(/&joueur=([^\?=&]+)/)[1];
			dom.add(oDivLiens,
				[
					dom.el("br"),
					dom.el("label", { text: "Donner à " + sJoueur + " :" }, { fontSize: "small" })
				]);
			var oSelObjets = dom.el("select", {style: "font-size:10px; background-color:#444; border:none; margin-left:0.5em;", title: "Don rapide d'un objet non équipé", onchange: "if(this.options[this.selectedIndex].value != '') window.location.href = this.options[this.selectedIndex].value;"});
			for(var n = 0, sNomListe; sNomListe = ["aProtections", "aArmesCAC", "aArmesDistance", "aEnchantements", "aSortsCAC", "aSortsDistance", "aDivers"][n]; n++)
			{
				var aListe = eval(sNomListe);
				if (aListe.length == 0) continue;
				dom.add(oSelObjets, dom.el("option", {value: "", text: "----------"}));
				for(var p = 0, oO; oO = aListe[p]; p++)
				{
					dom.add(oSelObjets, dom.el("option", {
						value: "javascript:if(confirm(\"Êtes-vous certain de vouloir donner "+oO.nom+" à "+sNomJoueur+" ?\")) self.location.href=\""+oO.URLDon+"\"",
						text: oO.nom+(oO.craft != "0"? " (crafté)": ""),
						style: "color:#eee;" + (oO.craft != "0"? "color:red; font-style:italic;": ""),
						title: (oO.craft != "0"? "Attention objet crafté !": "")
					}));
				}
			}
			dom.add(oDivLiens, oSelObjets);

			//Ajout du champ de recherche rapide d'objet et div d'affichage des résultats
			var aTousObjets=aProtections.concat(aArmesCAC, aArmesDistance, aEnchantements, aSortsCAC, aSortsDistance, aDivers);
			var oInpRechObjet=dom.el('input', {
				id: 'epicfriend_inventaire_don_rech_rapide_objet_champ',
				type: 'text',
				style: 'font-size:small; width:6em; background-color:#444; color:#eee;',
				title: 'recherche rapide d\'objet (4 caractères mini, expressions régulières activées, presser TAB ou ENTREE pour valider)'
			});
			dom.add(oDivLiens, oInpRechObjet);
			var oDivResultat=dom.el('div', {
				id:'epicfriend_inventaire_don_rech_rapide_objet_affichage',
				style: 'display:none; margin:0 30%; padding:0; text-align:left; font-size:10px !important; max-height:5em; overflow:auto; text-align:center;	'
			});
			dom.add(oDivLiens, oDivResultat);
			oInpRechObjet.addEventListener('focus', function() {
				document.removeEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
				document.getElementById('epicfriend_inventaire_don_rech_rapide_objet_affichage').style.display = 'none';
			}, false);
			oInpRechObjet.addEventListener('blur', function() {
				document.addEventListener('keypress', EpicFriend.ChargerRaccourcisClavier, false);
			}, false);

			oInpRechObjet.addEventListener('change', function() {
				var sRech = document.getElementById('epicfriend_inventaire_don_rech_rapide_objet_champ').value;
				if(sRech.length > 3)  //minimum 4 caractères
				{
					var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
					if(aObjetsTrouves.length > 0)
					{
						var oDiv=document.getElementById('epicfriend_inventaire_don_rech_rapide_objet_affichage');
						oDiv.innerHTML='';
						for(var n=0,oObjet; oObjet=aObjetsTrouves[n]; n++)
						{
							var oA=document.createElement('a');
							oA.setAttribute('href', 'javascript:if(confirm(\'Êtes-vous certain de vouloir donner '+oObjet.nom+' à '+sNomJoueur+' ?\')) self.location.href=\''+oObjet.URLDon+'\'');
							oA.setAttribute('title', 'Cliquer pour donner '+oObjet.nom+' à '+sNomJoueur);
							oA.style.display='block';
							if(oObjet.craft.toString()!='0')
							{
								oA.style.color='red';
								oA.style.fontStyle='italic';
							}
							oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
							oDiv.appendChild(oA);
						}
						oDiv.style.display='block';
					}
				}
			}, false);
			oInpRechObjet.addEventListener("keypress", function(e)
				{
					if (e.keyCode == 13)  //touche "Entrée"
					{
						var sRech = document.getElementById('epicfriend_inventaire_don_rech_rapide_objet_champ').value;
						if(sRech.length > 3)  //minimum 4 caractères
						{
							var aObjetsTrouves=aTousObjets.filter(function(element) { var re=new RegExp(sRech, 'i'); return re.test(element.nom); });
							if(aObjetsTrouves.length > 0)
							{
								var oDiv=document.getElementById('epicfriend_inventaire_don_rech_rapide_objet_affichage');
								oDiv.innerHTML='';
								for(var n=0,oObjet; oObjet=aObjetsTrouves[n]; n++)
								{
									var oA=document.createElement('a');
									oA.setAttribute('href', 'javascript:if(confirm(\'Êtes-vous certain de vouloir donner '+oObjet.nom+' à '+sNomJoueur+' ?\')) self.location.href=\''+oObjet.URLDon+'\'');
									oA.setAttribute('title', 'Cliquer pour donner '+oObjet.nom+' à '+sNomJoueur);
									oA.style.display='block';
									if(oObjet.craft.toString()!='0')
									{
										oA.style.color='red';
										oA.style.fontStyle='italic';
									}
									oA.appendChild(document.createTextNode(oObjet.nom+(oObjet.craft.toString()!='0'? ' (crafté)':'')));
									oDiv.appendChild(oA);
								}
								oDiv.style.display='block';
							}
						}
						this.blur();
					}
				}, false);
			/*
			document.addEventListener("keypress", function(e)
				{
					bTextInput = e.target.nodeName.toLowerCase() == "input" && dom.att(e.target, "type") == "text";
					if (e.charCode == 114 && ! bTextInput) //lettre "r"
						dom.id("epicfriend_inventaire_don_rech_rapide_objet_champ").focus();
				}, false);
			document.addEventListener("keypress", function(e)
				{
					bTextInput = e.target.nodeName.toLowerCase() == "input" && dom.att(e.target, "type") == "text";
					if (e.charCode == 99 && ! bTextInput) //lettre "c"
						self.location.href = dom.tag(dom.id("linkcape"), "a", 0).href;
				}, false);
			document.addEventListener("keypress", function(e)
				{
					bTextInput = e.target.nodeName.toLowerCase() == "input" && dom.att(e.target, "type") == "text";
					if (e.charCode == 105 && ! bTextInput) //lettre "i"
						self.location.href = dom.tag(dom.id("linkinvent"), "a", 0).href;
				}, false);
			*/
		}
		dom.add(oDivEntete, oDivLiens);
		//Poids restant
		var aPoids = dom.tag(dom.id("inventdescpds"), "p", 0).textContent.split("/");
		var nPoids = parseFloat(aPoids[0]), nPoidsMax = parseInt(aPoids[1]);
		var nPoidsRestant = nPoidsMax - nPoids;
		if (/\.\d{2,}/.test(nPoidsRestant))
		{
			var aA = /^(\d+\.)(\d)(\d).*$/.exec(nPoidsRestant);
			if (parseInt(aA[3]) >= 5) aA[2] = parseInt(aA[2]) + 1;
			nPoidsRestant = aA[1] + aA[2];
		}
		dom.att(dom.id("inventdescpds"), "title", nPoidsRestant + "kg restants");
		//Ajout de style sur la page d'inventaire
		sCSS = ".epicfriend_inventaire_objet_rapide:hover { background-color: white; -moz-border-radius: 4px; }";
		GM_addStyle(sCSS);
	},
	

	/**********************************************************************************************
	 *  P A G E   E S C O U A D E / C L E R G E
	 **********************************************************************************************/
	
	// Enrichissement de l'interface de la page d'escouade et peuplement de la base de données des joueurs de l'escouade
	/* x=10: "votre clergé", x=11: "clergés de votre race" */
	AmeliorerInterfaceEscouade : function()
	{
		var oCouleurAlignement = {
			combattant: "deepskyblue",
			rodeur: "lime",
			"rôdeur": "lime",
			apprenti: "palevioletred",
			aventurier: "black"
		};
		var nCompteurMembres = 0;
		var nomJoueurCourant = GM_getValue("nom_joueur_courant", "");
		//acquisition des données d'escouade/de clergé
		if((/frame_escouade\.php(?:\?x=2)?/.test(location.href) && monEscouade != "")
		 || /frame_escouade\.php\?x=(?:10|11)/.test(location.href))
		//~ if(/frame_escouade\.php(?:\?x=2|(?:10)|(?:11))?/.test(location.href) && EpicFriend.Preferences.MesEscouades[serveur] != "")
		{
			if(/\?x=10/.test(location.href)) var oFieldset = dom.tag(dom.id("EW_Content_Escouade"), "fieldset", 1);
			else var oFieldset = dom.tag(dom.id("EW_Content_Escouade"), "fieldset", 2);
			var oTable = dom.tag(oFieldset, "table", 0);
			var nTotalKills = 0;
			for(var n = 1, oLigne; oLigne = dom.tag(oTable, "tr", n); n++)
			{
				nCompteurMembres++;
				var oCellule2 = oLigne.childNodes[1];
				var sAlignement = oCellule2.firstChild.nodeValue;
				oCellule2.innerHTML = "<span style=\"color: " + oCouleurAlignement[EpicFriend.AlignementPrimitif(sAlignement).toLowerCase()] + ";\">" + sAlignement + "</span>";
				//Mise en valeur des morts et des vacanciers
				var oCellule1 = oLigne.childNodes[0], oCellule8 = oLigne.childNodes[7], oCellule7 = oLigne.childNodes[6];
				var sNomJoueur = oCellule1.textContent.replace(/^ */, "");
				if (/Mort|Vacances|Week.end/.test(oCellule8.innerHTML))
				{
					sX = ""; sY = "";
					for(var compteur = 0, oCellule; oCellule = oLigne.childNodes[compteur]; compteur++)
					{
						with(oCellule.style)
						{
							color = "black";
							fontStyle = "italic";
							backgroundColor = "#808080";
						}
					}
					var sProfondeur = null;
				}
				else
				{
					var aA = /(\d+) \/ (\d+)/.exec(oCellule7.innerHTML);
					var sX = aA[1]; var sY = aA[2];
					if(/Surface/.test(oCellule8.innerHTML)) var sProfondeur = "surface";
					else if(/Souterrain/.test(oCellule8.innerHTML)) var sProfondeur = "souterrain";
					else if(/Cloaque/.test(oCellule8.innerHTML)) var sProfondeur = "cloaque";
					else var sProfondeur = null;
				}
				//Kills
				nTotalKills += parseInt(oLigne.childNodes[4].textContent);
				//Ajout des XP restants pour level up
				var oCellule4 = oLigne.childNodes[3];
				var nXPActuels = parseInt(oCellule4.firstChild.nodeValue);
				var oCellule3 = oLigne.childNodes[2];
				var nNiveauActuel = parseInt(oCellule3.firstChild.nodeValue);
				var nXPProchainNiveau = EpicFriend.XPParNiveau[nNiveauActuel+1];
				var oDiv = document.createElement("div");
				oDiv.style.fontSize = "75%";
				oDiv.style.color = "#333";
				oDiv.appendChild(document.createTextNode("(" + (nXPProchainNiveau - nXPActuels) + ")"));
				oCellule4.appendChild(oDiv);
				//Mise en valeur des PV
				if(typeof oLigne.childNodes[8] == "object")
				{
					var oCellule9 = oLigne.childNodes[8];
					var aA = oCellule9.firstChild.nodeValue.split("/");
					var sPV = aA[0]; var sPVMax = aA[1];
					var nPV = parseInt(sPV); var nPVMax = parseInt(sPVMax);
					var nRapportPV = nPV/nPVMax;
					oCellule9.innerHTML = "";
					var oSpanPV = document.createElement("span");
					oSpanPV.style.color = (nRapportPV < 0.2 || nPV < 50)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier4 : (nRapportPV < 0.5 && nRapportPV >= 0.2)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier3 : (nRapportPV < 0.8 && nRapportPV >= 0.5)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier2 : (nRapportPV >= 0.8 && nRapportPV < 1 && (nPVMax - nPV) >= 20)? EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier1 : EpicFriend.Preferences.CouleursBlessuresEscouadeEpicVue.Palier0;
					oSpanPV.style.fontWeight = "bold";
					oSpanPV.appendChild(document.createTextNode(nPV));
					oCellule9.appendChild(oSpanPV);
					oCellule9.appendChild(document.createTextNode("/"+nPVMax));
				}
				//Peuplement de la base de données des joueurs de l'escouade
				EpicFriend.JoueursEscouade.push({
					nom : sNomJoueur,
					alignement : sAlignement,
					niveau : nNiveauActuel,
					PV : nPV,
					PVMax : nPVMax,
					x : parseInt(sX),
					y : parseInt(sY),
					profondeur : sProfondeur
				});
			}
			//Kills
			//~ console.info("EpicFriend: Moyenne de kills: "+(nTotalKills/nCompteurMembres))
			
			//Ajout de statistiques chiffrées de l'escouade au-dessus de la liste des membres,
			//et d'un lien pour revenir en haut
			var oDivStats = dom.el("div", {
				id: "epicfriend_escouade_statistiques",
				style: "font-size:100% !important; margin-bottom:0.5em;",
				text: "" });
			oDivStats.innerHTML += nCompteurMembres + " membres";
			var nTaux20Plus = EpicFriend.JoueursEscouade.filter(function(element) { return parseInt(element.niveau) >= 20; }).length;
			nTaux20Plus = parseInt(nTaux20Plus)*100/nCompteurMembres;
			if(/\./.test(nTaux20Plus)) nTaux20Plus = nTaux20Plus.toString().match(/(\d+\.\d).*/)[1];
			var nTauxComb = EpicFriend.JoueursEscouade.filter(function(element) { return EpicFriend.AlignementPrimitif(element.alignement) == "Combattant"; }).length;
			nTauxComb = parseInt(nTauxComb)*100/nCompteurMembres;
			if(/\./.test(nTauxComb)) nTauxComb = nTauxComb.toString().match(/(\d+\.\d).*/)[1];
			var nTauxRod = EpicFriend.JoueursEscouade.filter(function(element) { return EpicFriend.AlignementPrimitif(element.alignement) == "Rôdeur"; }).length;
			nTauxRod = parseInt(nTauxRod)*100/nCompteurMembres;
			if(/\./.test(nTauxRod)) nTauxRod = nTauxRod.toString().match(/(\d+\.\d).*/)[1];
			var nTauxAppr= EpicFriend.JoueursEscouade.filter(function(element) { return EpicFriend.AlignementPrimitif(element.alignement) == "Apprenti"; }).length;
			nTauxAppr = parseInt(nTauxAppr)*100/nCompteurMembres;
			if(/\./.test(nTauxAppr)) nTauxAppr = nTauxAppr.toString().match(/(\d+\.\d).*/)[1];
			oDivStats.innerHTML += " (Niv.20+:" + nTaux20Plus + "% <span style=\"color:" + oCouleurAlignement.combattant + ";\">Comb.</span>:" + nTauxComb + "% <span style=\"color:" + oCouleurAlignement.rodeur + ";\">Rod.</span>:" + nTauxRod + "% <span style=\"color:" + oCouleurAlignement.apprenti + ";\">Appr.</span>:" + nTauxAppr + "%)";
			var oLien = dom.el("a", {href:"#top", text:"Haut", style:"margin-left:1em", title:"Retourner en haut de la page"});
			dom.add(oDivStats, oLien);
			oFieldset.insertBefore(oDivStats, oTable);
			//Lien supplémentaire pour avoir une liste de destinataires de messagerie composée de tous les membres de l'escouade
			var oListeLiens = dom.tag(dom.id("EW_Content_Escouade"), "ul", 0);
			var aListe = EpicFriend.JoueursEscouade.map(function(element) { return element.nom; });
			var sListe = aListe.join(";");
			sListe = sListe.replace(/ /g, "");
			var oLien = document.createElement("a");
			oLien.href = "javascript:prompt('Membres de l\\'escouade en liste de destinataires', '"+sListe+"'); void(0);";
			oLien.setAttribute("title", "Liste de destinataires pour la messagerie, composée de tous les membres de l'escouade");
			dom.att(oLien, "class", "EW_LinkDark");
			oLien.appendChild(document.createTextNode("Liste de messagerie"));
			var oLi = dom.el("li");
			dom.add(oLi, oLien);
			dom.add(oListeLiens, oLi);
			//Lien supplémentaire pour avoir une liste des positions des membres vivants et actifs
			var oLien = dom.el("a", {
				//~ href: 'javascript:ui.popup("ef_escouade_position_membres", "<textarea>' + "s" + '</textarea>", { anchor: oLi }, null, null, { fontSize: "10px" }); void(0);',
				href: "#",
				text: "Position des membres vivants et actifs",
				class: "EW_LinkDark",
				id: "ef_escouade_lien_position_membres"
			});
			oLien.addEventListener("click", function() {
				var aVivants = EpicFriend.JoueursEscouade.filter(function(element) { return utils.defined(element.profondeur); });
				var sHtml = '<textarea style="width:100%; height:100%;" onclick="this.select();" onfocus="this.select();">';
				for (var a = 0, oJ; oJ = aVivants[a]; a++)
					sHtml += "[b]" + oJ.nom + "[/b] : " + oJ.x + "/" + oJ.y + " (" + oJ.profondeur + ")\n";
				sHtml += "</textarea>";
				var oPopupPosMbres = ui.popup("ef_escouade_position_membres", sHtml, { anchor: dom.tag(dom.id("EW_Content_Escouade"), "ul", 0) }, null, null, null);
				dom.style(oPopupPosMbres, { width: "300px", height: "200px", zIndex: "100" });
			}, true);
			dom.add(oListeLiens, dom.add(dom.el("li"), oLien));
		}
		//gestion des sans-escouade/sans-clergé
		if(/frame_escouade\.php(?:\?x=(?:1|3|(?:10)|(?:11)))?/.test(location.href) && monEscouade == "")
		{
			var oJoueurEscouade = {
				nom : nomJoueurCourant,
				alignement : GM_getValue("alignement_joueur_courant"),
				niveau : GM_getValue("niveau_joueur_courant"),
				PV : (/^(\d+)/.exec(GM_getValue("pv_joueur_courant")))[1] || "?",
				PVMax : (/\/(\d+)$/.exec(GM_getValue("pv_joueur_courant")))[1] || "?",
				x : parseInt(GM_getValue("loc_joueur_courant", "").match(/^(\d+)/)[1]),
				y : parseInt(GM_getValue("loc_joueur_courant", "").match(/\/(\d+)$/)[1]),
				profondeur : GM_getValue("profondeur_joueur_courant", "")
			};
			EpicFriend.JoueursEscouade.push(oJoueurEscouade);
		}
		//Insertion du script Overlib
		//~ if (typeof overlib != "function")
		//~ {
			var oDivOverlib = document.createElement("div");
			oDivOverlib.setAttribute("id", "overDiv");
			oDivOverlib.style.position = "absolute";
			oDivOverlib.style.visibility = "hidden";
			oDivOverlib.style.zIndex = "9999";
			oDivOverlib.appendChild(document.createTextNode(""));
			document.body.insertBefore(oDivOverlib, document.body.firstChild);
			var oScriptOverdiv = document.createElement("script");
			oScriptOverdiv.setAttribute("src", "ovl/overlib.js");
			oScriptOverdiv.setAttribute("type", "text/javascript");
			document.getElementsByTagName("head")[0].appendChild(oScriptOverdiv);
		//~ }
		//Liens supplémentaires pour afficher les mini-cartes
		var oDivConteneur = dom.id("EW_Content_EscMenu");
		var oDivEntete = dom.el("div", { id: "epicfriend_escouade_entete_liens_epicfriend" });
		dom.add(oDivEntete,
			dom.el("a",
				{
					href: "javascript:dom.show(dom.id('ef_esc_popup_minicartes'), 'block');",
					text: "Minicartes",
					"class": "EW_LinkLight"
				})
			);
		dom.add(oDivConteneur, oDivEntete);
		//Conteneur des minicartes
		var oDummy = dom.el("div");
		dom.add(oDummy,
			[
				dom.add(dom.el("div"),
					[
						dom.el("a",
							{
								id: "ef_esc_lien_montrer_minicarte_surface",
								"class": "ef_esc_lien_montrer_minicarte",
								href: "#",
								text: "Surface"
							}),
						dom.el("a",
							{
								id: "ef_esc_lien_montrer_minicarte_souterrain",
								"class": "ef_esc_lien_montrer_minicarte",
								href: "#",
								text: "Dédale"
							}),
						dom.el("a",
							{
								id: "ef_esc_lien_montrer_minicarte_cloaque",
								"class": "ef_esc_lien_montrer_minicarte",
								href: "#",
								text: "Cloaque"
							})
					]),
				dom.el("div",
					{
						id: "ef_esc_minicarte_surface",
						"class": "ef_esc_minicarte"
					},
					{
						backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAGkCAMAAABJkqEHAAADAFBMVEUAAP9ubm5kfi9CZFUA%2FwCqqqqggADazYv%2FAACJkn%2BIiIjS0tKlp2otPz%2BVi2z04s1CeFXyaaQACHasAAABS8oAAABpoADddvIARk9MVmz32AGwABIARlcAAAAAAgAIAAAAAAAAAAAAYgAIAAAACgDyaaQADXYQAAAAEvk6AEMAXABzAFUAZQBzAHIAXADpAEoAcgBtAPQAZQBQAFwAaQB0AGMAdQBlAHIAcwBFAFwAcABjAGkAVwByAGEAXABhAGMAcgBlAHQAXwBvAHIAbQBuAGkAZQBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJOAAAdbwAAAAYAAAoUAABAn8AAAAS%2BIgAFQCiAIwAAAIS%2BOT8AABif%2F0AZAB%2FHXAAAQJIAAACfygS%2BKwYwwBJdvJ28hgAAAAAAAAAAAAAAADyGEn5KHZdABJ1vIgAALfKrAD%2FAUsBTv9LyqwAGAEAAAAAAAAS%2BRAAQAAAAADnfAVNAAAAAWJLR0QR4rU9ugAAAAlwSFlzAAAOxAAADsQBlSsOGwAAGJ9JREFUeNrtnet6ozyvhgttM%2Bk0zXznf7SL1MQI7ZCNTZJ3Pf4xV6YOBPsmkdD27W14G8fx%2Ff19XI%2F5L8Mox8fvsGb9Y5exe%2Fbz89OZPZ1O6T1ppJnbi85XFZ9d7flw%2B6%2BkkMbbgPHsY3zDN%2BkFvkkVH6xCSpuyuojhvfeCKQA6K9mk188GKVG5%2FTuMFiFAAiRA6gSJv%2FVpluTMMiR0NrNZxvD5qGuW99N7HsM7IAESIB0M6TkxBGdnVBrC5XU3SH%2BGP9aoO3O%2BbEACJEDqAUmVSefz%2BUURqgr6S0BanhkACZAAqSkkU%2F%2Bzn4ST4mjSFR%2F8EOV%2BWuTb25u6Ivpv5MzJLvBImQRIgARIfVTweQ2%2FGNLHbGIonXWesemxiqPFPrNjQp3X3O6qKiA5XwZnABIgAVInSMytmyEpIO8ySf%2FsEoTpDKqRdL%2FEohbYp7I4BL1cgARIgNQEUuSiVx%2BmQSpakowlStcqb446hVWNJeqEfz%2BkiKQEJEACpCaQ4pelSKZHmFDZk3%2FEhLryr7uf69yym597qOIASIAESLshOc%2F2it3BPbUqsZbD%2ByBkC%2BaBRK6kTMeaIeb7ZNJpOFWvF1kVr5BVgW%2FSC3yTWsmk5ubX%2FbOrjBcjligik1KY%2B%2B3fo%2FxJbDMBCZAA6XhIXCzt2MrpN%2Frr64slzDix0dM7l%2FcXRor7yq4vZdPnprFHrkz4q6UdIAESIHWC5Cis3My6I%2F14wjAt%2B12MeT8GfWozZVpVo63EmMhm5ZujDtIiDjVpF7wqQAIkQOoEyf%2FgFSft2L9%2F%2FwbtEV%2FGuO3IoE9VVIigWc0Vic37ZVLd5wISIAHSoyB9f38rnAJubB9Sc5nELA7M6BBRlFWLw%2BVycSwO1FNlue0jYQqW%2FAYkQAKkhpBKY5T3xze3sjjIhbHtWAmkWivJJY3hksfmzZFH9lQxi%2B2mlQSQAAmQekAybY7338qfnx965CyWGqWRlM7GgzKpdXX%2F5%2BbZTUiKFr4jBh2QAAmQ%2BkGSqmGG9PM7Zk7Dn%2F0LbjVLlWx9m8qrdPHzEEh0ao%2B0axYLDkiABEhbkNjvu3pZCRIds2QaRExMOwyt5BkTS00y%2FXyZVGFTACRAAqQDIBWVgMm02AdPg0G6vadEjX6t2q%2FVkMynHWRV%2FNeyKvBNesZv0h6fEH3GzpAWudVusyTCUolV4U9ycgiDkFpZOgAJkACpH6SKUydIUmI9m1xJGEpV4eRBD%2FqTml8zIAESID0bpGkshMaoc72iwldR7ddSM%2BjFHlQmrf6%2BTqpRV%2FQxfAASIAHSYyFJV%2FTKkjr8OPlp0ywd1%2BtVQqqzKTAzaDp2CbLp2VlTlzcPlaOABEiA1Fa7%2B1HH8MP4XX9HgjHNnn5Heq%2BaB6gXsn9WBT0p2boNNGBT8FOXGyQ2AxIgAdJuSD%2FWGFaShr5IsxlSVsQbSo6xRTFr1dBpPRhMkKq3Mjib9%2Bffv3%2FTZ%2F37HYAESIB0GKTrfXBd%2FFcmyTghqYJTu4MaKb6pgkfKHVrO5laemwkS%2B0uWstXJyXOm93r2HxvDP0ACJEA6BpLKoG7B6TeXQmJ46EarsmGzMVvQQa5KFxq%2FLpcsIfmfu8rZc%2BPImWUHkAAJkB4FSWrhPqRN30xKjMk2iI%2Ffkabm1%2FvU2R6K8s1HTiBFrCR0XRmDfm2DTSioggMSIAFSH0g7AxynBX8MtwUkTmkx9LWjgkdSpou20pJ2%2B82%2BFJJ6LJU61MRQBglJC6%2BUVYFv0vN%2Bk4r8Sb5ayRdwh6SIKxeDNdu7GYk%2Fe1vMoNxzeaT1so1ikKwBSIAESM8GqWjBSQV3FPTVD3oAUnyjdetJrXKf%2FpIgKaJofVP6MgmQAAmQHguJlWnIdsMEyVxtAJI%2F60CiFSL8z6VxmfmxQYZsLtg0wy61sND1yroVzMlkrVfhAEiABEhPAGk0HOQqpGB3TPoLPmrd0yXC7JsJyiTdo19yY9FkbBWShcGHNC3EgmRRBCRAAqTDINE157LPe2SShDSdkEFyRhBSukiuMZfX4ZKFeHwbijqoCj7te6o0LSGl9wASIAHSoyA5seDq0%2Ft8Net4IKbXUqkjZZJ8Pncib4IyKe6Yt0wS1GQsBY9qU8iry7NMJs2obJm0uV5AAiRAagjJMbCq64n082ZKNkNoLTgOSQokCskvTFNnflVtKPnmo9FRTORMl%2BpYHAAJkADpIZCCvpkKSEWzkUy%2FCQPN1bGc634D46LqEuyamaBNs%2Fm%2F0uJghQoVPycBEiABUhUkJ%2BInhxIGIU2q5%2BoRvARSZLPomdM4n8%2FKo7%2BwZdAr9COcpIVl1TVKQKKPDQwS5%2BT6kzZSXwAJkACpBaTIdkw%2F%2FWzNDJK6I3JJDJLpHSdGUtajjiFkmdhx9d3CEJFJ2esvV6TaKRxIN9Vc8zZxSEhaeNVeFfgmPdc3qciUmUtxyV%2F%2FUfS4pcGRnN9dYklOc9uSgTSlk3eAayRtEgsuDRY3ibsFKe3PJiRFFwckQAKkQyBtJgkrjeICFodplmaJcBPAYLqakkySoY3Mye0YSa2wS6dChOyqLuWW5fIPQnIsDoAESIB0DCT1sZ9VaqiAlJakJsVl0%2B1Iy9xosoH%2BfdPLlQFnSE4PpCIFnTYSZuekElqFNKPasjgsviVAAiRA6g%2FJv%2Bg4pBQHmS5at2Ouwy6TZVaNFlKabpZYDU5iJElpOqsG%2FZwZEnvMkL63dHLWgTifmaFZpBQgARIgPRMkxSFNnOv5gmg8t5JLYxTEUW0KqkxqZVOom%2F0Ug912lkzKZ9ZtrPeiNoAESID0bJCygq6aQefewOsEFa40G2dm3qZSSPH6rXMl6Npy1bQTfL7tHA%2BZBWk6sJdMAiRAAqTWMilvbtY7mUyywi6lBswCDVXd3Tp2v9QpraGfZRKFFDm2o8UBkAAJkMKQuBZoXDRTwZnXZ%2F5veVL0ZmDlHB70CBXcR5jWC0iABEj%2FSUhqLa3ZzZx09B2btSmT9qvgzWdlaz1ZHWwTksoJkAAJkHpAiiw4uX8iEut4SAfPTvci7QY6Ldx86tAgsVhwixOyKl42qwLfpOf6JtVddB2koiQTaazc3%2BYkPqu7yd0KEU6J7aBMWpitOQESIAHSMZBUU2a8dOCe2WMgNWkkLK0kzsNMpCA1IAESIB0PybmsAyBRi8aRMkkH6dpf4mcO1t8HJEACpAMgRRqzWZd1uVwi20ELQ6cK185m0VL4PSDJvun%2Bsay6RKmFxYd0Pp8BCZAA6TBITWTSaTi12kqerFIY09NPYi22ZtceQU3VLPUl3aDTLcssDpQTIAESIHWCpHZIWjLljIv2s%2BbiXcZVDFZizFjev1wtSlghV%2BpuDjXv5YZqeDerUQMSIAFSN0jqB094Pj4%2BMqS4bLCCtou6HKWTqJDqtlLWYhhF%2BCNLbG6F0IJEBdLHfQASIAFSP0jWk%2F%2BmTHKUTv%2FM8QUHi1lXeMga4pcnpzd0gs3qOOS4%2BcwJkAAJkA6AtN9YuXPWkXZ5%2FRmSHrgT8AlZhQXr%2FEkVqj%2FLbU6Q9ioOgARIgFQIyY%2BekfYIM8e4G%2BA9Msmv7N%2Fvmpm5OXXQ%2FP7%2BTgbWaZZZV5O4miEhaeElsyrwTXq6b5JVm6D6siKu9%2F2Q%2FI12imj7gH07CJ3dU93V751JS4AlToAESIDUD1Jp9EyFgbVh6GTQhMqsFUXqe8NZtQwr8yexooeABEiA1APSWJIK0jAeqFSeLdaHP398w27QptBq1qw%2BY9dgVTujezIJkAAJkBpBihs6n0FBVySTmK07c77Uoms2q8%2BsZ3kcpNFuZMMKDkiABEgtIFVsZdy5Lmd95%2FrmmR1I5%2FM5blPYuRvWLm%2F2PleDI%2FOJAQmQAOnZIHHxM7z3fnrXZc9gC6TOKnikIVx8FpAACZCeEJJuRbWPTW3b2m4WTV%2BRHYjHpvHcERU8qGSrs2w%2FAQmQAKkVpLbNOTafzyuSk61Z3Wk0%2FFEhHWlg3S%2BTAAmQAKkHJP%2BDncib5v6khWK5cp%2FAvL29ZQf580NKIZINSk4DEiABUrfi7Zuzl2kMl%2BbyzFH9c66I2lkziL9HPFDGIKvSRBuKIGnhtXtV4Jv0LN%2BkTr2IEiRrdJUNE6T3%2B1AMIo%2BDFFHB1RMDEiABUm9I%2B2VSE0ibFVpHlqh8h%2BQ0BekNSRE%2FAUjWiQEJkADpaSHNRQiGj0zlfD4veLRjKQbqbXongx6b63YxbXt6kSpeWVbjA5z6qu0AkAAJkP57kCYSEtJKGhWe2ZJJqk2BtSg%2BOFpIhZRE4yYk58SABEiA9BBIq70uh%2BQcy6TOjzGyXImUnqHvibjtszxzZOFmqnZQJq3U9OGf%2FsAASIAESI%2BAZG00%2B%2BPypuGyCUmtWDqNVKTPgkR7Z9IzSAx%2BHqBqUKZs8uu588egkdPO7BtYpT3ic%2Fhk56RRC4AESIB0DCTLSJou2pmlkILyLA8GScUQLyxINXLLHjH%2FUTjm9xRhZJCW2CCZ5TKI%2BmhFMgmQAAmQekLyPUZsVv31n3ncx%2FV6XbAYkOZNr62jSlvcMWGmKuiWYbcU0q0AjW1xSMeqhMwqXYAESIDUARKTJTdhUw5JckpnVhlImTQbGkSFfV0btm0ZTjOShgk5qkxSKzXkyoNJUu6yOAASIAHSFqS34c3%2FFVZNqFLJjkisiJK9Cam6f9J8uF2DtSgYNFJyejNaKFjrFlkVr5BVgW%2FSC3yTilJQVgKJYOB%2FL4dE74ysglMdndoO9jcj4W0%2B%2BzvXrSqrm%2Fin%2FwISIAFSP0jqBzMXS8agEqISS90OFVL614dUYehkMilbK%2BiHNoEUtEfwNgZ1MgmQAAmQGkGST%2BAZz%2FSDPr%2By%2FUlMYhUtWBpYVUhFW8mkrGmfbQFJXe%2BeGHRAAiRA6gpJOowVlzOBxCTTBJL5k9JPsKPc0xeWxeHm%2F%2F69OfZvZea0ujDNn2R5m%2BoAV6RbAxIgAVJXSCx6Rp63yMBasSTuQ6JhjuWbpT7bM8nE1isrQVTcHIu2vQMwIAESIHWFZB2c5ZPvPncQFkHKHxqM5y61CzjdlZiFpbRUYmKTV%2F058NjHxooDIAESILU2sKZBpY7uTIqlvoyyN9J99nq9%2FvnDU5SpKtyvzbAqgDPgSIUIiofuhlnQFpAACZCeCRInFAiOVA%2FMZ3ZSeZlMUo2k6tjTqkRVwZM1eSR5gJtnVgiRvZLecUACJEB6BkjqM7b8YPr3fInVm8Xc58y86zy9lyrKkXa%2Fqzxn1%2BKQZzchZU67giMBCZAAqSkka5Z%2BsMqvWhWevUf9a2kVzUbwp1md0Fp%2BK2JpsC3CyKr4L%2FeqwDfp0G9Sw5YhO%2BOqZWEa%2F1jFImBbDZYXw3vEWqGbBtpBKtorQAIkQDoGUtvemc7s9Xr1j10sFFtm0NGu%2F9VbntVB%2Bhx0w2u0jgMgARIgtYDkzzq9M5tDqpvlYqm%2F%2Bl5kYGXHql8JQAIkQHoGSNWzp%2BE0Xa6a3%2BIfe3PwCEOnnzVHOeVjnZI3pqOrNSTHsEuvAZAACZB6Qyp1RW8%2BRa8Wf6%2FSNV203BSGwZEr7ENTZf%2FUFbhuo%2FU8PVeeydnjooUACZAAqYPtLlL%2Br%2FmsX%2FpZXhKDRGvlU%2FyKidO9OUYSS6QadmUs0WYs%2BEqgAhIgAdITQPJn%2FQDHTgidqJ2gTLJCuq0zb8pC65qtTL%2FUpIQZWC1bNiABEiA9HFKrxro7pd2m6u%2Fn1JVW6Zren9rhjfvajYwkYiDXrQAkQAKkJ4HEJZBxbCSdY6djPtKlUsLIBlaul%2F%2B%2BSBYWM5GPuN4zpJ23XbCBCiABEiD1hlQaW0MRJlU4JSTTJS2vtTN%2FfX1tQgpe1R9tMEgRwJbEyudMK6qr%2B78JKX06sipePKsC36Rn%2BSZ1sgskSPIX3IE0SbIJkiPPqLOZ7p0qKWWJVdYdU9peN9ebbRnTJ%2Bbz5xVNkKSsUh3k%2BY9dFAdAAiRAOhbSSDoVqeKBmkGzFTJByubIUmczNYOez2f291TqK1fYn0WUXWVVurLSNbNKOnS9uiVC2CPyvxnJaTjlu03arAEJkADpAEh7TKhMJWVLypAooaSCJ0jJw21FTgetFbLjb5ZJSgHWLVnoryioguv1u5sX2wAkQAKkWldF%2BqG0emeqTnTmxmY%2F5XRJGVKichvDZ%2BTJPyGk%2FzKEbC9oxE%2Bu6%2Fr9%2FT3e44f8mzIOSZVJefeUzXRvDkACJEDqCml%2FXlxWWNmSZlDrBWdI837dQxjrPFXOrSMhqbX7WVnq2ZB6t6FsPlSo9b%2BY%2Ft1AJgESIAHSIWVrNhX0hGERQvbzObOuZhXcdPzstpJQLTxJo2SAoJBS9dVsm2CQpGRiMpiLQ%2BG2Xz0eDO%2BsoD8gARIgHQ%2BJF1jRUojVX39qYA1CYgZW32MUfLaX6jvdDi5YBkXYWCvistZVwdXar5uzaeGABEiAdAykhv4kutdSBd90n1dfFfv1Z4ZOy30u7zyK0ILk5AFGHnXaKw6ABEiAdIeU1Up1fA%2FfTCU9%2FY5IP6EK70skOFIaWOWzvaW7MyWbBQxZBlbLn2TJJL04rNsZ3bnmSWwDEiAB0gGQvoav%2FAM97WAilF5s%2FvqzX3AHkqLBd24I53RzV5407NvO8pD50UJB20168w0SkhaefuCb9BLfJL9K1wQpU4lAYpeV00JUSNYoxcA3NFY31ilK6Nx2uucsLdOOFmLSblUkkeQfjqq%2Ff7OUGiABEiBVQUoh1F95DF%2FO2MzH8yHFMexsVbJiKc4cT33ZhJRvsp%2BfH27R0GLBHUM2%2FS8gARIg9YDkyCTLLPj3719%2Fs3TJU54GHOwlWaSCBxt7pLc5cjSvKL1UOhkLqZNe%2FO93UNuNNFgAEiABUldIpcGRi6AqlBxOCKP%2F9D7uaOq2eWb5Hr9nJ01Ovl6vCZKs0MqU7wyJRgvJCwAkQAKkrpBKF5ytEkXH7mzdIYVoP3mWMFg3dEI4i64UZ6nJJMaJqeBWv09AAiRA6gfJz0DLC%2FbtEdkXxTfx98VpOOWhCKdB1%2Bx7xBJFZtOGsOIyfAyzHPJNxtxhL0olygFIgARIzSHJIlOpnIqlK9ONpg6neaxn%2BRCQ4gbWouoSvnFWnY2Uy0kmVAmJnXkpGLG2KVgdoVShBUiABEgHQNrscCkhzSLndLoMFyakaBWqdOyRcqUUwyakZFagkFSfEA0ktSwdzm3HLQ6ABEiA1AJS0UUnb5OvglMDhDq7slAYn0tZsl%2FwnQbWVrMzMLd%2FuRUtZFkctp%2BTAAmQAKkRpEj4Y5Irl8sly6T8OinZWT4thoa840ZstPO5keQW9fd96dk2msUBpSqsmkGlvJmNEUYPJCuphpV%2FZf4kdm3IqnjlXhX4Jj3RN2nPbzTFkCFNSrwKiddTdlOIG7Y5YcZZ31phGTpnGAE12uQ0vEtrggydLA7YByRAAqQqSMGMO3Wjp%2FfkqoLSODvapWfUsEu2laXJLTtnc%2Bb2pmFXrdTAQoUcmaQilFGSgARIgNQcUvMFUzlUvdGlXY7i4Y%2BKvltS8ob1DmHyjNWJyBhY7QnVfc5eABIgAdIDIVG7QD5jUelA%2BRvtHKvOOu1GWqnvnOJg2Cm0WTUeSJFGIg9Qii5AAiRA6gdJbZ%2FW1TfTJHWZycKiY%2Bfi%2FkamH8OgX3aVpMy2jFEr4uDJJEACJEBqAWnUYlyCC%2FbjyBfp1Rq%2Fn9wSuapNeZa9Ps7NoQotqoLzfpzrM28HRwISIAFSB0hO9ajZiGD%2Fglu%2FwpGMu1xhP4uWthKLKe5WIzo1pke1%2BbIbWvU5qTYFp7sSHYAESIDUFRL1gtCejj1UcLrguYWSgb9tpp9qfl2FFu1YL%2B3%2F5CvZtMqDChiQAAmQekMaRYyLc1mtykZbzYDVY0u3UnZm2pRYRY8cTg19WseBaeG3vgXDiWMjqwMkQAKktpD8Rhdtu1RamyW7Y1ZInaK054pZq7iM4yGzjLPU9W51QLmp4EhaePrxjm%2FSK3yT9mT6BTEoqXrjA%2FLx5FZmB%2FzOq9p0gWeJRWdZn1HZKC5LLEACJEA6AFLF73vDwtDmjtheroiSvamCq%2BKQRRqp1oocNJmGNN36oZPWcwUgARIgHQApno%2BnLCyAP26PYCULe9gjHItDUexUhjSKxGalH6eW6VcfCw5IgARIJZCc7eidcRdRhalsiGPYDPfMnirTmRRYEZNJo%2BZPkhhqgiMBCZAAqQWkJhaHR9kUsnGWecGpo3rn5xYhZCZU3q4p9%2Bl060cAEiABUj9ISzHoqjQSK6YnrkZLSwc71roq5ouScZBxG0qku5I6qzucjKLStI7DqPWxAyRAAqSukHoYWHk9%2FcB2mME3OywOTvpKRGJtJgKlN5zPZ1nyRrJhZ1YyAA%2B2ggMSIP0%2FhlQ6y1zC%2B42kkXYj7KM%2Fh0%2Bmgq985I26gUYQrjzidwxOUk2%2BZgYMkAAJkJpAYqUDncvql%2Fri%2F76XyqR4%2FuHxs3WmW0B6CUgnF9LoQuo8nCQFD9Ln5%2Fiso%2B7a%2Fg%2FR0LfJ%2BZfp4QAAAABJRU5ErkJggg%3D%3D)",
						width: "420px",
						height: "420px"
					}),
				dom.el("div",
					{
						id: "ef_esc_minicarte_souterrain",
						"class": "ef_esc_minicarte"
					},
					{
						backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAADHCAIAAAAyB55NAAADAFBMVEUAAAD%2FAAAA%2FwD%2F%2FwAAAP%2F%2FAP8A%2F%2F%2F%2F%2F%2F%2Fb29u2traSkpJtbW1JSUkkJCTbAAC2AACSAABtAABJAAAkAAAA2wAAtgAAkgAAbQAASQAAJADb2wC2tgCSkgBtbQBJSQAkJAAAANsAALYAAJIAAG0AAEkAACTbANu2ALaSAJJtAG1JAEkkACQA29sAtrYAkpIAbW0ASUkAJCT%2F29vbtra2kpKSbW1tSUlJJCT%2FtrbbkpK2bW2SSUltJCT%2FkpLbbW22SUmSJCT%2FbW3bSUm2JCT%2FSUnbJCT%2FJCTb%2F9u227aStpJtkm1JbUkkSSS2%2F7aS25Jttm1JkkkkbSSS%2F5Jt221JtkkkkiRt%2F21J20kktiRJ%2F0kk2yQk%2FyTb2%2F%2B2ttuSkrZtbZJJSW0kJEm2tv%2BSktttbbZJSZIkJG2Skv9tbdtJSbYkJJJtbf9JSdskJLZJSf8kJNskJP%2F%2F%2F9vb27a2tpKSkm1tbUlJSST%2F%2F7bb25K2tm2SkkltbST%2F%2F5Lb2222tkmSkiT%2F%2F23b20m2tiT%2F%2F0nb2yT%2F%2FyT%2F2%2F%2Fbttu2kraSbZJtSW1JJEn%2Ftv%2Fbktu2bbaSSZJtJG3%2Fkv%2Fbbdu2SbaSJJL%2Fbf%2FbSdu2JLb%2FSf%2FbJNv%2FJP%2Fb%2F%2F%2B229uStrZtkpJJbW0kSUm2%2F%2F%2BS29tttrZJkpIkbW2S%2F%2F9t29tJtrYkkpJt%2F%2F9J29sktrZJ%2F%2F8k29sk%2F%2F%2F%2F27bbtpK2km2SbUltSSRJJAD%2FtpLbkm22bUmSSSRtJAD%2Fttvbkra2bZKSSW1tJElJACT%2FkrbbbZK2SW2SJEltACTbtv%2B2ktuSbbZtSZJJJG0kAEm2kv%2BSbdttSbZJJJIkAG222%2F%2BSttttkrZJbZIkSW0AJEmStv9tkttJbbYkSZIAJG22%2F9uS27ZttpJJkm0kbUkASSSS%2F7Zt25JJtm0kkkkAbSTb%2F7a225KStm1tkklJbSQkSQC2%2F5KS221ttklJkiQkbQD%2FtgDbkgC2bQCSSQD%2FALbbAJK2AG2SAEkAtv8AktsAbbYASZIAAAAAAADPKgIEAAAG7ElEQVR42u2du44bNxSGuUbeZB9AhQE39hheAVMacOPaKVxPldrwA7hSnSKp1QhQKWBlZJUmQAzkAdKmDPwEmxTjMCORw%2BHlcIaj%2BT4sDGElcS4%2B%2B%2F88Qx5SKaWaplF5oOWZtnyT71xhjmw2G%2F4%2BaNnOd%2FrVw%2F3h4r3qrv721tF4a11f059I99q3u%2F3D%2FeHPXy4v8PS4al%2B8ePJH%2B%2BL25SHoKG3LI9xD878y9KBPkE0gLCDQRCxadDwMytSVuYnGNIjbbFIfdA%2BtBnFhTz7dANQCMBHIbSL5lBBGyrACvQO1AMICRjaRWbuJ47GPg7gLjDsWagGEBSzERIp1k0SnML8e1KBup1rXTdNU6zrRTax3tW3Z5wx9jl6ta9QCMBEIDYtqXbc%2Fsuo9rx54e%2FmyN6H9QS0AE4GFZCKOTviMcpP0GUoRH56dWaAWQFiAuIn4uEn0tJ%2Bi0NelJ%2FSeHlfqq3r%2FYWXO43Xdjc4zqxLcxOdUHW%2BhFoCJgIiJOJRn1t5hop3iVqntbv%2Fu1SeprCff17OmdagFEBYgaCI%2B%2FdjrQA9%2FzyiNUv11ItFQsQ5ntBXrN0qppmn%2BL18X7SVtd%2Fu3b17n6CUNnrPPw29r7p7S8qAObTabHEJ7cZ8TH2mo6NlZPm5S3dXNrqnu6hmlLQ%2F3h97Cvf6YFh9kmdyj6XICYQE5MpFgSWyUulGVuvI6RP%2BelvuT5tjKVLaCWgBhAeOYyKyZXKsHj56Y0kd%2FHbUAwgIwkcTEQVaZ8x00qLSQBRgBEwFMpHwPMrXaMWQfV2DO7CzARAATyUfcRDKpxUmsdiA%2Bhwq1AMICMJHR3CQup%2FBpMHF9rbiTFze%2B7sICqAVgIrBME0kX0r58QXzUO%2FFyrE%2FM%2FG%2FCWZG%2BUqqz2RZqAZgIkImUvzBLYuWmWWwYZGrff9Qvv3nHj6gFYCKAiWiNPQo%2FUEof4y6hFt4zn6JiHc5Iqlj3ZPyW058691XZpz%2B3yH3O0YPG128iPgMWGRdv%2BafXwhIL3ik2BDIRIBOZtsudaEaJ6Y9jtMUxPNF56OQ61YscJ72IErUAwgIWbiIj5DhSdNcQNsTfyy4j1vtCLYCwAEykEBfQT7H0KmFzXyoftQDCAggLICyAsAAykfIJyjte%2FJcQnZJnRWjEq%2BxRCyAsABORMQjpaVGnDNsgii%2BogloAYQELN5FZ7E6IWgBhAZgIRNrcnTER9xi%2FlaasaaIWQFgAJnIp0TPcFz7RGqIvmYp1OOM6K9bT%2F3RSqr99Wg7qcnpWWqfUwi%2BiYr1Yhbes9HsMWEfFvefIxZhIelZClxMICyATibODTCtc5Xjo1PLrb7%2B3%2Fz5%2F9lTK%2BFALICwAE8lNdwOO8bMeffTnz55ud3%2F5OAhqAYQFYCJZ7UAZy6r7PO50uInZspSbZM2eUAsgLAATkc0ygtxkkvTH5%2BieS1SjFoCJACaSW7TFCR1PFzkxq62gFoCJACbSJ9Hi%2BUK%2BTamCzjlymxnbFpCoBWAigInE2UHEOlTmh61bhHz5W%2F300WuLkCCD0FN8BfdAQS0AEwFMZEKsW4R82e1vXx6Uqv3NaIS8DLUATAQwkQIzGvOXF4%2BzSq6gp2IdzlhcxbrPn6mu%2Fk7cgrtPLbrnLF4Ln36GmEj8XYsuVBdfazcF97g8XU4gEwEykRQL199ybICun1mN4FyDPS3rHuvRnoVaAGEBmIgIjg3Q8zmFY6Te5PS4Ul%2FV%2Bw8r7W5BY%2FfWlAS1AEwEMJEUGY%2Bc6RRV7hfkZZa3lNru9u9efer8ru67Cs%2BjoxZAWMDCTUR89KH8leQFyyFRCyAsgEykKMtwrOLruRTJ4Ld82vEcLkEtgLAATCTOIFLmUMXlAon7kvh8OPTEUAsgLAATEU8lEqW%2Btacxp3tFJ1aoBRAWgIlMaxl95JjuJV7GiFoAYQELN5GgYQXrIoTi5zO4AGPYwok5VxWmYh3OWG7FulstLqq%2Fpbqcjp3Q09VCpBa%2B2yCZSLx3uBdEyJ3%2BZG2HLicQFrDwTCRabDPthK7X2p0quUAtgLAATERc2DPJeOJaK5O7CWoBhAVgIhEKH7Q3R75driZ3E9QCCAvARAa9Q8%2B2NefWBsl44qrKBdbCoxZAWAAmMohPXUacm1iZ0X4iqAUQFoCJ%2BOcLPqmE6Sbmh3%2F%2B%2FEP74nw5RIFsBbUATAQwkdLcJA6HC5je0f0Ws7MAEwHCAggLICwAlpyJXFlmlAMq1uEMKtYttE8X3r55neOc%2B1pOVwvxu0HfwvI%2FNI6qV%2Bu6%2FaHLCWQiQCayRMeJWnGrTNdALYCwAExkZEK9I9OCKqgFEBZAWMwyEwl5HtXOyyp%2Fj13CAggLIBOJTy6iJuLmW%2F8EtYCCuOEWmB3DwZ5mpq8DFM2%2FuvP8g6bUSJIAAAAASUVORK5CYII%3D)",
						width: "178px",
						height: "199px"
					}),
				dom.el("div",
					{
						id: "ef_esc_minicarte_cloaque",
						"class": "ef_esc_minicarte"
					},
					{
						backgroundImage: "url(http://img820.imageshack.us/img820/6558/minicartecloaque.png)",
						width: "240px",
						height: "240px"
					})
			]);
		var oPopupMinicartes = ui.popup("ef_esc_popup_minicartes",
			oDummy.innerHTML,
			{ title: "Minicarte stratégique", anchor: dom.id("epicfriend_escouade_entete_liens_epicfriend") },
			{ width: "420px" },
			null,
			{ backgroundColor: "white", opacity: "1.0 !important", width: "420px", height: "432px" });
		dom.hide(oPopupMinicartes);
		//Ajout des données pour la minicarte de surface
		var oCarteStratEscouadeSurface = dom.id("ef_esc_minicarte_surface");
		for (var n = 0, oJ; oJ = EpicFriend.JoueursEscouade[n]; n++)
		{
			if (/^\d+$/.test(oJ.x) && oJ.profondeur == "surface")
			{
				var oCaseJoueur = document.createElement("div");
				with (oCaseJoueur)
				{
					setAttribute("class", "case_joueur");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = "#FF69ED";
					style.position = "absolute";
					style.left = oJ.x * 3;
					style.top = oJ.y * 3;
					style.zIndex = "4";
					setAttribute("onmouseover", "this.style.top = "+(oJ.y*3-2)+"; this.style.left = "+(oJ.x*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 5; this.style.outline = '1px solid black'; return overlib('"+oJ.x+"/"+oJ.y+" <b>"+oJ.nom+"</b> ("+oJ.alignement+" "+oJ.niveau+")<br/>PV : "+oJ.PV+"/"+oJ.PVMax+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oJ.y*3)+"; this.style.left = "+(oJ.x*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 4; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeSurface.appendChild(oCaseJoueur);
				if(oJ.nom == nomJoueurCourant)
				{
					dom.add(oCarteStratEscouadeSurface, dom.el("div", {style: "width:420px; height:0px; position:absolute; top:"+(oJ.y * 3 + 1)+"; left:0; border-top:1px dotted cyan; z-index:2;"}));
					dom.add(oCarteStratEscouadeSurface, dom.el("div", {style: "width:0px; height:420px; position:absolute; top:0; left:"+(oJ.x * 3 + 1)+"; border-left:1px dotted cyan; z-index:2;"}));
				}
			}
		}
		for(var n in EpicFriend.LocDecorsCarteEsc)
		{
			var oEndroit = EpicFriend.LocDecorsCarteEsc[n];
			if(oEndroit[4] == "surface")
			{
				var oCaseDecor = document.createElement("div");
				with(oCaseDecor)
				{
					setAttribute("class", "case_decor");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = oEndroit[3];
					style.position = "absolute";
					style.left = oEndroit[1] * 3;
					style.top = oEndroit[2] * 3;
					style.zIndex = "3";
					setAttribute("onmouseover", "this.style.top = "+(oEndroit[2]*3-2)+"; this.style.left = "+(oEndroit[1]*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 4; this.style.outline = '1px solid black'; return overlib('"+oEndroit[1]+"/"+oEndroit[2]+" "+oEndroit[0]+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oEndroit[2]*3)+"; this.style.left = "+(oEndroit[1]*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 3; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeSurface.appendChild(oCaseDecor);
			}
		}
		//Ajout des données pour la minicarte du Dédale
		var oCarteStratEscouadeSouterrain = dom.id("ef_esc_minicarte_souterrain");
		for (var n = 0, oJ; oJ = EpicFriend.JoueursEscouade[n]; n++)
		{
			if (/^\d+$/.test(oJ.x) && oJ.profondeur == "souterrain")
			{
				var oCaseJoueur = document.createElement("div");
				with (oCaseJoueur)
				{
					setAttribute("class", "case_joueur");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = "#FF69ED";
					style.position = "absolute";
					style.left = oJ.x * 3;
					style.top = oJ.y * 3;
					style.zIndex = "4";
					setAttribute("onmouseover", "this.style.top = "+(oJ.y*3-2)+"; this.style.left = "+(oJ.x*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 5; this.style.outline = '1px solid black'; return overlib('"+oJ.x+"/"+oJ.y+" <b>"+oJ.nom+"</b> ("+oJ.alignement+" "+oJ.niveau+")<br/>PV : "+oJ.PV+"/"+oJ.PVMax+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oJ.y*3)+"; this.style.left = "+(oJ.x*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 4; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeSouterrain.appendChild(oCaseJoueur);
				if(oJ.nom == nomJoueurCourant)
				{
					dom.add(oCarteStratEscouadeSouterrain, dom.el("div", {style: "width:178px; height:0px; position:absolute; top:"+(oJ.y * 3 + 1)+"; left:0; border-top:1px dotted cyan; z-index:2;"}));
					dom.add(oCarteStratEscouadeSouterrain, dom.el("div", {style: "width:0px; height:199px; position:absolute; top:0; left:"+(oJ.x * 3 + 1)+"; border-left:1px dotted cyan; z-index:2;"}));
				}
			}
		}
		for(var n in EpicFriend.LocDecorsCarteEsc)
		{
			var oEndroit = EpicFriend.LocDecorsCarteEsc[n];
			if(oEndroit[4] == "souterrain")
			{
				var oCaseDecor = document.createElement("div");
				with(oCaseDecor)
				{
					setAttribute("class", "case_decor");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = oEndroit[3];
					style.position = "absolute";
					style.left = oEndroit[1] * 3;
					style.top = oEndroit[2] * 3;
					style.zIndex = "3";
					setAttribute("onmouseover", "this.style.top = "+(oEndroit[2]*3-2)+"; this.style.left = "+(oEndroit[1]*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 4; this.style.outline = '1px solid black'; return overlib('"+oEndroit[1]+"/"+oEndroit[2]+" "+oEndroit[0]+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oEndroit[2]*3)+"; this.style.left = "+(oEndroit[1]*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 3; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeSouterrain.appendChild(oCaseDecor);
			}
		}
		//Ajout des données pour la minicarte du Cloaque
		var oCarteStratEscouadeCloaque = dom.id("ef_esc_minicarte_cloaque");
		for (var n = 0, oJ; oJ = EpicFriend.JoueursEscouade[n]; n++)
		{
			if (/^\d+$/.test(oJ.x) && oJ.profondeur == "cloaque")
			{
				var oCaseJoueur = document.createElement("div");
				with (oCaseJoueur)
				{
					setAttribute("class", "case_joueur");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = "#FF69ED";
					style.position = "absolute";
					style.left = oJ.x * 3;
					style.top = oJ.y * 3;
					style.zIndex = "2";
					setAttribute("onmouseover", "this.style.top = "+(oJ.y*3-2)+"; this.style.left = "+(oJ.x*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 3; this.style.outline = '1px solid black'; return overlib('"+oJ.x+"/"+oJ.y+" <b>"+oJ.nom+"</b> ("+oJ.alignement+" "+oJ.niveau+")<br/>PV : "+oJ.PV+"/"+oJ.PVMax+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oJ.y*3)+"; this.style.left = "+(oJ.x*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 2; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeCloaque.appendChild(oCaseJoueur);
				if(oJ.nom == nomJoueurCourant)
				{
					dom.add(oCarteStratEscouadeCloaque, dom.el("div", {style: "width:420px; height:0px; position:absolute; top:"+(oJ.y * 3 + 1)+"; left:0; border-top:1px dotted cyan;"}));
					dom.add(oCarteStratEscouadeCloaque, dom.el("div", {style: "width:0px; height:420px; position:absolute; top:0; left:"+(oJ.x * 3 + 1)+"; border-left:1px dotted cyan;"}));
				}
			}
		}
		for(var n in EpicFriend.LocDecorsCarteEsc)
		{
			var oEndroit = EpicFriend.LocDecorsCarteEsc[n];
			if(oEndroit[4] == "cloaque")
			{
				var oCaseDecor = document.createElement("div");
				with(oCaseDecor)
				{
					setAttribute("class", "case_decor");
					style.width = "3px";
					style.height = "3px";
					style.backgroundColor = oEndroit[3];
					style.position = "absolute";
					style.left = oEndroit[1] * 3;
					style.top = oEndroit[2] * 3;
					style.zIndex = "2";
					setAttribute("onmouseover", "this.style.top = "+(oEndroit[2]*3-2)+"; this.style.left = "+(oEndroit[1]*3-2)+"; this.style.width = '7px'; this.style.height = '7px'; this.style.zIndex = 3; this.style.outline = '1px solid black'; return overlib('"+oEndroit[1]+"/"+oEndroit[2]+" "+oEndroit[0]+"', OFFSETX, 10, OFFSETY, 5);");
					setAttribute("onmouseout", "this.style.top = "+(oEndroit[2]*3)+"; this.style.left = "+(oEndroit[1]*3)+"; this.style.width = '3px'; this.style.height = '3px'; this.style.zIndex = 2; this.style.outline = 'none'; return nd();");
					appendChild(document.createTextNode(""));
				}
				oCarteStratEscouadeCloaque.appendChild(oCaseDecor);
			}
		} 		
		//Evénement du lien pour chaque minicarte
		function montrerMinicarte(sIdPartiel)
		{
			for (var n = 0, oCarte; oCarte = document.getElementsByClassName("ef_esc_minicarte")[n]; n++)
				dom.hide(oCarte);
			var sId = "ef_esc_minicarte_" + sIdPartiel;
			if (utils.defined(dom.id(sId)))
				dom.show(dom.id(sId), "block");
		}
		dom.id("ef_esc_lien_montrer_minicarte_surface").addEventListener("click", function() { montrerMinicarte("surface"); }, true);
		dom.id("ef_esc_lien_montrer_minicarte_souterrain").addEventListener("click", function() { montrerMinicarte("souterrain"); }, true);
		dom.id("ef_esc_lien_montrer_minicarte_cloaque").addEventListener("click", function() { montrerMinicarte("cloaque"); }, true);
		//Ajout de style
		var sStyle = ".ef_esc_lien_montrer_minicarte { margin-right: 0.5em; font-size: 9px !important; color: black !important; }";
		sStyle += ".ef_esc_lien_montrer_minicarte:hover { text-decoration: underline; }";
		sStyle += ".ef_esc_minicarte { position: absolute; display: none; }";
		sStyle += "#ef_esc_minicarte_surface { display: block; }";
		GM_addStyle(sStyle);
	},
	
	
	/*************************************************************************
	 *   P A G E   M E S S A G E R I E
	 *************************************************************************/
	
	AmeliorerInterfaceMessagerie : function()
	{
		//Ajouter les listes personnalisées de messagerie
		if((/\/frame_messagerie\.php\?x=2/.test(location.href) || /msg_send\.php/.test(location.href))
		 && utils.objlen(EpicFriend.Preferences.MesListesMessagerie) > 0)
		{
			var oSelectDestinataire = dom.id("tm");
			var oListes = EpicFriend.Preferences.MesListesMessagerie;
			for (var sNomListe in oListes)
			{
				dom.add(oSelectDestinataire, dom.el("option",
					{ id: "epicfriend_messagerie_liste_" + sNomListe, value: oListes[sNomListe], text: sNomListe, title: oListes[sNomListe] },
					{ color: "blue", fontStyle: "italic" }));
				dom.id("epicfriend_messagerie_liste_" + sNomListe).addEventListener("click", function ()
					{
						dom.id("dest").value = this.value;
					}, true);
			}
		}
		//Fonction de mise en forme BBCode
		function formatText(sTagStart, bTagEnd, sParameter, bQuotes)
		{
			var oEl = dom.id("commentaire");
			oEl.focus();
			var nStart = oEl.selectionStart, nEnd = oEl.selectionEnd;
			if (oEl.setSelectionRange)
			{
				var sSelection = oEl.value.substring(nStart, nEnd);
				var param = "";
				if (bTagEnd)
				{
					var sText = "[" + sTagStart;
					if (utils.defined(sParameter))
					{
						param = window.prompt(sParameter) || "";
						if (param.length > 0)
						{
							if (bQuotes) param = '="' + param + '"';
							else param = '=' + param;
						}
					}
					sText += param + "]" + sSelection + "[/" + sTagStart + "]";
				}
				else 
					var sText = "[" + sTagStart + "=" + sSelection + "]";
				oEl.value = oEl.value.substring(0, nStart) + sText + oEl.value.substring(nEnd, oEl.textLength);
				oEl.selectionStart = nStart + sTagStart.length + 2 + param.length;
				oEl.selectionEnd = oEl.selectionStart + sSelection.length;
				oEl.focus();
				oEl.scrollTop = oEl.selectionStart - 1;
			}
		}
		EpicFriend.InsererScript("epicfriend_script_messagerie_bbcode", formatText);
		function formatList()
		{
			var oEl = dom.id("commentaire");
			oEl.focus();
			var nStart = oEl.selectionStart, nEnd = oEl.selectionEnd;
			if (oEl.setSelectionRange)
			{
				var sSelection = oEl.value.substring(nStart, nEnd);
				var aLignes = sSelection.split(/\n/).map(function(element) { return "[*]" + element; });
				var sText = "[list]" + aLignes.join(" ") + "[/list]";
				oEl.value = oEl.value.substring(0, nStart) + sText + oEl.value.substring(nEnd, oEl.textLength);
				oEl.selectionStart = nStart + sTagStart.length + 2 + param.length;
				oEl.selectionEnd = oEl.selectionStart + sSelection.length;
				oEl.scrollTop = oEl.selectionStart - 1;
				oEl.focus();
			}
		}
		EpicFriend.InsererScript("epicfriend_script_messagerie_bbcode_liste", formatList);
		//Remplacer les éléments natifs de mise en forme
		var oTableau = dom.get(document.body, "table", { class: "EW_Table" }, 1);
		var oCellule = dom.tag(dom.tag(oTableau, "tr", 0), "td", 1);
		dom.att(oCellule, "id", "epicfriend_messagerie_bbcode");
		oCellule.innerHTML = "";
		dom.add(oCellule,
			[
				dom.el("a", { html:"G", title:"gras", onclick:"formatText('b', true)" }, { fontWeight: "bold"}),
				dom.el("a", { html:"I", title:"italique", onclick:"formatText('i', true)" }, { fontStyle: "italic" }),
				dom.el("a", { html:"S", title:"souligné", onclick:"formatText('u', true)" }, { textDecoration: "underline" }),
				dom.el("a", { html:"@", title:"e-mail", onclick:"formatText('mail', false)" }),
				dom.el("a", { html:"liste", title:"liste à puces", onclick:"formatList()" }),
				dom.el("a", { html:"img", title:"image", onclick:"formatText('img', true)" }),
				dom.el("a", { html:"http", title:"lien web", onclick:"formatText('url', true, 'Adresse du lien', false)" }),
				dom.el("a", { html:"citer", title:"citation", onclick:"formatText('quote', true, 'Auteur de la citation', false)" }),
				dom.el("a", { html:"taille", title:"taille de la police", onclick:"formatText('size', true, 'Taille de police (7 = très petit, 24 = très grand)', false)" }, { fontSize: "15px" }),
				dom.el("a", { html:"couleur", title:"couleur de la police", onclick:"formatText('color', true, 'Couleur de police (code hexadécimal: #FFFFFF pour blanc; OU nom de couleur: `white` pour blanc)', false)" }, { color: "yellow" })
			]);
		var oCellBas = dom.tag(dom.tag(oTableau, "tr", 1), "td", 0);
		//Faire disparaître la cellule en-dessous et la ligne encore en-dessous ("Exemple :")
		dom.tag(oTableau, "tr", 1).removeChild(oCellBas);
		var oCellAvant = dom.tag(dom.tag(oTableau, "tr", 0), "td", 0);
		dom.att(oCellAvant, "rowspan", "");
		var oLigneDessous = dom.tag(oTableau, "tr", 2);
		//~ console.log(oLigneDessous);
		dom.hide(oLigneDessous);
		//Enlever le passage à la ligne avant les deux points dans la première cellule
		oCellAvant.innerHTML = oCellAvant.innerHTML.replace(/ :/, "&nbsp;:");
		//Style
		//~ for (var nLien = 0, oLien; oLien = dom.tag(oCellule, "a")[nLien] ; nLien++)
			//~ dom.att(oLien, "class", "EW_LinkLight");
		GM_addStyle("#epicfriend_messagerie_bbcode a { font-weight: normal; font-family: Bitstream Vera Sans, DejaVu Sans, FreeSans, Verdana, sans-serif; padding: 0 3px; margin-right: 2px; font-size: 13px; color: wheat; }");
	},
	
	
	/*************************************************************************
	 *   P A G E   C L A S S E M E N T
	 *************************************************************************/
	
	AmeliorerClassement : function()
	{
		var oTableau = dom.get(document.body, "table", { class: "EW_Table" })[0];
		for (var n = 0, oLigne ; oLigne = dom.tag(oTableau, "tr")[n] ; n++)
		{
			dom.style(dom.tag(oLigne, "td", 1), "fontWeight", "bold");
			if (n > 0)
				dom.style(dom.tag(oLigne, "td", 2), {
					backgroundColor: EpicFriend.Preferences.CouleursRaces[dom.tag(oLigne, "td", 2).textContent],
					color: "white"
				});
			var sAlignementPrimitif = EpicFriend.AlignementPrimitif(dom.tag(oLigne, "td", 3).textContent);
			dom.style(dom.tag(oLigne, "td", 3), "color", EpicFriend.Preferences.CouleursAlignements[sAlignementPrimitif]);
			
			GM_addStyle("table.EW_Table th, table.EW_Table td { background-color: #CFCFCF; color: black; }");
		}
	},


	/*******************************************************************************************
	 *  F O N C T I O N S    I N T E R N E S
	 *******************************************************************************************/
	 
	AlignementPrimitif : function(sAlignement)
	{
		if(/Fou de guerre|Berserk|Chevalier noir|Paladin|Garde imp.rial|Hussard|Barbare|Chevalier|Soldat|Combattant/.test(sAlignement)) return "Combattant";
		if(/Troubadour|M.nestrel|Assassin|Pisteur|Bandit|Hors-la-loi|Barde|Pr.dateur|Brigand|R.deur/.test(sAlignement)) return "Rôdeur";
		if(/Illusionniste|.l.mentaliste|Conjurateur|N.cromant|Mage de guerre|Sorcier|Enchanteur|Invocateur|Magicien|Apprenti/.test(sAlignement)) return "Apprenti";
		return "Aventurier";
	},
	
	MaRace : function()
	{
		var oDiv = dom.id("EW_Content_UserStatus");
		var oTable = dom.tag(oDiv, "table", 0);
		var oRow = dom.tag(oTable, "tr", 1);
		var oCell = dom.tag(oRow, "td", 1);
		return (/(Humain|Elfe|Orque|(?:Mort-vivant)|Nain)/.exec(oCell.textContent))[1];
	},
	
	JoueursMaRace : function()
	{
		var aMemeRace = EpicFriend.Joueurs.filter(function(element) { return element.race == maRace && element.creature == "joueur"; });
		var aNoms = aMemeRace.map(function(element) { return element.nom; });
		return aNoms.join(";");
	},
	
	MaClasse : function()
	{
		var oDiv = dom.id("EW_Content_UserStatus");
		var oTable = dom.tag(oDiv, "table", 0);
		var oRow = dom.tag(oTable, "tr", 0);
		var oCell = dom.tag(oRow, "td", 0);
		var oDiv2 = dom.tag(oCell, "div", 0);
		if(dom.tag(oDiv2, "img").length > 0) oDiv2 = dom.tag(oCell, "div", 1);
		return (/^\w+? : (.+)/.exec(oDiv2.textContent))[1];
	},
	
	MonNiveau : function()
	{
		var oDiv = dom.id("EW_Content_UserStatus");
		var oTable = dom.tag(oDiv, "table", 0);
		var oRow = dom.tag(oTable, "tr", 1);
		var oCell = dom.tag(oRow, "td", 1);
		return (/ - Niveau(?: Divin)? (\d+)/.exec(oCell.textContent))[1];
	},
	
	MonNom : function()
	{
		var oDiv = dom.id("EW_Content_UserStatus");
		var oTable = dom.tag(oDiv, "table", 0);
		var oRow = dom.tag(oTable, "tr", 0);
		var oCell = dom.tag(oRow, "td", 0);
		var oDiv2 = dom.tag(oCell, "div", 0);
		if(dom.tag(oDiv2, "img").length > 0) oDiv2 = dom.tag(oCell, "div", 1);
		var monNom = (/^(\w+?) : \w+/.exec(oDiv2.textContent))[1];
		dom.add(document.body, dom.el("span", { id: "epicfriend_nom_joueur_courant", text: monNom }, { "display": "none" }));
		return (/^(\w+?) : \w+/.exec(oDiv2.textContent))[1];
	},
	
	MaLoc : function()
	{
		var sX = "", sY = "";
		for (var n = 0, oLien; oLien = document.getElementById("map").getElementsByTagName("a")[n]; n++)
		{
			if (/Cliquez pour visualiser le menu/.test(oLien.getAttribute("onmouseover")))
			{
				var aA = /<b>(\d{1,3}) \/ (\d{1,3}) <\/b>/.exec(oLien.getAttribute("onmouseover"));
				var sX = aA[1]; var sY = aA[2];
				break;
			}
		}
		return [sX, sY];
	},
	
	MaProfondeur : function()
	{
		var oProfondeur = {0:"surface", 1:"dedale", 2:"cloaque"};
		return oProfondeur[dom.id("monde").textContent];
	},
	
	MesPA : function()
	{
		var aA = /PA : (\d+) \/ (\d+)/.exec(dom.id("sts_pa").textContent);
		return [aA[1], aA[2]];
	},
	
	MesPV : function()
	{
		var aA = /PV : (\d+) \/ (\d+)/.exec(dom.id("sts_pv").textContent);
		return [aA[1], aA[2]];
	},
	
	Serveur : function()
	{
		return window.location.href.match(/http:\/\/(.+?)\.epic\-war\.net/)[1];
	},
		
	//Fonction générique d'insertion d'un script Javascript
	InsererScript: function(sId, code)
	{
		var oScript = document.createElement("script");
		oScript.setAttribute("id", sId);
		if(typeof code == "string")
			oScript.appendChild(document.createTextNode(code));
		else if(typeof code == "function")
			oScript.appendChild(document.createTextNode(code.toSource()));
		if(typeof document.getElementsByTagName("head")[0] == "undefined")
		{
			GM_log("Erreur: élément HEAD introuvable via le DOM!");
			GM_log('Erreur: élément HEAD introuvable via le DOM!');
			return false;
		}
		document.getElementsByTagName("head")[0].appendChild(oScript);
		return true;
	},
	
	InsererScriptDistant: function(sId, sUrl)
	{
		var oScript = dom.el('script', {type: 'text/javascript', id: sId, src: sUrl});
		if(typeof dom.tag(document, "head", 0)=='undefined')
		{
			GM_log('Erreur: élément HEAD introuvable via le DOM!');
			try { console.error('Erreur: élément HEAD introuvable via le DOM!'); } catch(e) {}
			return false;
		}
		else
			unsafeWindow.document.getElementsByTagName("head")[0].appendChild(oScript);
	},
	
	InsererStyleDistant: function(sId, sURL)
	{
		var oLink = dom.el("link", {type:"text/css", id:sId, href:sUrl, rel:"stylesheet"});
		if(typeof dom.tag(document, "head", 0) == "undefined")
		{
			GM_log("Erreur: élément HEAD introuvable via le DOM!");
			try { console.error("Erreur: élément HEAD introuvable via le DOM!"); } catch(e) {}
		}
		else dom.add(dom.tag(document, "head", 0), oLink);
	},
	
	DerniereVersion : function()
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://epicwar.baba0rum.com/epicfriend/derniere_version.txt",
			onload : function(response)
			{
				if(response.responseText && response.responseText != "")
					return response.responseText;
				else
					return EpicFriend.Version;
			}
		});
		
	},
	
	APropos : function()
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://epicwar.baba0rum.com/epicfriend/derniere_version.txt",
			onload : function(response)
			{
				var sTexte = "EpicFriend\nversion "+EpicFriend.Version;
				if(response.responseText && response.responseText != "")
				{
					derniereVersion = response.responseText.split(/\n/)[0]
					sTexte += "\nDernière version disponible : "+derniereVersion;
				}
				sTexte += "\n\nScript écrit par Babaorum (epicwar@baba0rum.com)";
				alert(sTexte);	
			}
		});
	},
	
	RecupererNews : function()
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.baba0rum.com/epicwar/epicfriend/news.txt",
			onload: function(response)
			{
				if(response.responseText && response.responseText != "") EpicFriend.News = response.responseText;
			}
		});
		return EpicFriend.News;
	},
	
	ChargerRaccourcisClavier : function(e)
	{
		//~ GM_log("char=" + e.charCode + ", key=" + e.keyCode);
		if (/frame_(?:map|inventaire)\.php/.test(window.location.href)
		    && (utils.undef(dom.id("epicfriend_configuration")) || dom.id("epicfriend_configuration").style.display == "none"))
		{
			if (e.charCode == 63)  //? => aide rapide
			{
				var sHtml = '<h1>Raccourcis clavier</h1>\
					<div id="raccourcis_clavier">\
						<dl>\
							<dt>i</dt><dd>inventaire <em>(y compris en mode don)</em></dd>\
							<dt>c</dt><dd>cape magique <em>(y compris en mode don)</em></dd>\
							<dt>e</dt><dd>escouade</dd>\
							<dt>m</dt><dd>messagerie</dd>\
							<dt>v</dt><dd>vue (rafraîchir)</dd>\
							<dt>d</dt><dd>déplacement rapide (activer/désactiver)</dd>\
							<dt>q</dt><dd>qui ?</dd>\
							<dt>o</dt><dd>où ?</dd>\
							<dt>r</dt><dd>recherche rapide d\'objet (sur la page d\'inventaire uniquement)</dd>\
						</dl>\
					</div>';
				ui.popup("epicfriend_popup_aide_rapide", sHtml, { title: "Aide rapide" }, null, null, { padding: "0.25em 0.5em" });
			}
			else if (e.charCode == 105)  //i => inventaire
			{
				var sUrl = "frame_inventaire.php";
				if (top.frames[2].location.href.indexOf("frame_inventaire.php") > -1)
				{
					var oLienInventaire = top.frames[2].document.getElementById("linkinvent");
					sUrl = dom.tag(oLienInventaire, "a", 0).href;
				}
				window.open(sUrl, "f2");
			}
			else if (e.charCode == 99)  //c => cape
			{
				var sUrl = "frame_inventaire.php?bag=mgc";
				if (top.frames[2].location.href.indexOf("frame_inventaire.php") > -1)
				{
					var oLienCape = top.frames[2].document.getElementById("linkcape");
					sUrl = dom.tag(oLienCape, "a", 0).href || sUrl;
				}
				window.open(sUrl, "f2");
			}
			else if (e.charCode == 101)  //e => escouade
				window.open("frame_escouade.php", "f2");
			else if (e.charCode == 109)  //m => messagerie
				window.open("frame_messagerie.php", "f2");
			else if (e.charCode == 118)  //v => rafraîchir la vue
				window.location.reload();
			else if (e.charCode == 100)  //d => déplacement rapide
			{
				$("#map .epicfriend_deplacement_rapide").toggle();
				dom.id("epicfriend_coche_deplacement_rapide").checked = (EpicFriend.Preferences.Vue.DeplacementRapide.Activer ? false : true);
				EpicFriend.Preferences.Vue.DeplacementRapide.Activer = (EpicFriend.Preferences.Vue.DeplacementRapide.Activer ? false : true);
				EpicFriend.SauverPreferences("quiet");
			}
			else if (e.charCode == 113)  //q => qui ?
				EpicFriend.ClassementJoueur();
			else if (e.charCode == 111)  //o => où ?
				EpicFriend.LocalisationJoueur();
			else if (e.charCode == 114)  //r => champ de recherche d'objet sur la page d'inventaire
				if (top.frames[2].location.href.indexOf("frame_inventaire.php") != -1)  //si la page d'inventaire est affichée à droite
					top.frames[2].document.getElementById("ef_inv_liens").getElementsByTagName("input")[0].focus();
		}
		//~ else if (/frame_inventaire\.php/.test(window.location.href))
		//~ {
			//~ if (e.charCode == 114)  //r => champ de recherche d'objet
				//~ dom.tag(dom.id("ef_inv_liens"), "input", 0).focus();
			//~ else if (e.charCode == 105)  //i => inventaire
			//~ {
				//~ self.location.href = dom.tag(dom.id("linkinvent"), "a", 0).href;
			//~ }
			//~ else if (e.charCode == 99)  //c => cape
			//~ {
				//~ if (utils.defined(dom.tag(dom.id("linkcape"), "a", 0)))
					//~ self.location.href = dom.tag(dom.id("linkcape"), "a", 0).href;
			//~ }
		//~ }
	},
	
	/*************************************************************************
	 *   L O G
	 *************************************************************************/
	
	/*
	Log_ancien : function()
	{
		monNom = GM_getValue("nom_joueur_courant");
		GM_log("EpicFriend.Log() >> monNom = " + monNom);
		var msg = [];
		var sLog = GM_getValue("log_"+serveur, "");
		//~ if(/frame_events\.php/.test(location.href) && ! /(?:Carte strat.gique)|(?:Carte magique de Strat.gie)/i.test(document.body.innerHTML))
		if(/frame_events\.php/.test(location.href))
		{
			GM_log("EpicFriend.Log() >> On est sur la page frame_events.php");
			for(var n=0, oLi; oLi=dom.tag(dom.id("EW_Content_Events"), "li", n); n++)
			{
				var sContent = oLi.textContent.replace(/\\'/g, "`").replace(/\'/g, "`");
				GM_log("EpicFriend.Log() >> Le contenu détecté est: " + sContent)
				if (! /^\s*$/.test(sContent) && sLog.indexOf(sContent) < 0)
				{
					msg.push(monNom + " # " + sContent);
					GM_log("EpicFriend.Log() >> Le contenu détecté n'existe pas encore dans le log => prêt à être enregistré");
				}
			}
			GM_log("EpicFriend.Log() >> Voilà au final ce qui va être enregistré : " + msg.join("\n"));
		}
		if (/(?:soigner|att_p_cac|att_pet|att_ench|obj_util|obj_donner|obj_don_or|dieu_ench|dieu_ench_fin|att_neige|metiers|batiments)\.php/.test(location.href))
		{
			//cas de: sondeur d'âme, carte magique de stratégie, bâtiment non-PR
			if(! /obj_util\.php\?ido=(?:62|91)$/.test(location.href)
			   && ! (/batiments\.php/.test(location.href) && /Vous venez de prendre le contr.le de ce portail/.test(dom.id("EW_Content_Action").textContent)))
			{
				var oNow = new Date();
				var sDate = oNow.getDate().toString().replace(/^([0-9])$/, "0$1");
				var sMonth = (parseInt(oNow.getMonth())+1).toString().replace(/^([0-9])$/, "0$1");
				var sHours = oNow.getHours().toString().replace(/^([0-9])$/, "0$1");
				var sMinutes = oNow.getMinutes().toString().replace(/^([0-9])$/, "0$1");
				var sSeconds = oNow.getSeconds().toString().replace(/^([0-9])$/, "0$1");
				var sDateTime = sDate+"/"+sMonth+"/"+(oNow.getYear()+1900)+" - "+sHours+":"+sMinutes+":"+sSeconds;
				var sContent = dom.id("EW_Content_Action").textContent.replace(/\\'/g, "`").replace(/\'/g, "`");
				if (! /^\s*$/.test(sContent) && sLog.indexOf("# "+sDateTime) < 0)
					msg.push(monNom + " # " + sDateTime + " : " + sContent.replace(/\n/g, " "));
			}
		}
		GM_setValue("log_"+serveur, sLog + "~" + msg.join("~"));
		GM_log("EpicFriend.Log() >> Actions enregistrées !");
	},
	*/
	
	Log : function()
	{
		if (utils.undef(monNom)) monNom = GM_getValue("nom_joueur_courant");
		GM_log("EpicFriend.Log() >> monNom = " + monNom);
		var msg = [];
		var sLog = GM_getValue("log_" + serveur + "_" + monNom, "");
		sLog = sLog.replace(/^~*/, "").replace(/~*$/, "").replace(/~+/g, "~").replace(/# (\d)/g, "$1");
		//~ if(/frame_events\.php/.test(location.href) && ! /(?:Carte strat.gique)|(?:Carte magique de Strat.gie)/i.test(document.body.innerHTML))
		if(/frame_events\.php/.test(location.href))
		{
			GM_log("EpicFriend.Log() >> On est sur la page frame_events.php");
			for(var n=0, oLi; oLi=dom.tag(dom.id("EW_Content_Events"), "li", n); n++)
			{
				var sContent = oLi.textContent.replace(/\\'/g, "`").replace(/\'/g, "`").replace(/^# */, "");
				GM_log("EpicFriend.Log() >> Le contenu détecté est: " + sContent)
				var aA = /^(\d+)\/(\d+)\/(\d+) - (\d+):(\d+):(\d+) : (.*)$/.exec(sContent);
				var sJour = aA[1], sMois = aA[2] - 1, sAnnee = aA[3];
				var sHeures = aA[4], sMinutes = aA[5], sSecondes = aA[6];
				var sTexte = aA[7];
				var oDate = new Date(sAnnee, sMois, sJour, sHeures, sMinutes, sSecondes);
				var oVraiDate = new Date(oDate.getTime() + 2*60*60*1000);
				GM_log("Ancienne date: " + oDate.toString() + ", nouvelle date corrigée: " + oVraiDate.toString());
				var sAnnee = oVraiDate.getFullYear();
				var sMois = (parseInt(oVraiDate.getMonth()) + 1).toString().replace(/^([0-9])$/, "0$1");
				var sJour = oVraiDate.getDate().toString().replace(/^([0-9])$/, "0$1");
				var sHeures = oVraiDate.getHours().toString().replace(/^([0-9])$/, "0$1");
				var sMinutes = oVraiDate.getMinutes().toString().replace(/^([0-9])$/, "0$1");
				var sSecondes = oVraiDate.getSeconds().toString().replace(/^([0-9])$/, "0$1");
				//~ sContent = sContent.replace(/^\d+\/\d+\/\d+ - \d+:\d+:\d+/, oVraiDate.getDate().toString().replace(/^([0-9])$/, "0$1") + "/" + (oVraiDate.getMonth() + 1).toString().replace(/^([0-9])$/, "0$1") + "/" + oVraiDate.getFullYear() + " - " + oVraiDate.getHours().toString().replace(/^([0-9])$/, "0$1") + ":" + oVraiDate.getMinutes().toString().replace(/^([0-9])$/, "0$1") + ":" + oVraiDate.getSeconds().toString().replace(/^([0-9])$/, "0$1"));
				sContent = sContent.replace(/^\d+\/\d+\/\d+ - \d+:\d+:\d+/, [sJour, sMois, sAnnee].join("/") + " - " + [sHeures, sMinutes, sSecondes].join(":"));
				if (sLog.indexOf(sContent) < 0 && ! /^[ \t]*$/.test(sTexte))
				{
					msg.push(sContent);
					GM_log("EpicFriend.Log() >> Le contenu détecté n'existe pas encore dans le log => prêt à être enregistré");
				}
			}
			GM_log("EpicFriend.Log() >> Voilà au final ce qui va être enregistré : " + msg.join("\n"));
		}
		if (/(?:soigner|att_p_cac|att_pet|att_ench|obj_util|obj_donner|obj_don_or|dieu_ench|dieu_ench_fin|att_neige|metiers|batiments)\.php/.test(location.href))
		{
			//cas de: sondeur d'âme, carte magique de stratégie, bâtiment non-PR
			if(! /obj_util\.php\?ido=(?:62|91)$/.test(location.href)
			   && ! (/batiments\.php/.test(location.href) && /Vous venez de prendre le contr.le de ce portail/.test(dom.id("EW_Content_Action").textContent)))
			{
				var oNow = new Date();
				var sDate = oNow.getDate().toString().replace(/^([0-9])$/, "0$1");
				var sMonth = (parseInt(oNow.getMonth())+1).toString().replace(/^([0-9])$/, "0$1");
				var sHours = oNow.getHours().toString().replace(/^([0-9])$/, "0$1");
				var sMinutes = oNow.getMinutes().toString().replace(/^([0-9])$/, "0$1");
				var sSeconds = oNow.getSeconds().toString().replace(/^([0-9])$/, "0$1");
				var sDateTime = sDate+"/"+sMonth+"/"+oNow.getFullYear()+" - "+sHours+":"+sMinutes+":"+sSeconds;
				var sContent = dom.id("EW_Content_Action").textContent.replace(/\\'/g, "`").replace(/\'/g, "`").replace(/^# */, "");
				if (sContent != "" && sLog.indexOf("# "+sDateTime) < 0)
					msg.push(sDateTime + " : " + sContent.replace(/\n/g, " "));
			}
		}
		GM_setValue("log_" + serveur + "_" + monNom, sLog + "~" + msg.join("~"));
		GM_log("EpicFriend.Log() >> Actions enregistrées !");
	},
	
AnalyserInsererLog : function()
	{
		monNom = GM_getValue("nom_joueur_courant", "");
		if (GM_getValue("log_" + serveur + "_" + monNom, "") && GM_getValue("log_" + serveur + "_" + monNom, "") != "")
		{
			var sLog = GM_getValue("log_" + serveur + "_" + monNom, "").replace(/\\'/g, "`").replace(/\'/g, "`");
			sLog = sLog.replace(/(\d{2})\/(\d{2})\/(\d{4})/g, "$3/$2/$1").replace(/^~*/, '').replace(/~*$/, "").replace(/~{2,}/g, "~");
			var aLog = sLog.split(/~/).sort();
			sLog = aLog.join("~");
			sLog = sLog.replace(/`/g, "\'");
			sLog = sLog.replace(/(\d{4})\/(\d{2})\/(\d{2})/g, "$3/$2/$1");
			//fonction d'affichage du log
			function afficherLog()
			{
				var aLog2 = sLog.split(/~/);
				var data = '<html>\
<head>\
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />\
	<title>[EpicFriend] Log</title>\
	<style type="text/css">\
		body { margin: 0; padding: 0; }\
		#f { position: fixed; height: 2.5em; background-color: white; width: 100%; padding: 0.25em 0.5em; }\
		#log { padding-top: 3em; padding-left: 1em; padding-right: 1em; padding-bottom: 0.5em; }\
		.ligne { border-top: 1px dotted silver; }\
		.date { display: block; float: left; width: 14em; color: #444; font-family: monospace; }\
		.texte { display: block; margin-left: 14.5em; }\
		.rate { font-style: italic; color: #777; }\
		.critique { font-weight: bold; }\
		.kill { color: blue; }\
		.mort { color: darkred; }\
	</style>\
</head>\
<body>\
	<form id="f"></form>\
	<div id="log"></div>\
</body>\
</html>';
				var wLog;
				
				//Ouverture de la fenêtre
				function openLog() {
					wLog = window.open("data:text/html;charset=utf-8," + encodeURIComponent(data),"EF_Log")
					wLog.document.close();
					readyState=setTimeout(function(){showLog() },200);
				}
				
				//Insertion du log
				function showLog() {
					wLog.document.title += " de " + monNom + " sur " + serveur.charAt(0).toUpperCase() + serveur.substr(1);
					var log = wLog.document.getElementById("log");
					var html = "";
					for(var nLigne = 0, sLigne ; sLigne = aLog2[nLigne] ; nLigne++)
					{
						if(! sLigne.match(/^(\d{1,2}\/\d{1,2}\/\d{4} - \d{1,2}:\d{1,2}:\d{1,2}) : (.*)$/)) continue;
						//~ GM_log("Insertion dans le log : " + sLigne);
						var aA = sLigne.match(/^(\d{1,2}\/\d{1,2}\/\d{4} - \d{1,2}:\d{1,2}:\d{1,2}) : (.*)$/);
						var bRate = /(?:a bloqué)|(?:a raté)|(?:avez raté)|(?:a manqué)|(?:avez manqué)|(?:sans succès)|(?:vous ne réussissez pas)/i.test(aA[2]) && ! /Veinard !/.test(aA[2]);
						var bCritique = /(?:coup critique !)|(?:soin exceptionnel)|(?:enchantement majeur)/i.test(aA[2]);
						var bKill = /(?:[Vv]ous avez achevé)|(?:ce qui l'a achevé)/i.test(aA[2]);
						var bMort = /vous a (?:achevé|tué)/i.test(aA[2]);
						html += '<div class="ligne"><span class="date">' + aA[1] + '</span><span class="texte';
						html += (bRate? ' rate':'');
						html += (bCritique? ' critique':'');
						html += (bKill ? ' kill':'');
						html += (bMort ? ' mort':'');
						html += '">' + aA[2] + '</span></div>' + "\n";
					}
					log.innerHTML = html;
					var form = wLog.document.getElementById("f");
					var aFiltres = [
						["tout", "tout le log", "."],
						["soins_donnes", "soins donnés", "(?:Vous réussissez à soigner )|(?:Vous ne réussissez pas à soigner)"],
						["soins_recus", "soins reçus", "(?:vous a soigné)|(?:a essayé de vous soigner sans succès)"],
						["benes_recues", "bénédictions reçues", "(?:vous a enchanté)|(?:a essayé d'augmenter votre .+? sans succès)"],
						["mes_morts", "mes morts", "vous a achevé"],
						["mes_kills", "mes kills", "(?:[Vv]ous avez achevé)|(?:ce qui l'a achevé)"],
						["recherche", "recherche", null]
					];
					//Insérer les boutons de filtre
					for(var n = 0, i; i = aFiltres[n]; n++)
					{
						if(i[0] == "recherche") $(form).append($("<input/>").attr({ type: "text", id: "champ_recherche" }));
						$(form).append($("<button/>").attr({ id: i[0], type: "button", value: i[2] }).text(i[1]).css("margin-right", "1em")
							.click(function()
							{
								if(this.getAttribute("id") == "recherche") var re = new RegExp(wLog.document.getElementById("champ_recherche").value, "i");
								else var re = new RegExp(this.getAttribute("value"));
								$(wLog.document).find("div.ligne").each(function()
								{
									if(! re.test($(this).find("span.texte").text())) $(this).hide();
									else $(this).show();
								});
							}));
					}
					wLog.focus();
				}
				
				openLog();
			}
			//Ajout de la fonction d'affichage du log
			document.getElementById("epicfriend_afficher_log").addEventListener("click", afficherLog, true);
		}
		else GM_log('Le log est introuvable pour ' + monNom + ' sur ' + serveur);	
	},
	

	/*************************************************************************
	 *   P R E F E R E N C E S
	 *************************************************************************/

	EffacerPreferences : function()
	{
		monNom = GM_getValue("nom_joueur_courant");
		if(window.confirm("Êtes-vous certain de vouloir effacer les préférences actuellement enregistrées ?\nEpicFriend se basera alors sur les préférences du script, jusqu'à ce que vous enregistriez à nouveau vos préférences."))
			GM_deleteValue("Preferences_" + serveur + "_" + monNom);
	},

	SauverPreferences : function(quietMode)
	{
		/* Si les préférences ont déjà été sauvegardées (GM_getValue("PrefsSauvees") == true), on demande confirmation;
		 * si oui, on écrase; si non: rien.
		 * Si les préférences n'ont jamais été sauvegardées (GM_getValue("PrefsSauvees") == false),
		 * on sauvegarde sans rien demander
		 */
		monNom = GM_getValue("nom_joueur_courant");
		if(utils.defined(quietMode) && quietMode == "quiet")
		{
			GM_deleteValue("Preferences_" + serveur + "_" + monNom);
			GM_setValue("Preferences_" + serveur + "_" + monNom, EpicFriend.Preferences.toSource());
			GM_log(location.href + " >> préférences enregistrées");
		}
		else
		{
			if(window.confirm("Êtes-vous certain de vouloir enregistrer les préférences actuelles (et écraser éventuellement une sauvegarde antérieure) ?"))
			{
				GM_deleteValue("Preferences_" + serveur + "_" + monNom);
				GM_setValue("Preferences_" + serveur + "_" + monNom, EpicFriend.Preferences.toSource());
				GM_log(location.href + " >> préférences enregistrées");
				window.alert("Vos préférences ont bien été sauvegardées");
			}
			else alert("Sauvegarde des préférences annulée par l'utilisateur");
		}
	},
	
	AfficherPreferencesLive : function()
	{
		var reponse = window.prompt("Saisir le libellé de la variable de préférences à afficher", "EpicFriend.Preferences");
		if (reponse)
		{
			GM_log(eval(reponse + ".toSource()"));
			GM_log(GM_getValue("Preferences_" + monNom));
		}
	},
	
	MettreAJourPreferences: function()
	{
		if (utils.defined(GM_getValue("Preferences_" + serveur + "_" + monNom)) && GM_getValue("Preferences_" + serveur + "_" + monNom) != "")
		{
			//function de parcours récursif des propriétés: on compare oRoot1 à oRoot2
			function parcourirPreferences(oRoot1, oRoot2, sMode)
			{
				for (var sProp in oRoot1)
				{
					var value1 = oRoot1[sProp];
					//~ GM_log(sProp + " = " + value1);
					if (typeof oRoot2[sProp] == "undefined") //nouvelle préférence: à fusionner
					{
						aLog.push(sMode + " : " + sProp);
						if (sMode == "ajout")
						{
							oRoot2[sProp] = utils.isStringNumber(value1) ? value1 : eval(value1.toSource());
						}
						else (sMode == "suppression")
						{
							delete oRoot1[sProp];
						}
					}
					else if (utils.isObject(value1) && utils.isObject(oRoot2[sProp])) //on a des sous-propriétés à explorer
						parcourirPreferences(value1, oRoot2[sProp], sMode);
				}
			}
			
			//on copie les préférences initiales (les préférences "modèle")
			var oCopiePrefs = eval(EpicFriend.Preferences.toSource());
			//on charge en mémoire les préférences sauvegardées
			EpicFriend.Preferences = eval(GM_getValue("Preferences_" + serveur + "_" + monNom));
			aLog = [];
			/*****  PARCOURS POUR SUPPRIMER DES PREFERENCES EN TROP DANS LA SAUVEGARDE ***/
			//on compare en évitant aOmettre
			var aOmettre = ["Cibles2", "MesListesMessagerie"];
			for (var sProp in EpicFriend.Preferences)
			{
				if(aOmettre.indexOf(sProp) < 0)
				{
					if(typeof oCopiePrefs[sProp] == "undefined") //nouvelle préférence: à fusionner
					{
						aLog.push("suppression : " + sProp);
						delete EpicFriend.Preferences[sProp];
					}
					//sinon: si on a des sous-propriétés à explorer
					else if(utils.isObject(oCopiePrefs[sProp]) && utils.isObject(EpicFriend.Preferences[sProp]))
						parcourirPreferences(EpicFriend.Preferences[sProp], oCopiePrefs[sProp], "suppression");
				}
			}
			/*****  PARCOURS POUR AJOUTER DES PREFERENCES MANQUANTES DANS LA SAUVEGARDE ***/
			//on compare en évitant aOmettre
			var aOmettre = ["Cibles2", "MesListesMessagerie"];
			for (var sProp in oCopiePrefs)
			{
				if(aOmettre.indexOf(sProp) < 0)
				{
					if(typeof EpicFriend.Preferences[sProp] == "undefined") //nouvelle préférence: à fusionner ou supprimer
					{
						aLog.push("ajout : " + sProp);
						EpicFriend.Preferences[sProp] = eval(oCopiePrefs[sProp].toSource());
					}
					//sinon: si on a des sous-propriétés à explorer
					else if(utils.isObject(oCopiePrefs[sProp]) && utils.isObject(EpicFriend.Preferences[sProp]))
						parcourirPreferences(oCopiePrefs[sProp], EpicFriend.Preferences[sProp], "ajout");
				}
			}
			
			EpicFriend.SauverPreferences("quiet");
			if(aLog.length > 0 && /frame_map\.php/.test(location.href))
				window.alert("La structure des préférences a été mise à jour:\n\t- " + aLog.join("\n\t- "));
			
		}
	},
	
	EffacerDecorsCarteEsc : function()
	{
		if(window.confirm("Êtes-vous certain de vouloir effacer les annotations des minicartes d'escouade actuellement enregistrées ?\nEpicFriend se basera alors sur les annotations du script, jusqu'à ce que vous enregistriez à nouveau vos annotations."))
			GM_deleteValue("DecorsCarteEsc");
	},
	
	SauverDecorsCarteEsc: function()
	{
		if(window.confirm("Êtes-vous certain de vouloir enregistrer les annotations actuelles des minicartes d'escouade (et écraser éventuellement une sauvegarde antérieure) ?"))
		{
			GM_deleteValue("DecorsCarteEsc");
			GM_setValue("DecorsCarteEsc", EpicFriend.LocDecorsCarteEsc.toSource());
			GM_log("EpicFriend: annotations de minicartes d'escouade enregistrées :\n"+GM_getValue("DecorsCarteEsc"));
			window.alert("Vos annotations de minicarte ont bien été sauvegardées (log dans la console d'erreur)");
		}
		else alert("Sauvegarde des annotations des minicartes d'escouade annulée par l'utilisateur");
	},
			

	/*************************************************************************
	 *   C O N F I G U R A T I O N
	 *************************************************************************/

	InterfaceConfiguration : function()
	{
		monNom = GM_getValue("nom_joueur_courant");
		var aCriteresCible = ["nom", "niveau", "creature", "race", "alignement", "escouade", "proprio"];

		function libelle2Id(sLibelle) {
			return sLibelle.replace(/_/g, "UNDERSCORE").replace(/\["/, "_").replace(/"\]$/, "").replace(/"\]\["/g, "_");
		}
		function id2Libelle(sId) {
			return sId.replace(/_/, '["').replace(/$/, '"]').replace(/_/g, '"]["').replace(/UNDERSCORE/g, "_");
		}
		function parcourirPrefs(oObj, nNiveau, sLibelle, oRootDiv, aNePasAnalyser) {
			for(var sProp in oObj)
			{
				if (utils.defined(aNePasAnalyser) && aNePasAnalyser.indexOf(sProp) > -1) continue;
				var value = oObj[sProp];
				var libelle2 = sLibelle + "[\"" + sProp + "\"]";
				var sId = libelle2Id(libelle2);
				if(typeof value == "object")
				{
					var oEntete = dom.el("h" + nNiveau, { id: sId, text: sProp }, { "cursor": "pointer", fontStyle: "italic" });
					dom.add(oRootDiv, oEntete);
					var oDivSection = dom.el("div",
						{ id: "div_niv" + nNiveau + "__" + sId, class: "epicfriend_configuration_section" },
						{ "display" : "none", marginBottom: "0.5em" });
					dom.add(oRootDiv, oDivSection);
					oEntete.addEventListener("click", function()
						{
							$(this.nextSibling).toggle();
							dom.style(this, "fontStyle", (dom.style(this, "fontStyle") == "normal" ? "italic" : "normal"));
						}, true);
					parcourirPrefs(value, nNiveau+1, libelle2, oDivSection);
				}
				else if(typeof value == "string" || typeof value == "number" || typeof value == "boolean")
				{
					var oDivLigne = dom.el("div", { class: "ligne" }, { width: "100%" });
					$(oDivLigne).append($("<span/>").css({display:"block", float:"left", "padding-left":(nNiveau * 1) + "em"}).text(sProp));
					if(typeof value == "boolean")
					{
						var span = dom.el("span", { title: typeof value, id: sId }, { display: "block", marginLeft: "50%", width: "18em" });
						var inputOui = dom.el("input", { type: "radio", name: sId });
						if(value) inputOui.checked = true;
						dom.add(span, inputOui);
						dom.add(span, dom.el("label", { text: "oui" }));
						var inputNon = dom.el("input", { type: "radio", name: sId });
						if(! value) inputNon.checked = true;
						dom.add(span, inputNon);
						dom.add(span, dom.el("label", { text: "non" }));
						dom.add(oDivLigne, span);
					}
					else if(typeof value == "string" || typeof value == "number")
					{
						var oInput = dom.el("input", { type: "text", title: typeof value, id: sId, name: sId }, { display: "block", marginLeft: "50%", width: "18em" });
						oInput.value = value;
						dom.add(oDivLigne, oInput);
					}
					dom.add(oRootDiv, oDivLigne);
				}
			}
		}
		//Modifier la configuration principale
		function modifierConfigurationPrincipale()
		{
			$("#epicfriend_configuration_principal").empty();
			parcourirPrefs(EpicFriend.Preferences, 1, "EpicFriend[\"Preferences\"]", dom.id("epicfriend_configuration_principal"), ["CSS"]);
			$("#epicfriend_configuration_principal").append($("<button/>")
				.attr({ type: "button", id: "bouton_sauver_prefs" })
				.text("Sauver les préférences générales")
				.click(function() {
					$("#epicfriend_configuration_principal div.ligne").each(function() {
						var oInput = dom.tag(this, "input", 0);
						if (dom.att(oInput, "type") == "text")
						{
							var sNomProp = dom.att(oInput, "id");
							var valeur = oInput.value;
						}
						else if (dom.att(oInput, "type") == "radio")
						{
							var sNomProp = dom.att(oInput, "name");
							var valeur = oInput.checked;
						}
						var sNomProp = id2Libelle(sNomProp);
						var prop;
						eval("prop = " + sNomProp);
						if (typeof(eval(sNomProp)) == "boolean") eval(sNomProp + " = " + valeur);
						else if (typeof prop == "number") eval(sNomProp + " = " + valeur);
						else if (typeof prop == "string") eval(sNomProp + ' = "' + valeur + '"');
					});
					EpicFriend.SauverPreferences("quiet");
					alert("Préférences modifiées");
					if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				})
			);
		}
		//Ajout d'une nouvelle cible
		function ajouterCible()
		{
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<h1>Nouvelle cible</h1>"));
			$("#epicfriend_configuration_principal")
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").text("Nom de la cible").addClass("gauche"))
					.append($("<input/>").addClass("droite")))
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").addClass("gauche").text("Afficher"))
					.append($("<span/>").addClass("droite")
						.append($("<input/>").attr({type: "radio", name: "afficher"}))
						.append($("<label/>").text("Oui"))
						.append($("<input/>").attr({type: "radio", name: "afficher", checked: true}))
						.append($("<label/>").text("Non"))))
				.append($("<h2>Criteres</h2>"))
				.append($("<em><small>Remplissez le(s) critère(s) qui vous intéressent, ceux laissés vides seront ignorés</small></em>"))
				.append($("<div/>").attr("id", "criteres"));
			for(var n = 0 ; n < 7 ; n++)
			{
				var oDivLigne = $("<div/>").addClass("ligne").css({height: "1.1em"});
				var oDivNomCritere = $("<div/>").css({float: "left"});
				var oSelectNomCritere = $("<select/>").attr("name", "choix_critere" + (n + 1))
					.css({display: "inline-block", position: "absolute", borderStyle: "solid", borderWidth: "1px", borderColor: "#444", fontSize: "1em !important", height: "1.3em"})
					.append($("<option/>").val("").text("---").css({fontSize: "1em !important", lineHeight: "1em !important"}))
					.appendTo($(oDivNomCritere));
				for(var p = 0, i ; i = aCriteresCible[p] ; p++)
				{
					$(oSelectNomCritere).append($("<option/>").attr("name", i).val(i).text(i).css({fontSize: "1em !important", lineHeight: "1em !important"}));
				}
				var oDivValeurCritere = $("<div/>").css({marginLeft: "50%", width: "18em"})
					.append($("<input/>").attr({type: "text", name: "valeur_critere" + (n + 1)}));
				$(oDivLigne)
					.append($(oDivNomCritere))
					.append($(oDivValeurCritere))
					.appendTo($("#epicfriend_configuration_principal #criteres"));
			}
			$("#epicfriend_configuration_principal")
				.append($("<h2>Apparence</h2>"))
				.append($("<table/>").css({ fontStyle: "italic", fontSize: "smaller" })
					.append($("<tr/>")
						.append($("<th/>").text("Si vous choisissez le type..."))
						.append($("<th/>").text("Remplissez les critères..."))
					)
					.append($("<tr/>")
						.append($("<td/>").text("bordure"))
						.append($("<td/>").text("couleurBord, epaisseurBord, styleBord"))
					)
					.append($("<tr/>")
						.append($("<td/>").text("fond"))
						.append($("<td/>").text("couleurFond, opacite"))
					)
					.append($("<tr/>")
						.append($("<td/>").text("point"))
						.append($("<td/>").text("couleurBord, couleurFond, opacite"))
					)
				)
				.append($("<em><small>Quel que soit votre type d'apparence, CSS vous permet d'y ajouter du style</small></em>"))
				.append($("<div/>").attr("id", "apparence"));
			$("#epicfriend_configuration_principal #apparence")
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").text("type").addClass("gauche"))
					.append($("<select/>").attr("id", "select_choix_type").addClass("droite")
						.append($("<option/>").text("---"))
						.append($("<option/>").text("bordure"))
						.append($("<option/>").text("fond"))
						.append($("<option/>").text("point"))
					)
				);
			for(var n = 0, i; i = ["couleurBord", "epaisseurBord", "styleBord", "couleurFond", "opacite"][n]; n++)
			{
				$("#epicfriend_configuration_principal #apparence")
					.append($("<div/>").addClass("ligne")
						.append($("<span/>").text(i).addClass("gauche"))
						//~ .append($("<input/>").attr({ id: i, type: "text" }).addClass("droite inactif").attr("disabled", "true"))
						.append($("<input/>").attr({ id: i, type: "text" }).addClass("droite"))
					);
			}
			$("#epicfriend_configuration_principal #apparence")
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").text("CSS").addClass("gauche"))
					.append($("<input/>").attr({ id: "CSS", type: "text" }).addClass("droite"))
				);
			$("<button/>").text("Ajouter la cible")
				.click(function() {
					var sNomVarCible = $("#epicfriend_configuration_principal div.ligne:eq(0) input:text").val();
					var bAfficher = ($("#epicfriend_configuration_principal div.ligne:eq(1) input[type=radio][name=afficher]:first")[0].checked ? true : false);
					var bAfficher = (dom.get(dom.id("epicfriend_configuration_principal"), "input", { type: "radio" })[0].checked ? true : false);
					var oCriteres = {};
					$("#epicfriend_configuration_principal #criteres div.ligne").each(function() {
						if($(this).find("select").val() != "" && $(this).find("input:text").val() != "")
							oCriteres[$(this).find("select").val()] = $(this).find("input:text").val();
					});
					var oApparence = {};
					if($("#epicfriend_configuration_principal #apparence #select_choix_type").val() != "---")
					{
						oApparence.type = $("#epicfriend_configuration_principal #apparence #select_choix_type").val();
						$("#epicfriend_configuration_principal #apparence div.ligne:gt(0)").each(function() {
							oApparence[$(this).find("span").text()] = $(this).find("input:text").val();
						});
						oCible = {
							criteres : oCriteres,
							apparence : oApparence,
							afficher : bAfficher
						};
						if(utils.undef(EpicFriend.Preferences.Cibles2[sNomVarCible]))
							EpicFriend.Preferences.Cibles2[sNomVarCible] = oCible;
						EpicFriend.SauverPreferences("quiet");
						alert("Cible ajoutée");
						if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
						{
							$("#epicfriend_configuration").hide();
							window.location.reload();
						}
					}
				})
				.appendTo($("#epicfriend_configuration_principal"));
		}
		//Copier une cible existante sur un autre serveur
		function copierCible()
		{
			var princ = dom.id("epicfriend_configuration_principal");
			var cibles = EpicFriend.Preferences.Cibles2;
			princ.innerHTML = "";
			var choixCible = dom.add(
				dom.el("select", { id: "select_choix_cible" }),
				dom.el("option", { text: "---", value: "", selected: "selected" })
			);
			for (var n = 0, serveur; serveur = EpicFriend.Serveurs[n]; n++)
			{
				for (var nomcible in cibles[serveur])
					dom.add(choixCible, dom.el("option", {
						text: serveur + " / " + nomcible,
						value: serveur + " / " + nomcible
					}));
			}
			var choixServeur = dom.el("select", { id: "select_choix_serveur", class: "droite" });
			for (var n = 0, serveur; serveur = EpicFriend.Serveurs[n]; n++)
				dom.add(choixServeur, dom.el("option", { text: serveur, value: serveur }));
			dom.add(princ, [
				dom.el("h1", { text: "Copier une cible" }),
				dom.add(dom.el("div", { class: "ligne_speciale" }), choixCible),
				dom.add(dom.el("div", { class: "ligne_speciale" }), [
					dom.el("span", { text: "Serveur de destination", class: "gauche" }),
					choixServeur
				]),
				dom.el("div", { id: "cible" }),
				dom.el("button", { type: "button", id: "bouton_copier_cible", text: "Copier" })
			]);
			choixCible.addEventListener("change", function()
				{
					if (dom.getSelect(this) != "")
					{
						var [serveur, nomcible] = dom.getSelect(this).split(" / ");
						var cible = cibles[serveur][nomcible];
						var divcible = dom.get(princ, "div", { id: "cible" }, 0);
						divcible.innerHTML = "";
						dom.add(divcible, [
							dom.add(dom.el("div", { class: "ligne" }), [
								dom.el("span", { text: "Nom", class: "gauche" }),
								dom.el("input", { type: "text", class: "droite", value: nomcible, id: "nom_cible" })
							]),
							dom.el("h2", { text: "Critères" })
						]);
						for (var critere in cible.criteres)
							dom.add(divcible, 
								dom.add(dom.el("div", { class: "ligne" }), [
									dom.el("span", { text: critere, class: "gauche" }),
									dom.el("span", { html: (cible.criteres[critere] || "&nbsp;"), class: "droite" })
								])
							);
						dom.add(divcible, dom.el("h2", { text: "Apparence" }));
						for (var trait in cible.apparence)
							dom.add(divcible,
								dom.add(dom.el("div", { class: "ligne" }), [
									dom.el("span", { text: trait, class: "gauche" }),
									dom.el("span", { html: (cible.apparence[trait] || "&nbsp;"), class: "droite" })
								])
							);
						dom.add(divcible, [
							dom.el("h2", { text: "Afficher" }),
							dom.add(dom.el("div", { class: "ligne" }, { marginTop: "1em" }), [
								dom.el("span", { text: "Afficher", class: "gauche" }),
								dom.el("span", { text: (cible.afficher ? "oui" : "non"), class: "droite" })
							])
						]);
					}	
				}, true);
			dom.get(princ, "button", { id: "bouton_copier_cible" }, 0).addEventListener("click", function()
				{
					var nouveaunom = dom.get(princ, "input", { id: "nom_cible" }, 0).value;
					if (dom.getSelect(choixCible) != "")
					{
						var [serveur, nomcible] = dom.getSelect(choixCible).split(" / ");
						var cible = cibles[serveur][nomcible];
						var serveurCopie = dom.getSelect(choixServeur);
						if ((serveurCopie != serveur && nouveaunom != "") || (serveurCopie == serveur && nouveaunom != nomcible))
						{
							cibles[serveurCopie][nouveaunom] = cible;
							EpicFriend.SauverPreferences("quiet");
							alert("Cible copiée");
							if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
							{
								$("#epicfriend_configuration").hide();
								window.location.reload();
							}
						}
					}
				}, true);
		}
		//Modifier les critères d'une cible existante
		function modifierCriteresCible()
		{
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<h1/>").text("Modifier une cible"))
				.append($("<select/>")
					.attr("id", "select_choix_cible")
					.append($("<option/>").text("---").val("").attr("selected", "selected"))
				)
				.append($("<div/>").attr("id", "cible"))
				.append($("<button/>").attr({ type: "button", id: "bouton_modifier" }).text("Modifier les critères de la cible"));
			for(var sNomCible in EpicFriend.Preferences.Cibles2)
			{
				if (sNomCible != "AfficherTous")
					$("<option/>").text(sNomCible).val(sNomCible).appendTo($("#select_choix_cible"));
			}
			$("#select_choix_cible").change(function() {
				$("#epicfriend_configuration_principal #cible").empty();
				var nomcible = $(this).val();
				$("#epicfriend_configuration_principal #cible")
					.append($("<div/>").addClass("ligne_speciale")
						.append($("<span/>").addClass("gauche").text("Nom de la cible"))
						.append($("<input/>").attr({ type: "text", id: "nom_variable" }).addClass("droite").val(nomcible))
					)
					.append($("<h1/>").text("Critères"));	
				var oCible = EpicFriend.Preferences.Cibles2[nomcible];
				for(var nCritere = 0, sCritere ; sCritere = aCriteresCible[nCritere] ; nCritere++)
				{
					var valeurcritere = oCible.criteres[sCritere] || "";
					$("<div/>").addClass("ligne")
						.append($("<span/>").attr("name", "nom_critere" + (nCritere + 1)).addClass("gauche").text(sCritere))
						.append($("<input/>").attr({ type: "text", name: "valeur_critere" + (nCritere + 1) }).addClass("droite").val(valeurcritere))
						.appendTo($("#epicfriend_configuration_principal #cible"));
				}
			});
			$("#bouton_modifier").click(function() {
				if($("#epicfriend_configuration_principal #cible div.ligne"))
				{
					var sNomCible = $("#select_choix_cible").val();
					var sNomVar = $("#nom_variable").val();
					var oCible = EpicFriend.Preferences.Cibles2[sNomCible];
					if(sNomVar != sNomCible)
					{
						EpicFriend.Preferences.Cibles2[sNomVar] = {};
						EpicFriend.Preferences.Cibles2[sNomVar].apparence = oCible.apparence;
						EpicFriend.Preferences.Cibles2[sNomVar].afficher = oCible.afficher;
						oCible.afficher = false;						
						delete EpicFriend.Preferences.Cibles2[sNomCible];
						sNomCible = sNomVar;
					}
					EpicFriend.Preferences.Cibles2[sNomCible].criteres = {};
					$("#epicfriend_configuration_principal #cible div.ligne").each(function() {
						var sNomCritere = $(this).find("span:first").text();
						if($(this).find("input[type=text"))
						{
							var input = $(this).find("input[type=text]:first").val();
							if(/string|number/.test(typeof input) && input != "")
								EpicFriend.Preferences.Cibles2[sNomCible].criteres[sNomCritere] = $(this).find("input[type=text]:first").val();
						}
						else if($(this).find("input[type=radio]"))
							EpicFriend.Preferences.Cibles2[sNomCible].criteres[sNomCritere] = ($(this).find("input[type=radio]:first")[0].checked) ? true : false;
					});
					EpicFriend.SauverPreferences("quiet");
					alert("Critères de la cible modifiés");
					if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				}
			});
		}
		//Supprimer une cible
		function supprimerCible()
		{
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<h1/>").text("Supprimer une cible"))
				.append($("<select/>").attr("id", "select_choix_cible").append($("<option/>").text("---").val("").attr("selected", "selected")))
				.append($("<div/>").attr("id", "cible"))
				.append($("<button/>").attr({ type: "button", id: "bouton_supprimer" }).text("Supprimer la cible"));
			for(var sNomCible in EpicFriend.Preferences.Cibles2)
			{
				if (sNomCible != "AfficherTous")
					$("#epicfriend_configuration #select_choix_cible").append($("<option/>").text(sNomCible).val(sNomCible));
			}
			$("#epicfriend_configuration_principal #select_choix_cible").change(function() {
				if($(this).val() != "" && $(this).val() != "---")
				{
					var sNomCible = $("#epicfriend_configuration_principal #select_choix_cible").val();
					var oCible = EpicFriend.Preferences.Cibles2[sNomCible];
					$("#epicfriend_configuration_principal #cible")
						.empty()
						.append($("<div/>").addClass("ligne")
							.append($("<span/>").text("Afficher").addClass("gauche"))
							.append($("<span/>").addClass("droite").text(oCible.afficher ? "oui" : "non"))
						)
						.append($("<h2>Critères</h2>"));
					for(var sNomCritere in oCible.criteres)
						$("#epicfriend_configuration_principal #cible")
							.append($("<div/>").addClass("ligne")
								.append($("<span/>").text(sNomCritere).addClass("gauche"))
								.append($("<span/>").text(oCible.criteres[sNomCritere]).addClass("droite"))
							);
					$("#epicfriend_configuration_principal #cible").append($("<h2>Apparence</h2>"));
					for(var sNomProp in oCible.apparence)
						$("#epicfriend_configuration_principal #cible")
							.append($("<div/>").addClass("ligne")
								.append($("<span/>").text(sNomProp).addClass("gauche"))
								.append($("<span/>").html(oCible.apparence[sNomProp] || "&nbsp;").addClass("droite"))
							);
				}
			});
			$("#epicfriend_configuration_principal #bouton_supprimer").click(function() {
				if($("#epicfriend_configuration_principal #select_choix_cible").val() != "---" || $("#epicfriend_configuration_principal #select_choix_cible").val() != "")
				{
					var [sServeur, sNomCible] = $("#epicfriend_configuration_principal #select_choix_cible").val().split(" / ");
					delete EpicFriend.Preferences.Cibles2[sNomCible];
					EpicFriend.SauverPreferences("quiet");
					alert("Cible supprimée");
					if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				}
			});
		}
		//Ajouter une nouvelle liste de messagerie
		function ajouterListeMessagerie()
		{
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").css({ display: "block", float: "left" }).text("Nom de la liste"))
					.append($("<input/>").attr("name", "nom_liste").css({ display: "block", marginLeft: "50%", width: "18em" }))
				)
				.append($("<div/>").addClass("ligne")
					.append($("<span/>").css({ display: "block", float: "left" }).text("Liste des destinataires (séparés par \";\")"))
					.append($("<textarea/>").attr("name", "valeur_liste").css({ display: "block", marginLeft: "50%", width: "18em" }))
				)
				.append($("<button/>").attr({ type: "button", id: "bouton_ajouter" }).text("Ajouter la liste"));
			$("#epicfriend_configuration_principal #bouton_ajouter").click(function() {
				var sNomListe = $("#epicfriend_configuration_principal input[name=nom_liste]").val();
				var sValeurListe = $("#epicfriend_configuration_principal textarea[name=valeur_liste]").val();
				if(sNomListe != "" && sValeurListe != "")
				{
					EpicFriend.Preferences.MesListesMessagerie[sNomListe] = sValeurListe;
					EpicFriend.SauverPreferences("quiet");
					alert("Liste de messagerie ajoutée");
					if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				}
			});
		}
		//Supprimer une liste de messagerie
		function supprimerListeMessagerie()
		{
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<select/>")
					.attr("id", "select_choix_liste")
					.append($("<option/>").val("").text("---"))
				)
				.append($("<div/>").attr("id", "liste"))
				.append($("<button/>").attr({ type: "button", id: "bouton_supprimer_liste" }).text("Supprimer la liste"));
			for(sNomListe in EpicFriend.Preferences.MesListesMessagerie)
				$("#epicfriend_configuration_principal #select_choix_liste")
					.append($("<option/>").val(sNomListe).text(sNomListe));
			$("#epicfriend_configuration_principal #select_choix_liste").change(function() {
				if($(this).val() != "---" && $(this).val() != "")
				{
					var sNomListe = $(this).val();
					var sListe = EpicFriend.Preferences.MesListesMessagerie[sNomListe];
					$("#epicfriend_configuration_principal #liste")
						.empty()
						.append($("<div/>")
							.addClass("ligne")
							.append($("<span/>").text(sNomListe).css({ display: "block", float: "left" }))
							.append($("<span/>").text(sListe.replace(/([^ ]);([^ ])/g, "$1; $2")).css({ display: "block", marginLeft: "50%", width: "18em" }))
						);
				}
			});
			$("#epicfriend_configuration_principal #bouton_supprimer_liste").click(function() {
				if($("#epicfriend_configuration_principal #select_choix_liste").val() != "---" && $("#epicfriend_configuration_principal #select_choix_liste").val() != "")
				{
					var sNomListe = $("#epicfriend_configuration_principal #select_choix_liste").val();
					delete EpicFriend.Preferences.MesListesMessagerie[sNomListe];
					EpicFriend.SauverPreferences("quiet");
					alert("Liste de messagerie supprimée");
					if(! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				}
			});
		}
		
		//Ajouter CSS
		function ajouterCSS() {
			$("#epicfriend_configuration_principal")
				.empty()
				.append($("<textarea>" + (EpicFriend.Preferences.CSS || "") + "</textarea>")
					.attr("id", "atext_CSS")
					.css({ "width" : "100%", "height" : "30em" })
				)
				.append($("<br/>"))
				.append($("<button/>").attr({ type: "button", id: "bouton_ajouter_CSS" }).text("Ajouter le style"));
			$("#epicfriend_configuration_principal #bouton_ajouter_CSS").click(function()
				{
					var sCSS = $("#epicfriend_configuration_principal #atext_CSS").val();
					EpicFriend.Preferences.CSS = sCSS;
					EpicFriend.SauverPreferences("quiet");
					alert("Style modifié");
					if (! dom.id("epicfriend_configuration_continuer_configuration").checked)
					{
						$("#epicfriend_configuration").hide();
						window.location.reload();
					}
				});
		}
		
		//aide
		function aide() {
			var princ = dom.id("epicfriend_configuration_principal");
			princ.innerHTML = "";
			dom.add(princ, [
				dom.el("a", { href: "http://epicwar.baba0rum.com/epicfriend/", text: "Aide générale" }),
				dom.el("a", { href: "http://epicwar.baba0rum.com/epicfriend/index.html#configuration", text: "Aide pour la configuration" }),
				dom.el("a", { href: "http://epicwar.baba0rum.com/epicfriend/index.html#cibles2", text: "Aide pour les cibles" })
			]);
			for (var n = 0, lien; lien = dom.tag(princ, "a", n); n++)
			{
				dom.att(lien, "target", "_blank");
				dom.style(lien, "display", "block");
			}
		}
		
		//Dessiner l'interface
		ui.popup("epicfriend_configuration", "", { title: "Configuration d'EpicFriend" },
			{
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 9000,
				opacity: 0.8,
				width: "100%",
				height: "99%",
				backgroundColor: "white",
				borderWidth: 0
			},
			{},
			{
				backgroundColor: "white",
				fontSize: "10px",
				paddingLeft: "4px",
				paddingRight: "4px"
			});
		$("#epicfriend_configuration .babadom2_popup_content")
			.append($("<div/>").attr("id", "epicfriend_configuration_commandes").css({ height: "8%", marginTop: "1em", marginBottom: "1em", marginLeft: "1em", marginRight: "1em" })
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_modifier_configuration_principale", "title": "Modifier la configuration principale"})
					.text("général")
					.click(modifierConfigurationPrincipale)
				)
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_ajouter_nouvelle_cible", "title": "Ajouter une nouvelle cible"})
					.text("ajouter cible")
					.click(ajouterCible)
				)
				//~ .append($("<button/>")
					//~ .attr({"type": "button", "id": "epicfriend_configuration_copier_cible", "title": "Faire une copie d'une cible existante"})
					//~ .text("copier cible")
					//~ .click(copierCible)
				//~ )
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_modifier_criteres_cible", "title": "Modifier les critères d'une cible existante"})
					.text("critères cible")
					.click(modifierCriteresCible)
				)
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_supprimer_cible", "title": "Supprimer une cible existante"})
					.text("supprimer cible")
					.click(supprimerCible)
				)
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_ajouter_nouvelle_liste", "title": "Ajouter une liste de messagerie"})
					.text("ajouter liste")
					.click(ajouterListeMessagerie)
				)
				.append($("<button/>")
					.attr({"type": "button", "id": "epicfriend_configuration_supprimer_liste", "title": "Supprimer une liste de messagerie existante"})
					.text("supprimer liste")
					.click(supprimerListeMessagerie)
				)
				.append($("<button/>")
					.attr({ "type": "button", "id": "epicfriend_configuration_ajouter_CSS", "title": "Ajouter un style externe (CSS)"})
					.text("CSS")
					.click(ajouterCSS)
				)
				.append($("<button/>")
					.attr({ type: "button", id: "epicfriend_configuration_aide", title: "Obtenir de l'aide pour la configuration" })
					.text("aide")
					.click(aide)
				)
				.append($("<br/>"))
				.append($("<input/>")
					.attr({
						type: "checkbox",
						id: "epicfriend_configuration_continuer_configuration",
						title: "Cochez pour ne pas fermer la configuration après avoir cliqué le bouton de validation"
					})
				)
				.append($("<label>Continuer</label>"))
				.append($("<input/>")
					.attr({ type: "checkbox", id: "epicfriend_configuration_deployer", title: "Cochez pour déployer tout" })
					.click(function()
						{
							if (this.checked) $("#epicfriend_configuration_principal .epicfriend_configuration_section").show();
							else $("#epicfriend_configuration_principal .epicfriend_configuration_section").hide();
						}
					)
				)
				.append($("<label>Déployer</label>"))
			)
			.append($("<div/>").attr("id", "epicfriend_configuration_principal"));
		modifierConfigurationPrincipale();
		//ajouter le style
		var sStyle = "#epicfriend_configuration div.ligne:hover, #epicfriend_configuration div.ligne_speciale:hover { background-color: yellow; }\n";
		sStyle += "#epicfriend_configuration div.ligne_speciale { margin-top: 1em; margin-bottom: 1em; font-weight: bold; }\n";
		sStyle += ".gauche { display: block; float: left; }\n";
		sStyle += ".droite { display: block; margin-left: 50%; width: 18em; }\n";
		sStyle += "#epicfriend_configuration_principal { height: 88%; overflow: auto; }\n";
		sStyle += "#epicfriend_configuration_principal button { font-size: 1.5em; font-weight: bold; padding: 0.25em 0.5em; display: inline-block; margin: 1em; }\n";
		sStyle += "#epicfriend_configuration_commandes button { margin-right: 0.5em; }\n";
		sStyle += "input[type=text].inactif { background-color: #333; }\n";
		sStyle += "input[type=text].actif { background-color: #CCC; }\n";
		sStyle += "#epicfriend_configuration table { border-collapse: collapse; }\n";
		sStyle += "#epicfriend_configuration th, #epicfriend_configuration td { border: 1px solid silver; }\n";
		sStyle += "#epicfriend_configuration h1, #epicfriend_configuration h2, #epicfriend_configuration h3, #epicfriend_configuration h4, #epicfriend_configuration h5 { padding: 0.25em 0.5em; }\n";
		sStyle += "#epicfriend_configuration h1 { font-size: 1.6em; background-color: orangered; }\n";
		sStyle += "#epicfriend_configuration h2 { font-size: 1.45em; background-color: orange; margin-left: 1em; }\n";
		sStyle += "#epicfriend_configuration h3 { font-size: 1.3em; background-color: gold; margin-left: 2em; }\n";
		sStyle += "#epicfriend_configuration h4 { font-size: 1.15em; background-color: palegoldenrod; margin-left: 3em; }\n";
		sStyle += "#epicfriend_configuration h5 { font-size: 1em; background-color: lightyellow; margin-left: 4em; }\n";
		GM_addStyle(sStyle);
	},
	

	
	/*************************************************************************
	 *   I N I T I A L I S A T I O N    D U   S C R I P T
	 *************************************************************************/
	
	Load : function()
	{
		utils.injectScript("http://www.baba0rum.com/lib/babadom2.js", "babadom2");
		serveur = window.location.href.match(/http:\/\/(.+?)\.epic\-war\.net/)[1];
		//cadre de la vue: acquisition des données du perso
		if (/frame_map\.php/.test(location.href))
		{
			maRace = EpicFriend.MaRace();
			GM_setValue("race_joueur_courant", maRace);
			maClasse = EpicFriend.MaClasse();
			GM_setValue("alignement_joueur_courant", maClasse);
			monNiveau = EpicFriend.MonNiveau();
			GM_setValue("niveau_joueur_courant", monNiveau);
			monNom = EpicFriend.MonNom();
			GM_setValue("nom_joueur_courant", monNom);
			mesPA = EpicFriend.MesPA();
			maLoc = ["", ""];
			maProfondeur = EpicFriend.MaProfondeur();
			GM_setValue("profondeur_joueur_courant", maProfondeur);
			mesPV = EpicFriend.MesPV();
			GM_setValue("pv_joueur_courant", mesPV.join("/"));
			
		}
		//tout cadre: redistribution de monNom
		monNom = GM_getValue("nom_joueur_courant");
		//tout cadre: gestion des préférences: nom du perso indispensable!
		if(typeof GM_getValue("DecorsCarteEsc", "") != "undefined" && GM_getValue("DecorsCarteEsc", "") != "")
		{
			EpicFriend.LocDecorsCarteEsc = eval(GM_getValue("DecorsCarteEsc", ""));
			//~ GM_log(location.href + ": Décors de mini-carte d'escouade automatiquement chargées depuis la sauvegarde");
		}
		//cadre de vue, d'escouade, d'inventaire et de messagerie: essai de mise à jour (si besoin) de la structure
		//des préférences sauvegardées avec les nouvelles du script, puis remplacement des préférences
		//par défaut par celles sauvegardées.
		if(/frame_(?:map|messagerie|escouade|inventaire)\.php/.test(location.href))
		{
			if (utils.defined(GM_getValue("Preferences_" + serveur + "_" + monNom)) && GM_getValue("Preferences_" + serveur + "_" + monNom) != "")
			{
				EpicFriend.MettreAJourPreferences();
				EpicFriend.Preferences = eval(GM_getValue("Preferences_" + serveur + "_" + monNom, ""));
				//~ GM_log(location.href + " >> Préférences chargées depuis la sauvegarde");
			}
		}
		//tout cadre: redistribution de monEscouade
		monEscouade = EpicFriend.Preferences.General.MonEscouade;
		//cadre de vue: détermination de la localisation, analyse, annotation, EpicVue, amélioration vue
		if (/frame_map\.php/.test(location.href))
		{
			EpicFriend.InsererScript("epicfriend_script_escoal", "var serveur=\"" + serveur + "\";\nchefsEscouades = " + EpicFriend.ChefsEscouades.toSource());
			if(document.getElementById("map"))
			{
				maLoc = EpicFriend.MaLoc();
				GM_setValue("loc_joueur_courant", maLoc.join("/"));
				EpicFriend.AnalyserJoueurs();
				if(! EpicFriend.Preferences.Vue.Divers.DesactiverToutesAnnotations) EpicFriend.AnnoterVue();
				//~ EpicFriend.ConstruireRapportVue();
				//~ EpicFriend.InsererScriptRapport();
			}
			EpicFriend.AmeliorerInterfaceVue();
			EpicFriend.AnalyserInsererLog();
		}
		//Cadre de l'inventaire: amélioration
		if(/frame_inventaire\.php/.test(location.href))
			EpicFriend.AmeliorerInterfaceInventaire2();
		//Cadre de l'escouade: amélioration
		if(/frame_escouade\.php/.test(location.href))
			EpicFriend.AmeliorerInterfaceEscouade();
		//Log
		if(/(?:frame_events|soigner|att_p_cac|att_pet|att_ench|obj_util|obj_donner|obj_don_or|dieu_ench|dieu_ench_fin|att_neige|metiers)\.php/.test(location.href))
		{
			EpicFriend.Log();
		}
		//Messagerie
		if(/(frame_messagerie|msg_send)\.php/.test(location.href))
		{
			//~ console.log(monNom);
			EpicFriend.AmeliorerInterfaceMessagerie();
		}
		//Classement
		if(/index\/ind_skeleton\.php/.test(location.href))
			EpicFriend.AmeliorerClassement();
		//cadre général: CSS, news, menus utilisateurs Greasemonkey
		if(/^http:\/\/.+?\.epic\-war\.net\/frames\.php$/.test(location.href)) {
			EpicFriend.RecupererNews();
			GM_registerMenuCommand("EpicFriend: A propos", EpicFriend.APropos);
			monNom = GM_getValue("nom_joueur_courant");
			GM_registerMenuCommand("EpicFriend: Afficher les news", function() { window.alert(EpicFriend.News) });
			GM_registerMenuCommand("EpicFriend: Préférences: Effacer", EpicFriend.EffacerPreferences);
			GM_registerMenuCommand("EpicFriend: Préférences: Voir", function() { GM_log(GM_getValue("Preferences_" + serveur + "_" + monNom)); });
			GM_registerMenuCommand("EpicFriend: Préférences: Importer", function()
				{
					var sPrefs = window.prompt("Entrez les préférences pour "+monNom);
					if (utils.defined(sPrefs) && sPrefs != "")
					{
						GM_setValue("Preferences_" + serveur + "_" + monNom, sPrefs);
						alert("Préférences importées !");
						window.location.reload();
					}
				});
			GM_registerMenuCommand("EpicFriend: Préférences: Exporter", function()
				{
					if (utils.defined(GM_getValue("Preferences_" + serveur + "_" + monNom)) && GM_getValue("Preferences_" + serveur + "_" + monNom) != "")
						window.prompt("Voici les préférences pour "+monNom, GM_getValue("Preferences_" + serveur + "_" + monNom));
					else
						alert("Pas de préférences trouvées pour "+monNom);
				});
			GM_registerMenuCommand("EpicFriend: Log (ancien): Exporter (brut)", function() { prompt("le log du serveur " + serveur, GM_getValue("log_" + serveur)) });
			GM_registerMenuCommand("EpicFriend: Log (nouveau): Importer", function()
				{
					var sLog = window.prompt("Importer le log de " + monNom + " sur " + serveur);
					if (utils.defined(sLog) && sLog != "")
						GM_setValue("log_" + serveur + "_" + monNom, sLog);
				});
			GM_registerMenuCommand("EpicFriend: Log (nouveau): Exporter (brut)", function() { prompt("le log de " + monNom + " sur le serveur " + serveur, GM_getValue("log_" + serveur + "_" + monNom)) });
		}
		//Raccourcis clavier
		document.addEventListener("keypress", EpicFriend.ChargerRaccourcisClavier, false);
		GM_addStyle("#epicfriend_popup_aide_rapide #raccourcis_clavier { margin-left:1em !important; } \
			#epicfriend_popup_aide_rapide dt { float:left; font-family:monospace !important; }");
		//Donner le focus à un élément lambda sur le cadre de vue (sauf si page de don)
		dom.tag(dom.id("sts_reload"), "input", 0).focus();
		//~ if (! /frame_inventaire\.php\?.*?ac=don/.test(window.location.href)) dom.tag(dom.id("sts_reload"), "input", 0).focus();
		//~ else dom.get(document.body, "input", { type: "submit" }, 0).focus();
		//Charger le CSS externe
		if (utils.defined(EpicFriend.Preferences.CSS) && EpicFriend.Preferences.CSS != "")
		{
			GM_log("chargement du style");
			GM_addStyle(EpicFriend.Preferences.CSS);
		}
	}
};

/*************************************************************************
 *   V U E    P A R T A G E E
 *************************************************************************/

Equipement = {
	baton : {
		nom : "Bâton",
		niveau : 1,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "contondant",
		poids : 5,
		portee : 1,
		prix : 10,
		categorie : "armeMelee"
	},
	dague : {
		nom : "Dague",
		niveau : 1,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "perforant",
		poids : 1,
		portee : 1,
		prix : 15,
		categorie : "armeMelee"
	},
	epee_courte : {
		nom : "Épée courte",
		niveau : 2,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "tranchant",
		poids : 2,
		portee : 1,
		prix : 35,
		categorie : "armeMelee"
	},
	epee_longue : {
		nom : "Épée longue",
		niveau : 3,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "tranchant",
		poids : 3,
		portee : 1,
		prix : 50,
		categorie : "armeMelee"
	},
	lance : {
		nom : "Lance",
		niveau : 4,
		coutPA : 7,
		alignements : ["combattant", "rodeur"],
		typeDegat : "perforant",
		poids : 6,
		portee : 1,
		prix : 65,
		categorie : "armeMelee"
	},
	epee_batarde : {
		nom : "Épée batarde",
		niveau : 4,
		coutPA : 7,
		alignements : ["combattant"],
		typeDegat : "tranchant",
		poids : 4,
		portee : 1,
		prix : 75,
		categorie : "armeMelee"
	},
	hache : {
		nom : "Hache",
		niveau : 5,
		coutPA : 7,
		alignements : ["combattant"],
		typeDegat : "tranchant",
		poids : 5,
		portee : 1,
		prix : 80,
		categorie : "armeMelee"
	},
	sceptre : {
		nom : "Sceptre",
		niveau : 6,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "contondant",
		poids : 3,
		portee : 1,
		prix : 45,
		categorie : "armeMelee"
	},
	sabre : {
		nom : "Sabre",
		niveau : 6,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "tranchant",
		poids : 5,
		portee : 1,
		prix : 90,
		categorie : "armeMelee"
	},
	hallebarde : {
		nom : "Hallebarde",
		niveau : 7,
		coutPA : 7,
		alignements : ["combattant"],
		typeDegat : "tranchant",
		poids : 8,
		portee : 1,
		prix : 110,
		categorie : "armeMelee"
	},
	fleuret : {
		nom : "Fleuret",
		niveau : 8,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "perforant",
		poids : 2,
		portee : 1,
		prix : 85,
		categorie : "armeMelee"
	},
	marteau_de_la_vengeance : {
		nom : "Marteau de la vengeance",
		niveau : 10,
		coutPA : 7,
		alignements : ["chevalier"],
		typeDegat : "contondant",
		poids : 8,
		portee : 1,
		prix : 140,
		categorie : "armeMelee"
	},
	masse_d_arme : {
		nom : "Masse d'arme",
		niveau : 10,
		coutPA : 7,
		alignements : ["soldat"],
		typeDegat : "contondant",
		poids : 9,
		portee : 1,
		prix : 160,
		categorie : "armeMelee"
	},
	fleau : {
		nom : "Fléau",
		niveau : 10,
		coutPA : 7,
		alignements : ["barbare"],
		typeDegat : "contondant",
		poids : 10,
		portee : 1,
		prix : 180,
		categorie : "armeMelee"
	},
	depeceur : {
		nom : "Dépeceur",
		niveau : 11,
		coutPA : 7,
		alignements : ["brigand", "prédateur"],
		typeDegat : "tranchant",
		poids : 4,
		portee : 1,
		prix : 150,
		categorie : "armeMelee"
	},
	fleau_divin : {
		nom : "Fléau divin",
		niveau : 11,
		coutPA : 7,
		alignements : ["barbare"],
		typeDegat : "contondant",
		poids : 12,
		portee : 1,
		prix : 280,
		categorie : "armeMelee"
	},
	fouet : {
		nom : "Fouet",
		niveau : 12,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "contondant",
		poids : 2,
		portee : 1,
		prix : 120,
		categorie : "armeMelee"
	},
	epee_reguliere : {
		nom : "Épée régulière",
		niveau : 12,
		coutPA : 7,
		alignements : ["soldat"],
		typeDegat : "tranchant",
		poids : 10,
		portee : 1,
		prix : 250,
		categorie : "armeMelee"
	},
	fleau_du_pardon : {
		nom : "Fléau du pardon",
		niveau : 13,
		coutPA : 7,
		alignements : ["combattant"],
		typeDegat : "contondant",
		poids : 6,
		portee : 1,
		prix : 220,
		categorie : "armeMelee"
	},
	godendac : {
		nom : "Godendac",
		niveau : 14,
		coutPA : 7,
		alignements : ["prédateur"],
		typeDegat : "perforant",
		poids : 8,
		portee : 1,
		prix : 260,
		categorie : "armeMelee"
	},
	perce_gorge : {
		nom : "Perce-gorge",
		niveau : 15,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "perforant",
		poids : 5,
		portee : 1,
		prix : 230,
		categorie : "armeMelee"
	},
	longue_francisque : {
		nom : "Longue francisque",
		niveau : 15,
		coutPA : 6,
		alignements : ["chevalier"],
		typeDegat : "tranchant",
		poids : 9,
		portee : 1,
		prix : 270,
		categorie : "armeMelee"
	},
	epee_du_veteran : {
		nom : "Épée du vétéran",
		niveau : 15,
		coutPA : 6,
		alignements : ["soldat"],
		typeDegat : "tranchant",
		poids : 12,
		portee : 1,
		prix : 310,
		categorie : "armeMelee"
	},
	fourche_du_diable : {
		nom : "Fourche du diable",
		niveau : 15,
		coutPA : 6,
		alignements : ["barbare"],
		typeDegat : "perforant",
		poids : 14,
		portee : 1,
		prix : 350,
		categorie : "armeMelee"
	},
	fouet_infernal : {
		nom : "Fouet infernal",
		niveau : 16,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "contondant",
		poids : 4,
		portee : 1,
		prix : 200,
		categorie : "armeMelee"
	},
	sceptre_de_commandement : {
		nom : "Sceptre de commandement",
		niveau : 16,
		coutPA : 7,
		alignements : ["invocateur"],
		typeDegat : "contondant",
		poids : 6,
		portee : 1,
		prix : 250,
		categorie : "armeMelee"
	},
	pique_infernale : {
		nom : "Pique infernale",
		niveau : 17,
		coutPA : 6,
		alignements : ["barbare"],
		typeDegat : "perforant",
		poids : 16,
		portee : 1,
		prix : 455,
		categorie : "armeMelee"
	},
	epee_du_respect : {
		nom : "Épée du respect",
		niveau : 18,
		coutPA : 6,
		alignements : ["soldat"],
		typeDegat : "tranchant",
		poids : 14,
		portee : 1,
		prix : 415,
		categorie : "armeMelee"
	},
	rakt : {
		nom : "Rakt",
		niveau : 19,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "perforant",
		poids : 8,
		portee : 1,
		prix : 320,
		categorie : "armeMelee"
	},
	grand_marteau : {
		nom : "Grand marteau",
		niveau : 19,
		coutPA : 6,
		alignements : ["chevalier"],
		typeDegat : "contondant",
		poids : 13,
		portee : 1,
		prix : 375,
		categorie : "armeMelee"
	},
	pieu_du_tartare : {
		nom : "Pieu du Tartare",
		niveau : 20,
		coutPA : 6,
		alignements : ["barbare"],
		typeDegat : "perforant",
		poids : 19,
		portee : 1,
		prix : 600,
		categorie : "armeMelee"
	},
	epee_a_double_tranchant : {
		nom : "Épée à double tranchant",
		niveau : 21,
		coutPA : 6,
		alignements : ["soldat"],
		typeDegat : "tranchant",
		poids : 16,
		portee : 1,
		prix : 560,
		categorie : "armeMelee"
	},
	massue_des_geants : {
		nom : "Massue des géants",
		niveau : 21,
		coutPA : 7,
		alignements : ["berserk"],
		typeDegat : "contondant",
		poids : 38,
		portee : 1,
		prix : 690,
		categorie : "armeMelee"
	},
	morgenstern : {
		nom : "Morgenstern",
		niveau : 22,
		coutPA : 6,
		alignements : ["chevalier"],
		typeDegat : "contondant",
		poids : 14,
		portee : 1,
		prix : 480,
		categorie : "armeMelee"
	},
	fleau_bicephale : {
		nom : "Fléau bicéphale",
		niveau : 22,
		coutPA : 5,
		alignements : ["fou de guerre"],
		typeDegat : "contondant",
		poids : 17,
		portee : 1,
		prix : 630,
		categorie : "armeMelee"
	},
	lance_de_cavalerie : {
		nom : "Lance de cavalerie",
		niveau : 22,
		coutPA : 6,
		alignements : ["hussard"],
		typeDegat : "perforant",
		poids : 18,
		portee : 1,
		prix : 655,
		categorie : "armeMelee"
	},
	main_gauche_insidieuse : {
		nom : "Main gauche insidieuse",
		niveau : 23,
		coutPA : 7,
		alignements : ["assassin"],
		typeDegat : "tranchant",
		poids : 12,
		portee : 1,
		prix : 460,
		categorie : "armeMelee"
	},
	lance_de_fantassin : {
		nom : "Lance de fantassin",
		niveau : 23,
		coutPA : 6,
		alignements : ["garde impérial"],
		typeDegat : "perforant",
		poids : 15,
		portee : 2,
		prix : 595,
		categorie : "armeMelee"
	},
	epee_a_trois_mains : {
		nom : "Épée à trois mains",
		niveau : 23,
		coutPA : 6,
		alignements : ["chevalier noir"],
		typeDegat : "tranchant",
		poids : 19,
		portee : 1,
		prix : 615,
		categorie : "armeMelee"
	},
	knout : {
		nom : "Knout",
		niveau : 24,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "contondant",
		poids : 6,
		portee : 1,
		prix : 375,
		categorie : "armeMelee"
	},
	couteau_de_chasse : {
		nom : "Couteau de chasse",
		niveau : 24,
		coutPA : 7,
		alignements : ["pisteur"],
		typeDegat : "perforant",
		poids : 8,
		portee : 1,
		prix : 400,
		categorie : "armeMelee"
	},
	chaine_d_attaque : {
		nom : "Chaîne d'attaque",
		niveau : 24,
		coutPA : 7,
		alignements : ["hors la loi"],
		typeDegat : "psychique",
		poids : 9,
		portee : 1,
		prix : 410,
		categorie : "armeMelee"
	},
	sainte_guisarme : {
		nom : "Sainte guisarme",
		niveau : 24,
		coutPA : 6,
		alignements : ["paladin"],
		typeDegat : "tranchant",
		poids : 13,
		portee : 1,
		prix : 565,
		categorie : "armeMelee"
	},
	epieu_funeste : {
		nom : "Épieu funeste",
		niveau : 24,
		coutPA : 6,
		alignements : ["barbare"],
		typeDegat : "perforant",
		poids : 21,
		portee : 1,
		prix : 810,
		categorie : "armeMelee"
	},
	lacet_etrangleur : {
		nom : "Lacet étrangleur",
		niveau : 25,
		coutPA : 7,
		alignements : ["bandit"],
		typeDegat : "enchantement",
		poids : 7,
		portee : 1,
		prix : 390,
		categorie : "armeMelee"
	},
	scramasaxe : {
		nom : "Scramasaxe",
		niveau : 25,
		coutPA : 6,
		alignements : ["soldat"],
		typeDegat : "tranchant",
		poids : 18,
		portee : 1,
		prix : 740,
		categorie : "armeMelee"
	},
	gourdin_colossal : {
		nom : "Gourdin colossal",
		niveau : 25,
		coutPA : 7,
		alignements : ["berserk"],
		typeDegat : "contondant",
		poids : 44,
		portee : 1,
		prix : 920,
		categorie : "armeMelee"
	},
	sceptre_de_domination : {
		nom : "Sceptre de domination",
		niveau : 26,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : "contondant",
		poids : 9,
		portee : 1,
		prix : 405,
		categorie : "armeMelee"
	},
	marteau_de_guerre : {
		nom : "Marteau de guerre",
		niveau : 26,
		coutPA : 6,
		alignements : ["chevalier"],
		typeDegat : "contondant",
		poids : 15,
		portee : 1,
		prix : 690,
		categorie : "armeMelee"
	},
	fleau_composite : {
		nom : "Fléau composite",
		niveau : 26,
		coutPA : 5,
		alignements : ["fou de guerre"],
		typeDegat : "contondant",
		poids : 18,
		portee : 1,
		prix : 770,
		categorie : "armeMelee"
	},
	lance_d_arçon : {
		nom : "Lance d'arçon",
		niveau : 26,
		coutPA : 6,
		alignements : ["hussard"],
		typeDegat : "perforant",
		poids : 19,
		portee : 1,
		prix : 805,
		categorie : "armeMelee"
	},
	surin_de_l_ombre : {
		nom : "Surin de l'ombre",
		niveau : 27,
		coutPA : 7,
		alignements : ["assassin"],
		typeDegat : "tranchant",
		poids : 14,
		portee : 1,
		prix : 650,
		categorie : "armeMelee"
	},
	darde : {
		nom : "Darde",
		niveau : 27,
		coutPA : 6,
		alignements : ["garde impérial"],
		typeDegat : "perforant",
		poids : 16,
		portee : 2,
		prix : 765,
		categorie : "armeMelee"
	},
	escadon_impie : {
		nom : "Escadon impie",
		niveau : 27,
		coutPA : 6,
		alignements : ["chevalier noir"],
		typeDegat : "tranchant",
		poids : 21,
		portee : 1,
		prix : 785,
		categorie : "armeMelee"
	},
	pal_d_infamie : {
		nom : "Pal d'infamie",
		niveau : 28,
		coutPA : 7,
		alignements : ["barbare"],
		typeDegat : "perforant",
		poids : 23,
		portee : 1,
		prix : 1050,
		categorie : "armeMelee"
	},
	chat_a_neuf_queues : {
		nom : "Chat à neuf queues",
		niveau : 28,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "contondant",
		poids : 8,
		portee : 1,
		prix : 445,
		categorie : "armeMelee"
	},
	chaine_plombee : {
		nom : "Chaîne plombée",
		niveau : 28,
		coutPA : 7,
		alignements : ["hors la loi"],
		typeDegat : "psychique",
		poids : 11,
		portee : 1,
		prix : 515,
		categorie : "armeMelee"
	},
	couteau_d_equarrissage : {
		nom : "Couteau d'équarrissage",
		niveau : 28,
		coutPA : 7,
		alignements : ["pisteur"],
		typeDegat : "perforant",
		poids : 10,
		portee : 1,
		prix : 570,
		categorie : "armeMelee"
	},
	fauchard_sacre : {
		nom : "Fauchard sacré",
		niveau : 28,
		coutPA : 6,
		alignements : ["paladin"],
		typeDegat : "tranchant",
		poids : 14,
		portee : 1,
		prix : 740,
		categorie : "armeMelee"
	},
	marteau_des_titans : {
		nom : "Marteau des titans",
		niveau : 29,
		coutPA : 7,
		alignements : ["berserk"],
		typeDegat : "contondant",
		poids : 50,
		portee : 1,
		prix : 1200,
		categorie : "armeMelee"
	},
	garrot : {
		nom : "Garrot",
		niveau : 29,
		coutPA : 7,
		alignements : ["bandit"],
		typeDegat : "enchantement",
		poids : 9,
		portee : 1,
		prix : 455,
		categorie : "armeMelee"
	},
	estoc : {
		nom : "Estoc",
		niveau : 29,
		coutPA : 6,
		alignements : ["soldat"],
		typeDegat : "perforant",
		poids : 20,
		portee : 1,
		prix : 960,
		categorie : "armeMelee"
	},
	fronde : {
		nom : "Fronde",
		niveau : 2,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "contondant",
		poids : 2,
		portee : 2,
		prix : 25,
		categorie : "armeDistance"
	},
	arc : {
		nom : "Arc",
		niveau : 3,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "perforant",
		poids : 3,
		portee : 2,
		prix : 45,
		categorie : "armeDistance"
	},
	arc_long : {
		nom : "Arc long",
		niveau : 4,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "perforant",
		poids : 4,
		portee : 3,
		prix : 75,
		categorie : "armeDistance"
	},
	arbalete : {
		nom : "Arbalète",
		niveau : 7,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "perforant",
		poids : 6,
		portee : 3,
		prix : 110,
		categorie : "armeDistance"
	},
	perce_vent : {
		nom : "Perce-vent",
		niveau : 10,
		coutPA : 7,
		alignements : ["prédateur"],
		typeDegat : "perforant",
		poids : 9,
		portee : 3,
		prix : 140,
		categorie : "armeDistance"
	},
	arbalete_de_precision : {
		nom : "Arbalète de précision",
		niveau : 10,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "perforant",
		poids : 7,
		portee : 3,
		prix : 160,
		categorie : "armeDistance"
	},
	siffleur : {
		nom : "Siffleur",
		niveau : 10,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "perforant",
		poids : 8,
		portee : 3,
		prix : 180,
		categorie : "armeDistance"
	},
	arc_du_stamlic : {
		nom : "Arc du stamlic",
		niveau : 13,
		coutPA : 7,
		alignements : ["rodeur"],
		typeDegat : "perforant",
		poids : 9,
		portee : 3,
		prix : 220,
		categorie : "armeDistance"
	},
	arbalete_sournoise : {
		nom : "Arbalète sournoise",
		niveau : 16,
		coutPA : 7,
		alignements : ["prédateur"],
		typeDegat : "perforant",
		poids : 11,
		portee : 4,
		prix : 270,
		categorie : "armeDistance"
	},
	arc_de_la_peur : {
		nom : "Arc de la peur",
		niveau : 16,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "psychique",
		poids : 9,
		portee : 4,
		prix : 300,
		categorie : "armeDistance"
	},
	arc_du_poete_maudit : {
		nom : "Arc du poète maudit",
		niveau : 16,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "perforant",
		poids : 10,
		portee : 4,
		prix : 330,
		categorie : "armeDistance"
	},
	precis : {
		nom : "Précis",
		niveau : 17,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "auto",
		poids : 2,
		portee : 3,
		prix : 125,
		categorie : "armeDistance"
	},
	arc_du_combattant : {
		nom : "Arc du combattant",
		niveau : 17,
		coutPA : 7,
		alignements : ["combattant"],
		typeDegat : "perforant",
		poids : 6,
		portee : 2,
		prix : 150,
		categorie : "armeDistance"
	},
	arc_des_grands_chemins : {
		nom : "Arc des grands chemins",
		niveau : 20,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "psychique",
		poids : 10,
		portee : 4,
		prix : 440,
		categorie : "armeDistance"
	},
	arc_du_tenebreux : {
		nom : "Arc du ténébreux",
		niveau : 20,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "perforant",
		poids : 13,
		portee : 4,
		prix : 480,
		categorie : "armeDistance"
	},
	arbalete_vicieuse : {
		nom : "Arbalète vicieuse",
		niveau : 21,
		coutPA : 7,
		alignements : ["prédateur"],
		typeDegat : "perforant",
		poids : 12,
		portee : 4,
		prix : 400,
		categorie : "armeDistance"
	},
	arbalete_lourde : {
		nom : "Arbalète lourde",
		niveau : 21,
		coutPA : 8,
		alignements : ["troubadour"],
		typeDegat : "perforant",
		poids : 14,
		portee : 4,
		prix : 510,
		categorie : "armeDistance"
	},
	arc_du_preux : {
		nom : "Arc du preux",
		niveau : 22,
		coutPA : 7,
		alignements : ["chevalier"],
		typeDegat : "perforant",
		poids : 8,
		portee : 2,
		prix : 290,
		categorie : "armeDistance"
	},
	arbalete_cinetique : {
		nom : "Arbalète cinétique",
		niveau : 22,
		coutPA : 7,
		alignements : ["ménestrel"],
		typeDegat : "perforant",
		poids : 13,
		portee : 4,
		prix : 450,
		categorie : "armeDistance"
	},
	arc_de_l_etrier : {
		nom : "Arc de l'étrier",
		niveau : 22,
		coutPA : 7,
		alignements : ["bandit"],
		typeDegat : "psychique",
		poids : 11,
		portee : 4,
		prix : 470,
		categorie : "armeDistance"
	},
	arc_d_apparat : {
		nom : "Arc d'apparat",
		niveau : 23,
		coutPA : 7,
		alignements : ["soldat"],
		typeDegat : "perforant",
		poids : 9,
		portee : 2,
		prix : 265,
		categorie : "armeDistance"
	},
	arc_du_mendiant : {
		nom : "Arc du mendiant",
		niveau : 23,
		coutPA : 7,
		alignements : ["hors la loi"],
		typeDegat : "psychique",
		poids : 10,
		portee : 4,
		prix : 410,
		categorie : "armeDistance"
	},
	arc_cynegetique : {
		nom : "Arc cynégétique",
		niveau : 23,
		coutPA : 7,
		alignements : ["pisteur"],
		typeDegat : "perforant",
		poids : 12,
		portee : 5,
		prix : 430,
		categorie : "armeDistance"
	},
	fronde_des_steppes : {
		nom : "Fronde des steppes",
		niveau : 24,
		coutPA : 7,
		alignements : ["barbare"],
		typeDegat : "contondant",
		poids : 10,
		portee : 2,
		prix : 240,
		categorie : "armeDistance"
	},
	arme_a_fumee : {
		nom : "Arme à fumée",
		niveau : 24,
		coutPA : 7,
		alignements : ["assassin"],
		typeDegat : "perforant",
		poids : 11,
		portee : 3,
		prix : 370,
		categorie : "armeDistance"
	},
	arc_du_veuf : {
		nom : "Arc du veuf",
		niveau : 24,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "perforant",
		poids : 15,
		portee : 4,
		prix : 640,
		categorie : "armeDistance"
	},
	arc_du_malandrin : {
		nom : "Arc du malandrin",
		niveau : 25,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "psychique",
		poids : 11,
		portee : 4,
		prix : 590,
		categorie : "armeDistance"
	},
	arbalete_a_poulie : {
		nom : "Arbalète à poulie",
		niveau : 25,
		coutPA : 8,
		alignements : ["troubadour"],
		typeDegat : "perforant",
		poids : 16.5,
		portee : 4,
		prix : 680,
		categorie : "armeDistance"
	},
	arc_du_heros : {
		nom : "Arc du héros",
		niveau : 26,
		coutPA : 7,
		alignements : ["chevalier"],
		typeDegat : "perforant",
		poids : 9,
		portee : 2,
		prix : 400,
		categorie : "armeDistance"
	},
	arbalete_vibrionnante : {
		nom : "Arbalète vibrionnante",
		niveau : 26,
		coutPA : 7,
		alignements : ["ménestrel"],
		typeDegat : "perforant",
		poids : 14,
		portee : 4,
		prix : 600,
		categorie : "armeDistance"
	},
	arc_du_cygne : {
		nom : "Arc du cygne",
		niveau : 26,
		coutPA : 7,
		alignements : ["bandit"],
		typeDegat : "psychique",
		poids : 12,
		portee : 4,
		prix : 630,
		categorie : "armeDistance"
	},
	arc_du_veteran : {
		nom : "Arc du vétéran",
		niveau : 27,
		coutPA : 7,
		alignements : ["soldat"],
		typeDegat : "perforant",
		poids : 10,
		portee : 2,
		prix : 365,
		categorie : "armeDistance"
	},
	arc_d_abondance : {
		nom : "Arc d'abondance",
		niveau : 27,
		coutPA : 7,
		alignements : ["hors la loi"],
		typeDegat : "psychique",
		poids : 10,
		portee : 4,
		prix : 550,
		categorie : "armeDistance"
	},
	arc_du_veneur : {
		nom : "Arc du veneur",
		niveau : 27,
		coutPA : 7,
		alignements : ["pisteur"],
		typeDegat : "perforant",
		poids : 14,
		portee : 5,
		prix : 580,
		categorie : "armeDistance"
	},
	fronde_nomade : {
		nom : "Fronde nomade",
		niveau : 28,
		coutPA : 7,
		alignements : ["barbare"],
		typeDegat : "contondant",
		poids : 11,
		portee : 2,
		prix : 340,
		categorie : "armeDistance"
	},
	arme_a_poudre_noire : {
		nom : "Arme à poudre noire",
		niveau : 28,
		coutPA : 7,
		alignements : ["assassin"],
		typeDegat : "perforant",
		poids : 12,
		portee : 3,
		prix : 500,
		categorie : "armeDistance"
	},
	arc_de_l_inconsole : {
		nom : "Arc de l'inconsolé",
		niveau : 28,
		coutPA : 7,
		alignements : ["barde"],
		typeDegat : "perforant",
		poids : 18,
		portee : 4,
		prix : 880,
		categorie : "armeDistance"
	},
	arbaliste : {
		nom : "Arbaliste",
		niveau : 29,
		coutPA : 8,
		alignements : ["troubadour"],
		typeDegat : "perforant",
		poids : 19,
		portee : 4,
		prix : 930,
		categorie : "armeDistance"
	},
	arc_du_vagabond : {
		nom : "Arc du vagabond",
		niveau : 29,
		coutPA : 7,
		alignements : ["brigand"],
		typeDegat : "psychique",
		poids : 15,
		portee : 4,
		prix : 820,
		categorie : "armeDistance"
	},
	arbalete_pernicieuse : {
		nom : "Arbalète pernicieuse",
		niveau : 26,
		coutPA : 7,
		alignements : ["prédateur"],
		typeDegat : "perforant",
		poids : 13,
		portee : 4,
		prix : 540,
		categorie : "armeDistance"
	},
	armure_de_cuir : {
		nom : "Armure de cuir",
		niveau : 4,
		coutPA : 0,
		alignements : ["combattant", "rodeur"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 80,
		categorie : "armure"
	},
	robe_de_mage : {
		nom : "Robe de mage",
		niveau : 5,
		coutPA : 0,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 50,
		categorie : "armure"
	},
	armure_legere : {
		nom : "Armure légère",
		niveau : 6,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 115,
		categorie : "armure"
	},
	robe_de_mage_renforcee : {
		nom : "Robe de mage renforcée",
		niveau : 9,
		coutPA : 0,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 95,
		categorie : "armure"
	},
	armure_lourde : {
		nom : "Armure lourde",
		niveau : 10,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 11,
		portee : 0,
		prix : 230,
		categorie : "armure"
	},
	armure_du_chevalier : {
		nom : "Armure du chevalier",
		niveau : 13,
		coutPA : 0,
		alignements : ["chevalier"],
		typeDegat : null,
		poids : 14,
		portee : 0,
		prix : 345,
		categorie : "armure"
	},
	haubert : {
		nom : "Haubert",
		niveau : 13,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 200,
		categorie : "armure"
	},
	cuirasse : {
		nom : "Cuirasse",
		niveau : 15,
		coutPA : 0,
		alignements : ["barde", "prédateur"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 225,
		categorie : "armure"
	},
	maillot_de_cuir_souple : {
		nom : "Maillot de cuir souple",
		niveau : 15,
		coutPA : 0,
		alignements : ["brigand"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 240,
		categorie : "armure"
	},
	cape_du_feu : {
		nom : "Cape du feu",
		niveau : 15,
		coutPA : 0,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 130,
		categorie : "armure"
	},
	cape_du_familier : {
		nom : "Cape du familier",
		niveau : 18,
		coutPA : 0,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 175,
		categorie : "armure"
	},
	mante_exosquelettique : {
		nom : "Mante exosquelettique",
		niveau : 20,
		coutPA : 0,
		alignements : ["magicien"],
		typeDegat : null,
		poids : 13,
		portee : 0,
		prix : 470,
		categorie : "armure"
	},
	pourpoint_ecarlate : {
		nom : "Pourpoint écarlate",
		niveau : 21,
		coutPA : 0,
		alignements : ["ménestrel"],
		typeDegat : null,
		poids : 19,
		portee : 0,
		prix : 820,
		categorie : "armure"
	},
	harnois_des_batailles : {
		nom : "Harnois des batailles",
		niveau : 22,
		coutPA : 0,
		alignements : ["garde impérial"],
		typeDegat : null,
		poids : 21,
		portee : 0,
		prix : 910,
		categorie : "armure"
	},
	chemise_de_mailles : {
		nom : "Chemise de mailles",
		niveau : 22,
		coutPA : 0,
		alignements : ["troubadour"],
		typeDegat : null,
		poids : 17,
		portee : 0,
		prix : 740,
		categorie : "armure"
	},
	toge_moiree : {
		nom : "Toge moirée",
		niveau : 22,
		coutPA : 0,
		alignements : ["illusionniste"],
		typeDegat : null,
		poids : 15,
		portee : 0,
		prix : 570,
		categorie : "armure"
	},
	armure_de_plates_sacree : {
		nom : "Armure de plates sacrée",
		niveau : 23,
		coutPA : 0,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 22,
		portee : 0,
		prix : 1000,
		categorie : "armure"
	},
	soutane_des_elements : {
		nom : "Soutane des éléments",
		niveau : 23,
		coutPA : 0,
		alignements : ["élémentaliste"],
		typeDegat : null,
		poids : 13,
		portee : 0,
		prix : 490,
		categorie : "armure"
	},
	armure_de_plaques_impie : {
		nom : "Armure de plaques impie",
		niveau : 24,
		coutPA : 0,
		alignements : ["chevalier noir"],
		typeDegat : null,
		poids : 20,
		portee : 0,
		prix : 900,
		categorie : "armure"
	},
	barde_equestre : {
		nom : "Barde équestre",
		niveau : 24,
		coutPA : 0,
		alignements : ["hussard"],
		typeDegat : null,
		poids : 19,
		portee : 0,
		prix : 850,
		categorie : "armure"
	},
	clibanion_de_combat : {
		nom : "Clibanion de combat",
		niveau : 25,
		coutPA : 0,
		alignements : ["fou de guerre"],
		typeDegat : null,
		poids : 18,
		portee : 0,
		prix : 770,
		categorie : "armure"
	},
	crevice_d_eclaireur : {
		nom : "Crevice d'éclaireur",
		niveau : 25,
		coutPA : 0,
		alignements : ["pisteur"],
		typeDegat : null,
		poids : 17,
		portee : 0,
		prix : 700,
		categorie : "armure"
	},
	broigne_annelee : {
		nom : "Broigne annelée",
		niveau : 26,
		coutPA : 0,
		alignements : ["berserk"],
		typeDegat : null,
		poids : 16,
		portee : 0,
		prix : 660,
		categorie : "armure"
	},
	brigandine_paysanne : {
		nom : "Brigandine paysanne",
		niveau : 26,
		coutPA : 0,
		alignements : ["hors la loi"],
		typeDegat : null,
		poids : 18,
		portee : 0,
		prix : 780,
		categorie : "armure"
	},
	tunique_de_spadassin : {
		nom : "Tunique de spadassin",
		niveau : 29,
		coutPA : 0,
		alignements : ["assassin"],
		typeDegat : null,
		poids : 15,
		portee : 0,
		prix : 600,
		categorie : "armure"
	},
	gants : {
		nom : "Gants",
		niveau : 1,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 25,
		categorie : "gants"
	},
	gants_du_serpent : {
		nom : "Gants du serpent",
		niveau : 8,
		coutPA : 0,
		alignements : ["rodeur"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 110,
		categorie : "gants"
	},
	gantelet_de_force : {
		nom : "Gantelet de force",
		niveau : 9,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 120,
		categorie : "gants"
	},
	gants_articules : {
		nom : "Gants articulés",
		niveau : 12,
		coutPA : 0,
		alignements : ["enchanteur", "invocateur"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 105,
		categorie : "gants"
	},
	gants_de_richesse : {
		nom : "Gants de richesse",
		niveau : 17,
		coutPA : 0,
		alignements : ["brigand", "prédateur"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 175,
		categorie : "gants"
	},
	gants_d_acier : {
		nom : "Gants d'acier",
		niveau : 18,
		coutPA : 0,
		alignements : ["chevalier"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 205,
		categorie : "gants"
	},
	gants_de_soie : {
		nom : "Gants de soie",
		niveau : 19,
		coutPA : 0,
		alignements : ["magicien"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 110,
		categorie : "gants"
	},
	gants_de_la_foi : {
		nom : "Gants de la foi",
		niveau : 19,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 160,
		categorie : "gants"
	},
	bracelets_d_os : {
		nom : "Bracelets d'os",
		niveau : 20,
		coutPA : 0,
		alignements : ["nécromant"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 350,
		categorie : "gants"
	},
	cubitieres_imperiales : {
		nom : "Cubitières impériales",
		niveau : 20,
		coutPA : 0,
		alignements : ["soldat"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 530,
		categorie : "gants"
	},
	gants_d_invocation : {
		nom : "Gants d'invocation",
		niveau : 21,
		coutPA : 0,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 355,
		categorie : "gants"
	},
	gantelets_d_armes : {
		nom : "Gantelets d'armes",
		niveau : 23,
		coutPA : 0,
		alignements : ["barbare"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 495,
		categorie : "gants"
	},
	gants_de_manipulation : {
		nom : "Gants de manipulation",
		niveau : 26,
		coutPA : 0,
		alignements : ["illusionniste"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 325,
		categorie : "gants"
	},
	bracelets_de_glace : {
		nom : "Bracelets de glace",
		niveau : 27,
		coutPA : 0,
		alignements : ["élémentaliste"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 210,
		categorie : "gants"
	},
	menottes_d_evasion : {
		nom : "Menottes d'évasion",
		niveau : 28,
		coutPA : 0,
		alignements : ["hors la loi"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 470,
		categorie : "gants"
	},
	gants_d_onction : {
		nom : "Gants d'onction",
		niveau : 29,
		coutPA : 0,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 595,
		categorie : "gants"
	},
	poignets_ornes : {
		nom : "Poignets ornés",
		niveau : 29,
		coutPA : 0,
		alignements : ["ménestrel"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 510,
		categorie : "gants"
	},
	mitaines_de_tir : {
		nom : "Mitaines de tir",
		niveau : 29,
		coutPA : 0,
		alignements : ["pisteur"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 535,
		categorie : "gants"
	},
	bottes_de_cuir : {
		nom : "Bottes de cuir",
		niveau : 2,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 20,
		categorie : "bottes"
	},
	bottes_du_vent : {
		nom : "Bottes du vent",
		niveau : 6,
		coutPA : 0,
		alignements : ["rodeur"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 70,
		categorie : "bottes"
	},
	bottes_de_fer : {
		nom : "Bottes de fer",
		niveau : 8,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 90,
		categorie : "bottes"
	},
	bottes_des_arcanes : {
		nom : "Bottes des arcanes",
		niveau : 11,
		coutPA : 0,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 90,
		categorie : "bottes"
	},
	bottes_du_silence : {
		nom : "Bottes du silence",
		niveau : 14,
		coutPA : 0,
		alignements : ["brigand"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 130,
		categorie : "bottes"
	},
	bottines_du_loup : {
		nom : "Bottines du loup",
		niveau : 16,
		coutPA : 0,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 115,
		categorie : "bottes"
	},
	bottes_de_vivacite : {
		nom : "Bottes de vivacité",
		niveau : 17,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 3.5,
		portee : 0,
		prix : 135,
		categorie : "bottes"
	},
	bottes_du_soldat : {
		nom : "Bottes du soldat",
		niveau : 18,
		coutPA : 0,
		alignements : ["soldat"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 190,
		categorie : "bottes"
	},
	bottes_de_legerete : {
		nom : "Bottes de légèreté",
		niveau : 18,
		coutPA : 0,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 145,
		categorie : "bottes"
	},
	jambieres_de_vif_argent : {
		nom : "Jambières de vif argent",
		niveau : 20,
		coutPA : 0,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 10,
		portee : 0,
		prix : 520,
		categorie : "bottes"
	},
	bottines_de_noirceur : {
		nom : "Bottines de noirceur",
		niveau : 21,
		coutPA : 0,
		alignements : ["chevalier noir"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 460,
		categorie : "bottes"
	},
	chausses_de_plomb : {
		nom : "Chausses de plomb",
		niveau : 21,
		coutPA : 0,
		alignements : ["fou de guerre"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 430,
		categorie : "bottes"
	},
	cuissards_blindes : {
		nom : "Cuissards blindés",
		niveau : 22,
		coutPA : 0,
		alignements : ["berserk"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 315,
		categorie : "bottes"
	},
	bottes_de_vennerie : {
		nom : "Bottes de vennerie",
		niveau : 22,
		coutPA : 0,
		alignements : ["prédateur"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 360,
		categorie : "bottes"
	},
	brodequins_de_la_cabale : {
		nom : "Brodequins de la cabale",
		niveau : 23,
		coutPA : 0,
		alignements : ["sorcier"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 165,
		categorie : "bottes"
	},
	cuissardes_de_poussiere : {
		nom : "Cuissardes de poussière",
		niveau : 24,
		coutPA : 0,
		alignements : ["hors la loi"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 410,
		categorie : "bottes"
	},
	sandales_mystiques : {
		nom : "Sandales mystiques",
		niveau : 24,
		coutPA : 0,
		alignements : ["mage de guerre"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 310,
		categorie : "bottes"
	},
	bottillons_de_pourpre : {
		nom : "Bottillons de pourpre",
		niveau : 25,
		coutPA : 0,
		alignements : ["ménestrel"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 510,
		categorie : "bottes"
	},
	mocassins_de_l_au_dela : {
		nom : "Mocassins de l'au-delà",
		niveau : 25,
		coutPA : 0,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 500,
		categorie : "bottes"
	},
	guetres_de_saltimbanque : {
		nom : "Guêtres de saltimbanque",
		niveau : 27,
		coutPA : 0,
		alignements : ["troubadour"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 455,
		categorie : "bottes"
	},
	genouilleres_du_condottiere : {
		nom : "Genouillères du condottière",
		niveau : 27,
		coutPA : 0,
		alignements : ["bandit"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 475,
		categorie : "bottes"
	},
	cothurnes_d_outre_tombe : {
		nom : "Cothurnes d'outre-tombe",
		niveau : 28,
		coutPA : 0,
		alignements : ["nécromant"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 325,
		categorie : "bottes"
	},
	solerets_martiaux : {
		nom : "Solerets martiaux",
		niveau : 29,
		coutPA : 0,
		alignements : ["garde impérial"],
		typeDegat : null,
		poids : 10,
		portee : 0,
		prix : 720,
		categorie : "bottes"
	},
	capuchon : {
		nom : "Capuchon",
		niveau : 0,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 10,
		categorie : "casque"
	},
	casque : {
		nom : "Casque",
		niveau : 3,
		coutPA : 0,
		alignements : ["combattant", "rodeur"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 40,
		categorie : "casque"
	},
	heaume : {
		nom : "Heaume",
		niveau : 7,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 85,
		categorie : "casque"
	},
	casque_en_cuir : {
		nom : "Casque en cuir",
		niveau : 11,
		coutPA : 0,
		alignements : ["brigand", "barde"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 100,
		categorie : "casque"
	},
	heaume_de_la_fierte : {
		nom : "Heaume de la fierté",
		niveau : 16,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 145,
		categorie : "casque"
	},
	masque_enchante : {
		nom : "Masque enchanté",
		niveau : 17,
		coutPA : 0,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 115,
		categorie : "casque"
	},
	casque_de_hotan : {
		nom : "Casque de Hotan",
		niveau : 18,
		coutPA : 0,
		alignements : ["prédateur"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 155,
		categorie : "casque"
	},
	calotte : {
		nom : "Calotte",
		niveau : 18,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 160,
		categorie : "casque"
	},
	bandeau_de_bure : {
		nom : "Bandeau de bure",
		niveau : 22,
		coutPA : 0,
		alignements : ["hors la loi"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 515,
		categorie : "casque"
	},
	masque_d_epouvantail : {
		nom : "Masque d'épouvantail",
		niveau : 24,
		coutPA : 0,
		alignements : ["bandit"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 500,
		categorie : "casque"
	},
	heaume_beni : {
		nom : "Heaume béni",
		niveau : 27,
		coutPA : 0,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 495,
		categorie : "casque"
	},
	camail_de_parade : {
		nom : "Camail de parade",
		niveau : 27,
		coutPA : 0,
		alignements : ["ménestrel"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 470,
		categorie : "casque"
	},
	heaume_de_tenebres : {
		nom : "Heaume de ténèbres",
		niveau : 28,
		coutPA : 0,
		alignements : ["chevalier noir"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 560,
		categorie : "casque"
	},
	armet_de_sentinelle : {
		nom : "Armet de sentinelle",
		niveau : 28,
		coutPA : 0,
		alignements : ["garde impérial"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 600,
		categorie : "casque"
	},
	capuche_d_effacement : {
		nom : "Capuche d'effacement",
		niveau : 28,
		coutPA : 0,
		alignements : ["illusionniste"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 475,
		categorie : "casque"
	},
	tiare_de_guerre : {
		nom : "Tiare de guerre",
		niveau : 28,
		coutPA : 0,
		alignements : ["mage de guerre"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 270,
		categorie : "casque"
	},
	bassinet_de_fer_froid : {
		nom : "Bassinet de fer froid",
		niveau : 29,
		coutPA : 0,
		alignements : ["fou de guerre"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 490,
		categorie : "casque"
	},
	diademe_du_lien : {
		nom : "Diadème du lien",
		niveau : 29,
		coutPA : 0,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 435,
		categorie : "casque"
	},
	petit_bouclier : {
		nom : "Petit bouclier",
		niveau : 3,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 30,
		categorie : "bouclier"
	},
	grand_bouclier : {
		nom : "Grand bouclier",
		niveau : 5,
		coutPA : 0,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 5,
		portee : 0,
		prix : 70,
		categorie : "bouclier"
	},
	haut_bouclier_du_levant : {
		nom : "Haut bouclier du levant",
		niveau : 11,
		coutPA : 0,
		alignements : ["soldat", "chevalier"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 145,
		categorie : "bouclier"
	},
	bouclier_de_la_bete : {
		nom : "Bouclier de la bête",
		niveau : 13,
		coutPA : 0,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 125,
		categorie : "bouclier"
	},
	ardent_de_defense : {
		nom : "Ardent de défense",
		niveau : 15,
		coutPA : 0,
		alignements : ["magicien"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 125,
		categorie : "bouclier"
	},
	haut_ecu : {
		nom : "Haut écu",
		niveau : 15,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 4,
		portee : 0,
		prix : 105,
		categorie : "bouclier"
	},
	bouclier_de_la_furie : {
		nom : "Bouclier de la furie",
		niveau : 19,
		coutPA : 0,
		alignements : ["barbare"],
		typeDegat : null,
		poids : 6,
		portee : 0,
		prix : 200,
		categorie : "bouclier"
	},
	bouclier_d_apocalypse : {
		nom : "Bouclier d'apocalypse",
		niveau : 20,
		coutPA : 0,
		alignements : ["chevalier noir"],
		typeDegat : null,
		poids : 11,
		portee : 0,
		prix : 670,
		categorie : "bouclier"
	},
	brassiere_armuree : {
		nom : "Brassière armurée",
		niveau : 20,
		coutPA : 0,
		alignements : ["prédateur"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 360,
		categorie : "bouclier"
	},
	egide_precieux : {
		nom : "Égide précieux",
		niveau : 20,
		coutPA : 0,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 275,
		categorie : "bouclier"
	},
	pavois_de_judas : {
		nom : "Pavois de Judas",
		niveau : 21,
		coutPA : 0,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 12,
		portee : 0,
		prix : 595,
		categorie : "bouclier"
	},
	targe_de_camouflage : {
		nom : "Targe de camouflage",
		niveau : 21,
		coutPA : 0,
		alignements : ["brigand"],
		typeDegat : null,
		poids : 10,
		portee : 0,
		prix : 350,
		categorie : "bouclier"
	},
	ecusson_armorie : {
		nom : "Écusson armorié",
		niveau : 23,
		coutPA : 0,
		alignements : ["barde"],
		typeDegat : null,
		poids : 10,
		portee : 0,
		prix : 470,
		categorie : "bouclier"
	},
	bouclier_du_demon : {
		nom : "Bouclier du démon",
		niveau : 23,
		coutPA : 0,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 9,
		portee : 0,
		prix : 395,
		categorie : "bouclier"
	},
	pavois_de_la_tortue : {
		nom : "Pavois de la tortue",
		niveau : 24,
		coutPA : 0,
		alignements : ["garde impérial"],
		typeDegat : null,
		poids : 12,
		portee : 0,
		prix : 650,
		categorie : "bouclier"
	},
	ecu_fantomatique : {
		nom : "Écu fantomatique",
		niveau : 24,
		coutPA : 0,
		alignements : ["nécromant"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 290,
		categorie : "bouclier"
	},
	epauliere_de_contrecoup : {
		nom : "Épaulière de contrecoup",
		niveau : 26,
		coutPA : 0,
		alignements : ["mage de guerre"],
		typeDegat : null,
		poids : 8,
		portee : 0,
		prix : 455,
		categorie : "bouclier"
	},
	ardent_de_sapience : {
		nom : "Ardent de sapience",
		niveau : 27,
		coutPA : 0,
		alignements : ["sorcier"],
		typeDegat : null,
		poids : 7,
		portee : 0,
		prix : 250,
		categorie : "bouclier"
	},
	rondache_de_cavalerie : {
		nom : "Rondache de cavalerie",
		niveau : 28,
		coutPA : 0,
		alignements : ["hussard"],
		typeDegat : null,
		poids : 11,
		portee : 0,
		prix : 620,
		categorie : "bouclier"
	},
	etincelle : {
		nom : "Étincelle",
		niveau : 2,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "élémentaire",
		poids : 1,
		portee : 1,
		prix : 20,
		categorie : "sort"
	},
	blessure_mentale : {
		nom : "Blessure mentale",
		niveau : 3,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "psychique",
		poids : 1,
		portee : 1,
		prix : 55,
		categorie : "sort"
	},
	projectile_magique : {
		nom : "Projectile magique",
		niveau : 4,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "élémentaire",
		poids : 1,
		portee : 2,
		prix : 70,
		categorie : "sort"
	},
	eclair : {
		nom : "Éclair",
		niveau : 7,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "élémentaire",
		poids : 1,
		portee : 3,
		prix : 105,
		categorie : "sort"
	},
	hurlement_interieur : {
		nom : "Hurlement intérieur",
		niveau : 7,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "psychique",
		poids : 1,
		portee : 1,
		prix : 90,
		categorie : "sort"
	},
	bris_de_glace : {
		nom : "Bris de glace",
		niveau : 8,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "élémentaire",
		poids : 1,
		portee : 1,
		prix : 140,
		categorie : "sort"
	},
	mur_de_feu : {
		nom : "Mur de feu",
		niveau : 9,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "élémentaire",
		poids : 1,
		portee : 1,
		prix : 180,
		categorie : "sort"
	},
	fleche_enchantee : {
		nom : "Flèche enchantée",
		niveau : 10,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 3,
		prix : 160,
		categorie : "sort"
	},
	brasier : {
		nom : "Brasier",
		niveau : 11,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 1,
		prix : 225,
		categorie : "sort"
	},
	pluie_de_l_enfer : {
		nom : "Pluie de l'enfer",
		niveau : 12,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 2,
		prix : 215,
		categorie : "sort"
	},
	decerebration : {
		nom : "Décérébration",
		niveau : 12,
		coutPA : 7,
		alignements : ["enchanteur", "invocateur"],
		typeDegat : "psychique",
		poids : 2,
		portee : 1,
		prix : 165,
		categorie : "sort"
	},
	perce_armure : {
		nom : "Perce-armure",
		niveau : 13,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "auto",
		poids : 1,
		portee : 1,
		prix : 105,
		categorie : "sort"
	},
	epee_vengeresse : {
		nom : "Épée vengeresse",
		niveau : 14,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 1,
		prix : 320,
		categorie : "sort"
	},
	armageddon : {
		nom : "Armageddon",
		niveau : 15,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 2,
		prix : 270,
		categorie : "sort"
	},
	vapeur_sanguinaire : {
		nom : "Vapeur sanguinaire",
		niveau : 16,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : "enchantement",
		poids : 3,
		portee : 3,
		prix : 265,
		categorie : "sort"
	},
	eblouissement_psychique : {
		nom : "Éblouissement psychique",
		niveau : 17,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "psychique",
		poids : 2,
		portee : 1,
		prix : 425,
		categorie : "sort"
	},
	fusion_des_elements : {
		nom : "Fusion des éléments",
		niveau : 18,
		coutPA : 7,
		alignements : ["magicien", "invocateur"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 1,
		prix : 370,
		categorie : "sort"
	},
	visage_de_glace : {
		nom : "Visage de glace",
		niveau : 19,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 1,
		prix : 340,
		categorie : "sort"
	},
	explosion_vivace : {
		nom : "Explosion vivace",
		niveau : 19,
		coutPA : 7,
		alignements : ["invocateur"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 2,
		prix : 325,
		categorie : "sort"
	},
	foudre : {
		nom : "Foudre",
		niveau : 20,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 3,
		prix : 310,
		categorie : "sort"
	},
	trepanation_neuronale : {
		nom : "Trépanation neuronale",
		niveau : 21,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "psychique",
		poids : 3,
		portee : 1,
		prix : 510,
		categorie : "sort"
	},
	fleche_acide : {
		nom : "Flèche acide",
		niveau : 21,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : "enchantement",
		poids : 3,
		portee : 3,
		prix : 395,
		categorie : "sort"
	},
	lame_elementaire : {
		nom : "Lame élémentaire",
		niveau : 22,
		coutPA : 7,
		alignements : ["sorcier"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 1,
		prix : 620,
		categorie : "sort"
	},
	boule_de_feu : {
		nom : "Boule de feu",
		niveau : 22,
		coutPA : 7,
		alignements : ["élémentaliste"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 3,
		prix : 430,
		categorie : "sort"
	},
	decharge_prismatique : {
		nom : "Décharge prismatique",
		niveau : 22,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 2,
		prix : 355,
		categorie : "sort"
	},
	linceul_de_flammes : {
		nom : "Linceul de flammes",
		niveau : 23,
		coutPA : 7,
		alignements : ["mage de guerre"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 1,
		prix : 555,
		categorie : "sort"
	},
	vampirisme_psychique : {
		nom : "Vampirisme psychique",
		niveau : 23,
		coutPA : 7,
		alignements : ["nécromant"],
		typeDegat : "psychique",
		poids : 3,
		portee : 1,
		prix : 475,
		categorie : "sort"
	},
	attaque_infaillible : {
		nom : "Attaque infaillible",
		niveau : 23,
		coutPA : 7,
		alignements : ["mage de guerre"],
		typeDegat : "inconnu",
		poids : 3,
		portee : 3,
		prix : 395,
		categorie : "sort"
	},
	sortilege_mysterieux : {
		nom : "Sortilège mystérieux",
		niveau : 23,
		coutPA : 7,
		alignements : ["illusionniste"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 3,
		prix : 360,
		categorie : "sort"
	},
	poigne_electrique : {
		nom : "Poigne électrique",
		niveau : 24,
		coutPA : 7,
		alignements : ["élémentaliste"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 1,
		prix : 440,
		categorie : "sort"
	},
	inversion_metabolique : {
		nom : "Inversion métabolique",
		niveau : 24,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 1,
		prix : 425,
		categorie : "sort"
	},
	nuee_de_parasites : {
		nom : "Nuée de parasites",
		niveau : 24,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : "élémentaire",
		poids : 2,
		portee : 3,
		prix : 350,
		categorie : "sort"
	},
	mot_de_pouvoir : {
		nom : "Mot de pouvoir",
		niveau : 24,
		coutPA : 7,
		alignements : ["sorcier"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 3,
		prix : 315,
		categorie : "sort"
	},
	ecrasement_synaptique : {
		nom : "Écrasement synaptique",
		niveau : 25,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "psychique",
		poids : 3,
		portee : 1,
		prix : 640,
		categorie : "sort"
	},
	blessures_illusoires : {
		nom : "Blessures illusoires",
		niveau : 25,
		coutPA : 7,
		alignements : ["illusionniste"],
		typeDegat : "psychique",
		poids : 1,
		portee : 1,
		prix : 415,
		categorie : "sort"
	},
	fleche_enflammee : {
		nom : "Flèche enflammée",
		niveau : 25,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : "enchantement",
		poids : 3,
		portee : 3,
		prix : 520,
		categorie : "sort"
	},
	foudroiement_psionique : {
		nom : "Foudroiement psionique",
		niveau : 25,
		coutPA : 7,
		alignements : ["nécromant"],
		typeDegat : "psychique",
		poids : 1,
		portee : 2,
		prix : 320,
		categorie : "sort"
	},
	tranchant_paraelementaire : {
		nom : "Tranchant paraélementaire",
		niveau : 26,
		coutPA : 7,
		alignements : ["sorcier"],
		typeDegat : "élémentaire",
		poids : 4,
		portee : 1,
		prix : 750,
		categorie : "sort"
	},
	pluie_de_meteores : {
		nom : "Pluie de météores",
		niveau : 26,
		coutPA : 7,
		alignements : ["élémentaliste"],
		typeDegat : "élémentaire",
		poids : 4,
		portee : 3,
		prix : 575,
		categorie : "sort"
	},
	deflagration_prismatique : {
		nom : "Déflagration prismatique",
		niveau : 26,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "enchantement",
		poids : 3,
		portee : 2,
		prix : 470,
		categorie : "sort"
	},
	tombeau_de_glace : {
		nom : "Tombeau de glace",
		niveau : 27,
		coutPA : 7,
		alignements : ["mage de guerre"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 1,
		prix : 710,
		categorie : "sort"
	},
	coupe_des_ames : {
		nom : "Coupe des âmes",
		niveau : 27,
		coutPA : 7,
		alignements : ["nécromant"],
		typeDegat : "psychique",
		poids : 3,
		portee : 1,
		prix : 620,
		categorie : "sort"
	},
	assaut_imparable : {
		nom : "Assaut imparable",
		niveau : 27,
		coutPA : 7,
		alignements : ["mage de guerre"],
		typeDegat : "inconnu",
		poids : 2,
		portee : 3,
		prix : 530,
		categorie : "sort"
	},
	arcane_inconnu : {
		nom : "Arcane inconnu",
		niveau : 27,
		coutPA : 7,
		alignements : ["illusionniste"],
		typeDegat : "enchantement",
		poids : 3,
		portee : 3,
		prix : 465,
		categorie : "sort"
	},
	toucher_glacial : {
		nom : "Toucher glacial",
		niveau : 28,
		coutPA : 7,
		alignements : ["élémentaliste"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 1,
		prix : 610,
		categorie : "sort"
	},
	aberration_physiologique : {
		nom : "Aberration physiologique",
		niveau : 28,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 1,
		prix : 530,
		categorie : "sort"
	},
	horde_rampante : {
		nom : "Horde rampante",
		niveau : 28,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : "élémentaire",
		poids : 3,
		portee : 3,
		prix : 460,
		categorie : "sort"
	},
	imprecation_energetique : {
		nom : "Imprécation énergétique",
		niveau : 28,
		coutPA : 7,
		alignements : ["sorcier"],
		typeDegat : "enchantement",
		poids : 2,
		portee : 3,
		prix : 410,
		categorie : "sort"
	},
	terrassement_nerveux : {
		nom : "Terrassement nerveux",
		niveau : 29,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : "psychique",
		poids : 4,
		portee : 1,
		prix : 820,
		categorie : "sort"
	},
	traqueur_fantomatique : {
		nom : "Traqueur fantomatique",
		niveau : 29,
		coutPA : 7,
		alignements : ["illusionniste"],
		typeDegat : "psychique",
		poids : 2,
		portee : 1,
		prix : 485,
		categorie : "sort"
	},
	fleche_de_glace : {
		nom : "Flèche de glace",
		niveau : 29,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : "enchantement",
		poids : 4,
		portee : 3,
		prix : 690,
		categorie : "sort"
	},
	necropuissance : {
		nom : "Nécropuissance",
		niveau : 29,
		coutPA : 7,
		alignements : ["nécromant"],
		typeDegat : "psychique",
		poids : 2,
		portee : 2,
		prix : 405,
		categorie : "sort"
	},
	invoquer_petit_familier : {
		nom : "Invoquer petit familier",
		niveau : 5,
		coutPA : NaN,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 100,
		categorie : "enchInvocation"
	},
	deplacement_familier : {
		nom : "Déplacement familier",
		niveau : 6,
		coutPA : NaN,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 45,
		categorie : "enchInvocation"
	},
	invoquer_familier_moyen : {
		nom : "Invoquer familier moyen",
		niveau : 10,
		coutPA : NaN,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 2,
		prix : 220,
		categorie : "enchInvocation"
	},
	resistance_accrue : {
		nom : "Résistance accrue",
		niveau : 12,
		coutPA : 4,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 105,
		categorie : "enchInvocation"
	},
	invoquer_grand_familier : {
		nom : "Invoquer grand familier",
		niveau : 15,
		coutPA : 16,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 3,
		portee : 3,
		prix : 350,
		categorie : "enchInvocation"
	},
	deplacement_familier_ameliore : {
		nom : "Déplacement familier amélioré",
		niveau : 17,
		coutPA : 16,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 95,
		categorie : "enchInvocation"
	},
	invoquer_tres_grand_familier : {
		nom : "Invoquer très grand familier",
		niveau : 20,
		coutPA : NaN,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 4,
		portee : 4,
		prix : 720,
		categorie : "enchInvocation"
	},
	entrave_animale : {
		nom : "Entrave animale",
		niveau : 22,
		coutPA : 7,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 450,
		categorie : "enchInvocation"
	},
	invoquer_familier_volant : {
		nom : "Invoquer familier volant",
		niveau : 23,
		coutPA : NaN,
		alignements : ["invocateur"],
		typeDegat : null,
		poids : 4,
		portee : 4,
		prix : 460,
		categorie : "enchInvocation"
	},
	invoquer_familier_gigantesque : {
		nom : "Invoquer familier gigantesque",
		niveau : 26,
		coutPA : NaN,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 5,
		portee : 4,
		prix : 950,
		categorie : "enchInvocation"
	},
	rupture_de_lien : {
		nom : "Rupture de lien",
		niveau : 28,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 2,
		portee : 3,
		prix : 725,
		categorie : "enchInvocation"
	},
	benediction_du_guerrier : {
		nom : "Bénédiction du guerrier",
		niveau : 5,
		coutPA : 7,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 55,
		categorie : "enchSoutien"
	},
	desenchantement_allie : {
		nom : "Désenchantement allié",
		niveau : 7,
		coutPA : 8,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 70,
		categorie : "enchSoutien"
	},
	benediction_du_guerrier_2 : {
		nom : "Bénédiction du guerrier 2",
		niveau : 10,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 95,
		categorie : "enchSoutien"
	},
	regeneration : {
		nom : "Régénération",
		niveau : 10,
		coutPA : 3,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 100,
		categorie : "enchSoutien"
	},
	resistance_sacree : {
		nom : "Résistance sacrée",
		niveau : 12,
		coutPA : 4,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 120,
		categorie : "enchSoutien"
	},
	desenchantement_allie_ameliore : {
		nom : "Désenchantement allié amélioré",
		niveau : 14,
		coutPA : 8,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 150,
		categorie : "enchSoutien"
	},
	furtivite : {
		nom : "Furtivité",
		niveau : 16,
		coutPA : 2,
		alignements : ["rodeur"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 150,
		categorie : "enchSoutien"
	},
	armure_nautique : {
		nom : "Armure nautique",
		niveau : 16,
		coutPA : 6,
		alignements : ["combattant"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 150,
		categorie : "enchSoutien"
	},
	regeneration_amelioree : {
		nom : "Régénération améliorée",
		niveau : 19,
		coutPA : 3,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 165,
		categorie : "enchSoutien"
	},
	dexterite_feline : {
		nom : "Dextérité féline",
		niveau : 21,
		coutPA : 9,
		alignements : ["enchanteur", "invocateur"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 175,
		categorie : "enchSoutien"
	},
	developpement_cerebral : {
		nom : "Développement cérébral",
		niveau : 24,
		coutPA : 6,
		alignements : ["illusionniste"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 260,
		categorie : "enchSoutien"
	},
	surpuissance : {
		nom : "Surpuissance",
		niveau : 27,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 2,
		prix : 325,
		categorie : "enchSoutien"
	},
	teleportation : {
		nom : "Téléportation",
		niveau : 28,
		coutPA : 72,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 850,
		categorie : "enchSoutien"
	},
	desenchantement_ennemi : {
		nom : "Désenchantement ennemi",
		niveau : 9,
		coutPA : 8,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 2,
		prix : 110,
		categorie : "enchOffensif"
	},
	entrave_psychique : {
		nom : "Entrave psychique",
		niveau : 11,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 140,
		categorie : "enchOffensif"
	},
	faiblesse : {
		nom : "Faiblesse",
		niveau : 16,
		coutPA : 7,
		alignements : ["magicien", "enchanteur"],
		typeDegat : null,
		poids : 2,
		portee : 2,
		prix : 190,
		categorie : "enchOffensif"
	},
	entrave_psychique_2 : {
		nom : "Entrave psychique 2",
		niveau : 17,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 2,
		prix : 255,
		categorie : "enchOffensif"
	},
	deplacement_familier_ennemi : {
		nom : "Déplacement familier ennemi",
		niveau : 19,
		coutPA : 4,
		alignements : ["barbare", "prédateur", "magicien"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 190,
		categorie : "enchOffensif"
	},
	idiotie : {
		nom : "Idiotie",
		niveau : 20,
		coutPA : 7,
		alignements : ["apprenti"],
		typeDegat : null,
		poids : 2,
		portee : 3,
		prix : 510,
		categorie : "enchOffensif"
	},
	epuisement : {
		nom : "Épuisement",
		niveau : 21,
		coutPA : 7,
		alignements : ["magicien", "enchanteur"],
		typeDegat : null,
		poids : 2,
		portee : 3,
		prix : 555,
		categorie : "enchOffensif"
	},
	maladresse : {
		nom : "Maladresse",
		niveau : 22,
		coutPA : 7,
		alignements : ["invocateur", "illusionniste"],
		typeDegat : null,
		poids : 2,
		portee : 3,
		prix : 405,
		categorie : "enchOffensif"
	},
	poison : {
		nom : "Poison",
		niveau : 24,
		coutPA : 7,
		alignements : ["magicien", "nécromant"],
		typeDegat : null,
		poids : 2,
		portee : 3,
		prix : 315,
		categorie : "enchOffensif"
	},
	vision_reduite : {
		nom : "Vision réduite",
		niveau : 26,
		coutPA : 7,
		alignements : ["magicien"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 775,
		categorie : "enchOffensif"
	},
	stoicisme : {
		nom : "Stoïcisme",
		niveau : 29,
		coutPA : 3,
		alignements : ["mage de guerre", "illusionniste", "conjurateur"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 600,
		categorie : "enchOffensif"
	},
	alteration_vers_tranchant : {
		nom : "Altération vers tranchant",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	alteration_vers_perforant : {
		nom : "Altération vers perforant",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	alteration_vers_contondant : {
		nom : "Altération vers contondant",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	alteration_vers_elementaire : {
		nom : "Altération vers élémentaire",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	alteration_vers_psychisme : {
		nom : "Altération vers psychisme",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	alteration_vers_enchantement : {
		nom : "Altération vers enchantement",
		niveau : 20,
		coutPA : 7,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 3,
		prix : 330,
		categorie : "enchAlteration"
	},
	clone : {
		nom : "Clone",
		niveau : 20,
		coutPA : 4,
		alignements : ["illusionniste"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 510,
		categorie : "enchClasse"
	},
	camouflage : {
		nom : "Camouflage",
		niveau : 21,
		coutPA : 3,
		alignements : ["hors la loi"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 575,
		categorie : "enchClasse"
	},
	oeil_de_lynx : {
		nom : "Oeil de lynx",
		niveau : 21,
		coutPA : 1,
		alignements : ["pisteur"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 375,
		categorie : "enchClasse"
	},
	regression_animale : {
		nom : "Régression animale",
		niveau : 21,
		coutPA : 15,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 350,
		categorie : "enchClasse"
	},
	aura : {
		nom : "Aura",
		niveau : 22,
		coutPA : 4,
		alignements : ["paladin"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 525,
		categorie : "enchClasse"
	},
	teleportation_de_spectateur : {
		nom : "Téléportation de spectateur",
		niveau : 22,
		coutPA : 3,
		alignements : ["mage de guerre"],
		typeDegat : null,
		poids : 1,
		portee : 5,
		prix : 325,
		categorie : "enchClasse"
	},
	arme_salvatrice : {
		nom : "Arme salvatrice",
		niveau : 23,
		coutPA : 8,
		alignements : ["chevalier noir"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 475,
		categorie : "enchClasse"
	},
	musique_du_menestrel : {
		nom : "Musique du ménestrel",
		niveau : 23,
		coutPA : 3,
		alignements : ["ménestrel"],
		typeDegat : null,
		poids : 1,
		portee : 4,
		prix : 375,
		categorie : "enchClasse"
	},
	symbiose_elementaire : {
		nom : "Symbiose élémentaire",
		niveau : 23,
		coutPA : 3,
		alignements : ["élémentaliste"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 475,
		categorie : "enchClasse"
	},
	curiosite_animale : {
		nom : "Curiosité animale",
		niveau : 23,
		coutPA : 2,
		alignements : ["mage de guerre"],
		typeDegat : null,
		poids : 1,
		portee : 5,
		prix : 200,
		categorie : "enchClasse"
	},
	garde_du_corps : {
		nom : "Garde du corps",
		niveau : 24,
		coutPA : 4,
		alignements : ["garde impérial"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 500,
		categorie : "enchClasse"
	},
	estimation_de_bourse : {
		nom : "Estimation de bourse",
		niveau : 24,
		coutPA : 3,
		alignements : ["bandit"],
		typeDegat : null,
		poids : 1,
		portee : 5,
		prix : 490,
		categorie : "enchClasse"
	},
	squelette : {
		nom : "Squelette",
		niveau : 24,
		coutPA : 9,
		alignements : ["nécromant"],
		typeDegat : null,
		poids : 3,
		portee : 0,
		prix : 630,
		categorie : "enchClasse"
	},
	alteration_vers_familier : {
		nom : "Altération vers familier",
		niveau : 24,
		coutPA : 6,
		alignements : ["conjurateur"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 525,
		categorie : "enchClasse"
	},
	monture_epique : {
		nom : "Monture épique",
		niveau : 25,
		coutPA : 4,
		alignements : ["hussard"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 455,
		categorie : "enchClasse"
	},
	coup_sournois : {
		nom : "Coup sournois",
		niveau : 25,
		coutPA : 5,
		alignements : ["assassin"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 500,
		categorie : "enchClasse"
	},
	quintessence_des_sorts : {
		nom : "Quintessence des sorts",
		niveau : 25,
		coutPA : 3,
		alignements : ["sorcier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 300,
		categorie : "enchClasse"
	},
	transmission : {
		nom : "Transmission",
		niveau : 25,
		coutPA : 4,
		alignements : ["enchanteur"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 300,
		categorie : "enchClasse"
	},
	rage : {
		nom : "Rage",
		niveau : 26,
		coutPA : 4,
		alignements : ["fou de guerre"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 450,
		categorie : "enchClasse"
	},
	conversion_vitale : {
		nom : "Conversion vitale",
		niveau : 26,
		coutPA : 0,
		alignements : ["troubadour"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 600,
		categorie : "enchClasse"
	},
	furie : {
		nom : "Furie",
		niveau : 27,
		coutPA : 4,
		alignements : ["berserk"],
		typeDegat : null,
		poids : 2,
		portee : 0,
		prix : 525,
		categorie : "enchClasse"
	},
	paireDeRaquettes: {
		nom : "Paire de raquettes",
		niveau : 0,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 0.5,
		portee : 0,
		prix : 15,
		categorie : "divers"
	},
	pioche : {
		nom : "Pioche",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 2,
		portee : 1,
		prix : 5,
		categorie : "métier"
	},
	lyre : {
		nom : "Lyre",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1.5,
		portee : 0,
		prix : 15,
		categorie : "métier"
	},
	canneAPeche : {
		nom : "Canne à pêche",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1.5,
		portee : 1,
		prix : 10,
		categorie : "métier"
	},
	outilsDeSapeur : {
		nom : "Outils de sapeur",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 1,
		prix : 22,
		categorie : "métier"
	},
	capeDuNegociant : {
		nom : "Cape du négociant",
		niveau : 7,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegats : null,
		poids : 3,
		portee : 0,
		prix : 275,
		categorie : "métier"
	},
	capeDeMaitreMarchand : {
		nom : "Cape de maître marchand",
		niveau : 14,
		coutPA : 0,
		alignements : ["aventurier"],
		typeDegats : null,
		poids : 12,
		portee : 0,
		prix : 1000,
		categorie : "métier"
	},
	potionDeResistanceAuxEnchantements : {
		nom : "Potion de résistance aux enchantements",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 15,
		categorie : "divers"
	},
	grandePotionDeSoin : {
		nom : "Grande potion de soin",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 30,
		categorie : "divers"
	},
	grandePotionDeSoin : {
		nom : "Grande potion de soin",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 30,
		categorie : "divers"
	},
	parcheminDAmunira : {
		nom : "Parchemin d'Amunira",
		niveau : 0,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 1,
		portee : 0,
		prix : 100,
		categorie : "quête"
	},
	carteMagiqueDeStrategie : {
		nom : "Carte magique de stratégie",
		niveau : 12,
		coutPA : 1,
		alignements : ["aventurier"],
		typeDegat : null,
		poids : 0.5,
		portee : 0,
		prix : 0, // ??????
		categorie : "divers"
	}
};

VuePartagee = {

	// conteneur des cases de la vue
	CouvertureVue : [],
	// Region de la vue
	Region : "",
	
	AnalyserCouvertureVue : function()
	{
		// si il n'y a pas de map, on est probablement mort ou en passage de niveau
		if(document.getElementById("map")) {
		
			// pour chaque element <a> dans le div map
			for(var n = 0, oLien; oLien = document.getElementById("map").getElementsByTagName("a")[n]; n++) {
				// la case est visible par defaut
				var sVisible = 1;
				// on verifie que c'est bien une balise <a> de la carte (classe "cl")
				if (oLien.className == "cl") {
					// pour chaque element <img> dans ce <a>
					// Attention, ne marche peut-être pas dans le dédale ou le cloaque quand des cases sont noires
					for(var m = 0, oImage; oImage = oLien.getElementsByTagName("img")[m]; m++)
					{
						// si la source d'une des images est img/n/o.png ou img/t/1.gif la case est non visible
						if (/img\/n\/o\.png/.test(oImage.src) || /img\/t\/1\.gif/.test(oImage.src)) {
							sVisible = 0;
						}
					}
					// on recupere le contenu de l'infobulle et on extrait le x et le y
					var sMouseOver = oLien.getAttribute("onmouseover").match(/return overlib\('(.+?)',/)[1];			
					var aRegExp = /<b>(\d+) \/ (\d+)(.*)/.exec(sMouseOver);
					var sX = aRegExp[1];
					var sY = aRegExp[2];
					// objet case
					var oCase = {
						x : sX,
						y : sY,
						visible : sVisible
					};
					// on ajoute la case a couverturevue
					VuePartagee.CouvertureVue.push(oCase);
				}
			}
			
		} else {
			// pas de mise à jour
			VuePartagee.PartagerMaVue = false;
		}
	},
	
	RegionRomine : function()
	{
		if(document.getElementById("map")) {
			var Region = { surface: 0, dedale: 1, cloaque: 2 };
			return Region[EpicFriend.MaProfondeur()];
		} else {
			return 0;
		}
	},
	
	DistanceVue : function()
	{
		if(document.getElementById("map")) {
			var sXmin = dom.tag(dom.get(document, "table", {class:"EW_Table"}, 1), "td", 1).textContent;
			var iDistance = (EpicFriend.MaLoc()[0] - sXmin);
			if (iDistance < 0)
				if (VuePartagee.RegionRomine() == 0) {
					iDistance = 140 + iDistance;
				} else if (VuePartagee.RegionRomine() == -1) {
					iDistance = 60 + iDistance;
				}
			return iDistance;
		} else {
			return 0;
		}
	},

	MettreAJourCarte : function()
	{
		var oSpanState = document.getElementById("statutcarte");
		oSpanState.style.color = "orange";
		oSpanState.setAttribute("title", "Mise à jour : En cours");
		
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://roux.lescigales.org/maj.php",
			data: "pseudo="+document.getElementsByName("pseudo")[0].value
				+"&password="+encodeURIComponent(document.getElementsByName("password")[0].value)
				+"&uni="+document.getElementsByName("uni")[0].value
				+"&region="+VuePartagee.RegionRomine()
				+"&distancevue="+VuePartagee.DistanceVue()
				+"&jsonjoueurs="+JSON.stringify(EpicFriend.Joueurs)
				+"&jsoncouverturevue="+JSON.stringify(VuePartagee.CouvertureVue)
				+"&zoom=4"
				+"&version="+EpicFriend.Version,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) { 
				oSpanState.style.color = "green";
				oSpanState.setAttribute("title", "Mise à jour : OK");
			},
			onerror: function() {
				oSpanState.style.color = "red";
				oSpanState.setAttribute("title", "Mise à jour : Erreur");
			}
		});
	},
	
	AfficherCarte : function(e)
	{
		e.preventDefault();
			
		var sData = "";
		var oSpanState = document.getElementById("statutcarte");
		oSpanState.style.color = "orange";
		
		// Si l'utilisateur veut partager sa vue, on inclut les données de partage
		if (VuePartagee.PartagerMaVue) {
			// Etat mise à jour
			oSpanState.setAttribute("title", "Ouverture Carte & Mise à Jour : En cours");
			// Données de mise à jour
			sData = "&jsonjoueurs="+JSON.stringify(EpicFriend.Joueurs)
				+"&jsoncouverturevue="+JSON.stringify(VuePartagee.CouvertureVue);
		} else {
			// Etat ouverture
			oSpanState.setAttribute("title", "Ouverture Carte : En cours");
		}
		
		// Construction de la chaine de données
		sData = "zoom=4"
			+"&version="+EpicFriend.Version
			+"&pseudo="+document.getElementsByName("pseudo")[0].value
			+"&password="+encodeURIComponent(document.getElementsByName("password")[0].value)
			+"&uni="+document.getElementsByName("uni")[0].value
			+"&region="+VuePartagee.RegionRomine()
			+"&distancevue="+VuePartagee.DistanceVue()
			+sData;
		
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://roux.lescigales.org/vp.php",
			data: sData,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			onload: function(response) {
				// Etat mise à jour
				oSpanState.style.color = "green";
				if (VuePartagee.PartagerMaVue) {
					oSpanState.setAttribute("title", "Ouverture Carte & Mise à Jour : OK");
				} else {
					oSpanState.setAttribute("title", "Ouverture Carte : OK");
				}
			
				// référence à l'objet document de la frame "f2" (grande frame de droite)
				var oDocF2 = window.top.frames[2].document;
				var bReload = false;
				if (oDocF2.getElementById("changezoom"))
					bReload = true;
				
				// on ouvre le document, on écrit la réponse AJAX et on ferme
				//oDocF2.open();
				//oDocF2.write(response.responseText);
				//oDocF2.close();
			    oDocF2.location.href = "data:text/html;charset=utf-8," + encodeURIComponent(response.responseText); 

				if (bReload) {
					oDocF2.location.reload();
				}
			},
			onerror: function() {
				// Etat mise à jour
				oSpanState.style.color = "red";
				if (VuePartagee.PartagerMaVue) {
					oSpanState.setAttribute("title", "Ouverture Carte & Mise à Jour : Erreur, pas de réponse du serveur");
				} else {
					oSpanState.setAttribute("title", "Ouverture Carte : Erreur, pas de réponse du serveur");
				}
			}
		});
	},
	
	Load : function()
	{
		if(utils.defined(EpicFriend.Preferences.VuePartagee.Activer))
			VuePartagee.PartagerMaVue = EpicFriend.Preferences.VuePartagee.Activer;
		
		// si on est bien dans la frame de la carte 
		if(location.href.indexOf("frame_map.php") > -1) {
			
			// Si la préférence  est définie dans EpicFriend
			if(utils.defined(EpicFriend.Preferences.VuePartagee) && utils.defined(EpicFriend.Preferences.VuePartagee.Activer)) {
				VuePartagee.PartagerMaVue = EpicFriend.Preferences.VuePartagee.Activer;
			}
			
			// on analyse la carte
			VuePartagee.AnalyserCouvertureVue();	
			
			// Définit du lien pour afficher la carte
			var oLien = dom.el("a",
				{
					"class" : "EW_LinkLight",
					href : "#",
					title : "Vue partagée : Affichage de la carte",
					id : "liencarte",
					text: "Carte"
				},
				{ fontSize: "10px" });
			oLien.addEventListener('click', VuePartagee.AfficherCarte, true);
			
			// Définition du lien pour afficher la carte
			var oSpanState = dom.el("span",
				{
					id: "statutcarte",
					html: " &bull; ",
					title : "Mise à jour : " + (VuePartagee.PartagerMaVue ? "Aucune donnée envoyée" : "Désactivée")
				},
				{
					fontWeight: "bolder",
					color: VuePartagee.PartagerMaVue ? "#DABA4C" : "grey"
				});
			
			// Insertion du lien et du séparateur
			dom.add(dom.id("epicfriend_commandes_joueur"),
				[
					dom.txt(" "),
					oLien
				]);
			dom.add(dom.id("liencarte"), oSpanState);

			// mise à jour automatique
			if (VuePartagee.PartagerMaVue) {
				//on envoie la mise à jour
				VuePartagee.MettreAJourCarte();
			}
		}
	}
};


Epicfriend = EpicFriend;  //Pour neutraliser les erreurs de frappe stupides...
EpicFriend.Load();
VuePartagee.Load();

//.user.js
