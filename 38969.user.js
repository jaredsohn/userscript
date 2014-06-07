// ==UserScript==
// @name           VBulletin view thread in Archive Mode
// @namespace      http://*/forum*/showthread.php
// @description    Switch view to Archive mode, better than Printable mode
// @include        */showthread.php*
// @updateURL      http://userscripts.org/scripts/source/38969.user.js
// ==/UserScript==

// Add an extra item in Harmony-Central vBulletin forum header to switch display to Archive mode (if not disabled)
// i.e. convert URL from :
// http://acapella.harmony-central.com/showthread.php?t=12345
// To :
// http://acapella.harmony-central.com/archive/index.php/t-12345.html

// Go to the Thread Tools td
var td_ThreadTools  = document.getElementById('threadtools');
// Build a new Menu Link by cloning and editing the Thread Tools menu
td_ArchiveMode = td_ThreadTools.cloneNode(true)
// Clean up the unused script and img childs
script_ArchiveMode = td_ArchiveMode.firstChild.nextSibling.nextSibling.nextSibling;
td_ArchiveMode.removeChild(script_ArchiveMode);
img_ArchiveMode = td_ArchiveMode.lastChild.previousSibling;
td_ArchiveMode.removeChild(img_ArchiveMode);
// Change the id
td_ArchiveMode.setAttribute('id', 'archivemode');
// Change the text of the link
td_ArchiveMode.firstChild.nextSibling.firstChild.nodeValue = 'View in Archive Mode';
// Extract the thread id from the Thread Tools link
var a_ArchiveMode = td_ArchiveMode.firstChild.nextSibling;
var thread_Url = a_ArchiveMode.getAttribute('href'); /* /forums/showthread.php?t=12345&nojs=1#goto_threadtools */
var thread_Id = thread_Url.split('t=')[1].split('&')[0];
a_ArchiveMode.setAttribute('href', './archive/index.php/t-' + thread_Id + '.html');
a_ArchiveMode.setAttribute('title', './archive/index.php/t-' + thread_Id + '.html');
// Append the new child
td_ThreadTools.parentNode.appendChild(td_ArchiveMode);
// Done !