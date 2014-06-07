// ==UserScript==
// @name           BG/BRG Lichtenfels Manipulator
// @namespace      BotoX Soft
// @include        http://www.lichtenfels.at/*
// @include        http://linux1.lichtenfels.at/*
// @include        http://www.lichtenfels.asn-graz.ac.at/*
// @include        http://admin.supplierplan.at/*
// ==/UserScript==
var b=document.getElementsByTagName("body")[0];
b.innerHTML = (b.innerHTML).replace( /Lichtenfels/, 'Lolstein' );
b.innerHTML = (b.innerHTML).replace( /Tholen/, 'Lol' );
b.innerHTML = (b.innerHTML).replace( /Lehrer/, 'Idioten' );
b.innerHTML = (b.innerHTML).replace( /Online Supplierplan/, 'Schule Frei' );
var c=document.getElementsByTagName("frame")[0];
c.innerHTML = (c.innerHTML).replace( /Lehrer/, 'Idioten' );