// ==UserScript==
// @name Seattle Times Commentizer
// @namespace     tag:lharris4@u.washington.edu,2003-08-20:STcommentizer
// @description   Hides comments on the Seattle Times website.
// @include       seattletimes.nwsource.com/*
// ==/UserScript==

var allDivs =  document.getElementsByTagName('div');
for (var i = 0; i < allDivs.length; i++) {
  if (allDivs[i].className.search(/gc_teasers_comment/) > -1) {
      allDivs[i].style.visibility = 'hidden';
    }
}

