// ==UserScript==
// @name          Linkify ting (exclude emails)
// @namespace     http://ergosum.frac.dk/user/
// @description   Turn plain text links into real clikable links. Attempts to catch links like google.com
// @include       http://*
// @include       https://*
// @include       file:///*
// @exclude       http://*.google.*/*
// @exclude       https://*.google.*/*
// @exclude       http://twitter.com/*
// @exclude       https://twitter.com/*
// @exclude       http://*.facebook.com/*
// @exclude       https://*.facebook.com/*
// @exclude       http://*.youtube.com/*
// @exclude       https://*.youtube.com/*
// @exclude       http://youtube.com/*
// @exclude       https://youtube.com/*
// @exclude       http://addons.mozilla.org/*
// @exclude       https://addons.mozilla.org/*
// @copyright     JoeSimmons, Anthony Lieuallen, Adam
// @version       1.0.2
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL   http://userscripts.org/scripts/source/34397.user.js
// @updateURL     http://userscripts.org/scripts/source/34397.meta.js
// @grant         GM_addStyle
// ==/UserScript==

// -----------------------------------------------------------------------------
// Loosely based on the Linkify script located at:                             |
//   http://downloads.mozdev.org/greasemonkey/linkify.user.js                  |
//                                                                             |
// Originally written by Anthony Lieuallen of http://www.arantius.com/         |
// Licensed for unlimited modification and redistribution as long as           |
// this notice is kept intact.                                                 |
//                                                                             |
// If possible, please contact me regarding new features, bugfixes             |
// or changes that I could integrate into the existing code instead of         |
// creating a different script.  Thank you                                     |
// -----------------------------------------------------------------------------



(function(){
var regex = /\b(?![\@\s]+)((https?|nntp|news|telnet|irc|ftp):\/\/)?(([-.A-Za-z0-9]+:)?[\#-.A-Za-z0-9]+@)?((([\w-]+(?!@)\.)?([\w-]+\.)+(ru|am|dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info|co|in|to|fr|gov|biz|tv|mil|hu|eu|mobi|az|me|cc|cx|pk|ge|so|pl|ir|be|nz|re|ch|st|la|sk|cz|es|io|au|at|fm|ws)(\.(nr|in|uk))?)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(about:\w+))(\/[^\s]*)?\b/gi, space_regex=/ /g, http_regex=/^((https?|nntp|news|telnet|irc|ftp)\:\/\/)|(about:\w+)/i, txt=/\.txt$/i;

var black_tags = ["a", "script", "style", "textarea", "title", "option", "pre"+(txt.test(location.href)?"allowTxt":""), "code"];
var path = ".//text()[not(parent::" + black_tags.join(" or parent::") +")]";

textNodes = document.evaluate(path, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0,item; (item=textNodes.snapshotItem(i)); i++){
    
    var itemText = item.nodeValue;
    
    if (regex.test(itemText)){
        var span=document.createElement("span");    
        var lastLastIndex = 0;
            regex.lastIndex = 0;
        for (var myArray = null; myArray = regex.exec(itemText); ){
            var link = myArray[0];
            span.appendChild(document.createTextNode(itemText.substring(lastLastIndex, myArray.index)));
            var href = link.replace(space_regex,""),
                text = (link.indexOf(" ")==0)?link.substring(1):link;
            if (!http_regex.test(href)) href="http://"+href;
            var a = document.createElement("a");
            a.setAttribute("href", href.toLowerCase());
            a.setAttribute("target", "newWin"); // open in a new window/tab
            a.appendChild(document.createTextNode(text.substring(0,1).toUpperCase()+text.substring(1)));
            if ((link.indexOf(" ")==0)) span.appendChild(document.createTextNode(" "));
            span.appendChild(a);
            lastLastIndex = regex.lastIndex;
        }
        span.appendChild(document.createTextNode(itemText.substring(lastLastIndex)));
        item.parentNode.replaceChild(span, item);
    }
}
})();