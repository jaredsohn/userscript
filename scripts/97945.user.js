// ==UserScript==
// @name                AntiGlobalChatFail
// @namespace	        http://userscripts.org/scripts/show/97945
// @description	        Change the colour of the global chat window
// @include		http://*.kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

if(document.getElementById("mod_comm_list1"))
  { document.getElementById("mod_comm_list1").style.backgroundColor = '#cccccc';}