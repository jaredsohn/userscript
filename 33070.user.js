// ==UserScript==
// @name           biztositas
// @namespace      larkinor
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// @include        http://larkinor.index.hu/*
// ==/UserScript==

var objOldalTipus = searchDOM('//input[@name="oldalTipus"]').snapshotItem(0);
var oldalTipus=objOldalTipus.getAttribute('value');

if(oldalTipus=="otVilag"){
	var vanBizti=false;
	var imgs = document.getElementsByTagName('img');
	for(var i=0; i<imgs.length; i++){
		var img=imgs[i];
		if(img.src.indexOf("bizt_van.gif")>-1) {vanBizti=true; break;}
	}
	if(!vanBizti) alert("Nincs biztosításod!");
}
function searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
