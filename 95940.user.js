// ==UserScript==
// @name           AntiGame_Lang.ES
// @namespace      xXx
// @description    TraducciÃ³n al espaÃ±ol para AntiGame (DEBE ejecutarse ANTES que el AntiGame principal)
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
		lbl_missExpedition: 'ExpediciÃ³n',
		lbl_missFederation: 'Ataque SAC',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posiciÃ³n',
		lbl_missTransport: 'Transportar',
		
		lbl_shipSCargo: 'Nave pequeÃ±a de carga',
		lbl_shipLCargo: 'Nave grande de carga',
		lbl_shipLFighter: 'Cazador ligero',
		lbl_shipHFighter: 'Cazador pesado',
		lbl_shipCruiser: 'Crucero',
		lbl_shipBattleship: 'Nave de batalla',
		lbl_shipColonizator: 'Colonizador',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda de espionaje',
		lbl_shipBomber: 'Bombardero',
		lbl_shipDestroyer: 'Destructor',
		lbl_shipRIP: 'Estrella de la muerte',
		lbl_shipBCruiser: 'Acorazado',
		lbl_shipSatellite: 'SatÃ©lite solar',
		
		lbl_defRLauncher: 'Lanzamisiles',
		lbl_defLLaser: 'LÃ¡ser pequeÃ±o',
		lbl_defHLaser: 'LÃ¡ser grande',
		lbl_defGauss: 'CaÃ±Ã³n Gauss',
		lbl_defIon: 'CaÃ±Ã³n iÃ³nico',
		lbl_defPlasma: 'CaÃ±Ã³n de plasma',
		lbl_defSShield: 'CÃºpula pequeÃ±a de protecciÃ³n',
		lbl_defLShield: 'CÃºpula grande de protecciÃ³n',
		
		lbl_RequiredEnergy: 'EnergÃ­a necesaria:',
		
		rx_sendMail: /Enviar mensaje a (.+)\./
		
	}

	AntiGame_lang.InterfaceES =
	{
		
		opt_title: 'Opciones de AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Defecto',

		opt_killTips: 'Eliminar tooltips',
		
		
	//SecciÃ³n General
		
		opt_language: 'Idioma',
		opt_languageName: 'EspaÃ±ol',
		opt_blockAutoComplete: 'Bloquear Auto-Completar en Firefox',
		opt_update_check: 'Buscar actualizaciones automÃ¡ticamente',
		opt_thousandSeparator: 'Separador de miles',
		opt_showResources: 'Mostrar informaciÃ³n extendida de recursos',
		opt_showDeficient: 'Mostrar los recursos que faltan',
		opt_showNames: 'Mostrar nombres sobre imÃ¡genes en edificios/investigaciones/naves/defensas',		
		opt_nameColorOn: 'Color nombre: mejora disponible',
		opt_nameColorOff: 'Color nombre: mejora no disponible',
		opt_nameColorDisabled: 'Color nombre: recursos insuficientes',
		opt_showConstructionTitle: 'Mostrar construcciÃ³n actual en la lista de planetas',		
		opt_shortHeader: 'Minimizar siempre la imagen del planeta',
		opt_misc_scrollTitle: 'Mostrar el tiempo para el siguiente evento en el titulo de la ventana',
		
		
	//SecciÃ³n Universo
		opt_uni_reDesigned: 'Es universo antiguo con el rediseÃ±o',
		opt_uni_SpeedFactor: 'Velocidad del universo',
		opt_uni_DFPercent: 'Porcentaje de puntos de estructura de flota a escombros',
		opt_uni_DefenseToDF: 'Porcentaje de defensa a escombros',
		
		
	//SecciÃ³n Tiempo
		opt_timeSetting: 'ConfiguraciÃ³n Horaria',
		opt_timeDontChange: 'Por defecto',
		opt_timeLocal: 'Usar hora local',
		opt_timeServer: 'Usar hora del servidor',
		opt_showServerOgameClock: 'Mantener hora del servidor en el reloj de la cabecera',
		opt_showServerPhalanx: 'Mantener hora del servidor en la vista del Phalanx',
		opt_showPageStartTime: 'Mostrar la hora de la ultima vez que se actualizÃ³ la pÃ¡gina',
		opt_timeAMPM: 'Formato horario de 12 horas (AM/PM) en lugar del de 24 horas',
		
		
	//SecciÃ³n Lista de Eventos
		opt_showEventList: 'Mostrar la lista de eventos en visiÃ³n general',
		opt_evt_showOnTop: 'UbicaciÃ³n de la lista de eventos en la pantalla',
		opt_evt_noScroll: 'Sin barras de desplazamiento cuando se vean tooltips',
		opt_evt_showReduced: 'Mostrar lista de eventos reducida',
		opt_evt_TimeMode: 'Hora o cuenta atrÃ¡s para la vista reducida',
		opt_phalanx_showDebris: 'Mostrar escombros teÃ³ricos en la vista de phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar composiciÃ³n de flota y cargamento (Lista de eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar composiciÃ³n de flota y cargamento (Phalanx)',
		
		
	//SecciÃ³n Galaxia
		opt_galaxyShowRank: 'Mostrar rÃ¡nking jugador/alianza en la vista de la Galaxia',
		opt_galaxyRankColor: 'Color del rÃ¡nking jugador/alianza',
		opt_galaxyDebrisMin: 'TamaÃ±o mÃ­nimo para resaltar los escombros (0 para deshabilitar)',
		opt_galaxyDebrisColor: 'Color para resaltar los escombros',
		opt_galaxyHideMoon: 'Ocultar imagen de las lunas (mostrar el tamaÃ±o en su lugar)',
		opt_galaxy_Players: 'Resaltar a los siguientes jugadores',
		opt_galaxy_PlayerColors: 'Color para resaltar a los jugadores',
		opt_galaxy_Allys: 'Resaltar a las siguientes alianzas',
		opt_galaxy_AllyColors: 'Color para resaltar a las alianzas',
		opt_galaxy_keepTipsPlanets: 'Mantener tooltips para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener tooltips para escombros',


	//SecciÃ³n Mensajes
		opt_msg_PlunderThreshold: 'MÃ­nimo para el robo teÃ³rico (x1000)',
		opt_msg_DebrisThreshold: 'MÃ­nimo para los escombros teÃ³ricos (x1000)',
		opt_msg_foldSmallPlunder: 'Plegar reportes con robos o escombros menores al mÃ­nimo',
		opt_msg_showPlunder: 'Mostrar robo en reportes de espionaje',
		opt_msg_addButtons: 'Mostrar botones adicionales en mensajes',
		opt_msg_fixColors: 'Corregir colores en informes de batalla',
		opt_msg_addSimButton: 'AÃ±adir botÃ³n para enviar reportes de espionaje a Websim',

		
	//SecciÃ³n MenÃº EnvÃ­o de flota
		opt_fleet_showCapacity: 'Mostrar capacidad y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'El Top 1 tiene mÃ¡s de 5M de puntos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de cualquier pÃ¡gina (no solo de las pestaÃ±as de ogame del universo actual)',
		opt_fleet2_setTargetDF: 'Enviar la flota a escombros si incluye recicladores',
		opt_fleet2_fixLayout: 'Corregir la informaciÃ³n del vuelo (pÃ¡gina 2)',
		opt_fleet2_ShortLinks: 'Lista de acceso rÃ¡pido a blancos (pÃ¡gina 2)',
		opt_fleet2_MoonColor: 'Color para las lunas en la lista de acceso rÃ¡pido',
		opt_fleet2_MoonsToEnd: 'Mover las lunas al final de la lista de acceso rÃ¡pido',
		opt_fleet2_expandLists: 'Expandir selectores de opciones (Velocidad, Accesos rapidos, SACs)(pÃ¡gina 2)',
		opt_fleet2_checkProbeCapacity: 'Revisar capacidad de las sondas antes de enviarlas (pÃ¡gina 2)',
		opt_missionPriority: 'Prioridades de misiÃ³n',


	//SecciÃ³n Movimiento de Flotas
		opt_mvmt_expandFleets: 'Mostrar cantidad de naves y recursos en las flotas en vuelo',
		opt_mvmt_showReversal: 'Mostrar la hora teÃ³rica de regreso de las flotas',

		opt_missAttack: 'Color para la misiÃ³n: Atacar',
		opt_missColony: 'Color para la misiÃ³n: Colonizar',
		opt_missDeploy: 'Color para la misiÃ³n: Desplegar',
		opt_missDestroy: 'Color para la misiÃ³n: Destruir',
		opt_missEspionage: 'Color para la misiÃ³n: Espionaje',
		opt_missExpedition: 'Color para la misiÃ³n: ExpediciÃ³n',
		opt_missFederation: 'Color para la misiÃ³n: Ataque SAC',
		opt_missHarvest: 'Color para la misiÃ³n: Recolectar',
		opt_missHold: 'Color para la misiÃ³n: Mantener posiciÃ³n',
		opt_missTransport: 'Color para la misiÃ³n: Transportar',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'ExpediciÃ³n',
		lbl_missFederation: 'Ataque SAC',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener posiciÃ³n',
		lbl_missTransport: 'Transportar',
		
		
	//Nombres Secciones
		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Ajustes de tiempo',
		lbl_sectionEventList: 'Lista de eventos',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'EnvÃ­o de flotas',
		lbl_sectionFleetMovement: 'Movimientos de flotas',


	//Vocabulario vario
		lbl_optionsNote1: 'Ã‰sta opciÃ³n se guardarÃ¡ sÃ³lo para este universo',
		lbl_resetCoords: 'Vaciar coord. - ',
		
		lbl_TotalCapacity: 'Capacidad total',
		lbl_MinSpeed: 'Velocidad mÃ­nima',
		lbl_ExPoints: 'Puntos de expediciÃ³n',
		lbl_mvmt_Return: 'R',		

		lbl_resources: 'Recursos',
		lbl_debris: 'Escombros',
		lbl_total: 'Total',
		lbl_loot: 'BotÃ­n',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NGC',
		lbl_shipRecyclerAlt: 'Recis.',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'Recursos que faltan',
		lbl_Production: 'ProducciÃ³n',
		lbl_ArrivalACS: 'Llegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todos los mensajes mostrados como leÃ­dos',
		lbl_btnDeleteSmallPlunder: 'Eliminar los informes de espionaje con un botÃ­n < $plunder y escombros < $debris',

		lbl_Moon: 'Luna',
		
		lbl_installNewVersion: 'Click para instalar nuevas versiones',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpiar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'DuraciÃ³n',
		lbl_Consumption: 'Consumo',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'Izquierda',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Cuenta atrÃ¡s'
				
	}
	
	
	

	// Introducir var de idioma en la pagina

	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()