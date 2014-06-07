// ==UserScript==
// @name        HPS
// @namespace   http://userscripts.org/users/539236
// @include     http://www.hetpaardenspel.nl/rijden/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

// Change #xxxxxx to the ID of user you want to take lessons at.
if ($("select[name='paard'] option").length != 0) {
    $("#142660").attr('checked', 'checked').ready().click();
}