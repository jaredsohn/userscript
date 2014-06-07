// ==UserScript==
// @name           Shortcuts for image-links
// @namespace      http://www.n-regen.bplaced.de
// @description    Adds shortcuts to image-links.
// ==/UserScript==

var imageLinks = new Array();
var shortcuts = new Array();

// add the following two lines for every image-link you want to have a shortcut for
imageLinks.push("example.gif");
shortcuts.push("p");


var lnks = document.getElementsByTagName("a");
for (var index in lnks)
{
    for (var il in imageLinks)
    {
        if (lnks[index].innerHTML.indexOf(imageLinks[il]) != -1)
        {
            lnks[index].accessKey = shortcuts[il]; //or any other key you like
            break; //terminate the script, so the accesskey-attribute is only added to the first link matching "example.gif"
        }
    }
} 