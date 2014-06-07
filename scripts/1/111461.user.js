// TK Embedded Ogame Chat
// Version 1.2
// ==UserScript==
// @name OGame - TK Clan Ogame chat 2.0
// @author FlyinB
// @include http://uni111.ogame.org/game/index.php?page=alliance&*
// @include http://uni111.ogame.org/game/index.php?page=overview&*
// ==/UserScript==



(function(){

var placeHolder = document.getElementById('alliance');
if (placeHolder==null) placeHolder = document.getElementById('overview');
if (placeHolder!=null){
	var p = document.createElement("p");
	var chatWindow = '<div id="TK_Chat" align="center" style="width:auto"><object width="450" height="360" id="obj_1313106784011"><param name="movie" value="http://TKChat2.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1313106784011&a=230400&b=100&c=996633&d=FFECC5&e=996633&f=91&g=FFECC5&h=FFECC5&j=230400&k=230400&l=000000&m=230400&n=FFECC5&r=100&s=1&t=0&aa=1"/><embed id="emb_1313106784011" src="http://TKChat2.chatango.com/group" width="450" height="360" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1313106784011&a=230400&b=100&c=996633&d=FFECC5&e=996633&f=91&g=FFECC5&h=FFECC5&j=230400&k=230400&l=000000&m=230400&n=FFECC5&r=100&s=1&t=0&aa=1"></embed></object><br>[ <a href="http://TKChat2.chatango.com/clonegroup?ts=1313106784011">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1313106784011">Start New</a> | <a href="http://TKChat2.chatango.com">Full Size</a> ]</div>';
	
	p.setAttribute('style', 'margin:0px;');
	p.innerHTML = chatWindow;
	placeHolder.appendChild(p);
}
})();

