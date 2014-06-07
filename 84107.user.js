// ==UserScript==
// @name           Confluence Navigation Bar
// @namespace      http://fabiostrozzi.eu/gmscripts
// @description    Makes the navigation bar of Confluence float fixed to the page
// ==/UserScript==

document.styleSheets[0].insertRule(
    '#navigation { ' +
    '-moz-border-radius:5px 5px 5px 5px; ' +
    'background-color:#F1F1F1; ' +
    'display:inline; ' +
    'padding-bottom:10px; ' +
    'padding-right:10px; ' +
    'position:fixed; ' +
    'right:15px; ' +
    ' }', 0);
