// ==UserScript==
// @name          Travian General Statistic Charts
// @namespace     TravianGeneralStatisticCharts
// @description   shows charts on general statistics page
// @include       http://*.travian.*/statistiken.php?id=0
// ==/UserScript==

function insertAfter( referenceNode, newNode ) {
	referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function maxFLoatDigits( f, d ) {
	var n = Math.pow(10, d);
	return Math.round(f * n) / n;
}

//--------------------
var player = new Array();
var table = document.getElementById('world_player');
for ( var i=1; i<table.rows.length; ++i ) {
	var c = table.rows[i];
	player[i-1] = new Object();
	player[i-1].label = c.cells[0].childNodes.item(0).nodeValue;
	player[i-1].value = parseInt( c.cells[1].childNodes.item(0).nodeValue );
}

var max = Math.max(Math.max(player[0].value, player[1].value), player[2].value);
var p = document.createElement('p');
p.setAttribute('style', 'text-align:center;');
var img = document.createElement('img');
var link = 'http://chart.apis.google.com/chart?';
	link += 'cht=bhs';
	link += '&chco=FF7F7F,7FFF7F,7F7FFF';
	link += '&chd=t:' + maxFLoatDigits(player[0].value/max*100, 2) + ',0,0|0,' + maxFLoatDigits(player[1].value/max*100, 2) + ',0|0,0,' + maxFLoatDigits(player[2].value/max*100, 2);
	link += '&chs=400x100';
	link += '&chxt=y';
	link += '&chxl=0:|' + player[2].label + '|' + player[1].label + '|' + player[0].label + '|' ;
img.setAttribute('src', link);
p.appendChild(img);

insertAfter(table, p);

//--------------------
var tribes = new Array();
var table = document.getElementById('world_tribes');
for ( var i=2; i<table.rows.length; ++i ) {
	var c = table.rows[i];
	tribes[i-2] = new Object();
	tribes[i-2].tribe = c.cells[0].childNodes.item(0).nodeValue;
	tribes[i-2].percent = parseFloat( c.cells[2].childNodes.item(0).nodeValue );
}

var max = Math.max(Math.max(tribes[0].percent, tribes[1].percent), tribes[2].percent);
var p = document.createElement('p');
p.setAttribute('style', 'text-align:center;');
var img = document.createElement('img');
var link = 'http://chart.apis.google.com/chart?';
	link += 'cht=p3';
	link += '&chs=250x100';
	link += '&chd=t:' + tribes[0].percent + ',' + tribes[1].percent + ',' + tribes[2].percent + '';
	link += '&chco=FF7F7F,7F7FFF,7FFF7F';
	link += '&chl=' + tribes[0].tribe + '|' + tribes[1].tribe + '|' + tribes[2].tribe;
img.setAttribute('src', link);
p.appendChild(img);

insertAfter(table, p);

//--------------------

function findMinMax( array, field ) {
	var minmax = new Object();
	for (var i=1; i<array.length; i++) {
		if (minmax.max==undefined || minmax.max < array[i][field]) {
			minmax.max = array[i][field];
		}
		if (minmax.min==undefined || minmax.min > array[i][field]) {
			minmax.min = array[i][field];
		}
	}
	return minmax;
}

var misc = new Array();
var table = document.getElementById('world_misc');
for ( var i=1; i<table.rows.length; ++i ) {
	var c = table.rows[i];
	misc[i-1] = new Object();
	misc[i-1].date = c.cells[2].childNodes.item(0).nodeValue;
	var s = c.cells[0].childNodes.item(0).nodeValue;
	misc[i-1].attacks = ( i==1 ? s : parseInt(s) );
	var s = c.cells[1].childNodes.item(0).nodeValue;
	misc[i-1].casualties = ( i==1 ? s : parseInt(s) );
}

var minmaxattacks = findMinMax(misc, 'attacks');
var minmaxcasualties = findMinMax(misc, 'casualties');
var max = Math.max(minmaxattacks.max, minmaxcasualties.max);
var min = Math.min(minmaxattacks.min, minmaxcasualties.min);
var p = document.createElement('p');
p.setAttribute('style', 'text-align:center;');
var img = document.createElement('img');
var max1st = Math.max(misc[misc.length-1].attacks, misc[misc.length-1].casualties);
var min1st = Math.min(misc[misc.length-1].attacks, misc[misc.length-1].casualties);
var link = 'http://chart.apis.google.com/chart?';
	link += 'cht=lc';
	link += '&chs=400x200';
	link += '&chd=t:';
	for ( var i=misc.length-1; i>0; --i ) {
		link += '' + maxFLoatDigits(misc[i].attacks/max*90, 2) + '';
		if ( i>1 ) {
			link += ',';
		}
	}
	link += '|';
	for ( var i=misc.length-1; i>0; --i ) {
		link += '' + maxFLoatDigits(misc[i].casualties/max*90, 2) + '';
		if ( i>1 ) {
			link += ',';
		}
	}
	link += '&chdl=' + misc[0].attacks + '|' + misc[0].casualties;
	link += '&chco=FFDF00,71D000';
	link += '&chl=';
	for ( var i=misc.length-1; i>0; --i ) {
		link += misc[i].date;
		if ( i>1 ) {
			link += '|';
		}
	}

	link += '&chxt=y';
	link += '&chxr=0,0,' + 100;
	link += '&chxl=0:|'+min1st+'|'+max1st+'|&chxp=0,'+maxFLoatDigits(min1st/max*90, 2)+','+maxFLoatDigits(max1st/max*90, 2)+'';
	link += '&chg=16.6,10';

img.setAttribute('src', link);
p.appendChild(img);

insertAfter(table, p);
