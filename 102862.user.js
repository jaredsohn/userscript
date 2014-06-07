// ==UserScript==
// @name           AntiGam_lang_pt
// @namespace      sinman
// @description    AntiGame translation - Portuguese (PT-PT) (deve ser executado antes do AntiGame)
// @version	1.26.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsPT =
	{
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Exp. Espacial',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar Campo de Destroços',
		lbl_missHold: 'manter posições',
		lbl_missTransport: 'Transportar',
		
		lbl_shipSCargo: 'Cargueiro Pequeno',
		lbl_shipLCargo: 'Cargueiro Grande',
		lbl_shipLFighter: 'Caça Ligeiro',
		lbl_shipHFighter: 'Caça Pesado',
		lbl_shipCruiser: 'Cruzador',
		lbl_shipBattleship: 'Nave de Batalha',
		lbl_shipColonizator: 'Nave de Colonização',
		lbl_shipRecycler: 'Reciclador',
		lbl_shipSpy: 'Sonda de Espionagem',
		lbl_shipBomber: 'Bombardeiro',
		lbl_shipDestroyer: 'Destruidor',
		lbl_shipRIP: 'Estrela da Morte',
		lbl_shipBCruiser: 'Interceptor',
		lbl_shipSatellite: 'Satélite Solar',
		
		lbl_defRLauncher: 'Lançador de Mísseis',
		lbl_defLLaser: 'Laser Ligeiro',
		lbl_defHLaser: 'Laser Pesado',
		lbl_defGauss: 'Canhão de Gauss',
		lbl_defIon: 'Canhão de Iões',
		lbl_defPlasma: 'Canhão de Plasma',
		lbl_defSShield: 'Pequeno Escudo Planetário',
		lbl_defLShield: 'Grande Escudo Planetário',
		
		lbl_RequiredEnergy: 'Energia necessária',

		rx_sendMail: /Enviar uma mensagem a (.+)\./
		
	}
	
	AntiGame_lang.InterfacePT =
	{

		opt_languageName: 'Português',
		
		opt_title: 'Opções do AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Padrão',
		
		opt_language: 'Idioma',
		opt_update_check: 'Procurar automaticamente por actualizações',
		opt_thousandSeparator: 'Símbolo de separação dos milhares',
		opt_blockAutoComplete: 'Bloquear função Auto-Complete do Firefox',
		
		opt_showDeficient: 'Mostrar recursos em falta',
		opt_showResources: 'Mostrar informação adicional de recursos',
		opt_showNames: 'Mostrar nomes das naves/edifícios/tecnologias sobre as imagens',
		opt_nameColorOn: 'Cor de nome: Disponível',
		opt_nameColorOff: 'Cor de nome: Indisponível',
		opt_nameColorDisabled: 'Cor de nome: Sem recursos suficientes',
		opt_showConstructionTitle: 'Mostrar título das construções na lista de planetas',
		opt_shortHeader: 'Minimizar sempre a imagem do planeta',
		opt_misc_scrollTitle: 'Mostrar no título da janela o tempo para o próximo evento',
		
		opt_uni_reDesigned: 'Universo antigo com redesign instalado',
		opt_uni_SpeedFactor: 'Velocidade do universo',
		opt_uni_DFPercent: 'Percentagem da estrutura da frota para os destroços',
		opt_uni_DefenseToDF: 'Percentagem de defesa para os destroços',
		
		opt_timeSetting: 'Mudar valores de horas (apenas horas)',
		opt_showServerOgameClock: 'Manter a hora do servidor no relógio do canto superior direito',
		opt_showServerPhalanx: 'Manter a hora do servidor na vista do Phalanx',
		opt_showPageStartTime: 'Mostrar a hora em que a pagina foi actualizada pela última vez',
		opt_timeAMPM: 'Usar formato de 12 horas (AM/PM) em vez de 24 horas',
		
		opt_timeDontChange: 'Não alterar hora',
		opt_timeLocal: 'Ajustar sempre para o fuso horário local',
		opt_timeServer: 'Ajustar sempre para o fuso horário do servidor',
		
		opt_killTips: 'Desactivar tooltips',
		
		opt_showEventList: 'Manter a lista de Eventos aberta na Vista Geral',
		opt_evt_showOnTop: 'Posição da lista de Eventos na tela',
		opt_evt_showReduced: 'Lista de Eventos reduzida',
		opt_evt_TimeMode: 'Relógio ou Contagem regressiva na lista de Eventos reduzida',
		opt_evt_noScroll: 'Não mostrar barras de rolagem quando tooltips são exibidos',
		opt_phalanx_showDebris: 'Mostrar destroços teóricos na vista do Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar composição da frota e recursos (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar composição da frota e recursos (Phalanx)',
		
		opt_galaxyShowRank: 'Mostrar Rank do jogador/aliança na Vista da Galáxia',
		opt_galaxyRankColor: 'Cor do Rank do jogador/aliança',
		opt_galaxyDebrisMin: 'Tamanho mínimo de Destroços para destacar (0 para desligar)',
		opt_galaxyDebrisColor: 'Cor dos Destroços destacados',
		opt_galaxyHideMoon: 'Substituir imagem da Lua pelo seu tamanho (Km)',
		opt_galaxy_Players: 'Realçar os seguintes jogadores',
		opt_galaxy_PlayerColors: 'Cores para os jogadores realçados',
		opt_galaxy_Allys: 'Realçar as seguintes alianças',
		opt_galaxy_AllyColors: 'Cores para as alianças realçadas',
		opt_galaxy_keepTipsPlanets: 'Manter tooltips para Planetas e Luas',
		opt_galaxy_keepTipsDebris: 'Manter tooltips para os Campos de Destroços',
		
		opt_msg_PlunderThreshold: 'Valor mais baixo para o roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Valor mais baixo para os destroços teóricos (x1000)',
		opt_msg_foldSmallPlunder: 'Oculta relatórios de espionagem com valores de roubo e destroços teóricos abaixo do mínimo',
		opt_msg_showPlunder: 'Mostrar detalhes de roubo nos Relatórios de Espionagem',
		opt_msg_addButtons: 'Botões adicionais nas Mensagens',
		opt_msg_fixColors: 'Mudar cores dos Relatórios de Combate',
		
		opt_fleet_showCapacity: 'Mostrar capacidade e velocidade das naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'O jogador mais forte possui mais de 5M pontos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de qualquer pagina (Não apenas das abas do actual universo do OGame)',
		opt_fleet2_setTargetDF: 'Definir destino "Campo de Destroços" se a frota incluir Recicladores',
		opt_fleet2_fixLayout: 'Corrigir o layout da página de briefing (página 2)',
		opt_fleet2_ShortLinks: 'Atalhos para outros planetas (página 2)',
		opt_fleet2_MoonColor: 'Cor de realce para as luas na lista de destinos',
		opt_fleet2_MoonsToEnd: 'Mover luas para o fim da lista de destinos',
		opt_fleet2_expandLists: 'Expandir caixas de selecção (Velocidade, destinos, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Verificar a capacidade das sondas antes da partida (página 2)',
				
		opt_missionPriority: 'Prioridade das missões',
		
		opt_mvmt_expandFleets: 'Mostrar naves e carga da frota',
		opt_mvmt_showReversal: 'Mostrar hora de chegada se a missão for cancelada',
		
		opt_missAttack: 'Cor da Missão: Atacar',
		opt_missColony: 'Cor da Missão: Colonizar',
		opt_missDeploy: 'Cor da Missão: Transferir',
		opt_missDestroy: 'Cor da Missão: Destruir Lua',
		opt_missEspionage: 'Cor da Missão: Espiar',
		opt_missExpedition: 'Cor da Missão: Expedição',
		opt_missFederation: 'Cor da Missão: Ataque de Aliança',
		opt_missHarvest: 'Cor da Missão: Reciclar',
		opt_missHold: 'Cor da Missão: Manter Posição',
		opt_missTransport: 'Cor da Missão: Transportar',
		opt_msg_addSimButton: 'Adicionar botão para submeter o relatório de espionagem ao site do WebSim',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espiar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Manter Posição',
		lbl_missTransport: 'Transportar',
		
		lbl_sectionGeneral: 'Geral',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configurações de Horas',
		lbl_sectionEventList: 'Lista de Eventos e Phalanx',
		lbl_sectionGalaxy: 'Galáxia',
		lbl_sectionMessages: 'Mensagens',
		lbl_sectionFleetDispatch: 'Envido de Frota',
		lbl_sectionFleetMovement: 'Movimento da Frota',
		
		lbl_optionsNote1: 'Esta opção será guardada apenas para este universo',
		
		lbl_resetCoords: 'Limpar coordenada - ',
		
		lbl_TotalCapacity: 'Capacidade Total',
		lbl_MinSpeed: 'Velocidade mínima',
		lbl_ExPoints: 'Pontos de expedição',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Destroços',
		lbl_total: 'Total',
		lbl_loot: 'Roubo',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'Recursos em falta',
		lbl_Production: 'Produção',
		lbl_ArrivalACS: 'Chegada (ACS)',
	
		lbl_btnMarkReadAll: 'Marcar todas as mensagens como lidas',
		lbl_btnDeleteSmallPlunder: 'Apagar relatórios de espionagem com roubo < $plunder e destroços < $debris',
		
		lbl_Moon: 'Lua',
		
		lbl_onTop: 'Em cima',
		lbl_onBottom: 'Em baixo',
		lbl_onLeft: 'À esquerda',
		
		lbl_installNewVersion: 'Clique para instalar a nova versão',
		lbl_Save: 'Salvar',
		lbl_Clear: 'Limpar',
		lbl_Quantity: 'Quantidade',
		lbl_Duration: 'Duração',
		lbl_Consumption: 'Consumo',
		
		lbl_tmTime: 'Hora',
		lbl_tmCountdown: 'Contagem regressiva'
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
