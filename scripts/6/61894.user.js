// ==UserScript==
// @name					Castle Age Autopilot
// @namespace		CAAP
// @descriptituton	Auto pilot for Castle Age on Facebook
// @include				http*://apps.*facebook.com/castle_age/*
// @include				http*://www.facebook.com/reqs.php*
// @version				0.4.48
// ==/UserScript==

//activate debug messages
var debugMode = true;

var caapVersion = '0.4.48';

/* Changelog
 
 --- 
 FIX: Minor updates to make it work after the latest Castle Age update

*/

/* Maybe i can use one of this later

	all gift names:		//div[contains(@id,"_gift") and ./div/div/a[contains(@href,'giftSelection=')]]/div[1]
	wins on home feed:	//div[@class='alert_content' and .//span[@class='positive']]/a[contains(@onclick,'?user=')]/@href
	
*/

/* function dummy

var x = {
	vars : {},
	xpath : {},
	start: function() {
		
		queue.idle();	
	},
	work : function() {
		
		queue.idle();	
	},
	stop : function() {
		
		queue.idle();	
	}
};
	
*/

var fbUserId = unsafeWindow.Env.user.toString();

var gm = {
	set: function (name, value) {
		window.setTimeout(function () {
			GM_setValue(name, value);
		},
		0);
	},
	get: function (name, init) {
		return GM_getValue(name, init);
	},
	clear: function (name) {
		window.setTimeout(function () {
			GM_deleteValue(name);
		},
		0);
	}
};
var xpath = {
	string: XPathResult.STRING_TYPE,
	unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	first: XPathResult.FIRST_ORDERED_NODE_TYPE
};
var xp = {
	string : function(path, parent) {return document.evaluate(path, parent, null, XPathResult.STRING_TYPE, null).stringValue;},
	first : function(path, parent) {return document.evaluate(path, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;},
	list : function(path, parent) {return document.evaluate(path, parent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}
};

var user = {
	language: 'English',
	lastInit: gm.get(fbUserId + '.lastInit', null),
	autoStart: gm.get(fbUserId + '.autoStart', false),
	showMenu: gm.get(fbUserId + '.showMenu', true),
	stashActive: gm.get(fbUserId + '.stashActive', false),
	generalIdle: gm.get(fbUserId + '.generalIdle', null),
	
	autoQuest: gm.get(fbUserId + '.autoQuest', false),
	autoDemiQuest: gm.get(fbUserId + '.autoDemiQuest', false),
	autoAtlantis: gm.get(fbUserId + '.autoAtlantis', false),
	questOrder: gm.get(fbUserId + '.questOrder', 'all'),
	
	generalSubquest: gm.get(fbUserId + '.generalSubquest', null),
	
	lastEliteGuard: parseInt(gm.get(fbUserId + '.lastEliteGuard', 0), 10),
	
	autoBattle: gm.get(fbUserId + '.autoBattle', false),
	autoHeal: gm.get(fbUserId + '.autoHeal', false),
	battleForDemiPoints: gm.get(fbUserId + '.battleForDemiPoints', false),
	generalBattle: gm.get(fbUserId + '.generalBattle', null),

	activeMonster: gm.get(fbUserId + '.activeMonster', ''),
	fightMonster: gm.get(fbUserId + '.fightMonster', false),
	monsterStamina: gm.get(fbUserId + '.monsterStamina', 0),
	monsterEnergy: gm.get(fbUserId + '.monsterEnergy', 0),
	blessing: gm.get(fbUserId + '.blessing', 1),
	autoBlessing: gm.get(fbUserId + '.autoBlessing', false),
	nextBlessing: gm.get(fbUserId + '.nextBlessing', null),
	
	lastGiftId: gm.get(fbUserId + '.lastGiftId', null),

	army: (gm.get(fbUserId + '.army', null) === null) ? null : gm.get(fbUserId + '.army').split('\n')
};
var cage = {
	activeGeneral: null,
	generals: {},
	bqh : {
		keep : null,
		quests : null
	},
	homepage: 'http://apps.facebook.com/castle_age/index.php?bm=1',
	monster: {
		name: '//div[./div[contains(@style,"dragon_list_gray.jpg")] and .//img[@alt="engage"]]//span/text()',
		picture: '//div[./div[contains(@style,"dragon_list_gray.jpg")] and .//img[@alt="engage"]]//div[contains(@style,"width: 223")]/@style',
		id: '//img[@alt="engage" and contains(@src,"dragon_list_btn_3.jpg")]/parent::a/@href',
		engage: '//div[@class="imgButton"]//img[contains(@src,"dragon_list_btn_3.jpg")]//parent::a',
		attack: '//input[contains(@src,"attack_monster_button.jpg")]',
		callToArms: '//input[contains(@src,"call_layout_2.jpg")]',
		path: 'battle_monster.php?user=~UID~&mpool=~MPOOL~',
		check: '//a[contains(@href, "id=~UID~")]'
	},
	battle: {
		rank: '//tr[contains(@style,"battle_rank_highlight.jpg")]//td[@width="290"]/text()',
		demiPoints: '//img[contains(@src,"symbol_tiny_")]/parent::*/parent::*/following-sibling::div[contains(text(),"/ 10")]',
		result: '//span[@class="result_body" and contains(.,"Battle Points.")]',
		won: '//img[contains(@src,"battle_victory.gif")]',
		attackAgain: '//input[@alt="attack again!"]',
		enemyDown : '//div[@class="result"]//span[@class="result_body" and contains(.,"Your opponent is dead or too weak to battle.")]',
		ranks: '//td[@width="290"]/text()',
		combats: '//tr[count(td)=5]',
		enemyId: './/td[2]//a[contains(@href,"keep.php?user=")]/@href',
		enemyDemi: './/img[contains(@src,"/symbol_")]/@src',
		enemyRank: './/td[2]',
		enemyArmy: './/td[3]',
		enemyInvade: './/td[4]//input[@alt="Invade"]',
		enemyDuel: './/td[5]//input[@alt="Duel"]'
	},
	army: {
		page: 1,
		maxPage: null,
		pageInject: '//a[contains(@onclick,"army_member.php") and (./img[contains(@src,"view_army_")])]',
		pageActive: '//div[contains(text(),"Page:")]/following-sibling::div[not(contains(text(),"|")) and not(./a)]/text()',
		pagesCount: '//div/a/text()[contains(.,"Last")]',
		user: '//img[contains(@src,"view_friends_profile.gif")]/parent::a/@href',
		userID: null
	},
	demi: {
		power: {
			1: 'Energy (Amborsia)',
			2: 'Attack (Malekus)',
			3: 'Defense (Corvintheus)',
			4: 'Health (Aurora)',
			5: 'Stamina (Azeron)'
		},
		battleMax : 10,
		gain: '//input[@value="Gain Blessing" and ./preceding-sibling::input[@name="symbol" and @value="<demi>"]]',
		cannot: '//span[@class="result_body" and contains(text(),"You cannot pay")]/text()'
	},
	gift: {
		accept: '//div[contains(@id,"app_46755028429")]//input[contains(@name,"actions[") and not(contains(@name,"reject"))]'
	},
	xpath: {
		userID: '(//input[@name="fb_sig_user" and position()]/@value)[1]',
		app: './/*[@id="app_content_46755028429"]',
		navBar: './/*[@id="app46755028429_nvbar_nvl"]',
		ajaxLoader: './/*[@id="app46755028429_AjaxLoadIcon"]',
		ajaxLoaderStyle: './/*[@id="app46755028429_AjaxLoadIcon"]/@style',

		currentGeneralImg: './/*[@id="app46755028429_equippedGeneralContainer"]//a/img/@SRC',
		selectGeneral: '//form[@id="app46755028429_choose_gen"]/input[@src="<IMAGEPATH>"]',
		generalName: '//div[@id="app46755028429_generalContainerBox2"]//div[contains(@class,"general_name_div3")]',
		generalImagePath: '//div[@class="general_pic_div3"]//input[@class="imgButton"]/@src',
		allGenerals: '//div[@id="app46755028429_generalContainerBox2"]//div[@class="general_name_div3"]',
		armySize: '//div[@id="app46755028429_main_bntp"]//span[contains(text(),"My Army")]',
		generalNotMaxed: '//div[@id="app46755028429_generalContainerBox2"]//div[@class="general_name_div3" and  not(./following-sibling::*//div[contains(text(),"Level 4")])]',

		energyValue: '//span[@id="app46755028429_energy_current_value"]',
		energyMax: '//span[@id="app46755028429_energy_current_value"]/following-sibling::*',

		staminaValue: '//span[@id="app46755028429_stamina_current_value"]',
		staminaMax: '//span[@id="app46755028429_stamina_current_value"]/following-sibling::*',

		stashValue: '//div[@id="content"]//input[@name="stash_gold"]/@value',
		stashTimer: '//span[@id="app46755028429_gold_time_value"]'
	},
	id: {
		navBar: 'app46755028429_nvbar_nvl',
		navBarEnd: 'app46755028429_nvbar_div_end',
		stashTimer: 'app46755028429_gold_time_value',
		gold: 'app46755028429_gold_current_value',
		energy: 'app46755028429_energy_current_value',
		energyTimer: 'app46755028429_energy_time_value',
		staminaTimer: 'app46755028429_stamina_time_value'
	},
	page: {
		home: {
			path: 'index.php',
			xpath: '//span[contains(.,"Home")]/parent::a'
		},
		quests: {
			debug: 'quests',
			path: 'quests.php',
			xpath: '//span[contains(.,"Quests")]/parent::a',
			check: '//img[contains(@src,"tab_quest")]',
			subpage : {
				'quest': {
					debug: 'quest',
					path: 'quests.php',
					xpath: '//a[contains(@href,"/quests.php") and not(contains(@href, "?land="))]',
					check: '//img[contains(@src,"tab_quest_on.gif")]'
				},
				'demi': {
					debug: 'demiQuest',
					path: 'symbolquests.php',
					xpath: '//a[contains(@href,"symbolquests.php")]',
					check: '//img[contains(@src,"demi_quest_on.gif")]'
				},
				'atlantis': {
					debug: 'atlantis',
					path: 'monster_quests.php',
					xpath: '//a[contains(@href,"/monster_quests.php") and not(contains(@href, "?land="))]',
					check: '//img[contains(@src,"tab_atlantis_on_new.gif")]'
				}
			}
		},
		battle: {
			debug: 'battlepage',
			path: '',
			xpath: '//span[contains(.,"Battle")]/parent::a',
			check: '//img[contains(@src,"/battle_o") or contains(@src,"training_grounds")]',
			subpage: {
				battle: {
					debug: 'battle',
					path: 'battle.php',
					xpath: '//img[contains(@src,"/battle_o")]/parent::div/parent::a',
					check: '//img[contains(@src,"/battle_on")]'
				},
				battleRank: {
					debug: 'battleRank',
					path: 'battlerank.php',
					xpath: '//img[contains(@src,"tab_battle_rank")]/parent::div/parent::a',
					check: '//img[contains(@src,"tab_battle_rank_on")]'
				}
			}
		},
		heroes: {
			debug: 'heroes',
			path: '',
			xpath: '//div[@id="app46755028429_nvbar_nvl"]//span[contains(.,"Heroes")]/parent::a',
			check: '//div[contains(@class,"mainTableDivHero")]'
		},
		generals: {
			debug: 'generals',
			path: 'generals.php',
			xpath: '//div[@id="app46755028429_equippedGeneralContainer"]//a',
			check: '//div[@id="app46755028429_general_pic"]'
		},
		town: {
			debug: 'town',
			path: '',
			xpath: '//span[contains(.,"Town")]/parent::a',
			check: '//img[contains(@src,"tab_black_")]'
		},
		oracle: {
			debug: 'oracle',
			path: '',
			xpath: '//span[contains(.,"Oracle")]/parent::a',
			check: '//img[contains(@src,"oracle_")]'
		},
		keep: {
			debug: 'keep',
			path: 'keep.php',
			xpath: '//span[contains(.,"Keep")]/parent::a',
			check: '//div[contains(@class,"keep_main_section")]',
			subpage: {
				eliteGuard: {
					debug: 'eliteGuard',
					path: 'party.php',
					xpath: '//img[contains(@src,"tab_elite_guard_o")]/parent::div/parent::a',
					check: '//img[contains(@src,"tab_elite_guard_on")]'
				}
			}
		},
		monster: {
			debug: 'monster',
			path: 'battle_monster.php',
			xpath: '//img[contains(@src,"tab_monster_active")]/parent::div/parent::a',
			check: '//img[contains(@src,"tab_monster_on")]'
		},
		army: {
			debug: 'army',
			path: 'army.php',
			xpath: '//span[contains(.,"Army")]/parent::a',
			check: '//img[contains(@src,"invite")]'
		},
		viewArmy: {
			debug: 'viewArmy',
			path: 'army_member.php',
			xpath: '//img[contains(@src,"view_army")]/parent::div/parent::a',
			check: '//img[contains(@src,"view_army_on")]'
		},
		gift: {
			debug: 'gift',
			path: 'gift.php?app_friends=true&giftSelection=1',
			xpath: '//img[contains(@src,"giftpage_ca_friends_o")]/parent::div/parent::a',
			check: '//img[contains(@src,"giftpage_ca_friends_on")]'			
		}
	},
	button: {
		stash: '//input[contains(@value,"Stash")]'
	},
	battleRank: {},
	quests: {
		questTypes: [],
		questType: null,
		questNum: null,
		group: null,
		generalPic: './/img[contains(@style,"78px")]/@src',
		generalName: './/img[contains(@style,"78px")]/@title',
		generalFastSwitch: '//input[@alt=\'Buy Item\']',
		influence: './/div[contains(text(),\'INFLUENCE\')]/text()',
		energy: './/div[contains(@class,\'quest_req\')]//b/text()',
		button: './/form[contains(@id,\'app46755028429_doQst\')]/div/input',
		type: {
			'quest': {
				group: '//div[contains(@class,\'title_tab\')]//a',
				groupCheck: './parent::*[@class=\'title_tab_selected\']',
				order : {
					'all': '//div[contains(@class,\'quests_background\')]',
					'main' : '//div[@class=\'quests_background\']',
					'sub' : '//div[@class=\'quests_background_sub\']'
				}
			},
			'demi': {
				group: '//img[contains(@id,\'app46755028429_symbol_image_symbolquests\')]',
				groupCheck: '.[contains(@style,\'160px\')]',
				order : {
					'all': '//div[contains(@id,\'app46755028429_symbol_displaysymbolquests\') and not(contains(@style,\'none\'))]//div[contains(@class,\'quests_background\')]',
					'main' : '//div[contains(@id,\'app46755028429_symbol_displaysymbolquests\') and not(contains(@style,\'none\'))]//div[@class=\'quests_background\']',
					'sub' : '//div[contains(@id,\'app46755028429_symbol_displaysymbolquests\') and not(contains(@style,\'none\'))]//div[@class=\'quests_background_sub\']'
				}
			},
			'atlantis': {
				group: '//div[contains(@class,\'title_tab\')]//a',
				groupCheck: './parent::*[@class=\'title_tab_selected\']',
				order : {
					'all': '//div[contains(@class,\'quests_background\')]',
					'main' : '//div[@class=\'quests_background\']',
					'sub' : '//div[@class=\'quests_background_sub\']'
				}
			}
		}
	}
};
var caap = {
	reload: gm.get('caap.reload', false),
	maxRetry: 10,
	saved: {
		fbUserId: gm.get('caap.saved.fbUserId', null),
		lastTime: gm.get('caap.saved.lastTime', null),
		userID: gm.get('caap.saved.userID', null),
		battleRank: gm.get('caap.saved.battleRank', null),
		battleRanks: gm.get('caap.saved.battleRanks', null)
	},
	status: {
		home: getX(cage.page.home.xpath, document, xpath.first),
		userID: fbUserId,
		enabled: user.autoStart,
		stash: user.stashActive,
		aeris: false,
		cid: false,
		mercedes: false,
		reload: false,
		retry: 0,
		monster: 0,
		blessing: false,
		guard : null
	},
	timer: {
		reload: null,
		income: null,
		quests: null,
		ajaxwait: null
	},
	quest: {
		type : null
	},
	battle: {
		automatic: user.autoBattle,
		timer: null,
		demiFull: false,
		battleRank: 0
	},
	monster: {
		active: null,
		name: null,
		available: '//div[@id="caapMonster"]//input[contains(@id,"activeMonsterCB")]',
		link: null,
		html: []
	},
	eliteGuard: {
		timer: null,
		need: null
	},
	name: {
		divMenu: 'caapShowMenu',
		buttonShowHide: 'caapShowHide',
		divSettingsMenu: 'caapSettingsMenu',
		buttonEnable: 'caapEnableButton',
		enableautoStart: 'caapEnableCheckbox',
		checkForUpdate: 'caapCheckForUpdate',
		enableStash: 'caapEnableStash',
		generalIdle: 'caapGeneralIdle',
		enableAutoQuest: 'caapEnableAutoQuest',
		enableAutoDemiQuest: 'caapEnableAutoDemiQuest',
		enableAutoAtlantis: 'caapEnableAutoAtlantis',
		enableBattle: 'caapEnableBattle',
		enableBattleForDemiPoints: 'caapBattleForDemiPoints',
		enableAutoHeal: 'caapAutoHeal',
		generalBattle: 'caapGeneralBattle',
		battleArmyRatio: 'caapBattleArmyRatio',
		battleMinRank: 'caapBattleMinRank',
		enableMonster: 'caapEnableMonster',
		monsters: 'caapMonster',
		monsterStamina: 'caapMonsterStamina',
		monsterEnergy: 'caapMonsterEnergy',
		monstersSelect: 'monstersSelect',
		resetSavedValues: 'resetSavedValues',
		enableBlessing: 'enableBlessing',
		blessing: 'caapBlessing',
		generalSubquest: 'caapGeneralSubquest'
	}
};

var settings = {
	battle : {
		invade : {
			armyRatio : 0.7,
			minLevel : -4
		},
		duel : {
			armyRatio : 0.9,
			rankRatio : 0.4,
			minLevel : 4
		}
	}
};

/////
var task = {
	idle: function () {queue.idle();},
	reload: function () {reload.task();},

	goTo: function (arg) {queueGoTo(arg);},

	fastSwitchGeneral: function (arg) {queueFastSwitchGeneral(arg);},

	quest: function () {queueQuest();},
	goToQuest: function () {queueGoToQuest();},
	doQuest: function (arg) {queueDoQuest(arg);},
	searchOpenQuest: function (arg) {queueSearchOpenQuest(arg);},
	goToQuestGroup: function (arg) {queueGoToQuestGroup(arg);},

	getBattleRanks: function () {queueGetBattleRanks();},
	goToBattle: function () {queueGoToBattle();},
	searchEnemy: function () {queueSearchEnemy();},
	invadeEnemy: function (arg) {queueInvadeEnemy(arg);},
	waitInvadeEnemy: function () {queueInvadeWaiter();},

	getMonsters: function () {queueGetMonsters();},
	searchMonster: function () {queueSearchMonster();},
	attackMonster: function () {queueAttackMonster();},
	attackMonsterWaiter: function () {queueAttackMonsterWaiter();},

	getUserID: function (arg) {queueGetUserID(arg);},

	blessing: function () {queueBlessing();},
	doBlessing: function () {queueDoBlessing();},

	stash: {
		start: function (arg) {stash.start(arg);},
		work: function (arg) {stash.work(arg);},
		stop: function (arg) {stash.stop(arg);}
	},
	heal: {
		start: function (arg) {heal.start(arg);},
		work: function (arg) {heal.work(arg);},
		stop: function (arg) {heal.stop(arg);}
	},
	eliteguard: {
		start: function (arg) {eliteguard.start(arg);},
		work: function (arg) {eliteguard.work(arg);},
		stop: function (arg) {eliteguard.stop(arg);}
	},
	income: {
		start: function (arg) {income.start(arg);},
		work: function (arg) {income.work(arg);},
		stop: function (arg) {income.stop(arg);}
	},
	acceptGift: {
		start: function (arg) {acceptGift.start(arg);},
		work: function (arg) {acceptGift.work(arg);},
		stop: function (arg) {acceptGift.stop(arg);}
	},
	sendGift: {
		start: function (arg) {sendGift.start(arg);},
		work: function (arg) {sendGift.work(arg);},
		stop: function (arg) {sendGift.stop(arg);}
	},
	bqh: {
		start: function (arg) {bqh.start(arg);},
		work: function (arg) {bqh.work(arg);},
		stop: function (arg) {bqh.stop(arg);}
	},
	getGenerals: {
		start: function (arg) {getGenerals.start(arg);},
		work: function (arg) {getGenerals.work(arg);},
		stop: function (arg) {getGenerals.stop(arg);}
	},
	setGeneral: {
		start: function (arg) {setGeneral.start(arg);},
		work: function (arg) {setGeneral.work(arg);},
		stop: function (arg) {setGeneral.stop(arg);}
	},
	getMonster: {
		start: function (arg) {getMonster.start(arg);},
		work: function (arg) {getMonster.work(arg);},
		stop: function (arg) {getMonster.stop(arg);}
	}

};
var queue = {
	data: [],
	interval : null,
	delay : 1500,
	task: null,
	add: function (job, val) {//db('JOB:' + job); //db('VAL:' + val);
		if (caap.status.enabled === true) {
			queue.data.push([job, val]);
		}
	},
	insert: function () {
		if (arguments.length > 0) {
			var insertQueue = [];
			for (var arg = 0; arg < arguments.length; arg++) {
				if (arguments[arg] !== null && arguments[arg][0] !== null) {
					insertQueue.push(arguments[arg]);
				}
			}
			queue.data = insertQueue.concat(queue.data);
		}
	},
	idle: function () {
		queue.task = task.idle;
	},
	start : function(){
		queue.interval = window.setInterval(function () {queue.work();}, queue.delay);
	},
	work : function () {
		if (document.getElementById('app46755028429_app_body_container') === null) {
			window.location.href = cage.homepage;
		}
		if (queue.data.length > 0 && queue.task === task.idle) {
			var q = queue.data.shift();
			//db(q);
			//db('1:' +q[0]);
			//db('2:' + q[1]);
			queue.task = q[0];
			if (q[1] === undefined) {
				window.setTimeout(function(){q[0]();}, Math.random() * queue.delay);
			} else {
				window.setTimeout(function(){q[0](q[1]);}, Math.random() * queue.delay);
			}
		} else {
			checkStashJob();
			checkQuestJob();
			checkBlessing();
			checkIdleGeneral();
		}
		if (debugMode === true) {
			if(queue.task !== task.idle) {GM_log(queue.task);}
			document.getElementById('currentjob').value = queue.task;
			document.getElementById('debugqueue').innerHTML = queue.data.join('\n');
		}
	},
	stop : function() {
		window.clearInterval(queue.interval);
	}
};
var reload = {
	timer: null,
	start : function () {
		if (caap.status.enabled === true) {
			reload.timer = window.setTimeout(function () {
				 queue.add(task.reload);
			},
			900000);
		}
	},
	'stop': function () {
		window.clearTimeout(reload.timer);
		reload.timer = null;
	},
	task: function () {
		gm.set('caap.reload', true);
		window.location.href = cage.homepage;
	}
};
/////
var image = {
	buttonBackground: 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAbCAMAAAA5zj1cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQcHBwkJCQoKCgwMDA4ODg8PDxERERQUFBcXFxkZGRoaGhsbGx0dHR4eHh8fHyAgICEhISMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS8vLzAwMDExMTIyMjMzMzU1NTY2Njc3Nzk5OTo6Ojw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU1NTk5OTk9PT1BQUFFRUVNTU1RUVFVVVVZWVlhYWFlZWVtbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmVlZWZmZmdnZ2lpaWpqamxsbHJycnR0dHV1dXh4eHx8fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGXecswAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjFO5zj5AAABsElEQVQ4T13QDVObMBjA8WerFYvtEAotE1FWaBlQamYXOoTWd3Ht0Fr1+38Vg6fjefxdLpfcP3AQmM1mWSam97la1VCBzWbzknIhfRHLT1AB8fjj02/h6ZG+rdqhAsXff3z9zPnzmpdlUSK0QDZfrJMHxh6S9dlZ9gehRRyc30/KiRj3WfbpIC6Q5nkZrSIxyjRPE4QW4Gy6CpaBGKsp59VffaAF2IQtg7vR6C5YMsZ+IbRAHEXF6MbzbkZFHMUThBaIw/DaKwaDwruOQ9FqtMA4DC8Ht45zO7gMw/FPhBbwff/cubLtK+dcLIcILeD+cOf2hWVd2HN36BKkgH3onO4vTHOxf3po2w5CC/QtK+nnhpH3E8vq2wgtoJvfp3qqqqk+NU3dQmgBvWcxlSsKV5nZ002EFjAMI1ZO2u0TJTZMo4fQAoamhMqxLB8roWYYXYQW0L7t+fJ4Z2cs+5qmqQgt0OkoQzmQpEAeKkpnD6EFWq1dV/K2tz3J3W23OggtID5KOnK3ttwjqWt1dYQWaDSbBwfNRqOam2JTowWqG/7yBl/2x7ouUPn6f3rbInV5BR+wot1D5tUhAAAAAElFTkSuQmCC',
	showMenu: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAADmSURBVEhLY2AYBaMhQNcQCF36XwiIFYBYkOoWAw3lB+IAIK6H0gJUtQRoqAEQLwDi+0A8H4j1qWYB1PUJQPo8EP+H0vEgcapYAnIt1NXvoRaAaJAvjCm2AOr6NCTXg3xAPV8ADTNDcz3MApgvDMj2BdT1oLCGhT3McOr4InTJP0Mcrkf2BTBl/TMn2Rchi34LAi1IBFpwARrm6K5H8sW/+JAlf0nLfEBXgdI9KKXAUg4uC2BxQVq+gGasfiC9nwA+AJSfAFJPUjABNYDKHWsgdgBiewIYlE+ok+lIcuWo4tEQGBohAAAClTGLbx7rKAAAAABJRU5ErkJggg==',
	hideMenu: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAADqSURBVEhLY2AYBaMhMBoCOEMgdOl/ISC2BmIHILYngPWB8vwkBSdQgwEQ9wPxfgL4AFB+Akg9iRb8A1kwH4jfA/F/PBgkD1KnT5IFIYt+C4Yu+ZcI1HiBgAXnQ5f+iw9Z8leQJAtAioEWGBLwBcj1C4AWmJNsONgCYMQBcTwQA12JNZhA4iB50iIY2TVAzWY4fAELe9IiF92rUF+kYfEF5a6HWQZKIWi+gLnemKywx+GLBCRfUM/1SL4A5Qtgivl/n6x0T8ir0LgIANL1QAyiBQjpIVkeaCiofFIAYtIzFcm2jWoYDQFYCAAAsiMxi1/7wUkAAAAASUVORK5CYII=',
	work: 'R0lGODlhEAAQAPEDAPv7+87Ozqenp15eXiH5BAkKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAACMISPqRaxKNwY7wg63WpgCKAtF1UhwVcyqBKC18MlbTmxMxod2mxQHK9z/ICmlBFQAAAh+QQJCgAAACwAAAAAEAAQAIH7+/vS0tKioqJQUFACMoSPqSZhvhoYAoS6wgBiUwUNwahFHwJlSzJK63FhKpq+liDDteWM8BPhWV4Q325mSwIKACH5BAkKAAAALAAAAAAQABAAgfv7+9XV1aqqqktLSwIyhI+pFsELhBsiVjhiHi51UTVZ1AEBVRoDpVyIhDQuxID0kt6wkjdmrDM5ckDh74ZMHgoAIfkECQoAAAAsAAAAABAAEACB+/v70NDQo6OjUVFRAi+EjIekRQZ2Cds1rot6jtDjD0LtcwQF3xKKiAAAh6kWsdiAECDQNyQdLsXJZBYEJsNw+QQJCgAAACwAAAAAEAAQAIH7+/vPz8+ioqJNTU0CMISPqRab0YQA0IV5wWjPCAhhE/Ipw6ZwSLWqieS6yFAe7Lrcxzl2T4+jOFLDorFYAAAh+QQJCgAAACwAAAAAEAAQAIH7+/vS0tKnp6c/Pz8CMYSPqRabDYQAAa4Z5liw0lxZn0gJA0kpHrIqkogar8Oi7TEM02FvGcc70RKSofF4KAAAIfkECQoAAAAsAAAAABAAEACB+/v7z8/PpKSkVFRUAjCEj6kWmw1Cky7GJuCiMXP2HcKwKdpxJkKGpCJbgaY7DO5DBkJVB3YMqAFWQB3wWAAAIfkECQoAAAAsAAAAABAAEACB+/v70tLSo6OjS0tLAjCEj6nLYeEgA9GJSV02F8kkCBpGLaMXnicirqbLCAM8iNSwJUEtA3N86QU6kw8JUwAAIfkECQoAAAAsAAAAABAAEACB+/v70dHRra2tUVFRAjKEj6nLF2Eggw+IBmSWOq4gdI2IWaHThB2okMEwiEKMnMP5eskLDgC9EFyEhguGVSoVAAAh+QQJCgAAACwAAAAAEAAQAIH7+/vR0dGfn59SUlICMoSPqcsY9tgLs4EIs4V06xMMAwZ2kEiWSSAoJii6AjkDQnsNV2qMgl5bsC6t4YbnSRQAACH5BAkKAAAALAAAAAAQABAAgfv7+9TU1KKiokpKSgIxhI+pyxv9wItJ0HOPGEOFrwheEmwgSZVDZnwZywKcJyIWINxlu3R77RDtdg0DsFgsAAAh+QQFCgAAACwAAAAAEAAQAIH7+/vV1dWqqqpNTU0CMISPqcsirMIIhypBx0vWiDFEHbJBHrYEXfCNlQvADBiVhgo49yaHbG56/GImT/FYAAA7'
};
var language = {
	'English': {
		autoStart: 'Autostart',
		update: 'Update',
		updateTrue: 'Update available, would you like to install it now?',
		updateFalse: 'No update available.',
		updateError: 'An error occurred while checking for updates:\n',
		reset: 'Reset',
		gold: 'Gold',
		stash: 'Stash all gold',
		quest: 'Quests',
		autoquest: 'Automatic quests',
		autodemiquest: 'Auto. demiquest',
		autoatlantis: 'Auto. Atlantis',
		demi: 'Demi power'
	},
	'Deutsch': {
		autoStart: 'Autostart',
		update: 'Update',
		updateTrue: 'Update verfügbar, möchten Sie es jetzt installieren?',
		updateFalse: 'Kein Update verfügbar.',
		updateError: 'Update konnte nicht durchgeführt werden:\n',
		reset: 'Rücksetzen',
		gold: 'Gold',
		stash: 'Geld bunkern',
		quest: 'Quests',
		autoquest: 'Auto. Quests',
		autodemiquest: 'Auto. Demi-Quest',
		autoatlantis: 'Auto. Atlantis',
		demi: 'Demi power'
	}
};
////
// Generals
function getGeneralNameByImage(image) {
	if (!image) {
		image = getX(cage.xpath.currentGeneralImg, document, xpath.string);
	}
	for (var general in cage.generals) {
		if (image == cage.generals[general].path) {
			return general;
		}
	}
	return false;
}
function checkForGeneral(name) {
	for (var general in cage.generals) {
		if (name == general) {
			return true;
		}
	}
	return false;
}
// Blessing
function queueBlessing() {
	if (checkForPage(cage.page.quests.subpage['demi']) === false) {
		queue.insert([task.goTo, cage.page.quests], [task.goTo, cage.page.quests.subpage['demi']], [task.blessing]);
	} else {
		var questGroup = getX(cage.quests.type['demi'].group, document, xpath.unordered).snapshotItem(user.blessing - 1);
		if (getX(cage.quests.type['demi'].groupCheck, questGroup, xpath.first) === null) {
			mclick(questGroup);
			queue.insert([task.blessing]);
		} else {
			var g = cage.demi.gain.replace('<demi>', user.blessing);
			var gain = getX(g, document, xpath.first);
			mclick(gain);
			queue.insert([task.doBlessing]);
		}
	}
	queue.idle();
}
function queueDoBlessing() {
	var cannot = getX(cage.demi.cannot, document, xpath.string);
	var next = new Date();
	var time = next.getTime();
	if (cannot.length > 0) {
		time = time + (parseInt(cannot.match(/\d+(?= hours)/)[0], 10) * 3600000) + (parseInt(cannot.match(/\d+(?= minutes)/)[0], 10) * 60000);
	} else {
		time = time + (24 * 60 * 60 * 1000);
	}
	next.setTime(time);
	user.nextBlessing = next;
	gm.set(fbUserId + '.nextBlessing', next.toString());
	caap.status.blessing = false;
	queue.idle();
}

// page
function checkForPage(page) {
	if (getX(page.check, document, xpath.first) !== null) {
		return true;
	} else {
		return false;
	}
}
// HTML / DOM
function createE(element, id, css, innerhtml, name, value, type) {
	var e = document.createElement(element);
	e.id = id;
	if (css) {
		e.style.cssText = css;
	}
	if (name) {
		e.name = name;
	}
	if (value) {
		e.value = value;
	}
	if (type) {
		e.type = type;
	}
	if (innerhtml) {
		e.innerHTML = innerhtml;
	}
	return e;
}
function createCheckbox(id, checked, text, x, y, css) {
	var cb = createE('input', id + 'Checkbox', 'position:absolute;top:-3px;', null, null, null, 'checkbox');
	cb.checked = checked;
	var t = createE('text', id + 'Text', 'white-space:nowrap;position:absolute;left:22px;', text, null, null, null);
	var l = createE('label', id + 'Label', 'position:absolute;left:' + (x - 4) + 'px;top:' + y + 'px;', null, null, null, null);
	return addChildren(l, [cb, t]);
}
function createSelect(id, text, option, x, y, selectWidth, selectLeft) {
	var dd = createE('select', id + 'Select', 'position:absolute;width:' + selectWidth + 'px;left:' + selectLeft + 'px;font-size:11px;', null, null, null, null);
	if (option !== null) {
		dd.size = 1;
		dd.add(new Option(option, option), null);
	}
	var t = createE('text', id + 'Text', 'white-space:nowrap;position:absolute;top:4px;', text, null, null, null);
	var l = createE('label', id + 'Label', 'position:absolute;left:' + (x) + 'px;top:' + y + 'px;', null, null, null, null);
	return addChildren(l, [t, dd]);
}
function createInput(id, size, w, text, value, x, y) {
	var i = createE('input', id + 'Input', 'position:absolute;width:' + w + 'px;left:' + (148 - w) + 'px;font-size:11px;text-align:right;', null, null, null, 'TEXT');
	i.value = value;
	i.size = size;
	var t = createE('text', id + 'Text', 'white-space:nowrap;position:absolute;top:3px;', text);
	var l = createE('label', id + 'Label', 'position:absolute;left:' + x + 'px;top:' + y + 'px;');
	return addChildren(l, [t, i]);
}
function createFieldset(legend, css) {
	var fs = createE('FIELDSET', legend, css);
	var l = createE('LEGEND', null, null, legend);
	return addChildren(fs, [l]);
}
function addChildren(parent, children) {
	for (var child in children) {
		parent.appendChild(children[child]);
	}
	return parent;
}
function mclick(obj) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(evt);
}
function getX(path, parent, type) {
	switch (type) {
	case xpath.string:
		return document.evaluate(path, parent, null, type, null).stringValue;
	case xpath.first:
		return document.evaluate(path, parent, null, type, null).singleNodeValue;
	case xpath.unordered:
		return document.evaluate(path, parent, null, type, null);
	}
}

// timers
function timerEliteGuard() {
	if (caap.status.enabled === true) {
		queue.add(task.eliteguard.start);
		caap.eliteGuard.timer = window.setTimeout(function () {
			timerEliteGuard();
		}, 3600000);
	} else {
		window.clearTimeout(caap.eliteGuard.timer);
		caap.eliteGuard.timer = null;
	}
}
function timerIncome() {
	if (caap.status.enabled === true) {
		if (stats.gold.timer() < 60000) {
			queue.add(task.income.start);
		} else {
			caap.timer.income = window.setTimeout(function () {
				timerIncome();
			},
			10000);
		}
	} else {
		window.clearTimeout(caap.timer.income);
		caap.timer.income = null;
	}
}
function timerBattle() {
	if (caap.battle.automatic === true && caap.status.enabled === true) {
		if (caap.battle.timer === null && stats.stamina.current() > 0) {
			caap.battle.automatic = false;
			caap.battle.timer = window.setTimeout(function () {queue.add(task.goToBattle);}, stats.stamina.timer());
		}
	} else {
		window.clearTimeout(caap.battle.timer);
		caap.battle.timer = null;
	}
}

function settingsMenu() {

	var menuButton = createE('div', caap.name.divMenu, 'position:absolute;display:block;z-index:1;top:' + (document.getElementById(cage.id.navBarEnd).offsetTop - document.getElementById(cage.id.navBar).clientHeight - 1) + 'px;width:40px;height:27px;background:url(data:image/gif;base64,' + image.buttonBackground + ') no-repeat;cursor:pointer;');
	menuButton.innerHTML = '<img id="' + caap.name.buttonShowHide + '" style="margin-left:8px;" src="data:image/png;base64,' + ((user.showMenu) ? image.hideMenu : image.showMenu) + '">';
	var appDiv = getX(cage.xpath.app, document, xpath.first);

	var divSettingsMenu = createE('div', caap.name.divSettingsMenu, 'position:absolute;display:' + ((user.showMenu === true) ? 'block' : 'none') + ';zIndex:1;top:' + (document.getElementById(cage.id.navBarEnd).offsetTop - document.getElementById(cage.id.navBar).clientHeight - 187) + 'px;left:0px;width:604px;height:176px;z-index:1;background:#fff;color:#000;padding:5px;');

	var caapCaapFieldset = createFieldset('CAAP V' + caapVersion, 'position:absolute;left:4px;top:0px;width:80px;height:166px;display:block;');
	addChildren(caapCaapFieldset, [
		createE('button', caap.name.buttonEnable, 'width:78px;height:25px;', 'Start', null, null, 'button'), 
		createCheckbox(caap.name.enableautoStart, user.autoStart, language[user.language].autoStart, 0, 30), 
		createE('INPUT', caap.name.resetSavedValues, 'position:absolute;left:0px;top:105px;width:78px;height:25px;', null, null, language[user.language].reset, 'BUTTON'), 
		createE('INPUT', caap.name.checkForUpdate, 'position:absolute;left:0px;top:132px;width:78px;height:25px;', null, null, language[user.language].update, 'BUTTON')]
	);

	var caapGoldFieldset = createFieldset(language[user.language].gold, 'position:absolute;left:105px;top:0px;width:130px;height:22px;');
	addChildren(caapGoldFieldset, [
		createCheckbox(caap.name.enableStash, user.stashActive, language[user.language].stash, 0, 0)]
	);

	var caapQuestFieldset = createFieldset(language[user.language].quest, 'position:absolute;left:105px;top:38px;width:130px;height:68px;');
	addChildren(caapQuestFieldset, [
		createCheckbox(caap.name.enableAutoQuest, user.autoQuest, language[user.language].autoquest, 0, 0), 
		createCheckbox(caap.name.enableAutoDemiQuest, user.autoDemiQuest, language[user.language].autodemiquest, 0, 20),
		createCheckbox(caap.name.enableAutoAtlantis, user.autoAtlantis, language[user.language].autoatlantis, 0, 40)]
		);

	var caapDemiFieldset = createFieldset(language[user.language].demi, 'position:absolute;left:257px;top:122px;width:155px;height:44px;');
	var caapBlessing = createSelect(caap.name.blessing, '', '', 15, -5, 90, 50);
	caapBlessing.childNodes[1].options.length = null;
	for (var d in cage.demi.power) {
		if (cage.demi.power.hasOwnProperty(d)) {
			caapBlessing.childNodes[1].add(new Option(cage.demi.power[d], d, (d === user.blessing) ? true : false), null);
		}
	}
	addChildren(caapDemiFieldset, [
		createCheckbox(caap.name.enableBlessing, user.autoBlessing, 'Bless', 0, 0), caapBlessing, createCheckbox(caap.name.enableBattleForDemiPoints, user.battleForDemiPoints, 'Battle for demipoints', 0, 20)]
	);

	var caapBattleFieldset = createFieldset('Battles', 'position:absolute;left:105px;top:122px;width:130px;height:44px;');
	addChildren(caapBattleFieldset, [
		createCheckbox(caap.name.enableBattle, user.autoBattle, 'Automatic battles', 0, 0),
		createCheckbox(caap.name.enableAutoHeal, user.autoHeal, 'Heal if health is low', 0, 20)
	]);
	
	var caapGeneralsFieldset = createFieldset('Generals', 'position:absolute;left:258px;top:0px;width:155px;height:68px;');
	addChildren(caapGeneralsFieldset, [
		createSelect(caap.name.generalIdle, 'Idle', null, 0, -4, 100, 55), 
		createSelect(caap.name.generalBattle, 'Battle', null, 0, 16, 100, 55), 
		createSelect(caap.name.generalSubquest, 'Subquest', null, 0, 36, 100, 55)]
	);

	var caapMonsterFieldset = createFieldset('Monster NOTWORKING', 'position:absolute;left:435px;top:0px;width:153px;height:166px;');
	addChildren(caapMonsterFieldset, [
		createSelect(caap.name.monstersSelect, '', '', -50, 0, 154, 50), createE('DIV', caap.name.monsters, 'position:absolute;left:0px;top:22px;width:142px;height:122px;border:inset 1px;padding:5px;overflow:hidden;')]
	);

	addChildren(divSettingsMenu, [
		caapCaapFieldset, caapGoldFieldset, caapQuestFieldset, caapDemiFieldset, caapBattleFieldset, caapGeneralsFieldset, caapMonsterFieldset]
	);

	appDiv.insertBefore(divSettingsMenu, appDiv.firstChild);
	appDiv.insertBefore(menuButton, appDiv.firstChild);

}

function enableCAAP() {
	db(caap.reload + ':' + fbUserId);
	gm.set('caap.reload', false);
	caap.status.enabled = true;
	var now = new Date();
	if (caap.saved.fbUserId !== fbUserId || caap.saved.lastTime === null || (now.getTime() - ((caap.saved.lastTime === null) ? 0 : parseInt(caap.saved.lastTime, 10))) > 3600000) {
		gm.clear('caap.saved.userID');
		gm.clear('caap.saved.battleRank');
		gm.clear('caap.saved.battleRanks');
	}
	caap.saved.fbUserId = fbUserId.toString();
	gm.set('caap.saved.fbUserId', caap.saved.fbUserId);
	caap.saved.lastTime = now.getTime();
	gm.set('caap.saved.lastTime', caap.saved.lastTime.toString());
	queue.add(task.acceptGift.start);
	if (gm.get(fbUserId + '.lastGiftId' ,null) !== null) {
		queue.add(task.sendGift.start, gm.get(fbUserId + '.lastGiftId' ,null));
	}
	
	if (user.autoQuest === true) {cage.quests.questTypes.push('quest');}
	if (user.autoDemiQuest === true) {cage.quests.questTypes.push('demi');}
	if (user.autoAtlantis === true) {cage.quests.questTypes.push('atlantis');}
			
	queue.add(task.bqh.start);
	queue.add(task.getGenerals.start);
	queue.add(task.setGeneral.start, user.generalIdle);
	queue.add(task.getBattleRanks);
	queue.add(task.getMonsters);
	queue.idle();
	queue.start();
	document.getElementById(caap.name.buttonEnable).innerHTML = 'Stop';
	timerEliteGuard();
	timerIncome();
	timerBattle();
	reload.start()
}
function disableCAAP() {
	caap.status.enabled = false;
	queue.task = null;
	queue.data = [];
	queue.stop();
	timerIncome();
	timerBattle();
	reload.stop();
	document.getElementById(caap.name.buttonEnable).innerHTML = 'Start';
}

var handler = {
	showHide: function () {
		document.getElementById(caap.name.buttonShowHide).addEventListener('click', function (e) {
			user.showMenu = !user.showMenu;
			this.src = 'data:image/png;base64,' + ((user.showMenu) ? image.hideMenu : image.showMenu);
			document.getElementById(caap.name.divSettingsMenu).style.display = ((user.showMenu) ? 'block' : 'none');
			gm.set(fbUserId + '.showMenu', user.showMenu);
			this.blur();
		},
		false);
	},
	handleautoStart: function () {
		document.getElementById(caap.name.enableautoStart + 'Checkbox').addEventListener('click', function (e) {
			user.autoStart = this.checked;
			gm.set(fbUserId + '.autoStart', user.autoStart);
			this.blur();
		},
		false);
	},
	handleEnable: function () {
		document.getElementById(caap.name.buttonEnable).addEventListener('click', function (e) {
			if (caap.status.enabled === false) {
				enableCAAP();
			} else {
				disableCAAP();
			}
			this.blur();
		},
		false);
	},
	handleReset: function () {
		document.getElementById(caap.name.resetSavedValues).addEventListener('click', function (e) {
			gm.clear('caap.saved.userID');
			gm.clear('caap.saved.battleRank');
			gm.clear('caap.saved.battleRanks');
			gm.clear(fbUserId + '.lastEliteGuard');
			window.location.href = cage.homepage;
			this.blur();
		},
		false);
	},
	handleCheckForUpdate: function () {
		document.getElementById(caap.name.checkForUpdate).addEventListener('click', function (e) {
			try {
				function updateCheck(forced) {
					try {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://userscripts.org/scripts/source/61894.meta.js?' + new Date().getTime(),
							headers: {
								'Cache-Control': 'no-cache'
							},
							onload: function (resp) {
								var local_version, remote_version, rt;
								rt = resp.responseText;
								remote_version = /(?:@version\s+)(.+)/g.exec(rt)[1];
								local_version = gm.get('caap.version', '0');
								if (local_version !== '0') {
									if (remote_version !== local_version) {
										if (confirm(language[user.language].updateTrue)) {
											GM_openInTab('http://userscripts.org/scripts/source/61894.user.js');
											gm.set('caap.version', remote_version);
										}
									} else if (forced) {
										alert(language[user.language].updateFalse);
									}
								} else {
									gm.set('caap.version', remote_version);
								}
							}
						});
					} catch(err) {
						if (forced) {
							alert(language[user.language].updateError + err);
						}
					}
				}
				updateCheck(true);
			} catch(err) {}
		},
		false);
	},
	handleStandardGeneral: function () {
		document.getElementById(caap.name.generalIdle + 'Select').addEventListener('change', function (e) {
			user.generalIdle = this.value;
			gm.set(fbUserId + '.generalIdle', user.generalIdle);
			queue.add(task.setGeneral.start, user.generalIdle);
		},
		false);
	},
	handleSubquestGeneral: function () {
		document.getElementById(caap.name.generalSubquest + 'Select').addEventListener('change', function (e) {
			user.generalSubquest = this.value;
			gm.set(fbUserId + '.generalSubquest', user.generalSubquest);
			queue.add(task.generalSubquest, user.generalSubquest);
		},
		false);
	},
	handleAutoBattle: function () {
		document.getElementById(caap.name.enableBattle + 'Checkbox').addEventListener('click', function (e) {
			user.autoBattle = this.checked;
			gm.set(fbUserId + '.autoBattle', user.autoBattle);
			caap.battle.automatic = user.autoBattle;
			window.clearTimeout(caap.battle.timer);
			caap.battle.timer = null;
			if (user.autoBattle === true) {
				timerBattle();
			}
			this.blur();
		},
		false);
	},
	handleBattleForDemiPoints: function () {
		document.getElementById(caap.name.enableBattleForDemiPoints + 'Checkbox').addEventListener('click', function (e) {
			user.battleForDemiPoints = this.checked;
			gm.set(fbUserId + '.battleForDemiPoints', user.battleForDemiPoints);
			this.blur();
		},
		false);
	},
	handleAutoHeal: function () {
		document.getElementById(caap.name.enableAutoHeal + 'Checkbox').addEventListener('click', function (e) {
			user.autoHeal = this.checked;
			gm.set(fbUserId + '.autoHeal', user.autoHeal);
		},
		false);
	},
	handleBattleGeneral: function () {
		document.getElementById(caap.name.generalBattle + 'Select').addEventListener('change', function (e) {
			user.generalBattle = this.value;
			gm.set(fbUserId + '.generalBattle', user.generalBattle);
		},
		false);
	},
	handleMonsterSelect: function () {
		document.getElementById(caap.name.monstersSelect + 'Select').addEventListener('change', function (e) {
			caap.monster.html[caap.status.monster].style.display = 'none';
			var active = parseInt(this.value.split('~')[0], 10);
			caap.monster.html[active].style.display = 'block';
			caap.status.monster = active;
		},
		false);
	},
	handleStash: function () {
		document.getElementById(caap.name.enableStash + 'Checkbox').addEventListener('click', function (e) {
			user.stashActive = this.checked;
			caap.status.stash = user.stashActive;
			gm.set(fbUserId + '.stashActive', user.stashActive);
			this.blur();
		},
		false);
	},
	handleDemi: function () {
		document.getElementById(caap.name.enableBlessing + 'Checkbox').addEventListener('click', function (e) {
			user.autoBlessing = this.checked;
			caap.status.stash = user.autoBlessing;
			gm.set(fbUserId + '.autoBlessing', user.autoBlessing);
			this.blur();
		},
		false);
	},
	handleDemiSelect: function () {
		document.getElementById(caap.name.blessing + 'Select').addEventListener('change', function (e) {
			user.blessing = this.value;
			gm.set(fbUserId + '.blessing', user.blessing);
		},
		false);
	},
	handleAutoQuest: function () {
		document.getElementById(caap.name.enableAutoQuest + 'Checkbox').addEventListener('click', function (e) {
			user.autoQuest = this.checked;
			gm.set(fbUserId + '.autoQuest', user.autoQuest);
			if (this.checked === true) {
				cage.quests.questTypes.push('quest');
			} else {
				cage.quests.questTypes.splice(cage.quests.questTypes.indexOf('quest'), 1);
			}
			this.blur();
		},
		false);
	},
	handleAutoDemiQuest: function () {
		document.getElementById(caap.name.enableAutoDemiQuest + 'Checkbox').addEventListener('click', function (e) {
			user.autoDemiQuest = this.checked;
			gm.set(fbUserId + '.autoDemiQuest', user.autoDemiQuest);
			if (this.checked === true) {
				cage.quests.questTypes.push('demi');
				cage.quests.questTypes.splice(cage.quests.questTypes.indexOf('demi'), 1);
			}
			this.blur();
		},
		false);
	},
	handleAutoAtlantis: function () {
		document.getElementById(caap.name.enableAutoAtlantis + 'Checkbox').addEventListener('click', function (e) {
			user.autoAtlantis = this.checked;
			gm.set(fbUserId + '.autoAtlantis', user.autoAtlantis);
			if (this.checked === true) {
				cage.quests.questTypes.push('atlantis');
			} else {
				cage.questsquestTypes.splice(cage.quests.questTypes.indexOf('atlantis'), 1);
			}
			this.blur();
		},
		false);
	}
};
function init() {

	// gui cleanup	
	try {
		var loader = document.getElementById('app46755028429_AjaxLoadIcon');
		loader.style.top = '38px';
		loader.style.width = '80px';
		loader.style.left = '350px';
	} catch (e) {
		db('no loader icon');
	}

	if (document.getElementById(cage.id.navBarEnd) !== null) {
		settingsMenu();
		for (var handle in handler) {
			if (handler.hasOwnProperty(handle)) {
				handler[handle]();
			}
		}
		if (user.autoStart === true || caap.reload === true) {
			enableCAAP();
		}
	} else {
		db('init - error');
		window.location.href = cage.homepage;
	}
}
// Checks
function checkStashJob() {
	if (caap.status.stash === true && stats.gold.current() >= 10 && queue.data.length === 0 && queue.task === task.idle) {
		caap.status.stash = false;
		queue.add(task.stash.start);
	}
}
function checkQuestJob(timer) {
	if (caap.timer.quests === null && (user.autoQuest === true || user.autoDemiQuest === true) && stats.energy.current() > 0) {
		caap.timer.quests = window.setTimeout(function () {queue.add(task.quest);}, ((timer !== undefined) ? timer : stats.energy.timer()));
	}
}
function checkIdleGeneral() {
	if (queue.data.length === 0 && queue.task === task.idle && cage.activeGeneral != user.generalIdle) {
		queue.add(task.setGeneral.start, user.generalIdle);
	}
}
function checkBlessing() {
	if (user.autoBlessing === true) {
		if (caap.status.blessing === false && (Date.parse(user.nextBlessing) <= (new Date()) || user.nextBlessing === null)) {
			caap.status.blessing = true;
			queue.add(task.blessing);
		}
	}
}

