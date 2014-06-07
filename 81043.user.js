// ==UserScript==
// @name          script II debug
// @namespace     PadovaWifi login
// @description   invia i nostri dati (devono essere salvati con l'atocompletamento moduli del browser!!), e ristabilisce finalmente la connessione
// @include       https://login.padovawifi.it/cgi-bin/hotspotlogin.cgi?res=notyet*
// ==/UserScript==

setTimeout("document.getElementsByTagName('input')[6].onClick(), document.forms[0].submit()",2000);