// ==UserScript==
// @name        DS_FarmHelper
// @namespace   de.die-staemme
// @version     0.10
// @description This script is automatically pressing the C button on the farm assistent page.
// @downloadURL https://userscripts.org/scripts/source/181372.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @match       http://*.die-staemme.de/game.php?*screen=am_farm*
// @copyright   2013+, Raznarek
// ==/UserScript==

/*
 * IDEEN
 * - statt von unten nach oben von hinten nach vorne
 * - Pause und Resume
 * - BotSchutz-Erkennung
 * - maximale Reichweite/maximal Farmseite angeben
 * - Lauftext beendet sich selbst wieder
 * - anderen Button druecken, wenn kein Spaehbericht vorliegt
 * - automatische Rammenangriffe
 */

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;

$(function(){ //start jquery document ready

//======================================================
//EINSTELLUNGEN (kann vom Benutzer geaendert werden)

var Settings = {
	button : "c", //Button: a | b | c
	alertSound : new Audio("http://www.mediacollege.com/downloads/sound-effects/beep/beep-04.wav")
};
//======================================================

var storage = localStorage;
var storagePrefix="GM_";

//Speicherfunktionen
function storageGet(key,defaultValue) {
	var value= storage.getItem(storagePrefix+key);
	return (value === undefined || value === null) ? defaultValue : value;
	//return GM_getValue(key,defaultValue);
}
function storageSet(key,val) {
	storage.setItem(storagePrefix+key,val);
	//GM_setValue(key,val);
}

//default-werte setzen
storageSet("table_order", storageGet("table_order","distance"));
storageSet("table_dir", storageGet("table_dir","asc"));
storageSet("walk_dir", storageGet("walk_dir","n"));
storageSet("auto_run", storageGet("auto_run","false"));
storageSet("village_end", storageGet("village_end",""));
storageSet("village_end_reached", storageGet("village_end_reached","0"));
storageSet("max_page", storageGet("max_page",""));
storageSet("no_spy_report_button", storageGet("no_spy_report_button",""));

//laeufts, oder laeufts nicht
var autoRun = storageGet("auto_run")==="true";
var autoRunUI={};

//liest die vorhandenen einheiten aus der UI aus und gibt as Ergebnis als Map zurueck
function getUnitInfo() {
	var unitsHome=$("#units_home");
	var units={};
	
	$(".unit-item",unitsHome).each(function(index,obj){
		obj=$(obj);
		units[obj.attr("id")] = { count:parseInt(obj.text()), checked:false };
	});
	$("input[type=checkbox]",unitsHome).each(function(index,obj){
		obj=$(obj);
		units[obj.attr("name")].checked = obj.prop("checked");
	});
	
	return units;
}

//zaehlt die Einheiten aus einer Einheiten-Map zusammen (Ergebnis von getUnitInfo())
function getAvailableUnits(unitInfo) {
	var sum=0;
	for(var unitName in unitInfo) {
		var unit=unitInfo[unitName];
		sum += unit.checked ? unit.count : 0;
	}
	return sum;
}

//prueft, ob die zeile bereits attackiert wird
function isAttacked(row) {
	return $("td:eq(3) img",row).length==1;
}

//prueft, ob ein button in der zeile schon gedrueckt wurde
function canPress(row,name) {
	var button=$("a.farm_icon_"+name,row);
	return button.length==1 && !button.hasClass("farm_icon_disabled");
}

//drueckt den button in der zeile
function press(row,name) {
	$("a.farm_icon_"+name,row).click();
}

//gibt die nummer der farmseite zurueck
function getPageNumber() {
	var res=/&Farm_page=([0-9]*)&/.exec(location.search);
	if(res==null) return 0;
	else return parseInt(res[1]);
}

//gibt die hoechste moegliche farmseite zurueck
function getMaxPageNumber() {
	return $("div.body table tr:last-child a").length+1;
}

//wechselt zur naechsten farmseite, oder wenn noetig, zum naechsten dorf
function nextPage() {
	var current=getPageNumber();
	var total=getMaxPageNumber();
	
	if(storageGet("max_page") != "") {
		total = Math.min(parseInt(storageGet("max_page")) , total);
	}
	
	var nextVillage=false;
	current++;
	if(current>=total) {
		current=0;
		nextVillage=true;
	}
	location.href="/game.php?village="+(nextVillage ? storageGet("walk_dir") : "")+unsafeWindow.game_data.village.id+"&order="+storageGet("table_order")+"&dir="+storageGet("table_dir")+"&Farm_page="+current+"&screen=am_farm";
}

//wechsle zum naechsten dorf
function nextVillage() {
	location.href="/game.php?village="+storageGet("walk_dir")+unsafeWindow.game_data.village.id+"&order="+storageGet("table_order")+"&dir="+storageGet("table_dir")+"&screen=am_farm";
}

//gibt eine zufaellige zahl im Interval [min,max] zurueck
function randomInterval(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//prueft, ob die Seite Bot-Schutz enthaelt
function checkBotProtection() {
	return $("#bot_check").length>0;
}

//zeigt eine laufschrift im titel an
function marqueeTitle(text) {
	var temp=text;
	text="";
	for(var i=0; i<3; i++) {
		text += temp + " +++ ";
	}

	(function tick() {
		document.title = text;
		text=text.substr(1)+text.substr(0,1);
		setTimeout(tick,50);
	})();
}

//spielt einen warn-ton
function playAlertSound() {
	Settings.alertSound.play();
}

function getNotification() {
	return new Notification("DS-Farmassistent: Captcha-Eingabe erforderlich",{
		body : "Botschutz für "+(typeof unsafeWindow != 'undefined' ? unsafeWindow.game_data.player.name : window.game_data.player.name),
		icon : "http://cdn.die-staemme.de/8.17/19124/graphic/icons/farm_assistent.png?e5a99"
	});
}

function showNotification() {
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

	// Let's check if the user is okay to get some notification
	else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		getNotification();
	}

	// Otherwise, we need to ask the user for permission
	// Note, Chrome does not implement the permission static property
	// So we have to check for NOT 'denied' instead of 'default'
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {

			// Whatever the user answers, we make sure Chrome stores the information
			if(!('permission' in Notification)) {
				Notification.permission = permission;
			}

			// If the user is okay, let's create a notification
			if (permission === "granted") {
				getNotification();
			}
		});
	}

	// At last, if the user already denied any notification, and you 
	// want to be respectful there is no need to bother him any more.
}

