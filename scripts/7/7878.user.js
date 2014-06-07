// ==UserScript==
// @name        Rllmuk Resized Image Restorer
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Restores resized images to their normal size and removes resized image toolbars.
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// @include     http://www.rpsoft.co.uk/*
// @include     http://rpsoft.co.uk/*
// @include     http://www.extranoise.co.uk/*
// @include     http://extranoise.co.uk/*
// ==/UserScript==

/* Changelog
 * ---------
 * 2007-03-10 Initial version.
 * -------------------------------------------------------------------------- */

// Remove linked-image class from user posted images - this should
// prevent images which take some time to load from being detected
// and resized.
var images = document.evaluate("//img[@class='linked-image']",
                               document,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null);

for (var i = 0; i < images.snapshotLength; i++)
{
    var image = images.snapshotItem(i);
    if (image.alt != "Attached image") // Leave attached images alone
    {
        image.className = "";
    }
}

// Images may have been cached or were otherwise quick to load, so
// look for image toolbars, hiding them and restoring their associated
// image to its normal size.
var toolbars = document.evaluate("//div[@class='resized-linked-image']",
                                 document,
                                 null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                 null);

for (var i = 0; i < toolbars.snapshotLength; i++)
{
    var toolbar = toolbars.snapshotItem(i);
    if (toolbar.id == null || toolbar.id == "") // Leave attached images alone
    {
        toolbar.style.display = "none";
        var image = toolbar.nextSibling;
        while (image.nodeType != 2) // Skip over any text nodes
        {
            image = image.nextSibling;
        }
        image.style.width = "auto";
    }
}