// ==UserScript==
// @name           Wpisy Ogólne
// @description    Dodaje link do wszystkich wpisów na belce.
// @namespace      http://strimoid.pl/u/Deykun   
// @include        http://strimoid.pl/*
// @include        http*://strimoid.pl/*
// @updateURL      http://userscripts.org/scripts/source/435396.user.js    
// @version        1.1
// @author         Deykun
// @grant          none
// @run-at	   document-end
// ==/UserScript==


if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	var element='<li><a href="http://strimoid.pl/entries">ogólne</a></li>';

	$('ul.nav.navbar-nav').eq(0).append(element);}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}