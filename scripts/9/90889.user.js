// ==UserScript==
// @name        QuakeLive.com remove adver
// @namespace   http://userscripts.org/scripts/show/90889
// @version     1.5
// @date        2010-11
// @include     http://*.quakelive.com*
// @include     http://quakelive.com*
// ==/UserScript==
(function(){
	var windowUS = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
	var apok = 0;
	
	document.addEventListener('load', function(){
		// remove adver: top
		var qlv_topFadeAds = document.getElementById('qlv_topFadeAds');
		if (qlv_topFadeAds != null){
			qlv_topFadeAds.parentNode.removeChild(qlv_topFadeAds);
			document.getElementById('qlv_mainLogo').style.marginTop = '0px';
		}
		
		// move logo title (icon "pro")
		var logo_title = document.getElementById('logo_title');
		if (logo_title != null) logo_title.style.marginTop = '-8px';
		
		// remove adver: right
		var spon_vert = document.getElementById('spon_vert');
		if (spon_vert != null){
			spon_vert.parentNode.removeChild(document.getElementById('qlv_contentChat').getElementsByTagName('IMG')[1]);
			spon_vert.parentNode.removeChild(document.getElementById('qlv_contentChat').getElementsByTagName('BR')[1]);
			spon_vert.parentNode.removeChild(spon_vert);
		}
		
		// remove adver: stats details
		var stats_details_bot_vert = document.getElementById('stats_details_bot_vert');
		if (stats_details_bot_vert != null) stats_details_bot_vert.parentNode.parentNode.removeChild(stats_details_bot_vert.parentNode);
		
		// moving chat
		var qlv_chatControl 	= document.getElementById('qlv_chatControl');
		var post_spon_content 	= document.getElementById('post_spon_content');
		if (qlv_chatControl != null && !apok){
			apok = 1;
			qlv_chatControl.parentNode.insertBefore(qlv_chatControl, post_spon_content);
			post_spon_content.style.marginTop = '150px';
		}
		
		// set chat height
		//var im_body = document.getElementById('im-body');
		//if (im_body != null && im_body.offsetHeight < 440) im_body.style.height = '440px';
		
		// remove footer
		var qlv_footer2 = document.getElementById('qlv_footer2');
		if (qlv_footer2 != null) qlv_footer2.parentNode.removeChild(qlv_footer2);
		
		// remove header of practice panel
		var panel_gametype = document.getElementById('panel_gametype')
		if (panel_gametype != null){
			panel_gametype = panel_gametype.parentNode.getElementsByTagName('DIV')[0];
			if (panel_gametype.className == 'heading') panel_gametype.parentNode.removeChild(panel_gametype);
		}
		
		// remove friend like buttons
		var prf_friend_like = document.getElementById('prf_friend_like');
		if (prf_friend_like != null) prf_friend_like.parentNode.removeChild(prf_friend_like);
		
	}, true);

	// remove pre adver: fix1
	windowUS.LaunchGameParams.prototype.GetCommandLine = function(){
		var a = windowUS.quakelive.cvars.Get("model");
		windowUS.quakelive.cvars.Set("headmodel", a.value);
		windowUS.quakelive.cvars.Set("team_model", a.value);
		windowUS.quakelive.cvars.Set("team_headmodel", a.value);
		windowUS.quakelive.cfgUpdater.StoreConfig(windowUS.quakelive.cfgUpdater.CFG_BIT_REP);
		a = "";
		if (this.noInputGrab) a += "+set in_nograb 1 ";
		if (this.noAudio) a += "+set s_volume 0 ";
		if (this.noAds) a += "+set g_advertDelay 0 ";
		a += "+set r_fullscreen " + windowUS.quakelive.cvars.GetIntegerValue("r_fullscreen", 0) + " ";
		a += '+set gt_user "' + windowUS.pluginx.username + '" ';
		a += '+set gt_pass "' + windowUS.pluginx.password + '" ';
		a += '+set gt_realm "' + windowUS.quakelive.siteConfig.realm + '" ';
		a += '+set g_advertdelay "1" ';
		if (typeof this.password == "string") a += '+set password "' + this.password + '" ';
		a += this.cmdStrings.join(" ");
		return a
	};
	windowUS.quakelive.siteConfig.videoService='iddqd';
	
	// remove pre adver: fix2
	// use fix2 only if does not work fix1
	/*
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript')
	script.setAttribute('src', 'http://webinweb.ru/pub/qlDelAdverFix.js');
	document.getElementsByTagName('head').item(0).appendChild(script);
	*/
})();