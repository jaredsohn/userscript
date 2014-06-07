// ==UserScript==
// @name		TW Suis
// @namespace	http://www.truhlicka.tk
// @description	The West game enhance wrapper
// @include		http://*.the-west.*/game.php*
// @include		http://*.tw.innogames.*/game.php*
// @grant       GM_addStyle
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// @version		0.0.5
// @history		0.0.3- fixed some issues with (fast) map movement
// @history		0.0.2- add "Tatanka Eye Plugin" and some css tweaks
// @history		0.0.1- initial state
// ==/UserScript==

var domain = "http://elysee.php5.cz";
var domain2 = "";
var application = "/suis";
var script = "/script";
var media = "/media";
var css = "/css";
var fancy = "/default.png";
var buttonId = "null";
var popup = "";
var server = "";
var country = "";
var alt = "null";
var bar = 60;
var margin = 8;
var version = "version 0.0.5 EN";
var IDE = "Eclipse. Build: 20130614-0229.";

function APIregister() {
	var suisRegister = document.createElement('script');
	suisRegister.type = "text/javascript";
	suisRegister.setAttribute('src', domain + application + script
			+ '/register.js');
	document.body.appendChild(suisRegister);
}

APIregister();

document.styleSheets[0].insertRule('.cursor { cursor:pointer; }', 0);
document.styleSheets[0].insertRule('.suis_wood { background-image: url(' + domain + '' + application + '' + media + '/wood.jpg); width:100%; height:' + bar + 'px; position:absolute; top:0px; z-index:2; }', 0);
document.styleSheets[0].insertRule('#suis_table { background-image: url(' + domain + '' + application + '' + media + '/table.png); width: 100%; height: ' + bar + 'px; }', 0);
document.styleSheets[0].insertRule('#suis_row { float: left; }', 0);
document.styleSheets[0].insertRule('#ui_topbar { top: ' + bar + 'px !important; }', 0);
document.styleSheets[0].insertRule('#ui_character_avatar_container { margin-top: ' + (bar + 5) + 'px !important; }', 0);
document.styleSheets[0].insertRule('#ui_notibar { margin-top: ' + (bar + 215) + 'px !important; }', 0);
document.styleSheets[0].insertRule('#ui_right { margin-top: ' + (bar + 18) + 'px !important; }', 0);
document.styleSheets[0].insertRule('#ui_menubar { margin-top: ' + (bar + 138) + 'px !important; }', 0);
document.styleSheets[0].insertRule('#ui_revision { top: ' + (bar + 1) + 'px !important; }', 0);
document.styleSheets[0].insertRule('#buffbars { top: 1px !important; margin-right: 0px !important; }', 0);
document.styleSheets[0].insertRule('#ui-mapfade { background-color: rgba(200,0,0,1) !important; background-image: url(http://alturl.com/xr8nc); }', 0);
document.styleSheets[0].insertRule('.focus { visibility: hidden !important; }', 0);
document.styleSheets[0].insertRule('.first-purchase { margin: 90px 0px 0px -23px !important; }', 0);
document.styleSheets[0].insertRule('.buffspan { margin-top: -25px !important; width: 42px !important; }', 0);

$('body').prepend("<div id='suis'  class='suis_wood'></div>");
$('#suis').append("<table id='suis_table'></table>");
$('#suis_table').append("<tr id='suis_row'></tr>");

function HelloWorld(color) {
	document.styleSheets[0]
			.insertRule(
					'.plugin_icon_'
							+ color
							+ ' { background-image: url('
							+ domain
							+ ''
							+ application
							+ ''
							+ media
							+ '/'
							+ color
							+ '_yield.png); background-size:43px 43px; margin-right: 2px; margin-top: 2px; }',
					0);

	var fancy = "/world3.png";
	var buttonId = "hello-world";
	var alt = "Hello World";

	var popup = "<center>" +

	"<div style= &quot; margin-top:"
			+ margin
			+ "px; background-image:url("
			+ (domain + application + media)
			+ "/"
			+ color
			+ "_yield.png); width:95px; height:93px; &quot; >"
			+ "<img style= &quot; position:relative; top:Opx; left:Opx; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/"
			+ fancy
			+ " &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/separator.png &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div class= &quot; invPopup_body &quot; >"
			+ "<p class= &quot; inventory_popup_label tw_green &quot; style= &quot; margin-top:"
			+ margin
			+ "px; &quot; >"
			+ alt
			+ "</p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Suis goodie</p>"
			+ "<p style= &quot; color: #8b4513; margin-top:"
			+ margin
			+ "px; &quot; >This goodie doing nothing</p>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/star.png &quot; alt= &quot; &quot; ></img>"
			+ "<p style= &quot; color: #000000; margin-top:"
			+ margin
			+ "px; &quot; ><strong>TW Suis - "
			+ version
			+ "</strong></p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Developed in "
			+ IDE
			+ " Graphics in famous GIMP 2.6. Platform x86-64. Script is Covered by GPLv3 license<br><br>Dedicated To Eliška / Nikol</p>"
			+ "</div>" +

			"</center>";

	var pluginIcon = "<td><div class='plugin_icon_" + color + "'>";
	var pluginFancy = "<img id='" + buttonId + "' class='cursor' src='"
			+ domain + application + media + fancy + "' alt='" + alt
			+ "' title='" + popup + "' height='42' width='44'>";

	$("tr").append(pluginIcon + pluginFancy);
};

