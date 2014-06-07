// ==UserScript==
// @name           Deleted links hider
// @namespace      shoecream@luelinks.net
// @description    Hides your deleted links so you don't have to exert the effort of scrolling through them!
// @include        http://links.endoftheinter.net/links.php?*
// @include        https://links.endoftheinter.net/links.php?*
// ==/UserScript==

var em = document.getElementsByTagName('em');

if (em.length) {
   for (var i=0;i<em.length;i++) {
      if (/DELETED/i.test(em[i].textContent)) {
         em[i].parentNode.parentNode.className += ' deleted';
      }
   }

   var inserted_row = document.getElementsByTagName('table')[0].insertRow(-1);
   var hider = inserted_row.insertCell(0);
   hider.colSpan = inserted_row.parentNode.getElementsByTagName('tr')[1].getElementsByTagName('td').length;
   hider.innerHTML = '<style type="text/css">.deleted {display: none}</style>';
   var clicky = document.createElement('a');
   clicky.innerHTML = 'Show ';
   if (em.length == 1) {
      hider.innerHTML += 'One deleted link hidden. ';
      clicky.innerHTML += 'it.';
   } else {
      hider.innerHTML += em.length+' deleted links hidden. ';
      clicky.innerHTML += 'them.';
   }
   clicky.href = '#';
   var hide_me = function (e) {
      e.preventDefault();
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
   }
   clicky.addEventListener('click',hide_me,false);
   hider.appendChild(clicky);
}
