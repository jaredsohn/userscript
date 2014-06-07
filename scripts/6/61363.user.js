// Politico Comments Remover
// Version 1.0
// 6 November 2009
//
// Copyright (c) B Ford 2009
// Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 2.5 License
// http://creativecommons.org/licenses/by-nc-sa/2.5/
// You are free to use this script non-commercially in any way provided you attribute the script to me (the author) and license any
// derivative work under the same conditions. Commercial use will still require the author's permission.
//
// I am not the author, owner or licensor of any of the material on the Politico site. Copyright of all material on that
// site remains with Politico.
//
//
// ==UserScript==
// @name           Politico Comments Remover
// @description    Enables you to browse politico.com without having to deal with the sink of stupidity and insanity that is the blog comment sections. (As an added bonus, links to the comment sections on feature articles are deleted. Unfortunately I haven't been able to get rid of the links to comments on blogs.)
// @include        http://*.politico.com/*
// @include        http://politico.com/*
// ==/UserScript==
    
var InsaneComments = document.getElementById('blogComments');
if (InsaneComments) {
    InsaneComments.parentNode.removeChild(InsaneComments);
}

var InsaneArticleComments = document.getElementById('comments');
if (InsaneArticleComments) {
    InsaneArticleComments.parentNode.removeChild(InsaneArticleComments);
}