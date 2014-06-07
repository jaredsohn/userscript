// ==UserScript==
// @name           Google Real Links
// @namespace      http://googlesucksbigtime.com
// @description    Remove google redirect spying.  Link google results to the the real links.
// @include        http://*.google.com/search*
// @include        http://google.com/search*
// ==/UserScript==

// v1.1

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
function cleanLinks(d){
	d = d.toString();
	if (d.indexOf("url=")!=-1) {
		d = d.split("url=")[1].split("&")[0];
	}
	return(d);
}

function getNodes(nodes) {
for (var x=0; x<nodes.snapshotLength; x++) {
	if (nodes.snapshotItem(x).href) {
		nodes.snapshotItem(x).href = cleanLinks(nodes.snapshotItem(x).href);
		nodes.snapshotItem(x).removeAttribute("onmousedown");
	}
}}

var nodes = xpath(document, "//a[starts-with(@class,'l')]");
getNodes(nodes);
var nodes = xpath(document, "//div[@class='vsc']");
getNodes(nodes);

//GM_addStyle('.vspib {display:none!important; visibility:hidden !important;}');
