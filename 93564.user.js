// ==UserScript==
// @name          Google No Redireccionar
// @version       2.0
// @namespace     zack0zack@gmail.com
// @description   Google.com.ar saca redireccionamiento y dejar link directo de pagina
// @include	  http://www.google.com*
// @copyright     zack0zack@gmail.com
// ==/UserScript==



window.addEventListener('load', function() {
 window.setTimeout(function(){ 

   var i, v = document.getElementsByTagName('a');
   for(i = 0 ;i < v.length; i++ ) {
	v[i].removeAttribute("onmousedown");
   }

 }, 4000);
}, 'true');

