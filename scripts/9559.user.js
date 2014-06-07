// ==UserScript==
// @name Search File With NewzLeech
// @namespace http://blog.lagon-bleu.org/wordpress/greasemonkey/
// @description Add a link to NewzLeech
// @include http://www.binnews.info/_bin/liste.php?*
// @include http://www.binnews.info/_bin/search.php?*
// @include http://www.binnews.info/_bin/lastrefs.php?*
// ==/UserScript==

// pour chaque lien, on cherche si c'est un lien qui contient "ng_id="
// si c'est le cas, c'est la case suivante qui nous intéresse
for (var i=0; i < document.getElementsByTagName('a').length; i++) {
var matches = document.getElementsByTagName('a')[i].href.match(/ng_id=/);
if (matches) {
// on remonte jusqu'au nom TD
var sNom = "";
var bBoucle = true;
var oNode = document.getElementsByTagName('a')[i];
do {
oNode = oNode.parentNode;
sNom = oNode.nodeName;
if (sNom == "BODY") bBoucle = false; // si on atteind le body c'est qu'on est pas bon...
} while ((sNom != "TD") && (bBoucle == true));

if (bBoucle == false) continue;

// on passe à la prochaine case
do {
oNode = oNode.nextSibling;
sName = oNode.nodeName;
if (sNom == "BODY") bBoucle = false; // si on atteind le body c'est qu'on est pas bon...
} while ((sName != "TD") && (bBoucle == true));

if (bBoucle == false) continue;

// on regarde s'il n'y a pas déjà notre lien
var matches = oNode.innerHTML.match(/alt="NewzLeech"/);
if (!matches) {
var str = oNode.innerHTML;
str = str.replace(/ /g, "+"); // bug de charset sous GNU/Linux, indiqué par CiRiX.fr
var str2 = "[<a style=\"color: white; background-color: #5881c3\" href=\"http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q="+encodeURI(str)+"&mode=usenet&adv=\" target=\"_blank\" alt=\"NewzLeech\">NewzLeech</a>][<a style=\"color: white; background-color: #5881c3\" href=\"http://binsearch.info/?q="+encodeURI(str)+"&mode=usenet&adv=\" target=\"_blank\" alt=\"BinSearch\">BinSearch</a>][<a style=\"color: white; background-color: #5881c3\" href=\"http://yabse.com/index.php?q="+encodeURI(str)+"&group=&colonly=0&age=365&sizecond=min&size=0&sort=sdanf&limit=&lang=fr\" target=\"_blank\" alt=\"Yabse\">Yabse</a>]";
oNode.innerHTML = str + " " + str2;
}
}
}