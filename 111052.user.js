scr_meta=<><![CDATA[
// ==UserScript==
// @name quakelive-noad-temp
// @version 1.3
// @namespace 
// @description 
// @include http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

skipAd = unsafeWindow;
skipAd.quakelive.siteConfig.videoService='ololo';

skipAd.LaunchGameParams.prototype.GetCommandLine = function () {
var a = skipAd.quakelive.cvars.Get("model");
skipAd.quakelive.cvars.Set("headmodel", a.value);
skipAd.quakelive.cvars.Set("team_model", a.value);
skipAd.quakelive.cvars.Set("team_headmodel", a.value);
skipAd.quakelive.cfgUpdater.StoreConfig(skipAd.quakelive.cfgUpdater.CFG_BIT_REP);
a = "";
if (this.noInputGrab) a += "+set in_nograb 1 ";
if (this.noAudio) a += "+set s_volume 0 ";
a += "+set g_advertDelay 0 ";
a += "+set r_fullscreen " + skipAd.quakelive.cvars.GetIntegerValue("r_fullscreen", 0) + " ";
a += '+set gt_user "' + skipAd.pluginx.username + '" ';
a += '+set gt_pass "' + skipAd.pluginx.password + '" ';
a += '+set gt_realm "' + skipAd.quakelive.siteConfig.realm + '" ';
if (typeof this.password == "string") a += '+set password "' + this.password + '" ';
a += this.cmdStrings.join(" ");
return a
};