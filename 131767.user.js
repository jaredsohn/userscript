// ==UserScript==
// @name       Forum Ubuntu-IT by WebbyIT
// @namespace  http://forum.ubuntu-it.org/
// @description Miglioramenti vari per il Forum Ubuntu-IT
// @version    0.1.4
// @include    http://forum.ubuntu-it.org/*
// ==/UserScript==

/*
Project: Forum Ubuntu-IT by WebbyIT
Author: Riccardo Padovani <ricki.padovani@gmail.com>
Copyright: 2012 Riccardo Padovani
License: GPL-2+
This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation; either version 2 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
more details.

On Debian GNU/Linux systems, the full text of the GNU General Public License
can be found in the file /usr/share/common-licenses/GPL-2.
*/
//Funzione per aggiungere il titolo di una discussione nel menù in alto
function breadcrumb() {
    //Recuperiamo il titolo della pagina e il link
    var titolo_discussione = document.title; 
    var link_discussione = ''+document.location;
    //Il titolo della discussione è uguale al titolo della pagina tolto • Forum Ubuntu-it  
    titolo_discussione = titolo_discussione.replace("• Forum Ubuntu-it", "");
    //Eliminiamo dal link della pagina il riferimento assoluto e trasformiamolo in relativo, come gli altri href sul forum
    link_discussione = link_discussione.replace("http://forum.ubuntu-it.org", ".");

    //Struttura di base del menù in alto: div header -> div -> ul -> lunga serie di li -> a
    //Recuperiamo quindi l'ul del primo div del div header, e tutte le a (tralasciamo i li, sono inutili)
    var header = document.getElementById("header");
    var ul = header.getElementsByTagName("ul").item(0);
    var a = ul.getElementsByTagName("a");

    //Eliminiamo quindi la classe "active" all'a, per impostarla solo sull'ultimo. Bisogna fare i cicli for perché possono esserci più sottosezioni
    for(i = 0; i<a.length; i++){  
        if (a.item(i).getAttribute("href") == link_discussione) //Se il link è uguale a quello che stiamo per inserire, non lo inseriamo perché vuol dire che siamo in una sezione e non in una discussione
            return;
        if(a.item(i).getAttribute("class") == "active")
            a.item(i).setAttribute("class") == "none";
    }

    //Appendiamo alla fine il nome della discussione e il link
    var discussione_attuale = document.createElement("li");
    var link_discussione_attuale = document.createElement("a");
    var testo = document.createTextNode(titolo_discussione);
    link_discussione_attuale.appendChild(testo);
    link_discussione_attuale.setAttribute("class", "active");
    link_discussione_attuale.setAttribute("href", link_discussione);
    discussione_attuale.appendChild(link_discussione_attuale);
    ul.appendChild(discussione_attuale);
}

breadcrumb();

//Recuperiamo tutti gli elementi che ci serviranno
var lista_ul = document.getElementsByTagName("ul");

//Funzione per creare un cookie
function crea_cookie(nome_cookie, valore_cookie, durata_cookie){
    var scadenza = new Date();
    var adesso = new Date();
    scadenza.setTime(adesso.getTime() + (parseInt(durata_cookie) * 60000));
    document.cookie = nome_cookie + '=' + escape(valore_cookie) + '; expires=' + scadenza.toGMTString() + '; path=/';
}

//Funzione per leggere un cookie
function leggi_cookie(nome_cookie){
    if (document.cookie.length > 0){
        var inizio = document.cookie.indexOf(nome_cookie + "=");
    
        if (inizio != -1){
          inizio = inizio + nome_cookie.length + 1;
          var fine = document.cookie.indexOf(";",inizio);
          if (fine == -1){ 
              fine = document.cookie.length;
          }
          return unescape(document.cookie.substring(inizio,fine));
        }
        else {
            return "";
        }
      }
    else {  
      return "";
    }
}

//Funzione per cancellare un cookie
function cancella_cookie(nome_cookie){
    crea_cookie(nome_cookie,'',-1);
}

//Funzione per far tornare a mostrare le news flash nella barra in alto dello schermo. Cancella il cookie impostato e ricarica la pagina
function mostra_news(){
    cancella_cookie('forum_news');
    location.reload();
}

