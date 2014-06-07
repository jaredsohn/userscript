// ==UserScript==
// @name           Myspace - Auto-Commenter
// @namespace      http://www.myspace.com/tp_
// @include        http://comment.myspace.com/*

// ==/UserScript==

 // ====EDIT THIS====
 text = "Heyyy, just leaving a comment to you,  \n\nHow are you?\n\nI'm doing pretty good actually, Send me a comment or a pic comment and ill do the same ^^
-Jeff"


 // ====NOT HERE====
 var theInput = document.getElementById("ctl00_Main_postComment_commentTextBox"); 
 theInput.value = text;