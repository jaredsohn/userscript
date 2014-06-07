// ==UserScript==
// @name        Addic7ed English Language Auto Filter
// @namespace   Addi7edEnglish
// @description Automatically filters to english language for unfiltered subtitles.
// @include     *addic7ed.com/serie/*
// @version     1
// @grant       none
// ==/UserScript==

// Get URL.
var temp = document.location.pathname;
// Get position of the last "/".
var position = temp.lastIndexOf("/");
// Get text behind the last "/".
var isNumber = temp.slice(position + 1);
// Execute only if the text is not a number, otherwise the list is filtered already.
if (isNaN(isNumber)) {
  // Slice the URL up to and including the last "/" and add "1" to filter english only.
  // Use other numbers if you want to filter different languages.
  document.location.pathname = (temp.slice(0, position + 1)).concat("1");
}