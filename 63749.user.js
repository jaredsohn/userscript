// ==UserScript==
// @name           Websim Extension for Ogame Redesign
// @namespace      userscripts.org
// @author	       Tarja the Witch
// @description    Websim extension for Ogame Redesign - 0.61
// @include        http://websim.speedsim.net/*
// @version        0.61
// ==/UserScript==

(function(){

var stylesheet;
var unsafe;
var reqVars = [];
var lang, version;

var old = {};

try { unsafe = unsafeWindow }
catch (e) { unsafe = window }


var fixes = [];

/* 
	format:
	
	fixes [<version>] = 
	{
		<lang>:	{
			<global array name to update>: [ [<index>, <value>], [<index>, <value>] ],
			abm:<label for Anti-Ballistic Missile in the report>
		}
	}
*/

//	fixes for version 1.x (redesign)

fixes[1] =
{
	ru: { 
		ress: [ [0,"Металл:"], [1,"Кристалл:"], [2,"Дейтерий:"] ],
		/*ship_names: [ [16,'Тяжелый лазер'] ],*/
		abm:'Ракета-перехватчик'
	},
	bg:
	{
		ress: [[1, "Кристали:"]],
		ship_names: [[5, "Боен Кораб"]],
		esp_str: [[0, "Ресурси на "]],
		abm: 'Анти-балистични ракети'
	},
	en:
	{
		esp_str: [[0, "at "]]
	},
	us:
	{
		tech_names: [[2, "Armor Technology"]],
		esp_str: [[0, "at "]]
	}

};


function addStyle(style) {
	if (typeof GM_addStyle == 'function')
		GM_addStyle(style);
	else
	{
		if (!stylesheet) {
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			stylesheet = document.styleSheets[document.styleSheets.length-1];
		}
		if(stylesheet)
			stylesheet.insertRule(style, 0);
	}
}

function log(str) {
	if (typeof GM_log == 'function')
		GM_log(str);
}

function addVersionSwitch() {
	addStyle('#versionSwitch {\
		position:absolute;\
		top:15px;\
		right: 30px;\
		border: 1px solid black;\
		background-color: #554466;\
		padding: 5px 10px;\
	}');
	
	var div = document.createElement('div');
	div.id = 'versionSwitch';
	div.innerHTML =
		'<input type="radio" name="version" ' + (version=='0'?'checked="checked" ':'') + 'value="0"/> Old design (0.x)<br/>' +
		'<input type="radio" name="version" ' + (version=='1'?'checked="checked" ':'') + 'value="1"/> Redesign (1.x)<br/>';
	document.body.appendChild(div);
	
	var inputs = div.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++)
		inputs[i].addEventListener('change', switchVersion, false);
}

function switchVersion(evt) {
	version = parseInt(evt.target.value) || 0;
	applyFixes();
}

function saveOld() {
	old.tech_names = unsafe.tech_names;
	old.ship_names = unsafe.ship_names;
	old.ress = unsafe.ress;
	old.read_esp_report = unsafe.read_esp_report;
}

function loadOld() {
	unsafe.tech_names = old.tech_names;
	unsafe.ship_names = old.ship_names;
	unsafe.ress = old.ress;
	unsafe.read_esp_report = old.read_esp_report;
}

function readRequestVars() {
	var vars = document.location.search;
	if (vars) vars = vars.replace('?','').split('&');
	if (!vars) return;

	for (var i=0; i<vars.length; i++) {
		var s = vars[i].split('=');
		reqVars[ s[0] ] = s[1];
	}
}

function applyFixes() {
	loadOld();
	
	var fix = fixes[version];
	if (fix) fix = fix[lang];
	
	if (!fix) return;

	var func = [];
	
	for (var i in fix) {
		//unsafe[i] = fix[i];

		if (typeof fix[i] == 'function')
			func.push(fix[i]);
		else if (typeof fix[i] == 'object') {
			for (var j in fix[i]) {
				var element = fix[i][j];
				unsafe[i][element[0]] = element[1];
			}
		}
	}

	for (var i=0; i<func.length; i++) {
		func[i]();
	}
	
	if (fix && fix.abm) {
		unsafe.read_esp_report = function(report) {
			old.read_esp_report(report);
			
			var name = fix.abm;
			var p = report.indexOf(name);
			if(p != -1)
			{
				var num = parseInt(report.substr(p + name.length, 9));
				document.getElementById("abm_b").value = num;
			}
			else
				document.getElementById("abm_b").value = "";
		}
	}
	
	if (unsafe.post_rep)
		unsafe.read_esp_report(unsafe.post_rep); 
	
}

try {
	saveOld();
	readRequestVars();
	lang = reqVars['lang'] || 'en';
	version = parseInt(reqVars['version'],10) || 0;
	
	addVersionSwitch();
	applyFixes();

} catch (e) { log(e) }

})()