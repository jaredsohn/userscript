// ==UserScript==
// @name           Chat windows widener (150px to 400px)
// @namespace      http://userscripts.org/users/331688
// @description    On the "Regional Design Associates page," this widens the included chat window
// @include        http://landscience.org/*
// ==/UserScript==


function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('#chatbox {width:400px; top:5px; left:600px; float:right;} #container{margin-left:0px;} #chatdisplay{height:480px;}');
