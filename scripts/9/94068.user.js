var metadata=<> 
// ==UserScript==
// @name           Wein Alarm
// @namespace      http://userscripts.org/scripts/show/94068
// @include        http://s*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0t
// @updater:script http://userscripts.org/scripts/source/94068.user.js
// @updater:meta   http://userscripts.org/scripts/source/94068.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Lokalisierung
var languages = {
	de: {
		"alarm": "Dein Weinvorrat in ",
		"alarm2": " reicht nurnoch für ",
		"day": " Tag",
		"days": " Tage",
		"hour": " Stunde",
		"hours": " Stunden",
		"minute": " Minute",
		"minutes": " Minuten",
		"less": "weniger als ",
		"titel": "Wein Alarm",
		"prod": "Stundenproduktion",
		"settings_header": "Wein Alarm Einstellungen",
		"settings_show1": "Restzeit in der Seitenleiste",
		"settings_show2": "Alarm per Popup",
		"settings_position": "Position der Box:",
		"settings_pos0": "Oben",
		"settings_pos1": "Unten",
		"settings_show": "Anzeigen in/auf",
		"settings_city": "Stadt:",
		"settings_foreigncity": "Fremde Stadt:",
		"settings_relatedCity": "Fremde Stadt - Militär:",
		"settings_upgrade": "Gebäudeansicht:",
		"settings_building": "Leere Bauplatz",
		"settings_transport": "Transportieren:",
		"settings_deployment": "Stationieren:",
		"settings_world": "Weltkarte:",
		"settings_island": "Insel:",
		"settings_mine": "Rohstoffquellen:",
		"settings_agora": "Agora:",
		"settings_spyMissions": "Spionieren:",
		"settings_tradeAdvisor": "Städteberater:",
		"settings_militaryAdvisor": "Militärberater:",
		"settings_researchAdvisor": "Forschungsberater:",
		"settings_diplomacyAdvisor": "Diplomatieberater:",
		"settings_highscore": "Highscore:",
		"settings_options": "Optionen:",
		"settings_premiumTrader": "Ambrosia Rohstoffe tauschen:",
		"save": "Speichern!",
		"saved": "Einstellungen gespeichert.",
		"ok": "OK"
	},
	ae: { //arabic
		"alarm": "مخزون العنب في ",
		"alarm2": " سيدوم فقط لمدة ",
		"day": " يوم",
		"days": " أيام",
		"hour": " ساعة",
		"hours": " ساعات",
		"minute": " دقيقة",
		"minutes": " دقائق",
		"less": "أقل من ",
		"titel": "تنبيه كميات العنب",
		"prod": "الإنتاج في الساعة", // Tooltip Text when hovering over the Ressource-Icons, for identifying the production values
		"settings_header": "خيارات تنبيه العنب",
		"settings_show1": "أظهار الأوقات المتبقية للعنب في القائمة الجانبية",
		"settings_show2": "تنبيه",
		"settings_position": "مكان مربع التنبيه:",
		"settings_pos0": "الأعلي",
		"settings_pos1": "الأسفل",
		"settings_show": "أين سيظهر",
		"settings_city": "المدينة:",
		"settings_foreigncity": "المدن الأجنبية:",
		"settings_relatedCity": "المدن الأجنبيه - العرض العسكري:",
		"settings_upgrade": "المباني:",
		"settings_building": "الأماكن الفارغة للبناء",
		"settings_transport": "النقل:",
		"settings_deployment": "الهجوم:",
		"settings_world": "خريطة العالم:",
		"settings_island": "الجزيرة:",
		"settings_mine": "الموارد:",
		"settings_agora": "منتدي الجزيرة:",
		"settings_spyMissions": "مهمات الجاسوس:",
		"settings_tradeAdvisor": "مستشار المدن:",
		"settings_militaryAdvisor": "مستشار الجيش:",
		"settings_researchAdvisor": "مستشار الأبحاث:",
		"settings_diplomacyAdvisor": "مستشار الدبلوماسية:",
		"settings_highscore": "الأرقام القياسية:",
		"settings_options": "خيارات:",
		"settings_premiumTrader": "تبادل الموارد للحساب المتميز:",
		"save": "حفظ !",
		"saved": "تم حفظ الخيارات",
		"ok": "حسناً"
	},
	en: {
		"alarm": "Your stock in ",
		"alarm2": " lasts only for ",
		"day": " day",
		"days": " days",
		"hour": " hour",
		"hours": " hours",
		"minute": " minute",
		"minutes": " minutes",
		"less": "less than ",
		"titel": "Wine Alarm",
		"prod": "Hourly production",	// Tooltip Text when hovering over the Ressource-Icons, for identifying the production values
		"settings_header": "Wine Alarm Settings",
		"settings_show1": "Show remaining time in sidebar",
		"settings_show2": "Popup-Alarm",
		"settings_position": "Box position:",
		"settings_pos0": "Top",
		"settings_pos1": "Bottom",
		"settings_show": "Where to show",
		"settings_city": "City:",
		"settings_foreigncity": "Foreign city:",
		"settings_relatedCity": "Foreign city - military:",
		"settings_upgrade": "Building:",
		"settings_building": "Empty buildplace",
		"settings_transport": "Transport:",
		"settings_deployment": "Deployment:",
		"settings_world": "Worldmap:",
		"settings_island": "Island:",
		"settings_mine": "Ressource:",
		"settings_agora": "Island board:",
		"settings_spyMissions": "Espionage:",
		"settings_tradeAdvisor": "Trade advisor:",
		"settings_militaryAdvisor": "Military advisor:",
		"settings_researchAdvisor": "Research advisor:",
		"settings_diplomacyAdvisor": "Diplomacy advisor:",
		"settings_highscore": "Highscore:",
		"settings_options": "Options:",
		"settings_premiumTrader": "Premium trader:",
		"save": "Save!",
		"saved": "Settings saved.",
		"ok": "OK"
	}
};

