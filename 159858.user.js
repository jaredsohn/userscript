// ==UserScript==
// @author         Radicai
// @name           OGame - Chat
// @description    Add's Chatroom in botton of Alliance Ogame page.
// @description    The chat will only be allowed to Ghost Bear alliance members, and anyone outside alliance joining the chat will be banned from the chat.
// @include        http://uni111.ogame.*/game/index.php?page=alliance*
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5MTkzMjM1NzMmcHQ9MTMzNDkxOTMzNjExNyZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="688" height="375" name="chat" FlashVars="id=191308491" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();


//	Note: If you wish to change the chatroom to another
//	specific for you and your friends/alliance, you need
//	to edit the part of the script to change the room by
//	altering the part that matches the example below.


//	<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5MTkzMjM1NzMmcHQ9MTMzNDkxOTMzNjExNyZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="688" height="375" name="chat" FlashVars="id=191308491" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>