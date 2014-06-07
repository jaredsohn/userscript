// ==UserScript==
// @name           Tumblr Queuer
// @description    Checks "add to queue" select box, moves it out of "Advanced" controls on popup windows.
// @version        1.1
// @author         scragz
// @namespace      http://scragz.com/
// @include        http://www.tumblr.com/new/*
// @include        http://tumblr.com/new/*
// @include        http://www.tumblr.com/share*
// @include        http://tumblr.com/share*
// @include        http://www.tumblr.com/reblog/*
// @include        http://tumblr.com/reblog/*
// ==/UserScript==

(function() {
/* begin scragz' GM utility functions */
if (typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
if (typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
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
/* end scragz' GM utility functions */

var select, event, controls, divider, label, container;
if (select = _gi('post_state')) {
    GM_log('Tumblr Queuer');
    // select option
    select.options[1].selected = true;
    // fire needlessly complex change event
    var event = document.createEvent('MouseEvents');
    event.initEvent('change', true, false);
    select.dispatchEvent(event);
    // move to post_controls
    if (_gi('advanced') && (controls = _gi('post_controls'))) {
        // move our select box
        select.parentNode.removeChild(select);
        controls.appendChild(_ct(' and '));
        controls.appendChild(select);
        // delete the rest
        (divider = xpathFirst("//div[@id='advanced']/div/div[@class='divider']")) ? divider.parentNode.removeChild(divider) : null;
        (label = xpathFirst("//div[@id='advanced']/div/label[@class='option_label']")) ? label.parentNode.removeChild(label) : null;
        (container = xpathFirst("//div[@id='advanced']/div/div[@class='option']")) ? container.parentNode.removeChild(container) : null;
    }
}

})();