var ausschank = { 0:   0,
		  1:   4,
		  2:   8,
		  3:   13,
		  4:   18,
		  5:   24,
		  6:   30,
		  7:   37,
		  8:   44,
		  9:   51,
		 10:   60,
		 11:   68,
		 12:   78,
		 13:   88,
		 14:   99,
		 15:  110,
		 16:  122,
		 17:  136,
		 18:  150,
		 19:  165,
		 20:  180,
		 21:  197,
		 22:  216,
		 23:  235,
		 24:  255,
		 25:  277,
		 26:  300,
		 27:  325,
		 28:  351,
		 29:  378,
		 30:  408,
		 31:  439,
		 32:  472,
		 33:  507,
		 34:  544,
		 35:  584,
		 36:  626,
		 37:  670,
		 38:  717,
		 39:  766,
		 40:  818,
		 41:  874,
		 42:  933,
		 43:  995,
		 44: 1060,
		 45: 1129,
		 46: 1202,
		 47: 1278
		};
		
var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['en'];
var page = getPage(href);

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

var store = server+"_"+lang;

var taverns = loadArray(GM_getValue(store+'-taverns',''));
var winestock = loadArray(GM_getValue(store+'-stock',''));
var wineprod = loadArray(GM_getValue(store+'-prod',''));
var lastupdate = loadArray(GM_getValue(store+'-update',''));
var mute = GM_getValue(store+'-mute',-1);
var show1 = GM_getValue(store+'-show1',false);
var show2 = GM_getValue(store+'-show2',true);
var alertimg = "data:image/png;base64,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%3D%3D";
var closeimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY7wJJwSCwahwvRsRS4HCkAAMFYmXQ8RYNEoHBgiByFRRAoIB8bknrUKGkKEQYCwQgRIAcDKDEYJD4ZB0EAOw%3D%3D";
var openimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY9wEPmkxgMEiDDAUIIMRAIRqSgKTVGpOzmsSh5CwGBRcHxejEOhUBiMHs9nUnF7SUAABS69xLQe0VdfoKCQQA7";
var hidden = GM_getValue(store+'-hide',false);
var position = GM_getValue(store+"-position",0);
var showOnPage = loadObject(GM_getValue(store+'-showOnPage','({"city": true,"foreigncity": true,"relatedCity": true,"upgrade": true,"building": true,"transport": true,"deployment": true,"world": true,"island": true,"agora": true,"mine": true,"spyMissions":true,"tradeAdvisor": true,"militaryAdvisor": true,"researchAdvisor": true,"diplomacyAdvisor": true,"highscore": true,"options": true,"premiumTrader":true})'));