function startRunning() {   
	var rows = $("div.body > table tr").slice(2,-1);
	var length = rows.length;
	var current = -1;
	
	//einmal pro Farm-Seite:
	//wenn das letzte dorf das enddorf war
	console.log(storageGet("village_end_reached"));
	if(storageGet("village_end_reached") == "1" && unsafeWindow.game_data.village.id+"" != storageGet("village_end")) {
		console.log("stop, reason: end village reached");
		stopRun();
		return;
	}
	//wenn z.Z. das enddorf läuft
	if(unsafeWindow.game_data.village.id+"" == storageGet("village_end")) {
		storageSet("village_end_reached","1");
		console.log("endvillage reached");
	}
	
	(function tick() {
		//wenn's nicht mehr laeuft, dann abbrechen
		if(!autoRun) {
			return;
		}
		
		//wenn keine Einheiten mehr vorhanden sind, zum nächsten Dorf wechseln
		if(getAvailableUnits(getUnitInfo())==0) {
			setTimeout(nextVillage,randomInterval(2000,3000));
			return;
		}
		
		//wenn am ende der farmseite angekommen, dann zur nächsten wechseln
		current ++;
		if(current>=length) {
			setTimeout(nextPage,randomInterval(2000,3000));
			return;
		}
		
		var row=rows.eq(current)
		
		function nothingDone() {
			$("td",row).css("background-color","red");
			setTimeout(tick,randomInterval(5,10));
		}
		
		if(!isAttacked(row)) {
			if(canPress(row,Settings.button)) {
				press(row,Settings.button);
				$("td",row).css("background-color","green");
				setTimeout(tick,randomInterval(500,1500));
			} else if(storageGet("no_spy_report_button") !== "" && canPress(row,storageGet("no_spy_report_button"))) {
					press(row,storageGet("no_spy_report_button"));
					$("td",row).css("background-color","blue");
					setTimeout(tick,randomInterval(500,1500));
			} else {
				nothingDone();
			}
		} else {
			nothingDone();
		}
	})();
};

//RUN
function updateAutoRunUI() {
	autoRunUI.info.text(autoRun ? " <running>" : " <stopped>");
	autoRunUI.start.prop("disabled",autoRun);
	autoRunUI.stop.prop("disabled",!autoRun);
}

function startRun() {
	autoRun=true;
	storageSet("auto_run","true");
	
	updateAutoRunUI();
	
	startRunning();
}

function stopRun() {
	autoRun=false;
	storageSet("auto_run","false");
	
	updateAutoRunUI();
}
//END RUN

