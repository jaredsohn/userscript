// ==UserScript==
// @name           Enlaces a recursos de Ikariam
// @namespace      byElwiZ (en español por CROM)
// @description    Crea enlaces directos al viñedo, la mina, la cantera, etc.
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

// ID de la isla
var islandID = false;

var form = document.getElementById('changeCityForm');
var lis = form.getElementsByTagName('li');

for (var i=0; i<lis.length; i++) {
	var li = lis[i];
	if (li.className == 'viewIsland') {
		var a = li.getElementsByTagName('a')[0];
		var href= a.getAttribute('href');
		islandID = href.substr(href.lastIndexOf('id=')+3);
	}
}

// añade enlaces si se encuentra el ID de la isla
if (islandID) {
	wrap('value_wood', 'index.php?view=resource&type=resource&id='+islandID);
	wrap('value_wine', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_marble', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_crystal', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_sulfur', 'index.php?view=tradegood&type=tradegood&id='+islandID);
}

// adición de enlaces
function wrap(id, url) {
	var span = document.getElementById(id);
	var link = document.createElement("a");
	var li = span.parentNode;
	
	li.removeChild(span);
	li.appendChild(link);
	link.appendChild(span);
	link.setAttribute('href', url);
	link.style.color = '#542C0F';
	link.style.textDecoration = 'none';
}