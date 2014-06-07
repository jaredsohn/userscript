// ==UserScript==
// @name           Soldier Front Forum Login
// @namespace      Malto
// @description    Auto logs into forums after Ijji login
// @include        http://login.ijji.com/*
// ==/UserScript==


switch (location.href) {
	case "http://login.ijji.com/postLogin.nhn":
		location.href = 	"http://forums.ijji.com/login.php?do=login&repeat=1&nextURL=http%3A%2F%2Fforums.ijji.com%2F";
		return;
