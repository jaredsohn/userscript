// ==UserScript==
// @name           Fix Firefox 6 CAR Notes Height
// @namespace      NI CAR
// @description    Fixes the height of the CAR notes section in Firefox 6
// @include        http://nippm*/*
// ==/UserScript==

// Credit: Original script by Chad Allee

var noteFrame = document.getElementById('note');

if (noteFrame != null) {
    noteFrame.addEventListener('load', FixFrameHeight, false);
}

function FixFrameHeight () {
    var frameHeight = noteFrame.contentDocument.body.offsetHeight;
    noteFrame.style.display = "block";
    noteFrame.height = frameHeight;
}