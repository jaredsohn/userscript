// ==UserScript==
// @name       Astrid tidier
// @namespace  http://astrid.com
// @version    0.1
// @description  enter something useful
// @match      http://astrid.com/*
// ==/UserScript==

/* 
 * License: CC-BY-SA 3.0
 */

// Enter some of the contents of the panels you want to hide:
var hideByContents = ["Tell the world!", "Add Friends", "Todoroo, Inc"];

// Let's go
well = document.getElementsByClassName("well");
for ( n=0; n < well.length; n++ )
{
    flag = 0;
    
    for ( m=0; m < hideByContents.length; m++ ) { if ( well[n].innerHTML.indexOf(hideByContents[m]) > 0 ) flag = 1; }

    if ( flag ) { well[n].style.display = "none"; }

}
