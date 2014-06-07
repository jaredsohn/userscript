// ==UserScript==
// @name           Tang Be Gone
// @namespace      http://solitude12.deviantart.com
// @description    Removes the tangerine colors from dA! (Like the search bar!)
// @include        http://*.deviantart.com/*
// @exclude        http://chat.deviantart.com/chat/*
// ==/UserScript==

/* 
 * Author: Solitude12
 * Date: Saturday July 26th, 2008
 * Version: 0.1a
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/


// ORANGE IS NOT THE NEW LIME GREEN. OH SORRY, 'TANGERINE'!! >:C
// BTW This was simple v-v

//I made it compatible w/ FF2! :D
document.getElementById("searchArea").setAttribute("class", "");
GM_addStyle("#noTouch #searchDropdownOverlay.tang {background-image:url(http://st.deviantart.com/minish/main/sleek.gif) !important;border-bottom: 1px solid #617562 !important;}");
GM_addStyle("#noTouch #searchDropdownMenu.tang {background-color: #A6B5A8 !important;background:url(/minish/main/sleek.gif) no-repeat 0px -222px !important; color: #313F3A !important;}");
GM_addStyle("#noTouch #searchDropdownMenu.tang {background:#829586 url(/minish/main/searchdropdownmenubg.gif) bottom right no-repeat !important;    border: 1px solid #576960 !important; border-top: 0px !important;}");
GM_addStyle("#noTouch #searchDropdownMenu.tang div.sdmItem {color: #384641 !important;}");
GM_addStyle("#noTouch #searchDropdownMenu.tang div.sdmItemHover {    background-color: #347489 !important; color: white !important;}");

