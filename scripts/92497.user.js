// ==UserScript==
// @name jimmykup
// @namespace jimmykup
// @description jimmykup
// @include jimmykup
// ==/UserScript==

function init(){

   num=document.getElementById('test').innerHTML;
   num=num.replace(/([\d]{3})([\d]{3})([\d]{4})/g,' ($1) $2-$3 ');
   document.getElementById('test').innerHTML=num;
}

 window.addEventListener?
 window.addEventListener('load',init,false):
 window.attachEvent('onload',init);