// ==UserScript==
// @author         Radicai
// @name           OGame - Chat ATLS
// @description    Add's Chatroom In Main Overview, Alliance Tab and Fleet Movement.
// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=alliance*
// @include        http://*.ogame.*/game/index.php?page=allianceBroadcast*
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
  //var element = document.getElementsByClassName('content-box-s')[0];
  //var alleanza = document.getElementById('tabs');
  var p = document.createElement("div"); 
  //var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5MTkzMjM1NzMmcHQ9MTMzNDkxOTMzNjExNyZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="668" height="375" name="uni12cr" FlashVars="id=172277629" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>';
  //var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzU*NDYwODg3NjgmcHQ9MTMzNTQ*NjIyMTM2MiZwPTUzMTUxJmQ9Jmc9MSZvPWU*ZjE4MjA2YjhhMjQ5ZjFhMWVl/NmI*MzA1MTc3NGNm.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="540" height="405" name="chat" FlashVars="id=172769129" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=172769129">Go Large!</a></small><br>';
  var chat ='<noscript>Enable Javascript to get full functionality of this <a href="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=104314">shoutbox</a><br /></noscript><iframe src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=104314" height="300" width="600" frameborder="0"></iframe>' ;

  //element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.setAttribute('align', 'center');
  p.innerHTML = chat;
  element.appendChild(p);
  //if (element != null)
  // element.parentNode.insertBefore(p,element);
  //if (alleanza != null)
    //alleanza.parentNode.insertBefore(p,alleanza);
})();


//	Note: If you wish to change the chatroom to another
//	specific for you and your friends/alliance, you need
//	to edit the part of the script to change the room by
//	altering the part that matches the example below.


//	<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMzQ5MTkzMjM1NzMmcHQ9MTMzNDkxOTMzNjExNyZwPTUzMTUxJmQ9Jmc9MSZvPTk*NTZiMDU3MTc2NTRjZDQ4NmIz/YThlZjBiNTkwMjg1.gif" /><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="668" height="375" name="chat" FlashVars="id=172277629" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><br>