t = true; inn = 600; out = 1600;
function tatankaToggle(inn, out) {
	if (t = !t) {
		$("#ui_bottomleft").fadeIn('inn');
		$("#ui_bottombar").fadeIn('inn');
		$("#ui_experience_bar").fadeIn('inn');
		$("#ui_windowdock").fadeIn('inn');
		$("#ui_character_avatar_container").fadeIn('inn');
		$("#ui_right").fadeIn('inn');
		$("#ui_menubar").fadeIn('inn');
		$("#ui_notibar").fadeIn('inn');
		$("#ui_windowbar_state").fadeIn('inn');
		$("#ui_revision").fadeIn('inn');
		$(".first-purchase").fadeIn('inn');
		$(".questtracker").fadeIn('inn');
		$(".chat").fadeIn('inn');
		$("#ui_bottomright").fadeTo("fast", 1);
		$("#navigatorIco").fadeOut(0);
		$("#centerIco").fadeOut(0);
	} else {
		$("#ui_bottomleft").fadeOut('out');
		$("#ui_bottombar").fadeOut('out');
		$("#ui_experience_bar").fadeOut('out');
		$("#ui_windowdock").fadeOut('out');
		$("#ui_character_avatar_container").fadeOut('out');
		$("#ui_right").fadeOut('out');
		$("#ui_menubar").fadeOut('out');
		$("#ui_notibar").fadeOut('out');
		$("#ui_windowbar_state").fadeOut('out');
		$("#ui_revision").fadeOut('out');
		$(".first-purchase").fadeOut('out');
		$(".questtracker").fadeOut('out');
		$(".chat").fadeOut('out');
		$("#ui_bottomright").fadeTo("fast", 0.3);
		$("#navigatorIco").fadeIn(2500);
		$("#centerIco").fadeIn(2500);
	}
}

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 87) {
		tatankaToggle();
	}
}, false);

function TatankaEye(color) {
	document.styleSheets[0]
			.insertRule(
					'.plugin_icon_'
							+ color
							+ ' { background-image: url('
							+ domain
							+ ''
							+ application
							+ ''
							+ media
							+ '/'
							+ color
							+ '_yield.png); background-size:43px 43px; margin-right: 2px; margin-top: 2px; }',
					0);

	var fancy = "/tatanka2.png";
	var buttonId = "tatanka-eye";
	var alt = "Tatanka Eye";

	var popup = "<center>" +

	"<div style= &quot; margin-top:"
			+ margin
			+ "px; background-image:url("
			+ (domain + application + media)
			+ "/"
			+ color
			+ "_yield.png); width:95px; height:93px; &quot; >"
			+ "<img style= &quot; position:relative; top:0px; left:0px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/"
			+ fancy
			+ " &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/separator.png &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div class= &quot; invPopup_body &quot; >"
			+ "<p class= &quot; inventory_popup_label tw_green &quot; style= &quot; margin-top:"
			+ margin + "px; &quot; >" + alt + "</p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Suis goodie</p>"
			+ "<p style= &quot; color: #8b4513; margin-top:" + margin
			+ "px; &quot; >Hide unwanted&nbsp;<br>windows above map</p>"
			+ "<p style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; color: #000000; &quot;>Keystroke &nbsp;&nbsp;<img src= &quot; "
			+ (domain + application + media)
			+ "/w.png &quot; alt= &quot; &quot; ></img></p>" +
			"</div>" +

			"</center>";

	var pluginIcon = "<td><div class='plugin_icon_" + color + "'>";
	var pluginFancy = "<img id='" + buttonId + "' class='cursor' src='"
			+ domain + application + media + fancy + "' alt='" + alt
			+ "' title='" + popup
			+ "' height='42' width='44' onclick='TaskQueueUi.toggleTasks();' >"; // QuestTrackerWindow.minimize();

	$("tr").append(pluginIcon + pluginFancy);
	document.getElementById(buttonId).addEventListener('click', tatankaToggle,
			false);
	
	document.styleSheets[0]
			.insertRule(
					'#navigatorIco { width:67px; height:67px; position:fixed; top:84px; right:10px; z-index:8; display:none }',
					0);
	document.styleSheets[0]
			.insertRule(
					'#centerIco { width:20px; height:20px; position:fixed; top:84px; right:20px; z-index:9; display:none }',
					0);
	$('body')
			.prepend(
					"<div id='navigatorIco'><img class='cursor' src='"
							+ domain
							+ application
							+ media
							+ "/navigator.png' alt='Navigator' title='Mini map' height='67 width='67 onclick='MinimapWindow.open();'></img></div>");
	$('body')
			.prepend(
					"<div id='centerIco'><img class='cursor' src='"
							+ domain
							+ application
							+ media
							+ "/center.png' alt='Center' title='Center character on map' height='20 width='20 onclick='Map.center(Character.position);'></img></div>");
};

