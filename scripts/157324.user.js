// ==UserScript==
// @name          Deezer Unlimited HQ + DJ mode (FIRST SCRIPT TO DO THIS !) - remove all ADS - By NaS,FaV & PaL
// @namespace     NaSFaVPaL
// @description    removes the limit on deezer, removes all ads , enable high quality sound and DJ MODE functionality
// @include        http://*.deezer.*/*
// ==/UserScript==


 function remove_limit() {

var div = '<div class="h_hovercard_t-b box-shadow"><span class="arrow_hovercard t_arrow"></span><div><h4 class="discovery" style="display: block">By NaS, FaV & PaL</h4></div><hr><div><p class="discovery" style="display: block"><span class="fc_link">Temps d"écoute restant :</span></p><b class="discovery" style="display: block"><span class="minutes">∞min</span></b><b class="t-b" style="display: none"><span class="days_left fc_link">11</span>/<span class="days_total"></span></b></div><hr></div>';

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.textContent = "dzPlayer.setForbiddenListen=function(status){try{dzPlayer.user_status.limited=false;this.trigger('audioPlayer_setLock',[dzPlayer.user_status.limited])}catch(e){console.log(e.message,e.stack)}};$('.timeline_t-b .remaining').css('background','green');dzPlayer.setForbiddenListen(false);naboo.removeAds();$('#ads_300x250').remove();$('.area_picto_t-b').remove();USER.OPTIONS.ads_display=false;USER.OPTIONS.ads_audio=false;USER.OPTIONS.web_hq=true;USER.OPTIONS.dj=true;USER.OPTIONS.web_hq=true;USER.OPTIONS.web_offline=true;USER.OPTIONS.web_streaming=true;USER.OPTIONS.web_streaming_duration=999999999;USER.OPTIONS.web_streaming_free_tracks=999999999;DZPS=true;$('#btnMixage').show();$('#header_content_restriction_hovercard').hide();$('#header_content_restriction .header_hovercard').html('"+div+"');$('#header_content_restriction').unbind('mouseover').bind('mouseover',function(){$('.header_hovercard').show()});$('#header_content_restriction').css('cursor','default');dzPlayer.initSoPlayer=function(div_id){try{var currentFlashVersion=parseInt(deconcept.SWFObjectUtil.getPlayerVersion().major+'.'+deconcept.SWFObjectUtil.getPlayerVersion().minor);if(currentFlashVersion==0)return false;dzPlayer.version=1;var soPlayer=new SWFObject(SETTING_STATIC+'/swf/coreplayer-v'+STATIC_VERSION+'.swf','audioPlayerSWF','24','24',this.minimumFlashVersion.toString(),'#000000',this.minimumFlashVersion.toString());soPlayer.addVariable('configXML',SETTING_HOST_SITE+'/'+SETTING_LANG+'/xml/config-v'+STATIC_VERSION+'.php');soPlayer.addVariable('sessionId',SESSION_ID);soPlayer.addVariable('currentDate',CURRENT_DATE);soPlayer.addVariable('userId',USER.USER_ID);soPlayer.addVariable('random_key',RANDOM_KEY);soPlayer.addVariable('server_timestamp',SERVER_TIMESTAMP);soPlayer.addVariable('offline',OFFLINE);soPlayer.addParam('allowFullscreen','true');soPlayer.addParam('wmode','transparent');soPlayer.addParam('allowScriptAccess','always');soPlayer.addParam('menu','false');soPlayer.addParam('hasPriority','true');soPlayer.write(div_id);return true}catch(e){console.log(e.message,e.stack)}};$('#core_player embed').remove();dzPlayer.initSoPlayer('core_player');";
    document.body.appendChild(script);
}
remove_limit();
