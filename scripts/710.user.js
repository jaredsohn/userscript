// Blockbuster Rating Filter
// version 0.1
//
// Copyright 2005 A. Baker (mestupo at yahoo dot com)
//
// About:
//
// In an effort to find only movies that I really want to see,
// I created this script to filter out R-rated movies from Blockbuster.
//
// Note:
// 
// This script is quite inefficient, but it works. If you can make it better,
// send me email with an updated fix.
//
// 

// ==UserScript==
// @name          Blockbuster Rating Filter
// @namespace     http://fefnet.com/downloads/blockbusterfilter.user.js
// @description   Removes R-Rated Movies from the display
// @include       http://*blockbuster.com/catalog/*
// ==/UserScript==

function isBadRating(objRef) {
    var badRating = "";

    var group = objRef.childNodes;
    for (var i = 0; i < group.length; i++) {
        //if (group[i].nodeType == 3) {
            //print (group[i].nodeValue);
            if (group[i].nodeValue == "R") {
                badRating += "badbad";
            }
        //}
        if (group[i].childNodes.length > 0) {
            badRating += isBadRating(group[i]);
        }
    }
    return badRating;
}


(function() {

    // Iterate through each of the movies in the list
    for (var i = 1; i <= 10; i++) {
        var elem = document.getElementById("Catalog List_row_" + i);
        if (isBadRating(elem) == "badbad") {
            //elem.style.display = "none";
            elem.parentNode.removeChild(elem);
        }
    }
//
})();