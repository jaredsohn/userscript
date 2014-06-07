// ==UserScript==
// @name        FreeTube v2 : débridage Youtube by rAthur & NoEx
// @description FreeTube débride les vidéos Youtube pour ne plus qu'elles galèrent leur race quand on est chez Free ;)
// @namespace   Arkanite
// @downloadURL https://userscripts.org/scripts/source/161718.user.js
// @updateURL   https://userscripts.org/scripts/source/161718.meta.js
// @version     2.12alpha
// @include     http*://*youtube.*
// @include     http*://*proxfree.com/*
// @include     http://rathur.fr/Greasemonkey/Youtube/player-2.0.php?url=*
// @icon        http://rathur.fr/Greasemonkey/Youtube/icon.png
// @require     http://rathur.fr/Greasemonkey/Youtube/jquery.min.js
// @require     http://rathur.fr/Greasemonkey/Youtube/flowplayer-3.2.11.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var counter = GM_getValue('counter', 0);
console.log('Ce script a été initialisé '+counter+' fois.');
GM_setValue('counter', ++counter);
/****************/
/****************/
/** EVERY GO ! **/
/****************/
/****************/
var defaultlang = 'fr'; // Langue par défaut si aucune n'est trouvé selon le navigateur du visiteur.
var defaultserver = 'fr'; // Serveur par défaut si aucun n'a été selectionné par le visiteur.
var nb_try_GM_xmlhttpRequest_max = 5; // Nombre max de tentatives d'utilisation de la nouvelle méthode de débridage avant de repasser à l'ancienne.
/**************************************************************************************/
/** A partir de là ne modifiez le code que si vous êtes surs de ce que vous faites ! **/
/**************************************************************************************/
var versionFreeTube = '2.12alpha';
var h_player_bonus = 50;
var nb_try_GM_xmlhttpRequest = 0;
var listenOnRepeat = 0;
var activateFreeTube = GM_getValue('activateFreeTube', 1);
var activateOldMode = GM_getValue('activateOldMode', 0);
var titre_page_original = document.title;
var langlist = 'fr,en';
if (GM_getValue('lang', false))
	var lang = GM_getValue('lang', false).toLowerCase();
else if (navigator.browserLanguage)
	var lang = navigator.browserLanguage.substr(0,2).toLowerCase();
else
	var lang = navigator.language.substr(0,2).toLowerCase();
if (langlist.indexOf(lang)==-1)
	lang = defaultlang.toLowerCase();
if (GM_getValue('server', false))
{
	var server = GM_getValue('server', defaultserver.toLowerCase());
	var serverNotSelected = false;
}
else
{
	var server = (lang=='en')?'uk':defaultserver.toLowerCase();
	GM_setValue('server', server);
	var serverNotSelected = true;
}
var lang_names =
	{
		'fr':
			{
				'fr': 'Français',
				'en': 'Anglais'
			},
		'en':
			{
				'fr': 'French',
				'en': 'English'
			}
	};
var server_names = 
	{
		'fr':
		{
			'fr': 'France',
			'uk': 'Angleterre',
			'nl': 'Pays-Bas',
			//'dc': 'Etats-Unis (District de Columbia)',
			'il': 'Etats-Unis (Illinois)',
			'co': 'Etats-Unis (Colorado)',
			'tx': 'Etats-Unis (Texas)',
			'wa': 'Etats-Unis (Washington)',
			'ut': 'Etats-Unis (Utah)',
			'ca': 'Etats-Unis (Californie)'
		},
		'en':
		{
			'fr': 'France',
			'uk': 'United Kingdom',
			'nl': 'Netherlands',
			//'dc': 'United States East (DC)',
			'il': 'United States Central (IL)',
			'co': 'United States Central (CO)',
			'tx': 'United States Central (TX)',
			'wa': 'United States West (WA) ',
			'ut': 'United States West (UT)',
			'ca': 'United States West (CA)'
		}
	};
