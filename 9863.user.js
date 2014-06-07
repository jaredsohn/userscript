// ==UserScript==
// @name          False Link Remover
// @namespace     
// @description   Changes the hit-counter link to direct link
// @include       http://*
// ==/UserScript==

(function() {

  var links;
  links = document.getElementsByTagName('a');
  
  for (var i = 0; i < links.length; i++) 
  {
   
   
   if (links[i].href.indexOf("http://", 10) != -1) 
   { 
     var falseLink = links[i].href;
	 var position = links[i].href.indexOf("http://", 10);
     links[i].href = decodeURIComponent(falseLink.substring(position, 500));
	 links[i].title = 'FLR: '+links[i].href;
   }
  }

})();