function initUI() {
	var head=$("h3");
	var settingsDivVisible = false;
	var overlay=$("<div>")
		.css({
			"position":"fixed",
			"z-index":"99999",
			"top":"0",
			"left":"0",
			"right":"0",
			"bottom":"0",
			"background-color":"rgba(255,255,255,0.6)",
			"display":"none"
		})
		.appendTo($("body"));
	var settingsDiv=$("<div>")
		.css({
			"position":"fixed",
			"z-index":"100000",
			"left":"50px",
			"top":"50px",
			"width":"400px",
			"height":"200px",
			"background-color":"white",
			"border":"1px solid black",
			"border-radius":"5px",
			"display":"none",
			"padding":"10px"
		})
		.appendTo($("body"));
		
	function toggleSettingsVisibility() {
		if(settingsDivVisible) {
			overlay.hide();
			settingsDiv.hide();
		} else {
			overlay.show();
			settingsDiv.show();
		}
		
		settingsDivVisible=!settingsDivVisible;
	}
	
	var settingsTable=$("<table>").appendTo(settingsDiv);
	
	$("<button>").text("Schließen").click(function(){
		toggleSettingsVisibility();
	}).appendTo(settingsDiv);
	
	function addRow(desc,content) {
		$("<tr>")
		.append($("<td>").append(desc))
		.append($("<td>").append(content))
		.appendTo(settingsTable);
	}
	
	autoRunUI.info=$("<span>").appendTo(head);
	
	//Buttons
	autoRunUI.start=$("<button>").text("Start").click(function(){
		storageSet("village_end_reached","0");
		startRun();
	}).appendTo(head);
	autoRunUI.stop=$("<button>").text("Stop").click(stopRun).appendTo(head);
	$("<button>").text("Einstellungen").click(function(){
		toggleSettingsVisibility();
	}).appendTo(head);
	
	updateAutoRunUI();
	
	//Selects
	
	var selectOrder = $("<select>").attr("size","1")
		.append($("<option>").text("Datum").attr("value","date"))
		.append($("<option>").text("Distanz").attr("value","distance"))
		.change(function(){
			storageSet("table_order", $("option:selected",selectOrder).val());
			console.log(storageGet("table_order"));
		});
		
	var selectDir = $("<select>").attr("size","1")
		.append($("<option>").text("Aufsteigend").attr("value","asc"))
		.append($("<option>").text("Absteigend").attr("value","desc"))
		.change(function(){
			storageSet("table_dir", $("option:selected",selectDir).val());
			console.log(storageGet("table_dir"));
		});

	var selectWalk = $("<select>").attr("size","1")
		.append($("<option>").text("Vorwärts").attr("value","n"))
		.append($("<option>").text("Rückwärts").attr("value","p"))
		.change(function(){
			storageSet("walk_dir", $("option:selected",selectWalk).val());
			console.log(storageGet("walk_dir"));
		});
	
	var inputEndVillage = $("<input>")
		.attr("type","text")
		.val(storageGet("village_end"))
		.on("input",function(){
			storageSet("village_end", inputEndVillage.val());
			console.log(storageGet("village_end"));
		});
		
	var buttonCurrentVillage = $("<button>")
		.text("Aktuelles")
		.click(function(){
			inputEndVillage.val(""+unsafeWindow.game_data.village.id);
			storageSet("village_end", ""+unsafeWindow.game_data.village.id);
			console.log(storageGet("village_end"));
		});	
		
	var inputMaxPage = $("<input>")
		.attr("type","text")
		.val(storageGet("max_page"))
		.on("input",function(){
			storageSet("max_page", inputMaxPage.val());
			console.log(storageGet("max_page"));
		});
		
	var selectNoSpyReportButton = $("<select>").attr("size","1")
		.append($("<option>").text("[keiner]").attr("value",""))
		.append($("<option>").text("A").attr("value","a"))
		.append($("<option>").text("B").attr("value","b"))
		.change(function(){
			storageSet("no_spy_report_button", $("option:selected",selectNoSpyReportButton).val());
			console.log(storageGet("no_spy_report_button"));
		});
	
	addRow(
		$("<span>").text(" Sortierung: "),
		$("<div>").append(selectOrder).append(selectDir));
	
	addRow(
		$("<span>").text(" Dorf-Traversierung: "),
		selectWalk);
		
	addRow(
		$("<span>").text(" Enddorf: "),
		$("<div>").append(inputEndVillage).append(buttonCurrentVillage));
		
	addRow(
		$("<span>").text(" Max. Farmseite (>=1): "),
		inputMaxPage);
		
	addRow(
		$("<span>").text(" Kein-Spähbericht-Button: ")
		.attr("title","Wenn kein Spähbericht für ein Dorf vorliegt (erkennbar am '?'), dann wird der ausgewählte Button betätigt."),
		selectNoSpyReportButton);
	
	$("option[value="+storageGet("table_order")+"]",selectOrder).prop("selected",true);
	$("option[value="+storageGet("table_dir")+"]",selectDir).prop("selected",true);
	$("option[value="+storageGet("walk_dir")+"]",selectWalk).prop("selected",true);
	$("option[value="+storageGet("no_spy_report_button")+"]",selectNoSpyReportButton).prop("selected",true);

	$("<button>")
		.text("Test Alert")
		.click(function() {
			playAlertSound();
		})
		.appendTo($("#linkContainer"));
		
	$("<button>")
		.text("Test Notification")
		.click(function() {
			showNotification();
		})
		.appendTo($("#linkContainer"));
}

//INIT AND START
initUI();
if(checkBotProtection()) {
	stopRun();
	marqueeTitle("Botschutz");
	playAlertSound();
	showNotification();
}
if(autoRun) {
	startRun();
}

}); //end jquery document ready