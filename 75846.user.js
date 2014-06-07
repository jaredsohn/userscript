// ==UserScript==
// @name           AntiGam_lang_fr
// @namespace      antikiller
// @description    Traduction d'antigame - Français (doit être lancé avant AntiGame)
// @version	1.22.4
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsFR =
	{
		lbl_missAttack: 'Attaquer',
		lbl_missColony: 'Coloniser',
		lbl_missDeploy: 'Déployer',
		lbl_missDestroy: 'Détruire une lune',
		lbl_missEspionage: 'Espionner',
		lbl_missExpedition: 'Expédition',
		lbl_missFederation: 'Attaque ACS',
		lbl_missHarvest: 'Recycler',
		lbl_missHold: 'Défendre ACS',
		lbl_missTransport: 'Transporter',
		
		lbl_shipSCargo: 'Petit transporteur',
		lbl_shipLCargo: 'Grand transporteur',
		lbl_shipLFighter: 'Chasseur léger',
		lbl_shipHFighter: 'Chasseur lourd',
		lbl_shipCruiser: 'Croiseur',
		lbl_shipBattleship: 'Vaisseau de bataille',
		lbl_shipColonizator: 'Vaisseau de colonisation',
		lbl_shipRecycler: 'Recycleur',
		lbl_shipSpy: 'Sonde d`espionnage',
		lbl_shipBomber: 'Bombardier',
		lbl_shipDestroyer: 'Destructeur',
		lbl_shipRIP: 'Étoile de la mort',
		lbl_shipBCruiser: 'Traqueur', 
		lbl_shipSatellite: 'Satellite solaire',
		
		lbl_RequiredEnergy: 'Énergie nécessaire'
		
	}
	
	AntiGame_lang.InterfaceFR =
	{
		opt_languageName: 'Français',

		opt_title: 'Options AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuler',
		opt_btnDefault: 'Par défaut',

		opt_language: 'Langue',
		opt_update_check: 'Vérification automatique des mises à jour',
		opt_thousandSeparator: 'Séparateur pour les milliers',
		opt_blockAutoComplete: 'Bloquer l\'auto-complétion dans firefox',
		
		opt_showDeficient: 'Afficher les ressources manquantes',
		opt_showResources: 'Afficher les informations de ressources avancées',
		opt_showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
		opt_nameColorOn: 'Couleur du nom: disponible',
		opt_nameColorOff: 'Couleur du nom: indisponible',
		opt_nameColorDisabled: 'Couleur du nom: pas assez de ressources',
		opt_showConstructionTitle: 'Afficher les titres des constructions dans la liste des planètes',
		opt_shortHeader: 'Toujours minimiser l\'image de la planète',

		opt_uni_SpeedFactor: 'Facteur de vitesse pour cet univers',
		
		opt_timeSetting: 'Changer les valeurs de temps (les heures seulement)',
		opt_showServerOgameClock: 'Garder l\'heure du serveur pour l\'horloge en haut à droite',
		opt_showServerPhalanx: 'Garder l\'heure du serveur pour la vue Phalange',
		opt_showPageStartTime: 'Afficher l\'heure du dernier rafraichissement de la page',
		opt_timeAMPM: 'Utiliser le format 12H (AM/PM) à la place de 24H',
		
		opt_timeDontChange: 'Ne pas changer l\'heure',
		opt_timeLocal: 'Toujours régler à l\'heure locale',
		opt_timeServer: 'Toujours régler à l\'heure serveur',

		opt_killTips: 'Désactiver les info-bulles',

		opt_showEventList: 'Afficher la liste des évènements dans la vue générale',
		opt_evt_showOnTop: 'Position de la liste des évènements sur l\'écran',
		opt_evt_showReduced: 'Liste d\'événements réduite',
		opt_evt_TimeMode: 'Horloge/Décompte par défaut dans la liste d\'événements réduite',
		opt_evt_noScroll: 'Pas de scrollbar lorsque les info-bulles sont affichées',
		opt_phalanx_showDebris: 'Affichage du CDR théorique dans la vue Phalange',
		
		opt_galaxyShowRank: 'Afficher le rang des joueurs/alliances dans la vue Galaxie',
		opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
		opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
		opt_galaxyDebrisColor: 'Couleur des débris surlignés',
		opt_galaxyHideMoon: 'Cacher l\'image de la lune (afficher sa taille à la place)',
		opt_galaxy_Players: 'Surligner les joueurs suivants',
		opt_galaxy_PlayerColors: 'Couleur des joueurs surlignés',
		opt_galaxy_Allys: 'Surligner les alliances suivantes',
		opt_galaxy_AllyColors: 'Couleur des alliances surlignées',
		opt_galaxy_keepTipsPlanets: 'Garder les infos-bulles pour les lunes et planètes',
		opt_galaxy_keepTipsDebris: 'Garder les infos-bulles pour les champs de débris',
		
		opt_msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
		opt_msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
		opt_msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
		opt_msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
		opt_msg_addButtons: 'Ajouter des boutons pour les messages',
		opt_msg_fixColors: 'Fixer la couleur des rapports de combat', 
		
		opt_fleet_showCapacity: 'Afficher la vitesse et la capacité des flottes',
		opt_fleet1_showResCalc: 'Afficher le calculateur de ressources',
		opt_uni_maxPlayerScore: 'Le joueur le plus fort à plus de 5M de points',
		opt_autocopyCoords: 'Copier automatiquement les coordonnées',
		opt_fleet2_setTargetDF: 'Sélectionner automatiquement le champ de débris si la flotte inclus un recycleur',
		opt_fleet2_fixLayout: 'Corriger les informations d\'agencement',
		opt_fleet2_ShortLinks: 'Raccourcis de cibles',
		opt_fleet2_MoonColor: 'Couleur des lunes dans la liste de raccourcis',
		opt_fleet2_MoonsToEnd: 'Déplacer les lunes à la fin de la liste de raccourcis',
		opt_fleet2_checkProbeCapacity: 'Vérifier la capacité des sondes avant le départ     (page 2)',	
		
		opt_missionPriority: 'Priorité de la mission',
		
		opt_mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
		opt_mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
		
		opt_missAttack: 'Couleur de mission: Attaquer',  
		opt_missColony: 'Couleur de mission: Coloniser',  
		opt_missDeploy: 'Couleur de mission: Déployer', 
		opt_missDestroy: 'Couleur de mission: Détruire',  
		opt_missEspionage: 'Couleur de mission: Espionner',   
		opt_missExpedition: 'Couleur de mission: Expédition', 
		opt_missFederation: 'Couleur de mission: Fédération',  
		opt_missHarvest: 'Couleur de mission: Recycler', 
		opt_missHold: 'Couleur de mission: Soutenir',   
		opt_missTransport: 'Couleur de mission: Transporter',
        opt_msg_addSimButton: 'Ajouter un bouton pour envoyer le rapport d\'espionnage sur WebSim',
		
		lbl_missAttack: 'Attaquer',  
		lbl_missColony: 'Coloniser',  
		lbl_missDeploy: 'Stationner',  
		lbl_missDestroy: 'Détruire',  	
		lbl_missEspionage: 'Espionner',  
		lbl_missExpedition: 'Expédition',  
		lbl_missFederation: 'Attaque groupée',  
		lbl_missHarvest: 'Recycler champ de débris',  
		lbl_missHold: 'Stationner chez cet allié',  
		lbl_missTransport: 'Transporter',

		lbl_sectionGeneral: 'Général',
		lbl_sectionTime: 'Paramètres de Temps',
		lbl_sectionEventList: 'Événements',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Envoi de flottes',
		lbl_sectionFleetMovement: ' Mouvements de flotte',
		
		lbl_optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers',

		lbl_resetCoords: 'Réinitialiser  - ',

		lbl_TotalCapacity: 'Capacité totale',
		lbl_MinSpeed: 'Vitesse minimale',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Ressources',
		lbl_debris: 'Débris',
		lbl_total: 'Total',
		lbl_loot: 'Butin',
		lbl_metal: 'Métal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'PT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',

		lbl_deficientRes: 'Ressources manquantes',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrivée (ACS)',
		
		lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
		lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',

		lbl_Moon: 'Lune',
		
		lbl_onTop: 'Au dessus',
		lbl_onBottom: 'En dessous',
		lbl_onLeft: 'A gauche',

		lbl_installNewVersion: 'Cliquez ici pour installer la nouvelle version',
		lbl_Save: 'Sauver',
		lbl_Clear: 'Effacer',
		lbl_Quantity: 'Quantité',
		lbl_Duration: 'Durée',
		lbl_Consumption: 'Consommation',
		
		lbl_tmTime: 'Horloge',
		lbl_tmCountdown: 'Décompte'
	}
	
	// -------------------------------
	// Don't modify the code below

	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()