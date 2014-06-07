// ==UserScript==
// @name           Hotmail Hebrew Encoding
// @namespace      urn:rotemliss:greasemonkey:scripts:hotmailhebrewencoding
// @description    Set Hotmail Encoding to Hebrew
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/HoTMaiL*
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/getmsg*
// @include        http://by*fd.bay*.hotmail.msn.com/cgi-bin/compose*
// ==/UserScript==

(function() {
	// Core code created by Liron Newman, http://eesh.net
	// Some code improvements for core by Rotem Liss
	// Other code by Rotem Liss

	function fixEnglishToHebrew( element ) {
		// Created by Liron Newman, http://eesh.net
		// Some code improvements by Rotem Liss
		var html = element.innerHTML;
		html = html.replace( /╬/g, "־" );
		html = html.replace( /à/g, "א" );
		html = html.replace( /á/g, "ב" );
		html = html.replace( /â/g, "ג" );
		html = html.replace( /ã/g, "ד" );
		html = html.replace( /ä/g, "ה" );
		html = html.replace( /å/g, "ו" );
		html = html.replace( /æ/g, "ז" );
		html = html.replace( /ç/g, "ח" );
		html = html.replace( /è/g, "ט" );
		html = html.replace( /é/g, "י" );
		html = html.replace( /ê/g, "ך" );
		html = html.replace( /ë/g, "כ" );
		html = html.replace( /ì/g, "ל" );
		html = html.replace( /í/g, "ם" );
		html = html.replace( /î/g, "מ" );
		html = html.replace( /ï/g, "ן" );
		html = html.replace( /ð/g, "נ" );
		html = html.replace( /ñ/g, "ס" );
		html = html.replace( /ò/g, "ע" );
		html = html.replace( /ó/g, "ף" );
		html = html.replace( /ô/g, "פ" );
		html = html.replace( /õ/g, "ץ" );
		html = html.replace( /ö/g, "צ" );
		html = html.replace( /÷/g, "ק" );
		html = html.replace( /ø/g, "ר" );
		html = html.replace( /ù/g, "ש" );
		html = html.replace( /ú/g, "ת" );
		element.innerHTML = html;
	}

	function fixHebrewToEnglish( element ) {
		// Originally created by Liron Newman, http://eesh.net
		// Some code improvements and changes by Rotem Liss
		var html = element.value;
		html = html.replace( /־/g, "╬" ); 
		html = html.replace( /א/g, "à" );
		html = html.replace( /ב/g, "á" );
		html = html.replace( /ג/g, "â" );
		html = html.replace( /ד/g, "ã" );
		html = html.replace( /ה/g, "ä" );
		html = html.replace( /ו/g, "å" );
		html = html.replace( /ז/g, "æ" );
		html = html.replace( /ח/g, "ç" );
		html = html.replace( /ט/g, "è" );
		html = html.replace( /י/g, "é" );
		html = html.replace( /ך/g, "ê" );
		html = html.replace( /כ/g, "ë" );
		html = html.replace( /ל/g, "ì" );
		html = html.replace( /ם/g, "í" );
		html = html.replace( /מ/g, "î" );
		html = html.replace( /ן/g, "ï" );
		html = html.replace( /נ/g, "ð" );
		html = html.replace( /ס/g, "ñ" );
		html = html.replace( /ע/g, "ò" );
		html = html.replace( /ף/g, "ó" );
		html = html.replace( /פ/g, "ô" );
		html = html.replace( /ץ/g, "õ" );
		html = html.replace( /צ/g, "ö" );
		html = html.replace( /ק/g, "÷" );
		html = html.replace( /ר/g, "ø" );
		html = html.replace( /ש/g, "ù" );
		html = html.replace( /ת/g, "ú" );
		element.value = html;
	}

	function submitComposeForm( e ) {
		// Fix Subject
		document.getElementById( "alternateSubject" ).value = document.getElementById( "subject" ).value;
		fixHebrewToEnglish( document.getElementById( "alternateSubject" ) );

		// Fix body
		document.getElementById( "alternateBody" ).value = document.getElementById( "body" ).value;
		fixHebrewToEnglish( document.getElementById( "alternateBody" ) );
	}

	if ( ( location.href.indexOf( "compose" ) == -1 ) && ( document.characterSet == "ISO-8859-1" ) ) {
		if ( document.characterSet == "ISO-8859-1" ) {
			if ( document.getElementById( "MsgTable" ) ) {
				fixEnglishToHebrew( document.getElementById( "MsgTable" ) );
				fixEnglishToHebrew( document.body.childNodes[14].firstChild.firstChild.firstChild.firstChild.firstChild );
			} else {
				fixEnglishToHebrew( document.body );
			}
		}
	} else {
		if ( document.characterSet == "ISO-8859-1" ) {
			document.getElementById("HMTB").firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[1].addEventListener( "mousedown", submitComposeForm, true );

			var alternateSubject = document.getElementById( "subject" ).cloneNode( true );
			alternateSubject.type = "hidden";
			alternateSubject.id = "alternateSubject";
			alternateSubject.name = "subject";
			document.forms["composeform"].appendChild( alternateSubject );
			document.getElementById( "subject" ).name = "";

			// Find body
			var textareas = document.getElementsByTagName( "textarea" );
			var i;
			for ( i = 1; i <= textareas.length; i++ ) {
				if ( textareas[i - 1].name == "body" ) {
					textareas[i - 1].id = "body";
					break;
				}
			}

			var alternateBody = document.getElementById( "body" ).cloneNode( true );
			alternateBody.style.display = "none";
			alternateBody.id = "alternateBody";
			alternateBody.name = "body";
			document.forms["composeform"].appendChild( alternateBody );
			document.getElementById( "body" ).name = "";
			
			document.getElementById( "body" ).style.direction = "rtl";
		}
	}
})();
