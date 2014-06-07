// ==UserScript==
// @name           AntiGam_lang_gl
// @namespace      antikiller
// @description    Traducción do Antigame v1.26.0 ao galego (Debe instalarse antes que o Antigame)
// @version	1.26.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsGL =
	{
		lbl_missAttack: 'Ataque',
		lbl_missColony: 'Colonización',
		lbl_missDeploy: 'Desplegue',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espionaxe',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'Ataque en confederación',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter en posición',
		lbl_missTransport: 'Transporte',
		
		lbl_shipSCargo: 'Nave pequena de carga',
		lbl_shipLCargo: 'Nave grande de carga',
		lbl_shipLFighter: 'Cazador Lixeiro',
		lbl_shipHFighter: 'Cazador Pesado',
		lbl_shipCruiser: 'Cruzeiro',
		lbl_shipBattleship: 'Nave de Batalla',
		lbl_shipColonizator: 'Colonizador',
		lbl_shipRecycler: 'Recicladdor',
		lbl_shipSpy: 'Sonda de Espionaxe',
		lbl_shipBomber: 'Bombardeiro',
		lbl_shipDestroyer: 'Destructor',
		lbl_shipRIP: 'Estrela da Morte',
		lbl_shipBCruiser: 'Acoirazado',
		lbl_shipSatellite: 'Satélite Solar',
		
		lbl_defRLauncher: 'Lanzamísiles',
		lbl_defLLaser: 'Laser Pequeno',
		lbl_defHLaser: 'Laser Grande',
		lbl_defGauss: 'Canón de Gauss',
		lbl_defIon: 'Canón Iónico',
		lbl_defPlasma: 'Canón de Plasma',
		lbl_defSShield: 'Cúpula Pequena',
		lbl_defLShield: 'Cúpula Grande',
		
		lbl_RequiredEnergy: 'Enerxía requerida',
		
		rx_sendMail: /Send a message to (.+)\./
		
	}
	
	AntiGame_lang.InterfaceGL =
	{
		opt_languageName: 'Galego',
	
		opt_title: 'Opcions do AntiGame',
		opt_btnOk: 'Aceptar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Por Defecto',

		opt_language: 'Idioma',
		opt_update_check: 'Comprobar actualizacións',
		opt_thousandSeparator: 'Separador de miles',
		opt_blockAutoComplete: 'Bloquear Auto-completar en Firefox',
		
		opt_showDeficient: 'Amosar recursos requeridos',
		opt_showResources: 'Amosar información extendida de recursos',
		opt_showNames: 'Amosar nomes de nave/edificio/investigación sobre as imaxes',
		opt_nameColorOn: 'Cor para: Xogador Activo',
		opt_nameColorOff: 'Cor para: Xogador Inactivo',
		opt_nameColorDisabled: 'Cor para: Non hai recursos dabondo',
		opt_showConstructionTitle: 'Amosar nome da construción na lista de planetas',
		opt_shortHeader: 'Imaxes dos planetas sempre minimizadas',
		opt_misc_scrollTitle: 'Amosar tempo ata o próximo evento na barra de título do Navegador',

		opt_uni_reDesigned: 'Vellos universos con re-deseño instalado',
		opt_uni_SpeedFactor: 'Factor de velocidade do universo',
		opt_uni_DFPercent: 'Porcentaxe da estructura das naves a refugallos',
		opt_uni_DefenseToDF: 'Porcentaxe de defensas a refugallos',
		
		opt_timeSetting: 'Cambiar valores de tempo (só horas)',
		opt_showServerOgameClock: 'Manter a hora do servidor no reloxo da cabeceira',
		opt_showServerPhalanx: 'Manter a hora do servidor na vista do Phalanx',
		opt_showPageStartTime: 'Amosar a hora á que a páxina foi actualizada',
		opt_timeAMPM: 'Usar formato de 12 horas (AM/PM) en troques do de 24 horas',
		
		opt_timeDontChange: 'Non cambiar a hora',
		opt_timeLocal: 'Utilizar sempre a zona horaria local',
		opt_timeServer: 'Utilizar sempre a zona horaria do servidor',

		opt_killTips: 'Eliminar comentarios',

		opt_showEventList: 'Amosar Lista de Eventos despregada na vista principal',
		opt_evt_showOnTop: 'Ubicación da lista de eventos na pantalla',
		opt_evt_showReduced: 'Lista de Eventos reducida',
		opt_evt_TimeMode: 'Conta atras por defecto na Lista de Eventos reducida',
		opt_evt_noScroll: 'Non amosar cadros cando os comentarios están activados',
		opt_phalanx_showDebris: 'Amosar refugallos teóricos na Visión do Phalanx',
		opt_evt_expandFleetsEvt: 'Amosar composición e carga da flota (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Amosar composición e carga da flota (Phalanx)',
		
		opt_galaxyShowRank: 'Amosar o posto na clasificación de xogador/alianza na visión de Galaxia',
		opt_galaxyRankColor: 'Cor para o posto na clasificación do xogador/alianza',
		opt_galaxyDebrisMin: 'Tamaño mínimo de refugallos para resaltalos (0 = desactivado)',
		opt_galaxyDebrisColor: 'Cor para refugallos resaltados',
		opt_galaxyHideMoon: 'Ocultar imaxe da lúa (amosar en troques o tamaño)',
		opt_galaxy_Players: 'Resaltar os seguintes xogadores',
		opt_galaxy_PlayerColors: 'Cores para os xogadores resaltados',
		opt_galaxy_Allys: 'Resaltar as seguintes alianzas',
		opt_galaxy_AllyColors: 'Cores para as alianzas resaltadas',
		opt_galaxy_keepTipsPlanets: 'Manter comentarios para planetas e lúas',
		opt_galaxy_keepTipsDebris: 'Manter comentarios para campos de refugallos',
		
		opt_msg_PlunderThreshold: 'Mínimo para o roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Mínimo para os refugallos (x1000)',
		opt_msg_foldSmallPlunder: 'Pregar informes con roubo ou refugallos menores que o límite',
		opt_msg_showPlunder: 'Amosar roubo no informe de espionaxe',
		opt_msg_addButtons: 'Botóns adicionais nas Mensaxes',
		opt_msg_fixColors: 'Arranxar cores dos informes de combate',
		
		opt_fleet_showCapacity: 'Amosar capacidade e velocidade das naves',
		opt_fleet1_showResCalc: 'Amosar calculador de recursos',
		opt_uni_maxPlayerScore: 'O xogador máis forte ten 5M de puntos',
		opt_autocopyCoords: 'Auto copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de calquera páxina (poden quedar memorizados de varios universos de Ogame)',
		opt_fleet2_setTargetDF: 'Se a flota contén recicladores enviar a refugallos',
		opt_fleet2_fixLayout: 'Corrixir a información do voo (páxina 2)',
		opt_fleet2_ShortLinks: 'Accesos rápidos a brancos (páxina 2)',
		opt_fleet2_MoonColor: 'Cor para lúas da lista de accesos rápidos',
		opt_fleet2_MoonsToEnd: 'Mover lúas para o final da lista de accesos rápidos',
		opt_fleet2_expandLists: 'Caixas despregables (Velocidade, Acesos rápidos, SACs)',
		opt_fleet2_checkProbeCapacity: 'Revisar a capacidade das sondas antes de envialas (páxina 2)',
		
		opt_missionPriority: 'Misións prioritarias',
		
		opt_mvmt_expandFleets: 'Amosar a composición e a carga da flota',
		opt_mvmt_showReversal: 'Amosar hora de regreso se é cancelada',
		
		opt_missAttack: 'Cor para a misión: Atacar',
		opt_missColony: 'Cor para a misión: Colonizar',
		opt_missDeploy: 'Cor para a misión: Despregar',
		opt_missDestroy: 'Cor para a misión: Destruir Lúa',
		opt_missEspionage: 'Cor para a misión: Espionaxe',
		opt_missExpedition: 'Cor para a misión: Expedición',
		opt_missFederation: 'Cor para a misión: SAC',
		opt_missHarvest: 'Cor para a misión: Reciclar',
		opt_missHold: 'Cor para a misión: Manter posición',
		opt_missTransport: 'Cor para a misión: Transportar',
		opt_msg_addSimButton: 'Engadir botóns para enviar informes de espionaxe ao',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Despregar',
		lbl_missDestroy: 'Destruir Lúa',
		lbl_missEspionage: 'Espionaxe',
		lbl_missExpedition: 'Expedición',
		lbl_missFederation: 'SAC',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter posición',
		lbl_missTransport: 'Transportar',

		lbl_sectionGeneral: 'Xeral',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Opción de Hora',
		lbl_sectionEventList: 'Lista de Eventos e Phalanx',
		lbl_sectionGalaxy: 'Galaxia',
		lbl_sectionMessages: 'Mensaxes',
		lbl_sectionFleetDispatch: 'Envio de flota',
		lbl_sectionFleetMovement: 'Movemento de flota',
		
		lbl_optionsNote1: 'Esta opción é armacenada só para este universo',
		
		lbl_resetCoords: 'Valeirar - ',
		
		lbl_TotalCapacity: 'Capacidade Total',
		lbl_MinSpeed: 'Velocidade Mínima',
		lbl_ExPoints: 'Puntos de Expedición',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Refugallos',
		lbl_total: 'Total',
		lbl_loot: 'Lote',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'NPC',
		lbl_shipLCargoAlt: 'NGC',
		lbl_shipRecyclerAlt: 'Recis',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Recursos Requeridos',
		lbl_Production: 'Produción',
		lbl_ArrivalACS: 'Chegada (SAC)',
		
		lbl_btnMarkReadAll: 'Marcar todas as mensaxes que se amosan como leídas',
		lbl_btnDeleteSmallPlunder: 'Eliminar informes de espionaxe con roubo < $plunder e refugallos < $debris',
		
		lbl_Moon: 'Lúa',
		
		lbl_onTop: 'Arriba',
		lbl_onBottom: 'Abaixo',
		lbl_onLeft: 'Á Esquerda',
		
		lbl_installNewVersion: 'Clic para instalar a nova versión',
		lbl_Save: 'Salvar',
		lbl_Clear: 'Limpar',
		lbl_Quantity: 'Cantidade',
		lbl_Duration: 'Duracción',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Conta atras'
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