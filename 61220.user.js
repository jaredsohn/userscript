
// Bigger Android Document user script
// version 0.1 BETA!
// 2009-11-04
// Copyright (c) 2009, Kurt Chen
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
// To uninstall, go to Tools/Manage User Scripts,
// select "BiggerAndoidDoc", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BiggerAndoidDoc
// @namespace     http://userscripts.org/users/kurtchen/
// @description   Remove header on Android document page
// @include       http://developer.android.com/guide/*

// ==/UserScript==

//alert('Debuging...');
document.getElementById('header').style.display='none';
//alert(document.getElementById('header').offsetHeight );
//alert(document.getElementById('headerLeft').offsetHeight );
//alert(document.getElementById('headerRight').offsetHeight );

//alert(document.getElementById('body-content').offsetHeight );
//alert(document.getElementById('doc-content').offsetHeight );
//alert(document.getElementById('devdoc-nav').offsetHeight );
document.getElementById('body-content').style.fontSize="150%"
document.getElementById('body-content').style.height='700px';
document.getElementById('doc-content').style.height='700px';
document.getElementById('devdoc-nav').style.height='700px';

var header = document.getElementById('header');
var toggleDiv = document.createElement('div');
toggleDiv.setAttribute('id','toggle_btn');
var toggle = document.createElement('a');
toggle.setAttribute('href','#');
toggle.setAttribute('onClick','if(document.getElementById("header").style.display=="none"){document.getElementById("header").style.display="block";}else{document.getElementById("header").style.display="none";}');
toggle.appendChild(document.createTextNode('Toggle'));
toggleDiv.appendChild(toggle);
header.parentNode.insertBefore(toggle,header);
