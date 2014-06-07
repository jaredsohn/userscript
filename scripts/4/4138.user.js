// ==UserScript==
// @name          Wikify
// @namespace     http://geocities.com/kaysov/
// @description	  Wikify button in gmail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// By Kesava Malllela
// Wikify button in gmail

// USAGE:
// ==ENTRY== -> http://en.wikipedia.org/wiki/ENTRY
// ==Indian_Ocean== -> http://en.wikipedia.org/wiki/Indian Ocean

(function () {
 
  var butt = document.createElement ('BUTTON');
  var buttext = document.createTextNode ('Wikify!');
  butt.appendChild (buttext);
  
  butt.setAttribute('style', 'color:#0000CC; background-color:#C3D9FF; font-weight:bold; font-style:underline; border:0px; cursor:pointer; text-decoration:underline;');

  butt.setAttribute('title', 'Links ==ENTRY== to Wikipedia');

  butt.setAttribute('onclick',"var iframeHTML = document.getElementById('hc_compose'); iframeHTML.contentDocument.body.innerHTML=iframeHTML.contentDocument.body.innerHTML.replace(/(==)([a-zA-Z_]+)(==)/gi, '<a href=http://en.wikipedia.org/wiki/$2 >$2</a>')");


  var composeEditBar = document.getElementById('sp_compose'); 
  var parentDiv = composeEditBar.parentNode; 
  parentDiv.insertBefore(butt, composeEditBar);

  

}) ();

