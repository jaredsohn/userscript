// ==UserScript==
// @name        Faster Coursera Video Speeds
// @namespace   http://hax.so/
// @description Increases Coursers HTML5 video speed limit
// @include     https://class.coursera.org/*
// @version     1
// ==/UserScript==

if (document.getElementsByTagName("video").length) {
    var speedSelect = document.getElementsByTagName("select")[0];
    for (var speed = 2.25; speed <= 4.0; speed += 0.25) {
        var option = document.createElement("option");
        option.value = speed;
        option.text = speed + "x";
        speedSelect.add(option);
    }
}