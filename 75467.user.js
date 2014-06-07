// ==UserScript==
// @name           Blackboard Universiteit Twente Enhanced
// @namespace      tdevil
// @include        https://blackboard.utwente.nl/*
// ==/UserScript==


//var elmLink = document.getElementsByTagName("a");
var utBanner = document.evaluate("//a[contains(@href,'http://www.utwente.nl')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; //elmLink.item(0);
utBanner.href = "http://atteroignorantiam.blogspot.com/2009/11/why-blackboard-sucks.html";
var logo = document.evaluate("//img[contains(@src,'LogoUT')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var utLogo = logo; //utBanner.firstChild;
utLogo.src = "";//http://ipv6.google.com/logos/earthday10-hp.gif";
utLogo.alt = "";
utLogo.height = "40";
//for(var i = 0; i < document.getElementsByTagName('body'); i++){
var head = top.frames[1].document.getElementsByTagName('head')[0].innerHTML;
head+='<style type="text/css">\n';
head+='#_titlebarExtraContent {margin-top: 0;}\n';
head+='</style>\n';
top.frames[1].document.getElementsByTagName('head')[0].innerHTML=head;
document.getElementsByTagName('body')[0].setAttribute('style', 'background:url(http://thedevil.orgfree.com/images/bb/UT.jpg) no-repeat scroll -8px -4px black;');
var frameset = top.document.getElementsByTagName('frameset').item(0);
frameset.setAttribute('name', 'ass');
frameset.rows="88,*";
//frameset.cols="120,*";
var stupidSpacer = document.evaluate("//img[@height='12'][@src='/images/swatches/FFFFFF.gif']",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	stupidSpacer.setAttribute('height','0');
var i = 0;
var inactiveTopLeftCorners = document.evaluate("//img[@height='14'][@src='/images/console/tabcorners/re_000000_l.gif']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < inactiveTopLeftCorners.snapshotLength; i++) {
inactiveTopLeftCorners.snapshotItem(i).src = "http://thedevil.orgfree.com/images/bb/tl.png";}

var inactiveTopRightCorners = document.evaluate("//img[@height='14'][@src='/images/console/tabcorners/re_000000_r.gif']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( i = 0; i < inactiveTopRightCorners.snapshotLength; i++) {
inactiveTopRightCorners.snapshotItem(i).src = "http://thedevil.orgfree.com/images/bb/tr.png";}

var inactiveCenter = document.evaluate("//td[@rowspan='2'][@bgcolor='#000000']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < inactiveCenter.snapshotLength; i++) {
inactiveCenter.snapshotItem(i).setAttribute('style',"background:url(http://thedevil.orgfree.com/images/bb/c.png) repeat scroll center 0 black;");}

var inactiveBottom = top.frames[0].document.evaluate("//td[@height='14'][@bgcolor='#000000']",
		top.frames[0].document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < inactiveBottom.snapshotLength; i++) {
inactiveBottom.snapshotItem(i++).setAttribute('style',"background:url(http://thedevil.orgfree.com/images/bb/bl.png) repeat scroll center 0 black;");}
for (i = 1; i < inactiveBottom.snapshotLength; i++) {
inactiveBottom.snapshotItem(i++).setAttribute('style',"background:url(http://thedevil.orgfree.com/images/bb/br.png) repeat scroll center 0 black;");}