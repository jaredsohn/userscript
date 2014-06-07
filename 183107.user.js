// ==UserScript==
// @name       Eveonline oldforum external link fixer
// @namespace  http://kimb.github.com/
// @version    0.1
// @description  enter something useful
// @match      http://oldforums.eveonline.com/*
// @copyright  2013, kimb
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$('a').each( function(i, e) {
    var m, fixed;
    if (m=e.href.match(/externalLink\.aspx\?l\=(.*)/)) {
        fixed = decodeURIComponent(m[1]);
        e.href=fixed;        
        console.log ('fixed', m[1], 'to', fixed );
    }
});

