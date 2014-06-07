scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live No PreGame Ads
// @version        1.1
// @namespace      http://userscripts.org/users/56290
// @description    Remove PreGame Ads from Standard Accounts
// @include        http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

skipAd = unsafeWindow;
skipAd.CheckForPreGameAd = function(a) { 
	if (skipAd.qz_instance.IsGameRunning()) {
		skipAd.qz_instance.SendGameCommand("quit;");
		skipAd.currentServerId = 0
	}
	skipAd.DoLaunchGame(a);
	skipAd.SetGameModeDefaults();
	skipAd.SetCvar("in_nograb", 0);
	skipAd.qz_instance.SendGameCommand("in_nograb 0; in_restart;");
	setTimeout(function(){skipAd.qz_instance.SendGameCommand("in_nograb 0; in_restart;");}, 4000);
};