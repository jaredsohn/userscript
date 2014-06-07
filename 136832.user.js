// ==UserScript==
// @name       Clean Youtube Search
// @namespace  http://userscripts.org/
// @version    1.0.0b
// @description  This Script is cleaning your Youtube Search up
// @match      http://www.youtube.com/results?*
// @copyright  2012+, spycrab0
// ==/UserScript==
function StartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
var part = document.location.search.split("search_query=");
var query = part[1].split("&");

if (StartsWith(query[0],"%2B") || StartsWith(query[0],"+")) { } else {document.location = "?search_query=%2B" + query[0];}