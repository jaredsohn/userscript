// ==UserScript==
// @name           dynamo_stina
// @namespace      jaro_kish_771002
// @description    Extra features for  dynamo kiev guestbook (v1.0)
// @include        http://old.dynamo.kiev.ua/gb/*
// @version        09.04.24-1804
// ==/UserScript==

/*
Script Name: Javascript Cookie Script
Author: Public Domain, with some modifications
Script Source URI: http://techpatterns.com/downloads/javascript_cookies.php
Version 1.1.1
Last Update: 4 October 2007

Changes:
1.1.1 fixes a problem with Get_Cookie that did not correctly handle case
where cookie is initialized but it has no "=" and thus no value, the 
Get_Cookie function generates a NULL exception. This was pointed out by olivier, thanks

1.1.0 fixes a problem with Get_Cookie that did not correctly handle
cases where multiple cookies might test as the same, like: site1, site

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
*/

// this fixes an issue with the old method, ambiguous values 
// with this test document.cookie.indexOf( name + "=" );

// To use, simple do: Get_Cookie('cookie_name'); 
// replace cookie_name with the real cookie name, '' are required
function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) 
	{
		return null;
	}
}

/*
only the first 2 parameters are required, the cookie name, the cookie
value. Cookie time is in milliseconds, so the below expires will make the 
number you pass in the Set_Cookie function call the number of days the cookie
lasts, if you want it to be hours or minutes, just get rid of 24 and 60.

Generally you don't need to worry about domain, path or secure for most applications
so unless you need that, leave those parameters blank in the function call.
*/
function Set_Cookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	// if the expires variable is set, make the correct expires time, the
	// current script below will set it for x number of days, to make it
	// for hours, delete * 24, for minutes, delete * 60 * 24
	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	}
	//alert( 'today ' + today.toGMTString() );// this is for testing purpose only
	var expires_date = new Date( today.getTime() + (expires) );
	//alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
		( ( path ) ? ";path=" + path : "" ) + 
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
			( ( path ) ? ";path=" + path : "") +
			( ( domain ) ? ";domain=" + domain : "" ) +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function stinaId(x)
{
	if ( x.nodeValue != null && x.nodeValue.indexOf('N: ',0)==0 ) {
		var id = x.nodeValue.substring(3);
		return id;
	}
	return 0;
}

// ignore trash 
if (document.URL.match('trash.pl'))
	return;
	
var sLastTopId = 'stina_last_id';

if ( document.URL.match('kurilka.pl') )
	sLastTopId = 'kurilka_last_id';

var bq = document.getElementsByTagName('blockquote');

var topId = 0;
var lastTopId = Get_Cookie(sLastTopId);
//var lastTopId = GM_getValue(sLastTopId);
if (lastTopId == null)
	lastTopId = 0;

var prevHR = null;
for (var i=0; i<bq.length; ++i)
{
	var child = bq[i].childNodes[1];
	if (child.nodeName.toLowerCase() != 'strong') {
		GM_log('unexpected child of blocquote - ' + child.nodeName);
		continue;
	}

	var count = 0;
	var id = 0;
	while ( !(id=stinaId(child)) )
	{
		if (child.childNodes < 1)
			break;

		child = child.childNodes[0];
		if (++count>10) {
			GM_log('cannot find post ID, exceeded allowed iteration count');
			break;
		}
	}

	if (id == 0)
		continue;
	
	if (topId == 0)
		topId = id;
	
	var fontnode = child.parentNode.parentNode;
	if (fontnode.nodeName != null && fontnode.nodeName.toLowerCase() != 'font') {
		GM_log('font node expected instead of ' + fontnode.nodeName);
		continue;
	}

	var color = id > lastTopId ? 'MidnightBlue' : 'Brown';
	fontnode.setAttribute('color', color);

	// add links to found urls
	for (var j=0; j<bq[i].childNodes.length; ++j)
	{
		var tt = bq[i].childNodes[j];
		if (tt == null) continue;

		if (tt.nodeName.toLowerCase() == 'hr') {
			if (id == lastTopId && prevHR != null) {
				prevHR.setAttribute('size', 5);
				prevHR.setAttribute('color', "Indigo");
			}
			prevHR = tt;
			continue;
		}

		if (tt.nodeName.toLowerCase() != '#text' || tt.nodeValue == null)
			continue;

		// look for start of url
		start = tt.nodeValue.indexOf('http', 0);
		if (start < 0)
			continue;

		// look for end of url
		var end = tt.nodeValue.indexOf(' ', start);
		if (end < 0)
			end = tt.nodeValue.indexOf('\n', start); 

		if (end < 0) {
			if (tt.nodeValue.charAt(tt.nodeValue.length-2) == ')')
				end--;
		}
		else if (tt.nodeValue.charAt(end-1) == ')')
			end--;

				

		var strUrl = '';
		if (end<0) // entire text is an url
			strUrl = tt.nodeValue.substring(start);
		else
			strUrl = tt.nodeValue.substring(start, end);

		// for debug purpose
		//var go = confirm(i + ',' + j + ': ' + strUrl);
		//if (go == false) break;
		
		// replace the text by two texts and a link inside

		var nextSbl = tt.nextSibling;
  		bq[i].removeChild(tt);

		// insert link
		var link = document.createElement('a');
		link.href = strUrl;
		link.textContent = strUrl;
		link.target = '_blank';
		if (nextSbl == null)
			bq[i].appendChild(link)
		else
			bq[i].insertBefore(link, nextSbl);

		// insert first part of text
		var txt1 = document.createTextNode(tt.nodeValue.substring(0, start));
		bq[i].insertBefore(txt1, link);

		// insert second part of text
		if (end > -1)
		{
			var txt2 = document.createTextNode(tt.nodeValue.substring(end));
			if (nextSbl == null)
				bq[i].appendChild(txt2);
			else
				bq[i].insertBefore(txt2, nextSbl);
			j++; // avoid parse the same url again
		}
	}
}

Set_Cookie(sLastTopId, topId);
//GM_setValue(sLastTopId, topId);

