// ==UserScript==
// @name           ekb news1.co.il 'Mador Pirsum' skipper
// @description    NEWS1 original page (redirects & ad section skipper)
// @namespace      ekbworldwide
// @include        http://www.news1.co.il/*
// ==/UserScript==

/* skipping the annoying "Mador Pirsum" */
if (location.search.indexOf("tag=")!=-1) location.search="";
if (location.pathname=="/PageLoad.aspx") location.pathname=/pageUrl=(.*?)(?:\?|$)/.exec(location.search)[1];

/* a cup favicon */
(function() {
  var link, head;

  link = document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', 'http://img444.imageshack.us/img444/9408/javaky9.png');

  head = document.getElementsByTagName('head')[0];
  if(!head) return;
  head.appendChild(link);
})();