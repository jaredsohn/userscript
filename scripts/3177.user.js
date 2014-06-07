// Greasemonkey script: craigslist PRO skin
// Copyright (c) 2006, Joseph Purcell

// This script is distributed without warranties of any kind whatsoever,
// to the extend allowed by applicable law. The
// author is not responsible for damages resulting from its use.

// This script reskins craigslist. Hope you like it.

// ==UserScript==
// @name                Craigslist PRO skin
// @author		Joseph Purcell
// @namespace		http://scriptdrips.blogspot.com/
// @date		2006-2-10
// @description         Change look & feel of craigslist front pages
// @include             http://*.craigslist.org/
// ==/UserScript==


function addGlobalStyle(css) {

	styleTag = document.getElementsByTagName( 'style' )[0];
	styleTag.innerHTML = styleTag.innerHTML + css;

}


// Announce PRO
document.body.innerHTML = document.body.innerHTML.replace( '<a href="/about/cities.html">craigslist</a>', '<a href="/about/cities.html">craigslist</a><br><div style="font-size:10pt">PRO</div>' );

// Add class info
document.body.innerHTML = document.body.innerHTML.replace( 'summary="forums"', 'summary="forums" class="for"' );
tables = document.getElementsByTagName( 'table' );
for ( i = 0; i < tables.length; i++ )
{
	if ( tables[i].summary == 'post' )
	{
		tables[i].parentNode.className = "lefth";
		tables[i].parentNode.id = "lefth";
	}
}

// Change style
addGlobalStyle( ' .w2, .for       { border: solid #551105 2px; background-color: #EEEEEE; margin-bottom: 10px } ' );
addGlobalStyle( ' .w2 td, .w2     { background: #FFFFFF; font-family: Verdana, sans-serif; font-size: 8pt } ' );
addGlobalStyle( ' .for td, .for   { background: #FFFFFF; font-family: Verdana, sans-serif; font-size: 7pt } ' );
addGlobalStyle( ' .ban            { font-family: Verdana, Arial, sans-serif; font-size: 9pt ! important; text-transform: uppercase; text-align: left ! important; padding: 3px; background-color: #DDDDDD ! important }' );
addGlobalStyle( ' .ban a	  { background: #DDDDDD ! important } ' );
addGlobalStyle( ' .w2 td a	  { margin-top: 3px } ' );
addGlobalStyle( ' a:hover         { text-decoration: none; color: #993333 ! important} ' );
addGlobalStyle( ' a:visited       { color: rgb(0,0,238) } ' );
addGlobalStyle( ' .city           { border: solid #551105 2px; background-color: #EEEEFF; padding: 5px; margin-left: 10px } ' );
addGlobalStyle( ' .lefth          { border: solid #551105 2px; background-color: #AAAABB } ' );
addGlobalStyle( ' .cal            { border: solid #551105 2px; background-color: #EEEEEE } ' );
addGlobalStyle( ' .cal td:hover   { background-color: #FFFFDD } ' );


// Particular element styles
tables[1].getElementsByTagName( 'td' )[2].style.backgroundColor = '#AAAABB';
lefth = document.getElementById( 'lefth' );
tables = lefth.getElementsByTagName( 'table' );
tables[0].style.backgroundColor = '#EEEEEE';
tables[0].style.border = 'solid #551105 2px';
tables[0].style.width = '87.5%';
tables[0].style.marginTop = '10px';
tables[1].style.border = 'solid #551105 2px';
tables[1].style.backgroundColor = '#EEEEEE';
tables[1].getElementsByTagName( 'td' )[0].style.backgroundColor = '#EEEEEE';
tables[2].style.backgroundColor = '#EEEEEE';
tables[2].getElementsByTagName( 'div' )[0].style.backgroundColor = '#CCCCCC';
tables[2].getElementsByTagName( 'div' )[0].style.color = '#0000EE';
tables[4].style.margin = '5px';
tables[4].style.border = 'solid #551105 2px';
tables[4].style.backgroundColor = '#EEEEEE';


// Remove spaces in table headers
var ths, th, i, j, rep;
ths = document.getElementsByTagName('th');
for ( i = 0; th = ths[i]; i++ )
{
	if (th.className == 'ban') 
	{
		j = 1;
		while (j)
		{
			rep = th.innerHTML.replace('&nbsp;','');
			if (rep == th.innerHTML) j = 0;
			else th.innerHTML = rep;
		}
	}
}
