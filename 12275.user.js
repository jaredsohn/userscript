// ==UserScript==
// @name          LyricWiki Cleaner v2
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Removes Send to a friend, why the ad? links and Sponsor box from LyricWiki pages
// @include       *lyricwiki.org*
// @author		  Kovianyo
// ==/UserScript==


function log(line)
{
var curdate = new Date();
var times = curdate.toGMTString();

GM_log("\n" + times + ";  " + line);
}

// removes an HTML element from the document
function remove(element)  
{
element.parentNode.removeChild(element);
}

// removing div with Send to a fiend link
var contentdiv = document.getElementById("content");

allElements = document.evaluate(
    "div",
    contentdiv ,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//log(allElements.snapshotLength);
if (allElements.snapshotLength>0)
{
div = allElements.snapshotItem(0);
//log(div);
//div.parentNode.removeChild(div);
remove(div);
}

// removing div with why the ad?

var div = document.getElementById("column-skyscraper");
div.parentNode.removeChild(div);

// making div wider
contentdiv.style.marginRight="12px !important";
contentdiv.style.borderRight="1px solid #AAAAAA !important";
contentdiv.className = "";

//var sponsors = document.getElementById("p-navigation").nextSibling;
//sponsors.parentNode.removeChild(sponsors);

// remove Sponsors box
allElements = document.evaluate(
    "//div[@id='column-one']/*",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//log(allElements.snapshotLength);
if (allElements.snapshotLength>3)
{
remove(allElements.snapshotItem(4));
}

