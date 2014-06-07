// ==UserScript==
// @name           Google Rapidshare Blog Search German
// @namespace      http://blogsearch.google.de/
// @include        http://blogsearch.google.*
// ==/UserScript==

// Deutsche Version by Dark_Rabbitz (darkrabbitz@mail.ru)
// Mit Dank an die Autoren der englischen Version. (http://userscripts.org/scripts/show/13451)
// Verbesserte Suche für mehr Ergebnisse. Blog Suche Version

// Variable zu "true" ändern, wenn rapidshare.com durchsucht werden soll.
rsCom = true;

// Variable zu "true" ändern, wenn rapidshare.de durchsucht werden soll.
rsDe  = false;


// Hier nichts verändern!
arama = "";
if(rsCom){arama+=" intext:rapidshare.com";}
if(rsDe) {arama+=" intext:rapidshare.de";}
sBtn = document.getElementsByName("btnW")[0]; sBtn.type = "button"; sBtn.value = "Rapidshare durchsuchen!";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");
