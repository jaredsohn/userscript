// ==UserScript==
// @name           GMail - Custom styling mihaibirsan
// @namespace      com.google.mail.labels
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// ==/UserScript==

var style = "";

// Display the labels in conversation view below the title
style += "h1.ha > span { display: block; }";

// Hide extra whitespace and messages like "Woohoo! You've read all the important messages in your inbox."
style += ".DVI7hd { display: none !important; }";

// Adjust vertical centering of the logo
style += ".gbem#gbql, .gbemi#gb #gbql, .gbes#gbql, .gbesi#gb #gbql { position: relative; top: 2px; }";

// Create the style element and append it
var head = document.getElementsByTagName("head")[0];
var el = window.document.createElement('link');
el.rel = 'stylesheet';
el.type = 'text/css';
el.href = 'data:text/css;charset=utf-8,' + escape(style);
head.appendChild(el);
