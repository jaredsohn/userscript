// ==UserScript==
// @name       Workflowy Expander
// @namespace  http://userscripts.org/users/seadugo
// @version    1.0
// @description Removes the set max-width the note page allowing it to fill out the whole browser window.  
// @match      https://workflowy.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  $("div.page.active").css('margin-left', '40px');
  $("div.page.active").css('margin-right', '40px');
  $("div.page.active").css('maxWidth', 'none');
    
  $("div#getMoreSpaceButtonTopLeft.getMoreSpaceButton").remove();
  $("div#bottomLinks").remove();
  $("img#proPitchBottomRight").remove();
});