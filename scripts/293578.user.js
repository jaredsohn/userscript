// ==UserScript==
// @name	1PPG-sourceforge.net
// @namespace	http://megacoder.com/gmscripts
// @include	http://sourceforge.net/*
// @include	https://sourceforge.net/*
// @include	http://sf.net/*
// @include	https://sf.net/*
// @include	http://*.sourceforge.net/*
// @include	https://*.sourceforge.net/*
// @include	http://*.sf.net/*
// @include	https://*.sf.net/*
// @description	Give code listings 1-part paper, green
// @author	jtr
// @require	http://code.jquery.com/jquery-1.9.1.min.js
// @version	1.0.0
// @run-at	document-end
// ==/UserScript==

var bg	  = 'background-color';
var dark  = '#DDEEDD';
var light = '#EEEEEE';

window.addEventListener( "load",
        function()  {
            $('div.codehilite pre > div:odd'  ).css( bg, dark );
            $('div.codehilite pre > div:odd'  ).children().css( bg, dark );
            $('div.codehilite pre > div:even' ).css( bg, light );
            $('div.codehilite pre > div:even' ).children().css( bg, light );
        },
        false
);

// vim: noet sw=8 ts=8
