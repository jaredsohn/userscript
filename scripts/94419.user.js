// ==UserScript==
// @name           xVx LBS
// @description    xVx
// @namespace      xVx
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.2.28
// @require        http://sizzlemctwizzle.com/updater.php?id=94419&days=1
// ==/UserScript==
//This script just as a pt language string added for use on a pt server from thre LoU BoS
(function(){

var main = function() {

var DEBUG_VERSION = true;

qx.Class.define("bos.Const", {
	statics: {
		TRADE_TRANSPORT_CART: 1,
		TRADE_TRANSPORT_SHIP: 2,
		TRADE_TRANSPORT_CART_FIRST: 3,
		TRADE_TRANSPORT_SHIP_FIRST: 4,
		
		CART_CAPACITY: 1000,
		SHIP_CAPACITY: 10000,
		
		TRADE_STATE_TRANSPORT: 1,
		TRADE_STATE_RETURN: 2,

		GOLD: 0,
		WOOD: 1,
		STONE: 2,
		IRON: 3,
		FOOD: 4,

		ORDER_ATTACK: 0,
		ORDER_DEFEND: 1,
		ORDER_SUPPORT: 2,

		MOONSTONE_COST: 1000,
		
		TABLE_SUMMARY_ROW_BORDER: "2px solid #E8D3AE",
		TABLE_BORDER: "1px dotted rgb(77, 79, 70)",
		TABLE_DEFAULT_COLOR: "#F3D298",
		RESOURCE_GREEN: "#40C849",
		RESOURCE_YELLOW: "#FFE400",
		RESOURCE_RED: "#FF0000",
		
		INF: 1000000000,
		
		REGION_CITY: 0,
		REGION_CASTLE: 1,
		REGION_LAWLESS_CITY: 2,
		REGION_LAWLESS_CASTLE: 3,
		REGION_RUINS: 4,
		REGION_UNKNOWN: 5,

		EXTRA_WIDE_OVERLAY: 999,
		
		FAKE_ATTACK_TS: 1000,
		
		//flood control
		MIN_SEND_COMMAND_INTERVAL: 500,
		
		MAX_POPUPS: 10
	}
});

var server;
var locale = qx.locale.Manager.getInstance().getLocale();

var bosLocalizedStrings = {
  "pt": {
	"summary": "Resumo",
	"combat calculator": "Calcular Combates",
	"food calculator": "Calcular Comida",
	"recruitment speed calculator": "Calcular Velocidade de Recrutamento",
	"jump to coords": "Ir para Coordenadas",
	"jump to city": "Ir para Cidade",
	"please enter city coordinates": "Por favor insere as coordenadas da cidadde (por examplo 12:34) :",
	"jump to player": "Ir para jogador",
	"please enter player name:": "Por favor inserer o nome do jogador:",
	"jump to alliance": "Ir para a Aliança",
	"please enter alliance name:": "Por favor insere o nome da aliança:",
	"error during BOS Tools menu creation: ": "Erro ao criar o menu xVx BOS Tools: ",
	"id": "Id", 
	"cityId": "Id da Cidade", 
	"from": "De", 
	"type": "Tipo", 
	"transport": "Transporte", 
	"state": "Estado", 
	"start": "Iniciar", 
	"end": "Terminar", 
	"position": "Posição", 
	"target": "Alvo", 
	"lastUpdated": "Ultima Actualização", 
	"resources": "Recursos",
	"filter by trade type": "Filtrar por: <b>Tipo de Troca</b>",
	"filter by: transport type": "Filtrar por:: <b>Tipo de Transporte</b>",
	"filter by: resources receiver": "Filtrar por: <b>Destinatário de Recursosr</b>",
	"you": "Tu",
	"someone else": "Outros",
	"filter by: state": "Filtrar por:: <b>Estado</b>",
	"trade route": "Rota de troca",
	"OK": "OK",
	"clear": "Limpar",
	"max": "Max",
	"please enter some resources amount": "Por favor introduz o valor de recursos",
	"invalid destination": "Destino Inválido",
	"to": "Para",
	"ships then carts": "Barcos depois Carroças",
	"carts then ships": "Carroças depois Barcos",
	"only carts": "Só Carroças",
	"only ships": "Só Barcos",
	"group": "Grupo",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Rotas de Troca",
	"fromTo": "De/Para",
	"action": "Acção",
	"status": "Estado",
	"wood": "Madeira", 
	"stone": "Pedra", 
	"iron": "Ferro", 
	"food": "Comida", 
	"land/sea": "Terra/Mar", 
	"edit": "Editar",	
	"options": "Opções",
	"table settings": "Configurações da Tabela",
	"load table settings at start": "Carregar a tabela de configurações no  inicio",
	"table name": "Nome da TAbela",
	"cities": "Cidades",
	"military": "Militar",
	"btnLoadTableSettings": "Carregar Tabela de Configurações",
	"btnLoadTableSettings_toolTip": "Carrega a tabeal guardada previamente (column order, widths, visibility, sort order)",
	"btnSaveTableSettings": "Guarda a Tabela de Configurações",
	"btnSaveTableSettings_toolTip": "Guarda a Tabela de Configurações: column order, widths, visibility, sort order.<br/>Ainda precisas de carregar <b>Botão Salvar</b> para fazer persistir as alterações nas através das sessões",
	"saving cities data": "A Salvar os dados das Cidades",
	"cbPersistCities": "Salvar dados das cidades",
	"cbPersistCities_toolTip": "Após a navegação para a próxima cidade a cidade anterior é guardada para a cache do browzer.",
	"cbLoadPersistedCitiesAtStart": "Carregar cidades guardadas ano inicio do jogo",
	"btnLoadCities": "Carregar cidades guardadas manualmente",
	"btnLoadCities_toolTip": "Cidades guardadas na sessão anterior carregadas manualmente",
	"btnDeleteAllSavedData": "Apagar todos os dados guardados",
	"btnDeleteAllSavedData_confirmation": "Todos os dados guardados foram apagados",
	"persistHelp": "Quando o browser fechar todos os dados acerca das cidades visitadasa serão perdidos. Devido a isso na p´rxima sessão o sumário não terá muitos dados para apresentar. Para uma melhora experiencia de jogo existe a possibilidade de guardar de forma persistente na cache do browser todos os dados acerca das cidades visitadas e carregalas manual ou automaticamente a cada sessão de forma a aparecerem no Resumo. Este recurso funciona melhor se utilizado em conjunto com o Botão de 'Actualizar Recursos'.",	
	"all": "Todos",
	"building": "Edificio",
	"castles": "Castelos",
	"defensive": "Defensivo",
	"warehouses": "Armazens",
	"moonstones": "Torres de Luar",
	"gold": "Ouro",
	"name": "Nome",
	"reference": "Referencia",
	"btnRefreshResources": "Actualizar Recursos",
	"btnRefreshResources_toolTip": "Uses 'Request resources' functionality to get current resource levels.<br/>It won't be able to fetch information about cities without any <b>available</b> cart or ship.<br/>Processing request can take some time because it waits until server will respond.<br>Resources refreshed at: never",	
	"purify resources": "Purificar Recursos",
	"btnPurifyAll": "Puricar Todos",
	"btnPurifyAll_toolTip": "Purify resources for cities with <b>marked Moonglow Tower</b>.<br/>When Building Minister is present it will try not to purify food in city with negative food balance or in castles.<br/>If there is no Building Minister then it will skip castles.",
	"confirmation": "Confirmação",
	"are you sure?": "Tens certeza?",
	"btnMarkMoonglowTower": "Marcar Torre de Luar",
	"btnMarkMoonglowTower_toolTip": "Procura a <b>Torre de Luar</b> na cidade actual  e guarda-a o seu id para utilizar mais tarde",
	"btnUnmarkMoonglowTower": "Desmarcar Torre de Luar Moonglow Tower",
	"btnUnmarkMoonglowTower_toolTip": "Desmarca a <b>Torre de Luar</b> previamente selecionada na cidade actual",
	"help": "Ajuda",	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. put *M* in city reference, by doing so city will be displayed in table below<br/>2. mark Moonglow Tower in cities enabled for 'Purify All'<br/>3. Use Purify all button or click in cell one of purified resource types",
	"purifiable": "Purificável",
	"darkwood": "Madeira Negra",
	"runestone": "Pedra de Runa",
	"veritum": "Veritum",
	"trueseed": "Semente de Vera",
	"refresh": "Actualizar",
	"sbSourceContinent_toolTip": "Filtrar por: <b>Continente de origem</b>",
	"sbDestinationContinent_toolTip": "Filter by: <b>Continente de destino</b>",
	"defender": "Defensor",
	"attacker": "Atacante",
	"btnUpdateView_toolTip": "Actualizar Vista",
	"cbShowFakeAttacks": "Mostrar Falsos Ataques",
	"cbShowFakeAttacks_toolTip": "Falso ataque é : pilhagem, cerco ou assalto com  TS < 1000",
	"unit orders": "Ordens da Unidade",
	"incoming attacks": "Ataques a caminho",
	"btnCsvExport": "Exportar para Csv",
	"you need to be in city": "Tens de estar numa cidade",
	"food calculator": "Calcular Comida",
	"mass recruitment": "Recrutamento em Massa",
	"bos.gui.MassRecruitmentPage.help": "Currentemente requer Ministros de Consturção e de Guerra. Persisting of cities and loading them on start have to be enabled or there will be popups saying to visit some city. Recruitment time is updated when enabling city for mass recruitment, if it changes enable it again. List of error codes:", 
	"bos.gui.MassRecruitmentPage.help2": "I - Invalido, R - Recursos insuficientes, Q - Fila de recrutamento cheia, T - Limite de Tropas Excedido, B - Falta Edificio, G - Ouro Insuficiente",
	"city/order": "Cidade / Ordens",
	"missing": "Não Encontrado",
	"resourcesFor": "Recursos para",
	"recruiting": "Recrutamento",
	"available": "Disponivel",
	"btnEnableMassRecruitment": "Activar",
	"btnEnableMassRecruitment_toolTip": "Activa o recrutamento em massa para esta cidade",
	"btnDisableMassRecruitment": "Desactivar",
	"btnDisableMassRecruitment_toolTip": "Desactiva o recrutamento em massa para esta cidade",
	"recruitmentTime": "Tempo de Recrutamento [s]",
	"btnRefreshView": "Actualizar",
	"btnRefreshView_toolTip": "Actualziar Vista",
	"btnRecruitAll": "Recrutar Todos",
	"btnRecruitAll_toolTip": "Recrutar todas as unidades possiveis",
	"filter by: city types": "Filtrar por: <b>cTipo de cidade</b>",
	"purify": "Purificar",
	"recruitment": "Recrutamento",
	"carts": "Carroças",
	"orders": "Ordens",
	"wood/h": "Madeira/h",
	"woodMax": "Máx Madeira",
	"woodFree": "Madeira livre",					
	"woodIncoming": "Madeira a chegar",
	"woodFullAt": "Madeira cheia a",
	"stone/h": "Pedra/h",
	"stoneMax": "Max de Pedra",
	"stoneFree": "Pedra Livre",					
	"stoneIncoming": "Pedra a chegar",
	"stoneFullAt": "Pedra cheia a",
	"iron/h": "Ferro/h",
	"ironMax": "Max de Ferro",
	"ironFree": "Ferro Livre",					
	"ironIncoming": "Ferro a chegar",
	"ironFullAt": "Ferro cheio a",
	"food/h": "Comida/h",
	"foodMax": "Max de Comida",
	"foodFree": "Comida Livre",					
	"foodIncoming": "Comida a chegar",
	"foodFullAt": "Comida cheia a",
	"gold/h": "Ouro/h",
	"ships": "Baros",
	"buildQueue": "Fila de Construção",
	"unitQueue": "Fila de Militar",	
	"cbTweakMarkersAtStart": "Alterar Marcadores no inicio",
	"cbTweakMarkersAtStart_toolTip": "Quando a opção é marcada os marcadores são alterados no inicio",
	"cbTweakReportAtStart": "Alterar Marcadores no inicio",
	"cbTweakReportAtStart_toolTip": "Quando a opção é marcada os marcadores são alterados no inicio",
	"recruit": "Recrutar",
	"in city:": "Recruitado: ",
	"add city units": "Adicionar unidades da cidade",
	"purify options": "Opções de Purificação",
	"cbIncludeCastles": "Incluir Castelos",
	"cbIncludeCastles_toolTip": "Includes castles in mass purification.<br/>Without Building Minister it won't purify food in castle, with minister it can purify food as long as food balance is > 0",
	"cbUseRecruitmentData": "Utilizar a tabela de Recrutamento",
	"cbUseRecruitmentData_toolTip": "Uses <strong>Recruitment</strong> tab data to check if some resource type is needed in castle to recruit missing troops",
	"btnPurifyOptions": "Opções",
	
	"": ""
  },
  "en": {
	"summary": "Summary",
	"combat calculator": "Combat calculator",
	"food calculator": "Food calculator",
	"recruitment speed calculator": "Recruitment speed calculator",
	"jump to coords": "Jump to coords",
	"jump to city": "Jump to city",
	"please enter city coordinates": "Please enter city coordinates (for example 12:34) :",
	"jump to player": "Jump to player",
	"please enter player name:": "Please enter player name:",
	"jump to alliance": "Jump to alliance",
	"please enter alliance name:": "Please enter alliance name:",
	"error during BOS Tools menu creation: ": "Error during BOS Tools menu creation: ",
	"id": "Id", 
	"cityId": "City Id", 
	"from": "From", 
	"type": "Type", 
	"transport": "Transport", 
	"state": "State", 
	"start": "Start", 
	"end": "End", 
	"position": "Position", 
	"target": "Target", 
	"lastUpdated": "Last Updated", 
	"resources": "Resources",
	"filter by trade type": "Filter by: <b>trade type</b>",
	"filter by: transport type": "Filter by: <b>transport type</b>",
	"filter by: resources receiver": "Filter by: <b>resources receiver</b>",
	"you": "You",
	"someone else": "Someone else",
	"filter by: state": "Filter by: <b>state</b>",
	"trade route": "Trade route",
	"OK": "OK",
	"clear": "Clear",
	"max": "Max",
	"please enter some resources amount": "Please enter some resources amount",
	"invalid destination": "Invalid destination",
	"to": "To",
	"ships then carts": "Ships then carts",
	"carts then ships": "Carts then ships",
	"only carts": "Only carts",
	"only ships": "Only ships",
	"group": "Group",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Trade Routes",
	"fromTo": "From/To",
	"action": "Action",
	"status": "Status",
	"wood": "Wood", 
	"stone": "Stone", 
	"iron": "Iron", 
	"food": "Food", 
	"land/sea": "Land/Sea", 
	"edit": "Edit",	
	"options": "Options",
	"table settings": "Table settings",
	"load table settings at start": "Load tables settings at start",
	"table name": "Table name",
	"cities": "Cities",
	"military": "Military",
	"btnLoadTableSettings": "Load table settings",
	"btnLoadTableSettings_toolTip": "Loads previously saved table settings (column order, widths, visibility, sort order)",
	"btnSaveTableSettings": "Save table settings",
	"btnSaveTableSettings_toolTip": "Saves table settings: column order, widths, visibility, sort order.<br/>You still need to click <b>Save button</b> to persist your settings across sessions",
	"saving cities data": "Saving cities data",
	"cbPersistCities": "Save cities data",
	"cbPersistCities_toolTip": "After navigating to next city previous city is saved to browser local storage.",
	"cbLoadPersistedCitiesAtStart": "Load saved cities data at game start",
	"btnLoadCities": "Manually load saved cities data",
	"btnLoadCities_toolTip": "Manually loads cities data saved during previous game sessions",
	"btnDeleteAllSavedData": "Delete all saved data",
	"btnDeleteAllSavedData_confirmation": "All saved data has been deleted",
	"persistHelp": "When web browser session ends all data about visited cities are lost. Because of that on next game session summary widget doesn't contain a lot data. To enable better game experience there is possibility to save in persistent browser storage all data about visited cities and load them manually or automaticaly before showing summary. This feature works best if used together with 'Refresh resources' button.",	
	"all": "All",
	"building": "Building",
	"castles": "Castles",
	"defensive": "Defensive",
	"warehouses": "Warehouses",
	"moonstones": "Moonstones",
	"gold": "Gold",
	"name": "Name",
	"reference": "Reference",
	"btnRefreshResources": "Refresh resources",
	"btnRefreshResources_toolTip": "Uses 'Request resources' functionality to get current resource levels.<br/>It won't be able to fetch information about cities without any <b>available</b> cart or ship.<br/>Processing request can take some time because it waits until server will respond.<br>Resources refreshed at: never",	
	"purify resources": "Purify Resources",
	"btnPurifyAll": "Purify All",
	"btnPurifyAll_toolTip": "Purify resources for cities with <b>marked Moonglow Tower</b>.<br/>When Building Minister is present it will try not to purify food in city with negative food balance or in castles.<br/>If there is no Building Minister then it will skip castles.",
	"confirmation": "Confirmation",
	"are you sure?": "Are you sure?",
	"btnMarkMoonglowTower": "Mark Moonglow Tower",
	"btnMarkMoonglowTower_toolTip": "Finds in current city <b>Moonglow Tower</b> and saves it's id for later use",
	"btnUnmarkMoonglowTower": "Unmark Moonglow Tower",
	"btnUnmarkMoonglowTower_toolTip": "Unmarks previously saved <b>Moonglow Tower</b> in current city",
	"help": "Help",	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. put *M* in city reference, by doing so city will be displayed in table below<br/>2. mark Moonglow Tower in cities enabled for 'Purify All'<br/>3. Use Purify all button or click in cell one of purified resource types",
	"purifiable": "Purifiable",
	"darkwood": "Darkwood",
	"runestone": "Runestone",
	"veritum": "Veritum",
	"trueseed": "Trueseed",
	"refresh": "Refresh",
	"sbSourceContinent_toolTip": "Filter by: <b>source continent</b>",
	"sbDestinationContinent_toolTip": "Filter by: <b>destination continent</b>",
	"defender": "Defender",
	"attacker": "Attacker",
	"btnUpdateView_toolTip": "Refresh View",
	"cbShowFakeAttacks": "Show fake attacks",
	"cbShowFakeAttacks_toolTip": "Fake attack is: plunder or siege or assault with TS < 1000",
	"unit orders": "Unit Orders",
	"incoming attacks": "Incoming attacks",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "You need to be in city",
	"food calculator": "Food calculator",
	"mass recruitment": "Mass Recruitment",
	"bos.gui.MassRecruitmentPage.help": "Currently requires Building Minister and War Minister. Persisting of cities and loading them on start have to be enabled or there will be popups saying to visit some city. Recruitment time is updated when enabling city for mass recruitment, if it changes enable it again. List of error codes:", 
	"bos.gui.MassRecruitmentPage.help2": "I - Invalid, R - not enough Resources, Q - recruitment Queue is full, T - Troop limit exceeded, B - missing Building, G - not enough Gold",
	"city/order": "City / Orders",
	"missing": "Missing",
	"resourcesFor": "Resources for",
	"recruiting": "Recruiting",
	"available": "Available",
	"btnEnableMassRecruitment": "Enable",
	"btnEnableMassRecruitment_toolTip": "Enables current city for mass recruitment",
	"btnDisableMassRecruitment": "Disable",
	"btnDisableMassRecruitment_toolTip": "Disables current city from mass recruitment",
	"recruitmentTime": "Recruitment Time [s]",
	"btnRefreshView": "Refresh",
	"btnRefreshView_toolTip": "Refresh View",
	"btnRecruitAll": "Recruit All",
	"btnRecruitAll_toolTip": "Recruits all possible units",
	"filter by: city types": "Filter by: <b>city types</b>",
	"purify": "Purify",
	"recruitment": "Recruitment",
	"carts": "Carts",
	"orders": "Orders",
	"wood/h": "Wood/h",
	"woodMax": "Wood max",
	"woodFree": "Wood free",					
	"woodIncoming": "Wood incoming",
	"woodFullAt": "Wood full at",
	"stone/h": "Stone/h",
	"stoneMax": "Stone max",
	"stoneFree": "Stone free",					
	"stoneIncoming": "Stone incoming",
	"stoneFullAt": "Stone full at",
	"iron/h": "Iron/h",
	"ironMax": "Iron max",
	"ironFree": "Iron free",					
	"ironIncoming": "Iron incoming",
	"ironFullAt": "Iron full at",
	"food/h": "Food/h",
	"foodMax": "Food max",
	"foodFree": "Food free",					
	"foodIncoming": "Food incoming",
	"foodFullAt": "Food full at",
	"gold/h": "Gold/h",
	"ships": "Ships",
	"buildQueue": "Build Queue",
	"unitQueue": "Unit Queue",	
	"cbTweakMarkersAtStart": "Tweak markers at start",
	"cbTweakMarkersAtStart_toolTip": "When option is checked markers are tweaked at start",
	"cbTweakReportAtStart": "Tweak reports at start",
	"cbTweakReportAtStart_toolTip": "When option is checked reports are tweaked at start",
	"recruit": "Recruit",
	"in city:": "Recruited: ",
	"add city units": "Add city units",
	"purify options": "Purify Options",
	"cbIncludeCastles": "Include castles",
	"cbIncludeCastles_toolTip": "Includes castles in mass purification.<br/>Without Building Minister it won't purify food in castle, with minister it can purify food as long as food balance is > 0",
	"cbUseRecruitmentData": "Uses Recruitment tab data",
	"cbUseRecruitmentData_toolTip": "Uses <strong>Recruitment</strong> tab data to check if some resource type is needed in castle to recruit missing troops",
	"btnPurifyOptions": "Options",
	
	"": ""
  },
  "de": {
	"summary": "Übersicht",
	"combat calculator": "Kampf Kalkulator",
	"food calculator": "Nahrungsberechner",
	"recruitment speed calculator": "Rekrutiergeschwinigkeitsberechnung",
	"jump to coords": "Gehe zu",
	"jump to city": "Gehe zu City",
	"please enter city coordinates": "Bitte gebe Stadtkoordinaten (z.B.: 12:34) ein",
	"jump to player": "Gehe zu Spieler",
	"please enter player name:": "Bitte gebe einen Spielernamen ein",
	"jump to alliance": "Gehe zu Allianz",
	"please enter alliance name:": "Bitte gib den Namen der Allianz ein",
	"error during BOS Tools menu creation: ": "Error bei der Erstellung des BOS-Tool Menüs:",
	"id": "Id", 
	"cityId": "Stadt Id", 
	"from": "von", 
	"type": "Handelstyp", 
	"transport": "Transporttyp", 
	"state": "Status", 
	"start": "Aufbruchszeit", 
	"end": "Ankunft", 
	"position": "Pos", 
	"target": "Ziel", 
	"lastUpdated": "Zuletzt aktualisiert", 
	"resources": "Ressourcen",
	"filter by trade type": "Filtere nach <b>Transportart</b> ",
	"filter by: transport type": "Filtere nach <b>Transporttyp</b>",
	"filter by: resources receiver": "Filtere nach <b>Ressourcenempfänger</b>",
	"you": "Du",
	"someone else": "Jemand andres",
	"filter by: state": "Filtere nach <b>Status</b>",
	"trade route": "Handelsroute",
	"OK": "OK",
	"clear": "Löschen",
	"max": "Max",
	"please enter some resources amount": "Bitte gib die Anzahl der Ressourcen ein",
	"invalid destination": "Ungültiges Ziel",
	"to": "zu",
	"ships then carts": "Schiffe über Karren", /* 100% accurate translation would be "erst Handelschiffe, dann Marktkarren" there was soneone else who  
	translated things too maybe you should let him check what to do*/
	"carts then ships": "Karren vor Schiffen", /*same as above just inversed*/
	"only carts": "Nur Karren",
	"only ships": "Nur Schiffe",
	"group": "Gruppe",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Handelsrouten",
	"fromTo": "Von/Zu",
	"action": "Aktion",
	"status": "Status",
	"wood": "Holz", 
	"stone": "Stein", 
	"iron": "Eisen", 
	"food": "Nahrung", 
	"land/sea": "Land/See", 
	"edit": "Bearbeiten",
	
	"options": "Optionen",
	"table settings": "Tabelleneinstellungen",
	"load table settings at start": "Lade Tabelleneinstellungen beim Start",
	"table name": "Tabellenname",
	"cities": "Städte",
	"military": "Militär",
	"btnLoadTableSettings": "Lade Tabelleneinstellungen",
	"btnLoadTableSettings_toolTip": "Lädt die (vorher) gespeicherten Einstellungen für die Tabelle (Spaltenordnung, Spaltenbreite, angezeigte Felder, Sortierordnung",
	"btnSaveTableSettings": "Speichern der Tabelleneigenschaften",
	"btnSaveTableSettings_toolTip": "Speichert die Tabelleneigenschaften: Spaltenordnung, Spaltenbreite, Angezeigte Spalten, Sortierordnung.<br/>Um die Einstellungen beim nächsten Mal benutzen zu können, musst du den <b>'Speichern der Tabelleneigenschaften' Button</b> klicken",
	"saving cities data": "Speichern der Stadtdaten",
	"cbPersistCities": "Speicher Stadtdaten",
	"cbPersistCities_toolTip": "Wenn du zur nächsten Stadt wechselst, werden die Daten der vorherigen im lokalen Speicher des Browers gespeichert.",
	"cbLoadPersistedCitiesAtStart": "Lade gespeicherte Stadtdaten beim Start des Spieles",
	"btnLoadCities": "Lade gespeicherte Stadtdaten manuell",
	"btnLoadCities_toolTip": "Läd manuell die Stadtdaten einer verherigen LoU-Session ",
	"btnDeleteAllSavedData": "Lösche alle gespeicherten Daten",
	"btnDeleteAllSavedData_confirmation": "Alle gespeicherten Daten wurden gelöscht!",
	"persistHelp": "Wenn Lord of Ultima beendet wird gehen alle Daten der besuchten Städte verloren. Deswegen sind beim nächsten Start von LoU nicht viele bzw. keine Daten im der Tabelle. Dies kann man verhindern, indem man die Daten der Städte im lokalen Speicher des Browsers speichert und sie automatisch oder manuell laden lässt. Diese Einstellung funktioniert am besten, wenn sie zusammen mit `Ressourcen aktualisieren` verwendet wird.",	
	"all": "Alle",
	"building": "In Bau/Aufbau",
	"castles": "Burgen",
	"defensive": "Defensive",
	"warehouses": "Lager",
	"moonstones": "Mondsteine",
	"gold": "Geld",
	"name": "Name",
	"reference": "Referenz",
	"btnRefreshResources": "Ressourcen aktualisieren",
	"btnRefreshResources_toolTip": "Benutzt die 'Request resources' Funktion umd die momentanen Ressourcen der Städte zu bekommen.<br/>Dies funktioniert nur bei Städten mit <b>vorhandenen</b> Marktkarren oder Handelsschiffen.<br/>Das sammeln aller Ressourcen kann einige Zeit dauern, da immer auf Antwort des Servers gewartet wird.<br/>Ressourcen wurden aktualisiert am: nie",	
	"purify resources": "Ressourcen veredeln",
	"btnPurifyAll": "Veredele alle",
	"btnPurifyAll_toolTip": "Veredelt Ressurcen in Städten mit <b>markiertem Mondschein-Turm</b>.<br/>Falls ein Bauminister aktiv ist, so wird versucht keine Ressurcen zu veredeln in Städten/Burgen mit negativer Nahrungbalance.<br/>Wenn kein Bauminister aktiv ist werden Burgen übersprungen.",
	"confirmation": "Bestätigung",
	"are you sure?": "Bist du sicher?",
	"btnMarkMoonglowTower": "Markiere einen Mondschein-Turm",
	"btnMarkMoonglowTower_toolTip": "Sucht in der Stadt nach einem <b>Mondschein-Turm</b> und speichert die ID für die weitere Benutzung",
	"btnUnmarkMoonglowTower": "Lösche Mondstein-Turm Markierung",
	"btnUnmarkMoonglowTower_toolTip": "Löscht alle markierten<b>Mondstein-Türme</b> in dieser Stadt<br/>",
	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. put *M* in city reference, by doing so city will be displayed in table below<br/>2. mark Moonglow Tower in cities enabled for 'Purify All'<br/>3. Use Purify all button or click in cell one of purified resource types",
	"purifiable": "Purifiable",
	"darkwood": "Darkwood",
	"runestone": "Runestone",
	"veritum": "Veritum",
	"trueseed": "Trueseed",	
	"refresh": "Aktualisieren",
	"sbSourceContinent_toolTip": "Filter by: <b>source continent</b>",
	"sbDestinationContinent_toolTip": "Filter by: <b>destination continent</b>",
	"defender": "Verteidiger",
	"attacker": "Angreifer",
	"btnUpdateView_toolTip": "Refresh View",
	"cbShowFakeAttacks": "Show fake attacks",
	"cbShowFakeAttacks_toolTip": "Fake attack is: plunder or siege or assault with TS < 1000",	
	"unit orders": "Unit Orders",
	"incoming attacks": "Eingehende Angriffe",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!", 
	"food calculator": "Food Kalkulator",
	"mass recruitment": "Mass Recruitment",
	"bos.gui.MassRecruitmentPage.help": "Currently requires Building Minister and War Minister. Persisting of cities and loading them on start have to be enabled or there will be popups saying to visit some city. Recruitment time is updated when enabling city for mass recruitment, if it changes enable it again. List of error codes:",
	"bos.gui.MassRecruitmentPage.help2": "I - Invalid, R - not enough Resources, Q - recruitment Queue is full, T - Troop limit exceeded, B - missing Building, G - not enough Gold",	
	"city/order": "City / Orders",
	"missing": "Missing",
	"resourcesFor": "Resources for",
	"recruiting": "Recruiting",
	"available": "Available",
	"btnEnableMassRecruitment": "Enable",
	"btnEnableMassRecruitment_toolTip": "Enables current city for mass recruitment",
	"btnDisableMassRecruitment": "Disable",
	"btnDisableMassRecruitment_toolTip": "Disables current city from mass recruitment",	
	"recruitmentTime": "Recruitment Time [s]",
	"btnRefreshView": "Refresh",
	"btnRefreshView_toolTip": "Refresh View",
	"btnRecruitAll": "Recruit All",
	"btnRecruitAll_toolTip": "Recruits all possible units",
	"filter by: city types": "Filter by: <b>city types</b>",
	"purify": "Purify",
	"recruitment": "Recruitment",
	"carts": "Karren",
	"orders": "Orders",
	"wood/h": "Holz/h",
	"woodMax": "max. Holz",
	"woodFree": "freie Holzkapazität",					
	"woodIncoming": "Holz incoming",
	"woodFullAt": "Wood full at",
	"stone/h": "Stein/h",
	"stoneMax": "max. Stein",
	"stoneFree": "freie Steinkapazität",					
	"stoneIncoming": "Stein incoming",
	"stoneFullAt": "Stein full at",
	"iron/h": "Eisen/h",
	"ironMax": "max. Eisen",
	"ironFree": "freie Eisenkapazität",					
	"ironIncoming": "Eisen incoming",
	"ironFullAt": "Eisen full at",
	"food/h": "Nahrung/h",
	"foodMax": "max. Nahrung",
	"foodFree": "freie Nahrungskapazität",					
	"foodIncoming": "Nahrung incoming",
	"foodFullAt": "Nahrung full at",
	"gold/h": "Gold/h",
	"ships": "Handelsschiffe",
	"buildQueue": "Bauliste",
	"unitQueue": "Rekrutierliste",
	"cbTweakMarkersAtStart": "Tweak Marker beim Start",
	"cbTweakMarkersAtStart_toolTip": "When option is checked markers are tweaked at start",
	"cbTweakReportAtStart": "Tweak Report beim Start",
	"cbTweakReportAtStart_toolTip": "When option is checked reports are tweaked at start",
	"recruit": "Recruit",
	"in city:": "Recruited: ",
	"add city units": "Add city units",
	"purify options": "Purify Options",
	"cbIncludeCastles": "Include castles",
	"cbIncludeCastles_toolTip": "Includes castles in mass purification.<br/>Without Building Minister it won't purify food in castle, with minister it can purify food as long as food balance is > 0",
	"cbUseRecruitmentData": "Uses Recruitment tab data",
	"cbUseRecruitmentData_toolTip": "Uses <strong>Recruitment</strong> tab data to check if some resource type is needed in castle to recruit missing troops",
	"btnPurifyOptions": "Options",
	
	
	"": ""
  }  
};

function tr(messageId) {
	var locale = qx.locale.Manager.getInstance().getLocale();

	if (bosLocalizedStrings[locale][messageId] != undefined) {
		return bosLocalizedStrings[locale][messageId];
	}
	
	if (bosLocalizedStrings["en"][messageId] != undefined) {
		return bosLocalizedStrings["en"][messageId];
	}
	
	return messageId;
}

qx.Class.define("bos.Server", {
	extend: qx.core.Object,
	construct: function() {
		//webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCity, this);
		//webfrontend.data.City.getInstance().addListener("changeCity", this.onCityChanged, this);
		webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);
				
		this.persistCityTimer = new qx.event.Timer(5500);
		this.persistCityTimer.addListener("interval", this._persistPendingCity, this);	
		this.persistCityTimer.start();	
	}, 
	properties: {
		lastUpdatedCityId: {
			init: false,
			event: "bos.data.changeLastUpdatedCityId"
		}, 
		lastUpdatedCityAt: {
			init: false
		}, 
		cityResourcesUpdateTime: {
			init: null,
			event: "bos.data.changeCityResourcesUpdateTime"
		}
	}, 
	members: {
		cities: new Array(),
		citiesTable: new Array(),
		cityResources: new Array(),
		como: new Object(),
		_citiesToPersist: new Array(),
		_dirtyCities: new Object(),
		persistCityTimer: null,
		onCityChanged: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}
			this.markCityDirty(city.getId());			
		},
		markCityDirty: function(cityId) {
			var dirty = this._dirtyCities[cityId] || false;
			if (!dirty) {
				this._dirtyCities[cityId] = true;
				this._citiesToPersist.push(cityId);
			}
		},
		_persistPendingCity: function() {
			if (this._citiesToPersist.length == 0) {
				return;
			}
			var cityId = this._citiesToPersist[0];
			this._dirtyCities[cityId] = false;
			this._citiesToPersist.splice(0, 1);
			this.persistCity(cityId);
			return;
		},
		persistCity: function(cityId) {
			if (!bos.Storage.getInstance().getPersistingCitiesEnabled()) {
				return;
			}
			var prevCity = this.cities[cityId];
			if (prevCity != null) {
				try {
					bos.Storage.getInstance().saveCity(prevCity);
				} catch (e) {
					bos.Storage.getInstance().setPersistingCitiesEnabled(false);
					bos.Utils.handleError("Error when trying to persist city " + prevCity.getName() + ". Persisting has been disabled. Error: " + e);
				}
			}
		},
		updateCity: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}

//bos.Utils.handleError(city.getId() + " " + city.getVersion());			
			
			//do not update the same city too often
			/*
			if (this.getLastUpdatedCityId() != null && this.getLastUpdatedCityId() == city.getId()) {
				var diff = new Date() - this.getLastUpdatedCityAt();
				if (diff < 10) {
					return;
				}
			}
*/
			var c = new bos.City();
			c.populate(city);
			this.cities[c.getId()] = c;

			this.setLastUpdatedCityId(c.getId());
			this.setLastUpdatedCityAt(new Date());
			
			this.markCityDirty(city.getId());
		},
		addCOMOItem: function(item) {
			this.como[item.i] = item;
			this.updateCityFromCOMOItem(item);
		},
		updateCityFromCOMOItem: function(item) {
			if (this.cities[item.i] == undefined) {
				return;
			}
			var city = this.cities[item.i];
			city.units = new Object();
			city.unitOrders = new Array();
			
			for (var i = 0; i < item.c.length; i++) {
				var command = item.c[i];
				var units = new Array();
				for (var j = 0; j < command.u.length; j++) {
					var unit = command.u[j];
					
					if (command.i == 0) {						
						city.units[unit.t] = {
							count: unit.c,
							total: unit.c,
							speed: -1
						};
					} else {
						var cityUnits = city.units[unit.t];
						if (cityUnits == undefined) {
							city.units[unit.t] = {
								count: 0,
								total: 0,
								speed: -1							
							}
							cityUnits = city.units[unit.t];
						}
						if (command.d == 0) {
							//delayed order cannot increase troop count
							cityUnits.total += unit.c;
						}
					}
					
					units.push({
						type: unit.t,
						count: unit.c
					});
				}
				
				if (command.i != 0) {
				//{"i":26722474,"t":8,"s":2,"cn":"Mountain:9","c":7995428,"pn":"","p":0,"e":19024467,"d":0,"q":0,"r":1,"u":[{"t":6,"c":129237}]}]},
				
					var order = {
						id: command.i,
						type: command.t,
						state: command.s,
						//start: command.ss,
						start: null,
						end: command.e,
						city: command.c,
						cityName: command.cn,
						player: command.p,
						playerName: command.pn,
						//alliance: command.a,
						//allianceName: command.an,
						units: units,
						isDelayed: command.d,
						recurringType: command.r,
						//recurringEndStep: command.rs,
						quickSupport: command.q
					};
					city.unitOrders.push(order);				
				}
			}
			
		}		
	}
});

qx.Class.define("bos.Storage", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		try {
			this._player = webfrontend.data.Player.getInstance().getId();
			
			var options = this._loadOptions();
			if (options != null) {
				if (options.optionsFormatVersion != bos.Storage.OPTIONS_FORMAT_VERSION) {
					bos.Utils.handleError("This script version requires options to be in new format. Default values has been applied. Please set options again. Sorry for inconvenience");
					this.deleteAllSavedData();
					this.saveOptions(); //force saving defaults
				} else {
					this._applyOptions(options);
				}
			}

			var saved = this.getSavedCities();
			this._savedCities = [];
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];

				this._savedCities["c" + cityId] = cityId;
			}			
		} catch (e) {
			bos.Utils.handleError("Error loading LoU BOS settings: " + e + ".\nIt may mean that you browser has disabled local storage.\nTo turn local storage on - in Firefox please open page 'about:config' and make sure that in 'dom.storage.enabled' you have true value. For Firefox please make sure that you have cookies enabled");
		}
	}, statics: {
		OPTIONS_FORMAT_VERSION: 0
	}, properties: {
		persistingCitiesEnabled: {
			init: true
		}, 
		loadPersistedCitiesAtStart: {
			init: true
		}, 
		optionsFormatVersion: {
			init: 0
		}, 
		loadTableSettingsAtStart: {
			init: false
		}, 
		citiesTableSettings: {
			init: null
		}, 
		militaryTableSettings: {
			init: null
		}, 
		moonstonesTableSettings: {
			init: null
		}, 
		moonglowTowers: {
			init: []
		}, 
		customCityTypes: {
			init: []
		}, 
		summaryPosition: {
			init: null
		}, 
		tradeRoutesVersion: {
			init: 0,
			event: "changeTradeRoutesVersion"
		},
		recruitmentOrdersVersion: {
			init: 0,
			event: "changeRecruitmentOrdersVersion"
		},		
		tweakMarkersAtStart: {
			init: false
		}, 
		tweakReportAtStart: {
			init: false	
		}, 
		tweakChatAtStart: {
			init: false
		}, 
		startRefreshingResourcesAtStart: {
			init: false
		}
	}, members: {
		_savedCities: null,		
		_citiesWithMooglowTower: null,
		_tradeRoutes: null,
		_bannedPlayers: null,
		_recruitmentOrders: null,
		_player: "",
		_getValue: function(key, namespace) {
			var result = GM_getValue(this._calculateKey(key, namespace, true));
			if (result == null) {
				result = GM_getValue(this._calculateKey(key, namespace, false));
			}
			return result;
		}, 
		_setValue: function(key, value, namespace) {
			GM_setValue(this._calculateKey(key, namespace, true), value);		
		}, 
		_calculateKey: function(key, namespace, withPlayer) {
			if (namespace == undefined) {
				namespace = "Storage";
			}		
			if (withPlayer == undefined) {
				withPlayer = true;
			}
			if (withPlayer) {
				return "bos." + this._player + "." + namespace + "." + key;				
			} else {
				return "bos." + namespace + "." + key;
			}
		}, 
		_loadOptions: function() {
			var json = this._getValue("options");
			var options = null;
			if (json != null) {
				options = qx.util.Json.parse(json);
			}
			return options;
		}, 
		_applyOptions: function(options) {
			this.setOptionsFormatVersion(options.optionsFormatVersion);
			this.setPersistingCitiesEnabled(options.persistingCitiesEnabled);
			this.setLoadPersistedCitiesAtStart(options.loadPersistedCitiesAtStart);
			this.setCitiesTableSettings(options.citiesTableSettings);
			this.setMilitaryTableSettings(options.militaryTableSettings);
			if (options.moonstonesTableSettings != undefined) {
				this.setMoonstonesTableSettings(options.moonstonesTableSettings);
			}
			if (options.loadTableSettingsAtStart != undefined) {
				this.setLoadTableSettingsAtStart(options.loadTableSettingsAtStart);
			}
			if (options.moonglowTowers != undefined) {
				this.setMoonglowTowers(options.moonglowTowers);
			}
			if (options.customCityTypes != undefined) {
				this.setCustomCityTypes(options.customCityTypes);
			}
			if (options.summaryPosition != undefined) {
				this.setSummaryPosition(options.summaryPosition);
			}
			if (options.tweakMarkersAtStart != undefined) {
				this.setTweakMarkersAtStart(options.tweakMarkersAtStart);
			}
			if (options.tweakReportAtStart != undefined) {
				this.setTweakReportAtStart(options.tweakReportAtStart);
			}
			if (options.tweakChatAtStart != undefined) {
				this.setTweakChatAtStart(options.tweakChatAtStart);
			}
			if (options.startRefreshingResourcesAtStart != undefined) {
				this.setStartRefreshingResourcesAtStart(options.startRefreshingResourcesAtStart);
			}						
		}, 
		saveCity: function(city) {
			var simple = city.toSimpleObject();
			var json = qx.util.Json.stringify(simple);
			this._setValue(city.getId(), json, "City");

			this._savedCities["c" + city.getId()] = city.getId();
			this._saveSavedCities();
		}, 
		loadCity: function(cityId) {
			var json = this._getValue(cityId, "City");
			if (json == null)
				return null;
			var parsed = qx.util.Json.parse(json);
			var city = bos.City.createFromSimpleObject(parsed);
			return city;
		}, 
		_calculateCityKey: function(cityId) {			
			return "bos.City." + cityId;			
		}, 
		getSavedCities: function() {
			var s = this._getValue("index", "City");
			var cities = [];
			if (s != null) {
				cities = qx.util.Json.parse(s);
			}
			return cities;
		}, 
		_saveSavedCities: function() {
			var cities = [];
			for (var key in this._savedCities) {
				var cityId = parseInt(key.substring(1));
				if (!isNaN(cityId)) {
					cityId = parseInt(this._savedCities[key]);
					if (!isNaN(cityId)) {
							cities.push(cityId);
					}
				}
			}

			var json = qx.util.Json.stringify(cities);
			this._setValue("index", json, "City");
		}, 
		deleteAllSavedData: function() {
			var saved = this.getSavedCities();
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];
				GM_deleteValue(this._calculateKey(cityId, "City"));
			}
			GM_deleteValue(this._calculateKey("index", "City"));

			this._savedCities = [];
		}, 
		saveOptions: function() {
			var o = {
				persistingCitiesEnabled: this.getPersistingCitiesEnabled(),
				loadPersistedCitiesAtStart: this.getLoadPersistedCitiesAtStart(),
				tweakChatAtStart: this.getTweakChatAtStart(),
				tweakMarkersAtStart: this.getTweakMarkersAtStart(),
				tweakReportAtStart: this.getTweakReportAtStart(),
				startRefreshingResourcesAtStart: this.getStartRefreshingResourcesAtStart(),
				
				loadTableSettingsAtStart: this.getLoadTableSettingsAtStart(),							
				citiesTableSettings: this.getCitiesTableSettings(),
				militaryTableSettings: this.getMilitaryTableSettings(),
				moonstonesTableSettings: this.getMoonstonesTableSettings(),
				summaryPosition: this.getSummaryPosition(),
									
				moonglowTowers: this.getMoonglowTowers(),
				customCityTypes: this.getCustomCityTypes(),
				optionsFormatVersion: bos.Storage.OPTIONS_FORMAT_VERSION
			}
			var json = qx.util.Json.stringify(o);
			this._setValue("options", json);
			
			this.saveBannedPlayers();
		}, 
		setTableSettings: function(settings, tableName) {
			//not the best way to do it
			switch (tableName) {
				case "cities":
					this.setCitiesTableSettings(settings);
					break;
				case "military":
					this.setMilitaryTableSettings(settings);
					break;
				case "moonstones":
					this.setMoonstonesTableSettings(settings);
					break;
				default:
					bos.Utils.handleError("Unknown table name " + tableName);
					break;
			}
		}, 
		addMoonglowTower: function(cityId, towerId) {		
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					o.towerId = towerId;
					this.saveOptions();
					return;
				}
			}
			var t = {
				cityId: cityId,
				towerId: towerId
			};
			this.getMoonglowTowers().push(t);
			this._citiesWithMooglowTower = null;
			this.saveOptions();
		}, 
		removeMoonglowTower: function(cityId) {
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					this.getMoonglowTowers().splice(i, 1);
					this._citiesWithMooglowTower = null;
					this.saveOptions();
					return;
				}
			}								
		}, 
		findMoonglowTowerId: function(cityId) {
			var withMoonglow = this.getCitiesWithMooglowTower();
			if (withMoonglow["c" + cityId] == undefined) {
				return -1;
			} else {
				return withMoonglow["c" + cityId];
			}
			/*
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {											
					return o.towerId;
				}
			}
			return -1;
			*/
		}, 
		getCitiesWithMooglowTower: function() {
			if (this._citiesWithMooglowTower == null) {
				this._citiesWithMooglowTower = [];
				for (var i = 0; i < this.getMoonglowTowers().length; i++) {
					var o = this.getMoonglowTowers()[i];
					this._citiesWithMooglowTower["c" + o.cityId] = o.towerId;
				}										
			}
			return this._citiesWithMooglowTower;
		}, 
		addCustomCityType: function(letter, description) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					o.description = description;
					return;
				}
			}
			var t = {
				letter: letter,
				description: description
			};
			this.getCustomCityTypes().push(t);					
		}, 
		removeCustomCityType: function(letter) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					this.getCustomCityTypes().splice(i, 1);							
					return;
				}
			}				
		}, 
		loadBannedPlayers: function() {
			this._bannedPlayers = [];
			var json = this._getValue("bannedPlayers");			
			if (json != null) {
				this._bannedPlayers = qx.util.Json.parse(json);
			}
			return this._bannedPlayers;		
		}, 
		getBannedPlayers: function() {
			if (this._bannedPlayers == null) {
				this.loadBannedPlayers();
			}
			return this._bannedPlayers;
		}, 
		saveBannedPlayers: function() {
			var json = qx.util.Json.stringify(this._bannedPlayers);
			GM_setValue("bos.Storage.bannedPlayers", json);			
		}, 
		addBannedPlayer: function(playerName) {
			var list = this.getBannedPlayers();
			list.push(playerName);
		}, 
		removeBannedPlayer: function(playerName) {
			var list = this.getBannedPlayers();
			for (var i = 0; i < list.length; i++) {
				if (list[i] == playerName) {
					list.splice(i, 1);
					return true;
				}
			}
			return false;
		},	
		loadTradeRoutes: function() {
			this._tradeRoutes = [];
			var json = this._getValue("tradeRoutes");			
			if (json != null) {
				this._tradeRoutes = qx.util.Json.parse(json);
			}
			return this._tradeRoutes;
		}, 
		getTradeRoutes: function() {
			if (this._tradeRoutes == null) {
				this.loadTradeRoutes();
			}
			return this._tradeRoutes;		
		}, 
		saveTradeRoutes: function() {
			var json = qx.util.Json.stringify(this._tradeRoutes);
			this._setValue("tradeRoutes", json);			
		}, 
		addTradeRoute: function(route) {
			route.id = this._tradeRoutes.length + 1;
			this._tradeRoutes.push(route);
			this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
			this.saveTradeRoutes();
			return route.id;
		}, 
		removeTradeRoute: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {
					this._tradeRoutes.splice(i, 1);
					this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
					this.saveTradeRoutes();
					return true;
				}
			}
			return false;
		},
		findTradeRouteById: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {					
					return r;
				}
			}
			return null;			
		},		
		loadRecruitmentOrders: function() {
			this._recruitmentOrders = [];
			var json = this._getValue("recruitmentOrders");			
			if (json != null) {
				this._recruitmentOrders = qx.util.Json.parse(json);
			}
			return this._recruitmentOrders;
		}, 
		getRecruitmentOrders: function() {
			if (this._recruitmentOrders == null) {
				this.loadRecruitmentOrders();
			}
			return this._recruitmentOrders;		
		}, 
		saveRecruitmentOrders: function() {
			var json = qx.util.Json.stringify(this._recruitmentOrders);
			this._setValue("recruitmentOrders", json);			
		}, 
		addRecruitmentOrder: function(order) {			
			this._recruitmentOrders.push(order);
			this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
			this.saveRecruitmentOrders();
		}, 
		removeRecruitmentOrder: function(cityId) {
			for (var i = 0; i < this._recruitmentOrders.length; i++) {
				var o = this._recruitmentOrders[i];
				if (o.cityId == cityId) {
					this._recruitmentOrders.splice(i, 1);
					this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
					this.saveRecruitmentOrders();
					return true;
				}
			}
			return false;
		},
		findRecruitmentOrderById: function(cityId) {
			for (var i = 0; i < this.getRecruitmentOrders().length; i++) {
				var o = this.getRecruitmentOrders()[i];
				if (o.cityId == cityId) {					
					return o;
				}
			}
			return null;			
		},
		getPurifyOptions: function() {
			var json = this._getValue("purifyOptions");
			var options;
			if (json != null) {
				options = qx.util.Json.parse(json);
			} else {
				options = {					
					includeCastles: false,
					useRecruitmentData: false,
					ministerBuildPresent: webfrontend.data.Player.getInstance().getMinisterBuildPresent()
				};
				
				if (options.ministerBuildPresent) {
					options.minimumResLevels = [0, 20, 20, 20, 20];
				} else {
					options.minimumResLevels = [0, 50000, 50000, 50000, 50000];
				}
			}
			return options;
		},
		savePurifyOptions: function(options) {
			options.ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
			var json = qx.util.Json.stringify(options);
			this._setValue("purifyOptions", json);
		}
	}
});

qx.Class.define("bos.data.Blacklist", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		isBanned: function(user) {
			var banned = bos.Storage.getInstance().getBannedPlayers();
			for (var i = 0; i < banned.length; i++) {
				if (banned[i] == user) {
					return true;
				}
			}
			return false;
		}
	}
});

qx.Class.define("bos.net.CommandManager", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		this._sendTimer = new qx.event.Timer(bos.Const.MIN_SEND_COMMAND_INTERVAL);
		this._sendTimer.addListener("interval", this.sendPendingCommand, this);	
		this._sendTimer.start();		
	},
	properties: {
		lastSendCommand: {
			init: 0
		}
	},
	members: {
		_toSend: [],
		_sendTimer: null,
		sendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			if (now - this.getLastSendCommand() >= bos.Const.MIN_SEND_COMMAND_INTERVAL) {
				this.forcedSendCommand(endPoint, request, context, onSendDone, extraValue);
			} else {
				this._toSend.push({
					endPoint: endPoint, 
					request: request, 
					context: context, 
					onSendDone: onSendDone, 
					extraValue: extraValue
				});
			}
		}, forcedSendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			webfrontend.net.CommandManager.getInstance().sendCommand(endPoint, request, context, onSendDone, extraValue);			
			this.setLastSendCommand(now);		
		}, sendPendingCommand: function() {
			if (this._toSend.length > 0) {
				var o = this._toSend[0];
				this._toSend.splice(0, 1);
				this.forcedSendCommand(o.endPoint, o.request, o.context, o.onSendDone, o.extraValue);
			}
		}
	}
});


qx.Class.define("bos.Tweaks", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		gameStarted: function() {
			trace("In gameStarted");

			this.tweakErrorReporting();
			var res = webfrontend.res.Main.getInstance();		

			var container = a.title.reportButton.getLayoutParent();

			var btnSummary = new qx.ui.form.Button(tr("summary")).set({
				marginLeft: 10
			});
			btnSummary.setWidth(78);
			btnSummary.setHeight(32);
			container._add(btnSummary, {
					row: 0,
					column: 11
			});
			btnSummary.addListener("click", onSummary, this);

			try {
				var menu = new qx.ui.menu.Menu();

				var btnCombatCalc = new qx.ui.menu.Button(tr("combat calculator"), null);
				btnCombatCalc.addListener("execute", onCombatCalc);

				var btnFoodCalc = new qx.ui.menu.Button(tr("food calculator"), null);
				btnFoodCalc.addListener("execute", onFoodCalc);
				
				var btnRecruitmentSpeedCalc = new qx.ui.menu.Button(tr("recruitment speed calculator"), null);
				btnRecruitmentSpeedCalc.addListener("execute", onRecruitmentSpeedCalc);								

				var btnJumpCoords = new qx.ui.menu.Button(tr("jump to coords"), null);
				btnJumpCoords.addListener("execute", onJump);

				var btnJumpToCity = new qx.ui.menu.Button(tr("Jump to city"), null);
				btnJumpToCity.addListener("execute", function(event) {
						var s = prompt(tr("please enter city coordinates"), "");
						if (s != null && s != "") {
							s.match(/^(\d{1,3}):(\d{1,3})$/);
							var x = parseInt(RegExp.$1);
							var y = parseInt(RegExp.$2);
							webfrontend.gui.Util.openCityProfile(x, y);
						}
				});

				var btnJumpPlayer = new qx.ui.menu.Button(tr("jump to player"), null);
				btnJumpPlayer.addListener("execute", function(event) {
					var name = prompt(tr("please enter player name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openPlayerProfile(name);					        
						a.showInfoPage(a.getPlayerInfoPage(), {
							name: name
						});
					}
				});

				var btnJumpAlliance = new qx.ui.menu.Button(tr("jump to alliance"), null);
				btnJumpAlliance.addListener("execute", function(event) {
					var name = prompt(tr("please enter alliance name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openAllianceProfile(name);
				        a.showInfoPage(a.getAllianceInfoPage(), {
							name: name
						});
					}
				});
				
				var btnJumpContinent = new qx.ui.menu.Button(tr("jump to continent"), null);
				btnJumpContinent.addListener("execute", function(event) {
					var s = prompt(tr("please enter continent:"), "");
					if (s != null && s != "") {
						var cont = parseInt(s);
						var col = Math.floor(cont % 10);
						var row = Math.floor(cont / 10);						
						var srv = webfrontend.data.Server.getInstance();
						var height = srv.getContinentHeight();
						var width = srv.getContinentWidth();
						
						var x = Math.floor(col * width + 0.5 * width);
						var y = Math.floor(row * height + 0.5 * height);
						
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				});
				
				menu.add(btnCombatCalc);
				menu.add(btnFoodCalc);
				menu.add(btnRecruitmentSpeedCalc);
				menu.addSeparator();
				menu.add(btnJumpCoords);
				menu.add(btnJumpToCity);
				menu.add(btnJumpPlayer);
				menu.add(btnJumpAlliance);
				menu.add(btnJumpContinent);
				
				menu.addSeparator();
				
				var btnZoomOut = new qx.ui.menu.Button(tr("zoom out"), null);
				btnZoomOut.addListener("execute", function(event) {
				
					if (qx.bom.client.Engine.GECKO) {
						a.visMain.scene.domRoot.parentNode.style.MozTransform = "scale(0.5)";
						a.visMain.scene.domRoot.parentNode.style["overflow"] = "";
					} else {
						a.visMain.scene.domRoot.style["zoom"] = 0.5;						
					}					
					
					//a.visMain.fogNode.domElement.style["display"] = "none";					
				});				
				
				menu.add(btnZoomOut);
				
				var btnZoomIn = new qx.ui.menu.Button(tr("zoom in"), null);
				btnZoomIn.addListener("execute", function(event) {
					if (qx.bom.client.Engine.GECKO) {
						a.visMain.scene.domRoot.parentNode.style.MozTransform = "scale(1)";
						a.visMain.scene.domRoot.parentNode.style["overflow"] = "hidden";
					} else {
						a.visMain.scene.domRoot.style["zoom"] = 1;
					}
					
					//a.visMain.fogNode.domElement.style["display"] = "";
				});								
				menu.add(btnZoomIn);				
												
				var btnMenu = new qx.ui.form.MenuButton("BOS Tools", null, menu).set({
					marginLeft: 10
				});
				container._add(btnMenu, {
						row: 0,
						column: 12
				});
			} catch (e) {
				bos.Utils.handleError(tr("error during BOS Tools menu creation: ") + e);
			}
			/*
			webfrontend.base.Timer.getInstance().addListener("uiTick", function(evt) {
									server.updateCity();
							}, this);
			*/
			//a.visMain.addListener("changeMapLoaded", updateCity, false);

			a.overlaySizes[bos.Const.EXTRA_WIDE_OVERLAY] = {
					width: 0,
					height: 0
			};

			var pos = a.overlayPositions[0];
			a.overlayPositions[bos.Const.EXTRA_WIDE_OVERLAY] = {
				left: pos.left,
				top: pos.top,
				bottom: pos.bottom
			};

			server = new bos.Server();
			
			try {
				this.applyPersistedTweaks();
			} catch (e) {
				bos.Utils.handleError("applyPersistedTweaks failed " + e);
			}

			trace("after gameStarted");
			
		}, tweakErrorReporting: function() {
			if (DEBUG_VERSION) {
				qx.event.GlobalError.setErrorHandler(handleError, this);
				//qx.event.GlobalError.setErrorHandler(null, this);
			}
		}, tweakReports: function() {

			if (reportsTweaked) {
				return;
			}

			trace("in tweakReports");
			//a.title.reportButton.removeListener(a.title.reportButton, reportsBtnListener);

			//webfrontend.gui.ReportListWidget
			var rep = a.title.report;
			if (rep == null) {
				debug("rep is NULL");
				return;
			}

			rep.selectAllBtn.set({
				width: 90
			});

			rep.deleteBtn.set({
				width: 90
			});

			var left = 110;
			var step = 35;
			var bottom = 7;

			var selectDropdown = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});

			var locale = qx.locale.Manager.getInstance().getLocale();
			if (locale == "de") {
				selectDropdown.add(new qx.ui.form.ListItem("Keine", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("Alle", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Spionage", null, "Spionage: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plünderung", null, "Plünderung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Überfall", null, "Überfall: "));
				selectDropdown.add(new qx.ui.form.ListItem("Belagerung", null, "Belagerung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Unterstützung", null, "Unterstützung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Waren", null, "Waren: "));
				selectDropdown.add(new qx.ui.form.ListItem("Handel", null, "Handel: "));
				selectDropdown.add(new qx.ui.form.ListItem("Jagd", null, "Jagd: "));
				selectDropdown.add(new qx.ui.form.ListItem("Schatzsuche", null, "Schatzsuche: "));
			} else {
				selectDropdown.add(new qx.ui.form.ListItem("None", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("All", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Assault", null, "Assault: |: Assaulted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Goods", null, "Goods: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plunder", null, "Plunder: |: Plundered by "));
				selectDropdown.add(new qx.ui.form.ListItem("Raids", null, "Raid: "));
				selectDropdown.add(new qx.ui.form.ListItem("Scout", null, "Scout: |: Scouted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Siege", null, "Siege: |: Siege canceled by |: Sieged by |Reinforcement: Joins Siege vs."));
				selectDropdown.add(new qx.ui.form.ListItem("Support", null, ": Support sent for your city |: Support from |Support: Your troops arrived at |: Support retreat by |Support: Sent home by "));
				selectDropdown.add(new qx.ui.form.ListItem("Trade", null, "Trade: "));
			}

			selectDropdown.addListener("changeSelection", function onReportSelectFilter() {
					var sel = selectDropdown.getSelection()[0].getModel();
					selectReports(sel);
			}, false);


			rep.clientArea.add(selectDropdown, {
				bottom: 1,
				right: 1
			});
			//right = 100 + 1;

			var btnExport = new qx.ui.form.Button("Export");
			btnExport.set({width: 60, appearance: "button-text-small", toolTipText: locale =="de" ? "Exportieren den ausgewählten Report" : "Export selected reports."});
			btnExport.addListener("click", exportSelectedReports, false);
			rep.clientArea.add(btnExport, {
				bottom: 1,
				right: 110
			});
			//right += step;

			var tcm = rep.headers.getTableColumnModel();
			var behavior = tcm.getBehavior();
			behavior.setWidth(2, 90);

			//webfrontend.gui.ReportPage
			var reportPage = a.getReportPage();
			var widgets = reportPage.getChildren();
			var container = widgets[widgets.length - 1];
			var btnExportThisReport = new qx.ui.form.Button("Export");
			btnExportThisReport.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, this, parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportThisReport);
			
			var btnExportToCombatCalc = new qx.ui.form.Button(locale == "de" ? "Zum Kampfkalk hinzuf." : "To Combat calc");
			btnExportToCombatCalc.setToolTipText(locale == "de" ? "Fügt den Spionage Report zum Kampfkalkulator hinzu." : "Adds <b>scout</b> report to combat calculator");
			btnExportToCombatCalc.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					onCombatCalc();
					var combat = getCombatCalculatorWidget();
					combat.addDefendersFromReport = true;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, combat, combat.parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportToCombatCalc);						
			
			trace("after tweakReports");

			reportsTweaked = true;
			
		}, applyPersistedTweaks: function() {
			var storage = bos.Storage.getInstance();
			
			if (storage.getTweakMarkersAtStart()) {
				this.tweakMarkers();
			}
			
			if (storage.getTweakReportAtStart()) {
				this.tweakReport();
			}
			
			if (storage.getTweakChatAtStart()) {
				this.tweakChat();
			}	
			
		}, tweakChat: function() {		
			var cls = a.chat;
			if (cls.oldOnNewMessage != undefined) {
				//already applied
				return;
			}
			
			a.chat.tabView.addListener("changeSelection", this._onChatChangeTab, this);
			a.chat.tabView.setSelection([a.chat.tabView.getChildren()[1]]);
			
			this._onChatChangeTab();
			
			cls.oldOnNewMessage = cls._onNewMessage;			
			
			var chatData = webfrontend.data.Chat.getInstance();
			
			chatData.removeListener("newMessage", cls._onNewMessage, cls);
			
			cls._onNewMessage = function(event) {
				var data = event.getData();
				//c = type
				//m = message
				//s = source (who is speaking)
				var blacklist = bos.data.Blacklist.getInstance();
				if (event.c == "privateout" || !blacklist.isBanned(data.s)) {
					this.oldOnNewMessage(event);							
				}
			}
			
			chatData.addListener("newMessage", cls._onNewMessage, cls);			
		
		}, _onChatChangeTab: function(event) {
			var chatId = a.chat.tabView.getSelection()[0].getUserData("ID");
			var ch = a.chat.chatLine;
			
			switch (chatId) {
				case 0:
					ch.setBackgroundColor("red");
					break;
				case 1:
					ch.setBackgroundColor("");
					break;
				case 99:
					ch.setBackgroundColor("");
					break;
			}
									
		}, tweakMarkers: function() {
			var cls = webfrontend.vis.WorldCity.prototype;
			
			cls.allianceTownMarker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAwBQTFRFAAAAAAsADQICCwsAAxcAFwYEExQCFRgVGhMiASgAADcAFSkCGjQAJBwVPBwMLCcbMikdLCYnNSwhOzMoPDg4PTlDAEcAAVcAFUgBGlUBC2QAE2sAGnMAKEYCIk4aIlwBPVsNJ2YBIGwaJHsAKnkYMm0CKnghXBgJQzYcUDsXQzkqRTwyXS4mWz86ahoHdhwHaCYOaSUQeCQMeCoUbTcgejckRVAeSUMkSkQ4WUkpU0g7XVIwQ3IpZkspbkQ3YVUoaVYydko/c1orbWUoaWc9emQscmU0fHk3SUpFVU1DXFRIWlhYV1RqZVpLZF1UaWFPa2RYcmhZd3FcamlmcmtienNpdnZ2fnVzfXlyeXx8K4QFM4sMNo8QOpAPOpMUQZobSJwiWJo7SKEiZZpVbIhnhB0IkxgBiCYMiCsRlykMlS0RljIVgzgllzwhph0Hvx0BpigKqS0SqTANpjUXuSUHsi0QuTMPuDYXqj0hvDohhEApiEs5m0ImkEszl10jlXMehWwmgW8zhnAugX0zmH0wqUgspE00s0Qlt0owtFM9oGctilREnmFPmGlak3ZRg3ttgnx1q19ItltDrWRPsWlWq3dqqn5xuXZjxB8CxyUFyysRxDENxjYT1CkH1jAO2zkYxkUfykYmyVk80Ukx3lI3xFtDyGNKxWRU1nJay3Zk23Zl4nxonIc1mZQ4o4YqrIE8pJc4tIwivZgovJowqrU3trE1i4JIkIJBn5hCioR6k4p8kJd4pY1Pp5JduJ1AoZlzv61XxqAky6szw7401qcm3b0v07sw6bwoy4Rz0Ytn14l2xKRC3r9fxq9nxbFq5Z1oyMY97swy88Yh5uQv7uU38Oo3+PM0ycFJ7OlC9Oph8ud/ioeCko2El5KKl5aUmqGOpYuCo5qJopyTso+Dq6SYvK+Mtq2erKqms62kubOovrmxyJWG3JWCzqiYw7SIw7usw76z3tCdzsGsysW808in0cu68u6G+PGBzcnB0c3H6OPY9e/f+PPBAAAAAAAAAAAA60R4TQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAGnElEQVRo3u2ZfVRTdRjHR450Q3Lea3e0zYymZaMkt8grlfSixobQkE1xAypL7+6u4FUG9GLlqdCsY+5kL7sCmpYvWWpZlEPTXjTNOr1qLwe2xIiXtKBIQ+uc9fzuLlHGy0B+Hf/g4Q/g3N3f536f7/Pc33N3ZaH/IWQDkAHIAGQAMgA5tyDZpCqAG+K3W2lzx79Pl3qkKNzc83KbysvXRQK5LT09IVb6e1mRxyd4BMHjmc/zvEdYVb62G9KmkvKSkoUelr/nQA+Q6arTNGEgZ4VCmwVYnWfnMuwcli3kCwp4j8fnE8q7wJSXF5fBx1mGheAe6xZCxp7+dawh5Y1PVwmeAiaRMbryo2Iu0un02riY84Ay3ye80BljbXFZGedmAOGGH5blD3YDGTEs0xo7Yctna+cXzElMnBelVKvVGq1WBxiIGPDGJ6zuJFVlZWWFbhc3KS4ujoqTc7yneEOXkN/eScnYmfL+lif5ucbEeQpKTQFCBwytHigOp/4CweerWP3iGaetEco9oENGSRfkuHb9hvUHu4L8suPLP/84efjNm+aMMykoCLVGowGEVgcQhxNiTLTgq6ioWPPyP+wQBL6QZYxySlStjb8+u3vjH6nckzn51iGxRYMUaqRDrdaKAQiR4XTmxD/v8wiIEz7joFAhsKzLZQrr1mh39lzC0wbHGsaStEpOiULES+tg5OTl5TmdQ4tEihSAYBijSaFUwgkazehIOn7XdaTBvOfie9VhhghBvgMljHA49PrzUXsKQIIeYhjG5JIBQ6kE17WRNOPJr25Jr2rYccmHMrVUWcDQaoEBiBwgAMKhd8THRAtlqytQK/Ful4xSyBEEpfeuSJT8/NDv3773+tQQF4YgCniPXEcAh5Q2Z25e3piREBNiFHJKqVCgbCmRJxGlKzTx67dutCT4n1FIxSVWpbi6Q3IF4nYUkDy9TqOmFGKuFKISzWURQdJS08w2MhSK7sgXpEsvWg+rdyBAm06jocQ0ITHib+rSiCAnUoPBavpIaFL4ypAQrU404m8hsLzToYf+0ajD9UGJQsKm3B3RpjV8RkMwzRrKUijaTUE1LEpB6zvFCoPu1KEuRR9BjHZIJ6Z0vjOmBRumpc7MlCskU1DTizcvB/I7VxLjdOZCJYhqwgiFMvz5736KCFIdnDHiqqJwEWspxX2cTCaPiRkVtj7PKXoye/ZssMWhC+uQ8gWmxDyQX/pcBJDArGCATn08CYpflg+9xoh3b5bnC6OHxiNO7h054RKQGJSULyrK5HbzLL9w6YGeBwlrVhY9+dG0wVcmjjMyYrjdHMctgP2Rjx6F9NwJxo8GT0TjKQkiN5lMLpYrLSkuWdoj5JOtEw2Lt09NN11uTDQZGVfhsgNLSrn8fI5zgxzPoHjUM6j1wRGtyFGidkwab2J4D9oUj6873jNke+WrH+y/ucA1njEyhRs7DhxbAnqAI9dDz0s3Ml24HaOSxhuNDNuLuWt35aGPklMfdLtZbv1/Dq7kOEhafLjzwXktMGTXAMLI9W64S8+y01Ne2bbxpU6PcghTOlJM2ag4EGG62gS+PdW7CVIyZVtX088xcAdqbWnhAlaqC8a1aHkvx1Rkyr79D6d0M8chczioVp5nYYDgkp440utZeHfl4b1TDdO7nxdXLuJcYpiSlvdp4B5OpGaQ9h7n0meT7l/+fZ+netvMU00GGvejg7m1OYPADSFammtJ7EoCLfWkFTOk2txabzHgfpwjW5ttJG5IcrC1ivRihtgyWusSLLiffsm2+nQSNyShoXkFmY0ZYre11vZLvrr9ssDQVmdJwA0hmppspB8zhPa2VBEWzJBquq2WJDFD4CbZaFZhh9S02FVWzJAMy4mAyoAZElK11pMq7JC65nTsENLWtmKYBTMkgzhVqyIwQ0KqpiYaO4Twt2aqvJghCeZTfhWNGWIjm+vOuoh7/F6YDDRZCNyQZGubncjADMmi62piScyQ0JCZATplF17Ix9sttck3bMWs5N3FV4xdnIIZsnffoS9eM/yAFzJl4jefT0nArORtQ/K0C0ecMbMEavoXAkNLzVHiX0Uc8Pur+xtCVP1IE/4Ogt3mDYb6HZLZaFe1v7cBRHZNv3sC6TIfrSWIdhneagzGw8pkoNEAkOpQwOv1Y6kutD2uaLKqDFav3V+DqYTR7d56NEAQJJ2FrU8grMn+RhooVpyQEO2HnYsgsnFCSCIzmEn0feuKCFJjJi22Ppoeebq8tOVs3tQOvCofgAxAzhHIX1VdUmC5OsP/AAAAAElFTkSuQmCC";
			
			cls.enemyTownMarker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAwBQTFRFAAAAFhIWGhMiJBwVKyMbMikdLCYnNSwhOzMoPDg4PTlDXBgJQzYcUDsXQzkqRTwyXS4mWz86ahoHdhwHaCYOaSUQeCQMeCoUfDAdejgkdz05SEEoSkQ4WUkpU0g7XVIwY08kbkQ3YVUoaVYydko/c1orbWUoaWc9emQscmU0fHk3SUpFVU1DXFRIWllZV1RqZVpLZF1UaWFPa2RYcmdad3FcamlncmtienNpfHl2hB0IkxgBiCYMiCsRlykMlSwRljIVgzgllzsgqwEBph0HuQAAvx0Bux0dpigKqS0SqTANpzQWuSUHsi0QuTMPuDYXpygnqT0jtikotDkiiEs5mkMokUowl10jlXMehWwmgW8zhnAugX0zmH0wqkUpo041rFA1s0QluUc1vVAss1c8oGctjFVElFtKi2FVnmFPmGZZk3ZRgnxzq19Iql1dtltDrGZOt2NDsWpWuHVaq3dqqn5xt3liu35+yAAAxRoEwxQU1wAA2RkZxyUFzCoVxDENxjYT1CkH0CAf1jAO2zkYxjAp0CIi1Tk45wEA4hYW/AMD/BEO/hgY/yAf5Ssp4jQw/iMj+Tc3xkUfyEcnx1o70Ukx3lI3xFtD2khI21pNyGNKxWRUwntd1mZb1nJay3Zk23Zl6FdX9EhI7mJi4nxo4Xp59GVl8nx8nIc1mZQ4o4YqrIE8pJc4tIwiu5covJowqrU3trE1i4JIkIJBn5hCioR6k4p8pY1Pp5JdtplBoIJ6oZlzv4Fkv61XxqAky6szw7401qcm3b0v07sw6bwoxoVsyIdz0Ytn14l20JZ/0bFQxq9nxbFq5Z1oyMY98Mkp5uQv7uU38Oo3+PM0ycFJ7OlC9Oph8ud/ioeCko2El5KKl5aUpYuCo5qJopyTt42HuJSIqqOZvK+Mtq2erKqms62kubOovrmxyJWG2ZeD3JuXw7SI26SVzK2jw7usw76z0rWr5pGR3tCdzsGsysW808in0cu68u6G+PGBy8jC0s7K2tra6OPY9e/f+PPBAAAAknneoAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAGcklEQVRo3u2Zf1RTZRjHTZz3UraV6G6crrPQUmNDaIttdLddjeVVJviLin6QGJmHdgq1w9m8XBlH03mZMcPStEy0TC0tymFmx7IfpJ7Ksh8HNjEJmFIGljsaZN3edxsIBmwgb8c/9sA5XLjvfT98n+/z3ve5u4OE/yEGRSARSAQSgUQgVxdEi4vcqCEujZKUX/p1UbYpGGmbQ0+3yWZbGw7kzsRESVTwOHe6ycqZOM5kupdhGBO31FbWC2lThi0jIx0MnFkVAnKX6CKJiXGtIGzmwOyMXp8CvvRWJjWVMZmsVs7WA8ZmSy8Cwyk9DHperxA86uK5YeLR73y1lDOlpsRQUh1r53m+hOdfWZxjMnFA2gvdMcrSi4poHUBQBr0BYJhDvUCih6iUUTfv+LrMyqTExEyaP88OGRBTXu50lABvrNyyblLFFRWl0QY6/2RVaenJfJoxpW/oEXLuSJyyMu7jHU8ydwPELJZtZ/C8g3c4HCVrOc5avOzFyy5bztnSaYrKXLkKDne0tlWt27DuUE+QP/Z888/fF469OzZlOPEsIHRlOJ3Obb+UAa+Ki5e/1skOjmPS9Hpp3org8JYzvRv/cMV+1bg7BkeZ5s8AhM5CIMOPOfs8qLhiwAlccYgr5oAVOiLvqeDw0CU88Zoh4mE4uUAFUgUvWt+JAQIcbvnr8+l+SjAggiIICwsCQBzhrPi9o3GxfP++2UAHW1i4qrMSnnfyQE75mtcXwuUJ0wbWEEUBGRYYbCHL8uEsxgvf3Z5Y2bBn1xcW3mLvmq3AD384z778GFe0rBguJcagm7nCaIQQIP2ntnCU/PrAnz9+9PYEwWrvCgES4OzwG+ZtzZY3zjQ1HT5csLhghZ01QghM16rnWsO6C4/6/r0xConrGWMn26GELY6gKR2xZuvv5Q7ezlqMFtZiMbIW6IkzLEhCfIJcjQuCoYuUkkAJd2YAVSUAAeYH/gGIZQn4t9iwjBfOx3s81eRx4dYlli6egFjt7JgeBDyCdc7yAYY/X7x9W1ib1tDkBk+CUkjWdlbClwTrywkrzOmAq9P/dxaSLIHovoa73xkTPA0T47WqBZfdVfhAhQXF+MMvp4MRgPCObWFBqj3a6BunzmmAJbmet8+ms+fmFhT8thWmaXW76yCgIr8r0Bg/ZGXpIjs7uyAMiFvrcUfHPx6rTa68bzIFw2AA92+wHeV+2AwrmO/wBjL8ax0gpkwpnEvo4H1+Wk5V6EZCmawmxz2SkHBDzHApFUNRYJcw0DQNt0cmu2NF8gHn2SDDMiOPIHQ6fdrMHFNGTkjIlztHSbJ2T0gkrpPGEARloHOrHs2mJ2cCDpBjyuUdTqezK8dinDHrppFSimHgpti0tik0ZHfFW59+dluqbiQlpaZuvHTi9Fw/J20hH1gy7c4DxtjYEVIppe9D37Wv4tsjsvj7gRH0uv+czKcNzDQ+aEvAFeM9xEgpIaX71twlAlPGb39z46vdnvXbk/PSan/CShc9EUuMIEB1PN23DhKYIs7a/eD2nrqf04Gs5aRN1fuLj9JRusy8PrapAVMeGtNLHwcxaaAMGEZv0NF07Pzjfe6F91UcOzhBrOq9X8zPpHU6ULQ6IjavXw33UEyehGtC9qUfTJqTd7LfXb1a2+oVy1A/Osh8zUkYagje0lyLo4bI3S31uBIxpFruq1eIUT/O4b5mNY4aIvP4KnEzYog6yVcnUaB++sVb6xNx1BBJQ7MZPtchhWjUvtoByVevHxaIW+sUEtQQzOtV4S7EENLcUokpEEOqybZaHEcMEbBTjXIRckhNi0akRAxJUpx3i8SIIYLIV4+LkEPqmhORQ3B1q3mIAjEkCWurFWGIIYLI6yWRQzCXTyUyI4ZI5G0uEYkYosa9dVdcxCE/F8bdzQoMNUSmbNVgSYghyWRdTRSOGCIM1rrJuL1oIUcOKGplt+xErORA1vXDsuIQQw5+cuzoLvHPaCHjR/1wdLwEsZL3xbKJ10Zf1rO4awYWApqWmhNYlyJ2u1zVAw3BKk+RmOsSQaM2e4QBh6gaNaL29zYAoa0ZcE9AuuQnajGsXYa5GoHxYGbc3SgGkGrBbTa7kFQX3B7NXqVIrDRrXDWIShje7pUn3BiGk8nI1gkIpczVSAKKEiVEIF1eBYZhWpQQHFN5VFj/t66wIDVyXKHup+nhp8tMKq7kTW3kVXkEEoFcJZB/AeEVEt/HXJauAAAAAElFTkSuQmCC";
			
			cls.allyTownMarker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAwBQTFRFAAAAFhIWGhMiJBwVKyMbMikdLCYnNSwhOzMoPDg4CQFcFwBcBABhBAB2FgFpEAx2JwdaIhJaOAJaKQBpJwB6NgJoNAJyPTlDXBgJQzYcUDsXQzkqRTwyXS4mWz86ahoHdhwHaCYOaSUQeCQMeCoUeDYmQSBjSEEoSkQ4WUkpU0g7XVIwY08kbkQ3YVUoaVYydko/c1orbWUoaWc9emQscmYxfHk3SUpFVU1CXFNIWllZV1RqZFpLZF1Ue0VuaWFPa2RYcWhZd3FcbGtocmtienNpfHl0AwKIBAGXEQCKGwCSExCFGBiaAQCoAgC3FwCrJgCKKwCQOQGJNACWKQC6NQC5DADDFQDJHADTAAD/IwDIIwDaOwHLMQzfPRrdLADjNADqPADzShCIRgGrXyOXQi+oajumRgPXQhTfVQPfRQHmSAL8SBjsUgXiUwv+VRPuWxP+XinTRyHmZBz9ZCjHe1XthB0IkxgBiCYMiCsRlykMlS0RljIVgzgllzwhph0Hvx0BpigKqS0SqTANpjUXuSUHsi0QuTMPuDYXqj0hvDohiEs5m0Iml10jlXMehWwkgW8zhnAugX0zrUEppE00s0Qlt0owtFM9ilREiWNXnmFPmGlak3ZRgnxzsF1FrWRPsWlWq3dqqn5xuXZjxB8CxyUFyysRxDENxjYT1CkH1jAO2zkYxkUfykYmyVk80Ukx3lI3xFtDyGNKxWRU1nJay3Zk23Zl4nxojUybgGy0jnKugGfMnIc1mZQ4o4YqrIE8pJc4tIwiu5covJowqrU3trE1i4JIkIJBn5hCioR6k4p8pY1Pp5JdtplBoZlzv61XxqAky6szw7401qcm3b0v07sw6bwoy4Rz0Ytn14l20bFQxbBp5Z1oyMY98Mkp5uQv7uU38Oo3+PM0ycFJ7OlC9Oph8ud/ioeCko2El5KKl5aUpJeKsKiYrKqms62kubOovrmx0pWEw7SIw7yv3tCdzsGsysW808in0cu68u6G+PGBzsrD6OPY9e/f+PPBAAAAkulNdgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAGmElEQVRo3u3ZfVRTZRgAcBPXvX5gJWnZpRQ36opFH1owhdqCAZWbBrrdvJ02oiKdLYrS7e4qXmWIRZkpWceWfXAFNMuv7FNNy3KYnkpPppVlHwf2gdPInWzW7XnvxsFMYBBvxz94x9lhZ/fe357ned+9zz3rI/0Po08v0ov0Ir1IL3JuITmkwosb8eg0dHrby5eXuqKjfHPnl9tUV/dGLMgtGRmJcdH/l1e4RBH9ueYJguASV9Wt7UDaVFlXWbnAxQmLDnSC3Ko4RRMUmSNJm0W4ujCbs3OzOK5cKCsTXK6aGrGuHaaubmGtS+DgcBj8cx0iZNypE8OpMR9/u0p0ldlH2lWOuYML7i4sLCyeml8Nyrwa8c2zGWsX1tbyTjsQTnhwnHCwA6R/P60m7qot362dVzZr5Mg58ZMYlrVYLKBYC63WfKhNjbj6LKmqra0tdzr4i6dMhTGZF1wLN7SLnDiUqmlI/XLLi8Js5cg5eUbGFDFkxWq1WYeKNTX1q9edcdoasc7FO+wDp7Fm+RNZ71u/Yf3B9pDfdn3/158nj3xy3awRqttNJmSY4SQ404oMGA8NEWvq6+vXvH1aOURRKOc45W0mhkHIjEfe67jwz+7cqx17U9+4isF6MIyRZKFPFzVstpLpr9e4ROREzjgo1osc53Co8owmE2s2W4o7n8ITzutHDSfpF+4wGeHByvGfZpSUlNhsBRWyEh1A2O1Kld5glJWZsaz43WNIKn3vnicYxmhkmEggckUQUQqEzWp9eBhaniJIsIbsdpiDg/QGGKBYYlmMJ3+8IaOhedf2r+NZAxPJsUUuiRwFqr08ivOHiLWr69FSEpyOwffr8yIIyz4eSyS/Pv3HL198pJacCEE5jqbLFr28nLYSRE5/p6ioqCD/zsnTDHoYCGFZNqZ0SaN/+vRaNeV5RW9Es8VsMf+z7vK4C41SqI+10MwYZcAATzBRzI/GhIxPG5+mIyUpnjEwLBMNJRqDDJRGjBIUm4U1wfVNDBgyYjLdExPye5rP10g3SdegkyNFkVeitS0Qm1x+WD9mhjGhJBnlQOAEKMr7MW1a52c1+8ZrpDx9XmtRzBEGGZGCgAAGWqUsHCJHIyMGeDEztp1xvK95QlpObi5aj2azOVKUCFNS0haLHA9Egwx9hDEx8IkefDcmpNE3sf8V8+WimM1TJg/mByYkFBQUtxa/FFVEfrJZI4bBCARCWDh67oWvxYB4c3wGOu2iOfq8SQPm2tFAmwQnCJUJ9z4WddAMkycXqofRGA3kApXDCcctqD7QeSOhycqjBw3Mzb1cOUKpRIbD6eR5pxP2x/nJxdFEoaJY2Gkmo1E2AIlXqRwOjl9U7aqs7hT5ZutoasCQ9HjVpcoRKqXdwS8/sKyKn1sFDjAVQ2eglSmvTTT1WJi3QEzMSx7lsAsC2hSPrzveObJj54f7v7q+zDEKoijf2PbG8WXgQDqGWVu/K1E8sBwn6XPnJCUp7VwX+q49O384lEI/5XRy/Pp/vbkSxZNQHJ1lML1gyccnJymVSr5rzV1GlpYe+8G2jW+d9V2e5wVhaZGcsOIHbr4yeVQSZNX+Utc6SChK4pIdz2xrr/s5jpgF5dVL53Py5LPzdkfVii62qZGiLEntoI/jHTwnQHngCRoIPvl5f5d7YSjKvhspbcf94soq3iEPVfKKbjXcBJGWSeo67UtfTX5yhb/bXX12TjhIpeC+dUgPtWQSuBGipcVPYo/EGwqQGsxIY3oooKZw386RoaCOxI2k+EMNpBszkp0ZCiSqcd/9kuFABokbSWxucaP7OqyILjvkp9WYEYkKB9SJuBEiGNSSHswI7W5pINSYkUY67CdJzIhEHDuqVmBHvC06hQYzkqkOexUUZkRShAKUAjsSaMnAjpDZYXc/NWYkkwj7FQRmRFIEgzR2hPCEtAo3ZiQxPexR0JiRbLIlQCowIxLpDaoJ3EiKJqwjMjEjWXSgKY7EjEh9c7x06m68yKEdan/K1VsxR/L54suGL07FjOzbf+TwdiqAFxk3+ufD4yjMkXxGpUy4pP8ZPYu3qWcRaFqazmgnvB5PY08jRMMxmvC0Cbpst0/qcUR7VKdo/d0GiJymHq8JpCvd7yeI1jDcjRgKD1cmvUcpQBolr9vtwTK75J0rqFFQGrfO04RpCqM9WOP3EgRJZ2FbJzA0KZ6jNCganIhEe2DnIogcnAhJaH1aovtbV0xIUzqpzu5m0WNPl5tW/5dfant/Ku9FepFzBPkbRfP7N5sf+gEAAAAASUVORK5CYII=";
			
			cls.napTownMarker = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAwBQTFRFAAAAFhIWGhMiJBwVKyMbMikdLCYnNSwhOzMoPDg4PTlDXBgJQzYcUDsXQzkqRTwyXS4mWz86ahoHdhwHaCYOaSUQeCQMeCoUbTcgejckSEEoSkQ4WUkpU0g7XVIwY08kbkQ3YVUoaVYydko/c1orbWUoaWc9emQscmU0fHk3SUpFVU1DXFRIWlhYV1RqaE5CZVpLZV1UdUtBaWFPa2RYcmhZd3FcamlmcmtienNpfHl1hB0FkxgBiCYMiCsRlygMlS0RmTcAljIVgzgllzwhph0HuxkApigKqC0TozsBpjUXuSUGsi0QtzUJuTcVqj0hvDohjUgoiEs5mkMokEcwl10jlXMehWwmgW8zhnAugX0zmH0wqUYApEIcsE0AuFUAqUcrpE00ols3s0Qlt0owvVAstFM9umcWoGctilJCi2FVnmFPmGlak3ZRg3ttgnx1q19ItltDrWRPsWlWq3dqqn5xuXZjxRwB1xoAxyUFyysRxDENxjYT1CkF2DgC2zkY5h8D4CYC6D4AxEYAxkUfwlwA2FgAyEcnylk50Ukx3lI3yWYA0WwA2ncA2Xwa4kIA5VcC4VUY9FYA6GcB72YU4X0A4X0U/mUA+3QB9XwUxFtDyGNKxWRU1nJay3Zk23Zl4nxonIc1mZQ4o4YqrIE8pJc4tIwiu5covJowqrU3trE1i4JIkIJBn5hCioR6k4p8pY1Pp5JdtplBoZlzv61X2YkoxqAky6szw7401qcm3b0v07sw54QA5IoY84sA+ZYD+Z0Q74Ep/aIN/a0b7qIv6bwo+Kgr+7Esy4Rz0Ytn14l2xKRC3r9fxq9nxbFq44Vs7Ydy5Zhn46ZP5qdX8rFKyMY98Mkp5uQv7uU38Oo3+PM0ycFJ7OlC9Oph8ud/ioeCko2El5KKl5aUpYuCo5qJopyTso+Dq6SYvK+Mtq2erKqms62kubOovrmxyJWG3JWCw7SIw7usw76z3tCdzsGsysW808in0cu68u6G+PGBzcnB0c3H6OPY9e/f+PPBAAAAPnbNnAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAGuUlEQVRo3u2ZfVRTdRjHTZz3WjZKcIuuWPSixgZBjdiG997tBlzGBCssT7UYhll6zJ3sZVwdmHoG1LhB2NryJUtNjXKY9mbNUdiLWccyy7KXA5sY8ZIGRRpa6/e7G2ImMJBfxz/2jD/G2f3dz57v93nu77m7I/z/Q4wIQ8KQMCQMCUPOL4gaF3lRQ1wqBSHr/ffhAn0wstcOfLo1Fkt5KJAbk5IiI4Lv50zTmzk9x+n1mSzL6rlFlrJ+SGtyLbm5Oj3NTt89AOQm0UkCE+Nqv38tB87O0nQaTU6ls9mMDFavN5vNlj4wFkuOBRxOajQ0TTOz+4XgESd/Hyue+PK+RZw+g4wiJVSeedkKt9ttryov1IO0zNwTZ2OU5Sy2MBRJ0+APYtg9/UDGjEpRRFy+7usyM5sWFXVz5nKbrYJ3w/B4vtxfDrwxcyVnkYqzLM6mGaa4tLSqtKqYYfU5q/qE/PF6nKI27u11D7JTASLHaLPaeN5tFyBuT12d53HODChPnrFsCWfRMxSVV2rj7fDguqqVq1bu6Qvy25Zv/v7r+MFXrk4bJ829P8AAqwIrQdQ7nGUcV1y8ZMkLp9nBcWy2lpJwVhuE2N3vf9G/8XfVbE+ZdN3IiGlZBpvNZrRBiPDtPBBRV+dw1D9XZtYDTvGSwIo9XDFHayhKmmMMHG4fuIQTLxglHosT82ijES6qgGr15OEA4XQ43nt6mkAJBgfcJiWQIVB2htLxWyfiYtn2bbkgD7jGzgd8DzIcDkjzLIXtCXUDPUSSpJSaoTOAAALzoTTj8e+uTapt3bLxk0wbFEywBFovMKBmAAFezmX3cYtLikErZbE0lblcqwUM4VvtDyWTX+/488e3Nk/xM0EIzIUX1AKx/wOYUXUgJ88z1dXVlSUlnDVfCyH5AMKHJpd/wvevXiWPbHjk1oCR/CnfYTIffVUfMMbpdArauXmb0aA1GA0Gbb4BQCreCAmSEJ8Qr8T9/htgcdkCDNCKnqApTvja9fEup6MeIngrOD/wz6ATMrFanwoJcize52sgDvmvNBisQYjdHdTL4TjNfcDmbTZrvhEmAyCG/HwjKMd9IW1ao1NbfQkKf6pJFzDFLbh/KpUgRKg5mAnPVxgNQkAIX7EztJ0xwdeaGK9OmXevNWCKwBB8AT7U19cHZKsLskA2AYZOgPD8s5+HAkls8KnHXJo1F9QXaMbSEjNTUFRcWenoVcwJjYfWQ+OtwHFjvkGoYXh0esFjIUC8ap+XiH8gRkcun5EOei2NpCkaXr+ziyqdp0QTqksorgADOG/NlIIDWVY3e/fAg4QiNZWYdHcCeYlknISUAIRGo2EYJkvH6tkCZ13gMgaNt1fACwMIqJYhSyqlKA0z/RZ9buGAkL3rJ4hnbpqSJL1IEiWVkBQzZ/esPCY9nQEssA0XwRIQOh9ieOAJSESrvScmmiJZFm6KR8uPDgzZXPPSux9ek0FFgzSyV/d+cGQWyAfIsdRTfVqVCe2oiBkfLZHQg5i7ttV8+2ls/O1gv2ZW/ufDhQzD6oqcPcXsttuM2usvGy+VSJjBDXdJqSpi8osbVj9/1k+BPyxbWCVU24oVJZkx0migKvnQ4CbIoCkb+pp+jgiqZRdmZ4GtBIaGpPLmD3JM3bsJmHLgzrh+5jiA0eiAPTS40lMMEzP30KBn4W01B3dMEaf0Py8uTAfDAwxpzPwhDdyjMVkyrhpwLn005rb5Pw15qlequ9vFBOpbh9iujmQMNQTv7GjCUUNk3s4WXIEY0iDrapGLUd/O4V0dShw1JNbXVYubEEOUyV3NkXLUd794d0sSjhoS2dqxAN7XIYWolF1Nw6JXvz8WiLub5ZGoIVh7uxJ3IYYQps5aTI4Y0kB0N+E4Yogf62yTiZBDGjtVIgViSLL8mFckRgzxi7pacBFySHNHEnIIruxeMEqOGJKMnWgSYYghflF7O4Ecgrm6UkQmxJBI2QmXiEAMUeIdzedcxAP+Lox72+UYakisoluFJSOGpBLNjRE4Yoh/pNpLxG1FC/lsk7wp9or1iDN5c+bFY2fGIYbseOfggY3in9FCJk/44cDkSMSZvCaOTbxwzBkzi7dxeCFgaGk8jP2riL0uV8NwQ7DaXwjM1UtQKU0+/7BDUtpUop7nNgChbhx2T4BcssNNGNaThqkBgfHgzLi3TQwgDX6vyeRCUl1we1zQrhCJFSaVqxFRCcPLveKwF8NwIhVZn4BQxLraCEBRoIT4CRfYuTBMjRKCYym+FGzoW1dIkEYZLlcO0fTQ5TIR8nN5Uht+VB6GhCHnCeQfptAvPZXLgQwAAAAASUVORK5CYII=";
									
			cls.updateOwnerMarker = function() {
				if (!this.drawNode) return;
				if (this.ownerMarker != null) {
					this.ownerMarker.release();
					this.ownerMarker = null;
				}
				var x = webfrontend.res.Main.getInstance().regionlayer.otmimg[this.vis.getLOD()];
				if (x == -1) return;
				var w = webfrontend.res.Main.getInstance().getFileInfo(x);
				
				var image = null;
				
				if (this.playerId == webfrontend.data.Player.getInstance().getId()) {
					image = webfrontend.config.Config.getInstance().getImagePath(w.url);
				} else {
					var id = webfrontend.data.Alliance.getInstance().getId();
					if (id > 0) {
						if (this.allianceId == id) {
							image = this.allianceTownMarker;														
						} else {
							var rel = webfrontend.data.Alliance.getInstance().getRelationData();
							var isEnemy = false;
							var isAlly = false;
							var isNap = false;
							for (var i = 0; i < rel.length; i++) {									
								if (this.allianceId == rel[i].a) {
									if (rel[i].r == 2) {
										isEnemy = true;
									} else if (rel[i].r == 1) {																		
										isAlly = true;
									} else if (rel[i].r == 3) {																		
										isNap = true;
									}

									break;
								}
							}

							if (isEnemy) {
								image = this.enemyTownMarker;
							} else if (isAlly) {
								image = this.allyTownMarker;
							} else if (isNap) {
								image = this.napTownMarker;
							}
						}
					}
				}
				
				if (image != null) {
					this.ownerMarker = webfrontend.draw.ImageNode.create(this.vis.scene, this.drawNode.getX() + 14, this.drawNode.getY() + 14, w.width, w.height, image);
					this.ownerMarker.setSortOrder(webfrontend.draw.Node.sortType_UI);
				}
			};

		}
	}
});

qx.Class.define("bos.Utils", {
	type: "singleton",
	extend: qx.core.Object,
	statics: {
		_popupsCount: 0,
		convertIdToCoodrinates: function(id) {
			var o = this.convertIdToCoordinatesObject(id);
			return o.xPos + ":" + o.yPos;
		},
		convertIdToCoordinatesObject: function(id) {
			var o = {
				xPos: (id & 0xFFFF),
				yPos: (id >> 16),				
			}
			o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
			return o;
		},
		extractCoordsFromClickableLook: function(pos) {
			if (pos == null)
				return null;

			if (pos.substring != undefined) {
				var startPos = pos.indexOf("\">");
				var endPos = pos.indexOf("</div>");
				if (startPos < endPos) {
					var coords = pos.substring(startPos + 2, endPos);
					var spacePos = pos.indexOf(" ");
					if (spacePos > 0) {
						coords = coords.substring(spacePos);
					}
					return coords;
				} else {
					return pos;
				}
			}
			return pos;
		}, 
		translateOrderType: function(type) {
			switch(type) {
				case 0:
					return qx.locale.Manager.tr("tnf:unknown");
				case 1:
					return qx.locale.Manager.tr("tnf:scout");
				case 2:
					return qx.locale.Manager.tr("tnf:plunder");
				case 3:
					return qx.locale.Manager.tr("tnf:assult");
				case 4:
					return qx.locale.Manager.tr("tnf:support");
				case 5:
					return qx.locale.Manager.tr("tnf:siege");
				case 8:
					return qx.locale.Manager.tr("tnf:raid");
				case 9:
					return qx.locale.Manager.tr("tnf:settle");
				case 10:
					return qx.locale.Manager.tr("tnf:boss raid");					
			}
			return "??? " + type;
		}, 
		translateArray: function(arr) {
			var translated = [];
			for (var i = 0; i < arr.length; i++) {
				translated.push(tr(arr[i]));
			}
			return translated;
		},
		createCitiesTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});

			sb.setToolTipText(tr("filter by: city types"));
				
			return sb;
		}, 
		populateCitiesTypesSelectBox: function(sb, onlyMilitary) {					
			if (sb == null) {
				return;
			}
			
			if (onlyMilitary == undefined) {
				onlyMilitary = false;
			}
			
			sb.removeAll();

			sb.add(new qx.ui.form.ListItem(tr("all"), null, "A"));
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("building"), null, "B"));
			}
			sb.add(new qx.ui.form.ListItem(tr("castles"), null, "C"));
			sb.add(new qx.ui.form.ListItem(tr("defensive"), null, "D"));
			
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("warehouses"), null, "W"));
				sb.add(new qx.ui.form.ListItem(tr("moonstones"), null, "M"));
				sb.add(new qx.ui.form.ListItem(tr("gold"), null, "G"));
				var list = bos.Storage.getInstance().getCustomCityTypes();
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					sb.add(new qx.ui.form.ListItem(item.description, null, item.letter));
				}
			}
		},
		makeClickable: function(msg, color) {
			return qx.lang.String.format("<div style=\"cursor:pointer;color:%1\">%2</div>", [color, msg]);			
		},
		makeColorful: function(msg, color) {
			return qx.lang.String.format("<font color=\"%1\">%2</font>", [color, msg]);			
		},
		handleError: function(message) {
			//TODO make it nicer than alert box (webfrontend.gui.ConfirmationWidget)
			bos.Utils._alert(message);
		},
		handleWarning: function(message) {
			bos.Utils._alert(message);
		},
		handleInfo: function(message) {
			alert(message);
		},
		_alert: function(message) {
			if (bos.Utils._popupsCount < bos.Const.MAX_POPUPS) {
				alert(message);
				bos.Utils._popupsCount++;
			}
		}
	}
});

qx.Class.define("bos.CityTypes", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		//nothing to do
	}, members: {
		parseReference: function(ref) {
			var result = {
				isCastle: false,
				isBuildInProgress: false,
				isWarehouse: false,
				hasMoonglowTower: false,
				isGold: false,
				isDefensive: false,
				customTypes: new qx.data.Array([])
			};

			if (ref == null) {
				return result;
			}

			var insideOptions = false;
			for (var i = 0; i < ref.length; i++) {
				var c = ref.charAt(i);
				if (c == '*') {
					insideOptions = !insideOptions;
				} else if (insideOptions) {
					switch (c) {
						case 'C':
							result.isCastle = true;
							break;
						case 'B':
							result.isBuildInProgress = true;
							break;
						case 'W':
							result.isWarehouse = true;
							break;
						case 'M':
							result.hasMoonglowTower = true;
							break;
						case 'G':
							result.isGold = true;
							break;
						case 'D':
							result.isDefensive = true;
							break;
						default:
							result.customTypes.push(c);
							break;
					}
				}
			}

			return result;

		}, getCastles: function() {
			return this._getCitiesByType("isCastle");
		}, getCitiesWithMoonglowTower: function() {
			return this._getCitiesByType("hasMoonglowTower");
		}, getCitiesBuildInProgress: function() {
			return this._getCitiesByType("isBuildInProgress");
		}, _getCitiesByType: function(typeName) {
			var list = [];

			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];

				var types = this.parseReference(city.reference);
				if (types[typeName]) {
					list.push(cityId);
				}
			}

			return list;
		}, isReservedLetter: function(letter) {
			switch (letter) {
				case 'A':
				case 'C':
				case 'B':
				case 'W':
				case 'M':
				case 'G':
				case 'D':
					return true;
			}
			return false;
		}
	}
});

qx.Class.define("bos.City", {
	extend: qx.core.Object,
	construct: function() {
		this.resources = new Object();
		this.setId(-1);
		//this.setRequestId(-1);
	}, destruct: function() {

		delete this.resources;
		delete this.buildQueue;
		delete this.units;
		delete this.traders;

		delete this.unitOrders;
		delete this.tradeOrders;

	}, statics: {
			SERIALIZABLE_MEMBERS: ["resources", "units", "buildQueue", "unitQueue", "recruitingSpeed", "unitOrders", "incomingUnitOrders", "supportOrders", "traders", "tradeOrders", "tradeIncoming"],
			createFromSimpleObject: function(o) {
				var c = new bos.City();
				var props = qx.Class.getProperties(c.constructor);

				o["lastUpdated"] = new Date(o["lastUpdated"]);

				for (var prop in props) {
					var name = props[prop];
					try {
							if (o[name] != undefined) {
									c.set(name, o[name]);
							}
					} catch (e) {
							debug(name + " " + e);
					}
				}

				var members = bos.City.SERIALIZABLE_MEMBERS;
				for (var key in members) {
						var m = members[key];
						c[m] = o[m];
				}

				return c;
			}
	}, properties: {
		id: {
				init: -1
		},
		lastUpdated: {
				init: null
		},
		//requestId: {
				//apply: bk
		//}, id: {
		//        event: bK
		// }, version: {
		//        init: -1,
		//        event: ba
		onWater: {
				init: false
		}, unitCount: {
				init: 0
		}, unitLimit: {
				init: 0
		}, unitsInQueue: {
				init: 0
		}, buildingCount: {
				init: 0
		}, buildingLimit: {
				init: 0
		}, buildingsInQueue: {
				init: 0
		}, strongHold: {
				init: false
		}, sieged: {
				init: false
		}, canRecruit: {
				init: false
		}, canCommand: {
				init: false
		}, orderLimit: {
				init: 0
		}, barracksLevel: {
				init: 0
		}, townhallLevel: {
				init: 0
		}, marketplaceLevel: {
				init: 0
		}, harborLevel: {
				init: 0
		}, wallLevel: {
				init: 0
		}, hideoutSize: {
				init: 0
		}, foodConsumption: {
				init: 0
		}, foodConsumptionSupporter: {
				init: 0
		}, foodConsumptionQueue: {
				init: 0
		}, buildTimeAbsMod: {
				init: 0
		}, buildTimePercentMod: {
				init: 0
		}, plunderProtection: {
				init: 0
		}, goldProduction: {
				init: 0
		}, name: {
				init: ""
		}, reference: {
				reference: ""
		}, text: {
				init: ""
		}
	}, members: {
		resources: null,
		units: null,
		buildQueue: null,
		unitQueue: null,
		recruitingSpeed: null,
		unitOrders: null,
		incomingUnitOrders: null,
		tradeOrders: null,
		tradeIncoming: null,
			//----------------
	toSimpleObject : function() {
					var o = {};

					var props = qx.Class.getProperties(this.constructor);
					for (var prop in props) {
						var name = props[prop];
						try {
								if (qx.lang.Type.isString(name) && name.indexOf("function ") != 0) {
										o[name] = this.get(name);
								}
						} catch (e) {
								debug(name + " " + e);
						}
					}

					//qx does strange things for date object when serializing to JSON, below is workaround
					o["lastUpdated"] = this.getLastUpdated().getTime();

					var members = bos.City.SERIALIZABLE_MEMBERS;
					for (var key in members) {
						var m = members[key];
						o[m] = this[m];
					}

					return o;
			},
			//----------------
			populate: function(other) {

					this.setLastUpdated(new Date());

					this.resources = new Object();
					this.setId(-1);
					//this.setRequestId(-1);

					var props = qx.Class.getProperties(this.constructor);
					for (var prop = 0; prop < props.length; prop++) {
					//for (var prop in props) {
						var name = props[prop];
						try {
							if (qx.lang.Type.isString(name)) {
									this.set(name, other.get(name));
							}
						} catch (e) {
							//debug(name + " " + e);
						}
					}

					this.setId(parseInt(this.getId()));

					for (var res = 1; res <= 4; res++) {

						this.resources[res] = {
							step: 0,
							base: 0,
							delta: 0,
							max: 0
						};

						if (other.resources.hasOwnProperty(res)) {
							var thisRes = this.resources[res];
							var otherRes = other.resources[res];
							thisRes.step = otherRes.step;
							thisRes.base = otherRes.base;
							thisRes.delta = otherRes.delta;
							thisRes.max = otherRes.max;
						}
					}

					this.buildQueue = new Array();

					if (other.hasBuildQueue()) {
						for (var i = 0; i < other.buildQueue.length; i++) {
							var item = other.buildQueue[i];
							this.buildQueue[i] = {
								id: item.id,
								building: item.building,
								state: item.state,
								start: item.start,
								end: item.end,
								type: item.type,
								level: item.level,
								x: item.x,
								y: item.y,
								isPaid: item.isPaid
							};
						}
					}

					this.units = new Object();
					if (other.getUnits() != null) {
						for (var key in other.getUnits()) {
							var item = (other.getUnits())[key];
							this.units[key] = {
								count: item.count,
								total: item.total,
								speed: item.speed
							};
						}
					}

					this.unitQueue = new Array();
					if (other.hasUnitQueue()) {
						for (var i = 0; i < other.unitQueue.length; i++) {
							var item = other.unitQueue[i];
							this.unitQueue[i] = {
								id: item.id,
								type: item.type,
								count: item.count,
								batch: item.batch,
								left: item.left,
								start: item.start,
								end: item.end,
								isPaid: item.isPaid
							};
						}
					}

					this.traders = new Object();
					if (other.traders != null) {
						for (var key in other.traders) {
							var item = other.traders[key];
							this.traders[key] = {
								count: item.count,
								total: item.total,
								order: item.order
							};
						}
					}


					this.unitOrders = new Array();
					if (other.unitOrders != null) {
						for (var i = 0; i < other.unitOrders.length; i++) {
							var item = other.unitOrders[i];
							this.unitOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: item.units,
								isDelayed: item.isDelayed,
								recurringType: item.recurringType,
								recurringEndStep: item.recurringEndStep,
								quickSupport: item.quickSupport
							};
						}
					}

					this.supportOrders = new Array();
					if (other.supportOrders != null) {
						for (var i = 0; i < other.supportOrders.length; i++) {
							var item = other.supportOrders[i];

							this.supportOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: new Array(),
								quickSupport: item.quickSupport
							};

							for (var u = 0; u < item.units.length; u++) {
								this.supportOrders[i].units[u] = {
									type: item.units[u].type,
									count: item.units[u].count
								};
							}
						}
					}

					this.tradeOrders = new Array();
					if (other.tradeOrders != null) {
						for (var i = 0; i < other.tradeOrders.length; i++) {
							var item = other.tradeOrders[i];
						
							this.tradeOrders[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeOrders[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}
					
					this.tradeIncoming = new Array();
					if (other.tradeIncoming != null) {
						for (var i = 0; i < other.tradeIncoming.length; i++) {
							var item = other.tradeIncoming[i];
						
							this.tradeIncoming[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeIncoming[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}					
					
			},
			//----------------
			getIncomingUnitOrders: function() {
				return this.incomingUnitOrders;
			}, getUnitTypeInfo: function(g) {
				if (this.units != null && this.units.hasOwnProperty(g)) return this.units[g];
				return {
					count: 0,
					total: 0,
					speed: -1
				};
			}, getBuildQueue: function() {
					return this.buildQueue;
			}, hasBuildQueue: function() {
					return this.buildQueue != null;
			}, getUnitQueue: function() {
					return this.unitQueue;
			}, hasUnitQueue: function() {
					return this.unitQueue != null;
			}, getAvailableUnitQueueSpace: function() {
					var e = webfrontend.data.Player.getInstance().getMaxUnitQueueSize();
					if (this.unitQueue != null) {
							e -= this.unitQueue.length;
					}
					return e;
			}, getUnitOrders: function() {
					return this.unitOrders;
			}, getSupportOrders: function() {
					return this.supportOrders;
			}, getRecruitingSpeed: function() {
					return this.recruitingSpeed;
			}, getIncomingUnitOrders: function() {
					return this.incomingUnitOrders;
			}, getUnits: function() {
					return this.units;
			}, getTraders: function() {
					return this.traders;
			}, getTradeOrders: function() {
					return this.tradeOrders;
			}, getTradeOffers: function() {
					return this.tradeOffers;
			}, getTradeIncoming: function() {
					return this.tradeIncoming;
			}, getOrder: function(d) {
					if (this.unitOrders != null) {
					for (var i = 0; i < this.unitOrders.length; i++) if (this.unitOrders[i].id == d) return this.unitOrders[i];
					}
					if (this.incomingUnitOrders != null) {
					for (var i = 0; i < this.incomingUnitOrders.length; i++) if (this.incomingUnitOrders[i].id == d) return this.incomingUnitOrders[i];
					}
					if (this.supportOrders != null) {
					for (var i = 0; i < this.supportOrders.length; i++) if (this.supportOrders[i].id == d) return this.supportOrders[i];
					}
					return null;
			}, getResourceCount: function(F) {
					if (!this.resources.hasOwnProperty(F)) return 0;
					var G = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (G == 0) return 0;
					var I = G - this.resources[F].step;
					var H = this.resources[F].delta;
					if (F == 4) {
					H -= this.getFoodConsumption() + this.getFoodConsumptionSupporter();
					}
					var J = I * H + this.resources[F].base;
					J = Math.max(0, Math.min(J, this.resources[F].max));
					return J;
			}, getResourceGrowPerHour: function(a) {
					if (!this.resources.hasOwnProperty(a)) return 0;
					return this.resources[a].delta * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, getResourceMaxStorage: function(f) {
					if (!this.resources.hasOwnProperty(f)) return 0;
					return this.resources[f].max;
			}, getResourceStorageFullTime: function(K) {
					if (!this.resources.hasOwnProperty(K)) return new Date(0);
					var L = this.getResourceGrowPerHour(K);
					if (L <= 0) return new Date(0);
					var M = this.resources[K].step + (this.resources[K].max - this.resources[K].base) / this.resources[K].delta;
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= M) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(M);
			}, getResourceStorageEmptyTime: function(l, m) {
					if (!this.resources.hasOwnProperty(l)) return new Date(0);
					var n = this.resources[l].step + this.resources[l].base / -(this.resources[l].delta - m);
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(n);
			}, getResourceCountTime: function(o, p) {
					if (!this.resources.hasOwnProperty(o)) return new Date(0);
					if (this.resources[o].delta <= 0) return new Date(0);
					var q = this.resources[o].step + (p - this.resources[o].base) / this.resources[o].delta;
					return webfrontend.data.ServerTime.getInstance().getStepTime(q);
			}, countDefenders: function() {
					if (this.units == null || this.units.length == 0) return 0;
					var c = 0;
					for (var b in this.units) c += this.units[b].count;
					return c;
			}, getGoldGrowPerHour: function() {
					return this.getGoldProduction() * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, _applyId: function(O, P) {
					if (O != -1 && P == -1) webfrontend.net.UpdateManager.getInstance().addConsumer(Y, this);
					if (O == -1 && P != -1) {
							webfrontend.net.UpdateManager.getInstance().removeConsumer(Y);
							this.setId(-1);
					}
			}, getSupportMoving: function(r) {
					r = r || false;
					var u = [];
					var t = this.getUnitOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4) {
							if (t[i].state == 1 || t[i].state == 2) {
									u[u.length] = [t[i], 0];
							}
							}
					}
					}
					var t = this.getSupportOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4 && t[i].state == 1) {
							u[u.length] = [t[i], 1];
							}
					}
					}
					return u;
			},
			//MINE
			buildQueueOcuppied: function() {
					if (this.buildQueue == null || this.buildQueue.length == 0) {
							return null;
					}
					return (this.buildQueue[this.buildQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			unitQueueOcuppied: function() {
					if (this.unitQueue == null || this.unitQueue.length == 0) {
							return null;
					}
					return (this.unitQueue[this.unitQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			setResourceCount: function(res, count) {
					if (!this.resources.hasOwnProperty(res)) {
							return;
					}

					var serverStep = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (serverStep == 0) return;

					this.resources[res].step = serverStep;
					this.resources[res].base = count;
			},
			getFoodBalance: function() {
					var steps = webfrontend.data.ServerTime.getInstance().getStepsPerHour();
					var foodGrow = Math.floor(this.getResourceGrowPerHour(bos.Const.FOOD) + 0.5);
					var foodCons = Math.round(this.getFoodConsumption() * steps);
					var foodConsQueue = Math.round(this.getFoodConsumptionQueue() * steps);
					var foodConsSupport = Math.round(this.getFoodConsumptionSupporter() * steps);

					var foodBalance = foodGrow - foodCons - foodConsQueue - foodConsSupport;
					return foodBalance;
			}, 
			getTradeIncomingResources: function(resType) {
				var totalRes = 0;
				if (this.tradeIncoming == null) {
					return totalRes;
				}
				var now = webfrontend.data.ServerTime.getInstance().getServerStep();
				for (var i = 0; i < this.tradeIncoming.length; i++) {
					var order = this.tradeIncoming[i];
					if (order.end >= now) {
						for (var j = 0; j < order.resources.length; j++) {
							var r = order.resources[j];
							if (r.type == resType) {
								totalRes += r.count;
							}
						}
					}
				}
				return totalRes;
			}
	}
});

//application
var a;

var summaryWidget = null;

var combatCalculatorWidget = null;

var foodCalculatorWidget = null;

var recruitmentSpeedCalculatorWidget = null;

var reportsTweaked = false;

window.setTimeout(checkIfLoaded, 1000);

function checkIfLoaded() {
	if (qx.$$domReady == true) {
		a = qx.core.Init.getApplication();

		if (a && a.chat && a.cityInfoView && a.title.reportButton) {
			bos.Tweaks.getInstance().gameStarted();
		}
		else
			window.setTimeout(checkIfLoaded, 1000);
	} else {
		window.setTimeout(checkIfLoaded, 1000);
	}
}

function onJump() {
		var cwac = jumpCoordsDialog();
		cwac.askCoords();
		a.allowHotKey = false;
		a.getDesktop().add(cwac, {left: 0, right: 0, top: 0, bottom: 0});
}

function onSummary() {
	server.updateCity();
	var summary = getSummaryWidget();
	summary.updateView();
	/*
	if (a.getCurrentOverlay() == summary) {
			a.switchOverlay(null);
	} else {
			a.switchOverlay(summary, bos.Const.EXTRA_WIDE_OVERLAY);
	}
	*/
	if (summary.isVisible()) {
	  summary.close();
	} else {
	  summary.open();
	}
}

function getSummaryWidget() {
	if (summaryWidget == null) {
		summaryWidget = new bos.gui.SummaryWidget();
		if (bos.Storage.getInstance().getLoadPersistedCitiesAtStart()) {
			summaryWidget.loadPersistedCities();
		}
		if (bos.Storage.getInstance().getLoadTableSettingsAtStart()) {
			summaryWidget.loadPersistedTableSettings();
		}
	}
	return summaryWidget;
}

function onCombatCalc() {
	server.updateCity();
	var widget = getCombatCalculatorWidget();
	//widget.updateView();
	if (a.getCurrentOverlay() == widget) {
		a.switchOverlay(null);
	} else {
		a.switchOverlay(widget, bos.Const.EXTRA_WIDE_OVERLAY);
	}
}

function onFoodCalc() {
	server.updateCity();
	var widget = getFoodCalculatorWidget();
	if (a.getCurrentOverlay() == widget) {
		a.switchOverlay(null);
	} else {
		a.switchOverlay(widget);
	}
}

function onRecruitmentSpeedCalc() {
	server.updateCity();
	var widget = getRecruitmentSpeedCalculatorWidget();
	if (a.getCurrentOverlay() == widget) {
		a.switchOverlay(null);
	} else {
		a.switchOverlay(widget);
	}
}				



function getCombatCalculatorWidget() {
	if (combatCalculatorWidget == null) {
		combatCalculatorWidget = new bos.gui.CombatCalculatorWidget();
	}
	return combatCalculatorWidget;
}

function getFoodCalculatorWidget() {
	if (foodCalculatorWidget == null) {
		foodCalculatorWidget = new bos.gui.FoodCalculatorWidget();
	}
	return foodCalculatorWidget;
}

function getRecruitmentSpeedCalculatorWidget() {
	if (recruitmentSpeedCalculatorWidget == null) {
		recruitmentSpeedCalculatorWidget = new bos.gui.RecruitmentSpeedCalculatorWidget();
	}
	return recruitmentSpeedCalculatorWidget;
}

qx.Class.define("bos.gui.SummaryPage", {
	extend: qx.ui.tabview.Page,
	construct: function() {
		qx.ui.tabview.Page.call(this);
	}, members: {
		_table: null,
		_tableModel: null,
		_addBlankValuesToRow: function(row, tableModel) {
			//it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				row[tableModel.getColumnId(col)] = "";
			}
		}, updateView: function() {
			if (this._tableModel == null) {
				return;
			}
			var prevSortColumnIndex = this._tableModel.getSortColumnIndex();
			var isSortAscending = this._tableModel.isSortAscending();
			this._tableModel.setDataAsMapArray(this.createRowData(), false);
			if (prevSortColumnIndex >= 0) {
				this._tableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
			}	
		}, _setupSorting: function(tableModel) {
			tableModel.setCaseSensitiveSorting(false);

			var compare = {
				ascending  : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveAscending,
				descending : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveDescending
			};

			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				tableModel.setSortMethods(col, compare);
			}
		}
	}
});

qx.Class.define("bos.ui.table.Table", {
	extend: qx.ui.table.Table,
	construct: function(tableModel, custom) {
		//this.base(arguments);
		qx.ui.table.Table.call(this, tableModel, custom);
		this._setupTableLookAndFeel();
	}, members:  {
		_setupTableLookAndFeel: function() {
			this.setStatusBarVisible(false)
			var focusedRowBGColor = "#555555";
			var rowBGColor = "#373930";
			this.setDataRowRenderer(new webfrontend.gui.RowRendererCustom(this, focusedRowBGColor, focusedRowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor));
			this.setHeaderCellHeight(22);
			var tcm = this.getTableColumnModel();
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {								
				tcm.setDataCellRenderer(col, new bos.ui.table.cellrenderer.Default());
			}										
				
		}, applyTableSettings: function(settings, tableName) {
			if (settings == null) {
					return;
			}
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			if (tcm.getOverallColumnCount() != settings.columns.length) {
					if(locale == "de"){
						bos.Utils.handleError("Die gespeicherten Werte sind für eine Tabelle mit " + settings.columns.length + "Spalten, diese Tabelle hat jedoch " + tcm.getOverallColumnCount() );
					} else {
						bos.Utils.handleError("Saved settings are for table with " + settings.columns.length + " but table has " + tcm.getOverallColumnCount() + " columns. Please save your '" + tableName + "' table layout again");
					}
					return;
			}

			var colOrder = [];
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {
				var c = settings.columns[col];
				tcm.setColumnVisible(col, c.visible);
				tcm.setColumnWidth(col, c.width);

				colOrder.push(c.columnAt);
			}
			tcm.setColumnsOrder(colOrder);

			if (settings.sortColumnIndex >= 0 && settings.sortColumnIndex < tcm.getOverallColumnCount()) {
					tm.sortByColumn(settings.sortColumnIndex, settings.sortAscending);
			}

		}, saveTableSettings: function(tableName) {
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			var settings = {
				sortColumnIndex: tm.getSortColumnIndex(),
				sortAscending: tm.isSortAscending(),
				columns: []
			};
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {

				var c = {
					visible: tcm.isColumnVisible(col),
					width: tcm.getColumnWidth(col),
					columnAt: tcm.getOverallColumnAtX(col)
				};
				settings.columns.push(c);
			}

			bos.Storage.getInstance().setTableSettings(settings, tableName);

		}, exportToCsv: function() {
			var tableModel = this.getTableModel();
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\t";
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				if (col > 0) {
						sb.add(sep);
				}
				sb.add(tableModel.getColumnName(col));
			}
			sb.add("\n");

			for (var row = 0; row < tableModel.getRowCount(); row++) {
				var rowData = tableModel.getRowData(row);
				for (var col = 0; col < tableModel.getColumnCount(); col++) {
						if (col > 0) {
								sb.add(sep);
						}
						sb.add('"', bos.Utils.extractCoordsFromClickableLook(rowData[col]), '"');
				}
				sb.add("\n");
			}

			var dialog = new webfrontend.gui.ConfirmationWidget();
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea(sb.get()).set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable();}, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});

		}	
	}
});

qx.Class.define("bos.gui.TradeOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("carts"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnIds = ["id", "cityId", "from", "type", "transport", "state", "start", "end", "position", "target",   
					"lastUpdated", "resources"];		
					
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		columnModel.setColumnWidth(5, 70);		
		
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(9, 125);
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 80);
		columnModel.setDataCellRenderer(10, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(11, 180);
		
		this.add(this.table, {flex: 1});
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var sel;
			
			var filterTypeId = -1;
			sel = this.sbTradeTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}	

			var filterTransportTypeId = -1;
			sel = this.sbTransportTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTransportTypeId = sel[0].getModel();
			}

			var filterTargetTypeId = -1;
			sel = this.sbTargetTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTargetTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}						
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var now = serverTime.getServerStep();
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.tradeOrders == null) {
					continue;
				}
				
				for (var i = 0; i < city.tradeOrders.length; i++) {
					var item = city.tradeOrders[i];

					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					if (filterTransportTypeId != -1 && filterTransportTypeId != item.transport) {
						continue;
					}
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					if (filterTargetTypeId != -1) {
						if (filterTargetTypeId == 1 && item.player != playerId) {
							continue;
						} else if (filterTargetTypeId == 2 && item.player == playerId) {
							continue;
						}
					}
					
					var timeSpan = item.end - item.start;
					if (item.end + timeSpan < now) {
						continue;
					}					
				
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);

					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = this.translateType(item.type);
					row["state"] = this.translateState(item.state);
					row["transport"] = this.translateTransport(item.transport);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["resources"] = "";
					
					if (item.resources != null) {					
						for (var u = 0; u < item.resources.length; u++) {
							var trade = item.resources[u];
							if (u > 0) {
								row["resources"] += ", ";
							}
							var resource = res.resources[trade.type];
							row["resources"] += trade.count + " " + resource.dn;
						}
					}


					row["lastUpdated"] = city.getLastUpdated();
					
					rowData.push(row);
				}

			}
			
			return rowData;
		}, translateState: function(state) {
			switch (state) {
				case bos.Const.TRADE_STATE_TRANSPORT:
					return "transport";
				case bos.Const.TRADE_STATE_RETURN:
					return this.tr("tnf:returns");			
			}

			return "??? " + state;			
		}, translateType: function(type) {
			switch (type) {
				case 1:
					return this.tr("tnf:trade");
				case 2:
					return "transfer";
			}

			return "??? " + type;
		}, translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("tnf:ships");
			}
	

			return "??? " + type;
		}, _handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, _createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbTradeTypes = this._createTradeTypesSelectBox();
			this.sbTradeTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTradeTypes);
			
			this.sbStates = this._createStatesSelectBox();
			this.sbStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbStates);			
			
			this.sbTransportTypes = this._createTransportTypesSelectBox();
			this.sbTransportTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTransportTypes);
			
			this.sbTargetTypes = this._createTargetTypesSelectBox();
			this.sbTargetTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTargetTypes);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}, _createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by trade type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, _createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: transport type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, _createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("filter by: resources receiver");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(tr("you"), null, 1));
			sb.add(new qx.ui.form.ListItem(tr("someone else"), null, 2));

			return sb;		
		}, _createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: state"));
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}
	}
});


qx.Class.define("bos.gui.TradeRouteWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		this.setLayout(new qx.ui.layout.Dock());
		
		this.set({
			width: 440,
			minWidth: 200,
			maxWidth: 600,
			height: 440,
			minHeight: 200,
			maxHeight: 600,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("trade route")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {flex: true});
		
		scroll.add(this.createForm());		

		container.add(this.createFooter());
		
		this.add(container);
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);

	}, 
	members: {
		sbTo: null,
		sbFrom: null,	
		sbTransport: null,
		sbGroup: null,			
		woodInput: null,
		stoneInput: null,
		ironInput: null,
		foodInput: null,
		editedRoute: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.woodInput.setValue(0);
			this.stoneInput.setValue(0);
			this.ironInput.setValue(0);
			this.foodInput.setValue(0);				
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button(tr("OK"));
			btnAdd.setWidth(70);					
			container.add(btnAdd);
			btnAdd.addListener("click", this.addTradeRoute, this);

			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnMax = new qx.ui.form.Button(tr("max"));
			btnMax.setWidth(70);
			container.add(btnMax);
			btnMax.addListener("click", this.maxResources, this);				

			return container;
		}, 
		addTradeRoute: function() {

			var route = {};

			route.from = parseInt(this.sbFrom.getSelection()[0].getModel());
			route.to = parseInt(this.sbTo.getSelection()[0].getModel());
			
			route.wood = parseInt(this.woodInput.getValue());
			route.stone = parseInt(this.stoneInput.getValue());
			route.iron = parseInt(this.ironInput.getValue());
			route.food = parseInt(this.foodInput.getValue());
			
			if (route.wood < bos.Const.SHIP_CAPACITY) {
				route.wood *= 1000;
			}
			if (route.stone < bos.Const.SHIP_CAPACITY) {
				route.stone *= 1000;
			}
			if (route.iron < bos.Const.SHIP_CAPACITY) {
				route.iron *= 1000;
			}
			if (route.food < bos.Const.SHIP_CAPACITY) {
				route.food *= 1000;
			}				
			
			route.transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			route.group = this.sbGroup.getSelection()[0].getModel();				
			
			var sum = route.wood + route.stone + route.iron + route.food;
			if (sum == 0) {
				bos.Utils.handleWarning(tr("please enter some resources amount"));
				return;
			}
			
			if (route.from == route.to) {
				bos.Utils.handleWarning(tr("invalid destination"));
				return;					
			}
			
			var storage = bos.Storage.getInstance();
			if (this.editedRoute == null) {					
				storage.addTradeRoute(route);
			} else {
				this.editedRoute.from = route.from;
				this.editedRoute.to = route.to;
				
				this.editedRoute.wood = route.wood;
				this.editedRoute.stone = route.stone;
				this.editedRoute.iron = route.iron;
				this.editedRoute.food = route.food;				
			
				this.editedRoute.transport = route.transport;
				this.editedRoute.group = route.group
				//refactor it later
				storage.saveTradeRoutes();
				storage.setTradeRoutesVersion(storage.getTradeRoutesVersion() + 1);
			}
			
			this.editedRoute == null;
			
			this.close();
			
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			container.add(new qx.ui.basic.Label(tr("from")), {
				row: 1, 
				column : 0
			});	

			var selectWidth = 320;
			
			this.sbFrom = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbFrom);
			container.add(this.sbFrom, {
				row: 1,
				column: 1
			});

			container.add(new qx.ui.basic.Label(tr("to")), {
				row: 2, 
				column : 0
			});					
			this.sbTo = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbTo);
			container.add(this.sbTo, {
				row: 2,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:wood")), {
				row: 3, 
				column : 0
			});
			this.woodInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.woodInput.setWidth(120);
			container.add(this.woodInput, {
				row: 3,
				column: 1
			});					
		
			container.add(new qx.ui.basic.Label(this.tr("tnf:stone")), {
				row: 4, 
				column : 0
			});
			this.stoneInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.stoneInput.setWidth(120);
			container.add(this.stoneInput, {
				row: 4,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:iron")), {
				row: 5, 
				column : 0
			});
			this.ironInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.ironInput.setWidth(120);
			container.add(this.ironInput, {
				row: 5,
				column: 1
			});	
			
			container.add(new qx.ui.basic.Label(this.tr("tnf:food")), {
				row: 6, 
				column : 0
			});
			this.foodInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.foodInput.setWidth(120);
			container.add(this.foodInput, {
				row: 6,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("transport")), {
				row: 7, 
				column : 0
			});					
			this.sbTransport = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});	
			
			this.sbTransport.add(new qx.ui.form.ListItem(tr("ships then carts"), null, bos.Const.TRADE_TRANSPORT_SHIP_FIRST));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("carts then ships"), null, bos.Const.TRADE_TRANSPORT_CART_FIRST));							
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only carts"), null, bos.Const.TRADE_TRANSPORT_CART));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only ships"), null, bos.Const.TRADE_TRANSPORT_SHIP));
			
			container.add(this.sbTransport, {
				row: 7,
				column: 1
			});
			
			container.add(new qx.ui.basic.Label(tr("group")), {
				row: 8, 
				column : 0
			});	
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 200,
				height: 28
			});	
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			container.add(this.sbGroup, {
				row: 8,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("resourceMultiplierNotice")), {
				row: 9, 
				column : 0,
				colSpan: 2
			});					
		
			return box;
		}, _populateCitiesSelectBox: function(sb) {

			sb.removeAll();
			
			var list = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];
				var name = city.name;
				if (city.reference != null && city.reference != "") {
					name += " [" + city.reference + "]";
				}
				list.push({
					id: parseInt(cityId),
					name: name
				});
			}
			
			
			list.sort(function(a, b) {
				var n1 = a.name.toLowerCase();
				var n2 = b.name.toLowerCase();
				if (n1 > n2) {
					return 1;
				} else if (n1 < n2) {
					return -1;
				} else if (a.id > b.id) {
					return 1;
				} else if (a.id < b.id) {
					return -1;
				} else {
					return 0;
				}
			});
			
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				sb.add(new qx.ui.form.ListItem(item.name, null, item.id));
			}

		}, editRoute: function(route) {
			this.editedRoute = route;
			
			this.sbFrom.setModelSelection([route.from]);
			this.sbTo.setModelSelection([route.to]);
			
			this.woodInput.setValue(route.wood);
			this.stoneInput.setValue(route.stone);
			this.ironInput.setValue(route.iron);
			this.foodInput.setValue(route.food);
			
			this.sbTransport.setModelSelection([route.transport]);
			this.sbGroup.setModelSelection([route.group]);
							
		}, addNewRoute: function() {
			this.editedRoute = null;
			var city = webfrontend.data.City.getInstance();
			this.sbFrom.setModelSelection([parseInt(city.getId())]);
		}, maxResources: function() {
			var from = parseInt(this.sbFrom.getSelection()[0].getModel());
			var city = server.cities[from];
			if (city == undefined) {
				bos.Utils.handleError("Don't have data about selected 'from' city");
				return;
			}
						
			var wood = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
			var stone = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
			var iron = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
			var food = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
			/* TODO do it later, not so important
			var totalRes = wood + stone + iron + food;
			
			var transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			
			var dg = city.getTraders();
			if (dg != null) {
				var carts = dg[bos.Const.TRADE_TRANSPORT_CART].total;
				var ships = dg[bos.Const.TRADE_TRANSPORT_SHIP].total;				

				var amountLand = carts * bos.Const.CART_CAPACITY;
				var amountSea = ships * bos.Const.SHIP_CAPACITY;
				
				var totalTransportable;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						totalTransportable = amountLand;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						totalTransportable = amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						totalTransportable = amountLand + amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						totalTransportable = amountLand + amountSea;
						break;						
				}				

				if (totalTransportable < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						//wood = Math.min(wood, Math.floor(amountCurrent * woodPart));
						resources[i] = Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i]));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {							
								var left = Math.min(step, diff, ri.from.resources[i] - resources[i]);
								if (left > 0) {
									resources[i] += left;
									diff -= left;
									noIncrement = false;
								}								
							}						
						}
					}
					//COPY & PASTE END
				}					
				
			}
			*/
			
			this.woodInput.setValue(wood);
			this.stoneInput.setValue(stone);
			this.ironInput.setValue(iron);
			this.foodInput.setValue(food);
		}
	}
});

qx.Class.define("bos.gui.PurifyOptionsWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 300,
			minWidth: 200,
			maxWidth: 700,
			height: 280,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("purify options")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(10, 10));	

		var storage = bos.Storage.getInstance();
		var purifyOptions = storage.getPurifyOptions();

		var container = new qx.ui.groupbox.GroupBox();
		container.setLayout(new qx.ui.layout.VBox(10, 10));
		this.add(container);
		
		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
		container.add(box);
		
		this._inputs = new Array();
		this._inputs.push(null);
		var row = 0;		
		var purifiedRes = ["", "darkwood", "runestone", "veritum", "trueseed"];
		for (var i = 1; i <= 4; i++) {
			var name = purifiedRes[i];
			var lbl = new qx.ui.basic.Label(tr(name));
			var input = this._createMinimumResLevelInput();
			this._inputs.push(input);
			input.setValue(purifyOptions.minimumResLevels[i]);			
			
			box.add(lbl, {row: row, column: 1});
			box.add(input, {row: row, column: 0});
			
			row++;
		}
		
		this.cbIncludeCastles = new qx.ui.form.CheckBox(tr("cbIncludeCastles"));
		this.cbIncludeCastles.setToolTipText(tr("cbIncludeCastles_toolTip"));
		this.cbIncludeCastles.setValue(purifyOptions.includeCastles);
		container.add(this.cbIncludeCastles);	
		
		row++;
		
		this.cbUseRecruitmentData = new qx.ui.form.CheckBox(tr("cbUseRecruitmentData"));
		this.cbUseRecruitmentData.setToolTipText(tr("cbUseRecruitmentData_toolTip"));
		this.cbUseRecruitmentData.setValue(purifyOptions.useRecruitmentData);
		container.add(this.cbUseRecruitmentData);			
		
		row++;

		var btnSave = new qx.ui.form.Button(tr("save"));
		btnSave.setWidth(60);
		this.add(btnSave);
		btnSave.addListener("execute", this.confirm, this);

		row++;		
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);	
	},
	members: {
		_inputs: null,
		cbIncludeCastles: null,
		_createMinimumResLevelInput: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
			if (ministerBuildPresent) {
				var _minimumResLevelInput = new webfrontend.gui.SpinnerInt(0, 20, 90);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_toolTip"));
				_minimumResLevelInput.setWidth(60);	
				return _minimumResLevelInput;
			} else {
				_minimumResLevelInput = new webfrontend.gui.SpinnerInt(0, 50000, 50000000);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_absolute_toolTip"));
				_minimumResLevelInput.setWidth(100);
				return _minimumResLevelInput;
			}
		},
		confirm: function() {
						
			purifyOptions = {
				includeCastles: this.cbIncludeCastles.getValue(),
				useRecruitmentData: this.cbUseRecruitmentData.getValue()				
			};
			purifyOptions.minimumResLevels = new Array();
			purifyOptions.minimumResLevels.push(0);
			
			for (var i = 1; i <= 4; i++) {
				var input = this._inputs[i];
				var val = parseInt(input.getValue());
				purifyOptions.minimumResLevels.push(val);
			}
			
			var storage = bos.Storage.getInstance();
			storage.savePurifyOptions(purifyOptions);
			
			this.close();			
		}
	}
});

qx.Class.define("bos.gui.PurifyResourcesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("purify"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "name", "position", "reference", "wood", "woodMax", "woodFree", "stone", "stoneMax", "stoneFree", "iron", "ironMax", "ironFree", "food", "foodMax", "foodFree", "purifiable", "darkwood", "runestone", "veritum", "trueseed"];
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(16, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", function(event) {
			this._handleCellClick(event, this._tableModel);
		}, this);		
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 120);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		var index = 4;
		for (var res = 1; res <= 4; res++) {
			columnModel.setColumnWidth(index++, 90);
			columnModel.setColumnVisible(index++, false);
			columnModel.setColumnVisible(index++, false);
		}

		var woodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "woodMax", "woodFree");
		columnModel.setDataCellRenderer(4, woodRenderer);

		var stoneRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "stoneMax", "stoneFree");
		columnModel.setDataCellRenderer(7, stoneRenderer);

		var ironRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "ironMax", "ironFree");
		columnModel.setDataCellRenderer(10, ironRenderer);

		var foodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "foodMax", "foodFree");
		columnModel.setDataCellRenderer(13, foodRenderer);
		
		columnModel.setColumnWidth(16, 70);
		
		for (var i = 0; i < 4; i++) {
			columnModel.setDataCellRenderer(17 + i, new bos.ui.table.cellrenderer.ClickableLook());
			columnModel.setColumnWidth(17 + i, 50);
		}

		this.add(this.table, {flex: 1});
			
	}, members: {		
		_purifyOptionsWidget: null,
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			var btnPurifyAll = new qx.ui.form.Button(tr("btnPurifyAll"));
			btnPurifyAll.setToolTipText(tr("btnPurifyAll_toolTip"));
			btnPurifyAll.setWidth(120);
			toolBar.add(btnPurifyAll);
			btnPurifyAll.addListener("execute", function(evt) {
				webfrontend.gui.MessageBox.messageBox({
					title: tr("confirmation"),
					text: tr("are you sure?"),
					textRich: true,
					executeOk: function() {
						this._purifyAllResources(this._tableModel);
					},
					callbackContext: this
				});										
			}, this);
			
			var btnPurifyOptions = new qx.ui.form.Button(tr("btnPurifyOptions"));
			btnPurifyOptions.setToolTipText(tr("btnPurifyOptions_toolTip"));
			btnPurifyOptions.setWidth(120);
			toolBar.add(btnPurifyOptions);
			btnPurifyOptions.addListener("execute", function(evt) {
				var widget = this._getPurifyOptionsWidget();
				widget.open();
			}, this);

			var btnMarkMoonglowTower = new qx.ui.form.Button(tr("btnMarkMoonglowTower"));
			btnMarkMoonglowTower.setToolTipText(tr("btnMarkMoonglowTower_toolTip"));
			btnMarkMoonglowTower.setWidth(180);
			btnMarkMoonglowTower.addListener("execute", this.markMoonglowTower, this);										
			toolBar.add(btnMarkMoonglowTower);
			
			var btnUnmarkMoonglowTower = new qx.ui.form.Button(tr("btnUnmarkMoonglowTower"));
			btnUnmarkMoonglowTower.setToolTipText(tr("btnUnmarkMoonglowTower_toolTip"));
			btnUnmarkMoonglowTower.setWidth(180);
			btnUnmarkMoonglowTower.addListener("execute", this.unmarkMoonglowTower, this);										
			toolBar.add(btnUnmarkMoonglowTower);				
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("purificationHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");						
				a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			}, this);						

			
			return toolBar;
		}, 
		markMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			if (buildings.length == 0) {
				bos.Utils.handleWarning(tr("you need to be in city"));
				return;
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if (bType == 36 && b.level == 10) {
					var towerId = b.visId;
					var cityId = city.getId();
					bos.Storage.getInstance().addMoonglowTower(cityId, towerId);
					this.updateView();
					return;
				}
			}

			bos.Utils.handleWarning("Couldn't find Moonglow Tower at level 10");

		}, 
		unmarkMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var cityId = city.getId();
			bos.Storage.getInstance().removeMoonglowTower(cityId);
			this.updateView();
		}, 
		_purifyAllResources: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
			if (ministerBuildPresent) {
				this._purifyAllResourcesImpl();
			} else {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;

				server.addListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);				
				
				summary.fetchResources();
			}			
		},
		_resourcesRefreshed: function() {
			server.removeListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);
			this._purifyAllResourcesImpl();
		},
		_purifyAllResourcesImpl: function() {

			var storage = bos.Storage.getInstance();
			var purifyOptions = storage.getPurifyOptions();
			var towers = storage.getMoonglowTowers();
																									
			var rowData = this.createRowData();
			
			var totalCreated = 0;
			
			var types = ["", "darkwood", "runestone", "veritum", "trueseed"];
			var rawTypes = ["", "wood", "stone", "iron", "food"];
			
			var totalDelay = 0;	

			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
			
			for (var i = 0; i < rowData.length; i++) {
				var row = rowData[i];	

				var cityInfo = bos.CityTypes.getInstance().parseReference(row["reference"]);
				if (cityInfo.isCastle && !purifyOptions.includeCastles) {
					continue;
				}
				
				var res = [];
				
				for (var r = 1; r <= 4; r++) {
					var resType = types[r];
					var purify = row[resType] * bos.Const.MOONSTONE_COST;
					if (purify == 0) {
						continue;
					}
					
					if (r == 4) {
						if (row["food/h"] != undefined && row["food/h"] < 0) {
							continue;
						}
						if (!ministerBuildPresent && cityInfo.isCastle) {
							continue;
						}
					}
					
					var minimumResLevel = purifyOptions.minimumResLevels[r];
					
					if (minimumResLevel > 0) {
						var rawType = rawTypes[r];
						if (ministerBuildPresent) {
							var max = row[rawType + "Max"];
							if (max > 0) {
								var keepRes = Math.floor(max * minimumResLevel / 100.0);
								purify -= keepRes;
							}
						} else {
							purify -= minimumResLevel;
						}
					}
					
					if (purify < bos.Const.MOONSTONE_COST) {
						continue;
					}
					
					res.push({
						t: r,
						c: purify
					});
				}
				if (res.length > 0) {
					var created = this._purifyResources(storage, row, res);
					totalCreated += created;
					
					totalDelay += bos.Const.MIN_SEND_COMMAND_INTERVAL;
				}				
			}
				
			bos.Utils.handleInfo("It will take " + Math.floor(totalDelay / 1000) + " seconds to refine " + totalCreated + " resources");
		}, 
		_purifyResources: function(storage, row, res) {
			var created = 0;
			var cityId = row["id"];
			if (res.length == 0) {
				return 0;
			}
			var towerId = storage.findMoonglowTowerId(cityId);
			if (towerId >= 0) {
			
				bos.net.CommandManager.getInstance().sendCommand("ResourceToVoid", {
					cityid: parseInt(cityId),
					res: res
				});
				
				for (var i = 0; i < res.length; i++) {
					created += res[i].c;
				}
			}
			return created;
		}, 
		createRowData: function() {
			var rowData = [];

			var withMoonglow = bos.CityTypes.getInstance().getCitiesWithMoonglowTower();

			var cities = webfrontend.data.Player.getInstance().cities;
			
			var summary = getSummaryWidget();
			
			var unknownValue = "";

			for (var key in withMoonglow) {
				var cityId = parseInt(withMoonglow[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}				

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;

				if (server.cities[cityId] == undefined) {

					var resCity = server.cityResources["c" + cityId];
					if (resCity != null) {
						summary._updateRowFromResCity(resCity, row);
					}

				} else {
					var city = server.cities[cityId];

					row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
					row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
					row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
					row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));

					row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
					row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
					row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
					row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));

					row["woodFree"] = row["woodMax"] - row["wood"];
					row["stoneFree"] = row["stoneMax"] - row["stone"];
					row["ironFree"] = row["ironMax"] - row["iron"];
					row["foodFree"] = row["foodMax"] - row["food"];					
				}
								
				summary._populateResources(row, cityId);

				if (!(row["wood"] === unknownValue && row["stone"] === unknownValue && row["iron"] === unknownValue && row["food"] === unknownValue)) {
					var wood = Math.floor(row["wood"] / bos.Const.MOONSTONE_COST);
					var stone = Math.floor(row["stone"] / bos.Const.MOONSTONE_COST);
					var iron = Math.floor(row["iron"] / bos.Const.MOONSTONE_COST);
					var food = Math.floor(row["food"] / bos.Const.MOONSTONE_COST);
					
					row["purifiable"] = wood + stone + iron + food;
					
					if (row["purifiable"] > 0) {
						var towerId = bos.Storage.getInstance().findMoonglowTowerId(cityId);
						if (towerId > 0) {
							//"darkwood", "runestone", "veritum", "trueseed"
							row["darkwood"] = wood;
							row["runestone"] = stone;
							row["veritum"] = iron;
							row["trueseed"] = food;										
						}
					}
				}

				rowData.push(row);
			}

			return rowData;
		},
		_getPurifyOptionsWidget: function() {
			if (this._purifyOptionsWidget == null) {
				this._purifyOptionsWidget = new bos.gui.PurifyOptionsWidget();
			}
			return this._purifyOptionsWidget;
		},
		_handleCellClick: function(event, tableModel) {
		
			var row = event.getRow();
			var rowData = tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			var cityInfo = bos.CityTypes.getInstance().parseReference(rowData["reference"]);			
			
			var storage = bos.Storage.getInstance();
			var towerId = storage.findMoonglowTowerId(cityId);

			var resources = [];
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var x = parseInt(city["xPos"]);
					var y = parseInt(city["yPos"]);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;						
			case 17:
				resources.push({
					t: bos.Const.WOOD,
					c: rowData["darkwood"] * bos.Const.MOONSTONE_COST
				});
				break;
			case 18:
				resources.push({
					t: bos.Const.STONE,
					c: rowData["runestone"] * bos.Const.MOONSTONE_COST
				});					
				break;
			case 19:
				resources.push({
					t: bos.Const.IRON,
					c: rowData["veritum"] * bos.Const.MOONSTONE_COST
				});						
				break;
			case 20:
				if (cityInfo.isCastle) {
					bos.Utils.handleWarning("Purifind food in castles in prohibited");
					return;
				}	
				resources.push({
					t: bos.Const.FOOD,
					c: rowData["trueseed"] * bos.Const.MOONSTONE_COST
				});					
				break;
			};
			
			if (towerId < 0) {
				return;
			}			

			if (resources.length > 0) {
				var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
				if (!ministerBuildPresent) {
					bos.Utils.handleWarning("Currently only mass purification is enabled for players without Building Minister");
					return;
				}
			
				if (this._waitingForFullMessage) {
					bos.Utils.handleWarning("Resource auto refresh has to be turned on (which requires Building Minister)");
					return;
				}
			
				this._purifyResources(storage, rowData, resources);
			}
		}
	}
});

qx.Class.define("bos.gui.TradeRoutesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("trade routes"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "group", "fromToIds", "fromTo", "position", "action", "status", "wood", "stone", "iron", "food", "land/sea", "edit"];				
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);
		for (var i = 0; i < columnIds.length; i++) {
			this._tableModel.setColumnSortable(i, false);
		}		

		this._setupSorting(this._tableModel);
		//this._tableModel.sortByColumn(1, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		this.table.setColumnVisibilityButtonVisible(false);
		
		var columnModel = this.table.getTableColumnModel();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 40);
		columnModel.setColumnVisible(2, false);
		
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());		
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(5, 70);
		columnModel.setColumnWidth(6, 70);		
		
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnWidth(8, 70);
		columnModel.setColumnWidth(9, 70);
		columnModel.setColumnWidth(10, 70);
		
		columnModel.setColumnWidth(11, 70);	
		columnModel.setColumnWidth(12, 70);	
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
		
		bos.Storage.getInstance().addListener("changeTradeRoutesVersion", this.updateView, this);
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		_tradeRouteWidget: null,
		_sendingStatuses: {},
		_usedCarts: {},
		_showErrors: false,
		_pendingRequests: [],
		_sendingRequest: -1,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();

			var sel;
			
			var filterGroup = "";
			sel = this.sbGroup.getSelection();
			if (sel != null && sel.length > 0) {
				filterGroup = sel[0].getModel();
			}			
			
			var storage = bos.Storage.getInstance();
			var routes = storage.getTradeRoutes();
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var now = new Date();
			
			for (var i = 0; i < routes.length; i++) {
				var r = routes[i];
			
				if (filterGroup != "" && r.group != filterGroup) {
					continue;
				}
				
				var row = [];
				var secondRow = [];				
				
				row["id"] = r.id;
				secondRow["id"] = -r.id;
				
				row["group"] = r.group;
				secondRow["group"] = "";
								
				var fromCity = cities[r.from];
				var toCity = cities[r.to];
				
				var skip = false;
				if (fromCity == undefined) {
					row["fromTo"] = "invalid";
					row["fromToIds"] = -1;
					skip = true;
				} else {
					row["fromTo"] = fromCity.name;
					row["position"] = fromCity.xPos + ":" + fromCity.yPos;
					row["fromToIds"] = r.from;
				}
				
				row["wood"] = r.wood;
				row["stone"] = r.stone;
				row["iron"] = r.iron;
				row["food"] = r.food;
				
				if (toCity == undefined) {
					secondRow["fromTo"] = "invalid";
					secondRow["fromToIds"] = -1;
					skip = true;
				} else {
					secondRow["fromTo"] = toCity.name;
					secondRow["position"] = toCity.xPos + ":" + toCity.yPos;
					secondRow["fromToIds"] = r.to;
				}				

				row["action"] = "";
				secondRow["action"] = "";
				if (!skip) {
					var ri = this.createRouteInfo(r);
					
					if (ri.from.reqRes != null) {
														
						if (r.transport != bos.Const.TRADE_TRANSPORT_SHIP)
							row["land/sea"] = ri.from.carts;
						else
							row["land/sea"] = "disabled";
						
						if (r.transport != bos.Const.TRADE_TRANSPORT_CART)
							secondRow["land/sea"] = ri.from.ships;
						else
							secondRow["land/sea"] = "disabled";
					}				
					
					if (ri.to.serverRes != null) {
						
						secondRow["wood"] = ri.to.freeResources[1];
						secondRow["stone"] = ri.to.freeResources[2];
						secondRow["iron"] = ri.to.freeResources[3];
						secondRow["food"] = ri.to.freeResources[4];
					}
					
					if (this.canBeSend(r, false, ri)) {
						row["action"] = this.tr("tnf:send");
					}
					if (this.canBeSend(r, true, ri)) {
						secondRow["action"] = "Send max";
					}
				}
				
				if (server.cities[r.from] == undefined) {
					
					//continue;
				} else {								
					var city = server.cities[r.from];
					
				/*
					var route = {
						from: parseInt(this.sbFrom.getSelection()[0].getModel()),
						to: parseInt(this.sbTo.getSelection()[0].getModel()),
						wood: parseInt(this.woodInput.getValue()),
						stone: parseInt(this.stoneInput.getValue()),
						iron: parseInt(this.ironInput.getValue()),
						food: parseInt(this.foodInput.getValue()),
						transport: parseInt(this.sbTransport.getSelection()[0].getModel())
					};
*/					
				}
				
				var status = this._getStatus(r.id);
				if (status != null) {
					row["status"] = this.translateStatus(status.status);
					secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));
				}
								
				row["edit"] = "Edit";
				secondRow["edit"] = this.tr("tnf:delete");
									
				rowData.push(row);				
				rowData.push(secondRow);
			}
			
			return rowData;
		}, createRouteInfo: function(route) {
			var result = {
				from: {
					reqRes: null,
					serverRes: null,
					carts: 0,
					ships: 0,
					resources: [0, 0, 0, 0, 0]
				}, to: {
					reqRes: null,
					serverRes: null,
					freeResources: [bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF]
				}
			};

			var resCity = server.cityResources["c" + route.from];
			if (resCity != null) {
				result.from.reqRes = resCity;
				//it's impossible to get exact number of carts because when there are 1 cart and city has 1k wood and 1k stone for both resources it will return amountLand = 1000, the would be if city had 1000carts, we take lower bound here
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					result.from.resources[r] = res.count;
					if (res.amountLand < res.count) {
						result.from.carts = Math.ceil(res.amountLand / bos.Const.CART_CAPACITY);
						break;
					} else {
						result.from.carts = Math.max(result.from.carts, Math.ceil(res.count / bos.Const.CART_CAPACITY));
					}
				}
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					if (res.amountSea < res.count) {
						result.from.ships = Math.ceil(res.amountSea / bos.Const.SHIP_CAPACITY);
						break;
					} else {
						result.from.ships = Math.max(result.from.ships, Math.ceil(res.count / bos.Const.SHIP_CAPACITY));
					}
				}

				var usedCarts = this._usedCarts["c" + route.from];				
				if (usedCarts != null) {
					result.from.carts = Math.max(0, result.from.carts - usedCarts.carts);
					result.from.ships = Math.max(0, result.from.ships - usedCarts.ships);
				}				
			}
			
			resCity = server.cityResources["c" + route.to];
			if (resCity != null) {
				result.to.reqRes = resCity;
			}
			
			var summary = getSummaryWidget();
			
			var row = [];				
			if (summary._populateResources(row, route.from)) {
				result.from.serverRes = row;
				
				result.from.resources[1] = row["wood"];
				result.from.resources[2] = row["stone"];
				result.from.resources[3] = row["iron"];
				result.from.resources[4] = row["food"];
			}
			row = [];
			if (summary._populateResources(row, route.to)) {
				result.to.serverRes = row;
				
				result.to.freeResources[1] = row["woodFree"] - row["woodIncoming"];
				result.to.freeResources[2] = row["stoneFree"] - row["stoneIncoming"];
				result.to.freeResources[3] = row["ironFree"] - row["ironIncoming"];
				result.to.freeResources[4] = row["foodFree"] - row["foodIncoming"];
			}		
			
			return result;
		}, translateStatus: function(status) {
			var s = "";
			if (status == -1) {
				s = "Comm. err";
			} else if (status == 0) {
				s = "OK";
			} else {
				if (status & (1 << 0)) {
					s += "I";
				}
				if (status & (1 << 1)) {
					s += "C";
				}
				if (status & (1 << 2)) {
					s += "T";
				}
				if (status & (1 << 3)) {
					s += "R";
				}
			}
			return s;
		}, translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("tnf:ships");
			}
	

			return "??? " + type;
		}, _handleCellClick: function(event) {
			
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
						
			var id = Math.abs(rowData["id"]);
			var isFirstRow = rowData["id"] >= 0;
			var route = bos.Storage.getInstance().findTradeRouteById(id);
			
			switch (event.getColumn()) {
			case 2:
			case 3:
				var cityId = parseInt(rowData["fromToIds"]);
				a.setMainView("c", cityId, -1, -1);
				break;
			case 4:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;				
			case 5:
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (this._sendingRequest != -1) {
						bos.Utils.handleWarning("Please wait, waiting for response for last trade");
					} else {
						this._showErrors = true;
						this.sendTrade(route, !isFirstRow, false);
					}
				}
				break;
			case 12:
				
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (isFirstRow) {											
						var widget = this._getTradeRouteWidget();
						widget.editRoute(route);
						widget.open();
					} else {
						webfrontend.gui.MessageBox.messageBox({
							title: "Confirmation",
							text: "Are you sure?",
							textRich: true,
							executeOk: function() {
								var storage = bos.Storage.getInstance();
								storage.removeTradeRoute(route.id);	
								
								this.updateView();
							},
							callbackContext: this
						});						
					}
				}
				
				break;
			}
		}, canBeSend: function(route, maxMode, ri) {

			var totalRes = route.wood + route.stone + route.iron + route.food;	
			
			var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
			var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;
			
			//var transportType;
			var totalTransportable;
			switch (route.transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					totalTransportable = amountLand;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP:
					totalTransportable = amountSea;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_CART_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_CART;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					break;						
			}
			
			if (totalTransportable == 0 || (totalTransportable < totalRes && !maxMode)) {
				return;
			}
			
			if (!maxMode) {
							
				if (ri.from.resources[1] < route.wood) {
					return false;
				}
				if (ri.from.resources[2] < route.stone) {
					return false;
				}
				if (ri.from.resources[3] < route.iron) {
					return false;
				}
				if (ri.from.resources[4] < route.food) {
					return false;
				}				
			} else {
				var total = 0;
				if (route.wood > 0) {
					total += ri.from.resources[1];
				}
				if (route.stone > 0) {
					total += ri.from.resources[2];
				}
				if (route.iron > 0) {
					total += ri.from.resources[3];
				}
				if (route.food > 0) {
					total += ri.from.resources[4];
				}

				if (total < bos.Const.SHIP_CAPACITY) {
					return false;
				}
			}
			return true;
		}, sendAll: function(maxMode) {
			var rows = this.createRowData();
			var storage = bos.Storage.getInstance();
			
			this._pendingRequests = [];
			
			for (var i = 0; i < rows.length; i += 2) {
				var rowData = rows[i];
				
				var id = Math.abs(rowData["id"]);			
				var route = storage.findTradeRouteById(id);
				
				this.sendTrade(route, maxMode, true);
			}
			
			this.sendPendingTrades();
			
		}, sendTrade: function(route, maxMode, onlyQueue) {
			try {
		
				var player = webfrontend.data.Player.getInstance();
				var targetPlayer = player.getName();
				var targetCity = bos.Utils.convertIdToCoodrinates(route.to);				
			
				var ri = this.createRouteInfo(route);
				
				//dumpObject(route);
				//dumpObject(ri);

				if (!this.canBeSend(route, maxMode, ri)) {
					return;
				}

				var resTypes = ["gold", "wood", "stone", "iron", "food"];
				var routeRes = [0, route.wood, route.stone, route.iron, route.food];
				var totalRouteRes = route.wood + route.stone + route.iron + route.food;
				var routeResPart = [0, 0, 0, 0, 0];
				
				for (var i = 1; i <= 4; i++) {
					routeResPart[i] = routeRes[i] / totalRouteRes;
				}
				
				//to be transported resources
				var resources = [0, 0, 0, 0, 0];

				//var reserved = [0, 0, 0, 0, 0];
																		
				if (maxMode) {
				/*
					for (var i = 1; i <= 4; i++) {
						if (ri.to.serverRes != null) {
							var type = resTypes[i];
							reserved[i] += serverRes[type + "Incoming"];
							//TODO reserve: trade time * production/h
						}
					}
				*/
					for (var i = 1; i <= 4; i++) {
						if (routeRes[i] > 0) {
							
							resources[i] = ri.from.resources[i];
							if (ri.to.serverRes != null) {
								//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
								resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
							}
							
						}
					}
				} else {
					for (var i = 1; i <= 4; i++) {
						resources[i] = routeRes[i];
					}						
				}
							
				var totalRes = 0;
				for (var i = 1; i <= 4; i++) {
					totalRes += resources[i];
				}
				
				if (totalRes == 0) {
					return;
				}
										
				var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
				var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;				
				
				var useSecondTransportType = false;
				var transportType;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						if (amountLand > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_CART;						
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;	
						}
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						if (amountSea > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_CART;
						}
						break;						
				}
						
				var amountCurrent = 0;						
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					amountCurrent = amountLand;
				} else {
					amountCurrent = amountSea;
				}
				
				if (amountCurrent < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {	
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}
							}						
						}
					}
					//COPY & PASTE END
				} else {
					//all resources fits in current transport type, there is no need for use other type
					useSecondTransportType = false;
				}				
				
				if (!onlyQueue) {
					this._pendingRequests = [];
				}
				var req1 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
				this._pendingRequests.push({
					route: route,
					request: req1
				});

				//make resources scheduled to send unavailable for other transport type
				for (var i = 1; i <= 4; i++) {
					ri.from.resources[i] -= resources[i];
					ri.to.freeResources[i] -= resources[i];
				}
				
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					amountCurrent = amountSea;
				} else {
					transportType = bos.Const.TRADE_TRANSPORT_CART;
					amountCurrent = amountLand;
				}
				
				if (amountCurrent == 0) {
					useSecondTransportType = false;
				}

				if (useSecondTransportType) {	
		
					if (!maxMode) {
						for (var i = 1; i <= 4; i++) {
							resources[i] = routeRes[i] - resources[i];
						}
					} else {
						for (var i = 1; i <= 4; i++) {
							if (routeRes[i] > 0) {
								
								resources[i] = ri.from.resources[i];
								if (ri.to.serverRes != null) {
									//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
									resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
								}
								
							} else {
								resources[i] = 0;
							}
						}																		
					}
						
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}		
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}								
							}						
						}
					}
					//COPY & PASTE END
					
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						totalRes += resources[i];
					}								
						
					if (totalRes > 0) {
						var req2 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
						this._pendingRequests.push({
							route: route,
							request: req2
						});
					}
				}
				
				if (!onlyQueue) {					
					this.sendPendingTrades();
				}
							
			} catch (ex) {
				this._sendingRequest = -1;
				bos.Utils.handleError("Sending resources failed: " + ex);
			}
		}, sendPendingTrades: function() {
			if (this._pendingRequests.length == 0) {
				this._sendingRequest = -1;
				this._showErrors = false;
				this.updateView();
				return;
			}
			this._sendingRequest = 0;
			var req = this._pendingRequests[this._sendingRequest];
			bos.net.CommandManager.getInstance().sendCommand("TradeDirect", req.request, this, this._onSendDone, new Date());
		}, _createTradeDirectRequest: function(from, resToBeSend, tradeTransportType, targetPlayer, targetCity) {
			var resources = [];
			if (resToBeSend[1] > 0) {
				resources.push({
					t: bos.Const.WOOD,
					c: resToBeSend[1]										
				});
			}
			if (resToBeSend[2] > 0) {
				resources.push({
					t: bos.Const.STONE,
					c: resToBeSend[2]					
				});
			}
			
			if (resToBeSend[3] > 0) {
				resources.push({
					t: bos.Const.IRON,
					c: resToBeSend[3]
				});
			}

			if (resToBeSend[4] > 0) {
				resources.push({
					t: bos.Const.FOOD,
					c: resToBeSend[4]					
				});
			}				
			var req = {
				cityid: from,
				res: resources,
				tradeTransportType: tradeTransportType,
				targetPlayer: targetPlayer,
				targetCity: targetCity
			}
			return req;
		}, _onSendDone: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(-1);
				} else {
					this._setStatus(parseInt(errorCode));
				}	
			} catch (e) {
				bos.Utils.handleError(e);
			}
		}, _setStatus: function(status) {
			var req = this._pendingRequests[this._sendingRequest];
		
			var prevStatus = this._sendingStatuses["r" + req.route.id];						
		
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["r" + req.route.id] = newStatus;
			var usedCarts = this._usedCarts["c" + req.route.from];
			
			if (usedCarts == null) {
				usedCarts = {
					carts: 0,
					ships: 0
				};
				this._usedCarts["c" + req.route.from] = usedCarts;
			}
			
			if (status == 0) {
				//OK
				var totalRes = 0;
				for (var i = 0; i < req.request.res.length; i++) {
					var res = req.request.res[i];
					totalRes += res.c; 
				}
				
				if (req.request.tradeTransportType == bos.Const.TRADE_TRANSPORT_CART) {
					var carts = Math.ceil(totalRes / bos.Const.CART_CAPACITY);
					usedCarts.carts += carts;
				} else {
					var ships = Math.ceil(totalRes / bos.Const.SHIP_CAPACITY);
					usedCarts.ships += ships;				
				}
			}
			
			/* because of user req disabled showing errors
			if (this._showErrors) {
				if (status != 0) {
					this._showErrorMessage(req, status);
				}
			}
*/			
			
			this._pendingRequests.splice(0, 1);
			this.sendPendingTrades();
			
		}, _showErrorMessage: function(req, status) {
			
			var s = "";
			if (status == -1) {
				s = this.tr("tnf:communication error_1");
			} else if (status == 0) {
				s = "OK";
			} else {
				var sep = "<br/>"
				if (status & (1 << 0)) {
					s += this.tr("tnf:invalid!") + sep;
				}
				if (status & (1 << 1)) {
					s += this.tr("tnf:not enough traders!") + sep;
				}
				if (status & (1 << 2)) {
					s += this.tr("tnf:target cannot be reached!") + sep;
				}
				if (status & (1 << 3)) {
					s += this.tr("tnf:not enough resource!") + sep;
				}
			}

			if (s == "") {
				return;
			}
			
			var dialog = new webfrontend.gui.ConfirmationWidget();
			dialog.showGenericNotice("Error", s, s, "webfrontend/ui/bgr_popup_survey.gif");

			a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});			
			
		}, _getStatus: function(routeId) {
			return this._sendingStatuses["r" + routeId];
		}, _createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});	
			this.sbGroup.setToolTipText("Filter by <b>group</b>");
			this.sbGroup.addListener("changeSelection", this.updateView, this);
			
			this.sbGroup.add(new qx.ui.form.ListItem("Any group", null, ""));
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			toolBar.add(this.sbGroup);			
			
			this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
			this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
			this.btnRefreshResources.setWidth(120);
			if (locale == "de") {				
				this.btnRefreshResources.setWidth(150);
			}
			
			toolBar.add(this.btnRefreshResources);

			this.btnRefreshResources.addListener("execute", function(evt) {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				summary.fetchResources();
				this._sendingStatuses = {};
				this._usedCarts = {};
			}, this);			
			
			var btnAddRoute = new qx.ui.form.Button(locale == "de" ? "Add route" : "Add route");			
			btnAddRoute.setWidth(100);
			toolBar.add(btnAddRoute);
			btnAddRoute.addListener("execute", function(evt) {
				var widget = this._getTradeRouteWidget();
				widget.addNewRoute();
				widget.open();
			}, this);

			var btnSendAll = new qx.ui.form.Button(tr("Send all"));			
			btnSendAll.setWidth(100);
			toolBar.add(btnSendAll);
			btnSendAll.addListener("execute", function(evt) {
				this.sendAll(false);
			}, this);
			
			var btnSendAllMax = new qx.ui.form.Button(tr("Send all max"));			
			btnSendAllMax.setWidth(100);
			toolBar.add(btnSendAllMax);
			btnSendAllMax.addListener("execute", function(evt) {
				this.sendAll(true);
			}, this);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice("Trade Routes Help", "Currently requires building minister, it may have some bugs. First you need to enable autorefresh of resources then click refresh resources on this tab (it will calculate lower bound of available carts and ships). List of error codes:", "I - Invalid target, C - not enough Carts or ships, T - Target cannot be accessed, R - not enough Resources", "webfrontend/ui/bgr_popup_survey.gif");

				a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			}, this);			
						
			return toolBar;
		}, 
		_createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>trade type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, 
		_createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>transport type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, 
		_createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>resources receiver</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem("someone else", null, 2));

			return sb;		
		}, 
		_createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>state</b>");
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}, 
		_getTradeRouteWidget: function() {
			if (this._tradeRouteWidget == null) {
				this._tradeRouteWidget = new bos.gui.TradeRouteWidget();
			}
			return this._tradeRouteWidget;
		}
	}
});


qx.Class.define("bos.gui.IncomingAttacksPage", {
	extend: bos.gui.SummaryPage,
	statics: {
		nameToCityIdMapper: {}
	}, construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("incoming attacks"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		
		if(locale == "de") {
			columnNames = ["Id", "Angegriffene Stadt Id", "Angegriffene Stadt", "Koords d. angegriffenen Stadt", "Angreifer TS", "letzte Aktualisierung", 
			"Angriffstyp", "Status", "Angriffsstart", "Ankunft Angreifer", 
			"Id d. angreifenden Stadt", "Name angreifende Stadt", "Koords. d. Angreifers", "Spieler", "NamensID", "AllianzID", "Allianzname", "Angreifer TS", "Angreifende Einheiten"];
		} else {
			columnNames = ["id", "targetCityId", "Target City", "Target Pos", "Target TS", "Last visited", 
			"Type", "State", "Start", "End", 
			"attackerCityId", "Attacker City", "Attacker Pos", "player", "Attacker", "alliance", "Alliance", "Attacker TS", "Attacker Units"];
		}		  
		
		var columnIds = ["id", "targetCityId", "targetCityName", "targetPosition", "targetTS", "lastUpdated", 
			"type", "state", "start", "end", 
			"attackerCityId", "attackerCityName", "attackerPosition", "player", "playerName", "alliance", "allianceName", "attackerTS", "attackerUnits"];		
				
		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setColumnWidth(5, 80);
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(2));		
		
		columnModel.setColumnWidth(6, 70);
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnVisible(7, false);
		columnModel.setColumnWidth(8, 120);
		columnModel.setColumnVisible(8, false);
		columnModel.setColumnWidth(9, 120);

		columnModel.setColumnVisible(10, false);
		columnModel.setColumnWidth(11, 80);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(12, 64);
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnVisible(13, false);
		columnModel.setDataCellRenderer(14, new bos.ui.table.cellrenderer.ClickableLook());
		
		//allianceId
		columnModel.setColumnVisible(15, false);
		//alliance name
		columnModel.setDataCellRenderer(16, new bos.ui.table.cellrenderer.ClickableLook());
		
		
		columnModel.setColumnWidth(17, 64);
		columnModel.setColumnVisible(17, false);
		
		columnModel.setColumnWidth(18, 180);
		columnModel.setColumnVisible(18, false);
		
		this.add(this.table, { flex : 1 });
		
		this.updateIcon();
		
		webfrontend.data.AllianceAttack.getInstance().addListener("changeVersion", this.updateIcon, this);
			
	}, members: {
		sbOrderTypes: null,
		sbDefenderTypes: null,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var player = webfrontend.data.Player.getInstance();
			var playerId = player.getId();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();

			var addedAttacks = {};
			
			var filterTypeId = -1;
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var defenderTypeId = -1;
			var sel = this.sbDefenderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				defenderTypeId = sel[0].getModel();
			}			
			
			var list = player.getIncomingUnitOrders();
			if (list != null && defenderTypeId != 2) {

				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					var cityId = parseInt(this._findCityIdByName(item.targetCityName));
				
					addedAttacks["a" + item.id] = true;
				
					row["id"] = item.id;
					row["targetCityId"] = cityId;
					row["targetCityName"] = item.targetCityName;
					if (cityId >= 0) {
						var city = server.cities[cityId];
						if (city != undefined) {
							row["targetPosition"] = bos.Utils.convertIdToCoodrinates(cityId);
							row["lastUpdated"] = city.getLastUpdated();
							var sum = [];
							getSummaryWidget()._addDefendersToRow(city, row, sum);
							row["targetTS"] = row["summary_defenders_ts"];
						}
					}
					
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					
					row["attackerCityId"] = item.city;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["attackerCityName"] = item.cityName;
									
					row["player"] = item.player;
					row["playerName"] = item.playerName;
					row["alliance"] = item.alliance;
					row["allianceName"] = item.allianceName;
										
					row["attackerUnits"] = "";
					row["attackerTS"] = 0;
					if (item.units != null) {
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["attackerUnits"] += ", ";
							}
							row["attackerUnits"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							var space = unit.count * getUnitRequiredSpace(unit.type);
							row["attackerTS"] += space;
						}
					} else {
						row["attackerUnits"] = "?";
						row["attackerTS"] = "?";
					}

					rowData.push(row);
				}
			}
			
			list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			if (list != null && defenderTypeId != 1) {
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					
					if (addedAttacks["a" + item.id] != undefined || (defenderTypeId == -1 && item.tp == playerId)) {
						//dont add twice the same attack and dont show play attacks and alliance attacks for the same city
						continue;
					}
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}					
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					var cityId = parseInt(this._findCityIdByName(item.targetCityName));
				
								/*
			                    "i": 22697776,
                    "t": 0,
                    "ss": 0,
                    "es": 13812688,
                    "s": 0,
                    "c": 15400977,
                    "cn": "D08 Sieniawa",
                    "p": 247863,
                    "pn": "Urthadar",
                    "a": 8508,
                    "an": "Brotherhood_Of_Steel",
                    "tc": 15400978,
                    "tcn": "Theramore2",
                    "tp": 248055,
                    "tpn": "Cudgel"
			*/
				
					row["id"] = item.i;
					row["targetCityId"] = item.tc;
					row["targetCityName"] = item.tpn + ": " + item.tcn;
					row["targetPosition"] = bos.Utils.convertIdToCoodrinates(item.tc);
					
					row["type"] = bos.Utils.translateOrderType(item.t);
					row["state"] = this.translateState(item.s);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.ss));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.es));
					
					row["attackerCityId"] = item.c;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.c);
					row["attackerCityName"] = item.cn;
									
					row["player"] = item.p;
					row["playerName"] = item.pn;
					row["alliance"] = item.a;
					row["allianceName"] = item.an;
										
					row["attackerUnits"] = "?";
					row["attackerTS"] = "?";

					rowData.push(row);
				}			
			
			}

			this.updateIcon();
			
			return rowData;
		}, updateIcon: function() {
			var attacked = false;
			var list;

			list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			if (list != null && list.length > 0) {
				attacked = true;
			} else {
				var player = webfrontend.data.Player.getInstance();
				list = player.getIncomingUnitOrders();
				if (list != null && list.length > 0) {
					attacked = true;
				}
			}
			
			if (attacked) {
				var res = webfrontend.res.Main.getInstance();
				//"256": "ui/icons/icon_attack_warning.gif",
				//var fi = res.getFileInfo(256);
				//var img = webfrontend.config.Config.getInstance().getUIImagePath(fi.url);
				var img = webfrontend.config.Config.getInstance().getUIImagePath("ui/icons/icon_attack_warning.gif");
				this.setIcon(img);
			} else {
				this.setIcon("");
			}
		}, translateState: function(state) {
		/*
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");

			}
			*/
			return "??? " + state;			
		}, _handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:				
				var cityId = parseInt(rowData["targetCityId"]);
				if (!isNaN(cityId)) {
					a.setMainView("c", cityId, -1, -1);
					break;
				}
				//yes, I dont want break here
			case 3:
				var pos = rowData["targetPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 10:
			case 11:
			case 12:
				var pos = rowData["attackerPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						if (event.getColumn() != 12) {
							webfrontend.gui.Util.openCityProfile(x, y);
						} else {
							a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
						
					}
				}				
				break;
			case 13:
			case 14:
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: rowData["playerName"]
				});
				break;				
			case 15:
			case 16:				
				a.showInfoPage(a.getAllianceInfoPage(), {
					name: rowData["allianceName"]
				});
				break;				
			}
		}, _findCityIdByName: function(name) {
			var cityId = bos.gui.IncomingAttacksPage.nameToCityIdMapper[name];
			if (cityId != undefined) {
				return cityId;
			}
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var key in cities) {
				var c = cities[key];
				if (c.name == name) {
					bos.gui.IncomingAttacksPage.nameToCityIdMapper[name] = key;
					return key;
				}
			}
			return -1;
		}, _createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbDefenderTypes = this._createDefenderTypesSelectBox();
			this.sbDefenderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDefenderTypes);

			var btnExport = new qx.ui.form.Button(tr("export"));
			btnExport.setToolTipText(locale == "de" ? "TODO" : "Exports icoming attacks informations in text format");
			btnExport.setWidth(100);
			toolBar.add(btnExport);
			btnExport.addListener("execute", function(evt) {
				this.exportInTextFormat();								
			}, this);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));
			btnCsvExport.setToolTipText(locale == "de" ? "TODO" : "Exports icoming attacks informations in csv format");
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}, exportInTextFormat: function() {
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\n";
			
			var rows = this.createRowData();
			
		/*
			var columnIds = ["id", "targetCityId", "targetCityName", "targetPosition", "targetTS", "lastUpdated", 5
			"type", "state", "start", "end", 9
			"attackerCityId", "attackerCityName", "attackerPosition", "player", "playerName", "alliance", "allianceName", "attackerTS", "attackerUnits"];	
		*/
			var date = new Date();
			sb.add("Attacked cities list generated at ", qx.util.format.DateFormat.getDateTimeInstance().format(date), sep, sep);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (i > 0) {
					sb.add(sep);
				}
				
				sb.add(row["targetCityName"], " (", row["targetPosition"], ")", " total def: ", row["targetTS"], "TS", sep);
				sb.add(row["type"], " attack at: ", row["end"], sep);
				sb.add("Attacks: ", row["playerName"], " (", row["allianceName"], ") from city: ", row["attackerCityName"], " (", row["attackerPosition"], ") ", sep);
				if (row["attackerUnits"] != "?") {
					sb.add("Attack strength: ", row["attackerTS"], "TS", sep);
					sb.add("Attacker units: ", row["attackerUnits"], sep);
				}
								
			}
						
			var dialog = new webfrontend.gui.ConfirmationWidget();
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea(sb.get()).set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable();}, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});		
		}, _createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:siege"), null, 5));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:unknown"), null, 0));

			return sb;		
		}, _createDefenderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>defender type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:alliance members"), null, 2));

			return sb;		
		}
	}
});

qx.Class.define("bos.gui.MassRecruitmentOptionsWidget", {
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 640,
			minWidth: 200,
			maxWidth: 700,
			height: 540,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("mass recruitment")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(5));
		
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer, key);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.lblUnitsInCity = new qx.ui.basic.Label(tr("in city:"));
		this.unitContainer.add(this.lblUnitsInCity, {
			left: 2,
			top: maxUnitsPerColumn * unitHeight + 10
		});
		
		this.add(this.createFooter());
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
	}, 
	members: {
		units: null,
		unitContainer: null,
		lblUtilisation: null,
		editedOrder: null,
		productionInfo: null,
		lblUnitsInCity: null,
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container, unitType) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			
			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			lblUnitName.setRich(true);			
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.addListener("changeValue", this.updateView, this);
			countInput.setWidth(100);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);
			
			var btnMax = new qx.ui.form.Button("Max");
			btnMax.setWidth(50);
			container.add(btnMax, {
				left: x + 230,
				top: y + 6
			});						
			btnMax.addListener("click", function(event) {
				this._toMax(unitType);
			}, this);

			var result = {
				'image': img,
				'count': countInput,
				'label': lblUnitName,
				'name': unit.dn
			};
			return result;
		},  
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnOk = new qx.ui.form.Button(tr("OK"));
			btnOk.setWidth(150);
			container.add(btnOk);
			btnOk.addListener("click", this.confirm, this);
			
			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnAddCityUnits = new qx.ui.form.Button(tr("add city units"));
			btnAddCityUnits.setWidth(110);
			container.add(btnAddCityUnits);
			btnAddCityUnits.addListener("click", this.addCityUnits, this);			

			this.lblUtilisation = new qx.ui.basic.Label("");
			container.add(this.lblUtilisation);

			return container;
		}, 
		confirm: function() {
			var city = webfrontend.data.City.getInstance();
		
			var order = {
				cityId: city.getId(),
				units: new Array()
			};
			
			var res = webfrontend.res.Main.getInstance();
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue());
				if (count > 0) {
					var info = this._findProductionInfo(key);
					if (info == null) {
						bos.Utils.handleError("Couldn't find production info for unit type " + key);
						return;
					}
					totalTS += count * getUnitRequiredSpace(key);
					var u = {
						type: key,
						count: count,
						time: info.ti
					};
					order.units.push(u);
				}
			}
			
			if (totalTS == 0) {
				bos.Utils.handleWarning(tr("please enter some unit count"));
				return;
			}			
			
			if (totalTS > city.getUnitLimit()) {
				bos.Utils.handleWarning("You have entered " + totalTS + "TS while max for this city is " + city.getUnitLimit());
				return;
			}			

			var storage = bos.Storage.getInstance();
			if (this.editedOrder == null) {					
				storage.addRecruitmentOrder(order);
			} else {
				this.editedOrder.units = order.units;
				
				storage.saveRecruitmentOrders();
				storage.setRecruitmentOrdersVersion(storage.getRecruitmentOrdersVersion() + 1);
			}
			
			this.editedOrder == null;

			this.close();
			
		},
		_calculateTS: function() {
			var res = webfrontend.res.Main.getInstance();
			
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue());
				if (count > 0) {
					totalTS += count * getUnitRequiredSpace(key);
				}
			}		
			return totalTS;
		},
		_toMax: function(unitType) {
			var inputs = this.units[unitType];
			var count = parseInt(inputs.count.getValue());
			
			var ts = this._calculateTS();
			var city = webfrontend.data.City.getInstance();
			var max = city.getUnitLimit();
			
			var heads = getUnitRequiredSpace(unitType);
			var c = max - ts + count * heads;
			if (heads > 1) {
				c = Math.floor(c / heads);
			}
			inputs.count.setValue(c);
		},
		updateView: function() {
			var city = webfrontend.data.City.getInstance();
			var current = this._calculateTS();
			var max = city.getUnitLimit();
			this.lblUtilisation.setValue(current + " / " + max + " TS");
		},
		prepareView: function() {
			var city = webfrontend.data.City.getInstance();
			
			this.clearAll();			
			var storage = bos.Storage.getInstance();
			this.editedOrder = storage.findRecruitmentOrderById(city.getId());
			if (this.editedOrder != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var i = 0; i < this.editedOrder.units.length; i++) {
					var o = this.editedOrder.units[i];
					var inputs = this.units[o.type];
					inputs.count.setValue(o.count);
				}
			}
			
			var inCity = "";
			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];
					if (inCity.length > 0) {
						inCity += ", ";
					}					
					inCity += unit.total + " " + formatUnitType(key, unit.total);
				}			
			}
			this.lblUnitsInCity.setValue(tr("in city:") + inCity);			
			
			this.requestProductionInfo();
			this.updateView();
		},
		addCityUnits: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];					
					if (this.units.hasOwnProperty(key)) {
						this.units[key].count.setValue(unit.total);
					}
				}			
			}			
		},
		requestProductionInfo: function() {
			this.productionInfo = null;
			webfrontend.net.CommandManager.getInstance().sendCommand("GetUnitProductionInfo", {
				cityid: webfrontend.data.City.getInstance().getId()
			}, this, this._onProductionInfo);
		},
		_onProductionInfo: function(isOk, result) {
			if (!isOk || result == null) {
				return;
			}
			this.productionInfo = result;
			
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (this.units.hasOwnProperty(info.t) && info.r != null && info.r.length > 0) {
					var u = this.units[info.t];
					if (info.r[0].b == 0) {
						u.label.setValue("<strong>" + u.name + "</strong>");
					} else {
						u.label.setValue(u.name);
					}
				}
			}
		},
		_findProductionInfo: function(unitType) {
			if (this.productionInfo == null) {
				return null;
			}
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (info.t == unitType) {
					return info;
				}
			}
			return null;
		}
	}
});


qx.Class.define("bos.gui.MassRecruitmentPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("recruitment"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.buttonActiveUrl = webfrontend.config.Config.getInstance().getImagePath("ui/btn_army_overview.gif");
		
		this.add(this._createToolBar());
		
		this.cityIdColumn = 8;
		this.typeColumn = 9;
		var columnNames = [tr("city/order"), tr("action"), tr("status"), tr("missing"), tr("resourcesFor"), tr("recruiting"), tr("available"), tr("recruitmentTime"), tr("cityId"), tr("type")];
		
		this.tree = new qx.ui.treevirtual.TreeVirtual(columnNames, {
			tableColumnModel: function(d) {
				return new qx.ui.table.columnmodel.Basic(d);
			}
		});
		this.tree.addListener("cellClick", this._handleCellClick, this);
		this.tree.setStatusBarVisible(false);
		this.tree.setAlwaysShowOpenCloseSymbol(false);
		this.tree.set({
			rowHeight: 19,
			headerCellHeight: 22,
			focusCellOnMouseMove: false,
			columnVisibilityButtonVisible: false			
		});
        var eU = "#564d48";
        var fi = "#c9ae7c";
        var eY = "#70645d";
        var fa = "#f3d298";      
        var fm = "#373930";
        var eQ = "#4d4f46";
        var eP = "#4f5245"; 		
		
		var eE = {
			sBgcolFocusedSelected: eY,
			sBgcolFocused: eY,
			sBgcolSelected: eU,
			sBgcolEven: eU,
			sBgcolOdd: eU,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: fi,
			sStyleHorLine: "1px solid "
		};
		var eF = {
			sBgcolFocusedSelected: eP,
			sBgcolFocused: eP,
			sBgcolSelected: fm,
			sBgcolEven: fm,
			sBgcolOdd: fm,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: eQ,
			sStyleHorLine: "1px dotted "
		};		
		this.tree.setDataRowRenderer(new webfrontend.gui.TreeRowRendererCustom(this.tree, eE, eF));
				
		var tcm = this.tree.getTableColumnModel();
		tcm.setDataCellRenderer(0, new webfrontend.data.TreeDataCellRendererCustom({
			leafIcon: false
		}));		
		tcm.setColumnVisible(this.cityIdColumn, false);		
		tcm.setColumnVisible(this.typeColumn, false);
		
		this.tree.setMetaColumnCounts([-1]);		

		tcm.setColumnWidth(0, 150);
		tcm.setColumnWidth(1, 75);
		tcm.setColumnWidth(2, 60);
		
		for (var i = 3; i <= 7; i++) {
			tcm.setColumnWidth(i, 100);
			//tcm.setColumnSortable(i, true);
		}
		/*
		tcm.setDataCellRenderer(1, new webfrontend.gui.CellRendererHtmlCustom({
			sBorderRCol: "#4d4f46"
		}));
		*/
		
		for (var i = 1; i <= 7; i++) {
			tcm.setDataCellRenderer(i, new webfrontend.gui.CellRendererHtmlCustom({
				sBorderRCol: "#4d4f46"
			}));
		}
		
				
		tcm.addListener("widthChanged", this._treeWidthChanged, this)
		
		this.add(this.tree, { flex: 1 } );
		
		bos.Storage.getInstance().addListener("changeRecruitmentOrdersVersion", this.updateWholeView, this);
	}, 
	members: {
		tree: null,
		cityIdColumn: null,
		typeColumn: null,
		_optionsWidget: null,
		sbCityType: null,
		_sendingStatuses: {},
		buttonActiveUrl: null,
		cities: {},
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, true);
			this.sbCityType.addListener("changeSelection", this.updateWholeView, this);						
			toolBar.add(this.sbCityType);		
			
			var btnRecruitAll = new qx.ui.form.Button(tr("btnRecruitAll"));
			btnRecruitAll.setToolTipText(tr("btnRecruitAll_toolTip"));
			btnRecruitAll.setWidth(100);
			btnRecruitAll.addListener("execute", this.recruitAll, this);										
			toolBar.add(btnRecruitAll);
			
			var btnEnableMassRecruitment = new qx.ui.form.Button(tr("btnEnableMassRecruitment"));
			btnEnableMassRecruitment.setToolTipText(tr("btnEnableMassRecruitment_toolTip"));
			btnEnableMassRecruitment.setWidth(100);
			btnEnableMassRecruitment.addListener("execute", this.enableMassRecruitment, this);										
			toolBar.add(btnEnableMassRecruitment);
			
			var btnDisableMassRecruitment = new qx.ui.form.Button(tr("btnDisableMassRecruitment"));
			btnDisableMassRecruitment.setToolTipText(tr("btnDisableMassRecruitment_toolTip"));
			btnDisableMassRecruitment.setWidth(100);
			btnDisableMassRecruitment.addListener("execute", this.disableMassRecruitment, this);										
			toolBar.add(btnDisableMassRecruitment);
			
			var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
			btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
			btnRefreshView.setWidth(100);
			btnRefreshView.addListener("execute", this.updateWholeView, this);
			toolBar.add(btnRefreshView);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("bos.gui.MassRecruitmentPage.help"), tr("bos.gui.MassRecruitmentPage.help2"), "webfrontend/ui/bgr_popup_survey.gif");

				a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			}, this);
			
			return toolBar;
		},
		enableMassRecruitment: function() {
			var widget = this._getOptionsWidget();
			widget.prepareView();
			widget.open();
		},
		disableMassRecruitment: function() {
			var city = webfrontend.data.City.getInstance();
			var storage = bos.Storage.getInstance();
			var order = storage.findRecruitmentOrderById(city.getId());
			if (order != null) {
				if (confirm(tr("are you sure?"))) {
					storage.removeRecruitmentOrder(city.getId());
				}
			}
		},
		_shouldCityBeIncluded: function(city) {
		
			var sel = this.sbCityType.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var reqType = sel[0].getModel();
			if (reqType != "A") {
				var type = bos.CityTypes.getInstance().parseReference(city.reference);
				switch (reqType) {
					case 'C':
						if (!type.isCastle) return false;
						break;
					case 'D':
						if (!type.isDefensive) return false;
						break;
				}
			}

			return true;
		},
		_treeWidthChanged: function(e) {
			var ed = e.getData();
			if (ed.col == 1 && ed.newWidth != 75) {
				var tcm = this.tree.getTableColumnModel();
				tcm.setColumnWidth(ed.col, 75);
			}
        },
		_getOptionsWidget: function() {
			if (this._optionsWidget == null) {
				this._optionsWidget = new bos.gui.MassRecruitmentOptionsWidget();
			}
			return this._optionsWidget;
		},
		updateWholeView: function() {
			this.cities.reset = true;
			this.updateView();
		},
		updateView: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getRecruitmentOrders();
			
			var model = this.tree.getDataModel();
			
			if (this.cities.hasOwnProperty("reset")) {
				model.clearData();
				this.cities = {};
			}
			
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
					
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city)) {
					continue;
				}
				
				var storedCity = server.cities[order.cityId];
				var unitLimit = 0;
				var unitCount = new Object();
				if (storedCity != undefined) {
					unitLimit = storedCity.getUnitLimit();
					
					//var h = f.getUnitLimit() - f.getUnitCount() - f.getUnitsInQueue();
				} else {					
					bos.Utils.handleError("No data about city. Please visit " + bos.Utils.convertIdToCoodrinates(order.cityId));
					continue;
				}
				
				var currentTS = this._currentTSInCity(storedCity);
				var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
				var bid;
				if (!this.cities.hasOwnProperty(order.cityId)) {				
					bid = model.addBranch(null, city.name, true);
					this.cities[order.cityId] = {
						bid: bid,
						leafs: []
					}
					model.setState(bid, {
						icon: "",
						iconSelected: ""
					});
				} else {
					bid = this.cities[order.cityId].bid;
				}
				var treeData = this.cities[order.cityId];
				
				var totalMissing = 0;
				var totalResourcesFor = 0;
				var totalRecruited = 0;
				var totalCount = 0;
				var ordersAvailableForRecruitment = 0;
				
				var textColor = bos.Const.TABLE_DEFAULT_COLOR;
				for (var j = 0; j < order.units.length; j++) {
					var unit = order.units[j];					
					
					var lid;
					if (treeData.leafs.length <= j) {
						lid = model.addLeaf(bid, unit.count + " " + formatUnitType(unit.type, unit.count));
						treeData.leafs.push(lid);
					} else {
						lid = treeData.leafs[j];
					}								
					var details = this._calculateUnitDetails(unit, storedCity);
					
					var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
					var availableSpace = freeSpaceInBarracks;
					var heads = res.units[unit.type].uc;
					if (heads > 1) {
						availableSpace = Math.floor(availableSpace / heads);
					}
					
					if (details.missing > 0 && details.resourcesFor > 0 && availableSpace >= heads) {
						model.setColumnData(lid, 1, this._createActionButton(tr("recruit")));
						ordersAvailableForRecruitment++;
					} else {
						model.setColumnData(lid, 1, "");
					}
					var status = this._getStatus(order.cityId, j);
					if (status != undefined) {
						model.setColumnData(lid, 2, this.translateStatus(status.status));
						//secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));						
					} else {
						model.setColumnData(lid, 2, "");
					}
					model.setColumnData(lid, 3, bos.Utils.makeColorful(details.missing, textColor));
					model.setColumnData(lid, 4, bos.Utils.makeColorful(details.resourcesFor, textColor));
					model.setColumnData(lid, 5, bos.Utils.makeColorful(details.recruited, textColor));					
					model.setColumnData(lid, 6, bos.Utils.makeColorful(details.currentCount, textColor));
					model.setColumnData(lid, 7, bos.Utils.makeColorful(unit.time, textColor));
					model.setColumnData(lid, this.cityIdColumn, order.cityId);
					model.setColumnData(lid, this.typeColumn, j);					
					
					totalMissing += details.missing;
					totalResourcesFor += details.resourcesFor;
					totalRecruited += details.recruited;
					totalCount += details.currentCount;
				}
				
				if (ordersAvailableForRecruitment > 0) {
					model.setColumnData(bid, 1, this._createActionButton(tr("recruit")));
				} else {
					model.setColumnData(bid, 1, "");
				}
				model.setColumnData(bid, 3, bos.Utils.makeColorful(totalMissing, textColor));
				model.setColumnData(bid, 4, bos.Utils.makeColorful(totalResourcesFor, textColor));
				model.setColumnData(bid, 5, bos.Utils.makeColorful(totalRecruited, textColor));
				model.setColumnData(bid, 6, bos.Utils.makeColorful(totalCount, textColor));
				model.setColumnData(bid, this.cityIdColumn, order.cityId);
				model.setColumnData(bid, this.typeColumn, -1);
				
			}
			
			model.setData();
		},
		_createActionButton: function(caption, color) {
			var format = "<div style=\"background-image:url(%1);color:%3;cursor:pointer;margin-left:-6px;margin-right:-6px;margin-bottom:-3px;font-size:11px;height:19px\" align=\"center\">%2</div>";
			if (color == undefined) {
				color = "#f3d298";
			}
			return qx.lang.String.format(format, [this.buttonActiveUrl, caption, color]);
		},
		_calculateTotalRecruitingUnits: function(storedCity) {
			if (storedCity.unitQueue == null) {
				return 0;
			}
			var res = webfrontend.res.Main.getInstance();
			var recruiting = 0;
			for (var k = 0; k < storedCity.unitQueue.length; k++) {
				var uq = storedCity.unitQueue[k];
				if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {					
					recruiting += uq.left * res.units[uq.type].uc;					
				}
			}
			return recruiting;
		},
		_currentTSInCity: function(storedCity) {			
			var ts = 0;			
			if (storedCity.getUnits() != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var key in storedCity.getUnits()) {
					var item = (storedCity.getUnits())[key];
					
					var unit = res.units[key];
					ts += item.total * unit.uc;
				}
			}
			return ts;
		},
		_calculateUnitDetails: function(unit, storedCity) {
			var o = {
				currentCount: 0,
				recruited: 0,
				missing: 0,
				resourcesFor: 0
			};
		
			var currentItem = (storedCity.getUnits())[unit.type];
			if (currentItem != undefined) {						
				o.currentCount = currentItem.total;
			}
			
			if (storedCity.unitQueue != null) {
				for (var k = 0; k < storedCity.unitQueue.length; k++) {
					var uq = storedCity.unitQueue[k];
					if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {
						if (uq.type == unit.type) {
							o.recruited += uq.left;
						}
					}
				}
			}
			
			o.missing = Math.max(0, unit.count - o.currentCount - o.recruited);
						
			var resources = new Array();
			resources[0] = webfrontend.data.Player.getInstance().getGold();
			var row = [];
			var summary = getSummaryWidget();			
			if (summary._populateResources(row, storedCity.getId())) {				
				resources[1] = row["wood"];
				resources[2] = row["stone"];
				resources[3] = row["iron"];
				resources[4] = row["food"];
			}
			
			var maxRecruitable = [0, -1, -1, -1, -1];
			if (resources.length >= 5) {
				var res = webfrontend.res.Main.getInstance();
				var u = res.units[unit.type];	
				if (u.g == 0) {
					maxRecruitable[0] = -1;
				} else {
					maxRecruitable[0] = Math.floor(resources[0] / u.g);
				}
				
				for (var resType in u.res) {
					var req = u.res[resType];
					maxRecruitable[resType] = Math.floor(resources[resType] / req);
				}
				
				o.resourcesFor = bos.Const.INF;
				
				for (var i = 0; i <= 4; i++) {
					var min = maxRecruitable[i];
					if (min != -1) {
						o.resourcesFor = Math.min(o.resourcesFor, min);
					}
				}
			}			
			
			return o;
		},
		recruitAll: function() {
			var cities = webfrontend.data.Player.getInstance().cities;
			var orders = bos.Storage.getInstance().getRecruitmentOrders();
			this._sendingStatuses = {};
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city)) {
					continue;
				}				
				this.recruit(order.cityId, -1, false);
			}
		},
		_handleCellClick: function(e) {
			
			var row = this.tree.getDataModel().getRowData(e.getRow());
			var cityId = row[this.cityIdColumn];
			
			switch (e.getColumn()) {
				case 0:
					a.setMainView("c", cityId, -1, -1);
					break;
				case 1:
					//action
					this.recruit(cityId, row[this.typeColumn], true);					
					break;
			}
		},
		recruit: function(cityId, type, manual) {
			//type = -1 whole city, else index in units
			
			var order = bos.Storage.getInstance().findRecruitmentOrderById(cityId);
			if (order == null) {
				bos.Utils.handleError("Couldnt find recruitment order for cityId=" + cityId);
				return;
			}
			
			var storedCity = server.cities[cityId];
			if (storedCity == null) {
				bos.Utils.handleError("Couldnt find saved city data for cityId=" + cityId);
				return;
			}
			
			var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
			var currentTS = this._currentTSInCity(storedCity);
			var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
			if (freeSpaceInBarracks <= 0) {
				if (manual) {
					bos.Utils.handleWarning("No free space in barracks");
				}
				return;
			}
			
			var res = webfrontend.res.Main.getInstance();
			
			for (var i = 0; i < order.units.length; i++) { 
				if (type != -1 && type != i) {
					continue;
				}
				var unit = order.units[i];
				
				var availableSpace = freeSpaceInBarracks;
				var heads = res.units[unit.type].uc;
				if (heads > 1) {
					availableSpace = Math.floor(availableSpace / heads);
				}				
				
				var details = this._calculateUnitDetails(unit, storedCity);
				
				var count = Math.min(details.missing, details.resourcesFor, availableSpace);
				if (count <= 0) {
					continue;
				}
				
				var units = new Array();
				units.push({
					t: unit.type,
					c: count
				});
				
				var context = { 
					order: order,
					orderIndex: i,
					units: units
				};
			
				bos.net.CommandManager.getInstance().sendCommand("StartUnitProduction", {
					cityid: cityId,
					units: units,
					isPaid: true
				}, this, this._parseResponse, context);
				
				freeSpaceInBarracks -= count * heads;				
			}
		},
		_parseResponse: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(context, -1);
				} else {
					this._setStatus(context, parseInt(errorCode));
				}
				this.updateView();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},
		_setStatus: function(context, status) {
					
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["o" + context.order.cityId + "_" + context.orderIndex] = newStatus;
			
			if (status == 0) {
				var storedCity = server.cities[context.order.cityId];
				if (storedCity != undefined) {
					if (storedCity.unitQueue == null) {
						storedCity.unitQueue = new Array();
					}
					
					var start = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (storedCity.unitQueue.length > 0) {
						var lastOrder = storedCity.unitQueue[storedCity.unitQueue.length - 1];
						if (lastOrder.end > start) {
							start = lastOrder.end;
						}						
					}
				
					var unit = context.units[0];
					
					var usedRecruitmentOrder = context.order.units[context.orderIndex];

					var end = start + usedRecruitmentOrder.time * unit.c;
					
					var uq = {
						id: -1,
						type: unit.t,
						count: unit.c,
						batch: 1,
						left: unit.c,
						start: start,
						end: end,
						isPaid: true
					};
					
					storedCity.unitQueue.push(uq);
					storedCity.unitsInQueue += unit.c;
					
					server.markCityDirty(storedCity.getId());
				}
			}
		},
		_getStatus: function(cityId, orderIndex) {
			return this._sendingStatuses["o" + cityId + "_" + orderIndex];
		},
		translateStatus: function(status) {
			if (status == 0) {
				return "OK";
			}
			if (status == -1) {
				return "Comm. err";
			}
			var errors = "";
			if ((status & 0x01) != 0) errors += "I";
			if ((status & 0x02) != 0) errors += "R";
			if ((status & 0x04) != 0) errors += "Q";
			if ((status & 0x08) != 0) errors += "T";
			if ((status & 0x10) != 0) errors += "B";
			if ((status & 0x20) != 0) errors += "G";
			return errors;
		},
		_sortCities: function(tcm) {
        var data = tcm.getData();
        if (data.length == 0 || data[0].children.length == 0) return;
		
        data[0].children.sort(function(a, b) {
          var o1 = data[a].label.toLowerCase();
          var o2 = data[b].label.toLowerCase();
          if (o1 < o2) return -1;
          if (o1 > o2) return 1;
          return 0;
        });
      }
	}
});


qx.Class.define("bos.gui.UnitOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("orders"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		
		if(locale == "de") {
			columnNames = ["id", "StadtId", "Ausgehende Stadt", "Angriffstyp", "State", "Abreise", "Ankunft", "Rückkehr", "Pos", "Ziel",   
					"periodischer Angriffstyp?", "zuletzt Aktualisiert", "TS", "Einheiten"];
		} else {
			columnNames = ["id", "City Id", "From", "Type", "State", "Departure", "Arrival", "Back at home", "Pos", "Target",   
					"Recurring type", "Last visited", "TS", "Units"];
		}
		
		var columnIds = ["id", "cityId", "from", "type", "state", "start", "end", "recurringEndStep", "position", "target",   
					"recurringType", "lastUpdated", "ts", "units"];		
					
		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();				

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		
		columnModel.setColumnWidth(5, 120);
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 125);
		
		columnModel.setColumnWidth(11, 80);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(12, 50);
		
		columnModel.setColumnWidth(13, 180);
		
		var ministerMilitaryPresent = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();	
		
		if (ministerMilitaryPresent) {
			columnModel.setColumnVisible(5, false);
			columnModel.setColumnVisible(7, false);
			columnModel.setColumnVisible(11, false);
		}

		this.add(this.table, { flex: 1 } );		
			
	}, members: {
		sbOrderTypes: null,
		sbOrderStates: null,
		sbSourceContinent: null,
		_sbSourceContinentAsList: "",
		sbDestinationContinent: null,
		_sbDestinationContinentAsList: "",
		cbShowFakeAttacks: null,
		receivedFirstCOMO: false,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var filterTypeId = -1;
			
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbOrderStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}

			var filterSourceContinent = -1;
			sel = this.sbSourceContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterSourceContinent = sel[0].getModel();
			}

			var filterDestinationContinent = -1;
			sel = this.sbDestinationContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterDestinationContinent = sel[0].getModel();
			}

			var showFakeAttacks = this.cbShowFakeAttacks.getValue();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var sourceContinents = [];
			var destContinents = [];
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.unitOrders == null) {
					continue;
				}
						
				for (var i = 0; i < city.unitOrders.length; i++) {
					var item = city.unitOrders[i];
					
					var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
					sourceContinents["c" + cont] = true;
					
					var destCoords = bos.Utils.convertIdToCoordinatesObject(item.city);
					var destCont = webfrontend.data.Server.getInstance().getContinentFromCoords(destCoords.xPos, destCoords.yPos);
					destContinents["c" + destCont] = true;					
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					
					if (filterSourceContinent != -1 && filterSourceContinent != cont) {
						continue;
					}
					
					if (filterDestinationContinent != -1 && filterDestinationContinent != destCont) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);									
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["units"] = "";
					row["ts"] = 0;
					
					if (item.units != null) {					
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["units"] += ", ";
							}
							row["units"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							var space = unit.count * getUnitRequiredSpace(unit.type);
							row["ts"] += space;							
						}
					}
					//row["isDelayed"] = item.isDelayed;
					row["recurringType"] = this.translateRecurringType(item.recurringType);
					if (item.recurringEndStep > 0) {
						row["recurringEndStep"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.recurringEndStep));
					}
					row["lastUpdated"] = city.getLastUpdated();
					
					if (!showFakeAttacks && row["ts"] < bos.Const.FAKE_ATTACK_TS && (item.type == 2 || item.type == 3 || item.type == 5)) {
						//plunder, siege, assault
						continue;
					}					
										
					rowData.push(row);
				}
			}
			
			this._populateContinentsSelectBox(this.sbSourceContinent, sourceContinents, true);
			this._populateContinentsSelectBox(this.sbDestinationContinent, destContinents, false);
			
			return rowData;
		}, translateState: function(state) {
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");
				case 5:
					return this.tr("tnf:on siege");
			}
			return "??? " + state;			
		}, translateRecurringType: function(recurringType) {
			switch (recurringType) {
				case 0:
					return this.tr("tnf:once");
				case 1:
					return this.tr("tnf:dungeon completed");
				case 2:
					return this.tr("tnf:latest return time");
			}
			return "??? " + recurringType;
		}, _handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbOrderStates = this._createOrderStatesSelectBox();
			this.sbOrderStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderStates);
			
			this.sbSourceContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbSourceContinent.setToolTipText(tr("sbSourceContinent_toolTip"));
			//this.sbSourceContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbSourceContinent);

			this.sbDestinationContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbDestinationContinent.setToolTipText(tr("sbDestinationContinent_toolTip"));
			//this.sbDestinationContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDestinationContinent);			
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setToolTipText(tr("btnUpdateView_toolTip"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);
			
			this.cbShowFakeAttacks = new qx.ui.form.CheckBox(tr("cbShowFakeAttacks"));
			this.cbShowFakeAttacks.setToolTipText(tr("cbShowFakeAttacks_toolTip"));
			this.cbShowFakeAttacks.setValue(true);
			toolBar.add(this.cbShowFakeAttacks);
			this.cbShowFakeAttacks.addListener("execute", function(event) {
				this.updateView();
			}, this);
			
/*
			var startRefreshingFromServer = new qx.ui.form.Button(tr("startRefreshingFromServer"));
			startRefreshingFromServer.setWidth(80);			
			toolBar.add(startRefreshingFromServer);
			startRefreshingFromServer.addListener("execute", function(evt) {
				this.startRefreshingFromServer();								
			}, this);			
			*/
			return toolBar;
		}, 
		_createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [1, 2, 3, 4, 5, 8, 9, 10];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(bos.Utils.translateOrderType(t), null, t));
			}

			return sb;		
		}, 
		_createOrderStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order state</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [0, 1, 2, 4];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(this.translateState(t), null, t));
			}

			return sb;				
		},
		_populateContinentsSelectBox: function(sb, continents, isSource) {

			var list = [];
			for (var key in continents) {
				if (key.substring != undefined && qx.lang.Type.isString(key)) {
					var cont = parseInt(key.substring(1));
					if (!isNaN(cont)) {
						list.push(cont);
					}
				}
			}
			list.sort();
			
			var newValues = "";
			for (var i = 0; i < list.length; i++) {
				newValues += "," + list[i];
			}
			
			if (isSource) {				
				if (newValues == this._sbSourceContinentAsList) {
					return;
				}
				this._sbSourceContinentAsList = newValues;
			} else {
				if (newValues == this._sbDestinationContinentAsList) {
					return;
				}
				this._sbDestinationContinentAsList = newValues;			
			}
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sbTransport.setModelSelection([previouslySelected]);				
			}
		},
		startRefreshingFromServer: function() {
			receivedFirstCOMO = false;
			webfrontend.net.UpdateManager.getInstance().addConsumer("COMO", this);			
		},
		getRequestDetails: function(dt) {
			if (!this.receivedFirstCOMO) {				
				return "a";
			} else {
				return "";
			}
		}, 
		dispatchResults: function(r) {
			if (r == null || r.length == 0) return;
			
			this.receivedFirstCOMO = true;			
			try {
				for (var i = 0; i < r.length; i++) {
					var item = r[i];		
					server.addCOMOItem(item);
				}
			} catch (e) {
				bos.Utils.handleError(e);
			}
			this.updateView();
		},

	}
});

qx.Class.define("bos.gui.RegionPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Region");
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if(locale == "de") {
			columnNames = [ "Type", "Name", "Pos", "Punkte", "Besitzer", "Spieler Id", "Allianz", "Allianz Id", "Entfernung" ];
		} else {
			columnNames = [ "City type", "Name", "Pos", "Points", "Owner", "Player Id", "Alliance", "Alliance Id", "Distance"];
		}

		var columnIds = ["id", "name", "position", "points", "owner", "playerId", "allianceName", "allianceId", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(4, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		//columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 180);
		columnModel.setColumnVisible(5, false);
		columnModel.setColumnWidth(6, 140);
		columnModel.setColumnVisible(7, false);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(6, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
			
	}, members: {
		createRowData: function() {
			var rowData = [];
			if (a.visMain.mapmode == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof webfrontend.vis.WorldCity) {
						if (entity.progress < 0) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = this.translateCityType(entity.id) + " (" + entity.id + ")";

						row["name"] = entity.getCityName();
						row["position"] = entity.getCoordinates();
						row["points"] = entity.getCityPoints();
						row["playerId"] = entity.getPlayerId();
						row["owner"] = entity.getPlayerName() + " (" + entity.getPlayerPoints() + ")";
						if (row["owner"] != " (0)") {
							row["owner"] = row["owner"];
						}
						row["allianceName"] = entity.getAllianceName();
						row["allianceId"] = entity.getAllianceId();

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
						rowData.push(row);
					}
				}
			}
			return rowData;
		}, calculateCityType: function(cityType) {
			if (cityType >= 0 && cityType <= 7) {
				return bos.Const.REGION_CITY;
			}
			if (cityType >= 8 && cityType <= 15) {
				return bos.Const.REGION_CASTLE;
			}
			if (cityType >= 16 && cityType <= 23) {
				return bos.Const.REGION_LAWLESS_CITY;
			}
			if (cityType >= 24 && cityType <= 34) {
				return bos.Const.REGION_LAWLESS_CASTLE;
			}
			if (cityType >= 40 && cityType <= 40) {
				return bos.Const.REGION_RUINS;
			}
			return bos.Const.REGION_UNKNOWN;
		}, translateCityType: function(cityType) {
			var ct = this.calculateCityType(cityType);
			switch (ct) {						
			case bos.Const.REGION_CITY:
				return this.tr("tnf:city");
			case bos.Const.REGION_CASTLE:
				return "Castle";			
			case bos.Const.REGION_LAWLESS_CITY:
				return this.tr("tnf:lawless city");			
			case bos.Const.REGION_LAWLESS_CASTLE:
				return "Lawless Castle";
			case bos.Const.REGION_RUINS:
				return "Ruins";			
			default:
				return "???";
			}
		}, _handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 4:
				if (rowData["playerId"]) {
						var app = qx.core.Init.getApplication();
						app.showInfoPage(app.getPlayerInfoPage(), {
							id: rowData["playerId"]
						});
				}
			break;
			case 6:
				if (rowData["allianceId"]) {
					var app = qx.core.Init.getApplication();
					app.showInfoPage(app.getAllianceInfoPage(), {
							id: rowData["allianceId"]
					});
				}
				break;
			}

		}, _createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
					
			var btnCsvExport = new qx.ui.form.Button(locale == "de" ? "Export csv" : "Export csv");
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);	

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.DungeonsPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Dungeons");
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if( locale == "de") {
			columnNames = [ "Id", "Name", "Pos", "Level", "Fortschritt", "Entfernung" ];
		} else {
			columnNames = [ "Id", "Name", "Pos", "Level", "Progress", "Distance" ];
		}

		var columnIds = ["id", "name", "position", "level", "progress", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(5, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
	
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});		
			
	}, members: {
		sbDungeonTypes: null,
		sbBossTypes: null,
		createRowData: function() {
			var rowData = [];
			if (a.visMain.mapmode == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof webfrontend.vis.WorldDungeon) {
						if (!this._shouldBeIncluded(entity)) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = entity.id;
						var dungeonType = Math.abs(entity.id);
						row["name"] = res.dungeons[dungeonType].dn + " (" + entity.level + ")";
						row["position"] = entity.getCoordinates();
						row["level"] = entity.level;
						row["progress"] = entity.progress;

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);;
						rowData.push(row);
					}
				}
			}
			return rowData;

		}, _shouldBeIncluded: function(dungeon) {
			if (dungeon.progress < 0) {
				return false;
			}
		
			var sel = this.sbDungeonTypes.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var dungeonType = Math.abs(dungeon.id);
			var reqType = sel[0].getModel();
			if (reqType != "A") {

				switch (reqType) {
				case "M":
					if (dungeonType != 4 && dungeonType != 8) {
						return false;
					}					
					break;								
				case "F":
					if (dungeonType != 5 && dungeonType != 6) {
						return false;
					}					
					break;				
				case "H":
					if (dungeonType != 3 && dungeonType != 7) {
						return false;
					}					
					break;				
				case "S":
					if (dungeonType != 2 && dungeonType != 12) {
						return false;
					}					
					break;	
				}
			}
			
			var bossType = this.sbBossTypes.getSelection()[0].getModel();
			if (bossType != "A") {
				if (bossType == "B") {
					if (dungeonType <= 5) {
						return false;
					}
				} else if (bossType == "D") {
					if (dungeonType > 5) {
						return false;
					}					
				}
			}			

			return true;
		}, _handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());									
					}
				}
				break;
			}


		}, _createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbDungeonTypes = this._createDungeonTypesSelectBox();
			this.sbDungeonTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbDungeonTypes);

			this.sbBossTypes = this._createBossTypesSelectBox();
			this.sbBossTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbBossTypes);			

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}, _createDungeonTypesSelectBox: function() {
			var dungeonTypes = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			dungeonTypes.setToolTipText("Filter by: <b>dungeon type</b>");									
			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("All"), null, "A"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Mountain"), null, "M"));			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Forest"), null, "F"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Hill"), null, "H"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Sea"), null, "S"));

			return dungeonTypes;			
		}, _createBossTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			sb.setToolTipText("Filter by: <b>boss type</b>");									
			
			sb.add(new qx.ui.form.ListItem(tr("All"), null, "A"));
			sb.add(new qx.ui.form.ListItem(tr("Boss"), null, "B"));			
			sb.add(new qx.ui.form.ListItem(tr("Dungeon"), null, "D"));	

			return sb;
		}
	}
});

qx.Class.define("bos.gui.SummaryWidget", {
		type: "singleton",
		extend: qx.ui.window.Window,
		implement: [webfrontend.net.IUpdateConsumer],
		construct: function() {
			qx.ui.window.Window.call(this);				
			this.setLayout(new qx.ui.layout.Dock());

			var maxWidth = qx.bom.Viewport.getWidth(window);
			var maxHeight = qx.bom.Viewport.getHeight(window);			
			
			var pos = bos.Storage.getInstance().getSummaryPosition();
			if (pos == null) {
				pos = {
					left: 400,
					top: 150,
					width: Math.max(600, qx.bom.Viewport.getWidth(window) - 420),
					height: 500
				}
			} else {
				if (pos.left >= maxWidth) {
					pos.left = 0;
				}
				if (pos.top >= maxHeight) {
					pos.top = 0;
				}
			}
			
			this.set({
				width: pos.width,
				minWidth: 200,
				maxWidth: parseInt(maxWidth * 0.9),
				height: pos.height,
				minHeight: 200,
				maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
				allowMaximize: false,
				allowMinimize: false,
				showMaximize: false,
				showMinimize: false,
				showStatusbar: false,
				showClose: false,
				caption: ("Summary"),
				resizeSensitivity: 7,
				contentPadding: 0
			});				

			this.moveTo(pos.left, pos.top);

			this.tabView = new qx.ui.tabview.TabView().set({
				contentPadding: 5
			});
			this.tabView.setAppearance("tabview");
			this.createCitiesTab();
			this.createMilitaryTab();
			this.createDefencesTab();
			this.createCastlesTab();
						
			this.purifyResourcesTab = new bos.gui.PurifyResourcesPage();
			this.tabView.add(this.purifyResourcesTab);
			
			this.massRecruitmentTab = new bos.gui.MassRecruitmentPage();
			this.tabView.add(this.massRecruitmentTab);
			
			this.dungeonsTab = new bos.gui.DungeonsPage();
			this.tabView.add(this.dungeonsTab);
			
			this.regionTab = new bos.gui.RegionPage();
			this.tabView.add(this.regionTab);					

			this.tradeOrdersTab = new bos.gui.TradeOrdersPage();
			this.tabView.add(this.tradeOrdersTab);
			
			this.tradeRoutesTab = new bos.gui.TradeRoutesPage();
			this.tabView.add(this.tradeRoutesTab);
			
			this.unitOrdersTab = new bos.gui.UnitOrdersPage();
			this.tabView.add(this.unitOrdersTab);
					
			this.incomingAttacksTab = new bos.gui.IncomingAttacksPage();
			this.tabView.add(this.incomingAttacksTab);

			this.createOptionsTab();
			this.tabView.addListener("changeSelection", this.onChangeTab, this);
			
			this.add(this.tabView);

			this.cities = new Array();
			webfrontend.gui.Util.formatWinClose(this);
			
			this.guardianTimer = new qx.event.Timer(10500);
			this.guardianTimer.addListener("interval", this.checkAndReattachConsumers, this);	
			this.guardianTimer.start();	

			if (webfrontend.data.Player.getInstance().getMinisterBuildPresent()) {
				this.btnStartRefreshingResources.execute();
			}
			
			if (webfrontend.data.Player.getInstance().getMinisterMilitaryPresent()) {
				this.unitOrdersTab.startRefreshingFromServer();
			}
			
		}, statics: {
			_defaultSortComparatorInsensitiveAscending : function(row1, row2) {
				//summary row always at the bottom
				if (row1[0] == "Total") {
					return 1;
				}

				if (row2[0] == "Total") {
					return -1;
				}

				var obj1 = null;
				if (row1[arguments.callee.columnIndex] != null)
						obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
								row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

				var obj2 = null;
				if (row2[arguments.callee.columnIndex] != null)
						obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
								row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

				var n1 = qx.lang.Type.isNumber(obj1);
				var n2 = qx.lang.Type.isNumber(obj2);
				if (n1 && n2) {
					var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
					if (result != null) {
						if (result == 0) {
							return row1[0] > row2[0] ? 1 : -1;
						}
						return result;
					}
				}

				if (n1 && !n2) {
					return -1;
				}

				if (!n1 && n2) {
					return 1;
				}

				if (obj1 > obj2) {
					return 1;
				} else if (obj1 < obj2) {
					return -1;
				}
				
				return row1[0] > row2[0] ? 1 : -1;
			}, 
			_defaultSortComparatorInsensitiveDescending : function(row1, row2) {
					//summary row always at the bottom
					if (row1[0] == "Total") {
							return 1;
					}
					if (row2[0] == "Total") {
							return -1;
					}

					var obj1 = null;
					if (row1[arguments.callee.columnIndex] != null)
							obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
									row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

					var obj2 = null;
					if (row2[arguments.callee.columnIndex] != null)
							obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
									row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

					var n1 = qx.lang.Type.isNumber(obj1);
					var n2 = qx.lang.Type.isNumber(obj2);
					if (n1 && n2) {
						var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
						if (result != null) {
							if (result == 0) {
								return row1[0] < row2[0] ? 1 : -1;
							}
						}
					}

					if (n1 && !n2) {
						return -1;
					}

					if (!n1 && n2) {
						return 1;
					}
					
					if (obj1 < obj2)
						return 1;
					if (obj1 > obj2)
						return -1;

					return row1[0] > row2[0] ? 1 : -1;
			}
		}, members: {
				tabView: null,
				citiesTab: null,
				militaryTab: null,
				dungeonsTab: null,
				regionTab: null,
				unitOrdersTab: null,
				tradeOrdersTab: null,
				tradeRoutesTab: null,
				incomingAttacksTab: null,
				castlesTab: null,
				purifyResourcesTab: null,
				optionsTab: null,
				citiesTable: null,
				militaryTable: null,
				defencesTable: null,			
				castlesTable: null,				
				_citiesTableModel: null,
				_militaryTableModel: null,
				_defencesTableModel: null,
				_castlesTableModel: null,
				_requestedResourceType: 1,
				_requestedResourceCity: 0,
				_requestedResourceFetchedCities: null,
				_requestedResourceRefreshView: false,
				sbCityType: null,
				sbContinents: null,
				sbTableName: null,
				cbPersistCities: null,
				cbLoadPersistedCitiesAtStart: null,
				btnRefreshResources: null,
				btnStartRefreshingResources: null,
				cbLoadTableSettingsAtStart: null,
				_requestResourcesProgressDialog: null,
				_waitingForFullMessage: true,
				cities: null,
				resfHandlerAdded: false,
				sbCustomCityTypes: null,
				cbSaveSummaryPosition: null,
				sbBannedPlayers: null,
				cbTweakChatAtStart: null,
				cbTweakMarkersAtStart: null,
				cbTweakReportAtStart: null,
				updateManagerConsumers: [],
				guardianTimer: null,
				getRequestDetails: function(dt) {
					return "";
				}, 
				dispatchResults: function(du) {
					if (this._waitingForFullMessage) {
						webfrontend.net.UpdateManager.getInstance().removeConsumer("RESF", this);
						webfrontend.net.UpdateManager.getInstance().addConsumer("RESO", this);
						this.updateManagerConsumers.push("RESO");
						this._waitingForFullMessage = false;
					}
					if (du == null || du.length == 0) return;
					
					for (var i = 0; i < du.length; i++) {
						var dv = du[i];
						if (!this.cities.hasOwnProperty(dv.i)) {


						}

						this.cities[dv.i] = dv;
					}
					this.updateView();
				}, checkAndReattachConsumers: function() {
					var manager = webfrontend.net.UpdateManager.getInstance();					
					for (var c = 0; c < this.updateManagerConsumers.length; c++) {
						var code = this.updateManagerConsumers[c];
						var attached = false;
						for (var i = 0; i < manager.reciever.length; i++) {	
							var item = manager.reciever[i];
							if (item != null && item.code == code && item.consumer == this) {
								attached = true;
								break;
							}
						}
						if (!attached) {
							manager.addConsumer(code, this);
						}
					}
				}, onTick: function() {

				}, onChangeTab: function() {
					if (this.tabView.isSelected(this.dungeonsTab) || this.tabView.isSelected(this.regionTab)) {
						this._forceRegionMap();
					}			

					this.updateView();
				}, activateOverlay: function(show) {
					if (show) {
						server.addListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					} else {
						server.removeListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					}
				}, 
				_createCitiesContinentsSelectBox: function() {
					var sb = new qx.ui.form.SelectBox().set({
							width: 60,
							height: 28
					});
					var cities = webfrontend.data.Player.getInstance().cities;

					sb.setToolTipText("Filter by: <b>continents</b>");

					var continents = [];
					for (var cityId in cities) {
						var city = cities[cityId];

						var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
						continents["c" + cont] = true;
					}

					var list = [];
					for (var key in continents) {
						if (key.substring != undefined && qx.lang.Type.isString(key)) {
							var cont = parseInt(key.substring(1));
							if (!isNaN(cont)) {
									list.push(cont);
							}
						}
					}
					list.sort();

					sb.add(new qx.ui.form.ListItem(locale == "de" ? "Alle" : "All", null, "A"));
					for (var i = 0; i < list.length; i++) {
						var cont = list[i];
						sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
					}

					return sb;
				}, 
				_createExportButton: function() {
					var btnExport = new qx.ui.form.Button(locale == "de" ? "Exportiere zu csv" : "Export to csv");
					btnExport.setToolTipText(locale == "de" ? "Exportiert die Tabelle ins csv Format" : "Exports table in csv format");
					btnExport.setWidth(120);
					return btnExport;
				}, _setupSorting: function(tableModel) {
					tableModel.setCaseSensitiveSorting(false);

					var compare = {
						ascending  : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveAscending,
						descending : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveDescending
					};

					for (var col = 0; col < tableModel.getColumnCount(); col++) {
							tableModel.setSortMethods(col, compare);
					}
				}, loadPersistedCities: function() {
					var savedCities = bos.Storage.getInstance().getSavedCities();
					var cities = webfrontend.data.Player.getInstance().cities;

					var count = 0;
					for (var key in savedCities) {
						var cityId = parseInt(savedCities[key]);
						if (server.cities[cityId] == undefined && cities[cityId] != undefined && !isNaN(cityId)) {
							var loaded = bos.Storage.getInstance().loadCity(cityId);
							server.cities[cityId] = loaded;
							count++;
						}
					}
					
					this.updateView();

				}, createCitiesTab: function() {
					this.citiesTab = new qx.ui.tabview.Page(locale == "de" ? "Städte" : "Cities");
					this.citiesTab.setLayout(new qx.ui.layout.VBox(10));

					var toolBar = new qx.ui.groupbox.GroupBox();
					toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

					this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
					bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
					this.sbCityType.addListener("changeSelection", this.updateView, this);						
					toolBar.add(this.sbCityType);

					this.sbContinents = this._createCitiesContinentsSelectBox();
					this.sbContinents.addListener("changeSelection", this.updateView, this);
					toolBar.add(this.sbContinents);

					this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
					this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
					this.btnRefreshResources.setWidth(120);
					if (locale == "de") {
						this.btnRefreshResources.setWidth(150);
					}
					
					var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
					btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
					btnRefreshView.setWidth(120);
					btnRefreshView.addListener("execute", this.updateView, this);					
					
					var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterBuildPresent();
					if (!ministerBuildPresent) {
						toolBar.add(this.btnRefreshResources);
						toolBar.add(btnRefreshView);
					}
					this.btnRefreshResources.addListener("execute", function(evt) {
						this._requestedResourceRefreshView = true;
						this.fetchResources();
					}, this);
					
					this.btnStartRefreshingResources = new qx.ui.form.Button("Start refreshing resources");
					this.btnStartRefreshingResources.setToolTipText("Starts refreshing resources data using server side summary.<br/>Should always be accurate<br/>Function requires Building Minister");
					this.btnStartRefreshingResources.addListener("execute", function(evt) {
						if (!this.resfHandlerAdded) {
							webfrontend.net.UpdateManager.getInstance().addConsumer("RESF", this);
							//this.btnStartRefreshingResources.setLabel("Stop refreshing resources");
							toolBar.remove(this.btnStartRefreshingResources);																
							this.resfHandlerAdded = true;
						}
					}, this);

					if (ministerBuildPresent) {
						toolBar.add(this.btnStartRefreshingResources);
					}

					this.citiesTab.add(toolBar);

					var tableModel = this._citiesTableModel = new qx.ui.table.model.Simple();
					/*
					var displayedColumnNames;
					if (locale == "de") {
							displayedColumnNames = [ "Id", "Name", "Pos", "Referenz", "Holz", "Holz/h", "freie Holzkapazität", "max. Holz", "Stein", "Stein/h", "max. Stein", "freie Steinkapazität", "Eisen", "Eisen/h", "max. Eisen", "freie Eisenkapazität", "Nahrung", "Nahrung/h", "max. Nahrung", "freie Nahrungskapazität", "Gold/h", "Bauliste", "Rekrutierliste", "Marktkarren", "Handelsschiffe", "Letzter Aufruf am:"];
					} else {
							displayedColumnNames = [ "Id", "Name", "Pos", "Reference", "Wood", "Wood/h", "Wood max", "Wood free", "Stone", "Stone/h", "Stone max", "Stone free", "Iron", "Iron/h", "Iron max", "Iron free", "Food", "Food/h", "Food max", "Food free", "Gold/h", "Build queue", "Unit queue", "Carts", "Ships", "Last visited"];
					}
					*/
					
					var columnIds = ["id", "name", "position", "reference", "wood", "wood/h", "woodMax", "woodFree", "woodIncoming", "woodFullAt", "stone", "stone/h", "stoneMax", "stoneFree", "stoneIncoming", "stoneFullAt", "iron", "iron/h", "ironMax", "ironFree", "ironIncoming", "ironFullAt", "food", "food/h", "foodMax", "foodFree", "foodIncoming", "foodFullAt", "gold/h", "buildQueue", "unitQueue", "carts", "ships", "lastUpdated"];
					
					tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

					this._setupSorting(tableModel);
					tableModel.sortByColumn(1, true);

					this.citiesTable = new bos.ui.table.Table(tableModel);
					this.citiesTable.addListener("cellClick", function(event) {
						this._handleCellClick(event, this._citiesTableModel);
					}, this);

					var columnModel = this.citiesTable.getTableColumnModel();
					columnModel.setColumnVisible(0, false);
					columnModel.setColumnWidth(2, 64);
					columnModel.setColumnWidth(3, 160);

					//hide all "*/h", "*Max", "*Free", "*Incoming", "*FullAt" columns
					var columnsPerRes = 6;
					var columnsBeforeWood = 4;
					for (var res = 1; res <= 4; res++) {
						var col = columnsBeforeWood + (res - 1) * columnsPerRes;
						col++; //skip resource count column
						columnModel.setColumnVisible(col++, false);
						columnModel.setColumnVisible(col++, false);
						columnModel.setColumnVisible(col++, false);
						columnModel.setColumnVisible(col++, false);
						columnModel.setColumnVisible(col++, false);
					}					
					
					//gold/h
					var goldColumn = columnsBeforeWood + 4 * columnsPerRes;
					columnModel.setColumnVisible(goldColumn, false);

					columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

					columnModel.setDataCellRenderer(goldColumn + 1, new bos.ui.table.cellrenderer.HumanTime());
					columnModel.setDataCellRenderer(goldColumn + 2, new bos.ui.table.cellrenderer.HumanTime());
					columnModel.setDataCellRenderer(goldColumn + 5, new bos.ui.table.cellrenderer.HumanTime(2));
					
					var resTypes = ["gold", "wood", "stone", "iron", "food"];
					for (var res = 1; res <= 4; res++) {
						var col = columnsBeforeWood + (res - 1) * columnsPerRes;
						var resType = resTypes[res];
						var resRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", resType + "Max", resType + "Free");
						columnModel.setDataCellRenderer(col, resRenderer);
					}

					var foodPerHourRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
					foodPerHourRenderer.addNumericCondition("<", 0, null, bos.Const.RESOURCE_RED, null, null);
					foodPerHourRenderer.addNumericCondition(">=", 0, null, bos.Const.RESOURCE_GREEN, null, null);
					columnModel.setDataCellRenderer(columnsBeforeWood + (4 - 1) * columnsPerRes + 1, foodPerHourRenderer);

					this.citiesTab.add(this.citiesTable, { flex : 1 });

					var btnExport = this._createExportButton();
					toolBar.add(btnExport);
					btnExport.addListener("execute", function(evt) {
						this.citiesTable.exportToCsv();
					}, this);

					var btnHelp = new qx.ui.form.Button(tr("help"));
					btnHelp.setWidth(120);
					toolBar.add(btnHelp);
					btnHelp.addListener("execute", function(evt) {
						var dialog = new webfrontend.gui.ConfirmationWidget();
						if (locale == "de"){
							dialog.showGenericNotice("Summary Hilfe", "Die Städte werden nach speziellen Zeichen in den Referenzen sortiert.Diese Zeichen werden durch *Zeichen* makiert und können an einer beliebigen Stelle in der Referenz stehen. Als Beispiel: 'Kont 23_3 *CM*'würde eine Burg darstellen, welche auch Mondsteine herstellen kann.", "C - Burg (Castle), M - Mondstein, W - Lager(Warehouse), B - In Bau/Aufbau, D - Defensive, G - Gold", "webfrontend/ui/bgr_popup_survey.gif");
						}
						else {
							dialog.showGenericNotice("Summary Help", "Cities are categorized according to special pattern in city reference. Pattern is *OPTIONS* and could be placed anywhere. For example '*CM* some more info' means castle which could produce moonstones", "C - Castle, M - Moonstones, W - Warehouse, B - Building, D - Defensive, G - Gold", "webfrontend/ui/bgr_popup_survey.gif");
						}

						a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
					}, this);

					this.tabView.add(this.citiesTab);				
				}, _handleCellClick: function(event, tableModel) {
					var row = event.getRow();
					var rowData = tableModel.getRowDataAsMap(row);
					var cityId = rowData["id"];
					switch (event.getColumn()) {
					case 1:
						a.setMainView("c", cityId, -1, -1);
						break;
					case 2:
						var cities = webfrontend.data.Player.getInstance().cities;
						var city = cities[cityId];
						if (city != null) {

								var x = parseInt(city["xPos"]);
								var y = parseInt(city["yPos"]);

								a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
						break;
					}

				}, createMilitaryTab: function() {
					this.militaryTab = new qx.ui.tabview.Page(tr("military"));
					this.militaryTab.setLayout(new qx.ui.layout.VBox(10));

					var toolBar = new qx.ui.groupbox.GroupBox();
					toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

					this.militaryTab.add(toolBar);

					var tableModel = this._militaryTableModel = new qx.ui.table.model.Simple();

					var columns = [ "Id", "Name", "Pos", "Reference"];
					var columnNames = ["id", "name", "position", "reference"];
					for (var i = 1; i <= 19; i++) {
						if (i == 18) continue;
						var unitName = formatUnitType(i, 2);
						columns.push(unitName);
						columnNames.push("unit_" + i);
					}
					columns.push("TS");
					columnNames.push("ts");

					columns.push("Summary (dbl click to select)");
					columnNames.push("summary_military");

					tableModel.setColumns(columns, columnNames);

					this._setupSorting(tableModel);
					tableModel.sortByColumn(1, true);

					this.militaryTable = new bos.ui.table.Table(tableModel);
					this.militaryTable.addListener("cellClick", function(event) {
						this._handleCellClick(event, this._militaryTableModel);
					}, this);
					
					var columnModel = this.militaryTable.getTableColumnModel();
					columnModel.setColumnVisible(0, false);
					columnModel.setColumnWidth(2, 64);

					var res = webfrontend.res.Main.getInstance();

					for (var i = 1; i <= 19; i++) {
						if (i == 18) continue;

						var col = i + 3;
						if (i == 19) {
							col--;
						}

						columnModel.setColumnWidth(col, 60);
					}

					columnModel.setColumnWidth(20, 60);
					columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

					tableModel.setColumnEditable(23, true);
					columnModel.setColumnWidth(23, 400);

					this.militaryTab.add(this.militaryTable, { flex : 1 });

					var btnExport = this._createExportButton();
					toolBar.add(btnExport);
					btnExport.addListener("execute", function(evt) {
						this.militaryTable.exportToCsv();
					}, this);

					this.tabView.add(this.militaryTab);
				}, createDefencesTab: function() {
						this.defencesTab = new qx.ui.tabview.Page(locale == "de" ? "Verteidiger" : "Defenders");
						this.defencesTab.setLayout(new qx.ui.layout.VBox(10));

						var toolBar = new qx.ui.groupbox.GroupBox();
						toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

						this.defencesTab.add(toolBar);

						var tableModel = this._defencesTableModel = new qx.ui.table.model.Simple();

						var columns = [ "Id", "Name", "Pos", "Reference"];
						var columnNames = ["id", "name", "position", "reference"];
						for (var i = 1; i <= 19; i++) {
							if (i == 18) continue;
							var unitName = formatUnitType(i, 2);
							columns.push(unitName);
							columnNames.push("unit_def_" + i);
						}
						
						columns.push("TS");
						columnNames.push("summary_defenders_ts");
						
						columns.push(locale == "de" ? "Zusammenfassung (Doppelklicken zum Kopieren)" : "Summary (dbl click to select)");
						columnNames.push("summary_defenders");

						tableModel.setColumns(columns, columnNames);
						
						tableModel.setColumnEditable(23, true);

						this._setupSorting(tableModel);
						tableModel.sortByColumn(1, true);

						var custom = {
							tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};

						this.defencesTable = new bos.ui.table.Table(tableModel, custom);
						this.defencesTable.addListener("cellClick", function(event) {
							this._handleCellClick(event, this._defencesTableModel);
						}, this);

						var columnModel = this.defencesTable.getTableColumnModel();

						var res = webfrontend.res.Main.getInstance();

						for (var i = 1; i <= 19; i++) {
							if (i == 18) continue;

							var col = i + 3;
							if (i == 19) {
									col--;
							}

							columnModel.setColumnWidth(col, 60);
							columnModel.setColumnVisible(col, false);
						}
						
						columnModel.setColumnWidth(22, 60);
						//summary
						columnModel.setColumnWidth(23, 400);


						columnModel.setColumnVisible(0, false);
						columnModel.setColumnWidth(2, 64);
						columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
						columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

						var tcm = this.defencesTable.getTableColumnModel();
						var resizeBehavior = tcm.getBehavior();
						resizeBehavior.setWidth(1, 100);
						resizeBehavior.setWidth(2, 60);
						resizeBehavior.setWidth(22, 60);
						resizeBehavior.setWidth(23, "1*");
						resizeBehavior.setMinWidth(23, 100);

						this.defencesTab.add(this.defencesTable, { flex : 1 });

						var btnExport = this._createExportButton();
						toolBar.add(btnExport);
						btnExport.addListener("execute", function(evt) {
								this.defencesTable.exportToCsv();
						}, this);

						this.tabView.add(this.defencesTab);

				}, createCastlesTab: function() {
						this.castlesTab = new qx.ui.tabview.Page(locale == "de" ? "Burgen" : "Castles");
						this.castlesTab.setLayout(new qx.ui.layout.Dock());

						var tableModel = this._castlesTableModel = new qx.ui.table.model.Simple();
						if( locale == "de"){
						var columnNames = [ "Id", "Name", "Pos", "Nahrung", "Nahrung: Lagerkapazität", "Keine Nahrung mehr am", "Einheiten", "Rekutierungsliste", "TS der Einheiten die z.Z. verfügbar sind", "Holz: Lagerkapazität", "Eisen: Lagerkapazität", "Verteidiger (Doppelklicken zum Auswählen)"];
						}
						else{
						var columnNames = [ "Id", "Name", "Pos", "Food", "Food: storage capacity", "Food empty in", "Units", "Units queue", "Not raiding", "Wood: storage capacity", "Iron: storage capacity", "Defenders (dbl click to select)"];
						}
						var columnIds = ["id", "name", "position", "foodLevel", "foodFree", "foodEmptyAt", "unitsLevel", "unitQueue", "unitsAtHome", "woodFree", "ironFree", "summary_defenders"];

						tableModel.setColumns(columnNames, columnIds);

						this._setupSorting(tableModel);
						tableModel.sortByColumn(5, true);
						tableModel.setColumnEditable(11, true);

						var custom = {
							tableColumnModel : function(obj) {
								return new qx.ui.table.columnmodel.Resize(obj);
							}
						};

						this.castlesTable = new bos.ui.table.Table(tableModel, custom);
						this.castlesTable.addListener("cellClick", function(event) {
							this._handleCellClick(event, this._castlesTableModel);
						}, this);

						var columnModel = this.castlesTable.getTableColumnModel();

						var res = webfrontend.res.Main.getInstance();

						columnModel.setColumnVisible(0, false);
						columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
						columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
						
						var foodRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
						foodRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
						foodRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
						foodRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
						foodRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
						columnModel.setDataCellRenderer(3, foodRenderer);

						columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(true));
						columnModel.setDataCellRenderer(7, new bos.ui.table.cellrenderer.HumanTime());
						
						var unitsRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
						unitsRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
						unitsRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
						unitsRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
						unitsRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
						columnModel.setDataCellRenderer(6, unitsRenderer);

						var tcm = this.castlesTable.getTableColumnModel();
						var resizeBehavior = tcm.getBehavior();
						resizeBehavior.setWidth(1, 120);
						resizeBehavior.setWidth(2, 64);
						resizeBehavior.setWidth(3, 50);
						resizeBehavior.setWidth(4, 120);
						resizeBehavior.setWidth(5, 100);
						resizeBehavior.setWidth(6, 50);
						resizeBehavior.setWidth(7, 100);
						resizeBehavior.setWidth(8, 80);
						resizeBehavior.setWidth(9, 90);
						resizeBehavior.setWidth(10, 90);
						resizeBehavior.setWidth(11, "1*");
						resizeBehavior.setMinWidth(11, 100);

						this.castlesTab.add(this.castlesTable);

						this.tabView.add(this.castlesTab);
						
				}, 
				_shouldCityBeIncluded: function(city) {
					var sel = this.sbCityType.getSelection();
					if (sel == null || sel.length == 0) {
						return false;
					}
					var reqType = sel[0].getModel();
					if (reqType != "A") {
						var type = bos.CityTypes.getInstance().parseReference(city.reference);
						switch (reqType) {
							case 'C':
								if (!type.isCastle) return false;
								break;
							case 'B':
								if (!type.isBuildInProgress) return false;
								break;
							case 'W':
								if (!type.isWarehouse) return false;
								break;
							case 'M':
								if (!type.hasMoonglowTower) return false;
								break;
							case 'G':
								if (!type.isGold) return false;
								break;
							case 'D':
								if (!type.isDefensive) return false;
								break;
							default:
								if (type.customTypes.indexOf(reqType) < 0) return false;
								break;
						}
					}
					var reqCont = this.sbContinents.getSelection()[0].getModel();
					if (reqCont != "A") {
							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
							if (parseInt(reqCont) != cont) {
									return false;
							}
					}

					return true;
				}, 
				createCastlesRowData: function() {
						var rowData = [];

						var castles = bos.CityTypes.getInstance().getCastles();

						var cities = webfrontend.data.Player.getInstance().cities;

						for (var key in castles) {
								var cityId = parseInt(castles[key]);
								var c = cities[cityId];

								if (c == null) {
										continue;
								}

								var unknownValue = "";

								var row = [];
								this._addBlankValuesToRow(row, this._castlesTableModel);
								row["id"] = cityId;
								row["name"] = c.name;
								row["position"] = c.xPos + ":" + c.yPos;
							
								if (server.cities[cityId] == undefined) {
									/*
									var resCity = server.cityResources["c" + cityId];
									if (resCity != null) {
											this._updateRowFromResCity(resCity, row);
									}
									*/
								} else {
									var city = server.cities[cityId];

									var wood = parseInt(city.getResourceCount(bos.Const.WOOD));
									var iron = parseInt(city.getResourceCount(bos.Const.IRON));
									var food = parseInt(city.getResourceCount(bos.Const.FOOD));

									var maxFood = city.getResourceMaxStorage(bos.Const.FOOD);

									row["woodFree"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD)) - wood;
									row["ironFree"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON)) - iron;
									row["foodFree"] = maxFood - food;
									
									if (maxFood > 0) {
										row["foodLevel"] = parseInt(100 * food / maxFood);
										row["foodLevel"] = row["foodLevel"];
									}

									if (city.getUnitLimit() > 0) {
										var totalUnits = city.getUnitCount() + city.getUnitsInQueue();
										row["unitsLevel"] = parseInt(100 * totalUnits / city.getUnitLimit());
										row["unitsLevel"] = row["unitsLevel"];
									}

									var foodBallance = city.getFoodBalance();
									if (foodBallance >= 0) {
											row["foodEmptyAt"] = "food positive";
									} else {
											var totalConsumption = city.getFoodConsumption() + city.getFoodConsumptionSupporter() + city.getFoodConsumptionQueue();
											var emptyAt = city.getResourceStorageEmptyTime(bos.Const.FOOD, totalConsumption);
											var timeDiff = emptyAt - new Date();
											row["foodEmptyAt"] = parseInt(timeDiff / 1000);
									}

									row["unitQueue"] = city.unitQueueOcuppied();

									var sum = [];
									this._addDefendersToRow(city, row, sum);
								}
								
								if (this._populateResources(row, cityId)) {
									if (row["foodMax"] > 0) {
										row["foodLevel"] = parseInt(100 * row["food"] / row["foodMax"]);
										row["foodLevel"] = row["foodLevel"];														
									}												
								}												


								rowData.push(row);
						}

						return rowData;
				}, loadPersistedTableSettings: function() {
						var storage = bos.Storage.getInstance();

						if (storage.getCitiesTableSettings() != null) {
							this.citiesTable.applyTableSettings(storage.getCitiesTableSettings(), "Cities");
						}
						if (storage.getMilitaryTableSettings() != null) {
							this.militaryTable.applyTableSettings(storage.getMilitaryTableSettings(), "Military");
						}
						if (storage.getMoonstonesTableSettings() != null) {
							this.purifyResourcesTab.table.applyTableSettings(storage.getMoonstonesTableSettings(), "Moonstones");
						}
				}, createOptionsTab: function() {
					this.optionsTab = new qx.ui.tabview.Page(tr("options"));
					this.optionsTab.setLayout(new qx.ui.layout.Dock());
					
					var scrollable = new qx.ui.container.Scroll();						
					this.optionsTab.add(scrollable);
					
					var scroll = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					scrollable.add(scroll);
					
					var container;

					container = new qx.ui.groupbox.GroupBox(tr("table settings"));
					container.setLayout(new qx.ui.layout.Flow(10, 10));
					scroll.add(container);

					this.cbLoadTableSettingsAtStart = new qx.ui.form.CheckBox(tr("load table settings at start"));
					this.cbLoadTableSettingsAtStart.setValue(bos.Storage.getInstance().getLoadTableSettingsAtStart());
					this.cbLoadTableSettingsAtStart.addListener("execute", function(event) {
						bos.Storage.getInstance().setLoadTableSettingsAtStart(this.cbLoadTableSettingsAtStart.getValue());
					}, this);
					container.add(this.cbLoadTableSettingsAtStart);

					this.sbTableName = new qx.ui.form.SelectBox().set({
						width: 120,
						height: 28
					});
					this.sbTableName.setToolTipText(tr("table name"));
					this.sbTableName.add(new qx.ui.form.ListItem(tr("cities"), null, "cities"));
					this.sbTableName.add(new qx.ui.form.ListItem(tr("Military"), null, "military"));
					this.sbTableName.add(new qx.ui.form.ListItem(tr("purify resources"), null, "moonstones"));
					container.add(this.sbTableName);

					var btnLoadTableSettings = new qx.ui.form.Button(tr("btnLoadTableSettings"));
					btnLoadTableSettings.setToolTipText(tr("btnLoadTableSettings_toolTip"));
					btnLoadTableSettings.setWidth(140);
					container.add(btnLoadTableSettings);
					btnLoadTableSettings.addListener("execute", function(evt) {
						var tableName = this.sbTableName.getSelection()[0].getModel();
						var storage = bos.Storage.getInstance();
						var tbl = null;
						var settings = null;
						switch (tableName) {
							case "cities":
								tbl = this.citiesTable;
								settings = storage.getCitiesTableSettings();
								break;
							case "military":
								tbl = this.militaryTable;
								settings = storage.getMilitaryTableSettings();
								break;
							case "moonstones":
								tbl = this.moonstonesTable;
								settings = storage.getMoonstonesTableSettings();
								break;
						}
						if (tbl != null && settings != null) {
								tbl.applyTableSettings(settings, tableName);
						}

					}, this);

					var btnSaveTableSettings = new qx.ui.form.Button(tr("btnSaveTableSettings"));
					btnSaveTableSettings.setToolTipText(tr("btnSaveTableSettings_toolTip"));
					btnSaveTableSettings.setWidth(140);
					container.add(btnSaveTableSettings);
					btnSaveTableSettings.addListener("execute", function(evt) {
						var tableName = this.sbTableName.getSelection()[0].getModel();
						var tbl = null;
						switch (tableName) {
							case "cities":
									tbl = this.citiesTable;
									break;
							case "military":
									tbl = this.militaryTable;
									break;
							case "moonstones":
									tbl = this.moonstonesTable;
									break;
						}
						if (tbl != null) {
							tbl.saveTableSettings(tableName);
						}
					}, this);

					container = new qx.ui.groupbox.GroupBox(tr("saving cities data"));
					container.setLayout(new qx.ui.layout.Flow(10, 10));
					scroll.add(container);

					this.cbPersistCities = new qx.ui.form.CheckBox(tr("cbPersistCities"));
					this.cbPersistCities.setToolTipText(tr("cbPersistCities_toolTip"));
					this.cbPersistCities.setValue(bos.Storage.getInstance().getPersistingCitiesEnabled());
					this.cbPersistCities.addListener("execute", function(event) {
						bos.Storage.getInstance().setPersistingCitiesEnabled(this.cbPersistCities.getValue());
					}, this);
					container.add(this.cbPersistCities);

					this.cbLoadPersistedCitiesAtStart = new qx.ui.form.CheckBox(tr("cbLoadPersistedCitiesAtStart"));
					this.cbLoadPersistedCitiesAtStart.setValue(bos.Storage.getInstance().getLoadPersistedCitiesAtStart());
					this.cbLoadPersistedCitiesAtStart.addListener("execute", function(event) {
						bos.Storage.getInstance().setLoadPersistedCitiesAtStart(this.cbLoadPersistedCitiesAtStart.getValue());
					}, this);
					container.add(this.cbLoadPersistedCitiesAtStart);

					var btnLoadCities = new qx.ui.form.Button(tr("btnLoadCities"));
					btnLoadCities.setToolTipText("btnLoadCities_toolTip");
					btnLoadCities.setWidth(220);
					btnLoadCities.addListener("execute", this.loadPersistedCities, this);
					container.add(btnLoadCities);

					var btnDeleteAllSavedData = new qx.ui.form.Button(tr("btnDeleteAllSavedData"));
					btnDeleteAllSavedData.addListener("execute", function(event) {
						bos.Storage.getInstance().deleteAllSavedData();
						bos.Utils.handleInfo(tr("btnDeleteAllSavedData_confirmation"));
					}, this);
					container.add(btnDeleteAllSavedData);

					var btnPersistHelp = new qx.ui.form.Button(tr("help"));
					btnPersistHelp.addListener("execute", function(event) {
						var dialog = new webfrontend.gui.ConfirmationWidget();
						dialog.showGenericNotice(tr("help"), tr("persistHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");								
						a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
					}, this);
					btnPersistHelp.setWidth(60);
					container.add(btnPersistHelp);
					
					container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
					container.setLayout(new qx.ui.layout.Flow(10, 10));
					scroll.add(container);
					this.sbCustomCityTypes = new qx.ui.form.SelectBox().set({
						width: 120,
						height: 28
					});
					this.sbCustomCityTypes.setToolTipText(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
					container.add(this.sbCustomCityTypes);
					this._populateCustomCityTypes();
					
					var btnAddCustomCityType = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" :"Add");
					btnAddCustomCityType.addListener("execute", this._addCustomCityType, this);
					container.add(btnAddCustomCityType);
					
					var btnRemoveCustomCityType = new qx.ui.form.Button(locale == "de" ? "Löschen" :"Remove");
					btnRemoveCustomCityType.addListener("execute", this._removeCustomCityType, this);
					container.add(btnRemoveCustomCityType);
					
					container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Chat & gebannte Spieler" : "Chat & Banned players");
					container.setLayout(new qx.ui.layout.Flow(10, 10));
					scroll.add(container);
					
					this.sbBannedPlayers = new qx.ui.form.SelectBox().set({
						width: 120,
						height: 28
					});					
					this.sbBannedPlayers.setToolTipText(locale == "de" ? "Gebannte Spieler" : "Banned players");
					container.add(this.sbBannedPlayers);
					this._populateBannedPlayers();
					
					var btnAddBannedPlayer = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" :"Ban");
					btnAddBannedPlayer.addListener("execute", this._addBannedPlayer, this);
					container.add(btnAddBannedPlayer);
					
					var btnRemoveBannedPlayer = new qx.ui.form.Button(locale == "de" ? "Löschen" :"Remove");
					btnRemoveBannedPlayer.addListener("execute", this._removeBannedPlayer, this);
					container.add(btnRemoveBannedPlayer, {lineBreak: true});

					this.cbTweakChatAtStart = new qx.ui.form.CheckBox(locale == "de" ? "Tweak chat at start" : "Tweak chat at start");
					this.cbTweakChatAtStart.setToolTipText("When option is checked chat is tweaked at start");
					this.cbTweakChatAtStart.setValue(bos.Storage.getInstance().getTweakChatAtStart());
					this.cbTweakChatAtStart.addListener("execute", function(event) {
						bos.Storage.getInstance().setTweakChatAtStart(this.cbTweakChatAtStart.getValue());
					}, this);					
					container.add(this.cbTweakChatAtStart);					

					var btnTweakChat = new qx.ui.form.Button("Tweak chat");
					btnTweakChat.addListener("execute", function(event) {						
						bos.Tweaks.getInstance().tweakChat();
						btnTweakChat.hide();
					}, this);
					container.add(btnTweakChat);					

					container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Sonstiges" : "Other");
					container.setLayout(new qx.ui.layout.Flow(10, 10));
					scroll.add(container);
					
					this.cbTweakMarkersAtStart = new qx.ui.form.CheckBox(tr("cbTweakMarkersAtStart"));
					this.cbTweakMarkersAtStart.setToolTipText(tr("cbTweakMarkersAtStart_toolTip"));
					this.cbTweakMarkersAtStart.setValue(bos.Storage.getInstance().getTweakMarkersAtStart());
					this.cbTweakMarkersAtStart.addListener("execute", function(event) {
						bos.Storage.getInstance().setTweakMarkersAtStart(this.cbTweakMarkersAtStart.getValue());
					}, this);					
					container.add(this.cbTweakMarkersAtStart);

					this.cbTweakReportAtStart = new qx.ui.form.CheckBox(tr("cbTweakReportAtStart"));
					this.cbTweakReportAtStart.setToolTipText(tr("cbTweakReportAtStart_toolTip"));
					this.cbTweakReportAtStart.setValue(bos.Storage.getInstance().getTweakReportAtStart());
					this.cbTweakReportAtStart.addListener("execute", function(event) {
						bos.Storage.getInstance().setTweakReportAtStart(this.cbTweakReportAtStart.getValue());
					}, this);					
					container.add(this.cbTweakReportAtStart);

					var btnTweakMarkers = new qx.ui.form.Button("Tweak markers");
					btnTweakMarkers.setToolTipText(
					locale == "de" ? "Makiert Allianzmitglieder/Verbündete/Feinde mit Flaggen.<br/> Wenn du in der <b>Regionskarte<b/> bist wechsel zur <b>Stadtansicht<b/> um die Makierungen zu aktualisieren" :
					"Displays flag marker for cities of alliance members. Option isn't persisted across sessions.<br/>If you are on <b>Region map</b> you need to switch once to <b>City view</b> to refresh markers.");
					btnTweakMarkers.addListener("execute", function(event) {
						bos.Tweaks.getInstance().tweakMarkers();
					}, this);
					container.add(btnTweakMarkers);
					
					var btnTweakReports = new qx.ui.form.Button("Tweak reports");
					btnTweakReports.setToolTipText("Tweaks reports, it may not work when EA will publish next patch. That's the reason why it's not automatic like in previous versions");
					btnTweakReports.addListener("execute", function(event) {
						bos.Tweaks.getInstance().tweakReports();
					}, this);
					container.add(btnTweakReports);										
					
					this.cbSaveSummaryPosition = new qx.ui.form.CheckBox(locale == "de" ? "Speichere die Summery-Position":"Save summary position");
					this.cbSaveSummaryPosition.setToolTipText("When option is checked summary window position and size is saved every time save button is pressed");
					container.add(this.cbSaveSummaryPosition);

					var btnSave = new qx.ui.form.Button( locale == "de" ? "Speichern" : "Save");
					btnSave.addListener("execute", function(event) {
						var storage = bos.Storage.getInstance();
						if (this.cbSaveSummaryPosition.getValue()) {
							var props = this.getLayoutProperties();
							var pos = {
								left: props.left,
								top: props.top,
								width: this.getWidth(),
								height: this.getHeight()
							};
							storage.setSummaryPosition(pos);
						}
						storage.saveOptions();
					}, this);
					btnSave.setWidth(100);
					scroll.add(btnSave);

					this.tabView.add(this.optionsTab);					
				}, _addCustomCityType: function() {
					var letter = prompt(locale=="de"? "Bitte geb einen Buchstaben ein" : "Please enter one letter");
					if (letter == null || letter.length != 1) {
						return;
					}
					if (bos.CityTypes.getInstance().isReservedLetter(letter)) {
						bos.Utils.handleWarning(locale=="de"? "Dieser Buchstabe ist schon in Benutzung" : "This letter is reserved");
						return;
					}
					
					var description = prompt(locale=="de"? "Bitte gebe eine Beschreibung ein" : "Please enter description");
					if (description == null || description.length == 0) {
						return;
					}
					
					bos.Storage.getInstance().addCustomCityType(letter, description);
					
					this._populateCustomCityTypes();
					bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
				}, _removeCustomCityType: function() {
					
					var sel = this.sbCustomCityTypes.getSelection();
					if (sel == null || sel.length == 0) {
						return;
					}
					var letter = sel[0].getModel();
					
					bos.Storage.getInstance().removeCustomCityType(letter);
					
					this._populateCustomCityTypes();
					bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
				}, _populateCustomCityTypes: function() {
					var storage = bos.Storage.getInstance();
					var list = storage.getCustomCityTypes();
					this.sbCustomCityTypes.removeAll();
					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						this.sbCustomCityTypes.add(new qx.ui.form.ListItem(item.letter + " - " + item.description, null, item.letter));
					}
				}, _populateBannedPlayers: function() {
					var storage = bos.Storage.getInstance();
					var list = storage.getBannedPlayers();
					this.sbBannedPlayers.removeAll();
					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						this.sbBannedPlayers.add(new qx.ui.form.ListItem(item, null, item));
					}					
				}, _removeBannedPlayer: function() {
					var sel = this.sbBannedPlayers.getSelection();
					if (sel == null || sel.length == 0) {
						return;
					}
					var playerName = sel[0].getModel();
					
					bos.Storage.getInstance().removeBannedPlayer(playerName);
					
					this._populateBannedPlayers();					
				}, _addBannedPlayer: function() {
					var playerName = prompt(locale=="de"? "Please enter player name (case-sensitive)" : "Please enter player name (case-sensitive)");
					if (playerName == null || playerName.length == 0) {
						return;
					}
					
					bos.Storage.getInstance().addBannedPlayer(playerName);
					
					this._populateBannedPlayers();
				}, _disposeRequestResourcesProgressDialog: function() {
						if (this._requestResourcesProgressDialog != null) {
								this._requestResourcesProgressDialog.disable();
								this._requestResourcesProgressDialog.dispose();
								this._requestResourcesProgressDialog = null;
						}
				}, fetchResources: function() {
					this._disposeRequestResourcesProgressDialog();

					this._requestResourcesProgressDialog = new webfrontend.gui.ConfirmationWidget();
					this._requestResourcesProgressDialog.showInProgressBox( locale == "de" ? "Lade Ressourcen.." : "Fetching resources, please wait");
					a.getDesktop().add(this._requestResourcesProgressDialog, {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					});

					this._requestedResourceCity = webfrontend.data.City.getInstance().getId();
					this._requestedResourceType = bos.Const.WOOD;
					this._requestedResourceFetchedCities = [];
					server.cityResources = [];
					this._fetchResourcesImpl();
				}, _fetchResourcesImpl: function() {
					this._requestedResourceFetchedCities["c" + this._requestedResourceCity] = true;
					bos.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
						cityid: this._requestedResourceCity,
						resType: this._requestedResourceType,
						minResource: 0,
						maxTime: 24 * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
					}, this, this._processTradeSearchResources);
				}, _processTradeSearchResources: function(r, n) {
					if (r == false || n == null) return;

					//[{"i":7667741,"la":140698,"lt":2400,"n":"041 Wroclaw","rc":140698,"sa":0,"sg":false,"st":4800}
					//al = land capacity
					//as = sea capacity
					//i = cityId
					//n = cityName
					//rc = resources count
					//sg = sieged?
					//tl = land transport time, if < 0 then city not reachable
					//ts = sea transport time, if < 0 then city not reachable

					var resourceType = this._requestedResourceType;
					var lastUpdated = new Date();

					for (var i = 0; i < n.length; i++) {

						var c = {
							cityId: n[i].i,
							//city: n[i].n,
							timeLand: n[i].lt,								
							timeSea: n[i].st,
							seaTransportTime: n[i].st,
							landTransportTime: n[i].lt,
							sieged: n[i].sg,
							resources: [null, null, null, null, null],
							lastUpdated: lastUpdated
						};

						var prevCity = server.cityResources["c" + c.cityId];
						if (prevCity != null) {
							for (var res = 1; res <= 4; res++) {
								c.resources[res] = prevCity.resources[res];
							}
							prevCity.resources = null;
						}
						
						var resCount = n[i].rc;

						c.resources[resourceType] = {							
							count: resCount,
							amountLand: n[i].la,
							amountSea: n[i].sa
						}
						server.cityResources["c" + c.cityId] = c;

						var realCity = server.cities[c.cityId];
						if (realCity != null && realCity.resources.hasOwnProperty(resourceType)) {
							realCity.setResourceCount(resourceType, resCount);

							/*
							var diff = Math.abs(realCity.getResourceCount(resourceType) - resCount);
							if (diff > 5000) {
									//big diff means city storage has been changed
									alert("city " + realCity.getName() + " res=" + resourceType + " good: " + resCount + " bad: " + realCity.getResourceCount(resourceType));
							}
							*/
						}

					}

					if (this._requestedResourceType < 4) {
						this._requestedResourceType++;
						this._fetchResourcesImpl();
					} else {
						this._prepareNextTradeSearchResourcesBatch();
					}

				}, _prepareNextTradeSearchResourcesBatch: function() {
					var cities = webfrontend.data.Player.getInstance().cities;

					for (var key in cities) {
						var cacheKey = "c" + key;
						var resCity = server.cityResources[cacheKey];
						if (resCity == null && this._requestedResourceFetchedCities[cacheKey] == null) {
							this._requestedResourceCity = parseInt(key);
							this._requestedResourceType = bos.Const.WOOD;
							this._fetchResourcesImpl();
							return;
						}
					}

					//details about every city has been already fetched or there was some error during fetching
					server.setCityResourcesUpdateTime(new Date());
					if (this._requestedResourceRefreshView) {
						this._requestedResourceRefreshView = false;
						this.updateView();
						this._disposeRequestResourcesProgressDialog();
					}

				}, _updateRowFromResCity: function(resCity, row) {
					if (resCity.resources[1] != null) {
						row["wood"] = resCity.resources[1].count;
					}
					if (resCity.resources[2] != null) {
						row["stone"] = resCity.resources[2].count;
					}
					if (resCity.resources[3] != null) {
						row["iron"] = resCity.resources[3].count;
					}
					if (resCity.resources[4] != null) {
						row["food"] = resCity.resources[4].count;
					}
				}, _addBlankValuesToRow: function(row, tableModel) {
					//it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
					for (var col = 0; col < tableModel.getColumnCount(); col++) {
							row[tableModel.getColumnId(col)] = "";
					}

				}, createCitiesRowData: function() {
					var rowData = [];
					var cities = webfrontend.data.Player.getInstance().cities;

					var sum = [];
					this._addBlankValuesToRow(sum, this._citiesTableModel);
					this._addBlankValuesToRow(sum, this._militaryTableModel);
					this._addBlankValuesToRow(sum, this._defencesTableModel);
					sum["id"] = "Total";
					sum["name"] = "Total";
					
					var resTypes = ["wood", "stone", "iron", "food"];
					for (var i = 0; i < resTypes.length; i++) {
						var res = resTypes[i];
						sum[res] = 0;
						sum[res + "/h"] = 0;
						sum[res + "Max"] = 0;
						sum[res + "Free"] = 0;
						sum[res + "Incoming"] = 0;
					}

					sum["ts"] = 0;
					sum["gold/h"] = 0;
					sum["summary_defenders_ts"] = 0;
					
					var totalCarts = 0;
					var availableCarts = 0;
					var totalShips = 0;
					var availableShips = 0;

					for (var key in cities) {

						var c = cities[key];

						if (!this._shouldCityBeIncluded(c)) {
							continue;
						}

						var unknownValue = "";

						var row = [];
						this._addBlankValuesToRow(row, this._citiesTableModel);
						this._addBlankValuesToRow(row, this._militaryTableModel);
						this._addBlankValuesToRow(row, this._defencesTableModel);
						row["id"] = key;
						row["name"] = c.name;
						row["position"] = c.xPos + ":" + c.yPos;
						row["xPos"] = c.xPos;
						row["yPos"] = c.yPos;
						row["x"] = c.xPos;
						row["y"] = c.yPos;
						row["lastUpdated"] = "";

						row["reference"] = c.reference;

						if (server.cities[key] == undefined) {

							var resCity = server.cityResources["c" + key];
							if (resCity != null) {
								this._updateRowFromResCity(resCity, row);
							}
						} else {
							var city = server.cities[key];

							row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
							row["wood/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.WOOD));
							row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
							row["woodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.WOOD));
							row["woodFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.WOOD));
							row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
							row["stone/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.STONE));
							row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
							row["stoneIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.STONE));
							row["stoneFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.STONE));
							row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
							row["iron/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.IRON));
							row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
							row["ironIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.IRON));
							row["ironFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.IRON));
							row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));
							row["food/h"] = parseInt(city.getFoodBalance());
							row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
							row["foodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.FOOD));
							row["foodFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.FOOD));

							row["woodFree"] = row["woodMax"] - row["wood"];
							row["stoneFree"] = row["stoneMax"] - row["stone"];
							row["ironFree"] = row["ironMax"] - row["iron"];
							row["foodFree"] = row["foodMax"] - row["food"];

							row["buildQueue"] = city.buildQueueOcuppied();
							row["unitQueue"] = city.unitQueueOcuppied();

							row["lastUpdated"] = city.getLastUpdated();

							var dg = city.getTraders();
							if (dg != null) {
								row["carts"] = dg[bos.Const.TRADE_TRANSPORT_CART].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_CART].total;
								row["ships"] = dg[bos.Const.TRADE_TRANSPORT_SHIP].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_SHIP].total;

								totalCarts += dg[bos.Const.TRADE_TRANSPORT_CART].total;
								availableCarts += dg[bos.Const.TRADE_TRANSPORT_CART].count;
								totalShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].total;
								availableShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].count;
							} else {
								row["carts"] = "0/0";
								row["ships"] = "0/0";
							}

							this._addDefendersToRow(city, row, sum);
						}
						
						this._populateResources(row, key);
						
						for (var i = 0; i < resTypes.length; i++) {
							var t = resTypes[i];
							
							if (qx.lang.Type.isNumber(row[t]))
								sum[t] += row[t];
								
							t = resTypes[i] + "/h";	
							if (qx.lang.Type.isNumber(row[t]))
								sum[t] += row[t];
								
							t = resTypes[i] + "Max";	
							if (qx.lang.Type.isNumber(row[t]))
								sum[t] += row[t];
								
							t = resTypes[i] + "Free";	
							if (qx.lang.Type.isNumber(row[t]))
								sum[t] += row[t];

							t = resTypes[i] + "Incoming";	
							if (qx.lang.Type.isNumber(row[t]))
								sum[t] += row[t];
								
						}
						
						if (qx.lang.Type.isNumber(row["gold/h"])) {
							sum["gold/h"] += row["gold/h"];
						}
						
						rowData.push(row);
					}

					sum["carts"] = availableCarts + "/" + totalCarts;
					sum["ships"] = availableShips + "/" + totalShips;

					rowData.push(sum);

					server.citiesTable = rowData;

					return rowData;
				}, _populateResources: function(row, cityId) {
					if (!this.cities.hasOwnProperty(cityId)) {
						return false;
					}
					
					var st = webfrontend.data.ServerTime.getInstance();
					var serverStep = st.getServerStep();
					var stepsPerHour = st.getStepsPerHour();
											
					var c = this.cities[cityId];
					
					var resTypes = ["", "wood", "stone", "iron", "food"];
					
					var gold = Math.round(c.g * stepsPerHour);
					row["gold/h"] = gold;
					
					for (var i = 0; i < c.r.length; i++) {
						var res = c.r[i];
						var timeDiff = serverStep - res.s;
						var delta = res.d;
						var count = timeDiff * delta + res.b;
						count = Math.max(0, Math.min(count, res.m));
						
						var key = resTypes[res.i];
						row[key] = Math.floor(count);
						row[key + "/h"] = Math.round(delta * stepsPerHour);
						row[key + "Max"] = res.m;
						row[key + "Free"] = res.m - row[key];
						row[key + "Offers"] = res.o;
						row[key + "Incoming"] = res.t;
						
						if (res.i == 4) {
							var foodBallance = row[key + "/h"]
							if (foodBallance >= 0) {
								row["foodEmptyAt"] = "food positive";
							} else {
								//var n = res.s + r.b / -(foodBallance);
								var n = Math.floor(serverStep + count / -delta);
								var emptyAt;
								if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) {
									emptyAt = 0;
									row["foodEmptyAt"] = "storage empty";
								} else {												
									emptyAt = webfrontend.data.ServerTime.getInstance().getStepTime(n);	
									row["foodEmptyAt"] = parseInt((emptyAt - new Date()) / 1000);													
								}
							}																							
						}
					}
				
					return true;
				}, _addDefendersToRow: function(city, row, sum) {
						row["ts"] = 0;
						row["summary_military"] = "";
						row["unitsAtHome"] = 0;
						for (var i = 1; i <= 19; i++) {
							var unitKey = "unit_" + i;
							if (i == 18) continue;
							var unit = city.getUnitTypeInfo(i);
							row[unitKey] = unit.total;
							row["unit_def_" + i] = unit.count;
							row["unitsAtHome"] += unit.count;
							if (sum[unitKey] == null || sum[unitKey] == "") {
									sum[unitKey] = 0;
							}
							sum[unitKey] += unit.total;

							var space = unit.total * getUnitRequiredSpace(i);
							row["ts"] += space;
							sum["ts"] += space;

							if (unit.total > 0) {
								if (row["summary_military"].length > 0) {
										row["summary_military"] += ", ";
								}
								row["summary_military"] += unit.total + " " + formatUnitType(i, unit.total);
							}
						}

						if (city.getSupportOrders() != null) {
							for (var i = 0; i < city.getSupportOrders().length; i++) {
								var order = city.getSupportOrders()[i];
								if (order.state = 4 && order.units != null) {
									for (var u = 0; u < order.units.length; u++) {
											var unit = order.units[u];
											row["unit_def_" + unit.type] += unit.count;
									}
								}
							}
						}

						row["summary_defenders_ts"] = 0;
						row["summary_defenders"] = "";
						for (var i = 1; i <= 19; i++) {
							var unitKey = "unit_def_" + i;
							if (i == 18) continue;
							if (row[unitKey] != "0" && row[unitKey] != null) {
									if (row["summary_defenders"].length > 0) {
											row["summary_defenders"] += ", ";
									}
									row["summary_defenders"] += row[unitKey] + " " + formatUnitType(i, row[unitKey]);

									if (sum[unitKey] == null || sum[unitKey] == "") {
										sum[unitKey] = 0;
									}
									sum[unitKey] += row[unitKey];
									var space = row[unitKey] * getUnitRequiredSpace(i);
									row["summary_defenders_ts"] += space;
									sum["summary_defenders_ts"] += space;
							}
						}


						sum["summary_military"] = "";
						for (var i = 1; i <= 19; i++) {
								var unitKey = "unit_" + i;
								if (i == 18) continue;
								if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
										if (sum["summary_military"].length > 0) {
												sum["summary_military"] += ", ";
										}
										sum["summary_military"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
								}
						}

						sum["summary_defenders"] = "";
						for (var i = 1; i <= 19; i++) {
								var unitKey = "unit_def_" + i;
								if (i == 18) continue;
								if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
										if (sum["summary_defenders"].length > 0) {
												sum["summary_defenders"] += ", ";
										}
										sum["summary_defenders"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
								}
						}
				},
						/**
						* Context menu handler for a right-click in the boolean column.
						*
						* @param col {Integer}
						*   The number of the column in which the right click was issued.
						*
						* @param row {Integer}
						*   The number of the row in which the right click was issued
						*
						* @param table {qx.ui.table.Table}
						*   The table in which the right click was issued
						*
						* @param dataModel {qx.ui.table.model.Simple}
						*   Complete data model of the table
						*
						* @param contextMenu
						*   Menu in which buttons can be added to implement this context menu.
						*/
						_contextMenuHandlerBoolean : function(col,
																								row,
																								table,
																								dataModel,
																								contextMenu)
						{
						// Add our two choices
						var menuEntry;
						for (var i = 0; i <= 1; i++)
						{
								menuEntry = new qx.ui.menu.Button(i ? "On" : "Off");
								menuEntry.setUserData("value", i ? true : false)
								menuEntry.addListener(
								"execute",
								function(e)
								{
										// Toggle the value
										dataModel.setValue(col, row, this.getUserData("value"));
								});
								contextMenu.add(menuEntry);
						}

						return true;

				}, _forceRegionMap: function() {
					if (a.visMain.mapmode != "r") {
						var cityId = webfrontend.data.City.getInstance().getId();
						var city = webfrontend.data.Player.getInstance().cities[cityId];
						var x = city.xPos;
						var y = city.yPos;
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}	
				}, updateView: function() {
						
					var prevSortColumnIndex;
					var isSortAscending;

					if (this.tabView.isSelected(this.citiesTab)) {
						var rowData = this.createCitiesRowData();
						prevSortColumnIndex = this._citiesTableModel.getSortColumnIndex();
						isSortAscending = this._citiesTableModel.isSortAscending();
						this._citiesTableModel.setDataAsMapArray(rowData, false);
						if (prevSortColumnIndex >= 0) {
								this._citiesTableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
						}
					}

					if (this.tabView.isSelected(this.militaryTab)) {
						var rowData = this.createCitiesRowData();
						prevSortColumnIndex = this._militaryTableModel.getSortColumnIndex();
						isSortAscending = this._militaryTableModel.isSortAscending();
						this._militaryTableModel.setDataAsMapArray(rowData, false);
						if (prevSortColumnIndex >= 0) {
								this._militaryTableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
						}
					}

					if (this.tabView.isSelected(this.defencesTab)) {
						var rowData = this.createCitiesRowData();
						prevSortColumnIndex = this._defencesTableModel.getSortColumnIndex();
						isSortAscending = this._defencesTableModel.isSortAscending();
						this._defencesTableModel.setDataAsMapArray(rowData, false);
						if (prevSortColumnIndex >= 0) {
								this._defencesTableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
						}
					}

					if (this.tabView.isSelected(this.dungeonsTab)) {
						this.dungeonsTab.updateView();
					}					

					if (this.tabView.isSelected(this.regionTab)) {
						this.regionTab.updateView();
					}
					
					if (this.tabView.isSelected(this.unitOrdersTab)) {
						this.unitOrdersTab.updateView();
					}

					if (this.tabView.isSelected(this.tradeOrdersTab)) {
						this.tradeOrdersTab.updateView();
					}

					if (this.tabView.isSelected(this.tradeRoutesTab)) {
						this.tradeRoutesTab.updateView();
					}

					if (this.tabView.isSelected(this.incomingAttacksTab)) {
						this.incomingAttacksTab.updateView();
					}
					
					if (this.tabView.isSelected(this.purifyResourcesTab)) {
						this.purifyResourcesTab.updateView();
					}

					if (this.tabView.isSelected(this.massRecruitmentTab)) {
						this.massRecruitmentTab.updateView();
					}					

					if (this.tabView.isSelected(this.castlesTab)) {
						prevSortColumnIndex = this._castlesTableModel.getSortColumnIndex();
						isSortAscending = this._castlesTableModel.isSortAscending();
						this._castlesTableModel.setDataAsMapArray(this.createCastlesRowData(), false);
						if (prevSortColumnIndex >= 0) {
							this._castlesTableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
						}
					}

					if (this.btnRefreshResources != null && server.getCityResourcesUpdateTime() != null) {
						this.btnRefreshResources.setToolTipText("Resources refreshed at: " + qx.util.format.DateFormat.getDateTimeInstance().format(server.getCityResourcesUpdateTime()));
					}

					this.cbPersistCities.setValue(bos.Storage.getInstance().getPersistingCitiesEnabled());
				}
		}
});

function handleError(dp) {
	try {	
		var dq = dp.toString();
		var cx = " ";
		if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
		if (dp.getUri != null) dq += cx + dp.getUri();
		if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
		if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
		if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;

		dq = qx.util.Json.stringify(dq);

		var msg = "{error:" + dq + "}";
		alert(msg);
	} catch (e) {
		alert("Error in error handler " + e);
	}
}

function selectReports(startsWith) {
	var rep = a.title.report;

	var select = startsWith != null;

	var parts;

	if (startsWith != null) {
		parts = startsWith.split("|");
	} else {
		parts = [];
		parts.push(null);
	}

	rep.headerData.iterateCachedRows(_changeCheckState, {
		s: select,
		parts: parts
	});

	rep.headerData.fireDataEvent("dataChanged", {
		firstColumn: 0,
		lastColumn: 0,
		firstRow: 0,
		lastRow: rep.headerData.getRowCount()
	});
	rep._updateButtonState();
}

function _changeCheckState(D, E) {
	var rep = a.title.report;
	for (var key in this.parts) {
		var part = this.parts[key];
		if (part == null || part == "" || (E.s != null && E.s.indexOf(part) > 0)) {
			E.c = this.s;
			rep.headerData.setSelected(E.i, this.s);
			break;
		}
	}
}

function exportSelectedReports() {
	var rep = a.title.report;
	var ids = rep.headerData.getSelectedIds();

	if (ids.length == 0 || (ids.length == 1 && ids[0] == 0)) {
		return;
	}

	if (ids.length > 5) {
		if (locale == "de"){
			bos.Utils.handleWarning("Bitte wähle nicht mehr als 5 Berichte aus");
		}
		else{
			bos.Utils.handleWarning("Please do not select more than 5 reports");
		}

		return;
	}

	var counter = 1;
	for (key in ids) {
		var id = ids[key];
		bos.net.CommandManager.getInstance().sendCommand("GetReport", {
				id: id
		}, this, parseReport, counter);
		counter++;
	}
}

function parseReport(r, data, eh) {

	if (r == false || data == null) return;

	var date = new Date(data.h.d); 
	var header = data.h.l + " on " + qx.util.format.DateFormat.getDateTimeInstance().format(date) + ".";

	var result = new Array();
	result["short"] = header;
	result["onlyDef"] = header;
	result["csv"] = "TODO";

	if (data.a != null && data.a.length > 0) {

		var totalAtt = [];
		var totalDef = [];

		for (var i = 0; i < data.a.length; i++) {
				var army = data.a[i];

				for (var key in army.u) {
						var total = army.r == bos.Const.ORDER_ATTACK ? totalAtt : totalDef;

						var unit = army.u[key];
						var totalKey = unit.t;
						if (total[totalKey] == undefined) {
								total[totalKey] = {o: 0, l: 0, t: unit.t};
						}

						total[totalKey].o += unit.o;
						total[totalKey].l += unit.l;
				}
		}

		result["short"] += "\nAttackers: " + formatUnits(totalAtt) + ".";

		var tmp = "\nTotal Defenders: " + formatUnits(totalDef) + ".";
		result["onlyDef"] += tmp;
		result["short"] += tmp;
	}

	result["full"] = result["short"];
	if (data.rs != null && data.rs.length > 0) {
			result["full"] += "\nRes: ";
			for (var i = 0; i < data.rs.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.rs[i]);
			}
			result["full"] += ".";
	}

	if (data.r != null && data.r.length > 0) {
			result["full"] += "\nRes looted: ";
			for (var i = 0; i < data.r.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.r[i]);
			}
			result["full"] += ".";
	}

	if (data.cp != undefined && data.cpo != undefined && data.cp >= 0) {
			result["full"] += "\nPower of claim: ";
			if (data.cp > data.cpo) {
					result["full"] += "increased from " + data.cpo + "% to " + data.cp + "%";
			} else if (data.cp == data.cpo) {
					result["full"] += "stays at " + data.cp + "%";
			} else {
					result["full"] += "decreased from " + data.cpo + "% to " + data.cp + "%";
			}
	}

	if (data.b != undefined && data.b.m != undefined && data.b.n != undefined) {
			result["full"] += "\nMorale: " + Math.round(100 * (data.b.m - 1)) + "%";
			result["full"] += "\nAttack reduction: " + Math.round(100 * (data.b.n - 1)) + "%";
	}

	if (data.s != null && data.s.length > 0) {
			result["full"] += "\nBuildings: ";
			for (var i = 0; i < data.s.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatBuilding(data.s[i]);
			}
			result["full"] += ".";
	}

	showReport(result);
}

function formatResource(rs) {
		if (rs.t == bos.Const.GOLD) {
				return rs.v + " " + "gold";
		} else {
				var res = webfrontend.res.Main.getInstance();
				var resource = res.resources[rs.t];
				return rs.v + " " + resource.n.toLowerCase();
		}
}

function formatBuilding(s) {
		var res = webfrontend.res.Main.getInstance();
		var building = res.buildings[s.t];

		var res = "";
		if (s.a > 1) {
				res += s.a + " x ";
		}
		res += "lvl " + s.l + " " + building.dn.toLowerCase();
		return res;
}

function showReport(report) {
		var dialog = shareReportWindow();
		dialog.show(report);
		a.getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
}
function shareReportWindow() {
		var dialog = new webfrontend.gui.ConfirmationWidget();

		dialog.show = function(report) {

						var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
						this.dialogBackground._add(bgImg, {left: 0, top: 0});

						var la = new qx.ui.basic.Label("Exported report");
								la.setFont("font_subheadline_sidewindow");
								la.setTextColor("text-gold");
								la.setTextAlign("left");
						this.dialogBackground._add(la, {left: 17, top: 5});


						var shrStr = new qx.ui.form.TextArea(report["short"]).set({allowGrowY: true, tabIndex: 303});
						this.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
						shrStr.selectAllText();

						var shwStr = function(type) {
								shrStr.setValue(report[type]);
								shrStr.selectAllText();
						}

						var top = 175;
						var btnShort = new qx.ui.form.Button(locale == "de" ? "Kurz" : "Short").set({width: 125, appearance: "button-text-small"});
						btnShort.addListener("click", function(){shwStr("short");}, false);
						this.dialogBackground._add(btnShort, {left: 30, top: top});

						var btnOnlyDef = new qx.ui.form.Button(locale == "de" ? "Nur Verteidiger" : "Only defender").set({width: 125, appearance: "button-text-small"});
						btnOnlyDef.addListener("click", function(){shwStr("onlyDef");}, false);
						this.dialogBackground._add(btnOnlyDef, {left: 160, top: top});

						var btnFull = new qx.ui.form.Button(locale == "de" ? "Komplett" : "Full").set({width: 125, appearance: "button-text-small"});
						btnFull.addListener("click", function(){shwStr("full");}, false);
						this.dialogBackground._add(btnFull, {left: 290, top: top});


						var okButton = new qx.ui.form.Button("OK");
								okButton.setWidth(120);
								okButton.addListener("click", function(){dialog.disable();}, false);
						this.dialogBackground._add(okButton, {left: 445, top: 190});
				}
		return dialog;
}


function formatUnits(units) {
		var s = "";

		for (var key in units) {
				if (key == undefined) continue;

				var unit = units[key];

				if (unit == undefined || unit.o == undefined || unit.t == undefined || unit.l == undefined) {
						continue;
				}

				if (s != "") {
						s += ", ";
				}

				//var lost = unit.o - unit.l;
				//s += unit.o + "-" + lost + "=" + unit.l + " ";
				/* old format */
				s += unit.o + " ";
				if (unit.l != unit.o) {
						s += "(" + unit.l + ") ";
				}

				s += formatUnitType(unit.t, unit.o);
		}

		if (s == "") {
				s = "none";
		}

		return s;
}

function formatUnitType(unitType, count) {
		var res = webfrontend.res.Main.getInstance();
		var unit = res.units[unitType];
		if (unit == null) {
			return "UNKNOWN_" + unitType;
		}
		var name = unit.dn.toLowerCase();
		var locale = qx.locale.Manager.getInstance().getLocale();
		if (locale == "en") {
				if (name != null && name.length > 0 && name.charAt(name.length - 1) != 's' && count > 1) {
						name += 's';
						if (name == "crossbowmans") {
								name = "crossbowmen";
						}
				}
		} else {
				if (name != null && name.length > 0 && count > 1) {
						switch (name) {
								case "stadtwächter":
								name = "Stadtwächter";
								break;
								case "balliste":
								name = "Baliste(n)";
								break;
								case "jäger":
								name = "Jäger";
								break;
								case "pikenier":
								name = "Pikenier(e)";
								break;
								case "templer":
								name = "Templer";
								break;
								case "beserker":
								name = "Berserker";
								break;
								case "magier":
								name = "Magier";
								break;
								case "kundschafter":
								name = "Kundschafter";
								break;
								case "armbrustschütze":
								name = "Armbrustschütze(n)";
								break;
								case "paladin":
								name = "Paladin(e)";
								break;
								case "ritter":
								name = "Ritter";
								break;
								case "hexenmeister":
								name = "Hexenmeister";
								break;
								case "rammbock":
								name = "Rammböcke";
								break;
								case "katapult":
								name = "Katapult(e)";
								break;
								case "fregatte":
								name = "Fregatte(n)";
								break;
								case "schaluppe":
								name = "Schaluppe(n)";
								break;
								case "kriegsgaleone":
								name = "Kriegsgaleone(n)";
								break;
								case "baron":
								name = "Baron(e)";
								break;
						}
				}
		}
		return name;
}

function getUnitAttackType(unitId) {
	var unitId = parseInt(unitId);
	var infantry = new qx.data.Array([1, 3, 4, 5, 6, 19]);
	var cavalery = new qx.data.Array([8, 9, 10, 11]);
	var magic = new qx.data.Array([7, 12]);
	var artilery = new qx.data.Array([2, 13, 14, 15, 16, 17]);

	if (infantry.indexOf(unitId) >= 0) {
		//return "infantry";
		return 1;
	}
	if (cavalery.indexOf(unitId) >= 0) {
		//return "cavalery";
		return 2;
	}
	if (magic.indexOf(unitId) >= 0) {
		//return "magic";
		return 4;
	}
	if (artilery.indexOf(unitId) >= 0) {
		//return "artilery";
		return 3;
	}
	//return "unknown";
	bos.Utils.handleError("Unknown attack type for unit " + unitId);
	return 0;
}

function getUnitRequiredSpace(unitType) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
			return 0;
	}
	return unit.uc;
}

function human_time(val) {
	if (val <= 0)
		return "00:00:00";

	var seconds = val % 60;
	var minutes = Math.floor(val / 60) % 60;
	var hours = Math.floor(val / 3600) % 24;
	var days = Math.floor(val / 86400);

	var str = sprintf("%02d:%02d:%02d", hours, minutes, seconds);

	if (days > 0)
		str = sprintf( "%dd %s", days, str);

	return str;
}

function debug(sMsg) {
	if (DEBUG_VERSION) {
/*
	if (window.JS_log != undefined)
			window.JS_log(sMsg);
	else
	*/
			alert(sMsg);
	}
}

function dumpObject(obj) {
	debug(qx.util.Json.stringify(obj));
}

function trace(sMsg) {
	//alert(sMsg);
}

				
qx.Class.define("bos.gui.FoodCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(tr("food calculator"));
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.clientArea.add(this.createFooter());

	}, 
	members: {
		units: null,
		unitContainer: null,
		summary: null,
		sbAdd: null,
		addDefendersFromReport: false,
		lblFoodConsumption: null,
		btnClear: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}

			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(120);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);

			var result = {
				'image': img,
				'count': countInput
			};
			return result;
		}, spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var label;

			this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Einheiten zu Nahrung" : "Units to food");
			this.btnCalc.setWidth(150);
			this.btnCalc.setToolTipText(locale == "de" ? "Berechnet den Nahrungsbedarf pro Stunde der aufgelisteten Einheiten" : "Calculates the food consumtion/h for the selected units");
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateFoodConsumption, this);
			
			this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Nahrung zu Einheiten" : "Food to units");
			this.btnRevCalc.setToolTipText(locale == "de" ? "Berechnet die maximale Einheitenzahl für die eingegebene Nahrungsmenge" : "Calculates the max. unit count for the entered food");
			this.btnRevCalc.setWidth(150);
			container.add(this.btnRevCalc);
			this.btnRevCalc.addListener("click", this.calculateUnitsPerConsumption, this);					

			this.btnClear = new qx.ui.form.Button(tr("clear"));
			this.btnClear.setWidth(70);
			container.add(this.btnClear);
			this.btnClear.addListener("click", this.clearAll, this);

			label = new qx.ui.basic.Label(locale == "de" ? "Nahrungsbedarf:" : "Consumption:");
			label.setMarginLeft(20);
			container.add(label);

			this.lblFoodConsumption = new qx.ui.basic.Label("");
			container.add(this.lblFoodConsumption);

			return container;
		}, 
		onAdd: function() {

		}, 
		calculateFoodConsumption: function() {

			var res = webfrontend.res.Main.getInstance();
			var sum = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];

				var count = parseInt(inputs.count.getValue());
				if (count > 0) {
					sum += count * u.f;
				}
			}
			var perH = Math.round(sum / 24.0);
			this.lblFoodConsumption.setValue(perH + "/h");
		}, 
		calculateUnitsPerConsumption: function() {
			var s = prompt(locale == "de" ? "Bitte gebe das Nahrungseinkommen pro Stunde ein" : "Please enter food per hour");
			if (s != null && s != "") {
				var foodPerHoour = parseInt(s);
				var res = webfrontend.res.Main.getInstance();
				
				
				for (var key in this.units) {
					var u = res.units[key];
					var inputs = this.units[key];

					var count = Math.round(24.0 * foodPerHoour / u.f);
					inputs.count.setValue(count);
				}
				this.lblFoodConsumption.setValue("N/A");
			}
		}
	}
});


qx.Class.define("bos.gui.RecruitmentSpeedCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(locale == "de" ? "Rekutiergeschwindigkeits Kalkulator" : "Recruitment speed calculator");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box, {flex: true});

		this.mainContainer = new qx.ui.groupbox.GroupBox();
		this.mainContainer.setLayout(new qx.ui.layout.Grid(10, 10));
		box.add(this.mainContainer, {edge: "center"});
			
		this.config = [
			{buildingId: "15", units: ["1"], times: [50]},
			{buildingId: "16", units: ["6", "3", "4"], times: [200, 250, 300]},
			{buildingId: "36", units: ["7", "12"], times: [600, 1300]},			
			{buildingId: "17", units: ["8", "11", "9"], times: [400, 500, 600]},			
			{buildingId: "18", units: ["13", "2", "14"], times: [2500, 3500, 4000]},
			{buildingId: "19", units: ["16", "15", "17"], times: [25000, 40000, 80000]},			
			{buildingId: "37", units: ["5", "10", "19"], times: [350, 700, 60000]}			
		];
		
		for (var row = 0; row < this.config.length; row++) {
			var o = this.config[row];
			o.result = this._addRow(row + 1, o.buildingId, o.units);
		}

		this.mainContainer.setMinHeight(100);

		this.clientArea.add(this.createFooter());
		
		this.calculate();
	}, members: {
			mainContainer: null,
			sbUnitTypes: null,
			btnClear: null,
			btnCalc: null,
			btnReverseCalc: null,
			activateOverlay: function(activated) {
					//nothing
			}, clearAll: function() {
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					inputs.speed.setValue(100);
				}
				this.calculate();
				
			}, _addRow: function(row, buildingId, units) {
				var res = webfrontend.res.Main.getInstance();
				var result = new Object();
						
				var label;
			
				label = new qx.ui.basic.Label(res.buildings[buildingId].dn);
				this.mainContainer.add(label, {
					row: row, 
					column: 0
				});

				result.speed = new webfrontend.gui.SpinnerInt(100, 0, 1000000);
				result.speed.setWidth(80);
				this.mainContainer.add(result.speed, {
					row: row,
					column: 1
				});
				
				result.units = [];
				for (var i = 0; i < units.length; i++) {
					var unit = units[i];
					label = new qx.ui.basic.Label(res.units[unit].dn);
					this.mainContainer.add(label, {
						row: row, 
						column: i + 2
					});
					result.units.push(label);
				}
				
				return result;
			}, createFooter: function() {
				var box = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				var label;

				this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Berechne" :"Calculate");
				this.btnCalc.setWidth(120);
				container.add(this.btnCalc);
				this.btnCalc.addListener("click", this.calculate, this);
				
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.sbUnitTypes = new qx.ui.form.SelectBox().set({
					width: 120,
					height: 28
				});
				
				var res = webfrontend.res.Main.getInstance();
				for (var key in res.units) {
					var u = res.units[key];
					if (parseInt(key) > 19) {
						break;
					}
					this.sbUnitTypes.add(new qx.ui.form.ListItem(u.dn, null, key));					
				}	
				container.add(this.sbUnitTypes);
				
				this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Zeit zu Prozentsatz" : "Time to speed");
				this.btnRevCalc.setWidth(120);
				container.add(this.btnRevCalc);
				this.btnRevCalc.addListener("click", this.timeToSpeedCalculate, this);					

				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.btnClear = new qx.ui.form.Button(tr("clear"));
				this.btnClear.setWidth(120);
				container.add(this.btnClear);
				this.btnClear.addListener("click", this.clearAll, this);

				return box;
			}, timeToSpeedCalculate: function() {
				var reqUnitId = this.sbUnitTypes.getSelection()[0].getModel();					
				var s = prompt(locale == "de" ? "Bitte gebe die Rekrutierzeit in Sekunden an." : "Please enter recruitment time in seconds:");
				if (s != null && s != "") {
					var unitEvery = parseInt(s);
					if (unitEvery <= 0) {
						bos.Utils.handleWarning("Invalid value");
						return;
					}
					
					for (var i = 0; i < this.config.length; i++) {
						var c = this.config[i];
						var inputs = c.result;
						
						for (var j = 0; j < c.units.length; j++) {
							var unitId = c.units[j];
							if (reqUnitId == unitId) {
								
								var speed = Math.round((c.times[j] * 100) / (unitEvery + 0.4999999)) + 1;
								inputs.speed.setValue(speed)
								
								i = this.config.length;
								break;
							}
						}
					
					}						
					
					this.calculate();
				}
			}, calculate: function() {

				var res = webfrontend.res.Main.getInstance();
				
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					var speed = parseInt(inputs.speed.getValue());
					
					for (var j = 0; j < c.units.length; j++) {
						var unitId = c.units[j];
						var label = inputs.units[j];
						var unitEvery = Math.max(1, Math.round((c.times[j] * 100) / speed));
						label.setValue(res.units[unitId].dn + ": " + unitEvery + "s");
						label.setToolTipText(webfrontend.Util.getTimespanString(unitEvery));
					}
				
				}
			}
		}
});


qx.Class.define("bos.gui.CombatCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.Canvas());
		this.setWidth(790);
		
		this.setTitle(locale == "de" ? "Kampf Kalkulator" : "Combat calculator");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {
			left: 0,
			top: 2,
			right: 0,
			bottom: 2
		});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 20));
		scroll.add(box);

		this.attUnitContainer = new qx.ui.groupbox.GroupBox();
		this.attUnitContainer.setLegend(locale == "de" ? "Angreifer" : "Attacker");
		this.attUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.attUnitContainer, {row: 0, column: 0});

		this.defUnitContainer = new qx.ui.groupbox.GroupBox();
		this.defUnitContainer.setLegend(locale == "de" ? "Verteidiger" : "Defender");
		this.defUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.defUnitContainer, {row: 0, column: 1});

		this.defUnits = new Object;
		this.attUnits = new Object;

		var lblAttScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Score");
		this.attUnitContainer.add(lblAttScore, {
			left: 0,
			top: 6
		});
		this.attScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.attUnitContainer.add(this.attScore, {
			left: 40,
			top: 6
		});

		var lblDefScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Score");
		this.defUnitContainer.add(lblDefScore, {
			left: 0,
			top: 6
		});
		this.defScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.defUnitContainer.add(this.defScore, {
			left: 40,
			top: 6
		});

		var cT = 0;
		for (var key in res.units) {
			var cY = res.units[key];
			if (cY.x < 0 || cY.y < 0) continue;
			this.defUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.defUnitContainer);
			this.attUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.attUnitContainer);
			if (key == "1") {
				this.attUnits[key].count.setEditable(false);
			}
			if (cY.y > cT) cT = cY.y;
		}
		this.defUnitContainer.setMinHeight((cT + 1) * 31);
		this.attUnitContainer.setMinHeight((cT + 1) * 31);		

		box.add(this.createDefences(), {row: 0, column: 2});
		
		var rightColumn = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
		box.add(rightColumn, {row: 0, column: 3});
		
		rightColumn.add(this.createSummary());
		rightColumn.add(this.createFooter());		
/*
		this.clientArea.add(this.createFooter(), {
			bottom: 0,
			left: 0,
			right: 250
		});
*/

/*
		this.clientArea.add(this.createSummary(), {
			bottom: 0,
			left: 450,
			right: 0
		});
		*/

	}, members: {
		defUnits: null,
		defUnitContainer: null,
		attUnits: null,
		attUnitContainer: null,
		defences: null,
		summary: null,
		sbAdd: null,
		hourInput: null,
		minuteInput: null,
		addDefendersFromReport: false,
		btnSubstractLosses: null,
		sbCombatType: null,
		btnClearAll: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing to do
		}, createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Actions");
			//container.setHeight(120);
			container.setLayout(new qx.ui.layout.VBox(5));
			
			var typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);			
			
			this.hourInput = new webfrontend.gui.SpinnerInt(0, 0, 23);
			this.hourInput.setValue(10);
			this.hourInput.setWidth(40);
			typeContainer.add(this.hourInput);

			var separatorLabel = new qx.ui.basic.Label(":");
			typeContainer.add(separatorLabel);

			this.minuteInput = new webfrontend.gui.SpinnerInt(0, 0, 59);
			this.minuteInput.setValue(0);
			this.minuteInput.setWidth(40);
			typeContainer.add(this.minuteInput);

			this.sbCombatType = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});
			if (locale == "de") {
				this.sbCombatType.add(new qx.ui.form.ListItem("Überfall", null, "Assault"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Belagerung", null, "Siege"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plünderung", null, "Plunder"));
			} else {
				this.sbCombatType.add(new qx.ui.form.ListItem("Assault", null, "Assault"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Siege", null, "Siege"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plunder", null, "Plunder"));
			}

			container.add(this.sbCombatType, {
				row: 1,
				column: 0
			});

			this.btnCalc = new qx.ui.form.Button("Calc");
			this.btnCalc.setWidth(50);
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateLosses, this);
			
			this.btnClearAll = new qx.ui.form.Button(locale == "de" ? "Alles Löschen" : "Clear All");
			this.btnClearAll.setWidth(90);
			container.add(this.btnClearAll);
			this.btnClearAll.addListener("click", this.clearAll, this);
			
			this.btnSubstractLosses = new qx.ui.form.Button(locale == "de" ? "Substract losses" : "Substract losses");
			this.btnSubstractLosses.setWidth(90);
			container.add(this.btnSubstractLosses);
			this.btnSubstractLosses.addListener("click", this.substractLosses, this);			
			
			typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);
			this.sbAdd = new qx.ui.form.SelectBox().set({
				width: 160,
				height: 28
			});
			if (locale == "de") {
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger & Verteidigung", null, "Defenders & Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger", null, "Defenders"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidigung", null, "Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Angreifer", null, "Attackers"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Alle", null, "Scout Report: All"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Verteidigung", null, "Scout Report: Defences"));
			} else {
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders & Defences", null, "Defenders & Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders", null, "Defenders"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defences", null, "Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Attackers", null, "Attackers"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: All", null, "Scout Report: All"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: Defences", null, "Scout Report: Defences"));
			}

			typeContainer.add(this.sbAdd);

			this.btnAdd = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" : "Add");
			this.btnAdd.setWidth(50);
			typeContainer.add(this.btnAdd);
			this.btnAdd.addListener("execute", this.onAdd, this);

			return container;
		}, onAdd: function() {
			var add = this.sbAdd.getSelection()[0].getModel();
			if (add == "Attackers") {
				this.addAttackers();
			} else if (add == "Defences") {
				this.addDefences();
			} else if (add == "Defenders") {
				this.addDefenders();
			} else if (add == "Defenders & Defences") {
				this.addDefences();
				this.addDefenders();
			} else if (add == "Scout Report: All") {
				this.addReport(true);
			} else if (add == "Scout Report: Defences") {
				this.addReport(false);
			}

		}, calculateLosses: function() {
			var attStrength = this.calculateAttackStrength(this.attUnits, this.defences);
			var defStrength = this.calculateDefenceStrength(this.defUnits, this.defences);

			//dumpObject(attStrength);
			//dumpObject(defStrength);

			var str;

			var attackerForcesTypes = 0;
			var totalAttackerStrength = 0;

			str = 0;
			if (attStrength[1] != null) {
				str = attStrength[1].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[1].setValue(str);

			str = 0;
			if (attStrength[2] != null) {
				str = attStrength[2].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[2].setValue(str);

			str = 0;
			if (attStrength[3] != null) {
				str = attStrength[3].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[3].setValue(str);

			str = 0;
			if (attStrength[4] != null) {
				str = attStrength[4].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[4].setValue(str);

			str = 0;
			if (defStrength[1] != null) {
				str = defStrength[1].strength;
			}
			this.summary.def[1].setValue(str);

			str = 0;
			if (defStrength[2] != null) {
				str = defStrength[2].strength;
			}
			this.summary.def[2].setValue(str);

			str = 0;
			if (defStrength[3] != null) {
				str = defStrength[3].strength;
			}
			this.summary.def[3].setValue(str);

			str = 0;
			if (defStrength[4] != null) {
				str = defStrength[4].strength;
			}
			this.summary.def[4].setValue(str);

			this.clearLosses(this.defUnits);
			this.clearLosses(this.attUnits);

			
			//Mixed attacks are resolved as single type attacks where defensing forces are divided as proportions of attack strength. 
			//Example attacker: 100 zerks and 100 mages. Total attack is 12000. 
			//Defender is divided 41,7% (50*100/12000) against zerks and 58,3% (70*100/12000) against mages.
			var totalDefenderStrength = 0;
			for (var i = 1; i <= 4; i++) {
				
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					
					var def = defStrength[i].strength * attackPart;
					//alert(def + " = " + defStrength[i].strength + " * " + attackPart);
					totalDefenderStrength += def;
				}
			}
			
			//alert("totalAttackerStrength: " + totalAttackerStrength);
			//alert("totalDefenderStrength: " + totalDefenderStrength);
			
			for (var i = 1; i <= 4; i++) {
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					var defAgainstThatGroup = defStrength[i].strength * attackPart;
					var attackerLosses = (defAgainstThatGroup / totalAttackerStrength) * this.getAttackerMultiplier();
					
					this.applyAttackerLosses(i, attackerLosses);
				}
			}
			
			if (totalDefenderStrength > 0) {
				var defenderLosses = (totalAttackerStrength / totalDefenderStrength) * this.getDefenderMultiplier();
				this.applyDefenderLosses(0, defenderLosses);
			}


		}, clearLosses: function(units) {

			for (var key in units) {
				var inputs = units[key];
				inputs.losses.setValue("");
			}

		}, getAttackerMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Assault") {
				return 0.5;
			} else if (mode == "Siege") {
				return 0.1;
			} else if (mode == "Plunder") {
				return 0.1;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, getDefenderMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Assault") {
				return 0.5;
			} else if (mode == "Siege") {
				return 0.1;
			} else if (mode == "Plunder") {
				return 0.02;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, substractLosses: function() {
			this._substractLossesImpl(this.attUnits);
			this._substractLossesImpl(this.defUnits);

			var hour = parseInt(this.hourInput.getValue());
			hour++;
			if (hour >= 24) {
				hour = 0;
			}
			this.hourInput.setValue(hour);
		}, _substractLossesImpl: function(units) {
			for (var key in units) {				
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());				

				var s = inputs.losses.getValue();
				if (s != null && s != "") {
					inputs.losses.setValue("");
					var lost = parseInt(s);
					if (qx.lang.Type.isNumber(lost) && !isNaN(lost)) {
						count = Math.max(0, count - lost);
						inputs.count.setValue(count);
					}
				}
			}
		}, applyAttackerLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.attUnits) {
				var unit = res.units[key];
				var inputs = this.attUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0 || attackType != type) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);

			}

		}, applyDefenderLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.defUnits) {
				var unit = res.units[key];
				var inputs = this.defUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);
			}
		}, calculateAttackStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];
			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				if (result[attackType] == null) {
					result[attackType] = {count: 0, strength: 0, neutralized: 0};
				}
				result[attackType].count += count;
			}

			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				var r = result[attackType];
				var trapId = this.getTrapAgainst(attackType);

				var maxNeutralized = 0;
				if (defences[trapId] != null) {
					maxNeutralized = parseInt(defences[trapId].count.getValue());
				}

				maxNeutralized -= r.neutralized;

				if (maxNeutralized > 0) {
					maxNeutralized = Math.min(maxNeutralized, parseInt(r.count / 2) - r.neutralized);
					if (count <= maxNeutralized) {
						r.neutralized += count;
						count = 0;
					} else {
						r.neutralized += maxNeutralized;
						count -= maxNeutralized;
					}
				}

				var attack = unit.av * count;
				r.strength += attack;
			}

			var hour = parseInt(this.hourInput.getValue());
			var minute = parseInt(this.minuteInput.getValue());
			var attackReduction = this.calculateAttackReduction(hour, minute);
			this.summary.attackReduction.setValue(attackReduction + "%");

			if (attackReduction != 0) {
				for (var attackType in result) {
					var attack = result[attackType];
					attack.strength = Math.round(attack.strength * (1 + attackReduction / 100.0));
				}
			}
			return result;
		}, calculateDefenceStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];

			var totalBoosted = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "8": 0};

			for (var key in units) {
				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}
					result[u].count += count;
					//var defValue = unit.def[u];
					//result[u].strength += defValue * count;
				}
			}

			var cityWallsLevel = parseInt(defences[23].count.getValue());

			for (var key in units) {

				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = 0;
				var towerId = this.getTowerFor(key);

				if (towerId >= 0) {
					var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];
					if (maxBoosted >= count) {
						boosted = count;
						count = 0;
					} else {
						boosted = maxBoosted;
						count -= boosted;
					}

					totalBoosted[key] += boosted;
				}

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}
			}

			//dumpObject(totalBoosted);

			for (var key in units) {

				if (key != "1")
				continue;

				var unit = res.units[key];

				var boostableGuards = 0;
				for (var b in totalBoosted) {

					var towerId = this.getTowerFor(b);
					if (towerId > 0) {
						var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];

						var guardsPerUnit = this.getAffectedGuardsPerUnit(towerId);

						boostableGuards += guardsPerUnit * maxBoosted;
					}
				}

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = Math.min(boostableGuards, count);
				count -= boosted;

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}

			}

			var moraleBoost = this.calculateMoraleBoost();
			if (moraleBoost > 0) {
				var factor = (1 + moraleBoost / 100.0);
				for (var u in result) {
					result[u].strength = parseInt(result[u].strength * factor);
				}
			}

			this.summary.moraleBonus.setValue("+" + moraleBoost.toString() + "%");

			return result;
		}, calculateAttackReduction: function(hour, minute) {
			/* some test data:
				22:00:01 -0
				22:10:00 -3
				22:20:00 -7
				22:26:35 -9%
				22:27:53 -9%
				22:30    -10
				22:40    -13
				22:50    -17
				23:00    -20
				23:10    -23
				23:20:27 -27%
				23:26:35 -29
				23:27:53 -29
				23:30    -30
				23:40    -33
				23:50    -37
				00:26:35 -40
				07:27:52 -40
				08:26:35 -31
				09:26:35 -11
				*/
			if (hour >= 10 && hour <= 21) {
				return 0;
			}
			if (hour >= 0 && hour <= 7) {
				return -40;
			}
			var m = hour * 60 + minute;
			if (hour >= 22) {
				var result = (-1.0/3.0) * m + 440;
				return Math.round(result);
			}
			if (hour >= 8) {
				var result = (1.0/3.0) * m - 200;
				return Math.round(result);
			}
			bos.Utils.handleError("It shouldn't happend " + hour + ":" + minute);
			return 0;
		}, calculateMoraleBoost: function() {
			var a = parseInt(this.attScore.getValue());
			var d = parseInt(this.defScore.getValue());

			if (a == 0 || d == 0) {
				return 0;
			}

			var factor = a / d;
			if (factor <= 4) {
				return 0;
			}

			if (factor >= 40) {
				return 300;
			}

			if (factor < 10) {
				var y = (100 / 6) * factor - 200 / 3;
				return parseInt(y);
			}

			var y = 10 * factor;
			return parseInt(y);

		}, getCityWallsBonus: function(level) {
			var bonusses = [0, 0.01, 0.03, 0.06, 0.1, 0.15, 0.2, 0.26, 0.33, 0.41, 0.5];
			if (bonusses[level] != null) {
				return bonusses[level];
			} else {
				return 0;
			}
		}, isNavalUnit: function(unitType) {
			var t = parseInt(unitType);
			if (t >= 15 && t <= 17) {
				return true;
			} else {
				return false;
			}
		}, addReport: function(addDefenders) {

			var rep = a.title.report;
			if (rep == null) {
				if (locale == "de"){
					bos.Utils.handleWarning("Der Reportframe ist nicht geöffnet, bitte klicke auf den Report-Button");
				} else {
					bos.Utils.handleWarning("Cannot find reports widget, please click Reports button");
				}
				return;
			}

			var rep = a.title.report;
			var ids = rep.headerData.getSelectedIds();

			if (ids.length == 0 || (ids.length == 1 && ids[0] == 0) || ids.length != 1) {
				if (locale == "de"){
					bos.Utils.handleWarning("Bitte markiere einen Spionage Report");
				} else {
					bos.Utils.handleWarning("Please select one scout report");
				}

				return;
			}

			this.addDefendersFromReport = addDefenders;
			var counter = 1;
			for (key in ids) {
				var id = ids[key];
				bos.net.CommandManager.getInstance().sendCommand("GetReport", {
					id: id
				}, this, this.parseReport, counter);
				counter++;
			}

		}, parseReport: function(r, data, eh) {

			if (r == false || data == null) return;

			this.clear(this.defences);

			if (this.addDefendersFromReport) {
				this.clear(this.defUnits);
			}

			if (data.a != null && data.a.length > 0 && this.addDefendersFromReport) {

				var totalDef = new Array();

				for (var i = 0; i < data.a.length; i++) {
					var def = data.a[i];
					if (def.r == bos.Const.ORDER_ATTACK) {
						continue;
					}

					for (var key in def.u) {

						var unit = def.u[key];
						if (totalDef[unit.t] == undefined) {
							totalDef[unit.t] = {o: 0, l: 0, t: unit.t};
						}

						totalDef[unit.t].o += unit.o;
						totalDef[unit.t].l += unit.l;
					}

				}

				for (var i = 1; i <= 19; i++) {
					if (i == 18) continue;
					var inputs = this.defUnits[i];

					if (totalDef[i] != null) {
						var unit = totalDef[i];
						inputs.count.setValue(unit.l);
					}
				}

			}

			if (data.s != null && data.s.length > 0) {
				for (var i = 0; i < data.s.length; i++) {
					var building = data.s[i];

					var bt = parseInt(building.t);
					if (this.defences[bt] != null) {
						//dumpObject(building);
						if (bt == 23) {
							//walls
							this.defences[bt].count.setValue(building.l);
						} else {
							//tower
							var count = parseInt(this.defences[bt].count.getValue());


							var affected = this._getAffectedTroops(bt, parseInt(building.l));

							this.defences[bt].count.setValue(count + parseInt(building.a) * affected.affected);
						}
					}
				}
			}

		}, clearAll: function() {
			this.clear(this.defences);
			this.clear(this.defUnits);
			this.clear(this.attUnits);
		}, clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
				if (inputs.losses) {
					inputs.losses.setValue("");
				}
			}

		}, addDefenders: function() {
			var city = webfrontend.data.City.getInstance();
			for (var i = 1; i <= 19; i++) {
				if (i == 18) continue;
				var inputs = this.defUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.count);
			}

			if (city.getSupportOrders() != null) {
				for (var i = 0; i < city.getSupportOrders().length; i++) {
					var order = city.getSupportOrders()[i];
					if (order.state = 4 && order.units != null) {
						for (var u = 0; u < order.units.length; u++) {
							var unit = order.units[u];
							var inputs = this.defUnits[unit.type];
							var current = parseInt(inputs.count.getValue());
							inputs.count.setValue(current + unit.count);
						}
					}
				}
			}
		}, addAttackers: function() {
			var city = webfrontend.data.City.getInstance();
			for (var i = 2; i <= 19; i++) {
				if (i == 18) continue;
				//var unitKey = "unit_" + i;
				var inputs = this.attUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.total);
				inputs.losses.setValue("");
			}

		}, addDefences: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			for (var key in this.defences) {
				this.defences[key].count.setValue(0);
			}

			var affectedTroops = {};

			if (buildings.length == 0) {
				if (locale == "de"){
					bos.Utils.handleWarning("Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!");
				} else {
					bos.Utils.handleWarning("You need to be in city to fetch it's defences!");
				}
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if ((bType >= 38 && bType <= 46)) {
					var count = parseInt(this.defences[bType].count.getValue());

					var affected = this.getAffectedTroops(b);

					this.defences[bType].count.setValue(count + affected.affected);
				}

			}

			this.defences[23].count.setValue(city.getWallLevel());

		}, getTowerFor: function(unitType) {
			var t = parseInt(unitType);
			if (t == 2) {
				return 39;
			} else if (t == 3) {
				return 41;
			} else if (t == 4) {
				return 40;
			} else if (t == 5) {
				return 42;
			} else if (t == 8) {
				return 38;
			}
			return -1;
		}, _getAffectedTroops: function(type, level) {
			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap
			var stats = [];
			//0 index = guards multiplier
			stats[38] = [2, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[39] = [10, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[40] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[41] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[42] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[43] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[44] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[45] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[46] = [0, 20, 30, 50, 100, 160, 240, 350, 500, 700, 1000]

			var result = {affected: 0, guards: 0};

			var bType = parseInt(type);

			if (stats[bType] != null) {
				result.affected = stats[bType][level];
				result.guards = result.affected * stats[bType][0];
			}

			return result;

		}, getAffectedTroops: function(b) {
			return this._getAffectedTroops(b.getType(), b.getLevel());
		}, getAffectedGuardsPerUnit: function(towerId) {
			var id = parseInt(towerId);
			switch (id) {
			case 38: return 2;
			case 39: return 10;
			case 40: return 1;
			case 41: return 1;
			case 42: return 1;
			default:
				return 0;
			}
		}, getTrapAgainst: function(attackType) {
			if (attackType == 1) {
				return 43;
			} else if (attackType == 2) {
				return 44;
			} else if (attackType == 3) {
				return 45;
			} else if (attackType == 4) {
				return 46;
			} else {
				bos.Utils.handleError("Unknown attackType: " + attackType);
				return 0;
			}
		}, createSummary: function() {

			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Summary");
			container.setLayout(new qx.ui.layout.Grid(5, 5));

			this.summary = {att: [], def: [], attackReduction: 0, moraleBonus: 0};
			var label;

			var att = new qx.ui.basic.Label(tr("attacker"));
			container.add(att, {
				row: 0,
				column: 1
			});

			var def = new qx.ui.basic.Label(tr("defender"));
			container.add(def, {
				row: 0,
				column: 2
			});

			var inf = new qx.ui.basic.Label("Inf.");
			container.add(inf, {
				row: 1,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 1
			});
			this.summary.att[1] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 2
			});
			this.summary.def[1] = label;

			var cav = new qx.ui.basic.Label(locale == "de" ? "Kavallerie" : "Cavalry");
			container.add(cav, {
				row: 2,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 1
			});
			this.summary.att[2] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 2
			});
			this.summary.def[2] = label;

			var mag = new qx.ui.basic.Label(locale == "de" ? "Magie" : "Magic");
			container.add(mag, {
				row: 3,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 1
			});
			this.summary.att[4] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 2
			});
			this.summary.def[4] = label;

			var siege = new qx.ui.basic.Label(locale == "de" ? "Artilery" : "Siege");
			container.add(siege, {
				row: 4,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 1
			});
			this.summary.att[3] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 2
			});
			this.summary.def[3] = label;

			var siege = new qx.ui.basic.Label("Modifier");
			container.add(siege, {
				row: 5,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Angriffsverringerung  durch den Nachtschutz" : "Night protection attack reduction");
			container.add(label, {
				row: 5,
				column: 1
			});
			this.summary.attackReduction = label;

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Maloral Bonus" : "Morale bonus");
			container.add(label, {
				row: 5,
				column: 2
			});
			this.summary.moraleBonus = label;

			return container;
		}, createDefences: function() {
			var walls = new qx.ui.groupbox.GroupBox();
			walls.setLegend(locale == "de" ? "Verteidigung (des Verteidigers)" : "Defences (affected)");
			walls.setLayout(new qx.ui.layout.Basic());

			this.defences = new Object();

			var x = 0;
			var y = 0;
			var margin = 36;

			var res = webfrontend.res.Main.getInstance();

			var building = res.buildings[23];
			this.defences[23] = this.createBuildingSlot(x, y, building, walls, 10);
			y += margin;

			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap

			for (var i = 38; i <= 46; i++) {
				var building = res.buildings[i];
				this.defences[i] = this.createBuildingSlot(x, y, building, walls, 48000);
				y += margin;
			}

			return walls;
		}, createBuildingSlot: function(x, y, building, container, max) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (building.mimg >= 0) {
				var fi = res.getFileInfo(building.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(32);
				img.setHeight(32);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(building.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x + 8 - 4,
					top: y + 6
				});
			}
			var countInput = new webfrontend.gui.SpinnerInt(0, 0, max);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 50 - 4,
				top: y + 10
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var result = {
				image: img,
				count: countInput
			};
			//countInput.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);

			return result;
		}, createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(22);
				img.setHeight(22);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 40,
				top: y + 4
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var losses = new qx.ui.basic.Label("");
			container.add(losses, {
				left: x + 40 + 75,
				top: y + 4
			});

			var result = {
				'image': img,
				'count': countInput,
				'losses': losses
			};
			//cj.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);
			//cn.addListener("click", this._onMax, cq);
			return result;
		}, spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, clearSelections: function() {
			for (var bG in this.units) {
				this.units[bG].buildCount.setValue(0);
			}
		}
	}
});

function jumpCoordsDialog() {
	var wdg = new webfrontend.gui.ConfirmationWidget();
		wdg.askCoords = function() {
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_castle_warning.gif");
			this.dialogBackground._add(bgImg, {left: 0, top: 0});

			var f20 = new qx.bom.Font(20);
			var f25 = new qx.bom.Font(25);

			var la = new qx.ui.basic.Label("Coordinates");
			la.setFont("font_subheadline_sidewindow");
			la.setTextColor("text-gold");
			la.setTextAlign("left");
			this.dialogBackground._add(la, {left: 17, top: 5});

			var lb = new qx.ui.basic.Label(locale == "de" ? "Gebe die Koordinaten in das Textfeld ein" : "Insert target coords into text field.");

			lb.setFont(f20);
			this.dialogBackground._add(lb, {left: 275, top: 65});

			var lc = new qx.ui.basic.Label(locale == "de" ? "Koordinaten(0-699) müssen mit einem Doppelpunkt getrennt werden! <br />Beispiel: 432:231 " : "Values (0-699) should be separated by a colon<br />Example: 432:231");
			lc.setRich(true);
			lc.setTextAlign("center");
			this.dialogBackground._add(lc, {left: 305, top: 90});

			var crds = new qx.ui.form.TextField("").set({width: 120, maxLength: 7, font: f25});
					crds.setTextAlign("center");
			this.dialogBackground._add(crds, {left: 360, top: 137});

			var ok = new qx.ui.form.Button("OK").set({width: 120});
			ok.addListener("click", function(){
				crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				var x = parseInt(RegExp.$1);
				var y = parseInt(RegExp.$2);

				a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				wdg.disable();
			}, true);
			ok.setEnabled(false);
			this.dialogBackground._add(ok, {left: 295, top: 205});

			var c = new qx.ui.form.Button("Cancel").set({width: 120});
			c.addListener("click", function(){a.allowHotKey = true; wdg.disable();}, true);
			this.dialogBackground._add(c, {left: 445, top: 205});

			var validateCoords = function() {
				tfc = crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				if (tfc == null) {
						ok.setEnabled(false);
						return;
				}
				if (!/[^\d]/.test(tfc[1]) && !/[^\d]/.test(tfc[2])) {
						if (tfc[1] >= 0 && tfc[1] <= 699 && tfc[2] >= 0 && tfc[2] <= 699) {
								ok.setEnabled(true);
						} else {
								ok.setEnabled(false);
						}
				}
			}
			crds.addListener("input", validateCoords, false);
			crds.focus();
		}
	return wdg;
}

qx.Class.define("bos.ui.table.cellrenderer.Default", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.TABLE_DEFAULT_COLOR;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		
	}, members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			} else if (qx.lang.Type.isNumber(id) && id < 0) {
				style["border-bottom"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});				
				
qx.Class.define("bos.ui.table.cellrenderer.HumanTime", {
	extend: bos.ui.table.cellrenderer.Default,
	construct: function(mode){
		this.base(arguments);
		this._mode = mode || 0;
	}, members: {
		_mode: 0,
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
					cellInfo.value = "";
			} else if (value instanceof Date) {
					var diff = new Date() - value;
					cellInfo.value = human_time(Math.floor(diff / 1000));
			} else if (qx.lang.Type.isNumber(cellInfo.value)) {
					cellInfo.value = human_time(cellInfo.value);
			}
			return qx.bom.String.escape(this._formatValue(cellInfo));
		}, _getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();
			var value = cellInfo.value;
			var color = bos.Const.TABLE_DEFAULT_COLOR;
			
			var seconds = -1;
			if (value instanceof Date) {
				var diff = new Date() - value;
				seconds = Math.floor(diff / 1000);
			} else if (qx.lang.Type.isNumber(value)) {
				seconds = (value);
			} else if (qx.lang.Type.isString(value)) {
				color = bos.Const.RESOURCE_GREEN;
			}
			
			if (seconds >= 0) {					
				if (this._mode == 1) {
					//food
					if (seconds >= 3600 * 24 * 2) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 3600 * 12) {
						color = bos.Const.RESOURCE_YELLOW;
					} else {
						color = bos.Const.RESOURCE_RED;
					}					
				} else if (this._mode == 0) {
					//build queue, unit queue
					if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 0) {
						color = bos.Const.RESOURCE_YELLOW;
					} else if (seconds <= 0) {
						color = bos.Const.RESOURCE_RED;
					}
				} else if (this._mode == 2) {
					//last visited
					if (seconds >= 3600 * 24 * 3) {
						color = bos.Const.RESOURCE_RED;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_YELLOW;						
					} else if (seconds > 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;
					} else {
						color = bos.Const.RESOURCE_GREEN;
					}						
				}					
			}
			
			var border = bos.Const.TABLE_BORDER;
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				border = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}
			
			return "color: " + color + ";" + "border-top:" + border;
		}
	}
});

qx.Class.define("bos.ui.table.cellrenderer.ClickableLook", {
	extend: bos.ui.table.cellrenderer.Default,
	members: {			
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else {
				cellInfo.value = this.clickableLook(cellInfo.value);
			}
			return this._formatValue(cellInfo);
		}, clickableLook: function(s) {
			//return "<div style=\"cursor: pointer; color: rgb(45, 83, 149);\">" + s + "</div>";
			return bos.Utils.makeClickable(s, "#81adff");
		}/*, // overridden
		_getCellClass : function(cellInfo) {
		  return "qooxdoo-table-cell";
		}*/
	}
});

qx.Class.define("bos.ui.table.cellrenderer.Resource", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight, maxColumn, freeColumn, warningLevel, errorLevel){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.RESOURCE_GREEN;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		this._maxColumn = maxColumn;
		this._freeColumn = freeColumn;
		this._warningLevel = warningLevel;
		this._errorLevel = errorLevel;
	}, members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,
		_maxColumn: null,
		_freeColumn: null,
		_warningLevel: null,
		_errorLevel: null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};

			var maxValue = tableModel.getValueById(this._maxColumn, cellInfo.row);
			var freeValue = tableModel.getValueById(this._freeColumn, cellInfo.row);

			if (freeValue != null && maxValue != null && maxValue > 0) {
				if (freeValue <= 0) {
					style["color"] = bos.Const.RESOURCE_RED;
				} else {
					var mod = freeValue / maxValue;
					if (mod < 0.2) {
						style["color"] = bos.Const.RESOURCE_YELLOW;
					}
				}
			}
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}			

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});


qx.Class.define("bos.vis.Building", {
    extend: webfrontend.vis.Entity,
    construct: function(visMain, x, y, text) {
      webfrontend.vis.Entity.call(this);
      //this.objId = e;  
	  var m = webfrontend.config.Config.getInstance().getImagePath("ui/building_level_display_bgr.png");
	  this.drawNode = new webfrontend.draw.BackgroundTextNode(visMain.scene, x, y, 24, 24, m, text);  
      this.drawNode.setSortOrder(webfrontend.draw.Node.sortType_UI);
    }, destruct: function() {
      if (this.drawNode) {
        this.drawNode.release();
        this.drawNode = null;
      }
      if (this.selectNode) {
        this.selectNode.release();
        this.selectNode = null;
      }
    }, members: {
      drawNode: null,
      selectNode: null,
      objId: null,
      update: function(c) {
	  /*
        if (c.hasOwnProperty("v")) this.drawNode.setImage(webfrontend.config.Config.getInstance().getImagePath(webfrontend.res.Main.CityProps[c.v].image));
		*/
      }, getToolTipText: function() {
        //return webfrontend.res.Main.getInstance().cityprops[this.objId].tt;
		return "TT TODO";
      }
    }
  });


//------------------------------------------------------------------------------------------------------------
//taken from http://userscripts.org/topics/41177
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {
		GM_addStyle = function(css) {
				var style = document.createElement('style');
				style.textContent = css;
				document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
				localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
				var value = localStorage.getItem(name);
				if (!value)
						return defaultValue;
				var type = value[0];
				value = value.substring(1);
				switch (type) {
						case 'b':
								return value == 'true';
						case 'n':
								return Number(value);
						default:
								return value;
				}
		}

		GM_log = function(message) {
				console.log(message);
		}

		GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
				value = (typeof value)[0] + value;
				localStorage.setItem(name, value);
		}
}

				/**
sprintf() for JavaScript 0.5

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
	* Redistributions of source code must retain the above copyright
	notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright
	notice, this list of conditions and the following disclaimer in the
	documentation and/or other materials provided with the distribution.
	* Neither the name of sprintf() for JavaScript nor the
	names of its contributors may be used to endorse or promote products
	derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2007.04.03 - 0.1:
- initial release
2007.09.11 - 0.2:
- feature: added argument swapping
2007.09.17 - 0.3:
- bug fix: no longer throws exception on empty paramenters (Hans Pufal)
2007.10.21 - 0.4:
- unit test and patch (David Baird)
2010.05.09 - 0.5:
- bug fix: 0 is now preceeded with a + sign
- bug fix: the sign was not at the right position on padded results (Kamal Abdali)
- switched from GPL to BSD license
**/

function str_repeat(i, m) {
	for (var o = []; m > 0; o[--m] = i);
	return(o.join(""));
}

function sprintf() {
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while (f) {
		if (m = /^[^\x25]+/.exec(f)) {
				o.push(m[0]);
		}
		else if (m = /^\x25{2}/.exec(f)) {
				o.push("%");
		}
		else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
				if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
						throw("Too few arguments.");
				}
				if (/[^s]/.test(m[7]) && (typeof(a) != "number")) {
						throw("Expecting number but found " + typeof(a));
				}
				switch (m[7]) {
						case 'b': a = a.toString(2); break;
						case 'c': a = String.fromCharCode(a); break;
						case 'd': a = parseInt(a); break;
						case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
						case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
						case 'o': a = a.toString(8); break;
						case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
						case 'u': a = Math.abs(a); break;
						case 'x': a = a.toString(16); break;
						case 'X': a = a.toString(16).toUpperCase(); break;
				}
				if (/[def]/.test(m[7])) {
						s = (a >= 0 ? (m[2] ? '+' : '') : '-');
						a = Math.abs(a);
				}
				c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
				x = m[5] - String(a).length - s.length;
				p = m[5] ? str_repeat(c, x) : '';
				o.push(s + (m[4] ? a + p : p + a));
		}
		else {
				throw("Huh ?!");
		}
		f = f.substring(m[0].length);
	}
	return o.join("");
}

//---------------------- END OF INJECTED PART -----------------------------------
};

	GM_log("Injecting LoU BoS script");

	window.JS_log = GM_log;

	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);

		
})();
