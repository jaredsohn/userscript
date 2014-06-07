// ==UserScript==
// @name		   AntiGam_lang_jp
// @namespace      antikiller
// @description    AntiGame translation - japan (must be run before main AntiGame)
// @version 1.26.0
// @include 	   http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsJP =
	{
		lbl_missAttack: '攻撃',
		lbl_missColony: '植民地化',
		lbl_missDeploy: '配置',
		lbl_missDestroy: '月の破壊',
		lbl_missEspionage: 'スパイ活動',
		lbl_missExpedition: '探索',
		lbl_missFederation: 'ACS攻撃',
		lbl_missHarvest: '削減',
		lbl_missHold: 'ACS防御',
		lbl_missTransport: '輸送',
		
		lbl_shipSCargo: '小型輸送機',
		lbl_shipLCargo: '大型輸送機',
		lbl_shipLFighter: '軽戦闘機',
		lbl_shipHFighter: '重戦闘機',
		lbl_shipCruiser: '巡洋艦',
		lbl_shipBattleship: 'バトルシップ',
		lbl_shipColonizator: 'コロニーシップ',
		lbl_shipRecycler: '残骸回収船',
		lbl_shipSpy: '偵察機',
		lbl_shipBomber: '爆撃機',
		lbl_shipDestroyer: 'デストロイヤー',
		lbl_shipRIP: 'デススター',
		lbl_shipBCruiser: '大型戦艦',
		lbl_shipSatellite: 'ソーラーサテライト',
		
		lbl_defRLauncher: 'ロケットランチャー',
		lbl_defLLaser: 'ライトレーザー',
		lbl_defHLaser: 'ヘビーレーザー',
		lbl_defGauss: 'ガウスキャノン',
		lbl_defIon: 'イオンキャノン',
		lbl_defPlasma: 'プラズマ砲',
		lbl_defSShield: '小型シールドドーム',
		lbl_defLShield: '大型シールドドーム',
		
		lbl_RequiredEnergy: '必要なエネルギー',
		
		rx_sendMail: /Send a message to (.+)\./
	};
	
	AntiGame_lang.InterfaceJP =
	{
		opt_languageName: '日本語',
				
		opt_title: 'AntiGameオプション',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
		opt_btnDefault: 'デフォルト',

		opt_language: '言語',
		opt_update_check: 'アップデートの自動チェック',
		opt_thousandSeparator: '桁区切り',
		opt_blockAutoComplete: 'Firefoxのオートコンプリートのブロック',
		
		opt_showDeficient: '資源不足を表示',
		opt_showResources: '拡張資源の情報を表示',
		opt_showNames: '画像上に艦隊/施設/リサーチ名を表示',
		opt_nameColorOn: '名前の色:利用',
		opt_nameColorOff: '名前の色:未利用',
		opt_nameColorDisabled: '名前の色:リソース不足',
		opt_showConstructionTitle: '惑星一覧で建設タイトルを表示',
		opt_shortHeader: '常に惑星の画像を最小限に抑える',
		opt_misc_scrollTitle: 'ウィンドウタイトルに次のイベント時間をスクロール',
		
		opt_uni_reDesigned: '古い宇宙を再デザインがインストールされた',
		opt_uni_SpeedFactor: 'この宇宙のスピード係数',
		opt_uni_DFPercent: 'デブリと艦隊の構造の割合',
		opt_uni_DefenseToDF: 'デブリと防衛の割合',
		
		opt_timeSetting: '時刻の値を変更(時間のみ)',
		opt_showServerOgameClock: '右上OGame時間のためにサーバの時間を維持',
		opt_showServerPhalanx: '抗弾道ミサイルビューのためにサーバの時間を維持',
		opt_showPageStartTime: 'ページが最後にリフレッシュされる時間を表示',
		opt_timeAMPM: '12時間形式(AM/PM)の代わりに24時間形式を使用',
		
		opt_timeDontChange: '時間を変更しない',
		opt_timeLocal: '常にローカルタイムゾーンに設定',
		opt_timeServer: '常にサーバータイムゾーンに設定',
		
		opt_killTips: 'ツールチップ非表示',

		opt_evt_dimReverse: '帰還艦隊を暗く表示',
		opt_showEventList: '基本情報上のイベント一覧を繰り広げて表示',
		opt_evt_showOnTop: '画面上のイベントの一覧の位置',
		opt_evt_showReduced: 'イベントの一覧の縮小',
		opt_evt_TimeMode: '縮小イベントのリストにデフォルトでクロック/カウントダウン',
		opt_evt_noScroll: 'ツールチップが表示されるときには、フレームのスクロールバーが表示されない',

		opt_phalanx_showDebris: '抗弾道ミサイルビューで理論上の残骸を表示する',
		opt_evt_expandFleetsEvt: '艦隊構成と貨物を表示(イベントリスト)',
		opt_evt_expandFleetsPhal: '艦隊構成と貨物を表示(抗弾道ミサイル)',
		
		opt_galaxyShowRank: '銀河ビュー内のプレーヤー/同盟ランクの表示',
		opt_galaxyRankColor: 'プレイヤー/同盟ランクの色',
		opt_galaxyDebrisMin: '強調するためにデブリの最小サイズ(0はオフにする)',
		opt_galaxyDebrisColor: '強調表示されたデブリの色',
		opt_galaxyHideMoon: '月の画像を隠す(代わりに表示する月の大きさ)',
		opt_galaxy_Players: '次のプレーヤーを強調表示',
		opt_galaxy_PlayerColors: 'プレーヤーのハイライトの色',
		opt_galaxy_Allys: '次の同盟をハイライト表示',
		opt_galaxy_AllyColors: '同盟の強調表示',
		opt_galaxy_keepTipsPlanets: '惑星と月のためにツールチップを残す',
		opt_galaxy_keepTipsDebris: 'デブリフィールドにツールチップを残す',

		opt_msg_PlunderThreshold: '理論上の略奪のための下限値 (x1000)',
		opt_msg_DebrisThreshold: '理論上のデブリのための下限値 (x1000)',
		opt_msg_foldSmallPlunder: '略奪と限界未満のデブリとフォールドレポート',
		opt_msg_showPlunder: 'スパイレポートでの略奪品の表示',
		opt_msg_addButtons: 'メッセージの追加ボタン',
		opt_msg_fixColors: 'コンバットレポート修正の色',
		
		opt_fleet_showCapacity: '艦隊容量と速度の表示',
		opt_fleet1_showResCalc: 'リソースの計算機の表示',
		opt_uni_maxPlayerScore: '5Mポイント以上のものを持っている最強プレーヤー',
		opt_autocopyCoords: '座標の自動コピー',
		opt_autocopyGlobal: '任意のページから座標を記憶(現在のOgameの宇宙のタブだけではなく)',
		opt_fleet2_setTargetDF: '艦隊に残骸回収船が含まれている場合DFへ目標を設定',
		opt_fleet2_fixLayout: 'フライト情報のレイアウトの修正(ページ2)',
		opt_fleet2_ShortLinks: 'ターゲットのショートリンク(ページ2)',
		opt_fleet2_MoonColor: 'ショートリンク一覧の月の色',
		opt_fleet2_MoonsToEnd: 'ショートリンク一覧の末尾に月を移動',
		opt_fleet2_expandLists: 'ドロップダウンボックス(スピード,ショートカット,ACS)を展開',
		opt_fleet2_checkProbeCapacity: '出発前にプローブの容量のチェック(ページ2)',
		
		opt_missionPriority: 'ミッションの優先度',

		opt_mvmt_expandFleets: '艦隊の船と輸送船の表示',
		opt_mvmt_showReversal: '艦隊の帰還時間の表示',
		
		opt_missAttack: 'ミッションの色:攻撃',
		opt_missColony: 'ミッションの色:植民地化',
		opt_missDeploy: 'ミッションの色:配備',
		opt_missDestroy: 'ミッションの色:破壊',
		opt_missEspionage: 'ミッションの色:スパイ活動',
		opt_missExpedition: 'ミッションの色:探索',
		opt_missFederation: 'ミッションの色:連合',
		opt_missHarvest: 'ミッションの色:削減',
		opt_missHold: 'ミッションの色:保留',
		opt_missTransport: 'ミッションの色:輸送',
		opt_msg_addSimButton: 'WebSimへのスパイレポートを提出するためのボタンを追加',

		lbl_missAttack: '攻撃',
		lbl_missColony: '植民地化',
		lbl_missDeploy: '配備',
		lbl_missDestroy: '月の破壊',
		lbl_missEspionage: 'スパイ調査',
		lbl_missExpedition: '探索',
		lbl_missFederation: 'ACS攻撃',
		lbl_missHarvest: '削減',
		lbl_missHold: 'ACS防御',
		lbl_missTransport: '輸送',
		
		lbl_sectionGeneral: '全般',
		lbl_sectionUniverse: '宇宙',
		lbl_sectionTime: '時間設定',
		lbl_sectionEventList: 'イベントリスト & 抗弾道ミサイル',
		lbl_sectionGalaxy: '銀河',
		lbl_sectionMessages: 'メッセージ',
		lbl_sectionFleetDispatch: '艦隊派遣',
		lbl_sectionFleetMovement: '艦隊動向',
		
		lbl_optionsNote1: 'オプションはこの宇宙に対してのみ格納されます',
		
		lbl_resetCoords: 'リセット - ',
		
		lbl_TotalCapacity: '総容量',
		lbl_MinSpeed: '最小速度',
		lbl_ExPoints: '探索ポイント',
		lbl_mvmt_Return: 'R',
		
		lbl_resources: 'リソース',
		lbl_debris: 'デブリ',
		lbl_total: '合計',
		lbl_loot: '戦利品',
		lbl_metal: 'メタル',
		lbl_crystal: 'クリスタル',
		
		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',
		lbl_shipSatelliteAlt: 'Sat.',
		
		lbl_deficientRes: 'リソース不足',
		lbl_Production: '生産',
		lbl_ArrivalACS: '到着 (ACS)',
		
		lbl_btnMarkReadAll: '読み取りとして表示されているすべてのメッセージをマーク',
		lbl_btnDeleteSmallPlunder: 'スパイレポートを削除 略奪品 < $plunder とデブリ < $debris',
		
		lbl_Moon: '月',

		lbl_onTop: '上部に',
		lbl_onBottom: '下部に',
		lbl_onLeft: '左に',
		
		lbl_installNewVersion: '新しいバージョンをインストールするにはクリック',
		lbl_Save: '保存',
		lbl_Clear: 'クリア',
		lbl_Quantity: '数量',
		lbl_Duration: '時間',
		lbl_Consumption: '消費',
		
		lbl_tmTime: '時間',
		lbl_tmCountdown: 'カウントダウン',
	}

	// -------------------------------
	// Don't modify the code below

	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (! mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang [i] = AntiGame_lang [i];

}) ();