var sentences = 
	{
		'fr':
			{
				'remerciements': 'Vous utiliser le débrideur FreeTube créé par rAthur et NoEx !\n\nRemerciements particuliers à :\n- B3N\n- Korben\n- MrCourgettos\n- Yann\n- Cortx\n- Nicolas Rousseau\n- Arthur\n...et vous qui l\'utilisez !',
				'activer_oldmode': 'Activer le OldMode',
				'desactiver_oldmode': 'Désactiver le OldMode',
				'activer_freetube': 'Activer FreeTube',
				'desactiver_freetube': 'Désactiver FreeTube',
				'chargement_patientez': 'Chargement, veuillez patienter',
				'chargement_video_debridee': 'Chargement de la vidéo débridée',
				'tentative': 'tentative',
				'en_cours': 'en cours',
				'erreur_serveur_debrid': 'Erreur ! Le serveur de débridage n\'a pas répondu... cliquez sur "Ok" pour réessayer. Si l\'erreur persiste, réessayez plus tard...',
				'playlist_oldmode': 'Attention : la lecture de playlist ne fonctionne pas lorsque le OldMode est activé, il faudra donc manuellement passer à la vidéo suivante !',
				'chargement_long': 'Le chargement semble long',
				'cliquez_ici': 'cliquez ici',
				'pour_reessayer': 'pour réessayer',
				'dites_moi': 'Hé dites moi !',
				'vous_etes_un_robot': 'Vous êtes un robot ?',
				'resolutions_disponibles': 'Résolutions disponibles pour cette vidéo',
				'resolution_defaut': 'Résolution par défaut que vous souhaitez',
				'nous_devons_verifier': 'Nous devons vérifier que vous n\'êtes pas un robot. Veuillez donc recopiers les 2 mots de l\'image ci-dessous et cliquer sur le bouton "Je ne suis pas un robot" afin de continuer',
				'bonne_reponse': 'Bonne réponse, cliquez sur "Valider" pour afficher votre vidéo',
				'video_existe_plus': 'La vidéo que vous avez demandé n\'existe pas ou a été supprimée !',
				'selectionner_langue': 'Changer la langue',
				'selectionner_serveur':'Changer de serveur',
				'ne_plus_afficher': 'Ne plus afficher ce message',
				'serveur_non_selectionne': '<b>Information :</b> Il semblerait que vous n\'ayez pas sélectionné manuellement de serveur de débridage. Nous avons automatiquement sélectionné pour vous le serveur "'+server_names[lang][server]+'". Vous pouvez changer de serveur à tout moment grâce au menu en haut à droite.<br /><b>Astuce :</b> Le serveur français est souvent saturé en raison de sa forte utilisation et le débit des vidéos est ralentit, vous pouvez contourner ce problème en sélectionnant un autre serveur comme par exemple "Angleterre" ou "Pays-Bas".',
				'chargement_ancienne_methode': 'Chargement de la vidéo débridée (ancienne méthode) en cours...',
				'erreur_proxfree_phrase1': 'Une erreur est survenue du côté du service VPN qui gère de débridage du flux de la vidéo. Pour réessayer,',
				'erreur_proxfree_phrase2': 'Ce problème arrive par exemple lorsque le service est surchargé ou en maintenance, cela peut durer quelques secondes ou jusqu\'à plusieurs heures.',
				'erreur_proxfree_phrase3': 'Si la vidéo ne revient pas quand vous réessayez, revenez dans quelques minutes, ou désactivez FreeTube pour repasser à la version normale de Youtube en attendant que le service VPN fonctionne à nouveau !',
				'erreur_proxfree_phrase4': 'Détails de l\'erreur fournis par le service'
			},
		'en':
			{
				'remerciements': 'You\'re using the debrid script FreeTube created by rAthur and NoEx !\n\nSpecial thanks to :\n- B3N\n- Korben\n- MrCourgettos\n- Yann\n- Cortx\n- Nicolas Rousseau\n- Arthur\n- Tolrem\n- Kodama\n...and you for using it !',
				'activer_oldmode': 'Activate the OldMode',
				'desactiver_oldmode': 'Desactivate the OldMode',
				'activer_freetube': 'Activate FreeTube',
				'desactiver_freetube': 'Desactivate FreeTube',
				'chargement_patientez': 'loading, please wait',
				'chargement_video_debridee': 'Loading the debrided video',
				'tentative': 'try',
				'en_cours': 'in progress',
				'erreur_serveur_debrid': 'Error ! The debrid server didn\'t answer... click on "Ok" to retry. If the error persists, try again later...',
				'playlist_oldmode': 'Warning : playlists don\'t work when the OldMode is activated, you will have to manualy go to the next video !',
				'chargement_long': 'Loading seems long',
				'cliquez_ici': 'click here',
				'pour_reessayer': 'to try again',
				'dites_moi': 'Hey you !',
				'vous_etes_un_robot': 'Are you a robot ?',
				'resolutions_disponibles': 'Resolutions available for this video',
				'resolution_defaut': 'Default resolution you want',
				'nous_devons_verifier': 'We have to check that you are not a robot. Please copy the 2 words of the following image and click on the "I am not a robot" button to continue',
				'bonne_reponse': 'Good answer, click on "Valider" to watch your video',
				'video_existe_plus': 'The requested video doesn\'t exist or has been deleted !',
				'selectionner_langue': 'Change language',
				'selectionner_serveur':'Change server location',
				'ne_plus_afficher': 'Ne plus afficher ce message',
				'serveur_non_selectionne': '<b>Information :</b> It seems that you haven\'t selected your default server. We have automaticaly chosen for you the server "'+server_names[lang][server]+'". You can change it anytime with the top-right menu.',
				'chargement_ancienne_methode': 'Loading the debrided video (old method) in progress...',
				'erreur_proxfree_phrase1': 'An error occured on the VPN service provider. To try again,',
				'erreur_proxfree_phrase2': 'This problem occure for example when the service is overloaded or under maintenance, it can last several minuts and sometimes several hours.',
				'erreur_proxfree_phrase3': 'If the video doesn\'t work when you retrye, come back in a minute, or desactivate Freetube to go back to Youtube\'s standard version until the VPN works again !',
				'erreur_proxfree_phrase4': 'Error details given by the service'
			}
	};
