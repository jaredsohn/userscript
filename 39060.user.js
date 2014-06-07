// ==UserScript==
// @name		Mobile.de Mapper
// @namespace	mobile.de
// @include	http://*.mobile.de/fahrzeuge/showDetails*
// @include	http://*.mobile.de/fahrzeuge/details*
// @author		Sebastian Bauer <sbauer@gjl-network.net>
// ==/UserScript==

divs = document.getElementsByTagName('div');

for( var i = 0; i<divs.length; i++ ) {
	if( divs[i].getAttribute('class') != 'detailtext' ) {
		continue;
	}
	var startPos = divs[i].innerHTML.search( /[0-9]{5} \w+/ );
	if( startPos == -1 )
		continue;
	
	var endPos = divs[i].innerHTML.indexOf( '<br>', startPos );
	var streetStartPos = divs[i].innerHTML.lastIndexOf(">",startPos-4);
	
	var street = divs[i].innerHTML.substring( streetStartPos, startPos-4).replace( /\s{2,}/, "" );
	
	var address = divs[i].innerHTML.substring( startPos, endPos );
	
	if( street.search( /\w+/ ) != -1 ) {
		var replaceStartPos		= streetStartPos;
		var replaceText			= street+"<br />"+address;
		var replaceUrl			= street.replace(/\s/, "+")+address.replace(/\s/, "+");
	} else {
		var replaceStartPos		= startPos;
		var replaceText			= address;
		var replaceUrl			= address.replace(/\s/, "+");
	}
	
	divs[i].innerHTML = divs[i].innerHTML.substring( 0, replaceStartPos ) + 
			"<a href=\"http://maps.google.de/maps?f=q&geocode=&q="+replaceUrl+"\" target=\"_blank\">"+replaceText+"</a>" + 
			divs[i].innerHTML.substring( endPos, divs[i].innerHTML.length );
	break;
}