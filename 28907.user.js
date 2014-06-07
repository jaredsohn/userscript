// ==UserScript==
// @name           Gunz login
// @namespace      Malto
// @description    Gunz Launcher
// @include        http://login.ijji.com/*
// ==/UserScript==


switch (location.href) {
	case "http://login.ijji.com/postLogin.nhn":
		location.href = 	"http://gunz.ijji.com/common/prelaunch.nhn?gameId=u_gunz&subId=";
		return;
}
