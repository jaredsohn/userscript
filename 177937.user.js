// ==UserScript==
// @name       LeakForums 5.0 - Blue Edition
// @namespace  http://www.leakforums.org/member.php?action=profile&uid=60763
// @version    0.2
// @description  Change the LeakForums 5.0 theme color.
// @match      http://www.leakforums.org/*
// @copyright  2013, Puff - UID: 60763
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @downloadURL http://userscripts.org/scripts/source/177937.user.js
// @updateURL http://userscripts.org/scripts/source/177937.user.js
// ==/UserScript==



function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/global.css", "http://freegalaxys4.net63.net/blue/global.css");
replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/panel.css", "http://freegalaxys4.net63.net/blue/panel.css");
replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/tabbed.css", "http://freegalaxys4.net63.net/blue/tabbed.css");

var interval = 0.25; // in seconds

// DON'T EDIT BELOW ///////////////////

function imgReplace() {
    var images = document.getElementsByTagName('img'),
        len = images.length, img, i;
    for (i = 0; i < len; i += 1) {
        img = images[i];
        img.src = img.src.replace('http://x.leakforums.org/images/leakforums/minion.gif', 'http://i.imgur.com/e2mpFE0.png');
    }
}

setInterval(imgReplace, interval * 1000);