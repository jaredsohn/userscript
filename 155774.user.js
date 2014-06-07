// ==UserScript==
  // @name              Youtube Feed Filterer
  // @namespace         http://www.github.com/kimagure
  // @include           http://www.youtube.com/*
  // @include           https://www.youtube.com/*
  // @grant             none
  // @version           dev
// ==/UserScript==

function removals() {
  for each (var thing in document.getElementsByClassName('feed-list-item feed-item-container')) { 
    if (thing !== undefined && thing.innerHTML.search('Recommended') !== -1)
      thing.outerHTML = '';
    if (thing !== undefined && thing.innerHTML.search('Popular') !== -1)
     thing.outerHTML = '';
  }
}

//listen for more crap being loaded in by feed container
feedcontainer = document.getElementsByClassName("feed-container")[0];
if (feedcontainer.addEventListener) {
    feedcontainer.addEventListener('DOMSubtreeModified', OnSubtreeModified, false);
}
document.getElementById("feed-pyv-container").outerHTML = '';
removals();

function OnSubtreeModified () {
    removals();
}