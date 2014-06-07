
// Gotlandska cleanup
// version 0.1
// 2006-12-08
// Copyright (c) 2006, lamer@gotlanning.se
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gotlandska cleanup
// @description   remove annoying banners at gotlandska.se/com
// @include       http://*.gotlandska.se/*
// @include       http://*.gotlandska.com/*
// ==/UserScript==


var topb = document.getElementById('smocknolla');
var fpcon = document.getElementById('fpCon');
var raucon = document.getElementById('raukCon');
var rlogo = document.getElementById('logoright');
var fl = document.getElementsByTagName('object');

  for (i=0; i<fl.length; i++) {
		var flash=fl[i];
  
      flash.style.display= 'none';
    }

if (topb) {
    topb.parentNode.removeChild(topb);
}

  if (rlogo) {
    rlogo.parentNode.removeChild(rlogo);

    }
   
    if (fpcon) {
    fpcon.parentNode.removeChild(fpcon);

    }
   
      if (raucon) {
    raucon.parentNode.removeChild(raucon);

    }


    
