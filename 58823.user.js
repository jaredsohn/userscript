// ==UserScript==
// @name           meta.stackoverflow.com show kbd tags
// @namespace      codingcromulence.blogspot.com
// @description    Restores CSS styling for beautiful <kbd> tags
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

$ = unsafeWindow.$;
$('kbd').css({
'-moz-background-clip':'border',
'-moz-background-inline-policy':'continuous',
'-moz-background-origin':'padding',
background:'#EEEEEE none repeat scroll 0 0',
'border-color':'#CCCCCC #AAAAAA #888888 #BBBBBB',
'border-style':'solid',
'border-width':'1px 3px 3px 1px',
color:'#000000',
padding:'2px 4px',
'white-space':'nowrap'
});