function separator(rgba, space, height, top) {
	document.styleSheets[0].insertRule('#separator { background: rgba(' + rgba
			+ '); width:3px; height:' + height + 'px; margin-top:' + top + 'px; margin-left:'
			+ space + 'px; margin-right:' + space + 'px; }', 0);
	$('tr').append("<td><div id='separator'></td></div>");
}

function FullScreen(color) {
	document.styleSheets[0]
			.insertRule(
					'.plugin_icon_'
							+ color
							+ ' { background-image: url('
							+ domain
							+ ''
							+ application
							+ ''
							+ media
							+ '/'
							+ color
							+ '_yield.png); background-size:43px 43px; margin-right: 2px; margin-top: 2px; }',
					0);

	var fancy = "/full.png";
	var buttonId = "full-screen";
	var alt = "Full Screen";

	var popup = "<center>" +

	"<div style= &quot; margin-top:"
			+ margin
			+ "px; background-image:url("
			+ (domain + application + media)
			+ "/"
			+ color
			+ "_yield.png); width:95px; height:93px; &quot; >"
			+ "<img style= &quot; position:relative; top:0px; left:0px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/"
			+ fancy
			+ " &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/separator.png &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div class= &quot; invPopup_body &quot; >"
			+ "<p class= &quot; inventory_popup_label tw_green &quot; style= &quot; margin-top:"
			+ margin
			+ "px; &quot; >"
			+ alt
			+ "</p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Suis goodie</p>"
			+ "<p style= &quot; color: #8b4513; margin-top:"
			+ margin
			+ "px; &quot; >Fire Up Your game&nbsp;<br>to fullscreen</p>"
			+ "<p style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; color: #000000; &quot;>Keystroke &nbsp;&nbsp;<img src= &quot; "
			+ (domain + application + media)
			+ "/f11.png &quot; alt= &quot; &quot; ></img></p>" +
			"</div>" +

			"</center>";

	var pluginIcon = "<td><div class='plugin_icon_" + color + "'>";
	var pluginFancy = "<img id='" + buttonId + "' class='cursor' src='"
			+ domain + application + media + fancy + "' alt='" + alt
			+ "' title='" + popup + "' height='42' width='44'>";

	$("tr").append(pluginIcon + pluginFancy);
	document.getElementById(buttonId).addEventListener('click', toggleFullScreen,
			false);
	
		function toggleFullScreen() {
		if (!document.fullscreenElement && !document.mozFullScreenElement
				&& !document.webkitFullscreenElement) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement
						.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	}
};

