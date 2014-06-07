// ==UserScript==
// @name           save_tv Angemeldet bleiben aktivieren und FDM
// @namespace      www.egmonts.de
// @version        0.02
// @description    Aktiviert Autologin ohne nervige Popup und soll spaeter auch FDM Downloads beschleunigen
// @include        http://www.save.tv/STV/S/misc/home.cfm*
// @include        http://www.save.tv/STV/S/obj/user/usShowLogin.cfm*
// @include        http://www.save.tv/STV/M/obj/user/usShowVideoArchiveDetail.cfm*
// @include        http://www.save.tv/STV/M/obj/user/usShowVideoArchive.cfm*
// ==/UserScript==

// document.getElementById('bAutoLoginActivate').checked=true;

/**********************************
 * Haken bei Autologin setzen
 **********************************/
// nur auf http://www.save.tv/STV/S/misc/home.cfm
if (document.location.href.match(/home.cfm/)) {
  var el = document.getElementById('bAutoLoginActivate');
  if (el)
    document.getElementById('bAutoLoginActivate').checked=true;
}

// nur auf http://www.save.tv/STV/S/obj/user/usShowLogin.cfm
if (document.location.href.match(/usShowLogin.cfm/)) {
  var el = document.getElementById('bAutoLoginActivate');
  // ToDo: auf dieser Seite gibt es zwei Felder um den Haken zu setzen!
  if (el)
    document.getElementById('bAutoLoginActivate').checked=true;
}

/**********************************
 * Link zu Downloadseiten extrahieren
 **********************************/

// ToDo: Test, ob die Downloadseite geladen wird, verbessern!
// nur auf http://www.save.tv/STV/M/obj/user/usShowVideoArchiveDetail.cfm
if (document.location.href.match(/usShowVideoArchive.cfm/)) {
  // alert('Download Archiv geladen');
  // Links auslesen und in atag speichern
  var atag = document.getElementsByTagName('a');
  for(var i = 0; i < atag.length; i++) {
    if (atag[i].href.match(/usShowVideoArchiveDetail/)) { // prüfen ob der Link zu usShowVideoArchiveDetail führt
      // jetzt ist in atag[i] ein Link zu einem Download
      // id auslesen aus dem Link 
      // http://www.save.tv/STV/M/obj/user/usShowVideoArchiveDetail.cfm?TelecastID=1234567
      // Todo Auslesen der id sicherer machen, falls weiter Parameter im Link stehen
      var id = atag[i].href.slice(74,atag[i].href.length);
      
      if (i==0) { // für erste Versuch nur bei dem ersten Download machen
	alert('ID ist '+id + ' und Downloadlink ist ' + atag[i].href + '\n\rToDo: Link folgen, Downloadziel eintragen');
	// alert(GM_getResourceURL(atag[i].href)); // Zeige für Debuging URL an, wird für jeden gefundenen Link gezeigt (nervig)!
	// atag[i].text = atag[i].text + ' test'; // geht nicht, .text Eigenschaft ist nur lesen (Ich wollte dem Link z.B. Dateigröße hinzufügen)
	

/**********************************
 * ToDo: jeden Link in atag[i].href folgen, analysieren und gegen letzten Downloadlink ersetzen
 **********************************/


//             headers:{
//                'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.0.4) Gecko/2008102920 Firefox/3.5.1',
//		  'User-agent': navigator.userAgent,

//                'Referer':oldurl,
//                'Cookie':document.cookie
//            },


	var url = atag[i].href;
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: url,
//	  headers: {
//	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
//	    'Accept': 'application/atom+xml,application/xml,text/xml',
//	  },
	  onload: function(responseDetails) {
	    alert('Request returned ' + responseDetails.status +
	    ' ' + responseDetails.statusText + '\n\n' +
	    'data Len:\n' + responseDetails.responseText.length); // ok, die Seite wird geladen...
	  }
	});



      }
    } // if
  } // for
} // if