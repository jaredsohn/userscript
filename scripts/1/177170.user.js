// ==UserScript==
// @name       CleanRoom
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  View NoobRoom without those annoying advertisements!
// @match      http://185.8.196.237/*
// @copyright  2013+, One
// ==/UserScript==
$('body > :not(#container)').hide(); //hide all nodes directly under the body
$('#container').appendTo('body');