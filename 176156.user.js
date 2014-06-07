// ==UserScript==
// @name        NoChat @ edX (CS-169.2X)
// @namespace   http://dcarral.org
// @description This user script removes the chat window shown automatically in the Courseware section from CS-169.2X course @ edx.org.
// @include     https://courses.edx.org/courses/BerkeleyX/CS-169.2x/*
// @version     1
// ==/UserScript==


window.addEventListener ("load", main, false);

function main() {    
    var chatFrame = document.getElementById("chatiframe");    
    chatFrame.parentNode.removeChild(chatFrame);    
}
    