// ==UserScript==
// @name       Flat Pinboard
// @namespace  http://bkng.it/1juqyCx
// @version    1
// @include     http://pinboard.in/*
// @include     https://pinboard.in/*
// @copyright  Dan Klammer
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at document-start
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://dl.dropboxusercontent.com/u/770110/pin.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);