function queueGoTo(page) {
	if (checkForPage(page) === true) {
		caap.status.retry = 0;
		caap.timer.ajaxwait = null;
	} else {
		caap.status.retry++;
		if (caap.timer.ajaxwait === null) {
			caap.timer.ajaxwait = (new Date()).getTime();
		}
		if (getX(cage.xpath.ajaxLoaderStyle, document, xpath.string).search(/block/g) > -1) {
			var wait = (new Date()).getTime();
			wait -= caap.timer.ajaxwait;
			if (wait >= 10000 && wait < 20000) {
				getX(cage.xpath.ajaxLoader, document, xpath.first).style.display = 'none';
			} else if (wait >= 20000) {
				gm.set('caap.reload', true);
				window.location.href = cage.homepage;
			}
			queue.insert([task.goTo, page]);
		} else {
			caap.timer.ajaxwait = null;
			if (caap.status.home === null) {
				caap.status.home = getX(cage.page.home.xpath, document, xpath.first);
			}
			var body = (page['get_body'] === true) ? 'get' : 'cache';
			caap.status.home.setAttribute('onclick', caap.status.home.getAttribute('onclick').replace(/\(\'.*\.php.*', \'.*_body'\)/, '(\'' + page.path + '\', \'' + body + '_body\')'));
			mclick(caap.status.home);
			queue.insert([task.goTo, page]);
		}
	}
	if (caap.status.retry >= caap.maxRetry) {
		gm.set('caap.reload', true);
		window.location.href = cage.homepage;
	}
	queue.idle();
}

