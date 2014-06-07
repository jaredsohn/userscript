// ==UserScript==
// @name        forumchange
// @namespace   http://localhost:8000/
// @description sorting
// @include     http://forum.football365.com/*
// @version     1
// ==/UserScript==



if ( document.title.indexOf("topic -") != -1) {

  var s = document.title.split("topic -");
  document.title = s[1];

}
