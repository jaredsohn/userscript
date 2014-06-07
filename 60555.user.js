	// ==UserScript==
// @name Colour script
// @include <archive location>
// ==/UserScript==

var bs = document.getElementsByTagName("em");

for (var i=0; i<bs.length; i++) {
if (bs[i].firstChild.tagName == "B" ) {
if (bs[i].firstChild.firstChild.tagName == "I") {
bs[i].firstChild.firstChild.style.color = "#FF0000";
bs[i].firstChild.firstChild.style.fontWeight = "bold";
bs[i].firstChild.firstChild.style.fontStyle = "normal";
} else if (bs[i].firstChild.firstChild.tagName == "B" ) {
bs[i].firstChild.firstChild.style.color = "#0000FF";
bs[i].firstChild.firstChild.style.fontWeight = "bold";
bs[i].firstChild.firstChild.style.fontStyle = "normal";
}
}
}

Just put in the location of the archive after @include.	// ==UserScript==
// @name Colour script
// @include <archive location>
// ==/UserScript==

var bs = document.getElementsByTagName("em");

for (var i=0; i<bs.length; i++) {
if (bs[i].firstChild.tagName == "B" ) {
if (bs[i].firstChild.firstChild.tagName == "I") {
bs[i].firstChild.firstChild.style.color = "#FF0000";
bs[i].firstChild.firstChild.style.fontWeight = "bold";
bs[i].firstChild.firstChild.style.fontStyle = "normal";
} else if (bs[i].firstChild.firstChild.tagName == "B" ) {
bs[i].firstChild.firstChild.style.color = "#0000FF";
bs[i].firstChild.firstChild.style.fontWeight = "bold";
bs[i].firstChild.firstChild.style.fontStyle = "normal";
}
}
}

Just put in the location of the archive after @include.
