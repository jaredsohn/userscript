// ==UserScript==
// @name	1PPG-ebay
// @namespace	http://megacoder.com/gmscripts
// @include	http://www.ebay.com/*
// @include	https://www.ebay.com/*
// @description	Give code listings 1-part paper, green
// @author	jtr
// @require	http://code.jquery.com/jquery-1.9.1.min.js
// @version	1.0.10
// @run-at	document-end
// ==/UserScript==

var bg	  = 'background-color';
var dark  = '#DDEEDD';
var light = '#EEEEEE';

window.addEventListener( "load",
        function()  {
            $('div#ResultSetItems > table:odd'  ).css( bg, dark );
            $('div#ResultSetItems > table:even' ).css( bg, light );
        },
        false
);

// vim: noet sw=8 ts=8
