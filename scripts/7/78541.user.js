// ==UserScript==
// @name           AntiGame_lang_es
// @namespace      elpeter
// @description    AntiGame translation - Spanish (Debe cargar antes que AntiGame)
// @version	1.23
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsES =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posición',
		lbl_missTransport: 'Transportar',
		
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
	
		lbl_defRLauncher: 'Lanzamisiles',
		lbl_defLLaser: 'Laser pequeño',
		lbl_defHLaser: 'Laser grande',
		lbl_defGauss: 'Cañon Gauss',
		lbl_defIon: 'Cañon Iónico',
		lbl_defPlasma: 'Cañon de Plasma',
		lbl_defSShield: 'Cúpula pequeña de proteccion',
		lbl_defLShield: 'Cúpula grande de proteccion',
		
		lbl_RequiredEnergy: 'Energía necesaria',
		
		rx_sendMail: /Send a message to (.+)\./
		
	}
	
	AntiGame_lang.InterfaceES =
	{
		opt_languageName: 'Español',
		
		opt_title: 'Opciones de AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',
		
		opt_language: 'Idioma',
		opt_update_check: 'Controlar actualizaciones',
		opt_thousandSeparator: 'Separador de miles',
		opt_blockAutoComplete: 'Bloquear Auto-completar en Firefox',

		opt_showDeficient: 'Mostrar recursos faltantes',
		opt_showResources: 'Mostrar información extendida de recursos',
		opt_showNames: 'Mostrar nombres sobre imágenes en naves/edificios/investigaciones',
		opt_nameColorOn: 'Elija color para habilitado',
		opt_nameColorOff: 'Elija color para deshabilitado',
		opt_nameColorDisabled: 'Elija color para sin recursos suficientes',
		opt_showConstructionTitle: 'Mostrar nombre de la construcción en la lista de planetas',
		opt_shortHeader: 'Minimizar siempre la imágen del planeta',
		
		opt_uni_SpeedFactor: 'Velocidad del universo',
		opt_uni_DFPercent: 'Prcentaje de edificios a escombros',
		opt_uni_DefenseToDF: 'Prcentaje de defensas a escombros',
		
		opt_timeSetting: 'Cambiar el valor de hora (solo la hora)',
		opt_showServerOgameClock: 'Mantener la hora del servidor en el reloj de la cabecera',
		opt_showServerPhalanx: 'Mantener la hora del servidor en la vista del Phalanx',
		opt_showPageStartTime: 'Mostrar la hora a la que fué cargada la página',
		opt_timeAMPM: 'Formato horario de 12 horas (AM/PM) en lugar del de 24 horas',
		
		opt_timeDontChange: 'No cambiar la hora',
		opt_timeLocal: 'Mantenerla en la zona horaria local',
		opt_timeServer: 'Mantenerla en la zona horaria del servidor',
		
		opt_killTips: 'Eliminar comentarios',
		
		opt_showEventList: 'Mostrar lista de eventos desplegada en vista principal',
		opt_evt_showOnTop: 'Ubicación de la lista de eventos en la pantalla',
		opt_evt_showReduced: 'Reduceir lista de eventos',
		opt_evt_TimeMode: 'Reloj/Cuenta Atrás por defecto en la vista de eventos reducida',
		opt_evt_noScroll: 'Sin barras de desplazamientos cuando se vean comentarios',
		opt_phalanx_showDebris: 'Mostrar escombros teóricos en la vista de Phalanx',
		
		opt_galaxyShowRank: 'Mostrar estadísticas de jugador/alianza en la vista de galaxia',
		opt_galaxyRankColor: 'Coloreado del jugador/alianza por su top',
		opt_galaxyDebrisMin: 'Tamaño mínimo de los escombros para ser coloreados (0 descativa)',
		opt_galaxyDebrisColor: 'Color para resaltar escombros',
		opt_galaxyHideMoon: 'Ocultar imagen de luna (pero mostrar su tamaño)',
		opt_galaxy_Players: 'Resaltar a los siguientes jugadores',
		opt_galaxy_PlayerColors: 'Color para resaltar a los jugadores',
		opt_galaxy_Allys: 'Resaltar a las siguientes alianzas',
		opt_galaxy_AllyColors: 'Color para resaltar a las alianzas',
		opt_galaxy_keepTipsPlanets: 'Mantener comentarios para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener comentarios para escombros',
		
		opt_msg_PlunderThreshold: 'Mínimo para el robo teorico (x1000)',
		opt_msg_DebrisThreshold: 'Mínimo para los escombros (x1000)',
		opt_msg_foldSmallPlunder: 'Plegar reportes con robos o escombros menores al minimo',
		opt_msg_showPlunder: 'Mostrar robo en reportes de espionaje',
		opt_msg_addButtons: 'Botones adicionales para mensajes',
		opt_msg_fixColors: 'Corregir colores en reportes de batalla',
		
		opt_fleet_showCapacity: 'Mostrar espacio y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'El jugador más fuerte tiene más de 5M de puntos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_fleet2_setTargetDF: 'Si la flota tiene recicladores enviar la flota a escombros',
		opt_fleet2_fixLayout: 'Corregir la informacion del vuelo (página 2)',
		opt_fleet2_ShortLinks: 'Accesos rapidos a blancos (página 2)',
		opt_fleet2_MoonColor: 'Color de las lunas en la lista de planetas',
		opt_fleet2_MoonsToEnd: 'Mover las lunas al final de la lista de planetas',
		opt_fleet2_checkProbeCapacity: 'Revisar capacidad de las sondas antes de enviarlas (página 2)',
		
		opt_missionPriority: 'Prioridades de misión',
		
		opt_mvmt_expandFleets: 'Mostrar naves y carga de la flota',
		opt_mvmt_showReversal: 'Mostrar hora de regreso si se cancela',
		
		opt_missAttack: 'Color para misión: Atacar',
		opt_missColony: 'Color para misión: Colonizar',
		opt_missDeploy: 'Color para misión: Desplegar',
		opt_missDestroy: 'Color para misión: Destruir',
		opt_missEspionage: 'Color para misión: Espionaje',
		opt_missExpedition: 'Color para misión: Expedicion',
		opt_missFederation: 'Color para misión: SAC',
		opt_missHarvest: 'Color para misión: Reciclar',
		opt_missHold: 'Color para misión: Mantener (SAC Defensivo)',
		opt_missTransport: 'Color para misión: Transportar',
		opt_msg_addSimButton: 'Añadir boton para enviar reportes de espionaje a Websim',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir Luna',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedicion',
		lbl_missFederation: 'SAC',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'SAC Defensivo',
		lbl_missTransport: 'Transportar',
		
		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configuracion Horaria',
		lbl_sectionEventList: 'Lista de eventos',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'Envío de flota',
		lbl_sectionFleetMovement: 'Movimientos de flota',
		
		lbl_optionsNote1: 'Esta opcion se guardara solo para este universo',
		
		lbl_resetCoords: 'Vaciar - ',
		
		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad minima',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Botin',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NGC',
		lbl_shipRecyclerAlt: 'Recis',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Recursos faltantes',
		lbl_Production: 'Producción',
		lbl_ArrivalACS: 'Llegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todos los mensajes mostrados como leidos',
		lbl_btnDeleteSmallPlunder: 'Borrar los reportes de espinaje con saqueo < $plunder y escombros < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'A la izquierda',
		
		lbl_installNewVersion: 'Marcar para instalar nuevas versiones',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpiar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'Duración',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Tiempo',
		lbl_tmCountdown: 'Cuenta atrás'
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