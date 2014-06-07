// ==UserScript==
// @name        Program autoscroll
// @namespace   test
// @description Automatisches Scrollen alle X Sekunden.
// @include     http://pr0gramm.com/#newest/*
// @version     1
// @grant       GM_registerMenuCommand
// ==/UserScript==
var intervalhandle;

window.setTimeout(function() {startAutoScroll()}, 5000);


function startAutoScroll() {
    var seconds = null;
    if(seconds === null) {
       seconds = prompt("Wie viele Sekunden zwischen dem Blättern warten?");
    }
    
if(seconds === null || seconds === "undefined" ||seconds === "") {
        alert("Kein Text eingegeben - kein Autoscroll! Seite aktualisieren oder browser neustarten, falls du Autoscoll möchtest!")
        return;
    }
    intervalhandle = window.setInterval(function() {
       document.getElementById("scrollRight").click();
    }, seconds * 1000);
}

function stopAutoScroll() {
    window.clearInterval(intervalHandle);
}