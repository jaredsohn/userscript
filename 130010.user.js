// ==UserScript==
// @name           facebook-ht
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Haitian Creole
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.0
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-04-02
// Translations:   Jean Came Poulard

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
tags.push('a');      // many...
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ak "+"$4"+" renmen sa a.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) ont partagé (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ak "+"$3"+" pataje "+"$4"+".");
  d = r(d, '(^|="|>)Entrez le nom ou l’adresse électronique d’un\\(e\\) ami\\(e\\)(?=($|"|<))', "$1"+"Antre non yon zanmi ou adrès imel li");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>), à proximité de (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" tou pre "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) et (<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"$2"+" ak "+"$3"+" renmen sa a.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a commenté une? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kòmante sou "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Septanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) février ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Fevriye, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a partagé (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pataje "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Janvye, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Oktòb, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime une? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" renmen "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jiyè, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avril, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)Vous et (<a [^>]+>[^<]+</a>) aimez ça\.(?=($|"|<))', "$1"+"Ou menm ak "+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)([0-9]{1,2}) août ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Out, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) a ajouté une photo\.(?=($|"|<))', "$1"+"$2"+" ajoute yon nouvo foto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" renmen "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mas, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jen, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)Afficher les ([0-9,]+) commentaires(?=($|"|<))', "$1"+"Afiche tout "+"$2"+" kòmantè yo");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai ([0-9]{4}), ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Me, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)Utiliser Facebook en tant que :(?=($|"|<))', "$1"+"Itilize Facebook an tan ke:");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Septanm a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) février, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Fevriye a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desanm a "+"$3");
  d = r(d, '(^|="|>)Voir toutes les demandes de contact(?=($|"|<))', "$1"+"Wè Tout Demand Zanmi");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novanm a "+"$3");
  d = r(d, '(^|="|>)Il y a ([0-9,]+) secondes(?=($|"|<))', "$1"+"$2"+" sa gen kèk segond de sa");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Janvye a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Oktòb a "+"$3");
  d = r(d, '(^|="|>)Afficher toutes les notifications(?=($|"|<))', "$1"+"Wè tout notifikasyon");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jiyè a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Septanm, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) février ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Fevriye, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avril a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Desanm, "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aiment ça\.(?=($|"|<))', "$1"+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)Demandes d’ajout à la liste d’amis(?=($|"|<))', "$1"+"Demand Zanmi");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Novanm, "+"$3");
  d = r(d, '(^|="|>)Rédiger un commentaire\.\.\.(?=($|"|<))', "$1"+"Ekri yon kòmantè...");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Janvye, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) août, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Out a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Oktòb, "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) aime ça\.(?=($|"|<))', "$1"+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)([0-9,]+) ami\\(e\\)s en commun(?=($|"|<))', "$1"+"$2"+" zanmi ansanm");
  d = r(d, '(^|="|>)Vous connaissez peut-être\.\.\.(?=($|"|<))', "$1"+"Moun ou Ka Konnen");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mas a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jen a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jiyè, "+"$3");
  d = r(d, '(^|="|>)il y a quelques secondes(?=($|"|<))', "$1"+"sa gen kèk segond de sa");
  d = r(d, '(^|="|>)([0-9,]+) nouvelles actualités(?=($|"|<))', "$1"+"$2"+" NOUVO ISTWA");
  d = r(d, '(^|="|>)Paramètres de confidentialité(?=($|"|<))', "$1"+"Paramèt Vi Prive");
  d = r(d, '(^|="|>)il y a environ une minute(?=($|"|<))', "$1"+"sa gen yon minit de sa");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Avril, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai, ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Me a "+"$3");
  d = r(d, '(^|="|>)Discussion instantanée \.\.\.(?=($|"|<))', "$1"+"Chat (Dekonekte)");
  d = r(d, '(^|="|>)Envoyer un nouveau message(?=($|"|<))', "$1"+"Voye yon Nouvo Mesaj");
  d = r(d, '(^|="|>)([0-9]{1,2}) août ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Out, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mas, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jen, "+"$3");
  d = r(d, '(^|="|>)Il y a environ une heure(?=($|"|<))', "$1"+"a pe prè inèd tan");
  d = r(d, '(^|="|>)Personnes qui aiment ça(?=($|"|<))', "$1"+"Moun ki renmen sa a");
  d = r(d, '(^|="|>)Il y a ([0-9,]+) heures(?=($|"|<))', "$1"+"$2"+" èd tan de sa");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Me, "+"$3");
  d = r(d, '(^|="|>)mercredi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mèkredi a "+"$2");
  d = r(d, '(^|="|>)vendredi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Vandredi a "+"$2");
  d = r(d, '(^|="|>)Il y a ([0-9,]+) minutes(?=($|"|<))', "$1"+"$2"+" minit de sa");
  d = r(d, '(^|="|>)dimanche, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dimanch a "+"$2");
  d = r(d, '(^|="|>)Créer une publicité(?=($|"|<))', "$1"+"Kreye yon Piblisite");
  d = r(d, '(^|="|>)Téléchargements mobiles(?=($|"|<))', "$1"+"Chajman Selilè");
  d = r(d, '(^|="|>)Applications et jeux(?=($|"|<))', "$1"+"Aplikasyon ak Jwèt");
  d = r(d, '(^|="|>)Actualiser mes infos(?=($|"|<))', "$1"+"Modifye Enfòmasyon");
  d = r(d, '(^|="|>)Voir les liens d’amitié(?=($|"|<))', "$1"+"Zanmi Pwòch");
  d = r(d, '(^|="|>)Créer un groupe\.\.\.(?=($|"|<))', "$1"+"Kreye yon Gwoup");
  d = r(d, '(^|="|>)Français \\(France\\)(?=($|"|<))', "$1"+"Kreyòl Ayisyen");
  d = r(d, '(^|="|>)samedi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Samdi a "+"$2");
  d = r(d, '(^|="|>)1 ami\\(e\\) en commun(?=($|"|<))', "$1"+"1 zanmi ansanm");
  d = r(d, '(^|="|>)Changer la couverture(?=($|"|<))', "$1"+"Chanje Kouvèti");
  d = r(d, '(^|="|>)Modifier ou retirer(?=($|"|<))', "$1"+"Modifye ou Retire");
  d = r(d, '(^|="|>)Fil d’actualité(?=($|"|<))', "$1"+"Nouvo Alimantasyon");
  d = r(d, '(^|="|>)lundi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lendi a "+"$2");
  d = r(d, '(^|="|>)Historique personnel(?=($|"|<))', "$1"+"Jounal Aktivite");
  d = r(d, '(^|="|>)Identifier des ami\\(e\\)s(?=($|"|<))', "$1"+"Tag Zanmi");
  d = r(d, '(^|="|>)([0-9]{1,2}) septembre(?=($|"|<))', "$1"+"$2"+" Septanm");
  d = r(d, '(^|="|>)mardi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Madi a "+"$2");
  d = r(d, '(^|="|>)jeudi, à ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jedi a "+"$2");
  d = r(d, '(^|="|>)Paramètres du compte(?=($|"|<))', "$1"+"Paramèt Kont");
  d = r(d, '(^|="|>)Modifier les options(?=($|"|<))', "$1"+"Modifye Opsyon");
  d = r(d, '(^|="|>)J’aime cette Page(?=($|"|<))', "$1"+"Renmen Paj Sa a");
  d = r(d, '(^|="|>)Supprimer l’aperçu(?=($|"|<))', "$1"+"Retire Apèsi");
  d = r(d, '(^|="|>)([0-9]{1,2}) février(?=($|"|<))', "$1"+"$2"+" Fevriye");
  d = r(d, '(^|="|>)([0-9]{1,2}) décembre(?=($|"|<))', "$1"+"$2"+" Desanm");
  d = r(d, '(^|="|>)Pages recommandées(?=($|"|<))', "$1"+"Paj Rekòmande");
  d = r(d, '(^|="|>)Exprimez-vous(?=($|"|<))', "$1"+"Kisa ki nan tèt ou?");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre(?=($|"|<))', "$1"+"$2"+" Novanm");
  d = r(d, '(^|="|>)Photo/vidéo(?=($|"|<))', "$1"+"Ajoute Foto / Videyo");
  d = r(d, '(^|="|>)Rechercher des amis(?=($|"|<))', "$1"+"Chèche Zanmi");
  d = r(d, '(^|="|>)Évènement marquant(?=($|"|<))', "$1"+"Evenman Lavi");
  d = r(d, '(^|="|>)Activité récente(?=($|"|<))', "$1"+"Aktivite Resan");
  d = r(d, '(^|="|>)Voir la traduction(?=($|"|<))', "$1"+"Wè Tradiksyon");
  d = r(d, '(^|="|>)([0-9]{1,2}) janvier(?=($|"|<))', "$1"+"$2"+" Janvye");
  d = r(d, '(^|="|>)([0-9]{1,2}) octobre(?=($|"|<))', "$1"+"$2"+" Oktòb");
  d = r(d, '(^|>)([0-9,]+) autres personnes(?=($|<))', "$1"+"$2"+" Lòt");
  d = r(d, '(^|="|>)Afficher tous les messages(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)([0-9]{1,2}) juillet(?=($|"|<))', "$1"+"$2"+" Jiyè");
  d = r(d, '(^|="|>)Plus d’actualités(?=($|"|<))', "$1"+"Plis Istwa");
  d = r(d, '(^|="|>)Conditions d’utilisation(?=($|"|<))', "$1"+"Tèm");
  d = r(d, '(^|="|>)Photos de couverture(?=($|"|<))', "$1"+"Foto Mi an");
  d = r(d, '(^|="|>)Hier, à ([^<" ]+)(?=($|"|<))', "$1"+"Ayè a "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) personnes(?=($|"|<))', "$1"+"$2"+" moun");
  d = r(d, '(^|="|>)([0-9,]+) partages(?=($|"|<))', "$1"+"$2"+" pataj");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Jwenn Plis Paj");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Nouvo Gwoup...");
  d = r(d, '(^|="|>)([0-9]{1,2}) avril(?=($|"|<))', "$1"+"$2"+" Avril");
  d = r(d, '(^|="|>)Créer une Page(?=($|"|<))', "$1"+"Kreye yon Paj");
  d = r(d, '(^|="|>)Amis présents(?=($|"|<))', "$1"+"Zanmi nan Chat");
  d = r(d, '(^|="|>)Télex(?=($|"|<))', "$1"+"Enfòmasyon an Dirèk");
  d = r(d, '(^|="|>)Vous aimez\.(?=($|"|<))', "$1"+"Ou renmen sa a.");
  d = r(d, '(^|="|>)([0-9]{1,2}) août(?=($|"|<))', "$1"+"$2"+" Out");
  d = r(d, '(^|="|>)Nouveau message(?=($|"|<))', "$1"+"Nouvo Mesaj");
  d = r(d, '(^|="|>)Lien commercial(?=($|"|<))', "$1"+"Esponsorize");
  d = r(d, '(^|="|>)([0-9]{1,2}) mars(?=($|"|<))', "$1"+"$2"+" Mas");
  d = r(d, '(^|="|>)([0-9]{1,2}) juin(?=($|"|<))', "$1"+"$2"+" Jen");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Notifikasyon");
  d = r(d, '(^|="|>)Pas maintenant(?=($|"|<))', "$1"+"Pa Kounye a");
  d = r(d, '(^|="|>)Afficher la suite(?=($|"|<))', "$1"+"Wè Plis");
  d = r(d, '(^|="|>)Je n’aime plus(?=($|"|<))', "$1"+"Pa Renmen");
  d = r(d, '(^|="|>)Bienvenue(?=($|"|<))', "$1"+"Nou kontan wè w");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 NOUVO ISTWA");
  d = r(d, '(^|="|>)Amis proches(?=($|"|<))', "$1"+"Zanmi Pwòch");
  d = r(d, '(^|="|>)Confidentialité(?=($|"|<))', "$1"+"Vi Prive");
  d = r(d, '(^|="|>)([0-9]{1,2}) mai(?=($|"|<))', "$1"+"$2"+" Me");
  d = r(d, '(^|="|>)Mentions J’aime(?=($|"|<))', "$1"+"Renmen");
  d = r(d, '(^|="|>)Applications(?=($|"|<))', "$1"+"Aplikasyon");
  d = r(d, '(^|="|>)Plus récentes(?=($|"|<))', "$1"+"Pi Resan");
  d = r(d, '(^|="|>)Abonnements(?=($|"|<))', "$1"+"Enskripsyon");
  d = r(d, '(^|="|>)À propos de(?=($|"|<))', "$1"+"Konsènan");
  d = r(d, '(^|="|>)Développeurs(?=($|"|<))', "$1"+"Devlopè");
  d = r(d, '(^|="|>)Déconnexion(?=($|"|<))', "$1"+"Dekonekte");
  d = r(d, '(^|="|>)Afficher tout(?=($|"|<))', "$1"+"Wè Tout");
  d = r(d, '(^|="|>)Statut(?=($|"|<))', "$1"+"Modifye Estati");
  d = r(d, '(^|="|>)Ajouter(?=($|"|<))', "$1"+"Ajoute Zanmi");
  d = r(d, '(^|="|>)Publicité(?=($|"|<))', "$1"+"Piblisite");
  d = r(d, '(^|="|>)Question(?=($|"|<))', "$1"+"Poze Kesyon");
  d = r(d, '(^|="|>)Évènements(?=($|"|<))', "$1"+"Evenman");
  d = r(d, '(^|="|>)À la une(?=($|"|<))', "$1"+"Plis Istwa");
  d = r(d, '(^|="|>)Commenter(?=($|"|<))', "$1"+"Kòmantè");
  d = r(d, '(^|="|>)Maintenant(?=($|"|<))', "$1"+"Kounye a");
  d = r(d, '(^|="|>)En avant(?=($|"|<))', "$1"+"Chanje Tay");
  d = r(d, '(^|="|>)Journal(?=($|"|<))', "$1"+"Tout la vi");
  d = r(d, '(^|="|>)1 partage(?=($|"|<))', "$1"+"1 pataj");
  d = r(d, '(^|="|>)Confirmer(?=($|"|<))', "$1"+"Konfime");
  d = r(d, '(^|="|>)Recherche(?=($|"|<))', "$1"+"Chèche");
  d = r(d, '(^|="|>)septembre(?=($|"|<))', "$1"+"Septanm");
  d = r(d, '(^|="|>)mercredi(?=($|"|<))', "$1"+"Mèkredi");
  d = r(d, '(^|="|>)vendredi(?=($|"|<))', "$1"+"Vandredi");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Kesyon");
  d = r(d, '(^|="|>)février(?=($|"|<))', "$1"+"Fevriye");
  d = r(d, '(^|="|>)décembre(?=($|"|<))', "$1"+"Desanm");
  d = r(d, '(^|="|>)dimanche(?=($|"|<))', "$1"+"Dimanch");
  d = r(d, '(^|="|>)J’aime(?=($|"|<))', "$1"+"Renmen");
  d = r(d, '(^|="|>)Message :(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)Partager(?=($|"|<))', "$1"+"Pataje");
  d = r(d, '(^|="|>)novembre(?=($|"|<))', "$1"+"Novanm");
  d = r(d, '(^|="|>)Naissance(?=($|"|<))', "$1"+"Fèt");
  d = r(d, '(^|="|>)Emplois(?=($|"|<))', "$1"+"Karyè");
  d = r(d, '(^|="|>)Favoris(?=($|"|<))', "$1"+"FAVORI");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)janvier(?=($|"|<))', "$1"+"Janvye");
  d = r(d, '(^|="|>)octobre(?=($|"|<))', "$1"+"Oktòb");
  d = r(d, '(^|="|>)Annuler(?=($|"|<))', "$1"+"Anile");
  d = r(d, '(^|="|>)Fermer(?=($|"|<))', "$1"+"Fèmen");
  d = r(d, '(^|="|>)Famille(?=($|"|<))', "$1"+"Fanmi");
  d = r(d, '(^|="|>)Groupes(?=($|"|<))', "$1"+"GWOUP");
  d = r(d, '(^|="|>)Accueil(?=($|"|<))', "$1"+"Akèy");
  d = r(d, '(^|="|>)Musique(?=($|"|<))', "$1"+"Mizik");
  d = r(d, '(^|="|>)Articles(?=($|"|<))', "$1"+"Nòt");
  d = r(d, '(^|="|>)Profil(?=($|"|<))', "$1"+"Pwofil");
  d = r(d, '(^|="|>)Statut(?=($|"|<))', "$1"+"Estati");
  d = r(d, '(^|="|>)juillet(?=($|"|<))', "$1"+"Jiyè");
  d = r(d, '(^|="|>)Envoyer(?=($|"|<))', "$1"+"Voye");
  d = r(d, '(^|="|>)samedi(?=($|"|<))', "$1"+"Samdi");
  d = r(d, '(^|>)un lien(?=($|<))', "$1"+"yon lyen");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Foto");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Salye");
  d = r(d, '(^|>)publication(?=($|<))', "$1"+"pòs");
  d = r(d, '(^|="|>)Ordre(?=($|"|<))', "$1"+"RANJE");
  d = r(d, '(^|="|>)avril(?=($|"|<))', "$1"+"Avril");
  d = r(d, '(^|="|>)lundi(?=($|"|<))', "$1"+"Lendi");
  d = r(d, '(^|="|>)Amis(?=($|"|<))', "$1"+"Zanmi");
  d = r(d, '(^|="|>)AMIS(?=($|"|<))', "$1"+"ZANMI");
  d = r(d, '(^|="|>)Liens(?=($|"|<))', "$1"+"Lyen");
  d = r(d, '(^|="|>)Listes(?=($|"|<))', "$1"+"LIS");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Foto");
  d = r(d, '(^|="|>)Lieux(?=($|"|<))', "$1"+"Kote");
  d = r(d, '(^|="|>)mardi(?=($|"|<))', "$1"+"Madi");
  d = r(d, '(^|="|>)jeudi(?=($|"|<))', "$1"+"Jedi");
  d = r(d, '(^|="|>)Carte(?=($|"|<))', "$1"+"Kat");
  d = r(d, '(^|="|>)Plus(?=($|"|<))', "$1"+"Plis");
  d = r(d, '(^|="|>)Plus(?=($|"|<))', "$1"+"PLIS");
  d = r(d, '(^|="|>)Pages(?=($|"|<))', "$1"+"PAJ");
  d = r(d, '(^|="|>)Lieu(?=($|"|<))', "$1"+"Kote");
  d = r(d, '(^|="|>)Hier(?=($|"|<))', "$1"+"Ayè");
  d = r(d, '(^|="|>)août(?=($|"|<))', "$1"+"Out");
  d = r(d, '(^|="|>)Par :(?=($|"|<))', "$1"+"Pa");
  d = r(d, '(^|="|>)Aide(?=($|"|<))', "$1"+"Èd");
  d = r(d, '(^|>)statut(?=($|<))', "$1"+"estati");
  d = r(d, '(^|="|>)mars(?=($|"|<))', "$1"+"Mas");
  d = r(d, '(^|="|>)juin(?=($|"|<))', "$1"+"Jen");
  d = r(d, '(^|="|>)À :(?=($|"|<))', "$1"+"A:");
  d = r(d, '(^|="|>)mai(?=($|"|<))', "$1"+"Me");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"foto");
  d = r(d, '(^|>)lien(?=($|<))', "$1"+"lyen");
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

// This is (only) needed to handle updates to time stamps
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
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
