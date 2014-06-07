// ==UserScript==
// @name DS - Punktevergleich (de only)
// @namespace Punktevergleich
// @author szeminator feat. blacksheep
// @include http://de*.die-staemme.de/game.php*screen=info_player*id=*
// @include http://de*.die-staemme.de/game.php?village=*&id=*&screen=info_player
// ==/UserScript==

var patternSrv   = /de(\d+)\D*\.die-staemme\./;
var patternPosPA = /village=[0-9]+&screen=player_color/;
var patternPosPANew = /village=[0-9]+&id=[0-9]+&screen=info_player/;
var patternPos   = /village=[0-9]+&screen=mail&mode=new&player=[0-9]+/;
//village=33571&id=3430969&screen=info_player
var patternPIdNew   = /id(_id)?=([0-9]+)/;

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


function createTableWithRow(el,tableTitle) {
	
	/*
<thead>
<tr>
<th width="180">Dörfer (1)</th>
<th width="80">Koordinaten</th>
<th>Punkte</th>
</tr>
</thead>
	*/
	
	var tr, td, table;
	table = f.createElement('table');
	tr = f.createElement('tr');
	td = f.createElement('td');	
	
	//make the header
	var header;
	header = f.createElement('thead');
	
	//add the header
	td.innerHTML = tableTitle;
	tr.appendChild(td);
	header.appendChild(tr);
	td.colSpan = 2;
	
	td.appendChild(el);
	tr.appendChild(td);
	table.appendChild(tr);	
	table.appendChild(header);
	return table;
}


(
function () {
	var l, m, a, tr, img, href;
	var table;
	var world = getGameData("world");
	
	if (world == 0) {
		return;
	}
	
	for (var i = f.links.length - 1; i >= 0; i--) {
		l = f.links[i];
		m = (l.href.match(patternPosPA) || l.href.match(patternPos) || l.href.match(patternPosPANew));
		
		if(m) {
			m = l.href.match(patternPIdNew)[2];
			var infoTable = document.getElementById("villages_list");
			// Vergleich (Eigene Pkt : Gegnerische Pkt)
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/compareHistory.php?id=' + getGameData("player.id") + '&type=points&world=' + world + '&player[]=' + m + '&player[]=&player[]=';
			a  = createAnchorWithImg(href, img);
			table = createTableWithRow(a,"Punktevergleich:");
			infoTable.parentNode.insertBefore(table, infoTable);
	
			img = f.createElement('img');
			img.src = 'http://www.dsreal.de/charts/compareHistory.php?id=' + getGameData("player.id") + '&type=killAll&world=' + world + '&player[]=' + m + '&player[]=&player[]=';
			a  = createAnchorWithImg(href, img);
			table = createTableWithRow(a,"Bashpointvergleich:");
			infoTable.parentNode.insertBefore(table, infoTable);
			return;
		}
	}

})()
