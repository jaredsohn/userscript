// ==UserScript==
// @name refrtest
// @description learning testing
// @include *
// ==/UserScript==
var randomnumber=Math.floor(Math.random()*6);
setTimeout( "document.location.href=document.location.href", randomnumber*60000 );
