// ==UserScript==
// @name           Gmailers Against Picasa
// @description    Puts back the reader link. Optional link to Flickr for Photos link.
// @version        1.0
// @author         scragz
// @namespace      http://scragz.com/
// @include        http://mail.google.com/mail/*
// ==/UserScript==

(function() {
SHOW_FLICKR_LINK = true;
/* begin scragz' GM utility functions */
DEBUG = false;
var _gt = function(e) { return document.getElementsByTagName(e); };
var _gi = function(e) { return document.getElementById(e); };
var _ce = function(e) { return document.createElement(e); };
var _ct = function(e) { return document.createTextNode(e); };
var _gc = function(clsName)
{
    var elems = document.getElementsByTagName('*');
    var j = 0;
    var arr = new Array();
    for (var i=0; (elem = elems[i]); i++) {
        if (elem.className == clsName) {
            arr[j] = elem;
            j++;
        }
    }
    return (arr.length > 0) ? arr : false;
};
var xpath = function(query, startingPoint)
{
    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return retVal;
};
var xpathFirst = function(query, startingPoint)
{
    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0) return false;
    else return res.snapshotItem(0);
};
var swapNode = function(node, swap)
{
    var nextSibling = node.nextSibling;
    var parentNode = node.parentNode;
    swap.parentNode.replaceChild(node, swap);
    parentNode.insertBefore(swap, nextSibling);
};
var addGlobalStyle = function(css)
{
    var head, style;
    head = _gt('head')[0];
    if (!head) { return; }
    style = _ce('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
if (DEBUG == false) {
    var GM_log = function(t){return true;}
} else if (unsafeWindow.console) {
    var GM_log = unsafeWindow.console.log;
} else if (console) {
    var GM_log = console.log;
}
/* end scragz' GM utility functions */

var restart_count = 0;
var go_ahead = function()
{
    var nav, photos_link, reader_link;
    if (nav = _gi('gbar')) {
        GM_log(nav);
        photos_link = xpathFirst("//a[text()[contains(., 'Photos')]]", nav);
        GM_log(photos_link);
        reader_link = photos_link.cloneNode(false);
        reader_link.setAttribute('href', 'http://www.google.com/reader/view/?tab=my');
        reader_link.appendChild(_ct('Reader'));
        photos_link.parentNode.insertBefore(reader_link, photos_link);
        GM_log(reader_link);
        if (SHOW_FLICKR_LINK) {
            photos_link.setAttribute('href', 'http://www.flickr.com/');
        } else {
            photos_link.parentNode.removeChild(photos_link);
        }

    } else { // try again
        restart_count++;
        if (restart_count < 100) window.setTimeout(go_ahead, 200);
    }
}
window.addEventListener('load', go_ahead, true);

})();