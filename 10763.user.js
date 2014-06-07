// ==UserScript==
// @name	Last.fm - Favicon Changer
// @namespace	http://no.name.space/	
// @description	Changes the tab and address bar favicon ("favicon") for Last.fm
// @include	http://www.last.fm/*
// ==/UserScript==

// History
// 2007-07-18 : Created - gadgetchannel
// 2008-07-25 : Changed for new site

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


var BlackIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wcWDjI5vFajFwAAAWZJREFUeNrdkqGLAnEQhWdFqwgLwmIVVjBYRRRZtBgWs0GsYhObwWgzGIzmXzDI+geIYYMYTLIsIossIhoN5u+Sitwl79I9mDIz74N5jAaIpmnIBwI0TUQ+Mj8UkV/q7wDxeFzG47EcDgcJw1BWq5WUSqXnYqFQENd1ZbvdSqfTec8ikUiw2+1YLpdYlkUul2MwGHC/37Ftm0gkQhAENJtNisUiw+GQaDTKIz8mkwmLxeLReFatViMMQ7LZLGEYYprmtx0RETzPo1qt/jTEdV36/T6tVovL5YLjONTr9XeA7/uUy+UfAbZtEwQBsVgMXdfpdrtcr1dGo9ELMJ1OUUp9M6fTaXRdZ71e02g0nv1KpcJ+v38Bkskkp9OJ2WxGJpPBMAza7Ta32w3TNLEsi/P5TD6fJ5VK4TgO8/n8BRARDMNAKUUQBByPRzabzdutvV4Pz/PwfR+lFLquIyL8h1cGtE/NgPYF24b3mfJw5VQAAAAASUVORK5CYII=';
var RedIcon = 'http://cdn.last.fm/flatness/nice_favicon.png';
var CurrentColour;

function ChangeFavicon(Colour)
{
	
	var links = xpath("//link[contains(@rel, 'icon')]");
	var link;
	if(links.snapshotLength > 0)
	{
		for(var i=0;i<links.snapshotLength;i++)
		{
			link = links.snapshotItem(i);
			var head = link.parentNode;
			head.removeChild(link);
		}
		var rel = "icon";
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
	}
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
           
	toglinks = xpath("//a[@id='colourToggle']");
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
