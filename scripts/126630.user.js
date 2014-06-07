// ==UserScript==
// @name Facebook Group banner removal
// @match http://www.facebook.com/groups/*
// @match https://www.facebook.com/groups/*
// ==/UserScript==
!function(doc, cover) {
  cover = doc.getElementsByClassName('groupsCoverPhoto')[0];
  cover && (cover.style.display = "none");
}(document);