// ==UserScript==
// @name		استخدام نقطة التجمع باللوحة المفاتيح
// @namespace		agrafix.net
// @description		يمكنك استخدام الهجوم و الموافق و الدعم و ايضا الكثير من الأوامر باللوحة المفاتيح 
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
var unit_presets = {
	// snob
	

        'G': {
			'light': 100,
		},
        'H': {

			'light': 200,
		},
        'J': {
			'light': 500,
		},

        'K': {
			'light': 1000,
		},

	'N': {
			'axe': 7000,
			'light': 3000,
			'ram': 200
		},
		
	'B': {
			'axe': 100,
			'snob': 1
		},
		
	'V': {

			'ram': 1
		},
        'C':  {
                        'catapult':1
               },

	
};
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

function addCaption()
{

  var tab = document.forms[0].childNodes[1];
  var newTab = tab.cloneNode(false);
  
  var newTr = document.createElement("tr");
  newTr.className = "nowrap";
  
  var newTd = document.createElement("td");
  newTd.className = "small";
  
  newTd.innerHTML = "\"<b>A</b>\": من اجل ارسال هجوم &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"<b>S</b>\": من اجل كافة القوات&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"<b>D</b>\": من اجل الدعم&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"<b>X</b>\": من اجل موافق&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"<b>G</b>\": هجوم بـ100خفيف &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"<b>H</b>\": هجوم بـ200خفيف&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"<b>J</b>\": هجوم بـ500خفيف&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"<b>K</b>\": هجوم بـ1000خفيف&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";

  newTd.innerHTML = "\"<b>N</b>\": هجوم بـ7000فأس2800خفيف300محطمة&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
  newTd.innerHTML = "\"<b>B</b>\": هجوم بـ100فأس1نبيل  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
  newTd.innerHTML = "\"<b>V</b>\": هجوم وهمي 1 محطمة واحدة  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
  newTd.innerHTML = "\"<b>C</b>\": هجوم وهمي 1 مقلاع واحد  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = " <b>حرب القبائل العربي</b> &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "<a href=http://www.tw-ar.com/>فريق السكربتات</a> &nbsp;";
  newTr.appendChild(newTd);

  
  newTab.appendChild(newTr);
  tab.parentNode.insertBefore(newTab, tab.previousSibling);
  tab.parentNode.insertBefore(tab.previousSibling.cloneNode(false), newTab);
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