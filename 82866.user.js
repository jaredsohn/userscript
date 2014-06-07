// ==UserScript==
// @name           AntiGam_lang_br
// @namespace      antikiller
// @description    AntiGame translation - Brazilian Portuguese (must be run before main AntiGame)
// @version	1.26.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsBR =
	{
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espionar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Guardar Posições',
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
		lbl_shipBCruiser: 'Interceptador',
		lbl_shipSatellite: 'Satélite Solar',
		
		lbl_defRLauncher: 'Lançador de Mísseis',
		lbl_defLLaser: 'Laser Ligeiro',
		lbl_defHLaser: 'Laser Pesado',
		lbl_defGauss: 'Canhão de Gauss',
		lbl_defIon: 'Canhão de Íons',
		lbl_defPlasma: 'Canhão de Plasma',
		lbl_defSShield: 'Pequeno Escudo Planetário',
		lbl_defLShield: 'Grande Escudo Planetário',
		
		lbl_RequiredEnergy: 'Energia necessária',
		
		rx_sendMail: /Enviar uma mensagem a (.+)\./
		
	}
	
	AntiGame_lang.InterfaceBR =
	{
		opt_languageName: 'Português do Brasil',
	
		opt_title: 'Opções do AntiGame',
		opt_btnOk: 'Confirmar',
		opt_btnCancel: 'Cancelar',
		opt_btnDefault: 'Padrão',

		opt_language: 'Idioma',
		opt_update_check: 'Procurar automaticamente por atualizações',
		opt_thousandSeparator: 'Símbolo de agrupamento de dígitos',
		opt_blockAutoComplete: 'Bloquear auto-completar do Firefox',
		
		opt_showDeficient: 'Mostrar recursos em falta',
		opt_showResources: 'Mostrar informações adicionais de recursos',
		opt_showNames: 'Mostrar nome das naves/edifícios/pesquisas sobre as imagens',
		opt_nameColorOn: 'Cor de nome: Disponível',
		opt_nameColorOff: 'Cor de nome: Indisponível',
		opt_nameColorDisabled: 'Cor de nome: Sem recursos suficientes',
		opt_showConstructionTitle: 'Mostrar título das construções na lista de planetas',
		opt_shortHeader: 'Sempre minimizar imagem do planeta',
		opt_misc_scrollTitle: 'Rolar no título da janela o tempo para o próximo evento',

		opt_uni_reDesigned: 'Universo antigo com re-design instalado',
		opt_uni_SpeedFactor: 'Velocidade do universo',
		opt_uni_DFPercent: 'Porcentagem da estrutura da frota para os destroços',
		opt_uni_DefenseToDF: 'Porcentagem de defesa para os destroços',
		
		opt_timeSetting: 'Mudar valores de horas (apenas horas)',
		opt_showServerOgameClock: 'Manter a hora do servidor no relógio do canto superior direito',
		opt_showServerPhalanx: 'Manter a hora do servidor na vista do Phalanx',
		opt_showPageStartTime: 'Mostrar à hora em que a pagina foi atualizada pela ultima vez',
		opt_timeAMPM: 'Usar formato de 12 horas (AM/PM) ao invés de 24 horas',
		
		opt_timeDontChange: 'Não alterar hora',
		opt_timeLocal: 'Sempre ajustar para o fuso horário local',
		opt_timeServer: 'Sempre ajustar para o fuso horário do servidor',

		opt_killTips: 'Desativar tooltips',

		opt_showEventList: 'Manter a lista de Eventos aberta na Vista Geral',
		opt_evt_showOnTop: 'Posição da lista de Eventos na tela',
		opt_evt_showReduced: 'Lista de Eventos reduzida',
		opt_evt_TimeMode: 'Relógio ou Contagem regressiva na lista de Eventos reduzida',
		opt_evt_noScroll: 'Não mostrar barras de rolagem quando tooltips são exibidos',
		opt_phalanx_showDebris: 'Mostrar destroços teóricos na vista do Phalanx',
		opt_evt_expandFleetsEvt: 'Mostrar composição da frota e recursos (Lista de Eventos)',
		opt_evt_expandFleetsPhal: 'Mostrar composição da frota e recursos (Phalanx)',
		
		opt_galaxyShowRank: 'Mostrar rank dos jogadores/alianças na vista da galáxia',
		opt_galaxyRankColor: 'Cor do rank dos jogadores/alianças',
		opt_galaxyDebrisMin: 'Tamanho mínimo de destroços para realçar (0 para desligar)',
		opt_galaxyDebrisColor: 'Cor dos destroços realçados',
		opt_galaxyHideMoon: 'Substitui a imagem da Lua pelo tamanho',
		opt_galaxy_Players: 'Realçar os seguintes jogadores',
		opt_galaxy_PlayerColors: 'Cor dos jogadores realçados',
		opt_galaxy_Allys: 'Realçar as seguintes alianças',
		opt_galaxy_AllyColors: 'Cor das alianças realçadas',
		opt_galaxy_keepTipsPlanets: 'Manter tooltips para planetas e luas',
		opt_galaxy_keepTipsDebris: 'Manter tooltips para os campos de destroços',
		
		opt_msg_PlunderThreshold: 'Valor mínimo para roubo teórico (x1000)',
		opt_msg_DebrisThreshold: 'Valor mínimo para os destroços teórico (x1000)',
		opt_msg_foldSmallPlunder: 'Apagar relatórios de espionagem como valores de roubo/destroços teóricos abaixo do mínimo',
		opt_msg_showPlunder: 'Mostrar informações de roubo nos relatórios de espionagem',
		opt_msg_addButtons: 'Botões adicionais em Mensagens',
		opt_msg_fixColors: 'Corrigir cores dos relatórios de combate',
		
		opt_fleet_showCapacity: 'Mostrar capacidade e velocidade das naves',
		opt_fleet1_showResCalc: 'Mostrar calculadora de recursos',
		opt_uni_maxPlayerScore: 'O jogador mais forte possui mais de 5M pontos',
		opt_autocopyCoords: 'Auto-copiar coordenadas',
		opt_autocopyGlobal: 'Memorizar coordenadas de qualquer pagina (Não apenas das abas do atual universo do OGame)',
		opt_fleet2_setTargetDF: 'Definir destino Campo de destroços se a frota incluir recicladores',
		opt_fleet2_fixLayout: 'Corrigir o layout da pagina de Envio de Frota II (Pagina 2)',
		opt_fleet2_ShortLinks: 'Atalhos para outros planetas (Pagina 2)',
		opt_fleet2_MoonColor: 'Cor de realce para as luas na lista de destinos',
		opt_fleet2_MoonsToEnd: 'Mover luas para o fim da lista de destinos',
		opt_fleet2_expandLists: 'Expandir caixas de seleção (Velocidade, destinos, ACSs)',
		opt_fleet2_checkProbeCapacity: 'Verificar a capacidade das sondas antes da partida (Pagina 2)',
		
		opt_missionPriority: 'Prioridade das missões',
		
		opt_mvmt_expandFleets: 'Mostrar naves e carga da frota',
		opt_mvmt_showReversal: 'Mostrar hora de chegada se a missão for cancelada',
		
		opt_missAttack: 'Cor da missão: Atacar',
		opt_missColony: 'Cor da missão: Colonizar',
		opt_missDeploy: 'Cor da missão: Transferir',
		opt_missDestroy: 'Cor da missão: Destruir Lua',
		opt_missEspionage: 'Cor da missão: Espionar',
		opt_missExpedition: 'Cor da missão: Expedição',
		opt_missFederation: 'Cor da missão: Ataque de Aliança',
		opt_missHarvest: 'Cor da missão: Reciclar',
		opt_missHold: 'Cor da missão: Guardar Posições',
		opt_missTransport: 'Cor da missão: Transportar',
		opt_msg_addSimButton: 'Adicionar botão para submeter o relatório de espionagem ao site',
		
		lbl_missAttack: 'Atacar',
		lbl_missColony: 'Colonizar',
		lbl_missDeploy: 'Transferir',
		lbl_missDestroy: 'Destruir Lua',
		lbl_missEspionage: 'Espionar',
		lbl_missExpedition: 'Expedição',
		lbl_missFederation: 'Ataque de Aliança',
		lbl_missHarvest: 'Reciclar',
		lbl_missHold: 'Guardar Posições',
		lbl_missTransport: 'Transportar',

		lbl_sectionGeneral: 'Geral',
		lbl_sectionUniverse: 'Universo',
		lbl_sectionTime: 'Configurações de Horas',
		lbl_sectionEventList: 'Lista de Eventos e Phalanx',
		lbl_sectionGalaxy: 'Galáxia',
		lbl_sectionMessages: 'Mensagens',
		lbl_sectionFleetDispatch: 'Envio de frota',
		lbl_sectionFleetMovement: 'Movimento da frota',
		
		lbl_optionsNote1: 'A opção é armazenada apenas para este universo',
		
		lbl_resetCoords: 'Limpar coordenada - ',
		
		lbl_TotalCapacity: 'Capacidade total',
		lbl_MinSpeed: 'Velocidade mínima',
		lbl_ExPoints: 'Pontos de expedição',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'Recursos',
		lbl_debris: 'Destroços',
		lbl_total: 'Total',
		lbl_loot: 'Roubar',
		lbl_metal: 'Metal',
		lbl_crystal: 'Cristal',
		
		lbl_shipSCargoAlt: 'CP',
		lbl_shipLCargoAlt: 'CG',
		lbl_shipRecyclerAlt: 'Recs.',
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