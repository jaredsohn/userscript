// ==UserScript==
// @name          GMX Attachment DDL
// @namespace     mailto:martinDOTjantscherATgmxDOTat
// @description   Enables direct download of attachments without being redirected to that useless "Attachment-Download"-page
// @include       http://service.gmx.net/de/cgi/g.fcgi/mail/print?*   
// ---------
// LAST UPDATED ON 31.08.2007 --> and it works again :)
// --------
// ==/UserScript==

var expr=/derefer\?TYPE=2&DEST=.+\?(mid\=.+)\&(uid\=.+)\&/i;

function dogmx() {
var aelements = document.evaluate("//IMG[@title='Attachment downloaden']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
for(i=0;i<aelements.snapshotLength;i++) { 
  alterdlurl(aelements.snapshotItem(i)); 
 }
}

function alterdlurl(element) {
var filename=element.parentNode.parentNode.firstChild.getAttribute('title');
var oldurl=unescape(element.getAttribute("href"));
expr.exec(oldurl);
element.setAttribute("href", "http://www.gmxattachments.net/de/cgi/g.fcgi/mail/print/attachment:/filename/"+filename+"?"+RegExp.$1+"&"+RegExp.$2+"&frame=attachment");
element.removeAttribute("target");
element.removeAttribute("onClick");
return true;
}

unsafeWindow.document.onLoad=dogmx();