// ==UserScript==
// @name           Debrideur Megaupload
// @namespace      megaupload debrideur
// @autor      	   Morphing
// @include        http://www.megaupload.com/?d=*
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

	// Ecriture du bouton avec le lien
	var writeLink = function(urlDebrid){
		contentHTML = '<div style="margin-bottom:-50px;" class="down_ad_bg1">'+
					'<div class="down_ad_pad2">'+
						'<a target="_blank" href="'+urlDebrid+'"><img src="http://imagik.fr/uploads/462878" /></a>'+
					'</div>'+
				'</div>';
		document.getElementsByClassName("rew_main_bg4")[0].innerHTML = contentHTML+document.getElementsByClassName("rew_main_bg4")[0].innerHTML;
	};

	// Ensemble des debrideurs disponibles
	var debrideLink = {
		//happydeb
		happydeb : function(url, password){  
			GM_xmlhttpRequest({
				method: 'POST',  
				url: 'http://happydeb.net23.net/',  
				headers: {'Content-type': 'application/x-www-form-urlencoded'},  
				data: 'urllist='+encodeURIComponent(url)+'&password='+password,  
				onload: function(responseDetails) {  
					if(responseDetails.responseText.match(/http:\/\/adf([^ ]+)/i)){
						urlDebrid = responseDetails.responseText.match(/http:\/\/adf([^ ]+)/i)[0]+'';
						writeLink(urlDebrid);
					}  
					else debrideLink.hoangmanhhiep(urlMegaupload, password);  
				}
			});  
		},
		//hoangmanhhiep
		hoangmanhhiep : function(url, password){
		    GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://hoangmanhhiep.info/mu/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: 'urllist='+encodeURIComponent(url)+'&password='+password,
			onload: function(responseDetails) {
					if(responseDetails.responseText.match(/>http(.*?)a>/i)){
					    urlDebrid = responseDetails.responseText.match(/>http(.*?)a>/i)[0]+'';
					    urlDebrid = urlDebrid.replace('>', '').replace('</a>', '').replace('vinaleech.com_', '');
					    writeLink(urlDebrid);
					}  
					else debrideLink.multidebrid(urlMegaupload, password);  
				}
			});  
		},
		
		//multi-debrid
		multidebrid : function(url, password){  
			GM_xmlhttpRequest({
				method: 'POST',  
				url: 'http://multi-debrid.net/index.php',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                data: 'alldebrid=true&debridmax=true&fastdebrid=true&real_acc=true&urllist='+encodeURIComponent(url)+'|'+password,
				onload: function(responseDetails) {
					responseMatch = responseDetails.responseText.match(/href(.*?)style/i);
					urlDebrid  = (responseMatch[0]+'').replace("href='", "").replace("' style", '') ;
					if(responseMatch && !urlDebrid.match(/http:\/\/www\.megaupload\.com/i)){
                                            writeLink(urlDebrid);
					}
					else debrideLink.debridmania(urlMegaupload, password);  
				}
			});  
		},
		// Utilisation du debrideur debrid-mania
		debridmania : function(url, password){
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://debrid-mania.fr/page/debrideur.php?page=debrideur',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: 'dbrid='+encodeURIComponent(url)+'&passed='+password+'&submit=D%E9brider',
				onload: function(responseDetails) {
					if(responseDetails.responseText.match(/,window.open(.*?)"/i)){
						urlDebrid = responseDetails.responseText.match(/,window.open(.*?)"/i)[0]+'';
						urlDebrid = urlDebrid.replace(/,window.open(.*?)http/i, 'http').replace("')", '');
						writeLink(urlDebrid);
					}
					else debrideLink.happydeb(url, password);
				}
			});
		}
                
	};
	// Ecouteur : Quand le contenu est chargé
	window.addEventListener("load", function(){
		// Si le fichier requiere un mot de passe
		if(document.body.innerHTML.match(/Ce fichier est protégé par un mot de passe./i)){
			// On drop la fonction postpassword()
			var newpostpassword = function(){
				if(document.getElementById('filepassword').value == ''){
					document.getElementById('filepassword').focus();
				}
				else{
					curlocation = window.location.href+'';
					password = document.getElementById('filepassword').value+'';
					document.getElementById('passwordfrm').action = curlocation+'&password='+password;
					setTimeout(function(){
						document.getElementById('passwordfrm').submit();
					}, 1000);
				}
			}
			var scriptCode = new Array();
			scriptCode.push('function postpassword(){ newpostpassword = '+newpostpassword+'; newpostpassword(); }');
			var script = document.createElement('script');
			script.innerHTML = scriptCode.join('\n');
			scriptCode.length = 0;
			document.getElementsByTagName('head')[0].appendChild(script); 

			// On ecoute le submit du formulaire
			window.addEventListener("submit", function(){
				newpostpassword();
			}, false);
		}
		// Si on est sur la page de téléchargement
		if(document.body.innerHTML.match(/Téléchargement haute vitesse avec/i) || document.body.innerHTML.match(/Seuls les utilisateurs/i)){
			urlMegaupload = window.location+'';
			// Si un mot de passe est disponible dans l'url
			if(urlMegaupload.match(/password/)){
				password = window.location.search.replace(/(.*?)password=/, '');
			}
			// Si aucun mot de passe n'est disponible
			else{ password = ''; }

			// De commence le debride
			debrideLink.happydeb(urlMegaupload, password);
		}
	}, false);

// Auteur du script de mises à jours : http://userscripts.org/users/jarett
var SUC_script_num = 109453;
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