// ==UserScript==
// @name        okcupid_no_herbivores
// @namespace   gleske.net
// @description Flag users who are vegetarian or vegan
// @include     http://www.okcupid.com/profile/*
// @version     1.0
// ==/UserScript==


if(/Vegetarian|Vegan|Kosher|Halal/i.test($("ajax_diet").innerHTML))
{
  $("ajax_diet").style.backgroundColor="#ff9b9b";//light red
}