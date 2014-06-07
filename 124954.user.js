// ==UserScript==
// @name OnlyNav
// @include http://scratch.mit.edu/forums/*
// @include http://scratch.mit.edu/tbgforums/*
// ==/UserScript==
var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!$.getElementById(cssId))
{
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://cyberkidscountry.com/css/onlynav.css';
    link.media = 'all';
    head.appendChild(link);
}