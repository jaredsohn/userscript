// ==UserScript==
// @name        Astrid - no sidebar
// @namespace   ch.turtleweb.astrid
// @description	Remove right sidebar (and the logo)
// @include     http://astrid.com/*
// @version     1.0
// @grant 		none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Cut off the octopus thing from the logo 
$(".brand > img").css("position","absolute").css("clip","rect(0px,120px,400px,30px)").css("left", "-10px")

// Hide all contents of the info panel(= sidebar)
$(".home-index-infopanel").children().hide();

// hide the footer (is also in the side bar...)
$("#footer").hide()

// Hide the octopus thing if nothing is displayed 
$(".empty-tasks").css("background","none").css("margin-top", "0px")


$(".title").css("white-space","normal")

