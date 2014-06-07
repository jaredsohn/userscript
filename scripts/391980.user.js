// ==UserScript==
// @name        LibraryThing prevent sticky info box when hovering covers
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description This fixes the problem of the little "Information" link not going away when mousing away from covers
// @include     http*://*librarything.tld/work/*/covers*
// @include     http*://*librarything.com/work/*/covers*
// @version     1
// @grant       none
// ==/UserScript==

var information = document.getElementById("infoicon");
var options = { 'childList': true }

// Adding these prevents the flickering/flashing problem
information.addEventListener("mouseenter", showInfo);
information.addEventListener("mouseleave", hideInfo);

function showInfo() { 
  information.style.display = "block";
}
function hideInfo() {
  information.style.display = "none";
}

// Mutation observers based on sample by Tiffany B. Brown, licensed under CC-BY 3.0 Unported at http://dev.opera.com/articles/view/mutation-observers-tutorial/
var initialCovers = function(allmutations){
  allmutations.map( function(mr){
    // If instead of the spinner we are returned a bunch of nodes, then we know the initial covers are there.
    if (mr.addedNodes.length > 1) {
      // Wait till coverlist_customcovers and coverlist_amazon exist first before these mutation observers can be made
      memberCovers = new MutationObserver(additionalCovers);
      memberCovers.observe(document.getElementById("coverlist_customcovers"), options);
      amazonCovers = new MutationObserver(additionalCovers);
      amazonCovers.observe(document.getElementById("coverlist_amazon"), options);
      var covers = document.querySelectorAll(".cover");
      for (var i=0; i<covers.length; i++) {
        covers[i].addEventListener("mouseleave", hideInfo);
        covers[i].addEventListener("mouseenter", showInfo);
      }
    }
  });    
},
allCovers = new MutationObserver(initialCovers);
allCovers.observe(document.getElementById("coverlist_all"), options);

var additionalCovers = function(allmutations){
  allmutations.map( function(mr){
    // If we are returned more nodes, then we know the additional member-uploaded or Amazon covers are there.
    if (mr.addedNodes.length > 1) {
      var covers = document.querySelectorAll(".cover");
      for (var i=0; i<covers.length; i++) {
        covers[i].addEventListener("mouseleave", hideInfo);
        covers[i].addEventListener("mouseenter", showInfo);
      }
    }
  });
}