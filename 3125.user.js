// ==UserScript==
// @name          Digg.com - Page Jumper
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.digg.com/*
// @include       http://digg.com/*
// @description	  Adds "Go to page" button on Pages links
// ==/UserScript==

/****************************************************************
   Changelog:
   - 2007-04-13: Fixed: button didn't show up on Friends' Dugg
   - 2006-12-19: Updated to Digg 4.0
   - 2006-02-06: First released
 ****************************************************************/


var pages = document.evaluate("//div[@id='wrapper']//div[@class='pages']",
                              document, null, 0, null).iterateNext();

if (!pages) return;

var jumper = document.createElement("a");
jumper.href = "#";
jumper.className = "nextprev";
//jumper.style.cssFloat = "right";
jumper.style.marginLeft = "2em";
jumper.appendChild(document.createTextNode("Go to page"));
jumper.addEventListener("click", function(e) {
  e.preventDefault();
  var page = prompt("Go to page");
  if (!page) return;
  if (page && (page.match(/\d+/)) && (page != 0)) {
    if (location.href.match(/\/page\d+/))
      location.href = location.href.replace(/\/page\d+/, "/page" + page);
    else location.href = location.href + "/page" + page;
  }
}, false);

//pages.insertBefore(jumper, pages.firstChild);
pages.appendChild(jumper);

