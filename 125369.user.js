// ==UserScript==
// @name           ubuntu-redirect-xubuntu
// @namespace      sputnick
// @description    rediriger de http://*.ubuntu-fr.org et http://*.kubuntu-fr.org vers  http://*.xubuntu-fr.org
// @include        http://*.ubuntu-fr.org/*
// @include        http://*.kubuntu-fr.org/*
// ==/UserScript==
//
// écrit en 2012 par sputnick

var regUrl = /\.k?ubuntu-fr.org/i;
location.replace(location.href.replace(regUrl, ".xubuntu-fr.org"));
   
