// ==UserScript==
// @name           Kill Truncation
// @namespace      Anandtech
// @description    Kill Truncation
// @include        *.anandtech.com/*
// ==/UserScript==

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='BoxContentText') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('Hardware and Te...','Hardware and Technnology');
		anchor.innerHTML=anchor.innerHTML.replace('Highly Technica...','Highly Technical');
		anchor.innerHTML=anchor.innerHTML.replace('General Hardwar...','General Hardware');
		anchor.innerHTML=anchor.innerHTML.replace('CPU/Processors ...','CPU/Processors and Overclocking');
		anchor.innerHTML=anchor.innerHTML.replace('Video Cards and...','Video Cards and Graphics');
		anchor.innerHTML=anchor.innerHTML.replace('SFF, Notebooks,...','SFF, Notebooks, Pre-Built/Barebones PCs');
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
		anchor.innerHTML=anchor.innerHTML.replace('CPU/Processors and O...','CPU/Processors and Overclocking');
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
		anchor.innerHTML=anchor.innerHTML.replace('CPU/Processors and O...','CPU/Processors and Overclocking');
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




	}


}