// ==UserScript==
// @name           Epic Mafia BlueYellow Theme
// @namespace      Lrdwhyt
// @include        http://www.epicmafia.com/game/index/*
// ==/UserScript==



(function() {
var css = "body {background: #EEF2FF url(http://img134.imageshack.us/img134/3364/fadebluetc0.png) top center repeat-x !important; font-family: Tahoma,Georgia,Sans-Serif,Arial,Helvetica,\"Trebuchet MS\",Verdana,Tahoma !important;}\n.window { border: 1px solid #22aa22 !important; background-color: #FFF8C6 !important;}\ndiv.bltc { background: transparent !important;}\n.log{!important;font-weight:bold !important;color: #2B547E !important;font-size:11pt !important;}\n.gamesetup div.rolecont{color:#BB1199 !important;}\n.grey {color:#999 !important;}\n.pip > div {background-color: #CFECEC !important;}\n.booth_choices {background-color: #d6f0da !important; color: #111111 !important;}\n.scrlink a {color: #559955 !important;}\n.boothhover + div { color: #005500 !important; }\na,a * { color: black !important; }\na.user:hover { color:#911 !important; }\na:hover,a:active {background-color:#a6d0aa !important;}\n\n.meet_username { color:#41627E !important; font-size:11pt !important; }\n.dead { color:#461B7E !important }\n.talk { margin: 3px !important }\n.selected { color: #335533 !important; background-color:#a6c0aa !important; }\n.boothhover:hover + div { color: #00aa00; }\n\n#container {background-color:transparent !important;}\n#countdown{background-color: transparent !important; color:#007700 !important;}\n#statebox {color:#0f5d0c !important;}\n#statewrap { background:transparent !important;}\n#nav li { background-color: black !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
