// ==UserScript==
// @name           Manege Galerie Downloader
// @namespace      zas-kar
// @description    Das Skript lädt anstatt der VorschauFotos die OriginalFotos in der Galerie. Somit kann man mit "Strg+S" alle Fotos auf der Vorschau Seite auf einmal in der OriginalGröße herunterladen. 
// @include        */www.manege-lintorf.de/*
// ==/UserScript==


(function() {
		var i=document.getElementsByTagName('img');
		for (var j=i.length-1; j>1; j--) {
			var linkdata =  i[j].getAttribute("src");
			if (linkdata.match("thumb") == "thumb" ) {
				linkdata=linkdata.replace("thumb=160&target","target");
				var newi = document.createElement ('img');
				newi.src = linkdata;
				newi.style.width = "200px";
				i[j].parentNode.replaceChild( newi ,i[j]);
			}
 		}
	})();