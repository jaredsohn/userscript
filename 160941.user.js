// ==UserScript==
// @name        Redmine - Hide closed issues (Issue view)
// @namespace   http://gdm.su
// @include     *://*/redmine/issues/*
// @match       *://*/redmine/issues/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// @grant       none
// @copyright  2012+, Grey DeMonstr
// ==/UserScript==

$('a.closed').parents('tr.issue').hide()