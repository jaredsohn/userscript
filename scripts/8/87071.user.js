// ==UserScript==
// @name           kasuj ulubione
// @namespace      local
// @include        http://www.fotka.pl/konto_ulubione.php
// ==/UserScript==

var $ = unsafeWindow.$;


var as = document.getElementsByTagName("a");

for(var i=0; i<as.length; i++){
	var e = as[i];
	if(e.innerHTML == "usuń"){				
		var id = e.href.match(/\d+/);			
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.fotka.pl/konto_ulubione.php",		
			data: 'e=d&f%5Bid%5D='+id,
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(){GM_log("skasowano " + id);}
		});	
	}
}
