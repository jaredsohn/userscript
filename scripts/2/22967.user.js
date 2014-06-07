// TrollAndToad Shop Stop

// by Jared Branum (aka Maxx)
// February 17, 2008

// ==UserScript==
// @name           TrollAndToad Shop Stop
// @namespace      http://userscripts.org/scripts/show/22967
// @description    Stops the shopping cart from moving around at Troll & Toad's website.
// @include        http://www.trollandtoad.com/*
// ==/UserScript==


(function(){

if (document.getElementById('floatlayer'))	{
var floater = document.getElementById('floatlayer');
floater.id = 'notfloatlayer';			}

})();

// Simple, eh?  Unfortunately it yields a javascript error on 
// every page, but Firefox should ignore it.  You will notice
// it if you're running Firebug or similar, though.

// The error is not my fault, but rather the assumption of the original
// floating script that there WILL be an element of id "floatlayer" 
// somewhere on the page.  I can't think of a good way around this.