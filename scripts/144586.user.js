// ==UserScript==
// @name        MMA.tv YouTube Fullscreen
// @namespace   http://userscripts.com/noisebully
// @description Enables fullscreen video viewing on MMA.tv forums.
// @version     1
// @include	http://www.mixedmartialarts.com/*
// @match	http://www.mixedmartialarts.com/*
// @exclude	http://www.mixedmartialarts.com/includes/*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var w=$;var $=jQuery;$('table.PostList td.PostContent embed').each(function(){var $v=$(this);var so=new SWFObject($v.attr('src'),$v.attr('id'),$v.attr('width'),$v.attr('height'),'9.0.28','##000');so.addParam('allowfullscreen','true');so.addParam('allowscriptaccess','always');so.write($v.parent().attr('id'));});$=w;
  // no conflict rescue
  var jQuery13 = jQuery;
  jQuery.noConflict(true);
}

// load jQuery and execute the main function
addJQuery(main);