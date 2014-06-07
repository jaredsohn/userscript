// ==UserScript==
// @name            Ogame YOLO ALERT
// @author          Helios
// @description     -
// @include         *.ogame.gr/game/*
// @version         0.1
// ==/UserScript==

window.setTimeout(function(){document.location = document.location;},10 * 60 * 1000);

$(function(){
    if($("#attack_alert").attr("class").split(" ")[2] == "Attack")
        $.get("http://127.0.0.1:30/");
});