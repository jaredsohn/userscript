// ==UserScript==
// @name           XKCD AltText
// @namespace      realillusions
// @description    Display Alt Text for XKCD on load.
// @include        http://xkcd.com/*
// ==/UserScript==

cc = document.getElementsByTagName('img')[1]

m = document.evaluate('//a[@href="http://store.xkcd.com/"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null)
n = m.snapshotLength

for(i=0,j=n;i<j;i++){
if(m.snapshotItem(i).firstChild && m.snapshotItem(i).firstChild.tagName && m.snapshotItem(i).firstChild.tagName.toLowerCase()=='img'){
		 cc = document.getElementsByTagName('img')[2];
		 break;
	 }
}

hover = document.createElement('div');
hover.innerHTML = '<b>Alt Text:</b><br/>"'+cc.title+'"';
hover.setAttribute('style','background-color:#DADADA;border:1px solid black;font-size:13px;font-family:Arial;font-variant:normal;padding:5px;margin:5px 0px 0px;');
div29 = document.getElementsByTagName('div')[29]
div29.parentNode.insertBefore(hover,cc.nextSibling.nextSibling);