// ==UserScript==
// @name           F1-Live anti auto-refresh
// @namespace      
// @description    Retire le rafraîchissement automatique sur le site F1-Live.com
// @include        http://fr.f1-live.com/f1/fr/infos/actualites/*
// @include        http://fr.f1-live.com/f1/fr/index.shtml
// @version        1.0
// @author         Madcat
// ==/UserScript==



// retire le rafraîchissement auto. Ce script est basé sur la méthode décrite dans ce wiki:  http://dunck.us/collab/DisableAutoRefresh?action=highlight&value=GreaseMonkeyUserScriptRequest

var stopTimer = window.setTimeout("window.stop();",
     (179)*1000); // in case load hasn't finished when the refresh fires
 window.addEventListener("load", function(){
   try { window.clearTimeout(stopTimer); } catch(ex) {alert("Une exception JavaScript a été générée.");}
   window.stop();
 }, true);



// retire le bandeau défilant

bandeau=document.getElementById('flash_racing');
bandeau.style.visibility = 'hidden';
