// Script is based on RPGNet True Ignore List script
// version 1.0
// 2006-07-23
// Copyright (c) 2006, Ferry Bazelmans (Crayne)
// Adapted for Photo-forum.net - a Phorum engine based forum

// ==UserScript==
// @name photo-forum ignore
// @description Script to completely hide posts by certain posters
// @include http://photo-forum.net/*
// ==/UserScript==

var blockedUsers = new Array();

// Use this array to record the names of posters whose posts you don't want to see anymore. For each poster, add a line below the current one, adding 1 to the
// number between brackets for each consecutive line (the topmost entry must always be 0).
//
// So if you have four posters you don't want to see posts by, it might look like this:
//
// blockedUsers[0] = "Poster 1";
// blockedUsers[1] = "Poster 2";
// blockedUsers[2] = "Poster 3";
// blockedUsers[3] = "Poster 4";


// edit these lines
// redaktirai sledvashtite linii
// Редактирай следващите линии



blockedUsers[0] = "Poster1";



// Do not change anything below this unless you know what you're doing...
// NE PROMENQI NISHTO NADOLU
// Не променяй нищо надолу, освен ако не знаеш какво правиш


var postArray = document.getElementsByClassName("PhorumListTable");
var aArray;
var i;
var x;
var y;
var alignCheck;
var currUserName;
var classCheck;

if (window.location.pathname.indexOf("read.php") != -1) {

for (i = 0; i < postArray.length; i++) {

aArray = postArray[i].getElementsByTagName("a");

for (x = 0; x < aArray.length; x++) {

classCheck = aArray[x].getAttribute("class");

if (classCheck != null) {

currUserName = aArray[x].innerHTML;

for (y = 0; y < blockedUsers.length; y++) {

if (blockedUsers[y].toUpperCase() == currUserName.toUpperCase()) {

postArray[i].style.display = "none";

}

}

}

}

}

}