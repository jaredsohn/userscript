// ==UserScript==
// @name           facebook-br
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Breton
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.2
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-08-29
// Translations:   Fulup Jakez

/*
 *  Copyright 2012 Kevin Scannell
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
*/


var tags = new Array();
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment
tags.push('a');      // many... (should do last for "context sensitive" stuff)

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
//divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
//divclasses.push('_29j _29k'); // 2 people like this (etc.)
divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
//divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
//divclasses.push('fsm fwn fcg');  // By:
//divclasses.push('uiImageBlockContent uiImageBlockSmallContent');  // "near"

var spanclasses = new Array();
spanclasses.push('default_message');  // Like/Dislike
spanclasses.push('saving_message');   // Like/Dislike
spanclasses.push('uiStreamSource');   // %T near %a

// Replace the search string with the translated string
function r(dd, s, t) {
    if (s == t) {
        return (dd);
    } else {
        var RegExpr = new RegExp(s, "g");
        return (dd.replace(RegExpr, t));
    }
}

function translate(x) {
  d = x;
// Translations go here
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"Plijout a ra da "+"$2"+", "+"$3"+" ha da "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté une photo\.(?=($|"|<))', "$1"+"Ur skeudenn nevez ouzhpennet gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?1) photos\.(?=($|"|<))', "$1"+"Ur skeudenn nevez ouzhpennet gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?2) photos\.(?=($|"|<))', "$1"+"$3"+" skeudenn nevez ouzhpennet gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?[349]) photos\.(?=($|"|<))', "$1"+"$3"+" skeudenn nevez ouzhpennet gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté ([0-9,]+) photos\.(?=($|"|<))', "$1"+"$3"+" skeudenn nevez ouzhpennet gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté une photo à l’album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ouzhpennet ez eus bet 1 skeudenn nevez d'an albom "+"$2"+"2 gant a1");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?1) photos à l’album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ouzhpennet ez eus bet 1 skeudenn nevez d'an albom "+"$2"+"2 gant a1");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?2) photos à l’album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ouzhpennet ez eus bet "+"$3"+" skeudenn nevez d'an albom "+"$2"+"2 gant a1");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté (([0-9,]*[^179])?[349]) photos à l’album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ouzhpennet ez eus bet "+"$3"+" skeudenn nevez d'an albom "+"$2"+"2 gant a1");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté ([0-9,]+) photos à l’album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ouzhpennet ez eus bet "+"$3"+" skeudenn nevez d'an albom "+"$2"+"2 gant a1");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) sont maintenant amie?s\.(?=($|"|<))', "$1"+"Mignoned eo "+"$2"+" ha "+"$3"+" bremañ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) ont commenté [ul][nae]e? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Pozioù zo bet lezet gant "+"$2"+" ha "+"$3"+" diwar-benn "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aiment (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Plijout a ra "+"$4"+" da "+"$2"+" ha da "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"Plijout a ra da "+"$2"+" ha da "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) ont partagé (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" hag "+"$3"+" o deus kenrannet "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) ont partagé [ul][nae]e? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" hag "+"$3"+" o deus kenrannet "+"$4"+" "+"$5");
  d = r(d, '(^|="|>)À propos de(?=($|"|<))', "$1"+"Diwar-benn");
  d = r(d, '(^|="|>)il y a environ une heure(?=($|"|<))', "$1"+"e-tro un eurvezh zo");
  d = r(d, '(^|="|>)il y a environ une minute(?=($|"|<))', "$1"+"E-tro ur munut zo");
  d = r(d, '(^|="|>)Paramètres du compte(?=($|"|<))', "$1"+"Arventennoù ar gont");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a changé la photo de son profil\.(?=($|"|<))', "$1"+"cheñchet eo bet skeudenn he frofil gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a changé la photo de son profil\.(?=($|"|<))', "$1"+"cheñchet eo bet skeudenn e brofil gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a commenté une? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Un tamm poz zo bet lezet gant "+"$2"+" e "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a commenté s[ao]n? propre (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Un tamm poz zo bet lezet gant "+"$2"+" diwar-benn e "+"$3"+" dezhi hec'h-unan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a commenté s[ao]n? propre (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Un tamm poz zo bet lezet gant "+"$2"+" diwar-benn e "+"$3"+" dezhañ e-unan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a commenté votre (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Un tamm poz zo bet lezet gant "+"$2"+" diwar-benn ho "+"$3"+".");
  d = r(d, '(^|="|>)Historique personnel(?=($|"|<))', "$1"+"Marilh oberiantiz");
  d = r(d, '(^|="|>)Ajouter(?=($|"|<))', "$1"+"Ouzhpennañ ur mignon");
  d = r(d, '(^|="|>)Ajouter des intérêts\.\.\.(?=($|"|<))', "$1"+"Ouzhpennañ dedennoù");
  d = r(d, '(^|="|>)Photo/vidéo(?=($|"|<))', "$1"+"Ouzhpennañ ur Skeudenn / Video");
  d = r(d, '(^|="|>)Publicité(?=($|"|<))', "$1"+"Bruderezh");
  d = r(d, '(^|="|>)il y a quelques secondes(?=($|"|<))', "$1"+"E-tro un eilenn zo");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) est à (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Emañ "+"$2"+" e "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Plijet eo "+"$2"+" gant "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime une? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Plijet eo "+"$2"+" gant ur "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime [ul][nae]e? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Plijet eo "+"$2"+" gant "+"$3"+" "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime (<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Plijet eo "+"$2"+" gant "+"$3"+" ha "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime ça\.(?=($|"|<))', "$1"+"Plijout a ra da "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"Plijout a ra da "+"$2");
  d = r(d, '(^|>)un lien(?=($|<))', "$1"+"ul liamm");
  d = r(d, '(^|="|>)Applications(?=($|"|<))', "$1"+"Arloadoù");
  d = r(d, '(^|="|>)Applications et jeux(?=($|"|<))', "$1"+"Arloadoù ha c'hoarioù");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a partagé (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en deus kenrannet "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a partagé [ul][nae]e? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en deus kenrannet "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a partagé s[ao]n? propre (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" he deus kenrannet he "+"$3"+" dezhi hec'h-unan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a partagé s[ao]n? propre (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en deus kenrannet e "+"$3"+" dezhañ e-unan.");
  d = r(d, '(^|="|>)Question(?=($|"|<))', "$1"+"Goulenn udb.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a été identifié dans [ul][nae]e? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tikedennet eo "+"$2"+" war "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a été identifié dans des photos de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tikdennet eo bet "+"$2"+" war skeudennoù "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a changé sa photo de couverture\.(?=($|"|<))', "$1"+"Cheñchet eo bet he skeudenn golo gant "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a changé sa photo de couverture\.(?=($|"|<))', "$1"+"Cheñcet eo bet e skeudenn golo gant "+"$2");
  d = r(d, '(^|="|>)Naissance(?=($|"|<))', "$1"+"Ganedigezh");
  d = r(d, '(^|="|>)Par :(?=($|"|<))', "$1"+"Gant");
  d = r(d, '(^|="|>)Annuler(?=($|"|<))', "$1"+"Nullañ");
  d = r(d, '(^|="|>)Emplois(?=($|"|<))', "$1"+"Labourioù");
  d = r(d, '(^|="|>)Changer la couverture(?=($|"|<))', "$1"+"Cheñch ar golo");
  d = r(d, '(^|="|>)Discussion instantanée \\(hors-ligne\\)(?=($|"|<))', "$1"+"Flap (Ezlinenn)");
  d = r(d, '(^|="|>)Fermer(?=($|"|<))', "$1"+"Serriñ");
  d = r(d, '(^|="|>)Amis proches(?=($|"|<))', "$1"+"Mignoned tostañ");
  d = r(d, '(^|="|>)Commenter(?=($|"|<))', "$1"+"Poz");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Toupinoù");
  d = r(d, '(^|="|>)Confirmer(?=($|"|<))', "$1"+"Kadarnaat");
  d = r(d, '(^|="|>)Créer une publicité(?=($|"|<))', "$1"+"Krouiñ ur bomm brudañ");
  d = r(d, '(^|="|>)Créer une Page(?=($|"|<))', "$1"+"Krouiñ ur bajenn");
  d = r(d, '(^|="|>)Créer un groupe\.\.\.(?=($|"|<))', "$1"+"Krouiñ ur strollad");
  d = r(d, '(^|="|>)Créer un groupe(?=($|"|<))', "$1"+"Krouiñ ur strollad");
  d = r(d, '(^|="|>)Développeurs(?=($|"|<))', "$1"+"Diorroerien");
  d = r(d, '(^|="|>)il y a une heure(?=($|"|<))', "$1"+"1 eurvezh zo");
  d = r(d, '(^|="|>)il y a (([0-9,]*[^179])?1) heures(?=($|"|<))', "$1"+"$2"+" eurvezh zo");
  d = r(d, '(^|="|>)il y a (([0-9,]*[^179])?2) heures(?=($|"|<))', "$1"+"$2"+" eurvezh zo");
  d = r(d, '(^|="|>)il y a (([0-9,]*[^179])?[349]) heures(?=($|"|<))', "$1"+"$2"+" eurvezh zo");
  d = r(d, '(^|="|>)il y a ([0-9,]+) heures(?=($|"|<))', "$1"+"$2"+" eurvezh zo");
  d = r(d, '(^|="|>)Il y a une minute(?=($|"|<))', "$1"+"1 munut zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?1) minutes(?=($|"|<))', "$1"+"$2"+" munut zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?2) minutes(?=($|"|<))', "$1"+"$2"+" vunut zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?[349]) minutes(?=($|"|<))', "$1"+"$2"+" munut zo");
  d = r(d, '(^|="|>)Il y a ([0-9,]+) minutes(?=($|"|<))', "$1"+"$2"+" munut zo");
  d = r(d, '(^|="|>)1 ami\\(e\\) en commun(?=($|"|<))', "$1"+"1 mignon boutin");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?1) ami\\(e\\)s en commun(?=($|"|<))', "$1"+"$2"+" mignon boutin");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?2) ami\\(e\\)s en commun(?=($|"|<))', "$1"+"$2"+" vignon boutin");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?[349]) ami\\(e\\)s en commun(?=($|"|<))', "$1"+"$2"+" mignon boutin");
  d = r(d, '(^|="|>)([0-9,]+) ami\\(e\\)s en commun(?=($|"|<))', "$1"+"$2"+" mignon boutin");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 ISTOR NEVEZ");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?1) nouvelles actualités(?=($|"|<))', "$1"+"$2"+" ISTOR NEVEZ");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?2) nouvelles actualités(?=($|"|<))', "$1"+"$2"+" ISTOR NEVEZ");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?[349]) nouvelles actualités(?=($|"|<))', "$1"+"$2"+" ISTOR NEVEZ");
  d = r(d, '(^|="|>)([0-9,]+) nouvelles actualités(?=($|"|<))', "$1"+"$2"+" ISTOR NEVEZ");
  d = r(d, '(^|>)une autre personne(?=($|<))', "$1"+"1 all");
  d = r(d, '(^|>)(([0-9,]*[^179])?1) autres personnes(?=($|<))', "$1"+"$2"+" all");
  d = r(d, '(^|>)(([0-9,]*[^179])?2) autres personnes(?=($|<))', "$1"+"$2"+" all");
  d = r(d, '(^|>)(([0-9,]*[^179])?[349]) autres personnes(?=($|<))', "$1"+"$2"+" all");
  d = r(d, '(^|>)([0-9,]+) autres personnes(?=($|<))', "$1"+"$2"+" all");
  d = r(d, '(^|>)un autre ami\\(e\\)(?=($|<))', "$1"+"1 mignon boutin all");
  d = r(d, '(^|>)(([0-9,]*[^179])?1) autres ami\\(e\\)s(?=($|<))', "$1"+"$2"+" mignon boutin all");
  d = r(d, '(^|>)(([0-9,]*[^179])?2) autres ami\\(e\\)s(?=($|<))', "$1"+"$2"+" vignon boutin all");
  d = r(d, '(^|>)(([0-9,]*[^179])?[349]) autres ami\\(e\\)s(?=($|<))', "$1"+"$2"+" mignon boutin all");
  d = r(d, '(^|>)([0-9,]+) autres ami\\(e\\)s(?=($|<))', "$1"+"$2"+" mignon boutin all");
  d = r(d, '(^|>)une autre page(?=($|<))', "$1"+"1 bajenn all");
  d = r(d, '(^|>)(([0-9,]*[^179])?1) autres Pages(?=($|<))', "$1"+"$2"+" bajenn all");
  d = r(d, '(^|>)(([0-9,]*[^179])?2) autres Pages(?=($|<))', "$1"+"$2"+" bajenn all");
  d = r(d, '(^|>)(([0-9,]*[^179])?[349]) autres Pages(?=($|<))', "$1"+"$2"+" fajenn all");
  d = r(d, '(^|>)([0-9,]+) autres Pages(?=($|<))', "$1"+"$2"+" fajenn all");
  d = r(d, '(^|>)une autre personne(?=($|<))', "$1"+"1 den all");
  d = r(d, '(^|>)(([0-9,]*[^179])?1) autres personnes(?=($|<))', "$1"+"$2"+" den all");
  d = r(d, '(^|>)(([0-9,]*[^179])?2) autres personnes(?=($|<))', "$1"+"$2"+" zen all");
  d = r(d, '(^|>)(([0-9,]*[^179])?[349]) autres personnes(?=($|<))', "$1"+"$2"+" den all");
  d = r(d, '(^|>)([0-9,]+) autres personnes(?=($|<))', "$1"+"$2"+" den all");
  d = r(d, '(^|="|>)une personne(?=($|"|<))', "$1"+"1 den");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?1) personnes(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?2) personnes(?=($|"|<))', "$1"+"$2"+" zen");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?[349]) personnes(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)([0-9,]+) personnes(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)Il y a une seconde(?=($|"|<))', "$1"+"1 eilenn zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?1) secondes(?=($|"|<))', "$1"+"$2"+" eilenn zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?2) secondes(?=($|"|<))', "$1"+"$2"+" eilenn zo");
  d = r(d, '(^|="|>)Il y a (([0-9,]*[^179])?[349]) secondes(?=($|"|<))', "$1"+"$2"+" eilenn zo");
  d = r(d, '(^|="|>)Il y a ([0-9,]+) secondes(?=($|"|<))', "$1"+"$2"+" eilenn zo");
  d = r(d, '(^|="|>)1 partage(?=($|"|<))', "$1"+"Kenrannet 1");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?1) partages(?=($|"|<))', "$1"+"Kenrannet "+"$2");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?2) partages(?=($|"|<))', "$1"+"Kenrannet "+"$2");
  d = r(d, '(^|="|>)(([0-9,]*[^179])?[349]) partages(?=($|"|<))', "$1"+"Kenrannet "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) partages(?=($|"|<))', "$1"+"Kenrannet "+"$2");
  d = r(d, '(^|="|>)Modifier les options(?=($|"|<))', "$1"+"Dibaboù aozañ");
  d = r(d, '(^|="|>)Modifier ou retirer(?=($|"|<))', "$1"+"Aozañ pe diverkañ");
  d = r(d, '(^|="|>)Français \\(France\\)(?=($|"|<))', "$1"+"Brezhoneg");
  d = r(d, '(^|="|>)Entrez le nom ou l’adresse électronique d’un\\(e\\) ami\\(e\\)(?=($|"|<))', "$1"+"Lakait anv ur mignon pe ur chomlec'h postel");
  d = r(d, '(^|="|>)Évènements(?=($|"|<))', "$1"+"Darvoudoù");
  d = r(d, '(^|="|>)Famille(?=($|"|<))', "$1"+"Familh");
  d = r(d, '(^|="|>)Favoris(?=($|"|<))', "$1"+"AR RE GARETAÑ");
  d = r(d, '(^|="|>)Rechercher des amis(?=($|"|<))', "$1"+"Kavout mignoned");
  d = r(d, '(^|="|>)Trouver plus de Pages(?=($|"|<))', "$1"+"Kavout pajennoù all");
  d = r(d, '(^|="|>)Amis présents(?=($|"|<))', "$1"+"Mignoned o flapiñ");
  d = r(d, '(^|="|>)Demandes d’ajout à la liste d’amis(?=($|"|<))', "$1"+"Goulennoù ar vignoned");
  d = r(d, '(^|="|>)Amis(?=($|"|<))', "$1"+"Mignoned");
  d = r(d, '(^|="|>)AMIS(?=($|"|<))', "$1"+"MIGNONED");
  d = r(d, '(^|="|>)Groupes(?=($|"|<))', "$1"+"STROLLADOÙ");
  d = r(d, '(^|="|>)Aide(?=($|"|<))', "$1"+"Skoazell");
  d = r(d, '(^|="|>)Accueil(?=($|"|<))', "$1"+"Degemer");
  d = r(d, '(^|="|>)Intérêts(?=($|"|<))', "$1"+"DEDENN");
  d = r(d, '(^|="|>)Évènement marquant(?=($|"|<))', "$1"+"Darvoud buhez");
  d = r(d, '(^|="|>)J’aime(?=($|"|<))', "$1"+"Plijus");
  d = r(d, '(^|="|>)Mentions J’aime(?=($|"|<))', "$1"+"Plijadurioù");
  d = r(d, '(^|="|>)J’aime la Page(?=($|"|<))', "$1"+"Pajenn Plijadurioù");
  d = r(d, '(^|="|>)J’aime cette Page(?=($|"|<))', "$1"+"Karet ar bajenn-mañ");
  d = r(d, '(^|="|>)Liens(?=($|"|<))', "$1"+"Liammoù");
  d = r(d, '(^|="|>)Listes(?=($|"|<))', "$1"+"ROLLOÙ");
  d = r(d, '(^|="|>)Déconnexion(?=($|"|<))', "$1"+"Digevreañ");
  d = r(d, '(^|="|>)Carte(?=($|"|<))', "$1"+"Kartenn");
  d = r(d, '(^|="|>)Message :(?=($|"|<))', "$1"+"Kemennadenn");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Kemennadennoù");
  d = r(d, '(^|="|>)Téléchargements mobiles(?=($|"|<))', "$1"+"Enporzhiet diwar un hezoug");
  d = r(d, '(^|="|>)Plus(?=($|"|<))', "$1"+"Muioc'h");
  d = r(d, '(^|="|>)Plus(?=($|"|<))', "$1"+"MUIOC'H");
  d = r(d, '(^|="|>)Plus d’actualités(?=($|"|<))', "$1"+"Istorioù all");
  d = r(d, '(^|="|>)Plus récentes(?=($|"|<))', "$1"+"Ar re nevesañ");
  d = r(d, '(^|="|>)Musique(?=($|"|<))', "$1"+"Sonerezh");
  d = r(d, '(^|="|>)Nouveau message(?=($|"|<))', "$1"+"Kemennadenn nevez");
  d = r(d, '(^|="|>)Fil d’actualité(?=($|"|<))', "$1"+"Red ar c'heleier");
  d = r(d, '(^|="|>)Articles(?=($|"|<))', "$1"+"Notennoù");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Embannoù");
  d = r(d, '(^|="|>)Pas maintenant(?=($|"|<))', "$1"+"Diwezhatoc'hik");
  d = r(d, '(^|="|>)Maintenant(?=($|"|<))', "$1"+"Bremañ");
  d = r(d, '(^|="|>)Pages(?=($|"|<))', "$1"+"PAJENNOÙ");
  d = r(d, '(^|="|>)Personnes qui aiment ça(?=($|"|<))', "$1"+"Tud a blij an dra-se dezho");
  d = r(d, '(^|="|>)Vous connaissez peut-être\.\.\.(?=($|"|<))', "$1"+"Tud a c'hallit anavezout");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Luc'hskeudenn");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Luc'hskeudennoù");
  d = r(d, '(^|="|>)Lieu(?=($|"|<))', "$1"+"Lec'h");
  d = r(d, '(^|="|>)Lieux(?=($|"|<))', "$1"+"Lec'hioù");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Broud");
  d = r(d, '(^|="|>)Confidentialité(?=($|"|<))', "$1"+"Prevezded");
  d = r(d, '(^|="|>)Paramètres de confidentialité(?=($|"|<))', "$1"+"Arventennoù prevezded");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Goulennoù");
  d = r(d, '(^|="|>)Activité récente(?=($|"|<))', "$1"+"Divizoù nevesañ");
  d = r(d, '(^|="|>)Publication récente(?=($|"|<))', "$1"+"KEMENNADENNOÙ DIWEZHAÑ");
  d = r(d, '(^|="|>)Pages recommandées(?=($|"|<))', "$1"+"Pajennoù erbedet");
  d = r(d, '(^|="|>)Supprimer l’aperçu(?=($|"|<))', "$1"+"Lemel ar rakweled");
  d = r(d, '(^|="|>)En avant(?=($|"|<))', "$1"+"Adventañ");
  d = r(d, '(^|="|>)([^<"]+), ajoutez un commentaire\.\.\.(?=($|"|<))', "$1"+"$2"+", skrivañ un tamm poz");
  d = r(d, '(^|="|>)Recherche(?=($|"|<))', "$1"+"Klask");
  d = r(d, '(^|="|>)Trouvez des personnes, des lieux ou d’autres choses(?=($|"|<))', "$1"+"Klask tud, lec'hioù pe traoù");
  d = r(d, '(^|="|>)Afficher tout(?=($|"|<))', "$1"+"Gwelet an holl");
  d = r(d, '(^|="|>)Voir toutes les demandes de contact(?=($|"|<))', "$1"+"Gwelet an holl c'houlennoù mignoned");
  d = r(d, '(^|="|>)Afficher tous les messages(?=($|"|<))', "$1"+"Gwelet an holl gemennadennoù");
  d = r(d, '(^|="|>)Afficher toutes les notifications(?=($|"|<))', "$1"+"Gwelet an holl embannoù");
  d = r(d, '(^|="|>)Voir les liens d’amitié(?=($|"|<))', "$1"+"Gwelet ar vignoniezh");
  d = r(d, '(^|="|>)Afficher la suite(?=($|"|<))', "$1"+"Gwelet traoñoc'h");
  d = r(d, '(^|="|>)Voir la traduction(?=($|"|<))', "$1"+"Gwelet an droidigezh");
  d = r(d, '(^|="|>)Envoyer(?=($|"|<))', "$1"+"Kas");
  d = r(d, '(^|="|>)Envoyer un nouveau message(?=($|"|<))', "$1"+"Kas ur gemennadenn nevez");
  d = r(d, '(^|="|>)Partager(?=($|"|<))', "$1"+"Kenrannañ");
  d = r(d, '(^|="|>)Ordre(?=($|"|<))', "$1"+"URZHIAÑ");
  d = r(d, '(^|="|>)Lien commercial(?=($|"|<))', "$1"+"Paeroniet");
  d = r(d, '(^|="|>)Statut(?=($|"|<))', "$1"+"Statud");
  d = r(d, '(^|="|>)Abonnements(?=($|"|<))', "$1"+"Enskrivadurioù");
  d = r(d, '(^|="|>)Suggestions de groupes(?=($|"|<))', "$1"+"Strolladoù kinniget");
  d = r(d, '(^|="|>)Identifier des ami\\(e\\)s(?=($|"|<))', "$1"+"Tikedenniñ mignoned");
  d = r(d, '(^|="|>)Conditions d’utilisation(?=($|"|<))', "$1"+"Termenoù");
  d = r(d, '(^|="|>)Télex(?=($|"|<))', "$1"+"War-eeun");
  d = r(d, '(^|="|>)Journal(?=($|"|<))', "$1"+"Kronologiezh");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>), à proximité de (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" e-kichen "+"$3");
  d = r(d, '(^|="|>)À :(?=($|"|<))', "$1"+"Da");
  d = r(d, '(^|="|>)À la une(?=($|"|<))', "$1"+"Istorioù pennañ");
  d = r(d, '(^|="|>)Je n’aime plus(?=($|"|<))', "$1"+"Displijus");
  d = r(d, '(^|="|>)Actualiser mes infos(?=($|"|<))', "$1"+"Nevesaat ar c'heleier");
  d = r(d, '(^|="|>)Statut(?=($|"|<))', "$1"+"Nevesaat ar statud");
  d = r(d, '(^|="|>)Utiliser Facebook en tant que :(?=($|"|<))', "$1"+"Ober gant Facebook evel :");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Gwelet an 1 poz");
  d = r(d, '(^|="|>)Afficher les (([0-9,]*[^179])?1) commentaires(?=($|"|<))', "$1"+"Gwelet an "+"$2"+" poz");
  d = r(d, '(^|="|>)Afficher les (([0-9,]*[^179])?2) commentaires(?=($|"|<))', "$1"+"Gwelet an "+"$2"+" boz");
  d = r(d, '(^|="|>)Afficher les (([0-9,]*[^179])?[349]) commentaires(?=($|"|<))', "$1"+"Gwelet an "+"$2"+" foz");
  d = r(d, '(^|="|>)Afficher les ([0-9,]+) commentaires(?=($|"|<))', "$1"+"Gwelet ar "+"$2"+" poz");
  d = r(d, '(^|="|>)Photos de couverture(?=($|"|<))', "$1"+"Skeudennoù ar voger");
  d = r(d, '(^|="|>)Bienvenue(?=($|"|<))', "$1"+"Degemer mat");
  d = r(d, '(^|="|>)Exprimez-vous(?=($|"|<))', "$1"+"Petra a fell deoc'h ober ?");
  d = r(d, '(^|="|>)Rédiger un commentaire\.\.\.(?=($|"|<))', "$1"+"Skrivañ un tamm poz");
  d = r(d, '(^|="|>)Hier(?=($|"|<))', "$1"+"Dec'h");
  d = r(d, '(^|="|>)Hier, à ([^<"]+)(?=($|"|<))', "$1"+"Dec'h da "+"$2");
  d = r(d, '(^|="|>)Vous et (<a [^>]+>[^<]+</a>) aimez ça\.(?=($|"|<))', "$1"+"Plijout a ra deoc'h ha da "+"$2");
  d = r(d, '(^|="|>)Vous, (<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aimez ça\.(?=($|"|<))', "$1"+"Plijout a ra deoc'h, da "+"$2"+" ha da "+"$3");
  d = r(d, '(^|="|>)Vous aimez\.(?=($|"|<))', "$1"+"Plijout a ra deoc'h");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Genver "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier(?=($|"|<))', "$1"+"$2"+" a viz Genver");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Genver da "+"$3");
  d = r(d, '(^|="|>)janvier(?=($|"|<))', "$1"+"Genver");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Genver "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) février ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz C'hwevrer "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) février(?=($|"|<))', "$1"+"$2"+" a viz C'hwevrer");
  d = r(d, '(^|="|>)([0-9]{1,2}) février, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz C'hwevrer da "+"$3");
  d = r(d, '(^|="|>)février(?=($|"|<))', "$1"+"C'hwevrer");
  d = r(d, '(^|="|>)([0-9]{1,2}) février ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz C'hwevrer "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Meurzh "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars(?=($|"|<))', "$1"+"$2"+" a viz Meurzh");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Meurzh da "+"$3");
  d = r(d, '(^|="|>)mars(?=($|"|<))', "$1"+"Meurzh");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Meurzh "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Ebrel "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril(?=($|"|<))', "$1"+"$2"+" a viz Ebrel");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Ebrel da "+"$3");
  d = r(d, '(^|="|>)avril(?=($|"|<))', "$1"+"Ebrel");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Ebrel "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Mae "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai(?=($|"|<))', "$1"+"$2"+" a viz Mae");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Mae da "+"$3");
  d = r(d, '(^|="|>)mai(?=($|"|<))', "$1"+"Mae");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Mae "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Mezheven "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin(?=($|"|<))', "$1"+"$2"+" a viz Mezheven");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Mezheven da "+"$3");
  d = r(d, '(^|="|>)juin(?=($|"|<))', "$1"+"Mezheven");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Mezheven "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Gouere "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet(?=($|"|<))', "$1"+"$2"+" a viz Gouere");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Gouere da "+"$3");
  d = r(d, '(^|="|>)juillet(?=($|"|<))', "$1"+"Gouere");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Gouere "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) août ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Eost "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) août(?=($|"|<))', "$1"+"$2"+" a viz Eost");
  d = r(d, '(^|="|>)([0-9]{1,2}) août, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Eost da "+"$3");
  d = r(d, '(^|="|>)août(?=($|"|<))', "$1"+"Eost");
  d = r(d, '(^|="|>)([0-9]{1,2}) août ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Eost "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Gwengolo "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre(?=($|"|<))', "$1"+"$2"+" a viz Gwengolo");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Gwengolo da "+"$3");
  d = r(d, '(^|="|>)septembre(?=($|"|<))', "$1"+"Gwengolo");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Gwengolo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Here "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre(?=($|"|<))', "$1"+"$2"+" a viz Here");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Here da "+"$3");
  d = r(d, '(^|="|>)octobre(?=($|"|<))', "$1"+"Here");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Here "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Du "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre(?=($|"|<))', "$1"+"$2"+" a viz Du");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Du da "+"$3");
  d = r(d, '(^|="|>)novembre(?=($|"|<))', "$1"+"Du");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Du "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Kerzu "+"$3"+" da "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre(?=($|"|<))', "$1"+"$2"+" a viz Kerzu");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" a viz Kerzu da "+"$3");
  d = r(d, '(^|="|>)décembre(?=($|"|<))', "$1"+"Kerzu");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" a viz Kerzu "+"$3");
  d = r(d, '(^|="|>)lundi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lun da "+"$2");
  d = r(d, '(^|="|>)lundi(?=($|"|<))', "$1"+"Lun");
  d = r(d, '(^|="|>)mardi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Meurzh da "+"$2");
  d = r(d, '(^|="|>)mardi(?=($|"|<))', "$1"+"Meurzh");
  d = r(d, '(^|="|>)mercredi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Merc'her da "+"$2");
  d = r(d, '(^|="|>)mercredi(?=($|"|<))', "$1"+"Merc'her");
  d = r(d, '(^|="|>)jeudi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yaou da "+"$2");
  d = r(d, '(^|="|>)jeudi(?=($|"|<))', "$1"+"Yaou");
  d = r(d, '(^|="|>)vendredi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gwener da "+"$2");
  d = r(d, '(^|="|>)vendredi(?=($|"|<))', "$1"+"Gwener");
  d = r(d, '(^|="|>)samedi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sadorn da "+"$2");
  d = r(d, '(^|="|>)samedi(?=($|"|<))', "$1"+"Sadorn");
  d = r(d, '(^|="|>)dimanche, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sul da "+"$2");
  d = r(d, '(^|="|>)dimanche(?=($|"|<))', "$1"+"Sul");
  d = r(d, '(^|>)évènement marquant(?=($|<))', "$1"+"darvoud buhez");
  d = r(d, '(^|>)lien(?=($|<))', "$1"+"liamm");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"luc'hskeudenn");
  d = r(d, '(^|>)publication(?=($|<))', "$1"+"kaoz");
  d = r(d, '(^|>)statut(?=($|<))', "$1"+"statud");
  return d;
}

function translateOnInsert( node ) {

  //var logmsg = 'inserted a ' + node.nodeName + ' node; untranslated elements: ';
  for (n = 0; n < tags.length; n++) {
    var tagmatches = node.getElementsByTagName(tags[n]);
    for ( i = 0; i < tagmatches.length; i++ ) {
      // innerHTML often empty (never null)
      if (!tagmatches[i].hasAttribute('indigenous') &&
           tagmatches[i].innerHTML != '') {
        // logmsg = logmsg + tagmatches[i].nodeName + ' ';
        tagmatches[i].innerHTML = translate(tagmatches[i].innerHTML);
        tagmatches[i].setAttribute('indigenous', true);
      }
    }
  }

  var divs = node.getElementsByTagName('div');
  for (i = 0; i < divs.length; i++ ) {
    if (!divs[i].hasAttribute('indigenous')) {
      for (n = 0; n < divclasses.length; n++) {
        if (divs[i].className == divclasses[n]) {
          // logmsg = logmsg + 'DIV.' + divclasses[n] + ' ';
          divs[i].innerHTML = translate(divs[i].innerHTML);
          divs[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }

  var spans = node.getElementsByTagName('span');
  for (i = 0; i < spans.length; i++ ) {
    if (!spans[i].hasAttribute('indigenous')) {
      for (n = 0; n < spanclasses.length; n++) {
        if (spans[i].className == spanclasses[n]) {
          // logmsg = logmsg + 'SPAN.' + spanclasses[n] + ' ';
          spans[i].innerHTML = translate(spans[i].innerHTML);
          spans[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }
  // GM_log(logmsg);
}

// This was (only) needed to handle updates to time stamps
function listen_for_change(evt)
{
  var node = evt.target;
  //GM_log('in change node, data='+node.data+'; was='+evt.prevValue);
  document.body.removeEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  node.data = translate(node.data);
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
}

function listen_for_add(evt)
{
  var node = evt.target;
  if (node.nodeType == document.ELEMENT_NODE &&
      node.nodeName != 'SCRIPT' &&
      node.nodeName != 'INPUT') {
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    translateOnInsert(node);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
  else if (node.nodeType == document.TEXT_NODE) { // time stamps only
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    node.data = translate(node.data);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  // document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
