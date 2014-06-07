// ==UserScript==
// @name         War of Ninja Thumbs up Change
// @namespace    for WarofNinja.com
// @version		 1.0
// @include      http://forums.warofninja.com/*
// @include      http://forums.warofninja.com
// @include      forums.warofninja.com/*
// @include      forums.warofninja.com
// @include 	 *.warofninja.com/*
// @author       JoeTurtle
// @description  Changes the Color the the Thumbs-Up Button on WoN
// @history		 1.0 - First release
// ==/UserScript==

// Changes the Colors
var forumbar = document.getElementById('content");
var thumbs = forumbar.getElementByTagName('a.forumButton.thumbup').style.color="none"