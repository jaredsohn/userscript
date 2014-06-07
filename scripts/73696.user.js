// ==UserScript==
// @name           Old Style Wikipedia
// @namespace      wikioldstyle
// @description    Changes the appearence of Wikipedia and its sister projects to the old standard.
// @include        http://*.wikimedia.org/*
// @include        http://*.wikipedia.org/*
// @include        http://*.wikibooks.org/*
// @include        http://*.wikisource.org/*
// @include        http://*.wikinews.org/*
// @include        http://*.wikiquote.org/*
// @include        http://*.wiktionary.org/*
// @include        http://*.wikiversity.org/*
// @include        https://secure.wikimedia.org/*
// ==/UserScript==

var skin = "monobook";
if (window.location.search.indexOf("useskin=") == -1) {
   href = window.location.href;
   href += (window.location.search == "" ? "?" : "&") + "useskin=" + skin;
   window.location.href = fixhash(href);
}
 
var url = "";
var index = document.location.href.indexOf("/wiki/");
if (index == -1) {index = document.location.href.indexOf("/w/");}
if (index != 0) {url = document.location.href.substr(0, index);}

var links = document.links;
for (var i = 0; i < links.length; i++) {
    href = links[i].href;
    if (href.indexOf(url + "/wiki/") == 0 ||
	    href.indexOf(url + "/w/index.php") == 0) {
		      if (href.indexOf("?useskin=") == -1)
		         href += (href.indexOf("?") == -1 ? "?" : "&") + "useskin=" + skin;
			  links[i].href = fixhash(href);}
}
var forms = document.getElementsByTagName("form");
for (var i = 0; i < forms.length; i++) {
    if (forms[i].action.indexOf(url + "/w/index.php") == 0) {forms[i].action += (forms[i].action.indexOf("?") == -1 ? "?" : "&") + "useskin=" + skin;}
}

function fixhash (url) {
return url.replace(/(#.*)(\?.*)/, "$2$1");
}