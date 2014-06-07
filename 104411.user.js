// ==UserScript==
// @name           CuraNabber
// @namespace      CuraNabber
// @include        http://*.travian.*/*
// ==/UserScript==
lista_parole = new Array(); //creo la struttura che conterrà le varie frasi


/* MODIFICABILE DALL'UTENTE */
var frequenza=6; //più e alta, meno spesso appariranno i messaggi. Il minimo dev'essere 6.
sito_alternativo = "http://faccinator.fungoecacca.it/"; //inserisci uno dei siti che ami più di travian (:O!)

//Ora si inseriscono le varie frasi! Potete aggiungerne altre tranquillamente!
lista_parole.push('Sei sicuro di non star giocando da troppo tempo?');
lista_parole.push('Cosa direbbe la tua fidanzata se ti vedesse sempre attaccato a questo villaggio?');
lista_parole.push('Fuori ci potrebbe essere il sole, ma tu sei sempre qui, chiuso a giocare!');
lista_parole.push('Sei un nerdellone! Esci e va a trovarti degli amici!');
lista_parole.push('I ragazzi normali vanno sui siti porno alla tua eta. Tienilo a mente.');
/* ------------------------ */

if(frequenza < 6)
frequenza = 6;
var randomnumber=Math.floor(Math.random()*frequenza)
if(randomnumber == 0)
{
var frasina=Math.floor(Math.random()*lista_parole.length)
var answer = confirm(lista_parole[frasina]);
if (answer)
window.location = sito_alternativo;
}

