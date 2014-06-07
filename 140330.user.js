// ==UserScript==
// @name        Code_rutube
// @namespace   Code_rutube
// @include     http://rutube.ru/video/*
// @version     1
// ==/UserScript==

   var metas = document.getElementsByTagName('meta'); 

   for (i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("property") == "og:video") { 
         a = metas[i].getAttribute("content"); 
      } 
   } 
alert(a);