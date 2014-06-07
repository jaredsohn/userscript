// ==UserScript==
// @name           Trello : Large Cards
// @author         Aaron Bond
// @version        1
// @include        https://trello.com/*
// @include        http://trello.com/*
// Modified script from http://blog.justin.kelly.org.au/trello-big-edit/ (Original credit goes to him!)
// ==/UserScript==

cssString = ' '+
    '.window{ '+
    '   left:100px !important; ' +
    '   top:50px !important; ' +
    '   width:87% !important; '+
    '} '+
    ' '+
    '.window-main-col '+
    '{ '+
    '   width:1000px !important; '+
    '} ';

insertCSS(cssString);
// Function to insert CSS
function insertCSS(cssToInsert) {
    var head=document.getElementsByTagName('head')[0];
    if(!head)
        return;
    var style=document.createElement('style');
    style.setAttribute('type','text/css');
    style.appendChild(document.createTextNode(cssToInsert));
    head.appendChild(style);
}
