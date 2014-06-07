// ==UserScript==
// @name Grooveshark Fast Ad Remover
// @namespace 
// @version  2.0 
// @description    Completely removes the sidebar (ads) and extends the player to fill the screen
// @include        http://listen.grooveshark.com/*
// @author         Eric Lammertsma (http://userscripts.org/users/4742) & Manish Chiniwalar (http://userscripts.org/users/manishchiniwalar)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==


//remove sidebar
var adSidebar = document.getElementById('capital');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}


GM_addStyle("#application { margin-right: 0px !important;}");
//end