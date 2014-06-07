// ==UserScript==
// @name           ButlerLoader-latest
// @namespace      Illyriad
// @description    enhances the in-game interface for Illyriad
// @include        http://*.illyriad.co.uk/*
// @exclude        http://*.illyriad.co.uk/Account/*
// @exclude        http://old.illyriad.co.uk/*
// @exclude        http://forum.illyriad.co.uk/*
// @version        0.0.0
// ==/UserScript==

var butler = document.createElement("script");
butler.type = "text/javascript";
butler.src = "http://arcanum-illyria.com/butler/latest/Butler.user.js?method=loader&target=latest";
document.getElementsByTagName("head")[0].appendChild(butler);