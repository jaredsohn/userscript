// ==UserScript==
// @name           Total ressources
// @namespace      nheir
// @version		   1.2.2
// @description    J'ai quoi comme ressource sur mon compte
// @updateURL      http://userscripts.org/scripts/source/165650.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165650.user.js
// @include          http://*.ogame.gameforge.com/game/index.php?page=*
// @exclude		http://*.ogame.gameforge.com/game/index.php?page=empire*
// ==/UserScript==
var meta = {};
var metaHtml = document.getElementsByTagName('meta');
var i;
for (i = 0; i < metaHtml.length; i++)
    if (metaHtml[i].getAttribute('name') != '')
        meta[metaHtml[i].getAttribute('name')] = metaHtml[i].getAttribute('content');	
var serveur = meta['ogame-universe'];
var joueurId = meta['ogame-player-id'];
var planete = '['+meta['ogame-planet-coordinates']+']';
if(meta['ogame-planet-type'] == 'moon') planete = planete + 'L';
function parseNB(monText) // converti un nombre de la forme xxx.xxx.xxx en xxxxxxxxx
{
	monText = monText.replace(/\D/mg,'');
	return ( monText );
	
}
function addPoints(nombre)
{
	if (nombre=='?') {return nombre;} 
	else if (nombre==0) {return nombre;} 
	else 
	{
		var signe = '';
		if (nombre<0)
		{
			nombre = Math.abs(nombre);
			signe = '-';
		}
		var str = nombre.toString(), n = str.length;
		if (n <4) {return signe + nombre;} 
		else 
		{
			return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
		}
	}
}
//Recupere les coordonn�es des plan�tes et lunes sous la forme [x:x:x](L)
function getListePlanetesLunes()
{
	var planetKoord = document.getElementsByClassName('planet-koords');
	var liste = [];
	for(i = 0 ; i < planetKoord.length ; i++)
	{
		var coord = planetKoord[i].innerHTML;
		var enfant = planetKoord[i].parentNode;
		while(enfant)
		{
			if(enfant.nodeType === 1 && enfant.className.indexOf('moon') > -1)
				break;
			enfant = enfant.nextSibling;
		}
		liste.push(coord);
		if(enfant) 
			liste.push(coord + 'L');
	}
	return liste;
}
var ressources = [	parseNB(document.getElementById('resources_metal').innerHTML),
                  parseNB(document.getElementById('resources_crystal').innerHTML),
                  parseNB(document.getElementById('resources_deuterium').innerHTML)];
//Actualisation des ressources de la plan�te actuelle
GM_setValue(serveur+'_'+joueurId+'_'+planete, ressources.join('|'));

var listePlanete = getListePlanetesLunes();
if(document.body.id == 'overview')
{
	var reduire = GM_getValue(serveur+'_'+joueurId+'_reduire', false);
	ressources = [0,0,0];
	var tab = '';
	var tmp;
	for(i = 0 ; i < listePlanete.length ; i++)
	{	
		planete = listePlanete[i];
		tmp = GM_getValue(serveur+'_'+joueurId+'_'+planete, '0').split('|');
		if(tmp == '0') 
		{
			tmp = [0,0,0];
			GM_setValue(serveur+'_'+joueurId+'_'+planete, '0|0|0');
		}
		ressources[0] += parseInt(tmp[0]);
		ressources[1] += parseInt(tmp[1]);
		ressources[2] += parseInt(tmp[2]);
        if(i%2)
            tab += '<tr class="alt">';
        else
            tab += '<tr>';
		tab += '<td>' + planete + '</td><td>' + addPoints(tmp[0]) + '</td><td>' + addPoints(tmp[1]) + '</td><td>' + addPoints(tmp[2]) + '</td></tr>';
	}
	tab = '<tr class="alt"><th> Total </th><th>' + addPoints(ressources[0]) + '</th><th>' + addPoints(ressources[1]) + '</th><th>' + addPoints(ressources[2]) + '</th></tr>' + tab;
    var titre = "Total  des Ressources";
    
    var st = 'display: block;';
    if(reduire)
        st = 'display: none;';
    
    titre = '<a id="link42" href="javascript:void(0);">' + titre + '</a>';
    tab = '<div id="tabs"><ul class="tabsbelow"><li>'+titre+'</li></ul></div><div id="eins" class="contentz" style="'+st+'"><table class="members bborder">' + tab + '</table></div><div class="new_footer"></div>';
    
	var div = document.createElement('div');
	div.id = 'netz';
    div.setAttribute('class', "TotalRessource");
    div.innerHTML = tab;
	var inhalt = document.getElementById('inhalt')
        inhalt.appendChild(div);
    var l42 = document.getElementById('link42');
    l42.onclick = function () {
        var red = GM_getValue(serveur+'_'+joueurId+'_reduire', false);
    	GM_setValue(serveur+'_'+joueurId+'_reduire', !red);
        var eins = document.getElementById('eins');
        if(red) eins.setAttribute('style','display:block;');
        else eins.setAttribute('style','display:none;');
    };
}

function toggle_reduire()
{
    var reduire = GM_getValue(serveur+'_'+joueurId+'_reduire', false);
    GM_setValue(serveur+'_'+joueurId+'_reduire', !reduire);
}