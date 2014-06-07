// ==UserScript==
// @name          facebook home - change name link
// @description   changes the profile link with profile's activity feed
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// @include       http://facebook.com/*

// ==/UserScript==

var siniflar = document.getElementsByTagName('*'),i;
    for (i in siniflar)
        {
        if((" "+siniflar[i].className+" ").indexOf(" fbxWelcomeBoxName ") > -1)
            {
            siniflar[i].href += "/allactivity";
            }
        }