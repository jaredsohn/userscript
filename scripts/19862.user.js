// Vendetta Side Notepad
// Versione 0.1 (forkato dalla versione 0.666 di Side Notepad)
// di Mondoscuro
// Posta elettronica: meATmondoscuroDOTit
// Si prega di non eliminare questa intestazione anche se decidete di modificare il file, grazie
//
// --------------------------------------------------------------------
// Modificato da: Hellview 
// --------------------------------------------------------------------
//
// Questo e' uno user script per Greasemonkey, che e' un'estensione
// del browser Firefox.
//
// Per installarlo e' necessario avere Greasemonkey installata. La si
// puo' trovare al seguente indirizzo:
//     http://greasemonkey.mozdev.org/
// Una volta installata l'estensione riavviare Firefox e visualizzare
// nuovamente questo script.
// Nel menu "Strumenti" di Firefox, ora ci sara' una nuova voce:
//     Install User Script
// Accettare la configurazione di default e installarlo.
//
// Per disinstallare questo script andare in
//     Strumenti->Manage User Scripts
// selezionare
//     Side Notepad 0.666
// e cliccare su
//     Uninstall
//
// Per farlo funzionare in tutti gli Universi nei quali si gioca
// aggiungere il dominio dei server di quegli Universi aprendo
//     Manage User Scripts...
// dal menu "Strumenti" di Firefox e selezionando "Add" alla voce
//     Included pages
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Vendetta Side Notepad 0.1
// @namespace Mondoscuro
// @description Aggiunge un notepad nella sidebar
// @include http://s*.vendetta1923.it/vendetta/*
// ==/UserScript==

function Get_Cookie(name) {
   var start = document.cookie.indexOf(name+"=");
   var len = start+name.length+1;
   if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
   if (start == -1) return null;
   var end = document.cookie.indexOf(";",len);
   if (end == -1) end = document.cookie.length;
   return decodeURIComponent(unescape(document.cookie.substring(len,end)));
} 

if(document.location.href.search(/\/frameblack\.html/i)>-1)
{

Notetext = Get_Cookie('oNotepad') ;

if (Notetext==null) {Notetext = GM_getValue("oNotepad","")}
else {GM_setValue("oNotepad",Notetext)};


var notepad = '<center><form name="form1" method="post" action="">\n' + 
'<div align="center"> <p> \n' + 
'<textarea style="border: 1px solid #CCC; background-color: #000; color: #FFF" name="notepadbox" rows="20" id="notepadbox">' + Notetext + '</textarea> <br> \n' + 
'<input name="save" type="submit" id="save" value="Salva" onClick="document.cookie =\'oNotepad\' + \'=\' + encodeURIComponent(notepadbox.value) + \';expires=NEVER\';"> \n' +
'</p> </div> </form></center>\n';

var yugi = document.createElement("div");

	document.body.appendChild(yugi);

	yugi.innerHTML = notepad;

 	yugi = null;

}
