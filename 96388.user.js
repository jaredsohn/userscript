// ==UserScript==
// @name           Land fixer
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://economy.erepublik.com/*/land/overview/*
// ==/UserScript==


var main = document.getElementsByClassName('main');

var link = document.getElementsByClassName('plain_blue_small');


for (var i=1;i<main.length;i++)
{

main[i].href = link[i].href;

}