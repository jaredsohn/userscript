// ==UserScript==
// @name          NoBlablas
// @namespace     http://www.example.org/noblablas/
// @description	  Pour ne plus afficher les blablas :hap:
// @include       http://www.jeuxvideo.com/forums/0-*
// @version       1.2.1
// ==/UserScript==

function hideBlablas(updateFromWeb)
{
	// Récupérer dans avec GM_getValue la liste des blablas
	// obtenue avec updateBlablas() sur kapou.org ou utiliser
	// la liste en dur si elle n'est pas disponible.

	if(typeof GM_getValue('listeBlablas') === 'undefined')
	{
		var blablas = ['NicNacetChocopoppies','BlablaOfEmos','JaitoujoursrvdavoirmonBlabla','FaitesptervosLastfm','yatildesgaysicicoeur','LamphidescarabinsBlablaMdecine','Leblabladesfous','BlaBlaDesBonsMoments','LeBlabladuMetal','LultimeBlabladu1518','Blabla','BlabladesterminalesS','BlaBladeszoneB','AnimeAfterStory','Jaipasdidedetitre','OfficielSDFdelamourleblabla','Bunkercontre20121501Places','TheGenesis','MusicisonlyNoise','PokemonGemmeImpossible','Blabladesspermatozoides','Letopicdescouchetard','Lesfillesvenezparlonssexe','NouveauBlabla','Legendary','NoName','Blabladudessin','blabladesfillesdu1518','TheNameless','AionPrototype','LEden','Shandora','Fusion','Jesuislegniedesarmes','ComeAsYouAre','BlabladesES','Rsurgencedesfous','PetitBlabladusoirveneznombreux  ','NoPornLetopicdusexe','MylittleponyFriendshipismagic','MEGABAVERevelucidefapfapfap ','BringIt','JeuMPLesLoupsGarousdeThiercelieux','ActuUnblablaestn','MineCommuLeBlabla','Lesdprimscetopicestpournous','AttrapezlestousBlablaPokemon','LeBlablaDeConseil','BlabladesVraisHommes','BlablaNancy','QuizzBlablaPokmon','BlabladeWinker','BlaBladesrfugis','LeBlabladesclibatairesamoureux','LeBlabladela1518Radio','Blabladessuissesv20','Leblabladesmatinaux','BlabladeCislaetKiyah','MonBlabla','LeBlaBladesViaMobileVenerhap','LeblabladesCicatricescoeur','BlaBladesfansdeStarWars','Carbone','LeblablasansModoshap'];
	}
	else
	{
		var blablas = GM_getValue('listeBlablas').split('\n');
	}

	var perso = GM_getValue('blablasPerso');

	if(typeof perso !== 'undefined' && perso !== '')
	{
		perso = perso.split('\n');
		
		for(var i in perso)
		{
			blablas.push(perso[i].replace(/[^a-zA-Z0-9]/g, ''));
		}
	}

	// Vérifier chaque topic
	
	var topics = document.getElementById('liste_topics').getElementsByTagName('tr');

	for(var i = 1; i < topics.length; i++)
	{
		var talc = topics[i].childNodes[3].firstChild.firstChild.data;

		for(var j in blablas)
		{
			if(i > 25 || (talc.replace(/[^a-zA-Z0-9]/g,'').toLowerCase() === blablas[j].toLowerCase()))
			{
				topics[i].parentNode.removeChild(topics[i]);
				i--;
				
				break;
			}
		}

		// À cause de la latence entre le chargement de
		// la première et de la deuxième page, blacklister
		// le topic pour ne pas l'avoir en double.
		
		blablas.push(talc.replace(/[^a-zA-Z0-9]/g,''));

		// Topics bleus/blancs

		if((i & 1) === 1)
		{
			topics[i].className = 'tr1';
		}
		else
		{
			topics[i].className = 'tr2';
		}
	}

	if(updateFromWeb)
	{
		updateBlablas();
	}
}

