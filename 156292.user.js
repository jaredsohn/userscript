// ==UserScript==
// @name          JV Avatar Lite
// @namespace     http://www.jeuxvideo.com/jvavatar
// @description   Voir les avatars à côté des messages sur les forums de JVC, sans les coins arrondis ni l'ombre.
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @version       1.2
// ==/UserScript==

// Permettre l'utilisation de localStorage pour le cache.

if (window.localStorage != null)
{
	localStorage = window.localStorage;
}

else if (typeof unsafeWindow !== 'undefined' && unsafeWindow.localStorage != null)
{
	localStorage = unsafeWindow.localStorage;
}

// Charger jQuery.

if (window.$ != null)
{
	$ = window.$;
	jQueryLoaded();
}

else if (typeof unsafeWindow !== 'undefined' && unsafeWindow.$ != null)
{
	$ = unsafeWindow.$;
	jQueryLoaded();
}

// Si jQuery n'est pas accessible directement (Chrome),
// utiliser cette astuce qui consiste à charger notre
// script dans une balise <script>, à la portée du $.

else
{
	var script = document.createElement("script");
	script.appendChild(document.createTextNode("(" + jQueryLoaded.toString() + ")();"));
	(document.body || document.head || document.documentElement).appendChild(script);
}

// Une fois que jQuery est chargé...

function jQueryLoaded()
{
	// Fonction pour insérer l'avatar à côté
	// du message.
	
	var setImg = function(url, msg) {
		var img = new Image();
		
		img.onload = function() {
			$(msg).css('min-height', (img.height + 20) + 'px');
			
			var supdiv = $('<div></div>');
			supdiv.css('width','90px');
			supdiv.css('height',img.height+'px');
			supdiv.css('float', 'left');
			supdiv.css('margin','10px');
			supdiv.css('margin-bottom','0');
			supdiv.css('margin-top','10px');
			
			var div = $('<div></div>');
			div.css('margin','auto');
			div.css('width',img.width+'px');
			div.css('height',img.height+'px');
			
			div.css('background', 'url(' + url + ') no-repeat center center');
			
			$(msg).prepend(supdiv.append(div));
		}
		
		img.src = url;
	};
	
	$('.msg li').css('clear','none');
	
	// Faire une boucle pour chaque message

	$('.msg').each(function() {
		var msg = this;
		
		if($('a[target=profil]', msg).length === 0)
		{
			return;
		}
		
		// Insérer des marges
			
		$('ul', this).css('margin-left', '110px');
		$(this).css('min-height', '110px');
		
		// Vérifier si l'avatar est présent dans le cache
		
		var pseudo = $('.pseudo strong', this).text();
		var cached = false;
		
		if(localStorage[pseudo])
		{
			setImg(localStorage[pseudo], msg);
			cached = true;
		}
		
		// Récupérer l'URL de l'avatar depuis la CDV
		
		window.setTimeout(function() {
			$.get($('a[target=profil]', msg).attr('href'), function(url) {
				if(url.indexOf(' src="http://image.jeuxvideo.com/avatars/') !== -1)
				{
					url = url.split(' src="http://image.jeuxvideo.com/avatars/')[1];
					url = url.split('" border="0"')[0];
					url = 'http://image.jeuxvideo.com/avatars/' + url;
				}
				else
				{
					url = 'http://image.noelshack.com/fichiers/2013/02/1357849258-banni.png';
				}
				
				// Mettre à jour l'URL, et l'insérer dans le
				// message si le cache ne l'a pas déjà fait.

				localStorage[pseudo] = url;
				
				if(!cached)
					setImg(url, msg);
			});
		}, cached ? 1000 : 0);
	});
}