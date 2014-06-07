
// ==UserScript==
// @name  Youtube Home Page Redesign
// @namespace     http://stylebot.me/styles/1396
// @description   Redesigns the Youtube Homepage
// @include   http://www.youtube.com/home
// @author        Rachel Melton
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '#content-container {    display: none;}#footer {    display: none;}#masthead-nav {    display:none;}div#masthead-container {    background: none;}img#logo { display:none; }body {    background:url('https://lh3.googleusercontent.com/-vDZNDLTyhwo/T7rmoch_dvI/AAAAAAAACjA/-hLBc8AUuLg/s0/Untitled-1.jpg')no-repeat; overflow:hidden;}';
document.documentElement.appendChild(styleEl);