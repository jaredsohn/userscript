// ==UserScript==
// @description Ermöglicht Links im quer-Blog des Bayerischen Rundfunks
// @include http://blog.br-online.de/quer/*
// @name querLinks
// @namespace http://thegremium.org/~doc/greasemonkey
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version 0.1
// ==/UserScript==

var allowSubmission = false;

/** extrahiert die in eckigen Klammern befindlichen Elemente als Array */
function getBracketedItems(content) {
	var retval = [ ];
	var startIdx = 0;
	var endIdx = 0;

	// so lange wie möglich doppelte öffnende eckige Klammern suchen 
	while((startIdx = content.indexOf("[[", endIdx)) != -1) {
		var length = 0;

		// zugehöriges schließendes Klammernpaar suchen 
		endIdx = content.indexOf("]]", startIdx);
		if(endIdx == -1) break;

		// länge des tokens ermitteln */
		length = endIdx - startIdx - 2;

		// links mit http:// sind mindestens 7 zeichen lang, shortlinks (zunächst) weniger als 3
		if((length > 7) || (length <= 2)) {
			// gefundenes token als anonymes objekt ins array werfen
			retval.push( { 'content' : content.substring(startIdx + 2, endIdx), 'id' : null, 'link' : null } );
		} 
	}

	// array mit token-objekten zurückgeben 
	return retval;
}

/** überträgt die zurückgelieferten "shortlinks" in den kommentar */
function transferIndices(links, r, contentElement) {
	var ranCorrectly = true;

	try {
		// inhalt des kommentar-felds holen 
		var content = contentElement.val();
		
		// server-antwort in javascript-objekte umwandeln
		var json = $.parseJSON(r);

		if(json["msg"] != null) {
			ranCorrectly = false;
			alert(atob(json["msg"]));
		}

		// alle links durch server-antwort ersetzen, falls möglich
		$.each(links, function(k, v) { 
			var link = json[v.id]; 

			if((link !== undefined) && (link != "")) 
				v.link = link; 
			else {
				ranCorrectly = false;
				v.link = v.content;
			}

			content = content.replace("[[" + v.content + "]]", "[[" + v.link + "]]"); 
		});
		
		// neuen inhalt ins kommentarfeld eintragen 
		contentElement.val(content);
	} catch(ex) {
		ranCorrectly = false;
		alert("error: " + ex);
	}

	if(!ranCorrectly && !confirm("Nicht alle Links konnten umgewandelt werden!\n\nKommentar trotzdem absenden?")) {
		allowSubmission = false;
		return;
	}
	
	allowSubmission = true;

	// umständlich, aber geht irgendwie nicht anders?
	for(var i = 0; i < document.forms.length; i++) {
		if(document.forms[i].id == "commentform") {
			document.forms[i].submit();
			return;
		}
	}
}

/** fragt beim server nach kurzlinks für die gefundenen elemente */
function indexify(links, contentElement) {
	var myJsonString = "[ ";
	var retval = null;

	// links in JSON wandeln zur abfrage an den server 
	$.each(links, function(k, v) { 
		v.id = k; 
		myJsonString += '{ "id" : "' + v.id + '", "link" : "' + btoa(v.content) + '" }, ';
	});
	myJsonString += " null ]";

	// sweet: cross-domain geht mit greasemonkey problemlos :)
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://thegremium.org/~doc/greasemonkey/querlinks/ajax.php?action=indexify",
		data: myJsonString,
		headers: {
			"Content-Type": "application/json"
		},
		onload : function(r) { transferIndices(links, r.responseText, contentElement); }
	});
}

/** callback-funktion für "kommentar senden"-button */
function modifyLinks(ev) {
	// kommentarfeld ermitteln
	var contentElement = $("#comment");

	// geklammerten kram extrahieren 
	var links = getBracketedItems(contentElement.val());

	if(links.length == 0) allowSubmission = true;

	if(!allowSubmission) {
		// kommentar erst mal nicht senden...
		ev.preventDefault();

		// aus den gefundenen tokens links machen und in den Kommentar eintragen 
		indexify(links, contentElement);
	} else {
		// zurücksetzen, man weiß ja nie ;) 
		allowSubmission = false;
	}
}

/** vermutete shortlinks aus einem Absatz holen und als Array JSON-codieren */
function gatherLinks(p) {
	var tokens = getBracketedItems(p.text());
	var myJsonString = "";

	$.each(tokens, function(k, v) {
		if(v.content.length <= 2)
			myJsonString += '"' + v.content + '", ';
	});

	return myJsonString;
}

/** die shortlinks aus den Kommentar-Absätzen wenn möglich ersetzen */
function replaceShortlinks(r) {
	var ranCorrectly = true;

	try {
		// server-antwort in javascript-objekte umwandeln
		var json = $.parseJSON(r);

		// evtl. fehler-meldung anzeigen
		if(json["msg"] != null) {
			ranCorrectly = false;
			alert(atob(json["msg"]));
		}

		// alle kommentar-absätze durchgehen
		$("div.comment-body p").each(function() { 
			var p = $(this);
			var content = p.text();
			// alle möglichen tokens ermitteln
			var tokens = getBracketedItems(content);
			
			// für alle tokens nachsehen, obs einen expandierten link gibt
			$.each(tokens, function(k, v) { 
				if(json[v.content] !== undefined) {
					// wenn ja: html-anchor damit tauschen
					var link = json[v.content];
					content = content.replace("[[" + v.content + "]]", '<a href="' + atob(link.url) + '" title="' + atob(link.title) + '">[' + v.content + "]</a>");
				}
			});

			// den geänderten inhalt in den absatz übetragen
			p.html(content);
		});
	} catch(ex) {
		ranCorrectly = false;
		alert("Fehler: " + ex);
	}
}

/* MAIN PROGRAM */

// submit-button umleiten, um links vor dem Absenden umwandeln zu können 
$("#submit").click(modifyLinks);

{
	// shortlinks in kommentaren zusammensuchen
	var myJsonString = "[ ";
	$("div.comment-body p").each(function() { myJsonString += gatherLinks($(this)); });
	myJsonString += " null ]";

	// shortlinks-expansion vom server holen
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://thegremium.org/~doc/greasemonkey/querlinks/ajax.php?action=linkify",
		data: myJsonString,
		headers: {
			"Content-Type": "application/json"
		},
		onload: function(r) { replaceShortlinks(r.responseText); }
	});
}
