// ==UserScript==
// @name         PPGetImg
// @namespace    PPGetImg
// @include      http://*.puzzlepirates.com/*
// @include      http://runportraitupdate/
// @author       Clovis Warlop
// @description  Private Script
// ==/UserScript==

var sendlink = "http://server5.xtreamdutch-fighters.be/websites/pp/portrait.php"

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
///////////////////////////////////////////////////////////////////////////////////////////////////
if(document.url == "http://runportraitupdate/"){
	GM_setValue("script","1");
	window.location.href == 'http://meridian.puzzlepirates.com/yoweb/crew.wvm?=...';
}

var script = GM_getValue("script");

if(document.url == "http://meridian.puzzlepirates.com/yoweb/crew.wvm?=..." and script == "1"){
 	var elems = document.getElementsByTagName("a");
	var arr = jQuery.makeArray(elems);
	GM_setValue("key", JSON.stringify(elems));
	GM_setValue("script","2");
	GM_setValue("counter","1");
	Window.location.href == arr[1];
}
if(script == "2")
{
	var counter = GM_getValue("counter");
	var array = JSON.parse(GM_getValue("key"));
	if(array.length==counter){
		GM_setValue("script","3");
		window.location.href == "http://google.be/search?q=complete";
	}
	var imgl = jQ("....").attr("href");
	var pname = jQ("...").text();
	$.post(sendpage, { name: pname, img: imgl } );
	GM_setValue("counter",counter+1);
	window.location.href == arr[counter];
}
///////////////////////////////////////////////////////////////////////////////////////////////////
}

// load jQuery and execute the main function
addJQuery(main);