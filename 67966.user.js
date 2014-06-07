// ==UserScript==
// @name           Auto-Attack List
// @namespace      Nickc
// @include        http://www.yourgamingsite.org/Travian.do*
// ==/UserScript==
function hacerlista() {	
	var tbody, alla, thisa, Ipos, Fpos, lista;
	tbody = document.evaluate( 
	    '//table[@class="tbg"]//tbody',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	tbody = tbody.snapshotItem(0);
	alla = tbody.getElementsByTagName("a");
	var b = 1;
	var IDciudad = new Array();
	for (var i = 0; i < alla.length; i++ ) {
		thisa = alla[i].href;
		Ipos = thisa.indexOf("d=") + 2;
		Fpos = thisa.indexOf("&c");
		if (Ipos > -1 && Fpos > -1) {
			thisa = thisa.substring(Ipos, Fpos);
			IDciudad[b] = thisa ;
			b = b + 1;
		}
	}
	lista = "var ciudad = new Array();<br>";
	for (var i = 1; i < IDciudad.length; i++ ) {
		lista = lista + "ciudad[" + i + "] = " + IDciudad[i] + ";<br>" ;
	}
	var logo = document.createElement("div");
	logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
	    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    	'font-size: small; background-color: #000000; ' +
	    'color: #ffffff;">' +
	    lista +
	    '</div>';
	document.body.insertBefore(logo, document.body.firstChild);
};
var answer = confirm ("Make list?")
if (answer)
	hacerlista(); 
	
