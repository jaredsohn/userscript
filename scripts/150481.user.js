// ==UserScript==
// @name        Ogame 4PiP chat
// @namespace   namescpacexyz
// @description Ogame 4PiP chat
// @include     http://*.ogame.*/game/index.php?page=overview*
// @include     http://*.ogame.*/game/index.php?page=alliance*
// @include     http://*.ogame.*/game/index.php?page=allianceBroadcast*
// @include     http://*.ogame.*/game/index.php?page=movement*
// @version     1
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNTA2NTg*MzY*MjYmcHQ9MTM1MDY1ODQ*NzkwNSZwPTUzMTUxJmQ9Jmc9MiZvPTk3Zjg4OTcwZDJkMDRhNGE5ZTll/YTJiYTg3NzEwY2E4Jm9mPTA=.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="540" height="405" name="chat" FlashVars="id=184407714&rl=- Cant" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();