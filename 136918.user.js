// ==UserScript==
// @name        http://szemnek.com
// @namespace   http://userscripts.org/scripts/show/58852
// @description Hide the facebook like modal window @name site.
// @include     http://szemnek.com
// @exclude     http://szemnek.com
// @version     1.1
// ==/UserScript==

var target = document.getElementsByClassName = "premium";

onload=function(){
	target.style.display = 'none';
}