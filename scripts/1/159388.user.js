// ==UserScript==
// @name          MegaDDB
// @namespace     http://www.example.org/megaddb/
// @description	  Pour envoyer des DDB à la peau lisse :hap:
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @version       4.0
// ==/UserScript==

var cacherMenu = function()
{
	menu.style.display = 'none';
}

var pseudo;
var date;
var url;

// Signaler

var confirmer = function(session, patienter, mask, dejaEssaye)
{
	var errone = dejaEssaye ? 'Code invalide <img src="http://image.jeuxvideo.com/smileys_img/18.gif"><br><br>' : '';
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeIdentite.action',
		data: 'Age=-1&Sexe=-1&cPostal=&complementAdresse=&email=&nom=&pays=-1&prenom=&rue=&telephone=&ville=&idSessionSignalement=' + session,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function(res) {
			var captcha = 'https://www.internet-signalement.gouv.fr' + res.responseText.split('><img src="')[1].split('"')[0];

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/captcha.action',
				binary: true,
				overrideMimeType: 'text/plain; charset=x-user-defined',
				onload: function(res) {
					patienter.innerHTML = errone + 'Veuillez recopier le code de confirmation :<br>(uniquement des lettres en majuscules)<br><img src="data:image/jpeg;base64,' + encode64(res.responseText) + '"><form id="validDDB" action="#"><input type="text" id="captDDB"> <input type="submit" value="ok"></form>';

					document.getElementById('captDDB').focus();
					document.getElementById('captDDB').select();

					document.getElementById('validDDB').onsubmit = function(evt)
					{
						evt.preventDefault();
						
						var contenuCaptcha = document.getElementById('captDDB').value.toUpperCase().replace(/[^A-Z]/g, '');
						
						patienter.innerHTML = '<img style="vertical-align: middle" src="http://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif">&nbsp;&nbsp;Veuillez patienter... <img src="http://image.jeuxvideo.com/smileys_img/18.gif">';

						GM_xmlhttpRequest({
							method: 'POST',
							url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeConfirmer.action',
							data: 'robot=' + contenuCaptcha + '&identification=' + url + '&Commentaires=Pseudo : ' + pseudo + '.&&idSessionSignalement=' + session,
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							onload: function(res) {
								if(res.responseText.indexOf('Veuillez recopier le code, le code entr') !== -1)
								{
									confirmer(session, patienter, mask, true);
								}
								else {
									patienter.innerHTML = 'DDB gouvernementale envoyée. <img src="http://image.jeuxvideo.com/smileys_img/26.gif"><br><br><input type="button" id="fermerDDB" value="ok">';

									document.getElementById('fermerDDB').focus();
									document.getElementById('fermerDDB').select();

									document.getElementById('fermerDDB').onclick = function()
									{
										document.body.removeChild(mask);
										document.body.removeChild(patienter);
									};
								}
							}
						});
					};
				}
			});
		}
	});
};

var encode64 = function(input)
{
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var output = "";
	var i = 0;
	
	while (i < input.length)
	{
		var chr1 = input.charCodeAt(i++) & 255;
		var chr2 = input.charCodeAt(i++);
		var chr3 = input.charCodeAt(i++);

		if(!isNaN(chr2)) chr2 &= 255;
		if(!isNaN(chr3)) chr3 &= 255;
		
		output += b64[chr1 >> 2] + b64[((chr1 & 3) << 4) | (chr2 >> 4)] +
			(isNaN(chr2) ? '=' : b64[((chr2 & 15) << 2) | (chr3 >> 6)]) +
			(isNaN(chr3) ? '=' : b64[chr3 & 63]);
	}
	return output;
};

