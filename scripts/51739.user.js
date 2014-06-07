// ==UserScript==
// @name                TechCrunch Demoronizer
// @namespace	        http://www.techcrunch.com
// @description	        TechCrunch commenters are negatrons. Ignore what they say. 
// @include		http://www.techcrunch.com/*
// ==/UserScript==

function hide(elem) {
  if (elem === null) {
    return;
  }

  elem.style.display = "none";
}

hide(document.getElementById("comments_area"));
hide(document.getElementById("addcomment"));

