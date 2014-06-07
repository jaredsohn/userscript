// ==UserScript==
// @name       Add Chat to the footer - GunZ
// @version    0.1
// @description  Made by Ali Darawshe 1.12.11
// @include    http://ae*.tribalwars.ae/*
// @copyright  2011+,police sfa7 - Ali Darawshe
// ==/UserScript==


var i = document.createElement( 'speed' );
i.innerHTML = '<a href="http://www.tribalwars.ae/sds_rounds.php?mode=future">&nbsp; - &nbsp; جولة السرعة &nbsp;&nbsp;</a>';
var d = document.getElementById( 'footer_left' );
d.appendChild( i );