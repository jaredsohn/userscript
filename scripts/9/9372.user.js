// ==UserScript==
// @name          Gmail Emoticons !!
// @namespace     http://userscripts.org/users/26553;scripts
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==


// By Deodrus
// Emoticons button in Gmail Compose Window.
// http://userscripts.org/scripts/show/9372
//
// ONLY WORKS IN THE OLDER VERSION OF GMAIL !!
//
// How to use:
// You can just DRAG AND DROP the emoticons onto your Compose-message box in Gmail.



(function () {
 
  var butt = document.createElement ('BUTTON');
  var buttext = document.createTextNode ('Emoticons!');
  butt.appendChild (buttext);
  
  butt.setAttribute('style', 'color:#000000; background-color:#C3D9FF; font-weight:none; font-style:underline; border:0px; cursor:pointer; text-decoration:none;');

  butt.setAttribute('title', 'Emoticons from Deodrus');

  butt.setAttribute('onclick', "window.open('http://www.hostedserver.com/gmail_emoticons.htm','Gmail_Emoticons','width=425,height=385,resizable=yes')");

  var composeEditBar = document.getElementById('sp_compose'); 
  var parentDiv = composeEditBar.parentNode; 
  parentDiv.insertBefore(butt, composeEditBar);

}) ();