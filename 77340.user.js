// ==UserScript==
// @name           URCA Plus - version 0.1
// @author         Vingtseptpointsept.fr (Mathieu Saby)
// @namespace      http://vingtseptpointsept.fr/
// @description    Enrichit le catalogue de l'URCA : lien vers le SUDOC
// @include        http://scdweb.univ-reims.fr/*
// ==/UserScript==



// http://scdweb.univ-reims.fr/ipac20/ipac.jsp?uri=full=3100001~!365181~!0
// http://scdweb.univ-reims.fr/ipac20/ipac.jsp?index=BIB&term=365181

// pour avoir une adresse stable (pas pérenne, car la notice bib peut être fusionnée avec une autre...), on peut utiliser le n° bib
// sinon, comportement problématique à cause des lettres accentuées dans l'url
// <input type="button" alt="Ajouter à mon cartable" value="Ajouter à mon cartable" class="button" name="bkey68686" onclick="javascript:updatebooklist(this);">
// <form name="full" action="http://scdweb.univ-reims.fr/ipac20/ipac.jsp" method="GET">

var labels = new Array ();
var valeurs = new Array ();
var labels_valeurs = new Array ();


//--------------------------------------------------------------------
// Function recupere_bibkey
//--------------------------------------------------------------------


function recupere_bibkey () {
// le n° de la notice bib est dans cette zone : <input type="button" alt="Ajouter à mon cartable" value="Ajouter à mon cartable" class="button" name="bkey68686" onclick="javascript:updatebooklist(this);">
  var resultat = 0;
  var nb_boutons_cartable = 0;
  var liste_input = document.getElementsByTagName('input');
  if (liste_input.length > 0){
    for (var i=0; i<liste_input.length; i++) {
      if (liste_input[i].value=="Ajouter à mon cartable"){
        nb_boutons_cartable = nb_boutons_cartable +1;
        resultat = liste_input[i].name.replace(/bkey/,'');}
    }
  }
  if (nb_boutons_cartable > 1) {resultat = 0;}
  return resultat;
}

//--------------------------------------------------------------------
// Function recupere_notice_marc
//--------------------------------------------------------------------

function recupere_notice_marc (notice_marc_brute) {
  var notice_marc;
  var liste_form;
  var liste_a;
  var tmp_div;
  var tmp_labels = new Array ();
  var tmp_valeurs = new Array ();
  var tmp_labels_valeurs = new Array () ;
  
  tmp_div = document.createElement('div');
  tmp_div.innerHTML = notice_marc_brute.split(/<body[^>]*>((?:.|\n|\r)*)<\/body>/i)[1];
  liste_form = tmp_div.getElementsByTagName('form');
  for (var i=0; i<liste_form.length; i++) {
    if (liste_form[i].name=="full")
      {notice_marc=liste_form[i].getElementsByTagName('tbody')[1];}
  }
// chaque ligne est dans un bloc
// <tr><td nowrap="true" valign="top" width="1%"><a class="normalBlackFont1">001:&nbsp;</a></td><td valign="top" width="99%"><table class="tableBackground" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top"><a class="normalBlackFont1">PPN124098061</a></td></tr></tbody></table></td></tr>

  liste_a  = notice_marc.getElementsByTagName('a');
  for (var i=0; i<liste_a.length; i++) { 
    if (liste_a[i].getElementsByTagName('input').length > 0 ) {break;}
    if (i%2 ==0) { // label
      tmp_labels [i/2] = liste_a[i].innerHTML.replace(/:&nbsp;/,'');
    }
    else {
      tmp_valeurs [(i-1)/2] = liste_a[i].innerHTML;
    }
  }
  for (var i=0; i<tmp_labels.length; i++) {
    tmp_labels_valeurs [tmp_labels[i]]=tmp_valeurs[i];
  }
  return tmp_labels_valeurs;
}


//--------------------------------------------------------------------
// Function ajout_lien_sudoc
//--------------------------------------------------------------------

function ajout_lien_sudoc (labels_valeurs_marc21)
{
// affiche le lien vers le ppn
// <tr valign="top">
// <td width="1%"></td>
var PPN;
var ISBN = new Array (); // il peut y en avoir plusieurs --> dans un tableau
var ISSN;
var AuteursPrincipaux ;
var texte;
var td_gauche_dans_tr;
var liste_tr;

AuteursPrincipaux = labels_valeurs_marc21["700"];
alert (AuteursPrincipaux.length);
alert (AuteursPrincipaux);


PPN = labels_valeurs_marc21["001"];
if (PPN.match (/PPN/))
  {texte ='<div><a href="http://www.sudoc.abes.fr/DB=2.1/SRCH?IKT=12&TRM='+PPN.replace(/PPN/,'')+'" title="Lien vers le SUDOC (PPN)" class="normalBlackFont1">Lien vers le SUDOC (PPN)</a></div>';}
else
  {texte ='<div><a title="Document en attente de catalogage" class="normalBlackFont1">Document en attente de catalogage</a></div>';}

liste_tr = document.getElementsByTagName('tr');
for (var i=0; i<liste_tr.length; i++) { 
  if (liste_tr[i].getAttribute("valign")=="top") {
    td_gauche_dans_tr = liste_tr[i].getElementsByTagName('td')[0];
  }
}

td_gauche_dans_tr.width = '10%';
td_gauche_dans_tr.innerHTML=texte;
}


//--------------------------------------------------------------------
// Corps du script
//--------------------------------------------------------------------


var numero_notice_bib = recupere_bibkey();
if (numero_notice_bib > 0) {
  GM_xmlhttpRequest(
   {method: 'GET',
    url: 'http://scdweb.univ-reims.fr/ipac20/ipac.jsp?fullmarc=true&index=BIB&term='+numero_notice_bib,
    headers:{'User-Agent':window.navigator.userAgent,'Accept':'text/html',},
    onload: function(responseDetails) {
      if (responseDetails.status == 200){
        labels_valeurs = recupere_notice_marc (responseDetails.responseText);
        ajout_lien_sudoc (labels_valeurs); 
      }
    }
   });
}