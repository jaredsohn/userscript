// ==UserScript==
// @name Edit Highlighter
// @namespace shoecream@luelinks.net
// @description Highlights edits on the messages screen. Requires Firefox 3.
// @include http://boards.endoftheinter.net/showmessages.php*
// @include http://links.endoftheinter.net/linkme.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// @include https://links.endoftheinter.net/linkme.php*
// ==/UserScript==

var highlight_color = 'red !important';

var tops = document.getElementsByClassName('message-top');

for (i = 0; i < tops.length; i++) {
   var a = tops[i].getElementsByTagName('a');
   for (j = 0; j < a.length; j++) {
      if (a[j].textContent.search('Message Detail') > -1) {
         if (a[j].textContent.match(/\d+ edit/)) {
            // this is actually a better way of setting style attributes
            a[j].setAttribute('style','background-color: '+highlight_color);
            a[j].style.fontWeight='bold';
         }
      }
   }
}
