// ==UserScript==
// @name           Urbandead Contacts Counter
// @namespace      http://wiki.urbandead.com/index.php/User:TouchingVirus
// @description    Counts the number of contacts on your Urbandead Contacts page
// @include        http://www.urbandead.com/contacts.cgi
// @include        http://www.urbandead.com/contacts.cgi?*
// @include        http://urbandead.com/contacts.cgi
// @include        http://urbandead.com/contacts.cgi?*
// @include        http://94.76.232.96/contacts.cgi
// @include        http://94.76.232.96/contacts.cgi?*
// ==/UserScript==

var total_tablerows = document.getElementsByTagName('tr');
var contacts_heading = document.getElementsByTagName('h1')[0];
total_tablerows = total_tablerows.length-2;
contacts_heading.innerHTML = contacts_heading.innerHTML+' (Total: '+total_tablerows+')';
contacts_heading.style.textAlign = 'left';