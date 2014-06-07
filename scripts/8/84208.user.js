// ==UserScript==
// @name           Remove Chat Note
// @namespace      Remove Chat Note
// @description    Removes the annoying message that you've disabled IDC on flamebate
// @include        http://*.forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions
// @include        http://forumwarz.com/discussions
// @include        http://forumwarz.com/discussions/*
// ==/UserScript==

var note = document.getElementById('note');
if (note) {
    note.parentNode.removeChild(note);