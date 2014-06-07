// ==UserScript==
// @name                Présence médiathèque_Bagneux
// @namespace	        claude.longelin@gmail.com,2011-08-10:presence_bagneux
// @description	        Indique pour chaque Isbn la présence du livre à la bibliothèque Louis-Aragon de Bagneux
// @include		http*
// @exclude		http://www.facebook.com/*
// @exclude		http://facebook.com/*
// @exclude		http://twitter.com/*
// @exclude		http://www.twitter.com/*
// @exclude		https://www.facebook.com/*
// @exclude		https://facebook.com/*
// @exclude		https://twitter.com/*
// @exclude		https://www.twitter.com/*// @license		CC-BY
// ==/UserScript==

/* Ce script recherche sur tous les sites visités ce qui ressemble à un Isbn,
et va vérifier si le livre correspondant est présent à la bibliothèque Louis-Aragon.
Il transforme l'Isbn en lien, et indique à coté son résultat par un logo.
Il est codé avec les pieds, mais semble fonctionner */

// L'Url de la page externe qui teste la présence du livre à la Médiathèque de Bagneux
var pageTest='http://dilvich.alwaysdata.net/presence_bagneux.php?i=';

// Une mention du texte affiché qui contient potentiellement un Isbn
var mention=/(>(?:[^<]*[:\s;])?)((?:9[0-9]{2}-?)?[-0-9]{9,11}-?[0-9xX])((?:[\.\s&][^<]*)?<)/g;

// L'adresse du lien à insérer, et des icones de présence ou d'absence
var lien='<a title="Rechercher sur le Sudoc et Electre" target="_blank" href="http://akareup.alwaysdata.net/recherche-Sudoc-Electre.html?';
var icoPresent='<img src="http://akareup.alwaysdata.net/images/presentbsb.png" style="position:relative;top:6px;left:2px" title="Pr&eacute;sent &agrave; la m&eacute;diath&egrave;que Louis-Aragon" />';
var icoAbsent='<img src="http://akareup.alwaysdata.net/images/absentbsb.png" style="position:relative;top:6px;left:2px" title="Absent &agrave; la la m&eacute;diath&egrave;que Louis-Aragon" />';

// La fonction qui transforme la mention
function isbnPlus (str, p1, p2, p3, offset, s) {

  // On crée une version de l'Isbn sans tiret, qui servira aussi à batir l'identifiant
  var isbnSansTiret=p2.replace(/-/g,'');
  var idIsbn='id'+isbnSansTiret;

  // On va vérifier qu'il s'agit bien d'un Isbn en le décomposant
  var vraiIsbn='inconnu';
  var isbn1=new Number(isbnSansTiret.substr(0,1));
  var isbn2=new Number(isbnSansTiret.substr(1,1));
  var isbn3=new Number(isbnSansTiret.substr(2,1));
  var isbn4=new Number(isbnSansTiret.substr(3,1));
  var isbn5=new Number(isbnSansTiret.substr(4,1));
  var isbn6=new Number(isbnSansTiret.substr(5,1));
  var isbn7=new Number(isbnSansTiret.substr(6,1));
  var isbn8=new Number(isbnSansTiret.substr(7,1));
  var isbn9=new Number(isbnSansTiret.substr(8,1));
  var isbn10=isbnSansTiret.substr(9,1); // Le 10e chiffre est peut-être un X
  var isbn11=new Number(isbnSansTiret.substr(10,1));
  var isbn12=new Number(isbnSansTiret.substr(11,1));
  var isbn13=new Number(isbnSansTiret.substr(12,1));

  // S'il semble s'agir d'un Isbn-10
  if (isbnSansTiret.length==10) {
    if (isbn10=='x'){isbn10=new Number(10);}
    else if (isbn10=='X'){isbn10=new Number(10);}
    else {isbn10=new Number(isbn10);}
    var controle10=isbn1*10+isbn2*9+isbn3*8+isbn4*7+isbn5*6+isbn6*5+isbn7*4+isbn8*3+isbn9*2;
    controle10=11-controle10+Math.floor(controle10/11)*11;
    if (isbn10==controle10) {vraiIsbn='oui';}
    else {vraiIsbn='non';}}

  // S'il semble s'agir d'un Isbn-13
  else if (isbnSansTiret.length==13) {
    isbn10=new Number(isbn10);
    var controle13=isbn1+isbn3+isbn5+isbn7+isbn9+isbn11+(isbn2+isbn4+isbn6+isbn8+isbn10+isbn12)*3;
    controle13=10-controle13+Math.floor(controle13/10)*10;
    controle13=controle13-Math.floor(controle13/10)*10;
    if (isbn13==controle13){vraiIsbn='oui';}
    else {vraIsbn='non';}}

  // Si le nombre de chiffres ne correspond pas à un Isbn
  else {vraIsbn='non';}

  // Si c'est un vrai Isbn, on lance la requête de présence sur la page externe
  if (vraiIsbn=='oui') {
    GM_xmlhttpRequest({
      method:'GET',
      url: pageTest+isbnSansTiret,
      onload: function(response) {
        var presence=" inconnu"
        if (response.responseText.match('present_bsb')) {presence=icoPresent;}
        else {presence=icoAbsent;}
        // Un fois disponible, le résultat s'affichera dans un span identifié
        document.getElementById(idIsbn).innerHTML=presence;
      }
    }); //On ferme la requête et la laisse s'exécuter

    // Pendant ce temps, on ajoute à l'Isbn son lien et son span identifié
    p2=lien+isbnSansTiret+'">'+p2+'</a><span id="'+idIsbn+'"></span>';
  }

  // Puis on renvoie la mention enrichie ou non
  return p1+p2+p3;
}

// Le lancement du script qui remplace la mention par une mention enrichie
document.body.innerHTML=document.body.innerHTML.replace(mention,isbnPlus);

