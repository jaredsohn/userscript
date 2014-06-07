// BGG Logo hack 
// version 1
// 2010-11-13
// Copyright (c) 2010, Evgeny Reznikov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BGG Logo hack
// @namespace     http://userscripts.org/users/249676
// @description   changes logo link for boardgamegeek.com from main page to subscriptions
// @include       http://www.boardgamegeek.com/*
// ==/UserScript==

var logoLink = ((document.getElementsByClass('f1'))[0]).parentNode;
logoLink.href = 'http://www.boardgamegeek.com/subscriptions/bysub';