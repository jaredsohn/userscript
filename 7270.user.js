// ==UserScript==
// @name          Blogger - enlarge template editor 
// @namespace     http://consumingexperience.blogspot.com
// @description	  Widens New Blogger's template editor textarea box
// @include	  http://*.blogger.com/html*
// ==/UserScript==
/*
v0.1
Copyright (c) 2007, Improbulus 
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html
*/


document.getElementById('wrap2').style.width = '100%';
document.getElementsByTagName('textarea')[0].setAttribute('cols', 36); 