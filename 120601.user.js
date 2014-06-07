// ==UserScript==
// @name		Orion Sucks
// @namespace	http://www.megacoder.com
// @description Use monospace for the body so text comes out right
// @include     http://support.us.oracle.com/oip/faces/secure/srm/srview/*
// @include     https://support.us.oracle.com/oip/faces/secure/srm/srview/*
// @require     http://code.jquery.com/jquery-1.8.0.min.js
// @run-at		document-end
// @version		1.0.2
// ==/UserScript==

$(document).ready(function() {
	(function(font) {
		var     head  = document.getElementsByTagName('head')[0];
		var     link  = document.createElement('link');
		var     style = document.createElement('style');
		var     fonty = document.createTextNode(
			'body * { font-family: "' + font.family + '", monospace, arial, sans-serif !important; -moz-user-select: text !important; -moz-user-select: text !important }'
		);
		link.rel  = 'stylesheet';
		link.href = 'https://fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
		head.appendChild(link);
		style.styleSheet ? style.styleSheet.cssText = fonty.nodeValue : style.appendChild(fonty);
		head.appendChild(style);
	})({ family:'Droid Sans Mono', style:['400','700'] });

	$('DIV.dijitTitlePaneTextNode').css( '-moz-user-select: text !important' );
	if( ! $('#input#HIAcknowledge').checked )	{
		var click = document.createEvent( "MouseEvents" );
		click.initEvent( "click", true, false );
		$('input#HIAcknowledge' ).dispatchEvent(click);
	}

	var	odmTrain = document.getElementsByClassName( 'odmTrain' );
	var	rainbow = new Array(
		'#806080',
		'#807080',
		'#808080',
		'#809080',
		'#80A080',
		'#80B080',
		'#80C080',
		'#80D080',
		'#80E080',
		'#80F080'
	);
	for( var i = 0; i < rainbow.length; ++i )	{
		alert( rainbow[i] );
		odmTrain[i].css( 'background-color', rainbow[i] );
	}
});

// vim: noet sw=4 ts=4 ff=unix