if(show1) {
	var upgrade = document.getElementById('buildingUpgrade');
	var buildings = document.getElementById('buildings');
	var city = document.getElementById('locations');
	var info = document.getElementById('information');
	var upgrd = document.getElementById('buildingUpgrade');
	var backto = document.getElementById('backTo');
	var island = document.getElementById('island');
	var tradeAdvisor = document.getElementById('tradeAdvisor');
	if(!tradeAdvisor)
		tradeAdvisor = document.getElementById('tradeAdvisorTradeRoute');
	var militaryAdvisor = document.getElementById('militaryAdvisorMilitaryMovements');
	if(!militaryAdvisor)
		militaryAdvisor = document.getElementById('militaryAdvisorCombatReports');
	if(!militaryAdvisor)
		militaryAdvisor = document.getElementById('militaryAdvisorCombatReportsArchive');
	if(!militaryAdvisor)
		militaryAdvisor = document.getElementById('militaryAdvisorReportView');
	var researchAdvisor = document.getElementById('researchAdvisor');
	var diplomacyAdvisor = document.getElementById('diplomacyAdvisor');
	if(!diplomacyAdvisor)
		diplomacyAdvisor = document.getElementById('diplomacyAdvisorOutBox');
	if(!diplomacyAdvisor)
		diplomacyAdvisor = document.getElementById('diplomacyAdvisorTreaty');
	if(!diplomacyAdvisor)
		diplomacyAdvisor = document.getElementById('diplomacyAdvisorAlly');
	var world = document.getElementById('worldmap_iso');
	var highscore = document.getElementById('highscore');
	if(!highscore)
		highscore = document.getElementById('allyHighscore');
	var options = document.getElementById('options');
	var deployment = document.getElementById('deployment');
	var send = document.getElementById('sendIKMessage');
	var mine = document.getElementById('resource');
	if(!mine)
		mine = document.getElementById('tradegood');
	var agora = document.getElementById('islandBoard');
	var foreigncity;
	var relatedCity = document.getElementById('relatedCities');
	var spyMissions = document.getElementById('spyMissions');
	var premiumTrader = document.getElementById('premiumTrader');
	var show = false;

	if(info && city) {
		if(info.innerHTML.search(/<li class="owner">/) == -1 && showOnPage["city"])
			show=true;
		else if(showOnPage["foreigncity"]) {
			foreigncity = city;
			show=true;
		}
	}
	else if(upgrd && showOnPage["upgrade"]) {
		show=true;
	}
	else if(document.getElementById('transportGoods') && showOnPage["transport"]) {
		info=backto;
		show=true;
	}
	else if(island && showOnPage["island"]) {
		show=true;
	}
	else if(tradeAdvisor &&  showOnPage["tradeAdvisor"]) {
		show=true;
	}
	else if(militaryAdvisor &&  showOnPage["militaryAdvisor"]) {
		show=true;
	}
	else if(researchAdvisor &&  showOnPage["researchAdvisor"]) {
		show=true;
	}
	else if(diplomacyAdvisor &&  showOnPage["diplomacyAdvisor"]) {
		show=true;
	}
	else if(world &&  showOnPage["world"]) {
		show=true;
	}
	else if(highscore &&  showOnPage["highscore"]) {
		show=true;
	}
	else if(options &&  showOnPage["options"]) {
		show=true;
	}
	else if(deployment && showOnPage["deployment"]) {
		show=true;
	}
	else if(mine && showOnPage["mine"]) {
		show=true;
	}
	else if(agora && showOnPage["agora"]) {
		show=true;
	}
	else if(relatedCity && showOnPage["relatedCity"]) {
		show=true;
	}
	else if(spyMissions && showOnPage["spyMissions"]) {
		show=true;
	}
	else if(premiumTrader && showOnPage["premiumTrader"]) {
		show=true;
	}
	
	if(show) {
		var alarmbox = document.createElement('div');
		alarmbox.setAttribute('id','weinalarm');
		alarmbox.setAttribute('class','dynamic');
		alarmbox.innerHTML = "<h3 class=\"header\" id=showHideWeinAlarm><img style='display:inline' id=\""+(hidden?"showWeinAlarm":"hideWeinAlarm")+"\" src=\""+(hidden?openimg:closeimg)+"\"> "+language["titel"]+"</h3>";

		var alarmboxContent = document.createElement('div');
		alarmboxContent.setAttribute('class','content');
		alarmboxContent.setAttribute('id','weinalarmContent');
		if(hidden)
			alarmboxContent.style.display = "none";

		var citys = getCityNames();
		for(var i in citys) {
			if(taverns[i]!=null && winestock[i] != null && lastupdate[i] != null && taverns[i]!=-1 && winestock[i] != -1 && lastupdate[i] != -1) {
				if (wineprod[i] == null)
					wineprod[i] = 0;

				var curwine = calcWine(winestock[i], taverns[i], wineprod[i], lastupdate[i]);
				if(parseInt(taverns[i])-parseInt(wineprod[i]) > 0) {
					var time = Math.ceil(curwine/(parseInt(taverns[i])-parseInt(wineprod[i])));

					var color="";
					if(time<=24)
						color="; color: #AB0000";

					alarmboxContent.innerHTML += "<p style='text-align:left; line-height: 18px; margin: auto 7px"+color+"'><b>"+citys[i]+"</b></p><p style='text-align:right; line-height: 18px; margin: -18px 7px"+color+"'>("+makeTime(time)+")</p><br style='line-height: 18px'>"
				}
				else
					alarmboxContent.innerHTML += "<p style='text-align:left; line-height: 18px; margin: auto 7px'><b>"+citys[i]+"</b></p><p style='text-align:right; line-height: 18px; margin: -18px 7px'>(&#8734;)</p><br style='line-height: 18px'>"
			}
			else
				alarmboxContent.innerHTML += "<p style='text-align:left; line-height: 18px; margin: auto 7px'><b>"+citys[i]+"</b></p>"
		}

		alarmbox.appendChild(alarmboxContent);

		alarmbox.innerHTML += "<div class=\"footer\"></div>";
		var bread = document.getElementById('breadcrumbs');
		if(position == 0)
			bread.parentNode.insertBefore(alarmbox, bread.nextSibling);
		else
			bread.parentNode.insertBefore(alarmbox, document.getElementById("mainview"));

		document.getElementById('showHideWeinAlarm').addEventListener('click',showHide,true);
	}
}

