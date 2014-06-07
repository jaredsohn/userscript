// ==UserScript==
// @name          JV Boost
// @namespace     http://perdu.com/jvboost
// @description   Script pour booster des avis sur JVC.
// @include       http://www.jeuxvideo.com/profil/*
// @version       1.1
// ==/UserScript==

//  Un bouton s'affiche sur votre CDV après avoir installé le script.

var nbJeu = 2;
var nbPoints = 0;
var urlForm = 'http://www.jeuxvideo.com/cgi-bin/admin/addavis_new.cgi?jeu=';
var urlAddAvis = 'http://www.jeuxvideo.com/cgi-bin/admin/addavis_new.cgi';
var urlOCR = 'http://bidequest.alwaysdata.net/tesseract.cgi?'
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Ajouter un espace pour les nombres de plus de trois chiffres.

function ajouterEspace(nbr)
{
	return nbr.toString().replace(/(\d+)(\d{3})/, '$1 $2');
}

// Fonction récursive pour envoyer un avis.

function envoyerAvis()
{
	// Récupérer la page du formulaire
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', urlForm + nbJeu, true);
	xhr.onload = function()
	{
		var resp = xhr.response;
		
		// La page est-elle valide (contient-elle un captcha ?)
		
		if(resp.indexOf('ccode.cgi') !== -1)
		{
			// Récupérer les valeurs des <input>
			
			var data = 'etape=2&note=20&pass=-logged-';
			data += '&nom=' + resp.split('nom" value="')[1].split('"')[0];
			data += '&hh=' + resp.split('hh" value="')[1].split('"')[0];
			var time = resp.split('time" value="')[1].split('"')[0];
			data += '&tk=' + time;
			data += '&time=' + time;
			data += '&val=' + resp.split('val" value="')[1].split('"')[0];
			data += '&jeu=' + resp.split('jeu" value="')[1].split('"')[0];
			data += '&key_session=' + resp.split('key_session" value="')[1].split('"')[0];
			
			// Générer le texte de l'avis.
			
			data += '&texte=H';
			
			for(var i = 0; i < 200; i++)
			{
				data += alphabet[Math.floor(Math.random() * 26)];
			}
			
			data += '.';
			
			// Lire le Captcha avec un OCR.
			
			var ccode = resp.split('<img src="http://www.jeuxvideo.com/cgi-bin/')[1].split('"')[0].replace('&amp;', '&');
			ccode = 'http://www.jeuxvideo.com/cgi-bin/' + ccode;
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: urlOCR + ccode,
				onload: function(response)
				{
					data += '&code=' + response.responseText;
					
					// Envoyer l'avis.
					
					var xhr = new XMLHttpRequest();
					xhr.open('POST', urlAddAvis, true);
					xhr.onload = function()
					{
						// Le CdC était-il correct ?
						
						if(xhr.response.indexOf('le <strong>code de confirmation') === -1)
						{
							nbJeu++;
							nbPoints += 5;
							textNode.nodeValue = '+' + ajouterEspace(nbPoints) + ' points';
						}
											
						// Passer à l'avis suivant ou réessayer.
						
						envoyerAvis();
					}
					xhr.send(data);
				}
			});
		}
		
		// Passer au jeu suivant si ce n'est pas le cas
		
		else
		{
			nbJeu++;
			envoyerAvis();
		}
	}
	xhr.send();
}

// Est-on sur notre propre CDV ?

if(document.getElementById('msg_visible') !== null)
{
	var ongletBooster = document.createElement('li');
	var lienBooster = document.createElement('a');
	var textNode = document.createTextNode('Booster');
	var idOnglets = document.getElementById('onglets');
	var idLastOnglet = document.getElementById('o_moncompte');
	
	lienBooster.href = '#';
	lienBooster.appendChild(textNode);
	ongletBooster.appendChild(lienBooster);
	idOnglets.insertBefore(ongletBooster, idLastOnglet);
	
	lienBooster.onclick = function(e)
	{
		e.preventDefault();
		
		alert('Si vous quittez ou rechargez cet onglet, ou bien si vous vous déconnectez ou vous changez de compte, le boost s\'arrêtera.');
		
		ongletBooster.removeChild(lienBooster);
		textNode.nodeValue = '+0 point';
		ongletBooster.className = 'on';
		ongletBooster.appendChild(textNode);
		
		// Vérifier où on en était si on a déjà commencé le boost
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', location.href.replace('.html', '-contributions.html'), true);
		xhr.onload = function()
		{
			var resp = xhr.response;
			
			if(resp.indexOf('<h2>Mes autres contributions') !== -1)
			{
				resp = resp.match(/id_jeu=[0-9]+/g);
				var dernier = parseInt(resp.pop().split('=')[1], 10);
				var avantDernier = parseInt(resp.pop().split('=')[1], 10);
				
				if(dernier === avantDernier + 1)
				{
					nbJeu = dernier + 1;
				}
			}
			
			envoyerAvis();
		}
		xhr.send();
	}
}
