// ==UserScript== 
// @name Countdown Bypasser 
// @version 1.0 
// @date 2009-08-27 
// @author alexandrius 
// @description Bypasses countdown in for free user in georgian file hosting websites 
// @include       http://bin.ge/*
// @include       http://www.bin.ge/*
// @include       http://link.ge/*
// @include       http://www.link.ge/*
// @include       http://allshares.ge/*
// @include       http://www.allshares.ge/*
// @include       http://www.myftp.ge/*
// @include       http://myftp.ge/*
// @include       http://www.up.jeje.ge/*
// @include       http://up.jeje.ge/*
// @include       http:/files.ge/*
// @include       http://www.files.ge/*
// @include       http://www.share.ge/*
// @include       http://share.ge/*
// ==/UserScript==

if ( typeof unsafeWindow === 'object' )
  unsafeWindow.timeout = 0;
else {
  document.addEventListener( 'DOMContentLoaded', function() {
    window.timeout = 0;
  }, false );
}