// Generals

function queueFastSwitchGeneral(generalLink) {
	if (generalLink[1] !== undefined) {
		var name = generalLink[0];
		switch (generalLink[1]) {
			case 'WaitForFS' :
				if (getX(quest.xpath.generalFastSwitch, document, xpath.first) === null) {
					queue.insert([task.fastSwitchGeneral, [name, 'WaitForFS']]);
				} else {
					queue.insert([task.fastSwitchGeneral, [name, 'FastSwitch']]);
				}
				break;
			case 'FastSwitch' :
				mclick(getX(quest.xpath.generalFastSwitch, document, xpath.first));
				queue.insert([task.fastSwitchGeneral, [name, 'Check']]);
				break;
			case 'Check' :
				if (getGeneralNameByImage() !== name) {
					queue.insert([task.fastSwitchGeneral, [name,'Check']]);
				}
				break;	
		}
	} else {
		mclick(generalLink);
		queue.insert([task.fastSwitchGeneral, [generalLink.innerHTML.match(/alt="(.*?)(?=")/)[0].replace('alt="',''), 'WaitForFS']]);
	}
	queue.idle();
}

// Quest
/* testing
var getQuests = {
	vars : {
		
	},
	xpath : {
		bqh : '//input[@name="bqh"]/@value',
		parent : '//table[@class="quests_layout"]',
		types : '//table[@class="layout"]//div[contains(@style,"pt 5px")]//a[contains(@onclick,"quest")]',
		areas : '//div[@class="title_tab" or contains(@id,"_image_div_")]',
		quests : './/div[contains(@class,"quests_background") and not (contains(@class,"quests_background_special")) and not(.//div[contains(@style,"locked")]) and not(.//div[contains(@style,"background-color: rgb(158, 11, 15)")]) and not(./ancestor::div[contains(@style,"display: none")])]',
		name : '//div[@class="qd_1" or @class="quest_sub_title"]//b/text()',
		id : './/input[@name="quest"]/@value',
		general : './/div[@class="quest_act_gen"]',
		influence : './/div[contains(text(),"INFLUENCE")]/text()',
		energy : './/div[@class="quest_req"]//b/text()',
		experience : '//div[@class="qd_2" or @class="qd_2_sub"]//b/text()'
	},
	start: function() {
		if (cage.bqh.quests !== null) {
			queue.insert([task.getQuests.work]);
			if (checkForPage(cage.page.quest) === false) {queue.insert([task.goTo, cage.page.quests]);}
		} else {
			if (checkForPage(cage.page.quest) === false) {
				queue.insert(
					[task.getQuests.start], 
					[task.goTo, cage.page.quests]
				);
			} else {
				cage.bqh.quests = xp.string(getQuests.xpath.bqh, document);
				queue.insert([task.getQuests.work]);
			}
		}
		queue.idle();	
	},
	work : function() {
		
		queue.idle();	
	},
	stop : function() {
		
		queue.idle();	
	}
}
*/
// Quest
function queueQuest() {
	if (user.autoQuest === false && user.autoDemiQuest === false && user.autoAtlantis === false) {
		cage.quests.questType = null;
	} else {
		cage.quests.questType = cage.quests.questTypes.shift();
		cage.quests.questTypes.push(cage.quests.questType);
		queue.insert(
			[task.goTo, cage.page.quests], 
			[task.goTo, cage.page.quests.subpage[cage.quests.questType]], 
			[task.goToQuestGroup, 0], 
			[task.searchOpenQuest, 0]
		);
	}
	queue.idle();
}
function queueGoToQuestGroup(group) {
	if (getX(cage.quests.type[cage.quests.questType].group, document, xpath.unordered) === null) {
		queue.insert([task.goToQuestGroup, group]);
	} else {
		var questGroup = getX(cage.quests.type[cage.quests.questType].group, document, xpath.unordered).snapshotItem(group);
		if (getX(cage.quests.type[cage.quests.questType].groupCheck, questGroup, xpath.first) === null) {
			mclick(questGroup);
			queue.insert([task.goToQuestGroup, group]);
		}
	}
	queue.idle();
}
function queueSearchOpenQuest(group) {
	var groups = getX(cage.quests.type[cage.quests.questType].group, document, xpath.unordered);
	var questGroup = groups.snapshotItem(group);
	var quests = getX(cage.quests.type[cage.quests.questType].order[user.questOrder], questGroup, xpath.unordered);
	var questsdone = true;
	var energy;
	var general = user.generalSubquest;
	for (var q = 0; q < quests.snapshotLength; q++) {
		var quest = quests.snapshotItem(q);
		if (getX(cage.quests.influence, quest, xpath.string).match(/\d+(?=%)/) === null) {
			continue;
		}
		var influence = parseInt(getX(cage.quests.influence, quest, xpath.string).match(/\d+(?=%)/)[0], 10);
		if (influence < 100) {
			questsdone = false;
			energy = parseInt(getX(cage.quests.energy, quest, xpath.string), 10);
			if (xp.first(cage.quests.generalName, quest) !== null) {
				general = xp.string(cage.quests.generalName, quest);
			}
			cage.quests.questNum = q;
			cage.quests.group = group;
			break;
		}
	}
	if (questsdone === true) {
		group++;
		if (group < groups.snapshotLength) {
			queue.insert([task.goToQuestGroup, group], [task.searchOpenQuest, group]);
		} else {
			cage.quests.group = null;
			caap.timer.quests = null;
		}
	} else {
		if (stats.energy.current() >= energy) {
			queue.insert(
				[task.setGeneral.start, general],
				[task.goTo, cage.page.quests],
				[task.goTo, cage.page.quests.subpage[cage.quests.questType]],
				[task.goToQuestGroup, group],
				[task.doQuest, Math.floor(stats.energy.current() / energy)]
			);
		} else {
			cage.quests.group = null;
			caap.timer.quests = null;
		}
	}
	queue.idle();
}
function queueDoQuest(repeats) {
	var groups = getX(cage.quests.type[cage.quests.questType].group, document, xpath.unordered);
	var questGroup = groups.snapshotItem(cage.quests.group);
	var quests = getX(cage.quests.type[cage.quests.questType].order[user.questOrder], questGroup, xpath.unordered);
	var quest = quests.snapshotItem(cage.quests.questNum);
	var influence = parseInt(getX(cage.quests.influence, quest, xpath.string).match(/\d+(?=%)/)[0], 10);
	if (caap.status.enabled === true && influence < 100 && repeats >= 1) {
		mclick(getX(cage.quests.button, quest, xpath.first));
		repeats--;
		queue.insert([task.doQuest, repeats]);
	} else {
		cage.quests.group = null;
		caap.timer.quests = null;

	}
	queue.idle();
}
// Battle
function queueGetBattleRanks() {
	if (caap.saved.battleRanks === null) {
		if (checkForPage(cage.page.battle.subpage.battleRank) === true) {
			var ranks = getX(cage.battle.ranks, document, xpath.unordered);
			cage.battleRank = {};
			cage.battleRank['Acolyte'] = 0;
			caap.saved.battleRanks = [];
			for (var i = 0; i < ranks.snapshotLength; i += 1) {
				var line = ranks.snapshotItem(i).nodeValue;
				caap.saved.battleRanks.push(line);
				cage.battleRank[line.trim().match(/(?!\d\b )\w+.\w+/g)[1]] = parseInt(line.match(/\d+/)[0], 10);
			}
			gm.set('caap.saved.battleRanks', caap.saved.battleRanks.join('@'));
			if (getX(cage.battle.rank, document, xpath.first) === null) {
				caap.battle.rank = 0;
			} else {
				caap.battle.rank = cage.battleRank[(getX(cage.battle.rank, document, xpath.first).nodeValue).trim().match(/(?!\d\b )\w+.\w+/g)[1]];
			}
			caap.saved.battleRank = caap.battle.rank;
			gm.set('caap.saved.battleRank', caap.saved.battleRank);
		} else {
			queue.insert([task.goTo, cage.page.battle.subpage.battleRank], [task.getBattleRanks]);
		}
	} else {
		cage.battleRank['Acolyte'] = 0;
		var battleRanks = caap.saved.battleRanks.toString().split('@');
		for (var rank in battleRanks) {
			cage.battleRank[battleRanks[rank].trim().match(/(?!\d\b )\w+.\w+/g)[1]] = parseInt(battleRanks[rank].match(/\d+/)[0], 10);
		}
		caap.battle.rank = caap.saved.battleRank;
	}
	queue.idle();
}
function queueGoToBattle() {
	queue.insert(
		[task.setGeneral.start, user.generalBattle], 
		[task.goTo, cage.page.battle.subpage.battle], 
		[task.searchEnemy]
	);
	if (stats.health.current() < 10) {
		queue.insert([task.heal.start]);
	}
	queue.idle();
}
function queueSearchEnemy() {
	var combats = getX(cage.battle.combats, document, xpath.unordered);
	var army = getX(cage.xpath.armySize, document, xpath.string).match(/\d+/)[0];
	army = (army > 501) ? 501 : army;
	var demi;
	var demis = new Array(5);
	var demiSum = 0;
	var enemyInvadeIndex = -1;
	var enemyDuelIndex = -1;
	var enemyInvadeRank = -99;
	var enemyDuelRank = 99;
	
	if (user.battleForDemiPoints === true && caap.battle.demiFull === false) {
		var demiPoints = getX(cage.battle.demiPoints, document, xpath.unordered);
		for (var dp = 0; dp < demiPoints.snapshotLength; dp++) {
			demis[dp] = parseInt(demiPoints.snapshotItem(dp).innerHTML.match(/\d+/)[0], 10);
			demiSum += demis[dp];
		}
		if (demiSum == 50) {
			caap.battle.demiFull = true;
		}
	}
	for (var combatIndex = 0; combatIndex < combats.snapshotLength; combatIndex++) {
		var combat = combats.snapshotItem(combatIndex);
		var enemyRankNew = cage.battleRank[getX(cage.battle.enemyRank, combat, xpath.string).replace(/.+Level\s\d+\s/,'').trim()];
		var enemyAmry = parseInt(getX(cage.battle.enemyArmy, combat, xpath.string).trim(), 10);
		if (enemyRankNew < enemyDuelRank && enemyAmry >= army * settings.battle.duel.armyRatio) {
			enemyDuelRank = enemyRankNew; enemyDuelIndex = combatIndex;
		}
		if (enemyRankNew - caap.battle.rank >= settings.battle.invade.minLevel) {
			if (enemyRankNew > enemyInvadeRank) {
				if (enemyAmry <= army * settings.battle.invade.armyRatio) {
					if (user.battleForDemiPoints === true && caap.battle.demiFull === false) {
						demi = parseInt(getX(cage.battle.enemyDemi, combat, xpath.string).match(/\d(?=.jpg)/)[0], 10) - 1;
						if (demis[demi] === cage.demi.battleMax) {
							continue;
						}
					}
					enemyInvadeRank = enemyRankNew;
					enemyInvadeIndex = combatIndex;
				}
			}
		}
	}
	if (enemyInvadeIndex > -1) {
		mclick(getX(cage.battle.enemyInvade, combats.snapshotItem(enemyInvadeIndex), xpath.first));
		queue.insert(
			[task.waitInvadeEnemy], 
			[task.invadeEnemy, ((user.battleForDemiPoints === true && caap.battle.demiFull === false) ? cage.demi.battleMax - demis[demi] : null)]
		);	
	} else if (caap.battle.rank >= settings.battle.duel.minLevel && enemyDuelRank < (caap.battle.rank * settings.battle.duel.rankRatio)) {
			mclick(getX(cage.battle.enemyDuel, combats.snapshotItem(enemyDuelIndex), xpath.first));
			queue.insert(
				[task.waitInvadeEnemy], 
				[task.invadeEnemy, ((user.battleForDemiPoints === true && caap.battle.demiFull === false) ? cage.demi.battleMax - demis[demi] : null)]
			);	
	} else {
		idleBattle();
	}
	queue.idle();
}
function queueInvadeEnemy(maxDemi) {
	var attack = false;
	if (getX(cage.battle.enemyDown, document,xpath.first) === null) {
		var resultdiv = document.getElementById('app46755028429_results_container');
		if (stats.stamina.current() > 0 && stats.health.current() > 10) {
			if (getX(cage.battle.result, document, xpath.first) !== null) {
				if (getX(cage.battle.won, document, xpath.first) !== null) {
					resultdiv.innerHTML = 'CAAP';
					if (getX(cage.battle.attackAgain, document, xpath.first) !== null) {
						attack = true;
						if (user.battleForDemiPoints === true && caap.battle.demiFull === false) {
							if (maxDemi > 0) {
								maxDemi -= 1;
							}
							if (maxDemi === 0) {
								attack = false;
							}
						}				
						mclick(getX(cage.battle.attackAgain, document, xpath.first));
						queue.insert(
							[task.waitInvadeEnemy], 
							[task.invadeEnemy, maxDemi]
						);				
					}
				}
			} else {
				queue.insert([task.invadeEnemy, maxDemi]);		
			}
		}
	}
	if (attack === false) {
		idleBattle();
	}
	queue.idle();
}
function queueInvadeWaiter() {
	if (caap.timer.ajaxwait === null) {
		caap.timer.ajaxwait = (new Date()).getTime();
	}
	if (getX(cage.xpath.ajaxLoaderStyle, document, xpath.string).search(/block/g) > -1) {
		var wait = (new Date()).getTime();
		wait -= caap.timer.ajaxwait;
		if (wait >= 10000 && wait < 20000) {
			getX(cage.xpath.ajaxLoader, document, xpath.first).style.display = 'none';
			queue.insert([task.waitInvadeEnemy]);			
		} else if (wait >= 20000) {
			gm.set('caap.reload', true);
			window.location.href = cage.homepage;
		}
	} else {
		caap.timer.ajaxwait = null;
		var resultdiv = document.getElementById('app46755028429_results_container');
		if (resultdiv.innerHTML === 'CAAP') {
			queue.insert([task.waitInvadeEnemy]);			
		}
	}
	queue.idle();
}
function idleBattle() {
	window.clearTimeout(caap.battle.timer);
	caap.battle.timer = null;
	caap.battle.automatic = user.autoBattle;
	timerBattle();	
}
// Monster
function queueGetMonsters() {
	if (checkForPage(cage.page.monster) === true) {
		var monsterNames = getX(cage.monster.name, document, xpath.unordered);
		var pictures = getX(cage.monster.picture, document, xpath.unordered);
		var monsterID = getX(cage.monster.id, document, xpath.unordered);
		var monstersDiv = document.getElementById(caap.name.monsters);
		monstersDiv.innerHTML = '';
		caap.monster.active = [];
		var mSelect = document.getElementById(caap.name.monstersSelect + 'Select');
		mSelect.options.length = null;
		for (var i = 0; i < monsterNames.snapshotLength; i++) {
			var uid = monsterID.snapshotItem(i).nodeValue.match(/\d+/)[0];
			var mpool = monsterID.snapshotItem(i).nodeValue.match(/\d$/)[0];
			var isActive = false;
			if (user.activeMonster.search(uid) > -1) {
				caap.monster.active.push(i);
				isActive = true;
			}
			mSelect.add(new Option(monsterNames.snapshotItem(i).nodeValue, i + '~' + uid + '~' + mpool), null);
			caap.monster.html[i] = createE('DIV', null, 'padding:5px;');
			if (i === 0) {
				caap.monster.html[i].style.display = 'block';
			} else {
				caap.monster.html[i].style.display = 'none';
			}
			var img = createE('IMG');
			var r = /(?:url\(\")(http.+)(?=\")/;
			img.src = r.exec(pictures.snapshotItem(i).nodeValue)[1];
			img.style.cssText = 'position:absolute;left:-2px;top:90px;width:156px;height:43px';
			var stamina = createInput('monsterStamina' + i, 4, 30, 'Stamina', 0, 4, 45);
			stamina.lastChild.style.left = '108px';
			var energy = createInput('monsterEnergy' + i, 4, 30, 'Energy', 0, 4, 65);
			energy.lastChild.style.left = '108px';
			var health = createE('DIV');
			health.style.cssText = 'position:relative;left:-10px;top:80px;width:152px;height:5px;z-index:2;background-color:#f00;opacity:0.6;';
			var defense = createE('DIV');
			defense.style.cssText = 'position:relative;left:-10px;top:112px;width:152px;height:5px;z-index:2;background-color:#00f;opacity:0.6;';
			addChildren(caap.monster.html[i], [
				createCheckbox('monsterActive' + i, false, 'Attack monster', 4, 5), 
				createCheckbox('monsterAchieve' + i, false, 'Achievement mode', 4, 25), 
				stamina, 
				energy, 
				health,
				defense,
				img
			]);
			addChildren(monstersDiv, [caap.monster.html[i]]);
		}
	} else {
		queue.insert(
			[task.goTo, cage.page.monster], 
			[task.getMonsters]
		);
	}
	queue.idle();
}
function queueSearchMonster() {
	var monsters = getX(caap.monster.available, document, xpath.unordered);
	if (monsters.snapshotLength > 0 && caap.monster.active.length > 0) {
		var active = caap.monster.active.shift();
		db(active);
		var uid = monsters.snapshotItem(active).getAttribute('uid');
		var mpool = monsters.snapshotItem(active).getAttribute('mpool');
		var monsterpage = cage.page.monster;
		monsterpage.path = cage.monster.path.replace('~UID~', uid).replace('~MPOOL~', mpool);
		monsterpage.check = cage.monster.check.replace('~UID~', uid);
		monsterpage['get_body'] = true;
		queue.insert((checkForPage(monsterpage) === false) ? [task.goTo, monsterpage] : null, [task.attackMonster]);
		caap.monster.active.push(active);
	}
	queue.idle();
}
function queueAttackMonster() {
	if (getX(cage.monster.attack, document, xpath.first) !== null) {
		mclick(getX(cage.monster.attack, document, xpath.first));
	} else {
		queue.insert(
			[task.attackMonsterWaiter], 
			[task.attackMonster]
		);
	}
	queue.idle();
}
function queueAttackMonsterWaiter() {
	if (caap.timer.ajaxwait === null) {
		caap.timer.ajaxwait = (new Date()).getTime();
	}
	if (getX(cage.xpath.ajaxLoaderStyle, document, xpath.string).search(/block/g) > -1) {
		var wait = (new Date()).getTime();
		wait -= caap.timer.ajaxwait;
		if (wait >= 10000 && wait < 20000) {
			getX(cage.xpath.ajaxLoader, document, xpath.first).style.display = 'none';
		} else if (wait >= 20000) {
			gm.set('caap.reload', true);
			window.location.href = cage.homepage;
		}
		queue.insert([task.attackMonsterWaiter]);
	} else {
		caap.timer.ajaxwait = null;
	}
	queue.idle();
}
// Army
function queueGetUserID(page) {
	if (user.army === null) {user.army = [];}
	if (page === undefined) {page = 1;}
	if (checkForPage(cage.page.viewArmy) === false) {
		queue.insert(
			[task.goTo, cage.page.viewArmy],
			[task.getUserID, page]
		);
	} else {
		if (cage.army.maxPage === null) {
			if (getX(cage.army.pagesCount, document, xpath.string) !== null) {
				cage.army.maxPage = parseInt(getX(cage.army.pagesCount, document, xpath.string).match(/\d+/)[0], 10);
			} else {
				cage.army.maxPage = 1;
			}	
		}			
		if (page <= cage.army.maxPage) {
			if (parseInt(getX(cage.army.pageActive, document, xpath.string), 10) !== page) {
				var inject = getX(cage.army.pageInject, document, xpath.first);
				inject.setAttribute("onclick", inject.getAttribute("onclick").replace('a46755028429_get_cached_ajax(\'army_member.php\'', 'a46755028429_get_cached_ajax(\'army_member.php?page=' + page + '\''));
				mclick(inject);
				queue.insert([task.getUserID, page]);
			} else {
				var ids = getX(cage.army.user, document, xpath.unordered);
				for (var id = 0; id < ids.snapshotLength; id++) {
					user.army.push(ids.snapshotItem(id).nodeValue.match(/(?!=)\d+/)[0]);
				}
				page++;
				queue.insert([task.getUserID, page]);
			}
		} else {
			gm.set(fbUserId + '.army', user.army.join('\n'));
		}
	}
	queue.idle();
}

var getMonster = {
	vars : {
		monsterLink : 'http://apps.facebook.com/castle_age/battle_monster.php?user=<UID>&mpool=<MPOOL>'
	},
	xpath : {
		health : '//img[contains(@src,"monster_health_background.jpg")]/../@style',
		defense : '//img[contains(@src,"seamonster_ship_health.jpg")]/../@style',
		repair : '//img[contains(@src,"repair_bar_grey.jpg")]/../@style'
	},
	start: function() {
		if (document.getElementById(caap.name.monstersSelect + 'Select').options.length > 0) {queue.insert([task.getMonster.work]);}
		queue.idle();	
	},
	work : function() {
		var mSelect = document.getElementById(caap.name.monstersSelect + 'Select');
		for (var opt in mSelect.options) {
			var data = mSelect.options[opt].value.split('~');
			var id = data[0];
			var mLink = getMonster.vars.monsterLink.replace('<UID>',data[1]);
			mLink = mLink.replace('<MPOOL>',data[2]);
			var req = new XMLHttpRequest();  
			req.open('GET', mLink, true);  
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200) {
					var rt = document.createElement('DIV');
					rt.innerHTML = req.responseText;
					db(xp.string(getMonster.xpath.health, rt));
					db(xp.string(getMonster.xpath.defense, rt));
					db(xp.string(getMonster.xpath.repair, rt));
					rt = null;
				}
			}
			req.send(null);  
		}	
		queue.idle();	
	},
	stop : function() {
		
		queue.idle();	
	}
};
//Castle Age Stats
var stats = {
	xpath : {
		healthCurrent: 'id("app46755028429_health_current_value")',
		healthMax: 'id("app46755028429_health_current_value")/following-sibling::text()',
		healthTimer: 'id("app46755028429_health_time_value")'
	},
	gold : {
		current : function () {
			if (document.getElementById(cage.id.gold)) {
				return parseInt(document.getElementById(cage.id.gold).innerHTML.replace(/,/g, '').substr(1), 10);
			} else {
				return 0;
			}
		},
		reset : function (){
			document.getElementById(cage.id.gold).innerHTML = '$0';
		},
		timer : function () {
			if (document.getElementById(cage.id.stashTimer)) {
				var time = document.getElementById(cage.id.stashTimer).innerHTML;
				return parseInt(time.split(':')[0], 10) * 60000 + parseInt(time.split(':')[1], 10) * 1000;
			} else {
				return 0;
			}

		}
	},
	energy : {
		current : function () {
			return parseInt(getX(cage.xpath.energyValue, document, xpath.string), 10);
		},
		max : function () {
			return parseInt(getX(cage.xpath.energyMax, document, xpath.string), 10);
		},
		timer : function () {
			if (document.getElementById(cage.id.energyTimer)) {
				var time = document.getElementById(cage.id.energyTimer).innerHTML;
				return parseInt(time.split(':')[0], 10) * 60000 + parseInt(time.split(':')[1], 10) * 1000;
			} else {
				return 0;
			}
		}
	},
	health : {
		current : function () {
			return parseInt(getX(stats.xpath.healthCurrent, document, xpath.string), 10);
		},
		max : function () {
			return getX(stats.xpath.healthMax, document, xpath.string).match(/\d+/)[0];
		},
		timer : function () {
			if (getX(stats.xpath.healthCurrent, document, xpath.string)) {
				var time = getX(stats.xpath.healthCurrent, document, xpath.string);
				return parseInt(time.split(':')[0], 10) * 60000 + parseInt(time.split(':')[1], 10) * 1000;
			} else {
				return 0;
			}
		}
	},
	stamina : {
		current : function () {
			return parseInt(getX(cage.xpath.staminaValue, document, xpath.string), 10);
		},
		max : function () {
			return parseInt(getX(cage.xpath.staminaMax, document, xpath.string), 10);
		},
		timer : function () {
			if (document.getElementById(cage.id.staminaTimer)) {
				var time = document.getElementById(cage.id.staminaTimer).innerHTML;
				return parseInt(time.split(':')[0], 10) * 60000 + parseInt(time.split(':')[1], 10) * 1000;
			} else {
				return 0;
			}
		}
	}
};