function Launcher(color, url, country) {
	document.styleSheets[0]
			.insertRule(
					'.plugin_icon_'
							+ color
							+ ' { background-image: url('
							+ domain
							+ ''
							+ application
							+ ''
							+ media
							+ '/'
							+ color
							+ '_yield.png); background-repeat:no-repeat; background-size:43px 43px; margin-right: 2px; margin-top: 2px; }',
					0);	

					if (country == "de") {
		server = "German";
	}
	if (country == "net") {
		server = "net domain [en]";
	}
	if (country == "pl") {
		server = "Poland";
	}
	if (country == "nl") {
		server = "Holland";
	}
	if (country == "se") {
		server = "Sweden";
	}
	if (country == "ro") {
		server = "Romania";
	}
	if (country == "pt") {
		server = "Portugal";
	}
	if (country == "cz") {
		server = "Czech";
	}
	if (country == "es") {
		server = "Spain";
	}
	if (country == "ru") {
		server = "Russia";
	}
	if (country == "br") {
		server = "Brazil";
	}
	if (country == "org") {
		server = "Turkish";
	}
	if (country == "hu") {
		server = "Hungary";
	}
	if (country == "gr") {
		server = "Greece";
	}

	if (country == "dk") {
		server = "Denmark";
	}

	if (country == "sk") {
		server = "Slovakia";
	}

	if (country == "fr") {
		server = "France";
	}

	if (country == "it") {
		server = "Italy";
	}

	if (country == "no") {
		server = "Norway";
	}

	var fancy = "/launcher.png";
	var buttonId = ("launcher-" + country);
	var alt = "The West Launcher";		

	var popup = "<center>" +

	"<div style= &quot; margin-top:"
			+ margin
			+ "px; background-image:url("
			+ (domain + application + media)
			+ "/"
			+ color
			+ "_yield.png); width:95px; height:93px; &quot; >"
			+ "<img style= &quot; position:relative; top:Opx; left:Opx; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/"
			+ fancy
			+ " &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/separator.png &quot; alt= &quot; &quot; ></img>"
			+ "</div>"
			+

			"<div class= &quot; invPopup_body &quot; >"
			+ "<p class= &quot; inventory_popup_label tw_green &quot; style= &quot; margin-top:"
			+ margin
			+ "px; &quot; >"
			+ alt
			+ "&nbsp;<br>" + server + " server</p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Suis goodie</p>"
			+ "<p style= &quot; color: #8b4513; margin-top:"
			+ margin
			+ "px; &quot; >This goodie doing nothing</p>"
			+ "<img style= &quot; position:relative; margin-top:"
			+ margin
			+ "px; &quot; src= &quot; "
			+ (domain + application + media)
			+ "/star.png &quot; alt= &quot; &quot; ></img>"
			+ "<p style= &quot; color: #000000; margin-top:"
			+ margin
			+ "px; &quot; ><strong>TW Suis - "
			+ version
			+ "</strong></p>"
			+ "<p class= &quot; inventory_popup_type &quot; >Developed in "
			+ IDE
			+ " Graphics in famous GIMP 2.6. Platform x86-64. Script is Covered by GPLv3 license<br><br>Dedicated To Eliška / Nikol</p>"
			+ "</div>" +

			"</center>";

	var pluginIcon = "<td><div id='flagAnchor_" + country + "' class='plugin_icon_" + color + "'>";
	var pluginFancy = "<img id='" + buttonId + "' class='cursor' src='"
			+ domain + application + media + fancy + "' alt='" + alt
			+ "' title='" + popup + "' height='42' width='44'>";
	
	$("tr").append(pluginIcon + pluginFancy);
	
	document.styleSheets[0].insertRule('#flag_'+ country +' { background-image: url(' + domain + '' + application + '' + media + '/' + country+ '.png); width: 18px; height: 12px; position:relative; top:-18px; left:18px; z-index:0; }', 0);
	$('#flagAnchor_' + country).append("<div id='flag_" + country + "' class='cursor' title='" + server + "'></div>");
	


			function launch() {
		if (country == "pt") {
			country = "com.pt";
		}
		if (country == "br") {
			country = "com.br";
		}
		if (country == "no") {
			country = "no.com";
		}
		location.href = (url + country);
	}
	document.getElementById(("flag_"+ country )).addEventListener('click', launch, false);
	document.getElementById(buttonId).addEventListener('click', launch, false);
};

// ///////////////////////////////////////////////////////////////////////////////////
// Goodies Load Chain
// ///////////////////////////////////////////////////////////////////////////////////

//separator('0,0,0,0.3', '1', '25', '10');
HelloWorld('brown');
FullScreen('brown');
TatankaEye('brown');

Launcher('brown','http://www.the-west.', 'de');
Launcher('brown','http://www.the-west.', 'net');
Launcher('brown','http://www.the-west.', 'pl');
Launcher('brown','http://www.the-west.', 'nl');
Launcher('brown','http://www.the-west.', 'se');
Launcher('brown','http://www.the-west.', 'ro');
Launcher('brown','http://www.the-west.', 'pt'); // com.pt
Launcher('brown','http://www.the-west.', 'cz');
Launcher('brown','http://www.the-west.', 'es');
Launcher('brown','http://www.the-west.', 'ru');
Launcher('brown','http://www.the-west.', 'br'); // com.br
Launcher('brown','http://www.the-west.', 'org');
Launcher('brown','http://www.the-west.', 'hu');
Launcher('brown','http://www.the-west.', 'gr');
Launcher('brown','http://www.the-west.', 'dk');
Launcher('brown','http://www.the-west.', 'sk');
Launcher('brown','http://www.the-west.', 'fr');
Launcher('brown','http://www.the-west.', 'it');
Launcher('brown','http://www.the-west.', 'no'); // no.com