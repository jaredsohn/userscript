// ==UserScript==
// @name       GAMERSOUL CHATBOX UNMUTE + DISABLE SCROLLING
// @namespace  http://gsgir.co.nr
// @version    3.5
// @description  Unmutes user until [chatbox] refresh and disables scrolling.
// @match      http://www.gamersoul.com/forums/misc.php?do=cchatbox
// @copyright  GSGIR, 2013
// ==/UserScript==


  document.getElementById("vsacb_post_form").action="misc.php?&securitytoken="+SECURITYTOKEN;
  document.getElementById("vsacb_entermessage").style.display="inline";
  document.getElementById("vsacb_submitbutton").style.display="inline";
  document.getElementById("vsacb_entermessage").disabled=false;
  document.getElementById("vsacb_entermessage").readOnly=false;
  document.getElementById("vsacbmsgbegin").readOnly=false;
  document.getElementById("vsacbmsgend").readOnly=false;
  document.getElementById("vsacb_submitbutton").disabled=false;
  document.getElementById("vsacb_submitbutton").onfocus="";
  document.getElementById("vsacb_entermessage").onmouseover="this.readOnly=false";
  document.getElementById("vsacb_entermessage").onclick="this.readOnly=false";
  document.getElementById("vsacb_counter").style.display="inline";
  document.getElementById("muteseparator").style.display="none";
  document.getElementById("customcss").innerHTML = "";
  document.getElementById("mutestatus").innerHTML = "";
  document.getElementById('vsacb_messagearea').style.overflow = 'hidden';
  document.getElementById('vsacb_entermessage').placeholder="GAMERSOUL UNMUTE + DISABLE SCROLLING HAS BEEN EXECUTED"