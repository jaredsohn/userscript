// ==UserScript==
// @name           CSM: Xfire support
// @namespace      http://userscripts.org/users/26666
// @description    Adds Xfire support into CS-Manager!
// @include        http://www.cs-manager.com/csm/*
// @include        http://www.cs-manager.com/forum/*
// ==/UserScript==

function makeMenuToggle(C,B,_,$,A){window[C]=GM_getValue(C,B);GM_registerMenuCommand((A?A+": ":"")+(window[C]?$:_),function(){GM_setValue(C,!window[C]);location.reload()})}
makeMenuToggle("show_banner", true, "Show banner", "Hide banner", "CSM: Xfire.com support");

var xfire_skin=["gold","white","blue","brown","red","tan"];
var n = GM_getValue('banner_color', 0);
GM_registerMenuCommand('CSM: Xfire.com support: Change skin', 
	function (e) 
	{
		switch(n)
		{
			case 6:
			GM_setValue('banner_color', 0);
			break;
			default:
			GM_setValue('banner_color', n+1);
		}
		window.location.reload();
	});

// Add 'xfire_egame' div
var div_elem = document.createElement( "div" );
div_elem.setAttribute( "id", "xfire_egame" );
var where=(GM_getValue("show_banner", true))?document.getElementById("footer_right")||document.getElementById("footer_container"):document.getElementById("footer_container");
where.appendChild( div_elem );

// Add xfire script
var xfirescript = document.createElement('script');
xfirescript.src = 'http://www.xfire.com/xfire_egame/egame_engine.xf?rand=' + Math.floor( new Date().getTime() / 180000 ) * 180000; // 'anti-cache' trick
xfirescript.type = 'text/javascript';
document.body.appendChild(xfirescript);

// Check if xfire script is loaded
function XF_wait() {
	if(typeof unsafeWindow.xfire_egame == 'undefined') {
		window.setTimeout(XF_wait,100); }
	else {
		var xfire_options = {'gameid':5483,'skin':xfire_skin[n]};unsafeWindow.xfire_egame.Start( xfire_options );
	}
}
  
window.addEventListener("load", XF_wait,false);