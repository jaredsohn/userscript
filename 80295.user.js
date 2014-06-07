// ==UserScript==
// @name           TNT Village Auto Login
// @namespace      scambioetico.org
// @include        http://forum.tntvillage.scambioetico.org/tntforum/*
// ==/UserScript==

// Impostare nome utente e password per la connessione
var username = "";
var password = "";

// Dopo il login reindirizza alla pagina di ricerca torrent
if (window.location.href.substring(window.location.href.length -2)=="01") {
	window.location.href = "http://forum.tntvillage.scambioetico.org/tntforum/index.php?act=allreleases";
// Esegue il login
} else if (window.location.href.substring(window.location.href.length -2)=="00") {

	var testo = document.getElementsByName("LOGIN").item(0);

	//alert();

	document.getElementsByName("UserName").item(0).value = username;
	document.getElementsByName("PassWord").item(0).value = password;

	testo.submit();
// Reindirizza alla pagina di login a meno che non si abbia appena effettuato la disconnessione	
} else {
	if ( (window.location.href == "http://forum.tntvillage.scambioetico.org/tntforum/index.php?") || (window.location.href == "http://forum.tntvillage.scambioetico.org/tntforum/index.php")) {
		return;
	}
	
	var ctable = document.getElementById("userlinks");
	var connected = 0;
	if (ctable != null) {
		connected = ctable.innerHTML.indexOf("<a href=\"http://forum.tntvillage.scambioetico.org/tntforum/index.php?showuser=");
	}
	if (connected < 0) {
		window.location.href = "http://forum.tntvillage.scambioetico.org/tntforum/index.php?act=Login&CODE=00";
	}
}