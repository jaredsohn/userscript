// ==UserScript==
// @name           Drift City login
// @namespace      h4nbury
// @description    Drift City Launcher
// @include        http://login.ijji.com/*
// ==/UserScript==


switch (location.href) {
	case "http://login.ijji.com/postLogin.nhn":
		location.href = 	"http://drift.ijji.com/common/prelaunch.nhn?gameId=u_skid";
		return;
}
