// ==UserScript==
// @name Nzb Binnews.in
// @namespace http://blog.lagon-bleu.org/wordpress/greasemonkey/
// @description Add a link to NewzLeech
// @include http://www.binnews.info/_bin/liste.php?*
// @include http://www.binnews.info/_bin/search.php?*
// @include http://www.binnews.info/_bin/lastrefs.php?*
// @include http://www.binnews.in/_bin/liste.php?*
// @include http://www.binnews.in/_bin/search.php?*
// @include http://www.binnews.in/_bin/lastrefs.php?*
// ==/UserScript==

// pour chaque lien, on cherche si c'est un lien qui contient "ng_id="
// si c'est le cas, c'est la case suivante qui nous intÃ©resse
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

// on passe Ã  la prochaine case
do {
oNode = oNode.nextSibling;
sName = oNode.nodeName;
if (sNom == "BODY") bBoucle = false; // si on atteind le body c'est qu'on est pas bon...
} while ((sName != "TD") && (bBoucle == true));

if (bBoucle == false) continue;

// on regarde s'il n'y a pas dÃ©jÃ  notre lien
var matches = oNode.innerHTML.match(/alt="NewzLeech"/);
if (!matches) {
var str = oNode.innerHTML;
str = str.replace(/ /g, "+"); // bug de charset sous GNU/Linux, indiquÃ© par CiRiX.fr
var str2 = "<a style=\"color: white;\" href=\"http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q="+encodeURI(str)+"&mode=usenet&adv=\" target=\"_blank\" alt=\"NewzLeech\"><img src=\"http://www.newzleech.com/favicon.ico\" /></a>&nbsp;&nbsp;&nbsp;&nbsp;<a style=\"color: white; background-color: #5881c3\" href=\"http://binsearch.info/?q="+encodeURI(str)+"&mode=usenet&adv=\" target=\"_blank\" alt=\"BinSearch\"><img src=\"http://mycroft.mozdev.org/update.php/id0/binsearch.png\" /></a>";
oNode.innerHTML = str + " " + str2;
}
}
}