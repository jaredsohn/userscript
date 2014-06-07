// ==UserScript==
// @name           ubuntu-redirect-kubuntu
// @namespace      sputnick
// @description    rediriger de http://*ubuntu-fr.org vers http://*.kubuntu-fr.org
// @include        http://*ubuntu-fr.org/*
// ==/UserScript==
//
// écrit en 2010 par sputnick
// contributeur : eisd du canal IRC #javascript sur freenode et chopinhauer du forum ubuntu-fr.org

/(?:forum|doc|www)\.ubuntu-fr\.org/.exec(location.host) && location.replace(location.href.replace("ubuntu-fr.org", "kubuntu-fr.org"));

ownh2 = document.getElementsByTagName("h2");

for (var i=0; i<ownh2.length; i++) {
        ownh2[i].style.backgroundImage = "none";
}
