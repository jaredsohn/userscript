// Hello World! example
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Hello Net 602
// @namespace http://diveintogreasemonkey.org/download/
// @description example script to alert "Hello world!" on every page
// @include http://www.net-force.nl/challenge/level602/prog2.php

// ==/UserScript==

var content1 = document.getElementsByTagName('p').item(0).innerHTML;

var Num1;
 for (var i=0 ; i< content1.length ; i++)
 {
  Num1 = content1.substring('27');
    
  //Num1 = content1.charAt();


 }
 //formula here
  Num1 = parseInt(Num1)*3+2-250;

 alert(Num1);
 //concatenate the link and redirect to the solution page
 window.location = 'http://www.net-force.nl/challenge/level602/prog2.php?solution='+Num1;
 

var loading = document.createElement('div');
loading.setAttribute('id', 'loading');
loading.innerHTML = '\<h1\>Loading Page...\<\/h1\>\<input name=\"mybutton\" type=\"button\" value=\"Show\"\>';

document.body.insertBefore(loading, document.body.firstChild);



// ==== draft ====
// window.addEventListener('click', getElement, true);
// loading.addChild = '\<h1\>Loading Page...\<\/h1\>';
// onclick=\"getElement(event)\"