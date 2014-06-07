// ==UserScript==
// @name           forums.about.com Remove ADs
// @namespace      forums.about.com Remove ADs
// @description    removes all unnecessary things on page and leaves pure forum.
// @include	   http://forums.about.com/ab-webdesign/*
// @include	   http://forums.about.com/n/pfx/*
// ==/UserScript==


//Function removes all unnecessary things on page.
function removeUnnecessary() {
  document.getElementById('adL').style.display = "none"; //the Advertisement in header
  document.getElementById('ptcBrandFooter').style.display = "none"; //the right side (Advertisement, Newsletter signup, Recent Discussions, Forum Folders, Recent Visitors)
  document.getElementById('ptcBodyRight').style.display = "none"; //the footer (Explore Web Design/HTML, Special Features)
}

//Function stretches the forum over the screen.
function resizeTable() {
  document.getElementById('ptcBodyTable').width = "100%";
}

removeUnnecessary();
resizeTable();