// ==UserScript==
// @name        Halo Waypoint - Classified Glyphs Auto-Submit
// @namespace   halowaypoint
// @description Enter an alpha-numeric code (or click known codes) into waypoint classified glyphs grid
// @include     http://www.halowaypoint.com/en-us/classified
// @include     http://www.halowaypoint.com/en-us/classified#
// @include     https://www.halowaypoint.com/en-us/classified
// @include     https://www.halowaypoint.com/en-us/classified#
// @downloadURL	https://userscripts.org/scripts/source/160065.user.js
// @updateURL	https://userscripts.org/scripts/source/160065.user.js
// @version     3.3.12
// @author	jupiter2000
// @copyright	jupiter2000
// ==/UserScript==

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/160065.user.js',
}

updateScript();
function updateScript() {
	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?' + Math.random(),
			onload: function(resp) {
				if (resp.status != 200) return;

				if (!resp.responseText.match(/@version\s+(\d+).(\d+).(\d+)/)) return;
				var userscript_version = RegExp.$1 + '.' + RegExp.$2 + '.' + RegExp.$3; //extract from last match
				var running_version = GM_info.script.version;

				if (userscript_version != running_version) {
					create_break_line(versionSection);
					versionSection.appendChild(document.createTextNode("UPDATE: " + userscript_version));
					if (window.confirm('Version ' + userscript_version + ' is available!\n\n' + 'Do you want to install this version?' + '\n')) {
						window.location.href = SCRIPT.url;
					}
				}
				else {
					create_break_line(versionSection);
					versionSection.appendChild(document.createTextNode("Up to date!"));
					return;
				}
			}
		});
	}
	catch (ex) {
		alert("no");
	}
}


//Imitate mouse click
function mouse_click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

//Set known variables in OBJECTS {:} or ARRAY
var glyph_lookup_num = {
	0:1 , 1:2 , 2:3 , 3:4 , 4:5 , 5:6 , 6:7 , 7:8 , 8:9 , 9:10 ,
	A:11 , B:12 , C:13 , D:14 , E:15 , F:16 , G:17 , H:18 , I:19 ,
	J:20 , K:21 , L:22 , M:23 , N:24 , O:25 , P:26 , Q:27 , R:28 ,
	S:29 , T:30 , U:31 , V:32 , W:33 , X:34 , Y:35 , Z:36 , pound:37
};
var glyph_lookup_value = {
	0:"…" , 1:"†" , 2:"‡" , 3:"ˆ" , 4:"Š" , 5:"Œ" , 6:"Ž" , 7:"‘" , 8:"’" , 9:"“" ,
	A:"™" , B:"š" , C:"œ" , D:"ž" , E:"Ÿ" , F:"¡" , G:"¤" , H:"¥" , I:"¦" ,
	J:"§" , K:"«" , L:"¬" , M:"®" , N:"¯" , O:"±" , P:"²" , Q:"´" , R:"µ" ,
	S:"º" , T:"»" , U:"½" , V:"¾" , W:"¿" , X:"À" , Y:"Â" , Z:"Ã" , pound:"Å"
};
var known_codes = new Array (
	"343GS" , "HALO4" , "SPARK" , "FLOOD" , "EARTH" ,
	"DEMON" , "RINGS" , "ARRAY" , "HUMAN" , "HAVEN" ,
	"1UK3CVYJZM" , "3VGRZJ1BS6" , "T5CE6KV3R8" , "9WE621KN8F" , "Q239SF2PGZ" ,
	"M0DKE#EMQC" , "MN7VKCZP#Q" , "1K3G7N17LL" , "EPGROIVIDR" , "8PXX1SMIQU" ,
	"WQ6F2Y1M1P"

);
var new_known_codes = new Array (
	"EXBBF#K#J4" , "DLS1B0SXUI" , "73P1SJ66O9" , "GT#RFIEU6Q"
);

function create_break_line(parent) {
	//add break line
	newLine = document.createElement("br");
	parent.appendChild(newLine);
}

//Create options box
newConsoleBox = document.createElement("div");
newConsoleBox.setAttribute("style", "position:fixed;top:0px;right:0px;z-index:100;float:right;width:275px;height:225px;text-align:left;background-color:navy;font-size:12px;line-height:1.2;overflow:auto;");

