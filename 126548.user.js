// ==UserScript==
// @name           facebook-ht-x-en
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Haitian Creole
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ak "+"$4"+" renmen sa a.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ak "+"$3"+" pataje "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ak "+"$3"+" renmen sa a.");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" tou pre "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kòmante sou "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Septanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Fevriye, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desanm, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Janvye, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Oktòb, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Antre non yon zanmi ou adrès imel li");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avril, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jiyè, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Out, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mas, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" renmen "+"$3"+".");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jen, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pataje "+"$3"+".");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Ou menm ak "+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" renmen "+"$3"+".");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Me, "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" ajoute yon nouvo foto.");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Afiche tout "+"$2"+" kòmantè yo");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Septanm a "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Fevriye a "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novanm a "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desanm a "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Janvye a "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Oktòb a "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avril a "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Septanm, "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Fevriye, "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jiyè a "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Out a "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mas a "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Novanm, "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Desanm, "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" sa gen kèk segond de sa");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Janvye, "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jen a "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Oktòb, "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" renmen sa a.");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Me a "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Avril, "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jiyè, "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Out, "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mas, "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jen, "+"$3");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Wè Tout Demand Zanmi");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Itilize Facebook an tan ke:");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Kisa ki nan tèt ou?");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Me, "+"$3");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" zanmi ansanm");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Wè tout notifikasyon");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Ekri yon kòmantè...");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mèkredi a "+"$2");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"sa gen kèk segond de sa");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"sa gen yon minit de sa");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Moun ki renmen sa a");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Vandredi a "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" èd tan de sa");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minit de sa");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" NOUVO ISTWA");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Voye yon Nouvo Mesaj");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Samdi a "+"$2");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dimanch a "+"$2");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Ajoute Foto / Videyo");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jedi a "+"$2");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"a pe prè inèd tan");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Moun ou Ka Konnen");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lendi a "+"$2");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Madi a "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Septanm");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Chat (Dekonekte)");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Ayè a "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Fevriye");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Aplikasyon ak Jwèt");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Kreye yon Gwoup");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Paramèt Vi Prive");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Novanm");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Desanm");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Janvye");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Oktòb");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Kreye yon Piblisite");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Modifye ou Retire");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Kreyòl Ayisyen");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Paj Rekòmande");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Modifye Enfòmasyon");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Ou renmen sa a.");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 zanmi ansanm");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Paramèt Kont");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Jwenn Plis Paj");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Zanmi nan Chat");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Renmen Paj Sa a");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Chajman Selilè");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Nouvo Gwoup...");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Aktivite Resan");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Wè Tradiksyon");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Avril");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Jiyè");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Out");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Jounal Aktivite");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Chanje Kouvèti");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" pataj");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Demand Zanmi");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Nouvo Alimantasyon");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Retire Apèsi");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Enfòmasyon an Dirèk");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Modifye Estati");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Mas");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Kreye yon Paj");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" moun");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Modifye Opsyon");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Zanmi Pwòch");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Jen");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Zanmi Pwòch");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Chèche Zanmi");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Notifikasyon");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 NOUVO ISTWA");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Enskripsyon");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Me");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Poze Kesyon");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Nou kontan wè w");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Ajoute Zanmi");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Evenman Lavi");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Plis Istwa");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Nouvo Mesaj");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" Lòt");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Plis Istwa");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Foto Mi an");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Piblisite");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Esponsorize");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Tag Zanmi");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Pi Resan");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Devlopè");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Pa Kounye a");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Tout la vi");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Mèkredi");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Kòmantè");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Dekonekte");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Chanje Tay");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Wè Plis");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Septanm");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"FAVORI");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Vi Prive");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Kesyon");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Wè Tout");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Pa Renmen");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Fevriye");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 pataj");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Konsènan");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"Aplikasyon");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Konfime");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Novanm");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Desanm");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Vandredi");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Karyè");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Evenman");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Mesaj");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Pwofil");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Chèche");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Ayè");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Janvye");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oktòb");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Samdi");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Dimanch");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Zanmi");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"ZANMI");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Estati");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Jedi");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Anile");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Fèmen");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Fanmi");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"GWOUP");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Renmen");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Kounye a");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Pataje");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Lendi");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Madi");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Renmen");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Mizik");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Foto");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Kote");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Salye");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Avril");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"yon lyen");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Akèy");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Lyen");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Nòt");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Foto");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Kote");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"RANJE");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Tèm");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Jiyè");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Out");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Fèt");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"LIS");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Plis");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"PLIS");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"PAJ");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Voye");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Mas");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Èd");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"estati");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Jen");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Kat");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Pa");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"A:");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Me");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"foto");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"lyen");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"pòs");
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
