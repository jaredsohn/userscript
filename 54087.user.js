// ==UserScript==
// @name           remove Sun Feedback Link
// @namespace      http://userscripts.org/users/99643
// @description    removes the annoying animated Feedback Link which is on many of the Sun Pages
// @include        http://*.sun.com/*
// ==/UserScript==

var feedbackDiv = document.getElementById('O_o');
if(feedbackDiv){
feedbackDiv.parentNode.removeChild(feedbackDiv);
}