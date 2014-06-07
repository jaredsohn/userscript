// ==UserScript==
// @name           LCP FLVStreamer Linker
// @namespace      *
// @description    Fournit la commande flvstreamer correspondant Ã Â  chaque Ã©mission
// @include        http://www.lcp.fr/emissions/*
// ==/UserScript==

	// Selecteur de class
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];
		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}

	function getPageEpisode(url,targetId)
	{
		// Appel AJAX de la page de l'episode pour recuperer le lien RTMP
		GM_xmlhttpRequest({
			  method: "GET",
			  url: 'http://www.lcp.fr/' + url[1],
			  onload: function(response) {
				if (rtmpMatch = response.responseText.match(/(rtmp\:.*?lcp\/)(.*?)\.mp4/)) {
					var titre = url[1].match(/emissions\/(.*?)\/vod\/(.*?)$/);
					var outputName = titre[1] + '-' + titre[2] + '.mp4';
					var rtmpCommand = 'flvstreamer -y ' + rtmpMatch[2] + ' -r ' + rtmpMatch[1] + ' -o ' + outputName;
					
					document.getElementById(targetId).value = rtmpCommand;
				}
			  }
			});
	}
	
	if (rtmpMatch = document.body.innerHTML.match(/(rtmp\:.*?lcp\/)(.*?)\.mp4/)) {
		// Page d'un episode
		
		// Creation du titre du fichier
		var titre = location.href.match(/emissions\/(.*?)\/vod\/(.*?)$/);
		var outputName = titre[1] + '-' + titre[2] + '.mp4';
		
		// Creation de la commande FLVStreamer
		var rtmpCommand = 'flvstreamer -y ' + rtmpMatch[2] + ' -r ' + rtmpMatch[1] + ' -o ' + outputName;

		// Affichage de la commande
		var contentHTML = '<div><input type="text" name="textfield" onFocus="this.select();" style="width:650px;" id="flvstreamer" value="' + rtmpCommand + '"</></div><br/>';
		document.getElementsByClassName('zone-video clearfix')[0].innerHTML = contentHTML + document.getElementsByClassName('zone-video clearfix')[0].innerHTML;
		
	} else {
		// Page d'une emission
		
		// Boucle sur les episodes
		episodes = document.getElementsByClassName('h3');
		for (var i = 0; (episode = episodes[i]) != null; i++) {
			var url = episode.innerHTML.match(/<a href="(.*?)"/);
			var targetId = 'flvstreamer' + i;
			var contentHTML = '<div><input type="text" name="textfield" onFocus="this.select();" style="width:300px;" id="' + targetId + '" value="Chargement en cours..."/></div><br/>';
			episodes[i].innerHTML = episodes[i].innerHTML + contentHTML;
			getPageEpisode(url,targetId);
		}
	}
	
	// Auteur du script de mise a jour : http://userscripts.org/users/jarett
	var SUC_script_num = 116458;
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
									if(confirm('Une nouvelle mise a jour est disponible pour : "'+script_name+'."\nVoulez vous l\'installer maintenant ?')){
										GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');
										GM_setValue('SUC_current_version', remote_version);
									}
								}
								else if (forced) alert(script_name+' est deja dans sa version la plus recente');
							}
							else GM_setValue('SUC_current_version', remote_version+'');
						}
					});
				}
				catch (err){
					if (forced) alert('Une erreur est survenue dans la verification de mise à jour:\n'+err);
				}
			}
		}
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'LCP FLVStreamer Linker') + ' - Mise à jour manuelle', function(){
			updateCheck(true);
		});
		updateCheck(false);
	}
	catch(err){}



		

	
	