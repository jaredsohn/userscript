// ==UserScript==
// @name           Jira Link Type Set
// @namespace      http://home.comcast.net/~mailerdaemon
// @description    Do not let the use link the issue until they have set the link type
// @include        */LinkExistingIssue!default.jspa*
// @version        1.2
// ==/UserScript==

var select = $X("//select[@id='linkDesc_select']");
var submit = $X("//input[@type='submit' and (@id='Link' or @name='Link')]");
if(select && submit)
{
/* */
	select.insertBefore(n = document.createElement("option"), select.options[0]);
	submit.disabled = n.selected = true;
	var f = function(){submit.disabled = n.selected;};
/*/
	submit.disabled = true;
	var f = function(){submit.disabled = false;};
/* */
	select.addEventListener( "click", f, false );
	select.addEventListener( "change", f, false );
	GM_addStyle(".fieldLabelArea { width:10%; }");
}

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
	var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, j;
	for (i = j = 0; link = res.snapshotItem(i); ++i)
		j += func(link, i, payload);
	return j;
}
