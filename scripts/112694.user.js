// Reveal Facebook Messages
// version 0.1
// 2011-09-10
// Robert Retzbach
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reveal Facebook Messages
// @namespace     rfm@rretzbach.de
// @description   Bring back hidden facebook messages
// @include       http*://*.facebook.com/messages/*
// ==/UserScript==

var mainContent = document.getElementById('MessagingMainContent');

if ( mainContent.className ) {

  var currentClassnames = mainContent.className;
  var filteredClassnames = currentClassnames.replace('invisible_elem', '');

  mainContent.className = filteredClassnames;

}
