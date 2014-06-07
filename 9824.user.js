// ==UserScript==
// @name           Kill Truncation 2
// @namespace      Anandtech
// @description    Kill Truncation 2
// @include        *forums.anandtech.com/*
// ==/UserScript==

//crimson117: added new categories as of 6/12

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var prespan = '';
var postspan = '';
//uncomment next two lines to prevent SFF category name wrapping
//prespan = '<span style=\'white-space: nowrap\'>';
//postspan = '</span>';

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='BoxContentText') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('Hardware and Te...','Hardware and Technnology');
		anchor.innerHTML=anchor.innerHTML.replace('Highly Technica...','Highly Technical');
		anchor.innerHTML=anchor.innerHTML.replace('General Hardwar...','General Hardware');
		anchor.innerHTML=anchor.innerHTML.replace('CPUs and Overcl...','CPUs and Overclocking');
		anchor.innerHTML=anchor.innerHTML.replace('Video Cards and...','Video Cards and Graphics');
		anchor.innerHTML=anchor.innerHTML.replace('SFF, Notebooks,...',prespan+'SFF, Notebooks, Pre-Built/Barebones PCs'+postspan);
		anchor.innerHTML=anchor.innerHTML.replace('Consumer Electr...','Consumer Electronics');
		anchor.innerHTML=anchor.innerHTML.replace('Digital and Vid...','Digital and Video Cameras');
		anchor.innerHTML=anchor.innerHTML.replace('Mobile Media an...','Mobile Media and Communications');
		anchor.innerHTML=anchor.innerHTML.replace('Audio/Video &amp; H...','Audio/Video &amp; Home Theater');
		anchor.innerHTML=anchor.innerHTML.replace('Software - Apps...','Software - Apps and Games');
		anchor.innerHTML=anchor.innerHTML.replace('Operating Syste...','Operating Systems');
		anchor.innerHTML=anchor.innerHTML.replace('Love and Relati...','Love and Relatitionships');
		anchor.innerHTML=anchor.innerHTML.replace('Distributed Com...','Distributed Computing');
		anchor.innerHTML=anchor.innerHTML.replace('Technical Forum...','Technical Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Personal Forum ...','Personal Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Merchandise and...','Merchandise and Shopping');
		anchor.innerHTML=anchor.innerHTML.replace('Politics and Ne...','Politics &amp; News');
		anchor.innerHTML=anchor.innerHTML.replace('System Memory a...','System Memory and NVRAM');
		anchor.innerHTML=anchor.innerHTML.replace('All Things Appl...','All Things Apple');
		anchor.innerHTML=anchor.innerHTML.replace('Windows/PC Soft...','Windows/PC Software');
		anchor.innerHTML=anchor.innerHTML.replace('Gadgets Gear an...','Gadgets Gear and Phones');
		anchor.innerHTML=anchor.innerHTML.replace('Want to Buy/Tra...','Want to Buy/Trade For');
		anchor.innerHTML=anchor.innerHTML.replace('Contests and Sw...','Contests and Sweepstakes');
		anchor.innerHTML=anchor.innerHTML.replace(/\n\t+/g,''); //this removes the extra space at the end of each category link

	}


}

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='BreadCrumb') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('CPUs and Overclockin...','CPUs and Overclocking'); //updated 6/12 by crimson117
		anchor.innerHTML=anchor.innerHTML.replace('Video Cards and Grap...','Video Cards and Graphics');
		anchor.innerHTML=anchor.innerHTML.replace('SFF, Notebooks, Pre-...','SFF, Notebooks, Pre-Built/Barebones PCs');
		anchor.innerHTML=anchor.innerHTML.replace('Digital and Video Ca...','Digital and Video Cameras');
		anchor.innerHTML=anchor.innerHTML.replace('Mobile Media and Com...','Mobile Media and Communications');
		anchor.innerHTML=anchor.innerHTML.replace('Audio/Video &amp; Home T...','Audio/Video &amp; Home Theater');
		anchor.innerHTML=anchor.innerHTML.replace('Software - Apps and ...','Software - Apps and Games');
		anchor.innerHTML=anchor.innerHTML.replace('Distributed Computin...','Distributed Computing');
		anchor.innerHTML=anchor.innerHTML.replace('Love and Relationshi...','Love and Relatitionships');
		anchor.innerHTML=anchor.innerHTML.replace('Technical Forum Issu...','Technical Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Personal Forum Issue...','Personal Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('System Memory and NV...','System Memory and NVRAM');
		anchor.innerHTML=anchor.innerHTML.replace('Gadgets Gear and Pho...','Gadgets Gear and Phones');
		anchor.innerHTML=anchor.innerHTML.replace('Want to Buy/Trade Fo...','Want to Buy/Trade For');
		anchor.innerHTML=anchor.innerHTML.replace('Contests and Sweepst...','Contests and Sweepstakes');

	}


}

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='DarkHeader') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('CPUs and Overclockin...','CPUs and Overclocking'); //updated 6/12 by crimson117
		anchor.innerHTML=anchor.innerHTML.replace('Video Cards and Grap...','Video Cards and Graphics');
		anchor.innerHTML=anchor.innerHTML.replace('SFF, Notebooks, Pre-...','SFF, Notebooks, Pre-Built/Barebones PCs');
		anchor.innerHTML=anchor.innerHTML.replace('Digital and Video Ca...','Digital and Video Cameras');
		anchor.innerHTML=anchor.innerHTML.replace('Mobile Media and Com...','Mobile Media and Communications');
		anchor.innerHTML=anchor.innerHTML.replace('Audio/Video &amp; Home T...','Audio/Video &amp; Home Theater');
		anchor.innerHTML=anchor.innerHTML.replace('Software - Apps and ...','Software - Apps and Games');
		anchor.innerHTML=anchor.innerHTML.replace('Distributed Computin...','Distributed Computing');
		anchor.innerHTML=anchor.innerHTML.replace('Love and Relationshi...','Love and Relatitionships');
		anchor.innerHTML=anchor.innerHTML.replace('Technical Forum Issu...','Technical Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Personal Forum Issue...','Personal Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('System Memory and NV...','System Memory and NVRAM');
		anchor.innerHTML=anchor.innerHTML.replace('Gadgets Gear and Pho...','Gadgets Gear and Phones');
		anchor.innerHTML=anchor.innerHTML.replace('Want to Buy/Trade Fo...','Want to Buy/Trade For');
		anchor.innerHTML=anchor.innerHTML.replace('Contests and Sweepst...','Contests and Sweepstakes');

	}


}