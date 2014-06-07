// ==UserScript==
// @name WafflesRemoveClutter
// @namespace Unknown
// @description Removes the 'Show catagories' & 'search' bars from browse.
// @include *waffles.fm/browse.php*
// ==/UserScript==


// Remove catagory box
var catBox = document.getElementById("cat-box");
catBox.parentNode.removeChild(catBox);
var catBoxCollapse = document.getElementById("cat-box-collapse");
catBoxCollapse.parentNode.removeChild(catBoxCollapse);

// Remove search box
var center = document.getElementsByTagName("CENTER");
var table = center[0].getElementsByTagName("TABLE");
var tr = table[0].getElementsByTagName("TR");
var td = tr[0].getElementsByTagName("TD");
var p = td[0].getElementsByTagName('P');
p[0].parentNode.removeChild(p[0]);