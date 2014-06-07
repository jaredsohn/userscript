// ==UserScript==
// @name           eRepublik Remove Banners
// @namespace      eRepublik
// @description    eRepublik Remove
// @version        1.0
// @author         diskoNindzaRatnik
// @include		   http://*.erepublik.com/*
// @include		   https://*.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

// Fb Like
$("div.fb_like").remove();

// New Slike
$("img.new_symbol_topMenu").remove();
$("img.new_symbol").remove();

// Sidebar Medal
$("a.view_new_medal").remove();

//  Sidebar Banners
$("div.lb_overlay.js_lb_overlay").remove();
$("div#empire_help_pop.empire_help_pop").remove();
$("a#help_empire_banner_side.help_empire_banner").remove();
$("a.combat_stash_trigger.before").remove();
$("a.invite_anniversary_bonus").remove();
$("div.promo_holder.anniversary_free_offers_full").remove();

// Content Banners
$("div#mapContainer").remove();