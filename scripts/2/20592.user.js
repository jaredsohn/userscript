// ==UserScript==
// @name           Forbes Cleanup
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        http://www.forbes.com/*
// @exclude        http://www.forbes.com/
// @description    Changes Forbes article style and removes adds.
// ==/UserScript==

GM_addStyle("#searchbox {top:3!important;}");
GM_addStyle(".fifthN, .GMHide, #bigBannerDiv, .footlogo, .footbot, .ad_slug_table, #WindowAdHolder, #adDiv {display:none!important;");
GM_addStyle(".GMLeft {width:328px; padding-right:20px;}");
//GM_addStyle("#fdcrtsid {float:right; padding-left:10px;} .artcntrlheds {width:20em!important;}");
//GM_addStyle("br {clear:none!important;}");

$Z("//tr[td[@height='15']]", function(link, i, payload){link.style.display="none";})
$Z("//table[@width='780']", function(link, i, payload){
		link.width="600";
		$X("//td[@width='180' and @rowspan='2']", link).style.display="none";
	})
var t = $X("//table[@width='774']")
if(t) t.removeAttribute("width");
var td = $X("//td[@width='328']")
if(td)
{
	for(i = 0; i < td.parentNode.cells.length; i++)
		td.parentNode.cells[i].removeAttribute("width");
	/**/ //remove one * to disable the hide and have it float on the left instead.
	td.className="GMHide";
	/*/
	div = document.createElement("div");
	div.className="GMLeft";
	while(td.childNodes.length)
		div.appendChild(td.removeChild(td.childNodes[0]));
	td.appendChild(div);
	$Z("//div[contains(@style,'padding-top: 10px;')]", function(r,i,p){r.className="GMHide";}, div);
	$Z("//br", function(r,i,p){r.className="GMHide";}, div);
	/**/
}
$Z("//br", function(r,i,p){if($I(GetPreviousSibling(r), "BR") || $I(GetNextSibling(r), "BR")) r.className="GMHide"})
$Z("//div[@class='artcntrltxt']/div[@class='artcntrltxt' and contains(@style,'white-space: nowrap;')]", function(r,i,p){r.style.whiteSpace="normal";})

//$X("//br[following-sibling::div[@class='artcntrlheds']]");

function $I(r, a){if(r) return r.nodeName == a; return false;}
function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
	var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, j;
	for (i = j = 0; link = res.snapshotItem(i); ++i)
		j += func(link, i, payload);
	return j;
}
function GetParentNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.parentNode) && child.tagName != tag);
	return child?child:bad;
}
function GetNextNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.nextSibling) && child.nodeName != tag);
	return child?child:bad;
}
function GetPreviousNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.previousSibling) && child.nodeName != tag);
	return child?child:bad;
}
function GetNextSibling(node) {
	while((node = node.nextSibling) && node.nodeType != 1);
	return node;
}
function GetPreviousSibling(node) {
	while((node = node.previousSibling) && node.nodeType != 1);
	return node;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}