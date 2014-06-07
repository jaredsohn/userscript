// ==UserScript==
// @name       Image maximizer
// @namespace  http://allise.net/
// @version    0.1
// @description  Rende le immagini dei topic più larghe
// @match      http://community.eu.playstation.com/*
// @copyright  2012+, Lady R
// ==/UserScript==

$(".lia-message-body-content img").not('.UserSignature img').removeAttr("width").removeAttr("height");
