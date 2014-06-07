// ==UserScript==

// @name           SPON SWAP

// @namespace      http://joshua-jung.com

// @description    Modifiziert SPON-Artikelansicht

// @include        http://www.spiegel.de/*
// @include        https://www.spiegel.de/*

// @exclude        http://www.spiegel.de/thema/*
// @exclude        https://www.spiegel.de/thema/*


var spSmallTeaserColumn = document.getElementById('spSmallTeaserColumn');
spSmallTeaserColumn.style.marginRight = '0';
spSmallTeaserColumn.style.marginLeft = '30px';
spSmallTeaserColumn.style.cssFloat = 'right';
var spArticleColumn = document.getElementById('spArticleColumn');
spArticleColumn.style.cssFloat = 'left';

// ==/UserScript==