function showHide() {
	var showWeinAlarm = document.getElementById('showWeinAlarm');
	var hideWeinAlarm = document.getElementById('hideWeinAlarm');
	if(showWeinAlarm) {
		document.getElementById('weinalarmContent').style.display = "block";
		showWeinAlarm.src = closeimg;
		showWeinAlarm.id = "hideWeinAlarm";
		GM_setValue(store+"-hide",false);
	}
	else if(hideWeinAlarm){
		document.getElementById('weinalarmContent').style.display = "none";
		hideWeinAlarm.src = openimg;
		hideWeinAlarm.id = "showWeinAlarm";
		GM_setValue(store+"-hide",true);
	}
}


function makeTime(time) {
	var tage = Math.floor(time/24);
	time = time-tage*24;
	var stunden = Math.floor(time);
	time = time-stunden;
	
	var out = "";
	
	if(tage>0)
		out += tage+"d ";

	if(stunden>9)
		out += stunden+"h";
	else if(stunden>=0)
		out += "0"+stunden+"h";
				
	return out;
}

function weinAlarm() {
	var cities = getCityNames();
	var wine_obj = document.getElementById('value_wine');
	if(wine_obj != null) {
		var wine = parseInt(wine_obj.innerHTML.replace(/\./g,"").replace(/,/g,""));
		var id = getCurrentId();

		for(var pos in winestock) {
			if(cities[pos] === undefined) {
				delete winestock[pos];
			}
		}
		for(var pos in lastupdate) {
			if(cities[pos] === undefined) {
				delete lastupdate[pos];
			}
		}
		for(var pos in wineprod) {
			if(cities[pos] === undefined) {
				delete wineprod[pos];
			}
		}

		winestock[id] = wine;

		if(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].innerHTML.indexOf(language["prod"],0) != -1)
			var w = parseInt(document.getElementById('value_wine').parentNode.getElementsByTagName("span")[2].nextSibling.nodeValue.replace(/\./g, "").replace(/,/g, ""));
		else
			var w = 0;
		
		wineprod[id] = w;

		var t = new Date();
		lastupdate[id] = t.getFullYear()+":"+t.getMonth()+":"+t.getDate()+":"+t.getHours()+":"+t.getMinutes();
		

		GM_setValue(store+'-stock',storeArray(winestock));
		GM_setValue(store+'-prod',storeArray(wineprod));
		GM_setValue(store+'-update',storeArray(lastupdate));
	}


	var bar_obj = document.getElementById('wineAmount');
	if(bar_obj != null) {
		var saved = parseFloat(document.getElementById('savedWine').innerHTML);
		var bar = ausschank[bar_obj.value];
		if(!isNaN(saved))
			bar -= saved;
		var id = getCurrentId();
		for(var pos in taverns) {
			if(taverns[pos] == null)
				taverns[pos] = -1;
		}
		if(cities[pos] === undefined) {
			delete taverns[pos];
		}

		taverns[id] = bar;
		GM_setValue(store+'-taverns',storeArray(taverns));
	}
	
	checkWine();
}

