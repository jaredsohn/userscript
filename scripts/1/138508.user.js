// Freezer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Freezer
// @author        remouk
// @namespace     http://shiii.org
// @description   List3n to d33z3r for fr33
// @include       http://www.deezer.com/*
// @version       0.3
// @date          2012-07-16
// ==/UserScript==

function disableAds() {
    var source = "stopAudioAdsTimer();adsTimeoutId=-1;clearTimeout(dzPlayer.logListenId);dzPlayer.setForbiddenListen(false);$('#header_content_profil_username #header_compteur .progress .conso').css('width','100%');restrict.changeBarColor('green');$('#header_content_profil_username #header_compteur .time').text('Free');if(document.getElementById('tips_deezernotify')){$('#tips_deezernotify').remove()}";  
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
}
disableAds();
setInterval(disableAds, 5000);