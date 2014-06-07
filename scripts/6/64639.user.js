// ==UserScript==
// @name           n-PassThePopcorn
// @namespace      PTP
// @include        *passthepopcorn.me/*
// @version     1.04
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history	1.04 Fix: include static. prefix.
// @history	1.03 Fix: include tls. prefix.  Changed dark image host to imgur
// @history	1.02 Fix: changed include to .me
// @history	1.01 Change to .me
// @history	1.00 Initial release
// ==/UserScript==

//Check for new version
ScriptUpdater.check(64639,/*currentVersion*/'1.04');

//Default avatar
//https://passthepopcorn.me/static/common/avatars/default.png
for(var iAvatar=0;iAvatar<document.images.length;iAvatar++){
	//http://img30.imageshack.us/img30/1200/passthepopcorndarkerdef.png
	if(document.images[iAvatar].src == "http://passthepopcorn.me/static/common/avatars/default.png") document.images[iAvatar].src = "http://i.imgur.com/oaxgf.png";
	if(document.images[iAvatar].src == "https://passthepopcorn.me/static/common/avatars/default.png") document.images[iAvatar].src = "http://i.imgur.com/oaxgf.png";
	if(document.images[iAvatar].src == "https://tls.passthepopcorn.me/static/common/avatars/default.png") document.images[iAvatar].src = "http://i.imgur.com/oaxgf.png";
	if(document.images[iAvatar].src == "http://static.passthepopcorn.me/static/common/avatars/default.png") document.images[iAvatar].src = "http://i.imgur.com/oaxgf.png";
	if(document.images[iAvatar].src == "https://static.passthepopcorn.me/static/common/avatars/default.png") document.images[iAvatar].src = "http://i.imgur.com/oaxgf.png";
}
