// ==UserScript==
// @name           Open Booty Grab in New tab
// @description    Opens Booty Grab in a new tab.
// @include        http://www.gaiaonline.com/tank/*
// @include        http://gaiaonline.com/tank/*
// @include http://www.gaiaonline.com/forum/*
// @require http://sizzlemctwizzle.com/updater.php?id=62128
// ==/UserScript==
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.gaiaonline.com/chat/gsi/index.php?'+'v=json&m=[[6500%2C[1]]%2C[6510%2C["'+tankId+'"%2C0%2C1]]%2C[6511%2C["'+tankId+'"%2C0]]%2C[6512%2C["'+tankId+'"%2C0]]%2C[107%2C["null"]]]&X='+(now.getTime().toString().substring(0, 10)),
if (type==''){
		window.open('http://wwwgaiaonline.com/tank/'+tankID);
		return;