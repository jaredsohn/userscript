// ==UserScript==
// @name           Facebook Morrasense
// @namespace      *
// @author         kenkeiras
// @description    Morrasensisa facebook!
// @include        *.facebook.com/*
// ==/UserScript==

var like = document.getElementsByClassName("liketext");
for( var i = 0; i < like.length; i++ ){
    like[i].textContent = "Ghústame";
}

like = document.getElementsByClassName("like_link");
for( var i = 0; i < like.length; i++ ){
    like[i].textContent = "Ghústame";
}

like = document.getElementsByClassName("uiButtonText");
for( var i = 0; i < like.length; i++ ){
    like[i].textContent = "Ghústame";
}
