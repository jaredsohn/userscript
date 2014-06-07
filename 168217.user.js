// ==UserScript==
//
// @name           Pol bypass
// @description    Pol bypass 
// @namespace      http://www.madskonradsen.dk
// @author         madskonradsen 
// @version        1.0
// @include        http://politiken.dk/*
// @include        https://politiken.dk/*
// @include        http://www.politiken.dk/*
// @include        https://www.politiken.dk/*
// @history        1.0 first version
//
// ==/UserScript==

void(document.cookie="polmtr=lol;domain=.politiken.dk;path=/");
void(document.cookie="polmtrviews=lol;domain=.politiken.dk;path=/");
void(document.cookie="pcoq_hits=lol;domain=.politiken.dk;path=/");
localStorage.clear();