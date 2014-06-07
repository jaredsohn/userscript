// ==UserScript==
// @name           facebook-fr-x-jer
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Jèrriais
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-04-05
// Translations:   Tony Scott Warren

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" et "+"$4"+" enfilent chennechîn");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" et "+"$3"+" èrpèqu'tîtent "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" et "+"$3"+" en sont en affit");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Septembre, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" auprès d'"+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Dézembre, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" èrplyitchit à "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Novembre, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Févri, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Octobre, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Janvyi, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Août, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Juilet, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Êcri l'nom ou l'adresse d'un couôsîn");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Avri, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Juîn, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" est en affit d'"+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Mar, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" est en affit d'"+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Mai, "+"$3"+" à "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" cliutit un nouvieau portrait");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" èrpèqu'tit "+"$3");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Té et "+"$2"+" en avez en affit");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Vaie toutes les D'mandes d'accouôsinn'nie");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Septembre à "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Dézembre à "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Novembre à "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Févri à "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Octobre à "+"$3");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Vai toutes les "+"$2"+" èrpiques");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Janvyi à "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Août à "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Septembre, "+"$3");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Les cheins qu'tu pouôrrais connaître");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Juilet à "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Dézembre, "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Avri à "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Juîn à "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Novembre, "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Mar à "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" en est en affit");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" en sont en affit");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Févri, "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Octobre, "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Janvyi, "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'Mai à "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Août, "+"$3");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" couôsîns en c'meun");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Juilet, "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Avri, "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Juîn, "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Mar, "+"$3");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" NOUVELLES ARTICL'YES");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Les cheins tch'ont enfilé");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'Mai, "+"$3");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Vai toutes les Criethies");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Tch'est qu'tu en crai?");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mêcrédi à "+"$2");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Fai sèrvi Facebook coumme:");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"Y'a "+"$2"+" minnutes");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"Y'a "+"$2"+" s'gondes");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dînmanche à "+"$2");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"D'mandes d'accouôsinn'nie");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Contrôle du Partitchulyi");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Vendrédi à "+"$2");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sanm'di à "+"$2");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Cliute portrait / vidgo");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Tchaute (hors lîngne)");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"Y'a dans eune minnute");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"Y'a "+"$2"+" heuthes");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" èrpèqu'téthies");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Env'yie un neu M'sage");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Septembre");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jeudi à "+"$2");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Pages èrquémandées");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Dézembre");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mardi à "+"$2");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"Y'a dans eune heuthe");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Mèrquéthie d'compte");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Couôsîns à Tchauter");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Vai touos les M'sages");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Novembre");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lundi à "+"$2");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 couôsîn en c'meun");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"D'mande eune tchestchion");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Grée un Cèrcl'ye");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Souotre acouo d'pages");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Hièr à "+"$2");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Pouch'tées chèrgies");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Vai l'Accouôsinn'nie");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Févri");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Octobre");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Souotre des couôsîns");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Janvyi");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Èrplyique-y");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Appl'yes et gammes");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" pèrsonnes");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Enfile chutte page");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Acouo d's Articl'yes");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Accole des couôsîns");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Met l'Êtat à jour");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Cliôsée d'Portraits");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Tu'en es en affit");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Août");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 nouvelle articl'ye");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Change lé portrait");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Grée eune Annonche");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Juilet");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Bouons Couôsîns");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Éditer ou haler");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Fait dreinement");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Hale la Préveue");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Vai la Vèrsion");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Articl'yes d'achteu");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Met l'înfo à jour");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Avri");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Juîn");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Avaû-l'ieau du Temps");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Mar");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Grée eune Page");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Neu Cèrcl'ye");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"Justément");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Tours et dêtours");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Nouvelles russ'lantes");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" d'Mai");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Èrpèqu'té 1 fais");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Souscriptions");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Livret d'bord");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Jèrriais");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Dêveloppeurs");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Tan Partitchulyi");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Accouôsinne");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"acouo "+"$2");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Contrôles");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Dêfinnissâles");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Neu M'sage");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Criethie");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Tchestchions");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Sponsorîsé");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Sai l'Beinv'nu");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Annonches");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Dreines");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Nouvelles");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Septembre");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Mêcrédi");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Èrplyique");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"couôsîns");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"COUÔSÎNS");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Pas achteu");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Èrchèrche");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Vai acouo");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Dézembre");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"CÈRCL'YES");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Èrpèqu'te");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Novembre");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Dînmanche");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Empliais");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Confirme");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Fanmil'ye");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"M's affits");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Tchitter");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"M'sages");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Portraits");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Èrgrandi");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Vai Tout");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Conditions");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Vendrédi");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Sanm'di");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Flianque");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Almonnas");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"MÈRS");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Des Lians");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"M'sage");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Endraits");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Hièr");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Févri");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Octobre");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Portrait");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Dêfile");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Janvyi");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Jeudi");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Entouor");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"Appl'yes");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Freunme");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Siez-mé");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Musique");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Endrait");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Paûque");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"RARREUNE");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Mardi");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"LISTES");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Env'yie");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Êtat");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Août");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Lundi");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"né(e)");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Aîgue");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Enfile");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Juilet");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Acouo");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"ACOUO");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Achteu");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"postéthie");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Avri");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Juîn");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"un lian");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Carte");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"portrait");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Mar");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Dé");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"êtat");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Mai");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"À");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"Lian");
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
