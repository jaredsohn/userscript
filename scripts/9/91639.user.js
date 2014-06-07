// ==UserScript==
// @name           Disable Youtube
// @namespace      uiharu
// @description    Disabled embedded youtube video on /a/
// @include        http://boards.4chan.org/a/*
// ==/UserScript==

function $(selector, root)
{
  if (!root) root = document.body;
  return root.querySelector(selector);
}

Filter();

function Filter()
{
   $("embed").style.display = "none";
}
