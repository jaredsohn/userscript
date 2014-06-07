// ==UserScript==
// @name soothing green
// @description make green links
// @namespace http://www.vegetarierforum.com/ geisterfahrer
// @copyright 2011 geisterfahrer// @license geisterfahrer 
// @attribution  not sure if want 
// @include http://www.vegetarierforum.com/* 
// ==/UserScript==

// 

function addGlobalStyle(css)
{
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
addGlobalStyle('a:link{color:#0DA149; text-decoration: none !important;} a:visited{color:#0DA149; text-decoration: none !important;} a:hover{color:#FFC700 !important; text-decoration: none !important;} a:active{color:#FFC700 !important; text-decoration: none !important;} a.username strong{color:#0DA149;} a.newcontent_textcontrol{color:white;} a.textcontrol{color:white;} ul.footer_links li a{color:white;}');