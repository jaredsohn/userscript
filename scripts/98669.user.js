// ==UserScript==
// @author         dj_truco
// @name           Quitar Publicidad Yahoo
// @version 	   0.4
// @description    Quita la publicidad de la derecha de Yahoo
// @namespace      QPY
// @include        http://*.mail.yahoo.com/*
// ==/UserScript==

var oHead = document.getElementsByTagName( "head" )[0];
var oStyle = document.createElement( "style" );
oStyle.innerHTML = "#theAd { display: none !important; } ";
oStyle.innerHTML += "#paneshell #shellcontent { right: 0; } ";

// append style to head
oHead.appendChild( oStyle );