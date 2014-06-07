// ==UserScript==
// @name DS - Spielerpunkteverlauf (de-Welten)
// @namespace Spielerverlauf
// @author blacksheep
// @include http://de*.die-staemme.de/game.php*screen=info_player*id=*
// ==/UserScript==

var patternSrv   = /de(\d+)\D*\.die-staemme\./;
var patternPosPA = /village=[0-9]+&screen=player_color/;
var patternPos   = /village=[0-9]+&screen=mail&mode=new&player=[0-9]+/;
var patternPId   = /player(_id)?=([0-9]+)/;

var f = document;
var r = (document.body || document.head || document.documentElement);

function injectJS(source) {
	var s;
	
	s = f.createElement('script');	
	s.appendChild(f.createTextNode('(' + source + ')();'));
	
	r.appendChild(s);
	r.removeChild(s);
}

function getGameData(el) {
	var d, c;
	
	d = f.createElement('div');
	d.id = 'dsgamedata';	
	r.appendChild(d);

	injectJS('function(){try{document.getElementById("' + d.id + '").title=window.game_data.' + el + ';}catch(e){}}');

	c = d.title;
	r.removeChild(d);
	
	return c;
}

function createAnchorWithImg(href, img) {
	var a;
	
	a = f.createElement('a');
	a.target = '_blank';
	
	a.href = href;	
	a.appendChild(img);
	
	return a;
}

function createRow(el) {
	var tr, td;
		
	tr = f.createElement('tr');
	td = f.createElement('td');
	td.colSpan = 2;
	
	td.appendChild(el);
	tr.appendChild(td);
		
	return tr;
}

(
function () {
	var l, m, s, a, tr, img, href;
	var world = getGameData("world");
	
	if (world == 0) {
		return;
	}
	
	for (var i = f.links.length - 1; i >= 0; i--) {
		l = f.links[i];
		m = (l.href.match(patternPosPA) || l.href.match(patternPos));
		if(m) {
			m = l.href.match(patternPId)[2];
			s = l.parentNode.parentNode;				
			href = 'http://www.dsreal.de/index.php?screen=file&mode=player&world=' + world + '&id=' + m;
			
			// Besiegte Gegner
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/playerBashall.php?id=' + m + '&world=' + world;

			a  = createAnchorWithImg(href, img);
			tr = createRow(a);
			s.parentNode.insertBefore(tr, s.nextSibling);
	
			// Vergleich (Eigene Pkt : Gegnerische Pkt)
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/compareHistory.php?id=' + getGameData("player.id") + '&type=points&world=' + world + '&player[]=' + m + '&player[]=&player[]=';

			a  = createAnchorWithImg(href, img);
			tr = createRow(a);
			s.parentNode.insertBefore(tr, s.nextSibling);
	
			break;
		}
	}

})()
