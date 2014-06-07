// ==UserScript==
// @name           mostinspired.com
// @namespace      http://jonathanaquino.com
// @description    Goes directly to the page featured on a mostinspired.com detail page
// @include        http://www.mostinspired.com/sites/view/*
// ==/UserScript==
var divs = document.body.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'site') {
        window.location = divs[i].getElementsByTagName('a')[0];
    }
}