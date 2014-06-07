// ==UserScript==
// @name           AntiGame_lang_tw
// @namespace      antikiller
// @description    AntiGame 繁體中文語言 (此 Script 的順序必須位於 AntiGame 之前)
// @version	1.23.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsTW =
	{
		lbl_missAttack: '攻擊',
		lbl_missColony: '殖民',
		lbl_missDeploy: '部署',
		lbl_missDestroy: '摧毀月球',
		lbl_missEspionage: '間諜偵察',
		lbl_missExpedition: '遠征探險',
		lbl_missFederation: 'ACS聯合攻擊',
		lbl_missHarvest: '回收廢墟',
		lbl_missHold: 'ACS聯合防禦',
		lbl_missTransport: '運輸',
		
		lbl_shipSCargo: '小型運輸艦',
		lbl_shipLCargo: '大型運輸艦',
		lbl_shipLFighter: '輕型戰鬥機',
		lbl_shipHFighter: '重型戰鬥機',
		lbl_shipCruiser: '巡洋艦',
		lbl_shipBattleship: '戰列艦',
		lbl_shipColonizator: '殖民船',
		lbl_shipRecycler: '回收船',
		lbl_shipSpy: '間諜衛星',
		lbl_shipBomber: '導彈艦',
		lbl_shipDestroyer: '驅逐艦',
		lbl_shipRIP: '死星',
		lbl_shipBCruiser: '戰鬥巡洋艦',
		lbl_shipSatellite: '太陽能衛星',
		
		lbl_defRLauncher: '飛彈發射器',
		lbl_defLLaser: '輕型鐳射炮',
		lbl_defHLaser: '重型鐳射炮',
		lbl_defGauss: '高斯炮',
		lbl_defIon: '離子加農炮',
		lbl_defPlasma: '等離子炮塔',
		lbl_defSShield: '小型防護罩',
		lbl_defLShield: '大型防護罩',
		
		lbl_RequiredEnergy: '所需能源',
		
		rx_sendMail: /Send a message to (.+)\./,
		
	}
	
	AntiGame_lang.InterfaceTW =
	{
		opt_languageName: '繁體中文',
	
		opt_title: 'AntiGame 選項',
		opt_btnOk: '確定',
		opt_btnCancel: '取消',
		opt_btnDefault: '預設值',

		opt_language: '語言',
		opt_update_check: '自動檢查更新',
		opt_thousandSeparator: '千分位分隔符號',
		opt_blockAutoComplete: '阻擋 Firefox 的自動完成功能',
		
		opt_showDeficient: '顯示不夠的資源',
		opt_showResources: '顯示加強的資源提示',
		opt_showNames: '於圖片上顯示 船艦/設施/研究 的名稱',
		opt_nameColorOn: '名稱顏色: 可建造/研究',
		opt_nameColorOff: '名稱顏色: 無法建造/研究',
		opt_nameColorDisabled: '名稱顏色: 資源不足',
		opt_showConstructionTitle: '於清單中顯示該星球正在建造的項目',
		opt_shortHeader: '總是最小化星球圖片',
		
		opt_uni_SpeedFactor: '此宇宙的速度倍率',
		opt_uni_DFPercent: '艦隊成為廢墟的機率',
		opt_uni_DefenseToDF: '防禦成為廢墟的機率',
		
		opt_timeSetting: '變更時間 (只改變小時欄位)',
		opt_showServerOgameClock: '右上方的 Ogame 時鐘顯示伺服器時間',
		opt_showServerPhalanx: '感應密集陣畫面顯示伺服器時間',
		opt_showPageStartTime: '顯示最後刷新頁面的時間',
		opt_timeAMPM: '時鐘以 12 小時制顯示 (AM/PM)',
		
		opt_timeDontChange: '不要變更時間',
		opt_timeLocal: '永遠設為當地時間',
		opt_timeServer: '永遠設為伺服器時間',

		opt_killTips: '隱藏工具提示',

		opt_showEventList: '於概況畫面顯示展開的事件清單',
		opt_evt_showOnTop: '事件清單顯示的位置',
		opt_evt_showReduced: '簡化的事件清單',
		opt_evt_TimeMode: '預設於簡化的事件清單顯示 (時間/倒數)',
		opt_evt_noScroll: '顯示工具提示時不要出現頁框捲軸',
		opt_phalanx_showDebris: '感應密集陣畫面顯示殘骸數量',
		
		opt_galaxyShowRank: '於銀河系畫面中顯示玩家/聯盟的排名',
		opt_galaxyRankColor: '玩家/聯盟排名顏色',
		opt_galaxyDebrisMin: '殘骸以高亮度顯示的最低大小 (設為 0 則關閉)',
		opt_galaxyDebrisColor: '以高亮度顯示的殘骸顏色',
		opt_galaxyHideMoon: '隱藏月球圖片 (以顯示月球大小取代)',
		opt_galaxy_Players: '下列玩家以高亮度顯示',
		opt_galaxy_PlayerColors: '以高亮度顯示的玩家顏色',
		opt_galaxy_Allys: '下列聯盟以高亮度顯示',
		opt_galaxy_AllyColors: '以高亮度顯示的聯盟顏色',
		opt_galaxy_keepTipsPlanets: '顯示星球及月球的工具提示',
		opt_galaxy_keepTipsDebris: '顯示殘骸廢墟的工具提示',
		
		opt_msg_PlunderThreshold: '自設的可搶奪資源最低限制 (x1000)',
		opt_msg_DebrisThreshold: '自設的殘骸廢墟最低限制 (x1000)',
		opt_msg_foldSmallPlunder: '折疊小於上面所設最低限制的報告',
		opt_msg_showPlunder: '於間諜報告顯示可搶奪的資源',
		opt_msg_addButtons: '訊息畫面顯示額外的按鈕',
		opt_msg_fixColors: '修正戰鬥報告顏色',
		
		opt_fleet_showCapacity: '顯示船艦容量及速度',
		opt_fleet1_showResCalc: '顯示資源計算機',
		opt_uni_maxPlayerScore: 'The strongest player has more than 5M points',
		opt_autocopyCoords: '自動複製座標',
		opt_fleet2_setTargetDF: '若艦隊中有回收船時設定目的地為殘骸處',
		opt_fleet2_fixLayout: '修正航程資訊排版 (第 2 頁)',
		opt_fleet2_ShortLinks: '自訂目的地捷徑 (格式: galaxy#system#planet#type(1-星球,2-殘骸,3-月球)#name(可省略)，捷徑間以逗號分隔) (第 2 頁)',
		opt_fleet2_MoonColor: '以高亮度顯示的月球捷徑顏色',
		opt_fleet2_MoonsToEnd: '月球排列於目的地捷徑的最後',
		opt_fleet2_checkProbeCapacity: '發送艦隊前檢查間諜衛星容量 (第 2 頁)',
		
		opt_missionPriority: '任務優先順序',
		
		opt_mvmt_expandFleets: '顯示艦隊船艦及裝運貨物',
		opt_mvmt_showReversal: '顯示召回艦隊抵達時間',
		
		opt_missAttack: '任務顏色: 攻擊',
		opt_missColony: '任務顏色: 殖民',
		opt_missDeploy: '任務顏色: 部署',
		opt_missDestroy: '任務顏色: 摧毀月球',
		opt_missEspionage: '任務顏色: 間諜偵察',
		opt_missExpedition: '任務顏色: 遠征探險',
		opt_missFederation: '任務顏色: ACS聯合攻擊',
		opt_missHarvest: '任務顏色: 回收廢墟',
		opt_missHold: '任務顏色: ACS聯合防禦',
		opt_missTransport: '任務顏色: 運輸',
		opt_msg_addSimButton: '加入可以傳送間諜報告到 WebSim 的按鈕',
		
		lbl_missAttack: '攻擊',
		lbl_missColony: '殖民',
		lbl_missDeploy: '部署',
		lbl_missDestroy: '摧毀月球',
		lbl_missEspionage: '間諜偵察',
		lbl_missExpedition: '遠征探險',
		lbl_missFederation: 'ACS聯合攻擊',
		lbl_missHarvest: '回收廢墟',
		lbl_missHold: 'ACS聯合防禦',
		lbl_missTransport: '運輸',

		lbl_sectionGeneral: '一般設定',
		lbl_sectionUniverse: '伺服器設定',
		lbl_sectionTime: '時間設定',
		lbl_sectionEventList: '事件清單',
		lbl_sectionGalaxy: '銀河系',
		lbl_sectionMessages: '訊息',
		lbl_sectionFleetDispatch: '派遣艦隊',
		lbl_sectionFleetMovement: '艦隊移動',
		
		lbl_optionsNote1: '該選項只對此宇宙有效',
		
		lbl_resetCoords: '重設 - ',
		
		lbl_TotalCapacity: '總裝載容量',
		lbl_MinSpeed: '最小速度',
		lbl_ExPoints: 'Expedition points',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: '資源',
		lbl_debris: '殘骸',
		lbl_total: '總計',
		lbl_loot: '可搶奪',
		lbl_metal: '金屬',
		lbl_crystal: '晶體',
		
		lbl_shipSCargoAlt: '小運',
		lbl_shipLCargoAlt: '大運',
		lbl_shipRecyclerAlt: '回收',
		lbl_shipSatelliteAlt: '太衛',
		
		lbl_deficientRes: '不夠的資源',
		lbl_Production: '產量/小時',
		lbl_ArrivalACS: '抵達時間 (ACS)',
		
		lbl_btnMarkReadAll: '將所有訊息設為已讀',
		lbl_btnDeleteSmallPlunder: '刪除可搶奪資源 < $plunder 及殘骸廢墟 < $debris 的間諜報告',
		
		lbl_Moon: '月球',
		
		lbl_onTop: '顯示於上方',
		lbl_onBottom: '顯示於下方',
		lbl_onLeft: '顯示於左方',
		
		lbl_installNewVersion: '按一下安裝新版本',
		lbl_Save: '儲存',
		lbl_Clear: '清除',
		lbl_Quantity: '數量',
		lbl_Duration: '所需時間',
		lbl_Consumption: '消耗燃料'
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