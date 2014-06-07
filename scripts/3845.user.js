// ==UserScript==
// @name        One Line Fix
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Shows full contents of alt attribute on review images when moused over
// @include     http://oneline.excellentcontent.com/*
// ==/UserScript==

/* Changelog
 * ---------
 * 2006-04-15 Fixed for Greasemonkey 0.6.4
 * 2005-06-20 Initial version.
 * -------------------------------------------------------------------------- */

(
function()
{
    xpathQuery = "//img[@alt]";

    var result = document.evaluate(
                     xpathQuery,
                     document,
                     null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);

    var img = result.singleNodeValue;

    if (img == null)
    {
        return;
    }

    // Set up extra content area
    var div = document.createElement("DIV");
    div.appendChild(document.createTextNode(img.alt));
    div.id = "extraContent";
    div.style.position = "absolute";
    div.style.backgroundColor = "#000";
    div.style.color = "#fff";
    div.style.padding = "5px 10px";
    div.style.border = "2px solid #fff";
    div.style.MozBorderRadius = "1em";
    div.style.display = "none";
    div.style.textAlign = "justify";
    document.body.appendChild(div);

    // Set up image
    img.style.cursor = "help";
    img.addEventListener("mouseover", function(e)
    {
        var img = e.target;
        var div = document.getElementById("extraContent");
        div.style.width = (img.width / 2) + "px";
        // Centre horizontally
        div.style.left = (img.x + (img.width / 4) - 12) + "px";
        // Display now to ensure clientHeight is set
        div.style.display = "block";
        // Centre vertically
        div.style.top = (img.y + (img.height - div.clientHeight) / 2) + "px";
    }, false);
    img.addEventListener("mouseout", function(e)
    {
        // Only hide once the mouse has left the image area
        if (e.relatedTarget.tagName != "DIV")
        {
            document.getElementById("extraContent").style.display = "none";
        }
    }, false);
}
)();