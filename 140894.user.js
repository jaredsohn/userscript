// ==UserScript==
// @name        red.web.tr Link Duzeltme Aygiti
// @version     0.1
// @namespace   http://cagri.com/red-web-tr-link-duzeltme-aygiti
// @description red.web.tr sitesinin rss feedlerindeki adresleri duzeltmek icin
// @include     http://www.red.web.tr/haber_detay.asp?haberID=*
// ==/UserScript==
//
// Copyright (c) 2012, Sinan ILYAS
// Her hakki saklidir.
//

var haberID = document.location.href.split('=')[1];
var yeniURL = 'http://www.red.web.tr/site/haber_detay.asp?haberID=' + haberID;
document.location.href = yeniURL;