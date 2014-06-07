// ==UserScript==
// @name       Fix AutoHotkey forums
// @namespace  tag:PhasmaFelis
// @version    0.2
// @description  Change all references to (the broken) cdn.autohotkey.com to www.autohotkey.com.
// @match      http://www.autohotkey.com/board/*
// @copyright  2013
// ==/UserScript==

document.head.innerHTML = document.head.innerHTML.replace(/\/\/cdn.autohotkey.com\//g, '//www.autohotkey.com/');
document.body.innerHTML = document.body.innerHTML.replace(/\/\/cdn.autohotkey.com\//g, '//www.autohotkey.com/');