// ==UserScript==
// @name           [BinNews] Lien direct vers Binsearch et NZBIndex
// @namespace      http://blog.lagon-bleu.org/wordpress/greasemonkey/
// @description    Ajoute un lien vers BinSearch et NZBIndex sur le site BinNews
// @include        http://www.binnews.in/_bin/liste.php*
// ==/UserScript==

// pour chaque lien, on cherche si c'est un lien qui contient "ng_id="
// si c'est le cas, c'est la case suivante qui nous intéresse
var links = document.querySelectorAll('a.c16');
for (var i=0; i < links.length; i++) {
  var matches = links[i].href.match(/ng_id=/);
  if (matches) {
    // on remonte jusqu'au nom TD
    var sNom = "";
    var bBoucle = true;
    var oNode = links[i];
    do {
      oNode = oNode.parentNode;
      sNom  = oNode.nodeName;
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
    var matches = oNode.innerHTML.match(/alt="binSearch"/);
    if (!matches) {
      var str  = oNode.innerHTML;
      str = str.replace(/ /g, "+"); // bug de charset sous GNU/Linux, indiqué par CiRiX.fr
      var str2 = "[<a style=\"color: #F5F5F5; background-color: black\" href=\"http://binsearch.info/?q="+str+"&adv_age=14\" target=\"_blank\" alt=\"binSearch\">binSearch</a>]";
      //var str3 = "[<a style=\"color: red;\" href=\"http://www.yabsearch.nl/search/"+str+"\" target=\"_blank\" alt=\"YabSearch\">YabSearch</a>]";
      var str3 = "[<a style=\"color: red;\" href=\"http://www.nzbindex.nl/search/?q="+str+"\" target=\"_blank\" alt=\"NZBIndex\">NZBIndex</a>]";
      oNode.innerHTML = str + " " + str2 + " " + str3;
    }
  }
}