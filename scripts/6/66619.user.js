// ==UserScript==
// @name           Marqueur de galaxie redesign
// @namespace      vulca
// @version        2.0.5
// @author         Vulca
// @description    Marqueur de galaxie pour Ogame redesign
// @include        http://*.ogame.*/game/index.php?page=*

// ==/UserScript==


var marqueurChargé = false;
function marqueurScript()
{
if (marqueurChargé) {
    return;
}
marqueurChargé = true;
// Si c'est un univers Redesign
if (document.getElementById('playerName') || (location.href.indexOf('page=showmessage',0))>=0) {
	var Version = '2.0.5';

	if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
	else 											{var FireFox = false;var nomScript='MarqueurGalaxieRedesign';}
	if (navigator.userAgent.indexOf('Opera')>-1) 	var Opera = true;
	else 											var Opera = false;
	var AJours = GM_getValue(nomScript+"aJours",true);

	//{ revision Alu
	var globalPrefs;
	var univers = location.href.split('/')[2];
	/**
	 */
	function getPrefs() {
		globalPrefs = GM_getValue(nomScript);
		if (globalPrefs === undefined) {
			globalPrefs = {};
			savePrefs({});
		} else {
			globalPrefs = JSON.parse(globalPrefs);
		}
		if (globalPrefs[univers] === undefined) {
			globalPrefs[univers] = {};
		}
		return globalPrefs[univers];
	}
	/**
	 */
	function savePrefs(prefs) {
		globalPrefs[univers] = prefs;
		GM_setValue(nomScript, JSON.stringify(globalPrefs));
	}
	//}


	if(!FireFox) {
		function GM_getValue(key,defaultVal)
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue )
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value)
		{
			localStorage.setItem(key, value);
		}
	}

	function stripHTML(txt) {
		return txt.replace(/<\S[^><]*>/g, "")
	}

	function trim(string) {
		return string.replace(/(^\s*)|(\s*$)/g,'');
	}

	//{ revision Alu
	function eventlist(i, galaxie, systeme, f) {
		var input = document.getElementsByClassName('row')[i - 1].getElementsByClassName(listeLettre[f])[0];
		input.addEventListener("click", function(event) {
			var prefs = getPrefs();
			var info = prefs[galaxie+':'+systeme+':'+i];
			nbSauv = prefs[galaxie+':'+systeme+':'+i];
			if (nbSauv === undefined) {
				nbSauv = 4;
			}
			if (nbSauv == f ) {
				input.style.backgroundColor='#'+ color_inactiv[f];
				prefs[galaxie+':'+systeme+':'+i] = 4;
			}
			else {
				input.style.backgroundColor='#'+ color_activ[f];
				for (var k = 0; k < 4; k++) {
					if (k != f) {
						document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[k])[0].style.backgroundColor='#'+ color_inactiv[k];
					}
				}
				prefs[galaxie+':'+systeme+':'+i] = f;
			}
			savePrefs(prefs);
		}, true);
	}

	function eventlist1case (position ,galaxie , systeme) {
		var input = document.getElementsByClassName('row')[position - 1].getElementsByClassName('E')[0];
		input.addEventListener("click", function(event) {
			var prefs = getPrefs();
			var k = prefs[galaxie+':'+systeme+':'+position];
			if (k === undefined) {
				k = 0;
			} else {
				++k % 5;
			}
			input.style.backgroundColor='#'+ color_activ[k];
			if (k === 4) {
				delete prefs[galaxie+':'+systeme+':'+position];
			} else {
				prefs[galaxie+':'+systeme+':'+position] = k;
			}
			savePrefs(prefs);
		}, true);
	}
	//}

	function change() {
		if(uneCase) uneCase=false;
		else uneCase = true;

		GM_setValue(nomScript+'affichage1case'+serveur,uneCase);

		var marqueur = document.getElementsByClassName('marqueur');
		var nbAsup=marqueur.length;
		for (var n = 0 ; n<nbAsup ; n++)
		{
			marqueur[0].parentNode.removeChild(marqueur[0]);
		}

		affiche_script() ;
	}
	var url = location.href;
	if (document.getElementById('playerName')) {
		var serveur = url.split('/')[2];
		var numeroUni = document.getElementsByTagName('title')[0].innerHTML;

		if( ! parseInt(numeroUni.replace( /[^0-9]/g, "")) > 0 )
		{
			var adress = location.href.split('/')[2].split('.');
				adress[0]='';adress[1]='';

			serveur = (numeroUni+'.ogame'+adress.join('.').replace( '..', ".")).toLowerCase();
		}

		GM_setValue(url.split('/')[2], serveur);
	}
	else var serveur = GM_getValue(url.split('/')[2], url.split('/')[2]);


	var listeOption = GM_getValue(nomScript+'option1.2'+serveur, 'B;F;A;S;FF0000;00FF00;0000FF;FFFF00;000000;000000;000000;000000;no;').split(';');

	var uneCase = Boolean(GM_getValue(nomScript+'affichage1case'+serveur,false));

	var listeLettreaff = new Array(listeOption[0],listeOption[1],listeOption[2],listeOption[3]);
	var listeLettre = new Array('B','F','A','S','0');

	var color_activ = new Array(listeOption[4],listeOption[5],listeOption[6],listeOption[7], listeOption[8]);
	var color_inactiv = new Array(listeOption[8],listeOption[9],listeOption[10],listeOption[11]);

	if (listeOption[12] == 'yes') 	var checkMult = true;
	else 							var checkMult = false;




	var color_border= '#5E59A8';
	var option = true;



	// ********************** Options *******************************/

	if (document.getElementById('playerName')) {
		var aff_option ='<li><span class="menu_icon"><img class="mouseSwitch" src="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" rel="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" height="29" width="38"></span><a id="option_galax" class="menubutton " href="" accesskey="" target="_self">';
		aff_option += '<span class="textlabel">Marqueur galaxy</span></a></li>';

		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "option_g");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = aff_option;
		document.getElementById('option_g').insertBefore(tableau, document.getElementById('option_g').firstChild);

		var optionLang = new Array('Name of the box number ', 'color of the activ box number ' , 'color of the inactiv box number ', 'allow checking more than one boxe ("yes" or "no")' );

		if (serveur.indexOf('ogame.fr')>-1) optionLang = new Array('Nom de la case numéro ', 'couleur de la case active numéro ' , 'couleur de la case inactive numéro ', 'Permettre de cocher plusieurs cases');

		// Option du script
		var startOption = true;
		document.getElementById('option_galax').addEventListener("click", function(event)
		{
			if(startOption)
			{
				startOption = false;
				for (var i = 0 ; i<listeOption.length -2; i++)
				{
					listeOption[i] = prompt(optionLang[Math.floor(i/4)] + (i%4+1), listeOption[i] );
				}
			//	listeOption[12] = prompt(optionLang[3], listeOption[12] );
				GM_setValue(nomScript+'option1.2'+serveur, listeOption.join(';'));

			}
		}, true);
	}



	function affiche_script() {
		if(uneCase)
			var affi = ' switch<input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[0]+';" value="'+listeLettreaff[0]+'"  type="button"><input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[1]+';" value="'+listeLettreaff[1]+'" type="button"><input  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[2]+';" value="'+listeLettreaff[2]+'" type="button"><input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[3]+';" value="'+listeLettreaff[3]+'" type="button">';
		else
			var affi = ' switch<input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[0]+';"  type="button" >';

		var x = document.createElement('span');
		x.innerHTML=affi;
		x.setAttribute("id","changeCase");
		x.setAttribute("style","cursor:pointer;");
		x.setAttribute("class","marqueur");
		document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1].appendChild(x);

		var galaxie = parseInt(document.getElementById('galaxy_input').value);
		var systeme = parseInt(document.getElementById('system_input').value);

		document.getElementById("changeCase").addEventListener("click", function(event) {
			change();
		}, true);

		//{ revision Alu
		for (var position = 1; position < document.getElementsByClassName('row').length + 1; ++position) {
			var planetName = document.getElementsByClassName('row')[position - 1].getElementsByClassName('planetname')[0];
			if (planetName) {
				var prefs = getPrefs();
				var info = prefs[galaxie+':'+systeme+':'+position];
				if (info === undefined) {
					info = 4;
				}
				if (!uneCase) {
					var aff ='';
					for (var f = 0 ; f<4; f++){
						if(info == f)
							aff += '<input class="'+listeLettre[f]+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						else
							aff += '<input class="'+listeLettre[f]+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px; color:#FFFFFF; background-color:#'+color_inactiv[f]+';" value="'+listeLettreaff[f]+'" type="button">';
					}

					var nomPlanete = trim(stripHTML(planetName.innerHTML));
					var lengthNom = nomPlanete.length;
					if (planetName.getElementsByClassName('ajaxTips thickbox phalanxlink')[0])
						lengthNom+=2; // Si image phalange

					if (lengthNom > 10) {
						planetName.setAttribute("style","font-size:10px;");
					}
					if (lengthNom > 14) {
						planetName.setAttribute("style","font-size:8.4px;");
					}

					var y = document.createElement('span');
					y.innerHTML = aff;
					y.setAttribute("style", "float:right;");
					y.setAttribute("class", "marqueur");

					planetName.appendChild(y);

					eventlist(position, galaxie, systeme, 0);
					eventlist(position, galaxie, systeme, 1);
					eventlist(position, galaxie, systeme, 2);
					eventlist(position, galaxie, systeme, 3);

				}
				else {
					var aff = '<input class="E" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[info]+';" value="" type="button">';
					var y = document.createElement('span');
					y.innerHTML = aff;
					y.setAttribute("style", "float:right;");
					y.setAttribute("class", "marqueur");
					planetName.appendChild(y);
					eventlist1case(position, galaxie, systeme);
				}
			}
		}
		//}


		// Recherche des maj
		if (!AJours && !document.getElementById('MAJ gal'))
		{
			var aff_newVersion ='<li><span class="menu_icon"><img class="mouseSwitch" src="http://vulca.evoserv.net/infoCompte/image/logo.gif" rel="http://vulca.evoserv.net/infoCompte/image/logo.gif" height="29" width="38"></span><a id="MaJ" class="menubutton " href="http://userscripts.org/scripts/source/66619.user.js" accesskey="" target="_self">';
			aff_newVersion += '<span class="textlabel">!!MaJ!! M.G.</span></a></li>';

			var sp1 = document.createElement("span");
			sp1.setAttribute("id", "MAJ gal");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);

			var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);
			var tableau = document.createElement("span");
			tableau.innerHTML = aff_newVersion;
			document.getElementById('MAJ gal').insertBefore(tableau, document.getElementById('MAJ gal').firstChild);

			/* ******************************A Jours apres clique ********************************/
			document.getElementById("MaJ").addEventListener("click", function(event)
			{
				GM_setValue(nomScript+"aJours",true);
				GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
			}, true);
		}
	}

	//{ revision Alu
	function biz( galaxie,systeme,position,f , n) {
		// séléctionne l'input visé
		var input = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f)[n];
		// bind de l'événement clic
		input.addEventListener("click", function(event) {
			var prefs = getPrefs();
			// nombre de rc
			var nbRc2 = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length ;
			var k = prefs[galaxie+':'+systeme+':'+position];
			// pour chaque rc
			for (var n2 = 0 ; n2 < nbRc2 ; n2++) {
				var couleur = (k === f) ? color_inactiv[f] : color_activ[f];
				document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f)[n2].style.backgroundColor='#'+ couleur;
				if(k === f) {
					delete prefs[galaxie+':'+systeme+':'+position];
				} else {
					for (var e = 0 ; e<4; e++) {
						if (e != f) {
							document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+e)[n2].style.backgroundColor='#'+ color_inactiv[e];
						}
					}
					prefs[galaxie+':'+systeme+':'+position] = f;
				}
			}
			savePrefs(prefs);
		}, true);
	}
	//}

	function afficheMessage() {
		var table = document.getElementsByClassName('area')[0];
		if (!table || table.getAttribute("done123111") == "done") return;
		table.setAttribute("done123111","done");

		var lieuCoord = document.getElementsByClassName('area');
		var prefs = getPrefs();

		for (var i =0 ; i< lieuCoord.length ; i++)
		{
			var coordElem = lieuCoord[i].getElementsByTagName('a')[0]
			if(coordElem) {
				var coord = coordElem.innerHTML.slice(1,-1).split(':');
				var galaxie = parseInt(coord[0]);
				var systeme = parseInt(coord[1]);
				var position = parseInt(coord[2]);
				var k = prefs[galaxie+':'+systeme+':'+position];

				for (var f = 0 ; f<4; f++) {

					if(k == f) {
						var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'"  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche

						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz(galaxie,systeme,position,f , numRc)
					}
					else {
					var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px; color:#FFFFFF; background-color:#'+color_inactiv[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche

						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz( galaxie,systeme,position,f, numRc )
					}
				}

				var newElement = document.createElement("span"); // On crée un nouvelle élément div
				newElement.innerHTML = ' ';
				document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche

			}
		}
	}


	function afficheSifirst() {
		var table = document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1];
		if (!table || table.getAttribute("done14111") == "done") {
			return;
		}
		table.setAttribute("done14111","done");
		affiche_script();
	}


	// Page galaxie
	if (location.href.indexOf('page=galaxy')>-1) {
		if(!FireFox && !Opera || true) {
			setInterval(afficheSifirst,500);
		}
		else {
			function safeWrap(f) {
				return function() {
					setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
				};
			}
			var $; //Récupération de jQuery dans le contexte de la page
			try { $ = unsafeWindow.$; } //compatible Greasemonkey
			catch(e) { $ = window.$; } //autres navigateurs (Opera...)
			//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
			$(document).ajaxSuccess(safeWrap(function(e,xhr,settings){
				//l'url de la requête ajax contient page=galaxyContent
				if (settings.url.indexOf("page=galaxyContent") == -1) return;

				affiche_script();

			}));
		}
	}

	else if (location.href.indexOf('page=messages')>-1 || (location.href.indexOf('page=showmessage',0)>=0 && document.getElementsByClassName('fragment spy2')[0])) {
		setInterval(afficheMessage,500);
	}

	if (location.href.indexOf('raidefacil=scriptOptions')>-1 ||  location.href.indexOf('raidfacile=tableau') >-1) {
		var afficherSurRaidFacile = function() {
			var prefs = getPrefs();
			var coord = document.getElementsByClassName('coordonee');
			for(var i = 0 ; i< coord.length ; i++) {
				var coordonnées = coord[i].getElementsByTagName('a')[0].innerHTML.slice(1,-1).split(':');
				document.getElementsByClassName('marqueur')[i].style.width = '60px';
				var galaxie = parseInt(coordonnées[0]);
				var systeme = parseInt(coordonnées[1]);
				var position = parseInt(coordonnées[2]);
				var k = parseInt(prefs[galaxie+':'+systeme+':'+position]);
				for (var f = 0 ; f<4; f++) {
					var couleur = (k === f) ? color_activ[f] : color_inactiv[f];
					// On crée un nouvel élément span
					var newElement = document.createElement("span");
					newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'"  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+couleur+';" value="'+listeLettreaff[f]+'" type="button">';
					document.getElementsByClassName('marqueur')[i].insertBefore(newElement, document.getElementsByClassName('marqueur')[i].getElementsByTagName('td')[0]); // On l'affiche
					var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
					biz(galaxie,systeme,position,f , numRc)
				}
			}
		};
		afficherSurRaidFacile();
		document.addEventListener('raidFacileRefreshed', afficherSurRaidFacile);
	}

	if(FireFox) {
		// recherche des MaJ
		if (parseInt(GM_getValue(nomScript+"dateMaJ",0))+23*3600 < Date.parse(new Date()) / 1000 )
		{
			GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/scripts/source/66619.meta.js',

						onload: function(response)
						{
							var PageUserScript = response.responseText;

							var Derniere_Version = trim(PageUserScript.split('@version')[1].split('// @author')[0]);

							Version=Version+'';

							if (Derniere_Version.length < 10 && Derniere_Version.length > 2)
							{
								if (Derniere_Version != Version )
								{
									GM_setValue(nomScript+"aJours",false);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
								else
								{
									GM_setValue(nomScript+"aJours",true);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
							}
						}
					});
		}
	}

}
//{ revision Alu
// récupère les données de la version 1.9
function exporter() {
	var o = {};
	Object.keys(localStorage).forEach(function(k){
		if (/^MarqueurGalaxieRedesigninfoCoordpegasus/.test(k)) {
			var t = k.split(';');
			delete t[0];
			t[1]++;
			t[2]++;
			t[3]++;
			o[t.join(':').substring(1)] = parseInt(localStorage.getItem(k));
		}
	});
	savePrefs(o);
}
//}
}

var url=location.href;

if(url.indexOf('raidefacil=scriptOptions') >-1 || url.indexOf('page=messages') >-1 || url.indexOf('raidfacile=tableau') >-1 || url.indexOf('page=showmessage') >-1 || url.indexOf('page=galaxy') >-1 )
	{marqueurScript()}

	document.addEventListener('raidFacileLoaded', marqueurScript);
