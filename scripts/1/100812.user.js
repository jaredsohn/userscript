// ==UserScript==
// @name           ISCRIPT
// @namespace      asd2
// @include        http://www.booty-master.com/pindex.php
// @include        http://www.booty-master.com/pmarket.php?mode=list
// ==/UserScript==


// position:fixed means stay fixed even the page scrolls. z-index keeps your iframe on top.
// The remainder of the line smacks the panel into the bottom left corner, out of your way.
// Overflow (in combination with the setTimeout) ensures the iframe fits your entire panel.

var css = "position:absolute; "
        + "z-index:9999; "
        + "top: 114%; "
        + "left: 0; "
        + "border: 0; "
        + "margin: 0; "
        + "padding: 0; "
        + "overflow: auto; "
		+ "height: 1024px; " 
		+ "width: 1001px; ";
		
var iframe = document.createElement("iframe");
iframe.setAttribute("style", css);

// The about:blank page becomes a blank(!) canvas to modify
iframe.src = "http://www.booty-master.com/pmarket.php?mode=list";

document.body.appendChild(iframe);

// Make sure Firefox initializes the DOM before we try to use it.


if(document.location.href.indexOf("http://www.booty-master.com/pindex.php"))
{
GM_setValue("createdInUrl1", true);

//Code for url 1
}

else if(document.location.href.indexOf("http://www.booty-master.com/pmarket.php?mode=list") != -1 &&
GM_getValue("createdInUrl1"))
{
GM_setValue("createdInUrl1", false);


//Code for url 2, i.e. the iframe.
} 