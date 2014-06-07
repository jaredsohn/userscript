// ==UserScript==
// @name           ikariam tool
// @description    Insieme di tool per ikariam
// @include        http://*.it.ikariam.com/*
// @include        https://*.it.ikariam.com/*
// @copyright      Samuele Abbadessa
// @version        0.2
// @license        GPL
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var vino_servito;

$("body").click(function(){ vino_servito = $("select#wineAmount option:selected").val(); })

alert(vino_servito);