//new 
var bqh = {
	vars : {
		link : 'http://apps.facebook.com/castle_age/keep.php'
	},
	xpath : {
		bqh : '//input[@name="bqh"]/@value'
	},
	start: function() {
		queue.insert([task.bqh.work]);
		queue.idle();
	},
	work : function() {
		var req = new XMLHttpRequest();  
		req.open('GET', bqh.vars.link, false);  
		req.send(null);  
		if(req.status == 200) {
			var temp = document.createElement('DIV');
			temp.innerHTML = req.responseText;
			if (xp.first(bqh.xpath.bqh, temp) !== null) {
				cage.bqh.keep = xp.string(bqh.xpath.bqh, temp);
			}
		}
		queue.idle();	
	},
	stop : function() {}
};
var stash = {
	vars : {
		link : 'http://apps.facebook.com/castle_age/keep.php?stash_gold=<GOLD>&bqh='
	},
	xpath : {},
	start: function() {
		if (stats.gold.current() >= 10) {
			queue.insert([task.stash.work]);
		}
		if (caap.status.aeris === true && cage.activeGeneral !== 'Aeris') {
			queue.insert([task.setGeneral.start, 'Aeris']);
		}
		queue.idle();
	},	
	work : function() {
		var req = new XMLHttpRequest();  
		req.open('GET', stash.vars.link.replace('<GOLD>', stats.gold.current)  + cage.bqh.keep, false);  
		req.send(null);  
		if(req.status == 200) { 
			db('stashed');
			stats.gold.reset();
		} else {
			db('stash error');
		}
		queue.insert([task.stash.stop]);
		queue.idle();	
	},
	stop : function() {
		caap.status.stash = user.stashActive;
		queue.idle();
	}
};
var eliteguard = {
	vars : {
		addGuardLink : 'http://apps.facebook.com/castle_age/party.php?twt=jneg&jneg=true&user=',
		guards : 0
	},
	xpath: {
		link : '//a[img[contains(@src,"tab_elite_guard")]]',
		guards: '//img[@size="small"]/@uid'
	},
	start : function () {
		if ((new Date().getTime() - user.lastEliteGuard) > 3600000) {
			user.lastEliteGuard = 0;
			gm.set(fbUserId + '.lastEliteGuard', 0);
			queue.insert(
				[task.goTo, cage.page.keep.subpage.eliteGuard], 
				[task.eliteguard.work]
			);
			if (user.army === null) {
				queue.insert([task.getUserID]);
			}
		}
		queue.idle();
	},
	work : function () {
		if (getX(eliteguard.xpath.guards, document, xpath.unordered).snapshotLength < 11) {
			var guards = getX(eliteguard.xpath.guards, document, xpath.unordered);
			var guardsList = '';
			for (var i = 0; i < guards.snapshotLength; i++) {guardsList += guards.snapshotItem(i).nodeValue + '\n';}
			var eliteguardUserID = user.army.shift();
			var loader = document.getElementById('app46755028429_AjaxLoadIcon');
			if (guardsList.search(eliteguardUserID) === -1) {
				loader.style.display = 'block';
				var req = new XMLHttpRequest();  
				req.open('GET', eliteguard.vars.addGuardLink + eliteguardUserID, false);  
				req.send(null);  
				if(req.status == 200) {
					if (req.responseText.match('Elite Guard is FULL') === null) {
						mclick(getX(eliteguard.xpath.link, document, xpath.first));
					}
				}
				loader.style.display = 'none';
			}
			queue.insert([task.eliteguard.work]);
			if (user.army.length === 0) {
				user.army = null;
				queue.insert(
					[task.getUserID],
					[task.goTo, cage.page.keep.subpage.eliteGuard]
				);
			}
		} else {
				user.lastEliteGuard = new Date().getTime();
				gm.set(fbUserId + '.lastEliteGuard', user.lastEliteGuard.toString());
		}
		queue.idle();
	},
	stop : function() {}
};
var income = {
	vars : {
		general : null
	},
	xpath : {},
	start: function() {
		if (cage.generals['Mercedes']) {
			income.vars.general = 'Mercedes';
		} else if (cage.generals['Cid']) {
			income.vars.general = 'Cid';
		}
		if (income.vars.general !== null) {
			queue.insert(
				[task.setGeneral.start, income.vars.general],
				[task.income.work]
			);
		}
		queue.idle();
	},
	work : function() {
		if (stats.gold.timer() < 60000) {
			queue.insert([task.income.work]);
		} else {
			queue.insert([task.income.stop]);
		}
		queue.idle();
	},
	stop : function() {
		income.vars.general = null;
		timerIncome();
		queue.idle();
	}
};
var heal = {
	vars : {
		link : 'http://apps.facebook.com/castle_age/keep.php?action=heal_avatar&bqh='
	},
	xpath : {
		healthValue: 'id("app46755028429_health_current_value")',
	},
	start: function() {
		if (user.autoHeal === true && stats.health.current() < 1000) {queue.insert([task.heal.work]);}
		queue.idle();
	},
	work : function() {
		var req = new XMLHttpRequest();  
		req.open('GET', heal.vars.link + cage.bqh.keep, false);  
		req.send(null);  
		if(req.status == 200) { 
			db('healed');
			getX(heal.xpath.healthValue, document, xpath.first).innerHTML = stats.health.max();
		} else {
			db('heal error');
		}
		queue.idle();
	},
	stop : function() {}
};
var acceptGift = {
	vars : {
		forfeit : 'army.php?act=acpt&uid=all',
		requests : 'http://www.facebook.com/reqs.php#CAAP',
		homepage : 'http://apps.facebook.com/castle_age/index.php#NOGIFTS'
	},
	xpath : {
		acceptCastleAge : '//a[@href="http://www.facebook.com/reqs.php#confirm_46755028429_0"]',
		acceptId: '//a[@href="http://www.facebook.com/reqs.php#confirm_46755028429_0"]/parent::div/preceding-sibling::div/a/@href',
		acceptFacebook : '//input[@id="params[from_id]" and @value="<FACEBOOK>" and ./following-sibling::input[@value="46755028429"]]/following-sibling::input[@type="submit" and not(@name="actions[reject]")]',
		forfeit  : '//a[.="Accept All"]',
		armybutton : '//a[contains(@href,"army.php") and ./img[contains(@src,"invite")]]'
	},
	start : function(onReqPage) {
		if (onReqPage === true) {
			acceptGift.xpath.acceptFacebook = acceptGift.xpath.acceptFacebook.replace('<FACEBOOK>', window.location.hash.match(/\d+/).toString());
			if (getX(acceptGift.xpath.acceptFacebook, document, xpath.first) !== null) {
				getX(acceptGift.xpath.acceptFacebook, document, xpath.first).click();
			} else {
				window.location.href = acceptGift.vars.homepage;
			}
		} else {
			queue.insert(
				[task.goTo, cage.page.army],
				[task.acceptGift.work]
			);
			queue.idle();
		}
	},
	work : function() {
		if (window.location.hash !== '#NOGIFTS') {
			if (getX(acceptGift.xpath.acceptCastleAge, document, xpath.first) !== null) {
				user.lastGiftId = getX(acceptGift.xpath.acceptId, document, xpath.string).match(/\d+/);
				GM_log(user.lastGiftId);
				gm.set(fbUserId + '.lastGiftId', gm.get(fbUserId + '.lastGiftId', '') + '#' + user.lastGiftId.toString());
				gm.set('caap.reload', true);
				window.location.href = acceptGift.vars.requests + user.lastGiftId;
			}
		} else {
			window.location.hash = '';
			gm.clear(fbUserId + '.lastGiftId'); 
			queue.insert([task.acceptGift.stop]);
		}
		queue.idle();
	},
	stop : function() {
		if (getX(acceptGift.xpath.forfeit, document, xpath.first) !== null) {
			var button = getX(acceptGift.xpath.armybutton, document, xpath.first);
			button.setAttribute('onclick', button.getAttribute('onclick').replace(/army.php/, acceptGift.vars.forfeit));
			mclick(button);
		}
		queue.idle();
	}
};
var sendGift = {
	vars : {},
	xpath : {
		receiver : '//div[@class="unselected_list"]/label[@class="clearfix" and ./input[@value="<ID>"]]',
		startSend : '//div[contains(@style,"giftpage_back.jpg")]//input[@id="send"]',
		sendIt : '//input[@name="sendit"]'
	},
	start: function() {
		if (gm.get(fbUserId + '.lastGiftId', null) !== null) {
			queue.insert([task.sendGift.work]);
			if (checkForPage(cage.page.gift) !== true) {
				queue.insert([task.goTo, cage.page.gift]);
			}
		}
		queue.idle();
	},
	work : function() {
		if (gm.get(fbUserId + '.lastGiftId', null) !== null) {
			var ids = gm.get(fbUserId + '.lastGiftId', null).split('#');
			for (var id in ids) {db('>>' +ids[id]);
				var receiver = getX(sendGift.xpath.receiver.replace('<ID>', ids[id]) , document, xpath.first);
				if (receiver !== null) {
					mclick(receiver);
				}
			}
			gm.clear(fbUserId + '.lastGiftId'); 
			queue.insert([task.sendGift.work]);
		} else {
			getX(sendGift.xpath.startSend, document, xpath.first).click();
			queue.insert([task.sendGift.stop]);
		}
		queue.idle();
	},
	stop : function() {
	var send = getX(sendGift.xpath.sendIt, document, xpath.first);
		if (send !== null) {
			send.click();
			gm.set('caap.reload', true);
		} else {
			queue.insert([task.sendGift.stop]);
		}
		queue.idle();
	}
};
var setGeneral = {
	vars : {},
	xpath : {
		general : '//div[@id="app46755028429_equippedGeneralContainer"]',
		name : './/div[@class="general_name_div3"]',
		image : './/div[@class="general_pic_div3"]//img',
		attack : './/div[@class="generals_indv_stats"]/div[position()=1]',
		defense : './/div[@class="generals_indv_stats"]/div[position()=2]'
	},
	start: function(general) {
		if (general == 'Not Level 4') {
			var notMaxGeneral = null;
			for (var lowLevel in  cage.generals) {
				if (parseInt(cage.generals[lowLevel].level)< 4) {
					notMaxGeneral = lowLevel;
					break;
				}
			}
			if (notMaxGeneral === null) {
				general =  user.generalIdle;
			} else {
				general = notMaxGeneral;
			}
		}
		queue.insert([task.setGeneral.work, general]);
		queue.idle();
	},
	work : function(general) {
		var req = new XMLHttpRequest();  
		req.open('GET', 'http://apps.facebook.com/castle_age/generals.php?&item=' + cage.generals[general].item + '&itype=' + cage.generals[general].type, false);  
		req.send(null);  
		if (req.status == 200) {
			cage.activeGeneral = general;
			var current = getX(setGeneral.xpath.general , document, xpath.first);
			getX(setGeneral.xpath.name , current, xpath.first).innerHTML = general;
			getX(setGeneral.xpath.image , current, xpath.first).src = cage.generals[general].path;
			getX(setGeneral.xpath.attack , current, xpath.first).innerHTML = cage.generals[general].attack;
			getX(setGeneral.xpath.defense , current, xpath.first).innerHTML = cage.generals[general].defense;
		} else {
			db('sG error');
		}
		queue.idle();		
	},
	stop : function() {
		
	}
};
var getGenerals = {
	vars : {

	},
	xpath : {
		generals : '//div[@id="app46755028429_generalContainerBox2"]',
		name : './/div[@class="general_name_div3"]/div/text()',
		image : './/div[@class="general_pic_div3"]//input[@class="imgButton"]/@src',
		item : './/input[@name="item"]/@value',
		type : './/input[@name="itype"]/@value',
		level : './/div[contains(text(),"Level ")]',
		attack : './/div[@class="generals_indv_stats"]/div[position()=1]',
		defense : './/div[@class="generals_indv_stats"]/div[position()=2]'
	},
	start: function() {
		queue.insert([task.getGenerals.work]);
		if (checkForPage(cage.page.generals) === false) {queue.insert([task.goTo, cage.page.generals]);}
		queue.idle();	
	},
	work : function() {
		var generalIdleDropdown = document.getElementById(caap.name.generalIdle + 'Select');
		var generalBattleDropdown = document.getElementById(caap.name.generalBattle + 'Select');
		var generalSubquestDropdown = document.getElementById(caap.name.generalSubquest + 'Select');
		var generals = [];
		var parent = xp.first(getGenerals.xpath.generals, document);
		var generalsNames = xp.list(getGenerals.xpath.name, parent);
		var generalsPics = xp.list(getGenerals.xpath.image, parent);
		var generalsItems= xp.list(getGenerals.xpath.item, parent);
		var generalsTypes= xp.list(getGenerals.xpath.type, parent);
		var generalsLevels= xp.list(getGenerals.xpath.level, parent);
		//var generalsAttack= xp.list(getGenerals.xpath.attack, parent);
		//var generalsDefense= xp.list(getGenerals.xpath.defense, parent);
		generalIdleDropdown.options.length = null;
		generalIdleDropdown.value = null;
		generalBattleDropdown.options.length = null;
		generalBattleDropdown.value = null;
		generalSubquestDropdown.options.length = null;
		generalSubquestDropdown.value = null;
		generalBattleDropdown.add(new Option('Not Level 4', 'Not Level 4'), null);
		generalSubquestDropdown.add(new Option('Not Level 4', 'Not Level 4'), null);
		for (var gn = 0; gn < generalsNames.snapshotLength; gn++) {
			generals.push(
				generalsNames.snapshotItem(gn).nodeValue.trim() + '~' + 
				generalsPics.snapshotItem(gn).nodeValue.trim() + '~' + 
				generalsItems.snapshotItem(gn).nodeValue.trim() + '~' + 
				generalsTypes.snapshotItem(gn).nodeValue.trim() + '~' +
				generalsLevels.snapshotItem(gn).innerHTML.match(/\d/)[0] // + '~' + 
				//generalsAttack.snapshotItem(gn).innerHTML.trim() + '~' + 
				//generalsDefense.snapshotItem(gn).innerHTML.trim()
			);
		}
		generals.sort();
		for (var g = 0; g < generals.length; g++) {
			var values = generals[g].split('~')
			var name = values[0];
			cage.generals[name] = {
				path : values[1],
				item : values[2],
				type : values[3],
				level : values[4]
				//attack : values[5]
				//defense : values[6]
			};
			generalIdleDropdown.add(new Option(name, name, (name === user.generalIdle) ? true : false), null);
			generalBattleDropdown.add(new Option(name, name, (name === user.generalBattle) ? true : false), null);
			generalSubquestDropdown.add(new Option(name, name, (name === user.generalSubquest) ? true : false), null);
		}
		if (checkForGeneral(user.generalIdle) === false) {
			user.generalIdle = generalIdleDropdown.options[0].value;
		}
		if (checkForGeneral(user.generalBattle) === false) {
			user.generalBattle = generalBattleDropdown.options[0].value;
		}
		if (checkForGeneral(user.generalSubquest) === false) {
			user.generalSubquest = generalSubquestDropdown.options[0].value;
		}
		gm.set(fbUserId + '.generalIdle', user.generalIdle);
		gm.set(fbUserId + '.generalBattle', user.generalBattle);
		gm.set(fbUserId + '.generalSubquest', user.generalSubquest);
		if (cage.generals['Aeris']) {caap.status.aeris = true;}
		cage.activeGeneral = getGeneralNameByImage();
		queue.idle();	
	},
	stop : function() {
		
		queue.idle();	
	}
};

