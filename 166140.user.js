// ==UserScript==
// @name           Girls w/ Slingshots Alt Text
// @description    Displays the alt text below the comic.
// @include        *girlswithslingshots.com/*
// @author         McFil
// @version        1.0
// ==/UserScript==

var comic = document.getElementById('comic');
if (comic != null)
{
  var title = comic.title;
  text      = document.createElement("span");
  
  text.innerHTML = title;
  text.style.color  = 'black';
  text.style.font   = 'italic 15px Calibri, serif';
  
  comic.parentNode.appendChild(text);
}
