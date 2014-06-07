// ==UserScript==
// @name        FB Sidebar Hider
// @namespace   facebook hide
// @description Hides parts of the sidebar on facebook
// @include     https://www.facebook.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$(document).ready(function() {

    $.each(['.ego_section', '#pagelet_ego_pane_w'], function(i, s) { 
        $(s).hide(); 
    });

});