versionSection = document.createElement("span");
versionSection.setAttribute("style", "position:fixed;top:0px;right:20px;z-index:100;float:right;text-align:right");
versionSection.appendChild(document.createTextNode("Ver: " + GM_info.script.version));
newConsoleBox.appendChild(versionSection);

newCode = document.createElement("a");
newCode.innerHTML = "SECTION 3 - Glyphs";
newCode.setAttribute('href', 'http://halo4arg.wix.com/section3-decryption#!glyph-sequences/cee5');
newCode.setAttribute('target', '_blank');
newConsoleBox.appendChild(newCode);

create_break_line(newConsoleBox);create_break_line(newConsoleBox);

newCode = document.createElement("a");
newCode.innerHTML = "Enter Alpha-Numeric Code";
newCode.setAttribute('href', '#');
newCode.addEventListener ("click", function() {glyph_map_check("enter", "");}, false); //run GS function from page
newConsoleBox.appendChild(newCode);

create_break_line(newConsoleBox);

newCode = document.createElement("a");
newCode.innerHTML = "Turn ON Glyph Hover";
newCode.setAttribute('href', '#');
newCode.addEventListener ("click", function() {glyph_map_check("hover");}, false); //run GS function from page
newConsoleBox.appendChild(newCode);

create_break_line(newConsoleBox);

newCode = document.createElement("a");
newCode.innerHTML = "Reverse Lookup - Terminal Input";
newCode.setAttribute('href', '#');
newCode.addEventListener ("click", function() {glyph_map_check("reverse");}, false); //run GS function from page
newConsoleBox.appendChild(newCode);

create_break_line(newConsoleBox);create_break_line(newConsoleBox);

codeSection = document.createElement("span");
codeSection.appendChild(document.createTextNode("*NEWEST* Known Codes:"));
newConsoleBox.appendChild(codeSection);

for (nk=0; nk<new_known_codes.length; nk++) {
	create_break_line(newConsoleBox);

	let knownCode = new_known_codes[nk]; //have to use LET due to closures messing up all eventlistener to last index
	newConsoleBox.appendChild(document.createTextNode("Test: "));

	newKnownCodeTest = document.createElement("a");
	newKnownCodeTest.innerHTML = knownCode;
	newKnownCodeTest.setAttribute('href', '#');
	newKnownCodeTest.addEventListener ("click", function() {test_known_code(knownCode);}, false); //run GS function from page
	newConsoleBox.appendChild(newKnownCodeTest);

	newConsoleBox.appendChild(document.createTextNode(" - "));
	newConsoleBox.appendChild(document.createTextNode("Submit: "));

	newKnownCodeSubmit = document.createElement("a");
	newKnownCodeSubmit.innerHTML = knownCode;
	newKnownCodeSubmit.setAttribute('href', '#');
	newKnownCodeSubmit.addEventListener ("click", function() {glyph_map_check("submit", knownCode);}, false); //run GS function from page
	newConsoleBox.appendChild(newKnownCodeSubmit);
}

create_break_line(newConsoleBox);create_break_line(newConsoleBox);

codeSection = document.createElement("span");
codeSection.appendChild(document.createTextNode("Known Codes:"));
newConsoleBox.appendChild(codeSection);

create_break_line(newConsoleBox);

for (k=0; k<known_codes.length; k++) {
	let knownCode = known_codes[k]; //have to use LET due to closures messing up all eventlistener to last index
	newConsoleBox.appendChild(document.createTextNode("Test: "));

	newKnownCodeTest = document.createElement("a");
	newKnownCodeTest.innerHTML = knownCode;
	newKnownCodeTest.setAttribute('href', '#');
	newKnownCodeTest.addEventListener ("click", function() {test_known_code(knownCode);}, false); //run GS function from page
	newConsoleBox.appendChild(newKnownCodeTest);

	newConsoleBox.appendChild(document.createTextNode(" - "));
	newConsoleBox.appendChild(document.createTextNode("Submit: "));

	newKnownCodeSubmit = document.createElement("a");
	newKnownCodeSubmit.innerHTML = knownCode;
	newKnownCodeSubmit.setAttribute('href', '#');
	newKnownCodeSubmit.addEventListener ("click", function() {glyph_map_check("submit", knownCode);}, false); //run GS function from page
	newConsoleBox.appendChild(newKnownCodeSubmit);

	create_break_line(newConsoleBox);
}

