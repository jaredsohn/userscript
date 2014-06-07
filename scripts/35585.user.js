// ==UserScript==
// @name           Jira Wiki Whitespace
// @namespace      http://mailerdaemon.home.comcast.net
// @description    Mimic non-wiki style whitespace for description and comments
// @include        *jira*/browse/*-*
// @version        1.3
// @unwrap
// ==/UserScript==

GM_addStyle("div#description_full p, div.action-body ul, div.action-body ol, div.action-body blockquote { margin-bottom: 0;}");

if(x = $X("//div[@id='description_full']"))
{
	//jira wraps the description in spaces, we need to remove them or they will trouble us later.
	if(x.firstChild.nodeType == x.TEXT_NODE) x.firstChild.data = x.firstChild.data.replace(/^\n            /, "");
	if(x.lastChild.nodeType  == x.TEXT_NODE) x.lastChild.data = x.lastChild.data.replace(/\n        $/, "");
	
	rep = String.fromCharCode(32,160);
	$Z("//div[@id='description_full' or (@class='action-body' and not(@id='changehistory'))]/descendant-or-self::*[not(ancestor-or-self::pre) and text()]", function(r)
	{
		for( var i=0; i < r.childNodes.length; i++ )
			if(r.childNodes[i].nodeType == r.TEXT_NODE)
			{
				p = r.childNodes[i];
				span = document.createElement("span");
				span.innerHTML = p.data.replace(/  /g, rep).replace(/&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/([^\n])(?=\n)/g, "$1<br/>");
				p.parentNode.replaceChild(span, p);
			}
	});
}

function $X(_xpath, node){//to search in a frame, you must traverse the .contentDocument or .contentWindow attribute.
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
/*function $Y(_xpath, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}*/
function $Z(_xpath, func, node){
    var doc = (node)?(node.ownerDocument || node):(node = document);
    var res = doc.evaluate(_xpath, node, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var args = Array.prototype.slice.call(arguments, 3);
    var i = 0;
    for (; i < res.snapshotLength; ++i)
        func.apply(func, [res.snapshotItem(i), i].concat(args));
    return i;
}
/*function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}
function remove(r){return r.parentNode.removeChild(r);}
/**/function replace(old, New){return old.parentNode.replaceChild(New,old);}
