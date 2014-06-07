// ==UserScript==
// @name           Remove Vistapanel Adds
// @namespace      sidney.smashing@gmail.com
// @description    removes advertisements from the free vistapanel hosting services
// @include        http://cpanel.zoka.cc/panel/*
// @include        http://izihost.org/panel/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$("a[href$='index.php?option=upgrades']").remove();
