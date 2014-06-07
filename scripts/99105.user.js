// HTTP-HTTPS gesperten Seiten
// Copyright (c) 2011 Lukas E. and Juan V.
//
// Diese script durchsucht jede Seite wo sie aufrufen auf jeder 
// Seite wo " Der Zugriff auf die angeforderte Seite wurde verweigert! " gefunden wird veränder das 
// script automatisch den link von http zu https
//
//
//
//
// Alle hier verwendeten Namen, Begriffe, Zeichen und Grafiken können Marken- oder Warenzeichen im Besitze ihrer rechtlichen Eigentümer sein. Die Rechte aller erwähnten und benutzten Marken- und Warenzeichen liegen ausschließlich bei deren Besitzern.
// wir nehmen keine Verantwortung wen das script probleme oder Fehler verursacht
// ==UserScript==

// @name	HTTP-to-HTTPS  HEMS
// @namespace	ea-valle.de
// @description	Diese script durchsucht jede Seite wo sie aufrufen auf jeder Seite wo " Der Zugriff auf die angeforderte Seite wurde verweigert! " gefunden wird veränder das script automatisch den link von http zu https aber diese funktionirt nur auf seite wo SSL zugelassen ist !

// ==/UserScript==
var tddata = document.getElementsByTagName('p');
   for (var i = tddata.length - 1; i >= 0; i--) {
       tddata2 = tddata[i].innerHTML;
      if(tddata2.search(/Der Zugriff auf die angeforderte Seite wurde verweigert!/) != -1 ) {
         location.href = location.href.replace(/http\:/, 'https:');
      }
      
   }
