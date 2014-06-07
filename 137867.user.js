// ==UserScript==
// @name        test
// @namespace   Bloop
// @include     *tf2outpost.com*
// @include	*tf2tp.com*
// @version     1
// ==/UserScript==

@description DO NOT USE

document.write $('.unique').each(function(){if($(this).text()=='Mann Co. Supply Crate Key'){console.log("item")}})