// ==UserScript==
// @name           #svpt
// @namespace      icaaq.com
// @description    Adds #svpt in your tweets when clicking the button. 
// @include        http://twitter.com/home
// ==/UserScript==

var but = document.getElementById('update-submit');
var t = document.createElement('input');
t.value = '#svpt';
t.type = 'button';
t.style.marginLeft = '5px';
but.parentNode.appendChild(t);

t.addEventListener('click',function(event){
  document.getElementById('status').value += " #svpt";
},true);
