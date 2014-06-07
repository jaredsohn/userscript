// ==UserScript==
// @name           PRETTY COLORS
// @namespace      http://www.iggyhopper.dyndns.org/
// @description    PRETTY COLORS
// @include        http://*
// ==/UserScript==

var COLORIZE_TEXT = true; // text colors
var COLORIZE_BG = false; // background colors
var COLORIZED_TAG = "span";
var COLORIZED_TAG2 = "p";// set to blank (""), or null if you dont want it
var COLORIZED_TAG3 = "a";// set to blank or null
var COLORIZE_MAXVALUE = 255; // 0 - 255, 255 = brighter colors


//////////DO NOT EDIT
var TAG_LENGTH = COLORIZED_TAG.split(",").length;

function COLORFUL()
{
    var E = document.getElementsByTagName(COLORIZED_TAG);
    for (var I = 0; I < E.length; I++)
    {
        if (E[I].className == "list-db-messages") I++;
        if (COLORIZE_BG) E[I].style.backgroundColor = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
        if (COLORIZE_TEXT) E[I].style.color = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
    E[I].style.textDecoration = "blink";

}
    if (!COLORIZED_TAG2) return;
    E = document.getElementsByTagName(COLORIZED_TAG2);
    for (var I = 0; I < E.length; I++)
    {
        if (E[I].className == "list-db-messages") I++;
        if (COLORIZE_BG) E[I].style.backgroundColor = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
        if (COLORIZE_TEXT) E[I].style.color = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
    E[I].style.textDecoration = "blink";

}
    if (!COLORIZED_TAG3) return;
    E = document.getElementsByTagName(COLORIZED_TAG3);
    for (var I = 0; I < E.length; I++)
    {
        if (E[I].className == "list-db-messages") I++;
        if (COLORIZE_BG) E[I].style.backgroundColor = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
        if (COLORIZE_TEXT) E[I].style.color = "rgb(" + FloorRan() + ", " + FloorRan() + "," + FloorRan() + ")";
    E[I].style.textDecoration = "blink";

}
}

function FloorRan()
{
    return Math.floor(Math.random() * COLORIZE_MAXVALUE);
}

COLORFUL();