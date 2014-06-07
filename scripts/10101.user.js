// ==UserScript==
// @name           digg - Expand all comments 0.2
// @namespace      diggcomments
// @include        http://*digg.com/apple/*
// @include        http://*digg.com/design/*
// @include        http://*digg.com/gadgets/*
// @include        http://*digg.com/hardware/*
// @include        http://*digg.com/tech_news/*
// @include        http://*digg.com/linux_unix/*
// @include        http://*digg.com/microsoft/*
// @include        http://*digg.com/mods/*
// @include        http://*digg.com/programming/*
// @include        http://*digg.com/security/*
// @include        http://*digg.com/software/*
// @include        http://*digg.com/tech_deals/*
// @include        http://*digg.com/space/*
// @include        http://*digg.com/environment/*
// @include        http://*digg.com/health/*
// @include        http://*digg.com/general_sciences/*
// @include        http://*digg.com/business_finance/*
// @include        http://*digg.com/politics/*
// @include        http://*digg.com/2008_us_elections/*
// @include        http://*digg.com/political_opinion/*
// @include        http://*digg.com/world_news/*
// @include        http://*digg.com/offbeat_news/*
// @include        http://*digg.com/baseball/*
// @include        http://*digg.com/basketball/*
// @include        http://*digg.com/extreme_sports/*
// @include        http://*digg.com/football/*
// @include        http://*digg.com/golf/*
// @include        http://*digg.com/hockey/*
// @include        http://*digg.com/motorsport/*
// @include        http://*digg.com/soccer/*
// @include        http://*digg.com/tennis/*
// @include        http://*digg.com/other_sports/*
// @include        http://*digg.com/celebrity/*
// @include        http://*digg.com/movies/*
// @include        http://*digg.com/music/*
// @include        http://*digg.com/television/*
// @include        http://*digg.com/gaming_news/*
// @include        http://*digg.com/playable_web_games/*
// @include        http://*digg.com/pc_games/*
// @include        http://*digg.com/nintendo_wii/*
// @include        http://*digg.com/playstation_3/*
// @include        http://*digg.com/xbox_360/*
// ==/UserScript==

if (document.location.href.indexOf("/all") == -1) {
	window.stop();
	document.location.href+="/all";
}