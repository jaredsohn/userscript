// ==UserScript==
// @name         Tweaks for gmail labs panels
// @namespace    vitorreus
// @include        http*://mail.google.com/*
// @author       vitorreus
// @description  Tweaks for gmail labs panels. Removes the right column in messages, squeezes content on left panel, makes division bar be just one line istead of 2
// ==/UserScript== 
// Remove the whitespace from right:
GM_addStyle("table.Bs tr td.Bu:nth-child(2)  { display:none;  }");  
//squeezes the title and message preview in left panel (only works in vertical panels):
GM_addStyle(".xY.apA, .xY.apD  { position:relative; left:0px; top:0px ; overflow: visible; }");  // msg container and title containers
GM_addStyle(".apB  { position:absolute; left:22px; top:-13px ;  }");  // msg content
GM_addStyle(".xS  { position:absolute; left:22px; top:-3px ;  }");  // title 
//makes the vertical line dividing the panels to be just one instead of 2:
GM_addStyle("div.apj  { background:#e5e5e5 ; border-left:2px solid white; border-right:2px solid white; width:1px; }  }");  
