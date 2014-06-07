// ==UserScript==
// @name DS Dörfer mit hohem Speicherverbrauch markieren
// @description
// @author Michael Richter
// @namespace http://osor.de/
// @include http://ch*.staemme.ch/game.php?*screen=overview_villages*
// @include http://ch*.staemme.ch/game.php?*screen=snob&mode=reserve*
// ==/UserScript==

(function(){

// Hier können beliebig viele Farben gesetzt werden.
// Die Liste muss dabei absteigend sortiert sein.
var settings = [
[300000, 'red'],
[200000, 'orange'],
[100000, 'blue']
];

var $x = function (p, context) {
if(!context)
context = document;
var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; item = xpr.snapshotItem(i); i++)
arr.push(item);
return arr;
}

var view = document.getElementById('overview');
if(!/screen=snob&mode=reserve/.test(location.href) && (!view || view.value != 'prod')) {
return;
}

var villages = $x('//tr[@class="nowrap row_a" or @class="nowrap row_b"]/td/img[@title="Houz"]/parent::td');
if(villages.length == 0) {
villages = $x('//td[@class="nowrap"]/img[@title="Houz"]/parent::td');
}
for(var i = 0; i < villages.length; i++) {
var res = villages[i].textContent.split(" ");
var rebuilt = '';
for(var j = 0; j < res.length && j < 3; j++) {
var entry = ' <img src="graphic/' + (j == 0 ? 'holz' : j == 1 ? 'lehm' : 'eisen') + '.png" title="' + (j == 0 ? 'Houz' : j == 1 ? 'Lehm' : 'Isä') + '" alt="" />';
var num = res[j].replace(/\./g, '<span class="grey">.</span>');
var intres = parseInt(res[j].replace(/\./, ''))
var set = false;
for(var k = 0; k < settings.length; k++) {
if(intres >= settings[k][0]) {
entry += '<span style="color: ' + settings[k][1] + '">' + num + '</span>';
set = true;
break;
}
}
if(!set) {
entry += num;
}
rebuilt += entry;
}
villages[i].innerHTML = rebuilt;
}
})();