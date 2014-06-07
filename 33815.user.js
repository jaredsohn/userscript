// ==UserScript==
// @name           Unlock Orkut Albums
// @namespace      http://greasemonkey.sitesbr.net
// @description    Allows viewing photos even with padlock
// @include        *.orkut.com*profile.aspx*
// ==/UserScript==

/*
 * Autor: Sergio Abreu - Brasil
 *
 * Criação: 23/12/2007
 * Updated: 24/12/2007 01:30h   ::  v 1.2 Bilingual - Português / Inglês
 *
 */

function waitToLoad(){

var db = document.body.innerHTML;
var lg = db.match(/"fotos"/) ? 1 : 0;

var msg = lg ? "Liberadas pelo Destrava Álbuns, by Sergio Abreu" : "Unlocked by Sergio Abreu's Unlock Album 

script";
var placa = lg ? "Fotos =]" : "Photos =]";
var voltar = lg ? "Voltar" : "Back";

if( db.match(/icn_privacy_private/)) {
address = location.href;
var s="", fo = db.match(/http.+medium.+\.jpg/)[0];
for( var i=1; i < 101; i++){
s += " + fo.replace(/medium/, 'milieu/' + i) + "'>";
}

var magica = "document.write(\"