// ==UserScript==
// @name           Manga Toshokan - Remove Warning
// @author         Andreas Jung (sd-daken.deviantart.com)
// @description    Confirms the mature content warning on Manga Toshokan automatically and removes it afterwards...
// @namespace      http://www.w3.org/1999/xhtml 
// @include        http://www.mangatoshokan.com/read/*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

try {
   var warningTableCell = document.getElementById('readerPage').parentNode.parentNode.getElementsByTagName('table')[0].getElementsByTagName('td')[0];
   var cellAttribute = warningTableCell.getAttribute('class');
   if (cellAttribute.indexOf('warning') != -1) {
      warningTableCell.parentNode.parentNode.setAttribute('style', 'display: none;');
      document.getElementById('readerPage').parentNode.parentNode.getElementsByTagName('a')[1].setAttribute('style', 'display: none;');
      for (i = 0; i < document.getElementById('readerPage').parentNode.parentNode.getElementsByTagName('br').length; i++) {
         document.getElementById('readerPage').parentNode.parentNode.getElementsByTagName('br')[i].setAttribute('style', 'display: none;');
      }
      document.getElementById('readerPage').setAttribute('style', 'visibility: visible;');
   }
}
catch (e) {
   //no warning to skip...
}