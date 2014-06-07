// ==UserScript==
// @name          script II 
// @namespace     PadovaWifi login
// @description   invia i nostri dati (devono essere salvati con l'atocompletamento moduli del browser!!), e ristabilisce finalmente la connessione
// @include       https://login.padovawifi.it/cgi-bin/hotspotlogin.cgi?res=notyet*
// ==/UserScript==


var inp = document.getElementsByTagName("input");

alert(inp[4].value+" + "+inp[5].value);

delay(2000)

alert(inp[4].value+" + "+inp[5].value);

inp[6].onClick="";

document.forms[0].submit()