// ==UserScript==
// @name	AwsClic, Wslinx And Lienscash Skipper
// @version	2.0
// @date	17-12-2011
// @description	Ce script ouvre automatiquement les liens créés par AwsClic, Wslinx Et Lienscash sans temps d'attente.
// @creator	35niavlys
// @include	http://www.awsclic.com/l/*
// @include	http://www.lienscash.com/l/*
// @include	http://www.wslinx.com/l/*
// ==/UserScript==

var href = document.getElementsByTagName("a");
for(i = 0; i < href.length; i++)
 {
document.location.href = href[i];
 }
 
 var href = document.getElementsByClassName("redirect");
for(i = 0; i < href.length; i++)
 {
document.location.href = href[i];
 }

// Auteur du script de mises à jours : http://userscripts.org/users/jarett
var SUC_script_num = 109899;
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
								if(confirm('Une nouvelle mise à jour est disponible pour : "'+script_name+'."\nVoullez vous l\'installer maintenant ?')){
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced) alert(script_name+' est déja dans sa version la plus récente');
						}
						else GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err){
				if (forced) alert('Une erreur est survenu dans la verification de mise ç jour:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Débrideur megaupload') + ' - Mise à jour manuel', function(){
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err){}