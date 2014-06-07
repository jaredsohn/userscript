// ==UserScript==
// @name           Clean LeMonde.fr
// @author         jblanche
// @namespace      https://gist.github.com/4413724
// @description    Supprime les liens promotionnels des articles du monde
// @include        http://www.lemonde.fr/*
// @include        https://www.lemonde.fr/*
// @version        0.5
// ==/UserScript==


[].forEach.call(
  document.querySelectorAll('a.lien_interne'), function(el){
    console.log(el);
    el.outerHTML = el.innerHTML;
  }
);