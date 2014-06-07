// ==UserScript==
// @name           More Subscriptions
// @namespace      http://schoolsux.tz/
// @description    get more subscriptions showing on grid view
// @include           http://www.youtube.com/index?feature=youtu.be
// @include           http://www.youtube.com/   
// ==/UserScript==

<!DOCTYPE html>
(function() {
<html lang="en" dir="ltr" >
<!-- machid: sd1dXU2oteFNMSkcyOWhLV2RBNHRYUDg2QWloUGVOQzJLWENTVkszUlRYLXYwbjNCYmVsalh3 -->
<head>
				<script>
			var yt = yt || {};
			yt.timing = yt.timing || {};
			yt.timing.cookieName = 'VISITOR_INFO1_LIVE';
			yt.timing.tick = function(label) {
				var timer = yt.timing.timer || {};
				timer[label] = new Date().getTime();
				yt.timing.timer = timer;
			};
				yt.timing.experiment = '905212,907047';
			
				yt.timing.tick('start');
			
			try {
				yt.timing.pt = window.gtbExternal && window.gtbExternal.pageT() ||
							window.external && window.external.pageT;
			} catch(e) {}
			if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				yt.timing.pt = window.chrome && window.chrome.csi && Math.floor(window.chrome.csi().pageT);
			}
		</script>


		<title>
		YouTube
				- *
	</title>

				<link id="www-core-css" rel="stylesheet" href="http://s.ytimg.com/yt/cssbin/www-core-vfl186161.css">


	<style type="text/css">
</style>


			<link rel="alternate" type="application/rss+xml" title="YouTube - Blog" href="/rss/global/our_blog.rss">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Top Favorites Today" href="http://gdata.youtube.com/feeds/base/standardfeeds/top_favorites?client=ytapi-youtube-index&amp;time=today&amp;v=2">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Top Rated Today" href="http://gdata.youtube.com/feeds/base/standardfeeds/top_rated?client=ytapi-youtube-index&amp;time=today&amp;v=2">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Top Viewed Today" href="http://gdata.youtube.com/feeds/base/standardfeeds/most_viewed?client=ytapi-youtube-index&amp;time=today&amp;v=2">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Most Discussed Today" href="http://gdata.youtube.com/feeds/base/standardfeeds/most_discussed?client=ytapi-youtube-index&amp;time=today&amp;v=2">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Recently Added" href="http://gdata.youtube.com/feeds/base/standardfeeds/most_recent?client=ytapi-youtube-index&amp;v=2">
	<link rel="alternate" type="application/rss+xml" title="YouTube - Recently Featured" href="http://gdata.youtube.com/feeds/base/standardfeeds/recently_featured?client=ytapi-youtube-index&amp;v=2">


	<link rel="search" type="application/opensearchdescription+xml" href="http://www.youtube.com/opensearch?locale=en_US" title="YouTube Video Search">
	<link rel="icon" href="http://s.ytimg.com/yt/favicon-vfl147246.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://s.ytimg.com/yt/favicon-vfl147246.ico" type="image/x-icon">
		<link rel="canonical" href="/">
		<link rel="alternate" media="handheld" href="http://m.youtube.com/index?desktop_uri=%2F&amp;gl=US">
	
		<meta name="description" content="YouTube is a place to discover, watch, upload and share videos.">

		<meta name="keywords" content="video, free, simple, search, find, discover, watch, engage, share, sharing, upload, entertainment">

	

					
		<script id="www-core-js" src="http://s.ytimg.com/yt/jsbin/www-core-vfl186132.js"></script>


	<!-- begin postpage section -->
	<script>
		
		yt.setConfig({
			'XSRF_TOKEN': 'qOsRI9RxhoA2G9eiEBSihRFMMMZ8MTI4Mjg4NjM3MA==',
			'XSRF_FIELD_NAME': 'session_token'
		});
		yt.pubsub.subscribe('init', yt.www.xsrf.populateSessionToken);


		yt.setConfig('XSRF_QL_PAIR', 'session_token=lMeGeBzaal6ljKocI_TnTV5MghR8MA==');



		yt.setConfig('LOGGED_IN', true);
	</script>

		

<script type="text/javascript">
	var masthead = new yt.www.home.ads.mastheadAd('1', false, '2', 'GaSA6b5UUsc', true, true, false)
	yt.pubsub.subscribe('init', function() {
		_showdiv('masthead-utility-menulink-short');
		_hidediv('masthead-utility-menulink-long');
	});

</script>

<script type="text/javascript">

	var moduleHelper = new yt.www.home.ModuleHelper('Es2n7hUF1vjjE8VK8-y2jnMkh1N8MA==',
			false, false);
		moduleHelper.addModule('SUB');
		moduleHelper.addModule('PRO');
		moduleHelper.addModule('FRI');
		moduleHelper.addModule('POP');
		moduleHelper.addModule('TOP');

	function checkChromePromoAlert() {
		var hideChromePromos = yt.UserPrefs.getFlag3(yt.UserPrefs.Flags.FLAG3_HIDE_CHROME_PROMOS);

		if (!hideChromePromos) {
			_showdiv('homepage-chrome-side-promo');
		}
	};

	yt.pubsub.subscribe('init', checkChromePromoAlert);

	function dismissChromePromoAlert() {
		yt.UserPrefs.setFlag3(yt.UserPrefs.Flags.FLAG3_HIDE_CHROME_PROMOS, true);
		yt.UserPrefs.save();
		_hidediv('homepage-chrome-side-promo');
	};


	yt.pubsub.subscribe('init', function() {
		(function() {
			var sessionToken = 'Pkuypj8L-PlKSrrjzbrfDHy1t8p8MA==';
			var rootUrl = 'http://www.youtube.com/';
			var locale = 'en_US';
			var serviceInfo = null;
			var isGaiaUser = true;
			var facebookAppKey = '7ff82e59b6b2fbd316cca35309e95df3';
			var tpDomain = 's.youtube-3rd-party.com';

			var autoshare = new yt.sharing.AutoShare(sessionToken, rootUrl, locale, serviceInfo,
					isGaiaUser, facebookAppKey, tpDomain);
			if (_gel('fb-login-btn')) {
				autoshare.registerConnectDialogLauncher(_gel('fb-login-btn'), 'facebook');
			}

			var gaiaChangedCallback = function(autoshare) {
				var isGaiaUser = autoshare.isGaiaUser();
				yt.style.setDisplayed('fb-promo-google-nag', !isGaiaUser);
				yt.style.setDisplayed('fb-promo-google-linked', isGaiaUser);

				if (isGaiaUser) {
					var link = _gel('fb-promo-google-linked-continue-to-fb');
					var fn = function() {
						autoshare.handleConnectService({currentTarget: _gel('fb-login-btn')});
					}
					link.onclick = fn;
				}
			}
			autoshare.addGaiaChangedCallback(gaiaChangedCallback);

			var canConnectCallback = function(autoshare) {
				var isGaiaUser = autoshare.isGaiaUser();
				yt.style.setDisplayed('fb-promo-google-nag', !isGaiaUser);
				yt.style.setDisplayed('fb-promo-google-linked', false);
				yt.style.setDisplayed('fb-promo-fb-linked', false);
				return isGaiaUser;
			}
			autoshare.addCanConnectCallback(canConnectCallback);

			var serviceChangedCallback = function(autoshare) {
				var serviceInfo = autoshare.getServiceInfo();
				for (var service in serviceInfo) {
					var info = serviceInfo[service];
					if (service == 'facebook' && info['is_connected']) {
						yt.style.setDisplayed('fb-promo-fb-linked', true);
						hideFbPromoAlert();
					}
				}
			};
			autoshare.addServiceChangedCallback(serviceChangedCallback);


			window['autoshare'] = autoshare;

			var prefs = yt.UserPrefs;
			var optOut = prefs.getFlag3(prefs.Flags.FLAG3_FBPROMO_OPT_OUT);
			if (!optOut) {
				_showdiv('fb-promo1');
			}

			// The user has "dismissed" the promo, i.e., clicked on the [x].
			// This is distinct from simply hiding the promo as a side effect.
			window.dismissFbPromoAlert = function() {
				prefs.setFlag3(prefs.Flags.FLAG3_FBPROMO_OPT_OUT, true);
				prefs.save();
				hideFbPromoAlert();
			};

			function hideFbPromoAlert() {
				_hidediv('fb-promo1');
			}
})();

	});
</script>


			<link  rel="stylesheet" href="http://s.ytimg.com/yt/cssbin/www-fyf-vfl183574.css">


	<script type="text/javascript">
					yt.www.fyf = yt.www.fyf || {};
	
					yt.www.fyf.lazyLoadStart = function(service) {
						if (yt.www.fyf.lazy_load_service) {
							return;
						} else {
							yt.www.fyf.lazy_load_service = service;
						}
						var oldContainer = _gel('fyf_container');
						oldContainer.parentNode.removeChild(oldContainer);
						var dummyContainer = document.createElement('div');
						dummyContainer.id = 'fyf_dummy_container';
						dummyContainer.innerHTML = '<div class="fyf-container"><div class="fyf-container-main-title">Find your friends on YouTube!<\/div><div class="fyf-container-import-indicator"><img src="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif"/><\/div><\/div>';
						var parentContainer = _gel('dragdrop');
						parentContainer.insertBefore(dummyContainer, parentContainer.firstChild);
						if (service == 3 || service == 4 || service == 5) {
							var loginPopup = window.open('', 'loginPopup',
								'width=860,height=680,resizable=yes,scrollbars=yes', true);
							window['loginPopup'] = loginPopup;
						}
						yt.net.ajax.sendRequest(['http://www.youtube.com/find_your_friends_ajax?action_lazy_load=1', ['service', service].join('=')].join('&'), {
							'method': 'POST',
							'postBody': ['session_token', 'L7fKpuvCumkTHsE-vWVu-jiS8UV8MA%3D%3D'].join('='),
							'update': 'fyf_dummy_container'
						})
					};

					yt.www.fyf.lazyLoadDone = function() {
						var panel = yt.www.fyf.init(yt.www.fyf.tokens, 'fyf_container', 4, 8, 2, yt.www.fyf.lazy_load_service, yt.www.fyf.isGaiaUser);
						if (yt.www.fyf.lazy_load_service) {
							panel.importFromService(yt.www.fyf.lazy_load_service);
						} else {
							panel.deleteThirdPartyInfo();
						}
					};

	</script>


	<script>
		// Initialize the inline "edit subscription" link featurette in the
		// Recent Activity module.
		window['subui_'] = new yt.www.home.Subscriptions();
		yt.pubsub.subscribe('init', function() {
			window['subui_'].setCurrentLink(_gel('_firsteditsublink'));
		});
	</script>


				<script>
			if (window.yt.timing) {
				yt.timing.tick('ct');
			}
		</script>


</head>
<body class="date-20100825 en_US is-english watch5-active" dir="ltr">
	<!--[if IE]><div id="ie"><![endif]-->
	<!-- begin prepage section -->
	<form name="logoutForm" method="post" action="/">
		<input type="hidden" name="action_logout" value="1">
	</form>
	<!-- end prepage section -->
	<div id="page" class="">
				<div id="masthead-container">
				<div id="masthead" class="">
					<a href="/" title="YouTube home">
			<img id="logo" class="master-sprite" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" alt="YouTube home">
		</a>

		<div id="masthead-search">
			
	<form autocomplete="off" class="search-form" action="/results" method="get" name="searchForm" onsubmit="">
		<input id="masthead-search-term" class="search-term" name="search_query" value="" type="text" tabindex="1" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"   maxlength="128">



			<button type="button" class="search-button yt-uix-button" onclick="if (_gel('masthead-search-term').value != '') { document['searchForm'].submit(); }; return false;;return false;" tabindex="2" ><span class="yt-uix-button-content">Search</span></button>

			<script>document.getElementById('masthead-search-term').focus();</script>
	</form>

		</div>
		<div id="masthead-nav">
			<a href="/videos">Browse</a><a href="http://upload.youtube.com/my_videos_upload">Upload</a>
		</div>
			<div id="masthead-utility">
				

<button type="button" class="flip yt-uix-button yt-uix-button-text" onclick=";return false;" ><span class="yt-uix-button-content">WhatsWrongWithShoe</span> <img class="yt-uix-button-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" alt=""><div style="display:none;" class="yt-uix-button-menu yt-uix-button-menu-text">
















	<table>
		<tr>
			<td><a class="yt-uix-button-menu-item" href="/user/WhatsWrongWithShoe?feature=mhum">My Channel</a></td>
			<td><a class="yt-uix-button-menu-item" href="/my_subscriptions?feature=mhum">Subscriptions</a></td>
		</tr>
		<tr>
			<td><a class="yt-uix-button-menu-item" href="/inbox?feature=mhum&amp;amp;folder=messages&amp;amp;action_message=1">Inbox</a></td>
			<td><a class="yt-uix-button-menu-item" href="/my_videos?feature=mhum">My Videos</a></td>
		</tr>
		<tr>
			<td><a class="yt-uix-button-menu-item" href="/account?feature=mhum">Account</a></td>
			<td><a class="yt-uix-button-menu-item" href="/my_favorites?feature=mhum">Favorites</a></td>
		</tr>
	</table>
</div></button><a class="end" href="#" onclick="document.logoutForm.submit(); return false;">Sign Out</a>
			</div>
	</div>
	


		</div>
	</div> 
	<div id="baseDiv" class="date-20100825 video-info ">
			

		

	<div id="masthead_child_div"></div>
	<script type="text/javascript">
		var masthead_child_fo = new SWFObject("http://s.ytimg.com/yt/swf/masthead_child-vfl89464.swf", "masthead_child", 1, 1, 7, "#FFFFFF");
		masthead_child_fo.addParam("allowFullscreen", "false");
		masthead_child_fo.addParam("allowScriptAccess", "always");
		masthead_child_fo.write("masthead_child_div");
	</script>
		

	

	<div id="ad_creative_expand_btn_1" class="homepage-masthead-ad hid" onclick="">
		<a class="homepage-masthead-btn" href="#" onclick="return masthead.expand_ad();">
				<span>Show Ad</span>
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite">
		</a>
	</div>



	
		






		<div id="ad_creative_1" class="ad-div mastad" style="z-index: 1;">
			<iframe id="ad_creative_iframe_1" src="http://ad-g.doubleclick.net/adi/com.ythome/_default;sz=960x250;k21=1;kgender=m;kga=1001;kar=3;klg=en;kage=22;kgg=1;kt=U;kcr=us;dc_dedup=1;kmyd=ad_creative_1;tile=1;dcopt=ist;ord=133223159158549?" height="250" width="960" scrolling="no" frameborder="0" style="z-index: 1" id="homepagetop" onload="yt.www.home.ads.workaroundLoad()" onmouseover="yt.www.home.ads.workaroundIE(this)" onfocus="yt.www.home.ads.workaroundIE(this)"></iframe>			
		</div>



<div id="homepage-main-content" class="">





		<div id="iyt-add-remove-module-div">
			<div class="iyt-add-remove-module">
				<span class="iyt-add-remove-module-icon"><a href="/account#customize/homepage"><img class="master-sprite img-php-add-remove-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></a></span><a href="/account#customize/homepage">Add / Remove Modules</a>
			</div>
		</div>

			<div id="mundo-remove" style="display: none;">
		<div class="iyt-undo-remove-msg">
Successfully removed.  Click <a id="feed_undo_delete_link" href="#">here</a> to undo.
		</div>
	</div>



	<div id="dragdrop" style="overflow: hidden; clear: both;">



				<div id="feedmodule-SUB" class="feedmodule-anchor">
				<div class="feedmodule-modheader" id="SUB-titlebar">
				<div id="feed_subscriptions">
		<div class="fm-title-underlined-gray">
			<div class="fm2-title">
				<span class="fm2-titleText" id="feed_subscriptions-titleText"><a href="/my_subscriptions" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/View_Subscriptions/Logged_In');">Subscriptions</a></span>
			</div>


					<div class="feedmodule-updown">

			<span id="medit-SUB" class="iyt-edit-link " >Edit</span>

<span id="mup-SUB" class="up-button"><img class="master-sprite img-php-up-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mdown-SUB" class="down-button"><img class="master-sprite img-php-down-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mclose-SUB"><img class="master-sprite img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span></div>


		</div>
	</div>

	</div>

	<div class="clear" id="feed_subscriptions-content">

			<div id="SUB-options" class="opt-pane" style="display: none;">
		<div class="opt-box-top">
			<img class="homepage-sprite img-php-opt-box-caret" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" />
		</div>
		<div class="opt-banner">
			<div class="opt-links">
				<div class="opt-edit">Editing: Subscriptions</div>
				<div class="opt-close opt-close-button" onclick="moduleHelper.closeOptionsPane('SUB')"><img class="img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/></div>
				<div class="opt-close opt-close-text" onclick="moduleHelper.closeOptionsPane('SUB')">close</div>
				<div id="SUB-loading-msg" class="opt-loading-msg" style="display: none;">
Saving...
				</div>
				<div id="SUB-loading-icn" class="opt-loading-icn" style="display: none;">
					<img width="16" id="SUB-loading-icn-image" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" image="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="opt-main">
			<div class="opt-divider">
				<table class="opt-tbl">
				<tr>
						<td class="opt-name">
Display as:
						</td>
						<td class="opt-val opt-sel">
							<div id="SUB-options-SIN" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-on" title="List View" alt="List View"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off"  onclick="moduleHelper.setLayoutPreference('SUB', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('SUB', 'AGG')">
							</div>
							<div id="SUB-options-BTH" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('SUB', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-on"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('SUB', 'AGG')">
							</div>
							<div id="SUB-options-AGG" class="opt-form-type-btns" >
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('SUB', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off" onclick="moduleHelper.setLayoutPreference('SUB', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-on" title="Grid View" alt="Grid View">
							</div>
						</td>

					<td class="opt-name">
Number of rows to display:
					</td>
	
					<td class="opt-val">
						<select id="SUB-options-num" name="SUB-options-num" onchange="moduleHelper.setLengthPreference('SUB', 'SUB-options-num', 'AGG')">
	
	

	
								<option value="1" >1</option>
								<option value="2" >2</option>
								<option value="3" selected>3</option>
								<option value="4" >4</option>
								<option value="5" >5</option>
								<option value="6" >6</option>
						</select>
					</td>
				</tr>
				</table>
	

	
	

					<div class="opt-video-exclusion">
						<input id="homepage-exclude-videos-already-watched" type="checkbox" value="true" checked />
						<label for="homepage-exclude-videos-already-watched">Exclude videos I've already watched</label>
						<br/>
					</div>
			</div>
		</div>
	</div>


		<div id="SUB-data" class="feedmodule-data">



						<div class="feedmodule-body grid-view">
		<div class="clearL">
	
				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-Uj2G7ajL_qI-');" onmouseout="_hidediv('XABLE-Uj2G7ajL_qI-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-Uj2G7ajL_qI-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('Uj2G7ajL_qI');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=Uj2G7ajL_qI&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-Uj2G7ajL_qI-8941809" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Pimps Don't Cry ft. Cee-Lo Green &amp; Eva Mendes" alt="Pimps Don't Cry ft. Cee-Lo Green &amp; Eva Mendes" src="http://i2.ytimg.com/vi/Uj2G7ajL_qI/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">3:51</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-Uj2G7ajL_qI-8941809', null, 'Uj2G7ajL_qI', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-Uj2G7ajL_qI" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Uj2G7ajL_qI&amp;feature=sub" rel="nofollow" title="Pimps Don't Cry ft. Cee-Lo Green &amp; Eva Mendes" class="" id="video-short-title-Uj2G7ajL_qI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Pimps Don't Cry ft. Cee-Lo Green...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Uj2G7ajL_qI&amp;feature=sub" rel="nofollow" title="Pimps Don't Cry ft. Cee-Lo Green &amp; Eva Mendes" class="" id="video-long-title-Uj2G7ajL_qI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Pimps Don't Cry ft. Cee-Lo Green & Eva Mendes</a>

						<div class="video-logos">
		<a href="/watch?v=Uj2G7ajL_qI&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-Uj2G7ajL_qI" dir="ltr" class="video-description">
					The world premiere exclusive video of the early Academy Awards favorite and new na...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-Uj2G7ajL_qI" class="video-date-added">4 hours ago</span>

					<span id="video-num-views-Uj2G7ajL_qI" class="video-view-count">304 views
</span>



					<span class="video-username"><a id="video-from-username-Uj2G7ajL_qI" class="hLink"  href="/user/FunnyorDie">FunnyorDie</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-jyUxs_Hodn8-');" onmouseout="_hidediv('XABLE-jyUxs_Hodn8-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-jyUxs_Hodn8-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('jyUxs_Hodn8');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=jyUxs_Hodn8&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-jyUxs_Hodn8-9735022" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Chef Rage FAIL" alt="Chef Rage FAIL" src="http://i3.ytimg.com/vi/jyUxs_Hodn8/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">0:52</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-jyUxs_Hodn8-9735022', null, 'jyUxs_Hodn8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-jyUxs_Hodn8" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=jyUxs_Hodn8&amp;feature=sub" rel="nofollow" title="Chef Rage FAIL" class="" id="video-short-title-jyUxs_Hodn8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Chef Rage FAIL</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=jyUxs_Hodn8&amp;feature=sub" rel="nofollow" title="Chef Rage FAIL" class="" id="video-long-title-jyUxs_Hodn8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Chef Rage FAIL</a>

						<div class="video-logos">
	</div>

				</div>
			</div>

				<div id="video-description-jyUxs_Hodn8" dir="ltr" class="video-description">
					Someone's a little mad at work. 

Thanks to: youtube.com/ElVagoMerlin 

For more F...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-jyUxs_Hodn8" class="video-date-added">5 hours ago</span>

					<span id="video-num-views-jyUxs_Hodn8" class="video-view-count">304 views
</span>



					<span class="video-username"><a id="video-from-username-jyUxs_Hodn8" class="hLink"  href="/user/failblog">failblog</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-oEH5pMylo3Q-');" onmouseout="_hidediv('XABLE-oEH5pMylo3Q-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-oEH5pMylo3Q-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('oEH5pMylo3Q');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=oEH5pMylo3Q&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-oEH5pMylo3Q-1538917" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Spy Barbie Hack!" alt="Spy Barbie Hack!" src="http://i4.ytimg.com/vi/oEH5pMylo3Q/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">2:27</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-oEH5pMylo3Q-1538917', null, 'oEH5pMylo3Q', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-oEH5pMylo3Q" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=oEH5pMylo3Q&amp;feature=sub" rel="nofollow" title="Spy Barbie Hack!" class="" id="video-short-title-oEH5pMylo3Q" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Spy Barbie Hack!</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=oEH5pMylo3Q&amp;feature=sub" rel="nofollow" title="Spy Barbie Hack!" class="" id="video-long-title-oEH5pMylo3Q" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Spy Barbie Hack!</a>

						<div class="video-logos">
	</div>

				</div>
			</div>

				<div id="video-description-oEH5pMylo3Q" dir="ltr" class="video-description">
					It's time for Barbie to pay her dues and get hacked! A cool spy gadget is inside o...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-oEH5pMylo3Q" class="video-date-added">6 hours ago</span>

					<span id="video-num-views-oEH5pMylo3Q" class="video-view-count">312 views
</span>



					<span class="video-username"><a id="video-from-username-oEH5pMylo3Q" class="hLink"  href="/user/kipkay">kipkay</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-mCVqpOAiBgY-');" onmouseout="_hidediv('XABLE-mCVqpOAiBgY-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-mCVqpOAiBgY-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('mCVqpOAiBgY');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=mCVqpOAiBgY&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-mCVqpOAiBgY-6745841" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="New Apple Event and Giveaway!" alt="New Apple Event and Giveaway!" src="http://i2.ytimg.com/vi/mCVqpOAiBgY/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">4:25</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-mCVqpOAiBgY-6745841', null, 'mCVqpOAiBgY', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-mCVqpOAiBgY" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=mCVqpOAiBgY&amp;feature=sub" rel="nofollow" title="New Apple Event and Giveaway!" class="" id="video-short-title-mCVqpOAiBgY" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">New Apple Event and Giveaway!</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=mCVqpOAiBgY&amp;feature=sub" rel="nofollow" title="New Apple Event and Giveaway!" class="" id="video-long-title-mCVqpOAiBgY" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">New Apple Event and Giveaway!</a>

						<div class="video-logos">
		<a href="/watch?v=mCVqpOAiBgY&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-mCVqpOAiBgY" dir="ltr" class="video-description">
					Next week on Sept. 1st, Apple will holding an event to unveil the new iPod line up...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-mCVqpOAiBgY" class="video-date-added">7 hours ago</span>

					<span id="video-num-views-mCVqpOAiBgY" class="video-view-count">305 views
</span>



					<span class="video-username"><a id="video-from-username-mCVqpOAiBgY" class="hLink"  href="/user/SoldierKnowsBest">SoldierKnowsBest</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-uffA-h6tagI-');" onmouseout="_hidediv('XABLE-uffA-h6tagI-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-uffA-h6tagI-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('uffA-h6tagI');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=uffA-h6tagI&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-uffA-h6tagI-6348155" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Beat Whitey Fight Night!" alt="Beat Whitey Fight Night!" src="http://i2.ytimg.com/vi/uffA-h6tagI/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">6:20</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-uffA-h6tagI-6348155', null, 'uffA-h6tagI', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-uffA-h6tagI" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=uffA-h6tagI&amp;feature=sub" rel="nofollow" title="Beat Whitey Fight Night!" class="" id="video-short-title-uffA-h6tagI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Beat Whitey Fight Night!</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=uffA-h6tagI&amp;feature=sub" rel="nofollow" title="Beat Whitey Fight Night!" class="" id="video-long-title-uffA-h6tagI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Beat Whitey Fight Night!</a>

						<div class="video-logos">
		<a href="/watch?v=uffA-h6tagI&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-uffA-h6tagI" dir="ltr" class="video-description">
					CLICK DOWN HERE FOR ALL THE AWESOME SCHTUFF!!!


For all links to stories, NSFW...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-uffA-h6tagI" class="video-date-added">7 hours ago</span>

					<span id="video-num-views-uffA-h6tagI" class="video-view-count">304 views
</span>



					<span class="video-username"><a id="video-from-username-uffA-h6tagI" class="hLink"  href="/user/sxephil">sxephil</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-GKAHDBDzfDw-');" onmouseout="_hidediv('XABLE-GKAHDBDzfDw-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-GKAHDBDzfDw-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('GKAHDBDzfDw');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=GKAHDBDzfDw&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-GKAHDBDzfDw-9478270" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Crayola Factory!" alt="Crayola Factory!" src="http://i4.ytimg.com/vi/GKAHDBDzfDw/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">4:13</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-GKAHDBDzfDw-9478270', null, 'GKAHDBDzfDw', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-GKAHDBDzfDw" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=GKAHDBDzfDw&amp;feature=sub" rel="nofollow" title="Crayola Factory!" class="" id="video-short-title-GKAHDBDzfDw" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Crayola Factory!</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=GKAHDBDzfDw&amp;feature=sub" rel="nofollow" title="Crayola Factory!" class="" id="video-long-title-GKAHDBDzfDw" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Crayola Factory!</a>

						<div class="video-logos">
		<a href="/watch?v=GKAHDBDzfDw&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-GKAHDBDzfDw" dir="ltr" class="video-description">
					In which Danielle takes Dan on a mystery adventure to the Crayola Crayon factory.
...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-GKAHDBDzfDw" class="video-date-added">8 hours ago</span>

					<span id="video-num-views-GKAHDBDzfDw" class="video-view-count">302 views
</span>



					<span class="video-username"><a id="video-from-username-GKAHDBDzfDw" class="hLink"  href="/user/pogobat">pogobat</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-4HZfsfvpxuI-');" onmouseout="_hidediv('XABLE-4HZfsfvpxuI-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-4HZfsfvpxuI-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('4HZfsfvpxuI');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=4HZfsfvpxuI&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-4HZfsfvpxuI-2061286" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="The MPG List (Grab a Pencil and Paper)" alt="The MPG List (Grab a Pencil and Paper)" src="http://i1.ytimg.com/vi/4HZfsfvpxuI/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">5:35</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-4HZfsfvpxuI-2061286', null, '4HZfsfvpxuI', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-4HZfsfvpxuI" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=4HZfsfvpxuI&amp;feature=sub" rel="nofollow" title="The MPG List (Grab a Pencil and Paper)" class="" id="video-short-title-4HZfsfvpxuI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">The MPG List (Grab a Pencil and ...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=4HZfsfvpxuI&amp;feature=sub" rel="nofollow" title="The MPG List (Grab a Pencil and Paper)" class="" id="video-long-title-4HZfsfvpxuI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">The MPG List (Grab a Pencil and Paper)</a>

						<div class="video-logos">
		<a href="/watch?v=4HZfsfvpxuI&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-4HZfsfvpxuI" dir="ltr" class="video-description">
					Time to do it!  Grab a pencil and paper and make yourself an MPG list.

If you w...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-4HZfsfvpxuI" class="video-date-added">9 hours ago</span>

					<span id="video-num-views-4HZfsfvpxuI" class="video-view-count">958 views
</span>



					<span class="video-username"><a id="video-from-username-4HZfsfvpxuI" class="hLink"  href="/user/PhilipDeFranco">PhilipDeFranco</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-4RcC8OHl7s8-');" onmouseout="_hidediv('XABLE-4RcC8OHl7s8-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-4RcC8OHl7s8-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('4RcC8OHl7s8');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=4RcC8OHl7s8&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-4RcC8OHl7s8-4438200" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="The 10th Hour - There Is Nothing" alt="The 10th Hour - There Is Nothing" src="http://i1.ytimg.com/vi/4RcC8OHl7s8/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">4:19</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-4RcC8OHl7s8-4438200', null, '4RcC8OHl7s8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-4RcC8OHl7s8" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=4RcC8OHl7s8&amp;feature=sub" rel="nofollow" title="The 10th Hour - There Is Nothing" class="" id="video-short-title-4RcC8OHl7s8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">The 10th Hour - There Is Nothing</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=4RcC8OHl7s8&amp;feature=sub" rel="nofollow" title="The 10th Hour - There Is Nothing" class="" id="video-long-title-4RcC8OHl7s8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">The 10th Hour - There Is Nothing</a>

						<div class="video-logos">
		<a href="/watch?v=4RcC8OHl7s8&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-4RcC8OHl7s8" dir="ltr" class="video-description">
					This is my first time ever directing a music video. The members of The 10th Hour a...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-4RcC8OHl7s8" class="video-date-added">9 hours ago</span>

					<span id="video-num-views-4RcC8OHl7s8" class="video-view-count">304 views
</span>



					<span class="video-username"><a id="video-from-username-4RcC8OHl7s8" class="hLink"  href="/user/damian">damian</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-D6ExwYIJIsk-');" onmouseout="_hidediv('XABLE-D6ExwYIJIsk-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-D6ExwYIJIsk-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('D6ExwYIJIsk');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=D6ExwYIJIsk&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-D6ExwYIJIsk-2609635" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Do You Want to Buy the Apple Magic Trackpad?" alt="Do You Want to Buy the Apple Magic Trackpad?" src="http://i1.ytimg.com/vi/D6ExwYIJIsk/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">6:30</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-D6ExwYIJIsk-2609635', null, 'D6ExwYIJIsk', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-D6ExwYIJIsk" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=D6ExwYIJIsk&amp;feature=sub" rel="nofollow" title="Do You Want to Buy the Apple Magic Trackpad?" class="" id="video-short-title-D6ExwYIJIsk" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Do You Want to Buy the Apple Mag...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=D6ExwYIJIsk&amp;feature=sub" rel="nofollow" title="Do You Want to Buy the Apple Magic Trackpad?" class="" id="video-long-title-D6ExwYIJIsk" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Do You Want to Buy the Apple Magic Trackpad?</a>

						<div class="video-logos">
		<a href="/watch?v=D6ExwYIJIsk&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-D6ExwYIJIsk" dir="ltr" class="video-description">
					http://twitter.com/chrispirillo - http://facebook.com/chrispirillo - Apple's Magic...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-D6ExwYIJIsk" class="video-date-added">9 hours ago</span>

					<span id="video-num-views-D6ExwYIJIsk" class="video-view-count">301 views
</span>



					<span class="video-username"><a id="video-from-username-D6ExwYIJIsk" class="hLink"  href="/user/lockergnome">lockergnome</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-HY51v0rG728-');" onmouseout="_hidediv('XABLE-HY51v0rG728-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-HY51v0rG728-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('HY51v0rG728');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=HY51v0rG728&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-HY51v0rG728-3329050" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Mafia 2: Easy Money Guide" alt="Mafia 2: Easy Money Guide" src="http://i1.ytimg.com/vi/HY51v0rG728/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">3:12</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-HY51v0rG728-3329050', null, 'HY51v0rG728', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-HY51v0rG728" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=HY51v0rG728&amp;feature=sub" rel="nofollow" title="Mafia 2: Easy Money Guide" class="" id="video-short-title-HY51v0rG728" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Mafia 2: Easy Money Guide</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=HY51v0rG728&amp;feature=sub" rel="nofollow" title="Mafia 2: Easy Money Guide" class="" id="video-long-title-HY51v0rG728" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Mafia 2: Easy Money Guide</a>

						<div class="video-logos">
		<a href="/watch?v=HY51v0rG728&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-HY51v0rG728" dir="ltr" class="video-description">
					Geoff and Jack show you how to earn some quick and easy money in Mafia 2.
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-HY51v0rG728" class="video-date-added">9 hours ago</span>

					<span id="video-num-views-HY51v0rG728" class="video-view-count">304 views
</span>



					<span class="video-username"><a id="video-from-username-HY51v0rG728" class="hLink"  href="/user/RoosterTeeth">RoosterTeeth</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-PsEZwrtgpe8-');" onmouseout="_hidediv('XABLE-PsEZwrtgpe8-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-PsEZwrtgpe8-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('PsEZwrtgpe8');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=PsEZwrtgpe8&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-PsEZwrtgpe8-6823068" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Rotten Tomatoes Sneak Peek: Five Favorite Films with Ice Cube" alt="Rotten Tomatoes Sneak Peek: Five Favorite Films with Ice Cube" src="http://i1.ytimg.com/vi/PsEZwrtgpe8/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">2:34</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-PsEZwrtgpe8-6823068', null, 'PsEZwrtgpe8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-PsEZwrtgpe8" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=PsEZwrtgpe8&amp;feature=sub" rel="nofollow" title="Rotten Tomatoes Sneak Peek: Five Favorite Films with Ice Cube" class="" id="video-short-title-PsEZwrtgpe8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Rotten Tomatoes Sneak Peek: Five...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=PsEZwrtgpe8&amp;feature=sub" rel="nofollow" title="Rotten Tomatoes Sneak Peek: Five Favorite Films with Ice Cube" class="" id="video-long-title-PsEZwrtgpe8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Rotten Tomatoes Sneak Peek: Five Favorite Films with Ice Cube</a>

						<div class="video-logos">
		<a href="/watch?v=PsEZwrtgpe8&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-PsEZwrtgpe8" dir="ltr" class="video-description">
					From famous gangster movies like "The Godfather" to 80s comedies like "Trading Pla...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-PsEZwrtgpe8" class="video-date-added">13 hours ago</span>

					<span id="video-num-views-PsEZwrtgpe8" class="video-view-count">302 views
</span>



					<span class="video-username"><a id="video-from-username-PsEZwrtgpe8" class="hLink"  href="/user/Current">Current</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%"onmouseover="_showdiv('XABLE-V7yJ6ZDlkOc-');" onmouseout="_hidediv('XABLE-V7yJ6ZDlkOc-');">



	


	<div class="video-entry" style="position:relative">



			<!--[if gt IE 6]><!-->
			<div class="hid" id="XABLE-V7yJ6ZDlkOc-" style="position:absolute;top:0px;left:140px" onclick="moduleHelper.markSubscriptionVideoWatched('V7yJ6ZDlkOc');return false">
				<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite img-php-close-button"/>
			</div>
			<!--<![endif]-->
				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=V7yJ6ZDlkOc&amp;feature=sub" class="video-thumb ux-thumb-128" id="video-thumb-V7yJ6ZDlkOc-4268489" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Keyboard Slip case for Apple's Wireless Keyboard (Review)" alt="Keyboard Slip case for Apple's Wireless Keyboard (Review)" src="http://i3.ytimg.com/vi/V7yJ6ZDlkOc/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');"></span>		
<span class="video-time">2:32</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-V7yJ6ZDlkOc-4268489', null, 'V7yJ6ZDlkOc', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-V7yJ6ZDlkOc" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=V7yJ6ZDlkOc&amp;feature=sub" rel="nofollow" title="Keyboard Slip case for Apple's Wireless Keyboard (Review)" class="" id="video-short-title-V7yJ6ZDlkOc" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Keyboard Slip case for Apple's W...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=V7yJ6ZDlkOc&amp;feature=sub" rel="nofollow" title="Keyboard Slip case for Apple's Wireless Keyboard (Review)" class="" id="video-long-title-V7yJ6ZDlkOc" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/SUB/Logged_In');">Keyboard Slip case for Apple's Wireless Keyboard (Review)</a>

						<div class="video-logos">
		<a href="/watch?v=V7yJ6ZDlkOc&feature=sub&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-V7yJ6ZDlkOc" dir="ltr" class="video-description">
					The Keyboard Slip from Waterfield Designs is an interesting product ushered in by ...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-V7yJ6ZDlkOc" class="video-date-added">18 hours ago</span>

					<span id="video-num-views-V7yJ6ZDlkOc" class="video-view-count">500 views
</span>



					<span class="video-username"><a id="video-from-username-V7yJ6ZDlkOc" class="hLink"  href="/user/wwwinsanelygreatmac">wwwinsanelygreatmac</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

		</div>
	</div>


		</div>
	</div>
	<div class="clear"></div>
	

	</div>

		

					<div id="feedmodule-PRO" class="feedmodule-anchor">
				<div class="feedmodule-modheader" id="PRO-titlebar">
				<div id="feed_promoted">
		<div class="fm-title-underlined-blue">
			<div class="fm2-title">
				<span class="fm2-titleText" id="feed_promoted-titleText">Featured Videos</span>
			</div>


					<div class="feedmodule-updown">


<span id="mup-PRO" class="up-button"><img class="master-sprite img-php-up-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mdown-PRO" class="down-button"><img class="master-sprite img-php-down-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span></div>


		</div>
	</div>

	</div>

	<div class="clear" id="feed_promoted-content">

			<div id="PRO-options" class="opt-pane" style="display: none;">
		<div class="opt-box-top">
			<img class="homepage-sprite img-php-opt-box-caret" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" />
		</div>
		<div class="opt-banner">
			<div class="opt-links">
				<div class="opt-edit">Editing: Featured Videos</div>
				<div class="opt-close opt-close-button" onclick="moduleHelper.closeOptionsPane('PRO')"><img class="img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/></div>
				<div class="opt-close opt-close-text" onclick="moduleHelper.closeOptionsPane('PRO')">close</div>
				<div id="PRO-loading-msg" class="opt-loading-msg" style="display: none;">
Saving...
				</div>
				<div id="PRO-loading-icn" class="opt-loading-icn" style="display: none;">
					<img width="16" id="PRO-loading-icn-image" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" image="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="opt-main">
			<div class="opt-divider">
				<table class="opt-tbl">
				<tr>
						<td class="opt-name">
Display as:
						</td>
						<td class="opt-val opt-sel">
							<div id="PRO-options-SIN" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-on" title="List View" alt="List View"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off"  onclick="moduleHelper.setLayoutPreference('PRO', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('PRO', 'AGG')">
							</div>
							<div id="PRO-options-BTH" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('PRO', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-on"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('PRO', 'AGG')">
							</div>
							<div id="PRO-options-AGG" class="opt-form-type-btns" >
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('PRO', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off" onclick="moduleHelper.setLayoutPreference('PRO', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-on" title="Grid View" alt="Grid View">
							</div>
						</td>

					<td class="opt-name">
Number of rows to display:
					</td>
	
					<td class="opt-val">
						<select id="PRO-options-num" name="PRO-options-num" onchange="moduleHelper.setLengthPreference('PRO', 'PRO-options-num', 'AGG')">
	
	

	
								<option value="1" selected>1</option>
								<option value="2" >2</option>
								<option value="3" >3</option>
								<option value="4" >4</option>
								<option value="5" >5</option>
								<option value="6" >6</option>
								<option value="7" >7</option>
								<option value="8" >8</option>
						</select>
					</td>
				</tr>
				</table>
	

			</div>
		</div>
	</div>


		<div id="PRO-data" class="feedmodule-data">



						<div class="feedmodule-body grid-view">
		<div class="clearL">
	
				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=8fj2HVYlD_4&amp;feature=fvhl" class="video-thumb ux-thumb-128" id="video-thumb-8fj2HVYlD_4-27790" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="&quot;Teenage Dream&quot; - Official Lyric Video" alt="&quot;Teenage Dream&quot; - Official Lyric Video" src="http://i1.ytimg.com/vi/8fj2HVYlD_4/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');"></span>		
<span class="video-time">3:59</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-8fj2HVYlD_4-27790', null, '8fj2HVYlD_4', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-8fj2HVYlD_4" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=8fj2HVYlD_4&amp;feature=fvhl" rel="nofollow" title="&quot;Teenage Dream&quot; - Official Lyric Video" class="" id="video-short-title-8fj2HVYlD_4" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">"Teenage Dream" - Official Lyric...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=8fj2HVYlD_4&amp;feature=fvhl" rel="nofollow" title="&quot;Teenage Dream&quot; - Official Lyric Video" class="" id="video-long-title-8fj2HVYlD_4" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">"Teenage Dream" - Official Lyric Video</a>

						<div class="video-logos">
		<a href="/watch?v=8fj2HVYlD_4&feature=fvhl&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-8fj2HVYlD_4" dir="ltr" class="video-description">
					The official lyric video for her latest single "Teenage Dream." Buy it on iTunes h...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-8fj2HVYlD_4" class="video-date-added">1 month ago</span>

					<span id="video-num-views-8fj2HVYlD_4" class="video-view-count">8,073,708 views
</span>



					<span class="video-username"><a id="video-from-username-8fj2HVYlD_4" class="hLink"  href="/user/KatyPerryMusic">KatyPerryMusic</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=NmrSR5O9QXc&amp;feature=fvhl" class="video-thumb ux-thumb-128" id="video-thumb-NmrSR5O9QXc-141186" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="'The Last Exorcism' Trailer HD" alt="'The Last Exorcism' Trailer HD" src="http://i3.ytimg.com/vi/NmrSR5O9QXc/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');"></span>		
<span class="video-time">2:12</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-NmrSR5O9QXc-141186', null, 'NmrSR5O9QXc', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-NmrSR5O9QXc" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=NmrSR5O9QXc&amp;feature=fvhl" rel="nofollow" title="'The Last Exorcism' Trailer HD" class="" id="video-short-title-NmrSR5O9QXc" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">'The Last Exorcism' Trailer HD</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=NmrSR5O9QXc&amp;feature=fvhl" rel="nofollow" title="'The Last Exorcism' Trailer HD" class="" id="video-long-title-NmrSR5O9QXc" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">'The Last Exorcism' Trailer HD</a>

						<div class="video-logos">
		<a href="/watch?v=NmrSR5O9QXc&feature=fvhl&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-NmrSR5O9QXc" dir="ltr" class="video-description">
					For more info on 'The Last Exorcism' visit: http://www.hollywood.com
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-NmrSR5O9QXc" class="video-date-added">3 months ago</span>

					<span id="video-num-views-NmrSR5O9QXc" class="video-view-count">785,880 views
</span>



					<span class="video-username"><a id="video-from-username-NmrSR5O9QXc" class="hLink"  href="/user/hollywoodstreams">hollywoodstreams</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=Y5lO4hEAJHU&amp;feature=fvhl" class="video-thumb ux-thumb-128" id="video-thumb-Y5lO4hEAJHU-8173591" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Bruno Mars - Just The Way You Are [Debut Single]" alt="Bruno Mars - Just The Way You Are [Debut Single]" src="http://i2.ytimg.com/vi/Y5lO4hEAJHU/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');"></span>		
<span class="video-time">3:41</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-Y5lO4hEAJHU-8173591', null, 'Y5lO4hEAJHU', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-Y5lO4hEAJHU" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Y5lO4hEAJHU&amp;feature=fvhl" rel="nofollow" title="Bruno Mars - Just The Way You Are [Debut Single]" class="" id="video-short-title-Y5lO4hEAJHU" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">Bruno Mars - Just The Way You Ar...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Y5lO4hEAJHU&amp;feature=fvhl" rel="nofollow" title="Bruno Mars - Just The Way You Are [Debut Single]" class="" id="video-long-title-Y5lO4hEAJHU" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">Bruno Mars - Just The Way You Are [Debut Single]</a>

						<div class="video-logos">
		<a href="/watch?v=Y5lO4hEAJHU&feature=fvhl&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-Y5lO4hEAJHU" dir="ltr" class="video-description">
					Buy on iTunes: http://atlr.ec/aFj46h For the ringtone text AMAZING to 33133! **Not...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-Y5lO4hEAJHU" class="video-date-added">1 month ago</span>

					<span id="video-num-views-Y5lO4hEAJHU" class="video-view-count">6,101,362 views
</span>



					<span class="video-username"><a id="video-from-username-Y5lO4hEAJHU" class="hLink"  href="/user/ElektraRecords">ElektraRecords</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=s_eLjCj4oEQ&amp;feature=fvhl" class="video-thumb ux-thumb-128" id="video-thumb-s_eLjCj4oEQ-2098599" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="YES I CAN - Christian Beadles ft. MarsRaps - Lyrics" alt="YES I CAN - Christian Beadles ft. MarsRaps - Lyrics" src="http://i4.ytimg.com/vi/s_eLjCj4oEQ/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');"></span>		
<span class="video-time">3:47</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-s_eLjCj4oEQ-2098599', null, 's_eLjCj4oEQ', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-s_eLjCj4oEQ" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=s_eLjCj4oEQ&amp;feature=fvhl" rel="nofollow" title="YES I CAN - Christian Beadles ft. MarsRaps - Lyrics" class="" id="video-short-title-s_eLjCj4oEQ" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">YES I CAN - Christian Beadles ft...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=s_eLjCj4oEQ&amp;feature=fvhl" rel="nofollow" title="YES I CAN - Christian Beadles ft. MarsRaps - Lyrics" class="" id="video-long-title-s_eLjCj4oEQ" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/PRO/Logged_In');">YES I CAN - Christian Beadles ft. MarsRaps - Lyrics</a>

						<div class="video-logos">
		<a href="/watch?v=s_eLjCj4oEQ&feature=fvhl&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
		<a href="/watch?v=s_eLjCj4oEQ&feature=fvhl&cc=1"><img src="http://s.ytimg.com/yt/img/badge_cc_results-vfl146060.gif" class="video-logo " /></a>
	</div>

				</div>
			</div>

				<div id="video-description-s_eLjCj4oEQ" dir="ltr" class="video-description">
					YES I CAN - Christian Beadles ft. MarsRaps 

I'm not a rapper or singer ... Im j...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-s_eLjCj4oEQ" class="video-date-added">3 weeks ago</span>

					<span id="video-num-views-s_eLjCj4oEQ" class="video-view-count">792,541 views
</span>



					<span class="video-username"><a id="video-from-username-s_eLjCj4oEQ" class="hLink"  href="/user/Christianbeadles">Christianbeadles</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

		</div>
	</div>


		</div>
	</div>
	<div class="clear"></div>
	

		</div>

		

				<div id="feedmodule-FRI" class="feedmodule-anchor">
			<div class="feedmodule-modheader" id="FRI-titlebar">
				<div id="feed_subtivity">
		<div class="fm-title-underlined-gray">
			<div class="fm2-title">
				<span class="fm2-titleText" id="feed_subtivity-titleText">Recent Activity</span>
			</div>


					<div class="feedmodule-updown">

			<span id="medit-FRI" class="iyt-edit-link " >Edit</span>

<span id="mup-FRI" class="up-button"><img class="master-sprite img-php-up-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mdown-FRI" class="down-button"><img class="master-sprite img-php-down-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mclose-FRI"><img class="master-sprite img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span></div>


		</div>
	</div>

	</div>

	<div class="clear" id="feed_subtivity-content">

			<div id="FRI-options" class="opt-pane" style="display: none;">
		<div class="opt-box-top">
			<img class="homepage-sprite img-php-opt-box-caret" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" />
		</div>
		<div class="opt-banner">
			<div class="opt-links">
				<div class="opt-edit">Editing: Recent Activity</div>
				<div class="opt-close opt-close-button" onclick="moduleHelper.closeOptionsPane('FRI')"><img class="img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/></div>
				<div class="opt-close opt-close-text" onclick="moduleHelper.closeOptionsPane('FRI')">close</div>
				<div id="FRI-loading-msg" class="opt-loading-msg" style="display: none;">
Saving...
				</div>
				<div id="FRI-loading-icn" class="opt-loading-icn" style="display: none;">
					<img width="16" id="FRI-loading-icn-image" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" image="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="opt-main">
			<div class="opt-divider">
				<table class="opt-tbl">
				<tr>

					<td class="opt-name">
Number of rows to display:
					</td>
	
					<td class="opt-val">
						<select id="FRI-options-num" name="FRI-options-num" onchange="moduleHelper.setLengthPreference('FRI', 'FRI-options-num', 'SIN')">
	
	

	
								<option value="1" >1</option>
								<option value="2" >2</option>
								<option value="3" selected>3</option>
								<option value="4" >4</option>
								<option value="5" >5</option>
								<option value="6" >6</option>
								<option value="7" >7</option>
								<option value="8" >8</option>
								<option value="9" >9</option>
								<option value="10" >10</option>
								<option value="11" >11</option>
								<option value="12" >12</option>
						</select>
					</td>
				</tr>
				</table>
	

			</div>
		</div>
	</div>


		<div id="FRI-data" class="feedmodule-data">



					
	<div id="recent-activity-box" class="feedmodule-body list-view">



			<div class="subtivity-single-form-item">
						<span class="username_WHATTHEBUCKSHOW"></span>
					<div class="feedmodule-single-form-item" onmouseover="subui_.handleActivityItemMouseover(this);return false;">
						<div class="feedmodule-smtitle-wrapper">
								<a id="_firsteditsublink" href="#" class="edit-subscription-recent-activity-link" onclick="subui_.toggleInlineSubscriptionEditBubble(this, 'WHATTHEBUCKSHOW', 'v3wqqA79Ndo', 'vfilZwaNMQYXcnZ8-3GXvjD7jut8MA%3D%3D');return false;">
edit subscription
							</a>

						<div class="feedmodule-smtitle">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="feed_icon_img icon-RAT master-sprite">
							




<a href="/user/WHATTHEBUCKSHOW">WHATTHEBUCKSHOW</a> liked this video and <a href="#" onclick="yt.style.toggle('feeditem--2107529589-videos'); return false;">1 other</a>
		
	

 &nbsp;

								<span class="feedmodule-ts">(58 minutes ago)</span>
						</div>
					</div>

						



		<div  class="video-cell" style="width:99.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=U15idIwlwqI&amp;feature=recentlik" class="video-thumb ux-thumb-96" id="video-thumb-U15idIwlwqI-5862129" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="Desert Duel" alt="Desert Duel" src="http://i2.ytimg.com/vi/U15idIwlwqI/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');"></span>		
<span class="video-time">1:51</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-U15idIwlwqI-5862129', null, 'U15idIwlwqI', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-U15idIwlwqI" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=U15idIwlwqI&amp;feature=recentlik" rel="nofollow" title="Desert Duel" class="" id="video-short-title-U15idIwlwqI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">Desert Duel</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=U15idIwlwqI&amp;feature=recentlik" rel="nofollow" title="Desert Duel" class="" id="video-long-title-U15idIwlwqI" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">Desert Duel</a>

						<div class="video-logos">
		<a href="/watch?v=U15idIwlwqI&feature=recentlik&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
		<a href="/watch?v=U15idIwlwqI&feature=recentlik&cc=1"><img src="http://s.ytimg.com/yt/img/badge_cc_results-vfl146060.gif" class="video-logo " /></a>
	</div>

				</div>
			</div>

				<div id="video-description-U15idIwlwqI" dir="ltr" class="video-description">
					Like this video? Click here to tweet it out:
http://bit.ly/ClickToTweetDesertDuel...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-U15idIwlwqI" class="video-date-added">1 day ago</span>

					<span id="video-num-views-U15idIwlwqI" class="video-view-count">305 views
</span>



					<span class="video-username"><a id="video-from-username-U15idIwlwqI" class="hLink"  href="/user/MysteryGuitarMan">MysteryGuitarMan</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	



						<div id="feeditem--2107529589-videos" class="hid">
									



		<div  class="video-cell" style="width:99.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=k-rXiY1uIPs&amp;feature=recentlikmore" class="video-thumb ux-thumb-96" id="video-thumb-k-rXiY1uIPs-8891686" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="What's Up Wednesday! #3" alt="What's Up Wednesday! #3" src="http://i4.ytimg.com/vi/k-rXiY1uIPs/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');"></span>		
<span class="video-time">2:59</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-k-rXiY1uIPs-8891686', null, 'k-rXiY1uIPs', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-k-rXiY1uIPs" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=k-rXiY1uIPs&amp;feature=recentlikmore" rel="nofollow" title="What's Up Wednesday! #3" class="" id="video-short-title-k-rXiY1uIPs" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">What's Up Wednesday! #3</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=k-rXiY1uIPs&amp;feature=recentlikmore" rel="nofollow" title="What's Up Wednesday! #3" class="" id="video-long-title-k-rXiY1uIPs" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">What's Up Wednesday! #3</a>

						<div class="video-logos">
	</div>

				</div>
			</div>

				<div id="video-description-k-rXiY1uIPs" dir="ltr" class="video-description">
					CLICK ME FOR UR PANTS!

http://www.twitter.com/thewillofdc
http://www.facebook....
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-k-rXiY1uIPs" class="video-date-added">10 hours ago</span>

					<span id="video-num-views-k-rXiY1uIPs" class="video-view-count">305 views
</span>



					<span class="video-username"><a id="video-from-username-k-rXiY1uIPs" class="hLink"  href="/user/TheWillofDC">TheWillofDC</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	


					</div>

				</div>
			</div>

			<div class="subtivity-single-form-item">
						<span class="username_barelypolitical"></span>
					<div class="feedmodule-single-form-item" onmouseover="subui_.handleActivityItemMouseover(this);return false;">
						<div class="feedmodule-smtitle-wrapper">
								<a href="#" class="edit-subscription-recent-activity-link" onclick="subui_.toggleInlineSubscriptionEditBubble(this, 'barelypolitical', 'CvFiuDWNLmk', 'vfilZwaNMQYXcnZ8-3GXvjD7jut8MA%3D%3D');return false;" style="display:none">
edit subscription
							</a>

						<div class="feedmodule-smtitle">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="feed_icon_img icon-RAT master-sprite">
							




<a href="/user/barelypolitical">barelypolitical</a> liked a video
		
	

 &nbsp;

								<span class="feedmodule-ts">(1 hour ago)</span>
						</div>
					</div>

						



		<div  class="video-cell" style="width:99.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=x4EGMUxt6dM&amp;feature=recentlik" class="video-thumb ux-thumb-96" id="video-thumb-x4EGMUxt6dM-5240827" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="EMINEM Not Afraid Parody (Key Of Awesome Remake)" alt="EMINEM Not Afraid Parody (Key Of Awesome Remake)" src="http://i1.ytimg.com/vi/x4EGMUxt6dM/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');"></span>		
<span class="video-time">2:56</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-x4EGMUxt6dM-5240827', null, 'x4EGMUxt6dM', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-x4EGMUxt6dM" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=x4EGMUxt6dM&amp;feature=recentlik" rel="nofollow" title="EMINEM Not Afraid Parody (Key Of Awesome Remake)" class="" id="video-short-title-x4EGMUxt6dM" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">EMINEM Not Afraid Parody (Key Of...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=x4EGMUxt6dM&amp;feature=recentlik" rel="nofollow" title="EMINEM Not Afraid Parody (Key Of Awesome Remake)" class="" id="video-long-title-x4EGMUxt6dM" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/RAT/Logged_In');">EMINEM Not Afraid Parody (Key Of Awesome Remake)</a>

						<div class="video-logos">
		<a href="/watch?v=x4EGMUxt6dM&feature=recentlik&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-x4EGMUxt6dM" dir="ltr" class="video-description">
					We did a remake of the great Key Of Awesome Parody.
Music by: Mark Douglas/Key Of...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-x4EGMUxt6dM" class="video-date-added">1 week ago</span>

					<span id="video-num-views-x4EGMUxt6dM" class="video-view-count">502 views
</span>



					<span class="video-username"><a id="video-from-username-x4EGMUxt6dM" class="hLink"  href="/user/nimanslin">nimanslin</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	




				</div>
			</div>

			<div class="subtivity-single-form-item">
						<span class="username_TheStation"></span>
					<div class="feedmodule-single-form-item" onmouseover="subui_.handleActivityItemMouseover(this);return false;">
						<div class="feedmodule-smtitle-wrapper">
								<a href="#" class="edit-subscription-recent-activity-link" onclick="subui_.toggleInlineSubscriptionEditBubble(this, 'TheStation', 'hIFLU1Ku-j8', 'vfilZwaNMQYXcnZ8-3GXvjD7jut8MA%3D%3D');return false;" style="display:none">
edit subscription
							</a>

						<div class="feedmodule-smtitle">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="feed_icon_img icon-FAV master-sprite">
							




<a href="/user/TheStation">TheStation</a> favorited a video
		
	

 &nbsp;

								<span class="feedmodule-ts">(3 hours ago)</span>
						</div>
					</div>

						



		<div  class="video-cell" style="width:99.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
	
		

		

<a href="/watch?v=Kpr4ZtUSZwE&amp;feature=recentlik" class="video-thumb ux-thumb-96" id="video-thumb-Kpr4ZtUSZwE-5142306" ><span class="img"><img onload="" onclick="ieThumbEvent(event, this); " title="HORRIFIC OFFICE ACCIDENT!" alt="HORRIFIC OFFICE ACCIDENT!" src="http://i4.ytimg.com/vi/Kpr4ZtUSZwE/default.jpg" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/FAV/Logged_In');"></span>		
<span class="video-time">2:25</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-Kpr4ZtUSZwE-5142306', null, 'Kpr4ZtUSZwE', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-Kpr4ZtUSZwE" >

				<div class="smallText grayText">Previously viewed</div>


			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Kpr4ZtUSZwE&amp;feature=recentlik" rel="nofollow" title="HORRIFIC OFFICE ACCIDENT!" class="" id="video-short-title-Kpr4ZtUSZwE" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/FAV/Logged_In');">HORRIFIC OFFICE ACCIDENT!</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=Kpr4ZtUSZwE&amp;feature=recentlik" rel="nofollow" title="HORRIFIC OFFICE ACCIDENT!" class="" id="video-long-title-Kpr4ZtUSZwE" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/RecentActivity/FAV/Logged_In');">HORRIFIC OFFICE ACCIDENT!</a>

						<div class="video-logos">
		<a href="/watch?v=Kpr4ZtUSZwE&feature=recentlik&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-Kpr4ZtUSZwE" dir="ltr" class="video-description">
					Just another day at the office.

Check out more HiImRawn
http://www.youtube.com...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-Kpr4ZtUSZwE" class="video-date-added">4 hours ago</span>

					<span id="video-num-views-Kpr4ZtUSZwE" class="video-view-count">307 views
</span>



					<span class="video-username"><a id="video-from-username-Kpr4ZtUSZwE" class="hLink"  href="/user/TheStation2">TheStation2</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	




				</div>
			</div>
	</div>

	
		</div>
	</div>
	<div class="clear"></div>
	

	</div>

		

					<div id="feedmodule-POP" class="feedmodule-anchor">
				<div class="feedmodule-modheader" id="POP-titlebar">
				<div id="feed_popular">
		<div class="fm-title-underlined-gray">
			<div class="fm2-title">
				<span class="fm2-titleText" id="feed_popular-titleText"><a href="/videos?s=pop" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/View_Popular/Logged_In');">Videos Being Watched Now</a></span>
			</div>


					<div class="feedmodule-updown">

			<span id="medit-POP" class="iyt-edit-link " >Edit</span>

<span id="mup-POP" class="up-button"><img class="master-sprite img-php-up-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mdown-POP" class="down-button"><img class="master-sprite img-php-down-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mclose-POP"><img class="master-sprite img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span></div>


		</div>
	</div>

	</div>

	<div class="clear" id="feed_popular-content">

			<div id="POP-options" class="opt-pane" style="display: none;">
		<div class="opt-box-top">
			<img class="homepage-sprite img-php-opt-box-caret" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" />
		</div>
		<div class="opt-banner">
			<div class="opt-links">
				<div class="opt-edit">Editing: Videos Being Watched Now</div>
				<div class="opt-close opt-close-button" onclick="moduleHelper.closeOptionsPane('POP')"><img class="img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/></div>
				<div class="opt-close opt-close-text" onclick="moduleHelper.closeOptionsPane('POP')">close</div>
				<div id="POP-loading-msg" class="opt-loading-msg" style="display: none;">
Saving...
				</div>
				<div id="POP-loading-icn" class="opt-loading-icn" style="display: none;">
					<img width="16" id="POP-loading-icn-image" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" image="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="opt-main">
			<div class="opt-divider">
				<table class="opt-tbl">
				<tr>
						<td class="opt-name">
Display as:
						</td>
						<td class="opt-val opt-sel">
							<div id="POP-options-SIN" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-on" title="List View" alt="List View"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off"  onclick="moduleHelper.setLayoutPreference('POP', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('POP', 'AGG')">
							</div>
							<div id="POP-options-BTH" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('POP', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-on"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('POP', 'AGG')">
							</div>
							<div id="POP-options-AGG" class="opt-form-type-btns" >
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('POP', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off" onclick="moduleHelper.setLayoutPreference('POP', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-on" title="Grid View" alt="Grid View">
							</div>
						</td>

					<td class="opt-name">
Number of rows to display:
					</td>
	
					<td class="opt-val">
						<select id="POP-options-num" name="POP-options-num" onchange="moduleHelper.setLengthPreference('POP', 'POP-options-num', 'AGG')">
	
	

	
								<option value="1" selected>1</option>
								<option value="2" >2</option>
								<option value="3" >3</option>
						</select>
					</td>
				</tr>
				</table>
	

			</div>
		</div>
	</div>


		<div id="POP-data" class="feedmodule-data">



						<div class="feedmodule-body grid-view">
		<div class="clearL">
	
				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=9JQl-CjOTMg&amp;feature=popular" class="video-thumb ux-thumb-128" id="video-thumb-9JQl-CjOTMg-9667358" ><span class="img"><img onload="" thumb="http://i2.ytimg.com/vi/9JQl-CjOTMg/default.jpg" onclick="ieThumbEvent(event, this); " title="KJ Noons vs. Jorge Gurgel.Strikeforce: Houston" alt="KJ Noons vs. Jorge Gurgel.Strikeforce: Houston" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');"></span>		
<span class="video-time">9:54</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-9JQl-CjOTMg-9667358', null, '9JQl-CjOTMg', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-9JQl-CjOTMg" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=9JQl-CjOTMg&amp;feature=popular" rel="nofollow" title="KJ Noons vs. Jorge Gurgel.Strikeforce: Houston" class="" id="video-short-title-9JQl-CjOTMg" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">KJ Noons vs. Jorge Gurgel.Strike...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=9JQl-CjOTMg&amp;feature=popular" rel="nofollow" title="KJ Noons vs. Jorge Gurgel.Strikeforce: Houston" class="" id="video-long-title-9JQl-CjOTMg" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">KJ Noons vs. Jorge Gurgel.Strikefo<wbr>rce: Houston</a>

						<div class="video-logos">
	</div>

				</div>
			</div>

				<div id="video-description-9JQl-CjOTMg" dir="ltr" class="video-description">
					KJ Noons vs. Jorge Gurgel.Strikeforce: Houston
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-9JQl-CjOTMg" class="video-date-added">4 days ago</span>

					<span id="video-num-views-9JQl-CjOTMg" class="video-view-count">221,320 views
</span>



					<span class="video-username"><a id="video-from-username-9JQl-CjOTMg" class="hLink"  href="/user/KARELMMArts">KARELMMArts</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=TM1VhHSJgdo&amp;feature=popular" class="video-thumb ux-thumb-128" id="video-thumb-TM1VhHSJgdo-9987073" ><span class="img"><img onload="" thumb="http://i1.ytimg.com/vi/TM1VhHSJgdo/default.jpg" onclick="ieThumbEvent(event, this); " title="EXPENDABLES - Parody" alt="EXPENDABLES - Parody" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');"></span>		
<span class="video-time">4:14</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-TM1VhHSJgdo-9987073', null, 'TM1VhHSJgdo', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-TM1VhHSJgdo" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=TM1VhHSJgdo&amp;feature=popular" rel="nofollow" title="EXPENDABLES - Parody" class="" id="video-short-title-TM1VhHSJgdo" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">EXPENDABLES - Parody</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=TM1VhHSJgdo&amp;feature=popular" rel="nofollow" title="EXPENDABLES - Parody" class="" id="video-long-title-TM1VhHSJgdo" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">EXPENDABLES - Parody</a>

						<div class="video-logos">
		<a href="/watch?v=TM1VhHSJgdo&feature=popular&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-TM1VhHSJgdo" dir="ltr" class="video-description">
					Click to TWEET:
http://clicktotweet.com/c6z1w

Click Here for Behind The Scenes...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-TM1VhHSJgdo" class="video-date-added">6 days ago</span>

					<span id="video-num-views-TM1VhHSJgdo" class="video-view-count">484,315 views
</span>



					<span class="video-username"><a id="video-from-username-TM1VhHSJgdo" class="hLink"  href="/user/TheStation">TheStation</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=WVXyVzLjKag&amp;feature=popular" class="video-thumb ux-thumb-128" id="video-thumb-WVXyVzLjKag-9680512" ><span class="img"><img onload="" thumb="http://i4.ytimg.com/vi/WVXyVzLjKag/default.jpg" onclick="ieThumbEvent(event, this); " title="Text messaging world record? I beat that (less than 21.8 seconds)!" alt="Text messaging world record? I beat that (less than 21.8 seconds)!" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');"></span>		
<span class="video-time">0:31</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-WVXyVzLjKag-9680512', null, 'WVXyVzLjKag', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-WVXyVzLjKag" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=WVXyVzLjKag&amp;feature=popular" rel="nofollow" title="Text messaging world record? I beat that (less than 21.8 seconds)!" class="" id="video-short-title-WVXyVzLjKag" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">Text messaging world record? I b...</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=WVXyVzLjKag&amp;feature=popular" rel="nofollow" title="Text messaging world record? I beat that (less than 21.8 seconds)!" class="" id="video-long-title-WVXyVzLjKag" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">Text messaging world record? I beat that (less than 21.8 seconds)!</a>

						<div class="video-logos">
		<a href="/watch?v=WVXyVzLjKag&feature=popular&hd=1"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="master-sprite hd-video-logo video-logo" /></a>
	</div>

				</div>
			</div>

				<div id="video-description-WVXyVzLjKag" dir="ltr" class="video-description">
					FYI: I'm "besweeet" around the Internet.

My blog: http://bit.ly/aWjJ3y

(This...
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-WVXyVzLjKag" class="video-date-added">1 day ago</span>

					<span id="video-num-views-WVXyVzLjKag" class="video-view-count">98,302 views
</span>



					<span class="video-username"><a id="video-from-username-WVXyVzLjKag" class="hLink"  href="/user/gumballtech">gumballtech</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

				<div  class="video-cell" style="width:24.5%">



	


	<div class="video-entry">



				
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=D-JTf870Oo8&amp;feature=popular" class="video-thumb ux-thumb-128" id="video-thumb-D-JTf870Oo8-5785642" ><span class="img"><img onload="" thumb="http://i1.ytimg.com/vi/D-JTf870Oo8/default.jpg" onclick="ieThumbEvent(event, this); " title="Hax" alt="Hax" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" click="" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');"></span>		
<span class="video-time">1:55</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-D-JTf870Oo8-5785642', null, 'D-JTf870Oo8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>



		<div class="video-main-content video-title-one-line" id="video-main-content-D-JTf870Oo8" >



			<div dir="ltr" class="video-title ">
				<div class="video-short-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=D-JTf870Oo8&amp;feature=popular" rel="nofollow" title="Hax" class="" id="video-short-title-D-JTf870Oo8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">Hax</a>

				</div>
				<div class="video-long-title">
						
	
	

		
	
		
	
		

	
	
	<a href="/watch?v=D-JTf870Oo8&amp;feature=popular" rel="nofollow" title="Hax" class="" id="video-long-title-D-JTf870Oo8" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/POP/Logged_In');">Hax</a>

						<div class="video-logos">
	</div>

				</div>
			</div>

				<div id="video-description-D-JTf870Oo8" dir="ltr" class="video-description">
					worst luck ever :P

song is End Boss by Debaser, used with permission
				</div>
			

      

			<div class="video-facets">
						<span id="video-added-time-D-JTf870Oo8" class="video-date-added">1 day ago</span>

					<span id="video-num-views-D-JTf870Oo8" class="video-view-count">28,032 views
</span>



					<span class="video-username"><a id="video-from-username-D-JTf870Oo8" class="hLink"  href="/user/BlameTruth">BlameTruth</a></span>


				
			</div>	
			
		</div>	


		<div class="video-clear-list-left"></div>




	</div>	
</div>	

		</div>
	</div>


		</div>
	</div>
	<div class="clear"></div>
	

		</div>

		

					<div id="feedmodule-TOP" class="feedmodule-anchor">
				<div class="feedmodule-modheader" id="TOP-titlebar">
				<div id="feed_top_videos">
		<div class="fm-title-underlined-gray">
			<div class="fm2-title">
				<span class="fm2-titleText" id="feed_top_videos-titleText"><a href="/videos?s=pop" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/View_TopVideos/Logged_In');">Most Popular</a></span>
			</div>


					<div class="feedmodule-updown">


<span id="mup-TOP" class="up-button"><img class="master-sprite img-php-up-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mdown-TOP" class="down-button"><img class="master-sprite img-php-down-arrow" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span><span id="mclose-TOP"><img class="master-sprite img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" /></span></div>


		</div>
	</div>

	</div>

	<div class="clear" id="feed_top_videos-content">

			<div id="TOP-options" class="opt-pane" style="display: none;">
		<div class="opt-box-top">
			<img class="homepage-sprite img-php-opt-box-caret" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" />
		</div>
		<div class="opt-banner">
			<div class="opt-links">
				<div class="opt-edit">Editing: Most Popular</div>
				<div class="opt-close opt-close-button" onclick="moduleHelper.closeOptionsPane('TOP')"><img class="img-php-close-button" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/></div>
				<div class="opt-close opt-close-text" onclick="moduleHelper.closeOptionsPane('TOP')">close</div>
				<div id="TOP-loading-msg" class="opt-loading-msg" style="display: none;">
Saving...
				</div>
				<div id="TOP-loading-icn" class="opt-loading-icn" style="display: none;">
					<img width="16" id="TOP-loading-icn-image" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" image="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="opt-main">
			<div class="opt-divider">
				<table class="opt-tbl">
				<tr>
						<td class="opt-name">
Display as:
						</td>
						<td class="opt-val opt-sel">
							<div id="TOP-options-SIN" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-on" title="List View" alt="List View"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off"  onclick="moduleHelper.setLayoutPreference('TOP', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('TOP', 'AGG')">
							</div>
							<div id="TOP-options-BTH" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('TOP', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-on"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-off" title="Grid View" alt="Grid View" onclick="moduleHelper.setLayoutPreference('TOP', 'AGG')">
							</div>
							<div id="TOP-options-AGG" class="opt-form-type-btns" style="display: none;">
								<img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-listview-off" title="List View" alt="List View" onclick="moduleHelper.setLayoutPreference('TOP', 'SIN')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-bigthumbview-off" onclick="moduleHelper.setLayoutPreference('TOP', 'BTH')"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="homepage-sprite btn-gridview-on" title="Grid View" alt="Grid View">
							</div>
						</td>

					<td class="opt-name">
Number of rows to display:
					</td>
	
					<td class="opt-val">
						<select id="TOP-options-num" name="TOP-options-num" onchange="moduleHelper.setLengthPreference('TOP', 'TOP-options-num', 'CMP')">
	
	

	
								<option value="1" >1</option>
								<option value="2" >2</option>
								<option value="3" >3</option>
								<option value="4" >4</option>
								<option value="5" >5</option>
								<option value="6" >6</option>
								<option value="7" >7</option>
								<option value="8" >8</option>
								<option value="9" >9</option>
								<option value="10" selected>10</option>
								<option value="11" >11</option>
								<option value="12" >12</option>
						</select>
					</td>
				</tr>
				</table>
	

			</div>
		</div>
	</div>


		<div id="TOP-data" class="feedmodule-data">



						<div class="feedmodule-body compressed-view">
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?c=24" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/24');">Entertainment</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=-HePTmrV-og&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb--HePTmrV-og-8629971" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="We Love You Maria Venus Raj 22 Philippines" thumb="http://i2.ytimg.com/vi/-HePTmrV-og/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/24');"></span>		
<span class="video-time">4:13</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb--HePTmrV-og-8629971', null, '-HePTmrV-og', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=-HePTmrV-og&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/24');" title="&#x202a;We Love You Maria Venus Raj 22 Philippines&#x202c;&lrm;" dir="ltr">We Love You Maria Venus Raj 22 Philip...</a>
		</div>
		<div>
				677,329 views

		</div>
		<div>
			<nobr>
			<a href="/user/lexlib">lexlib</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?c=10" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/10');">Music</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=wlW5c4tInvY&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-wlW5c4tInvY-4001549" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Teenage Dream &amp; Just the way you are - Acapella Cover - Katy Perry - Bruno Mars - Mike Tompkins" thumb="http://i4.ytimg.com/vi/wlW5c4tInvY/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/10');"></span>		
<span class="video-time">2:41</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-wlW5c4tInvY-4001549', null, 'wlW5c4tInvY', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=wlW5c4tInvY&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/10');" title="&#x202a;Teenage Dream &amp; Just the way you are - Acapella Cover - Katy Perry - Bruno Mars - Mike Tompkins&#x202c;&lrm;" dir="ltr">Teenage Dream &amp; Just the way you ...</a>
		</div>
		<div>
				351,313 views

		</div>
		<div>
			<nobr>
			<a href="/user/pbpproductions">pbpproductions</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/news" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/25');">News &amp; Politics</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=bVVOYQQmliA&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-bVVOYQQmliA-7415915" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Hitler was BLACK!!?? #NaziFail" thumb="http://i3.ytimg.com/vi/bVVOYQQmliA/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/25');"></span>		
<span class="video-time">6:16</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-bVVOYQQmliA-7415915', null, 'bVVOYQQmliA', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=bVVOYQQmliA&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/25');" title="&#x202a;Hitler was BLACK!!?? #NaziFail&#x202c;&lrm;" dir="ltr">Hitler was BLACK!!?? #NaziFail</a>
		</div>
		<div>
				343,057 views

		</div>
		<div>
			<nobr>
			<a href="/user/sxephil">sxephil</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?c=1" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/1');">Film &amp; Animation</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=K9Zbkv5Ug0k&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-K9Zbkv5Ug0k-2089226" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="WIZARDS OF WAVERLY PLACE **SPOOF**" thumb="http://i4.ytimg.com/vi/K9Zbkv5Ug0k/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/1');"></span>		
<span class="video-time">6:57</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-K9Zbkv5Ug0k-2089226', null, 'K9Zbkv5Ug0k', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=K9Zbkv5Ug0k&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/1');" title="&#x202a;WIZARDS OF WAVERLY PLACE **SPOOF**&#x202c;&lrm;" dir="ltr">WIZARDS OF WAVERLY PLACE **SPOOF**</a>
		</div>
		<div>
				1,997,036 views

		</div>
		<div>
			<nobr>
			<a href="/user/ShaneDawsonTV">ShaneDawsonTV</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/sports" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/17');">Sports</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=BpSmprqptSk&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-BpSmprqptSk-2950574" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Announcer Larry Collmus calls the 7th at Monmouth Park" thumb="http://i3.ytimg.com/vi/BpSmprqptSk/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/17');"></span>		
<span class="video-time">2:19</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-BpSmprqptSk-2950574', null, 'BpSmprqptSk', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=BpSmprqptSk&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/17');" title="&#x202a;Announcer Larry Collmus calls the 7th at Monmouth Park&#x202c;&lrm;" dir="ltr">Announcer Larry Collmus calls the 7th...</a>
		</div>
		<div>
				125,166 views

		</div>
		<div>
			<nobr>
			<a href="/user/MonmouthPark">MonmouthPark</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?c=26" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/26');">Howto &amp; Style</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=jNafuB3HluY&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-jNafuB3HluY-2101971" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="What's in my School Bag?" thumb="http://i3.ytimg.com/vi/jNafuB3HluY/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/26');"></span>		
<span class="video-time">14:25</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-jNafuB3HluY-2101971', null, 'jNafuB3HluY', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=jNafuB3HluY&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/26');" title="&#x202a;What's in my School Bag?&#x202c;&lrm;" dir="ltr">What's in my School Bag?</a>
		</div>
		<div>
				252,514 views

		</div>
		<div>
			<nobr>
			<a href="/user/DulceCandy87">DulceCandy87</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/comedy" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/23');">Comedy</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=nDqaZcXf4b8&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-nDqaZcXf4b8-3809995" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="How to Get Women" thumb="http://i3.ytimg.com/vi/nDqaZcXf4b8/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/23');"></span>		
<span class="video-time">4:09</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-nDqaZcXf4b8-3809995', null, 'nDqaZcXf4b8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=nDqaZcXf4b8&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/23');" title="&#x202a;How to Get Women&#x202c;&lrm;" dir="ltr">How to Get Women</a>
		</div>
		<div>
				1,361,549 views

		</div>
		<div>
			<nobr>
			<a href="/user/RayWilliamJohnson">RayWilliamJohnson</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?c=19" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/19');">Travel &amp; Events</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=2EfvoLWZcM0&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-2EfvoLWZcM0-6920365" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Making BLING Sexy!" thumb="http://i3.ytimg.com/vi/2EfvoLWZcM0/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/19');"></span>		
<span class="video-time">2:59</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-2EfvoLWZcM0-6920365', null, '2EfvoLWZcM0', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=2EfvoLWZcM0&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/19');" title="&#x202a;Making BLING Sexy!&#x202c;&lrm;" dir="ltr">Making BLING Sexy!</a>
		</div>
		<div>
				135,780 views

		</div>
		<div>
			<nobr>
			<a href="/user/DeStorm">DeStorm</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?s=mp" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/0%26s%3Dmp');">Most Viewed</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=rRt1aNsNM0c&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-rRt1aNsNM0c-2045328" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Philippine SWAT storm bus with hostages in Manila" thumb="http://i3.ytimg.com/vi/rRt1aNsNM0c/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/0%26s%3Dmp');"></span>		
<span class="video-time">3:33</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-rRt1aNsNM0c-2045328', null, 'rRt1aNsNM0c', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=rRt1aNsNM0c&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/0%26s%3Dmp');" title="&#x202a;Philippine SWAT storm bus with hostages in Manila&#x202c;&lrm;" dir="ltr">Philippine SWAT storm bus with hostag...</a>
		</div>
		<div>
				1,575,879 views

		</div>
		<div>
			<nobr>
			<a href="/user/RussiaToday">RussiaToday</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
			<div class="feeditem-compressed">


				<div class="feeditem-compressed-category-title">
					<div>
						<a class="hLink" href="/videos?s=mf" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/CategoryTitle/Logged_In/0%26s%3Dmf');">Top Favorited</a>
					</div>
				</div>

				<div class="TOP-data compressed-form-content">
					<div class="clear">
						<div class="feedmodule-thumbnail">
								
	
	
	
		
	
	
		
	
	
	
	
		
		
	
			
	
		

		

<a href="/watch?v=6dNryy5elc8&amp;feature=topvideos" class="video-thumb ux-thumb-128" id="video-thumb-6dNryy5elc8-435669" ><span class="img"><img src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" title="Eminem Rihanna PARODY Love the way you lie: Key of Awesome #27" thumb="http://i3.ytimg.com/vi/6dNryy5elc8/default.jpg" onclick="ieThumbEvent(event, this); " onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/0%26s%3Dmf');"></span>		
<span class="video-time">3:39</span><span class="video-actions"><button type="button" class=" yt-uix-button yt-uix-button-short" onclick="yt.www.watch.quicklist.clickedAddIcon_w5('video-thumb-6dNryy5elc8-435669', null, '6dNryy5elc8', '', '');return false;" ><span class="yt-uix-button-content"><strong>+</strong></span></button></span><span class="video-in-quicklist">Added to <br/> queue</span></a>

						</div>
						
						
	<div class="feedmodule-singleform-info">

		<div class="video-title">
			<a href="/watch?v=6dNryy5elc8&feature=topvideos" onmousedown="yt.analytics.urchinTracker('/Events/Home/PersonalizedHome/TOP/Logged_In/0%26s%3Dmf');" title="&#x202a;Eminem Rihanna PARODY Love the way you lie: Key of Awesome #27&#x202c;&lrm;" dir="ltr">Eminem Rihanna PARODY Love the way yo...</a>
		</div>
		<div>
				287,957 views

		</div>
		<div>
			<nobr>
			<a href="/user/barelypolitical">barelypolitical</a>
			</nobr>
		</div>
	</div>

						<div class="spacer">&nbsp;</div>
					</div>
				</div>

				<div class="spacer">&nbsp;</div>
			</div>
		<div class="spacer">&nbsp;</div>
	</div>

	
		</div>
	</div>
	<div class="clear"></div>
	

		</div>

			</div>

	<div class="main-spacer-bottom"></div>
</div> <!-- end homepage-main-content -->

<div id="homepage-side-content">




			<div class="homepage-side-block hid" id="homepage-chrome-side-promo">
			<div id="side-announcement-box">
				
	
	
	
	<div  class="yt-alert yt-alert-info yt-rounded">
		
		<div id="chrome-promo-hp" class="yt-alert-content">
						




	<div id="chrome-promo-hp">
		<a href="http://www.google.com/chrome/index.html?brand=CHMZ&amp;utm_source=en-et-yt-ftr&amp;utm_medium=et&amp;utm_campaign=en&amp;hl=en-US" id="chrome-link-hp" style="padding: 0;">
			<button class="master-sprite chrome-icon"></button>
			<div class="textblock">
				<div class="tagline">Try YouTube in a new web browser</div>
				<div class="link">Download Google Chrome</div>
			</div>
			<div class="clear"></div>
		</a>
	</div>

		</div>
		
			<button type="button" onclick="_hidediv(this.parentNode);dismissChromePromoAlert();" class="close master-sprite">
				close
			</button>
	</div>

			</div>
		</div>


			<div id="fyf_container" class="fyf-container">
		<div class="fyf-container-main-title">Find your friends on YouTube!</div>
		<div class="fyf-container-services">
			<div class="fyf-container-services-title">Find your friends from additional networks</div>
			<div class="fyf-container-services-row">
				<div class="fyf-container-service-lazy-load" style="width: 50%">
					<input type="hidden" class="fyf-container-service-info" id="service_id_2" title="Gmail" />
					<span class="fyf-container-service-icon fyf-container-service-icon-gmail" title="Find friends from Gmail"></span>
					<a class="fyf-container-service-title" title="Find friends from Gmail" href="#" onClick="yt.www.fyf.lazyLoadStart(2);">Gmail</a>
				</div>
				<div class="fyf-container-service-lazy-load" style="width: 50%">
					<input type="hidden" class="fyf-container-service-info" id="service_id_3" title="Yahoo!" />
					<span class="fyf-container-service-icon fyf-container-service-icon-yahoo" title="Find friends from Yahoo!"></span>
					<a class="fyf-container-service-title" title="Find friends from Yahoo!" href="#" onClick="yt.www.fyf.lazyLoadStart(3);">Yahoo!</a>
				</div>
				<div class="fyf-container-service-lazy-load" style="width: 50%">
					<input type="hidden" class="fyf-container-service-info" id="service_id_4" title="Facebook" value="true"/>
					<span class="fyf-container-service-icon fyf-container-service-icon-facebook-selected" title="You have already found friends from Facebook"></span>
					<a class="fyf-container-service-title" title="You have already found friends from Facebook" href="#" onClick="yt.www.fyf.lazyLoadStart(4);">Facebook</a>
				</div>
				<div class="fyf-container-service-lazy-load" style="width: 50%">
					<input type="hidden" class="fyf-container-service-info" id="service_id_5" title="Hotmail" />
					<span class="fyf-container-service-icon fyf-container-service-icon-hotmail" title="Find friends from Hotmail"></span>
					<a class="fyf-container-service-title" title="Find friends from Hotmail" href="#" onClick="yt.www.fyf.lazyLoadStart(5);">Hotmail</a>
				</div>
				<div class="clear"></div>
			</div>
			<div>
				<a class="fyf-container-services-learn-more" href="#" onClick="_hidediv('fyf_discoverable_panel'); yt.style.toggle('fyf_services_explained'); return false;">Learn more</a>
				&nbsp;|&nbsp;
				<a class="fyf-container-discoverable" href="#" onClick="_hidediv('fyf_services_explained'); yt.style.toggle('fyf_discoverable_panel'); return false;">Can others find me?</a>
			</div>
			<div id="fyf_services_explained" class="fyf-container-services-explained hid">
				<div>YouTube can match the email addresses of your contacts on certain other sites with the email addresses of those YouTube users who have <a href=http://www.youtube.com/account#privacy/search>chosen to allow themselves to be found by their email address</a>. Note that we only show Facebook friends who have also connected their Facebook accounts to YouTube.</div>
				<div>We are currently making friend suggestions based on connections to <span>Facebook</span>. <a href="#" class="fyf-container-delete-info" onClick="yt.www.fyf.lazyLoadStart(0);">Delete imported data and stop receiving friend suggestions from these services</a></div>
			</div>
		</div>
		<div id='fyf_discoverable_panel' class="fyf-container-discoverable-panel hid"><strong>Yes.</strong> Your account is currently set to allow your friends to find your channel by your email address. If you'd like to change this setting, please visit <a href="/account#privacy/search">your privacy settings.</a></div>
	</div>




		<div class="homepage-side-block">
			
	<div id="stat-module-wrapper-statmodules_inbox">
			<div id="statmodules_inbox">
		<div class="statModule-title" id="statmodules_inbox-title">
			<span class="statModule-titleText" id="statmodules_inbox-titleText">Inbox</span>
		</div>
	</div>


		<div class="module-item-wrapper" id="statmodules_inbox-content">
					<div class="statModule-item-line">
		<div class="statModule-item-text">
<a href="/inbox?folder=messages&amp;action_message=1&amp;s=stats">0 Personal Messages</a>
		</div>
	</div>

		<div class="statModule-item-line">
		<div class="statModule-item-text">
<a href="/inbox?folder=videos&amp;action_message=1&amp;s=stats">0 Shared with you</a>
		</div>
	</div>

		<div class="statModule-item-line">
		<div class="statModule-item-text">
<a href="/inbox?folder=comments&amp;action_message=1&amp;s=stats">0 Comments</a>
		</div>
	</div>

		<div class="statModule-item-line">
		<div class="statModule-item-text">
<a href="/inbox?folder=invites&amp;action_message=1&amp;s=stats">0 Friend Invites</a>
		</div>
	</div>

		<div class="statModule-item-line">
		<div class="statModule-item-text">
<a href="/inbox?folder=responses&amp;action_message=1&amp;s=stats">0 Video Responses</a>
		</div>
	</div>


		</div>
	</div>

	<div class="clear"></div>

		</div>

			





	

	<div id="ad_creative_3" class="ad-div " style="z-index: 1">

	<iframe id="ad_creative_iframe_3" height="100" width="300" scrolling="no" frameborder="0" style="z-index: 1" id="promo1"></iframe>

	<script type="text/javascript">
		var add_timestamp = (Math.floor(Math.random() * 1000) == 0);
		if (add_timestamp) {
			var kts = new Date().getTime();
			var iframe_src = "http://ad-g.doubleclick.net/adi/tst.ythome/promo1;sz=300x100;k21=1;kgender=m;kga=1001;kar=3;klg=en;kage=22;kgg=1;kt=U;kcr=us;dc_dedup=1;kmyd=ad_creative_3;tile=3;kts=" + kts + ";ord=4974300902015401?";
		} else {
			var iframe_src = "http://ad-g.doubleclick.net/adi/tst.ythome/promo1;sz=300x100;k21=1;kgender=m;kga=1001;kar=3;klg=en;kage=22;kgg=1;kt=U;kcr=us;dc_dedup=1;kmyd=ad_creative_3;tile=3;ord=4974300902015401?";
		}
		ad_iframe = _gel("ad_creative_iframe_3");
		ad_iframe.src = iframe_src;
	</script>


	</div>


	<div class="clear"></div>

	<div class="homepage-side-block">
	<div id="homepage-whats-new">
			<h2>What's New</h2>
	
		<h3><a href="http://www.youtube.com/charts/videos_views">Off the Charts!</a></h3>
		<div class="entry">Official YouTube charts tell you who's on top</div>

		<h3><a href="http://youtube-global.blogspot.com/2010/07/upload-limit-increases-to-15-minutes.html">Long videos welcome!</a></h3>
		<div class="entry">Upload limit increases to 15 minutes</div>



			<h3>
				<a href="http://youtube-global.blogspot.com/">Enjoy YouTube in Croatian, Filipino, Serbian and Slovak</a>
			</h3>
			<div class="entry">
				Starting today, you can experience YouTube in four new languages: Croatian, Filipino, Serbian and Slovak. This brings the grand total of languages we support to 28, a nearly 50% increase since the ...
			</div>
			
			<p class="alignR">
				<a href="http://youtube-global.blogspot.com/">Read more in our Blog</a>
			</p>

	</div>
</div>



</div> <!-- end homepage-side-content -->

<div class="clear"></div>

	





		<div id="footer-container">
				<div id="footer">
		<ul class="footer-links">
			<li><a href="http://www.google.com/support/youtube/bin/static.py?p=homepage&amp;page=start.cs&amp;hl=en_US">Help</a>
</li>
			<li><a href="/t/about">About</a></li>
			<li><a href="http://www.google.com/support/youtube/bin/request.py?contact_type=abuse&amp;hl=en_US">Safety</a></li>
			<li><a href="/t/privacy_at_youtube">Privacy</a></li>
			<li><a href="/t/terms">Terms</a></li>
			<li><a href="/t/dmca_policy">Copyright</a></li>
				<li><a href="/t/uploaders_partners">Uploaders &amp; Partners</a></li>
				<li><a href="http://code.google.com/apis/youtube/overview.html">Developers</a></li>
			<li><a href="/t/advertising" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Advertising');">Advertising</a></li>
		</ul>
		
			<p class="footer-info">
				<span dir="ltr">	&copy; 2010 YouTube, LLC
</span>

			</p>
		
			<ul class="pickers">
			<li>Language:
	<a href="#" onclick="yt.www.masthead.loadPicker('language-picker', ''); return false;">English</a>
</li>
			<li>Location:
	<a href="#" onclick="yt.www.masthead.loadPicker('region-picker', ''); return false;">Worldwide</a>
</li>
			<li>Safety mode:
	<a href="#" onclick="yt.www.masthead.loadPicker('safetymode-picker', ''); return false;">

Off

	</a>
</li>
	</ul>
		<div id="picker-container"></div>
	<div id="picker-loading" style="display: none">Loading...</div>


	</div>

		</div>
		
	</div>
	<div> 

	</div>
					<script>
			yt.setConfig('TIMING_ACTION', 'iyt');
		</script>

	
	
	<script>
	
		

		
		yt.www.thumbnailDelayLoad.setFudgeFactor(0);
	
	if (document.documentElement["getBoundingClientRect"]) {
		yt.events.listen(window, 'scroll', yt.www.thumbnailDelayLoad.loadImages);
		yt.events.listen(window, 'resize', yt.www.thumbnailDelayLoad.loadImages);
	}
	yt.www.thumbnailDelayLoad.loadImages();

		yt.www.thumbnailDelayLoad.setLoadAllAtOnce(true);


		
			yt.events.listen(_gel('masthead-search-term'), 'focus', yt.www.home.ads.workaroundReset);
		
			yt.setTimeout(function() {
				window.yt.www.suggest.install(document.searchForm,
						document.searchForm.search_query,
						'en','close',
						'',
						'Web search',
						-1,
						null);
					}, 100);

		
	</script>
	
	<script id="legacy-user-datastore" style="behavior:url('#default#userdata')"></script>
	
	


	<!-- end postpage section -->
	<!--[if IE]></div><![endif]-->
</body>

</html>