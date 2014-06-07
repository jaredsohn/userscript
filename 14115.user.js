// ==UserScript==
// @name	Last.fm - Favicon Changer
// @namespace	http://no.name.space/	
// @description	Changes the tab and address bar icon ("favicon") for Last.fm based on your colour setting (red or black)
// @include	http://www.last.fm/*
// ==/UserScript==

// History
// 2007-07-18 : Created - gadgetchannel


function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


var BlackIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAE4gAABOIAEWfZneAAAAB3RJTUUH1wsSFgIyrGXE8gAAAYJJREFUOMvdUi2rKlEUXeddMNkEswiCxegP8B8IWiYpzg+wG/RitYiKiMEw0aLFNEHEpAgihpNGDKMHw4wfh7GuF+57c4Mv+V56C3ZZe621YbEFSQghiDdAUggAb5l/4wf+Ev8uwDAMbDYbXK9XaK3hui56vV4o7HQ6OJ1OuFwumM1mIf8B4LNUKqHdbiMSiWA6nWKxWCAajSKfzyOVSkEphVarheVyidVqhWQyicPhgOPx+FXmdrul4zj8VWg4o9GIWms2m01qrdloNF40AEDP8zgcDl+WiUSC5/OZ8/mck8mEQRDQcRxalsVsNvsd4Ps++/3+n9JpWRbv9ztzuRxN06Rt2wyCgOv1+jtgv99TSvlirtVqNE2TSimOx+OQHwwG9H2fAPgB4FMIgUKhgHK5jFgshkwmg3q9jkqlgt1uB9d1USwWEY/HkU6nYRgGns8nut3uV4kAWK1WKaXk7Xbj4/GgUoqWZYVXbdum53n0fZ9SSpqmSQD8H16ZpHjXTFL8BAYbAEkPNr3hAAAAAElFTkSuQmCC';
var RedIcon = 'http://panther1.last.fm/matt/nice_favicon.png';
var CurrentColour;

function ChangeFavicon(Colour)
{
	
	var links = xpath("//link[contains(@rel, 'shortcut icon')]");
	var link = links.snapshotItem(0);
	var rel = link.rel;
	var head = link.parentNode;
	head.removeChild(link);
	
	link = document.createElement("link");
	link.rel = rel;
	if (Colour == 'black')
	{
		link.href = BlackIcon;
	}
	if (Colour == 'red')
	{
		link.href = RedIcon;
	}
	head.insertBefore(link,null);
	return false;
}

function click_handler()
	
{
	if (CurrentColour == 'black')
	{
		ChangeFavicon('red');
		CurrentColour = 'red';
	}
	else
	{
		ChangeFavicon('black');
		CurrentColour = 'black';
	}
}


(function () {
  	var toRedStr = "Simply Red";
        var toBlackStr = "Paint it Black";
           
	toglinks = xpath("//li[@id='toglink']/a");
	toglink = toglinks.snapshotItem(0);
	toglink.addEventListener('click', click_handler, false);
	if (toglink.innerHTML == toRedStr)
	{
		CurrentColour = 'black';
		ChangeFavicon('black');
	}
	else
	{
		CurrentColour = 'red';
	}
	
})();