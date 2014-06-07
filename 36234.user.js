// ==UserScript==
// @name           Steampunk forum punq-ifier
// @namespace      http://userscripts.org/users/70916
// @description    Replaces brassgoggles.co.uk with steam.punqs.org (I hope)
// @include        http://www.steam.punqs.org/*
// ==/UserScript==

string = string.replace(new RegExp(/\http://www.brassgoggles.co.uk/g),"www.steam.punqs.org");
