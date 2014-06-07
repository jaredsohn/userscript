// ==UserScript==
// @name           Better EasyProd
// @namespace      http://fitz.dyndns.biz
// @description    Amelioration diverses d'EasyProd
// @include        http://preprod-conforama.gutenberg-networks.com/*
// ==/UserScript==

var liste = document.getElementById('contenuBloc_o_bloc_classement');
var scrollbar = document.getElementById('scrollbar_track_classement');
liste.style.height = '850px';
scrollbar.style.height = '850px';