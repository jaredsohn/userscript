// ==UserScript==
// @name          MarcarArmazenarMensagensUOL
// @namespace     http://mozdev.uol.com.br/
// @description	  Marca arquivar mensagem automaticamente no Webmail do UOL
// @include       http://mail*.uol.com.br/*
// ==/UserScript==

( function () {
    if (document.formmail) {
			if (document.formmail.KeepCopy) {
				document.formmail.KeepCopy.checked = "checked";
			}
		}
} ) ();