if (location.href.match(/^http[s]{0,1}\:\/\/www\.youtube\.com/))
{
	if (activateFreeTube!=0)
		$('#logo-container').html('<img src="http://rathur.fr/greasemonkey/Youtube/logo_youtube.png" />').attr('title',sentences[lang]['remerciements']);
	$('#yt-masthead-user,#yt-masthead-signin').append('<div id="wrapperMenuFreeTube" style="display: inline-block; position: relative; z-index: 10000000; left: 10px; cursor: default; vertical-align: middle; margin: 0; padding: 0;"><img id="menuButton" src="http://rathur.fr/greasemonkey/Youtube/button_menu'+((activateFreeTube==0)?'':'_active')+'.png" title="Menu FreeTube" style="width: 43px; height: 29px;" /><div id="menuFreeTube" style="position: absolute; top: 0px; right: 43px; width: 200px; border-top: 1px solid #000; background: #fff; display: none;"></div></div>');
	GM_addStyle('#menuFreeTube a { display: block; position: relative; background: #fff; border-right: 1px solid #000; border-bottom: 1px solid #000; border-left: 1px solid #000; padding: 10px; color: #333; } #menuFreeTube a:hover { text-decoration: none; background: #ddd; }');
	$('#wrapperMenuFreeTube').hover(function()
	{
		if (typeof(originalMenuButon)!='undefined')
			clearTimeout(originalMenuButon);
		$('#menuFreeTube').stop(true).fadeTo(250,1);
		$('#menuButton').attr('src','http://rathur.fr/greasemonkey/Youtube/button_menu'+((activateFreeTube==0)?'':'_active')+'_arrow.png');
	},
	function()
	{
		$('#menuFreeTube').stop(true).delay(500).fadeTo(500,0).fadeOut(0);
		originalMenuButon = setTimeout(function()
		{
			$('#menuButton').attr('src','http://rathur.fr/greasemonkey/Youtube/button_menu'+((activateFreeTube==0)?'':'_active')+'.png');
		},1000);
	});
	$('#menuFreeTube')
		.append('<a class="menuBlock" href="javascript: void(0);">'+((activateFreeTube==0)?sentences[lang]['activer_freetube']:sentences[lang]['desactiver_freetube'])+'</a>')
		.append('<a class="menuBlock" href="javascript: void(0);">'+((activateOldMode==0)?sentences[lang]['activer_oldmode']:sentences[lang]['desactiver_oldmode'])+'</a>')
		.append('<a class="menuBlock" href="javascript: void(0);">'+sentences[lang]['selectionner_langue']+'</a>')
		.append('<a class="menuBlock" href="javascript: void(0);">'+sentences[lang]['selectionner_serveur']+'</a>');
	$('#menuFreeTube a.menuBlock:eq(2)').append('<div id="langBox" style="display: none; position: absolute; right: 199px; top: -1px; z-index: 1000000; width: 150px; background: #fff; border-top: 1px solid #000; text-align: left;"></div>');
	for (var i in lang_names[lang])
		$('#langBox').append('<a href="javascript: void(0);" lang="'+i+'" style="background: '+((i==lang)?'#999':'')+'; color: '+((i==lang)?'#fff':'#333')+'">'+lang_names[lang][i]+'</a>');
	$('#langBox a').click(function()
	{
		var langNew = $(this).attr('lang');
		GM_setValue('lang', langNew);
		location.reload();
	});
		$('#menuFreeTube a.menuBlock:eq(3)').append('<div id="serverBox" style="display: none; position: absolute; right: 199px; top: -1px; z-index: 1000000; width: 200px; background: #fff; border-top: 1px solid #000; text-align: left;"></div>');
	for (var i in server_names[lang])
		$('#serverBox').append('<a href="javascript: void(0);" server="'+i+'" style="background: '+((i==server)?'#999':'')+'; color: '+((i==server)?'#fff':'#333')+'">'+server_names[lang][i]+'</a>');
	GM_addStyle('#serverBox a { display: block; color: #333; background: #fff; border-bottom: 1px solid #000; padding: 10px; } #serverBox a:hover { text-decoration: none; background: #ddd; }');
	$('#serverBox a').click(function()
	{
		var serverNew = $(this).attr('server');
		GM_setValue('server', serverNew);
		location.reload();
	});
	$('#menuFreeTube a.menuBlock:eq(0)').click(function()
	{
		activateFreeTube = (activateFreeTube==1)?0:1;
		GM_setValue('activateFreeTube', activateFreeTube);
		$('#menuButton').attr('src','http://rathur.fr/greasemonkey/Youtube/button_menu'+((activateFreeTube==0)?'':'_active')+'.png').attr('title',sentences[lang]['chargement_patientez']+'...');
		$(this).text((activateFreeTube==0)?sentences[lang]['activer_freetube']:sentences[lang]['desactiver_freetube']);
		location.reload();
	});
	$('#menuFreeTube a.menuBlock:eq(1)').click(function()
	{
		activateOldMode = (activateOldMode==1)?0:1;
		GM_setValue('activateOldMode', activateOldMode);
		$(this).text((activateOldMode==0)?sentences[lang]['activer_oldmode']:sentences[lang]['desactiver_oldmode']);
		location.reload();
	});
	$('#menuFreeTube a.menuBlock:eq(2)').hover(function()
	{
		$('#langBox').stop(true).fadeTo(250,1);
	},
	function()
	{
		$('#langBox').stop(true).fadeTo(500,0).fadeOut(0);
	});
	$('#menuFreeTube a.menuBlock:eq(3)').hover(function()
	{
		$('#serverBox').stop(true).fadeTo(250,1);
	},
	function()
	{
		$('#serverBox').stop(true).fadeTo(500,0).fadeOut(0);
	});
	checkLogFile = function()
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://rathur.fr/Greasemonkey/Youtube/_log.js?timestamp='+new Date().getTime(),
			onload: function(data)
			{
				if (data.responseText)
					eval(data.responseText);
			}
		});
	}
	checkLogFile();
}
if (activateFreeTube!=0)
{
	if (location.href.match(/^http[s]{0,1}\:\/\/www\.youtube\.com\/watch/))
	{
		if (serverNotSelected)
			$('#watch7-container').prepend('<div style="background: #FFAE4F; margin-left: 225px; width: '+($('#player-api').width()-20)+'px; border-bottom: 1px solid #000; box-shadow: 0px 5px 10px rgba(0,0,0,0.5); padding: 10px; border-radius: 5px 5px 0 0; line-height: 16px;">'+sentences[lang]['serveur_non_selectionne']+'</div>');
		var w_player = $('#player-api').width();
		var h_player = $('#player-api').height();
		GM_setValue('w_player', w_player);
		GM_setValue('h_player', h_player);
		GM_addStyle('#iframe { width: '+w_player+'px; height: '+(h_player+h_player_bonus)+'px; margin: 0; padding: 0; overflow: hidden; }');
		$('#player-api').css({'color':'#fff','line-height':(h_player+h_player_bonus)+'px'}).animate({'height':(h_player+h_player_bonus)+'px'},500);
		try_GM_xmlhttpRequest = function()
		{
			nb_try_GM_xmlhttpRequest++;
			$('#player-api').html(sentences[lang]['chargement_video_debridee']+((nb_try_GM_xmlhttpRequest>1)?' ('+sentences[lang]['tentative']+' '+nb_try_GM_xmlhttpRequest+'/'+nb_try_GM_xmlhttpRequest_max+') ':' ')+sentences[lang]['en_cours']+'...');
			GM_xmlhttpRequest(
			{
				method: 'POST',
				url: 'http://'+server+'.proxfree.com/request.php?do=go',
				data: 'get='+encodeURIComponent(window.location.href),
				headers:
				{
					'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',
					'Accept': 'application/xml,text/xml',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(data)
				{
					clearTimeout(tooLongTimeout);
					var documentPF = document.implementation.createHTMLDocument('proxfree_page_'+(Math.round(Math.random()*1000)));
					documentPF.documentElement.innerHTML = data.responseText;
					var videoPF = documentPF.getElementById('player');
					var qualityPF = documentPF.getElementById('watch7-headline');
					documentPF = null;
					if ($(videoPF).find('embed').size()>0)
					{
						var vars = decodeURIComponent($(videoPF).find('embed').attr('flashvars').split('config=')[1]);
						var vars_json = eval('('+vars+')');
						var url = vars_json.clip.url;
						var quality_links_container_html = $(qualityPF).html();
						var quality_links = quality_links_container_html.split('<br>')[1];
							quality_links += '<br><br>';
							quality_links += quality_links_container_html.split('<br>')[3];
						$('#player-api').html('<iframe id="iframe" src="http://rathur.fr/greasemonkey/Youtube/player-2.1.php?lang='+lang+'&server='+server+'&url='+encodeURIComponent(url)+'#'+encodeURIComponent(quality_links)+'"></iframe>');
					}
					else if ($(data.responseText).find('.pferror').size()>0)
					{
						var reload_link = $(data.responseText).find('.pfctx2').find('a').attr('href');
						var error_details = $(data.responseText).find('.pferror').find('b').html();
						$('#player-api').css({'line-height':'normal','text-align':'left'});
						if (error_details=='404 Not Found')
							$('#player-api').html('<div style="font-family: arial; padding: 20px; color: #fff;"><p>'+sentences[lang]['video_existe_plus']+'</p></div>');
						else
							$('#player-api').html('<div style="font-family: arial; padding: 20px; color: #fff;"><p>'+sentences[lang]['erreur_proxfree_phrase1']+' <a href="javascript: void(0);" onclick="javascript: top.postMessage(\'refreshMyAssPls()\', \'*\');" style="color: #4FA4FF;">'+sentences[lang]['cliquez_ici']+'</a>.</p><p style="margin-top: 20px; color: #666;">'+sentences[lang]['erreur_proxfree_phrase2']+'</p><p style="margin-top: 20px; color: #999;">'+sentences[lang]['erreur_proxfree_phrase3']+'</p><p style="margin-top: 20px; font-size: 10px;">'+sentences[lang]['erreur_proxfree_phrase4']+' : '+error_details+'</p></div>');
					}
					else
					{
						if (nb_try_GM_xmlhttpRequest<nb_try_GM_xmlhttpRequest_max)
							try_GM_xmlhttpRequest();
						else
							$('#player-api').html('<iframe id="iframe" src="http://'+server+'.proxfree.com/permalink.php?url=41UM227rBiGUckzOWX3HzjOKHy7zpKE28cP5Ktg87HA%3D&bit=1"></iframe>');
					}
				},
				onerror: function()
				{
					if (confirm(sentences[lang]['erreur_serveur_debrid']))
						location.refresh();
				}
			});
		}
		if (activateOldMode==1)
		{
			$('#player-api').html('<iframe id="iframe" src="http://'+server+'.proxfree.com/permalink.php?url=41UM227rBiGUckzOWX3HzjOKHy7zpKE28cP5Ktg87HA%3D&bit=1"></iframe>');
			if ($('#watch7-playlist-bar-next-button').size()>0)
			{
				$('#watch7-playlist-bar-next-button').append('<div id="playlistOldMode">'+sentences[lang]['playlist_oldmode']+'</div>');
				GM_addStyle('#playlistOldMode { position: absolute; z-index: 100000000000000; right: 0; bottom: -40px; width: 300px; height: 50px; background: #FF5F65; color: #000; padding: 0 2px 0 3px; line-height: normal; font-weight: bold; white-space: normal; word-wrap: normal; }');
			}
		}
		else
		{
			try_GM_xmlhttpRequest();
			var tooLongTimeout = setTimeout(function()
			{
				$('#player-api').html(sentences[lang]['chargement_long']+'... <a onclick="javascript: location.reload();" style="cursor: pointer; color: #00cc00;">'+sentences[lang]['cliquez_ici']+'</a> '+sentences[lang]['pour_reessayer']+'.');
			},7000);
		}
		addEventListener('message', function(e)
		{
			eval(e.data);
		}, true);
		sendMeTheCodePls = function()
		{
			var videocode = $(location).attr('href').split('v=')[1].split('&')[0].split('#')[0];
			document.getElementById('iframe').contentWindow.postMessage('postProxfree("'+videocode+'")', '*');
		}
		nextVideoPls = function()
		{
			var nextvideo = $('#watch7-playlist-bar-next-button').attr('href');
			if (nextvideo && listenOnRepeat==0)
				document.location.href = nextvideo;
			else if (listenOnRepeat==1)
				document.getElementById('iframe').contentWindow.postMessage('$f("player").seek(0).play()', '*');
		}
		refreshMyAssPls = function()
		{
			location.reload();
		}
		blinkTitleDitesVousEtesUnRobot = function()
		{
			document.title = (document.title==sentences[lang]['dites_moi'])?sentences[lang]['vous_etes_un_robot']:sentences[lang]['dites_moi'];
		}
		ditesVousEtesUnRobot = function()
		{
			blinkTitleDitesVousEtesUnRobot_interval = setInterval(function()
			{
				blinkTitleDitesVousEtesUnRobot();
			},1500);
		}
		vousEtesUnHumain = function()
		{
			if (typeof(blinkTitleDitesVousEtesUnRobot_interval)!='undefined')
				clearInterval(blinkTitleDitesVousEtesUnRobot_interval);
			document.title = titre_page_original;
		}
		removePlayers = function()
		{
			var player = document.getElementById('movie_player');
			if (typeof(player)!='undefined')
				document.getElementById('player-api').removeChild(player); // HTML5 hack
			if ($('embed').size()>0)
				$('embed').remove();
			if ($('object').size()>0)
				$('object').remove();
		}
		setInterval(function(){ removePlayers(); }, 1000);
		$('#watch7-main-container').on('click', 'a', function()
		{
			if ($(this).attr('onclick').match(/^yt\.www\.watch\.player\.seekTo\(/))
			{
				var time = eval($(this).attr('onclick').split('(')[1].split(')')[0]);
				document.getElementById('iframe').contentWindow.postMessage('$f("player").seek('+time+')', 'http://rathur.fr/greasemonkey/Youtube/player.php?url=*');
				window.scrollTo(0,0);
			}
			return false;
		});
		$('#watch7-sentiment-actions').append('<span><button id="listenOnRepeatButton" class="yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty yt-uix-button-toggled" data-tooltip-text="Répéter cette video"><img src="http://rathur.fr/greasemonkey/Youtube/button_repeat.png" /></button></span>');
		$('#listenOnRepeatButton').click(function()
		{
			listenOnRepeat = (listenOnRepeat==0)?1:0;
			$('#listenOnRepeatButton').find('img').attr('src','http://rathur.fr/greasemonkey/Youtube/button_repeat'+((listenOnRepeat==1)?'_active':'')+'.png');
		});
	}
	else if (location.href.match(/^http\:\/\/rathur\.fr\/Greasemonkey\/Youtube\/player\-2\.0\.php\?url\=/))
	{
		var w_player = GM_getValue('w_player', 640);
		var h_player = GM_getValue('h_player', 480);
		$('#player').css({'width':w_player+'px','height':h_player+'px'});
	}
	else if (location.href.match(/^http\:\/\/(.)+\.proxfree\.com/))
	{
		if ($('#player').size()>0)
		{
			top.postMessage('vousEtesUnHumain()', '*');
			//var vars = decodeURIComponent($('embed').attr('flashvars').split('config=')[1]);
			//var vars_json = eval("("+vars+")");
			//var url = vars_json.clip.url;
			//$('body').html($('#player').html()+$('#watch7-headline').html());
			$('h1').remove();
			var headline = $('#watch7-headline').html();
			$('*').has('#player').addClass('halp');
			$('#player, #player *').addClass('halp');
			$('*').not('.halp').remove();
			$('source[type="video/mp4"]').remove();
			$('*').css({'margin':'0','padding':'0'});
			$('body').append(headline);
			if (activateOldMode==1)
			{
				//GM_addStyle('body { margin: 0; padding: 0; background: #fff; color: #666; font-family: arial; font-size: 13px; text-align: center; } br { font-size: 5px; } a { color: #438BC5; text-decoration: none; } a:hover { text-decoration: underline; } #player-rAthur { width: '+w_player+'px; height: '+h_player+'px; line-height: 360px; text-align: center; background: #000; color: #fff; }');
				$('body').css({ 'margin': '0', 'padding': '0', 'background': '#fff', 'color': '#666', 'font-family': 'arial', 'font-size': '13px', 'text-align': 'center' });
				$('br').css({ 'font-size': '5px' });
				$('a').css({ 'color': '#438BC5', 'text-decoration': 'none' });
				$('a:hover').css({ 'text-decoration': 'underline' });
				$('video').css({ 'background': '#000' });
				$('br').eq(0).remove();
				$('br').eq(3).remove();
				$('br').eq(3).remove();
				$('br').eq(1).remove();
				$('b').eq(0).html("Qualité de la vidéo :");
				$('b').eq(1).html("Qualité par défaut :");
				/*
				$('body').html($('body').html()
					.replace('(The resolution options available for this video)','('+sentences[lang]['resolutions_disponibles']+')')
				    .replace('(The default resolution to always use if available)','('+sentences[lang]['resolution_defaut']+')'));
				*/
				$('a').each(function()
				{
					$(this).attr('href','http://eu.proxfree.com'+$(this).attr('href').replace(/\+/ig,'%2B'));
				});
				var w_player = GM_getValue('w_player', 640);
				var h_player = GM_getValue('h_player', 480);
				$('#FlowPlayer').css({'width':w_player+'px','height':h_player+'px'}); /* à véririfer */
			}
			else
			{
				$('embed').remove();
				var quality_links = $('body').html();
				document.location.href = 'http://rathur.fr/greasemonkey/Youtube/player-2.0.php?url='+encodeURIComponent(url)+'#'+encodeURIComponent(quality_links);
			}
		}
		else if ($('#baseDiv').size()>0)
		{
			$('body').html($('#baseDiv').html()).css({'margin':'10px'});
			$('textarea[name="recaptcha_challenge_field"]').css({'width':'1px','height':'1px','border':'0'});
			$('input[type="submit"]').val('Valider');
			jeNeSuisPasUnRobot = function(jeVousDitQueJeNeSuisPasUnRobot)
			{
				$('textarea[name="recaptcha_challenge_field"]').val(jeVousDitQueJeNeSuisPasUnRobot);
				$('form').eq(0).submit();
			}
			addEventListener('message', function(e)
			{
				eval(e.data);
			}, true);
		}
		else if ($('#recaptcha_response_field').size()>0)
		{
			$('body').css({'font-family':'arial'});
			$('p').eq(0).html(sentences[lang]['nous_devons_verifier']+' :');
			$('input[type="submit"]').before('<br />');
			top.postMessage('ditesVousEtesUnRobot()', '*');
		}
		else if ($('textarea[cols="100"]').size()>0)
		{
			var jeVousDitQueJeNeSuisPasUnRobot = $('textarea[cols="100"]').val();
			$('textarea[cols="100"]').hide();
			$('body').css({'font-family':'arial'});
			$('p').eq(0).html(sentences[lang]['bonne_reponse']+'...');
			parent.postMessage('jeNeSuisPasUnRobot("'+jeVousDitQueJeNeSuisPasUnRobot+'")', '*');
		}
		else if ($('pre').size()>0)
		{
			parent.location.reload();
		}
		else if ($('.pferror').size()>0)
		{
			var reload_link = $('.pfctx2').find('a').attr('href');
			var error_details = $('.pferror').find('b').html();
			if (error_details=='404 Not Found')
				$('body').html('<div style="font-family: arial; padding: 20px; color: #fff;"><p>'+sentences[lang]['video_existe_plus']+'</p></div>');
			else
				$('body').html('<div style="font-family: arial; padding: 20px; color: #fff;"><p>Une erreur est survenue du côté du service VPN qui gère de débridage du flux de la vidéo. Pour réessayer, <a href="javascript: void(0);" onclick="javascript: top.postMessage(\'refreshMyAssPls()\', \'*\');" style="color: #4FA4FF;">'+sentences[lang]['cliquez_ici']+'</a>.</p><p style="margin-top: 20px; color: #666;">Ce problème arrive par exemple lorsque le service est surchargé ou en maintenance, cela peut durer quelques secondes ou jusqu\'à plusieurs heures.</p><p style="margin-top: 20px; color: #999;">Si la vidéo ne revient pas quand vous réessayez, revenez dans quelques minutes, ou désactivez FreeTube pour repasser à la version normale de Youtube en attendant que le service VPN fonctionne à nouveau !</p><p style="margin-top: 20px; font-size: 10px;">Détails de l\'erreur fournis par le service : '+error_details+'</p></div>');
		}
		else if ($('.pfaddressBar').size()>0)
		{
			postProxfree = function(videocode)
			{
				if ($('#block').size()>0)
					$('#block').remove();
				var w_player = GM_getValue('w_player', 0);
				var h_player = GM_getValue('h_player', 0);
				GM_addStyle('body { overflow: hidden; text-align: center; }');
				$('body').append('<div id="block">'+sentences[lang]['chargement_ancienne_methode']+'</div>');
				GM_addStyle('#block { width: 100%; height: '+(h_player+h_player_bonus)+'px; line-height: '+(h_player+h_player_bonus)+'px; text-align: center; background: #000; color: #fff; position: fixed; left: 0; top: 0; z-index: 10000000; }');
				$('.pfaddressBar').val('http://www.youtube.com/watch?v='+videocode); /* à véririfer */
				$('form:eq(0)').submit();
				setTimeout(function()
				{
					$('#block').html(sentences[lang]['chargement_long']+'... <a onclick="javascript: window.history.back();" style="cursor: pointer; color: #00cc00;">'+sentences[lang]['cliquez_ici']+'</a> '+sentences[lang]['pour_reessayer']+'.');
				},7000);
			}
			top.postMessage('sendMeTheCodePls()', '*');
			addEventListener('message', function(e)
			{
				eval(e.data);
			}, true);
		}
	}
}