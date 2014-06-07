// ==UserScript==
// @name           :demon:
// @namespace      Aristocrat
// @include        http://www.staredit.net/*
// @description	 This replaces :demon: with the corresponding imgur image. 
// @author		 Aristocrat
// @version		 1.0
// ==/UserScript==

/*
	Author :	Aristocrat
	Version:	1.0
*/

document.body.innerHTML = document.body.innerHTML.replace(/:demon:/g,"<img src=\"http://i.imgur.com/Dckqb.png\" alt=\":demon:\" title=\":demon:\" style=\"vertical-align:middle\">");