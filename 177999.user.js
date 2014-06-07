// ==UserScript==
// @name       LeakForums 5.0 - Blue Theme
// @namespace  BillyMaster
// @version    0.3
// @description  Replaces the green color of the LeakForums 5.0 theme with a color theme.
// @match      http://www.leakforums.org/*
// @copyright  2013, VasiliSth
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==



function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/global.css", "http://files.vasilisth.tk/uploads/594324075.global.css");
replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/panel.css", "http://files.vasilisth.tk/uploads/361258066.panel.css");
replaceStyleSheet("http://netdna.leakforums.org/cache/themes/theme995/tabbed.css", "http://files.vasilisth.tk/uploads/2024725605.tabbed.css");

var interval = 0.15; // in seconds

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