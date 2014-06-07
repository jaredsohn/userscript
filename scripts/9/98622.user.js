// ==UserScript==
// @name           sbworkaround
// @namespace      phfix
// @include        http://scienceblogs.com/pharyngula/*
// ==/UserScript==

var oldLoginDiv = document.getElementById("comment-greeting"); 
var newLoginDiv = document.createElement("div"); 
newLoginDiv.innerHTML = "<a href='http://scienceblogs.com/mt/community?__mode=login&blog_id=7' target='_blank'>Sign in <strong>here</strong></a> first! &nbsp; &nbsp; (<a href='http://scienceblogs.com/mt/community?__mode=logout'>direct sign out</a>)"; 
oldLoginDiv.parentNode.insertBefore(newLoginDiv,oldLoginDiv); 