// ==UserScript==
// @name           Pokec.sk - Blokovac miniprofilu
// @namespace      pokec.sk, pokec, chat, skryvac, sklo, nove, blokovac, miniprofil
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @date           2012-01-04
// @author         MerlinSVK
// @version        1.2
// ==/UserScript==
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.charset = "utf-8";
newScript.id = "blokovac";
newScript.src = "data:application/x-javascript;base64,JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXskKCcjc2tsbyBhLmZvdGthLCAjc2tsbyBwID4gYSwgI3BhcmFwZXQgdWwuem96bmFtID4gbGkgPiBhLmF2YXRhciwgI3BhcmFwZXQgdWwuem96bmFtID4gbGkgPiBhLnByZXp5dmthJykuZGllKCk7fSk7";
headID.appendChild(newScript);