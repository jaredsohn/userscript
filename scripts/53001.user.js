// ==UserScript==
// @name           autouzenet
// @namespace      erepmarket.co.cc/sanya18
// @include        http://www.erepublik.com/en/messages/compose/*
// ==/UserScript==

var uzenet;
cim = "uzenet cime";
uzenet = "Ide ird be az uzenetet amit automatikusan be fog rakni a szövegdobozba";

document.getElementById("message_subject").value=cim;
document.getElementById("message_body").innerHTML = uzenet;