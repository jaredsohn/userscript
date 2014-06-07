// ==UserScript==
// @name       Grooveshark: Remove Sidebar
// @version    0.11
// @description  enter something useful, nah
// @match      http://grooveshark.com/*
// @copyright  Public Domain, lawl
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    setTimeout(function(){
        $("#sidebar").remove();
        $(".sidebar-open #main, .sidebar-open #header-container, .sidebar-open #stage, .sidebar-open #player-wrapper").css({"right":"0px"});
    },1000);
});