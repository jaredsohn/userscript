// ==UserScript==
// @name           GMCAddSpacing
// @namespace      http://userscripts.org/users/272625
// @description    Changes the layout of the edit button to add space between buttons
// @include        http://gmc.yoyogames.com/*
// ==/UserScript==

var lis = document.getElementsByTagName('li');
for (i=0; i<lis.length; i++)
{
  if (lis[i].className == 'post_edit') {
    lis[i].style['marginRight']
 = '80px';
  }
}