// ==UserScript==
// @name           Deezer illimite
// @description    Retire les limitations de la radio de Deezer, les pubs audio, la limite de 5h d'Ã©coute et dÃ©place l'emplacement GeoIP sur la France.
// @author         Linweline
// @icon           http://s3.amazonaws.com/uso_ss/icon/133866/large.png
// @include        http://*.deezer.*/*
// @include        https://*.deezer.*/*
// ==/UserScript==

// Retire les limitations de la radio de Deezer
location.href = "javascript:void(window.playercontrol.smartRadioSkipTotal = '999999999')";


// Retire les pubs audio et la limite de 5h d'Ã©coute
function disableAds() {
	var source = 
	"naboo.removeAds();"+
	"stopAudioAdsTimer();"+
	"adsTimeoutId=-1;"+
	"clearTimeout(dzPlayer.logListenId);"+
	"dzPlayer.setForbiddenListen(false);"+
	"dzPlayer.user_status = '';"+
	"$('#header_content_restriction').remove();"+
	"var hqQuality=false;"+
	"$('#btnHq').live('click',function(){dzPlayer.setHq(!hqQuality);"+
	"hqQuality=!hqQuality;return false;});";

	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
}
disableAds();
setInterval(disableAds, 5000);


// Emplacement GeoIP sur la France
document.getElementById("flash").innerHTML = "<embed width=\"100%\" height=\"100%\" flashvars=\"urlIdSong=&amp;search=&amp;varemail=&amp;varuserid=&amp;lang=EN&amp;geoip=FR&amp;URL=0\" quality=\"high\" bgcolor=\"#444444\" name=\"dzflash\" src=\"/deezer_edna.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";
document.getElementById("player").innerHTML = "<embed width=\"300\" height=\"310\" flashvars=\"lang=EN&listen=&geoip=FR\" quality=\"true\" bgcolor=\"#444444\" name=\"dzplayer\" id=\"dzplayer\" src=\"/player_flanders.swf?Version=2.0.0.2\" type=\"application/x-shockwave-flash\"/>";


// Mises Ã  jours du script
var SUC_script_num = 133866;
try{
	function updateCheck(forced){
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){
			try{
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp){
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1){
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version){
								if(confirm('Une nouvelle mise Ã  jour est disponible pour : "'+script_name+'."\nVoullez vous l\'installer maintenant ?')){
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced) alert(script_name+' est dÃ©ja dans sa version la plus rÃ©cente');
						}
						else GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err){
				if (forced) alert('Une erreur est survenu dans la verification de mise Ã§ jour:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Deezer illimitÃ©') + ' - Mise Ã  jour manuel', function(){
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err){}
