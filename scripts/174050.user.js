// ==UserScript==
// @name           This will remove sidebar on all pages
// @namespace      http://www.reddit.com/
// @description    This will remove sidebar on all pages
// @include        http://www.reddit.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//SHAMELESSLY STOLEN FROM Unkindlykiller


$(document).ready(function(){$(".grippy").css("display","none"); $(".listing-chooser initialized").css("display","none"); $(".listing-chooser").css("display","none");});