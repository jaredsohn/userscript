// ==UserScript==
// @name           Antigame_Lang_ES_v1260
// @namespace      Danix
// @description    Traduccion al español de Antigame. Instalar antes que Antigame.
// @version	1.26.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:
/*
	26.12.2099 v.1.9.0
	Czech added
	
	30.11.2009	v1.8.0
	Italian added
	Romanian added
	Slovenian added
	
	BG: 1.13.8
	HR: 1.13.5
	DE: 1.13.8
	FR: 1.13.8
	IT: 1.13.7
	PT: 1.13.7
	RO: 1.13.8
	SI: 1.13.3

	01.11.2009	v1.7.0
	Croatian translation added
	
	29.10.2009	v1.6.2
	BG: up-to-date (1.10.1)
	DE: up-to-date (1.10.1)
	PT: up-to-date (1.10.1)

	21.10.2009	v1.6.1
	BG: up-to-date (1.9.0)
	ES: up-to-date (1.9.0)
	DE: up-to-date (1.9.0)
	FI: up-to-date (1.9.0)
	PT: up-to-date (1.9.0)

//	19.10.2009	v1.6.0
//	DA: up-to-date (1.8.0)
//	French translation added

//	18.10.2009	v1.5.0
//	Danish translation added (not complete, though)
//	BG: up-to-date (1.8.0)
//	FI: up-to-date (1.8.0)
//	

//	17.10.2009	v1.4.2
//	BG: up-to-date except lbl_btnDeleteSmallPlunder
//	DE: up-to-date (1.8.0)
//	PT: as for Antigame v1.7.3

// 12.10.2009	v1.4.1
// DE: up-to-date
// PT: up-to-date except lbl_btnDeleteSmallPlunder

// 12.10.2009	v1.4.0
// German translation
// PT: updated

// 10.10.2009	v1.3.1
//	BG: lbl_ArrivalACS, lbl_btnMarkReadAll

// 10.10.2009	v1.3.0
//	Spanish translation
//	lbl_btnMarkReadAll (FI only)

// 09.10.2009	v1.2.0
//	Portuguese translation
//	lbl_ArrivalACS in Finnish

// 04.10.2009	v1.1.1
//	Added translation for missing resources

// 04.10.2009	v1.1
//	Translation for loot/debris section

// 03.10.2009	v1.0
//	Initial release
//	Bulgarian, Finnish
*/

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruccion Lunar',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'Ataque Confederado',
		lbl_missHarvest: 'Recoleccion',
		lbl_missHold: 'Defensa Conjunta',
		lbl_missTransport: 'Transporte',

		lbl_shipSCargo: 'Carguero Pequeño',
		lbl_shipLCargo: 'Carguero Grande',
		lbl_shipLFighter: 'Cazador Ligero',
		lbl_shipHFighter: 'Cazador Pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de batalla',
		lbl_shipColonizator: 'Colonizador',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda Espionaje',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Acorazado',
		lbl_shipRIP: 'Estrella de la Muerte',
		lbl_shipBCruiser: 'Acorazado',
		lbl_shipSatellite: 'Satelite Solar',

		lbl_defRLauncher: 'Lanzamisiles',
		lbl_defLLaser: 'Laser pequeño',
		lbl_defHLaser: 'Laser grande',
		lbl_defGauss: 'Cañon Gauss',
		lbl_defIon: 'Cañon ionico',
		lbl_defPlasma: 'Cañon Plasma',
		lbl_defSShield: 'Cupula pequeña',
		lbl_defLShield: 'Cupula grande',

		lbl_RequiredEnergy: 'Energia necesaria'
	}

	AntiGame_lang.InterfaceES =
	{
		opt_languageName: 'Español',
	
		opt_title: 'Opciones',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',

		opt_language: 'Idioma',
		opt_update_check: 'Actualizar automaticamente',
		opt_thousandSeparator: 'Separador de miles',
		opt_blockAutoComplete: 'Bloquear Auto-Completar en Firefox',
		
		opt_showDeficient: 'Mostrar recursos necesarios',
		opt_showResources: 'Mostrar informacion de recursos extendida',
		opt_showNames: 'Mostrar nombres sobre las imagenes',
		opt_nameColorOn: 'Color: Disponible',
		opt_nameColorOff: 'Color: No disponible',
		opt_nameColorDisabled: 'Color: No hay suficientes recursos',
		opt_showConstructionTitle: 'Mostrar titulo de construcciones en lista de planetas',
		opt_shortHeader: 'Minimizar imagenes de planetas siempre',
		opt_misc_scrollTitle: 'Mostrar contador de tiempo en el titulo de la ventana',

		opt_uni_reDesigned: 'Universos antiguos con rediseño',
		opt_uni_SpeedFactor: 'Factor de velocidad',
		opt_uni_DFPercent: 'Porcentaje de flotas a escombros',
		opt_uni_DefenseToDF: 'Porcentaje de defensas a escombros',
		
		opt_timeSetting: 'Cambiar valores de tiempo (solo horas)',
		opt_showServerOgameClock: 'Mantener hora del servidor en la parte superior-derecha del reloj de Ogame',
		opt_showServerPhalanx: 'Mantener hora del servidor para la vista del Phalanx',
		opt_showPageStartTime: 'Mostrar la hora del ultimo refresco de pagina',
		opt_timeAMPM: 'Usar formato de 12 horas (AM/PM)',
		
		opt_timeDontChange: 'Sin cambios',
		opt_timeLocal: 'Hora local',
		opt_timeServer: 'Hora del servidor',

		opt_killTips: 'Bloquear Tooltips',

		opt_showEventList: 'Mostrar la lista de eventos desplegada en vision general',
		opt_evt_showOnTop: 'Posicion de la lista de eventos',
		opt_evt_showReduced: 'Lista de eventos reducida',
		opt_evt_TimeMode: 'Modo de tiempo en lista reducida',
		opt_evt_noScroll: 'No mostrar barra de desplazamiento cuando aparezcan Tooltips',
		opt_phalanx_showDebris: 'Mostrar escombros teóricos en vista Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar composicion de flota y carga (lista de eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar composicion de flota y carga (Phalanx)',
		
		opt_galaxyShowRank: 'Mostrar ranking de jugadores/alianzas en galaxia',
		opt_galaxyRankColor: 'Rankings en color',
		opt_galaxyDebrisMin: 'Tamaño minimo de escombros para destacar (0 para desactivar)',
		opt_galaxyDebrisColor: 'Color de los escombros destacados',
		opt_galaxyHideMoon: 'Ocultar imagenes de lunas (muestra tamaño en su lugar)',
		opt_galaxy_Players: 'Destacar jugadores',
		opt_galaxy_PlayerColors: 'Color de jugadores destacados',
		opt_galaxy_Allys: 'Destacar alianzas',
		opt_galaxy_AllyColors: 'Color de alianzas destacadas',
		opt_galaxy_keepTipsPlanets: 'Mantener Tooltips de planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener Tooltips de campos de escombros',
		
		opt_msg_PlunderThreshold: 'Límite mínimo para saqueos (x1000)',
		opt_msg_DebrisThreshold: 'Límite mínimo para recolección de escombros (x1000)',
		opt_msg_foldSmallPlunder: 'Plegar informes con saqueos y escombros por debajo del minimo',
		opt_msg_showPlunder: 'Mostrar informacion de saqueo en los informes',
		opt_msg_addButtons: 'Botones adicionales en mensajes',
		opt_msg_fixColors: 'Arreglar colores en informes de batalla',
		
		opt_fleet_showCapacity: 'Mostrar capacidad y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'El jugador mas fuerte tiene mas de 5M de puntos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de cualquier pagina',
		opt_fleet2_setTargetDF: 'Fijar destino a campo de escombros si la flota incluye recicladores',
		opt_fleet2_fixLayout: 'Arreglar informacion de vuelo (página 2)',
		opt_fleet2_ShortLinks: 'Fijar accesos directos (página 2)',
		opt_fleet2_MoonColor: 'Color de las lunas en la lista de accesos directos',
		opt_fleet2_MoonsToEnd: 'Mover lunas al final de la lista de accesos directos',
		opt_fleet2_expandLists: 'Expandir desplegables (Velocidad, accesos directos, SACs)',
		opt_fleet2_checkProbeCapacity: 'Comprobar capacidad de las sondas antes de la partida (página 2)',
		
		opt_missionPriority: 'Prioridad de misión',
		
		opt_mvmt_expandFleets: 'Mostrar naves y recursos',
		opt_mvmt_showReversal: 'Mostrar tiempo inverso para fleets',
		
		opt_missAttack: 'Misión: Ataque',
		opt_missColony: 'Misión: Colonizar',
		opt_missDeploy: 'Misión: Desplegar',
		opt_missDestroy: 'Misión: Destruir',
		opt_missEspionage: 'Misión: Espionaje',
		opt_missExpedition: 'Misión: Expedicion',
		opt_missFederation: 'Misión: SAC',
		opt_missHarvest: 'Misión: Recoleccion',
		opt_missHold: 'Misión: Mantener',
		opt_missTransport: 'Misión: Transportar',
		opt_msg_addSimButton: 'Añadir boton "Websim" en informes',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir luna',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'Ataque SAC',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Defensa SAC',
		lbl_missTransport: 'Transporte',

		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Opciones de hora',
		lbl_sectionEventList: 'Lista de eventos & Phalanx',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'Flota',
		lbl_sectionFleetMovement: 'Movimiento de flota',
		
		lbl_optionsNote1: 'Esta opcion solo se guardara para este universo',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad mínima',
		lbl_ExPoints: 'Puntos de expedición',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Botín',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat',
		
		lbl_deficientRes: 'Recursos necesarios',
		lbl_Production: 'Produccion',
		lbl_ArrivalACS: 'Llegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todos los mensajes como leidos',
		lbl_btnDeleteSmallPlunder: 'Borrar informes con saqueo < $plunder y escombros < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Superior',
		lbl_onBottom: 'Inferior',
		lbl_onLeft: 'A la izquierda',
		
		lbl_installNewVersion: 'Click para instalar nueva version',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpiar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'Duracion',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Cuenta atras'
	}

	
	// -------------------------------
	// Don't modify the code below

	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()