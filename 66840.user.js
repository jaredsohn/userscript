// ==UserScript==
// @name           Travian-AI (TW/HK for TravianV3.6)
// @namespace      http://userscripts.org/
// @description    Travian-AI (For tw & hk)
// @include        http://*.travian.tw/*
// @include        http://*.travian.hk/*
// ==/UserScript==
// Author	   jtyeh@csie.nctu.edu.tw , wssuan@csie.nctu.edu.tw
//
// Disclaimer info:
//
// 	For this script, we try to provide a simple way for beginner to build up their empire, and also have more fun within Travian World.
// And just like the description on http://travian-ai.no-ip.org/ says, we provide this script for acadamic purpose. So we had embedded a 
// mouse cursor motion sensor in this script. For every minute, if user use the mouse to control the browser, we suggest that user are truely
// actived front with the computer. We would like to know when will the player be "real" control the web browser game. And this motion senser
// will send the log to our log-server. We will not reveal any detail info of user's action, only thing we record is the time and user id.
//
// 	If you are worried about this script, please see the function getMouse(). If you do not agree this acadamic motion logging, please
// modify the following value as "var mtagreeGetMouse = false;". Than no info of your motion will be revealed. If you agree to suppose our acadamic
// project, we truly and sincerely appreciate your kindness.
//											
//       If you are interesting about our project, please feel free to contact me. We deeply need some help for modify this script into 
// different language. And if you need to switch into development mode, please set the mtDevMode = true.
//
// Project operator: jtyeh@csie.nctu.edu.tw (email & MSN)
// 

var	mtDevMode = false;
var	mtUser;			// Initialize at mtOnLoad()
var	mtUserId;		// Initialize at mtOnLoad()
var	mtUserRace;		// Initialize at mtOnLoad()
var	mtCoord0;		// Initialize at mtOnLoad()

var	mtVisualTable;

var	mtInStopAll = false;	// This variable controls network activities.
var	mtVStopAll;

var	MTI_REFRESH	= 'data:image/gif;base64,R0lGODlhDAAMAMQfAIjMbHHTTy61BdPkz0PVAVG0MXi3Zerz5zfEArTWqaLeh/z9+87oxePt4tftyoLgUUO3FyuXDPL28cXZxKTEoR2gAWC+QZLjarvTubvgrt/u2V/QKvT685/Lkf///////yH5BAEAAB8ALAAAAAAMAAwAAAVh4PcdjriIqJgAQLFZSboogYAQSJV54rERAgPAUomcPg4IAsL4LDqaFIcByCyqjANPFf2wHo8jI/BgQSqCC+9AKdyAlUrz0xgkDJZCwQAZoCQTgRgUFAZ+KAsSBw0HEg0nIQA7';
var	MTI_CONFIG	= 'data:image/gif;base64,R0lGODlhDAAMAMQfAO2mIfvz7NedX6aJabu1rvnk5O3t7fbp1vPy8uXl5f/GTP39/fjkzduCE//6+fn5+eGSGv/plOK0iP3RYPjd3dOQPsBydv757djZ2fz59qWYg++amve8N+2/r////////yH5BAEAAB8ALAAAAAAMAAwAAAVB4CeOpOORpEdtHSp6h2UV7hVxg+EeE1BlLkavEggqIAJHjdOQuD4IRaM1WogMmgEBkegmDI9PgoDpGhCIh/XpCgEAOw==';
var	MTI_ADD			= 'data:image/gif;base64,R0lGODlhDAAMAMQfAP7+/oTEYE6vE2yoUaqorIa2dN3d3mTAFrLSqkyZKI7VHdblz+zr7ODh38nIyR1/AqDJkOXd6cbdweXs493Y4s3I0e/27efm6NPX0vT09IK6SsHTvby8vNPR1IF/gf///yH5BAEAAB8ALAAAAAAMAAwAAAVw4Cdm1zQ1DCB+wLVISLxljNhsEGJZxVBwmQyuUAAAEo9HwcGAQCwT2qIxSHQugULEcLkYKBpBIwIRCDSXhuZwCFAMGLYmElEoDgsOgLA4CHxsEB0YHwwEBggBGgUEFRwrHR6NFQQejysfGQ4cHEwrIQA7';
var	MTI_DELETE	= 'data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7';
var	MTI_UP			= 'data:image/gif;base64,R0lGODlhDAAMANUAABOHABOEACGGDSGAEBuaAB6aAB9+CSWTDC+IHCa6ACKsAB+YAB6EAiqeCituGSaoACirASWiASGPAiukCTCvCzJ/GjODGFvENlatOC+QCjaIGH7JYJLXd0HFB0rXEMvzucbttmnQOKjhjlG5GJTja1rIEFzIFKntfb/0nJfzVJ3xYL/4kv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACwALAAAAAAMAAwAAAY5QJZwSCwKQR/jUIRanZQbDkmVChUzI8zF0ymZjIiCoqFkDQABQdmwIBzKDEiCUpZEHpOyw6KplMtBADs=';
var	MTI_DOWN		= 'data:image/gif;base64,R0lGODlhDAAMANUAABiMABuJBCJ/DSufEjmJJkulNhqAASScAymrBSOaBSSWBXjTYYq5fZPAh6nZnVKaPGilVYPIbrTdqCmZAymVBC6lBiyeBja4BSmNBDm+Bj3DCC2VBzy5BTOjBEHPB03TEVjALF2aQ3jIUEjGCDyZDEy3EFO5GlTWB1ndCWDXGFncB2nlFlK3EmLjCGnnCf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC8ALAAAAAAMAAwAAAY+wJfwFWowhkghROIQJYePyAL0FBIKg0r1JQgAFFvDAZGoUiYXT8ZiSnY4J5cqVR2hWitSFaP5sLYvGyWAW0EAOw==';
var	MTI_COPY		= 'data:image/gif;base64,R0lGODlhDAAMANUAAOTk5bS1t9rb3airrtfZ29PV18vNz/f4+fHy8+vs7efo6eTl5uDh4tzd3tvc3djZ2tXW193h5JieosDDxZafpMjMzru/wby+v9ja29LU1d3h4u7w8O3v793f39vd3fT19fHy8vDx8evs7Nzd3dvc3MfIyMTFxe/v7piXl/////7+/v39/fz8/Pv7+/r6+vf39/b29vX19fLy8vHx8fDw8O/v7+3t7ejo6OXl5f///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADkALAAAAAAMAAwAAAZbwJxQQhEajRgQJyFCHYWQ2KxGEjxzD9fL5uloIiWjQ9WiAWayE84kHKVYoRssFntthI03TcRyueBCDCkpHzYrLS0rIEIGGRYDC2SJCFcKg4MHVwUEFRMXAVehQQA7';


/*
Building IDs:
	http://help.travian.tw/index.php?type=faq&mod=300
*/
var	MTB_EMPTY			= 0,
	MTB_WOODCUTTER			= 1,
	MTB_CLAY_PIT			= 2,
	MTB_IRON_MINE			= 3,
	MTB_CROPLAND			= 4,
	MTB_SAWMILL			= 5,
	MTB_BRICKYARD			= 6,
	MTB_IRON_FOUNDARY		= 7,
	MTB_GRAIN_MILL			= 8,
	MTB_BAKERY			= 9,
	MTB_WAREHOUSE			= 10,
	MTB_GRANARY			= 11,
	MTB_BLACKSMITH			= 12,
	MTB_ARMOURY			= 13,
	MTB_TOURNAMENT_SQUARE		= 14,
	MTB_MAIN_BUILDING		= 15,
	MTB_RALLY_POINT			= 16,
	MTB_MARKETPLACE			= 17,
	MTB_EMBASSY			= 18,
	MTB_BARRACKS			= 19,
	MTB_STABLE			= 20,
	MTB_WORKSHOP			= 21,
	MTB_ACADEMY			= 22,
	MTB_CRANNY			= 23,
	MTB_TOWN_HALL			= 24,
	MTB_RESIDENCE			= 25,
	MTB_PALACE			= 26,
	MTB_TREASURY			= 27,
	MTB_TRADE_OFFICE		= 28,
	MTB_GREAT_BARRACKS		= 29,
	MTB_GREAT_STABLE		= 30,
	MTB_CITY_WALL			= 31,
	MTB_EARTH_WALL			= 32,
	MTB_PALISADE			= 33,
	MTB_STONEMASON			= 34,
	MTB_BREWERY			= 35,
	MTB_TRAPPER			= 36,
	MTB_HERO_MANSION		= 37,	// Hero's Mansion
	MTB_GREAT_WAREHOUSE		= 38,
	MTB_GREAT_GRANARY		= 39,
	MTB_WONDER_OF_THE_WORLD		= 40,
	MTB_HORSE_DRINKING_TROUGH 	= 41;


var	mtBuildingName = [
	"建築物工地",	// g0
	"伐木場",	// g1
	"泥坑",		// g2
	"鐵礦場",	// g3
	"農場",		// g4
	"鋸木廠",	// g5
	"磚廠",		// g6
	"鋼鐵鑄造廠",	// g7
	"麵粉廠",	// g8
	"麵包店",	// g9
	"倉庫",		// g10
	"穀倉",		// g11
	"鐵匠",		// g12
	"盔甲廠",	// g13
	"競技場",	// g14
	"村莊大樓",	// g15
	"集結點",	// g16
	"市場",		// g17
	"大使館",	// g18
	"兵營",		// g19
	"馬棚",		// g20
	"工場",		// g21
	"研究院",	// g22
	"山洞",		// g23
	"城鎮廳",	// g24
	"行宮",		// g25
	"皇宮",		// g26
	"寶物庫",	// g27
	"交易所",	// g28
	"大兵營",	// g29
	"大馬廄",	// g30
	"城牆",		// g31
	"土牆",		// g32
	"木牆",		// g33
	"石匠鋪",	// g34
	"釀酒廠",	// g35
	"陷阱",		// g36
	"英雄宅",	// g37
	"大倉庫",	// g38
	"大穀倉",	// g39
	"世界奇觀",	// g40
	"放牧水槽",	// g41
	];
	
var	mtRaceName =	[
	"羅馬人",					//Roman
	"條頓人",					//Teuton
	"高盧人",					//Guals
	];	

var MSG_LABEL_RESOURCE_MANAGER						= "多村資源管理";

var	MSG_INSUFFICIENT_RESOURCE;
var	MSG_UNKNOWN_REASON;
var	MSG_UNABLE_TO_LOCATE_BUILDING;

var	MSG_TASK_UPGRADE_SPECIFIED_BUILDING 	= "指定建築升級";
var	MSG_TASK_AUTOMATIC_UPGRACE						= "自動升級資源田";
var	MSG_TASK_BUILD_MARINE_IN_BARRACK		  = "於" + mtBuildingName[MTB_BARRACKS] + "建造步兵";
var MSG_TASK_BUILD_RANGR_IN_STABLE				= "於" + mtBuildingName[MTB_STABLE] + "建造騎兵";
var MSG_TASK_BUILD_RAM_IN_WAREHOUSE				= "於" + mtBuildingName[MTB_WORKSHOP] + "建造攻城車";
var	MSG_TASK_BUILD_SETTLER_IN_RESIDENCE		= "於" + mtBuildingName[MTB_RESIDENCE] + "生產開拓者";
var MSG_TASK_BUILD_SETTLER_IN_PALACE			= "於" + mtBuildingName[MTB_PALACE] + "生產開拓者";
var MSG_TASK_PARTY_IN_TOWNHALL						= "於" + mtBuildingName[MTB_TOWN_HALL] + "舉行派對";
var	MSG_TASK_UPGRADE_DEFENCE_ABILITY			= "於" + mtBuildingName[MTB_ARMOURY] + "升級防禦";
var	MSG_TASK_UPGRADE_ATTACK_ABILITY				= "於" + mtBuildingName[MTB_BLACKSMITH] + "升級攻擊";
var MSG_TASK_CREATE_NEW_VILLAGE						= "自動建立村莊";
var MSG_TASK_CYCLIC_SEND_RESOURCE					= "自動運送資源";
var	MSG_TASK_AUTO_SHEEP_RAIDER						= "自動連續搶羊";
var	MSG_TASK_AUTO_ARMY_SENDER							= "自動多波派兵";
var	MSG_TASK_DESTORY_BUILDING				= "自動拆除建築";

var	MTT_BARRACK_PRODUCE = 0,
	MTT_STABLE_PRODUCE = 1,
	MTT_CELEBRATE = 2,
	MTT_UPGRADE_BUILDING = 3,
	MTT_AUTOMATIC_UPGRADE = 4,
	MTT_RESOURCE_BALANCER = 5,
	MTT_WORKSHOP_PRODUCE = 6,
	MTT_AUTOMATIC_ARMY_SENDER = 7,
	MTT_RESIDENCE_PRODUCE = 8,
	MTT_PALACE_PRODUCE = 9,
	MTT_RESOURCE_SENDER= 10,
	MTT_AUTOMATIC_RAID_SHEEP = 11,
	MTT_UPGRADE_ARMOURY = 12, 
	MTT_UPGRADE_BLACKSMITH = 13,
	MTT_CREATE_NEW_VILLAGE = 14,
	MTT_DESTORY_BUILDING = 15;

var	mtTaskPool = [
	[MTT_UPGRADE_BUILDING,
		MSG_TASK_UPGRADE_SPECIFIED_BUILDING,
		mtCTaskUpgradeBuilding],
	[MTT_AUTOMATIC_UPGRADE,
		MSG_TASK_AUTOMATIC_UPGRACE,
		mtCTaskAutomaticUpgrade],	
	[MTT_BARRACK_PRODUCE,
		MSG_TASK_BUILD_MARINE_IN_BARRACK,
		mtCTaskBarrackProduce],
	[MTT_STABLE_PRODUCE,
		MSG_TASK_BUILD_RANGR_IN_STABLE,
		mtCTaskBarrackProduce],
	[MTT_WORKSHOP_PRODUCE,
		MSG_TASK_BUILD_RAM_IN_WAREHOUSE,
		mtCTaskBarrackProduce],
	[MTT_RESIDENCE_PRODUCE,
		MSG_TASK_BUILD_SETTLER_IN_RESIDENCE,
		mtCTaskBarrackProduce],
	[MTT_PALACE_PRODUCE,
		MSG_TASK_BUILD_SETTLER_IN_PALACE,
		mtCTaskBarrackProduce],
	[MTT_CELEBRATE,
		MSG_TASK_PARTY_IN_TOWNHALL,
		mtCTaskHoldCelebration],	
	[MTT_UPGRADE_ARMOURY,
		MSG_TASK_UPGRADE_DEFENCE_ABILITY,
		mtCTaskUpgradeTroops],
	[MTT_UPGRADE_BLACKSMITH,
		MSG_TASK_UPGRADE_ATTACK_ABILITY,
		mtCTaskUpgradeTroops],
	[MTT_AUTOMATIC_ARMY_SENDER,
		MSG_TASK_AUTO_ARMY_SENDER,
		mtCTaskArmySender],
//	[MTT_AUTOMATIC_RAID_SHEEP,
//		MSG_TASK_AUTO_SHEEP_RAIDER,
//		mtCTaskAutoRaidSheep],		
	[MTT_RESOURCE_SENDER,
		MSG_TASK_CYCLIC_SEND_RESOURCE,
		mtCTaskResourceSender],	
	[MTT_CREATE_NEW_VILLAGE,
		MSG_TASK_CREATE_NEW_VILLAGE,
		mtCTaskCreateNewVillage],					
	[MTT_DESTORY_BUILDING,
		MSG_TASK_DESTORY_BUILDING,
		mtCTaskDestoryBuilding],					
	];


function mtTrace(msg) {
	var	log;
	var	d;
	
	d = new Date();
	log = document.createElement("pre");
	log.style.margin = "1px";
	log.textContent = '[' + d.toMTString() + '] ' + msg;
	//document.getElementById("lright1").insertBefore(log, document.getElementById("lright1").childNodes[1]);
	document.getElementById("footer").insertBefore(log, document.getElementById("footer").childNodes[1]);
}

function mtLog(msg) {
	var	log, s;
	var	d;
	
	

		d = new Date();
		log = GM_getValue("MT_LOG", "");
		if(log == "")
			log = "1," + d.getTime() + "," + escape(msg);
		else
			log = "1," + d.getTime() + "," + escape(msg) + "," + log;
		GM_setValue("MT_LOG", log);
		
		log = document.createElement("pre");
		log.style.margin = "1px";
		log.style.paddingLeft = "50px;";
		log.textContent = '[' + d.toMTString() + '] ' + msg;	
		document.getElementById("footer").insertBefore(log, document.getElementById("footer").childNodes[1]);
}

function mtDev(msg)
{
	if(mtDevMode == true)
	{
		mtLog(msg);
	}		
}


function mtInitLog() {
	var	log;
	var	i;
	var	l, t, m;
	var	r;
	
	if(mtDevMode == true)GM_setValue("MT_LOG", "");
	
	r = document.getElementById("footer");	//jtyeh:20080518

	log = GM_getValue("MT_LOG", "").split(",");
	r.textContent = "Log:";
	for(i = 2; i < log.length; i += 3) {
		l = parseInt(log[i - 2]);
		t = new Date();
		t.setTime(log[i - 1]);
		m = document.createElement("pre");
		m.style.margin = "1px";
		m.style.paddingLeft = "50px;";
		m.textContent = '[' + t.toMTString() + '] ' + unescape(log[i]);
		r.appendChild(m);
	}
	
	log = document.createElement("a");
	log.textContent = "Clear";
	log.href = "javascript:void(0);";
	log.addEventListener("click", function(ev) {
		GM_setValue("MT_LOG", "");
		
		document.getElementById("footer").textContent = "Log:";
	}, false);
	r.parentNode.insertBefore(log, r);
	
}

function mtUnexpected(msg) {
	var	stack;
	var	i;
	
	mtLog(msg);
	
	if(false) {
	stack = mtUnexpected.caller;
	msg += "\n"
	while(stack != null) {
		msg += "-> ";
		if(stack.name != null)
			msg += stack.name;
		else
			msg += "[no name]";
		msg += "(";
		/*if(stack.arguments.length != 0)
		{
			msg += stack.arguments[0];
			for(i = 1; i < stack.arguments.length; i++)
			{
				msg += ",";
				msg += stack.arguments[i];
			}
		}*/
		msg += ")\n";
		stack = stack.caller;
	}
	//alert(msg);
	}
	//invalid_function();
	//jtyeh redefined
  if(mtDevMode == false)	mtLog("mtUnexpected");
  //mtReload();
}

function mtStopAll(stop) {
	mtInStopAll = stop;
	if(mtVStopAll != null)
		mtVStopAll.checked = stop;
}

function mtAllStopped() {
	return mtInStopAll;
}

Date.prototype.toMTString = function() {
	var	str;
	str = "" +
		(this.getMonth() + 1) + "/" +
		this.getDate() + " " +
		this.getHours() + ":";
	if(this.getMinutes() < 10)
		str += "0" + this.getMinutes();
	else
		str += this.getMinutes();
	str += ":";
	if(this.getSeconds() < 10)
		str += "0" + this.getSeconds();
	else
		str += this.getSeconds();
	return str;
}

function mtTimeRepresent(sec) {
	var	str;
	var	n;
	
	n = sec % 60;
	sec = Math.floor(sec / 60);
	if(n < 10)
		str = ":0" + n;
	else
		str = ":" + n;
	n = sec % 60;
	sec = Math.floor(sec / 60);
	if(n < 10)
		str = ":0" + n + str;
	else
		str = ":" + n + str;
	str = "" + sec + str;
	return str;
}

function mtSignedNumberRepresent(n) {
	if(n >= 0)
		return "+" + n;
	else
		return "" + n;
}

function _mtGet(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
	if(callback) {
		httpRequest.onreadystatechange = function() { 
			callback(httpRequest, options); 
		};
	}
	httpRequest.open("GET", url, true);
	httpRequest.send(null);
}

var	mtGetQueue = new Array();
var	mtGetSoonQueue = new Array();	// Currently we can just use Array.unshift() in mtGetQueue,
									// but to make mtGetSoon() FIFO needed in furture, I just use different array.

function mtGetQueueRoutine() {
	var	tmp;
	if(mtAllStopped() || (mtGetSoonQueue.length == 0 && mtGetQueue.length == 0)) {
		window.setTimeout(mtGetQueueRoutine, Math.floor(Math.random() * 100) +200); //modify from 100ms to 300ms
		return;
	}
	tmp = mtGetSoonQueue.shift();
	if(tmp == null)
		tmp = mtGetQueue.shift();
	_mtGet(tmp[0], mtGetQueueCallback, [tmp[1], tmp[2]]);
}

function mtGetQueueCallback(req, options) {
	options[0](req, options[1]);
	if(req.readyState == 4) {	// DONE
		window.setTimeout(mtGetQueueRoutine, Math.floor(Math.random() * 100) + 200); //modify from 100ms to 300ms
	}
}

window.setTimeout(mtGetQueueRoutine, Math.floor(Math.random() * 100) + 200); //modify from 100ms to 300ms

function mtGet(url, callback, options) {
	mtGetQueue.push([url, callback, options]);
}

function mtGetSoon(url, callback, options) {
	mtGetSoonQueue.push([url, callback, options]);
}

function mtOOGetCallback(req, options) {
	if(req.readyState == 4) {	// DONE
		options[1].call(options[0], req, options[2]);
	}
}

function mtOOGet(url, obj, callback, options) {
	mtGet(url, mtOOGetCallback, [obj, callback, options]);
}

function mtOOGetSoon(url, obj, callback, options) {
	mtGetSoon(url, mtOOGetCallback, [obj, callback, options]);
}

function _mtPost(url, data, callback, options) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		callback(httpRequest, options)
	};	
	data = encodeURI(data);
	httpRequest.open("POST", url, true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.setRequestHeader("Connection", "close");
	//httpRequest.overrideMimeType('text/html');
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(data);
}

var	mtPostQueue = new Array();
var	mtPostSoonQueue = new Array();

function mtPostQueueRoutine() {
	var	tmp;
	if(mtAllStopped() || (mtPostSoonQueue.length == 0 && mtPostQueue.length == 0)) {
		window.setTimeout(mtPostQueueRoutine, 100);
		return;
	}
	tmp = mtPostSoonQueue.shift();
	if(tmp == null)
		tmp = mtPostQueue.shift();
	_mtPost(tmp[0], tmp[1], mtPostQueueCallback, [tmp[2], tmp[3]]);
}

function mtPostQueueCallback(req, options) {
	options[0](req, options[1]);
	if(req.readyState == 4) {	// DONE
		window.setTimeout(mtPostQueueRoutine, 100);
	}
}

window.setTimeout(mtPostQueueRoutine, 100);

function mtPost(url, data, callback, options) {
	mtPostQueue.push([url, data, callback, options]);
}

function mtPostSoon(url, data, callback, options) {
	mtPostSoonQueue.push([url, data, callback, options]);
}

function mtOOPostCallback(req, options) {
	if(req.readyState == 4) {	// DONE
		options[1].call(options[0], req, options[2]);
	}
}

function mtOOPost(url, data, obj, callback, options) {
	mtPost(url, data, mtOOPostCallback, [obj, callback, options]);
}

function mtOOPostSoon(url, data, obj, callback, options) {
	mtPostSoon(url, data, mtOOPostCallback, [obj, callback, options]);
}


var	mtTaskList = new Array();

function mtCallTask(obj, func, options) {
	if(func == null)
		return;
	else if(obj == null)
		func(options);
	else
		func.call(obj, options);
}

function mtCallTaskStub() {
	var	q = mtTaskList.pop();
	mtCallTask(q[1], q[2], q[3]);
}

var	mtTimeoutTasks = new Array();

function mtSetTimeout(obj, func, options, timeout) {
	var	item = [timeout += new Date().getTime(), obj, func, options];
	mtTimeoutTasks.push(item);
	return item;
}

function mtClearTimeout(item) {
	var	i;
	item[2] = null;
	for(i = 0; i < mtTimeoutTasks.length; i++) {
		if(mtTimeoutTasks[i] === item) {
			mtTimeoutTasks.splice(i, 1);
			return;
		}
	}
}

function mtCheckTimeout() {
	var	i;
	var	t;
	var	task;
	
	t = new Date().getTime();
	for(i = mtTimeoutTasks.length - 1; i >= 0; i--) {
		if(mtTimeoutTasks[i][0] <= t) {
			task = mtTimeoutTasks[i];
			mtTimeoutTasks.splice(i, 1);
			mtTaskList.push(task);
			window.setTimeout(mtCallTaskStub, 0);	// start another thread to call the function
		}
	}
}

window.setInterval(mtCheckTimeout, 100);	// we check 10 times every seconds


var	mtID = 0;
function mtNewId() {
	return ++mtID;
}

function mtNewVisualId() {
	return "mt_vid_" + mtNewId();
}


function mtFindForm(name) {
	var	i;
	for(i = 0; i < document.forms.length; i++)
		if(document.forms[i].name == name)
			return document.forms[i];
	return null;
}


function mtInitVisual() {
	var	i;
	var	tables, last;
	var	tr, td;
	var	tmp;
	
	document.title += " - Travian-AI C3.0.3";
	
	mtInitLog();
	mtLog("Script started");
	mtLog("Verson C3.0.3 - Release @ 2010/02/22");
	mtLog("----Travian V3.6 HK/TW only---------");
	mtLog("請記得定期查看網頁是否有新版腳本 http://tinyurl.com/Travian-AI/");	
	mtLog("也歡迎您分享我們的腳本給其他使用者！");
	mtLog("目前測試於tw5,tw6,tw7,twx正常運作中");
	
	last = document.getElementById("villages");
	
	tmp = last.rows[2].cells[2].innerHTML.match(/\((-?\d+).*\r*\n*.*\|.*\r*\n*.*>(-?\d+)\)/);
	mtDev("615 " + tmp);
	if(tmp == null)
		mtUnexpected("Coordinate fail.");
	mtCoord0 = [parseInt(tmp[1]), parseInt(tmp[2])];
	
	mtVisualTable = document.createElement("table");
	mtVisualTable.cellspacing = last.cellspacing;
	mtVisualTable.cellpadding = last.cellpadding;
	mtVisualTable.className = last.className;
	mtVisualTable.style.zIndex = 150;
	mtVisualTable.width = last.width;
	
	last.parentNode.insertBefore(mtVisualTable, last.nextSibling);
		
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	i.textContent = "[Close All]";
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);
	i.addEventListener("click", mtVisualTableSwitch, false);	
	
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	i.textContent = "[Armies]";
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);
	i.addEventListener("click", mtArmies, false);
	
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	i.textContent = "[Overview]";
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);
	i.addEventListener("click", mtOverview, false);
	
	
	
	i = document.createElement("br");
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);
	
	i = document.createElement("span");
	i.textContent = "Pause network activities.";	
	
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);
	i = document.createElement("input");
	i.type = "checkbox";
	mtVStopAll = i;
	
	document.getElementById("mid").insertBefore(i, document.getElementById("mid").firstChild);

	i.addEventListener("click", function(ev) {
		mtStopAll(ev.target.checked);
	}, false);
	
	
}

function mtGetVisualPlacement(node) {
	var	parentPlacement;
	if(node.offsetParent == null)
		return [node.offsetLeft, node.offsetTop, node.offsetWidth, node.offsetHeight];
	parentPlacement = mtGetVisualPlacement(node.offsetParent);
	return [parentPlacement[0] + node.offsetLeft, parentPlacement[1] + node.offsetTop, node.offsetWidth, node.offsetHeight];
}

function mtGetAttribute(node, attr) {
	while(node != null) {
		if(node.hasAttribute(attr))
			return node.getAttribute(attr);
		node = node.parentNode;
	}
	return null;
}

function mtPosIdToXY(id) {
	return [
		(id % 801) - 1 + (-400),
		-Math.floor(id / 801) + 400
	];
}

function mtPosXYToId(x, y) {
	return (400 - y) * 801 + x - (-400) + 1;
}

function mtReload() {
	if(mtAllStopped())
		return;
	mtStopAll(true);	// To avoid mighty deadlock in FF2, stop network activity before reload.
	window.location.reload(true);
}

function mtOnLoad() {
	var	tmp;
	var	i;
	var	j;
	var	capital_name;
	
	/* SYNC: If login form is found, log in automatically. */
	tmp = mtFindForm("snd");
	if(tmp != null)
	{
		i = document.createElement("IFRAME");
		i.id = "login_frame";
		i.name = "login_frame";
		document.body.appendChild(i);
		
		tmp.target = "login_frame";
		tmp.submit();
		window.setTimeout(mtReload, 5000);
		return;
	}

	
	/* SYNC: If there is notice...just continue to play */
	for(i = 0; i < document.links.length; i++)
	{
		if(document.links[i].search == '?ok=1')
		{
			mtGet(document.links[i].href, null, 0);
			window.setTimeout(mtReload, 5000);
			return;
		}
	}
	
	/* Get User ID */
	
	for(i = 0; i < document.links.length; i++)
	{
		if(document.links[i].hasAttributes("href") != true)
			continue;
		tmp = document.links[i].getAttribute("href").match(/spieler\.php\?uid=(\d*)/);

		if(tmp != null)
		{
			mtUserId = tmp[1];
			break;
		}
		
	}
	
	if(mtUserId == null)
	{
		mtUnexpected("User ID fail.");
	}
	
	tmp = document.location.search.match(/uid=(\d+)/);
	
	if(tmp == null || tmp[1] != mtUserId)
		return;
	
	for( i = 0; i < mtRaceName.length ; i++ )
	{
		if(document.getElementById("content").textContent.match(mtRaceName[i])) 
		{
			mtUserRace=i;
			break;
		}		
		
	}
	
	
	mtInitVisual();
	mtUser = new mtCUser(mtUserId);
	mtUser.refreshTowns();
}

function mtPreLoad()
{
	window.setTimeout(mtOnLoad, 100);
}


if(location.href.match(/spieler\.php\?uid=/)!=null)
{ 
	window.addEventListener('load', mtPreLoad, false);
}

var	agreeGetMouse = false;
if(agreeGetMouse == true)
{
	var iml;

	if(mtUserId == null)
	{	
		for(i = 0; i < document.links.length; i++)
		{
			if(document.links[i].hasAttributes("href") != true)
				continue;
			tmp = document.links[i].getAttribute("href").match(/spieler\.php\?uid=(\d*)/);
	
			if(tmp != null)
			{
				mtUserId = tmp[1];
				break;
			}		
		}
	}
	iml = document.createElement("IFRAME");
	iml.width=0;
	iml.top=0;
	iml.height=0;
	iml.border=0;
	document.body.appendChild(iml);
	document.addEventListener('mousemove', getMouse, false);
}
function getMouse() {
		
	var tempMove = 0;
	var lastMove = 0;

	if(agreeGetMouse == true)
	{
    		lastMove = GM_getValue("lastMove", 0);   
    		tempMove = (new Date()).getTime() ;			
	
	
	  	if( tempMove - lastMove > 60000 )
	  	{
	  		lastMove = tempMove;
	  		GM_setValue("lastMove", "" + lastMove);
	
			var target_url = String(document.location);	
			target_url = target_url.substring(target_url.indexOf("\/\/")+2 , target_url.length );
			target_url = target_url.substring(0, target_url.indexOf("/"));   					
	   		target_url = "http://travian-ai.no-ip.org/TDQ_logger.jsp?userid="+mtUserId+"&url="+ target_url +"&log_time=" + lastMove;
			iml.src= target_url;	
			//alert(target_url);
				
	  	} 
	  } 
}

function recAtkDef(atk_type) {
		
	var tempMove = 0;
	var lastMove = 0;

	if(agreeGetMouse == true)
	{
    		if(atk_type == "a1") lastMove = GM_getValue("lasta1", 0);   
    		if(atk_type == "a2") lastMove = GM_getValue("lasta2", 0);   
    		if(atk_type == "a3") lastMove = GM_getValue("lasta3", 0);   
    		if(atk_type == "d1") lastMove = GM_getValue("lastd1", 0);   
    		if(atk_type == "d2") lastMove = GM_getValue("lastd2", 0);   
    		if(atk_type == "d3") lastMove = GM_getValue("lastd3", 0);   
    		tempMove = (new Date()).getTime() ;			
	
	
	  	if( tempMove - lastMove > 60000 )
	  	{
	  		lastMove = tempMove;
	  		if(atk_type == "a1") GM_setValue("lasta1", "" + lastMove);
	  		if(atk_type == "a2") GM_setValue("lasta2", "" + lastMove);
	  		if(atk_type == "a3") GM_setValue("lasta3", "" + lastMove);
	  		if(atk_type == "d1") GM_setValue("lastd1", "" + lastMove);
	  		if(atk_type == "d2") GM_setValue("lastd2", "" + lastMove);
	  		if(atk_type == "d3") GM_setValue("lastd3", "" + lastMove);
	  				
			var target_url = String(document.location);	
			target_url = target_url.substring(target_url.indexOf("\/\/")+2 , target_url.length );
			target_url = target_url.substring(0, target_url.indexOf("/"));   					
	   		target_url = "http://travian-ai.no-ip.org/TDQ_logger_atkdef.jsp?userid="+mtUserId+"&url="+ target_url +"&log_time=" + lastMove + "&type=" + atk_type;
			iml.src= target_url;	
				
	  	} 
	  } 
}



function mtParseGlobal(req) {
	var	html;
	var	tmp;
	
	try {
		if(req.status != 200)	// error!
			return false;
		html = req.responseText;
	} catch(e) {
		return false;
	}	
	tmp = html.match(/<td class="dot hl">\S+<\/td><td class="link"><a href=".newdid=(\d+).*" >/);	
	if(tmp == null) {	// only one city
	//	if(mtUser.getTownCount() != 1) {
	//		mtUnexpected("Town disappeared. --756");
	//	}
	} else
		tmp = tmp[1];
	tmp = mtUser.townFromNewdid(tmp);
	if(tmp == null) {
		mtUnexpected("Town disappeared.  --761");
	}
	
	return tmp.parseGlobal(req);
}

var	mtOverviewDisplayArea = null;
function mtOverview(ev) {
	var	table;
	var	tr, td;
	var	a;
	var	i;
	var	town;
	var	ret;
	var	sum;
	
	if(mtOverviewDisplayArea != null)
		return;
	mtOverviewDisplayArea = document.createElement("div");
	mtOverviewDisplayArea.style.position = "absolute";
	mtOverviewDisplayArea.style.left = "20px";
	mtOverviewDisplayArea.style.top = "100px";
	mtOverviewDisplayArea.style.zIndex = 200;
	mtOverviewDisplayArea.style.padding = "4px";
	mtOverviewDisplayArea.style.border = "2px groove pink";
	mtOverviewDisplayArea.style.backgroundColor = "snow";
	document.body.appendChild(mtOverviewDisplayArea);
	
	table = document.createElement("table");
	table.className = "tbg";
	mtOverviewDisplayArea.appendChild(table);
	
	sum = new Object();
	tr = table.insertRow(-1);
	tr.className = "rbg";
	td = tr.insertCell(-1);
	td = tr.insertCell(-1);
	td.textContent = "newdid";
	td = tr.insertCell(-1);
	td.textContent = "Name";
	sum.res = new Array(4);
	sum.cap = new Array(4);
	sum.pro = new Array(4);
	for(res = 0; res < 4; res++) {
		td = tr.insertCell(-1);
		td.innerHTML = '<img class="res" src="img/un/r/' + (res + 1) + '.gif">';
		sum.res[res] = 0;
		sum.cap[res] = 0;
		sum.pro[res] = 0;
	}
	td = tr.insertCell(-1);
	td.textContent = "Working";
	td = tr.insertCell(-1);
	td.textContent = "Till";
	
	for(i = 0; i < mtUser.getTownCount(); i++) {
		town = mtUser.getTown(i);
		
		tr = table.insertRow(-1);
		tr.setAttribute("town_id", town.getObjId());
		
		td = tr.insertCell(-1);
		td.noWrap = true;
		a = document.createElement("a");
		a.innerHTML = "<img src='" + MTI_REFRESH + "'/>";
		a.addEventListener("click", function(ev) {
			var	obj;
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj.reloadAll(0);
		}, false);
		td.appendChild(a);
		
		td = tr.insertCell(-1);
		td.noWrap = true;
		td.textContent = town.getId();
		
		td = tr.insertCell(-1);
		td.noWrap = true;
		td.textContent = town.getName();
		
		for(res = 0; res < 4; res++) {
			td = tr.insertCell(-1);
			td.noWrap = true;
			if(town.getResource(res) >= town.getCapacity(res) * 0.99 || town.getProducibility(res) <= 0)
				td.style.color = "red";
			td.textContent = "" + town.getResource(res) + "/" + town.getCapacity(res) + "(" + mtSignedNumberRepresent(town.getProducibility(res)) + ")";
			sum.res[res] += town.getResource(res);
			sum.cap[res] += town.getCapacity(res);
			sum.pro[res] += town.getProducibility(res);
		}
		
		td = tr.insertCell(-1);
		td.noWrap = true;
		td.textContent = town.getWorking();
		
		td = tr.insertCell(-1);
		td.noWrap = true;
		a = town.getWorkTil();
		if(a != null)
			td.textContent = a.toMTString();
	}
	
	tr = table.insertRow(-1);
	tr.style.backgroundColor = "lightgray";
	td = tr.insertCell(-1);
	td = tr.insertCell(-1);
	td = tr.insertCell(-1);
	for(res = 0; res < 4; res++) {
		td = tr.insertCell(-1);
		td.textContent = "" + sum.res[res] + "/" + sum.cap[res] + "(+" + sum.pro[res] + ")";
	}
	td = tr.insertCell(-1);
	td = tr.insertCell(-1);
	
	a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.textContent = "[close]";
	a.addEventListener("click", function(ev) {
		mtOverviewDisplayArea.parentNode.removeChild(mtOverviewDisplayArea);
		mtOverviewDisplayArea = null;
	}, false);
	mtOverviewDisplayArea.appendChild(a);
}

var	mtArmiesDisplayArea = null;
function mtArmies(ev) {
	var	list = ["在村內自軍", "該村擁有軍隊", "他村來支援", "去他村支援", "他人來支援", "移動中", "偵察", "攻擊", "回歸"]
	var	tbl = new Array(list.length);
	var	sum = new Array(list.length);
	var	th = new Array(list.length);
	var	troops = new Array(list.length);
	var	rows = new Array();
	var	tr = new Array(list.length), td;
	var	a;
	var	i, t, j;
	var	town;
	var	ret;
	
	mtDev("979 mtArmies");
	
	if(mtArmiesDisplayArea != null)
		return;
	mtArmiesDisplayArea= document.createElement("div");
	mtArmiesDisplayArea.style.position = "absolute";
	mtArmiesDisplayArea.style.left = "20px";
	mtArmiesDisplayArea.style.top = "100px";
	mtArmiesDisplayArea.style.zIndex = 200;
	mtArmiesDisplayArea.style.padding = "4px";
	mtArmiesDisplayArea.style.border = "2px groove pink";
	mtArmiesDisplayArea.style.backgroundColor = "snow";
	document.body.appendChild(mtArmiesDisplayArea);
	mtDev("992 list.length = " + list.length );
	for(t = 0; t < list.length; t++) {
		tbl[t] = document.createElement("table");
		tbl[t].className = "tbg";
		mtArmiesDisplayArea.appendChild(tbl[t]);
		mtArmiesDisplayArea.appendChild(document.createElement("br"));
		
		th[t] = tbl[t].insertRow(-1);
		th[t].className = "rbg";
		td = th[t].insertCell(-1);
		td.textContent = list[t];
		td = th[t].insertCell(-1);
		td.textContent = "Name";
		troops[t] = new Array();
		
		sum[t] = tbl[t].insertRow(-1);
		sum[t].style.backgroundColor = "lightgray";
		td = sum[t].insertCell(-1);
		td = sum[t].insertCell(-1);
	}
	
	for(i = 0; i < mtUser.getTownCount(); i++) {
		town = mtUser.getTown(i);
		a = town.getBuildings(MTB_RALLY_POINT);
		
		for(t = 0; t < list.length; t++) {
			tr[t] = tbl[t].insertRow(tbl[t].rows.length - 1);
			td = tr[t].insertCell(-1);
			//td.textContent = town.getId();
			//td.textContent = i;
			td = tr[t].insertCell(-1);
			td.textContent = town.getName();
			
			if(a.length == 0) {
				tr[t].setAttribute("defValue", "-----");
			} else {
				tr[t].setAttribute("defValue", "0");
			}
		}
		
		if(a.length != 0)
			rows.push([town, a[0], tr.slice(0), tbl, sum, th, troops]);
	}
	mtDev("1034");
	for(i = 0; i < rows.length; i++) {
		rows[i][1].queryInfo(0, null, function(info, options) {
			var	town = options[0];
			var	b = options[1];
			var	tr = options[2];
			var	tbl = options[3];
			var	sum = options[4];
			var	th = options[5];
			var	troops = options[6];
			var	countin = function(troop, t) {
				var	key;
				var	i, j;
				var	td;
				for(key in troop) {
					for(i = 0; i < troops[t].length; i++) {
						if(troops[t][i].id == key)
							break;
					}
					if(i == troops[t].length) {
						troops[t].push(new Object());	// [i]
						troops[t][i].id = key;
						troops[t][i].name = troop[key].name;
						
						td = th[t].insertCell(-1);
						td.innerHTML = '<img src="img\/x\.gif" class="unit u'+key+'" title="'+ troop[key].name + '" alt="'+ troop[key].name + '" \/>';
						for(j = 1; j < tbl[t].rows.length - 1; j++) {
							td = tbl[t].rows[j].insertCell(-1);
							td.textContent = tbl[t].rows[j].getAttribute("defValue");
						}
						
						td = sum[t].insertCell(-1);
						td.textContent = "0";
					}
					
					td = tr[t].cells[i+2];
					j = parseInt(td.textContent);
					if(!isNaN(j)) {
						td.textContent = "" + (j + troop[key].number);
					}
					
					td = sum[t].cells[i+2];
					j = parseInt(td.textContent);
					td.textContent = "" + (j + troop[key].number);
				}
			};
			var	i;
			
			countin(info.localForce.homeTroops, 0);
			countin(info.localForce.guestTroops, 0); 
			countin(info.localForce.homeTroops, 1);
			countin(info.remoteTroops, 1);
			countin(info.localForce.spyingTroops, 1);
			countin(info.localForce.attackingTroops , 1);
			countin(info.localForce.returningTroops , 1); 
			countin(info.localForce.guestTroops, 2);
			countin(info.remoteTroops, 3);
			countin(info.othersTroops, 4);
			countin(info.localForce.spyingTroops, 5);
			countin(info.localForce.attackingTroops , 5);
			countin(info.localForce.returningTroops , 5); 
                        countin(info.localForce.spyingTroops, 6);
			countin(info.localForce.attackingTroops , 7);
			countin(info.localForce.returningTroops , 8); 


		}, rows[i]);
	}
	a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.textContent = "[close]";
	a.addEventListener("click", function(ev) {
		mtArmiesDisplayArea.parentNode.removeChild(mtArmiesDisplayArea);
		mtArmiesDisplayArea = null;
	}, false);
	mtArmiesDisplayArea.appendChild(a);
}


function mtVisualTableSwitch(ev) {
	var i;
	var tmp;
	var id;
	for(i=0;  i<= mtVisualTable.rows.length; i++)
	{
		tmp = mtVisualTable.rows[i].cells[0].id;
		if(tmp.match("mt_vid_"))
		{					 
			 id = document.getElementById(tmp);
			 id.style.display = "none";		
		}
	}
}


/* ==== class mtCUser ==== */
function mtCUser(uid) {
	this.objId = mtNewId();
	this.userId = uid;
	this.townList = null;
	
	this.reloadTimer = null;
}

mtCUser.prototype.getObjId = function() {
	return this.id;
}

mtCUser.prototype.getId = function() {
	return this.userId;
}

mtCUser.prototype.getTownCount = function() {
	return this.townList.length;
}

mtCUser.prototype.getTown = function(idx) {
	return this.townList[idx];
}

mtCUser.prototype.lookupTown = function(town_obj_id) {
	var	i;
	for(i = 0; i < this.townList.length; i++) {
		if(this.townList[i].getObjId() == town_obj_id)
			return this.townList[i];
	}
	return null;
}

mtCUser.prototype.townFromNewdid = function(newdid) {
	var	i;
	if(this.townList.length == 0)
		return null;
	if(newdid == null)
		return this.townList[0];
	for(i = 0; i < this.townList.length; i++) {
		if(this.townList[i].getId() == newdid)
			return this.townList[i];
	}
	return null;
}

mtCUser.prototype.loadConfig = function(town_id) {
	var	key, config;
	
	key = escape(this.userId) + "," + escape(town_id);
	config = GM_getValue(key, "");
	//alert("L:" + key + "\r\n" + config);
	return config;
}

mtCUser.prototype.saveConfig = function(town_id, config) {
	var	key = escape(this.userId) + "," + escape(town_id);
	GM_setValue(key, config);
}

mtCUser.prototype.refreshTowns = function() {
	this.townList = new Array();
	mtOOGet("dorf3.php", this, this._loadTown_parse_dorf3, 0);
}
// --> private functions
mtCUser.prototype._loadTown_parse_dorf3 = function(req, options) {
	var	html;
	var	towns;
	var	i;
	var	town;
	
	mtDev("1153 mtCUser._loadTown_parse_dorf3");
	try {
		if(req.status != 200)	// error!
			mtUnexpected("dorf3.php : " + req.status);
		html = req.responseText;
	} catch(e) {
		mtUnexpected("dorf3.php : " + e);
	}
		
	//towns = html.match(/<a href="dorf1\.php\?newdid=\d+">[^<]*?<\/a>/g);

        towns = html.match(/<a href="dorf1\.php\?newdid=\d+">/g);
	if(towns == null || towns.length == 0)
		mtUnexpected("Town list fail.");
		
	if(this.reloadTimer != null)
		Mtcleartimeout(this.reloadTimer);
	this.reloadTimer = null;
	
	this.townList = new Array(towns.length);
	for(i = 0; i < towns.length; i++) {
		town = towns[i].match(/dorf1\.php\?newdid=(\d+)/);
		town = new mtCTown(this, town[1], mtVisualTable);
		this.townList[i] = town;
		town.refreshTown();
		town.refreshCity();
	}
	
	this.reloadTimer = mtSetTimeout(this, this._reloadATown, 0, 3 * 60 * 1000);

}

// --> private functions
mtCUser.prototype._reloadATown = function(options) {
	if(!mtAllStopped()) {
		if(options < this.townList.length) {
			this.townList[options].refreshTown();
		}
	}
	this.reloadTimer = mtSetTimeout(this, this._reloadATown, (options + 1) % this.townList.length, 3 * 60 * 1000);
}
/* ==== class mtCUser ==== */

/* ==== class mtCTown ==== */
function mtCTown(user, tid, parentTable) {
	this.objId = mtNewId();
	this.user = user;
	this.townId = tid;
	this.name = null;
	this.res = new Array(4);
	this.resLevel = new Array(4);
	this.resAddExt = new Array(4);
	this.resReserved = new Array(4); // jtyeh 20091123 , to modify the new architecture
					 // all task will follow this Value
					 // or use two different setting?
	this.produce = new Array(4);
	this.resCapacity = new Array(4);
	this.supplyUsed = null;
	this.supply = null;
	this.building = new Array(40);
	this.working = null;
	this.schedule = new Array();
	this.coord = null;
	this.configResourceManager = null;
	this._initVisual(parentTable);
	
	this.reloadTimer = null;
	this.attacked = false;
	this.attackWaves = new Array(4);
	this.attackTime = new Array(4);

	this.defenceWaves = new Array(4);
	this.defenceTime = new Array(4);
	
	this.villageTroops = new Array(31);
	this.party = null;
	
	this.initStatus = 0;
	this.idleListeners = new Array();
}

mtCTown.prototype.getObjId = function() {
	return this.objId;
}

mtCTown.prototype.getId = function() {
	return this.townId;
}

mtCTown.prototype.saveConfig = function() {
	var	i;
	var	config;
	
	if(this.configResourceManager != null) {
		config = "" + this.configResourceManager.resLowWater[0];
		for(i = 1; i < 4; i++) {
			config += ",";
			if(this.configResourceManager.resLowWater[i] != null)
				config += this.configResourceManager.resLowWater[i];
		}
		for(i = 0; i < 4; i++) {
			config += ",";
			if(this.configResourceManager.resLowPref[i] != null)
				config += this.configResourceManager.resLowPref[i];
		}
		config += "," + this.configResourceManager.reactPeekCapacity;
		for(i = 0; i < 4; i++) {
			config += ",";
			if(this.configResourceManager.resHighWater[i] != null)
				config += this.configResourceManager.resHighWater[i];
		}
		for(i = 0; i < 4; i++) {
			config += ",";
			if(this.configResourceManager.resHighPref[i] != null)
				config += this.configResourceManager.resHighPref[i];
		}
		config += "," + this.configResourceManager.reactPokeResource;
		this.user.saveConfig("RM" + this.townId, config);
	}
	
	config = "";
	for(i = 0; i < this.schedule.length; i++) {
		if(config != "")
			config += ",";
		config += escape(this.schedule[i].getConfig());
	}	
	this.user.saveConfig(this.townId, config);
}

mtCTown.prototype.loadConfig = function() {
	var	config;
	var	i;
	var	sch;
	
	config = this.user.loadConfig("RM" + this.townId);
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
	}
	this.configResourceManager.resLowWater = new Array(4);
	this.configResourceManager.resLowPref = new Array(4);
	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.resHighWater = new Array(4);
	this.configResourceManager.resHighPref = new Array(4);
	this.configResourceManager.reactPokeResource = false;
	if(config != "") {
		config = config.split(",");
		for(i = 0; i < 4; i++) {
			if(config.length > i) {	// resLowWater[i]
				if(config[i].match(/(^\d+$)|(^\d+%$)/) != null) {
					this.configResourceManager.resLowWater[i] = config[i];
				}
			}
			if(config.length > 4 + i) {	// resLowPref[i]
				if(config[4 + i].match(/(^\d+$)|(^\d+%$)/) != null) {
					this.configResourceManager.resLowPref[i] = config[4 + i];
				}
			}
			if(config.length > 9 + i) {	// resHighWater[i]
				if(config[9 + i].match(/(^\d+$)|(^\d+%$)/) != null) {
					this.configResourceManager.resHighWater[i] = config[9 + i];
				}
			}
			if(config.length > 13 + i) {	// resHighPref[i]
				if(config[13 + i].match(/(^\d+$)|(^\d+%$)/) != null) {
					this.configResourceManager.resHighPref[i] = config[13 + i];
				}
			}
		}
		if(config.length > 8) {	// reactPeekCapacity
			if(config[8] == "true")
				this.configResourceManager.reactPeekCapacity = true;
			else if(config[8] == "false")
				this.configResourceManager.reactPeekCapacity = false;
		}
		if(config.length > 17) {	// reactPokeResource
			if(config[17] == "true")
				this.configResourceManager.reactPokeResource = true;
			else if(config[17] == "false")
				this.configResourceManager.reactPokeResource = false;
		}
	}
	this.cancelResourceManagerConfig();
	
	config = this.user.loadConfig(this.townId);
	if(config != "") {
		config = config.split(",");
		for(i = 0; i < config.length; i++) {
			sch = new mtCSchedule(this, this.vTaskArea);
			this.schedule.push(sch);
			sch.loadConfig(unescape(config[i]));
		}
		this.saveConfig();
	}
}

mtCTown.prototype.getName = function() {
	return this.name;
}

mtCTown.prototype.getCoord = function() {
	return this.coord.slice(0);
}

mtCTown.prototype.getResource = function(type) {
	return this.res[type];
}

mtCTown.prototype.getBuilding = function(grid_id) {
	return this.building[grid_id];
}

mtCTown.prototype.getProducibility = function(type) {
	return this.produce[type];
}

mtCTown.prototype.getCapacity = function(type) {
	return this.resCapacity[type];
}

mtCTown.prototype.getSupplyUsed = function(type) {
	return this.supplyUsed;
}

mtCTown.prototype.getSupply = function(type) {
	return this.supply;
}

mtCTown.prototype.getWorking = function() {
	return this.working;
}

mtCTown.prototype.getWorkTil = function() {
	var	t;
	if(this.working == null)
		return null;
	t = new Date();
	t.setTime(this.workTil);
	return t;
}

mtCTown.prototype.refreshTown = function() {
	//mtDev("1378 mtCTown.refreshTown");
	mtOOGet("dorf1.php?newdid=" + this.townId,
		this, this._refreshTown_parse_dorf1,
		0);
}

mtCTown.prototype.refreshCity = function() {
	mtOOGet("dorf2.php?newdid=" + this.townId,
		this, this._refreshCity_parse_dorf2,
		0);
}

mtCTown.prototype.parseGlobal = function(req) {
	var	html;
	var	re;
	var	tmp;
	
	mtDev("1395 mtCTown.parseGlobal");
	
	try {
		if(req.status != 200)
			return false;
		html = req.responseText;
	} catch(e) {
		return false;
	}
	
	if(!this.checkTownPage(html)) {
		return false;
	}
	
	// parse for town name
	tmp = html.match(/<div class="dname"><h1>(.+?)<\/h1><\/div>/);
	if(tmp != null)
		this.name = tmp[1];
		
	// parse for coordinate
	if(this.coord == null) {
		//re = new RegExp('<a href="\\?newdid=' + this.townId + '.*\\r\\n<tr>\\r\\n<td class="right dlist1">\\((-?\\d+)<\\/td>\\r\\n<td class="center dlist2">\\|<\\/td>\\r\\n<td class="left dlist3">(-?\\d+)\\)<\\/td>');
		re = new RegExp('<a href="\\?newdid=' + this.townId + '".*\\r\\n.*class="cox">\\((-?\\d+).*\\r\\n.*\\r\\n.*class="coy">(-?\\d+)\\)');
		
		tmp = html.match(re);
		mtDev("1506 tmp = " + tmp);
		if(tmp == null) {
			this.coord = mtCoord0;
		} else {
			this.coord = [parseInt(tmp[1]), parseInt(tmp[2])];
		}
	}
	
	// parse for current resources, producibilities, and capacities
	for(i = 0; i < 4; i++) {
		re = new RegExp("<img class=\"res\" src=\"img\\/un\\/r\\/" + (i + 1) + "\\.gif\".*?\r\n<td id=l\\d title=(-?\\d+)>(\\d+)/(\\d+)</td>");
		tmp = html.match(re);
		if(tmp != null) {
			this.res[i] = parseInt(tmp[2]);
			this.produce[i] = parseInt(tmp[1]);
			this.resCapacity[i] = parseInt(tmp[3]);
		}
	}
	tmp = html.match(/<img class="res" src="img\/un\/r\/5.gif".*?>&nbsp;(\d+)\/(\d+)/);
	if(tmp == null)
		tmp = html.match(/<td style="padding-top:4px;">(\d+)\/(\d+)/);
	if(tmp != null) {
		this.supplyUsed = parseInt(tmp[1]);
		this.supply = parseInt(tmp[2]);
	}
	
	this._update();
}

mtCTown.prototype.addSchedule = function() {
	this.schedule.push(new mtCSchedule(this, this.vTaskArea));
	this.saveConfig();
}

mtCTown.prototype.lookupSchedule = function(obj_id) {
	var	i;
	
	for(i = 0; i < this.schedule.length; i++)
		if(this.schedule[i].getObjId() == obj_id)
			return this.schedule[i];
	return null;
}

mtCTown.prototype.deleteSchedule = function(obj_id) {
	var	i;
	
	for(i = 0; i < this.schedule.length; i++)
		if(this.schedule[i].getObjId() == obj_id) {
			this.schedule[i].remove();
			this.schedule.splice(i, 1);
			break;
		}
	this.saveConfig();
}

mtCTown.prototype.getBuildings = function(type) {
	var	i;
	var	r;
	
	r = new Array();
	for(i = 0; i < this.building.length; i++) {
		if(this.building[i] == null) {
			continue;
		}
		if(this.building[i].getType() == type)
			r.push(this.building[i]);
	}
	return r;
}

mtCTown.prototype.lookupBuilding = function(obj_id) {
	var	i;
	
	for(i = 0; i < this.building.length; i++)
		if(this.building[i] != null && this.building[i].getObjId() == obj_id)
			return this.building[i];
	return null;
}

mtCTown.prototype.checkTownPage = function(html) {
	var	tmp;
	
	mtDev("1451 mtCTown.checkTownPage");
			//<td class="dot hl">   </td><td class="link"><a href="?newdid=8279" >
	tmp = html.match(/<td class="dot hl">\S+<\/td><td class="link"><a href=".newdid=(\d+).*" >/);
	
	if(tmp == null) {	// only one city
		if(this.user.getTownCount() != 1) {
			//document.getElementById("lright1").textContent = html;
			//mtUnexpected("Town disappeared. --1444");
		}
		return true;
	}
	if(this.townId == tmp[1])
	{
		return true;
	}		
	return false;
}

mtCTown.prototype.reloadAll = function(options) {
	if(this.reloadTimer != null) {
		mtClearTimeout(this.reloadTimer);
	}
	this.reloadTimer = null;
	if(options >= MTB_SAWMILL) {
		this.refreshCity();
		this.refreshTown();
	} else {
		this.refreshTown();
		this.refreshCity();
	}
}

mtCTown.prototype.addIdleListener = function(obj, func, options) {
	this.idleListeners.push([obj, func, options]);
}

mtCTown.prototype.editResourceManagerConfig = function() {
	this.vResourceManagerConfig.vActionArea.style.display = "";
}

mtCTown.prototype.applyResourceManagerConfig = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = false;	//default support
	}
	
	for(i = 0; i < 4; i++) {
		if(this.vResourceManagerConfig.vResLowWater[i].value.match(/^((\d+)|(\d{1,2}%))?$/) == null) {
			alert("Invalid value in low water mark.");
			this.vResourceManagerConfig.vResLowWater[i].select();
			this.vResourceManagerConfig.vResLowWater[i].focus();
			return;
		}
	}
	for(i = 0; i < 4; i++) {
		if(this.vResourceManagerConfig.vResLowPref[i].value.match(/^((\d+)|(\d{1,2}%))?$/) == null) {
			alert("Invalid value in low preference.");
			this.vResourceManagerConfig.vResLowPref[i].select();
			this.vResourceManagerConfig.vResLowPref[i].focus();
			return;
		}
	}
	for(i = 0; i < 4; i++) {
		if(this.vResourceManagerConfig.vResHighWater[i].value.match(/^((\d+)|(\d{1,2}%))?$/) == null) {
			alert("Invalid value in high water mark.");
			this.vResourceManagerConfig.vResHighWater[i].select();
			this.vResourceManagerConfig.vResHighWater[i].focus();
			return;
		}
	}
	for(i = 0; i < 4; i++) {
		if(this.vResourceManagerConfig.vResHighPref[i].value.match(/^((\d+)|(\d{1,2}%))?$/) == null) {
			alert("Invalid value in high preference.");
			this.vResourceManagerConfig.vResHighPref[i].select();
			this.vResourceManagerConfig.vResHighPref[i].focus();
			return;
		}
	}
	
	for(i = 0; i < 4; i++) {
		if(this.vResourceManagerConfig.vResLowWater[i].value == "")
			this.configResourceManager.resLowWater[i] = null;
		else
			this.configResourceManager.resLowWater[i] = this.vResourceManagerConfig.vResLowWater[i].value;
		if(this.vResourceManagerConfig.vResLowPref[i].value == "")
			this.configResourceManager.resLowPref[i] = null;
		else
			this.configResourceManager.resLowPref[i] = this.vResourceManagerConfig.vResLowPref[i].value;
		if(this.vResourceManagerConfig.vResHighWater[i].value == "")
			this.configResourceManager.resHighWater[i] = null;
		else
			this.configResourceManager.resHighWater[i] = this.vResourceManagerConfig.vResHighWater[i].value;
		if(this.vResourceManagerConfig.vResHighPref[i].value == "")
			this.configResourceManager.resHighPref[i] = null;
		else
			this.configResourceManager.resHighPref[i] = this.vResourceManagerConfig.vResHighPref[i].value;
	}
	this.configResourceManager.reactPeekCapacity = this.vResourceManagerConfig.vReactPeekCapacity.checked;
	this.configResourceManager.reactPokeResource = this.vResourceManagerConfig.vReactPokeResource.checked;
	
	this.saveConfig();
	
	this.vResourceManagerConfig.vActionArea.style.display = "none";
}

mtCTown.prototype.applyResourceManagerConfigDefault = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = true;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}
	
	for(i = 0; i < 4; i++) {
			this.vResourceManagerConfig.vResLowWater[i].value  = "20%";
		  this.vResourceManagerConfig.vResLowPref[i].value   = "45%";
   		this.vResourceManagerConfig.vResHighWater[i].value = "60%";
 			this.vResourceManagerConfig.vResHighPref[i].value  = "35%";
	}
	this.configResourceManager.reactPeekCapacity = true;
	this.configResourceManager.reactPokeResource = true;

  this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigClear = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = false;	//default support
	}
	
	for(i = 0; i < 4; i++) {
			this.vResourceManagerConfig.vResLowWater[i].value  = "";
		  this.vResourceManagerConfig.vResLowPref[i].value   = "";
   		this.vResourceManagerConfig.vResHighWater[i].value = "";
 			this.vResourceManagerConfig.vResHighPref[i].value  = "";
	}
	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.reactPokeResource = false;

	this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;	
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigPushIn = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = true;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = false;	//default support
	}
	
	for(i = 0; i < 4; i++) {
			this.vResourceManagerConfig.vResLowWater[i].value  = "75%";
		  this.vResourceManagerConfig.vResLowPref[i].value   = "90%";
   		this.vResourceManagerConfig.vResHighWater[i].value = "";
 			this.vResourceManagerConfig.vResHighPref[i].value  = "";
	}
	this.configResourceManager.reactPeekCapacity = true;
	this.configResourceManager.reactPokeResource = false;

  this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigNewVillage = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = true;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}
	
	for(i = 0; i < 4; i++) {
			this.vResourceManagerConfig.vResLowWater[i].value  = "40%";
		  this.vResourceManagerConfig.vResLowPref[i].value   = "85%";
   		this.vResourceManagerConfig.vResHighWater[i].value = "95%";
 			this.vResourceManagerConfig.vResHighPref[i].value  = "70%";
	}
	this.configResourceManager.reactPeekCapacity = true;
	this.configResourceManager.reactPokeResource = true;

  this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigNewVillage2 = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = true;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}
	
	for(i = 0; i < 4; i++) {
		this.vResourceManagerConfig.vResLowWater[i].value  = "8000";
		this.vResourceManagerConfig.vResLowPref[i].value   = "12000";
   		this.vResourceManagerConfig.vResHighWater[i].value = "18000";
 		this.vResourceManagerConfig.vResHighPref[i].value  = "16500";
	}
	this.configResourceManager.reactPeekCapacity = true;
	this.configResourceManager.reactPokeResource = true;

  	this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigPushOut = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}
	
	for(i = 0; i < 4; i++) {
		this.vResourceManagerConfig.vResLowWater[i].value  = "";
		 this.vResourceManagerConfig.vResLowPref[i].value   = "";
   		this.vResourceManagerConfig.vResHighWater[i].value = "30%";
 		this.vResourceManagerConfig.vResHighPref[i].value  = "15%";
	}
	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.reactPokeResource = true;

  	this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigSmallParty = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}

	var tmpLW = ["6000","6000","5500","1000"];
	var tmpLP = ["7000","7000","6500","2000"];
	var tmpHW = ["7500","8000","7000","3000"];
	var tmpHP = ["6500","6800","6000","1500"];
	for(i = 0; i < 4; i++) {
		this.vResourceManagerConfig.vResLowWater[i].value  = tmpLW[i];
		this.vResourceManagerConfig.vResLowPref[i].value   = tmpLP[i];   			
		this.vResourceManagerConfig.vResHighWater[i].value = tmpHW[i];
 		this.vResourceManagerConfig.vResHighPref[i].value  = tmpHP[i];
	}

	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.reactPokeResource = true;

 	 this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}
mtCTown.prototype.applyResourceManagerConfigBigParty = function() {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}

	var tmpLW = ["29500","33000","32000","6500"];
	var tmpLP = ["31500","34000","33000","7500"];
	var tmpHW = ["31000","34500","33500","8000"];
	var tmpHP = ["30000","33500","32500","7000"];
	for(i = 0; i < 4; i++) {
		this.vResourceManagerConfig.vResLowWater[i].value  = tmpLW[i];
		this.vResourceManagerConfig.vResLowPref[i].value   = tmpLP[i];   			
		this.vResourceManagerConfig.vResHighWater[i].value = tmpHW[i];
 		this.vResourceManagerConfig.vResHighPref[i].value  = tmpHP[i];
	}
	
	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.reactPokeResource = true;

  this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigGoResource = function(res) {
	var	i;
	
	if(this.configResourceManager == null) {
		this.configResourceManager = new Object();
		this.configResourceManager.resLowWater = new Array(4);
		this.configResourceManager.resLowPref = new Array(4);
		this.configResourceManager.reactPeekCapacity = false;  //default require
		this.configResourceManager.resHighWater = new Array(4);
		this.configResourceManager.resHighPref = new Array(4);
		this.configResourceManager.reactPokeResource = true;	//default support
	}
	
	this.vResourceManagerConfig.vResHighWater[res].value = "1500";
 	this.vResourceManagerConfig.vResHighPref[res].value  = "0";
	this.configResourceManager.reactPeekCapacity = false;
	this.configResourceManager.reactPokeResource = true;

  	this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}

mtCTown.prototype.applyResourceManagerConfigDirection = function(Direction, Enable) {
	var	i;
	
	if(Direction == "IN") {		
		this.configResourceManager.reactPeekCapacity = Enable;
  	this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;	
	}
	if (Direction == "OUT") {
	this.configResourceManager.reactPokeResource = Enable;
	this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	}
	this.saveConfig();
	this.applyResourceManagerConfig();
	this.vResourceManagerConfig.vActionArea.style.display = "";	
}


mtCTown.prototype.cancelResourceManagerConfig = function() {
	var	i;
	if(this.configResourceManager != null) {
		for(i = 0; i < 4; i++) {
			if(this.configResourceManager.resLowWater[i] == null)
				this.vResourceManagerConfig.vResLowWater[i].value = "";						
			else
				this.vResourceManagerConfig.vResLowWater[i].value = this.configResourceManager.resLowWater[i];
								
			if(this.configResourceManager.resLowPref[i] == null)
				this.vResourceManagerConfig.vResLowPref[i].value = "";
			else			
				this.vResourceManagerConfig.vResLowPref[i].value = this.configResourceManager.resLowPref[i];
								
			if(this.configResourceManager.resHighWater[i] == null)
				this.vResourceManagerConfig.vResHighWater[i].value = "";
			else
				this.vResourceManagerConfig.vResHighWater[i].value = this.configResourceManager.resHighWater[i];
								
			if(this.configResourceManager.resHighPref[i] == null)
				this.vResourceManagerConfig.vResHighPref[i].value = "";
			else
				this.vResourceManagerConfig.vResHighPref[i].value = this.configResourceManager.resHighPref[i];
		}
		this.vResourceManagerConfig.vReactPeekCapacity.checked = this.configResourceManager.reactPeekCapacity;
		this.vResourceManagerConfig.vReactPokeResource.checked = this.configResourceManager.reactPokeResource;
	}
	
	this.vResourceManagerConfig.vActionArea.style.display = "none";
}

mtCTown.prototype.startResourceManager = function() {
	this.manageResource(null);
}

mtCTown.prototype.parseResourceManagerConfig = function(s, cap) {
	if(s == null)
		return NaN;
	if(s.match(/^\d+$/) != null)
		return parseInt(s);
	s = s.match(/^(\d{1,2})%$/);
	if(s == null)
		return NaN;
	s = parseInt(s[1]);
	return Math.floor(cap * s / 100);
}

mtCTown.prototype.manageResource = function(options) {
	var	i;
	var	config;
	var	fn = this.parseResourceManagerConfig;
	var	v;
	var	b;
	var	peek, poke;
	
	mtDev("1680 mtCTown.manageResource");
	
	this.vResourceManagerMessage.innerHTML = "[" + new Date().toMTString() + "]<br/>";
	
	b = this.getBuildings(MTB_MARKETPLACE);
	if(b.length == 0) {
		this.vResourceManagerMessage.innerHTML += 'Market place is needed to manage resources.<br/>';
		//todo: auto build marketplace		
		mtSetTimeout(this, this.manageResource, options, 5 * 60 * 1000);
		return;
	}
	b = b[0];
	
	config = this.configResourceManager;
	poke = false;
	//jtyeh:20090605 add codition check
	if(this.configResourceManager.reactPeekCapacity == true)
	{
			do {	/* Pseudo loop for low water check */
				if(config == null || config.resLowWater == null)
					break;
				for(i = 0; i < 4; i++) {
					v = fn(config.resLowWater[i], this.resCapacity[i]);
					if(isNaN(v))
						continue;
					if(this.res[i] < v)
						break;
				}
				if(i == 4) {	// safe
					this.vResourceManagerMessage.innerHTML += 'Low water mark is not reached.<br/>';
					break;
				}
				
				poke = true;
				//this.vResourceManagerMessage.innerHTML += "Query " + mtBuildingName[MTB_MARKETPLACE] + " before poking resource suppliers.<br/>";
				//b.queryInfo(0, this, this.queryResourceManager, null);
			} while(false);
	}
	
	peek = false;

	//jtyeh:20090605 add codition check
	if(this.configResourceManager.reactPokeResource == true)
	{
			do {	/* Pseudo loop for high water check */
				if(config == null || config.resHighWater == null)
					break;
				for(i = 0; i < 4; i++) {
					v = fn(config.resHighWater[i], this.resCapacity[i]);
					if(isNaN(v))
						continue;
					if(this.res[i] >= v)
						break;
				}
				if(i == 4) {	// safe
					this.vResourceManagerMessage.innerHTML += 'High water mark is not reached.<br/>';
					break;
				}
				
				peek = true;
				this.vResource
			} while(false);
	}
	
	
	if(poke || peek) {
		this.vResourceManagerMessage.innerHTML += "Query " + mtBuildingName[MTB_MARKETPLACE] + " before";
		if(poke) {
			this.vResourceManagerMessage.innerHTML += " poking resource suppliers";
			if(peek)
				this.vResourceManagerMessage.innerHTML += " and";
		}
		if(peek)
			this.vResourceManagerMessage.innerHTML += " peeking resource capacities";
		this.vResourceManagerMessage.innerHTML += ".<br/>";
		
		b.queryInfo(0, this, this.queryResourceManager, {peek : peek, poke : poke, b : b});
	}
	
	mtSetTimeout(this, this.manageResource, options, 5 * 60 * 1000);
}

mtCTown.prototype.queryResourceManager = function(info, options) {
	var	towns;
	var	config;
	var	v;
	var	i;
	var	fn = this.parseResourceManagerConfig;
	var	res;
	var	t;
	var	cap;
	var	div;
	var	total;
	var	supp;

 
	
	mtDev("1764 mtCTown.queryResourceManager");


	
	this.vResourceManagerMessage.innerHTML += "[" + info.incomingResource.join(",") + "] are arriving.<br/>";
	
	config = this.configResourceManager;
	if(options.poke) {
		res = new Array(4);
		for(i = 0; i < 4; i++) {
			v = fn(config.resLowPref[i], this.resCapacity[i]);
			if(isNaN(v)) {
				res[i] = 0;
				continue;
			}
			if(v > this.resCapacity[i])
				v = this.resCapacity[i];
			res[i] = v - (this.res[i] + info.incomingResource[i]);
			if(res[i] < 0)
				res[i] = 0;
		}
		for(i = 0; i < 4; i++)
			if(res[i] > 0)
				break;
		if(i < 4) {
			this.vResourceManagerMessage.innerHTML += "Poke for [" + res.join(",") + "]<br/>";
			
			towns = this.getNearestTowns();
			this.pokeNextResourceSupplier(null, {towns : towns, resWant : res});
		}
	}
	
	if(options.peek && info.trader > 0) {
		res = new Array(4);
		for(i = 0; i < 4; i++) {
			v = fn(config.resHighPref[i], this.resCapacity[i]);
			if(isNaN(v)) {
				res[i] = 0;
				continue;
			}
			res[i] = (this.res[i] + info.incomingResource[i]) - v;
			if(res[i] < 0)
				res[i] = 0;
		}
		for(i = 0; i < 4; i++)
			if(res[i] > 0)
				break;
		if(i < 4) {
			this.vResourceManagerMessage.innerHTML += "Peek for [" + res.join(",") + "], trader " + info.trader + ".<br/>";
			
			towns = this.getNearestTowns();
			this.reportSupplieeCapacity(null,
				{b : options.b, towns : towns, resSupp : res, trader : info.trader, traderCapacity : info.traderCapacity });
		}
	}
}

mtCTown.prototype.reportSupplieeCapacity = function(resCapacity, options) {
	var	i, s;
	var	supp;
	var	total;
	var	res;
	var	t;
	var	div;
	var	v;
	
	mtDev("1828 mtCTown.prototype.reportSupplieeCapacity");
	
	if(resCapacity != null) {
		supp = options.resSupp.slice(0);
		total = new Array(4);
		for(i = 0; i < 4; i++) {
			if(supp[i] > resCapacity[i])
				supp[i] = resCapacity[i];
			total[i] = 0;
		}
		
		res = new Array(4);
		for(t = 0; t < options.trader; t++) {
			cap = options.traderCapacity;
			for(i = 0; i < 4; i++)
				res[i] = 0;
			for(div = 4; div >= 1; div--) {
				for(i = 0; i < 4; i++) {
					v = Math.floor(cap / div);
					if(cap == 0) {
						break;
					}
					if(res[i] + v > supp[i])
						v = supp[i] - res[i];
					if(v > cap)	// failsafe, must not happen
						v = cap;
					res[i] += v;
					cap -= v;
				}
			}
			
			if(cap > 0) {	// A trader is not full!
				if(cap == options.traderCapacity)
					break;
				/* Only if resource still over high water before using this trader */
				for(i = 0; i < 4; i++) {
					if(res[i] == 0)
						continue;
					v = this.parseResourceManagerConfig(this.configResourceManager.resHighWater[i], this.resCapacity[i]);
					if(isNaN(v))
						continue;
					if(this.res[i] - total[i] >= v)
						break;
				}
				if(i == 4)
					break;
				
				for(i = 0; i < 4; i++) {
					total[i] += res[i];
					supp[i] -= res[i];
				}
				break;
			}
			
			for(i = 0; i < 4; i++) {
				total[i] += res[i];
				supp[i] -= res[i];
			}
		}
		
		for(i = 0; i < 4; i++) {
			if(total[i] > 0)
				break;
		}
		if(i < 4) {
			// For bug check:
			cap = options.trader * options.traderCapacity;
			for(i = 0; i < 4; i++) {
				cap -= total[i];
				if(cap < 0) {
					mtUnexpected("cap < 0");
				}
				if(total[i] > resCapacity[i]) {
					mtUnexpected("total[i]" + total[i] + " > resCapacity[i]" + resCapacity[i]);
				}
				v = this.parseResourceManagerConfig(this.configResourceManager.resHighPref[i], this.resCapacity[i]);
				if(isNaN(v))
					continue;
				if(this.res[i] > v && total[i] > this.res[i] - v) {
					//mtUnexpected("total[i] > supp[i]");
					mtDev("total[i] > supp[i]");
				}
			}
			// ==> bug check
			
			options.res = total;
			options.b.transferResource(
				options.towns[0].getCoord(), total, [0, 0, 0, 0],
				this, this.peekNextSupplieeCapacity, options);
			return;
		}
	}
	this.peekNextSupplieeCapacity(null, options);
}

mtCTown.prototype.peekNextSupplieeCapacity = function(result, options) {
	var	i;
	var	cont;
	var	total;
	mtDev("2020 mtCTown.prototype.peekNextSupplieeCapacity");
	
	if(result != null) {
		if(result[0] == MTUR_QUERY_TRANSFER)
			return true;
		if(result[0] != MTUR_NO_ERROR) {
			for(i = 0; i < 4; i++) {
				options.res[i] = 0;
			}
		} else {
			this.vResourceManagerMessage.innerHTML += "Supply [" + options.res.join(",") + "] to " + options.towns[0].getName() + ".<br/>";
		}
	} else {
		if(options.res == null)
			options.res = new Array(4);
		for(i = 0; i < 4; i++)
			options.res[i] = 0;
	}
	
	cont = false;
	total = 0;
	for(i = 0; i < 4; i++) {
		total += options.res[i];
		options.resSupp[i] -= options.res[i];
		if(options.resSupp[i] < 0)	// fail safe, must not happen
			options.resSupp[i];
		if(options.resSupp[i] > 0)
			cont = true;
	}
	if(cont) {
		options.trader -= Math.ceil(total / options.traderCapacity);
		if(options.trader > 0) {
			options.towns.shift();
			if(options.towns.length > 0) {
				options.towns[0].peekResourceCapacity(this, this.reportSupplieeCapacity, options);
				return;
			}
		}
	}
	this.vResourceManagerMessage.innerHTML += "Peek finished.<br/>";
}

mtCTown.prototype.peekResourceCapacity = function(obj, callback, options) {
	var	config;
	var	i;
	var	v;
	var	fn = this.parseResourceManagerConfig;
	mtDev("2066 mtCTown.prototype.peekResourceCapacity ");
	config = this.configResourceManager;
	if(config == null || config.resLowPref == null || config.reactPeekCapacity == false) {
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	
	for(i = 0; i < 4; i++) {
		v = fn(config.resLowPref[i], this.resCapacity[i]);
		if(isNaN(v))
			continue;
		if(v > this.res[i])
			break;
	}
	if(i == 4) {	// I'm full...well, at least over low preference
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	
	v = this.getBuildings(MTB_MARKETPLACE);
	if(v.length == 0) {	// To prevent overflow, I do not accept anything
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	v = v[0];
	v.queryInfo(0, this, this.queryPeekCapacity, {
		callback : {
			obj : obj,
			fn : callback,
			options : options
		}
	});
}

mtCTown.prototype.queryPeekCapacity = function(info, options) {
	var	i;
	var	v;
	var	config;
	var	fn = this.parseResourceManagerConfig;
	var	cap;
	mtDev("2116 mtCTown.prototype.queryPeekCapacity");
	config = this.configResourceManager;
	cap = new Array(4);
	for(i = 0; i < 4; i++) {
		cap[i] = 0;
		v = fn(config.resLowPref[i], this.resCapacity[i]);
		if(isNaN(v))
			continue;
		v -= (this.res[i] + info.incomingResource[i]);
		if(v < 0)
			v = 0;
		cap[i] = v;
	}
	
	if(options.callback.obj == null)
		options.callback.fn(cap, options.callback.options);
	else
		options.callback.fn.call(options.callback.obj, cap, options.callback.options);
}

mtCTown.prototype.pokeNextResourceSupplier = function(res, options) {
	var	i, s;
	
	mtDev("2139 mtCTown.prototype.pokeNextResourceSupplier");
	if(res != null) {
		s = false;
		for(i = 0; i < 4; i++) {
			if(res[i] > 0) {
				options.resWant[i] -= res[i];
				if(options.resWant[i] < 0)
					options.resWant[i] = 0;
				s = true;
			}
		}
		if(s) {
			this.vResourceManagerMessage.innerHTML +=
				"[" + options.towns[0].getName() + "] supplied [" + res.join(",") + "]<br/>";
		}
	}
	options.towns.shift();
	if(options.towns.length > 0) {
		options.towns[0].pokeResource(this.coord.slice(0), options.resWant.slice(0),
			this, this.pokeNextResourceSupplier, options);
	} else {
		this.vResourceManagerMessage.innerHTML += "Poke finished.<br/>";
	}
}

mtCTown.prototype.pokeResource = function(coord, resWant, obj, callback, options) {
	var	config;
	var	i;
	var	v;
	var	fn = this.parseResourceManagerConfig;
	mtDev("2169 mtCTown.prototype.pokeResource");
	config = this.configResourceManager;
	if(config == null || config.resHighPref == null || config.reactPokeResource == false) {
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	
	for(i = 0; i < 4; i++) {
		v = fn(config.resHighPref[i], this.resCapacity[i]);
		if(isNaN(v))
			continue;
		if(v < this.res[i])
			break;
	}
	if(i == 4) {	// Unable to supply anything
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	
	v = this.getBuildings(MTB_MARKETPLACE);
	if(v.length == 0) {	// Unable to supply anything
		if(obj == null)
			callback(null, options);
		else
			callback.call(obj, null, options);
		return;
	}
	v = v[0];
	v.queryInfo(0, this, this.queryPokeResource, {
		b : v,
		coord : coord,
		resWant : resWant,
		callback : {
			obj : obj,
			fn : callback,
			options : options
		}
	});
}

mtCTown.prototype.queryPokeResource = function(info, options) {
	var	i;
	var	v;
	var	res, total, supp;
	var	fn = this.parseResourceManagerConfig;
	var	config;
	var	cap;
	var	t;
	var	div;
	mtDev("2224 mtCTown.prototype.queryPokeResource");
	if(info.trader == 0) {
		if(options.callback.obj == null)
			options.callback.fn(null, options.callback.options);
		else
			options.callback.fn.call(options.callback.obj, null, options.callback.options);
		return;
	}
	
	config = this.configResourceManager;
	total = new Array(4);
	supp = new Array(4);
	res = false;
	for(i = 0; i < 4; i++) {
		total[i] = 0;
		
		v = fn(config.resHighPref[i], this.resCapacity[i]);
		if(isNaN(v)) {
			supp[i] = 0;
			continue;
		}
		v = this.res[i] - v;
		if(v > options.resWant[i]) {
			v = options.resWant[i];
		}
		if(v <= 0) {
			supp[i] = 0;
			continue;
		}
		res = true;
		supp[i] = v;
	}
	if(res == false) {	// Nothing can be supplied
		if(options.callback.obj == null)
			options.callback.fn(null, options.callback.options);
		else
			options.callback.fn.call(options.callback.obj, null, options.callback.options);
		return;
	}
	
	res = new Array(4);
	for(t = 0; t < info.trader; t++) {
		cap = info.traderCapacity;
		for(i = 0; i < 4; i++)
			res[i] = 0;
		for(div = 4; div >= 1; div--) {
			for(i = 0; i < 4; i++) {
				v = Math.floor(cap / div);
				if(cap == 0) {
					break;
				}
				if(res[i] + v > supp[i])
					v = supp[i] - res[i];
				if(v > cap)	// failsafe, must not happen
					v = cap;
				res[i] += v;
				cap -= v;
			}
		}
		
		if(cap > 0) {	// A trader is not full!
			if(cap == info.traderCapacity)
				break;
			for(i = 0; i < 4; i++) {
				if(res[i] > 0 && total[i] + res[i] == options.resWant[i])
					break;
			}
			if(i == 4) {	// No kind of resource can be full supplied
				for(i = 0; i < 4; i++) {
					if(total[i] + res[i] < options.resWant[i])
						break;
				}
				if(i < 4) {	// Not because I supply all you need
					// Maybe some other conditions...
					break;
				}
			}
			
			for(i = 0; i < 4; i++) {
				total[i] += res[i];
				supp[i] -= res[i];
			}
			break;
		}
		
		for(i = 0; i < 4; i++) {
			total[i] += res[i];
			supp[i] -= res[i];
		}
	}
	for(i = 0; i < 4; i++) {
		if(total[i] > 0)
			break;
	}
	if(i == 4) {	// I'm not suppling anything
		if(options.callback.obj == null)
			options.callback.fn(null, options.callback.options);
		else
			options.callback.fn.call(options.callback.obj, null, options.callback.options);
		return;
	}
	
	// For bug check:
	cap = info.trader * info.traderCapacity;
	for(i = 0; i < 4; i++) {
		cap -= total[i];
		if(cap < 0) {
			mtUnexpected("cap < 0");
		}
		if(total[i] > options.resWant[i]) {
			mtUnexpected("total[i] > resWant[i]");
		}
		v = fn(config.resHighPref[i], this.resCapacity[i]);
		if(isNaN(v))
			continue;
		if(this.res[i] > v && total[i] > this.res[i] - v) {
			//mtUnexpected("total[i] > supp[i]");
			mtDev("total[i] > supp[i]");
		}
	}
	// ==> bug check
	
	options.res = total;
	options.b.transferResource(options.coord, total, [0, 0, 0, 0], null, function(result, options) {
		var	i;
		if(result[0] == MTUR_QUERY_TRANSFER)
			return true;
		if(result[0] != MTUR_NO_ERROR) {
			for(i = 0; i < 4; i++)
				options.res[i] = 0;
		}
		if(options.callback.obj == null)
			options.callback.fn(options.res, options.callback.options);
		else
			options.callback.fn.call(options.callback.obj, options.res, options.callback.options);
	}, options);
}

mtCTown.prototype.getNearestTowns = function() {
	var	towns;
	var	i;
	var	coord;
	mtDev("2365 mtCTown.prototype.getNearestTowns");
	
	towns = new Array();
	for(i = 0; i < mtUser.getTownCount(); i++) {
		towns.push(mtUser.getTown(i));
	}
	
	coord = this.coord;
	towns.sort(function(a, b) {
		var	apos = a.getCoord(), bpos = b.getCoord();
		apos[0] -= coord[0];
		apos[1] -= coord[1];
		bpos[0] -= coord[0];
		bpos[1] -= coord[1];
		return (apos[0] * apos[0] + apos[1] * apos[1]) - (bpos[0] * bpos[0] + bpos[1] * bpos[1]);
	});
	
	return towns;
}

// --> private functions
mtCTown.prototype._initVisual = function(parentTable) {
	var	table;
	var	tr, td, div;
	var	i, j;
	var	fn;
	
	
	//mtDev("2272 mtCTown._initVisual");
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("town_id", this.objId);
	td = tr.insertCell(-1);
	td.style.backgroundColor = "#8FB695";	
	//td.className = "rbg";
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	i.style.color = "#FFFFFF";
	td.style.textAlign = "left";
	td.appendChild(i);	
	this.vTownName = i;
	this.vTownName.textContent = "" + this.townId;	// XXX
	
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	i.title = "refresh";
	i.style.verticalAlign = "middle";
	i.style.border = "1px outset lightgray";
	i.style.margin = "1px";
	i.innerHTML = "<img src='" + MTI_REFRESH + "'/>";
	i.style.backgroundColor = "#cccccc";	
	td.appendChild(i);
	i.addEventListener("click", function(ev) {
		var	obj;
		
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.reloadAll(0);
	}, false);
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("town_id", this.objId);
	td = tr.insertCell(-1);
	
	this.vTownArea = td;
	
	this.vTownArea.id = mtNewVisualId();
	this.vTownName.setAttribute("click_target", this.vTownArea.id);
	this.vTownName.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
			id = document.getElementById(id);
		if(id != null) {
			if(id.style.display == "none") {
				id.style.display = "";
			} else {
				id.style.display = "none";
			}
		}
	}, false);
	
	table = document.createElement("table");
	this.vTownArea.appendChild(table);
	table.width = "100%";
	this.vResArea = table;
	tr = table.insertRow(-1);
	
	this.vProduce = new Array(4);
	for(i = 0; i < 4; i++) {
		td = tr.insertCell(-1);
		td.innerHTML = '<img class="res" src="img/un/r/' + (i + 1) + '.gif">';
		
		td = tr.insertCell(-1);
		this.vProduce[i] = td;
		this.vProduce[i].textContent = "";
	}
	
	tr = table.insertRow(-1);
	this.vRes = new Array(4);
	for(i = 0; i < 4; i++) {
		td = tr.insertCell(-1);
		td.colSpan = 2;
		td.width = "25%";
		this.vRes[i] = td;
		this.vRes[i].textContent = "/";
	}

	tr = table.insertRow(-1);
	this.vResLabel = new Array(4);
	this.vResPercentage = new Array(4);
	for(i = 0; i < 4; i++) {
		td = tr.insertCell(-1);		
		this.vResPercentage[i] = td;		
		
		td = tr.insertCell(-1);
		//td.colSpan = 2;
		//td.width = "25%";
		this.vResLabel[i] = td;		
	}

	tr = table.insertRow(-1);	
	td = tr.insertCell(-1);
	td.innerHTML = '<img class="res" src="img/un/r/5.gif">';
	td = tr.insertCell(-1);
	this.vSupply = td;
	this.vSupply.textContent = "/";

	this.vAtt = new Array(4);
	for(i=1;i<=3;i++)
	{
	td = tr.insertCell(-1);
	td.innerHTML = '<img class="att'+i+'" src="img/x.gif">';
	td = tr.insertCell(-1);	
	this.vAtt[i] = td;	
	}
	
	tr = table.insertRow(-1);	
	td = tr.insertCell(-1);
	td.innerHTML = '<font color="red"><b>P</b></font>';
	td = tr.insertCell(-1);
	this.vParty = td;
	this.vDef = new Array(4);
	for(i=1;i<=3;i++)
	{
	td = tr.insertCell(-1);
	td.innerHTML = '<img class="def'+i+'" src="img/x.gif">';
	td = tr.insertCell(-1);
	this.vDef[i] = td;	
	}
	
	
	table = document.createElement("div");
	this.vWorking = table;
	this.vTownArea.appendChild(table);
	
	table = document.createElement("table");
	this.vTownArea.appendChild(table);
	table.width = "100%";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.className = "rbg";
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	td.appendChild(i);
	td.align = "right";
	//i.textContent = "Resource manager";
	i.textContent = "多村資源管理";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	this.vResourceManager = td;
	td.id = mtNewVisualId();
	i.setAttribute("click_target", td.id);
	i.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
			id = document.getElementById(id);
		if(id != null) {
			if(id.style.display == "none") {
				id.style.display = "";
			} else {
				id.style.display = "none";
			}
		}
	}, false);
	this.vResourceManager.style.display = "none";
	
	table = document.createElement("table");
	this.vResourceManager.appendChild(table);
	table.width = "100%";
	this.vResourceManagerConfig = new Object();
	
	fn = function(ev) {
		var	town;
		town = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		town.editResourceManagerConfig();
	};
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	//td.textContent = "Low water mark:";
	td.textContent = "開始運入資源:";
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	this.vResourceManagerConfig.vResLowWater = new Array(4);
	for(i = 0; i < 4; i++) {
		j = document.createElement("img");
		j.className = "res";
		j.src = "img/un/r/" + (i + 1) + ".gif";
		td.appendChild(j);
		
		j = document.createElement("input");
		j.type = "text";	
		j.size = 5;
		j.addEventListener("change", fn, false);
		this.vResourceManagerConfig.vResLowWater[i] = j;
		td.appendChild(j);
	}

	j = document.createElement("a");
	j.textContent = "[預設]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigDefault();
	}, false);
	td.appendChild(j);
	
	
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	//td.textContent = "Low preference:";
	td.textContent = "運入資源上限:";
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	this.vResourceManagerConfig.vResLowPref = new Array(4);
	for(i = 0; i < 4; i++) {
		j = document.createElement("img");
		j.className = "res";
		j.src = "img/un/r/" + (i + 1) + ".gif";
		td.appendChild(j);
		
		j = document.createElement("input");
		j.type = "text";
		j.size = 5;
		j.addEventListener("change", fn, false);
		this.vResourceManagerConfig.vResLowPref[i] = j;
		td.appendChild(j);
	}


	j = document.createElement("a");
	j.textContent = "[清除]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigClear();
	}, false);
	td.appendChild(j);



	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	i = document.createElement("input");
	i.type = "checkbox";
	i.addEventListener("change", fn, false);
	this.vResourceManagerConfig.vReactPeekCapacity = i;
	td.appendChild(i);
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	//td.textContent = "Allow reporting cargo spaces to other town.";
	td.textContent = "自動運入資源  ";
	
	j = document.createElement("a");
	j.textContent = "[集資造兵村";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigPushIn();
	}, false);
	td.appendChild(j);

	j = document.createElement("a");
	j.textContent = "/新村莊";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigNewVillage();
	}, false);
	td.appendChild(j);
	
	j = document.createElement("a");
	j.textContent = "/未滿普十]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigNewVillage2();
	}, false);
	td.appendChild(j);

	
	
	
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	//td.textContent = "High water mark:";
	td.textContent = "開始運出資源:";
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	this.vResourceManagerConfig.vResHighWater = new Array(4);
	for(i = 0; i < 4; i++) {
		j = document.createElement("img");
		j.className = "res";
		j.src = "img/un/r/" + (i + 1) + ".gif";
		td.appendChild(j);
		
		j = document.createElement("input");
		j.type = "text";
		j.size = 5;
		j.addEventListener("change", fn, false);
		this.vResourceManagerConfig.vResHighWater[i] = j;
		td.appendChild(j);
	}
	j = document.createElement("a");
	j.textContent = "[木";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigGoResource(0);
	}, false);
	td.appendChild(j);
	j = document.createElement("a");
	j.textContent = ".磚";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigGoResource(1);
	}, false);
	td.appendChild(j);
	j = document.createElement("a");
	j.textContent = ".鐵";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigGoResource(2);
	}, false);
	td.appendChild(j);
	j = document.createElement("a");
	j.textContent = ".米]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigGoResource(3);
	}, false);
	td.appendChild(j);




	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	//td.textContent = "High preference:";
	td.textContent = "運出後保留量:";
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	this.vResourceManagerConfig.vResHighPref = new Array(4);
	for(i = 0; i < 4; i++) {
		j = document.createElement("img");
		j.className = "res";
		j.src = "img/un/r/" + (i + 1) + ".gif";
		td.appendChild(j);
		
		j = document.createElement("input");
		j.type = "text";
		j.size = 5;
		j.addEventListener("change", fn, false);
		this.vResourceManagerConfig.vResHighPref[i] = j;
		td.appendChild(j);
	}
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.style.textAlign = "right";
	i = document.createElement("input");
	i.type = "checkbox";
	i.addEventListener("change", fn, false);
	this.vResourceManagerConfig.vReactPokeResource = i;
	td.appendChild(i);
	td = tr.insertCell(-1);
	td.style.textAlign = "left";
	//td.textContent = "Allow supplying resources to other town.";
	td.textContent = "自動運出資源  ";

	j = document.createElement("a");
	j.textContent = "[資源供應村/";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigPushOut();
	}, false);
	td.appendChild(j);

	j = document.createElement("a");
	j.textContent = "小型派對村/";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigSmallParty();
	}, false);
	td.appendChild(j);
	
	j = document.createElement("a");
	j.textContent = "大型派對村]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfigBigParty();
	}, false);
	td.appendChild(j);	


	
	i = document.createElement("div");
	this.vResourceManagerConfig.vActionArea = i;
	this.vResourceManager.appendChild(i);

	j = document.createElement("a");
	//j.textContent = "[Apply]";
	j.textContent = "[確定]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.applyResourceManagerConfig();
	}, false);
	i.appendChild(j);
	j = document.createElement("a");
	//j.textContent = "[Cancel]";
	j.textContent = "[取消]";
	j.href = "javascript:void(0);";
	j.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj.cancelResourceManagerConfig();
	}, false);
	i.appendChild(j);
	this.vResourceManagerConfig.vActionArea.style.display = "none";
	
	i = document.createElement("div");
	i.style.color = "gray";
	this.vResourceManagerMessage = i;
	i.textContent = "Idle";
	this.vResourceManager.appendChild(i);
	
	table = document.createElement("table");
	this.vTownArea.appendChild(table);
	table.width = "100%";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.className = "rbg";
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	td.appendChild(i);
	td.align = "right";
	//i.textContent = "Buildings";
	i.textContent = "村內建築(手動升級)";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	table = document.createElement("table");
	table.cellspacing = 1;
	table.cellpadding = 1;
	table.className = "tbg";
	td.appendChild(table);
	table.width = "100%";
	this.vBuildingArea = table;
	
	this.vBuildingArea.id = mtNewVisualId();
	i.setAttribute("click_target", this.vBuildingArea.id);
	i.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
			id = document.getElementById(id);
		if(id != null) {
			if(id.style.display == "none") {
				id.style.display = "";
			} else {
				id.style.display = "none";
			}
		}
	}, false);
	this.vBuildingArea.style.display = "none";
	
	
	
	table = document.createElement("table");
	this.vTownArea.appendChild(table);
	table.width = "100%";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.className = "rbg";
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	td.appendChild(i);
	td.align = "right";
	//i.textContent = "Resource manager";
	i.textContent = "村內兵力";
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	
	table = document.createElement("table");
	table.cellspacing = 1;
	table.cellpadding = 1;
	table.className = "tbg";
	td.appendChild(table);
	table.width = "100%";
	this.vRallyPointArea = table;
	
	this.vRallyPointArea.id = mtNewVisualId();
	i.setAttribute("click_target", this.vRallyPointArea.id);
	i.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
			id = document.getElementById(id);
		if(id != null) {
			if(id.style.display == "none") {
				id.style.display = "";
			} else {
				id.style.display = "none";
			}
		}
	}, false);
	this.vRallyPointArea.style.display = "none";	
	
	this.vVillageTroops = new Array(31);
	for(i = 0; i < 3; i++) {
		
		tr = table.insertRow(-1);
		for(j = 1; j <=10;j++)
		{
		td = tr.insertCell(-1);
		td.innerHTML = '<img class="unit u'+(i*10+j)+'" src="img/x.gif">';
		}
		
		tr = table.insertRow(-1);
		for(j = 1; j <=10;j++)
		{
		td = tr.insertCell(-1);	
		td.innerHTML = '&nbsp;';
		this.vVillageTroops[(i*10+j)] = td;
		}		
		
	}	
	
	
	table = document.createElement("table");
	this.vTownArea.appendChild(table);
	table.width = "100%";
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	td.className = "rbg";
	i = document.createElement("a");
	i.href = "javascript:void(0);";
	td.appendChild(i);
	td.align = "right";
	//i.textContent = "Schedule";
	i.textContent = "指定工作排程";
	
	j = document.createElement("a");
	j.href = "javascript:void(1);";
	td.appendChild(j);
	j.style.verticalAlign = "middle";
	j.style.border = "1px outset lightgray";
	j.style.margin = "1px";
	j.innerHTML = "<img src='" + MTI_ADD + "'/>";
	j.title = "Add a set of tasks";
	j.addEventListener("click", function(ev) {
		var	town;
		town = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		if(town != null) {
			town.addSchedule.call(town);
		}
	}, false);
	
	tr = table.insertRow(-1);
	td = tr.insertCell(-1);
	table = document.createElement("table");
	table.cellspacing = 1;
	table.cellpadding = 1;
	table.className = "tbg";
	td.appendChild(table);
	table.width = "100%";
	this.vTaskArea = table;
	
	this.vTaskArea.id = mtNewVisualId();
	i.setAttribute("click_target", this.vTaskArea.id);
	i.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
			id = document.getElementById(id);
		if(id != null) {
			if(id.style.display == "none") {
				id.style.display = "";
			} else {
				id.style.display = "none";
			}
		}
	}, false);
	//this.vTaskArea.style.display = "none";

	
	
	j = document.createElement("a");
	j.href = "javascript:void(1);";
	j.style.float = "right";
	j.style.color = "#FF0000";	
	j.innerHTML = "▲[Close]";
	this.vTownArea.appendChild(j);
	j.setAttribute("click_target", this.vTownArea.id);
	j.addEventListener("click", function(ev) {
		var	id = ev.target.getAttribute("click_target");
		if(id != null)
		{
			id = document.getElementById(id);
			id.style.display = "none";		
		}
	}, false);

		
}

mtCTown.prototype._update = function() {
	var	i,j;
	var	p;
	var	label;
	
	mtDev("2634 mtCTown._update");
	
	//this.vTownName.textContent = "#" + this.townId + ":";
	if(this.name != null)
		//this.vTownName.textContent += this.name;
		this.vTownName.textContent = this.name;
	if(this.coord != null)
		this.vTownName.textContent += "(" + this.coord[0] + "," + this.coord[1] + ")";
	
	for(i = 0; i < 4; i++) {
		this.vRes[i].textContent = "" + this.res[i] + "/" + this.resCapacity[i];
		if(this.produce[i] >= 0) {
			this.vProduce[i].textContent = "+" + this.produce[i] ;
		} else {
			this.vProduce[i].innerHTML = "<div style='color:red;'>" + this.produce[i] + "</div>";
		}
		p = Math.floor((this.res[i]/this.resCapacity[i])*100);
		this.vResPercentage[i].innerHTML = "<font size=1>" + p + "%</font>"		
		if(p>80) this.vResPercentage[i].style.background = "#80FFFF";	
		if(p>60 && p<=80) this.vResPercentage[i].style.background = "#97FF97";						
		if(p>=40 && p<60) this.vResPercentage[i].style.background = "#FFFF9D";			
		if(p>=20 && p<40) this.vResPercentage[i].style.background = "#FFBC79";			
		if(p<20) this.vResPercentage[i].style.background = "#CC8080";
		
		
		if(this.resLevel[i]==10) label = "<font color='#006000' size='1'>普";
		else label = "<font size=1>普";		
		label = label + this.resLevel[i] + "</font>";
		if(this.resAddExt[i] == 5  || this.resAddExt[i] == 10 ) label = label + "<font color='#2F58E6'>";
		label = label + "<font size=1>+" + this.resAddExt[i]*5 + "%</font>"; 
		
		this.vResLabel[i].innerHTML = label;//"<font size=1>普" + this.resLevel[i] + " +" + (this.resAddExt[i]*5) + "%</font>";
	}
	
	this.vSupply.innerHTML = "<font size=1>" + this.supplyUsed + "/" + this.supply + "</font>";
	
	for(i = 1; i <=3 ; i ++)
	{
		if(this.attackWaves[i] != null && this.attackTime[i] != null)
		this.vAtt[i].textContent = "(" + this.attackWaves[i] + ")" + this.attackTime[i] ;
		if(this.defenceWaves[i] != null && this.defenceTime[i] != null)
		this.vDef[i].textContent = "(" + this.defenceWaves[i] + ")" + this.defenceTime[i] ;
	}


	for(i = 1; i<=30 ; i++)
	{
		this.vVillageTroops[i].innerHTML = this.villageTroops[i];
	}
	
	
	
	if(this.party != null) this.vParty.textContent = this.party;
	
	if(this.working == null) {
		this.vWorking.style.color = "red";
		this.vWorking.textContent = "[Idle]";
		
	} else {
		this.vWorking.style.color = "";
		//this.vWorking.textContent = this.working + " till [" + new Date(this.workTil).toMTString() + "]";
		this.vWorking.textContent = this.working + " 結束於 [" + new Date(this.workTil).toMTString() + "]";
	}
	//mtDev("2660 this.vWorking.textContent = " + this.vWorking.textContent );
}

mtCTown.prototype._refreshTown_parse_dorf1 = function(req, arg) {
	var	html;
	var	i, j;
	var	re;
	var	tmp, tmp2;
	var	s;
	
	mtDev("2668 mtCTown._refreshTown_parse_dorf1");
	try {
		if(req.status != 200)
			mtUnexpected("dorf1.php?newdid=" + this.townId + " : " + req.status);
		html = req.responseText;
	} catch(e) {
		mtUnexpected("dorf1.php?newdid=" + this.townId + " : " + e);
	}
	
	if(!this.checkTownPage(html)) {
		this.refreshTown();
		return;
	}
	
	// parse for town name
	tmp = html.match(/<h1>(.+?)<br \/>/);
	
	//if(tmp == null)
	//	mtUnexpected("Town name fail. -- 2619");
	this.name = tmp[1];
	//mtDev("Town Name Parse 2663: " + tmp[1]);
	
		
	// parse for coordinate
	if(this.coord == null) {
		//jtyeh:20090527
		re = new RegExp('newdid='+this.townId+'.*\\r*\\n*.*class="cox">\\((.*?)<.*\\r*\\n*.*\\r*\\n.*class="coy">(.*?)\\)');		
		tmp = html.match(re);
		mtDev("2673 Coord Parse : " + tmp);
		if(tmp == null) {
			this.coord = mtCoord0;
		} else {
			this.coord = [parseInt(tmp[1]), parseInt(tmp[2])];
		}
	}
	
	// parse for current resources, producibilities, and capacities
	for(i = 0; i < 4; i++) {
		//re = new RegExp("<img class=\"res\" src=\"img\\/un\\/r\\/" + (i + 1) + "\\.gif\".*?\r\n<td id=l\\d title=(-?\\d+)>(\\d+)/(\\d+)</td>");
		//jtyeh: modify for T3.5
		re = new RegExp("<img src=\"img\\/x.gif\" class=\"r" + ( i + 1 ) + "\" .*\\r*\\n.*<td id=\"l\\d\" title=\"(-?\\d+)\">(\\d+)/(\\d+)</td>");
		
		tmp = html.match(re);
		if(tmp == null)
			mtUnexpected("Resource fail.");
			
		this.res[i] = parseInt(tmp[2]);
		this.produce[i] = parseInt(tmp[1]);
		this.resCapacity[i] = parseInt(tmp[3]);
		this.resLevel[i] = 10;
	}
	//tmp = html.match(/<img class="res" src="img\/un\/r\/5.gif".*?>&nbsp;(\d+)\/(\d+)/);
	tmp = html.match(/<img src="img\/x.gif" class="r5" .*>\r*\n*.*<td>(\d+)\/(\d+)/);
	if(tmp == null)
		tmp = html.match(/<td style="padding-top:4px;">(\d+)\/(\d+)/);
	if(tmp == null)
		mtUnexpected("Crop supply fail.");
			
//	mtDev("3170 supplyUsed = " + tmp[1]);			
	this.supplyUsed = parseInt(tmp[1]);
//	mtDev("3172 supplyUsed parsed = " + this.supplyUsed );
	this.supply = parseInt(tmp[2]);
	
	// parse for farms
	for(i = 0; i < 18; i++) {
		//re = new RegExp("<area href=\"build.php\\?id=" + (i + 1) + "\" coords=\"\\d+,\\d+,\\d+\" shape=\"circle\" title=\"(\\S+) \\S+ (\\d+)\"\\/>");

		re = new RegExp("<img src=\"img\/x.gif\" class=\"reslevel rf"+(i+1)+" level\\d+\" alt=\"(\\S+) \\S+ (\\d+)\" \/>");

		tmp = html.match(re);
		if(tmp == null)
		{
			re = new RegExp("<area href=\"build.php\\?id=" + (i+1) + "\" coords=\"\\d+,\\d+,\\d+\" shape=\"circle\" title=\"(\\S+) \\S+ (\\d+)\"");
			tmp = html.match(re);
		}
		//mtDev(tmp);
		if(tmp == null) mtUnexpected("Building fail.(1)");
			
		for(j = 1; j < 5; j++) {
			if(mtBuildingName[j] == tmp[1]) {
				if(this.building[i] == null)
					this.building[i] = new mtCBuilding(this, i + 1, j, parseInt(tmp[2]), this.vBuildingArea);
				else
					this.building[i].setBuilding(j, parseInt(tmp[2]));
					
				if(this.resLevel[j-1] > parseInt(tmp[2])) this.resLevel[j-1] = parseInt(tmp[2]);
					
				break;
			}
		}
		if(j == 5)
			mtUnexpected("Building fail.(2)");
	}
	
	//	<td><div class="mov"><span class="a3">1&nbsp;攻擊</span></div><div class="dur_r">在&nbsp;<span id="timer1">16:48:28</span>&nbsp;小時</div></div></td></tr></tbody></table>
		
	//tmp = html.match(/<div class="mov"><span class="[ad][1-3]">(\d+)\S+</span><\/div><div class="dur_r">\S+<span id="timer\d">(.*)<\/span>\S+小時<\/div><\/div><\/td>/g);
	
	
	tmp = html.match(/<td><div class="mov"><span class="\S\d">\d+&nbsp;\S+<\/span><\/div><div class="dur_r">\S+<span id="timer\d+">\S+<\/span>\S+小時<\/div><\/div><\/td><\/tr>/g);	
	if(tmp!=null)
	{		
		for(i=0;i<tmp.length;i++)
		{
			mtDev("3270 tmp[i] " + tmp[i]);
			//this.attack[i] = false;								
			tmp2 = tmp[i].match(/<td><div class="mov"><span class="(\S)(\d)">(\d+)&nbsp;\S+<\/span><\/div><div class="dur_r">\S+<span id="timer\d+">(\S+)<\/span>\S+小時<\/div><\/div><\/td><\/tr>/);
			if(tmp2[1] == "a")
			{
				//this.attack = true;					
				for(j=1; j<=3 ; j++)
				{
					if(tmp2[2] == j)
					{
						if(this.attackWaves[j] != tmp2[3])				
						{		
							if(j==1) mtLog(tmp2[3] + " 攻擊於 " + tmp2[4] + " 到達 " + this.name);
							if(j==2) mtLog(this.name + " 發出 " + tmp2[3] + " 攻擊於 " + tmp2[4] + " 到達目標");
							if(j==3) mtLog(tmp2[3] + " 攻擊於 " + tmp2[4] + " 到達 " + this.name + "的綠洲");
							recAtkDef("a"+j);
						}
						this.attackWaves[j] = tmp2[3];			
						this.attackTime[j] = tmp2[4];
						
					}
				}
				
				if(this.attackWaves[j] == null)
				{
					this.attackWaves[j] = 0;
					this.attackTime[j] = null;
				}	
			}
			if(tmp2[1] == "d")
			{
				for(j=1; j<=3 ; j++)
				{
					if(tmp2[2] == j)
					{
						this.defenceWaves[j] = tmp2[3];			
						this.defenceTime[j] = tmp2[4];
					}
				}					

				if(this.defenceWaves[j] == null)
				{
					this.defenceWaves[j] = 0;
					this.defenceTime[j] = null;
				}	


			}			
		}
	}	
	

/*
<img class="unit uhero" src="img/x.gif" alt="英雄" title="英雄" /></a></td>
					<td class="num">1</td>



*/

	tmp = html.match(/<img class="unit u\d+" src="img\/x\.gif" alt="\S+" title="\S+" \/><\/a><\/td>\r*\n*\s*<td class="num">\d+<\/td>/g);	
	if(tmp!=null)
	{
	for(i=0;i<=30;i++) this.villageTroops[i] = "";
	if(tmp.length>0)
	for(i=0;i<tmp.length;i++)
		{
			tmp1 = tmp[i].match(/"unit u(\d+)"/);// .*<td class="num">(\d+)/);					
			tmp2 = tmp[i].match(/"num">(\d+)/);
			this.villageTroops[parseInt(tmp1[1])] = parseInt(tmp2[1]);
		}
	}	
	this._refreshWorking_parse(html);
	
	this._update();
	
	if((this.initStatus & 1) == 0) {
		this.initStatus |= 1;
		if(this.initStatus == 3) {
			this.loadConfig();
			this.startResourceManager();
		}
	}
}

mtCTown.prototype._refreshCity_parse_dorf2 = function(req, arg) {
	var	html;
	var	i, j;
	var	re;
	var	tmp;
	var	s;
	
	
	mtDev("2775 mtCTown._refreshCity_parse_dorf2");
	
	try {
		if(req.status != 200)
			mtUnexpected("dorf2.php?newdid=" + this.townId + " : " + req.status);
		html = req.responseText;
	} catch(e) {
		mtUnexpected("dorf2.php?newdid=" + this.townId + " : " + e);
	}
	
	if(!this.checkTownPage(html)) {
		this.refreshCity();
		return;
	}
	
	
	
	// parse for town name

	tmp = html.match(/<h1>(.*?)<\/h1>/);

	if(tmp == null)
		mtUnexpected("Town name fail. -- 2726");
	this.name = tmp[1];
  		
	// parse for coordinate
	if(this.coord == null) {
		re = new RegExp('<a href="\\?newdid=' + this.townId + '.*\\r\\n<tr>\\r\\n<td class="right dlist1">\\((-?\\d+)<\\/td>\\r\\n<td class="center dlist2">\\|<\\/td>\\r\\n<td class="left dlist3">(-?\\d+)\\)<\\/td>');
		tmp = html.match(re);
		if(tmp == null) {
			this.coord = mtCoord0;
		} else {
			this.coord = [parseInt(tmp[1]), parseInt(tmp[2])];
		}
	}
	
	// parse for current resources, producibilities, and capacities
	for(i = 0; i < 4; i++) {
		re = new RegExp("<img src=\"img\\/x.gif\" class=\"r" + ( i + 1 ) + "\" .*\\r*\\n*.*<td id=\"l\\d\" title=\"(-?\\d+)\">(\\d+)/(\\d+)</td>");
		tmp = html.match(re);
		if(tmp == null)
			mtUnexpected("Resource fail.");
			
		this.res[i] = parseInt(tmp[2]);
		this.produce[i] = parseInt(tmp[1]);
		this.resCapacity[i] = parseInt(tmp[3]);
		this.resAddExt[i] = 0;
	}
	//tmp = html.match(/<img class="res" src="img\/un\/r\/5.gif".*?>&nbsp;(\d+)\/(\d+)/);
	tmp = html.match(/<img src="img\/x.gif" class="r5" .*>\r*\n*.*<td>(\d+)\/(\d+)/);
	if(tmp == null)
		tmp = html.match(/<td style="padding-top:4px;">(\d+)\/(\d+)/);
	if(tmp == null)
		mtUnexpected("Crop supply fail.");
	this.supplyUsed = parseInt(tmp[1]);
	this.supply = parseInt(tmp[2]);
	
	// parse for buildings
	for(i = 18; i < 38; i++) {
		re = new RegExp("<area href=\"build.php\\?id=" + (i + 1) + "\".*?title=\"(.*?)\".*?>");
		tmp = html.match(re);
		if(tmp == null)
			mtUnexpected("Building fail.(3)");
			
		if(tmp[1] == mtBuildingName[0]) {
			if(this.building[i] == null)
				this.building[i] = new mtCBuilding(this, i + 1, MTB_EMPTY, 0, this.vBuildingArea);
			else
				this.building[i].setBuilding(MTB_EMPTY, 0);
		} else {
			tmp = tmp[1].match(/(\S+).*?(\d+)/);
			if(tmp == null)
				mtUnexpected("Building fail.(4)");
			for(j = 5; j < mtBuildingName.length; j++) {
				if(mtBuildingName[j] == tmp[1]) {
					if(this.building[i] == null)
						this.building[i] = new mtCBuilding(this, i + 1, j, parseInt(tmp[2]), this.vBuildingArea);
					else
						this.building[i].setBuilding(j, parseInt(tmp[2]));
						
						
					if(j>=5 && j<=8) this.resAddExt[j-5]	= parseInt(tmp[2]);
					if(j==9) this.resAddExt[3] += parseInt(tmp[2]);
						
					break;
				}
			}
			if(j == mtBuildingName.length)
			{
				if(tmp[1].match(mtBuildingName[MTB_TRAPPER]) !=null)
				{
					j = MTB_TRAPPER;
					this.building[i].setBuilding(j, parseInt(tmp[2]));
				}
						
			}
			if(j == mtBuildingName.length)			
				mtUnexpected("Building fail.(5)" + tmp[1]);
		}
	}
	
	// parse rally point
	tmp = html.match(/<area href="build.php\?id=39".*?title="(.*?)".*?>/);
	if(tmp == null)
		mtUnexpected("Building fail.(5)");
		
	tmp = tmp[1].match(/(\S+).*?(\d+)/);
	if(tmp == null) {
		if(this.building[38] == null)
			this.building[38] = new mtCBuilding(this, 39, MTB_EMPTY, 0, this.vBuildingArea);
		else
			this.building[38].setBuilding(MTB_EMPTY, 0);
	} else if(tmp[1] == mtBuildingName[MTB_RALLY_POINT]) {
		if(this.building[38] == null)
			this.building[38] = new mtCBuilding(this, 39, MTB_RALLY_POINT, parseInt(tmp[2]), this.vBuildingArea);
		else
			this.building[38].setBuilding(MTB_RALLY_POINT, parseInt(tmp[2]));
	} else
		mtUnexpected("Building fail.(6)");
	
	// parse walls
	tmp = html.match(/<area href="build.php\?id=40".*?title="(.*?)".*?>/);
	if(tmp == null)
		mtUnexpected("Building fail.(7)");
		
	tmp = tmp[1].match(/(\S+).*?(\d+)/);
	if(tmp == null) {
		if(this.building[39] == null)
			this.building[39] = new mtCBuilding(this, 40, MTB_EMPTY, 0, this.vBuildingArea);
		else
			this.building[39].setBuilding(MTB_EMPTY, 0);
	} else {
		for(i = MTB_CITY_WALL; i <= MTB_PALISADE; i++) {
			if(tmp[1] == mtBuildingName[i])
				break;
		}
		if(i > MTB_PALISADE)
			mtUnexpected("Building fail.(6)");
		if(this.building[39] == null)
			this.building[39] = new mtCBuilding(this, 40, i, parseInt(tmp[2]), this.vBuildingArea);
		else
			this.building[39].setBuilding(i, parseInt(tmp[2]));
	}
	
	this._refreshWorking_parse(html);
	
	this._update();
	
	if((this.initStatus & 2) == 0) {
		this.initStatus |= 2;
		if(this.initStatus == 3) {
			this.loadConfig();
			this.startResourceManager();
		}
	}
	
	
}

mtCTown.prototype._refreshWorking_parse = function(html) {
	var	tmp;
	var	i;

	mtDev("2922 mtCTown._refreshWorking_parse");
	
	// check for working
	tmp = html.match(/<a href="\?d=\d+&amp;a=\d+&amp;c=[0-9a-fA-F]+">.*?<\/a><\/td><td>(.*?)<\/td><td><span id="timer\d+">(\d+):(\d+):(\d+)<\/span>/);
	
	if(tmp == null)	tmp = html.match(/<a href="\?d=\d+&amp;a=\d+&amp;c=[0-9a-fA-F]+">.*<\/a><\/td>\r*\n<td>(.*?)<\/td>\r*\n<td><span id="timer\d+">(\d+):(\d+):(\d+)<\/span>/);
	//mtDev("2926 tmp = " + tmp);
	if(tmp != null) {
		this.working = tmp[1];
		this.workLast = ((parseInt(tmp[2]) * 60) + parseInt(tmp[3])) * 60 + parseInt(tmp[4]);
		this.workTil = new Date().getTime() + (this.workLast * 1000);
		if(this.reloadTimer != null) {
			mtClearTimeout(this.reloadTimer);
			this.reloadTimer = null;
		}
		tmp = tmp[1].match(/^\S*(?=\s)/);
		for(i = 0; i < mtBuildingName.length; i++) {
			if(tmp[0] == mtBuildingName[i])
				break;
		}
		this.reloadTimer = mtSetTimeout(this, this.reloadAll, i,
			this.workLast * 1000 + 2000);	// Give 2 seconds of buffer
	} else {
		this.working = null;
		this.workLast = 0;
		if(this.reloadTimer == null)	// Refresh one time in at most 10 minutes
			this.reloadTimer = mtSetTimeout(this, this.reloadAll, 0, 10 * 60 * 1000);
		while((i = this.idleListeners.shift()) != null) {
			if(i[0] == null)
				i[1](i[2]);
			else
				i[1].call(i[0], i[2]);
		}
	}
}
/* ==== class mtCTown ==== */

/* ==== class mtCBuilding ==== */
var	MTUE_IN_PROGRESS = 0,				// [MTUE_IN_PROGRESS, upgradeHandle]
	MTUE_TYPE_MISMATCH = -1,			// [MTUE_TYPE_MISMATCH]
	MTUE_TOWN_BUSY = -2;				// [MTUE_TOWN_BUSY]
var	MTUR_NO_ERROR = 0,				// [MTUR_NO_ERROR]
	MTUR_CANCELED = 1,				// [MTUR_CANCELED]
	MTUR_QUERY_TRANSFER = 2,			// [MTUR_QUERY_TRANSFER, target, timeCost, traderNeed]
	MTUR_NOT_ALLOWED = -1,				// [MTUR_NOT_ALLOWED]
	MTUR_INSUFFICIENT_RESOURCE = -2,		// [MTUR_INSUFFICIENT_RESOURCE, [woodWant, clayWant, ironWant, cropWant], supplyWant]
	MTUR_SOME_ERROR = -3,				// [MTUR_SOME_ERROR, message]
	MTUR_NETWORK_ERROR = -4,			// [MTUR_NETWORK_ERROR]
	MTUR_UNKNOWN_ERROR = -5;			// [MTUR_UNKNOWN_ERROR]

function mtCBuilding(town, id, type, level, parentTable) {
	this.objId = mtNewId();
	this.town = town;
	this.id = id;
	this.type = type;
	this.level = level;
	this._initVisual(parentTable);
	this._update();
	
	this.lastQuery = 0;
	this.queryWaiting = null;
	this.info = null;
}

mtCBuilding.prototype.getObjId = function() {
	return this.objId;
}

mtCBuilding.prototype.getId = function() {
	return this.id;
}

mtCBuilding.prototype.getType = function() {
	return this.type;
}

mtCBuilding.prototype.getLevel = function() {
	return this.level;
}

mtCBuilding.prototype.setBuilding = function(type, level) {
	if(this.type != type)
		this.cancelAction();
	this.type = type;
	this.level = level;
	this._update();
}

mtCBuilding.prototype.queryInfo = function(expire, obj, callback, options) {
	
	mtDev("3010 mtCBuilding.queryInfo");
	
	if(this.queryWaiting == null) {
		mtDev(3883);
		if(this.info != null && new Date().getTime() - this.lastQuery < expire * 1000) {
			mtDev(3885);
			if(obj == null) {
				mtDev(3887);
				callback(this.info, options);
			} else {
				mtDev(3890);
				callback.call(obj, this.info, options);
			}
		} else {
				mtDev(3894);
			this.queryWaiting = new Array();
			this.queryWaiting.push([obj, callback, options]);
			this._reload_build(null);
		}
	} else {
				mtDev(3900);
		this.queryWaiting.push([obj, callback, options]);
	}
}

mtCBuilding.prototype.upgrade = function(type, reserveRes, obj, callback, options) {
	var	town;
	
	mtDev("3032 mtCBuilding.upgrade");
	
	town = this.town;
	if(this.type != MTB_EMPTY && this.type != type) {
		return [MTUE_TYPE_MISMATCH];
	}

	//jtyeh:20090604 1336 mark up the MTUE_TOWN_BUSY 
	//For Roam, to check if there still available building process can be achieve.
	//Should modify the checking rule, get the target page again, if not available, return [MTUE_TOWN_BUSY];
	if(mtUserRace > 0 && town.getWorking() != null) {
		return [MTUE_TOWN_BUSY];
	}	
	
	options = [true, type, reserveRes, obj, callback, options];
	this.queryInfo(0, this, this._queryUpgrade, options);
	return [MTUE_IN_PROGRESS, options];


	
}

mtCBuilding.prototype.calcelUpgrade = function(options) {
	options[0] = false;
}

mtCBuilding.prototype.transferResource = function(target, resource, reserveRes, obj, callback, options) {
	var	town;
	var	i;
	var	data;
	
	mtDev(" 3002 mtCBuilding.transferResource");
	
	town = this.town;
	mtDev(3942);
	if(this.type != MTB_MARKETPLACE) {
		mtDev(3944);
		return [MTUE_TYPE_MISMATCH];
	}
	
	mtDev(3948);
	data = "id=" + this.id;
	for(i = 0; i < 4; i++) {
		data += "&r" + (i + 1) + "=" + resource[i];
	}
	data += "&x=" + target[0];
	data += "&y=" + target[1];
	data += "&s1.x=0&s1.y=0&s1=ok";	// Like browser does
	
	options = [true, target, resource, reserveRes, obj, callback, options];
	mtDev("3958 " + options);
	mtOOPost("build.php?newdid=" + this.town.getId(), data,
		this, this._transferResource_parse_build, options);
	return [MTUE_IN_PROGRESS, options];
}

mtCBuilding.prototype.clickAction = function(pos) {
	var	div;
	var	a;
	
	if(this.vAction == null) {
		div = document.createElement("div");
		this.vAction = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.town.getObjId());
		div.setAttribute("build_id", this.id - 1);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		this.initAction();
		
		a = document.createElement("br");
		div.appendChild(a);
		
		a = document.createElement("a");
		a.href = "javascript:void(0);";
		a.textContent = "[OK]";
		a.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.getBuilding(mtGetAttribute(ev.target, "build_id"));
			obj.applyAction();
		}, false);
		div.appendChild(a);
		a = document.createElement("a");
		a.href = "javascript:void(0);";
		a.textContent = "[Cancel]";
		a.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.getBuilding(mtGetAttribute(ev.target, "build_id"));
			obj.cancelAction();
		}, false);
		div.appendChild(a);
	} else {
		div = this.vAction;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
}

mtCBuilding.prototype.initAction = function() {
	var	div;
	var	tmp;
	var	i;
	var	opt;
	
	div = this.vAction;
	if(this.type == MTB_MARKETPLACE) {
		tmp = document.createElement("select");
		for(i = 0; i < mtUser.getTownCount(); i++) {
			opt = document.createElement("option");
			opt.value = mtPosXYToId(mtUser.getTown(i).getCoord()[0], mtUser.getTown(i).getCoord()[1]);
			opt.text = mtUser.getTown(i).getName();
			tmp.add(opt, null);
		}
		div.appendChild(tmp);
		tmp.addEventListener("change", function(ev) {
			var	pos = ev.target.options[ev.target.selectedIndex].value;
			ev.target.nextSibling.nextSibling.value = mtPosIdToXY(pos)[0];
			ev.target.nextSibling.nextSibling.nextSibling.nextSibling.value = mtPosIdToXY(pos)[1];
		}, false);
		
		tmp = document.createElement("span");
		tmp.textContent = "X:";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vTargetX = tmp;
		tmp.size = 5;
		div.appendChild(tmp);
		tmp = document.createElement("span");
		tmp.textContent = "Y:";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vTargetY = tmp;
		tmp.size = 5;
		div.appendChild(tmp);
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("div");
		tmp.textContent = "Resource: ";
		div.appendChild(tmp);
		
		this.vResource = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			this.vResource[i] = tmp;
			div.appendChild(tmp);
		}
	}
}

mtCBuilding.prototype.applyAction = function() {
	
	
	mtDev("mtCBuilding.applyAction 3139");
	
	if(this.type == MTB_MARKETPLACE) {
		var	ret;
		var	callback = function(result, options) {
			if(result[0] == MTUR_NO_ERROR) {
				alert("Transfer executed.");
			} else if(result[0] == MTUR_INSUFFICIENT_RESOURCE) {
				alert("Insufficient resource. Need " + result[1] + ", supply " + result[2]);
			} else if(result[0] == MTUR_SOME_ERROR) {
				alert(result[1]);
			} else if(result[0] == MTUR_NETWORK_ERROR) {
				alert("Network error");
			} else if(result[0] == MTUR_UNKNOWN_ERROR) {
				alert("Unknown error");
			} else if(result[0] == MTUR_QUERY_TRANSFER) {
				//return confirm("target:" + result[1].name + "(" + result[1].coord + ")\r\n" + result[1].owner.name + "(#" + result[1].owner.id + ")\r\n" + "Need: " + mtTimeRepresent(result[2]) + ", " + result[3]);
				return true;
			} else {
				alert("Result: " + result[0]);
			}
		};
		var	target = [parseInt(this.vTargetX.value), parseInt(this.vTargetY.value)];
		var	resource = [parseInt(this.vResource[0].value), parseInt(this.vResource[1].value), parseInt(this.vResource[2].value), parseInt(this.vResource[3].value)];
		var	i;
		
		if(isNaN(target[0]) || isNaN(target[1])) {
			alert("Invalid target.");
		} else {
			for(i = 0; i < 4; i++) {
				if(isNaN(resource[i]))
					resource[i] = 0;
			}
			ret = this.transferResource(
				target,
				resource,
				[0, 0, 0, 0],
				null, callback, null);
			if(ret[0] == MTUE_IN_PROGRESS) {
			} else if(ret[0] == MTUE_TYPE_MISMATCH) {
				alert("Not marketplace.");
			} else {
				alert("Error: " + ret[0]);
			}
		}
	} else
		alert("No action is implemented for this building.");
		
	this.cancelAction();
}

mtCBuilding.prototype.cancelAction = function() {
	if(this.vAction != null) {
		this.vAction.parentNode.removeChild(this.vAction);
		this.vAction = null;
	}
}

mtCBuilding.prototype.clickUpgrade = function() {
	var	callback = function(result, options) {
		if(result[0] == MTUR_NO_ERROR) {
			alert("Upgrading executed.");
		} else if(result[0] == MTUR_CANCELED) {
			alert("Canceled");
		} else if(result[0] == MTUR_NOT_ALLOWED) {
			alert("This building is not allowed now.");
		} else if(result[0] == MTUR_INSUFFICIENT_RESOURCE) {
			alert("Insufficient resource. Need " + result[1] + ", supply " + result[2]);
		} else if(result[0] == MTUR_SOME_ERROR) {
			alert(result[1]);
		} else {
			alert("Result: " + result[0]);
		}
	};
	var	ret;
	
	if(this.type == MTB_EMPTY) {
		ret = this.upgrade(this.vUpgradeType.options[this.vUpgradeType.selectedIndex].value,
			[0, 0, 0, 0, null],
			null, callback, null);
	} else {
		ret = this.upgrade(this.type,
			[0, 0, 0, 0, null],
			null, callback, null);
	}
	if(ret[0] == MTUE_IN_PROGRESS) {
	} else if(ret[0] == MTUE_TYPE_MISMATCH) {
		alert("Type mismatch!");
	} else if(ret[0] == MTUE_TOWN_BUSY) {
		alert("Town is busy.");
	} else {
		alert("Error: " + ret[0]);
	}
}

// --> private functions
mtCBuilding.prototype._initVisual = function(parentTable) {
	var	tr, td;
	var	a;
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("build_id", this.id - 1);
	
	td = tr.insertCell(-1);
	td.textContent = this.id;
	td.setAttribute("build_id", this.id - 1);
	td.addEventListener("click", function(ev) {
		var	obj;
		
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.getBuilding(parseInt(ev.target.getAttribute("build_id")));
		obj.queryInfo(0, null, function(info, options) {
			var	s;
			var	i;
			s = "";
			s += info.trader + "/" + info.traderMax + "(" + info.traderCapacity + ")";
			alert(s);
			s = "";
			for(i = 0; i < info.incomingTraders.length; i++) {
				s += info.incomingTraders[i].from.name + "(" + info.incomingTraders[i].from.coord + ")[" + info.incomingTraders[i].owner.name + "(" + info.incomingTraders[i].owner.id + ")]:" + info.incomingTraders[i].resource[0] + "," + info.incomingTraders[i].resource[1] + "," + info.incomingTraders[i].resource[2] + "," + info.incomingTraders[i].resource[3] + "\r\n";
			}
			alert(s);
			s = "";
			for(i = 0; i < info.outgoingTraders.length; i++) {
				s += info.outgoingTraders[i].to.name + "(" + info.outgoingTraders[i].to.coord + ")[" + info.outgoingTraders[i].owner.name + "(" + info.outgoingTraders[i].owner.id + ")]:" + info.outgoingTraders[i].resource[0] + "," + info.outgoingTraders[i].resource[1] + "," + info.outgoingTraders[i].resource[2] + "," + info.outgoingTraders[i].resource[3] + "\r\n";
			}
			alert(s);
			s = "";
			for(i = 0; i < info.returningTraders.length; i++) {
				s += info.returningTraders[i].from.name + "(" + info.returningTraders[i].from.coord + ")[" + info.returningTraders[i].owner.name + "(" + info.returningTraders[i].owner.id + ")]:" + info.returningTraders[i].resource[0] + "," + info.returningTraders[i].resource[1] + "," + info.returningTraders[i].resource[2] + "," + info.returningTraders[i].resource[3] + "\r\n";
			}
			alert(s);
			alert(info.incomingResource[0] + "," + info.incomingResource[1] + "," + info.incomingResource[2] + "," + info.incomingResource[3]);
		}, null);
	}, false);
	
	td = tr.insertCell(-1);
	this.vType = td;
	
	td = tr.insertCell(-1);
	this.vLevel = td;
	
	td = tr.insertCell(-1);
	this.vUpgrade = td;
	this.vUpgradeType = null;
	
	a = document.createElement("a");
	a.textContent = "Upgrade";
	a.href = "javascript:void(0);";
	a.addEventListener("click", function(ev) {
		var	obj;
		
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.getBuilding(mtGetAttribute(ev.target, "build_id"));
		obj.clickUpgrade();
	}, false);
	td.appendChild(a);
	
	td = tr.insertCell(-1);
	this.vActionCell = td;
	this.vAction = null;
	a = document.createElement("a");
	a.textContent = "...";
	a.href = "javascript:void(0);";
	a.addEventListener("click", function(ev) {
		var	pos;
		var	obj;
		
		pos = mtGetVisualPlacement(ev.target);
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.getBuilding(mtGetAttribute(ev.target, "build_id"));
		obj.clickAction([pos[0], pos[1] + pos[3]]);
	}, false);
	td.appendChild(a);
}

mtCBuilding.prototype._update = function() {
	var	mtBuildingColor = [
	"lightgrey",	//"建築物工地",	// g0
	"burlywood",	//"伐木場",	// g1
	"coral",	//"泥坑",	// g2
	"dimgray",	//"鐵礦場",	// g3
	"green",	//"農場",	// g4
	"burlywood",	//"鋸木廠",	// g5
	"coral",	//"磚廠",	// g6
	"dimgray",	//"鋼鐵鑄造廠",	// g7
	"green",	//"麵粉廠",	// g8
	"green",	//"麵包店",	// g9
	"mediumblue",	//"倉庫",	// g10
	"mediumblue",	//"穀倉",	// g11
	"purple",	//"鐵匠",	// g12
	"purple",	//"盔甲廠",	// g13
	"",	//"競技場",	// g14
	"gray",	//"村莊大樓",	// g15
	"",	//"集結點",	// g16
	"",	//"市場",	// g17
	"",	//"大使館",	// g18
	"crimson",	//"兵營",	// g19
	"crimson",	//"馬棚",	// g20
	"crimson",	//"工場",	// g21
	"purple",	//"研究院",	// g22
	"mediumblue",	//"山洞",	// g23
	"",	//"城鎮廳",	// g24
	"",	//"行宮",	// g25
	"",	//"皇宮",	// g26
	"",	//"寶物庫",	// g27
	"",	//"交易所",	// g28
	"crimson",	//"大兵營",	// g29
	"crimson",	//"大馬廄",	// g30
	"gray",	//"城牆",	// g31
	"gray",	//"土牆",	// g32
	"gray",	//"木牆",	// g33
	"",	//"石匠鋪",	// g34
	"",	//"釀酒廠",	// g35
	"",	//"陷阱",	// g36
	"",	//"英雄宅",	// g37
	"mediumblue",	//"大倉庫",	// g38
	"mediumblue",	//"大穀倉",	// g39
	"",	//"世界奇觀",	// g40
	];
	var	sel, opt;
	var	i;
	
	//mtDev("mtCBuilding._update 3358");
	
	this.vType.style.color = mtBuildingColor[this.type];
	this.vLevel.style.color = mtBuildingColor[this.type];
	this.vType.textContent = mtBuildingName[this.type];
	this.vLevel.textContent = "LV " + this.level;
	if(this.type == MTB_EMPTY) {
		if(this.vUpgradeType == null) {
			sel = document.createElement("select");
			this.vUpgradeType = sel;
			this.vUpgrade.insertBefore(sel, this.vUpgrade.firstChild);
			for(i = 0; i < mtBuildingName.length; i++) {
				opt = document.createElement("option");
				opt.value = i;
				opt.style.color = mtBuildingColor[i];
				if(opt.value == MTB_EMPTY)
					opt.text = "Do nothing";
				else
					opt.text = mtBuildingName[i];
				sel.add(opt, null);
			}
		}
	} else {
		if(this.vUpgradeType != null) {
			this.vUpgrade.removeChild(this.vUpgradeType);
			this.vUpgradeType = null;
		}
	}
}

mtCBuilding.prototype._queryUpgrade = function(info, options) {
	var	type = options[1];
	var	reserveRes = options[2];
	var	obj = options[3];
	var	callback = options[4];
	var	town;
	var	i, idx;
	var	url, reason;
	var	cost;
	
	
	
	mtDev("3459 mtCBuilding.prototype._queryUpgrade");
	
	
	if(options[0] == false) {
		if(obj == null)
			callback([MTUR_CANCELED], options[5]);
		else
			callback.call(obj, [MTUR_CANCELED], options[5]);
		return;
	}
		
	town = this.town;
	if(this.type == MTB_EMPTY) {
		idx = null;
			for(i = 0; i < info.build.length; i++) {			
				

			if(info.build[i].id == type) {				
				idx = i;
				break;
			}
		}
		if(idx == null) {
			if(obj == null)
				callback([MTUR_NOT_ALLOWED], options[5]);
			else
				callback.call(obj, [MTUR_NOT_ALLOWED], options[5]);
			return;
		}
		cost = info.build[idx].cost;
		url = info.build[idx].href;
		mtDev("4365 " + info.build[idx].href);
		reason = info.build[idx].reason;
	} else {
		if(info.upgrade == null) {
			if(obj == null)
				callback([MTUR_SOME_ERROR, info.upgradeReason], options[5]);
			else
				callback.call(obj, [MTUR_SOME_ERROR, info.upgradeReason], options[5]);
			return;
		}
		cost = info.upgrade.cost;
		url = info.upgrade.href;
		if(url.indexOf("amp;") > 0)
		url= url.substring(0,url.indexOf("amp;")-1) + url.substring(url.indexOf(";amp")+4, url.length);
		mtDev("4377 url=" + url);
		reason = info.upgrade.reason;
	}
	
	for(i = 0; i < 4; i++) {
		if(reserveRes[i] != null && town.getResource(i) < reserveRes[i] + cost[i]) {
			break;
		}
	}
	if(i < 4 || (reserveRes[4] != null && town.getSupplyUsed() + reserveRes[4] + cost[4] > town.getSupply())) {
		for(i = 0; i < 5; i++)
			if(reserveRes[i] != null)
				cost[i] += reserveRes[i];
		if(obj == null)
			callback([MTUR_INSUFFICIENT_RESOURCE,
				[cost[0], cost[1], cost[2], cost[3]],
				town.getSupplyUsed() + cost[4]],
				options[5]);
		else
			callback.call(obj, [MTUR_INSUFFICIENT_RESOURCE,
				[cost[0], cost[1], cost[2], cost[3]],
				town.getSupplyUsed() + cost[4]],
				options[5]);
		return;
	}
	
	if(url == null) {
		if(obj == null)
			callback([MTUR_SOME_ERROR, reason], options[5]);
		else
			callback.call(obj, [MTUR_SOME_ERROR, reason], options[5]);
		return;
	}
	
	url += "&newdid=" + town.getId();
	
	mtOOGetSoon(url, this, this._postUpgrade, options);
}

mtCBuilding.prototype._postUpgrade = function(req, options) {
	var	type = options[1];
	var	reserveRes = options[2];
	var	obj = options[3];
	var	callback = options[4];
	
	mtParseGlobal(req);
	
	if(type >= MTB_SAWMILL)	// is city building
		this.town.refreshCity();
	else
		this.town.refreshTown();
		
	if(obj == null)
		callback([MTUR_NO_ERROR], options[5]);
	else
		callback.call(obj, [MTUR_NO_ERROR], options[5]);
}

mtCBuilding.prototype._transferResource_parse_build = function(req, options) {
	var	target = options[1];
	var	resource = options[2];
	var	reserveRes = options[3];
	var	obj = options[4];
	var	callback = options[5];
	var	html;
	var	i;
	var	tmp;
	var	data;
	
	mtParseGlobal(req);
	mtDev("3583 mtCBuilding._transferResource_parse_build");
	mtDev("3642 This.town.id " + this.town.getId() );

	
	if(options[0] == false) {
		mtDev(4461);
		if(obj == null)
		{
			mtDev(4464);
			callback([MTUR_CANCELED], options[6]);
		}
		else
		{
			mtDev(4469);
			callback.call(obj, [MTUR_CANCELED], options[6]);
		}
		return;
	}
	mtDev(4474);
	try {
		mtDev(4476);
		if(req.status != 200)	// error!
		{
			mtDev(4479);
			if(obj == null)
			{
				mtDev(4480);
				callback([MTUR_NETWORK_ERROR], options[6]);
			}
			else
			{
				mtDev(4485);
				callback.call(obj, [MTUR_NETWORK_ERROR], options[6]);
			}
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtDev(4494);
		if(obj == null)
		{
			mtDev(4494);
			callback([MTUR_NETWORK_ERROR], options[6]);
		}
		else
		{
			mtDev(4499);
			callback.call(obj, [MTUR_NETWORK_ERROR], options[6]);
		}
		return;
	}
	mtDev(4507);
	if(!this.town.checkTownPage(html)) {
		if(obj == null)
		{
			mtDev(4508);
			callback([MTUR_UNKNOWN_ERROR], options[6]);
		}
		else
		{
			mtDev(4513);
			callback.call(obj, [MTUR_UNKNOWN_ERROR], options[6]);
		}
		return;
	}
	
	for(i = 0; i < 4; i++) {
		if(reserveRes[i] != null && this.town.getResource(i) < reserveRes[i] + resource[i]) {
			break;
		}
	}
	if(i < 4) {
		for(i = 0; i < 4; i++)
			if(reserveRes[i] != null)
				resource[i] += reserveRes[i];
		if(obj == null)
			callback([MTUR_INSUFFICIENT_RESOURCE,
				[resource[0], resource[1], resource[2], resource[3]],
				this.town.getSupplyUsed()],
				options[6]);
		else
			callback.call(obj, [MTUR_INSUFFICIENT_RESOURCE,
				[resource[0], resource[1], resource[2], resource[3]],
				this.town.getSupplyUsed()],
				options[6]);
		return;
	}
		
	mtDev("4548 " +html);	
	tmp = html.match(/<td class="vil"(.*\r*\n*){11}/);
	mtDev("4545 "+tmp);
	if(tmp == null) {
		if(obj == null)
		{
			mtDev(4549);
			callback([MTUR_UNKNOWN_ERROR], options[6]);
		}
		else
		{
			mtDev(4554);
			callback.call(obj, [MTUR_UNKNOWN_ERROR], options[6]);
		}
		return;
	}
	mtDev(4559);
	if(obj == null)
	{
		mtDev(4562);
		tmp = callback([MTUR_QUERY_TRANSFER,
			{
				name : tmp[1],
				coord : [parseInt(tmp[2]), parseInt(tmp[3])],
				owner : {
					id : parseInt(tmp[4]),
					name : tmp[5]
				},
			},
			((parseInt(tmp[6]) * 60) + parseInt(tmp[7])) * 60 + parseInt(tmp[8]),
			parseInt(tmp[9])], options[6]);
	}
	else
	{
		mtDev(4577);
		tmp = callback.call(obj, [MTUR_QUERY_TRANSFER,
			{
				name : tmp[1],
				coord : [parseInt(tmp[2]), parseInt(tmp[3])],
				owner : {
					id : parseInt(tmp[4]),
					name : tmp[5]
				},
			},
			((parseInt(tmp[6]) * 60) + parseInt(tmp[7])) * 60 + parseInt(tmp[8]),
			parseInt(tmp[9])], options[6]);
	}
	
	if(tmp != true) {
		mtDev(4592);
		if(obj == null)
		{
			mtDev(4595);
			callback([MTUR_CANCELED], options[6]);
		}
		else
		{
			mtDev(4600);
			callback.call(obj, [MTUR_CANCELED], options[6]);
		}
		return;
	}
	mtDev(4605);
	data = "id=" + this.id;
	
	tmp = html.match(/<input type="hidden" name="a" value="(.*?)">/);
	if(tmp != null)
		data += "&a=" + tmp[1];
	tmp = html.match(/<input type="hidden" name="sz" value="(.*?)">/);
	if(tmp != null)
		data += "&sz=" + tmp[1];
	tmp = html.match(/<input type="hidden" name="kid" value="(.*?)">/);
	if(tmp != null)
		data += "&kid=" + tmp[1];
	for(i = 0; i < 4; i++)
		data += "&r" + (i + 1) + "=" + resource[i];
	data += "&s1.x=35&s1.y=5&s1=ok";	// Like browser does
	
	mtDev("3710 POST Merchent Send Resource build.php?newdid=" + this.town.getId() + data );
	//jtyeh:resource marked up
	mtOOPostSoon("build.php?newdid=" + this.town.getId(), data,
		this, this._postTransferResource, options);
		

	
	if(this.schedule !=null )
	{
		var	obj;
			obj = this.schedule.getTown();
		  obj.reloadAll(0);//obj.refreshcity()??
	}
	//mtDev("obj" + obj);

		
		
		
}

mtCBuilding.prototype._postTransferResource = function(req, options) {
	var	target = options[1];
	var	resource = options[2];
	var	reserveRes = options[3];
	var	obj = options[4];
	var	callback = options[5];
	
	mtParseGlobal(req);
	mtDev("3652 mtCBuilding._postTransferResource");
	
	if(obj == null)
		callback([MTUR_NO_ERROR], options[6]);
	else
		callback.call(obj, [MTUR_NO_ERROR], options[6]);
}

mtCBuilding.prototype._reload_build = function(options) {
	mtDev("3721 mtCBuilding._reload_build build.php?newdid=" + this.town.getId() + "&id=" + this.id);
	mtOOGet("build.php?newdid=" + this.town.getId() + "&id=" + this.id,
		this, this._loadBuild_parse_build, 0);
}

mtCBuilding.prototype._loadBuild_parse_build = function(req, options) {
	var	html;
	var	q;
	var	i;
	var	info;
	var	tmp1, tmp2, tmp3;
	
	mtParseGlobal(req);
	mtDev("3734 mtCBuilding._loadBuild_parse_build");
	try {
		if(req.status != 200)	// error!
		{
			mtSetTimeout(this, this._reload_build, null,3 * 60 * 1000);
			return;
			//mtUnexpected("build.php?id=" + this.id + " : " + req.status);
		}
		html = req.responseText;
	} catch(e) {
		mtSetTimeout(this, this._reload_build, null, 3 * 60 * 1000);
		return;
		//mtUnexpected("build.php?id=" + this.id + " : " + e);
	}
	if(!this.town.checkTownPage(html)) {
		mtSetTimeout(this, this._reload_build, null, 3 * 60 * 1000);
		return;
	}
	
//	mtDev("4678 this.type= " +this.type);
	
	switch(this.type) {
	case MTB_EMPTY:
		info = this._loadEmpty_parse_build(html);
		break;
	case MTB_BARRACKS:
	case MTB_STABLE:
	case MTB_WORKSHOP:
  	case MTB_RESIDENCE:
  	case MTB_PALACE:	
		info = this._loadBarrack_parse_build(html);
		break;
	case MTB_TOWN_HALL:
		info = this._loadTownHall_parse_build(html);
		break;
	case MTB_RALLY_POINT:
		info = this._loadRallyPoint_parse_build(html);
		break;
	case MTB_MARKETPLACE:
		info = this._loadMarketPlace_parse_build(html);
		break;
	case MTB_ARMOURY:
	case MTB_BLACKSMITH:
		info = this._loadArmouryBlackSmith_parse_build(html);
	  break;		
		default:
		info = new Object();
	}
	
	mtDev("4724 this.type = " + this.type);
	/* Upgrade cost */
	if(this.type != MTB_EMPTY) {		
		//tmp1 = html.match(/<p.*?>(.*?)<\/p>(?=<img src="img\/un\/a\/x.gif" \/><\/div><\/div><\/div><div id="lright1">)/);
		tmp1 = html.match(/<p id="none">(.*?)<\/p>/);//<p class="none">市場 完全被開發</p>
		mtDev("4668 " + tmp1);
		if(tmp1==null) tmp1 = html.match(/<p class="none">(.*)<\/p>/);
		mtDev("4669 " + tmp1);
		if(tmp1==null) tmp1 = html.match(/<span class="none">(.*)<\/span>/);
		mtDev("4671 " + tmp1);
		
		if(tmp1 != null) {
			info.upgrade = null;
			info.upgradeReason = tmp1[1];
		} else {
			  tmp1 = html.match(/<p id="contract">.*<\/p>/);	
			 //mtDev(tmp1); 
			  if(tmp1 == null) tmp1 = html.match(/<p id="contract">.*<\/p>/);
			//mtDev("4741 tmp1 = " + tmp1 );	
			info.upgrade = new Object();
			
			if(tmp1 == null) {
				//mtUnexpected("_loadBuild_parse_build: cannot extract upgrade info(1). 3765");
				tmp2 = html.match(/<p id="none">(.*)<\/p>/);
				info.upgrade.reason = tmp1[1];
			}
			else
			{
			
			tmp2 = tmp1[0].match(/<img class="r\d" src="img\/x.gif" alt="\S+" title="\S+" \/>(<span class="little_res">)*\d+/g);
			if(tmp2==null) tmp2 = tmp1[0].match(/<img class="r\d" src="img\/x.gif" alt="\S+" title="\S+" \/>\d+/g);			
			mtDev("4744 tmp2 = " + tmp2);
			if(tmp2 == null || tmp2.length != 5)
				mtUnexpected("_loadBuild_parse_build: cannot extract upgrade info(2).");
			info.upgrade.cost = new Array(5);
			for(j = 0; j < 5; j++) {
				tmp3 = tmp2[j].match(/\d+$/);
				info.upgrade.cost[j] = parseInt(tmp3[0]);
				
			}
			
			tmp2 = tmp1[0].match(/<img class="clock" src="img\/x\.gif".*\/>.*(\d+):(\d+):(\d+)/);
			if(tmp2 == null)
				mtUnexpected("_loadBuild_parse_build: cannot extract upgrade info(3).");
			info.upgrade.take = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);
			/* NOTE: take is the time needed in seconds */
			tmp2 = tmp1[0].match(/<a class="build" href="(\S+)">.*<\/a>/);
			mtDev("4712 " + tmp2 );
			
			
			
			
			if(tmp2 != null) {
				tmp3 = tmp2[1].substr(0,tmp2[1].indexOf("amp;"));
				tmp3 = tmp3 + tmp2[1].substr(tmp2[1].indexOf("amp;")+4,tmp2[1].length);
				info.upgrade.href = tmp3;
				mtDev("4721 " + tmp3);
			} else {
				tmp2 = tmp1[0].match(/<span class="none">(.*?)<\/span>/);
				if(tmp2 != null) {
					info.upgrade.href = null;
					info.upgrade.reason = tmp2[1];
				} else
					mtUnexpected("_loadBuild_parse_build: cannot extract upgrade info(4).");
			}
			}
		}
	}
	
	this.info = info;
	if(info.party !=null) this.town.party = info.party;
	
	this.lastQuery = new Date().getTime();
	q = this.queryWaiting;
	this.queryWaiting = null;
	for(i = 0; i < q.length; i++) {
		if(q[i][0] == null)
			q[i][1](this.info, q[i][2]);
		else
			q[i][1].call(q[i][0], this.info, q[i][2]);
	}
}

mtCBuilding.prototype._loadBarrack_parse_build = function(html) {
	var	form;
	var	info;
	var	tmp1, tmp2, tmp3;
	var	producee;
	var	producing;
	var	i, j;
	
	mtDev("3783 mtCBuilding._loadBarrack_parse_build");
	
	form = html.match(/<form(.|\s)*?<\/form>/);
	info = new Object();
	
	/* Extract troops that can be produced. */	
	if(form!=null)
	{

		tmp1 = form[0].match(/<a href="#" onClick="return Popup\(\d+,1\);">(.*?)<\/a> (.*\r*\n){7}/g); //jtyeh: 20090904--for twx
		if(tmp1 == null)
		tmp1 = form[0].match(/<a href="#" onClick="return Popup\(\d+,1\);">(.*?)<\/a> (.*\r*\n){8}/g);	//jtyeh: 20090904--for s5
	mtDev("4703" + tmp1);
	}
	info.producee = new Array();
	if(tmp1 != null) {
		for(i = 0; i < tmp1.length; i++) {
		mtDev("4441 tmp1[i] = " + tmp1[i]);	
			producee = new Object();
			tmp2 = tmp1[i].match(/onClick="return Popup\((\d+),1\);">(.*?)<\/a>/);
			mtDev(tmp2);
			if(tmp2 == null)
				continue;	// fail safe
			
			producee.id = tmp2[1];
			producee.name = tmp2[2];
			
			tmp2 = tmp1[i].match(/<img class="r\d" src="img\/x.gif" alt="\S+" title="\S+" \/>\d+/g);
			mtDev(tmp2);
			if(tmp2 == null || tmp2.length != 5)
				continue;
			producee.cost = new Array(5);
			for(j = 0; j < 5; j++) {
				tmp3 = tmp2[j].match(/\>(\d+?)$/);	
				producee.cost[j] = tmp3[1];	
				mtDev("4736 ["+j+"]:"+ tmp3[1]);
			}
			tmp2 = tmp1[i].match(/<img class="clock" src="img\/x.gif" alt="\S+" title="\S+" \/>(\d+):(\d+):(\d+)/);
			//<img class="clock" src="img/x.gif" alt="時間" title="時間" />0:08:53</td>
			if(tmp2 == null)
				continue;
			mtDev(tmp2[1] + ":" + tmp2[2] + ":" + tmp2[3] );
			producee.take = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);
			/* NOTE: take is the time needed in seconds */
			
			mtDev(producee.take);
			
			tmp2 = tmp1[i].match(/<input type="text" class=".*" name="(.*?)"/);
			mtDev("4749 "+tmp2);
			if(tmp2 == null)
				continue;
			producee.formName = tmp2[1];
			info.producee.push(producee);
		}
	}
	mtDev("4756");
	/* Extract form data */
	tmp1 = html.match(/<input type="hidden" .*?>/g);
	info.formData = new Array();
	if(tmp1 != null) {
		for(i = 0; i < tmp1.length; i++) {
			tmp2 = tmp1[i].match(/name="(.*)?" value="(.*?)"/);
			if(tmp2 == null)
				continue;
			info.formData.push([tmp2[1], tmp2[2]]);
		}
	}
	mtDev("4768");
	/* Extract troops producing currently. */
	tmp1 = html.match(/<span id=timer1>(\d+):(\d+):(\d+)<\/span>/);
	info.producing = new Array();
	if(tmp1 == null) {
		info.nextOk = 0;
	} else {
		mtDev("4775 "+tmp1);
		info.nextOk = ((parseInt(tmp1[1]) * 60) + parseInt(tmp1[2])) * 60 + parseInt(tmp1[3]);


		tmp1 = html.match(/<td class="desc">\r*\n*\s+<img class="unit u\d+" src="img\/x.gif" alt="\S+" title="\S+" \/>(\r*\n*.*){4}<\/td>/g);
		mtDev("4519 tmp1.length" + tmp1.length);	
		if(tmp1 != null) {
			mtDev("4522 tmp1 " + tmp1 );
			for(i = 0; i < tmp1.length; i++) {
				producing = new Object();
				tmp2 = tmp1[i].match(/<img class="unit u(\d+)" src="img\/x\.gif" alt="(\S+)" title="\S+" \/>/);
				if(tmp2 == null)
					continue;
				producing.id = tmp2[1];
				mtDev("4530 producing.id =  " + producing.id);
				producing.name = tmp2[2];
				mtDev("4535 producing.name = " + producing.name );
				
				tmp2 = tmp1[i].match(/<span id=timer\d+>(\d+):(\d+):(\d+)<\/span>/);
				producing.last = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);
				mtDev("4539 producing.last = " + producing.last );
				
				info.producing.push(producing);
			}
		}
	
	}
	mtDev("4814");
	return info;
}

mtCBuilding.prototype._loadTownHall_parse_build = function(html) {
	var	info;
	var	tmp1, tmp2, tmp3,tmp0;
	var	celebration;
	var	producing;
	var	i, j;
	
	mtDev("3887 mtCBuilding._loadTownHall_parse_build");
	info = new Object();
	
	tmp1 = html.match(/<a href="#" onClick="return Popup\(\d+,\d+\);">(.*?)<\/a>(.*\r*\n){3}/g);
	tmp0 = html.match(/<td class="act">.*\r*\n/g);
	

	info.celebration = new Array();
	if(tmp1 != null && tmp0 != null) 
	{
		if(tmp1.length==tmp0.length)
		{
		for(i = 0; i < tmp1.length; i++) {

			celebration = new Object();
			tmp2 = tmp1[i].match(/onClick="return Popup\((\d+?,\d+)\);">(.*?)<\/a>/);
			celebration.id = tmp2[1];
			celebration.name = tmp2[2];
			
			tmp2 = tmp1[i].match(/<img class="r\d" src="img\/x\.gif" alt="\S+" title="\S+" \/>(<span class="little_res">)*\d+/g);
			celebration.cost = new Array(4);
			if(tmp2 != null)
			for(j = 0; j < 4; j++) {
				tmp3 = tmp2[j].match(/>\d+/);				
				celebration.cost[j] = parseInt(tmp3[0]);
			}
			
			celebration.take = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);
			tmp2 = tmp0[i].match(/<a href="(build\.php\?id=\d+&a=\d+)">.*?<\/a>/);
			if(tmp2 != null) {
				celebration.href = tmp2[1];
			} else {
				celebration.href = null;
				tmp2 = tmp1[i].match(/<div class="none">(.*?)<\/div><\/td>/);
				if(tmp2 != null) {
					celebration.reason = tmp2[1];
				} else {
					celebration.reason = null;
				}
			}
			
			info.celebration.push(celebration);
		}
	}
	}
	/* Extract celebrations holding currently. */
	tmp1 = html.match(/<span id=timer1>(\d+):(\d+):(\d+)<\/span>/);
	if(tmp1 == null) {
		info.holdLast = 0;
	} else {
		info.holdLast = ((parseInt(tmp1[1]) * 60) + parseInt(tmp1[2])) * 60 + parseInt(tmp1[3]);
		info.party = tmp1[1] + ":" + tmp1[2] + ":" + tmp1[3];
	}
	
	return info;
}

mtCBuilding.prototype._loadRallyPoint_parse_build = function(html) {
	var	tmp1;
	var	info;
	var	tmp1, tmp2, tmp3, tmp4;
	var	id;
	var	force;
	var	i1, i2;
	var	force_owner;
	var	re;
	//document.getElementById("lright1").textContent = html;
	info = new Object();
	
	info.localForce = new Object();			//own force of current village, in local village.
	info.localForce.homeTroops = new Object();
	
	info.localForce.guestForce = new Array();	//own force from other village, in local village.
	info.localForce.guestTroops = new Object();
	
	info.remoteForce = new Array();			//own force of current village, in other village.
	info.remoteTroops = new Object();
	
	info.localForce.spyingForce = new Array();		//own force of current village, going out 
	info.localForce.spyingTroops = new Object();

	info.localForce.attackingForce = new Array();		//own force of current village, going out 
	info.localForce.attackingTroops = new Object();
	
	info.localForce.returningForce = new Array();		//own force of current village, going in
	info.localForce.returningTroops = new Object();
	
	info.othersForce = new Array();			//other's force.
	info.othersTroops = new Object();
	/* Extract local home army */
	/* ex,
	<table class="std troop_details">
	<thead>
		<tr>
			<th class="village"><a href="karte.php?d=368826&c=7a"><span class="c0">H1N1</span></a></th><th colspan="10"><a href="spieler.php?uid=4875"><span class="c0">自軍</span></a></th></tr></thead><tbody><tr><th>&nbsp;</th><td><img src="img/x.gif" class="unit u1" title="古羅馬步兵" alt="古羅馬步兵" /></td><td><img src="img/x.gif" class="unit u2" title="禁衛兵" alt="禁衛兵" /></td><td><img src="img/x.gif" class="unit u3" title="帝國兵" alt="帝國兵" /></td><td><img src="img/x.gif" class="unit u4" title="使者騎士" alt="使者騎士" /></td><td><img src="img/x.gif" class="unit u5" title="帝國騎士" alt="帝國騎士" /></td><td><img src="img/x.gif" class="unit u6" title="將軍騎士" alt="將軍騎士" /></td><td><img src="img/x.gif" class="unit u7" title="衝撞車" alt="衝撞車" /></td><td><img src="img/x.gif" class="unit u8" title="火焰投石機" alt="火焰投石機" /></td><td><img src="img/x.gif" class="unit u9" title="參議員" alt="參議員" /></td><td><img src="img/x.gif" class="unit u10" title="開拓者" alt="開拓者" /></td></tr><tr><th>士兵</th><td>244</td><td class="c">0</td><td>369</td><td>51</td><td>567</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td></tr></tbody><tbody class="infos"><tr><th>糧食消耗</th><td colspan="10">2416<img class="r4" src="img/x.gif" title="穀物" alt="穀物" />每小時</td></tr></tbody></table>

	*/	
	//if(tmp1 == null)
	tmp1 = html.match(/<table class="std troop_details">\r\n\t<thead>\r\n\t\t<tr>\r\n.*<\/table>/g);
	if(tmp1 != null) for(i1 = 0; i1 < tmp1.length; i1++) {
		//mtDev("4353 tmp1.length = " + tmp1.length);
		//mtDev("4355 tmp[" + i1 + "] = " + tmp1[i1] );
		tmp2 = tmp1[i1].match(/karte\.php\?d=(\d+)&/);
		if(tmp2 == null || parseInt(tmp2[1]) != mtPosXYToId(this.town.getCoord()[0], this.town.getCoord()[1])) {
			mtTrace("loadRallyPoint miss (1).");
		} else {
			tmp2 = tmp1[i1].match(/<img src="img\/x.gif" class="unit u\d+" title="\S+?" alt="\S+" \/>/g);
			tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
			if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
				mtTrace("loadRallyPoint miss (2).");
			} else {
				for(i2 = 0; i2 < tmp2.length; i2++) {
					tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
					id = tmp4[1];
					if(info.localForce.homeTroops[id] == null) {
						info.localForce.homeTroops[id] = new Object();
						info.localForce.homeTroops[id].name = tmp4[2];
						info.localForce.homeTroops[id].number = 0;
					}
					tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
					info.localForce.homeTroops[id].number += parseInt(tmp4[1]);
				}
			}
		}
	}
	
	/* Extract other armies */
	
	tmp1 = html.match(/<table class="std troop_details">\r\n\t<thead>\r\n\t\t<tr>\r\n.*\r\n.*<a href="a2b\.php\?d=\d+&c=\d\S">.*<\/table>/g);
	if(tmp1 != null) for(i1 = 0; i1 < tmp1.length; i1++) {
		mtDev("4384 remote army in local tmp1.length = " + tmp1.length);
		tmp2 = tmp1[i1].match(/<span class="c0">(.*?)<\/span><\/a><\/td><td colspan="\d\d"><a href="spieler\.php\?uid=(\d+?)">/);
		force_owner = tmp1[i1].match(/<a href="spieler\.php\?uid=(\d+?)">/);
		tmp2 = tmp1[i1].match(/<th class="village">.*\r\n/);
		if(force_owner != null)
		{
			if( force_owner[1] == mtUserId )
			{	// local, guest armies
				mtDev("4410 in local village, own army from other village");
				force = new Object();
				force.home = new Object();
				force.home.coord = mtPosIdToXY(parseInt(tmp2[1]));
				force.home.name = tmp2[2];
				force.home.ownerId = parseInt(tmp2[3]);
				force.home.ownerName = tmp2[4];
				tmp2 = tmp1[i1].match(/<img src="img\/x.gif" class="unit u\d+" title="\S+?" alt="\S+" \/>/g);			
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4421).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {
						//tmp4 = tmp2[i2].match(/<img src="img\/un\/u\/(.*?)\.gif" title="(.*?)">/);
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						mtDev("4422 troops id = " + id );
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.localForce.guestTroops[id] == null) {
							info.localForce.guestTroops[id] = new Object();
							info.localForce.guestTroops[id].name = tmp4[2];
							info.localForce.guestTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.localForce.guestTroops[id].number += parseInt(tmp4[1]);
					}
					info.localForce.guestForce.push(force);
				}
					
					
				
			}
			else
			{	// othersToops.
				mtDev("4410 in local village, own army from player");
				force = new Object();
				force.quarter = new Object();
				force.quarter.coord = mtPosIdToXY(parseInt(tmp2[3]));
				force.quarter.name = tmp2[4];
						     //<img src="img/x.gif" class="unit u23" title="探路者" alt="探路者" />
				tmp2 = tmp1[i1].match(/<img src="img\/x.gif" class="unit u\d+" title="\S+?" alt="\S+" \/>/g);							
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {						
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.othersTroops[id] == null) {
							info.othersTroops[id] = new Object();
							info.othersTroops[id].name = tmp4[2];
							info.othersTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.othersTroops[id].number += parseInt(tmp4[1]);
					}
					info.othersForce.push(force);
				}
			}//end of else if
			
		}
		
	}//end loop
	
//<table class="std troop_details">
//	<thead>
//		<tr>
//			<th class="village"><a href="karte.php?d=368826&c=7a"><span class="c0">H1N1</span></a></th><th colspan="10"><a href="karte.php?d=132339&c=7d"><span class="c0">增援到 M0R9</span></a></th></tr></thead><tbody><tr><th>&nbsp;</th><td><img src="img/x.gif" class="unit u1" title="古羅馬步兵" alt="古羅馬步兵" /></td><td><img src="img/x.gif" class="unit u2" title="禁衛兵" alt="禁衛兵" /></td><td><img src="img/x.gif" class="unit u3" title="帝國兵" alt="帝國兵" /></td><td><img src="img/x.gif" class="unit u4" title="使者騎士" alt="使者騎士" /></td><td><img src="img/x.gif" class="unit u5" title="帝國騎士" alt="帝國騎士" /></td><td><img src="img/x.gif" class="unit u6" title="將軍騎士" alt="將軍騎士" /></td><td><img src="img/x.gif" class="unit u7" title="衝撞車" alt="衝撞車" /></td><td><img src="img/x.gif" class="unit u8" title="火焰投石機" alt="火焰投石機" /></td><td><img src="img/x.gif" class="unit u9" title="參議員" alt="參議員" /></td><td><img src="img/x.gif" class="unit u10" title="開拓者" alt="開拓者" /></td></tr><tr><th>士兵</th><td>70</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td></tr></tbody><tbody class="infos"><tr><th>糧食消耗</th><td colspan="10"><table><tr><td class="l">70<img class="r4" src="img/x.gif" title="穀物" alt="穀物" />每小時</td>	

	tmp1 = html.match(/<table class="std troop_details">\r\n\t<thead>\r\n\t\t<tr>\r\n.*<th class="village"><a href="karte\.php\?d=(\d+)&c=[0-9a-fA-F]+">.*\r\n.*<\/table>/g);
	if(tmp1 != null) for(i1 = 0; i1 < tmp1.length; i1++) {
		tmp2 = tmp1[i1].match(/<a href="karte\.php/g);
		
		if(tmp2 != null)
		{
			if(tmp2.length == 2) {	// remote armies from this village
				force = new Object();
				force.quarter = new Object();
				force.quarter.coord = mtPosIdToXY(parseInt(tmp2[3]));
				force.quarter.name = tmp2[4];
						     //<img src="img/x.gif" class="unit u23" title="探路者" alt="探路者" />
				tmp2 = tmp1[i1].match(/<img src="img\/x\.gif" class="unit u\d+" title="(\S+?)" alt="\S+" \/>/g);				
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.remoteTroops[id] == null) {
							info.remoteTroops[id] = new Object();
							info.remoteTroops[id].name = tmp4[2];
							info.remoteTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.remoteTroops[id].number += parseInt(tmp4[1]);
					}
					info.remoteForce.push(force);
				}
			} else {
				//troops from others.
			}		
		}//end if tmp2 != null
	}
	
											 //<th class="village"><a href="karte.php?d=368826&c=7a"><span class="c0">H1N1</span></a></th><th colspan="10"><a href="karte.php?d=357618&c=df"><span class="c0">攻擊 Rx-tmd101-6</span></a></th></tr></thead><tbody><tr><th>&nbsp;</th><td><img src="img/x.gif" class="unit u1" title="古羅馬步兵" alt="古羅馬步兵" /></td><td><img src="img/x.gif" class="unit u2" title="禁衛兵" alt="禁衛兵" /></td><td><img src="img/x.gif" class="unit u3" title="帝國兵" alt="帝國兵" /></td><td><img src="img/x.gif" class="unit u4" title="使者騎士" alt="使者騎士" /></td><td><img src="img/x.gif" class="unit u5" title="帝國騎士" alt="帝國騎士" /></td><td><img src="img/x.gif" class="unit u6" title="將軍騎士" alt="將軍騎士" /></td><td><img src="img/x.gif" class="unit u7" title="衝撞車" alt="衝撞車" /></td><td><img src="img/x.gif" class="unit u8" title="火焰投石機" alt="火焰投石機" /></td><td><img src="img/x.gif" class="unit u9" title="參議員" alt="參議員" /></td><td><img src="img/x.gif" class="unit u10" title="開拓者" alt="開拓者" /></td></tr><tr><th>士兵</th><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td>650</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td></tr></tbody><tbody class="infos"><tr><th>抵達</th><td colspan="10"><table>
	tmp1 = html.match(/<table class="std troop_details">\r\n\t<thead>\r\n\t\t<tr>\r\n.*<th class="village"><a href="karte\.php\?d=\d+&c=[0-9a-fA-F]+">.*<a href="karte\.php\?d=(\d+)&c=[0-9a-fA-F]+">.*<table>/g);
	mtDev("4554 tmp1 = " +tmp1 );
	//re = new RegExp('<th class="village"><a href="karte\\.php\\?d=<span class="c0">' + this.town.getId());		
	if(tmp1 != null) for(i1 = 0; i1 < tmp1.length; i1++) {
		re =  new RegExp('<th class="village"><a href="karte\\.php\\?d=\\d+&c=[0-9a-fA-F]+"><span class="c0">' + this.town.getName()+ '.*<span class="c0">(.*)</span></a></th>.*' ) ;
		mtDev(re);
		tmp2 = tmp1[i1].match(re);
		
		mtDev("4564 tmp2= " + tmp2 );
		if(tmp2 != null )
		{
			if(tmp2[1].match('偵察') != null )
			{
				mtDev("4567 偵察");
				force = new Object();
				force.quarter = new Object();
				force.quarter.coord = mtPosIdToXY(parseInt(tmp2[3]));
				force.quarter.name = tmp2[4];
						     //<img src="img/x.gif" class="unit u23" title="探路者" alt="探路者" />
				tmp2 = tmp1[i1].match(/<img src="img\/x\.gif" class="unit u\d+" title="(\S+?)" alt="\S+" \/>/g);				
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.localForce.spyingTroops[id] == null) {
							info.localForce.spyingTroops[id] = new Object();
							info.localForce.spyingTroops[id].name = tmp4[2];
							info.localForce.spyingTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.localForce.spyingTroops[id].number += parseInt(tmp4[1]);
					}
					info.localForce.spyingForce.push(force);
				}				
			}
			if(tmp2[1].match('攻擊') != null )
			{
				mtDev("4601 攻擊");
				force = new Object();
				force.quarter = new Object();
				force.quarter.coord = mtPosIdToXY(parseInt(tmp2[3]));
				force.quarter.name = tmp2[4];
						     //<img src="img/x.gif" class="unit u23" title="探路者" alt="探路者" />
				tmp2 = tmp1[i1].match(/<img src="img\/x\.gif" class="unit u\d+" title="(\S+?)" alt="\S+" \/>/g);				
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.localForce.attackingTroops[id] == null) {
							info.localForce.attackingTroops[id] = new Object();
							info.localForce.attackingTroops[id].name = tmp4[2];
							info.localForce.attackingTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.localForce.attackingTroops[id].number += parseInt(tmp4[1]);
					}
					info.localForce.attackingForce.push(force);				
				}
			}
			if(tmp2[1].match('回歸') != null )
			{
				mtDev("4635 回歸");
				force = new Object();
				force.quarter = new Object();
				force.quarter.coord = mtPosIdToXY(parseInt(tmp2[3]));
				force.quarter.name = tmp2[4];
						     //<img src="img/x.gif" class="unit u23" title="探路者" alt="探路者" />
				tmp2 = tmp1[i1].match(/<img src="img\/x\.gif" class="unit u\d+" title="(\S+?)" alt="\S+" \/>/g);				
				tmp3 = tmp1[i1].match(/<td( class="c")?>\d+<\/td>/g);
				if(tmp2 == null || tmp3 == null || tmp2.length != tmp3.length) {
					mtTrace("loadRallyPoint miss (4).");
				} else {
					force.troops = new Object();
					for(i2 = 0; i2 < tmp2.length; i2++) {
						tmp4 = tmp2[i2].match(/<img src="img\/x.gif" class="unit u(\d+?)" title="(\S+?)" alt="\S+" \/>/);
						id = tmp4[1];
						if(force.troops[id] == null) {
							force.troops[id] = new Object();
							force.troops[id].name = tmp4[2];
							force.troops[id].number = 0;
						}
						if(info.localForce.returningTroops[id] == null) {
							info.localForce.returningTroops[id] = new Object();
							info.localForce.returningTroops[id].name = tmp4[2];
							info.localForce.returningTroops[id].number = 0;
						}
						tmp4 = tmp3[i2].match(/<td(?: class="c")?>(\d+)<\/td>/);
						force.troops[id].number += parseInt(tmp4[1]);
						info.localForce.returningTroops[id].number += parseInt(tmp4[1]);
					}
					info.localForce.returningForce.push(force);

				}
				
			}
		
		
		
		}				
	}
	
	return info;
}

mtCBuilding.prototype._loadMarketPlace_parse_build = function(html) {
	var	info;
	var	tmp1, tmp2, tmp3, tmp4 , tmp5;
	var	i, res;
	var	trader;
	var	town;
	var	form;
	
	mtDev("4192 mtCBuilding._loadMarketPlace_parse_build");
	
	//document.getElementById("lright1").textContent = html;
	info = new Object();
	
	/* Extract number of trader */
	tmp1 = html.match(/<td class="mer">\S+ (\d*)\/(\d*)<\/td>/);
	if(tmp1 == null) {
		mtLog("loadMarketPlace miss (1)");
	}
	else
	{mtDev("5276 (" + tmp1[1] + "/" + tmp1[2] + ")");}
	
	info.trader = parseInt(tmp1[1]);
	info.traderMax = parseInt(tmp1[2]);
	tmp1 = html.match(/<a href="#" onMouseUp="add_res\(\d\);" onClick="return false;">\((\d+)\)<\/a>/);

	
	if(tmp1 == null) {
		mtTrace("loadMarketPlace miss (2)");
	}
	mtDev("5286 " + tmp1 );
	info.traderCapacity = parseInt(tmp1[1]);
	
	/* TODO: Extract moving traders */
	info.incomingTraders = new Array();
	info.outgoingTraders = new Array();
	info.returningTraders = new Array();
	info.incomingResource = new Array(4);
	mtDev("5250");
	for(res = 0; res < 4; res++)
		info.incomingResource[res] = 0;

	tmp1 = null;
	tmp2 = html.match(/<table class="traders">/);	
	if(tmp2==null) tmp2= html.match(/<table id="send_select"/);
				       
	mtDev("5382 tmp2 = " + tmp2 );	
	if(tmp2 != null)
	{	
		tmp3 = html.match(/<table class="traders" cellpadding="1" cellspacing="1">(.*\r*\n){14}.*<\/table>/g);//<table class="traders" cellpadding="1" cellspacing="1">
		mtDev("5306 " + tmp3 );
		if(tmp3!=null) 
		for(i = 0; i < tmp3.length; i++) {
		trader = new Object();
		
		tmp4 = tmp3[i].match(/<a href="spieler\.php\?uid=(\d+)">(.*?)<\/a>/);
		trader.owner = new Object();
		trader.owner.id = parseInt(tmp4[1]);
		trader.owner.name = tmp4[2];
		
		mtDev("5316 " + tmp4);
		
		tmp4 = tmp3[i].match(/<span id=timer\d+>(\d+):(\d+):(\d+)<\/span>/);
		trader.arriveLast = ((parseInt(tmp4[1]) * 60) + parseInt(tmp4[2])) * 60 + parseInt(tmp4[3]);
		trader.resource = new Array(4);
		for(res = 0; res < 4; res++) {
			tmp4 = tmp3[i].match(new RegExp('<img class="r'+(res+1)+'" src="img\\/x\\.gif" alt="\\S+" title="\\S+" />(\\d+)'));
			trader.resource[res] = parseInt(tmp4[1]);		
		}
		
		town = new Object();
		tmp4 = tmp3[i].match(/<a href="karte\.php\?d=(\d+)&c=[0-9a-fA-F]+">(.*?)<\/a>/);
		town.coord = mtPosIdToXY(parseInt(tmp4[1]));
		// NOTE: It is not possible to detected from the structure... 
		if((tmp5 = tmp4[2].match(/^從 (.*) 來的運送$/)) != null) {
			trader.from = town;
			info.incomingTraders.push(trader);
			for(res = 0; res < 4; res++) {
				info.incomingResource[res] += trader.resource[res];
			}
		} else if((tmp5 = tmp4[2].match(/^運送到 (.*)$/)) != null) {
			trader.to = town;
			info.outgoingTraders.push(trader);
		} else if((tmp5 = tmp4[2].match(/^由 (.*) 歸來$/)) != null) {
			trader.from = town;
			info.returningTraders.push(trader);
		} else {
			mtTrace(
			// mtUnexpected(
						"loadMarketPlace miss (3)");
		}
		town.name = tmp5[1];
		}
	}
	return info;
}

mtCBuilding.prototype._loadEmpty_parse_build = function(html) {
	var	info;
	var	tmp1, tmp2, tmp3, tmp4;
	var	build;
	var	producing;
	var	i, j;
	var	re;
	
	mtDev("4200 mtCBuilding._loadEmpty_parse_build");
	
	//document.getElementById("lright1").textContent = html;
	info = new Object();
	
	
	tmp1 = html.match(/<img class="r1"(.*\r*\n){3}\s+<td class="link">\r*\n\s+<a class="build" href="dorf2\.php.*">/g);


	
	mtDev("5464 tmp1 = " +tmp1);
	info.build = new Array();
	if(tmp1!=null)
	{
	
	for(i = 0; i < tmp1.length; i++) {
		build = new Object();
		tmp2 = tmp1[i].match(/dorf2\.php\?a=(\d+)?/);
		

			build.id = parseInt(tmp2[1]);
			build.name = mtBuildingName[build.id];
			
		tmp2 = tmp1[i].match(/<img class="r\d" src="img\/x.gif" alt="\S+" title="\S+" \/>\d+/g);

		build.cost = new Array(5);
		for(j = 0; j < 5; j++) {
			tmp3 = tmp2[j].match(/\d+$/);

			build.cost[j] = parseInt(tmp3[0]);
		}
		
		tmp2 = tmp1[i].match(/<img class="clock" src="img\/x\.gif" .*>(\d*?):(\d+?):(\d+?)/);
		build.take = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);
			
		tmp3 = tmp1[i].match(/a class="build" href="(.*?)"/);
		if(tmp3 == null) {
			build.href = null;
			
			tmp3 = tmp1[i].match(/<span class="c"><span>(.*?)<\/span>/);
			if(tmp3 == null) {
				build.reason = null;
			} else {
				build.reason = tmp3[1];
			}
		} else {
			build.href = tmp3[1];
			build.reason = null;
		}
		
		info.build.push(build);
	}
	

	}
	else
	{ 
		
		
		
		tmp2 = html.match(/<h2>(\S+)<\/h2>(.*\r*\n*){25}/);	
		mtDev("5562 tmp2 =" +tmp2);	
		if(tmp2 != null)
		{
		
				
				for(i= MTB_CITY_WALL; i<=MTB_PALISADE; i++)
				{
					if(tmp2[1] ==	mtBuildingName[i]) break;
				}
				
				if(tmp2[1] == mtBuildingName[MTB_RALLY_POINT]) i=MTB_RALLY_POINT;

		if((i>= MTB_CITY_WALL && i <= MTB_PALISADE) || i == MTB_RALLY_POINT)			
		{
			build = new Object();
			build.id = i;
			build.name = tmp2[1];	
			
			tmp3 = tmp2[0].match(/<img class="r\d" src="img\/x.gif" .* \/>\d+/g);
			mtDev(tmp3);
			
				
			build.cost = new Array(5);
			for(j = 0; j < 5; j++) {
				tmp4 = tmp3[j].match(/\d+$/);
				build.cost[j] = parseInt(tmp4[0]);
				
			}
				mtDev(build.cost);
			tmp3 = tmp2[0].match(/<img class="clock" src="img\/x\.gif" .*>(\d*?):(\d+?):(\d+?)/);
			build.take = ((parseInt(tmp3[1]) * 60) + parseInt(tmp3[2])) * 60 + parseInt(tmp3[3]);
			tmp3 = tmp2[0].match(/<a href="(.*?)">.*<\/a>/);
			if(tmp3 == null) {
				build.href = null;
				tmp3 = tmp2[0].match(/<span class="c"><span>(.*?)<\/span>/);
				if(tmp3 == null) {
					build.reason = null;
				} else {
					build.reason = tmp3[1];
				}
			} else {
				build.href = tmp3[1];
				build.reason = null;
			}
		}		
	 	mtDev("build.id = " + build.id );
	 	mtDev("build.name = " + build.name );
	 	mtDev("build.cost = " + build.cost );
	 	mtDev("build.reason = " + build.reason );
	 	mtDev("build.href = " + build.href );
		
		info.build.push(build);
		
		}
	
	}
	
	return info;
}


mtCBuilding.prototype._loadArmouryBlackSmith_parse_build = function(html) {
	var	info;
	var	tmp1, tmp2, tmp3;
	var	upgradee;
	var	i, j;
	
	mtDev("3783 mtCBuilding._loadArmouryBlackSmith_parse_build");
	
	info = new Object();
	
	tmp1 = html.match(/<a href="#" onClick="return Popup\(\d+,1\);">(.*?)<\/a> <span class="info">\(\S+ \d+\).*<\/span>(.*\r*\n){6}/g);
	mtDev("5399 tmp1 = " + tmp1 );
	info.upgradee = new Array();
	if(tmp1 != null) {
		for(i = 0; i < tmp1.length; i++) {
		
			upgradee = new Object();			
			tmp2 = tmp1[i].match(/onClick="return Popup\((\d+),1\);">(.*?)<\/a> <span class="info">\(\S+ (\d+)\)<\/span>/);
	
			if(tmp2 != null)
			{
				upgradee.id = tmp2[1];
				upgradee.name = tmp2[2];
				upgradee.level = tmp2[3];
			}
			tmp2 = tmp1[i].match(/<img class="r\d" src="img\/x.gif" alt="\S+" title="\S+" \/>\d+/g);
			if(tmp2 == null || tmp2.length != 4)
				continue;
			upgradee.cost = new Array(4);
			for(j = 0; j < 4; j++) {
				tmp3 = tmp2[j].match(/\>(\d+?)$/);	
				upgradee.cost[j] = tmp3[1];	
			}
			tmp2 = tmp1[i].match(/<img class="clock" src="img\/x.gif" alt="\S+" title="\S+" \/>(\d+):(\d+):(\d+)/);													
			upgradee.take = ((parseInt(tmp2[1]) * 60) + parseInt(tmp2[2])) * 60 + parseInt(tmp2[3]);

					    //<td class="act"><a href="build.php?id=23&a=5">升級</a>
			tmp3 = tmp1[i].match(/<td class="act"><a href="(.*?)">.*<\/a>/);
			mtDev("5426 tmp3 = " + tmp3 );
			if(tmp3 == null) {
				upgradee.href = null;					
				tmp3 = tmp1[i].match(/<td class="act"><span class="none">(.*?)<\/span>/);
				if(tmp3 == null) {
					upgradee.reason = null;
				} else {
					upgradee.reason = tmp3[1];
				}
			} else {
				upgradee.href = tmp3[1];
				upgradee.reason = null;
			}			
			info.upgradee.push(upgradee);
		}
	}
	return info;
}


/* ==== class mtCBuilding ==== */

/* ==== class mtCSchedule ==== */
function mtCSchedule(town, parentTable) {
	this.objId = mtNewId();
	this.town = town;
	this.tasks = new Array();
	this.active = false;
	this._initVisual(parentTable);
}

mtCSchedule.prototype.getObjId = function() {
	return this.objId;
}

mtCSchedule.prototype.getTown = function() {
	return this.town;
}

mtCSchedule.prototype.loadConfig = function(config) {
	var	i, task, t;
	
	config = config.split(",");
	for(i = 0; i < config.length; i++) {
		config[i] = unescape(config[i]);
		task = parseInt(config[i]);
		if(isNaN(task) || task < 0 || task > mtTaskPool.length)
			continue;
		for(t = 0; t < mtTaskPool.length; t++)
			if(mtTaskPool[t][0] == task) {				
				task = this.buildTask(task, mtTaskPool[t][2]);				
				task.loadConfig(config[i]);
			}
	}
}

mtCSchedule.prototype.saveConfig = function() {
	this.town.saveConfig();
}

mtCSchedule.prototype.getConfig = function() {
	var	i;
	var	config;
	
	config = "";
	for(i = 0; i < this.tasks.length; i++) {
		if(config != "")
			config += ",";
		config += escape(this.tasks[i].getConfig());
	}
	return config;
}

mtCSchedule.prototype.newTask = function() {
	this.vNewTaskRow.style.display = "";
}

mtCSchedule.prototype.cancelNewTask = function() {
	this.vNewTaskRow.style.display = "none";
}

mtCSchedule.prototype.remove = function() {
	this.vTitleRow.parentNode.removeChild(this.vTitleRow);
	this.vNewTaskRow.parentNode.removeChild(this.vNewTaskRow);
	this.vTaskRow.parentNode.removeChild(this.vTaskRow);
	
	while(this.tasks.length > 0) {
		this.removeTask(this.tasks[0].getObjId());
	}
	
	delete this;
}

mtCSchedule.prototype.buildTask = function(task_type, task_constructor) {
	var	task;
	var	tr, td;
	var	tmp;
	
	task = new task_constructor(task_type, this);
	this.tasks.push(task);
	this.saveConfig();
	
	tr = this.vTaskTable.insertRow(-1);
	tr.setAttribute("task_id", task.getObjId());
	
	td = tr.insertCell(-1);
	tmp = document.createElement("input");
	tmp.type = "checkbox";
	tmp.title = "Enable";
	if(task.canRun())
		tmp.disabled = false;
	else
		tmp.disabled = true;
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
		obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
		if(ev.target.checked)
			obj.run();
		else
			obj.stop();
	}, false);
	
	td = tr.insertCell(-1);
	td.noWrap = true;
	td.innerHTML = task.getTitle();
	
	td = tr.insertCell(-1);
	td.noWrap = true;
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.style.verticalAlign = "middle";
	tmp.style.border = "1px outset lightgray";
	tmp.style.margin = "1px";
	tmp.innerHTML = "<img src='" + MTI_CONFIG + "'/>";
	tmp.title = "Settings...";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	pos;
		var	obj;
		
		pos = mtGetVisualPlacement(ev.target);
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
		obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
		obj.setup([pos[0], pos[1] + pos[3]]);
	}, false);
	
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.style.verticalAlign = "middle";
	tmp.style.border = "1px outset lightgray";
	tmp.style.margin = "1px";
	tmp.innerHTML = "<img src='" + MTI_DELETE + "'/>";
	tmp.title = "Delete";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	obj;
		
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
		obj.removeTask(mtGetAttribute(ev.target, "task_id"));
	}, false);
	
	// TODO
	
	td = tr.insertCell(-1);
	td.innerHTML = task.getHTMLMessage();
	
	this.cancelNewTask();
	
	return task;
}

mtCSchedule.prototype.updateTask = function(obj_id) {
	var	task;
	var	i;
	var	tr;
	
	task = this.lookupTask(obj_id);
	if(task == null)
		return;
	tr = null;
	for(i = 0; i < this.vTaskTable.rows.length; i++) {
		if(this.vTaskTable.rows[i].getAttribute("task_id") == obj_id) {
			tr = this.vTaskTable.rows[i];
			break;
		}
	}
	if(tr == null)
		return;
	
	if(task.canRun())
		tr.cells[0].childNodes[0].disabled = false;
	else
		tr.cells[0].childNodes[0].disabled = true;
	if(task.isRunning())
		tr.cells[0].childNodes[0].checked = true;
	else
		tr.cells[0].childNodes[0].checked = false;
	
	//modify & fix the length problem of task content	
	tr.cells[1].innerHTML = task.getTitle();
	
	// TODO
	
	tr.cells[3].innerHTML = task.getHTMLMessage();
}

mtCSchedule.prototype.lookupTask = function(obj_id) {
	var	i;
	
	for(i = 0; i < this.tasks.length; i++)
		if(this.tasks[i].getObjId() == obj_id)
			return this.tasks[i];
	return null;
}

mtCSchedule.prototype.removeTask = function(obj_id) {
	var	i;
	var	task;
	
	for(i = 0; i < this.tasks.length; i++) {
		if(this.tasks[i].getObjId() == obj_id) {
			task = this.tasks[i];
			this.tasks.splice(i, 1);
			task.remove();
			for(i = 0; i < this.vTaskTable.rows.length; i++) {
				if(this.vTaskTable.rows[i].getAttribute("task_id") == obj_id) {
					this.vTaskTable.deleteRow(i);
					break;
				}
			}
			this.saveConfig();
			return;
		}
	}
}

// --> private functions
mtCSchedule.prototype._initVisual = function(parentTable) {
	var	table;
	var	tr, td;
	var	a;
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("schedule_id", this.objId);
	td = tr.insertCell(-1);
	this.vTitleRow = tr;
	
	a = document.createElement("span");
	td.appendChild(a);
	a.style.fontStyle = "italic";
	//a.textContent = "Tasks";
	a.textContent = "工作排程";
	this.vTitle = a;
	
	a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.style.verticalAlign = "middle";
	a.style.border = "1px outset lightgray";
	a.style.margin = "1px";
	a.innerHTML = "<img src='" + MTI_ADD + "'/>";
	a.title = "Add a new task";
	td.appendChild(a);
	a.addEventListener("click", function(ev) {
		var	obj;
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		if(obj == null)
			return;
		obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
		if(obj == null)
			return;
		obj.newTask();
	}, false);
	
	a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.style.verticalAlign = "middle";
	a.style.border = "1px outset lightgray";
	a.style.margin = "1px";
	a.innerHTML = "<img src='" + MTI_DELETE + "'/>";
	a.title = "Delete this schedule";
	td.appendChild(a);
	a.addEventListener("click", function(ev) {
		var	town_id;
		var	schedule_id;
		var	obj;
		if(confirm("Delete these tasks?") == false)
			return;
		town_id = mtGetAttribute(ev.target, "town_id");
		schedule_id = mtGetAttribute(ev.target, "schedule_id");
		obj = mtUser.lookupTown(town_id);
		if(obj == null)
			return;
		obj.deleteSchedule(schedule_id);
	}, false);
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("schedule_id", this.objId);
	td = tr.insertCell(-1);
	this.vNewTaskRow = tr;
	this._initVisualNewTask(td);
	this.vNewTaskRow.style.display = "none";
	
	tr = parentTable.insertRow(-1);
	tr.setAttribute("schedule_id", this.objId);
	td = tr.insertCell(-1);
	this.vTaskRow = tr;
	this.vTaskCell = td;
	
	table = document.createElement("table");
	this.vTaskCell.appendChild(table);
	this.vTaskTable = table;
}

mtCSchedule.prototype._initVisualNewTask = function(cell) {
	var	i;
	var	a;
	var	tmp;
	
	tmp = document.createElement("div");
	tmp.style.textAlign = "left";
	cell.appendChild(tmp);
	for(i = 0; i < mtTaskPool.length; i++) {
		a = document.createElement("a");
		a.href = "javascript:void(0);";
		a.setAttribute("task_index", i);
		a.textContent = mtTaskPool[i][1];
		tmp.appendChild(a);
		a.addEventListener("click", function(ev) {
			var	town_id;
			var	schedule_id;
			var	obj;
			var	key;
			town_id = mtGetAttribute(ev.target, "town_id");
			schedule_id = mtGetAttribute(ev.target, "schedule_id");
			obj = mtUser.lookupTown(town_id);
			if(obj == null)
				return;
			obj = obj.lookupSchedule(schedule_id);
			if(obj == null)
				return;
			key = ev.target.getAttribute("task_index");
			obj.buildTask(mtTaskPool[key][0], mtTaskPool[key][2]);
		}, false);
		
		a = document.createElement("br");
		tmp.appendChild(a);
	}
	
	tmp = document.createElement("div");
	tmp.style.textAlign = "right";
	cell.appendChild(tmp);
	a = document.createElement("a");
	a.href = "javascript:void(0);";
	a.textContent = "cancel";
	tmp.appendChild(a);
	a.addEventListener("click", function(ev) {
		var	town_id;
		var	schedule_id;
		var	obj;
		town_id = mtGetAttribute(ev.target, "town_id");
		schedule_id = mtGetAttribute(ev.target, "schedule_id");
		obj = mtUser.lookupTown(town_id);
		if(obj == null)
			return;
		obj = obj.lookupSchedule(schedule_id);
		if(obj == null)
			return;
		obj.cancelNewTask();
	}, false);
}
/* ==== class mtCSchedule ==== */

/* ==== class mtCTaskBarrackProduce ==== */
function mtCTaskBarrackProduce(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	if(task_type == MTT_STABLE_PRODUCE) {
		this.building = MTB_STABLE;
	} else if(task_type == MTT_BARRACK_PRODUCE)  {
		this.building = MTB_BARRACKS;
	} else if(task_type == MTT_WORKSHOP_PRODUCE) {
		this.building = MTB_WORKSHOP;
	} else if(task_type == MTT_RESIDENCE_PRODUCE) {
		this.taskType = MTT_RESIDENCE_PRODUCE;
		this.building = MTB_RESIDENCE;
 	} else if(task_type == MTT_PALACE_PRODUCE) {
		this.taskType = MTT_PALACE_PRODUCE;
		this.building = MTB_PALACE;
	} else {
		this.taskType = MTT_BARRACK_PRODUCE;
		this.building = MTB_BARRACKS;
	} 

	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = null;
}

mtCTaskBarrackProduce.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskBarrackProduce.prototype.loadConfig = function(config) {
	var	type;
	var	building;
	var	cf;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	if(type == MTT_BARRACK_PRODUCE)
		building = MTB_BARRACKS;
	else if(type == MTT_STABLE_PRODUCE)
		building = MTB_STABLE;
	else if(type == MTT_WORKSHOP_PRODUCE)
		building = MTB_WORKSHOP;
	else
		return false;
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.building = building;
	this.config = null;
	if(config.length >= 5) {
		cf = new Object();
		cf.troopType = parseInt(config[2]);
		cf.troopName = config[3];
		cf.troopNumber = parseInt(config[4]);
		cf.troopRepeat = parseInt(config[5]);
		cf.reserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			cf.reserveRes[i] = 0;
		}
		if(config.length >= 9) {
			for(i = 0; i < 4; i++) {
				cf.reserveRes[i] = parseInt(config[6 + i]);
			}
		}
		this.config = cf;
	}
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskBarrackProduce.prototype.saveConfig = function() {
	this.schedule.saveConfig();
}

mtCTaskBarrackProduce.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += "," + escape(this.config.troopType);
	config += "," + escape(this.config.troopName);
	config += "," + escape(this.config.troopNumber);
	config += "," + escape(this.config.troopRepeat);
	for(i = 0; i < 4; i++) {
		config += "," + escape(this.config.reserveRes[i]);
	}
	return config;
}

mtCTaskBarrackProduce.prototype.getTitle = function() {
	var	title;
	var	i;
	
	//title = "Produce in " + mtBuildingName[this.building];
	title = "於" + mtBuildingName[this.building] +"建造";
	if(this.config != null) {
		title += ":" + this.config.troopName + "(" + this.config.troopNumber + ")";
	
		if(this.config.troopRepeat != null && this.config.troopRepeat>=1)	
		title += "<br><font color=green>repeat = " + this.config.troopRepeat + "</font>";
		else
		title += "<br><font color=blue>repeat = ∞</font>";
	
	}


	return title;
}

mtCTaskBarrackProduce.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskBarrackProduce.prototype.canRun = function() {
	if(this.config == null)
		return false;
	return true;
}

mtCTaskBarrackProduce.prototype.setup = function(pos) {
	var	div;
	var	tmp;
	var	i;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		tmp = document.createElement("span");
		tmp.textContent = "Produce:";
		div.appendChild(tmp);
		
		tmp = document.createElement("select");
		this.vTroopType = tmp;
		div.appendChild(tmp);

		tmp = document.createElement("span");
		tmp.textContent = "QTY:";
		div.appendChild(tmp);
		
		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 4;
		tmp.value = 1;
		this.vTroopNumber = tmp;		
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Limit:";
		div.appendChild(tmp);

		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 5;
		tmp.value = 0;
		this.vTroopRepeat = tmp;
		div.appendChild(tmp);

		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		this.vTroopInfo = tmp;
		div.appendChild(tmp);
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Reserve: ";
		div.appendChild(tmp);
		
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			this.vReserveRes[i] = tmp;
			div.appendChild(tmp);
		}
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	div.style.display = "none";
	
	tmp = this.schedule.getTown().getBuildings(this.building);
	if(tmp.length > 0) {
		tmp[0].queryInfo(0, this, this._setup1, null);
	} else {
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to locate' + mtBuildingName[this.building] + '</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '</span>';
		this.schedule.updateTask(this.objId);
	}
}


mtCTaskBarrackProduce.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	
	config = new Object();
	config.troopType = this.vTroopType.options[this.vTroopType.selectedIndex].value;
	config.troopName = this.vTroopType.options[this.vTroopType.selectedIndex].text;
	config.troopNumber = parseInt(this.vTroopNumber.value);
	config.troopRepeat = parseInt(this.vTroopRepeat.value);
	
	if(isNaN(config.troopNumber) || config.troopNumber <= 0) {
		alert("Invalid configuration.");
		return;
	}
	if(this.vTroopRepeat.value == null) config.troopRepeat = 0;
	if(isNaN(config.troopRepeat) || config.troopRepeat < 0) {
		alert("Invalid configuration.");
		config.troopRepeat = 0;
		return;
	}

	
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = parseInt(this.vReserveRes[i].value);
		if(isNaN(config.reserveRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}




mtCTaskBarrackProduce.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskBarrackProduce.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskBarrackProduce.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskBarrackProduce.prototype.isRunning = function() {
	return this.running;
}

mtCTaskBarrackProduce.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskBarrackProduce.prototype._initVisual = function() {
	this.vSetupBox = null;
}

mtCTaskBarrackProduce.prototype._setup1 = function(info, options) {
	var	i;
	var	opt;
	
	mtDev("6210 mtCTaskBarrackProduce.prototype._setup1");
	if(info == null) {
		//this.message = '[' + new Date().toMTString() + '] Unable to query ' + mtBuildingName[this.building];
		this.message = '[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building];
		this.schedule.updateTask(this.objId);
		return;
	}
	
	this.vTroopType.options.length = 0;
	for(i = 0; i < info.producee.length; i++) {
		opt = document.createElement("option");
		opt.value = info.producee[i].id;
		opt.text = info.producee[i].name;
		mtDev("6223 " + opt.text);
		this.vTroopType.add(opt, null);
	}
	
	if(this.config != null) {
		for(i = 0; i < this.vTroopType.options.length; i++) {
			if(this.vTroopType.options[i].value == this.config.troopType) {
				this.vTroopType.selectedIndex = i;
				break;
			}
		}
		this.vTroopNumber.value = this.config.troopNumber;
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = this.config.reserveRes[i];
		}
	} else {
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = "0";
		}
	}
	
	this.vSetupBox.style.display = "";
}

mtCTaskBarrackProduce.prototype._recheck = function(options) {
	var	b;
	
	if(options != this.async_seq)
		return;
	mtDev("6188 mtCTaskBarrackProduce.prototype._recheck");
	b = this.schedule.getTown().getBuildings(this.building);
	if(b.length == 0) {
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			1 * 60 * 1000);
		return;
	}
	
	b = b[0];
	b.queryInfo(0, this, this._check, ++this.async_seq);
	
	this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[this.building];
	this.schedule.updateTask(this.objId);
}

mtCTaskBarrackProduce.prototype._check = function(info, options) {
	var	i, idx;
	var	res;
	var	data;
	mtDev("6271 mtCTaskBarrackProduce.prototype._check");
	if(options != this.async_seq)
		return;

	mtDev("6282 info.producing" + info.producing);
	mtDev("6278 info.producing.length"+info.producing.length);		
	if(info.producing.length >= 5) {
		this.message = '[' + new Date().toMTString() + '] 建造排程已滿, 等待 ' + mtTimeRepresent(info.producing[info.producing.length - 2].last);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			info.producing[info.producing.length - 2].last * 1000 + 2000);	// Give 2 seconds of buffer
		this.schedule.updateTask(this.objId);
		return;
	}
	
	idx = -1;
	for(i = 0; i < info.producee.length; i++) {
		if(info.producee[i].id == this.config.troopType) {
			idx = i;
			break;
		}
	}
	if(idx == -1) {
		this.message = '[' + new Date().toMTString() + '] ' + this.config.troopName + ' 目前無法建造 , 等待 0:10:00.';
		mtSetTimeout(this, this._recheck, ++this.async_seq, 10 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	mtDev("6300");
	for(i = 0; i < 4; i++) {
		if(this.schedule.getTown().getResource(i) < this.config.reserveRes[i] + info.producee[idx].cost[i] * this.config.troopNumber) {
			this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';
			mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
			this.schedule.updateTask(this.objId);
			return;
		}
	}
	
	data = "";
	for(i = 0; i < info.formData.length; i++) {
		data += "&" + encodeURIComponent(info.formData[i][0]) + "=" + encodeURIComponent(info.formData[i][1]);
	}
	data += "&" + encodeURIComponent(info.producee[idx].formName) + "=" + this.config.troopNumber;
	data = data.substr(1);	
	//this.message = '[' + new Date().toMTString() + '] Execute producing';
	mtDev("6317 " + data);
	this.message = '[' + new Date().toMTString() + '] 建造排程中';
	this.schedule.updateTask(this.objId);
	mtOOPostSoon("build.php?newdid=" + this.schedule.getTown().getId(), data, this, this._postProduce, ++this.async_seq);
	
	mtDev("6322");
}



mtCTaskBarrackProduce.prototype._postProduce = function(req, options) {
	var	t;
	
	mtParseGlobal(req);
	mtDev("6331");
	if(options != this.async_seq)
		return;
	mtDev("6334");

	if(this.config.troopRepeat != null)
	 if(this.config.troopRepeat > 1 ) 
	 {
	 	this.config.troopRepeat--;
	 	this.saveConfig();
	 }
	 else if(this.config.troopRepeat == 1 ) 
	 {
	 	this.stop();
	}
	 else if(this.config.troopRepeat <= 0 ) this.config.troopRepeat = 0;

	t = Math.floor(Math.random() * 10 * 1000) + 1000;
	this.message = '[' + new Date().toMTString() + '] Recheck in ' + t + 'ms';
	mtSetTimeout(this, this._recheck, ++this.async_seq, t);
	mtDev("6351");		
}



/* ==== class mtCTaskBarrackProduce ==== */

/* ==== class mtCTaskHoldCelebration ==== */
function mtCTaskHoldCelebration(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = null;
}

mtCTaskHoldCelebration.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskHoldCelebration.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	if(config.length >= 4) {
		cf = new Object();
		cf.celebrationType = parseInt(config[2]);
		cf.celebrationName = config[3];
		cf.reserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			cf.reserveRes[i] = 0;
		}
		if(config.length >= 8) {
			for(i = 0; i < 4; i++) {
				cf.reserveRes[i] = parseInt(config[4 + i]);
			}
		}
		this.config = cf;
	}
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskHoldCelebration.prototype.saveConfig = function() {
	this.schedule.saveConfig();
}

mtCTaskHoldCelebration.prototype.getConfig = function() {
	var	config;
	var	i;
	
	
	
	config = escape(this.taskType);

	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += "," + escape(this.config.celebrationType);
	config += "," + escape(this.config.celebrationName);
	for(i = 0; i < 4; i++) {
		config += "," + escape(this.config.reserveRes[i]);
	}
	return config;
}

mtCTaskHoldCelebration.prototype.getTitle = function() {
	var	title;
	var	i;
	
	title = "Celebrate in " + mtBuildingName[MTB_TOWN_HALL];
	if(this.config != null) {
		title += ":" + this.config.celebrationName;
	}
	return title;
}

mtCTaskHoldCelebration.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskHoldCelebration.prototype.canRun = function() {
	if(this.config == null)
		return false;
	return true;
}

mtCTaskHoldCelebration.prototype.setup = function(pos) {
	var	div;
	var	tmp;
	var	i;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		tmp = document.createElement("span");
		tmp.textContent = "Celebration:";
		div.appendChild(tmp);
		
		tmp = document.createElement("select");
		this.vCelebrationType = tmp;
		div.appendChild(tmp);
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Reserve: ";
		div.appendChild(tmp);
		
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			this.vReserveRes[i] = tmp;
			div.appendChild(tmp);
		}
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	div.style.display = "none";
	
	tmp = this.schedule.getTown().getBuildings(MTB_TOWN_HALL);
	
	if(tmp.length > 0) {
		tmp[0].queryInfo(0, this, this._setup1, null);
	} else {
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to locate' + mtBuildingName[MTB_TOWN_HALL] + '</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[MTB_TOWN_HALL] + '</span>';
		this.schedule.updateTask(this.objId);
	}
}

mtCTaskHoldCelebration.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	
	config = new Object();
	config.celebrationType = this.vCelebrationType.options[this.vCelebrationType.selectedIndex].value;
	config.celebrationName = this.vCelebrationType.options[this.vCelebrationType.selectedIndex].text;
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = parseInt(this.vReserveRes[i].value);
		if(isNaN(config.reserveRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskHoldCelebration.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskHoldCelebration.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskHoldCelebration.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskHoldCelebration.prototype.isRunning = function() {
	return this.running;
}

mtCTaskHoldCelebration.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskHoldCelebration.prototype._initVisual = function() {
	this.vSetupBox = null;
}

mtCTaskHoldCelebration.prototype._setup1 = function(info, options) {
	var	i;
	var	opt;
	
	if(info == null) {
		//this.message = '[' + new Date().toMTString() + '] Unable to query ' + mtBuildingName[MTB_TOWN_HALL];
		this.message = '[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[MTB_TOWN_HALL];
		this.schedule.updateTask(this.objId);
		return;
	}
	
	this.vCelebrationType.options.length = 0;
	for(i = 0; i < info.celebration.length; i++) {
		opt = document.createElement("option");
		opt.value = info.celebration[i].id;
		opt.text = info.celebration[i].name;
		this.vCelebrationType.add(opt, null);
	}
	
	if(this.config != null) {
		for(i = 0; i < this.vCelebrationType.options.length; i++) {
			//if(this.vCelebrationType.options[i].value == this.config.celebrationType) {	// All celebrations have same ID' 420
			if(this.vCelebrationType.options[i].text == this.config.celebrationName) {
				this.vCelebrationType.selectedIndex = i;
				break;
			}
		}
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = this.config.reserveRes[i];
		}
	} else {
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = "0";
		}
	}
	
	this.vSetupBox.style.display = "";
}

mtCTaskHoldCelebration.prototype._recheck = function(options) {
	var	b;
	
	if(options != this.async_seq)
		return;
	
	b = this.schedule.getTown().getBuildings(MTB_TOWN_HALL);
	if(b.length == 0) {
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to locate' + mtBuildingName[MTB_TOWN_HALL] + '. Retry in 0:10:00.</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[MTB_TOWN_HALL] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			10 * 60 * 1000);
		return;
	}
	
	b = b[0];
	b.queryInfo(0, this, this._check, ++this.async_seq);
	//this.message = '[' + new Date().toMTString() + '] Quering ' + mtBuildingName[MTB_TOWN_HALL];
	this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[MTB_TOWN_HALL];
	this.schedule.updateTask(this.objId);
}

mtCTaskHoldCelebration.prototype._check = function(info, options) {
	var	i, idx;
	var	url;
	var obj;
	
	if(options != this.async_seq)
		return;


		
	if(info.holdLast != 0) {
		//this.message = '[' + new Date().toMTString() + '] Celebration is being helt, wait ' + mtTimeRepresent(info.holdLast);
		this.message = '[' + new Date().toMTString() + '] 派對進行中, 等待 ' + mtTimeRepresent(info.holdLast) ;
		
		if(info.holdLast < 4000 )
		{
			//call the auto resource request
			mtDev("6960 auto resource");
			obj = this.schedule.getTown();
			obj.applyResourceManagerConfigBigParty();
			obj.applyResourceManagerConfigDirection("IN",true);

		mtSetTimeout(this, this._recheck, ++this.async_seq, info.holdLast * 1000);
		}
		else
		mtSetTimeout(this, this._recheck, ++this.async_seq, 60 * 60 * 1000);	//check every hour
		this.schedule.updateTask(this.objId);
		return;
	}
	
	idx = -1;
	for(i = 0; i < info.celebration.length; i++) {
		//if(info.celebration[i].id == this.config.celebrationType) {	// All celebrations have same ID' 420
		if(info.celebration[i].name == this.config.celebrationName) {
			idx = i;
			break;
		}
	}
	if(idx == -1) {
		//this.message = '[' + new Date().toMTString() + '] ' + this.config.celebrationName + ' is not available, wait 0:10:00.';
		this.message = '[' + new Date().toMTString() + '] ' + this.config.celebrationName + ' 正在忙碌中 , 等待 0:10:00.';
		mtSetTimeout(this, this._recheck, ++this.async_seq, 10 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	
	for(i = 0; i < 4; i++) {
		if(this.schedule.getTown().getResource(i) < this.config.reserveRes[i] + info.celebration[idx].cost[i]) {
			//this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] Resource is not enough to produce, wait 0:10:00.</span>';
			this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 資源不足 , 等待 0:10:00 </span>';
			mtSetTimeout(this, this._recheck, ++this.async_seq, 10 * 60 * 1000);
			this.schedule.updateTask(this.objId);
			return;
		}
	}
	
	if(info.celebration[idx].href == null) {
		//this.message = '[' + new Date().toMTString() + '] ' + info.celebration[idx].reason + ', wait 0:10:00.';
		this.message = '[' + new Date().toMTString() + '] ' + info.celebration[idx].reason + ', 等待 0:10:00.';
		mtSetTimeout(this, this._recheck, ++this.async_seq, 10 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	
	url = info.celebration[idx].href;
	url += "&newdid=" + this.schedule.getTown().getId();
	
	//this.message = '[' + new Date().toMTString() + '] Execute holding';
	this.message = '[' + new Date().toMTString() + '] 舉行中';
	this.schedule.updateTask(this.objId);
	//if auto resource change
	// change the setting here.

	
	
	mtOOGet(url, this, this._postHold, ++this.async_seq);
}

mtCTaskHoldCelebration.prototype._postHold = function(req, options) {
	var	t;
	var obj;	
	mtParseGlobal(req);
	
	if(options != this.async_seq)
		return;

		obj = this.schedule.getTown();
//	obj.applyResourceManagerConfigBigParty();
		obj.applyResourceManagerConfigDirection("IN",false);


		
	t = Math.floor(Math.random() * 10 * 1000) + 1000;
	this.message = '[' + new Date().toMTString() + '] Recheck in ' + t + 'ms';
	mtSetTimeout(this, this._recheck, ++this.async_seq,
		t);
}
/* ==== class mtCTaskHoldCelebration ==== */

/* ==== class mtCTaskUpgradeBuilding ==== */
function mtCTaskUpgradeBuilding(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = new Object();
	this.config.reserveRes = [0, 0, 0, 0];
	this.config.target = new Array();
}

mtCTaskUpgradeBuilding.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskUpgradeBuilding.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	target;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	if(config.length >= 6) {
		cf = new Object();
		cf.reserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			cf.reserveRes[i] = parseInt(config[2 + i]);
		}
		cf.target = new Array();
		for(i = 8; i < config.length; i += 3) {
			target = new Object();
			target.id = parseInt(config[i - 2]);
			target.gid = parseInt(config[i - 1]);
			target.level = parseInt(config[i]);
			cf.target.push(target);
		}
		this.config = cf;
	}
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskUpgradeBuilding.prototype.saveConfig = function() {
	//mtDev("6632 mtCTaskUpgradeBuilding.prototype.saveConfig");
	this.schedule.saveConfig();
}

mtCTaskUpgradeBuilding.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	//mtDev("6541 config = " + config );
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	for(i = 0; i < 4; i++) {
		config += "," + escape(this.config.reserveRes[i]);
	}
	for(i = 0; i < this.config.target.length; i++) {
		config += "," + escape(this.config.target[i].id);
		config += "," + escape(this.config.target[i].gid);
		config += "," + escape(this.config.target[i].level);
	}
	return config;
}

mtCTaskUpgradeBuilding.prototype.getTitle = function() {
	var	title;
	var	i;
	
	//title = "Booked upgrade:";
	title = "預定升級:";
	if(this.config != null) {
		for(i = 0; i < this.config.target.length; i++) {
			title += "<br>#" + (this.config.target[i].id + 1);
			title += "(" + mtBuildingName[this.config.target[i].gid] + ")";
		}
	}
	return title;
}

mtCTaskUpgradeBuilding.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskUpgradeBuilding.prototype.canRun = function() {
	return true;
}

mtCTaskUpgradeBuilding.prototype.setup = function(pos) {
	var	div;
	var	table, tr, td;
	var	tmp;
	var	i, j;
	var	opt;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		table= document.createElement("table");
		this.vTargetTable = table;
		div.appendChild(table);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "<img src='" + MTI_ADD + "'/>";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.setupNewTarget();
		}, false);

		tmp = document.createElement("hr");
		div.appendChild(tmp);

		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "[預設新村]";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.setupNewVillage();
		}, false);

		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "[儲存喜好]";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.saveMyFavTarget();
		}, false);

		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "[載入喜好]";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.loadMyFavTarget();
		}, false);
		
		tmp = document.createElement("hr");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Reserve: ";
		div.appendChild(tmp);
		
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			tmp.value = this.config.reserveRes[i];
			this.vReserveRes[i] = tmp;
			div.appendChild(tmp);
		}
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	while(this.vTargetTable.rows.length > 0)
		this.vTargetTable.deleteRow(0);
	if(this.config != null) {
		for(i = 0; i < this.config.target.length; i++) {
			tr = this.setupNewTarget();
			for(j = 0; j < tr.cells[0].childNodes[0].options.length; j++) {
				if(tr.cells[0].childNodes[0].options[j].value == this.config.target[i].id) {
					tr.cells[0].childNodes[0].selectedIndex = j;
					break;
				}
			}
			for(j = 0; j < tr.cells[1].childNodes[0].options.length; j++) {
				if(tr.cells[1].childNodes[0].options[j].value == this.config.target[i].gid) {
					tr.cells[1].childNodes[0].selectedIndex = j;
					break;
				}
			}
			tr.cells[2].childNodes[1].value = this.config.target[i].level;
		}
	}
	
	div.style.display = "";
}

mtCTaskUpgradeBuilding.prototype.setupNewTarget = function() {
	var	tr, td;
	var	tmp;
	var	opt;
	var	j;
	var	b;
	var	txt;
	
	tr = this.vTargetTable.insertRow(-1);
	
	td = tr.insertCell(-1);
	tmp = document.createElement("select");
	td.appendChild(tmp);
	for(j = 0; j < 40; j++) {
		opt = document.createElement("option");
		opt.value = j;
		b = this.schedule.getTown().getBuilding(j);
		if(b == null)
			continue;
		if(j == 38 && this.schedule.getTown().getBuilding(j).getType() == MTB_EMPTY) {
			txt = "集結點建築工地";
		} else if(j == 39 && this.schedule.getTown().getBuilding(j).getType() == MTB_EMPTY) {
			txt = "外面建築工地";
		} else {
			txt = mtBuildingName[this.schedule.getTown().getBuilding(j).getType()];
		}
		opt.text = "#" + (j + 1) + ": " +
			txt +
			"(LV" + this.schedule.getTown().getBuilding(j).getLevel() + ")";
		tmp.add(opt, null);
	}
	tmp.addEventListener("change", function(ev) {
		var	tr;
		var	town;
		var	i;
		var	b;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		
		town = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		b = town.getBuilding(ev.target.options[ev.target.selectedIndex].value);
		if(b.getType() != MTB_EMPTY) {
			for(i = 0; i < tr.cells[1].childNodes[0].options.length; i++) {
				if(tr.cells[1].childNodes[0].options[i].value == b.getType()) {
					tr.cells[1].childNodes[0].selectedIndex = i;
					break;
				}
			}
		}
	}, false);
	//tmp.selectedIndex = this.config.target[i].id;
	
	td = tr.insertCell(-1);
	tmp = document.createElement("select");
	td.appendChild(tmp);
	for(j = 0; j < mtBuildingName.length; j++) {
		opt = document.createElement("option");
		opt.value = j;
		if(opt.value == MTB_EMPTY)
			opt.text = "Do nothing";
		else
			opt.text = mtBuildingName[j];
		tmp.add(opt, null);
	}
	//tmp.selectedIndex = this.config.target[i].gid;
	
	td = tr.insertCell(-1);
	tmp = document.createElement("span");
	tmp.textContent = "until LV";
	td.appendChild(tmp);
	tmp = document.createElement("input");
	tmp.type = "text";
	tmp.size = 3;
	td.appendChild(tmp);
	
	td = tr.insertCell(-1);
	tmp = document.createElement("a");
	tmp.innerHTML = "<img src='" + MTI_DELETE + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	tr;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		tr.parentNode.removeChild(tr);
	}, false);
	
	return tr;
}

mtCTaskUpgradeBuilding.prototype.setupNewVillage = function() {
		mtDev("6794 setupNewVillage");
		this.setupNewTarget();
		this.vTargetTable.rows[0].cells[0].childNodes[0].selectedIndex=25;                                                  
		this.vTargetTable.rows[0].cells[1].childNodes[0].selectedIndex=MTB_MAIN_BUILDING;                                   
		this.vTargetTable.rows[0].cells[2].childNodes[1].value = 3;                                                         
		this.setupNewTarget();
		this.vTargetTable.rows[1].cells[0].childNodes[0].selectedIndex=19;
		this.vTargetTable.rows[1].cells[1].childNodes[0].selectedIndex=MTB_WAREHOUSE;
		this.vTargetTable.rows[1].cells[2].childNodes[1].value = 1;
		this.setupNewTarget();
		this.vTargetTable.rows[2].cells[0].childNodes[0].selectedIndex=20;
		this.vTargetTable.rows[2].cells[1].childNodes[0].selectedIndex=MTB_GRANARY;
		this.vTargetTable.rows[2].cells[2].childNodes[1].value = 1;
		this.setupNewTarget();
		this.vTargetTable.rows[3].cells[0].childNodes[0].selectedIndex=24;
		this.vTargetTable.rows[3].cells[1].childNodes[0].selectedIndex=MTB_MARKETPLACE;
		this.vTargetTable.rows[3].cells[2].childNodes[1].value = 1;
		this.setupNewTarget();
		this.vTargetTable.rows[4].cells[0].childNodes[0].selectedIndex=25;                                                  
		this.vTargetTable.rows[4].cells[1].childNodes[0].selectedIndex=MTB_MAIN_BUILDING;                                   
		this.vTargetTable.rows[4].cells[2].childNodes[1].value = 5;                                                         
		this.setupNewTarget();
		this.vTargetTable.rows[5].cells[0].childNodes[0].selectedIndex=19;
		this.vTargetTable.rows[5].cells[1].childNodes[0].selectedIndex=MTB_WAREHOUSE;
		this.vTargetTable.rows[5].cells[2].childNodes[1].value = 3;
		this.setupNewTarget();
		this.vTargetTable.rows[6].cells[0].childNodes[0].selectedIndex=20;
		this.vTargetTable.rows[6].cells[1].childNodes[0].selectedIndex=MTB_GRANARY;
		this.vTargetTable.rows[6].cells[2].childNodes[1].value = 3;
		this.setupNewTarget();
		this.vTargetTable.rows[7].cells[0].childNodes[0].selectedIndex=25;                                                  
		this.vTargetTable.rows[7].cells[1].childNodes[0].selectedIndex=MTB_MAIN_BUILDING;                                   
		this.vTargetTable.rows[7].cells[2].childNodes[1].value = 10;                                                         
		this.setupNewTarget();
		this.vTargetTable.rows[8].cells[0].childNodes[0].selectedIndex=19;
		this.vTargetTable.rows[8].cells[1].childNodes[0].selectedIndex=MTB_WAREHOUSE;
		this.vTargetTable.rows[8].cells[2].childNodes[1].value = 7;
		this.setupNewTarget();
		this.vTargetTable.rows[9].cells[0].childNodes[0].selectedIndex=20;
		this.vTargetTable.rows[9].cells[1].childNodes[0].selectedIndex=MTB_GRANARY;
		this.vTargetTable.rows[9].cells[2].childNodes[1].value = 7;
		this.setupNewTarget();
		this.vTargetTable.rows[10].cells[0].childNodes[0].selectedIndex=24;
		this.vTargetTable.rows[10].cells[1].childNodes[0].selectedIndex=MTB_MARKETPLACE;
		this.vTargetTable.rows[10].cells[2].childNodes[1].value = 5; 		
}


mtCTaskUpgradeBuilding.prototype.saveMyFavTarget = function() {
		mtDev("6794 setupNewVillage");
		var i,j = this.vTargetTable.rows.length;
		var fav = "";
		
		for(i=0;i<j;i++)
		{			
			//mtDev(this.vTargetTable.rows[i].cells[0].childNodes[0].selectedIndex);
			fav = fav + this.vTargetTable.rows[i].cells[0].childNodes[0].selectedIndex + ",";
			//mtDev(this.vTargetTable.rows[i].cells[1].childNodes[0].selectedIndex);
			fav = fav + this.vTargetTable.rows[i].cells[1].childNodes[0].selectedIndex + ",";
			//mtDev(this.vTargetTable.rows[i].cells[2].childNodes[1].value); 	
			fav = fav + this.vTargetTable.rows[i].cells[2].childNodes[1].value + ",";
		}		
		GM_setValue("MT_FAV", fav);	
		alert("Save!");	
}

mtCTaskUpgradeBuilding.prototype.loadMyFavTarget = function() {
		mtDev("6794 setupNewVillage");
		var i;
		var fav = GM_getValue("MT_FAV", fav).split(",");		
		var tr = this.vTargetTable.getElementsByTagName("tr");
		var row_org = 0;
		if(tr!=null) row_org = tr.length;	
		if((fav.length-1)%3==0)
		{
			
			var rows = Math.floor((fav.length-1)/3);
			for(i=0;i<rows;i++)
			{
				this.setupNewTarget();
				this.vTargetTable.rows[row_org+i].cells[0].childNodes[0].selectedIndex=fav[i*3];
				this.vTargetTable.rows[row_org+i].cells[1].childNodes[0].selectedIndex=fav[i*3+1];
				this.vTargetTable.rows[row_org+i].cells[2].childNodes[1].value = fav[i*3+2]; 		
			}
		}
}


mtCTaskUpgradeBuilding.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	var	target;
	var	sel;
	
	config = new Object();
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = parseInt(this.vReserveRes[i].value);
		if(isNaN(config.reserveRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	config.target = new Array();
	for(i = 0; i < this.vTargetTable.rows.length; i++) {
		target = new Object();
		sel = this.vTargetTable.rows[i].cells[0].childNodes[0];
		target.id = parseInt(sel.options[sel.selectedIndex].value);
		sel = this.vTargetTable.rows[i].cells[1].childNodes[0];
		target.gid = parseInt(sel.options[sel.selectedIndex].value);
		sel = this.vTargetTable.rows[i].cells[2].childNodes[1];
		target.level = parseInt(sel.value);
		sel = this.schedule.getTown().getBuilding(target.id);
		if(target.gid == MTB_EMPTY || (sel.getType() != MTB_EMPTY && sel.getType() != target.gid) || isNaN(target.level)) {
			alert("Invalid configuration.");
			return;
		}
		config.target.push(target);
	}
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskUpgradeBuilding.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskUpgradeBuilding.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskUpgradeBuilding.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskUpgradeBuilding.prototype.isRunning = function() {
	return this.running;
}

mtCTaskUpgradeBuilding.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskUpgradeBuilding.prototype._initVisual = function() {
	this.vSetupBox = null;
}

mtCTaskUpgradeBuilding.prototype._recheck = function(options) {
	var	b;
	var	target;
	var	town;
	var	ret;
		
	if(options != this.async_seq)
		return;
		
	//mtDev("mtCTaskUpgradeBuilding.prototype._recheck");		
		
	if(this.config.target.length == 0) {
		//this.message = '[' + new Date().toMTString() + '] Nothing to do, wait 0:03:00.';
		this.message = '[' + new Date().toMTString() + '] 沒有任何排程 , 等待 0:03:00.';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
		return;
	}
	
	town = this.schedule.getTown();
	
	target = this.config.target[0];
	
	
	b = town.getBuilding(target.id);
	if(b.getType() == target.gid && b.getLevel() >= target.level) {
		//mtDev('[' + town.getName() + ']' +
		//	'#' + (target.id + 1) + '(' + mtBuildingName[target.gid] + ') has reached LV' + target.level);
		this.config.target.shift();
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq, 0);
		return;
	}
	
	ret = b.upgrade(target.gid, this.config.reserveRes.concat(null),
		this, this._upgradeResult, ++this.async_seq);
	if(ret[0] == MTUE_IN_PROGRESS) {	// [MTUE_IN_PROGRESS, upgradeHandle]
		//this.message = '[' + new Date().toMTString() + '] Quering ' + mtBuildingName[b.getType()];
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b.getType()];
		this.schedule.updateTask(this.objId);
	} else if(ret[0] == MTUE_TYPE_MISMATCH) {	// [MTUE_TYPE_MISMATCH]
		mtLog('[' + town.getName() + ']' +
			'#' + (target.id + 1) + '(' + mtBuildingName[b.getType()] + ') cannot be upgraded to ' + mtBuildingName[target.gid]);
		this.config.target.shift();
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq, 0);
	} else if(ret[0] == MTUE_TOWN_BUSY) {	// [MTUE_TOWN_BUSY]
		//this.message = '[' + new Date().toMTString() + '] Town is working, wait for idle.';
		this.message = '[' + new Date().toMTString() + '] 建築進行中';
		this.schedule.updateTask(this.objId);
		town.addIdleListener(this, this._recheck, ++this.async_seq);
	} else {
		//this.message = '[' + new Date().toMTString() + '] Unknown error code(' + ret[0] + '), wait 0:03:00.';
		this.message = '[' + new Date().toMTString() + '] 發生不知名錯誤，錯誤碼(' + ret[0] + '), 請洽程式設計師';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
	}
}

mtCTaskUpgradeBuilding.prototype._upgradeResult = function(result, options) {
	var	target;
	var	town;
	
	if(options != this.async_seq)
		return;
		
		
	target = this.config.target[0];
	town = this.schedule.getTown();
	if(result[0] == MTUR_NO_ERROR) {	// [MTUR_NO_ERROR]
		mtLog('[' + town.getName() + ']' +
			'Upgrade #' + (target.id) + '(' + mtBuildingName[target.gid] + ' LV' + town.getBuilding(target.id).getLevel() + ')');
		//this.message = '[' + new Date().toMTString() + '] Execute upgrading, wait for town idle.';
		this.message = '[' + new Date().toMTString() + '] 建築升級中';//MSG_BUILDING_IN_PROGESS
		this.schedule.updateTask(this.objId);
		this.schedule.getTown().addIdleListener(this, this._recheck, ++this.async_seq);
	} else if(result[0] == MTUR_CANCELED) {	// [MTUR_CANCELED]
		/* Shall not happen */;
	} else if(result[0] == MTUR_NOT_ALLOWED) {	// [MTUR_NOT_ALLOWED]
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to build ' + mtBuildingName[target.gid] + ', wait 0:03:00.</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 無法建造' + mtBuildingName[target.gid] + ', 等待 0:03:00.</span>';//UNABLE_TO_BUILD
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
	} else if(result[0] == MTUR_INSUFFICIENT_RESOURCE) {	// [MTUR_INSUFFICIENT_RESOURCE, [woodWant, clayWant, ironWant, cropWant], supplyWant]
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00.</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';//MSG_INSUFFICIENT_RESOURCE
		mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
	} else if(result[0] == MTUR_SOME_ERROR) {	// [MTUR_SOME_ERROR, message]
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] ' + result[1] + ', wait 0:03:00.</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] ' + result[1] + ', 等待 0:03:00.</span>';
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
	} else {
		//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unknown error code(' + result[0] + '), wait 0:03:00.</span>';
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 發生不知名錯誤，錯誤碼(' + result[0] + '), 請洽程式設計師.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
	}
}
/* ==== class mtCTaskUpgradeBuilding ==== */

/* ==== class mtCTaskAutomaticUpgrade ==== */
function mtCTaskAutomaticUpgrade(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">請勾選啟動<span>';//MSG_CLICK_TO_ACTIVATE
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = new Object();
	this.config.maxCranny = 0;
}

mtCTaskAutomaticUpgrade.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskAutomaticUpgrade.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	target;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	if(config.length >= 3) {
		cf = new Object();
		cf.maxCranny = parseInt(config[2]);
		cf.autoBuilding = config[3];
		this.config = cf;
	}
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskAutomaticUpgrade.prototype.saveConfig = function() {
	this.schedule.saveConfig();
}

mtCTaskAutomaticUpgrade.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += "," + escape(this.config.maxCranny);
	config += "," + escape(this.config.autoBuilding);
	return config;
}

mtCTaskAutomaticUpgrade.prototype.getTitle = function() {
	var	title;
	
	title = "Automatic upgrade";
	return title;
}

mtCTaskAutomaticUpgrade.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskAutomaticUpgrade.prototype.canRun = function() {
	return true;
}

mtCTaskAutomaticUpgrade.prototype.setup = function(pos) {
	var	div;
	var	table, tr, td;
	var	tmp;
	var	i, j;
	var	opt;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		

		
		tmp = document.createElement("span");
		tmp.textContent = mtBuildingName[MTB_CRANNY]+":";
		div.appendChild(tmp);
		tmp = document.createElement("select");
		for(i = 0; i < 10; i++) {
				opt = document.createElement("option");
				opt.value = i;
				opt.text = i ;
				tmp.add(opt, null);
		}
		this.vCrannyNumber = tmp;
		div.appendChild(tmp);
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
	
		this.vAutoBuilding = new Array();
		for(i= MTB_SAWMILL; i<=	MTB_BAKERY; i++)
		{
			tmp = document.createElement("span");
			tmp.textContent = mtBuildingName[i];
			div.appendChild(tmp);
			tmp = document.createElement("input");
			tmp.type = "checkbox";
			this.vAutoBuilding[i]=tmp;
			div.appendChild(tmp);
			tmp = document.createElement("BR");
			div.appendChild(tmp);			
		}
//			MTB_SAWMILL			= 5,
//	MTB_BRICKYARD			= 6,
//	MTB_IRON_FOUNDARY		= 7,
//	MTB_GRAIN_MILL			= 8,
//	MTB_BAKERY			= 9,

//		
		tmp = document.createElement("hr");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	if(this.config != null) {
		this.vCrannyNumber.value = this.config.maxCranny;
		for(i= MTB_SAWMILL; i<=	MTB_BAKERY; i++)
		{
			this.vAutoBuilding[i].checked= this.config.autoBuilding[i-MTB_SAWMILL];
		}
	}
	
	div.style.display = "";
}

mtCTaskAutomaticUpgrade.prototype.applySetup = function(pos) {
	var	config;
	
	config = new Object();
	config.autoBuilding = new Array();

	config.maxCranny = this.vCrannyNumber[this.vCrannyNumber.selectedIndex].value;
	if(isNaN(config.maxCranny)) {
		alert("Invalid configuration.");
		return;
	}
	
	for(i= MTB_SAWMILL; i<=	MTB_BAKERY; i++)
	{
		config.autoBuilding[i-MTB_SAWMILL]=this.vAutoBuilding[i].checked;
	}
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskAutomaticUpgrade.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskAutomaticUpgrade.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskAutomaticUpgrade.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskAutomaticUpgrade.prototype.isRunning = function() {
	return this.running;
}

mtCTaskAutomaticUpgrade.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskAutomaticUpgrade.prototype._initVisual = function() {
	this.vSetupBox = null;
}

mtCTaskAutomaticUpgrade.prototype._recheck = function(options) {
	var	b;
	var	target;
	var	town;
	var	res;
	var	i;
	
	mtDev("6248 mtCTaskAutomaticUpgrade._recheck");
	
	if(options != this.async_seq)
		return;
		
	town = this.schedule.getTown();
	/*
	if(town.getWorking() != null) {
		this.message = '[' + new Date().toMTString() + '] Town is working, wait for idle.';
		this.schedule.updateTask(this.objId);
		town.addIdleListener(this, this._recheck, ++this.async_seq);
		return;
	}*/
	
	target = [null, null, null, null];
	for(res = 0; res < 4; res++) {
		b = town.getBuildings(res + 1);	// To building type
						// from 1 to 4 each resource type.
		for(i = 0; i < b.length; i++) {
			if(target[res] == null) { 		// init, get 
				if(b[i].getLevel() < 10) {	// Maximum level 10
					target[res] = b[i];	// first unfinished resource target
				}
			} else if(target[res].getLevel() > b[i].getLevel()) {
				target[res] = b[i];		// find the current minimal level in this type.
			}
		}
	}

	// todo
	// if in (1/2/3), there are no level 10 resource
	// and there are only one item higher than level 7
	// upgrade thie on to extension foundry.
	
	// todo
	// if in (1/2/3), there are "one" level 10 resource 
	// check the related foundry
	// check if the config contains the foundry .
	
	res = null;
	for(i = 0; i < 4; i++) {
		if(target[i] == null)
			continue;
		if(res == null) {
			res = i;
		} else if(town.getResource(i) < town.getResource(res)) {
			res = i;
		}
	}
	if(res == null) {	// No farms can be upgrade
		mt = 0;
		for(i = 0; i < 4; i++) {
			t = (town.getCapacity(i) + 1 - town.getResource(i)) / town.getProducibility(i);
			if(mt < t)
				mt = t;
		}
		if(this._recheck1(mt) == false) {
			//this.message = '[' + new Date().toMTString() + '] Automatic upgrade seems to be completed, wait 1:00:00.';
			this.message = '[' + new Date().toMTString() + '] 村莊已經普十, 等待 1:00:00.';
			mtSetTimeout(this, this._recheck, ++this.async_seq, 1 * 60 * 60 * 1000);
			this.schedule.updateTask(this.objId);
		}
		return;
	}
	
	b = target[res];
	
	b.queryInfo(0, this, this._check, [++this.async_seq, b]);
	this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b.getType()];
	this.schedule.updateTask(this.objId);
}

mtCTaskAutomaticUpgrade.prototype._recheck1 = function(t) {	// check warehouse
	var	i, idx;
	var	town;
	var	b;
	var	type;
	
	mtDev("6313 mtCTaskAutomaticUpgrade._recheck1");
	
	town = this.schedule.getTown();
	for(i = 0; i < 3; i++) {
		if(town.getResource(i) + town.getProducibility(i) * t >= town.getCapacity(i))
			break;
	}
	if(i == 3)	// do not need warehouse
		return this._recheck2(t);
		
	b = town.getBuildings(MTB_WAREHOUSE);
	if(b.length > 0) {
		idx = null;
		for(i = 0; i < b.length; i++) {
			if(b[i].getLevel() < 20) {
				idx = i;
				break;
			}
		}
		if(idx == null)	// all existing warehouse is LV20, we do not build a new one
			return this._recheck2(t);
		//b[idx].queryInfo(0, this, this._check1, [++this.async_seq, b[idx], t]);
		b[idx].queryInfo(0, this, this._check_building, [++this.async_seq, b[idx], t, MTB_WAREHOUSE]);
		//_check_building
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[idx].getType()];
		this.schedule.updateTask(this.objId);
		return true;
	} else {	// No warehouse existing, build a new one
		b = town.getBuildings(MTB_EMPTY);
		if(b.length == 0) {	// No place to build
			return this._recheck2();
		}
		//b[0].queryInfo(0, this, this._check1, [++this.async_seq, b[0], t]);
		b[0].queryInfo(0, this, this._check_building, [++this.async_seq, b[0], t, MTB_WAREHOUSE]);
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[0].getType()];
		this.schedule.updateTask(this.objId);
		return true;
	}
	return false;
}

mtCTaskAutomaticUpgrade.prototype._recheck2 = function(t) {	// check granary
	var	i, idx;
	var	town;
	var	b;
	var	type;
	
	mtDev("6357 mtCTaskAutomaticUpgrade._recheck2");
	
	town = this.schedule.getTown();
	if(town.getResource(3) + town.getProducibility(3) * t < town.getCapacity(3))	// do not need granary
		return this._recheck3(t);
		
	b = town.getBuildings(MTB_GRANARY);
	if(b.length > 0) {
		idx = null;
		for(i = 0; i < b.length; i++) {
			if(b[i].getLevel() < 20) {
				idx = i;
				break;
			}
		}
		if(idx == null)	// all existing warehouse is LV20, we do not build a new one
			return this._recheck3(t);
		//b[idx].queryInfo(0, this, this._check2, [++this.async_seq, b[idx], t]);
		b[idx].queryInfo(0, this, this._check_building, [++this.async_seq, b[idx], t, MTB_GRANARY]);
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[idx].getType()];
		this.schedule.updateTask(this.objId);
		return true;
	} else {	// No warehouse existing, build a new one
		b = town.getBuildings(MTB_EMPTY);
		if(b.length == 0) {	// No place to build
			return this._recheck3(t);
		}
		//b[0].queryInfo(0, this, this._check2, [++this.async_seq, b[0], t]);
		b[0].queryInfo(0, this, this._check_building, [++this.async_seq, b[0], t, MTB_GRANARY]);
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[0].getType()];
		this.schedule.updateTask(this.objId);
		return true;
	}
	return false;
}

mtCTaskAutomaticUpgrade.prototype._recheck3 = function(t) {	// check cranny
	mtDev("6392 mtCTaskAutomaticUpgrade._recheck3");

	var	i, idx;
	var	town;
	var	b,c;
	var	type;
	
	town = this.schedule.getTown();
	if(this.config.maxCranny == 0)
	{
		mtDev("8045");
	return this._recheck4(t);
	}
	else
	{
		mtDev("8050");
			b = town.getBuildings(MTB_CRANNY);
			if(b.length > 0 && b.length<this.config.maxCranny ) 
			{
				idx = null;
				for(i = 0; i < b.length; i++) 
				{
					if(b[i].getLevel() < 10) 
					{
						idx = i;
						break;
					}
				}
				
						if(idx == null)	// all existing cranny is lv 10, we do not build a new one
							return this._recheck4(4);

						b[idx].queryInfo(0, this, this._check_building, [++this.async_seq, b[idx], t, MTB_CRANNY]);						
						this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[idx].getType()];
						this.schedule.updateTask(this.objId);															
				
						return true;				
			}
			else	//no existed cranny
			{
				b = town.getBuildings(MTB_EMPTY);
				if(b.length == 0) {	// No place to build
					return false;
				}
				//b[0].queryInfo(0, this, this._check2, [++this.async_seq, b[0], t]);		
				b[0].queryInfo(0, this, this._check_building, [++this.async_seq, b[0], t, MTB_CRANNY]);		
				this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[0].getType()];
				this.schedule.updateTask(this.objId);
				return true;				
			}
			
	}
	return false;
}

mtCTaskAutomaticUpgrade.prototype._recheck4 = function(t) {	// check cranny
	mtDev("8088 mtCTaskAutomaticUpgrade._recheck4");

	var	i,j, idx;
	var	town;
	var	b,c,d;
	var	type;
	
	town = this.schedule.getTown();
	for(i= MTB_SAWMILL; i<=	MTB_BAKERY; i++)
	{
		if(this.config.autoBuilding[i-MTB_SAWMILL] == true)
		{
			b = town.getBuildings(i);
			if(b.length>0)
			{
				if(b[0].getLevel()<5)
				{
						b[0].queryInfo(0, this, this._check_building, [++this.async_seq, b[idx], t, i]);						
						this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[b[0].getType()];
						this.schedule.updateTask(this.objId);
				}
			}//end of existed building
			else// build a new one.
			{
				//	MTB_SAWMILL			= 5,
				//	MTB_BRICKYARD			= 6,
				//	MTB_IRON_FOUNDARY		= 7,
				//	MTB_GRAIN_MILL			= 8,
				//	MTB_BAKERY			= 9,
				idx = null;
				if(i>=MTB_SAWMILL && i<=MTB_IRON_FOUNDARY)
				{
					c = town.getBuildings(i-MTB_SALMILL+1);		
					
					for(j=0;j<c.length;c++)
					{
						if(c[j].getLevel() == 10)
						{
							idx = j;	
						}
					}
				}
				else if(i==MTB_GRAIN_MILL)
				{
					c = town.getBuildings(MTB_CROPLAND);						
					for(j=0;j<c.length;c++)
					{
						if(c[j].getLevel() >= 5)
						{
							idx = j;	
						}
					}					
				}
				else if(i==MTB_BAKERY)
				{
					c = town.getBuildings(MTB_CROPLAND);							
					for(j=0;j<c.length;c++)
					{
						if(c[j].getLevel() == 10)
						{
							idx = j;	
						}
					}
				}
				
					if(idx!=null)
					{
							d = town.getBuildings(MTB_EMPTY);
							if(d.length > 0) 
							{				
								d[0].queryInfo(0, this, this._check_building, [++this.async_seq, b[0], t, i]);		
								this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[d[0].getType()];
								this.schedule.updateTask(this.objId);
							}
					}
				
			}//end of build a new one	
		}//end of each type true/false		
	}//end of building type loop
	return false;
}


mtCTaskAutomaticUpgrade.prototype._check = function(info, options) {
	var	i, idx;
	var	url;
	var	target;
	var	town;
	var	b;
	var	t, mt;
	
	//mtTrace("mtCTaskAutomaticUpgrade::_check()");
	
	if(options[0] != this.async_seq)
		return;
		
	b = options[1];
	
	town = this.schedule.getTown();
	if(info.upgrade == null) {
		//this.message = '<span style="color: red;">' + info.upgradeReason + ', wait 0:03:00.<span>';
		this.message = '<span style="color: red;">' + info.upgradeReason + ', 等待 0:03:00.<span>';
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	
	mt = 0;
	for(i = 0; i < 4; i++) {
		if(town.getResource(i) < info.upgrade.cost[i]) {
			t = (info.upgrade.cost[i] - town.getResource(i)) / town.getProducibility(i);
			if(mt < t)
				mt = t;
		}
	}
	if(mt > 0) {
		if(this._recheck1(mt) == false) {
			//this.message = '<span style="color: orange;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00. </span>';
			this.message = '<span style="color: orange;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00. </span>';
			mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
			this.schedule.updateTask(this.objId);
		}
		return;
	}
	
	if(info.upgrade.href == null) {
		//this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', wait 0:03:00.</span>';
		this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', 等待 0:03:00.</span>';
		mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	
	url = info.upgrade.href;
	url += "&newdid=" + town.getId();
	
	mtLog('[' + town.getName() + ']' +
		'Upgrade #' + (b.getId()) + '(' + mtBuildingName[b.getType()] + ' LV' + b.getLevel() + ')');
	//this.message = '[' + new Date().toMTString() + '] Execute upgrading';
	this.message = '[' + new Date().toMTString() + '] 建築升級中';
	this.schedule.updateTask(this.objId);
	mtOOGet(url, this, this._postUpgrade, [++this.async_seq, b.getType()]);
}

mtCTaskAutomaticUpgrade.prototype._check1 = function(info, options) {	// for warehouse
	var	b;
	var	i, idx;
	var	town;
	var	t;
	

	mtDev("mtCTaskAutomaticUpgrade._check1 6460");
	
	if(options[0] != this.async_seq)
		return;
		
	b = options[1];
	t = options[2];
	town = this.schedule.getTown();
	if(b.getType() == MTB_EMPTY) {
		idx = null;
		for(i = 0; i < info.build.length; i++) {
			if(info.build[i].id == MTB_WAREHOUSE) {
				idx = i;
				break;
			}
		}
		if(idx == null) {
			if(this._recheck2(t) == false) {
				//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to build ' + mtBuildingName[MTB_WAREHOUSE] + ', wait 0:03:00.</span>';
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 無法建造' + mtBuildingName[MTB_WAREHOUSE] + ', 等待 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
				return;
			}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.build[idx].cost[i]) {
				if(this._recheck2(t) == false) {
					//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00.</span>';
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				}
				return;
			}
		}
		
		if(info.build[idx].href == null) {
			if(this._recheck2(t) == false) {
				//this.message = '[' + new Date().toMTString() + '] ' + info.build[idx].reason + ', wait 0:03:00.';
				this.message = '[' + new Date().toMTString() + '] ' + info.build[idx].reason + ', 等待 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		url = info.build[idx].href;
	} else {
		if(info.upgrade == null) {
			if(this._recheck2(t) == false) {
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] ' + info.upgradeReason + ', wait 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.upgrade.cost[i]) {
				if(this._recheck2(t) == false) {
					//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00.</span>';
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				}
				return;
			}
		}
		
		if(info.upgrade.href == null) {
			if(this._recheck2(t) == false) {
				//this.message = '[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', wait 0:03:00.';
				this.message = '[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', 等待 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		url = info.upgrade.href;
	}
	url += "&newdid=" + town.getId();
	
	mtLog('[' + town.getName() + ']' +
		'Upgrade #' + (b.getId()) + '(' + mtBuildingName[b.getType()] + ' LV' + b.getLevel() + ')');
	//this.message = '[' + new Date().toMTString() + '] Execute upgrading';
	this.message = '[' + new Date().toMTString() + '] 建築升級中';
	this.schedule.updateTask(this.objId);
	mtOOGet(url, this, this._postUpgrade, [++this.async_seq, b.getType()]);
}

mtCTaskAutomaticUpgrade.prototype._check2 = function(info, options) {	// for granary
	var	b;
	var	i, idx;
	var	town;
	var	t;
	
	mtDev("mtCTaskAutomaticUpgrade_check2() 6556");
	
	if(options[0] != this.async_seq)
		return;
		
	b = options[1];
	t = options[2];
	town = this.schedule.getTown();
	if(b.getType() == MTB_EMPTY) {
		idx = null;
		for(i = 0; i < info.build.length; i++) {
			if(info.build[i].id == MTB_GRANARY) {
				idx = i;
				break;
			}
		}
		if(idx == null) {
			if(this._recheck3(t) == false) {
				//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to build ' + mtBuildingName[MTB_GRANARY] + ', wait 0:03:00.</span>';
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 無法建造' + mtBuildingName[MTB_GRANARY] + ', wait 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
				return;
			}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.build[idx].cost[i]) {
				if(this._recheck3(t) == false) {
					//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00.</span>';
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, wait 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				}
				return;
			}
		}
		
		if(info.build[idx].href == null) {
			if(this._recheck3(t) == false) {
				this.message = '[' + new Date().toMTString() + '] ' + info.build[idx].reason + ', wait 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		url = info.build[idx].href;
	} else {
		if(info.upgrade == null) {
			if(this._recheck3(t) == false) {
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] ' + info.upgradeReason + ', wait 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.upgrade.cost[i]) {
				if(this._recheck3(t) == false) {
					//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Resource is not enough to upgrade, wait 0:03:00.</span>';
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				}
				return;
			}
		}
		
		if(info.upgrade.href == null) {
			if(this._recheck3(t) == false) {
				this.message = '[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', wait 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		url = info.upgrade.href;
	}
	url += "&newdid=" + town.getId();
	
	mtLog('[' + town.getName() + ']' +
		'Upgrade #' + (b.getId()) + '(' + mtBuildingName[b.getType()] + ' LV' + b.getLevel() + ')');
	//this.message = '[' + new Date().toMTString() + '] Execute upgrading';
	this.message = '[' + new Date().toMTString() + '] 建築升級中';
	this.schedule.updateTask(this.objId);
	mtOOGet(url, this, this._postUpgrade, [++this.async_seq, b.getType()]);
}


mtCTaskAutomaticUpgrade.prototype._check_building = function(info, options) {
	var	b;
	var	i, idx;
	var	town;
	var	t;
	var s;
	
	mtDev("mtCTaskAutomaticUpgrade_check2() 6556");
	
	if(options[0] != this.async_seq)
		return;
		
	b = options[1];
	t = options[2];
	s = options[3];
	town = this.schedule.getTown();
	if(b.getType() == MTB_EMPTY) {
		idx = null;
		for(i = 0; i < info.build.length; i++) {
			if(info.build[i].id == s) {
				idx = i;
				break;
			}
		}
		if(idx == null) {
		//	if(this._recheck3(t) == false) {				
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 無法建造' + mtBuildingName[s] + ', wait 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
		//		return;
		//	}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.build[idx].cost[i]) {
				//if(this._recheck3(t) == false) {
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, wait 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				//}
				return;
			}
		}
		
		if(info.build[idx].href == null) {
			//if(this._recheck3(t) == false) {
				this.message = '[' + new Date().toMTString() + '] ' + info.build[idx].reason + ', wait 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			//}
			return;
		}
		
		url = info.build[idx].href;
	} else {
		if(info.upgrade == null) {
			if(this._recheck3(t) == false) {
				this.message = '<span style="color: red;">[' + new Date().toMTString() + '] ' + info.upgradeReason + ', wait 0:03:00.</span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq,
					3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			}
			return;
		}
		
		for(i = 0; i < 4; i++) {
			if(town.getResource(i) < info.upgrade.cost[i]) {
				if(this._recheck3(t) == false) {
					this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 資源不足, 等待 0:03:00.</span>';
					mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
					this.schedule.updateTask(this.objId);
				}
				return;
			}
		}
		
		if(info.upgrade.href == null) {
			//if(this._recheck3(t) == false) {
				this.message = '[' + new Date().toMTString() + '] ' + info.upgrade.reason + ', wait 0:03:00.';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 3 * 60 * 1000);
				this.schedule.updateTask(this.objId);
			//}
			return;
		}
		
		url = info.upgrade.href;
	}
	url += "&newdid=" + town.getId();
	
	mtLog('[' + town.getName() + ']' +
		'Upgrade #' + (b.getId()) + '(' + mtBuildingName[b.getType()] + ' LV' + b.getLevel() + ')');
	this.message = '[' + new Date().toMTString() + '] 建築升級中';
	this.schedule.updateTask(this.objId);
	mtOOGet(url, this, this._postUpgrade, [++this.async_seq, b.getType()]);
}

mtCTaskAutomaticUpgrade.prototype._postUpgrade = function(req, options) {
	mtParseGlobal(req);
	
	mtDev("mtCTaskAutomaticUpgrade._postUpgrade 6649");
	
	if(options[0] != this.async_seq)
		return;
	
	this.message += ", wait for town idle.";
	this.schedule.updateTask(this.objId);
	this.schedule.getTown().addIdleListener(this, this._recheck, ++this.async_seq);
	if(options[1] >= MTB_SAWMILL)	// is city building
		this.schedule.getTown().refreshCity();
	else
		this.schedule.getTown().refreshTown();
}
/* ==== class mtCTaskAutomaticUpgrade ==== */


/* ==== class mtCTaskArmySender ==== */
function mtCTaskArmySender(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = null;
}

mtCTaskArmySender.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskArmySender.prototype.loadConfig = function(config) {
	var	type;
	var	cf, cf_this, army;
	var	i, j;
	var	troop;
	
	mtDev("7591 mtCTaskArmySender.loadConfig");
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);

	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	if(config.length >= 3) {
		cf = new Object();		
		//cf.activeTime = parseInt(config[2]);
		cf.lastSendArmyTime = parseInt(config[2]);
		cf.repeats = parseInt(config[3]);		
		cf.atkSeq = parseInt(config[4]);
		cf.atkLowerBound = config[5];
		cf.army = new Array();
		
		//if(isNaN(cf.activeTime))
		//	cf.activeTime = null;
		
		
		
		for(i = 6; i < config.length; i ++) {
			
			army = new Object();
			troop = unescape(config[i]).split(",");			
			army.troop = new Object();
			for(j = 1; j < 22; j += 2) {
				army.troop[troop[j - 1]] = troop[j];
			}
			army.delay = parseInt(troop[22]);
			if(isNaN(army.delay))
				army.delay = null;
			army.c = troop[23];
			army.x = parseInt(troop[24]);
			army.y = parseInt(troop[25]);
			army.kata = troop[26];
			army.kata2 = troop[27];
			army.spy = troop[28];
			cf.army.push(army);
		}
		this.config = cf;
		
	}
	
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskArmySender.prototype.saveConfig = function() {
	//mtDev("7751 mtCTaskArmySender.prototype.saveConfig");
	this.schedule.saveConfig();
}

mtCTaskArmySender.prototype.getConfig = function() {
	var	config, army;
	var	i, key;
	
	config = escape(this.taskType);
	//mtDev("7759 config = " + config );
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += ",";
	if(this.config.activeTime != null)
		config += escape(this.config.lastSendArmyTime);
		config += "," + escape(this.config.repeats);
		config += "," + escape(this.config.atkSeq);
		config += "," + escape(this.config.atkLowerBound);

	for(i = 0; i < this.config.army.length; i++) {
		army = "";
		for(key in this.config.army[i].troop) {
			if(army != "")
				army += ",";
			army += key + "," + this.config.army[i].troop[key];
		}
		army = army;
		army += ",";
		if(this.config.army[i].delay != null)
			army += this.config.army[i].delay;
		army += "," + this.config.army[i].c;
		army += "," + this.config.army[i].x;
		army += "," + this.config.army[i].y;
		army += "," + this.config.army[i].kata;
		army += "," + this.config.army[i].kata2;
		army += "," + this.config.army[i].spy;
		
		config += "," + escape(army);
	}
	//mtDev("8016 config army = " + config );
	return config;
}

mtCTaskArmySender.prototype.getTitle = function() {
	var	title;
	var	i;
	
	title = "Send army";
	if(this.config != null) {
		title += "(" + (this.config.atkSeq+1) +"/" + this.config.army.length + ")";
		if(this.config.repeat > 0 ) title += "<br><font color=blue>repeat = " + this.config.repeat ;
//		if(this.config.repeat ==0) title += "<br><font color=green>repeat = ∞</font>";
		if(this.config.repeat == 0 ) title += "<br><font color=RED>Stopped</font>";
	}
	return title;
}

mtCTaskArmySender.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskArmySender.prototype.canRun = function() {
	if(this.config == null)
		return false;
	if(this.config.army.length <= 0)
		return false;
	return true;
}

mtCTaskArmySender.prototype.setup = function(pos) {
	var	div;
	var	tmp;
	var	tr, td;
	var	i, j;
	var	b;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		tmp = document.createElement("span");
		tmp.textContent = "Scheduling send:";
		div.appendChild(tmp);
		div.appendChild(document.createElement("br")); 
		
		tmp = document.createElement("img");
		tmp.src = "img/un/a/clock.gif";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 20;
		tmp.disabled = true;
		div.appendChild(tmp);
		this.vActiveTime = tmp;
		
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("table");
		this.vArmyTable = tmp;
		div.appendChild(tmp);
		
		tr = tmp.insertRow(-1);
		for(i = 0; i < 10; i++)
		{
			td = tr.insertCell(-1);
			td.innerHTML = '<img class="unit u'+(i + mtUserRace*10 + 1 )+'" src="img/x.gif"/>'
			//td.textContent = "#";
		}
		td = tr.insertCell(-1);
		td.innerHTML = '<img class="unit uhero" src="img/x.gif"/>';
		td = tr.insertCell(-1);
		td.innerHTML = '<img src="img/un/a/clock.gif"/>';
		td = tr.insertCell(-1);
		td = tr.insertCell(-1);
		td.textContent = "X";
		td = tr.insertCell(-1);
		td.textContent = "Y";
		td = tr.insertCell(-1);
		td.textContent = "投石";
		td = tr.insertCell(-1);
		td.textContent = "雙擊";
		td = tr.insertCell(-1);
		td.textContent = "偵查";
		
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "<img src='" + MTI_ADD + "'/>";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.setupNewArmy(-1);
		}, false);
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
		div.appendChild(document.createElement("br"));
		tmp = document.createElement("span");
		tmp.textContent = "Auto-generating schedule:";
		div.appendChild(tmp);
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("table");
		this.vAutoArmyTable = tmp;
		div.appendChild(tmp);
		
		tr = tmp.insertRow(-1);
		for(i = 0; i < 10; i++)
		{
			td = tr.insertCell(-1);
			td.innerHTML = '<img class="unit u'+(i + mtUserRace*10 + 1 )+'" src="img/x.gif"/><br/><input type="text" class="fm" size="2"/>';
		}
		td = tr.insertCell(-1);	// [0][10]
		td.innerHTML = '<img class="unit uhero" src="img/x.gif"/><br/><input type="text" class="fm" size="2"/>';
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [1][0]
		td.colSpan = 3;		
		td.innerHTML = '派兵種類<br><select><option value="2">Reenforce</option><option value="3">Attack</option><option value="4">Raid</option></select>';
		td = tr.insertCell(-1);	// [1][1]
		td.colSpan = 8;
		td.rowSpan = 2;
		td.innerHTML = '目標(ex: 0|0,1|1,400|400 )<br><textarea class="fm" rows="2" cols="40">x1|y1,x2|y2...</textarea>';
		
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	
		
		td.innerHTML = '*重複';
		td = tr.insertCell(-1);// [2][1]
		td.innerHTML = '<input type="text" class="fm" size="2" value="1" />';
		td.colSpan = 2;
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [3][0]
		td.colSpan = 4; 
		td.innerHTML = '<img src="img/un/a/clock.gif"/>間隔(時)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [3][1]
		td.colSpan = 3; 
		td.innerHTML = '(分)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [3][2]
		td.colSpan = 3; 
		td.innerHTML = '(秒)<input type="text" class="fm" size="2"/>';

		td = tr.insertCell(-1);	

		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [4][0]
		td.colSpan = 4; 
		td.innerHTML = '<img src="img/un/a/clock.gif"/>首發 (時)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [4][1]
		td.colSpan = 3; 
		td.innerHTML = '(分)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [4][2]
		td.colSpan = 3; 
		td.innerHTML = '(秒)<input type="text" class="fm" size="2"/>';
		

		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);
		td.innerHTML = '自動調整間隔';
		td.colSpan = 4;
		td = tr.insertCell(-1);//[5][1]
		td.innerHTML = '<input type="checkbox">'
		td = tr.insertCell(-1);//[5][2]
		td.innerHTML = '保險兵力%';
		td.colSpan=2;
		td = tr.insertCell(-1);//[5][3]
		td.innerHTML = '<select><option value="0.9">90%</option><option value="0.8">80%</option><option value="0.7">70%</option><option value="0.6">60%</option></select>'


		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);
		td.innerHTML = '投石車';
		td.colSpan = 4;
		var kata = '<select name="kata"><option value="99">隨機</option>';
		for(i=1;i<=41;i++)
		{		
			kata += '<option value="'+i+'">'+mtBuildingName[i]+'';
			}
		kata += '</select>';
		td.innerHTML += kata;

		td = tr.insertCell(-1);
		td.innerHTML = '雙擊'		
		td.colSpan = 3;
		var kata2 = '<select name="kata2"><option value="99">隨機</option>';
		for(i=1;i<=41;i++)
		{		
			kata2 += '<option value="'+i+'">'+mtBuildingName[i]+'';
			}
		kata2 += '</select>';
		td.innerHTML += kata2;
	
		td = tr.insertCell(-1);
		td.innerHTML = '偵查'
		td.colSpan = 3;		
		td.innerHTML += '<select name="spy"><option value="1">資源和軍隊</option><option value="2">防禦設施和軍隊</option>';
	
	
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);
		td.colSpan = 11;
		td.innerHTML = '<hr />ex：  目標=0|0,1|1   *多波攻勢=2 <br><img src="img/un/a/clock.gif"/> 間隔 0:40:00"00 <font color=blue>總共會產生4波攻擊，每次間隔40分鐘</font>';
		td.innerHTML = td.innerHTML + '<br /><img src="img/un/a/clock.gif"/>  <font color="brown">首發設為 1:00:00，則會等待1小時後，開始發出4波攻擊</font>';
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[GENERATE]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.generateSchedule();
		}, false);
		div.appendChild(tmp);
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	while(this.vArmyTable.rows.length > 1)
		this.vArmyTable.deleteRow(1);
	if(this.config != null) {
		for(i = 0; i < this.config.army.length; i++) {
			tr = this.setupNewArmy(-1);
			for(j = 0; j < 11; j++) {
				if(this.config.army[i].troop["t" + (j + 1)] == null)
					tr.cells[j].lastChild.value = "";
				else
					tr.cells[j].lastChild.value = this.config.army[i].troop["t" + (j + 1)];
			}
			if(this.config.army[i].delay == null)
				tr.cells[11].lastChild.value = "";
			else
				tr.cells[11].lastChild.value = this.config.army[i].delay;
			tr.cells[12].lastChild.value = this.config.army[i].c;
			tr.cells[13].lastChild.value = this.config.army[i].x;
			tr.cells[14].lastChild.value = this.config.army[i].y;
			tr.cells[15].lastChild.value = this.config.army[i].kata;
			tr.cells[16].lastChild.value = this.config.army[i].kata2;
			tr.cells[17].lastChild.value = this.config.army[i].spy;
			//this.vAutoArmyTable.rows[1].cells[1].lastChild.value += this.config.army[i].x;
			//this.vAutoArmyTable.rows[1].cells[1].lastChild.value += "|";
			//this.vAutoArmyTable.rows[1].cells[1].lastChild.value += this.config.army[i].y;
			//this.vAutoArmyTable.rows[1].cells[1].lastChild.value += ",";
		}
		this.vAutoArmyTable.rows[2].cells[1].lastChild.value = this.config.repeat;		
	}	
	
	mtOOGet("a2b.php?newdid=" + this.schedule.getTown().getId(),
		this, this._setup1, "a2b.php?newdid=" + this.schedule.getTown().getId());
}

mtCTaskArmySender.prototype.applySetup = function(pos) {
	var	config;
	var	army;
	var	i, j;
	
	config = new Object();

  	config.lastSendArmyTime = 0;
	config.repeat = parseInt(this.vAutoArmyTable.rows[2].cells[1].lastChild.value);
	config.atkSeq = 0;
	config.atkLowerBound = this.vAutoArmyTable.rows[5].cells[3].lastChild.value;

	config.army = new Array();
	for(i = 1; i < this.vArmyTable.rows.length; i++) {
		army = new Object();
		army.troop = new Object();
		for(j = 0; j < 11; j++) {
			army.troop["t" + (j + 1)] = this.vArmyTable.rows[i].cells[j].lastChild.value;
		}
		if(this.vArmyTable.rows[i].cells[11].lastChild.value == "")
			army.delay = null;
		else {		
			if(this.vArmyTable.rows[i].cells[11].lastChild.value != "auto" )
			{
				army.delay = parseInt(this.vArmyTable.rows[i].cells[11].lastChild.value); 
				if(isNaN(army.delay)) {
					alert("Invalid configuration.");
					return;
				}
			}
			else
				army.delay = "auto";
						
		}
		army.c = this.vArmyTable.rows[i].cells[12].lastChild.value;
		army.x = parseInt(this.vArmyTable.rows[i].cells[13].lastChild.value);
		army.y = parseInt(this.vArmyTable.rows[i].cells[14].lastChild.value);
		if(isNaN(army.x) || isNaN(army.y)) {
			alert("Invalid target coordinate.");
			return;
		}
		army.kata  = this.vArmyTable.rows[i].cells[15].lastChild.value;
		army.kata2 = this.vArmyTable.rows[i].cells[16].lastChild.value;
		army.spy   = this.vArmyTable.rows[i].cells[17].lastChild.value;
		config.army.push(army);
	}
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskArmySender.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskArmySender.prototype.setupNewArmy = function(iRow) {
	var	tr, td;
	var	tmp;
	var	i;
	
	tr = this.vArmyTable.insertRow(iRow);
	
	var kata = '<select name="kata"><option value="99">隨機</option>';
	for(i=1;i<=41;i++)
	{		
		kata += '<option value="'+i+'">'+mtBuildingName[i]+'';
	}
	kata += '</select>';
	var kata2 = '<select name="kata2"><option value="99">隨機</option>';
	for(i=1;i<=41;i++)
	{		
		kata2 += '<option value="'+i+'">'+mtBuildingName[i]+'';
	}
	kata2 += '</select>';
	
	for(i = 0; i < 11; i++) {
		td = tr.insertCell(-1);
		td.innerHTML = '<input type="text" size="2" class="fm"/>';
	}
	td = tr.insertCell(-1);
	td.innerHTML = '<input type="text" size="2" class="fm"/>';
	td = tr.insertCell(-1);
	td.innerHTML = '<select><option value="2">Reenforce</option><option value="3">Attack</option><option value="4">Raid</option></select>';
	td = tr.insertCell(-1);
	td.innerHTML = '<input type="text" size="2" class="fm"/>';
	td = tr.insertCell(-1);
	td.innerHTML = '<input type="text" size="2" class="fm"/>';

	td = tr.insertCell(-1);
	td.innerHTML = kata;
	td = tr.insertCell(-1);
	td.innerHTML = kata2;
	td = tr.insertCell(-1);
	td.innerHTML += '<select name="spy"><option value="1">資源和軍隊</option><option value="2">防禦設施和軍隊</option>';
	
	td = tr.insertCell(-1);
	td.noWrap = true;
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.innerHTML = "<img src='" + MTI_DELETE + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	tr;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		tr.parentNode.removeChild(tr);
	}, false);
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.innerHTML = "<img src='" + MTI_UP + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	tr;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		
		if(tr.rowIndex > 1) {	// 0 is title
			tr.parentNode.insertBefore(tr, tr.previousSibling);
		}
	}, false);
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.innerHTML = "<img src='" + MTI_DOWN + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	tr;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		
		if(tr.nextSibling != null) {
			tr.parentNode.insertBefore(tr.nextSibling, tr);
		}
	}, false);
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.innerHTML = "<img src='" + MTI_COPY + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	obj;
		var	tr, n;
		var	i;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		
		obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
		obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
		obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
		
		n = obj.setupNewArmy(tr.rowIndex + 1);
		for(i = 0; i < 15; i++) {
			n.cells[i].lastChild.value = tr.cells[i].lastChild.value;			
		}
	}, false);
	return tr;
}

mtCTaskArmySender.prototype.generateSchedule = function() {
	var	tr;
	var	n, repeat, i, j, x, y;
	var	targets;
	var	delay_h, delay_m, delay_s, delay_ms;	
	var	delay, fisrt_delay;
	var	delay_auto;
	
	while(this.vArmyTable.rows.length > 1)
		this.vArmyTable.deleteRow(1);

	delay_h  = parseInt(this.vAutoArmyTable.rows[3].cells[0].lastChild.value);
	if(isNaN(delay_h) || delay_h <0) delay_h = 0;
	delay_m  = parseInt(this.vAutoArmyTable.rows[3].cells[1].lastChild.value);
	if(isNaN(delay_m) || delay_m <0) delay_m = 0;
	delay_s  = parseInt(this.vAutoArmyTable.rows[3].cells[2].lastChild.value);
	if(isNaN(delay_s) || delay_s <0) delay_s = 0;
	delay = ((delay_h*60 + delay_m)*60 +delay_s)*1000 ;
	if(delay == 0) dealy = 10; //every wave delay 10ms
	
	delay_auto = this.vAutoArmyTable.rows[5].cells[1].lastChild.checked;
	//mtDev("7711 delay_auto = " + delay_auto);
	//if(delay_auto == true) mtDev("Army Sender Auto Delay Triggered!");
	
	delay_h  = parseInt(this.vAutoArmyTable.rows[4].cells[0].lastChild.value);
	if(isNaN(delay_h) || delay_h <0) delay_h = 0;
	delay_m  = parseInt(this.vAutoArmyTable.rows[4].cells[1].lastChild.value);
	if(isNaN(delay_m) || delay_m <0) delay_m = 0;
	delay_s  = parseInt(this.vAutoArmyTable.rows[4].cells[2].lastChild.value);
	if(isNaN(delay_s) || delay_s <0) delay_s = 0;
	fisrt_delay = ((delay_h*60 + delay_m)*60 +delay_s)*1000 ;
	if(fisrt_delay == 0) fisrt_delay = 10; //every wave delay 10ms
	//mtLog("8029 First Delay = " + fisrt_delay + " ms ");

	repeat = parseInt(this.vAutoArmyTable.rows[2].cells[1].lastChild.value);
	
	if(isNaN(repeat) || repeat <= 0) repeat=1;//set default value =1;
		
	targets = this.vAutoArmyTable.rows[1].cells[1].lastChild.value.match(/-?\d+\|-?\d+/g);
	
	if(targets == null)
		return;
	

	for(i = 0; i < targets.length; i++) {
		x = targets[i].match(/(-?\d+)\|(-?\d+)/);
		y = x[2];
		x = x[1];
			tr = this.setupNewArmy(-1);
			for(j = 0; j < 11; j++) {
				tr.cells[j].lastChild.value = this.vAutoArmyTable.rows[0].cells[j].lastChild.value;
			}
			tr.cells[11].lastChild.value = delay;	
			if(delay_auto == true && i>0) tr.cells[11].lastChild.value = "auto";
			if(i==0) tr.cells[11].lastChild.value = fisrt_delay;
			tr.cells[12].lastChild.value = this.vAutoArmyTable.rows[1].cells[0].lastChild.value;
			tr.cells[13].lastChild.value = x;
			tr.cells[14].lastChild.value = y;
			tr.cells[15].lastChild.value = this.vAutoArmyTable.rows[6].cells[0].lastChild.value;
			tr.cells[16].lastChild.value = this.vAutoArmyTable.rows[6].cells[1].lastChild.value;
			tr.cells[17].lastChild.value = this.vAutoArmyTable.rows[6].cells[2].lastChild.value;
		}
}

mtCTaskArmySender.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;	  
	this.saveConfig();	
	//if(this.config.repeat==0) this.config.repeat=0
	
	this._recheck(++this.async_seq);
}

mtCTaskArmySender.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskArmySender.prototype.isRunning = function() {
	return this.running;
}

mtCTaskArmySender.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskArmySender.prototype._initVisual = function() {	
	this.vSetupBox.style.display = "";
}

mtCTaskArmySender.prototype._setup1 = function(req, options) {
	var	html;
	var	i, t;
	var	tmp1, tmp2;
	
	mtDev("8085 mtCTaskArmySender._setup1");
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected(options + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected(options + " : " + e);
		return;
	}
	
	mtParseGlobal(req);
	
	if(!this.schedule.getTown().checkTownPage(html)) {
		mtOOGet(options,
			this, this._setup1, options);
		return;
	}
	
	this.vSetupBox.style.display = "";
	
	tmp1 = html.match(/<img class="unit" src=".*?" title=".*?".*?><\/td><td width="35"><input class="fm" type="Text" name="t(\d+)"/g);
	if(tmp1 != null) {
		for(i = 0; i < tmp1.length; i++) {
			tmp2 = tmp1[i].match(/<img class="unit" src="(.*?)" title="(.*?)".*?><\/td><td width="35"><input class="fm" type="Text" name="t(\d+)"/);
			t = parseInt(tmp2[3]);
			if(t >= 1 && t <= 11) {
				this.vArmyTable.rows[0].cells[t - 1].innerHTML = 
					'<img class="unit" src="' + tmp2[1] + '" title="' + tmp2[2] + '"/>';
				this.vAutoArmyTable.rows[0].cells[t - 1].firstChild.src = tmp2[1];
				this.vAutoArmyTable.rows[0].cells[t - 1].firstChild.title = tmp2[2];
			}
		}
	}
}

mtCTaskArmySender.prototype._recheck = function(options) {
	var t = new Date().getTime();
	var u ;
	
	if(options != this.async_seq)
		return;

	if(this.config.repeat == null) this.config.repeat =0 ;

	
	if(this.config.repeat <= 0 )
	{
		this.stop();
		return;	
	}
	
	
	u = t - this.config.lastSendArmyTime;

	if(this.config.atkSeq==null || this.config.atkSeq<0 || this.config.atkSeq>=this.config.army.length) this.config.atkSeq=0;
	

	
	if(u<=0 || u > this.config.army[this.config.atkSeq].delay || this.config.lastSendArmyTime==0)
	{
			this._execute(++this.async_seq);
	}
	else
	{
			mtSetTimeout(this, this._execute, ++this.async_seq, this.config.army[this.config.atkSeq].delay);	
	}		
}

mtCTaskArmySender.prototype._execute = function(options) {
	if(options != this.async_seq)
		return;
		mtDev("8874");

	if(this.config.army.length <= 0) {
		this.stop();
		return;
	}
	mtDev("8880");
	if(this.config.army[this.config.atkSeq].delay == null  || this.config.lastSendArmyTime==0)
	{
		this._pre_send(++this.async_seq);
	}
	else 
	{
		this.message = "等待 " + (this.config.army[this.config.atkSeq].delay/1000) + " 秒";
		this.schedule.updateTask(this.objId);
	//	mtSetTimeout(this, this._send, ++this.async_seq, this.config.army[this.config.atkSeq].delay);
		mtSetTimeout(this, this._pre_send, ++this.async_seq, this.config.army[this.config.atkSeq].delay);
	}
}

mtCTaskArmySender.prototype._pre_send = function(options) {
	mtDev("8189 mtCTaskArmySender._pre_send");
	
	if(options != this.async_seq)
		return;
	
	mtOOGet("a2b.php?newdid=" + this.townId,this, this._send,	++this.async_seq);
}


mtCTaskArmySender.prototype._send = function(req,options) {
	  var	data;
	  var	key;
	  var html;
		var tmp;
		var timestamp, timestamp_checksum;
		
		mtDev("8984");
		mtDev("this.async_seq="+this.async_seq);
			if(options != this.async_seq)
				return;

		mtDev("8942");
				
			try {
					if(req.status != 200) {	// error!
						mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
						return;
					}
					html = req.responseText;
				} catch(e) {
					mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
					return;
				}
				mtDev("8949");
						mtParseGlobal(req);
				mtDev("8951");
			
							
		mtDev("8987");
			if(this.config.army.length <= 0) {
				this.stop();
				return;
			}
	
	
			tmp = html.match(/name="timestamp" value="(\d+)"/);
			timestamp = tmp[1];
			mtDev(timestamp);
			
			tmp = html.match(/name="timestamp_checksum" value="(\S+)"/);
			timestamp_checksum = tmp[1];
			mtDev(timestamp_checksum);
			
			data = "b=1";
			for(key in this.config.army[this.config.atkSeq].troop) {
				data += "&" + key + "=" + this.config.army[this.config.atkSeq].troop[key];
			}
			data += "&c=" + this.config.army[this.config.atkSeq].c;
			data += "&dname=&x=" + this.config.army[this.config.atkSeq].x;
			data += "&y=" + this.config.army[this.config.atkSeq].y;
			//data += "&dname=&x=65&y=-31";
			data += "&kid=" + mtPosXYToId(+ this.config.army[this.config.atkSeq].x, + this.config.army[this.config.atkSeq].y)
			data += "&timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum ;
			data += "&s1.x=15&s1.y=15&s1=ok";	// Like browser does
			mtDev("8942 data = " + data);
			mtOOPostSoon(
				"a2b.php?newdid=" + this.schedule.getTown().getId(),
				data,
				this, this._check_send, ++this.async_seq);
}

mtCTaskArmySender.prototype._check_send = function(req, options) {
	var	html;
	var	i, t;
	var	tmp1, tmp2, tmp3;
	var	log;
	var	data;
	var	fdata;
	

	mtDev("8189 mtCTaskArmySender._check_send");
	
	if(options != this.async_seq)
		return;
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
		return;
	}
	
	mtParseGlobal(req);
	mtDev(html);
	if(!this.schedule.getTown().checkTownPage(html)) {
		this._send(++this.async_seq);
		return;
	}
	
	log = "[" + this.schedule.getTown().getName() + "] ";
	
	do {	// Pseudo do for jump
		/* Check if error */
		tmp1 = html.match(/<div class="f10 e b">(.*?)<\/div>/);
		if(tmp1 != null) {
			log += tmp1[1];
			break;
		}
		
		tmp1 = html.match(/<h1>(.*?)<\/h1>/);
		if(tmp1 == null) {
			log += "Unknown page returned.";
			break;
		}
		log += tmp1[1];
		
//						 					 <td><a href="karte.php?d=130736&amp;c=93">
		tmp1 = html.match(/<td><a href="karte\.php\?d=(\d+)&amp;c=[0-9a-fA-F]+">/);
		if(tmp1 == null) {
			log += "Invalid target.";
			mtDev(html);
			//this.config.army.shift();
			break;
		}
		tmp2 = mtPosIdToXY(parseInt(tmp1[1]));
		log += "(" + tmp2[0] + "," + tmp2[1] + ")";
		
		tmp1 = html.match(/<td><a href="spieler\.php\?uid=(\d+)">(.*?)<\/a>/);
		if(tmp1 != null) {
			log += " {" + tmp1[2] + "(#" + tmp1[1] + ")}";
		}
		
		tmp1 = html.match(/<input type="hidden" name=".*?" value=".*?" \/>/g);
		if(tmp1 == null) {
			log += "No form data.";
			break;
		}

		data = "";
		fdata = new Object();
		for(i = 0; i < tmp1.length; i++) {
			//<input type="hidden" name="id" value="39" />
			tmp2 = tmp1[i].match(/name="(.*?)" value="(.*?)"/);
			//data += "&dname=&x=" + this.config.army[this.config.atkSeq].x;
			//data += "&y=" + this.config.army[this.config.atkSeq].y;
//			if(tmp2[1]=="kid")
//				data += "&" + encodeURIComponent("kid") + "=" + encodeURIComponent(mtPosXYToId(this.config.army[this.config.atkSeq].x,this.config.army[this.config.atkSeq].y));
//			else
				data += "&" + encodeURIComponent(tmp2[1]) + "=" + encodeURIComponent(tmp2[2]);
			fdata[tmp2[1]] = tmp2[2];

		}
		
		//todo, if mtUserRace = 0 || 1, t4 > 0 , set Spy type?
		//if mtUserRace = 2 , t3 > 0 , set Spy type?		
		if(html.match(/type="radio" name="spy"/) != null ) data = data + "&spy=" + this.config.army[this.config.atkSeq].spy;
		if(html.match(/"kata"/) != null ) data = data + "&kata=" + this.config.army[this.config.atkSeq].kata;
		if(html.match(/"kata2"/) != null ) data = data + "&kata2=" + this.config.army[this.config.atkSeq].kata2;
		data = data.substr(1);		

		
		tmp1 = html.match(/<td>.*?(\d+:\d+:\d+).*?<\/td>\r\n.*<td>.*?<span id=tp2>(\d+:\d+:\d+)<\/span>/);
		if(tmp1 != null) {
			log += " (Takes " + tmp1[1] + " to " + tmp1[2] + ")";
		}
		
		tmp3 = html.match(/<div class="in">\S+ (\d+):(\d+):(\d+) \S+<\/div>/);		
		if(tmp3 != null) {
			if(this.config.army.length > 1 && (this.config.army[1].delay == "auto"||this.config.army[1].delay==null))
				this.config.army[1].delay = ((( parseInt(tmp3[1])*60 + parseInt(tmp3[2]))*60 + parseInt(tmp3[3])) * 1000 )*2 + Math.floor(Math.random() * 5000) +2000 ;
		}		
		
		var enough_to_send = true;
		/* Check if all troops are allowed */
		for(i in this.config.army[this.config.atkSeq].troop) {
			if(this.config.army[this.config.atkSeq].troop[i] != "") {
				if(fdata[i] <= this.config.army[this.config.atkSeq].troop[i] * this.config.atkLowerBound) {
					//log += "(Not all troops are sent)";
					enough_to_send = false;
					mtDev("[" + this.schedule.getTown().getName() + "]Not enough troop to send, ["+i+"]"+fdata[i]+" Required:"+this.config.army[this.config.atkSeq].troop[i]+" Lowerbound:"+this.config.atkLowerBound);
					this.stop();
					return;
				}
			}
		}
		
		mtLog(log);
		this.message = log;
		if(enough_to_send)
		{
			//mtDev("9032 enough to send");
		this.schedule.updateTask(this.objId);
		mtOOPostSoon(
			"a2b.php?newdid=" + this.schedule.getTown().getId(),
			data,
			this, this._post_send, ++this.async_seq);
		}
		return;
				
		
	}
	while(false);
	/*add auto waittime change*/
	
	mtLog(log);
	this.config.lastSendArmyTime = new Date().getTime();
	this.config.atkSeq++;
	
//	if(this.config.repeat==0 && this.config.atkSeq >= this.config.army.length) this.stop;
	if(this.config.atkSeq >= this.config.army.length) 
	{
		this.config.repeat--;
		this.config.atkSeq = 0;
	}
	this.saveConfig();	/**/
	this.schedule.updateTask(this.objId);
	this._recheck(++this.async_seq);
}

mtCTaskArmySender.prototype._post_send = function(req, options) {
	var	html;
	
	if(options != this.async_seq)
		return;

	try {
		if(req.status != 200) {	// error!
			mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
		return;
	}
	

	this.config.lastSendArmyTime = new Date().getTime();
	this.config.atkSeq++;
	if(this.config.repeat==1 && this.config.atkSeq >= this.config.army.length) this.stop;
	if(this.config.atkSeq >= this.config.army.length) 
	{
		this.config.repeat--;
		this.config.atkSeq = 0;
	}
	this.saveConfig();	

	mtParseGlobal(req);
	
	if(!this.schedule.getTown().checkTownPage(html)) {
		this._send(++this.async_seq);
		return;
	}

	this.schedule.updateTask(this.objId);
	this._recheck(++this.async_seq);
}
/* ==== class mtCTaskArmySender ==== */







/* ==== class mtCTaskResourceSender ==== */

function mtCTaskResourceSender(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;	
	this.taskType = task_type;
	
	mtDev("8553 schedule = " + schedule);
	mtDev("8553 task_type = " + task_type);
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = null;
}

mtCTaskResourceSender.prototype.getObjId = function() {
	return this.objId;
}



mtCTaskResourceSender.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	i, j;

	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);

	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	if(config.length >= 5) {
		cf = new Object();
		cf.LastTransferTime = parseInt(config[2]);
		if(isNaN(cf.LastTransferTime)==true) cf.LastTransferTime = 0;
		cf.targetX = parseInt(config[3]);
		cf.targetY = parseInt(config[4]); 
		cf.delayH = parseInt(config[5]);
		cf.delayM = parseInt(config[6]);
		cf.cycleTime = (cf.delayH *60 +  cf.delayM)*60 * 1000;
		cf.sendRes = new Array(4);	
		cf.reserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			cf.sendRes[i] = 0;
		}
		if(config.length >= 9) {
			for(i = 0; i < 4; i++) {
				cf.sendRes[i] = parseInt(config[7 + i]);
			}
		}
		cf.reserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			cf.reserveRes[i] = 0;
		}
		if(config.length >= 13) {
			for(i = 0; i < 4; i++) {
				cf.reserveRes[i] = parseInt(config[11 + i]);
			}
		}
		this.config = cf;
	}
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}



mtCTaskResourceSender.prototype.saveConfig = function() {		
	//mtDev("8866 mtCTaskResourceSender.prototype.saveConfig");
	this.schedule.saveConfig();
}


mtCTaskResourceSender.prototype.getConfig = function() {
	var	config;
	var	i, key;
	
	config = escape(this.taskType);
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += ",";
	if(this.config.LastTransferTime!=null)
	config += escape(this.config.LastTransferTime);
	config += "," + escape(this.config.targetX);	
	config += "," + escape(this.config.targetY);	
	config += "," + escape(this.config.delayH);
	config += "," + escape(this.config.delayM);
		
	for(i = 0; i < this.config.sendRes.length; i++) {	
		config += "," + escape(this.config.sendRes[i]);
	}
	for(i = 0; i < this.config.reserveRes.length; i++) {	
		config += "," + escape(this.config.reserveRes[i]);
	}	
	return config;	
}




mtCTaskResourceSender.prototype.getTitle = function() {
	var	title;
	var	i;
	
	title = "運送資源";
	if(this.config != null) {
		title += "(" + this.config.targetX + ","+ this.config.targetY + ")";
	}
	return title;
}

mtCTaskResourceSender.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskResourceSender.prototype.canRun = function() {
	if(this.config == null)
		return false;

	return true;
}


mtCTaskResourceSender.prototype.setup = function(pos) {
	var	div;
	var	tmp;
	var	tr, td;
	var	i, j;
	var	b;
	
	if(this.vSetupBox == null) {

		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		tmp = document.createElement("span");
		tmp.textContent = "X:";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vTargetX = tmp;
		tmp.size = 5;
		div.appendChild(tmp);
		tmp = document.createElement("span");
		tmp.textContent = "Y:";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vTargetY = tmp;
		tmp.size = 5;			
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "間隔:";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vDelayH = tmp;
		tmp.size = 2;	
		div.appendChild(tmp);
		tmp = document.createElement("span");
		tmp.textContent = "時";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		this.vDelayM = tmp;
		tmp.size = 2;		
		div.appendChild(tmp);
		tmp = document.createElement("span");
		tmp.textContent = "分";
		div.appendChild(tmp);
		tmp = document.createElement("br");
		div.appendChild(tmp);

		tmp = document.createElement("div");
		tmp.textContent = "運送資源: ";
		div.appendChild(tmp);
		
		this.vSendRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			tmp.value =  0;
			this.vSendRes[i] = tmp;
			div.appendChild(tmp);
		}

		
		tmp = document.createElement("div");
		tmp.textContent = "保留資源: ";
		div.appendChild(tmp);
		
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			tmp.value = 0;
			this.vReserveRes[i] = tmp;
			div.appendChild(tmp);
		}
		
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
		
		
	} else {

		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		if(this.config != null)
		{
			this.vDelayH.value = this.config.delayH;
			this.vDelayM.value = this.config.delayM;
			this.vTargetX.value = this.config.targetX;
			this.vTargetY.value = this.config.targetY;
			for(i = 0; i < 4; i++) {
				this.vSendRes[i].value = this.config.sendRes[i];
				this.vReserveRes[i].value = this.config.reserveRes[i];		
			}
		}
	}

}


mtCTaskResourceSender.prototype.applySetup = function(pos) {

	var	config;
	var	i;
	var obj;
	config = new Object();

	var delayH = 0, delayM = 15;
	delayH = parseInt(this.vDelayH.value);	
	if(delayH < 0 || isNaN(delayH)) delayH = 0;	
	delayM = parseInt(this.vDelayM.value);	
	if(delayM < 0 || isNaN(delayM)) delayM = 0;
	config.delayH = delayH;
	config.delayM = delayM;	
	config.cycleTime = (delayH* 60 + delayM) * 60 * 1000 + Math.floor(Math.random() * 5000) + 2000;
	config.targetX = parseInt(this.vTargetX.value);
	config.targetY = parseInt(this.vTargetY.value);
	config.LastTransferTime = 0;
	if(isNaN(config.targetX)||isNaN(config.targetY))
	{
		alert("invalid configuration target");
		return;		
	}
	else if(config.targetX>400 || config.targetX<-400 || config.targetY>400 || config.targetY < -400)
	{
		alert("invalid configuration target");
		return;				
	}
	
	config.sendRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.sendRes[i] = parseInt(this.vSendRes[i].value);
		if(isNaN(config.sendRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = parseInt(this.vReserveRes[i].value);
		if(isNaN(config.reserveRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	

	this.config = config;
	if(this.config == null)
		this.message = "Idle";
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();


}


mtCTaskResourceSender.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskResourceSender.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskResourceSender.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskResourceSender.prototype.isRunning = function() {
	return this.running;
}

mtCTaskResourceSender.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskResourceSender.prototype._initVisual = function() {
	this.vSetupBox = null;	
}



mtCTaskResourceSender.prototype._recheck = function(options) {
	var b,c,d;
	
	if(options != this.async_seq)
		return;
	
	mtDev("9514 this.config.LastTransferTime = " + this.config.LastTransferTime);
	
	if(this.config.LastTransferTime == 0 || this.config.LastTransfer==null)
	{
	mtDev("9422");
		this.message = '<span style="color: blue;">準備中</span>';
		this._execute(++this.async_seq);
	}
	else
	{
		mtDev("9429");
		b = new Date().gettime();
		c = b - this.config.LastTransferTime;
		mtDev(c);		
		if(c < this.config.cycleTime)
		{
			d = this.config.cycleTime - c + Math.random()*5000 + 3000;
			this.message = '<span style="color: green;">等待 ' + (c/1000)+ '秒</span>';
			mtSetTimeout(this, this._execute, ++this.async_seq, c);		
		}
		else
		this._execute(++this.async_seq);	
	}
	this.config.LastTransferTime == new Date().gettime();
	this.saveConfig();
}

mtCTaskResourceSender.prototype._execute = function(options) {
	var	b, d ;
	var	target = [parseInt(this.config.targetX), parseInt(this.config.targetY)];
	var	ret;
 	var town;
    
	if(options != this.async_seq)
		return;
  
  	town = this.schedule.getTown();

	b = town.getBuildings(MTB_MARKETPLACE);
	if(b.length == 0) {	
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[MTB_MARKETPLACE] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			10 * 60 * 1000);
		return;
	}

	
	if(isNaN(target[0]) || isNaN(target[1])) {
			alert("Invalid target.");
	} 
	else 
	{
		mtDev("9473");
			for(i = 0; i < 4; i++) 
			{
					if( isNaN(this.config.sendRes[i])   )
						this.config.sendRes[i] = 0;

					if( isNaN(this.config.reserveRes[i]))
						this.config.reserveRes[i] = 0;

					if(this.schedule.getTown().getResource(i) < this.config.reserveRes[i] + this.config.sendRes[i]) {					
						this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 資源不足 , 等待 0:10:00 </span>';
						mtSetTimeout(this, this._recheck, ++this.async_seq, 10 * 60 * 1000);
						this.schedule.updateTask(this.objId);
						return;
					}
			}
			
			
			this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[MTB_MARKETPLACE]+ '</span>';
			
			ret = b[0].transferResource(target, this.config.sendRes, this.config.reserveRes, null, 
								function(result, options) {
												var	i;
												if(result[0] == MTUR_QUERY_TRANSFER)
													return true;
											}				
											, options);
												
			if(ret[0] == MTUR_QUERY_TRANSFER) 
			{
				this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 運送完成 </span>';
				mtSetTimeout(this, this._recheck, ++this.async_seq, 15 * 60 * 1000);
				return;
				
			}else if(ret[0] == MTUR_NO_ERROR )
			{				
				mtSetTimeout(this, this._recheck, ++this.async_seq, this.config.cycleTime);
				mtLog( town.getName() + " 運送 [" + this.config.sendRes + "] 到 (" + target[0] + "|" + target[1] + ")");								
				this.message = '[' + new Date().toMTString() + '] 運送完成,等待' + Math.floor(this.config.cycleTime/1000) + '秒';				
				this.schedule.updateTask(this.objId);
				//this.config.LastTransferTime = new Date().gettime();
				//this.saveConfig();
			}		
			
	}
}




/* ==== class mtCTaskResourceSender ==== */
/**************************************************************************************************/










/* ==== class mtCTaskAutoRaidSheep ==== */
function mtCTaskAutoRaidSheep(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict	
	
	this.config = null;
}

mtCTaskAutoRaidSheep.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskAutoRaidSheep.prototype.loadConfig = function(config) {
	var	type;
	var	cf, cf_this, army;
	var	i, j;
	var	troop;	
	
	mtDev("7591 mtCTaskAutoRaidSheep.loadConfig");
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	//mtDev("7938 load army config = " + config );
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	//mtDev("7948 config.length = " + config.length);
	if(config.length >= 3) {
		cf = new Object();	
		cf.RaidReq = 0;	
		cf.lastRaidTime = parseInt(config[2]);
				
		if(isNaN(cf.lastRaidTime))
			cf.lastRaidTime = null;

		cf.delay = parseInt(config[3]);

		cf.army = new Array();
		for(i = 4; i < config.length; i ++) {
			
			army = new Object();
			troop = unescape(config[i]).split(",");			
			army.troop = new Object();
			for(j = 1; j < 22; j += 2) {
				army.troop[troop[j - 1]] = troop[j];
			}
			//army.delay = parseInt(troop[22]);
			//if(isNaN(army.delay))
			//	army.delay = null;
			army.c = troop[22];
			army.x = parseInt(troop[23]);
			army.y = parseInt(troop[24]);
			cf.army.push(army);
		}
		this.config = cf;
		
	}
	
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskAutoRaidSheep.prototype.saveConfig = function() {
	this.schedule.saveConfig();
}

mtCTaskAutoRaidSheep.prototype.getConfig = function() {
	var	config, army;
	var	i, key;
	
	config = escape(this.taskType);
	//mtDev("7759 config = " + config );
	config += "," + escape(this.running);
	
	if(this.config == null)
		return config;
	config += ",";
	if(this.config.lastRaidTime != null)
		config += escape(this.config.lastRaidTime);
	config += ",";
	if(this.config.delay != null)
		config += escape(this.config.delay);
	
	for(i = 0; i < this.config.army.length; i++) {
		army = "";
		for(key in this.config.army[i].troop) {
			if(army != "")
				army += ",";
			army += key + "," + this.config.army[i].troop[key];
		}		
		army += "," + this.config.army[i].c;
		army += "," + this.config.army[i].x;
		army += "," + this.config.army[i].y;
		
		config += "," + escape(army);
	}
	return config;
}

mtCTaskAutoRaidSheep.prototype.getTitle = function() {
	var	title;
	var	i;
	
	title = "Auto Raid Sheep";
	if(this.config != null) {
		title += "(" + this.config.army.length + ")";
	}
	return title;
}

mtCTaskAutoRaidSheep.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskAutoRaidSheep.prototype.canRun = function() {
	if(this.config == null)
		return false;
	if(this.config.army.length <= 0)
		return false;
	return true;
}

mtCTaskAutoRaidSheep.prototype.setup = function(pos) {
	var	div;
	var	tmp;
	var	tr, td;
	var	i, j;
	var	b;
	
	if(this.vSetupBox == null) {
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);
		
		tmp = document.createElement("span");
		tmp.textContent = "Scheduling send:";
		div.appendChild(tmp);
		div.appendChild(document.createElement("br")); 
		
		tmp = document.createElement("img");
		tmp.src = "img/un/a/clock.gif";
		div.appendChild(tmp);
		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 20;
		tmp.disabled = true;
		div.appendChild(tmp);
		this.vActiveTime = tmp;
		
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("table");
		this.vArmyTable = tmp;
		div.appendChild(tmp);
		
		tr = tmp.insertRow(-1);
		for(i = 0; i < 10; i++)
		{
			td = tr.insertCell(-1);
			td.innerHTML = '<img class="unit u'+(i + mtUserRace*10 + 1 )+'" src="img/x.gif"/>'
			//td.textContent = "#";
		}
		td = tr.insertCell(-1);
		td.innerHTML = '<img class="unit uhero" src="img/x.gif"/>';
		//td = tr.insertCell(-1);				--AUTO DELAY
		//td.innerHTML = '<img src="img/un/a/clock.gif"/>';
		td = tr.insertCell(-1);
		td = tr.insertCell(-1);
		td.textContent = "X";
		td = tr.insertCell(-1);
		td.textContent = "Y";
		
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.innerHTML = "<img src='" + MTI_ADD + "'/>";
		div.appendChild(tmp);
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.setupNewArmy(-1);
		}, false);
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
			
		}, false);
		
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
		
		/*
		div.appendChild(document.createElement("br"));
		tmp = document.createElement("span");
		tmp.textContent = "Auto-generating schedule:";
		div.appendChild(tmp);
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("table");
		this.vAutoArmyTable = tmp;
		div.appendChild(tmp);
		
		tr = tmp.insertRow(-1);
		for(i = 0; i < 10; i++)
		{
			td = tr.insertCell(-1);
			td.innerHTML = '<img class="unit u'+(i + mtUserRace*10 + 1 )+'" src="img/x.gif"/><br/><input type="text" class="fm" size="2"/>';
		}
		td = tr.insertCell(-1);	// [0][10]
		td.innerHTML = '<img class="unit uhero" src="img/x.gif"/><br/><input type="text" class="fm" size="2"/>';
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [1][0]
		td.colSpan = 3;		
		td.innerHTML = '派兵種類<br><select><option value="2">Reenforce</option><option value="3">Attack</option><option value="4">Raid</option></select>';
		td = tr.insertCell(-1);	// [1][1]
		td.colSpan = 8;
		td.rowSpan = 2;
		td.innerHTML = '目標(ex: 0|0,1|1,400|400 )<br><textarea class="fm" rows="2" cols="40">x1|y1,x2|y2...</textarea>';
		
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	
		td.colSpan = 2;
		td.innerHTML = '*重複';
		td = tr.insertCell(-1);// [2][1]
		td.innerHTML = '<input type="text" class="fm" size="2"/>';
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [3][0]
		td.colSpan = 4; 
		td.innerHTML = '<img src="img/un/a/clock.gif"/>間隔 (時)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [3][1]
		td.colSpan = 3; 
		td.innerHTML = '(分)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [3][2]
		td.colSpan = 3; 
		td.innerHTML = '(秒)<input type="text" class="fm" size="2"/>';

		td = tr.insertCell(-1);	

		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);	// [4][0]
		td.colSpan = 4; 
		td.innerHTML = '<img src="img/un/a/clock.gif"/>首發 (時)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [4][1]
		td.colSpan = 3; 
		td.innerHTML = '(分)<input type="text" class="fm" size="2"/>';
		td = tr.insertCell(-1);	// [4][2]
		td.colSpan = 3; 
		td.innerHTML = '(秒)<input type="text" class="fm" size="2"/>';
		

		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);
		td.innerHTML = '自動調整間隔'
		td.colspan = 4;
		td = tr.insertCell(-1);//[5][1]
		td.innerHTML = '<input type="checkbox">'
		
		tr = tmp.insertRow(-1);
		td = tr.insertCell(-1);
		td.colSpan = 11;
		td.innerHTML = '<hr />ex：  目標=0|0,1|1   *多波攻勢=2 <br><img src="img/un/a/clock.gif"/> 間隔 0:40:00"00 <font color=blue>總共會產生4波攻擊，每次間隔40分鐘</font>';
		td.innerHTML = td.innerHTML + '<br /><img src="img/un/a/clock.gif"/>  <font color="brown">首發設為 1:00:00，則會等待1小時後，開始發出4波攻擊</font>';
		div.appendChild(document.createElement("br"));
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[GENERATE]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.generateSchedule();
		}, false);
		div.appendChild(tmp);
		
		*/
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
	
	while(this.vArmyTable.rows.length > 1)
		this.vArmyTable.deleteRow(1);
	if(this.config != null) {
		for(i = 0; i < this.config.army.length; i++) {
			tr = this.setupNewArmy(-1);
			for(j = 0; j < 11; j++) {
				if(this.config.army[i].troop["t" + (j + 1)] == null)
					tr.cells[j].lastChild.value = "";
				else
					tr.cells[j].lastChild.value = this.config.army[i].troop["t" + (j + 1)];
			}
			//if(this.config.army[i].delay == null)
			//	tr.cells[11].lastChild.value = "";
			//else
			//	tr.cells[11].lastChild.value = this.config.army[i].delay;
			tr.cells[11].lastChild.value = this.config.army[i].c;
			tr.cells[12].lastChild.value = this.config.army[i].x;
			tr.cells[13].lastChild.value = this.config.army[i].y;
		}
	}
	
	div.style.display = "none";
	
	mtOOGet("a2b.php?newdid=" + this.schedule.getTown().getId(),
		this, this._setup1, "a2b.php?newdid=" + this.schedule.getTown().getId());
}

mtCTaskAutoRaidSheep.prototype.applySetup = function(pos) {
	var	config;
	var	army;
	var	i, j;
	
	config = new Object();
	config.lastRaidTime = 0;
	config.delay = 0;
	config.RaidSeq = 0;
	config.army = new Array();
	for(i = 1; i < this.vArmyTable.rows.length; i++) {
		army = new Object();
		army.troop = new Object();
		for(j = 0; j < 11; j++) {
			army.troop["t" + (j + 1)] = this.vArmyTable.rows[i].cells[j].lastChild.value;
		}
		army.c = this.vArmyTable.rows[i].cells[11].lastChild.value;
		army.x = parseInt(this.vArmyTable.rows[i].cells[12].lastChild.value);
		army.y = parseInt(this.vArmyTable.rows[i].cells[13].lastChild.value);
		if(isNaN(army.x) || isNaN(army.y)) {
			alert("Invalid target coordinate.");
			return;
		}
		config.army.push(army);
	}
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskAutoRaidSheep.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskAutoRaidSheep.prototype.setupNewArmy = function(iRow) {
	var	tr, td;
	var	tmp;
	var	i;
	
	tr = this.vArmyTable.insertRow(iRow);
	
	for(i = 0; i < 11; i++) {
		td = tr.insertCell(-1);
		td.innerHTML = '<input type="text" size="2" class="fm"/>';
	}
	td = tr.insertCell(-1);
	td.innerHTML = '<select><option value="4">Raid</option><option value="3">Attack</option></select>';
	td = tr.insertCell(-1);
	td.innerHTML = '<input type="text" size="2" class="fm"/>';
	td = tr.insertCell(-1);
	td.innerHTML = '<input type="text" size="2" class="fm"/>';
	
	td = tr.insertCell(-1);
	td.noWrap = true;
	tmp = document.createElement("a");
	tmp.href = "javascript:void(0);";
	tmp.innerHTML = "<img src='" + MTI_DELETE + "'/>";
	td.appendChild(tmp);
	tmp.addEventListener("click", function(ev) {
		var	tr;
		
		tr = ev.target;
		while(tr.tagName.match(/tr/i) == null) {
			tr = tr.parentNode;
		}
		tr.parentNode.removeChild(tr);
	}, false);
	return tr;
}

mtCTaskAutoRaidSheep.prototype.generateSchedule = function() {
	var	tr;
	var	n, c, i, j, x, y;
	var	targets;
	var	delay_h, delay_m, delay_s, delay_ms;	
	var	delay, fisrt_delay;
	var	delay_auto;
	
	while(this.vArmyTable.rows.length > 1)
		this.vArmyTable.deleteRow(1);

	delay_h  = parseInt(this.vAutoArmyTable.rows[3].cells[0].lastChild.value);
	if(isNaN(delay_h) || delay_h <0) delay_h = 0;
	delay_m  = parseInt(this.vAutoArmyTable.rows[3].cells[1].lastChild.value);
	if(isNaN(delay_m) || delay_m <0) delay_m = 0;
	delay_s  = parseInt(this.vAutoArmyTable.rows[3].cells[2].lastChild.value);
	if(isNaN(delay_s) || delay_s <0) delay_s = 0;
	delay = ((delay_h*60 + delay_m)*60 +delay_s)*1000 ;
	mtDev("8004 Delay = " + delay + " ms ");
	if(delay == 0) dealy = 10; //every wave delay 10ms
	
	delay_auto = this.vAutoArmyTable.rows[5].cells[1].lastChild.checked;
	//mtDev("7711 delay_auto = " + delay_auto);
	//if(delay_auto == true) mtDev("Army Sender Auto Delay Triggered!");
	
	delay_h  = parseInt(this.vAutoArmyTable.rows[4].cells[0].lastChild.value);
	if(isNaN(delay_h) || delay_h <0) delay_h = 0;
	delay_m  = parseInt(this.vAutoArmyTable.rows[4].cells[1].lastChild.value);
	if(isNaN(delay_m) || delay_m <0) delay_m = 0;
	delay_s  = parseInt(this.vAutoArmyTable.rows[4].cells[2].lastChild.value);
	if(isNaN(delay_s) || delay_s <0) delay_s = 0;
	fisrt_delay = ((delay_h*60 + delay_m)*60 +delay_s)*1000 ;
	if(fisrt_delay == 0) fisrt_delay = 10; //every wave delay 10ms
	mtDev("8029 First Delay = " + fisrt_delay + " ms ");

	c = parseInt(this.vAutoArmyTable.rows[2].cells[1].lastChild.value);
	mtDev("8007 * waves = " + c );
	if(isNaN(c) || c <= 0) c=1;//set default value =1;
		
	targets = this.vAutoArmyTable.rows[1].cells[1].lastChild.value.match(/-?\d+\|-?\d+/g);
	if(targets == null)
		return;
	mtDev("targets.length 7951: " + targets.length);
	for(n = 0; n < c; n++) {
		for(i = 0; i < targets.length; i++) {
		x = targets[i].match(/(-?\d+)\|(-?\d+)/);
		y = x[2];
		x = x[1];
		//for(n = 0; n < c; n++) {
			tr = this.setupNewArmy(-1);
			for(j = 0; j < 11; j++) {
				tr.cells[j].lastChild.value = this.vAutoArmyTable.rows[0].cells[j].lastChild.value;
			}
		//	if(n==0 && j==0) tr.cells[11].lastChild.value = 10;	
		//		    else tr.cells[11].lastChild.value = delay;	
		//	if(delay_auto == true && (n+i>0))
		//	{
		//		tr.cells[11].lastChild.value = "auto";
		//	}
			if(i==0 && n ==0) tr.cells[11].lastChild.value = fisrt_delay;
			tr.cells[12].lastChild.value = this.vAutoArmyTable.rows[1].cells[0].lastChild.value;
			tr.cells[13].lastChild.value = x;
			tr.cells[14].lastChild.value = y;
		}
	}	
}

mtCTaskAutoRaidSheep.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskAutoRaidSheep.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskAutoRaidSheep.prototype.isRunning = function() {
	return this.running;
}

mtCTaskAutoRaidSheep.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskAutoRaidSheep.prototype._initVisual = function() {	
	this.vSetupBox.style.display = "";
}

mtCTaskAutoRaidSheep.prototype._setup1 = function(req, options) {
	var	html;
	var	i, t;
	var	tmp1, tmp2;
	
	mtDev("8085 mtCTaskAutoRaidSheep._setup1");
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected(options + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected(options + " : " + e);
		return;
	}
	
	mtParseGlobal(req);
	
	if(!this.schedule.getTown().checkTownPage(html)) {
		mtOOGet(options,
			this, this._setup1, options);
		return;
	}
	
	this.vSetupBox.style.display = "";
	
	tmp1 = html.match(/<img class="unit" src=".*?" title=".*?".*?><\/td><td width="35"><input class="fm" type="Text" name="t(\d+)"/g);
	if(tmp1 != null) {
		for(i = 0; i < tmp1.length; i++) {
			tmp2 = tmp1[i].match(/<img class="unit" src="(.*?)" title="(.*?)".*?><\/td><td width="35"><input class="fm" type="Text" name="t(\d+)"/);
			t = parseInt(tmp2[3]);
			if(t >= 1 && t <= 11) {
				this.vArmyTable.rows[0].cells[t - 1].innerHTML = 
					'<img class="unit" src="' + tmp2[1] + '" title="' + tmp2[2] + '"/>';
				this.vAutoArmyTable.rows[0].cells[t - 1].firstChild.src = tmp2[1];
				this.vAutoArmyTable.rows[0].cells[t - 1].firstChild.title = tmp2[2];
			}
		}
	}
}

mtCTaskAutoRaidSheep.prototype._recheck = function(options) {
	if(options != this.async_seq)
		return;
	
	if(this.config.activeTime == null) {
		this._execute(++this.async_seq);
	}
	/* NOTE: Now activeTime is not used */
}

mtCTaskAutoRaidSheep.prototype._execute = function(options) {

	var d = new Date().getTime();
	var delay_offset = 0;

	if(options != this.async_seq)
		return;

	//mtDev("9905");
	if(this.config.army.length <= 0) {
		this.stop();
		return;
	}
	else
	{
		mtDev(this.config.lastRaidTime);
		mtDev(this.config.delay	);
	}

	if(this.config.lastRaidTime > 0 && d > this.config.lastRaidTime) delay_offset =  d - this.config.lastRaidTime ;
	
	this.config.RaidSeq = Math.floor(Math.random()*this.config.army.length);

	if(this.config.delay == null)
		this._send(++this.async_seq);
	else {		
		
		this.config.delay = this.config.delay - delay_offset ;
		if(this.config.delay <=0 ) this.config.delay = 180000;
		this.message = "等待 " + Math.floor(this.config.delay/1000) + " 秒";		
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._send, ++this.async_seq, this.config.delay);
	}
}

mtCTaskAutoRaidSheep.prototype._send = function(options) {
	var	data;
	var	key;
	
	mtDev("9925 mtCTaskAutoRaidSheep._send");
	if(options != this.async_seq)
		return;
		
	if(this.config.army.length <= 0) {
		this.stop();
		return;
	}
	
	data = "b=1";
	for(key in this.config.army[this.config.RaidSeq].troop) {
		data += "&" + key + "=" + this.config.army[this.config.RaidSeq].troop[key];
	}
	data += "&c=" + this.config.army[this.config.RaidSeq].c;
	data += "&dname=&x=" + this.config.army[this.config.RaidSeq].x;
	data += "&y=" + this.config.army[this.config.RaidSeq].y;
	data += "&s1.x=15&s1.y=15&s1=ok";	// Like browser does
	mtOOPostSoon(
		"a2b.php?newdid=" + this.schedule.getTown().getId(),
		data,
		this, this._check_send, ++this.async_seq);
}

mtCTaskAutoRaidSheep.prototype._check_send = function(req, options) {
	var	html;
	var	i, t;
	var	tmp1, tmp2, tmp3;
	var	log;
	var	data;
	var	fdata;
	
	
	mtDev("9964 mtCTaskAutoRaidSheep._check_send");
	
	if(options != this.async_seq)
		return;
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
		return;
	}
	
	mtParseGlobal(req);
	
	if(!this.schedule.getTown().checkTownPage(html)) {
		this._send(++this.async_seq);
		return;
	}
	
	log = "[" + this.schedule.getTown().getName() + "] ";
	
	do {	// Pseudo do for jump
		/* Check if error */
		tmp1 = html.match(/<div class="f10 e b">(.*?)<\/div>/);
		if(tmp1 != null) {
			log += tmp1[1];
			this.config.delay = 900000 + Math.random()*100000;
			break;
		}
		
		tmp1 = html.match(/<h1>(.*?)<\/h1>/);
		if(tmp1 == null) {
			log += "Unknown page returned.";
			this.config.delay = 900000 + Math.random()*100000;
			break;
		}
		log += tmp1[1];
//						 					 <td><a href="karte.php?d=130736&amp;c=93">
		tmp1 = html.match(/<td><a href="karte\.php\?d=(\d+)&amp;c=[0-9a-fA-F]+">/);
		if(tmp1 == null) {
			log += " 無效/兵力不夠或該村莊無法出兵";
			this.config.delay = 900000 + Math.random()*100000;
			break;
		}
		tmp2 = mtPosIdToXY(parseInt(tmp1[1]));
		log += "(" + tmp2[0] + "," + tmp2[1] + ")";
		
		tmp1 = html.match(/<td><a href="spieler\.php\?uid=(\d+)">(.*?)<\/a>/);
		if(tmp1 != null) {
			log += " {" + tmp1[2] + "(#" + tmp1[1] + ")}";
		}
		
		tmp1 = html.match(/<input type="hidden" name=".*?" value=".*?" \/>/g);
		if(tmp1 == null) {
			log += "No form data.";
			this.config.delay = 900000 + Math.random()*100000;
			break;
		}

		data = "";
		fdata = new Object();
		for(i = 0; i < tmp1.length; i++) {
			//<input type="hidden" name="id" value="39" />
			tmp2 = tmp1[i].match(/name="(.*?)" value="(.*?)"/);
			data += "&" + encodeURIComponent(tmp2[1]) + "=" + encodeURIComponent(tmp2[2]);
			fdata[tmp2[1]] = tmp2[2];
		}
		
		//todo, if mtUserRace = 0 || 1, t4 > 0 , set Spy type?
		//if mtUserRace = 2 , t3 > 0 , set Spy type?		
		if(html.match(/type="radio" name="spy"/) != null ) data = data + "&spy=1";
		if(html.match(/"kata"/) != null ) data = data + "&kata=99";
		if(html.match(/"kata2"/) != null ) data = data + "&kata2=99";
		data = data.substr(1);		
		//mtDev("8258 data = " + data );
		
		tmp1 = html.match(/<td>.*?(\d+:\d+:\d+).*?<\/td>\r\n.*<td>.*?<span id=tp2>(\d+:\d+:\d+)<\/span>/);
		if(tmp1 != null) {
			log += " (Takes " + tmp1[1] + " to " + tmp1[2] + ")";
		}
		
		tmp3 = html.match(/<div class="in">\S+ (\d+):(\d+):(\d+) \S+<\/div>/);		
		if(tmp3 != null) {
			this.config.delay = ((( parseInt(tmp3[1])*60 + parseInt(tmp3[2]))*60 + parseInt(tmp3[3])) * 1000 )*2 + Math.floor(Math.random() * 15000) +2000 ;
			//mtDev("10060 " +this.config.delay);
		}		
		
		mtDev("10060 " +this.config.delay);
		/* Check if all troops are allowed */
		for(i in this.config.army[this.config.RaidSeq].troop) {
			if(this.config.army[this.config.RaidSeq].troop[i] != "") {
				if(fdata[i] != this.config.army[this.config.RaidSeq].troop[i]) {
					log += "(Not all troops are sent)";
					break;
				}
			}
		}
		
		mtLog(log);
		this.message = log;
		this.schedule.updateTask(this.objId);
		mtOOPostSoon(
			"a2b.php?newdid=" + this.schedule.getTown().getId(),
			data,
			this, this._post_send, ++this.async_seq);
		return;
				
		
	}
	while(false);
	/*add auto waittime change*/
	mtLog(log);	
	this.schedule.updateTask(this.objId);
	this._execute(++this.async_seq);
}

mtCTaskAutoRaidSheep.prototype._post_send = function(req, options) {
	var	html;
	
	if(options != this.async_seq)
		return;
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected("a2b.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
		return;
	}
	
	var d = new Date().getTime();
	//mtDev("10110 " + d );
	this.config.lastRaidTime = d ;
	
	this.saveConfig();
	
	mtParseGlobal(req);	
	if(!this.schedule.getTown().checkTownPage(html)) {
		this._send(++this.async_seq);
		return;
	}
	
	//this.config.army.shift();
	this.schedule.updateTask(this.objId);
	this._execute(++this.async_seq);
}
/* ==== class mtCTaskAutoRaidSheep ==== */




/* ==== class mtCTaskUpgradeTroops ==== */
function mtCTaskUpgradeTroops(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	


	if(task_type == MTT_UPGRADE_ARMOURY) {
		this.building = MTB_ARMOURY;
	} else if(task_type == MTT_UPGRADE_BLACKSMITH)  {
		this.building = MTB_BLACKSMITH;
	} 

	//this.message = '<span style="color: red;">Wait for configuration<span>';
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = new Object();
	this.config.reserveRes = [0, 0, 0, 0];
	this.config.target = new Array();	
}

mtCTaskUpgradeTroops.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskUpgradeTroops.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	target;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	cf = new Object();
	cf.reserveRes = new Array(4);
	cf.UpgradeLevel = 0;
	for(i = 0; i < 4; i++) {
		cf.reserveRes[i] = 0;
	}
	

	cf.UpgradeType = parseInt(config[2]);
	cf.UpgradeLevel = parseInt(config[3]);
	if(isNaN(cf.UpgradeLevel)) cf.UpgradeLevel = 0;
	cf.reserveRes = new Array(4);				
	for(i = 0; i < 4; i++) 
	{
			cf.reserveRes[i] = parseInt(config[4 + i]);
			if(isNaN(cf.reserveRes[i])) cf.reserveRes[i]=0;
	}	
	this.config = cf;	
	
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskUpgradeTroops.prototype.saveConfig = function() {
	//mtDev("6632 mtCTaskUpgradeTroops.prototype.saveConfig");
	this.schedule.saveConfig();
}

mtCTaskUpgradeTroops.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	//mtDev("6541 config = " + config );
	config += "," + escape(this.running);

	if(this.config == null)
		return config;


	config += "," + escape(this.config.UpgradeType);
	config += "," + escape(this.config.UpgradeLevel);
	
	for(i = 0; i < 4; i++) {
		config += "," + escape(this.config.reserveRes[i]);
	}
	return config;
}

mtCTaskUpgradeTroops.prototype.getTitle = function() {
	var	title;
	var	i;
	
	//title = "Booked upgrade:";
	title = "升級"+mtBuildingName[this.building]+"屬性:";
	if(this.config != null) {
	//	for(i = 0; i < this.config.target.length; i++) {
	//		title += "<br>#" + (this.config.target[i].id + 1);
	//		title += "(" + mtBuildingName[this.config.target[i].gid] + ")";
	//	}
	}
	return title;
}

mtCTaskUpgradeTroops.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskUpgradeTroops.prototype.canRun = function() {
	return true;
}

mtCTaskUpgradeTroops.prototype.setup = function(pos) {
	var	div;
	var	table, tr, td;
	var	tmp;
	var	i, j;
	var	opt;
	
	
	//mtDev("10423");
	if(this.vSetupBox == null) {		
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);

		tmp = document.createElement("span");
		tmp.textContent = "ATK/DEF:";
		div.appendChild(tmp);

		tmp = document.createElement("select");
		this.vUpgradeType = tmp;
		div.appendChild(tmp);


		tmp = document.createElement("span");
		tmp.textContent = "Until LV.";
		div.appendChild(tmp);

		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 2;
		this.vUpgradeLevel = tmp;
		div.appendChild(tmp);

		tmp = document.createElement("hr");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Reserve: ";
		div.appendChild(tmp);
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("input");
			tmp.type = "text";
			tmp.size = 5;
			tmp.value = this.config.reserveRes[i];
			this.vReserveRes[i] = tmp;
			div.appendChild(tmp);
		}
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
//		mtDev("10508");
	tmp = this.schedule.getTown().getBuildings(this.building);                                                                                                  
		if(tmp.length > 0) {                                                                                                                                
			tmp[0].queryInfo(0, this, this._setup1, null);                                                                                              
		} else {                                                                                                                                            
			//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to locate' + mtBuildingName[this.building] + '</span>';
			this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '</span>';           
			this.schedule.updateTask(this.objId);                                                                                                       
	}                                                                                                                                                   
	div.style.display = "";
	//mtDev("10518");
}       
        


mtCTaskUpgradeTroops.prototype._setup1 = function(info, options) {
	var	i;
	var	opt;
	var	tr, td, tmp;

	
	if(info == null) {
		mtDev("10535 info = null ");		
		this.message = '[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building];
		this.schedule.updateTask(this.objId);
		return;
	}
	
	this.vUpgradeType.options.length = 0;
	for(i = 0; i < info.upgradee.length; i++) {
		opt = document.createElement("option");
		opt.value = info.upgradee[i].id;
		opt.text = info.upgradee[i].name + "(LV" +  info.upgradee[i].level + ")" ;
		this.vUpgradeType.add(opt, null);
	}
	
	if(this.config != null) {
		for(i = 0; i < this.vUpgradeType.options.length; i++) {
			if(this.vUpgradeType.options[i].value == this.config.UpgradeType) {
				this.vUpgradeType.selectedIndex = i;
				break;
			}
		}
		this.vUpgradeLevel.value = this.config.UpgradeLevel;
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = this.config.reserveRes[i];
		}
	} else {
		for(i = 0; i < 4; i++) {
			this.vReserveRes[i].value = "0";
		}
	}
	
	this.vSetupBox.style.display = "";

}



mtCTaskUpgradeTroops.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	var	target;
	var	sel;
	
	config = new Object();
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = parseInt(this.vReserveRes[i].value);
		if(isNaN(config.reserveRes[i])) {
			alert("Invalid configuration.");
			return;
		}
	}
	config.UpgradeType = this.vUpgradeType.options[this.vUpgradeType.selectedIndex].value;
	config.UpgradeLevel = this.vUpgradeLevel.value;
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	//this.message = this.vUpgradeType.options[this.vUpgradeType.selectedIndex].text + " LV" + this.config.UpgradeLevel ;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskUpgradeTroops.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskUpgradeTroops.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskUpgradeTroops.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskUpgradeTroops.prototype.isRunning = function() {
	return this.running;
}

mtCTaskUpgradeTroops.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskUpgradeTroops.prototype._initVisual = function() {
	this.vSetupBox = null;
}


mtCTaskUpgradeTroops.prototype._recheck = function(options) {
	var	b;
	

	if(options != this.async_seq)
		return;
	
	b = this.schedule.getTown().getBuildings(this.building);
	
	if(b.length == 0) {
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			10 * 60 * 1000);
		return;
	}
	else if(this.config.UpgradeType != null && this.config.UpgradeLevel > 0) {
		b[0].queryInfo(0, this, this._check, ++this.async_seq);
		this.message = '[' + new Date().toMTString() + '] 發出排程到' + mtBuildingName[this.building];
		this.schedule.updateTask(this.objId);
		return;
	}
	mtDev("10651");
}

mtCTaskUpgradeTroops.prototype._check = function(info, options) {
	var	i, idx;
	var	url;

	if(options != this.async_seq)
		return;
	
	for(i=0 ; i < info.upgradee.length ; i ++)
		if( this.config.UpgradeType == info.upgradee[i].id ) break;
		
	idx = i;
	

	for(i = 0; i < 4; i++) {
		if(this.schedule.getTown().getResource(i) < this.config.reserveRes[i] + info.upgradee[idx].cost[i]) 
		{
			this.message = '<span style="color: brown;">[' + new Date().toMTString() + '] 資源不足 , 等待 0:30:00 </span>';
			mtSetTimeout(this, this._recheck, ++this.async_seq, 30 * 60 * 1000);
			this.schedule.updateTask(this.objId);
			return;
		}
	}
	
	if(info.upgradee[idx].href == null) 
	{
		this.message = '[' + new Date().toMTString() + '] ' + info.upgradee[idx].reason + ', 等待 0:30:00.';
		mtSetTimeout(this, this._recheck, ++this.async_seq, 30 * 60 * 1000);
		this.schedule.updateTask(this.objId);
		return;
	}
	
		
	url = info.upgradee[idx].href;
	url += "&newdid=" + this.schedule.getTown().getId();
	this.message = '[' + new Date().toMTString() + '] 升級中';
	this.schedule.updateTask(this.objId);
	mtOOGet(url, this, this._postUpgrade, ++this.async_seq);

}

mtCTaskUpgradeTroops.prototype._postUpgrade = function(req, options) {
	var	t;
	
	mtParseGlobal(req);
	
	if(options != this.async_seq)
		return;
		
	t = Math.floor(Math.random() * 10 * 1000) + 1000;
	this.message = '[' + new Date().toMTString() + '] Recheck in ' + t + 'ms';
	mtSetTimeout(this, this._recheck, ++this.async_seq, t);
}

/* ==== class mtCTaskUpgradeTroops ==== */


/* ==== class mtCTaskCreateNewVillage ==== */
function mtCTaskCreateNewVillage(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = new Object();
	this.config.reserveRes = [750, 750, 750, 750];
	this.config.target = new Array();	
}

mtCTaskCreateNewVillage.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskCreateNewVillage.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	target;
	var	i;
	
	config = config.split(",");
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	cf = new Object();
	cf.reserveRes = new Array(4);
	cf.targetX = parseInt(config[2]);
	cf.targetY = parseInt(config[3]);		
	for(i = 0; i < 4; i++) 
	{
			cf.reserveRes[i] = 750;
	}	
	this.config = cf;	
	
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskCreateNewVillage.prototype.saveConfig = function() {
	//mtDev("6632 mtCTaskCreateNewVillage.prototype.saveConfig");
	this.schedule.saveConfig();
}

mtCTaskCreateNewVillage.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	config += "," + escape(this.running);
	if(this.config == null)
		return config;
	config += "," + escape(this.config.targetX);
	config += "," + escape(this.config.targetY);
	
	return config;
}

mtCTaskCreateNewVillage.prototype.getTitle = function() {
	var	title;
	var	i;
	
	//title = "Booked upgrade:";
	title = "自動開村";
	if(this.config != null) {
	}
	return title;
}

mtCTaskCreateNewVillage.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskCreateNewVillage.prototype.canRun = function() {
	return true;
}

mtCTaskCreateNewVillage.prototype.setup = function(pos) {
	var	div;
	var	table, tr, td;
	var	tmp;
	var	i, j;
	var	opt;
	
	if(this.vSetupBox == null) {		
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);

		tmp = document.createElement("span");
		tmp.textContent = "X:";
		div.appendChild(tmp);

		tmp = document.createElement("input");
		this.vTargetX = tmp;
		tmp.size = 4;
		div.appendChild(tmp);

		tmp = document.createElement("span");
		tmp.textContent = "Y:";
		div.appendChild(tmp);

		tmp = document.createElement("input");
		this.vTargetY = tmp;
		tmp.size = 4;
		div.appendChild(tmp);


		tmp = document.createElement("hr");
		div.appendChild(tmp);
		
		tmp = document.createElement("span");
		tmp.textContent = "Reserve: ";
		div.appendChild(tmp);
		this.vReserveRes = new Array(4);
		for(i = 0; i < 4; i++) {
			tmp = document.createElement("img");
			tmp.className = "res";
			tmp.src = "img/un/r/" + (i + 1) + ".gif";
			div.appendChild(tmp);
			
			tmp = document.createElement("span");
			tmp.textContent = "750";
			div.appendChild(tmp);
		}
		
		tmp = document.createElement("br");
		div.appendChild(tmp);
		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}

	if(this.config != null)
	{
		this.vTargetX.value = this.config.targetX;
		this.vTargetY.value = this.config.targetY;	
	}
                                                                                                                                   
	div.style.display = "";
}       

mtCTaskCreateNewVillage.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	var	target;
	var	sel;
	
	config = new Object();
	config.reserveRes = new Array(4);
	for(i = 0; i < 4; i++) {
		config.reserveRes[i] = 750;
	}
	config.targetX = this.vTargetX.value;
	config.targetY = this.vTargetY.value;
	
	if(this.config == null)
		this.message = "Idle";
	this.config = config;	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskCreateNewVillage.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskCreateNewVillage.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskCreateNewVillage.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskCreateNewVillage.prototype.isRunning = function() {
	return this.running;
}

mtCTaskCreateNewVillage.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskCreateNewVillage.prototype._initVisual = function() {
	this.vSetupBox = null;
}


mtCTaskCreateNewVillage.prototype._recheck = function(options) {
	var	b;
	var	url;
	
	if(options != this.async_seq)
		return;
	
	b = this.schedule.getTown().getBuildings(MTB_RALLY_POINT);
	
	if(b.length == 0) {
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[MTB_RALLY_POINT] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			60 * 60 * 1000);
		return;
	}
	else {
		
		//url = 'karte.php?xp=' + this.config.targetX + '&yp=' + this.config.targetY ;   
		url = 'a2b.php?newdid=' + this.schedule.getTown().townId + '&id=' + mtPosXYToId(this.config.targetX, this.config.targetY) + "&s=1";		
		mtOOGet(url, this, this._getKarte, ++this.async_seq);		
		this.message = '[' + new Date().toMTString() + '] 正在搜尋 (' + this.config.targetX + '|' + this.config.targetY +')';
		this.schedule.updateTask(this.objId);
		return;
	}
}

mtCTaskCreateNewVillage.prototype._getKarte = function(req, options) {
	var	i, idx;
	var	url;
	var	html;
	var 	re, tmp, tmp1 ,tmp2, data, fdata;
	
	if(options != this.async_seq)
		return;
	

	html = req.responseText;
	re = new RegExp('btn_ok');
	tmp = html.match(re);
	
	if(tmp==null)
	{
		this.message = '['+ new Date().toMTString() + '] 輸入座標有誤或開拓者/文明點不足 ';
		//mtSetTimeout(this, this._recheck, ++this.async_seq,
		//	60 * 60 * 1000);
			this.stop;
		return;
	}
	else
	{
		
		tmp1 = html.match(/<input type="hidden" name=".*?" value=".*?" \/>/g);
		if(tmp1 == null) {
			this.stop;
			return;
		}

		data = "";
		fdata = new Object();
		for(i = 0; i < tmp1.length; i++) {
			tmp2 = tmp1[i].match(/name="(.*?)" value="(.*?)"/);
			data += "&" + encodeURIComponent(tmp2[1]) + "=" + encodeURIComponent(tmp2[2]);
			fdata[tmp2[1]] = tmp2[2];
		}
		data = data.substr(1);	
		mtDev(data);
		this.message = '['+ new Date().toMTString() + '] 已派出開拓者>>>尋找新村莊(' + this.config.targetX + '|' + this.config.targetY +')';
		mtOOPostSoon(
			"build.php?newdid=" + this.schedule.getTown().getId(),
			data,
			this, this._post_send, ++this.async_seq);
		mtLog('尋找新村莊(' + this.config.targetX + '|' + this.config.targetY +')');
		return;		
	}

}

mtCTaskCreateNewVillage.prototype._post_send = function(req, options) {
	var	html;
	
	if(options != this.async_seq)
		return;
	
	try {
		if(req.status != 200) {	// error!
			mtUnexpected("build.php?newdid=" + this.schedule.getTown().getId() + " : " + req.status);
			return;
		}
		html = req.responseText;
	} catch(e) {
		mtUnexpected("build.php?newdid=" + this.schedule.getTown().getId() + " : " + e);
		return;
	}
	
	mtParseGlobal(req);
	
	if(!this.schedule.getTown().checkTownPage(html)) {
		this._recheck(++this.async_seq);
		return;
	}	
	this.schedule.updateTask(this.objId);
	this._recheck(++this.async_seq);
}



/* ==== class mtCTaskCreateNewVillage ==== */






/* ==== class mtCTaskDestoryBuilding ==== */
function mtCTaskDestoryBuilding(task_type, schedule) {
	this.objId = mtNewId();
	this.schedule = schedule;
	this.taskType = task_type;
	
	this.building = MTB_MAIN_BUILDING;
	
	this.message = '<span style="color: red;">尚未設定<span>';
	this.running = false;
	
	this.async_seq = 0;	// for avoid asynchronize execution conflict
	
	this.config = new Object();
	this.config.target = new Array();	
}

mtCTaskDestoryBuilding.prototype.getObjId = function() {
	return this.objId;
}

mtCTaskDestoryBuilding.prototype.loadConfig = function(config) {
	var	type;
	var	cf;
	var	target;
	var	i;
	
	config = config.split(",");
	mtDev("11572" + config);
	for(cf = 0; cf < config.length; cf++)
		config[cf] = unescape(config[cf]);
	if(config.length < 2)
		return false;
	type = parseInt(config[0]);
	
	if(this.config != null) {
		// TODO
	}
	this.taskType = type;
	this.config = null;
	cf = new Object();
	cf.destoryTarget = parseInt(config[2]);
	cf.destoryName = config[3];
	this.config = cf;	
	
	if(config[1] == "true") {
		this.run();
	} else {
		this.message = "Idle";
		this.stop();
	}
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	return true;
}

mtCTaskDestoryBuilding.prototype.saveConfig = function() {
	//mtDev("6632 mtCTaskDestoryBuilding.prototype.saveConfig");
	this.schedule.saveConfig();
}

mtCTaskDestoryBuilding.prototype.getConfig = function() {
	var	config;
	var	i;
	
	config = escape(this.taskType);
	//mtDev("6541 config = " + config );
	config += "," + escape(this.running);

	if(this.config == null)
		return config;

	config += "," + escape(this.config.destoryTarget);
	config += "," + escape(this.config.destoryName);
	return config;
}

mtCTaskDestoryBuilding.prototype.getTitle = function() {
	var	title;
	var	i;
	
	//title = "Booked upgrade:";
	title = "拆除建築";
	if(this.config != null) {
	
			title += "<br>#" + this.config.destoryTarget + ":" + this.config.destoryName;
		
	}
	return title;
}

mtCTaskDestoryBuilding.prototype.getHTMLMessage = function() {
	return this.message;
}

mtCTaskDestoryBuilding.prototype.canRun = function() {
	return true;
}

mtCTaskDestoryBuilding.prototype.setup = function(pos) {
	var	div;
	var	table, tr, td;
	var	tmp;
	var	i, j;
	var	opt;
	var	town;
	
	
	//mtDev("10423");
	if(this.vSetupBox == null) {		
		div = document.createElement("div");
		this.vSetupBox = div;
		div.style.position = "absolute";
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
		div.setAttribute("town_id", this.schedule.getTown().getObjId());
		div.setAttribute("schedule_id", this.schedule.getObjId());
		div.setAttribute("task_id", this.objId);
		div.style.zIndex = 100;
		div.style.padding = "4px";
		div.style.border = "2px groove pink";
		div.style.backgroundColor = "snow";
		document.body.appendChild(div);

		
		
		tmp = document.createElement("span");
		div.appendChild(tmp);
		tmp = document.createElement("select");
		this.vDestoryTarget = tmp;
		town = this.schedule.getTown();
		for(i = 18; i < 40; i++) {
			if(town.building[i].getType()!=MTB_EMPTY)
			{
			opt = document.createElement("option");
			opt.value = (i+1);
			opt.text = "#"+(i+1)+": " + mtBuildingName[town.building[i].type] + "(Lv." + town.building[i].level +")";		
			tmp.add(opt, null);
			}
		}		
		div.appendChild(tmp);

/*
		tmp = document.createElement("span");
		tmp.textContent = "Until LV.";
		div.appendChild(tmp);

		tmp = document.createElement("input");
		tmp.type = "text";
		tmp.size = 2;
		this.vUpgradeLevel = tmp;
		div.appendChild(tmp);
*/
		tmp = document.createElement("hr");
		div.appendChild(tmp);
		

		
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[OK]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.applySetup();
		}, false);
		div.appendChild(tmp);
		tmp = document.createElement("a");
		tmp.href = "javascript:void(0);";
		tmp.textContent = "[Cancel]";
		tmp.addEventListener("click", function(ev) {
			var	obj;
			
			obj = mtUser.lookupTown(mtGetAttribute(ev.target, "town_id"));
			obj = obj.lookupSchedule(mtGetAttribute(ev.target, "schedule_id"));
			obj = obj.lookupTask(mtGetAttribute(ev.target, "task_id"));
			obj.cancelSetup();
		}, false);
		div.appendChild(tmp);
		
	} else {
		div = this.vSetupBox;
		div.style.left = "" + pos[0] + "px";
		div.style.top = "" + pos[1] + "px";
	}
//		mtDev("10508");
	tmp = this.schedule.getTown().getBuildings(this.building);                                                                                                  
		if(tmp.length > 0) {                                                                                                                                
			tmp[0].queryInfo(0, this, this._setup1, null);                                                                                              
		} else {                                                                                                                                            
			//this.message = '<span style="color: red;">[' + new Date().toMTString() + '] Unable to locate' + mtBuildingName[this.building] + '</span>';
			this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '</span>';           
			this.schedule.updateTask(this.objId);                                                                                                       
	}                                                                                                                                                   
	div.style.display = "";
	//mtDev("10518");
}       
        

mtCTaskDestoryBuilding.prototype.applySetup = function(pos) {
	var	config;
	var	i;
	var	target;
	var	sel;
	
	config = new Object();
	config.destoryTarget = this.vDestoryTarget[this.vDestoryTarget.selectedIndex].value;
	config.destoryName   = mtBuildingName[this.schedule.getTown().building[parseInt(config.destoryTarget)-1].type];
		
	if(this.config == null)
		this.message = "Idle";
	this.config = config;
	//this.message = this.vUpgradeType.options[this.vUpgradeType.selectedIndex].text + " LV" + this.config.UpgradeLevel ;
	
	this.schedule.updateTask(this.objId);
	this.saveConfig();
	this.cancelSetup();
}

mtCTaskDestoryBuilding.prototype.cancelSetup = function(pos) {
	this.vSetupBox.style.display = "none";
}

mtCTaskDestoryBuilding.prototype.run = function() {
	if(this.running)
		return;
	this.running = true;
	
	this.saveConfig();
	
	this._recheck(++this.async_seq);
}

mtCTaskDestoryBuilding.prototype.stop = function() {
	if(!this.running)
		return;
	++this.async_seq;	// Avoid asynchronize operation continuing
	this.message = "Idle";
	this.running = false;
	this.saveConfig();
	this.schedule.updateTask(this.objId);
}

mtCTaskDestoryBuilding.prototype.isRunning = function() {
	return this.running;
}

mtCTaskDestoryBuilding.prototype.remove = function() {
	if(this.running)
		this.stop();
}

// --> private functions
mtCTaskDestoryBuilding.prototype._initVisual = function() {
	this.vSetupBox = null;
}


mtCTaskDestoryBuilding.prototype._recheck = function(options) {
	var	b;
	var data;
	
	
	mtDev("11808 mtCTaskDestoryBuilding.prototype._recheck");
	
	if(options != this.async_seq)
		return;
	
	mtDev("11814");
	if(this.schedule.getTown().building[this.config.destoryTarget].type == MTB_EMPTY)
	{
		mtDev("11817");
		this.stop();		
	  return;
	}
	mtDev("11821");
	b = this.schedule.getTown().getBuildings(this.building);
	
	if(b.length == 0) {
		this.message = '<span style="color: red;">[' + new Date().toMTString() + '] 村莊內無法找到' + mtBuildingName[this.building] + '. Retry in 0:10:00.</span>';
		this.schedule.updateTask(this.objId);
		mtSetTimeout(this, this._recheck, ++this.async_seq,
			10 * 60 * 1000);
		return;
	}
	else if(this.schedule.getTown().building[this.config.destoryTarget].level > 0) {
		mtDev("11830");
		
	  
	  data = "a=" +  this.schedule.getTown().getId() + "&gid=15&abriss=" + this.config.destoryTarget;			
		mtDev("11835 data = " + data );
		this.message = '[' + new Date().toMTString() + '] 拆除中' ;		
		mtOOPostSoon(
			"build.php?newdid=" + this.schedule.getTown().getId(),
			data,
			this, this._post_send, ++this.async_seq);		
		return;
	}

}

mtCTaskDestoryBuilding.prototype._post_send = function(req, options) {
	var	t;
	var tmp, tmp2;
	var html;
	var re;

	mtParseGlobal(req);
	
	if(options != this.async_seq)
		return;
	
	html = req.responseText;
	
	/*
				<td>
					山洞 (等級 9)
				</td>
				<td>
					<span id=timer1>0:17:26</span> 小時
				</td>

				<td>
					完成在 22:19</span><span> 	
	*/
	
	re = RegExp('<td>\\r*\\n*\\s*'+ this.config.destoryName + '(.*\\r*\\n*){3}\\s+<span \\S+>\\d+:\\d+:\\d+');	
	tmp = html.match(re);
	tmp2 = tmp[0].match(/(\d+):(\d+):(\d+)/);
	
	t = ((parseInt(tmp2[1])*60 + parseInt(tmp2[2]))*60 + parseInt(tmp2[3]))*1000;
	mtDev("11870");
	this.schedule.message = '[' + new Date().toMTString() + '] 等待'+tmp2[1]+':'+tmp2[2]+':'+tmp2[3];	
	mtSetTimeout(this, this._recheck, ++this.async_seq, t);
	return;
}

/* ==== class mtCTaskDestoryBuilding ==== */



























/*

TodoList:
. AutoFS. (really needed?)
=============================================================================================
Last update time: 2010/02/17 C3.0.2
Fix the bad autoupgrade prvent code 

=============================================================================================
Last update time: 2010/02/17 C3.0.1


=============================================================================================
Last update time:  2010/01/20 C3.0.0
1. Fix T3.6 building/Party problem,
2. Start to Add more relative AI pattern.

=============================================================================================
Last update time: 2009/12/02 1713 C2.1.0
1. For T3.6

=============================================================================================
Last update time: 2009/11/07 1440 C2.0.0
1. enhance the automatic upgrade
2. Auto destory building

=============================================================================================
Last update time: 2009/11/06 1545 C1.9.0
1. Fix the wall and rally-point upgrade bug.(lv0->lv1)
2. try to fix the trapper bug
3. party fixed.

=============================================================================================
Last update time: 2009/11/06 1545 C1.8.0
1.Fix village no force bug.
2.Fix Celebration bug.

=============================================================================================
Latest update time: 2009/10/12 1032 C1.7.0
1.Add army force in each village.

=============================================================================================
Latest update time: 2009/10/12 1032 C1.6.0
1.Fix auto building & barrack producing

=============================================================================================
Last update time: 2009/08/31 1339 C1.4.0
1.Merge auto upper bound version in barrack building function.
2.Add Repeat counter in Army sender.
3.Add auto stop ratio in Army sender.
4.Turn the tracing block point in resource manager.

=============================================================================================
Late update time : 2009/08/18 1613 C1.3.0
1.add automatic create new village.

=============================================================================================
Late update time : 2009/08/18 1613 C1.2.0
1.add auto armoury & blacksmith upgrade

=============================================================================================
Last update time : 2009/08/13 0000 C1.1.3
1.ADD auto farm sheep & fix autodelay bug
2.ADD kata/kata2/spy in army sender


=============================================================================================
Last update time : 2009/08/13 0000 C1.1.0
1.ADD auto farm sheep


=============================================================================================
Last update time : 2009/07/16 0000 C1.0.1
1.ADD percentage view within resource

=============================================================================================
Last update time : 2009/07/16 0000 C1.0.0
1.fix the save function for army sender & resource sender

=============================================================================================
Latest update time: 2009/07/14 1829 C0.5.3
1. add atk record


=============================================================================================
Latest update time: 2009/07/14 1829 C0.5.2
1. fix auto upgrade & empty parse build

=============================================================================================
Latest update time: 2009/07/14 1829 C0.5.1
1. 

=============================================================================================
Latest update time: 2009/07/14 0000 C0.5.0
1. restart logger.

=============================================================================================
Latest update time: 2009/07/13 1400 C0.4.9
1. Add cyclic resource sender, no auto delay function.
2. Add random time division between army sender.

=============================================================================================
Latest update time: 2009/07/13 1400 C0.4.8
1. Add attack status in layout

=============================================================================================
Latest update time: 2009/07/10 0912 C0.4.7
1. Resource Name fixed TO area.


=============================================================================================
Latest update time: 2009/07/10 0912 C0.4.6
1. Resource Name fixed.


=============================================================================================
Latest update time: 2009/07/10 0912 C0.4.5
1. Army Sender fixed


=============================================================================================
Latest update time: 2009/07/10 0912 C0.4.4
1.Fix producee quentity limit

=============================================================================================
Latest update time: 2009/07/10 0050 C0.4.3
1.TWX new release, army sender not fixed.


=============================================================================================
Latest update time: 2009/07/10 0050 C0.4.2
1.TWX new release, only army builder fixed.


=============================================================================================
Latest update time: 2009/07/09 1431 C0.4.1
1.Add troop moving brief in management layout
2.Add attacking status changing log.

=============================================================================================
Latest update time: 2009/07/09 1431 C0.4.0
1.Modify interface into Traditional Chinese pack.
2.Modify layout
3.add different resource management pack.

=============================================================================================
Latest update time: 2009/06/23 1603 T0.3.3
1.Add Roam Horse Drinking Trough
2.Fix auto dealy in Troop Sender

=============================================================================================
Latest update time: 2009/06/23 1603 T0.3.3
1.Add Roam Horse Drinking Trough
2.Fix auto dealy in Troop Sender

=============================================================================================
Latest update time: 2009/06/10 1741 R0.3.2
1.Add new general rally point view.

=============================================================================================
Latest update time: 2009/06/10 1741 R0.3.0
1.Add Auto adjust delay time for Troop Sender

=============================================================================================
Latest update time: 2009/06/06 2030 R0.2.8
1. Add refresh point after build troop & send resource.

=============================================================================================
Latest update time: 2009/06/05 2323 R0.2.6
1. Fix Resource Manager.
   To Fix up the Automatic resourcebalancer, change the trigger criteria.
2. Conbinded with mtUserRace with troop type, and add a new option for spy type in setup menu.

=============================================================================================

1. modify & fix the length problem of task content
2. Modify the 3053 markup within mtUserRace

=============================================================================================
Latest update time: 2009/06/04 1646 R0.2.4
1. Fix the town working information.
2. Line 3053 mark up the MTUE_TOWN_BUSY 
   For Roam, to check if there still available building process can be achieve.
   Should modify the checking rule, get the target page again, if not available, return [MTUE_TOWN_BUSY];
3. Add the more precise schedule army sender.

=============================================================================================
Latest update time: 2009/06/04 0005 R0.2.3
1. Fix the query error in residence

=============================================================================================
Latest update time: 2009/06/03 1644 R0.2.2ATK
1. Fix up the insufficient resource issue.

=============================================================================================
Latest update time: 2009/06/03 1230 R0.2.1ATK
1. Activate auto send army.
2. Add troops img for each races in config page.

=============================================================================================
Latest update time: 2009/06/02 2322 R0.2.0S
1. Line 3750, add the trigger point for build troop in residence & palace.
2. Line 1591, add default value for mtCTown.prototype.cancelResourceManagerConfig and default start.


=============================================================================================
Latest update time: 2009/06/02 1357 R0.1.1
1.fixed up the syntex of _transferResource_parse_build 


=============================================================================================
Latest update time: 2009/06/02 1243 R0.1.0

1.add the mtDev function for dev tracing mode.
2.bind the auto army sender class into current version.
3.still trying to figure out the send resource problem.
4.suggest try to build up the different races account for testing.

*/
