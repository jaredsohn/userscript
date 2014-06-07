// ==UserScript==
// @name          Paula Deen Riding Your Tumblr Dashboard
// @namespace     http://userscripts.org/scripts/show/98279
// @description   See Paula Deen riding on your Tumblr Dashboard!
// @include       http://*tumblr.com/dashboard*
// @exclude       view-source:www.tumblr.com/dashboard*
// @version       1.3.1
// ==/UserScript==

var paula = document.createElement("div"); 
var new_post_icons = document.getElementById('new_post_icons'); 
var userWidth = document.body.clientWidth;

//calculate dist from browser edge to content edge

userWidth -= 899; //899 px is the width of the Tumblr dashboard
userWidth /= 2; //since the dashboard is centered, dividing by two gives you edge-to-edge dist

//place Paula away from content edge
var paulaSeat = userWidth + 580;

//alert("Distance from edge is " + userWidth + " pixels."); //used for debugging

//define paula as an HTML element and give the HTML code
paula.innerHTML = '<div style="position:absolute; left:' + paulaSeat + 
    'px; z-index:1; top:10px;">'  +
    '<map id="videomap" name="videomap">' +
    '<area shape="rect" alt="Post a video" title="" coords="1,89,65,178" href="http://www.tumblr.com/new/video" target="_self" />' +
    '<img src="http://files.droplr.com/files/55922846/PMhR.paula.png" usemap=videomap />' +
    '</div></a>';

//insert Paula before the first element in the body of the page
document.body.insertBefore(paula, document.body.firstChild);

// Created by Kobi Tate
// http://notmadeofbeef.tumblr.com
// http://twitter.com/notmadeofbeef
// kobitate94@gmail.com

// Copyright 2011 Kobi Tate
// Distributed under GNU GPL
// Terms and conditions available at http://www.gnu.org/licenses/gpl.html