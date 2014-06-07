// TK Embedded Ogame Chat
// Version 1.2
// ==UserScript==
// @name OGame - TK Clan Ogame chat
// @author FlyinB
// @include http://uni111.ogame.org/game/index.php?page=alliance&*
// @include http://uni111.ogame.org/game/index.php?page=overview&*
// ==/UserScript==



(function(){

var placeHolder = document.getElementById('alliance');
if (placeHolder==null) placeHolder = document.getElementById('overview');
if (placeHolder!=null){
	var p = document.createElement("p");
	var chatWindow = '<div id="TK_Chat" align="center" style="width:auto"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object width="800" height="350"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=lxTPzPCntO"></param><embed src="http://widget.meebo.com/mcr.swf?id=lxTPzPCntO" type="application/x-shockwave-flash" width="800" height="350" /></object><a target="_blank" href="http://www.meebo.com/rooms/" class="mcrmeebo"><img alt="Create a Meebo Chat Room" src="http://widget.meebo.com/b.gif" width="800" height="45" style="border:0px"/></a></div>';
	
	p.setAttribute('style', 'margin:0px;');
	p.innerHTML = chatWindow;
	placeHolder.appendChild(p);
}
})();

