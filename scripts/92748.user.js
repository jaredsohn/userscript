// ==UserScript==
// @name DS - Stammespunkteverlauf (de-Welten)
// @namespace Stammesverlauf
// @author blacksheep
// @include http://de*.die-staemme.de/game.php*screen=info_ally*id=*
// ==/UserScript==

var patternSrv = /de(\d+)\D*\.die-staemme\./;
var patternPos = /village=[0-9]+&screen=info_member/;
var patternAId = /id=([0-9]+)/;

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
		m = l.href.match(patternPos);
		if(m) {
			m = l.href.match(patternAId)[1];
			s = l.parentNode.parentNode;
			href = 'http://www.dsreal.de/index.php?screen=file&mode=ally&world=' + world + '&id=' + m;
			
			// Stammespunkte
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/compareHistory.php?type=points&id=' + getGameData("player.ally_id") + '&world=' + world + '&ally[]=' + m + '&ally[]=&ally[]=';
			
			a = createAnchorWithImg(href, img);
			tr = createRow(a);
			s.parentNode.insertBefore(tr, s);
			
			// Besiegte Gegner
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/allyBashall.php?id=' + m + '&world=' + world;

			a = createAnchorWithImg(href, img);
			tr = createRow(a);
			s.parentNode.insertBefore(tr, s);

			break;
		}
	}

})()
