// ==UserScript==
// @name           Skiplimites_Deezer_Test
// @description    Suppression de la limitation des 5 Heures sur Deezer !
// @include        http://*.deezer.*/*
// @author         Firnox&Vulze
// ==/UserScript==
function disableAds() {
var source = "stopAudioAdsTimer();adsTimeoutId=-1;clearTimeout(dzPlayer.logListenId);dzPlayer.setForbiddenListen(false);$('#header_content_profil_username #header_compteur .progress .conso').css('width','100%');restrict.changeBarColor('green');$('#header_content_profil_username #header_compteur .time').text('illimité');if(document.getElementById('tips_deezernotify')){$('#tips_deezernotify').remove()}";
var script = document.createElement('script');
script.setAttribute("type", "application/javascript" );
script.textContent = source;
document.documentElement .appendChild(script);
}
disableAds();
setInterval(disableAds, 5000)