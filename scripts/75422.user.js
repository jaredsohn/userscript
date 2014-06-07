// Pinboard.in clean up
// version 0.2 BETA!
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Pinboard.in clean up
// @namespace     http://justin.kelly.org.au
// @description   Clean up UI of pinboard.in
// @include       http://pinboard.in/*
// @include       http://www.pinboard.in/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { display:inline; }');
addGlobalStyle('.star { display:none; }');
addGlobalStyle('.when { display:none; }');
addGlobalStyle('#footer { display:none; }');
addGlobalStyle('#timer { display:none; }');
addGlobalStyle('#logo { display:none; }');
addGlobalStyle('.private { background:#FFF; }');
addGlobalStyle('.description { display:none; }');
addGlobalStyle('.bookmark { margin:0;padding:0; }');
addGlobalStyle('#bulk_links { margin-bottom: 0; }');
addGlobalStyle('.display br { display:none; }');


var allDivs, thisDiv;

allDivs = document.evaluate(
    "//div[@class='star']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	thisDiv.parentNode.removeChild(thisDiv);
}



/*

function truncate(string,string_length){
	var length = string_length;
	var myString = string;
	var myTruncatedString = myString.substring(0,length);
	return; myTruncatedString+'...'
}

var elem = this.getElementsByTagName('display');

for (var i = 0; i < elem.length; i++) {
	var classes = elem[i].className;
	//if (myclass.test(classes)) retnode.push(elem[i]);
	
	ar adSidebar = document.getElementById('ads');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
	
}
*/