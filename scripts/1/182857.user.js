// ==UserScript==
// @name        Deezer
// @namespace  Cg3
// @include    *.deezer.*/
// [USER=167384]version[/USER]    1
// ==/UserScript==
function *****() {
    var source = " object.results.time_left = 7200;stopAudioAdsTimer();adsTimeoutId=-1;clearTimeout(dzPlayer.logListenId);dzPlayer.setForbiddenListen(false);$('#header_content_profil_username #header_compteur .progress .conso').css('width','100%');restrict.gaugeDisable();$('#push_abo').empty().css('background-color', 'rgb(58, 58, 58)').css('height', '13px').css('width', '186px').css('color', 'white').css('text-align', 'right').css('padding', '2px 2px').css('margin-top', '10px').append('Unrestricted by Evaelis !');if(document.getElementById('tips_deezernotify')){$('#tips_deezernotify').remove()}";
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");