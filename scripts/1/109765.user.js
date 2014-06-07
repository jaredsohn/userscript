// ==UserScript==
// @name OGame - O.F.F. Ogame chat
// @include http://*.ogame.org/game/index.php?page=alliance&*
// ==/UserScript==



(function(){

var placeHolder = document.getElementById('alliance');
if (placeHolder==null) placeHolder = document.getElementById('overview');
if (placeHolder!=null){
	var p = document.createElement("p");
	var chatWindow = '<div id="OFFchat" align="center" ><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMTI5NzU5NTA5NzEmcHQ9MTMxMjk3NTk2MjkwMiZwPTUzMTUxJmQ9Jmc9MSZvPTc2YTI3M2IzMWM3ZDQ3NTdhNWE*/NjIwZGRkMDczNDcx.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width=100% height="405" name="chat" FlashVars="id=151056422&gn=OMEGA_Fighting_Force" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/chat/embed.php?id=151056422&GroupName=OMEGA_Fighting_Force">Get OMEGA_Fighting_Force chat group</a></div>';
	
	p.setAttribute('style', 'margin:0px;');
	p.innerHTML = chatWindow;
	placeHolder.appendChild(p);
}
})();