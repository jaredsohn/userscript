// ==UserScript==
// @name           Google calendar where map
// @namespace      http://www.fladder.se/greasemonkey/gcw
// @description    Swedish version of google calendar does not have a map link on an event location, put eniro.se and hitta.se links on events.
// @include	   http://www.google.*/calendar/*
// @include	   https://www.google.*/calendar/*
// ==/UserScript==
/*
Copyright (C) 2007 Matti Ryhanen.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

window.setInterval(
function() {
	if ( document.body.getAttribute( "class" ) != "sv" ) 
		return;

	var elm = document.getElementById( 'ff-where' );
	
	if ( elm ) {
		var h3 = (elm.getElementsByTagName("h3"))[0];
		var whereField = document.getElementById( 'where' );
		var hitta = document.getElementById( 'hitta-se-link' );
		var eniro = document.getElementById( 'eniro-se-link' );

		if ( h3 && whereField ) {
			if ( whereField.value != "" ) {
				if ( !hitta )
					h3.appendChild(  createLinkElement( "http://www.hitta.se/SearchCombi.aspx?SearchType=4&UCSB:WflPink=4a&UCSB:TextBoxWhere=" + escape(whereField.value), "hitta-se-link", "http://www.hitta.se/favicon.ico" ) );
				else 
					hitta.href = "http://www.hitta.se/SearchCombi.aspx?SearchType=4&UCSB:WflPink=4a&UCSB:TextBoxWhere=" + escape(whereField.value);

				if ( !eniro ) 
					h3.appendChild( createLinkElement( "http://kartor.eniro.se/query?what=map&mop=yp&mapcomp=;;;" +  escape(whereField.value), "eniro-se-link", "http://www.eniro.se/favicon.ico" ) );
				else 
					eniro.href = "http://kartor.eniro.se/query?what=map&mop=yp&mapcomp=;;;" + escape(whereField.value);
			}
			else {
				if ( eniro ) 
					h3.removeChild( eniro );
				if ( hitta )
					h3.removeChild( hitta );
				
			}
		}
	}
	var info = document.getElementById( 'infowindow' );
	if ( info ) {
		var data = info.innerHTML;
		var pattern = /<div style="width: 23em;"><font size="-1"><b>(.+?):<\/b>(.+?)<\/font><\/div>/;
		if ( pattern.test( data ) ) {
			var arr = pattern.exec( data );

			var hitta = document.getElementById( 'hitta-se-info' );
			var eniro = document.getElementById( 'eniro-se-info' );
			var mtb = document.getElementById( 'mtb' );
			
			if ( !hitta ) 
				mtb.insertBefore( createLinkElement( "http://www.hitta.se/SearchCombi.aspx?SearchType=4&UCSB:WflPink=4a&UCSB:TextBoxWhere=" + escape(arr[2]), "hitta-se-info", "http://www.hitta.se/favicon.ico" ), mtb.firstChild );
			else
				hitta.href = "http://www.hitta.se/SearchCombi.aspx?SearchType=4&UCSB:WflPink=4a&UCSB:TextBoxWhere=" + escape(arr[2]);

			if ( !eniro ) 
				mtb.insertBefore( createLinkElement( "http://kartor.eniro.se/query?what=map&mop=yp&mapcomp=;;;" + escape(arr[2]), "eniro-se-info", "http://www.eniro.se/favicon.ico" ), mtb.firstChild );
			else 
				eniro.href = "http://kartor.eniro.se/query?what=map&mop=yp&mapcomp=;;;" + escape(arr[2]);
		}
	}
},
500 );

function createLinkElement( href, id, icon ) {
	var a = document.createElement( "a" );
	a.href = href;
	a.id = id;
	a.setAttribute( "target", "_blank" );
	a.innerHTML = " <img src='"+icon+"' height='16' width='16'> ";
	return a;
}
