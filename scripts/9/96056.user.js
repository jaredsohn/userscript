// ==UserScript==
// @name		سكربت الاختصرات tribalwars
// @namespace		agrafix.net
// @description		Das bekannte Press X to hit >ok< von mir komplett neu.
// @include		http://*.die-staemme.de/game.php*screen=place*
// @include		http://*.tribalwars.net/game.php*screen=place*
// @include		http://*.guerretribale.fr/game.php*screen=place*
// @include		http://*.staemme.ch/game.php*screen=place*
// @include		http://ae*.tribalwars.ae/game.php?village=46&screen=place
// @include		http://*.tribalwars.*/game.php*screen=place*
// @exclude             http://de*.die-staemme.de/game.php?*screen=place&mode=units
// @exclude             http://de*.die-staemme.de/game.php?*screen=place&mode=sim
// @exclude		http://*.tribalwars.*/game.php?*screen=place&mode=units
// @exclude		http://*.tribalwars.*/game.php?*screen=place&mode=sim
// ==/UserScript==


// @version 2.0

// 
// config
// 

// 
// end config
// 

// settings
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
document.addEventListener('keyup', aKeyWasPressed, false);

// handler
function aKeyWasPressed(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);
	GM_log("key was pressed " + thechar);
	switch (thechar){			
		case "X":
			handler("submit");
			break;
			
		case "A":
			handler("attack");
			break;
			
		case "D":
			handler("support");
			break;
		
		case "S":
			unsafeWindow.selectAllUnits(false);
			break;
			
		default:
			handle_char(thechar);
			break;
	}
}

// global handler
function handler(elementName) {
	document.getElementsByName(elementName)[0].click();
}

function handle_char(thechar) {
	if (unit_presets[thechar] != null) {
		for (var name in unit_presets[thechar]) {
			insert_unit(name, unit_presets[thechar][name]);
		}
	}
}

// insert unit-preset
function insert_unit(unit, amount) {
	document.getElementsByName(unit)[0].value = amount;
}


addCaption();
(function(){
var url = document.URL;
var form = document.forms[0];

if(!document.body.innerHTML.match(/graphic\/villages\.png/)){
	return;
}

if(url.indexOf("try=confirm") != -1 && !document.body.innerHTML.match(/graphic\/big_buildings\/place1\.png/)){
	document.forms[0].addEventListener("submit",saveCommand,true);
}
else{
	var td = document.createElement("td");
	td.setAttribute("rowspan","2");
	
	var btn = document.createElement("input");
	btn.setAttribute("type","submit");
	btn.setAttribute("value","تكرار الامر");
	btn.setAttribute("style","font-size: 10pt; background-color: #D2EAF2;");
	btn.setAttribute("class","attack");
	td.appendChild(btn);
	btn.addEventListener("click",insertData,true);
	document.forms[0].lastChild.previousSibling.lastChild.lastChild.appendChild(td);
}

function saveCommand(dummy){
	var elem = form.elements;
	var form_data = [];
	for(var i=0;i<elem.length-1;i++){
		form_data.push(elem[i].name+":"+elem[i].value);
	}
	var save_str = form_data.toString().replace(/,/g,"|");
	setCookie("lastCMD",save_str);
}
function insertData(){
	var lastCMD = getCookie("lastCMD");
	if(lastCMD){
		var cmd_infos = lastCMD.split("|");
		var cmd_troops, str_out = '';
		for(var i=1;i<cmd_infos.length;i++){
			cmd_troops = cmd_infos[i].split(":");
			if(cmd_troops[0] == "action_id") continue;
			document.getElementsByName(cmd_troops[0])[0].value = cmd_troops[1];
		}
		
		var cmd_type = cmd_infos[0].split(":")[0];
		var type = document.createElement("input");
		type.setAttribute("name",cmd_type);
		type.setAttribute("value",cmd_type=="attack" ? "Angreifen" : "Unterstï¿½tzen");
		type.setAttribute("type","hidden");
		form.appendChild(type);
	}
	else{
		alert("Es wurde bisher kein Befehl gespeichert! Hast du bereits einen Befehl ausgefï¿½hrt? Dann ï¿½berprï¿½fe bitte die Einstellungen von Cookies (Vorraussetzung: an) in deinem Browser.");
		form.setAttribute("onSubmit","return false");
		location.href = location.href;
	}
}
function setCookie(name,value){
	var now = new Date();
	now.setTime(now.getTime() + (10 * 7 * 24 * 60 * 60 * 1000));
	now = now.toGMTString();
	document.cookie = name+"="+value+";expires="+now;
}
function getCookie(name){
	var cookies = document.cookie.split(";");
	var value = null;
	for(var i in cookies){
		var cook = cookies[i].split("=");
		if(cook[0].substr(1) == name){
			value = cook[1];
			break;
		}
	}
	return value;
}
function deleteCookie(name){
	document.cookie = name+"=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}
})();