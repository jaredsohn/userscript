// ==UserScript==
// @legend	   Modificado (original)
//==============================================================
// @name           Gmail Anexo Lembrador (Gmail attachment reminder)
// @namespace      (http://www.jonathanbrodsky.com/GMscripts)
// @description    Lembra quando você disse que iria anexar algo e não o fez.
// @include        http*://mail.google.com/mail/*
// ==/UserScript==
if(document.getElementById('send')){
	
	var sendbutton = document.getElementById('send')
	sendbutton.addEventListener('click', function(sendbutton){
		var messagebody = document.getElementById('ta_compose').value;

		//## Abaixo eu mudei 'attach' por 'seguem em anexo' ou 'segue anexo'.
		if(messagebody.match('seguem em anexo'||'segue anexo')){
			var fileattachments = document.getElementsByName('file0');
			if(!fileattachments[0]){
				//## Aqui eu traduzi a mensagem de erro
				if(confirm('Parece que você iria anexar algo.\n Enviar sem o anexo?')){
				}else{
					sendbutton.stopPropagation();
			    sendbutton.preventDefault();
				}
			}
		}
	}, true);
	
}
