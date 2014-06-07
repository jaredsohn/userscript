// ==UserScript==
// @name          VistaGlobaleUP
// @description	  Copia del link in alto per l'accesso alla "Vista Globale".
// @author        Mozzicone[ITA]
// @include       http://s*.vendetta*.*/vendetta/*
// ==/UserScript==
(function() {
	if (location.pathname.search('uebersicht.php') != -1 ) {
		var link = document.location.href;
		var UrlVista = link.replace("uebersicht.php","empire.php");
						
		var pagina = document.getElementsByTagName("a");
	
		for (i = parseInt(pagina.length)-1; i >= 0; i--) {	
		
			if (pagina[i].toString().search('empire.php') != -1){
				testo = pagina[i].innerHTML.toString();
			}
					
			if (pagina[i].toString().search('unitview.php') != -1){
				tr = document.createElement("tr");
				th2 = document.createElement("th");
				th2.innerHTML = "<a href='"+UrlVista+"' target=\"_new\">"+testo+"</a>";
				th2.setAttribute("colspan",3);
				tr.appendChild(th2);
				var parentDiv = pagina[i].parentNode.parentNode.parentNode;
				parentDiv.insertBefore(th2,pagina[i].parentNode.parentNode);
		 		i--;
			}
	    }
    }	
	
	
})();