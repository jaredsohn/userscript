// ==UserScript==
// @name           Quake Live AddStop
// @version        1.0.3
// @namespace      http://*.quakelive.com/*
// @description    Remove ads from all site and pregame launch
// @include        http*://*.quakelive.com/*


// ==/UserScript==
(function(){
	var windowUS = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
	var apok = 0;
	
	document.addEventListener('load', function(){		
		// remove adver: stats details
		var stats_details_bot_vert = document.getElementById('stats_details_bot_vert');
		if (stats_details_bot_vert) stats_details_bot_vert.parentNode.parentNode.removeChild(stats_details_bot_vert.parentNode);
		
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



// ==/UserScript==
//Hide Adds and everything in right column except chat / Скрывает рекламу и прочую херню в правом блоке, за исключением чата.
GM_addStyle('.ql_vert_frame{display:none;} #spon_vert{display:none !important;} #qlv_topFadeAds{display:none;} .spon_media{display:none;} ');

//Hide promo banner under server list / Скрывает рекламу над серверлистами.
GM_addStyle('.thanksgiving_promo{display:none;}');

//Hide your personal quick stats / Скрывать быстрые персональные статистики.
//GM_addStyle('.personal_stats{display:none;} .twocol_left{min-height: 0px;} .thirtypxhigh{display:none;}');

GM_addStyle('#home_chooser a.home_text{display:none !important; }');


//Hide subscribe adds in accaunt settings / Скрывать рекламу на покупку про в настройках аккаунта
GM_addStyle('.premium_div{display:none !important;}');
//GM_addStyle('#qlv_account .admin_title{display:block; float:left; margin-top:262px !important; margin-left: 30px !important; }');
//Поднятие блоков выше, уже не требуется оставил для шаблона.
//GM_addStyle("div.account_top { margin-top: -280px !important; }");
//GM_addStyle("div.account_tab { margin-top: -60px !important; }");

//Hide Go pro blue button / Скрывать везде синюю кнопку Go Pro
GM_addStyle('.gopro_logo{display:none;}');

//Hide last 10 matches adds graph/ Скрывает рекламу в блоке статистике под 10 поледних мачтей.
GM_addStyle("div.prf_last10matches a[href$='#!premium']{display:none;}");

//Hide footer / Скрывать нижний серый блок с подписью
//GM_addStyle('#qlv_footer2{display:none;}');

//reduce height of chat contact  list / Определяет высоту чата
GM_addStyle('#im-body{height:auto !important; max-height:300px;}');


//Forum improvements
//
//Remove Header
//GM_addStyle('.pageheading{display:none;}');
//
//Remove AD frames
GM_addStyle('.advert{display:none !important}');
//
//Threadslist must be wider now (if AD frames are removed)
GM_addStyle('#threadslist{width:100% !important;}');
