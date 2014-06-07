// ==UserScript==
// @author         Radicai
// @name           OGame - DDC Chat (Extra+)
// @description    Chat "DDC Alliance" In Overview, Alliance and Fleet Movement Tab.
// @include        http://uni101.ogame.org/game/index.php?page=overview*
// @include        http://uni101.ogame.org/game/index.php?page=alliance*
// @include        http://uni101.ogame.org/game/index.php?page=allianceBroadcast*
// @include        http://uni101.ogame.org/game/index.php?page=movement*
// ==/UserScript==

(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5Mjg*MjYzODEmcHQ9MTMzNDkyODQzMTcyNiZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="668" height="375" name="chat" FlashVars="id=178496913" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br><br>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();

