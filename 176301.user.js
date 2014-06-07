// ==UserScript==
// @name       Email Scratch Project
// @namespace  
// @version    0.1
// @description  enter something useful
// @match      http://scratch.mit.edu/projects/*
// @copyright  Steal my code if you want. I don't care.
// ==/UserScript==


var a = document.createElement('a');
var linkText = document.createTextNode("Email a friend!");
a.appendChild(linkText);
a.title = "Email a friend";
var url = window.location.href
a.href = "mailto:myfriend@email.com?Subject=Check%20out%20my%20cool%20scratch%20project&body=" + url;
document.getElementById('stats').appendChild(a); 