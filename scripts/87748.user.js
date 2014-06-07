// ==UserScript==
// @name           taz.de Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Centered content and some beautifications
//
// @include        http://taz.de/*
// @include        http://*.taz.de/*
// @include        https://taz.de/*
// @include        https://*.taz.de/*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.1
// @lastupdated    2012-06-18
// 
// @history        0.1.1 script rewritten to change css-styles after update
// @history        0.1.0 Initial release
//
// ==/UserScript==

//Modify CSS
document.body.style.background = '#222';

document.getElementById('riegel').style.margin = '0 auto';

