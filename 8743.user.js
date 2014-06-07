// ==UserScript==
// @name           Myspace - Auto-Commenter
// @namespace      http://www.myspace.com/tp_
// @include        http://comment.myspace.com/*

// ==/UserScript==

 // ====EDIT THIS====
 text = "Heyyy, just leaving a comment to you, I'm so tired, ahh, I'm all sleepy :(\n\nHow are you?\n\nI'm doing pretty good actually.";


 // ====NOT HERE====
 var theInput = document.getElementById("ctl00_cpMain_postComment_commentTextBox"); 
 theInput.value = text;