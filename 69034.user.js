// ==UserScript==
// @name           [RA] Rue89
// @namespace      ra:rue89
// @description    removead for rue89
// ==/UserScript==
(function () {
	
	
	var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='allopass-wrapper']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
     thisDiv.parentNode.removeChild(thisDiv);
}
	
	var adbox1 = document.getElementById('sidebar-right'); // you kever know
	var adbox4 = document.getElementById('sidebar-left'); // you kever know
	var adbox2 = document.getElementById('top_menu'); // you kever know
	var adbox3 = document.getElementById('footer'); // you kever know
	var c = document.getElementById('comments'); // you kever know
	var a4 = document.getElementById('block-advblog-header'); // you kever know
	
	if (adbox1) { adbox1.parentNode.removeChild(adbox1); }
	if (adbox4) { adbox4.parentNode.removeChild(adbox4); }
	if (adbox2) { adbox2.parentNode.removeChild(adbox2); }
	if (adbox3) { adbox3.parentNode.removeChild(adbox3); }
	
	if (a4) { a4.parentNode.removeChild(a4); }
	if (c) { c.parentNode.removeChild(c); }
	
	
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.layout-both #center {width:100%;} #wrapper {padding-top:0px;}';
    head.appendChild(style);

	

}());

