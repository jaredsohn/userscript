// ==UserScript==
// @name       Free deezer
// @namespace  http://use.i.E.your.homepage/
// @version    2.0
// @description  enter something useful
// @match      http://*.deezer.com*
// @copyright  2012+, Airmanbzh
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    function disableAds(){
        var source = "dzPlayer.setForbiddenListen = function(status) {try {if(dzPlayer.version == 1) {dzPlayer.user_status.limited = false;this.trigger('audioPlayer_setLock', [dzPlayer.user_status.limited])}} catch(e) {console.log(e.message, e.stack)}};$('.timeline_t-b .remaining').css('background', 'green');dzPlayer.setForbiddenListen(false);naboo.removeAds();$('#ads_300x250').remove();$('.area_picto_t-b').remove();USER.OPTIONS.ads_display = false;USER.OPTIONS.ads_audio = false;USER.OPTIONS.web_hq = true;USER.OPTIONS.dj = true;USER.OPTIONS.web_hq = true;USER.OPTIONS.web_offline = true;USER.OPTIONS.web_streaming = true;USER.OPTIONS.web_streaming_duration = 999999999;USER.OPTIONS.web_streaming_free_tracks = 999999999;DZPS = true;$('#btnMixage').show();$('#header_content_restriction_hovercard').hide();if($('#push_abo').length > 0){$('#push_abo').remove();}$('#header_content_restriction').unbind('mouseover').bind('mouseover', function(){$('.header_hovercard').show();});$('#header_content_restriction').css('cursor','default');";
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript" );
        script.textContent = source;
        document.documentElement .appendChild(script);
    }
    disableAds();
    setInterval(disableAds, 5000);
});