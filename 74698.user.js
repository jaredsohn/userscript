// ==UserScript==
// @name          BnF -> Sudoc
// @namespace     http://catalogue.bnf.fr/
// @description	  BNF Sudoc
// @include       http://catalogue.bnf.fr/*

// ==/UserScript==
 
// 1er cas : isbn identifiable sur le catalogue de la BnF
// on suppose qu'on est en affichage public ou isbd
// La notice est incluse dans une balise <td> sans id, mais de classe "texteNotice". La zone contenant l'isbn est encadrée par deux balises <br>


// récupération du contenu de la notice

var notice ="";
var noticesanstirets="";
var isbn;
var liste_isbn =[];
var lien_sudoc = "http://www.sudoc.abes.fr/DB=2.1/SET=10/TTL=1/CMD?ACT=SRCHA&IKT=7&SRT=RLV&TRM=";
var param_sudoc = "";
var liste_titres =[];
var liste_auteurs =[];


var liste_td = document.getElementsByTagName ('TD');
for (var i = 0; i < liste_td.length; i++) {
  if (liste_td[i].className == 'texteNotice') {
    notice = liste_td[i].innerHTML;
  }
}


// rend le lien ark cliquable


var liste_div = document.getElementsByTagName ('DIV');
for (var i = 0; i < liste_div.length; i++) {
  if (liste_div[i].className == 'signet') {
    if (liste_div[i].innerHTML.match (/http:\/\/catalogue.bnf.fr\/ark:.*?\/PUBLIC/g)) {
       alert (liste_div[i].innerHTML);
// = liste_div[i].innerHTML.replace (/(http:\/\/catalogue.bnf.fr\/ark:.*?\/PUBLIC)/g,'<p><b>Identifiant pérenne (cliquer pour relancer la session):<a href="$1">$1</a></b></p>');
     }
  }
}



// ajouter le lien en favori
// alert (adresseark[0]);
// window.sidebar.addPanel(adresseark[0],adresseark[0]); 



// <div class="signets">http://catalogue.bnf.fr/ark:/12148/cb36620710w/PUBLIC</div>



if (notice != "") {
// récupération du titre et des auteurs
// liste_titres = notice.match(/<b> Titre\(s\) :  <\/b> &nbsp;.*?<br>/g);
// var nb_titres = liste_titres.length;
// alert (nb_titres); 
// for (var i = 0 ; i < nb_titres ; i++) {
// liste_titres[i] = liste_titres[i].replace (/<b> Titre\(s\) :  <\/b> &nbsp;(.*)<br>/,"$1");
// liste_auteurs[i] ="";
// liste_auteurs[i] = liste_titres[i].replace (/([^\/*?])\/(.*)/,"$2");
// alert (liste_auteurs[i]);
// liste_titres[i] = liste_titres[i].replace (/([^\/*])\/(.*)/,"$1");
// liste_titres[i] = liste_titres[i].replace (/\[Texte imprimé\]/,"");
// alert (liste_titres[i]); 
// <b> Autre(s) titre(s) :  </b>

// récupération des isbn.
// recherche directe des isbn
// suppression de tous les tirets
  noticesanstirets = notice.replace(/-/g,'');
// recherche de tous les isbn
  liste_isbn = noticesanstirets.match (/ISBN\s[0-9]{9,12}[X0-9]{1}\s/g);
  var nb_isbn = liste_isbn.length;
  for (var i = 0 ; i < nb_isbn ; i++) {
    liste_isbn[i] = liste_isbn[i].match (/[0-9]{9,12}[X0-9]{1}/);
    liste_isbn[i] = liste_isbn[i].toString();
    if (liste_isbn[i].length == 13) {
       liste_isbn[i] = liste_isbn[i] + "+or+"+liste_isbn[i].substr(3,9)+"*";}
    else {
       liste_isbn[i] = liste_isbn[i] + "+or+"+"978"+liste_isbn[i].substr(0,9)+"*";}
        
    if (i > 0) {liste_isbn[i] = "+or+"+liste_isbn[i];}
    param_sudoc = param_sudoc+liste_isbn[i];
 }


var lien_sudoc = '<p><a style="color : #FF0000; background-color: white; margin: 5px; border: 2px solid black; font-weight: bold;" href=\"'+lien_sudoc+param_sudoc+'\">Lien vers le SUDOC (recherche par ISBN)</a></p><br>';
notice = lien_sudoc +notice;


liste_td = document.getElementsByTagName ('TD');
for (var i = 0; i < liste_td.length; i++) {
  if (liste_td[i].className == 'texteNotice') {
    liste_td[i].innerHTML = notice;
  }
}

}