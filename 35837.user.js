// ==UserScript==
// @name           RemoveHomeTab
// @namespace      Spider
// @description    Removes Google Home Tab
// @include        http://www.google.com/ig?hl=en
// ==/UserScript==
var home = document.getElementById('section0_contents');
if(home)
{home.parentNode.removeChild(home);}
var col1 = document.getElementById('col1');
if(col1)
{col1.parentNode.removeChild(col1);}
var bottom_nav = document.getElementById('bottom_nav');
if(bottom_nav)
{bottom_nav.parentNode.removeChild(bottom_nav);}
var full_nav = document.getElementById('full_nav');
if(full_nav)
{full_nav.parentNode.removeChild(full_nav);}