// debug

function db(msg) {
	if (debugMode === true) {
		GM_log(msg);
		document.getElementById('debugtxt').innerHTML += msg + '\n';
	}
}
function debugmenu() {
	// DEBUGDIV ////////////////////////////////////////////
	var debugdiv = document.getElementById('sidebar_ads');
	debugdiv.innerHTML = '<input id="debugclear" type="button" name="clear" value="clear">';
	debugdiv.innerHTML += '<input id="1" type="button" name="1" value="gUI">';
	debugdiv.innerHTML += '<input id="2" type="button" name="2" value="gM">';
	debugdiv.innerHTML += '<input id="3" type="button" name="3" value="heal">';
	debugdiv.innerHTML += '<br><label>Job <input id="currentjob" type="input" name="currentjob" value="" size="20"></label>';
	debugdiv.innerHTML += '<textarea id="debugqueue" name="debugqueue" cols="30" rows="10" readonly="readonly"></textarea>';
	debugdiv.innerHTML += '<textarea id="debugtxt" name="debugtxt" cols="30" rows="20" readonly="readonly"></textarea>';

	document.getElementById('debugclear').addEventListener('click', function (e) {
		document.getElementById('debugtxt').innerHTML = "";
	},
	false);
	document.getElementById('1').addEventListener('click', function (e) {
		queue.add(task.getUserID);
	},
	false);
	document.getElementById('2').addEventListener('click', function (e) {
		queue.add(task.getMonster.start);
	},
	false);
	document.getElementById('3').addEventListener('click', function (e) {
		queue.add(task.heal.start);
	},
	false);
	// DEBUGDIV ////////////////////////////////////////////
}

document.addEventListener('error', function () {
	gm.set('caap.reload', true);
	window.location.href = cage.homepage;
}, false);

window.addEventListener('load', function () {

	if (window.location.href.match(/apps.*castle_age/) !== null) { GM_log('Castle Age');
		if (debugMode === true && document.getElementById('sidebar_ads') !== null) {
			debugmenu();
		} else {
			debugMode = false;
		}
		//start
		init();
	} else if (window.location.hash.match('#CAAP') !== null) { GM_log('Facebook');
		acceptGift.start(true);
	}
	
}, false);