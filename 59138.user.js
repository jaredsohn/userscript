// ==UserScript==
// @name Ostatnia wioska
// @description Fßgt im Versamlungsplatz einen Link fßr das letzte angegriffene Dorf hinzu
// @author Michael Richter
// @namespace http://osor.de/
// @include http://*.plemiona.pl/game.php*screen=place*
// ==/UserScript==

// -----------------------------------------------------------------------------
// Modifikationen und Weiterverbreitung dieses Scripts benÜtigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){
var $x = function(p, context) {
if(!context)
context = document;
var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; item = xpr.snapshotItem(i); i++)
arr.push(item);
return arr;
};
if(/screen=place&try=confirm/.test(location.href)) {
var form = $x('//form[contains(@action,"screen=place&action=command&h=")]');
if(form.length > 0) {
form[0].addEventListener('submit', function(evt){
var link = $x('//a[contains(@href,"screen=info_village&id=")]');
var coords = /\((\d+\|\d+)\)/.exec(link[0].textContent);
if(!coords)
coords = /\((\d+\:\d+:\d+)\)/.exec(link[0].textContent);
document.cookie = "lastCoords=" + coords[1];
}, false);
}
} else if(/screen=place/.test(location.href)) {
var coords = /lastCoords=(\d+)\|(\d+)/.exec(document.cookie);
if(!coords)
coords = /lastCoords=(\d+)\:(\d+):(\d+)/.exec(document.cookie);
if(coords) {
var td = $x('//form[contains(@action,"screen=place&try=confirm")]/descendant::a[contains(@href,"mode=recent")]');
if(td) {
var link = document.createElement('a');
if(coords.length == 3) {
link.setAttribute('href', 'javascript:(function(){document.forms["units"].elements["x"].value="' + coords[1] + '";document.forms["units"].elements["y"].value="' + coords[2] + '";}());');
link.textContent = unescape('%BB') + ' Ostatnia wioska (' + coords[1] + '|' + coords[2] + ')';
} else {
link.setAttribute('href', 'javascript:(function(){document.forms["units"].elements["con"].value="' + coords[1] + '";document.forms["units"].elements["sec"].value="' + coords[2] + '";document.forms["units"].elements["sub"].value="' + coords[3] + '";}());');
link.textContent = unescape('%BB') + ' Ostatnia wioska (' + coords[1] + ':' + coords[2] + ':' + coords[3] + ')';
}
td[0].parentNode.appendChild(link);
if(coords.length == 3) {
var link = document.createElement('a');
var id = /village=(\d+)/.exec(td[0].href);
link.href = 'game.php?village=' + id[1] + '&screen=map&x=' + coords[1] + '&y=' + coords[2];
link.setAttribute('style', 'margin-left: 5px;');
var img = document.createElement('img');
link.title = img.alt = 'Scentruj na mapce!';
img.src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVHjaYvz//z8DCBy5++3/z98QNgi8'+
'/fidIcxchJEBDTCCNIAUc7MzMXCzIuRfffnL8OzNNwxNTHtvfAUrFuZiBgt8BdoCwmI8zAxSIlwM'+
'Ezdc/4+sgQVEgEz+8fsfRPHPfxCNPxnAmtABE4yBrBhZDEMDyHPoAOT5n1gUw20AeRDmYZhCIaBz'+
'3gHFsYbSqpNv/gvzc4IVwQBI8ZUbjxhMn3WB+VZZ8xnhGkAAPTRAwJZxP5j+8fQ0w90rRxlip91i'+
'hGvABhZnqf1X1rFm4JA2hWtiYsADQCaCFIEUo/iBEADZBDMAIMAAitCChPuM2X0AAAAASUVORK5C'+
'YII=';
img.setAttribute('style', 'vertical-align: middle;');
link.appendChild(img);
td[0].parentNode.appendChild(link);
}
}
}
}
})();