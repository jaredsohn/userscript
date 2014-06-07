   // ==UserScript==
   // @name          ORKUT MATRIX-ADITYA GOURAV
   // @description   Matrix in your PROFILE name
   // @author         ADITYA GOURAV
   // @include     http://www.orkut.co.in/*
   // ==/UserScript==
   if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
      var p = document.getElementsByTagName('h1')[0];
      p.innerHTML += "<img src='http://i26.tinypic.com/11hcfwy.gif''>";   
   }