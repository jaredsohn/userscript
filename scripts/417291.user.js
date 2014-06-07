// ==UserScript==
// @name       Hide Ondraszek1 from fronda.pl
// @version    0.1
// @match      http://www.fronda.pl/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var elements = $("[href*='Ondraszek1']");
elements.each(function() { $(this).parent().parent().hide(); });
$("div.more-comments").show();
$("a.show-more-comments").hide();