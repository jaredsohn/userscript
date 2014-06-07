// ==UserScript==
// @name           Ogame Nettoyeur FR
// @namespace      XLOADX
// @description    Nettoyeur Ogame avec option avancée pour la porte de saut(tous languages) 
// @include        http://*/game/index.php*
// ==/UserScript==


/*
** Fonctions Internes évitant les répétitions de code
**********************************************************/
function sonID(objID)
{
	return document.getElementById(objID);
}
function sonTAG(objTAG)
{
	return document.getElementsByTagName(objTAG);	
}
function supprime_noeudEnfant(objNOD)
{
	return obj.parentNode.removeChild(objNOD);
}
function recherche_index(objLOC)
{
	return location.search.indexOf(objLOC);
}
function taille(objLEN)
{
	return objLEN.length;
}

/*
** Intégration des fonctions et variables du code
*********************************************************/

var obj = null;
var sid = location.search.split('&')[1].split('=')[1];
// Début de la configuration
var port_de_saut_text 		= 'Porte de saut';
var port_de_saut_avancee 	= false;
var liens_externes 			= false;
var liens_internes 			= false;
var elements 				= [	'page=commander', 'page=offiziere', 'page=micropayment', 
								'board.', 'tutorial.', 'regeln.', 'impressum.', 'go=about'];
var ids  					= [	'combox_container','menu','darkmatter2','content','resources','haut_entete']
var tags 					= [	'table','id','th','td','tr','img','body'];
var attributs				= [	'style','display:none;','overflow:auto;'];
var objetIndex				= [	'gid=43','ikon_un.gif'];
// Fin de la configuration

/*
** Code principal de modification de la page
*********************************************************/

if (port_de_saut_avancee && recherche_index(objetIndex[0], 0) >= 0)
{
	var tables = sonID(ids[4]).sonTAG(tags[0]);
	if (taille(tables) > 4)
	{
		var regexp = /(\([0-9]+)/;
		var trs = tables[3].sonTAG(tags[4]);
		for (var i = 1; i < (taille(trs) - 1); i++)
		{
			var ths = trs[i].sonTAG(tags[2]);
			ths[1].innerHTML += '<input id="buttonMax';
			ths[1].innerHTML += i+'" type="button" value="max" onclick="this.previousSibling.value=';
			ths[1].innerHTML += ths[0].innerHTML.match(regexp)[0].substr(1)+'">';
		}
		trs[i].sonTAG(tags[2])[0].innerHTML += '&nbsp;<input type="button" value="All" onclick="for (var i = 1; i < ';
		trs[i].sonTAG(tags[2])[0].innerHTML += (taille(trs) - 1)+'; i++)sonID(\'buttonMax\'+i).click();">&nbsp;<input type="reset">';
	}
}
obj = sonID(ids[2]);
if (obj) supprime_noeudEnfant(obj);

var obj = sonID(ids[0]);
if (obj) supprime_noeudEnfant(obj);

var td = sonID(ids[1]).sonTAG(tags[3]);
for (var i = 0; i < taille(td); i++)
	for (var elem in elements)
		if (td[i].innerHTML.indexOf(elements[elem], 0) >= 0)
		{
			if (elements[elem] == elements[4] && port_de_saut_text)
			{
				td[i].innerHTML  = '<div style="text-align:center;"><a href="index.php?page=infos&session=';
				td[i].innerHTML += sid+'&'+objetIndex[0]+'">'+port_de_saut_text+'</a></div>';
			}
			else
				td[i].setAttribute(attributs[0], attributs[1]);
		}
		
var dernier_item = td[i - 1].parentNode;
if (liens_externes || liens_internes)
{
	if (liens_externes)
		for (var clef in liens_externes)
		{
			var tr = document.createElement(tags[4]);
			var td = document.createElement(tags[3]);
			td.innerHTML  = '<div style="text-align:center;"><a target="_blank" href="';
			td.innerHTML += liens_externes[clef].url+'" style="color:'+liens_externes[clef].color+';">';
			td.innerHTML += liens_externes[clef].name+'</a></div>';
			tr.appendChild(td);
			dernier_item.parentNode.insertBefore(tr, dernier_item);
		}
	if (liens_internes)
		for (var clef in liens_internes)
		{
			var tr = document.createElement(tags[4]);
			var td = document.createElement(tags[3]);
			td.innerHTML  = '<div style="text-align:center;"><a href="'+liens_internes[clef].url;
			td.innerHTML += '" style="color:'+liens_internes[clef].color+';">';
			td.innerHTML += liens_internes[clef].name+'</a></div>';
			tr.appendChild(td);
			dernier_item.parentNode.insertBefore(tr, dernier_item);
		}
	dernier_item.parentNode.removeChild(dernier_item);
}
var resources = sonID(ids[4]);
if (resources)
{
	var td = resources.sonTAG(tag[3]);
	td[13].parentNode.removeChild(td[13]);
	td[8] .parentNode.removeChild(td[8]);
	td[3] .parentNode.removeChild(td[3]);
}
var haut_entete = sonID(ids[5]);
if (haut_entete)
{
	var img = haut_entete.sonTAG(tags[5]);
	for (var i = taille(img) - 1; i > 4; i--)
		if (img[i].src.indexOf(objetIndex[1], 0) >= 0)
			img[i].setAttribute(attributs[0], attributs[1]);
}
if (obj = sonID(ids[3]))	obj.style.height = 'auto';

sonTAG(tags[6])[0].setAttribute(attributs[0], attributs[2]);