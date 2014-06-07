// ==UserScript==
// @name           SearchAndHideFreeRef
// @namespace      test
// @description    Recherche et cache les refs non dispo sur free
// @include        http://www.binnews.in/index.php?country=fr
// ==/UserScript==

// pour chaque lien, on cherche si c'est un lien qui contient "157492"
for (var i=0; i < document.getElementsByTagName('a').length; i++) {
  var matches = document.getElementsByTagName('a')[i].href.match(/157492/);
  if (matches) {
    // on remonte jusqu'au nom TR
    var sNom = "";
    var bBoucle = true;
    var oNode = document.getElementsByTagName('a')[i];
    do {
      oNode = oNode.parentNode;
      sNom  = oNode.nodeName;
	  
	  if (sNom == "BODY") bBoucle = false; // si on atteind le body c'est qu'on est pas bon...
    } while ((sNom != "TR") && (bBoucle == true));
    if (bBoucle == false) continue;
    
    // on regarde s'il la ligne n'est pas deja cacher
   oNode.style.display='none';
    
  }
}