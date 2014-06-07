// ==UserScript==
// @name           UCSC CruzNet auto guest login
// @namespace      http://userscripts.org/users/25041
// @description    Automatically logs into CruzNet wireless network as guest.
// @include        https://wreg*.ucsc.edu/*
// ==/UserScript==

location.href = "javascript:void(guest_login());";

