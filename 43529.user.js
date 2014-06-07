// ==UserScript==
// @name           Note in Google Reader Bookmarklet Modifier
// @namespace      http://googlegadgetblog.com/greasemonkey/NoteInReaderTag
// @description    When using the Note in Reader Bookmarklet, this script unchecks 'Add to Shared Items' and makes Tags visible and accessible by keyboard
// @include        http://www.google.com/reader/*
// @exclude        http://www.google.com/reader/view/*
// ==/UserScript==

var s = document.getElementById('share');
var t = document.getElementById('tag-table');
t.className='';
s.checked = false;
