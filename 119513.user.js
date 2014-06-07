// ==UserScript==
// @name       Add Chat to the footer - GunZ
// @version    0.1
// @description  Made by Ali Darawshe 1.12.11
// @include    http://ae*.tribalwars.ae/*
// @copyright  2011+, GunZ - Ali Darawshe
// ==/UserScript==


var i = document.createElement( 'chat' );
i.innerHTML = '<a href="http://Tw-Chat.Com">&nbsp; - &nbsp; الدردشة &nbsp;&nbsp;</a>';
var d = document.getElementById( 'footer_left' );
d.appendChild( i );