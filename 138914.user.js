// ==UserScript==
// @name           IEEExplore direct PDF links
// @description    Replaces all PDF links on IEEE Xplore with the direct link to the file, bypassing the annoying frameset.
// @namespace      userscripts
// @include        http://ieeexplore.ieee.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==



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
function ieee_replace() {
	jQ('a[href^="/xpl/ebooks/bookPdfWithBanner.jsp"]').each(function process() {
		jQ(this).attr("href").match(/\/xpl\/ebooks\/bookPdfWithBanner.jsp\?fileName=(\d+)\.pdf\&bkn\=(\d+)/g);
		jQ(this).attr("href", "/ebooks/" + RegExp.$2 + "/" + RegExp.$1 + ".pdf?bkn=" + RegExp.$2);
	});
	
	jQ('a[href^="/stamp/stamp"]').each(function process() {jQ(this).attr("href", jQ(this).attr("href").replace("stamp/stamp", "stampPDF/getPDF")); });
}
  ieee_replace();
  document.body.addEventListener('DOMNodeInserted', function(event) { ieee_replace(); }, false);
}

// load jQuery and execute the main function
addJQuery(main);




