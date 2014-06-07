// ==UserScript==
// @name           420chan Image Linker
// @author         satu2
// @namespace      http://twoson.org
// @description    Links images on 420chan, instead of resizing them
// @match          http://boards.420chan.org/*
// @version        2.0
// ==/UserScript==

// Thanks to http://userscripts.org/scripts/show/68252
// for getting this script to work with jQuery
function runJQuery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};
runJQuery(function($) {$('a').attr("onclick",function() { return (this.onclick=="return imageExpansion(this)" ? undefined : this.onclick);});});