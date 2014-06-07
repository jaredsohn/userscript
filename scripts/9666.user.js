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
	if(!(anchor.previousSibling.previousSibling.textContent).match('Enter login information')) 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('Hardware and Te...','Hardware &amp; Tech');
		anchor.innerHTML=anchor.innerHTML.replace('Highly Technica...','Highly Technical');
		anchor.innerHTML=anchor.innerHTML.replace('General Hardwar...','General Hardware');
		anchor.innerHTML=anchor.innerHTML.replace('CPUs and Overcl...','CPU &amp; Overclocking');
		anchor.innerHTML=anchor.innerHTML.replace('Video Cards and...','Video Cards');
		anchor.innerHTML=anchor.innerHTML.replace('SFF, Notebooks,...','SFF &amp; Notebooks');
		anchor.innerHTML=anchor.innerHTML.replace('Consumer Electr...','Consumer Devices');
		anchor.innerHTML=anchor.innerHTML.replace('Digital and Vid...','Cameras');
		anchor.innerHTML=anchor.innerHTML.replace('Gadgets Gear an...','Gadgets &amp; Phones');
		anchor.innerHTML=anchor.innerHTML.replace('Audio/Video &amp; H...','Audio/Video &amp; HT');
		anchor.innerHTML=anchor.innerHTML.replace('Windows/PC Soft...','Windows Software');
		anchor.innerHTML=anchor.innerHTML.replace('Operating Syste...','Operating Systems');
		anchor.innerHTML=anchor.innerHTML.replace('Love and Relati...','YAGT');
		anchor.innerHTML=anchor.innerHTML.replace('Distributed Com...','Dist Computing');
		anchor.innerHTML=anchor.innerHTML.replace('Technical Forum...','Tech Forum Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Personal Forum ...','Personal Issues');
		anchor.innerHTML=anchor.innerHTML.replace('Merchandise and...','Merchandise');
		anchor.innerHTML=anchor.innerHTML.replace('Politics and Ne...','Politics &amp; News');
		anchor.innerHTML=anchor.innerHTML.replace('System Memory a...','System Memory');
		anchor.innerHTML=anchor.innerHTML.replace('Want to Buy/Tra...','WTB/Trade');
		anchor.innerHTML=anchor.innerHTML.replace('Contests and Sw...','Contests');
		anchor.innerHTML=anchor.innerHTML.replace('All Things Appl...','All Things Apple');
 
  
 
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
