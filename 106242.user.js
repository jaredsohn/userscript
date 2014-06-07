// ==UserScript==
// @name          Marcar todos para Twit-Herramientas©
// @namespace     http://twit-herramientas.com/
// @description   Seleccionar todos, ninguno o invertir selección para Twit-Herramientas. Based in http://userscripts.org/scripts/show/6474
// @include       http://twit-herramientas.com/*
// @exclude       http://twit-herramientas.com/
// ==/UserScript==

var allchecks, thisLink;
allchecks = document.evaluate(
    '//input[@type="checkbox"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
window.setTimeout(function() {
if (allchecks.snapshotLength) {
  var logo = document.createElement("div");
  logo.innerHTML = '<div style="background-color: black; margin:0;padding:0;color:white; text-align: center;">Seleccionar: <a href="#" id="_all" style="color: white; font-weight: bold">Todos</a> <a href="#" id="_none" style="color: white; font-weight: bold">Ninguno</a> <a href="#" id="_invert" style="color: white; font-weight: bold">Invertir selección</a></div>';
  document.body.insertBefore(logo, document.body.firstChild);
  
  _all = document.getElementById('_all');
	_all.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = true;event.preventDefault();}}, true)
  _none = document.getElementById('_none');
	_none.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = false;event.preventDefault();}}, true)
  _invert = document.getElementById('_invert');
	_invert.addEventListener('click', function(event) {for (var i = 0; i < allchecks.snapshotLength; i++) {thisLink = allchecks.snapshotItem(i);thisLink.checked = !thisLink.checked;event.preventDefault();}}, true)
}
},60);
