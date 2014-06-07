// ==UserScript==
// @name       Image Zoommer
// @namespace  http://allise.net/
// @version    0.1
// @description  Aggiunge un fantastico zoom alle immagini
// @match      http://community.eu.playstation.com/*
// @copyright  2012+, Lady R
// @require    http://allise.net/templates/rt_diametric/js/jquery.zoomooz.min.js
// ==/UserScript==

$(".lia-message-body-content img").not(".emoticon, a img").zoomTarget();
$(".dropdown-default-item").children("a").removeAttr("href").css("cursor", "pointer").parent().click( function() { $(this).find("ul").css("left", "-308px").toggle("fast") } );