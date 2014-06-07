// ==UserScript==
// @name            rutracker signature remover
// @description     Removes annoying signatures with images like "Windows 7 user" or "Putin fan" and unfunny quotes from user comments.
// @include         http://rutracker.org/*
// ==/UserScript==

var sigs;
while(true){
    sigs = document.getElementsByClassName("signature");
    if(sigs.length == 0){
        break;
    }
    sigs[0].parentNode.removeChild(sigs[0]);
}
