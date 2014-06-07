// ==UserScript==
// @name           UserScripts.org - New Script in Dropdown
// @namespace      http://mailerdaemon.home.comcast.net
// @description    Adds a "New Script" option to the user dropdown on UserScripts.org
// @include        http://userscripts.org/*
// ==/UserScript==

if(hm = document.getElementById("homeMenu"))
{
	hm.appendChild(li = document.createElement("li"));
	li.innerHTML="<a href='/scripts/new'>new script</a>";
}
/*
function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
    var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var i, j;
    for (i = j = 0; link = res.snapshotItem(i); ++i)
        j += func(link, i, payload);
    return j;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}
function remove(r){return r.parentNode.removeChild(r);}
function replace(old, New){return old.parentNode.replaceChild(New,old);}
*/