

    0 Unread Messages
    flagarde
    Logout

Userscripts.org

    Scripts
    Tags
    Forums
    People
    Groups
    Guides

Présence BSB
By Pierre aka Reup — Last update Aug 18, 2011 — Installed 473 times.

    About
    Source Code
    Reviews 0
    Discussions 0
    Fans 0
    Issues
    Share

There are 7 previous versions of this script.

// ==UserScript==
// @name                Présence BSB
// @namespace	        akareup@gmx.com,2011-08-10:presence_bsb
// @description	        Indique pour chaque Isbn la présence du livre à la bibliothèque Sainte-Barbe
// @include		*
// @license		CC-BY
// ==/UserScript==

/* Ce script recherche sur tous les sites visités ce qui ressemble à un Isbn,
et va vérifier si le livre correspondant est présent à la bibliothèque Sainte-Barbe.
Il transforme l'Isbn en lien, et indique à coté son résultat par une icone.
Il est codé avec les pieds, mais semble fonctionner */

/* Mise à jour :
2011-08-18 - Refondu pour ne modifier que les éléments contenant un potentiel Isbn (et pas l'intégralité du body)
*/

// Une (large) portion du texte affiché qui contient potentiellement un Isbn
var portion=/<[^>]*class=[\s\S]{0,1000}>[^<]*(?:9[0-9]{2}-?)?[-0-9]{9,11}-?[0-9x][^<]*</i;

// Des morceaux inutiles dans la portion (entre chevrons)
var elemAvirer1=/<br[^>]*>|<input[^>]*>|<img[^>]*>/ig;
var elemAvirer2=/<\/[^>]*>/ig;
var elemAvirer3=/<[^\/][^>]*>[^<]*<\/[^>]*>/ig;

// L'identifiant d'une classe
var quelleClass=/class="([^"]*)"/ig;

// Un Isbn
var isbn=/(?:9[0-9]{2}-?)?[-0-9]{9,11}-?[0-9x]/i;

//Une mention contenant un Isbn affiché
var mention=/(>[^<]*?)((?:9[0-9]{2}-?)?[-0-9]{9,11}-?[0-9x])([^<]*<)/ig;

// L'Url de la page externe qui teste la présence du livre à la BSB
var pageTest='http://akareup.alwaysdata.net/presence_bsb.php?i=';

// L'adresse du lien à insérer, et des icones de présence ou d'absence
var lien='<a title="Rechercher sur le Sudoc et Electre" target="_blank" href="http://akareup.alwaysdata.net/recherche-Sudoc-Electre.html?';
var icoPresent='<img src="http://akareup.alwaysdata.net/images/presentbsb.png" style="position:relative;top:6px;left:2px" />';
var icoAbsent='<img src="http://akareup.alwaysdata.net/images/absentbsb.png" style="position:relative;top:6px;left:2px" />';



// La fonction qui enrichit l'Isbn
function isbnPlus (str, p1 , p2, p3 , offset, s) {

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

// On recherche une portion contenant un Isbn potentiel
var portionTrouv = portion.exec(document.body.innerHTML)[0];

// On la nettoie au maximum des morceaux entre chevrons
portionTrouv = portionTrouv.replace(elemAvirer1,'');
if (portionTrouv.match(elemAvirer2)) {
var elemPortion=portionTrouv.match(elemAvirer2);
var nbElemPortion=elemPortion.length;
var i=0;
for (i=0 ; i<nbElemPortion ; i++) {
portionTrouv = portionTrouv.replace(elemAvirer3,'');}}

// On compte les identifiants de classes restant, et on garde le dernier
var classesPortion=portionTrouv.match(quelleClass);
var nbClass=classesPortion.length-1;
var classIsbn=classesPortion[nbClass];
classIsbn=quelleClass.exec(classIsbn)[1];

// On compte le nombre d'éléments avec cette classe
var nbElem=document.getElementsByClassName(classIsbn).length;

// On cherche un Isbn dans chaque élément de même classe
var j=0;
for (j=0;j<nbElem;j++) {
if (document.getElementsByClassName(classIsbn)[j].innerHTML.match(isbn)){

// On rajoute des chevrons autour de l'élément trouvé
document.getElementsByClassName(classIsbn)[j].innerHTML='<span>'+document.getElementsByClassName(classIsbn)[j].innerHTML+'</span>';

// On met en valeur les Isbn trouvés
document.getElementsByClassName(classIsbn)[j].innerHTML=document.getElementsByClassName(classIsbn)[j].innerHTML.replace(mention,isbnPlus);}
}

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