if(page=="options") {
	mySettings();
}

window.addEventListener("load", weinAlarm, false);

function getPage(href) {
	if(href.indexOf("view=options")>=0)
		return "options";
	else if(getPageByContent() == language['options'])
		return "options";
	else
		return "";
}

function getPageByContent() {
	var mainview = document.getElementById('mainview');
	var header = mainview.getElementsByTagName('h1');
	if(header.length < 1)
		return "";
	else 
		return header[0].innerHTML;
}

function ikariamAlert(msg, titel, ok, img, color) {
	var alertbox = document.createElement('div');
	alertbox.setAttribute('id', 'alertbox');
	alertbox.setAttribute('class', 'popupMessage');
	alertbox.setAttribute('style', 'z-index:100000000');

	if(img)
		img = "background-image: url("+img+");";
	else
		img = "";
	if(color)
		color = "background-color: "+color+";";
	else
		color = "";
   	
   	var innerHTML =		"    <div class=\"header headerLeft\"></div>"+
				"    <div class=\"header headerMiddle\">"+
				"         <h3>"+titel+"</h3>"+
				"    </div>"+
				"    <div class=\"header headerRight\"></div>"+
    				"    <div class=\"popupContent\" >"+
    				"	<p class=\"clearboth\">"+
				"                        <div class=\"error\" style='"+img+color+"'> &nbsp;<br/>";
                        
                        
                        
                        

	
	var lines = msg.split("\n");
	
	for(var i=0; i<lines.length; i++)
		innerHTML += 	"<p>"+lines[i]+"</p>";
	
	innerHTML +=		"                        </div>"+
				"        </p>"+
				"        <div class=\"buttons\">"+
          	                "		<div class=\"buttonSingle\">"+
                    		"			<a id=alertboxok class=\"button notice\">"+ok+"</a>"+
               			"		</div>"+
               			"        </div>"+
				"    </div>";
	
	alertbox.innerHTML = innerHTML;
	
	document.getElementById('container2').appendChild(alertbox);
	
	document.getElementById('alertboxok').addEventListener('click', function() {
		document.getElementById('alertbox').style.display = "none";
		document.getElementById('alertboxok').blur();	
	}, true);
}

