// ==UserScript==
// @name           index.hu disable ads
// @namespace      http://luki.clubbing.hu
// @description    index.hu reklamok nelkul
// @include        http://index.hu/*
// @include        http://*index.hu/*
// ==/UserScript==


GM_addStyle("#ads { display: none;}");
GM_addStyle("#allasbox { display: none;}");
GM_addStyle("#also_bannerek { display: none;}");
GM_addStyle("#booklinebox { display: none;}");
GM_addStyle("#cikk_bottom_adlink { display: none;}");
GM_addStyle("#ctravelbox { display: none;}");
GM_addStyle("#expresszbox { display: none;}");
GM_addStyle("#honfbox { display: none;}");
GM_addStyle("#indabox { display: none;}");
GM_addStyle("#rightad { display: none;}");
GM_addStyle("#superbanner { display: none;}");

GM_addStyle(".hirdetes { display: none;}");
GM_addStyle(".hirdetes_bottom { display: none;}");
GM_addStyle(".hirdetes_container { display: none;}");
GM_addStyle(".hirdetes_container_bottom { display: none;}");
GM_addStyle(".hirdetes_disc { display: none;}");
GM_addStyle(".microsite { display: none;}");
GM_addStyle(".szeles_szponzoracio { display: none;}");