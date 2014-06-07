// ==UserScript==
// @name        Fix Wizards Forum Titles
// @version     1.0
// @namespace   http://userscripts.org/users/497853
// @description Sets the page titles in the Wizards Community Forums based on the thread or forum being viewed. 
// @include     http://community.wizards.com/go/*
// @include     https://community.wizards.com/go/*
// @grant none
// ==/UserScript==


var nav_bar = document.getElementById('mb_board_nav_table_container');
var parts = nav_bar.getElementsByTagName('td');

var new_title = parts[parts.length - 1].children[0].innerHTML;

for (var i = parts.length - 2; i > 0; --i) {
    new_title += " | " + parts[i].children[0].innerHTML;
}

document.title = new_title;