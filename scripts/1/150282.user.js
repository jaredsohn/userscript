// ==UserScript==
// @name        TL Brood War Link
// @namespace   http://www.dabbelt.com/~palmer/software/greasemonkey
// @description Add a link to the BW homepage
// @include     http://www.teamliquid.net/*
// @include     http://teamliquid.net/*
// @version     1.1.0
// ==/UserScript==

/* These are just some constants.  I like my scripts less than 80
 * characters wide so I had to give these some short names. */
var xpr = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var home_link = "<li><a href='/'>Home</a></li><li class='spacer'></li>";
var bw = "http://www.teamliquid.net/bw/";

/* Add an extra "home" element to the list. */
var list = document.evaluate('//ul[@id="tl_navigation"]',
			     document, null, xpr, null);

if (list.snapshotLength == 1)
{
    var elm = list.snapshotItem(0);
    elm.innerHTML = home_link + elm.innerHTML;
}

/* Swap that doubled home out to a BW link. */
var list = document.evaluate('//a[@href="/"]',
			     document, null, xpr, null);

if (list.snapshotLength == 2)
{
    var elm = list.snapshotItem(1);
    elm.innerHTML = "Brood War";
    elm.href = bw;
}

/* The search box is now too wide, shrink it a litle bit. */
list = document.evaluate('//form[@id="searchbox"]/input',
			 document, null, xpr, null);

if (list.snapshotLength == 1)
{
    var elm = list.snapshotItem(0);
    elm.size = elm.size - 8;
}
