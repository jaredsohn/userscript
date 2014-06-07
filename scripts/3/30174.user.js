// ==UserScript==
// @name           Duplicate Navigation for Lifehacker.com
// @namespace      http://prdesignz.com
// @description    Makes next buttons at top and bottom
// @include        http://*lifehacker.com/*
// ==/UserScript==
function addNav()
{
var createStyle = document.createElement('style');
createStyle.appendChild(document.createTextNode('ul#searchpager2 li { display: inline; margin: 0 2px 0 2px; } ul#searchpager2 .currentPage { font-size: 14px; font-weight: bold; }'));
document.getElementsByTagName('head')[0].appendChild(createStyle);
var theHTML = document.getElementById('searchpager').innerHTML;
var theWidth = document.getElementById('searchpager').offsetWidth;
var createNav = document.createElement('ul');
createNav.setAttribute('id','searchpager2');
document.getElementById('logo-area').appendChild(createNav);
createNav.style.top = -10 + 'px';
createNav.style.left = (document.getElementById('content').offsetWidth + (-1 * 100)) + 'px';
createNav.style.position = 'relative';
createNav.style.display = 'inline';
document.getElementById('searchpager2').innerHTML = theHTML;
}
window.addEventListener("load",addNav,false);