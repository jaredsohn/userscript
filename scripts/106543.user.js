// ==UserScript==
// @name           Dzr No-Limit
// @namespace      Paulair
// @description    Remove 5h limit.
// @version        1.0
// @include        http://www.deezer.com/*

// ==/UserScript==

function disableAds() {
   var source = "stopAudioAdsTimer();adsTimeoutId=-1;clearTimeout(dzPlayer.logListenId);dzPlayer.setForbiddenListen(false);$('#header_content_profil_username #header_compteur .progress .conso').css('width','100%');restrict.changeBarColor('red');$('#header_content_profil_username #header_compteur .time').text('Free');if(document.getElementById('tips_deezernotify')){$('#tips_deezernotify').remove()}";  
   var script = document.createElement('script');
   script.setAttribute("type", "application/javascript" );
   script.textContent = source;
   document.documentElement .appendChild(script);
}
disableAds();
setInterval(disableAds, 5000);
