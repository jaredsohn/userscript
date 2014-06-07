// ==UserScript==
// @name       Habrahabr: highlight author's comments
// @namespace  Habrahabr
// @version    0.1
// @description  Highlights comments of post's author
// @match      http://habrahabr.ru/post/*
// @copyright  2012+, You
// ==/UserScript==

var authorProfile = document.querySelector('div.author a').href;
Array.prototype.slice.call(document.querySelectorAll('a.username')).filter(function (a) {return a.href == authorProfile;}).forEach(function(a) {a.style.backgroundColor = '#FF0'; a.style.color= '#000';})