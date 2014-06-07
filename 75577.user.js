// ==UserScript==
// @name           Ikariam Resource Links
// @namespace      byElwiZ
// @description    Makes resource numbers active links to mines, vineyard, etc.
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

// island ID
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

// add links if island ID found
if (islandID) {
	wrap('value_wood', 'index.php?view=resource&type=resource&id='+islandID);
	wrap('value_wine', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_marble', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_crystal', 'index.php?view=tradegood&type=tradegood&id='+islandID);
	wrap('value_sulfur', 'index.php?view=tradegood&type=tradegood&id='+islandID);
}

// link adding f-cion
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