function mySettings() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'weinalarmOptions');
	
	var check1 = "";
	if(show1)
		check1 = " checked";
	var check2 = "";
	if(show2)
		check2 = " checked";

	var checks = "<tr><th colspan=2><center>"+language['settings_show']+"</center></th></tr>";
	for(var p in showOnPage)
		checks += "<tr><th>"+language['settings_'+p]+"</th><td><input id=weinalarmShow"+p+" type=checkbox"+(showOnPage[p]?" checked":"")+"></td></tr>";

	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table><tr><th>"+language['settings_show1']+"</th><td><input id=weinalarmShow1 type=checkbox"+check1+"></td></tr>"
			       +"<tr><th>"+language['settings_show2']+"</th><td><input id=weinalarmShow2 type=checkbox"+check2+"></td></tr>"
			       +"<tr><th>"+language['settings_position']+"</th><td><select id=weinalarmPosition>"
			       +"<option value=0"+(position==0?" selected":"")+">"+language['settings_pos0']+"</option>"
			       +"<option value=1"+(position==1?" selected":"")+">"+language['settings_pos1']+"</option>"
			       +checks
			       +"</select></td></tr></table><div class=centerButton><input value='"+language["save"]+"' id=weinalarmbutton class=button type=submit></div><div style='text-align: center;' id=weinalarmreturnbox></div></div><div class=footer></div>";
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('weinalarmbutton').addEventListener('click', saveWeinAlarm, true);
}

function saveWeinAlarm() {
	show1 = document.getElementById('weinalarmShow1').checked;
	show2 = document.getElementById('weinalarmShow2').checked;
	showOnPage["city"] = document.getElementById('weinalarmShowcity').checked;
	showOnPage["foreigncity"] = document.getElementById('weinalarmShowforeigncity').checked;
	showOnPage["upgrade"] = document.getElementById('weinalarmShowupgrade').checked;
	showOnPage["transport"] = document.getElementById('weinalarmShowtransport').checked;
	showOnPage["island"] = document.getElementById('weinalarmShowisland').checked;
	showOnPage["tradeAdvisor"] = document.getElementById('weinalarmShowtradeAdvisor').checked;
	showOnPage["militaryAdvisor"] = document.getElementById('weinalarmShowmilitaryAdvisor').checked;
	showOnPage["researchAdvisor"] = document.getElementById('weinalarmShowresearchAdvisor').checked;
	showOnPage["diplomacyAdvisor"] = document.getElementById('weinalarmShowdiplomacyAdvisor').checked;
	showOnPage["world"] = document.getElementById('weinalarmShowworld').checked;
	showOnPage["highscore"] = document.getElementById('weinalarmShowhighscore').checked;
	showOnPage["options"] = document.getElementById('weinalarmShowoptions').checked;
	showOnPage["deployment"] = document.getElementById('weinalarmShowdeployment').checked;
	showOnPage["mine"] = document.getElementById('weinalarmShowmine').checked;
	showOnPage["agora"] = document.getElementById('weinalarmShowagora').checked;
	showOnPage["relatedCity"] = document.getElementById('weinalarmShowrelatedCity').checked;
	showOnPage["building"] = document.getElementById('weinalarmShowbuilding').checked;
	showOnPage["spyMissions"] = document.getElementById('weinalarmShowspyMissions').checked;
	showOnPage["premiumTrader"] = document.getElementById('weinalarmShowpremiumTrader').checked;
	position = document.getElementById('weinalarmPosition').value;

	GM_setValue(store+'-show1',show1);
	GM_setValue(store+'-show2',show2);
	GM_setValue(store+'-position',position);
	GM_setValue(store+'-showOnPage',storeObject(showOnPage));

	document.getElementById('weinalarmreturnbox').innerHTML = language['saved'];
	document.getElementById('weinalarmbutton').blur();
}

