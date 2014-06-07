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

						'<a href="'+urlDebrid+'"><img src="http://imagik.fr/uploads/462878" /></a>'+

					'</div>'+

				'</div>';

		document.getElementsByClassName("rew_main_bg4")[0].innerHTML = contentHTML+document.getElementsByClassName("rew_main_bg4")[0].innerHTML;

	};



	// Ensemble des debrideurs disponibles

	var debrideLink = {

		// Utilisation du debrideur Only-Mu

		onlymu : function(url, password){

			GM_xmlhttpRequest({

			    method: 'POST',

			    url: 'http://www.only-mu.com/?page=debfree',

			    headers: {'Content-type': 'application/x-www-form-urlencoded'},

			    data: 'linked='+encodeURIComponent(urlMegaupload)+'&passed='+password+'&submit=D%E9brider',

			    onload: function(responseDetails) {

				if(responseDetails.responseText.match(/<br\/><a href="http(.*?)"/i)){

					urlDebrid = responseDetails.responseText.match(/<br\/><a href="http(.*?)"/i)[0]+'';

					urlDebrid = urlDebrid.replace(/<br\/><a href="/, '').replace(/"$/, '');

					writeLink(urlDebrid);

					if(true) return true;

					else return false;

				}

				else debrideLink.knightdebrid(urlMegaupload, password);

			    }

			});

		},

		// Utilisation du debrideur Knight Debrid

		knightdebrid : function(url, password){

			GM_xmlhttpRequest({

			    method: 'POST',

			    url: 'http://www.wawa-debrid.co.tv/',

			    headers: {'Content-type': 'application/x-www-form-urlencoded'},

			    data: 'dalink='+encodeURIComponent(urlMegaupload)+'&dapass='+password+'&submit=D%E9brider',

			    onload: function(responseDetails){

				urlDebrid = 'http://www.wawa-debrid.co.tv/'+responseDetails.responseText;

				if(responseDetails.responseText.match(/\//)){

					writeLink(urlDebrid);

					return true;

				}

				else return false;

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

					alert('Saisir le mot de passe du fichier non de dieu');

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



			// De debrie avec Only Mu et si sa passe pas on test avec Knight Debrid

			//debrideLink.onlymu(urlMegaupload, password);

			debrideLink.onlymu(urlMegaupload, password);

		}

	}, false);