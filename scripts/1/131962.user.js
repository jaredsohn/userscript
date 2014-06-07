// ==UserScript==
// @name Skiplimites - Lien mixture
// @description Skiplimites : Lien spÃ©cial mixturecloud
// @author Firnox & Vulze
// @website http://www.skiplimites.eu/
// @include *mixturecloud.com/media/*
// @include *putlocker.com/file/*
// @include *purevid.com/v/*
// ==/UserScript==


var test = window.location.href;
var tt = this.document.body;
var t = tt.innerHTML;
var po = document.createElement("a");
var url2 =""+this.location+"";

var urr2 = "http://skiplimites.eu/autres.php?url=" + url2 + " " ;

po.tagName = 'a';
var pa = tt.getElementsByClassName("header-right-links")[0];
po.href = urr2;
po.target = "_blank";
po.innerHTML = "Debrider avec Skiplimites.eu";
pa.appendChild(po);