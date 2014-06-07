// ==UserScript==
// @author         Ari [original Radicali]
// @name           OGame - Chat
// @description    Adiciona CHAT na página da Aliança
// @version        1.02
// @include        http://uni26.ogame.com.pt/game/index.php?page=alliance*
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5MTkzMjM1NzMmcHQ9MTMzNDkxOTMzNjExNyZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="668" height="375" name="chat" FlashVars="id=191503341" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();