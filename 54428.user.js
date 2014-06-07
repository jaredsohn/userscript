// ==UserScript==
// @name           MeinVZ and Studivz: Userdefined Links
// @namespace      Meinvz
// @include        http://www.studivz.net/*
// @include        http://www.meinvz.net/*
// ==/UserScript==


// Hier koennen die Links angepasst werden.
// Mehrere Links bitte mit einem Komma trennen.
// Beispiel:
//  "Link1 | http://www.abc.de" ,
//  "Link2 | http.//www.xyz.de"

var mylinks = new Array(

"SIH | http://www.meinvz.net/Groups/Overview/92a2f4abd01eca17"

);



var menu = document.getElementById('Grid-Navigation-Main');
if (menu) {
   var empty = document.createElement('li');
   empty.appendChild(document.createTextNode(''));
   empty.firstChild.data = '-';
   empty.style.color = 'white';
   menu.appendChild(empty);

   for (i=0; i<mylinks.length; i++) {
      var tmp = mylinks[i].split('|');
      var link = document.createElement('a');
      link.href = trim(tmp[1]);
      link.appendChild(document.createTextNode(tmp[0]));
      var liElem = document.createElement('li');
      liElem.appendChild(link);

      menu.appendChild(liElem);
   }
}


function trim(str) {
  return str.replace (/^\s+/, '').replace (/\s+$/, '');
}