function checkWine() {
	var msg = "";
	var citys = getCityNames();
	var ids = getCityIds();
	var max = citys.length;
	
	for(var i=0; i<max; i++) {
		if(taverns[ids[i]]!=null && winestock[ids[i]] != null && lastupdate[ids[i]] != null && taverns[ids[i]]!=-1 && winestock[ids[i]] != -1 && lastupdate[ids[i]] != -1) {
			if (wineprod[ids[i]] == null)
				wineprod[ids[i]] = 0;
				
			var curwine = calcWine(winestock[ids[i]], taverns[ids[i]], wineprod[ids[i]], lastupdate[ids[i]]);
			
			if(parseInt(taverns[ids[i]])-parseInt(wineprod[ids[i]]) > 0) {
				var time = curwine/(parseInt(taverns[ids[i]])-parseInt(wineprod[ids[i]]));

				if(time <= 24) {
					msg += language["alarm"]+citys[ids[i]]+language["alarm2"];
					if(time<1)
						msg += language["less"]+Math.ceil(time)+language["hour"]+"\n";
					else if(time<2)
						msg += Math.floor(time)+language["hour"]+"\n";
					else
						msg += Math.floor(time)+language["hours"]+"\n";
				}
			}
		}
	}
	
	if(msg != "" && !muted(mute) && show2) {
		var d = new Date();
		mute = d.getMinutes();
		GM_setValue(store+'-mute',mute);
		ikariamAlert(msg, language["titel"], language["ok"], alertimg);
	}
}

function muted(mute) {
	if(mute == -1)
		return false;
		
	var d = new Date();
	var min = d.getMinutes();
	
	if(min < mute)
		min = min + 60;

	mute = min - mute;
	
	return (mute<=15);
}

function calcWine(wine, use, prod, time) {
	var t = new Date();
	var t2 = time.split(":");
	
	var hours = hoursBetween(t2[0],t2[1],t2[2],t2[3],t2[4],t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes());
	
	return parseInt(wine)+(parseInt(prod)-parseInt(use))*hours;	
}

function getCurrentId() {
	return document.getElementById('citySelect').value;
}

function getCityIds() {
	var cities = document.getElementById('citySelect').getElementsByTagName('option');
	var result = Array();
	
	for(var i=0; i<cities.length; i++)
		result[i]=cities[i].getAttribute('value');
		
	return result;
}

function getCityNames() {
	var cities = document.getElementById('citySelect').getElementsByTagName('option');
	var result = Array();
	
	for(var i=0; i<cities.length; i++)
		if(cities[i].getAttribute('class').indexOf("deployedCities") == -1 && cities[i].getAttribute('class').indexOf("occupiedCities") == -1)
			result[cities[i].value]=cities[i].innerHTML.replace(/&nbsp;/g," ");
		
	return result;
}

function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	var out;
	if(string == "" || string.indexOf(";") >= 0)
		out = new Object();
	else
		out = eval(string);

	return out;
}

function storeObject(array) {
	return array.toSource();
}

function loadObject(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}

function hoursBetween(jahr,monat,tag,stunde,minute,jahr2,monat2,tag2,stunde2,minute2) {
    var DSTAdjust = 0;
    // constants used for our calculations below
    oneMinute = 1000 * 60;
    var oneHour = oneMinute * 60;
    // equalize times in case date objects have them
    var date1 = new Date();
    date1.setYear(parseInt(jahr));
    date1.setMonth(parseInt(monat));
    date1.setDate(parseInt(tag));
    date1.setHours(parseInt(stunde));
    date1.setMinutes(parseInt(minute));
    date1.setSeconds(0);
    var date2 = new Date();
    date2.setYear(parseInt(jahr2));
    date2.setMonth(parseInt(monat2));
    date2.setDate(parseInt(tag2));
    date2.setHours(parseInt(stunde2));
    date2.setMinutes(parseInt(minute2));
    date2.setSeconds(0);
    // take care of spans across Daylight Saving Time changes
    if (date2 > date1) {
        DSTAdjust = 
            (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * oneMinute;
    } else {
        DSTAdjust = 
            (date1.getTimezoneOffset() - date2.getTimezoneOffset()) * oneMinute;    
    }
    var diff = Math.abs(date2.getTime() - date1.getTime()) - DSTAdjust;
    return Math.round(diff/oneMinute)/60;
}
