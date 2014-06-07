// ==UserScript==
// @name        stirinoi.com no thumbwindows
// @description Kill thumbWindows links
// @namespace   http://www.altblue.com/gm_scripts/
// @author      Marius Feraru http://www.altblue.com/
// @include     http://www.stirinoi.com/*
// @version     0.1
// ==/UserScript==

(
  function() {
    var links = document.body.getElementsByTagName('a');
    if (!links || links.length < 1) return false;
    for (var i=0, len = links.length; i < len; i++) {
        var match = (links[i].href || '').match(/javascript:thumbWindow\('([^']+)'/i);
        if (!match) continue;
        links[i].href = match[1]; 
    }
  }
)();
