// ==UserScript==
// @name           egy
// @description    egy
// @include        http://web1.pokefarm.org/lab
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
// list of buttons
////if (TargetSink.length)
var TargetLink              = $("a:contains('ellow')");

if (TargetLink.length)
{
alert("Found It");
} 