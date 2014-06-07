// ==UserScript==
// @name		TimeStamp Cartouche
// @namespace	http://www.MegaCoder.com
// @description adds a page-load timestamp cartouche in lower left corner.
// @require     http://code.jquery.com/jquery-1.8.0.min.js
// @exclude		http://www.google.com/reader/*
// @exclude		https://www.google.com/reader/*
// @include		http://*
// @include		https://*
// @include		file://*
// @version		3
// ==/UserScript==

if( top.location != location ) return;

$(document).ready( function() {
	var id  = 'TimeStampCartouche'
	var	now = new Date();
	var	h   = now.getHours();
	var	m   = now.getMinutes();
	var	div = document.createElement('div');

	div.id = id;
	div.setAttribute(
		'style',
		'position:fixed;' +
		'bottom:10px;' +
		'left:20px;' +
		'background-color:#203070;' +
		'color:#e3f6f6;' +
		'width:70px;' +
		'-moz-border-radius:10px;' +
		'border-radius: 10px;' +
		''
	);
	var	clicker = document.createAttribute( "onClick" );
	clicker.nodeValue = "document.getElementById('" + id + "').style.display = 'none';";
	div.setAttributeNode(clicker);

	if( m < 10 )	{
		m = '0' + m;
	}
	if( h < 10 )	{
		h = '0' + h;
	}

	div.innerHTML = '<div align="center">' + h + ':' + m + '</div>';

	document.body.appendChild( div );

});

// vim: noet sw=4 ts=4
