// ==UserScript==

// @name          antigam_lang_ES

// @namespace      Antigame espa�ol

// @include        http://*.ogame.*/game/index.php?page=*

// ==/UserScript==


(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonización',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir Luna',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posicion',
		lbl_missTransport: 'Transporte',
		
		lbl_shipSCargo: 'Nave pequeña de carga',
		lbl_shipLCargo: 'Nave grande de carga',
		lbl_shipLFighter: 'Cazador ligero',
		lbl_shipHFighter: 'Cazador pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de batalla',
		lbl_shipColonizator: 'Nave de la colonia',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda de espionaje',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Destructor',
		lbl_shipRIP: 'Estrella de la muerte',
		lbl_shipBCruiser: 'Acorazado',
		lbl_shipSatellite: 'Satélite solar',
		
		lbl_RequiredEnergy: 'Energia necesaria'
		
	}
	
	AntiGame_lang.InterfaceEN =
	{
		opt_languageName: 'Español',
	
		opt_title: 'Opciones Antigame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',

		opt_language: 'Idioma',
		opt_autocopyCoords: 'Auto copiar coordenadas',
		opt_showLocalTime: "Mostrar hora local (solo horas)",
		opt_showServerOgameClock: 'Mantener el reloj del servidor arriba a la derecha',
		opt_blockAutoComplete: 'Bloquear auto completar en firefox',
		
		opt_showDeficient: 'Mostrar los recursos que faltan',
		opt_showResources: 'Mostrar la informacion extendedida de los recursos',
		opt_showNames: 'Mostrar nombres sobre las imagenes',
		opt_nameColorOn: 'Color del nombre: DISPONIBLE',
		opt_nameColorOff: 'Color del nombre: NO DISPONIBLE',
		opt_nameColorDisabled: 'Color del nombre: RECURSOS INSUFICIENTES',

		opt_uni_SpeedFactor: 'Factor de velocidad del universo',
		
		opt_killTips: 'Eliminar tooltips',

		opt_showEventList: 'Mostrar lista de enventos desplegada en vision general',
		opt_evt_showOnTop: 'Posicion de la lista de eventos',
		opt_evt_noScroll: 'Marco de las barras de desplazamiento no aparecen cuando se muestra informaciÓn sobre herramientas',
		
		opt_galaxyShowRank: 'Mostrar posiciones en estadisticas en galaxia',
		opt_galaxyRankColor: 'Color de las estadisticas',
		opt_galaxyDebrisMin: 'TamaÑo minimo de escombros para resaltar (0 descativar)',
		opt_galaxyDebrisColor: 'Color de los escombros resaltados',
		opt_galaxyHideMoon: 'Ocultar imagen de luna (Solo mostrar tamaño)',
		opt_galaxy_Players: 'Resalta los siguientes jugadores',
		opt_galaxy_PlayerColors: 'Color de los jugadores resaltados',
		opt_galaxy_Allys: 'resalta las siguientes alianzas',
		opt_galaxy_AllyColors: 'Color de las alianzas resaltadas',
		opt_galaxy_keepTipsPlanets: 'mantener tooltips para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'mantener tooltips para campo de escombros',
		
		opt_msg_PlunderThreshold: 'Limite para robo teorico minimo (x1000)',
		opt_msg_DebrisThreshold: 'Limite para escombros minimos (x1000)',
		opt_msg_foldSmallPlunder: 'Pliega los reportes por debajo del limite',
		opt_msg_showPlunder: 'Mostrar robo en los espionajes',
		opt_msg_addButtons: 'Botones adiciones en los mensajes',
		opt_msg_fixColors: 'Fijar los colores de las batallas',
		
		opt_fleet_showCapacity: 'Mostrar capacidad y velocidad de las naves',
		opt_fleet2_setTargetDF: 'Fijar a escombros, si la flota incluye los recicladores',
		opt_fleet2_fixLayout: 'Fijar dise�o de informacion',
		opt_fleet2_ShortLinks: 'Accesos directos a objetivos',
		
		opt_missionPriority: 'Prioridad de misiones',
		
		opt_mvmt_expandFleets: 'Mostrar la flota y la carga',
		opt_mvmt_showReversal: 'Mostrar tiempo de regreso',
		
		opt_missAttack: 'Color de la Misión: Atacar',
		opt_missColony: 'Color de la Misión: Colonizacion',
		opt_missDeploy: 'Color de la Misión: Despliegue',
		opt_missDestroy: 'Color de la Misión: Destruir',
		opt_missEspionage: 'Color de la Misión: Espionaje',
		opt_missExpedition: 'Color de la Misión: Expedicion',
		opt_missFederation: 'Color de la Misión: SAC',
		opt_missHarvest: 'Color de la Misión: Reciclar',
		opt_missHold: 'Color de la Misión: Mantener',
		opt_missTransport: 'Color de la Misión: Transportar',
		
		// these label are shown in Options
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonización',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir Luna',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Mantener en posición',
		lbl_missTransport: 'Transporte',
		//
		
		lbl_sectionGeneral: 'GENERAL',
		lbl_sectionEventList: 'LISTA DE EVENTOS',
		lbl_sectionGalaxy: 'GALAXIA',
		lbl_sectionMessages: 'MENSAJES',
		lbl_sectionFleetDispatch: 'ENVIOS DE FLOTA',
		lbl_sectionFleetMovement: 'MOVIMIENTOS DE FLOTA',
		
		lbl_optionsNote1: 'La opcion se guarda solo para este universo',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Capacidad Total',
		lbl_MinSpeed: 'Velocidad Minima',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Robo',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'Naves pequeÑas de carga',
		lbl_shipLCargoAlt: 'Naves grandes de carga',
		lbl_shipRecyclerAlt: 'Recicladores',
		
		lbl_deficientRes: 'Recursos Necesarios',
		lbl_Production: 'Produccion',
		lbl_ArrivalACS: 'Llegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar los mensajes mostrados como leidos',
		lbl_btnDeleteSmallPlunder: 'Borra los reportes que el robo < $plunder y los escombros < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'Izquierda'
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