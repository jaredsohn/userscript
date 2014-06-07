// ==UserScript==
// @name        Youtube Feed Filter
// @namespace   github.kimagure
// @include     https://www.youtube.com/
// @version     1
// ==/UserScript==

function removals() {
    for each (var thing in document.getElementsByClassName('feed-list-item feed-item-container')) { 
        if (thing !== undefined && thing.innerHTML.search('Recommended') !== -1)
            thing.innerHTML = '';
    }
}

//listen for more crap being loaded in by feed container
feedcontainer = document.getElementsByClassName("feed-container")[0];
if (feedcontainer.addEventListener) {
    feedcontainer.addEventListener('DOMSubtreeModified', OnSubtreeModified, false);
}
removals();

function OnSubtreeModified () {
    removals();
}

