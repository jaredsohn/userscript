// ==UserScript==
// @name           German-Bash.org Werbefrei 1.1 (16.06.2009)
// @namespace      http://gordon_vdlg.byethost16.com
// @description    Killt unten die Box mit der Überschrift "Werbung" samt Inhalt, den Rest übernimmt Adblock Plus...
// @include        http://german-bash.org/*
// @include        http://www.german-bash.org/*
// ==/UserScript==

var sp;
        
for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
  if (document.getElementsByTagName("div")[i].innerHTML == "Werbung") {
    sp = document.getElementsByTagName("div")[i-1];
    sp.parentNode.removeChild(sp);
  }
}

if (document.URL.indexOf("german-bash.org/action/random") > -1) {
  for (var i = 0; i < document.getElementsByTagName("div").length; i++) {
    if (document.getElementsByTagName("div")[i].className == "content") {
      var neuesdiv = document.createElement("center");
      neuesdiv.innerHTML = '<center><a href="http://german-bash.org/action/random">Mehr...</a></center>';
      document.getElementsByTagName("div")[i].appendChild(neuesdiv);
    }
  }
}