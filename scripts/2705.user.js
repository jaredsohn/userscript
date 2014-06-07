// ==UserScript==
// @name           Blocket.se search from start page
// @namespace      http://henrik.nyh.se
// @description    Search nationally straight from the start page of Blocket.se.
// @include        http://www.blocket.se/
// @include        http://blocket.se/
// ==/UserScript==

var header = document.evaluate("//img[starts-with(@alt, 'Blocket.se')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var div = document.createElement("div");

div.innerHTML = '<form name="f" action="/li" method="get"><input name="q" value="" size="40" id="searchtext" type="text"> <input id="searchbutton" value="S&ouml;k" type="submit"> </form>';

div.style.marginTop = "5px";
div.style.padding = "5px";
div.style.marginBottom = "1em";
div.style.backgroundColor = "#DCDCC3";

// Juggle
header.parentNode.insertBefore(div, header);
header.parentNode.insertBefore(header, div);

document.getElementById('searchtext').focus();