// ==UserScript==
// @name           Menu Adder
// @namespace      http://www.digitalraven.org
// @description    Adds Search and Tags options to RPG.net forum mainbar
// @include        http://forum.rpg.net/*
// ==/UserScript==var toplist = document.getElementById('navtabs');

var tagsLi = document.createElement('li');
var tagsLink = document.createElement('a');
tagsLink.setAttribute('class', 'navtab');
tagsLink.setAttribute('target', '_self');
tagsLink.href = 'http://forum.rpg.net/tags.php';
var tagsLiContent = document.createTextNode('Tags');
tagsLink.appendChild(tagsLiContent);
tagsLi.appendChild(tagsLink);

var srcLi = document.createElement('li');
var srcLink = document.createElement('a');
srcLink.setAttribute('class', 'navtab');
srcLink.setAttribute('target', '_blank');
srcLink.href = '#';
srcLink.addEventListener("click", function(){q=prompt('RPG.net Google Search:','');if(q){this.href='http://www.google.com/search?q=site:forum.rpg.net+'+escape(q);}}, false);
var srcLiContent = document.createTextNode('Search');
srcLink.appendChild(srcLiContent);
srcLi.appendChild(srcLink);

var toplist=document.getElementById('navtabs');

toplist.appendChild(tagsLi);
toplist.appendChild(srcLi);