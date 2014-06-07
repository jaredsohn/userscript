// ==UserScript==
// @name           AutoHaggle
// @namespace      neopets.com
// @description    A template for creating new user scripts from
// @include        http://www.*neopets.com/haggle.phtml?*

// ==/UserScript==

b = document.getElementsByTagName('b');

for(i = 0; i < b.length; i++){
     if(b[i].innerHTML.match('Shopkeeper says'))     
          wants = b[i].innerHTML.replace(/[^0-9]/g, '');

}

hag1 = wants.substring(0, 1);
hag2 = wants.substring(1, 2);

if(hag1 == hag2){
     if(hag1 < 9)
          hag2 = (parseInt(hag2)+1);
     else
          hag2 = '0';
}

haggle = hag1+''+hag2;


for(i = 0, usenum = 0; i < wants.length-2; i++, usenum++){
     if(usenum % 2 == 0)
          haggle += hag1;
     else
          haggle += hag2;
}

hagbox = document.getElementsByName('current_offer');


if(hagbox.length > 0)
     hagbox[0].value = haggle;

