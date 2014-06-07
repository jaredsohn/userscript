// ==UserScript==
// @name          StrippedDirectory
// @namespace     http://blog.yanime.org/strippeddirectory.user.js
// @description   Cleans up streetdirectory.com interface
// @include       http://www.streetdirectory.com/*/travel.php*
// @include       http://www.streetdirectory.com/*/gps.php*
//
// ==/UserScript==

// don't cover the map!
ele = document.getElementById("tblShow");
if (ele) {
    ele.style.position = "absolute";
    ele.style.top = "-70px";
}

// don't cover the map!
ele = document.getElementById("but_hide_sat");
if (! ele) { ele = document.getElementById("but_view_sat"); }
if (ele) {
    ele.style.top = "-70px";
}

// getting search bar
ele = document.getElementById("middle02");
if (ele) {
    str1 = ele.innerHTML;
} else {
    str1 = "";
}

// getting image(s) element
ele = document.getElementById("imgDiv");
if (! ele) { ele = document.getElementById("mainDiv"); }

// extracting innerHTML
if (ele) {
    ele = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    str2 = ele.innerHTML;
} else {
    str2 = "";
}

str = str1 + str2;
if (str.length > 0) {
    document.body.innerHTML = str;
}
