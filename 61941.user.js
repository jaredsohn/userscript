// ==UserScript==
// @name           Google Reader Speed Skim
// @namespace      http://userscripts.org/users/intangible
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// @description    Limit the size of the article bodies so it's easier to skim over large articles.
// ==/UserScript==

var strHeight = '25em';

console.log('Google Reader Speed Skim: Setting article body heights to '+strHeight);

var objStyles = document.createElement('style');
objStyles.innerHTML = 'div.entry-main { max-height: none ! important; }';
objStyles.innerHTML += 'div.entry-body { width: 100% ! important; max-width: none ! important; }';
objStyles.innerHTML += 'div.item-body > div { width: 100% ! important; max-width: none ! important; max-height: '+strHeight+' ! important; overflow: auto  ! important; }';

document.body.appendChild(objStyles);
