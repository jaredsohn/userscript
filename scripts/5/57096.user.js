// ==UserScript==
// @name           isoHunt Download Linker
// @namespace      http://userscripts.org/users/23652
// @description    Adds a download icon beside each torrent search result
// @include        http://isohunt.com/torrents/*
// @include        https://isohunt.com/torrents/*
// @copyright      JoeSimmons
// @version        1.0.0
// ==/UserScript==

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,(obj['type']||6),null);
switch((obj['type']||6)){
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
}
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for each(var child in c) ret.appendChild(child);
	return ret;
}

var array=$g(".//a[starts-with(@id,'link') and starts-with(@href,'/torrent_details/')]",{node:$g("#serps")}),
	regex=/torrent_details\/(\d+\/[^\?]+)\?tab=summary/;
for(var i=0,item; (item=array.snapshotItem(i)); i++) item.parentNode.insertBefore(create("a",{href:"http://isohunt.com/download/"+item.href.match(regex)[1]+".torrent"},new Array(create("img",{style:"border:0!important;",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI9SURBVDiNhZNNaBNBGIbfmezmD2vAYNJD/MGq9SIaj0m04MGL8SIULx4q4kEU6qFV8SoI0hU8qVCEnBQholJTW3Kx1lUItS0Ue6hVtFTNmq79C+kms7Ofh9Yamxjf4zffPPO+880wIkK14t1qHoQw6onB0HtEc3VJqWkihG9dSMN2BGxHYMkqYMkyAQB3H92oAdcCADDGkJt5jrJdQqE4g49zY2g/eLWuKV6vWB3Ko/jrbmwIABGIHBARFO5uCFASl1WdHMTW7btgOSS9kmxIsrFcNlG9Fu9S1w0yjjcKOUhFQi3Riyev+xSXCiLHK0mCmAS4RFEWoHo5uMJw/tQ1LwgQooJ0NlWaX5xLMSJColtNt0WPJ49Ek573+VeQXECijBV7EdPzORBoLRZH2/bTGJ0YKU9Ojfe97hHtfC1yx8uxjPHFmKJIcC+IVwCXjUJlGqqPwe3jUH0uRCNHYS6YNPlh3CDCmfVL1DVRBCH5cPCe5eVNCPiDKNFPlF2LcHs53D4Xtm3Zg5CvBdmhjEUOkromin9NQdfEREWsdD4YvFPaETgAm5WgelZP3rwpgP2hY+jLPi4JUenUNTFRd4y6JnpnjU8vhscGRGswAa4wKG6OQ+ETyL17W/lhfuvXNdHb8B2Qg46hkYHvprFAu5ti2OWPwfy6TLlRPe/I1dwNAbomiiSRzGSfWVuxD0GnFU/7n1iO/JO7Wmzjb/yteJd6LtK88zYAzOY/X9po/b8AADh8Rb0PAMM3xdl/9fwCc0oSKoZoHMsAAAAASUVORK5CYII="}))), item);