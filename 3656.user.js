// ==UserScript==
// @name         index.hu simplified
// @namespace    http://techies.teamlupus.hu
// @description  v0.2 - remove rarely used parts of index.hu
// @include      http://index.hu/*
// @include      http://*index.hu/*
// ==/UserScript==


GM_addStyle("#prcontent, #hird, #ad_horiz, #supabannerbox, #bottom_content_banner, #right_ad, #bottom_right_ad, .hirdetes, .hirdetes.prcikk, .hirdetes_bottom, .hirdetes_disc, #ctravelbox, #also_bannerek { display:none; }"); //Turns off ads
GM_addStyle("#top_velvet, .hasab.magazin.cimlapozo-blokk2, .magazinlink, .hcdb, #hcdb { display:none; }"); //Turns off Velvet
GM_addStyle("#survival_kit, #survival_content, #tulelokeszlet, #tulelokeszlet_head { display:none; }"); //turns off "Túlélõkészlet" section
GM_addStyle("#bookline { display:none; }"); //Turns off Bookline
GM_addStyle(".left { width: 321px; }"); //sets left menu width
GM_addStyle(".right { width: 321px; }"); // sets content width to the same size
GM_addStyle("#footer { display:none; }"); //turns off footer