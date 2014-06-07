// ==UserScript==
// @name	1PPG-github
// @namespace	http://megacoder.com/gmscripts
// @include	http://github.com/*
// @include	https://github.com/*
// @description	Give code listings 1-part paper, green
// @author	jtr
// @require	http://code.jquery.com/jquery-1.9.1.min.js
// @version	1.0.8
// @run-at	document-end
// ==/UserScript==

var bg	  = 'background-color';
var dark  = '#DDEEDD';
var light = '#EEEEEE';

window.addEventListener( "load",
        function()  {
            $('pre > div:odd'  ).css( bg, dark );
            $('pre > div:odd'  ).children().css( bg, dark );
            $('pre > div:even' ).css( bg, light );
            $('pre > div:even' ).children().css( bg, light );
        },
        false
);

// vim: noet sw=8 ts=8
