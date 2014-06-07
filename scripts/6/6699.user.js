// ==UserScript==
// @name           Woodstock
// @author	   Francesco C.
// @namespace      http://
// @description    Woodstock's google
// @include        http://*google.*/*
// ==/UserScript==

//change google's logo
var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
logo.setAttribute('src', 'http://www.peanuts.com/comics/peanuts/meet_the_gang/images/meet_woodstock_big.gif');
logo.setAttribute('width', '180');
logo.setAttribute('height', '256');

//new im feeling like btn
var luck = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();

luck.setAttribute('value', 'Woodstock');

//new stylesheet with Woodstock's color
s = ".q{color:yellow;}\n"
s+= ".h{color:yellow}\n"
s+= "body,td{color:yellow}\n"
//A
s+= "a{color:yellow; font-family:cursive;}\n"
s+= "a:hover{background-color:yellow; color:black; border:2px double black; -moz-border-radius:5px}\n"
//input
s+= "input{background-color:yellow; border:2px dotted black; -moz-border-radius:5px}\n"
s+= "input:hover{background-color:white; border:2px dotted yellow}\n"
//s+= "input:focus{background-color:red}\n" 


GM_addStyle(s)


