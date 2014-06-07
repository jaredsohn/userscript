// ==UserScript==
// @name          Travian Market Summary
// @namespace     TravianMarketSummary
// @description   shows additional information in markets about goods
// @include       http://*.travian.*/build.php?gid=17&t=1
// @include       http://*.travian.*/build.php?id=*&t=1
// @include       http://*.travian.*/build.php?id=*&t=1&u=*
// ==/UserScript==

var acss =	"table#_sumres {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color: white; padding:2px; margin:1px;}" +
			"table#_sumres tr {border-collapse:collapse; border:1px solid silver; text-align:center;}" +
			"table#_sumres td {border:1px solid silver; background-color:transparent; padding:2px; border-collapse:collapse;}" +
			"table#_sumres td.sf {background-color:#FFE4B5;}";

function findMinMaxKey( map ) {
	var extreme = new Object();
	for ( var key in map ) {
		if ( extreme.max == undefined ) {
			extreme.max = key;
		}
		if ( extreme.min == undefined ) {
			extreme.min = key;
		}
		if ( map[key] < map[extreme.min] ) {
			extreme.min = key;
		}
		if ( map[extreme.max] < map[key] ) {
			extreme.max = key;
		}
	}
	return extreme;
}

var offersum = new Object();
var wantedsum = new Object();
offersum.r1 = new Number(0);
offersum.r2 = new Number(0);
offersum.r3 = new Number(0);
offersum.r4 = new Number(0);
wantedsum.r1 = new Number(0);
wantedsum.r2 = new Number(0);
wantedsum.r3 = new Number(0);
wantedsum.r4 = new Number(0);

var table = document.getElementById('range');
for ( var i=2; i<table.rows.length-1; ++i ) {
	var offer
	var wanted;

	offer = table.rows[i].cells[0];
	wanted = table.rows[i].cells[1];
	
	offer.value = parseInt( offer.childNodes.item(2).nodeValue );
	offer.type = offer.childNodes.item(1).getAttribute('class');

	wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );
	wanted.type = wanted.childNodes.item(1).getAttribute('class');

	offersum[offer.type] += offer.value;
	wantedsum[wanted.type] += wanted.value;
}

var array = new Array();
var i = 0;
for ( var key in offersum ) {
	array[i] = key;
	i++;
}
array.sort();

var d = document.getElementById('build');
var p = document.createElement('p');
var t = document.createElement('table');
p.appendChild(t);
t.setAttribute('id', '_sumres');
d.insertBefore(p, document.getElementById('range'));

//row
var r = document.createElement('tr');
//td
var c = document.createElement('td');
c.appendChild(document.createTextNode('Total offered to me'));
r.appendChild(c);
var minmaxoffer = findMinMaxKey(offersum);
for ( var j = 0; j<array.length; j++ ) {
	var key = array[j];
	//td
	var c = document.createElement('td');
	if ( key == minmaxoffer.min ) {
		c.setAttribute('style', 'background-color: rgb(255, 225, 225); color: red;');
	} else if ( key == minmaxoffer.max ) {
		c.setAttribute('style', 'background-color: rgb(200, 255, 200); color: green;');
	}
	//img
	var i = document.createElement('img');
	i.setAttribute('class', key);
	i.setAttribute('src', 'img/x.gif');
	c.appendChild(i);
	c.appendChild(document.createTextNode(' '+offersum[key]));
	r.appendChild(c);
}
t.appendChild(r);

//row
var r = document.createElement('tr');
//td
var c = document.createElement('td');
c.appendChild(document.createTextNode('Total wanted from me'));
r.appendChild(c);
var minmaxoffer = findMinMaxKey(wantedsum);
for ( var j = 0; j<array.length; j++ ) {
	var key = array[j];
	//td
	var c = document.createElement('td');
	if ( key == minmaxoffer.min ) {
		c.setAttribute('style', 'background-color: rgb(255, 225, 225); color: red;');
	} else if ( key == minmaxoffer.max ) {
		c.setAttribute('style', 'background-color: rgb(200, 255, 200); color: green;');
	}
	//img
	var i = document.createElement('img');
	i.setAttribute('class', key);
	i.setAttribute('src', 'img/x.gif');
	c.appendChild(i);
	c.appendChild(document.createTextNode(' '+wantedsum[key]));
	r.appendChild(c);
}
t.appendChild(r);

//row
var r = document.createElement('tr');
//td
var c = document.createElement('td');
c.appendChild(document.createTextNode('Wanted / Offered (value)'));
r.appendChild(c);
for ( var j = 0; j<array.length; j++ ) {
	var key = array[j];
	//td
	var c = document.createElement('td');
	//img
	var i = document.createElement('img');
	i.setAttribute('class', key);
	i.setAttribute('src', 'img/x.gif');
	c.appendChild(i);
	c.appendChild(document.createTextNode( ' '+Math.round(wantedsum[key] / offersum[key] * 100) / 100 ));
	r.appendChild(c);
}
t.appendChild(r);

GM_addStyle(acss);