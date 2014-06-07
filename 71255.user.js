// ==UserScript==
// @name           Suppression des mentions de responsabilité dans les rebonds HIP
// @author         Mathieu Saby
// @namespace      http://scdweb.univ-reims.fr/ipac20/
// @description    Suppression des mentions de responsabilité dans les rebonds HIP
// @include        http://scdweb.univ-reims.fr/ipac20/*
// ==/UserScript==

// Version 0.1

// Objectif :
// Remédier à deux défauts d'HIP : l'impossibilité de faire des rebonds auteur quand l'auteur est suivi d'une mention de responsabilité et des rebonds auteur et/ou sujets quand l'auteur et/ou le sujet contient un "?"
 
// 1. éliminer les codes de responsabilité des balises <a> pointant vers un auteur (nom de l'auteur précédé de "uri=search=AW~!" et suivi de "&ri=" dans le lien)
// deux stratégies possibles : 
// - supprimer tout ce qui suit le dernier ". " --> pbm : risque d'éliminer des prénoms s'il y a une abréviation dans le nom de l'auteur (Philip K. Dick...) + pbm avec les abréviations usuelles incluses dans les () des qualificatifs (av. J.-C.) + pbm quand la notice est mal construite (notamment quand il manque le "." avant la mention de resp.) 
// - éliminer une liste de mots clés lorsqu'ils figurent en fin de ligne --> pbm : être bien sur de la liste des mots clés abrégés ou non (Auteur, Dir. Ed., Trad., Postf., Pref., Préface, Postface, Traduction, Edition, Direction, Présentateur, Participant, Réalisateur, Intervieweur...) 
// 2. éliminer les "?" et les autres signes (sans doute "." et "'") dans les dans les liens pointant vers des notice auteur et sujet


var all;
var element;
var lien="";

function nettoie_auteurs (lien_a_nettoyer)
{
  var nouveau_lien="";
  var motif="";
  var nom_auteur="";
// correction des notices dans lesquelles la mention de responsabilité suit le () des qualificatifs sans "."

  motif = /(.+\(.+\))%20/g;
  nouveau_lien = lien_a_nettoyer.replace(motif, "$1.%20");

// élimine tout ce qui suit un ". " final, après d'éventuelles qualificatifs entre ()
  motif = /(%20\([^\)]+\))?(\.%20[^\.]{2,}\.{0,4}){0,}&ri/;
  nouveau_lien = nouveau_lien.replace(motif, "$1&ri");

// on récupère le nom de l'auteur, ses dates et ses fonctions
  motif = /.+uri=search=AW~!(.+)&ri=.+/gi; 
  nom_auteur = nouveau_lien;
  nom_auteur = nom_auteur.replace(motif, "$1");

// on élimine les ?, les ., les ', les -
  motif = /(\?|\.|'|\-)/g;
  nom_auteur = nom_auteur.replace(motif, " ");
// on réinsère le nom corrigé dans le lien
  motif = /(.+uri=search=AW~!)(.+)(&ri=.+)/gi;
  nouveau_lien = nouveau_lien.replace(motif, "$1"+nom_auteur+"$3"); 
return nouveau_lien;
}

function nettoie_sujets (lien_a_nettoyer)
{
  var nouveau_lien="";
  var motif="";
  var sujet="";
  
// on récupère le sujet
  nouveau_lien = lien_a_nettoyer;
  motif = /.+uri=search=SW~!(.+)&term=.+/gi;
  sujet = nouveau_lien.replace(motif, "$1");
// on élimine les ?, les ., les ' et les -
  motif = /(\?|\.|'|\-)/g;
  sujet = sujet.replace(motif, " ");
// on réinsère le sujet corrigé dans le lien
  motif = /(.+uri=search=SW~!)(.+)(&term=.+)/gi;
  nouveau_lien = nouveau_lien.replace(motif, "$1"+sujet+"$3");
return nouveau_lien;
}


// récupération de tous les éléments de la page
all = document.getElementsByTagName('*');

// examen de tous les éléments et sélection des liens
for (var i = 0; i < all.length; i++) {
  element = all[i];
  if (element.nodeName == 'A') {
    lien=element.getAttribute("href");
    if (lien != null){
      if (lien.indexOf("uri=search=AW")>-1) {
        element.setAttribute("href",nettoie_auteurs (lien));
      }

// 2e étape : correction des sujets
      if (lien.indexOf("uri=search=SW")>-1){
        element.setAttribute("href",nettoie_sujets (lien));
      }
    }
  }
}