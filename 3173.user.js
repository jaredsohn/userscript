// Greasemonkey script: craigslist pic-only filter (1.0)
// Copyright (c) 2006, Joseph Purcell
// Released under the GNU General Public Licence.
// Visit http://www.gnu.org/copyleft/gpl.html for a copy of said licence.



// ==UserScript==
// @name                craigslist pic-only filter
// @author		Joseph Purcell
// @namespace		http://scriptdrips.blogspot.com/
// @description         Add 'Hide listings without pictures' option to craigslist
// @include             http://*.craigslist.org/*
// @exclude             http://*.craigslist.org/
// @date		2006-2-10
// @version		1.0.2
// ==/UserScript==

// NOTE: In addition to adding the option to hide listings without pictures,
// this script changes the style of the listings to what I believe to be a 
// more readable font. It's just how I like it. If you don't, then don't get
// angry, just change "var newStyle = 1" to "var newStyle = 0".

var newStyle = 1;


// Make sure we've got a listings page (sloppy method)
if (( document.body.innerHTML.indexOf('catAbbreviation') > -1 ) &&
    ( document.body.innerHTML.indexOf('areaID') > -1 ) &&
    ( document.body.innerHTML.indexOf('subAreaID') > -1 ) &&
    ( document.body.innerHTML.indexOf('Nothing found for that search') == -1 ))
{

// STYLE START
if (newStyle) {

function addGlobalStyle(css) {

	styleTag = document.getElementsByTagName( 'style' )[0];
	styleTag.innerHTML = styleTag.innerHTML + css;


}


// Change style of listings

addGlobalStyle( ' p { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10pt; text-decoration: none } ' );

}
// STYLE STOP

// Pics only

document.noPicHide = function ( hide ) {

	ps = document.getElementsByTagName( 'p' );
	for ( i = 0; i < ps.length; i++)
	{
		span = ps[i].getElementsByTagName( 'span' )[0];
		nxt  = ps[i].innerHTML.indexOf( 'next 100 postings' );
		if ( ( !span || span.innerHTML == '' ) && ( nxt == -1 ) )
		{
			if (hide) ps[i].style.display = 'none';
			else ps[i].style.display = 'block';
		}
	}
}

document.myHandler1 = function (event) { 

	document.noPicHide(1);
	document.getElementById('hideOn').style.fontWeight = 'bold';
	document.getElementById('hideOff').style.fontWeight = 'normal';
	return true; 
}

document.myHandler2 = function (event) { 

	document.noPicHide(0);
	document.getElementById('hideOn').style.fontWeight = 'normal';
	document.getElementById('hideOff').style.fontWeight = 'bold';
	return true; 
}

// Take date headings out of <p> elements
ps = document.getElementsByTagName( 'p' );
for ( i = 0; i < ps.length; i++ )
{
	t = ps[i].getElementsByTagName( 'table' )[0];
	if (t)
	{
		ps[i].removeChild( t );
		ps[i].parentNode.insertBefore( t, ps[i].nextSibling );
	}
}

newDiv = document.createElement( 'div' );
newDiv.style.fontFamily = 'Verdana, Arial, Helvetica, sans-serif';
newDiv.style.fontSize = '10pt';
newDiv.style.fontWeight = 'bold';
newDiv.innerHTML =      'Hide listings without pictures: &nbsp;';

a1 = document.createElement( 'a' );
a1.id = 'hideOn';
a1.href = 'javascript:void();';
a1.innerHTML = 'ON';
a1.style.color = 'orange';
a1.style.textDecoration = 'none';
a1.style.fontWeight = 'normal';
a1.style.marginRight = '5px';
a1.addEventListener( 'click', document.myHandler1, true )
newDiv.appendChild( a1 );

a2 = document.createElement( 'a' );
a2.id = 'hideOff';
a2.href = 'javascript:void();';
a2.innerHTML = 'OFF';
a2.style.color = 'orange';
a2.style.textDecoration = 'none';
a2.style.fontWeight = 'bold';
a2.addEventListener( 'click', document.myHandler2, true );
newDiv.appendChild( a2 );

newDiv.appendChild( document.createElement( 'br' ) );
newDiv.appendChild( document.createElement( 'br' ) );

// Find correct position
ts = document.getElementsByTagName( 'table' );
if ( location.href.indexOf( 'cgi-bin' ) == -1 ) ts[3].parentNode.insertBefore( newDiv, ts[3] );
else ts[2].parentNode.insertBefore( newDiv, ts[2] );

} // end if
