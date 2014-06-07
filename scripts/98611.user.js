// ==UserScript==
// @name           Anti-reload WMR
// @namespace      www.waarmaarraar.nl
// @description    Gaat het automatisch verversen op WaarMaarRaar.nl tegen.
// @include        http://*.waarmaarraar.nl/*
// ==/UserScript==

// Loop door alle tags heen
var tags = document.getElementsByTagName('script');
// Zoek naar specifiek script, als we het vinden, slopen we dit eruit
for (var i = 0; i < tags.length; i++) {
  if (tags[i].innerHTML.indexOf('lastreload()') != -1) {
	tags[i].innerHTML = "";
	break;
  }
}

// Vervang nu ook de id-tags
var alltags = document.getElementsByTagName('*');
for (var i = 0; i < alltags.length; i++) {
  if (alltags[i].id.indexOf('last') != -1 || alltags[i].id == 'nuonline') {
	alltags[i].id = '';
  }
}