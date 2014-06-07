// ==UserScript==
// @name           KOL - Chat - DJ
// @namespace      http://userstyles.org
// @description    Labels the DJs in chat
// @include       http://127.0.0.1:6008*
// @include       http://*kingdomofloathing.com/*
// ==/UserScript==
var css2632 = '/* A */' +
'a[href="showplayer.php?who=229549"]:before, ' +
'/* B */' +
'a[href="showplayer.php?who=903411"]:before, a[href="showplayer.php?who=223920"]:before, ' +
'/* C */' +
'a[href="showplayer.php?who=861533"]:before, a[href="showplayer.php?who=297751"]:before, a[href="showplayer.php?who=1190641"]:before, a[href="showplayer.php?who=1001228"]:before, ' +
'/* D */' +
'a[href="showplayer.php?who=1755316"]:before, a[href="showplayer.php?who=1465707"]:before, a[href="showplayer.php?who=2074934"]:before, a[href="showplayer.php?who=1990948"]:before, a[href="showplayer.php?who=1313112"]:before, a[href="showplayer.php?who=1976258"]:before, a[href="showplayer.php?who=2077807"]:before, ' +
'/* E */' +
'a[href="showplayer.php?who=2023625"]:before, a[href="showplayer.php?who=1894950"]:before, ' +
'/* G */' +
'a[href="showplayer.php?who=1957677"]:before, a[href="showplayer.php?who=985203"]:before, a[href="showplayer.php?who=1830147"]:before, a[href="showplayer.php?who=2084449"]:before, a[href="showplayer.php?who=1554923"]:before, ' +
'/* J */' +
'a[href="showplayer.php?who=1661302"]:before, ' +
'/* M */' +
'a[href="showplayer.php?who=689384"]:before, a[href="showplayer.php?who=1296776"]:before, a[href="showplayer.php?who=1296776"]:before, ' +
'/* N */' +
'a[href="showplayer.php?who=984897"]:before, ' +
'/* P */' +
'a[href="showplayer.php?who=1120160"]:before, a[href="showplayer.php?who=1785395"]:before, a[href="showplayer.php?who=1875705"]:before, ' +
'/* S */' +
'a[href="showplayer.php?who=114524"]:before, a[href="showplayer.php?who=755490"]:before, a[href="showplayer.php?who=1490068"]:before, a[href="showplayer.php?who=1254713"]:before, a[href="showplayer.php?who=701716"]:before, ' +
'/* T */' +
'a[href="showplayer.php?who=903784"]:before, a[href="showplayer.php?who=1804322"]:before, a[href="showplayer.php?who=1474380"]:before' +
'{content: " (DJ) " !important; font-weight: bold !important; color: #40A !important;}' +
'#ChatWindow font b a:before, #ChatWindow font b a:before, #ChatWindow b + i a:before {content: "" !important;}' +
'/* J */' +
'a[href="showplayer.php?who=1959735"]:before ' +
'{content: " (Non-DJ) " !important; font-weight: bold !important; color: #40A !important;}' +
'#ChatWindow font b a:before, #ChatWindow font b a:before, #ChatWindow b + i a:before {content: "" !important;}' 


+

'font[color="blue"] b a font[color="blue"]:after {content: "" !important;}';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css2632);
} else if (typeof addStyle != "undefined") {
	addStyle(css2632);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css2632));
		heads[0].appendChild(node); 
	}
}
