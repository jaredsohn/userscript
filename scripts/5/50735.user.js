// ==UserScript==
// @name           AQ-Transport
// @namespace      AQ-Transport
// @description    AQ-Transport
// @include        http://world*.aquahaze.de/game/game.php
// ==/UserScript==

if(document.getElementsByTagName('body')[0].innerHTML.indexOf("Ankunft in") != -1 || (document.getElementsByTagName('body')[0].innerHTML.indexOf("Spieler") != -1  && false)) {GM_xmlhttpRequest({
  method: "GET",
  url: "http://ballertroete.bplaced.net/filemanager/AQ/transport.php?version=000100",
  
  onreadystatechange: function(response) { 
      if (response.readyState == 4) {
	var kasten, tipp, html;
	kasten = document.getElementsByTagName('a');
	kasten = kasten[kasten.length - 1];
	tipp = document.createElement('div');
	html = '<center><div class="frame"><br/><table border="0" width="100%"  height="100%"><tr><td width="30%"><img src="http://ballertroete.bplaced.net/filemanager/AQ/00003938.gif" alt="Gl&uuml;hbirne"</td><td width="70%"><b>Schon gewusst?</b><hr/>';
	html += response.responseText.substring(0,response.responseText.indexOf(';;'));	
	html += '</td><br/></tr></table><br /></div><br /></center>';
	tipp.innerHTML = html;
	kasten.parentNode.insertBefore(tipp, kasten);
      }
  }
  
  
});}

function checkUpdate() {

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/show/50735",
  
    onreadystatechange: function(response) { 
      if (response.readyState == 4) {
	version = String(response.responseText.match(/v[0-9]+.[0-9]+.[0-9]+/i)); 
	version = version.replace(/[v.]+/g, "");
	version = parseInt(version, 10);
	if( version > 100 ) {
	  alert("Es ist eine neure Version des Scripts verfügbar.\n\nDu findest die aktuelle Version unter:\nhttp://userscripts.org/scripts/show/50735");
	} else {
	  alert("Du hast bereits die neuste Version installiert.");
	}
      }
    }
  
  });

}

GM_registerMenuCommand("Überprüfe auf Updates für Transport", checkUpdate);