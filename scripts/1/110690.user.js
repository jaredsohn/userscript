// ==UserScript==
// @name           Notificami
// @namespace      Notificami
// @description    Piccolo script che ti avverte quando hai una notifica e ti costringe a processarla.
// @include        http://forum.travian.it/*
// @include        http://forum.travian.*
// @exclude        http://forum.travian.it/private.php
// @exclude        http://forum.travian.it/usercp.php
// @exclude        http://forum.travian.it/private.php*
// @exclude        http://forum.travian.it/usercp.php*
// @exclude        http://forum.travian.it/profile.php?do=buddylist
// @exclude        http://forum.travian.it/profile.php?do=buddylist#irc
// @exclude        http://forum.travian.it/profile.php?*
// ==/UserScript==

//Implemento della funzione getElementsByClass
function getElementsByClass( searchClass, domNode, tagNames) {
	if (domNode == null) domNode = document;
	if (tagNames == null) tagNames = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagNames);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

//Link da aprire quando si ha delle notifiche
destinazione = "http://forum.travian.it/usercp.php";

//Implemento della funzione che avviserà l'utente delle notifiche
function avvia_procedura(numero)
{
//Italianizziamoci
if(numero<2)
messaggio = "Hai una notifica da leggere! Cosa aspetti?";
else
messaggio = "Hai " + numero + " notifiche da leggere! Cosa aspetti?";

//Ritocchi grafici
elemento = getElementsByClass('notifications-number');
elemento[0].style.marginRight="30px";
elemento[0].style.marginLeft="30px";
elemento[0].style.color="yellow";
elemento[0].textContent = ">>>  " + elemento[0].textContent + "  <<<";

//Faccio comparire il messaggio
alert(messaggio);
//Apro la nuova pagina
window.location = destinazione;
}

//Estraggo l'elemento con cui lavorare
elemento = getElementsByClass('notifications-number');
//Controllo se ci sono notifiche
if(elemento[0].textContent > 0)
{
avvia_procedura(elemento[0].textContent);
}
