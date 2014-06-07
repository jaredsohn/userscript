// ==UserScript==
// @name        github full width page
// @namespace   github
// @description expand github to full width
// @include     https://github.com/*
// @version     1
// ==/UserScript==
elements = document.getElementsByClassName('container hentry');

for (var index in elements)
  
{
  
  elements[index].style.width="95%";      // leave a little margin from borders of viewport
  
}

e = document.getElementsByClassName('frame frame-center');
e[0].style.width = "100%";
e.parentNode.style.width = "588%";

