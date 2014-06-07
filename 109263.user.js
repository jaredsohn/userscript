// ==UserScript==
// @name           Microchip submenu fixup for Kmeleon
// @namespace      Ian.M
// @description    This script fixes some navigation issues on the Microchip Technology Inc  (manufacturers of PIC microcontrollers). It may also be useful for other older Mozilla based browsers.
// @include        http://www.microchip.com/*
// @exclude	   http://www.microchip.com/forums/*
// ==/UserScript==


function addGlobalStyle(css) 
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//// to fix the Css for single line submenus (below) //
//Kmeleon does NOT support CSS "display: inline-block" 
addGlobalStyle('#subnav ul li{ display: -moz-inline-stack; ! important; }'); // this Mozilla specific property works!
addGlobalStyle('#archNav ul li{ display: -moz-inline-stack; ! important; }'); // Also needs same treatment

//addGlobalStyle('#subnav ul li{ background-color: #ff0000 !important; }'); // DEBUG: Have we got the right element?

///////////////////////////////////////////////////
//In: http://www.microchip.com/_css/mchp/layout.css
///////////////////////////////////////////////////
//
//#content #subnav{
//  clear:both;
//  width: 773px;
//  height: 32px;
//  border-bottom: 1px solid #CFCFCF;
//  margin-bottom: 6px;
//  float: left;
//}
//
//#content #subnav ul li{
//  display: inline-block;
//  margin-top: 5px;
//  white-space: normal;
//  min-width: 100px;
//  z-index: 1000;
//  margin-right: 5px;
//  text-align: center;
//  padding: 6px 2px;
//  position: relative;
//}
//
//#subnav ul li.active{
//  background: #EEE url(/_images/subnav_active_bg.jpg) repeat-x;
//  text-shadow: 0px 0px 2px #6F6F6F;
//  -moz-border-radius-topright: 5px;
//  -moz-border-radius-topleft: 5px;
//  -webkit-border-radius: 5px;
//  border-right: 1px solid #CFCFCF;
//  border-left: 1px solid #CFCFCF;
//}
//
//#content #subnav ul li a{
//  color: #000;
//}

// #archNav follows next in the file and has exactly the same problem.