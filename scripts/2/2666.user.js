// ==UserScript==
// @name          Singletrackworld Eye Soother
// @namespace     http://*singletrackworld.com*
// @description   Removes most of the crap from the page, content is full width. Changes the colour scheme a bit.
// @include       http://*singletrackworld.com*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var datediv = divs[0];

if(datediv){
datediv.parentNode.removeChild(datediv);
}

var tables = document.getElementsByTagName('table');

var topofstw=tables[0];
topofstw.parentNode.removeChild(topofstw);

var Sides = document.evaluate(
		"//td[@width='143']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < Sides.snapshotLength; i++) {
	var Side = Sides.snapshotItem(i);
	Side.parentNode.removeChild(Side);
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.leftcolbg { background: none; }');


var alliframes = document.getElementsByTagName('iframe');
for (var i = 0; i < alliframes.length; i++) {
	var thisiframe = alliframes[i];
	thisiframe.parentNode.removeChild(thisiframe);
}


var lightstripes = document.evaluate(
		'//td[@bgcolor="#ffffcc"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < lightstripes.snapshotLength; i++) {
	var stripe = lightstripes.snapshotItem(i);
	stripe.style.background = '#ffffff';
	stripe.style.color = '#000000';
	stripe.style.font.weight = 'normal';
}

var darkstripes = document.evaluate(
		'//td[@bgcolor="#cccc99"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < darkstripes.snapshotLength; i++) {
	var stripe = darkstripes.snapshotItem(i);
	stripe.style.background = '#f4f4f4';
	stripe.style.color = '#000000';
}

var darkstripes = document.evaluate(
		'//td[@bgcolor="#990000"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < darkstripes.snapshotLength; i++) {
	var stripe = darkstripes.snapshotItem(i);
	stripe.style.background = '#ddddff';
	stripe.style.color = '#000000';
}

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	links[i].style.color = '#000000';
	links[i].style.fontWeight = 'normal';
}

var new_images = document.evaluate(
		'//img[@src="/images/links/new-english.gif"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < new_images.snapshotLength; i++) {
	var new_image = new_images.snapshotItem(i);
	new_image.parentNode.removeChild(new_image);
}

var fonttags = document.evaluate(
		'//font[@color="#FFFFFF"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < fonttags.snapshotLength; i++) {
	var fonttag = new_images.snapshotItem(i);
	fonttag.color = '#000000';
}
		
