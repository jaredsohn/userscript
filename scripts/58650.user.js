// ==UserScript==
// @name Travian: coords (v1.1)
// @description On links to villages appended village coords
// @include http://*.travian.*/*
// @version 1.1
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2009
// Clan S4 <KazakiYuV2>.

(function(){

   var as = document.getElementsByTagName('a');
   for(var i=0; i<as.length; i++) {
	 var url = as[i].getAttribute('href');
	 if (url) {
	   var m=url.match(/karte.php\?d=([0-9]+)\&c=/);
	   if (m && m[1]) {
		 var z = parseInt(m[1]) - 1;
		 var ny = Math.floor(z/801);
		 var nx = z-ny*801;
		 var x = nx-400;
		 var y = 400-ny;
		 var c = document.createTextNode('('+x+'|'+y+') ');
		 as[i].insertBefore(c, as[i].firstChild);
	   }
	 }
   }

})();
