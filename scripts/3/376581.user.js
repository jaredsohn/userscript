// ==UserScript==
// @name          Google JXS
// @namespace     https://userscripts.org/users/jaxo
// @description   Forces direct links in google's result pages.
// @version       1.0
// @author        Jaxo
// @include       http://www.google.*/*
// @include       https://www.google.*/*
// ==/UserScript==


   window.addEventListener("load", killRwt);

   function killRwt(){
      window.rwt = null;
   }

