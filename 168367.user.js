// ==UserScript==
// @name           FB Ad Bye Bye
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.08
// ==/UserScript==

// if you want to eliminate the right hand column then you can activate the lines that are deactivated


GM_addStyle(((new CDATA("\n" + 
"	.ego_unit,\n" + 
"	div[id^=\"pagelet_ego_pane_w\"],\n" + 
//"	div[id^=\"pagelet_reminders\"],\n" + 
//"	div[id^=\"pagelet_rhc_ticker\"],\n" + 
//"	div[id^=\"pagelet_rhc_footer\"],\n" + 
"	div[id^=\"emu_\"],\n" + 
"   #home_stream li[data-ft*='\"ei\"']\n" + 
                        
"{display:none!important;}\n" + 
""))).toString());

// document.getElementById('rightCol').style.width = '0px'; 
// document.getElementById('contentArea').style.width = '95%';