// ==UserScript==
// @name            Serienjunkies.org-Skip Enter
// @namespace       Serienjunkies.org-Skip Enter
// @description     Bei www.serienjunkies.org die Enterpage überspringen
// @include         http://*serienjunkies.org/enter/*
// ==/UserScript==
a = document.location.href.match(/enter\/(.*)/ig);
b = RegExp.$1; // = t  
document.location.href = 'http://serienjunkies.org/'+b;