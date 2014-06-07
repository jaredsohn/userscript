// ==UserScript==
// @name                WOTD on Wikipedia
// @author              Hoàng Đức Hiếu
// @description     Add english wiktionary's word of the day to english wikipedia main page
// @include             http://en.wikipedia.org/wiki/Main_Page
// @include http://hdh.dyn-o-saur.com/public-domain/test.html // test page
// ==/UserScript==

// License:
//  This program is placed in the public domain.
//  If the public domain is not available where you live, permission is granted for you to use, distribute, modify and distribute modified versions of this script for any purpose.

GM_xmlhttpRequest({ method: "GET", url: "http://en.wiktionary.org/wiki/Wiktionary:Main_Page", onload: function(response){
  responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
  wotd = responseXML.getElementById("WOTD-rss-title").innerHTML;
  definition = responseXML.getElementById("WOTD-rss-description").innerHTML;
  document.getElementById("siteNotice").innerHTML += "<dl><dt>" + wotd + "<dd>" + definition + "</dl>";
}});