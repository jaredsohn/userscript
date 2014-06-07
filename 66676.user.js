// ==UserScript==
// @name           No Gallery for Gizmodo
// @namespace      http://userscripts.org/users/107513
// @description    redirects from the annoying gallery pages to its list counterpart
// @include        http://gizmodo.com/*/gallery/*
// @include        http://lifehacker.com/*/gallery/*
// @include        http://jalopnik.com/*/gallery/*
// @include        http://io9.com/*/gallery/*
// @include        http://kotaku.com/*/gallery/*
// ==/UserScript==


window.location = window.location.href.replace("gallery/", "");