// ==UserScript==
// @name			Current page NOT indexed!
// @namespace		http://www.joostdevalk.nl/code/greasemonkey/current-page-indexed/
// @description		Shows a message if the current page has not been indexed by Google
// @include		*
// @exclude		http://www.google.*
// @exclude		http://google.*
// @exclude		http://search.yahoo.*
// ==/UserScript==

(function () {
	var url = window.location.href;
	GoogleCheck(url);
})();

function printBox(message) {
	var id = "currentpagespidered";
	div = document.createElement("div");
	div.id = id;
	div.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
	'text-align: center; width: 200px; margin-bottom: 5px; z-index: 100; background-color: #000; padding: 2px;">' +
	'<p style="margin: 2px 0; background-color: inherit; font: bold 10px Verdana; color: #fff; font-weight: bold;"> ' 
	+ message + '</p></div>';

	document.body.insertBefore( div, document.body.firstChild );
	window.setTimeout(
		function() {
			var div = document.getElementById( id );
			if ( div ) {
				div.parentNode.removeChild( div );
			}
		}
	, 7500 ); 
}

function GoogleCheck(url) {
	var url1 = "site:"+url;
	var url2 = exclude( url ).replace( /_/, "%5F" );
	var ch = strord(url1);
	var chSum = googleCH(ch);
	var newCh = googleNewCh(chSum);
	var myURL = "http://toolbarqueries.google.com/search?client=navclient-auto&ch=" + "6" + newCh + "&ie=UTF-8&output=XML&oe=UTF-8&q=site:" +url;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: myURL,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible; GoogleToolbar 2.0.114-big; Windows XP 5.1)',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			doc = responseDetails.responseText;
			if (doc.search("<R N=\"1\">") == -1) {
				printBox("Page has <b>NOT</b> been indexed by Google");
			}
		}
	});
}
 
function googleCH( url ) {
	var init = 0xE6359A60;
	var length = url.length;
	var a = 0x9E3779B9;
	var b = 0x9E3779B9;
	var c = 0xE6359A60;
	var k = 0;
	var len = length;
	var mixo = new Array();

	while( len >= 12 ) {
	   a += (url[k+0] +(url[k+1]<<8) +(url[k+2]<<16) +(url[k+3]<<24));
	   b += (url[k+4] +(url[k+5]<<8) +(url[k+6]<<16) +(url[k+7]<<24));
	   c += (url[k+8] +(url[k+9]<<8) +(url[k+10]<<16)+(url[k+11]<<24));
	   mixo = mix(a,b,c);
	   a = mixo[0]; b = mixo[1]; c = mixo[2];
	   k += 12;
	   len -= 12;
	}
	c += length;
	switch( len ) {
		case 11:
			c += url[k+10]<<24;
		case 10:
			c+=url[k+9]<<16;
		case 9 :
			c+=url[k+8]<<8;
		case 8 :
			b+=(url[k+7]<<24);
		case 7 :
			b+=(url[k+6]<<16);
		case 6 :
			b+=(url[k+5]<<8);
		case 5 :
			b+=(url[k+4]);
		case 4 :
			a+=(url[k+3]<<24);
		case 3 :
			a+=(url[k+2]<<16);
		case 2 :
			a+=(url[k+1]<<8);
		case 1 :
			a+=(url[k+0]);
	}
	mixo = mix( a, b, c );
	if( mixo[2] < 0 ) {
		return ( 0x100000000 + mixo[2] );
	} else {
		return mixo[2];
	}
}

function googleNewCh(ch ) {
	ch = ( ( ( ch / 7 ) << 2 ) | ( ( myfmod( ch,13 ) ) & 7 ) );
	prbuf = new Array();
	prbuf[0] = ch;
	for( i = 1; i < 20; i++ ) {
		prbuf[i] = prbuf[i-1] - 9;
	}
	ch = googleCH(c32to8bit( prbuf ), 80 );
	return ch;
}

function myfmod( x, y ) {
	var i = Math.floor( x / y );
	return ( x - i * y );
}

function c32to8bit( arr32 ) {
	var arr8 = new Array();
	
	for( i = 0; i < arr32.length; i++ ) {
		for( bitOrder = i * 4; bitOrder <= i * 4 + 3; bitOrder++ ) {
			arr8[bitOrder] = arr32[i] & 255;
			arr32[i] = zeroFill( arr32[i], 8 );       
		}
	}
	return arr8;
}
	 
function exclude( url ) {
	return escape(url).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27');
}

function strord(string) {
	var result = new Array();
	for(i = 0; i < string.length; i++ ) {
		result[i] = string[i].charCodeAt( 0 );
	}
	return result;
}	

function mix( a, b, c ) {
	a -= b; a -= c; a ^= (zeroFill( c, 13 ) );
	b -= c; b -= a; b ^= ( a << 8 );
	c -= a; c -= b; c ^= (zeroFill( b, 13 ) );
	a -= b; a -= c; a ^= (zeroFill( c, 12 ) );
	b -= c; b -= a; b ^= ( a << 16);
	c -= a; c -= b; c ^= (zeroFill( b, 5 ) );
	a -= b; a -= c; a ^= (zeroFill( c, 3 ) );
	b -= c; b -= a; b ^= ( a << 10);
	c -= a; c -= b; c ^= (zeroFill( b, 15 ) );
	var ret = new Array( (a), (b), (c) );
	return ret;
}

function zeroFill( a, b ) {
	var z = hexdec( 80000000 );
	if( z & a ) {
		a = a >> 1;
		a &= ~z;
		a |= 0x40000000;
		a = a >> ( b - 1 );
	}
	else {
		a = a >> b;
	}
	return (a);
 }

function hexdec( str ) {
	return parseInt( str, 16 );
}

function oc(a) {
	// Taken from http://www.snook.ca/archives/javascript/testing_for_a_v/
	var o = {};
	for(var i=0;i<a.length;i++) {
		o[a[i]]='';
	}
	return o;
}