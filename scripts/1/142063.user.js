// ==UserScript==
// @name        Coursera Chat
// @namespace   org.coursera.class.chat
// @description A chat for students watching Coursera lecture videos.
// @include     http://class.coursera.org/insidetheinternet-2012-001/lecture/*
// @include     https://class.coursera.org/insidetheinternet-2012-001/lecture/*
// @version     1
// ==/UserScript==

//var URL_BASE = 'http://localhost:8060/';
var URL_BASE = 'https://coursera-chat.appspot.com/';
var scriptURL = URL_BASE + 'static/embed.js';

var script = document.createElement('script');
script.src = scriptURL;
document.body.appendChild(script);