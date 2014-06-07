// ==UserScript==
// @name           FoodNetwork Printer Title
// @namespace      http://fitman2009.wordpress.com
// @description    Automatically places recipe title on page, making it easy when printing recipes to pdf!
// @include        http://www.foodnetwork.com/food/cda/recipe_print/*
// ==/UserScript==

document.title=document.getElementsByTagName('h1')[0].innerHTML