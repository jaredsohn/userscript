// ==UserScript==
// @name           FaviconMod
// @namespace      FaviconMod
// @description    FaviconMod
// @include        *.travian.*
// ==/UserScript==

/* - - SETTAGGIO LINK FAVICON // PARTE MODIFICABILE DALL'UTENTE- - */
var server_ico ="http://forum.travian.it/images/travianvb4/statusicon/favicon.ico"; //ROSSO
var forum_ico = "http://img813.imageshack.us/img813/1169/travianforum.png"; // VERDE
var answer_ico ="http://img109.imageshack.us/img109/2425/traviananswers.png"; //BLU
//Un ringraziamento ad aress per le immagini in tinta diversa!
/* - - - - - - - FINE PARTE MODIFICABILE, GRAZIE - - - - - - - -  */

/* Tento di capire in quale pagina siamo */
var ubicazione ="non lo so";
indirizzo_locale = location.href;

//Provo a capire se siamo in qualche server
var tentativo_server = indirizzo_locale.substr(7,5);
var da_cercare= "s";
var count = 0;
for (var i = 0; i <= tentativo_server.length - da_cercare.length; i++)
{
    if (tentativo_server.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}
if(count > 0)
ubicazione = "server";


//Provo a capire se siamo in forum
var tentativo_forum = indirizzo_locale.substr(7,5)
if(tentativo_forum == "forum")
ubicazione = "forum";

//Provo a capire se siamo nelle answer
var tentativo_answer = indirizzo_locale;
tentativo_answer = indirizzo_locale.substr(7,9);
var da_cercare= "answer";
var count = 0;
for (var i = 0; i <= tentativo_answer.length - da_cercare.length; i++)
{
    if (tentativo_answer.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}
if(count > 0)
ubicazione = "answer";

/* MODIFICHIAMO IL LINK */
var nuova_ico = "boh";
switch(ubicazione){
case "server":
nuova_ico = server_ico;
break;
case "forum":
nuova_ico = forum_ico;
break;
case "answer":
nuova_ico = answer_ico;
break;

}
var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = nuova_ico;
    document.getElementsByTagName('head')[0].appendChild(link);