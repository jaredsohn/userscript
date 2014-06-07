// ==UserScript==
// @name           OGame: Reloader
// @namespace      Gilly
// @include        http://*.ogame.de/game/index.php?page=overview*
// ==/UserScript==

// zufallswert in millisek zwischen 90sek und 7min
// 2min = 120000  // 7min = 420000 => 300000zwischenraum also *300001
var reloadIn=Math.floor(Math.random()*300001)+90000;
window.setTimeout(
	function(){
		window.location.reload();
		var counter = GM_getValue("reloaded",0);	// nur zum mitzaehlen
		GM_setValue("reloaded",++counter);			// nicht notwendig
	}, reloadIn);




// ==UserScript==
// @name           OGame: Autologin
// @namespace      Gilly
// @include        http://ogame.de/
// ==/UserScript==
var uni="uniXY.ogame.de";
var userid='';
var passwd='';
if( document.getElementsByName('login')[0] ) 
	document.getElementsByName('login')[0].value=userid;
if( document.getElementsByName('pass')[0].value=passwd )
	document.getElementsByName('pass')[0].value=passwd;
if( document.getElementById('uni_select_box') )
	document.getElementById('uni_select_box').value=uni; 
if( document.forms[0] )
	document.forms[0].submit();