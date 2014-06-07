// ==UserScript==
// @name        kleck0
// @namespace   Chat for ogame
// @description Chat for ogame
// @include     http://uni118.ogame.org/game/index.php?page=overview*
// @include     http://uni118.ogame.org/game/index.php?page=resources*
// @include     http://uni118.ogame.org/game/index.php?page=station*
// @include     http://uni118.ogame.org/game/index.php?page=research*
// @include     http://uni118.ogame.org/game/index.php?page=shipyard*
// @include     http://uni118.ogame.org/game/index.php?page=defense*
// @include     http://uni118.ogame.org/game/index.php?page=fleet1*
// @include     http://uni118.ogame.org/game/index.php?page=alliance*
// @version     v.1.2
// ==/UserScript==

(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNjQyNjM3MDMwODImcHQ9MTM2NDI2MzcwODYzMSZwPTUzMTUxJmQ9Jmc9MSZvPWE*YmU5NWVmM2M*MDQ3NmQ4ODQz/NTE3ZjhkNmY1ZDE4.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="668" height="625" name="chat" FlashVars="id=191958283" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();