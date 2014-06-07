// ==UserScript==
// @name        Wow SoC forum additions
// @namespace   pkx
// @author      PKX
// @description roba che mi fa comodo avere a portata di mouse sul forum
// @include     http://www.wowsoc.org/forum/*
// @version     1
// @grant       none
// ==/UserScript==

// Pulsante Bug Tracker
var topBar = document.getElementById('top-bar').children[0];
var bugTrackerButton = document.createElement("a");
bugTrackerButton.href = "/devzone";
bugTrackerButton.className = "cell";
bugTrackerButton.innerHTML = "Bug-Tracker";
topBar.insertBefore(bugTrackerButton, topBar.children[2]);

// Messaggi Recenti
var leftBreadcrumb = document.getElementById('breadcrumb').children[0];
var messaggiRecentiButton = document.createElement("li");
messaggiRecentiButton.className = "rightside";
messaggiRecentiButton.innerHTML = "• <a href=\"./search.php?search_id=newposts\">Messaggi recenti</a>";
leftBreadcrumb.insertBefore(messaggiRecentiButton, leftBreadcrumb.children[0]);