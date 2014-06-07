// ==UserScript==
// @name			MyTorrent411
// @namespace		http://userscripts.org/users/87056
// @description		Surligne les lignes survolées du tableau. Affiche et met en valeur le ratio Seeders/Leechers. Affiche/cache les filtres lors d'un clic sur la barre au dessus. 
// @version			0.1
// @author			jok-r
// @include			http://www.torrent411.com/*
// @require			http://sizzlemctwizzle.com/updater.php?id=103440
// ==/UserScript==

// Options =====

var calcul_ratio_seed_leech		=true;	// Calcule et affiche le ratio Seed/Leech des torrents
var colorise_ligne_au_survol	=true;	// Colorise la ligne survolée par le curseur
var cache_filtres				=true;	// Cache les filtre de la page parcourir

// =============
/* source: http://wiki.greasespot.net/Get_Elements_By_CSS_Selector 
*/
function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null);
  var result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
}

/* source: http://wiki.greasespot.net/Create_DOM_Structure 
*/
function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

// =============
function CalculRatio(){
	// Ajout de la colonne d'entête
	$$('table.ttable_headinner/thead/tr').forEach(function (t){
		createEl({n: 'th', a: {'@class': 'ttable_head', 'textContent': 'Ratio'}}, t);
	});
	$$
	// Calcul du ratio
	$$('td.seedersStyle').forEach(function (a) {
		var ratio = Math.round(parseInt(a.textContent) / parseInt($$('following-sibling::td.leechersStyle', a)[0].textContent)*100)/100;
		if (parseInt($$('following-sibling::td.leechersStyle', a)[0].textContent) == 0){ratio='n/a'};
		if (ratio <= 0.333 && ratio >0){
			var ratioClass='ttable_col2 hlratio';
			// Ajout de la class hlrow à la ligne
			$$('parent::*', a)[0].className+= ' hlrow';
		}
		else{
			var ratioClass='ttable_col2 nonBold';
		}
		// Ajout de la colonne
		createEl({n: 'td', a: {'@class': ratioClass, '@align': 'center', 'textContent': ratio}}, $$('parent::*', a)[0])
	});
}

function toggleFiltres(){
	// Affiche/cache le bloc de filtre
	if ($$('td#mcol/table/tbody/tr[2]/td/form')[0].style.display== 'none'){
		$$('td#mcol/table/tbody/tr[2]/td/form')[0].style.display='block';
	}
	else{
		$$('td#mcol/table/tbody/tr[2]/td/form')[0].style.display='none';
	}
}

function CacherFiltres(){
	// Evenement sur la barre au dessus des filtres
	$$('td#mcol/table/tbody/tr[1]').forEach(function(t){
		t.addEventListener('click', function(){toggleFiltres()}, false);
		t.style.cursor='pointer';
	});
	toggleFiltres();
}

function HighlightLine(){
	// Surligne les lignes du tableau au survol
	GM_addStyle(''
				+'tr.hlrow td{background: #fbb;}'
				+'table.ttable_headinner tbody tr:hover td{background: #cce;}'
				+'table.ttable_headinner tbody tr.hlrow:hover td{background: #f99;}'
				+'td.hlratio{color:f00; font-weight:bold;}'
			);
}

/*
	-- CalculRatio, HighlightLine --
	http://www.torrent411.com/browse.php
	http://www.torrent411.com/search/
	http://www.torrent411.com/today.php
	http://www.torrent411.com/week.php
	http://www.torrent411.com/month.php
	http://www.torrent411.com/top100.php
	http://www.torrent411.com/streaming.php
	-- CacherFiltres --
	http://www.torrent411.com/browse.php
*/

if(calcul_ratio_seed_leech)	CalculRatio();
if(colorise_ligne_au_survol) HighlightLine();
if(cache_filtres) CacherFiltres();