function fusionPage2()
{
	// Trouver l'url de la page 2 (applicable
	// sur tous les forums)
	
	var url = location.href.split('-');
	url[5] = parseInt(url[5]) + 25;
	url = url.join('-');

	// Récupérer la page 2 en Ajax
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url + '?_=' + (new Date().getTime()), true);

	xhr.onreadystatechange = function(evt)
	{
		if(xhr.readyState === 4)
		{
			// Fusionner les deux pages puis cacher
			// les topics en trop et les blablas
			
			var result = xhr.responseText.split('</th>\n</tr>\n')[1].split('</table>')[0];
			
			document.getElementById('liste_topics').innerHTML += result;
			hideBlablas(true);
		}
	};

	xhr.send(null);
}

function updateBlablas()
{
	// Récupérer ou mettre à jour la liste
	// des blablas avec GM_setValue
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://kapou.org/blablas.txt?_=' + (new Date().getTime()),
		
		onload: function(response)
		{
			if(response.responseText.substr(0, 6) === 'NicNac')
			{
				GM_setValue('listeBlablas', response.responseText);
			}
		}
	});
	antiFlood();
	ajouterPrefs();
}

function ajouterPrefs()
{
	var lienBase = document.getElementById('post').getElementsByClassName('lien_base')[0];

	var code = '<div id="prefs" style="display: none; padding: 12px 0 20px 15px">'
			 + 'Ajouter un blabla (n\'oubliez pas les accents) :<br>'
			 + '<input type="text" style="margin: 10px 0 15px 0" id="blablaAAjouter"> '
			 + '<input type="button" value="ok" id="ajouterBlabla"><br>'
			 + '<select style="width: 350px; height: 200px; margin-bottom: 12px" multiple="multiple" id="reaclist"></select><br>'
			 + 'Ou <input type="button" id="react" value="Réactiver l\'affichage du blabla sélectionné"><br>'
			 + '</div>';

	lienBase.innerHTML += '| <a href="#" id="hideblabla">Cacher un blabla</a>';
	document.getElementById('post').innerHTML += code;
	
	document.getElementById('hideblabla').onclick = function(e)
	{
		e.preventDefault();

		var jqry = unsafeWindow.jQuery;

		if(jqry('#prefs').is(":visible"))
		{
			jqry('#prefs').hide('slow');
		}
		else
		{
			jqry('#prefs').show('slow');
		}
	};

	var list = document.getElementById('reaclist');
	
	var perso = GM_getValue('blablasPerso');

	if(typeof perso === 'undefined' || perso === '')
	{
		perso = '';
	}
	else
	{
		var arrPerso = perso.split('\n');

		for(var i in arrPerso)
		{
			var option = document.createElement('option');
			option.innerHTML = arrPerso[i];
			list.appendChild(option);
		}
	}

	document.getElementById('ajouterBlabla').onclick = function()
	{
		var aAjouter = document.getElementById('blablaAAjouter').value;
		
		var option = document.createElement('option');
		option.innerHTML = aAjouter;
		list.appendChild(option);

		if(perso === '')
		{
			perso += aAjouter;
		}
		else
		{
			perso += '\n' + aAjouter;
		}
		GM_setValue('blablasPerso', perso);

		hideBlablas(false);
	};

	document.getElementById('react').onclick = function()
	{
		if(list.selectedIndex !== -1)
		{
			var selected = list.options[list.selectedIndex];
			perso = perso.replace(selected.value, '').replace('\n\n','');
			list.removeChild(selected);

			if(perso === '\n')
			{
				perso = '';
			}
			
			GM_setValue('blablasPerso', perso);
		}
	};
}

function antiFlood()
{
	var pseudos = document.getElementsByClassName('pseudo');

	for(var i in pseudos)
	{
		pseudos[i].style.maxWidth = '80px';
	}
}

fusionPage2();