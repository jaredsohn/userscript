// ==UserScript==
// @name           Don't want to log in mtp-night
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    Pass over the log status to see pictures
// @version        2007061400
// @include        http://www.mtp-night.com/sorties/photos*
// ==/UserScript==

for (var i=0; i < document.getElementsByTagName('img').length; i++) {
  var matches = document.getElementsByTagName('img')[i].src.match(/photos_test/);
  if (matches) {
    var bBoucle = true;
    var sUrl = document.getElementsByTagName('img')[i].src;
    // on remonte jusqu'au A avant
    var oNode = document.getElementsByTagName('img')[i];
    do {
      oNode = oNode.parentNode;
      sNom  = oNode.nodeName;
      if (sNom == "BODY") bBoucle = false; // si on atteind le body c'est qu'on est pas bon...
    } while ((sNom != "A") && (bBoucle == true));
    
    if (bBoucle == false) continue;
    
    // on change l'url
    oNode.href = sUrl.replace("miniatures/","");
    oNode.target = "_blank";    
    
    // on monte au père P
    oNode = oNode.parentNode
    oNode.innerHTML = oNode.innerHTML.replace("onclick","title");
  }
}