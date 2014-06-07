// ==UserScript==
// @author        Bear Scarr
// @version       1.0
// @name          DudesNude - Magnifying Pictures
// @namespace     http://www.dudesnude.com/userscripts
// @description   It shows big picture in preview mode
// @include       http://dudesnude.com/show.php?id=*
// @include       http://www.dudesnude.com/show.php?id=*
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++){
	 var element = images[i].parentNode;
         if (images[i].getAttribute("alt")!="dudesnude") {
          var atr = element.getAttribute("href");
	  var img_link = "http://fs9.dudesnude.com/pic/" + atr.substring(atr.indexOf('=')+1);
	  images[i].setAttribute("src",img_link);}
         else{
          ;}
};