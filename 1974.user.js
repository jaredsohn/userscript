// ==UserScript==
// @name          RateBeer Rating Button Tab Indexer
// @namespace     http://www.ratebeer.com/Beer/
// @description   Puts the submit rating button after the comments box in the tab order
// @include       http://www.ratebeer.com/Beer/*
// ==/UserScript==
var btn = document.getElementById("submit1");

var comments = document.getElementById("comments");

if (comments == null)
{
  comments = document.getElementById("Comments");
}

if (btn != null && comments != null)
{
  btn.tabIndex = comments.tabIndex + 1;
}
