// ==UserScript==
// @author         bigune
// @name           OGame - Chat
// @description    chat na vista geral do ogame.
// @description    esclusivo da bhz mizar.
// @include        http://uni113.ogame.*/game/index.php?page=overview
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=00 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNjU4NzE2NTIxODgmcHQ9MTM2NTg3MTY3NjkyMSZwPTUzMTUxJmQ9Jmc9MiZvPWFiOTNhMTc*MGRiODQ2ZjliMWU1/MGUzNDQ4NDM4NDZiJm9mPTA=.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="660" height="300" name="chat" FlashVars="id=193990642&gn=Bhzgroup" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/chat/embed.php?id=193990642&GroupName=Bhzgroup">Get Bhzgroup chat group</a> | <a target="_BLANK" href="http://xat.com/Bhzgroup"> Goto Bhzgroup website</a></small><br>';
  element.setAttribute('style', 'height:600px;background-image:none;');
  p.setAttribute('style', 'margin:5px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();


//	Note: If you wish to change the chatroom to another
//	specific for you and your friends/alliance, you need
//	to edit the part of the script to change the room by
//	altering the part that matches the example below.


//	<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNjU4NzEwNDY3MTAmcHQ9MTM2NTg3MTA2MDI*MiZwPTUzMTUxJmQ9Jmc9MiZvPWFiOTNhMTc*MGRiODQ2ZjliMWU1/MGUzNDQ4NDM4NDZiJm9mPTA=.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="540" height="405" name="chat" FlashVars="id=193989201" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=193989201">Go Large!</a></small><br>                                                                                                                                                                                                                                                                           
