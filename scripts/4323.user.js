// Copyright (c) 2006, Perberos (perberos@hotmail.com)
// http://perberos.tk/

// ==UserScript==
// @name		  Vendetta CR
// @namespace	 Vendetta CR
// @description   Quita los flames derecho e izquierdo.publicidad premium, y link premium del menú.
// @include	   http://*.vendetta.es/*
// @exclude	   
// ==/UserScript==    


(function() {

  if (self.document.URL.indexOf("login.php") != -1 && self.document.URL != "http://www.vendetta.es/vendetta/login.php") {
	var trs = document.getElementsByTagName('frameset');
		for (var i = trs.length - 1; i >= 0; i--) {
			//alert(trs[i].cols);
			if (trs[i].cols == '53,*,53'){ trs[i].cols = '0,*,0'; }
			if (trs[i].rows == "141,*"){ trs[i].rows = '0,*'; }
			if (trs[i].cols == '906,*'){ trs[i].cols = '*,0'; }
			
			
		}
  }
  
  if (self.document.URL.indexOf("uebersicht.php") != -1){
	var p = document.getElementsByTagName('p');
		for (var i = p.length - 1; i >= 0; i--) {
			p[i].parentNode.removeChild(p[i]);
		}
  }
  
  if (self.document.URL.indexOf("nav.php") != -1){
	var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf("premium.php") != -1){
			
			a[i].parentNode.parentNode.removeChild(a[i].parentNode);
			}
		}
  }
  
 
})();
/* http://*.vendetta.es/vendetta/uebersicht.php*
texto que aparece en la publicidad

Nuevo! Ahora puedes pagar tambien con SMS!
Conoce m?s sobre el Padrino Vendetta:
-tus construcciones no se retrasar?n
-sinpublicidad
Hazte Padrino ahora
*/


//vendettacr.user.js