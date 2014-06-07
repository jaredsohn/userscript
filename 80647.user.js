// ==UserScript==
// @name Adds a link to a random Fluther question in header. 
// @include http://www.fluther.com/*
// ==/UserScript==

//Contact johnpowell if you have any problems

  var ourDiv = document.getElementById("navbar");
  ourDiv.innerHTML = "<li><a href=http://www.stfudamnit.com/ryan/fluther/random/"
      + ">R</a></li> <li></li>" + ourDiv.innerHTML;