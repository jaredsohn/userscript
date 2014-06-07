// ==UserScript==

// @name           ENCERRAMENTO DE TOPICOS FOI ENCERRADO.

// @namespace      http://mywebsite.com/myscripts

// @description    Imbecilidade, pra quê?

// @include        http://www.orkut.com/CommMsgs.aspx*

// ==/UserScript==

var coll = document.getElementsByTagName('TD');
for (var i = 0; i < coll.length; i++)
{
	var oTD = coll[i];
	var html = oTD.innerHTML.replace(/<BR>/gi, "<br>");

	while (html.indexOf("<br><br><br>") != -1)
		html = html.replace(/<br><br><br>/gi, "");

	oTD.innerHTML = html;
}