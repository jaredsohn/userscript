//
// ==UserScript==
// @name          TBD
// @namespace     http://userscripts.org/
// @description   TBD
// @include       http://www.conquerclub.com/game.php*
// ==/UserScript==


function displayGame() {
GM_xmlhttpRequest({
     method: 'POST',
     url: window.location.href,
     headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'text/html',
     },
     onload: function(responseDetails) {
	      var parser = new DOMParser();    	
	      var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
	      var script = dom.getElementsByTagName('script')[1];
	      
	      if(script.innerHTML.match(/mapFile = "(.+?)"/)) {
		      alert("mapFile = " + RegExp.$1);
	      }	      
     }
});
}

displayGame();
