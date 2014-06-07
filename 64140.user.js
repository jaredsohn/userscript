// ==UserScript==
// @name           Hokej.sk slapshot
// @namespace      Amoondre (c) 2009
// @description    Hokej.sk slapshot prefiller
// @include        http://www.hokej.sk/slapshot/*
// ==/UserScript==

var allDomaci, allHostia, liga;
allDomaci = document.evaluate("//select[contains(@name,'domaci')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
allHostia = document.evaluate("//select[contains(@name,'hostia')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allDomaci.snapshotLength; i++) {
    //thisSelect = allSelects.snapshotItem(i);
	//thisSelect.value = "2";
	liga = window.location.host.substring(window.location.host.length-2);
	if(document.URL.substring(document.URL.length-2) == 32){
		allDomaci.snapshotItem(i).value = "3";
	} else allDomaci.snapshotItem(i).value = "4";
	allHostia.snapshotItem(i).value = "2";
}