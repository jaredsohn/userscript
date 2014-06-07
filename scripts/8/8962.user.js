// ESPN Conversation zapper
// version 0.1
// May 1, 2007
// Copyright (c) 2007, Brian Kennedy
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          ESPN Conversation zapper
// @namespace     bpk
// @description    Get rid of ESPN Conversation
// @include       http://sports.espn.go.com/* 
// @include 	  http://www.espn.com/*

(function() {

var removeComments = document.getElementById('conversation');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}

})();