// ==UserScript==
// @name		AntiGam_lang_ES
// @namespace		antikiller
// @description		AntiGame - traducido al Castellano (debe ser cargado antes que AntiGame)
// @version		1.18.1
// @include		http://*.ogame.*/game/index.php?page=*
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
		
		lbl_shipSCargo: 'Nave peque&#241;a de carga',
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
		
		lbl_RequiredEnergy: 'Energía necesaria:'
		
	}	
		
	AntiGame_lang.InterfaceES =	
	{	
		opt_languageName: 'Espa&#241;ol',
		
		opt_title: 'Opciones de AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',
		
		opt_language: 'Idioma',
		opt_update_check: 'Controlar actualizaciones',
		opt_thousandSeparator: 'Separador de miles',
		opt_blockAutoComplete: 'Bloquear Auto-completar en Firefox',
		
		opt_showDeficient: 'Mostrar recursos faltantes',
		opt_showResources: 'Mostrar informaci&#243;n extendida de recursos',
		opt_showNames: 'Mostrar nombres sobre im&#225;genes en naves/edificios/investigaciones',
		opt_nameColorOn: 'Elija color para "habilitado"',
		opt_nameColorOff: 'Elija color para "deshabilitado"',
		opt_nameColorDisabled: 'Elija color para "sin recursos suficientes"',
		opt_showConstructionTitle: 'Mostrar nombre de la construcci&#243;n en la lista de planetas',
		
		opt_uni_SpeedFactor: 'Velocidad del universo',
		
		opt_timeSetting: 'Cambiar el valor de hora (s&#243;lo la hora)',
		opt_showServerOgameClock: 'Mantener la hora del servidor en el reloj de la cabecera',
		opt_showServerPhalanx: 'Mantener la hora del servidor en la vista del Phalanx',
		opt_timeAMPM: 'Formato horario de 12 horas (AM/PM) en lugar del de 24 horas',
		
		opt_timeDontChange: 'No cambiar la hora',
		opt_timeLocal: 'Mantenerla en la zona horaria local',
		opt_timeServer: 'Mantenerla en la zona horaria del servidor',
		
		opt_killTips: 'Eliminar comentarios',
		
		opt_showEventList: 'Mostrar lista de eventos desplegada en vista principal',
		opt_evt_showOnTop: 'Ubicaci&#243;n de la lista de eventos en la pantalla',
		opt_evt_noScroll: 'Sin barras de desplazamientos cuando se vean comentarios',
		
		opt_galaxyShowRank: 'Mostrar estad&#237;sticas de jugador/alianza en la vista de galaxia',
		opt_galaxyRankColor: 'Coloreado del jugador/alianza por su top',
		opt_galaxyDebrisMin: 'Tama&#241;o m&#237;nimo de los escombros para ser coloreados (0 descativa)',
		opt_galaxyDebrisColor: 'Color para resaltar escombros',
		opt_galaxyHideMoon: 'Ocultar imagen de luna (pero mostrar su tama&#241;o)',
		opt_galaxy_Players: 'Resaltar a los siguientes jugadores',
		opt_galaxy_PlayerColors: 'Color para resaltar a los jugadores',
		opt_galaxy_Allys: 'Resaltar a las siguientes alianzas',
		opt_galaxy_AllyColors: 'Color para resaltar a las alianzas',
		opt_galaxy_keepTipsPlanets: 'Mantener comentarios para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener comentarios para escombros',
		
		opt_msg_PlunderThreshold: 'M&#237;nimo para el robo te&#243;rico (x1000)',
		opt_msg_DebrisThreshold: 'M&#237;nimo para los escombros (x1000)',
		opt_msg_foldSmallPlunder: 'Plegar reportes con robos o escombros menores al m&#237;nimo',
		opt_msg_showPlunder: 'Mostrar robo en reportes de espionaje',
		opt_msg_addButtons: 'Botones adicionales para mensajes',
		opt_msg_fixColors: 'Corregir colores en reportes de batalla',
		
		opt_fleet_showCapacity: 'Mostrar espacio y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_fleet2_setTargetDF: 'Si la flota tiene recicladores enviar la flota a escombros',
		opt_fleet2_fixLayout: 'Corregir la informaci&#243;n del vuelo (p&#225;gina 2)',
		opt_fleet2_ShortLinks: 'Accesos r&#225;pidos a blancos (p&#225;gina 2)',
		opt_fleet2_checkProbeCapacity: 'Revisar capacidad de las sondas antes de enviarlas (p&#225;gina 2)',
		
		opt_missionPriority: 'Prioridades de misi&#243;n',
		
		opt_mvmt_expandFleets: 'Mostrar naves y carga de la flota',
		opt_mvmt_showReversal: 'Mostrar hora de regreso si se cancela',
		
		opt_missAttack: 'Color para misi&#243;n: Atacar',
		opt_missColony: 'Color para misi&#243;n: Colonizar',
		opt_missDeploy: 'Color para misi&#243;n: Desplegar',
		opt_missDestroy: 'Color para misi&#243;n: Destruir',
		opt_missEspionage: 'Color para misi&#243;n: Espionaje',
		opt_missExpedition: 'Color para misi&#243;n: Expedici&#243;n',
		opt_missFederation: 'Color para misi&#243;n: SAC',
		opt_missHarvest: 'Color para misi&#243;n: Reciclar',
		opt_missHold: 'Color para misi&#243;n: Mantener (SAC Defensivo)',
		opt_missTransport: 'Color para misi&#243;n: Transportar',
		opt_msg_addSimButton: 'A&#241;adir bot&#243;n para enviar reportes de espionaje a Websim',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir Luna',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedici&#243;n',
		lbl_missFederation: 'SAC',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'SAC Defensivo',
		lbl_missTransport: 'Transportar',
		
		lbl_sectionGeneral: 'General',
		lbl_sectionTime: 'Configuraci&#243;n Horaria',
		lbl_sectionEventList: 'Lista de eventos',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'Env&#237;o de flota',
		lbl_sectionFleetMovement: 'Movimientos de flota',
		
		lbl_optionsNote1: 'Esta opci&#243;n se guardar&#225; s&#243;lo para este universo',
		
		lbl_resetCoords: 'Vaciar - ',
		
		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad m&#237;nima',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'Bot&#237;n',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NGC',
		lbl_shipRecyclerAlt: 'Recis',
		
		lbl_deficientRes: 'Recursos faltantes',
		lbl_Production: 'Producci&#243;n',
		lbl_ArrivalACS: 'Arrivo (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todos los mensajes mostrados como le&#237;dos',
		lbl_btnDeleteSmallPlunder: 'Borrar los reportes de espinaje con saqueo < $plunder y escombros < $debris',
		
		lbl_Moon: 'Luna',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'A la izquierda'
		
		lbl_installNewVersion: 'Marcar para instalar nuevas versiones',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpiar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'Duraci&#243;n',
		lbl_Consumption: 'Consumo'
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