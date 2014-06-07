// ==UserScript==
// @name		1PPG-code.google.com
// @namespace	http://megacoder.com/gmscripts
// @include		http://code.google.com/*
// @include		https://code.google.com/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @version     1.0.1
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

window.addEventListener( "load",
        function()  {
            $("pre tr:nth-child(odd)").css(  'background', '#DDEEDD' );
            $("pre tr:nth-child(even)").css( 'background', '#EEEEEE' );
        },
        false
);
// vi: noet sw=4 ts=4
