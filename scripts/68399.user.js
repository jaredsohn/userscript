// ==UserScript==
// @name           Buscador de Casos
// @namespace      LordNeo
// @description    Busca casos Root, Nuevos y Propios dentro de la cola
// @include        http://support.dsd.ro:5050/otrs-bitdefender/index.pl?Action=AgentTicketQueue*
// ==/UserScript==
if (document.body.innerHTML.indexOf("root@localhost")>-1) {alert("Hay un caso ROOT!");}
else if (document.body.innerHTML.indexOf("nuevo /")>-1) {alert("Hay un caso NUEVO!");}
// Reemplazalo con tu correo -------------vvvvvvvv
else if (document.body.innerHTML.indexOf("gcordero@bitdefender.es")>-1) {
var allDivs;
// Reemplazalo con tu correo --------------vvvvvvvv
allDivs = document.evaluate("//div[@title='gcordero@bitdefender.es']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	alert("Te respondieron un caso!");
	break;
	}
}
else end;