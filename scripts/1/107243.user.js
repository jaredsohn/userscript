// ==UserScript==
// @name           Oglaf.com alt & title text displayer
// @namespace      niet.us
// @description    Displays the comic's alt and title texts in a box below the image.
// @include        *oglaf.com/*
// @author         Daan <daan@niet.us>
// ==/UserScript==

var comic = document.getElementById('strip');
if (comic != null)
{
  var alt   = comic.alt;
  var title = comic.title;
  text      = document.createElement("span");
  
  text.innerHTML = "Alt: " + alt + "<br />Title: " + title;
  text.style.display         = 'block';
  text.style.cssFloat        = 'left';
  text.style.width           = '906px';
  text.style.padding         = '5px 15px 0 15px';
  text.style.backgroundColor = '#CCCCCC';
  
  comic.parentNode.parentNode.appendChild(text);
}