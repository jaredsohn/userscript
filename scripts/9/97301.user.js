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
var unit_presets = {
	// snob
	
        '': {
			'spear':0000,
			'snob': 0
		},



        '': {
			'spear': 00,
			'sword': 00,
			'snob': 0
		},
	'': {
			'spear': 000,
			'sword': 000,
			'snob': 0
		},
        '': {
			'light': 000,
                        'spy':0
		},
        '': {
			'light': 000,
                        'spy':0
		},

        '': {
			'light': 000,
                        'spy':0
		},
        '': {
			'light': 000,
                        'spy':00
		},
        '': {
			'light': 0000,
                        'spy':0
		},
        '': {
			'light': 0000,
                        'spy':0
		},
        '': {
			'spear': 00,
                        'spy':0
		},
        '': {
			'spear': 00,
                        'spy':0
		},
        '': {
			'spear': 000,
                        'spy':0
		},

	'': {
			'spear': 0,
			'sword': 0,
                        'axe': 0,
                        'spy': 0,
                        'marcher': 0,
                        'heavy': 0,
                        'archer': 0,
                        'ram': 0,
                        'catapult': 0,
                        'knight': 0,
			'light': 0,
			'snob': 0
		},
	'N': {
			'axe': 0000,
			'light': 0000,
			'ram': 000
		},
		
	'V': {
			'axe': 00000,
			'ram': 0000
		},
		
        'B': {
			'axe': 0000,
			'light': 0000,
                        'marcher': 0000,
			'ram': 000
		},
	// fake
	'F': {

			'ram': 0
		},
        'M':  {
                        'catapult':0
               },
        'T':{

                        'spy': 0

               }
	
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
  
  newTd.innerHTML = "\"A\":  من اجل ارسال هجوم &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"S\": من اجل كافة القوات&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"D\": من اجل الدعم&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"X\": من اجل موافق&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"N\":هجوم7000 فأس 3000 خفيف 200 محطمة&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"B\":هجوم7000 فأس 1750 خفيف 1000 قوس 200 محطمة&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"v\":هجوم15000 فأس  1000 محطمة&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";

  newTd.innerHTML = "\"T\": هجوم تجسس بجندي واحد   &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
 
  newTd.innerHTML = "\"F\": هجوم وهمي 1 محطمة واحد  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
  newTd.innerHTML = "\"M\": هجوم وهمي 1 مقلاع واحد  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
    
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"1\":  من اجل الهجوم 1000 رمح  نبيل &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"2\":  من اجل الهجوم 50 رمح 50 سيف نبيل &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));


  newTd.innerHTML = "\"3\": من اجل الهجوم 100 رمح 200 سيف نبيل  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"0\": عودة الى الصفر &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = "\"4\": 200 فارس خفيف مع جاسوس&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"5\":400 فارس خفيف مع جاسوس&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"6\": 600 فارس خفيف مع جاسوس &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  

  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";

  newTd.innerHTML = "\"7\": 800 فارس خفيف مع جاسوس &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"8\": 1000 فارس خفيف مع جاسوس&nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "\"9\": 1200 فارس خفيف مع جاسوس &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";  

  newTd.innerHTML = "\"G\":  من اجل الهجوم 80 رمح وجاسوس &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"H\":  من اجل الهجوم 100 رمح وجاسوس  &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTd.innerHTML = "\"J\":  من اجل الهجوم 120 رمح وجاسوس &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));

  newTab.appendChild(newTr.cloneNode(true));
  newTr.innerHTML = "";
  
  newTd.innerHTML = " مع تحيات محمد القائد &nbsp;";
  newTr.appendChild(newTd.cloneNode(true));
  
  newTd.innerHTML = "<a href=http://www.plapl.com/>بلابل</a> &nbsp;";
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