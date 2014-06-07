// ==UserScript==
// @name        TIBCOmmunity Wide Forum
// @namespace   http://userscriptes.org/users/AntAreS24
// @description Makes the section of the discussion full screen
// @include     https://www.tibcommunity.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

// change the outer wrapper to 100% instead of fixed width.
$("#jive-body-wrapper").css("width","100%");
// Change the center column to 97% instead of fixed width.
$("#jive-body").css("width","97%");