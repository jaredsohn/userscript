// ==UserScript==
// @name       Plug-DJ Panel Lowerer
// @namespace  http://reichrolld.com
// @version    8.7
// @match      http://plug.dj/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


$(document).ready(function() {
    $("#meta-frame").css("top", "50px");
    $("#playback").css("top", "50px");
    $("#chat").css("top", "50px");
    
});