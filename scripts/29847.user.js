// ==UserScript==
// @name           Prison Struggle - Add Enemies to navigation menu
// @namespace      KHMI - Greasemonkey
// @include        http://www.prisonstruggle.com/*
// ==/UserScript==

var timeout = 0;

window.setTimeout( function() {
   var menu = document.getElementById("Menu");
   
   if(menu){
      var ul = menu.childNodes[3];

      var li = document.createElement('li');

      var link = document.createElement('a');
      link.setAttribute('href','peeps.php?action=enemies');

      var img = document.createElement('img');
      img.setAttribute('width','16');
      img.setAttribute('height','16');
      img.setAttribute('src','images/buttons/top.png');
      
      link.appendChild(img);
      link.innerHTML = link.innerHTML + '&nbsp;Enemies';

      li.appendChild(link);

      ul.insertBefore(li, ul.childNodes[13].nextSibling);
   }
},timeout);