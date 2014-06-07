// ==UserScript==
// @name           Uploadet NoWait
// @namespace      Uploadet Nowait
// @description    Hiermit muss man keine 10 Sekunden warten bis man die Datei downloaden kann
// @include        http://uploaded.to/?id=*
// ==/UserScript==
var doc =   document.getElementById("download_submit");
doc.value = "Free Download by Metoin";
doc.disabled=false;
doc.id = "dd";
doc.onclick = "";
doc.style.width = "180px";