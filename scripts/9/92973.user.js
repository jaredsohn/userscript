// ==UserScript==
// @name          StackExchange Title Tag Remover
// @namespace     yijiang
// @include       http://stackoverflow.com/questions/*
// @include       http://superuser.com/questions/*
// @include       http://serverfault.com/questions/*
// @include       http://askubuntu.com/questions/*
// @include       http://answers.onstartups.com/questions/*
// @include       http://nothingtoinstall.com/questions/*
// @include       http://seasonedadvice.com/questions/*
// @include       http://crossvalidated.com/questions/*
// @include       http://stackapps.com/questions/*
// @include       http://*.stackexchange.com/questions/*
// ==/UserScript==

if(!isNaN(parseInt(window.location.pathname.split('/')[2]), 10)){
    var title = document.getElementsByTagName('h1')[0];
    title = title.innerText || title.textContent;
    document.title = title + document.title.substring(document.title.lastIndexOf('-') - 1);
}
