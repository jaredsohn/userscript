// ==UserScript==
// @name           anidb.net-retitle
// @namespace      VIP
// @description    Makes page title fit tabs better
// @include        http://anidb.net/*
// @include        https://anidb.net/*
// @version        1.0.0
// @encoding       utf-8
// ==/UserScript==

(function() {
	const title = ((typeof unsafeWindow === "object") ?  unsafeWindow.document : window.document).getElementsByTagName('title')[0];
	const result = /^::AniDB.net:: (.+) - (.+) ::$/.exec(title.textContent) || /^::AniDB.net:: (.+) ::$/.exec(title.textContent);
	if (result[1]) title.textContent = (result[2] ? result[2]+' - ' : '')+result[1]+' - AniDB.net';
})()