// ==UserScript==
// @name           Deezer Unlimited  for PM2012
// @namespace     PROJECT MAYHEM 2012 
// @description    Suppression de la limitation des 5 Heures sur Deezer ! by HsXoP for  PROJECT MAYHEM 2012
// @include        http://*.deezer.*/*
// ==/UserScript==
function Retirer_Limite() {
    var content = "stopAudioAdsTimer();adsTimeoutId=-1;clearTimeout(dzPlayer.logListenId);dzPlayer.setForbiddenListen(false);$('#header_content_restriction').html('<h2 style=\"color: #24A72E;padding: 8px 10px 8px 25px;text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9), 0 0 22px #00CF10;margin-right: 10px;background: url(http://img607.imageshack.us/img607/8351/checkx.png) no-repeat center left;font-size: 14px;\">Unlimited by PROJECT MAYHEM 2012 </h2>');if(document.getElementById('tips_deezernotify')){$('#tips_deezernotify').remove()}";  
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = content;
    document.body.appendChild(script);
}
Retirer_Limite();
setInterval(Retirer_Limite, 15000);