//Inserisce il link mostra news
function div_mostra_news(){
    var div_mostra_news = document.createElement("div");
    var link_mostra_news = document.createElement("a");
    var testo = document.createTextNode("Mostra notizie");
    link_mostra_news.appendChild(testo);
    link_mostra_news.setAttribute("style", "float: right; margin-right: 15px;");
    link_mostra_news.setAttribute("href", "javascript:void(0)");
    link_mostra_news.addEventListener("click", mostra_news, false);
        
    div_mostra_news.setAttribute("id", "testo_mostra_news");
    div_mostra_news.appendChild(link_mostra_news);
  
    var div_content_center = document.getElementById("content-center");
    var div_wrap = document.getElementById("wrap");
    div_wrap.insertBefore(div_mostra_news, div_content_center);
}

//Funzione per nascondere le news flash nella barra in alto.
function nascondi_news(){
    var div_forum_news = document.getElementById("forum-news");
    div_forum_news.parentNode.removeChild(div_forum_news);
}

//Funzione che viene richiamata dal pigiare sul div per nascondere le news, che nasconde le news e crea un cookie che mantiene memorizzata la cosa
function bottone_nascondi_news() {
    nascondi_news();
    crea_cookie('forum_news', 'nascondi', '180');
    
    //Nascondiamo anche il testo "nascondi notizie"
    var testo_nascondi_news = document.getElementById("testo_nascondi_news");
    div_page_body = document.getElementById("page-body");
    div_page_body.removeChild(testo_nascondi_news);
    
    //Creiamo il link "mostra notizie"
    
        div_mostra_news();

}

//Controlliamo se è impostato il cookie 'forum-news', se lo è, ed è 'nascondi', eliminiamo il div delle news del forum ed aggiungiamo il bottone per mostrare la funzione
var forum_news = leggi_cookie('forum_news');
if (forum_news == "nascondi"){
    try {
        nascondi_news();
        div_mostra_news();
    }
    catch(e) {
        //Se fallisce è perché non ci sono news nella pagina, quindi lo scopo è stato raggiunto, quindi non serve altro! 
    }
  
}
else {
    //Se il cookie non è impostato su 'nascondi' inseriamo un div per nascondere le ultime notizie della comunità
    try {
        var div_nascondi_news = document.createElement("div");
        var link_nascondi_news = document.createElement("a");
        var testo = document.createTextNode("Nascondi notizie");
        link_nascondi_news.appendChild(testo);
        link_nascondi_news.setAttribute("style", "float: right");
        link_nascondi_news.setAttribute("href", "javascript:void(0)");
        link_nascondi_news.addEventListener("click", bottone_nascondi_news, false);
        
        div_nascondi_news.setAttribute("id", "testo_nascondi_news");
        div_nascondi_news.appendChild(link_nascondi_news);
    
        var div_forum_news = document.getElementById("forum-news");
        var div_page_body = document.getElementById("page-body");
        div_page_body.insertBefore(div_nascondi_news, div_forum_news);
    }
    catch(e){
        //Se fallisce non ci si può far niente...
    }
}
  
if(document.getElementsByTagName) {
    
    for(i = 0; i<lista_ul.length; i++){
        if(lista_ul.item(i).getAttribute("class") == "links secondary-links leftside")
            var ul= lista_ul.item(i);
       
        if(lista_ul.item(i).getAttribute("class") === "linklist navlinks")
            var ul_rimuovere= lista_ul.item(i);
    }
    
    var div_elenco = document.getElementById("page-body");
    try {
        div_elenco.removeChild(ul_rimuovere);
            }
    catch(e){
    }
    
    var lista_voci = new Array("Messaggi senza risposta", "Messaggi non letti", "Messaggi recenti");
    var lista_url = new Array("./search.php?search_id=unanswered", "./search.php?search_id=unreadposts", "./search.php?search_id=newposts");
    var titolo_pagina = window.document.title;
    
    for (i=0; i<lista_voci.length; i++) {
        var nodo = document.createElement("li");
        var link = document.createElement("a");
        var testo = document.createTextNode(lista_voci[i]);
        var testo_confronto = lista_voci[i] + " • Forum Ubuntu-it";
        link.setAttribute("href", lista_url[i]);
        if (titolo_pagina == testo_confronto) 
            nodo.setAttribute("class", "active");
        link.appendChild(testo);
        nodo.appendChild(link);
        ul.appendChild(nodo);
    }
}