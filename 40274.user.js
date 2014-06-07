// ==UserScript==
// @name           #seTech
// @namespace      icaaq.com
// @description    Adds #seTech in your tweets when clicking the button. 
// @include        http://twitter.com/home
// ==/UserScript==

var but = document.getElementById('update-submit');
var t = document.createElement('input');
t.value = '#seTech';
t.type = 'button';
t.style.marginLeft = '5px';
but.parentNode.appendChild(t);

t.addEventListener('click',function(event){
  document.getElementById('status').value += " #seTech";
},true);
