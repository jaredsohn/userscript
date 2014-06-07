// ==UserScript==
// @name       Remove Hints
// @version    0.1
// @description Use this to remove the annoying "Hints" about keyboard commands tool tip that shows up at the top of EVERY bug in JIRA 6.0.8
// @match      http://{Your-JIRA-URL}/*
// ==/UserScript==
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
 
style.innerHTML = '#focus-shifter-tip { visibility: hidden; }';
head.appendChild(style);

