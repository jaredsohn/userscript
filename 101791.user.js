// topicfire-extinguisher.user.js
//
// ==UserScript==
// @name          Topicfire Extinguisher
// @namespace     http://userscripts.org/users/180763/scripts
// @description   Automatically closes the Topicfire frame
// @include       http://topicfire.com/share/*
// ==/UserScript==

var a = document.getElementsByTagName('a');
  if (a[1].className == 'close') 
    document.location = (a[1].attributes[0].nodeValue);
