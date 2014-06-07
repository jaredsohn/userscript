// ==UserScript==
// @name           AntiGame_Lang.ES
// @namespace      xXx
// @description    Traducción al español para AntiGame (DEBE ejecutarse ANTES que el AntiGame principal)
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
		lbl_missFederation: 'Ataque SAC',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener en posición',
		lbl_missTransport: 'Transportar',
		
		lbl_shipSCargo: 'Nave pequeña de carga',
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
		lbl_shipSatellite: 'Satélite solar',
		
		lbl_defRLauncher: 'Lanzamisiles',
		lbl_defLLaser: 'Láser pequeño',
		lbl_defHLaser: 'Láser grande',
		lbl_defGauss: 'Cañón Gauss',
		lbl_defIon: 'Cañón iónico',
		lbl_defPlasma: 'Cañón de plasma',
		lbl_defSShield: 'Cúpula pequeña de protección',
		lbl_defLShield: 'Cúpula grande de protección',
		
		lbl_RequiredEnergy: 'Energía necesaria:',
		
		rx_sendMail: /Enviar mensaje a (.+)\./
		
	}

	AntiGame_lang.InterfaceES =
	{
		
		opt_title: 'Opciones de AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Defecto',

		opt_killTips: 'Eliminar tooltips',
		
		
	//Sección General
		
		opt_language: 'Idioma',
		opt_languageName: 'Español',
		opt_blockAutoComplete: 'Bloquear Auto-Completar en Firefox',
		opt_update_check: 'Buscar actualizaciones automáticamente',
		opt_thousandSeparator: 'Separador de miles',
		opt_showResources: 'Mostrar información extendida de recursos',
		opt_showDeficient: 'Mostrar los recursos que faltan',
		opt_showNames: 'Mostrar nombres sobre imágenes en edificios/investigaciones/naves/defensas',		
		opt_nameColorOn: 'Color nombre: mejora disponible',
		opt_nameColorOff: 'Color nombre: mejora no disponible',
		opt_nameColorDisabled: 'Color nombre: recursos insuficientes',
		opt_showConstructionTitle: 'Mostrar construcción actual en la lista de planetas',		
		opt_shortHeader: 'Minimizar siempre la imagen del planeta',
		opt_misc_scrollTitle: 'Mostrar el tiempo para el siguiente evento en el titulo de la ventana',
		
		
	//Sección Universo
		opt_uni_reDesigned: 'Es universo antiguo con el rediseño',
		opt_uni_SpeedFactor: 'Velocidad del universo',
		opt_uni_DFPercent: 'Porcentaje de puntos de estructura de flota a escombros',
		opt_uni_DefenseToDF: 'Porcentaje de defensa a escombros',
		
		
	//Sección Tiempo
		opt_timeSetting: 'Configuración Horaria',
		opt_timeDontChange: 'Por defecto',
		opt_timeLocal: 'Usar hora local',
		opt_timeServer: 'Usar hora del servidor',
		opt_showServerOgameClock: 'Mantener hora del servidor en el reloj de la cabecera',
		opt_showServerPhalanx: 'Mantener hora del servidor en la vista del Phalanx',
		opt_showPageStartTime: 'Mostrar la hora de la ultima vez que se actualizó la página',
		opt_timeAMPM: 'Formato horario de 12 horas (AM/PM) en lugar del de 24 horas',
		
		
	//Sección Lista de Eventos
		opt_showEventList: 'Mostrar la lista de eventos en visión general',
		opt_evt_showOnTop: 'Ubicación de la lista de eventos en la pantalla',
		opt_evt_noScroll: 'Sin barras de desplazamiento cuando se vean tooltips',
		opt_evt_showReduced: 'Mostrar lista de eventos reducida',
		opt_evt_TimeMode: 'Hora o cuenta atrás para la vista reducida',
		opt_phalanx_showDebris: 'Mostrar escombros teóricos en la vista de phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar composición de flota y cargamento (Lista de eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar composición de flota y cargamento (Phalanx)',
		
		
	//Sección Galaxia
		opt_galaxyShowRank: 'Mostrar ránking jugador/alianza en la vista de la Galaxia',
		opt_galaxyRankColor: 'Color del ránking jugador/alianza',
		opt_galaxyDebrisMin: 'Tamaño mínimo para resaltar los escombros (0 para deshabilitar)',
		opt_galaxyDebrisColor: 'Color para resaltar los escombros',
		opt_galaxyHideMoon: 'Ocultar imagen de las lunas (mostrar el tamaño en su lugar)',
		opt_galaxy_Players: 'Resaltar a los siguientes jugadores',
		opt_galaxy_PlayerColors: 'Color para resaltar a los jugadores',
		opt_galaxy_Allys: 'Resaltar a las siguientes alianzas',
		opt_galaxy_AllyColors: 'Color para resaltar a las alianzas',
		opt_galaxy_keepTipsPlanets: 'Mantener tooltips para planetas y lunas',
		opt_galaxy_keepTipsDebris: 'Mantener tooltips para escombros',


	//Sección Mensajes
		opt_msg_PlunderThreshold: 'Mínimo para el robo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Mínimo para los escombros teóricos (x1000)',
		opt_msg_foldSmallPlunder: 'Plegar reportes con robos o escombros menores al mínimo',
		opt_msg_showPlunder: 'Mostrar robo en reportes de espionaje',
		opt_msg_addButtons: 'Mostrar botones adicionales en mensajes',
		opt_msg_fixColors: 'Corregir colores en informes de batalla',
		opt_msg_addSimButton: 'Añadir botón para enviar reportes de espionaje a Websim',

		
	//Sección Menú Envío de flota
		opt_fleet_showCapacity: 'Mostrar capacidad y velocidad de las naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'El Top 1 tiene más de 5M de puntos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de cualquier página (no solo de las pestañas de ogame del universo actual)',
		opt_fleet2_setTargetDF: 'Enviar la flota a escombros si incluye recicladores',
		opt_fleet2_fixLayout: 'Corregir la información del vuelo (página 2)',
		opt_fleet2_ShortLinks: 'Lista de acceso rápido a blancos (página 2)',
		opt_fleet2_MoonColor: 'Color para las lunas en la lista de acceso rápido',
		opt_fleet2_MoonsToEnd: 'Mover las lunas al final de la lista de acceso rápido',
		opt_fleet2_expandLists: 'Expandir selectores de opciones (Velocidad, Accesos rapidos, SACs)(página 2)',
		opt_fleet2_checkProbeCapacity: 'Revisar capacidad de las sondas antes de enviarlas (página 2)',
		opt_missionPriority: 'Prioridades de misión',


	//Sección Movimiento de Flotas
		opt_mvmt_expandFleets: 'Mostrar cantidad de naves y recursos en las flotas en vuelo',
		opt_mvmt_showReversal: 'Mostrar la hora teórica de regreso de las flotas',

		opt_missAttack: 'Color para la misión: Atacar',
		opt_missColony: 'Color para la misión: Colonizar',
		opt_missDeploy: 'Color para la misión: Desplegar',
		opt_missDestroy: 'Color para la misión: Destruir',
		opt_missEspionage: 'Color para la misión: Espionaje',
		opt_missExpedition: 'Color para la misión: Expedición',
		opt_missFederation: 'Color para la misión: Ataque SAC',
		opt_missHarvest: 'Color para la misión: Recolectar',
		opt_missHold: 'Color para la misión: Mantener posición',
		opt_missTransport: 'Color para la misión: Transportar',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Desplegar',
		lbl_missDestroy: 'Destruir',
		lbl_missEspionage: 'Espionaje',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque SAC',
		lbl_missHarvest: 'Recolectar',
		lbl_missHold: 'Mantener posición',
		lbl_missTransport: 'Transportar',
		
		
	//Nombres Secciones
		lbl_sectionGeneral: 'General',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Ajustes de tiempo',
		lbl_sectionEventList: 'Lista de eventos',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensajes',
		lbl_sectionFleetDispatch: 'Envío de flotas',
		lbl_sectionFleetMovement: 'Movimientos de flotas',


	//Vocabulario vario
		lbl_optionsNote1: 'Ésta opción se guardará sólo para este universo',
		lbl_resetCoords: 'Vaciar coord. - ',
		
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
		
		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NGC',
		lbl_shipRecyclerAlt: 'Recis.',
		lbl_shipSatelliteAlt: 'Sat.',

		lbl_deficientRes: 'Recursos que faltan',
		lbl_Production: 'Producción',
		lbl_ArrivalACS: 'Llegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todos los mensajes mostrados como leídos',
		lbl_btnDeleteSmallPlunder: 'Eliminar los informes de espionaje con un botín < $plunder y escombros < $debris',

		lbl_Moon: 'Luna',
		
		lbl_installNewVersion: 'Click para instalar nuevas versiones',
		lbl_Save: 'Guardar',
		lbl_Clear: 'Limpiar',
		lbl_Quantity: 'Cantidad',
		lbl_Duration: 'Duración',
		lbl_Consumption: 'Consumo',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abajo',
		lbl_onLeft: 'Izquierda',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Cuenta atrás'
				
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