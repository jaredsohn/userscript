// ==UserScript==
// @name           Google Sidebar Removal
// @namespace      http://griffeltavla.wordpress.com/2011/04/02/cleaning-up-google-search/
// @description    Removes the sidebars from Google's home page
// @version        1.2.1
// @include        http://www.google.*
// @include        https://www.google.*
// @include        https://encrypted.google.com/*
// @include        http://images.google.*
// @include        https://images.google.*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
}

// One rule-set to rule them all :)  
// As of August 22 2013, Google has once again added even more crap we don't want to see.
AddStyle(
  "#leftnav, #gbx3, #gbzc, #prt {display:none !important;} "+   // Hide the superfluous / cluttered design defects.
  "#gb, #gbx1, #gbzw, #gbq, #gbu {top: 0px !important;}"+       // correct the search bar's gray background misalignment, which resulted from removing the top bar.
  "#gb { height: 5.5em !important; }"+                          // Remove reduntant vertical padding for the sterch statistics block.
  "#gb.gbes, #gb.gbesi {height: 70px; !important} "+            // reposition the search result statistics block (below the search field)
  "#fbarcnt, #fbar, #footer {display:none !important;} "+       // Remove the bottom bar clutter.
  "#taw {display:none !important;}"                             // Bonus feature: Remove the redundant cookie "warning" box.
);