var signaler = function(event)
{
	var mask = document.createElement('div');
	mask.style.boxShadow = '0 0 15px #646464';
	mask.style.position = 'fixed';
	mask.style.left = '0';
	mask.style.top = '0';
	mask.style.zIndex = '999';
	mask.style.width = '100%';
	mask.style.height = '100%';
	mask.style.background = 'black';
	mask.style.opacity = '0.5';
	document.body.appendChild(mask);
	
	var patienter = document.createElement('div');
	patienter.style.zIndex = '999';
	patienter.style.background = 'white';
	patienter.style.padding = '15px';
	patienter.style.fontSize = '16px';
	patienter.style.boxShadow = '0 0 15px black';
	patienter.style.position = 'fixed';
	patienter.style.left = '50%';
	patienter.style.top = '50%';
	patienter.style.marginTop = '-100px';
	patienter.innerHTML = '<img style="vertical-align: middle" src="http://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif">&nbsp;&nbsp;Veuillez patienter... <img src="http://image.jeuxvideo.com/smileys_img/18.gif">';
	document.body.appendChild(patienter);
	
	var postHeader = {'Content-Type': 'application/x-www-form-urlencoded'};
	var typeContenu = this.className[1];

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeChoixTypeContenu!input.action',
		onload: function(res) {
			var session = res.responseText.split('t" value="')[1].split('"')[0];
			
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeChoixTypeContenu.action',
				data: 'TypeDeContenu=' + typeContenu + '&idSessionSignalement=' + session,
				headers: postHeader,
				onload: function(res) {
					GM_xmlhttpRequest({
						method: 'POST',
						url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeQuandEtOu.action',
						data: 'Date=' + date + '&Site=3&idSessionSignalement=' + session,
						headers: postHeader,
						onload: function(res) {
							GM_xmlhttpRequest({
								method: 'POST',
								url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeDescriptionUrl.action',
								data: 'URL=' + url + '&Site=3&idSessionSignalement=' + session,
								headers: postHeader,
								onload: function(res) {
									GM_xmlhttpRequest({
										method: 'POST',
										url: 'https://www.internet-signalement.gouv.fr/PortailWeb/planets/SignalerEtapeDescriptionCommentaire.action',
										data: 'Commentaires=Pseudo : ' + pseudo + '.&idSessionSignalement=' + session,
										headers: postHeader,
										onload: function(res) {
											confirmer(session, patienter, mask, false);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
};

// Afficher la popup

var afficherPopup = function(event)
{
	event.preventDefault();

	// Récupérer la date

	var mois = {'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04', 'mai': '05',
				'juin': '06', 'juillet': '07', 'août': '08', 'septembre': '09', 'octobre': '10',
				'novembre': '11', 'décembre': '12'}

	date = this.parentNode.innerHTML.match(/([0-9]{1,2}) ([A-zôéû]+) ([0-9]{4}) à ([0-9]{2}):([0-9]{2})/);
	date = ('0' + date[1]).slice(-2) + '/' + mois[date[2]] + '/' + date[3] + '&Heure=' + date[4] + '&Minute=' + date[5];

	// Récupérer le pseudal et l'URL

	pseudo = this.parentNode.parentNode.getElementsByClassName("pseudo").item(0).getElementsByTagName("strong").item(0).firstChild.data;

	url = location.href.split('#')[0] + '#' + this.parentNode.parentNode.parentNode.getAttribute('id');

	if(pseudo === 'VortexMagma') {
		alert("Va tester le script sur un autre message s'il te plaît :hap:");
		return;
	}

	// Récupérer la position en pixels

	var node = this;
    var curtop = 0;
    var curtopscroll = 0;
    
	while (node = node.offsetParent)
	{
		curtop += node.offsetTop;
		curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
	}

	if(navigator.userAgent.toLowerCase().indexOf('webkit') !== -1)
	{
		curtopscroll = 0;
	}

	menu.style.display = 'block';
	menu.style.left = this.getBoundingClientRect().left + 'px';
	menu.style.top = (curtop - curtopscroll + 12) + 'px';
};

document.body.addEventListener('click', cacherMenu, true);

// Créer la petite icône bleue

var a = document.createElement('a');
a.href = '#';

var img = document.createElement('img');

img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUe' +
          'eAAAAzUlEQVQoz42RvQ4BQRSFv/lBKMQTSCQSjUSjWa+BbTyI3nNoFBr2OYgnkShJ' +
          '2Nk1O4qNibWEU5775dxzZ0QQRo4f2m8mAkADDPqdH3jk9puJ0ABxbL29XAwBmM0PV' +
          'LREK0Gv24Ywcjmc2FLW8XSh1azTqGvvaQBjynBqzlzjGkraInwzWQnObEKa3rkZ4T' +
          '0RhJFzmS1A9/SaJ1UaSFXNQanQ74m77QyAYLxCSFWYyW+PZW3C60bf+VWj6drXeJc' +
          'A+NT72dNXUFX8qf98+wMCdEymsOsLNwAAAABJRU5ErkJggg==';

a.appendChild(img);
a.appendChild(document.createTextNode(' '));

// L'ajouter à chaque message

var dates = document.getElementsByClassName('date');

for(var i = 0, len = dates.length; i < len; i++)
{
	var parent = dates[i];
	var clone = a.cloneNode(true);
	clone.addEventListener('click', afficherPopup, true);
	parent.insertBefore(clone, parent.lastChild);
}

// Dessiner le menu

var menu = document.createElement('div');
menu.style.display = 'none';
menu.style.boxShadow = '0 0 15px #646464';
menu.style.width = '300px';
menu.style.position = 'absolute';
menu.style.zIndex = '42';
menu.style.fontSize = '12px';
menu.style.background = 'white';
menu.style.textAlign = 'left';

var motifs = ['Pédophilie ou corruption de mineur sur Internet',
              'Incitation à la haine raciale ou provocation à la discrimination',
              'Menaces ou incitation à la violence',
              'Trafic illicite (stupéfiants, armes, etc.)',
              'Mise en danger des personnes',
              'Incitation à commettre des infractions'];

for(var i = 0; i < 6; i++)
{
	var motif = document.createElement('div');

	if(i !== 5)
		motif.style.borderBottom = '1px solid #E6E6E6';
	
	motif.style.padding = '6px';
	motif.style.cursor = 'pointer';
	motif.innerHTML = motifs[i];
	motif.className = 'w' + (i + 1);
	menu.appendChild(motif);
	
	motif.onmouseover = function() {
		this.style.background = '#e6e6e6';
	};

	motif.onmouseout = function() {
		this.style.background = '#ffffff';
	};

	motif.addEventListener('click', signaler, true);
}

document.body.appendChild(menu);