// ==UserScript==
// @name       Gandul article cleaner
// @namespace  http://userscripts.org/users/dreamw
// @version    0.1
// @description  Get rid of articles with ridiculous and bombastic titles from the news listing, by searching by source. Rules for this list will be refined in time.
// @match      http://*.gandul.info/*
// ==/UserScript==



$(".label:contains(Prosport.ro)").parents("li").hide();
$(".label:contains(pro sport)").parents("li").hide();
$(".label:contains(Prosport)").parents("li").hide();
$(".label:contains(SPORT.RO)").parents("li").hide();
$(".label:contains(ONE.ro)").parents("li").hide();
$(".label:contains(Mediafax.ro)").parents("li").hide();
$(".label:contains(Promotor.ro)").parents("li").hide();


$("#cross_stire_prosport").hide();