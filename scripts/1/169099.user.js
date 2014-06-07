// ==UserScript==
// @name           Enterprise Manager - Fix Top EM Logo
// @description    Top EM Logo Links to This EM Home, not Oracle EM Product
// @include        https://*:7802/em/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

$("a#productBrandingImage, a[href=http://otn.oracle.com/products/oem/]").attr("href","/em/console/home");