// ==UserScript==
// @name           AntiGame_lang_fr_complet
// @namespace      gerem2
// @description    Traduction d'antigame plus complète - Français (doit être lancé avant AntiGame)
// @version	1.16.1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsFR =
	{
		lbl_missAttack: 'Attaquer',
		lbl_missColony: 'Coloniser',
		lbl_missDeploy: 'Stationner',
		lbl_missDestroy: 'Destruction de lune',
		lbl_missEspionage: 'Espionnage',
		lbl_missExpedition: 'Expédition',
		lbl_missFederation: 'Attaque groupé',
		lbl_missHarvest: 'Recycler',
		lbl_missHold: 'Stationner chez un allier',
		lbl_missTransport: 'Transporter',
		
		lbl_shipSCargo: 'Transporteur léger',
		lbl_shipLCargo: 'Transporteur lourd',
		lbl_shipLFighter: 'Chasseur léger',
		lbl_shipHFighter: 'Chasseur lourd',
		lbl_shipCruiser: 'Croiseur',
		lbl_shipBattleship: 'Vaisseau de bataille',
		lbl_shipColonizator: 'Vaisseau de colonisation',
		lbl_shipRecycler: 'Recycleur',
		lbl_shipSpy: 'Sonde d\'espionnage',
		lbl_shipBomber: 'Bombardier',
		lbl_shipDestroyer: 'Destructeur',
		lbl_shipRIP: 'Étoile de la mort',
		lbl_shipBCruiser: 'Traqueur',
		lbl_shipSatellite: 'Satellite solaire',
		
		lbl_defRLauncher: 'Lanceur de missiles',
		lbl_defLLaser: 'Artillerie laser légère',
		lbl_defHLaser: 'Artillerie laser lourde',
		lbl_defGauss: 'Canon de Gauss',
		lbl_defIon: 'Artillerie à ions',
		lbl_defPlasma: 'Lanceur de plasma',
		lbl_defSShield: 'Petit bouclier',
		lbl_defLShield: 'Grand bouclier',
		
		lbl_RequiredEnergy: 'Énergie requise',
		
	}
	
	AntiGame_lang.InterfaceFR =
	{
		opt_languageName: 'Français',
	
		opt_title: 'Options AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Annuler',
		opt_btnDefault: 'Par défaut',

		opt_language: 'Language',
		opt_update_check: 'Auto-vérification des mises à jour',
		opt_thousandSeparator: 'Séparateur des milliers',
		opt_blockAutoComplete: 'Bloquer remplissage automatique dans Firefox',
		
		opt_showDeficient: 'Afficher les ressources manquantes',
		opt_showResources: 'Afficher les informations de ressources avancées',
		opt_showNames: 'Afficher les noms des vaisseaux/constructions/recherches sur les images',
		opt_nameColorOn: 'Couleur du nom: disponible',
		opt_nameColorOff: 'Couleur du nom: indisponible',
		opt_nameColorDisabled: 'Couleur du nom: pas assez de ressources',
		opt_showConstructionTitle: 'Afficher les titres des constructions dans la liste des planètes',
		opt_shortHeader: 'Toujours minimiser les images des planètes',

		opt_uni_SpeedFactor: 'Facteur de vitesse pour cet univers',
		opt_uni_DFPercent: 'Pourcentage de la flotte dans les débris',
		opt_uni_DefenseToDF: 'Pourcentage de la défense dans les débris',
		
		opt_timeSetting: 'Changer les valeurs de temps (heures local ou serveur)',
		opt_showServerOgameClock: 'Garder l\'heure du serveur pour l\'horloge en haut à droite',
		opt_showServerPhalanx: 'Garder l\'heure du serveur pour les phalanges',
		opt_showPageStartTime: 'Afficher l\'heure de la dernière actualisation',
		opt_timeAMPM: 'Utilisez 12-heures Format (AM / PM) au lieu de 24 heures',
		
		opt_timeDontChange: 'Ne pas changez l\'heure',
		opt_timeLocal: 'Toujours régler a l\heure local',
		opt_timeServer: 'Toujours régler a l\heure serveur',

		opt_killTips: 'Enlever les infobulles',

		opt_showEventList: 'Afficher la liste des évènements dans la vue générale',
		opt_evt_showOnTop: 'Position de la liste des évènements sur l\'écran',
		opt_evt_showReduced: 'Réduire la liste des événement',
		opt_evt_TimeMode: 'Horloge / Compte à rebours par défaut dans la liste des événements réduite',
		opt_evt_noScroll: 'Enlever barre de défillement aux infobulles',
		opt_phalanx_showDebris: 'Afficher les débris des flottes dans les Phalanges',
		
		opt_galaxyShowRank: 'Voir le rang des joueurs/alliances dans la Galaxie',
		opt_galaxyRankColor: 'Couleur des rangs Joueur/alliance',
		opt_galaxyDebrisMin: 'Taille minimale pour surligner les débris (0 pour désactiver)',
		opt_galaxyDebrisColor: 'Couleur des débris surlignés',
		opt_galaxyHideMoon: 'Cacher l\'image de la lune (afficher sa taille à la place)',
		opt_galaxy_Players: 'Surligner les joueurs suivants',
		opt_galaxy_PlayerColors: 'Couleur des joueurs surlignés',
		opt_galaxy_Allys: 'Surligner les alliances suivantes',
		opt_galaxy_AllyColors: 'Couleur des alliances surlignées',
		opt_galaxy_keepTipsPlanets: 'Gardez les info-bulles pour les planètes et les lunes',
		opt_galaxy_keepTipsDebris: 'Gardez les info-bulles pour les cdr',
		
		opt_msg_PlunderThreshold: 'Taille minimale pour pillage théorique (en K)',
		opt_msg_DebrisThreshold: 'Taille minimale pour recyclage théorique (en K)',
		opt_msg_foldSmallPlunder: 'Pliez les rapports avec le pillage et les débris inférieurs à la limite',
		opt_msg_showPlunder: 'Afficher le pillage dans les rapports d\'espionnage',
		opt_msg_addButtons: 'Ajouter des boutons pour les messages',
		opt_msg_fixColors: 'Changez la couleur des rapports de combat',
		
		opt_fleet_showCapacity: 'Afficher la capacité et la vitesse des vaisseaux',
		opt_fleet1_showResCalc: 'Voir capacité total',
		opt_uni_maxPlayerScore: 'Le joueur top 1 a plus de 5M de points',
		opt_autocopyCoords: 'Copier automatiquement les coordonnées',
		opt_fleet2_setTargetDF: 'Sélectionner automatiquement le champ de débris si la flotte inclus un recycleur',
		opt_fleet2_fixLayout: 'Corriger les informations d\'agencement',
		opt_fleet2_ShortLinks: 'Liste de raccourcis de cibles',
		opt_fleet2_MoonColor: 'Couleur pour les lunes de la liste des raccourcis de cibles',
		opt_fleet2_MoonsToEnd: 'Déplacer les lunes à la fin de la liste des raccoucis',
		opt_fleet2_checkProbeCapacity: 'Vérifier la capacité des sondes avant le départ',
		
		opt_missionPriority: 'Ordre de la priorité de mission',
		
		opt_mvmt_expandFleets: 'Montrez la flotte et la cargaison de celle-ci',
		opt_mvmt_showReversal: 'Afficher le temps inversé pour les flottes',
		
		opt_missAttack: 'Couleur de mission: Attaquer',
		opt_missColony: 'Couleur de mission: Coloniser',
		opt_missDeploy: 'Couleur de mission: Stationner',
		opt_missDestroy: 'Couleur de mission: Détruire',
		opt_missEspionage: 'Couleur de mission: Espionner',
		opt_missExpedition: 'Couleur de mission: Expédition',
		opt_missFederation: 'Couleur de mission: Groupement',
		opt_missHarvest: 'Couleur de mission: Recycler',
		opt_missHold: 'Couleur de mission: Stationner chez un allier',
		opt_missTransport: 'Couleur de mission: Transporter',
		opt_msg_addSimButton: 'Ajouter un bouton pour envoyer le rapport d\'espionnage sur WebSim',
		
		lbl_missAttack: 'Attaquer',
		lbl_missColony: 'Coloniser',
		lbl_missDeploy: 'Stationner',
		lbl_missDestroy: 'Destruction de lune',
		lbl_missEspionage: 'Espionnage',
		lbl_missExpedition: 'Expédition',
		lbl_missFederation: 'Attaque groupé',
		lbl_missHarvest: 'Recycler',
		lbl_missHold: 'Stationner chez un allier',
		lbl_missTransport: 'Transporter',

		lbl_sectionGeneral: 'Général',
		lbl_sectionUniverse: 'Univers',
		lbl_sectionTime: 'Réglage de l\'heure',
		lbl_sectionEventList: 'Mouvements de flotte',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Envoi de flottes',
		lbl_sectionFleetMovement: 'Mouvements de flotte',
		
		lbl_optionsNote1: 'L\'option est sauvegardée uniquement pour cet univers (Firefox)',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Capacité totale',
		lbl_MinSpeed: 'vitesse minimale',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Resources',
		lbl_debris: 'Debris',
		lbl_total: 'Total',
		lbl_loot: 'Rentabilité',
		lbl_metal: 'Métal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'PT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Ressources manquantes',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrivée (groupé)',
		
		lbl_btnMarkReadAll: 'Marquer tous les messages sélectionnés comme lus',
		lbl_btnDeleteSmallPlunder: 'Supprimer les rapports d\'espionnage avec pillage < $plunder et débris < $debris',
		
		lbl_Moon: 'Lune',
		
		lbl_onTop: 'Au dessus',
		lbl_onBottom: 'En dessous',
		lbl_onLeft: 'A gauche',
		
		lbl_installNewVersion: 'Cliquez ici pour installer la nouvelle version',
		lbl_Save: 'Sauvegarder',
		lbl_Clear: 'Effacer',
		lbl_Quantity: 'Quantité',
		lbl_Duration: 'Durée',
		lbl_Consumption: 'Consommation',
		
		lbl_tmTime: 'Temps',
		lbl_tmCountdown: 'Compte à rebours'
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