//add box to body
document.body.insertBefore(newConsoleBox, document.body.firstChild);

//Find value from glyphs terminal input
function glyph_reverse_lookup() {
	var terminal_input = document.getElementById('terminal_input');
	var input_glyphs = terminal_input.getElementsByTagName('a');
	var input = "";
	for (ig=0; ig<input_glyphs.length; ig++) {
		if (input_glyphs[ig].innerHTML != "") {
			var value = input_glyphs[ig].innerHTML;
			for (var key in glyph_lookup_value) {
				if (glyph_lookup_value[key] == value) {
					if (key == "pound") {
						key = "#";
					}
					input = input + key;
					break;
				}
			}
		}
	}
	if (input == "") {
		alert("There are NO glyphs in the Terminal Input!");
	}
	else {
		alert(input);
	}
}

//Create title-hover for glyph grid map
function glyph_find_grid_hover() {
	var div_map = document.getElementById("terminal_glyph_map");
	var glyph_grid = div_map.getElementsByTagName("area");
	for (ga=0; ga<glyph_grid.length; ga++) {
		var id = glyph_grid[ga].getAttribute('data-glyph');
		for (var key in glyph_lookup_num) {
			if (glyph_lookup_num[key] == id) {
				if (key == "pound") {
					key = "#";
				}
				glyph_grid[ga].setAttribute('title', key);
				break;
			}
		}
	}
}

//Find glyph to click on
function glyph_find_grid_click(id) {
	var div_map = document.getElementById("terminal_glyph_map");
	var glyph_grid = div_map.getElementsByTagName("area");
	for (i=0; i<glyph_grid.length; i++) {
		if (glyph_grid[i].getAttribute('data-glyph') == id) {
			mouse_click(glyph_grid[i]);
			break;
		}
	}
}

//Test for terminal before allowing code enter
function glyph_map_check(exe, code) {
	var div_map = document.getElementById("terminal_glyph_map");
	if (div_map != null) {
		if (exe == "enter") {
			//run input to enter code
			glyph_code_enter(code, false);
		}
		else if (exe == "submit") {
			glyph_code_enter(code, true);
		}
		else if (exe == "hover") {
			glyph_find_grid_hover();
		}
		else if (exe == "reverse") {
			glyph_reverse_lookup();
		}
	}
	else {
		alert("Glyph Map not available! Please go to Terminal first.");
	}	
}

//Enter code, lookup value, find and click
function glyph_code_enter(code, auto_submit) {
	if (auto_submit == true) {
		var enter_code = code;
	}
	else {
		var enter_code = prompt ("Type/Paste alpha numeric code: (0-9, A-Z, #) *automatically uppercases*",code).toUpperCase();
	}
	for (z=0; z<enter_code.length; z++) {
		var x = enter_code.charAt(z);
		if (x == "#") {
			var glyph_num = glyph_lookup_num["pound"];
			glyph_find_grid_click(glyph_num);
		}
		else {
			var glyph_num = glyph_lookup_num[x];
			glyph_find_grid_click(glyph_num);
		}
	}
	var submit_code = document.getElementById("glyph_enter");
	mouse_click(submit_code);
	setTimeout(function(){submit_message_check();},3000); //check for response in 3 seconds
}

//Test known code for response
function test_known_code(alpha_numeric_code) {
	var code_sym = "";
	for (t=0; t<alpha_numeric_code.length; t++) {
		var x = alpha_numeric_code.charAt(t);
		if (x == "#") {
			var glyph_sym = glyph_lookup_value["pound"];
			code_sym = code_sym + glyph_sym;
		}
		else {
			var glyph_sym = glyph_lookup_value[x];
			code_sym = code_sym + glyph_sym;
		}
	}

	$.post('//www.halowaypoint.com/en-us/classified/submitglyph', {
		code: code_sym},
		function(data) {
			alert(data.errorMsg);	
		}, 'json');
	return false;
}

//Checks for submit code message response and click ok
function submit_message_check() {
	var code_message = document.getElementById("terminal_msg");
	if (code_message != null) {
		var message_spans = code_message.getElementsByTagName("span");
		for (y=0; y<message_spans.length; y++) {
			if(message_spans[y].innerHTML == "OK") {
				mouse_click(message_spans[y].parentNode);
			}
		}
	}
	else {
		setTimeout(function(){submit_message_check();},3000); //re-check for response in 3 seconds
	}
}