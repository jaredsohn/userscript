// ==UserScript==
// @name           Pasteris Anti-Rick 2012
// @namespace      rickremoval.com
// @description    Blocks rickrolls using a blacklist and heuristic methods.
// @include        *
// @version        1.0
// ==/UserScript==

var blocklist;
var whitelist;
var RICKROLL_THRESHOLD = 20;
var url = window.location.href;
var body = document.getElementsByTagName('BODY')[0];

if (body != undefined) {

	var html = body.innerHTML;

	initArrays();

	if (getStrictness()) { // Strict check
		if (looseCheck()) {
			disablePage();
			if (showLoosePopup()) {
				enablePage();
			}
		} else {
			var matches = strictCheck();
			if (matches >= RICKROLL_THRESHOLD) {
				disablePage();
				if (showStrictPopup(matches)) {
					enablePage();
				}
			}
		}
	} else { // Loose check
		if (!inWhiteList() && looseCheck()) {
			disablePage();
			if (showLoosePopup()) {
				enablePage();
			}
		}
	}

}



function getStrictness() {
	// For now, only youtube is treated strictly
	return (url.search("youtube.com/watch") != -1);
}



function strictCheck() {
	var count = 0;
	var arr;
	arr = html.match(/(ric?k|barac?k) ?roll/gi);
	if (arr != null) {
		count += arr.length;
	}
	arr = html.match(/never gonna (give you up|let you down)/gi);
	if (arr != null) {
		count += arr.length;
	}
	return count;
}



function looseCheck() {
	return testAgainstArray(url, blocklist);
}

function inWhiteList() {
	return testAgainstArray(url, whitelist);
}

function testAgainstArray (text, array) {
	for (var i in array) {
		if (text.search(array[i]) != -1) {
			return true;	
			break;
		}
	}
	return false;
}



function showStrictPopup(matches) {
	return confirm ("WARNING! Pasteris Anti-Rick 2012 has detected that the site: " + url + ":\n\n1. Mentions suspicious phrases " + matches + " times. These phrases are known to redirect to Rick-Rolls. \n\n2. The words 'Rick' or 'Roll' may have been detected as a result of them being in a video title or description. These may not be related to an actual Rick-Roll.\n\nClick OK to continue to the Rick-Roll. Click Cancel to block the Rick-Roll.");
}

function showLoosePopup() {
	return confirm ("WARNING! Pasteris Anti-Rick 2012 has detected that the website: " + url + ":\n\n1. Contains a Rick-Roll.\n\n2. May contain a different 'Roll' like a 'BarackRoll' or a 'SaxRoll'.\n\nClick OK to continue to the Rick-Roll. Click Cancel to block the Rick-Roll.");
}



function disablePage() {
	body.innerHTML = "";
}

function enablePage() {
	body.innerHTML = html;
}



function initArrays() {
	blocklist = [
	"_0719DxMOUY",
	"_FyXC-SsAPE",
	"1V_aE_Xdde8",
	"3HrSN7176XI",
	"3KANI2dpXLw",
	"4R-7ZO4I1pI",
	"4TJB9FQo45E",
	"4ynGOr9vmyc",
	"5F5nc1bAaKw",
	"5kQKh2tdisQ",
	"5uZr3JWYdy8",
	"65I0HNvTDH4",
	"67KOFEEOhkI",
	"6SYVdI7Llrg",
	"8aJjMOy-Ops",
	"8Set3JpJJ4w",
	"A1sgzEDUG-o",
	"ABUhOJxZQmg",
	"AP12uZvfvag",
	"AS35zlAdaSQ",
	"aSzhxllE0RM",
	"atiNprQmjks",
	"b1WWpKEPdT4",
	"b43GgNbz9fg",
	"cjeogv9VUAE",
	"cxwxBheZniM",
	"CZoJt0Sbqrs",
	"DpPhnECPe2I",
	"D7TJwgucr6I",
	"dS9DO6kx-Ek",
	"EEbzptEFsKk",
	"eKDcl0V6o6k",
	"eLiXPfl8EPY",
	"f2b1D5w82yU",
	"f8FHqEIzSlE",
	"FGEUClII8x0",
	"fmxGLQd3J0U",
	"fMzkMpMraFY",
	"G_vas-7a7is",
	"gdpijMRhoT8",
	"gLVtavM962w",
	"gvUiLtwlEl8",
	"HiaBjpzLgQI",
	"hq05IRf0dBQ",
	"HRRGn6tNd4",
	"hyX_krrTBZ0",
	"I6_0tpqg3ZE",
	"i65games.tk",
	"IHKAgwIxUAY",
	"iJbwc4wm5Y0",
	"IpjGmx2v6bM",
	"IVvl_R2jYMo",
	"J3VnZMoh7sk",
	"Kmt4wrn1MTk",
	"lAQIiNTH46I",
	"LeSnAn-Sc0g",
	"lfao5IToml4",
	"lfO4Z5WEUuE",
	"lp6nr-rD_g8",
	"LqXTU8YAGzo",
	"lzSjyzqfegI",
	"MJCH_wT9TaU",
	"MoUPdJrjkCM",
	"NZ-AAD7Ci_c",
	"oHg5SJYRHA0",
	"piLTpv1eKdU",
	"PIMrL4qXtJ0",
	"PXrHCBoEj7g",
	"q6NwqFlctZY",
	"QumbExFAj-U",
	"R5P1_U7LZX8",
	"r8tXjJL3xcM",
	"rfp7FbsnsbU",
	"RgIDuaxiT0w",
	"RSsJ19sy3JI",
	"RzoZGNsJ71w",
	"SGi7qi_y0Jw",
	"tazYxtJcwCc",
	"thNTPin2RBY",
	"ub_VBGajh-s",
	"UDTGvgE5eJw",
	"-umtVthRGJI",
	"uwnuL5Fy5g8",
	"uxIsiTo4VJo",
	"uYMIMPVK1vU",
	"v7cyQ-dVaAM",
	"VBY4TV5qK-4",
	"veFrQTKQy7A",
	"vf79MCuQ8jM",
	"vp8fkB0uwd0",
	"VVjUWKSZSsc",
	"vvs7cXmVwN8",
	"WpEVccrkYQ0",
	"xAp3HqpE7V8",
	"XfTUDW93z6E",
	"X-j828DqqnY",
	"xm_EMOdpDhc",
	"xpupxRzumYs",
	"Xsvi9uNrDSI",
	"y5Ja-E529sU",
	"Yu_moia-oVI",
	"YWn54TjfBkk",
	"ywoqy9PBN-0",
	"yXGqsnkLg0A",
	"yxnWl63Avo4",
	"z2kThcO6ig8",
	"Jwj0gLriTnk",
	"PPJcB60Yq",
	"Jt1GY_vStx4",
	"Zc2tpMgz6MI",
	"zGm0nGF_y2E",
	"z-HWXfRKkJU",
	"ZIQZHqNQODo",
	"ZOU8GIRUd_g",
        "N1Uaml0iEmw",
        "dQw4w9WgXcQ",
	"1227.com",
	"adurah.com/img/hp7_spoilers.jpg",
	"asongbyagayguy.ytmnd.com",
	"bd.vg",
	"break.com/index/westboro-church-gets-rick-rolld.html",
	"bringvictory.com",
	"chodecircus.com/area51",
	"choose.yudia.net",
	"collegehumor.com/video:1809841",
	"comicwonder.com/joke/8a46a9b4a",
	"dafk.net/what/",
	"dailymotion.com/video/x5ykzv",
	"ebaumsworld.com/video/watch/411687",
	"ecritters.biz/sr",
	"encyclopediadramatica.com/Rickroll",
	"epicwinrar.com",
	"fr.video.yahoo.com/watch/651156/3025838",
	"gametrailers.com/user-movie/kid-rick-rolls-his-entire/208061",
	"internetisseriousbusiness.com",
	"johncow.com/moo.html",
	"keiraknightley.ytmnd.com",
	"lfgcomic.com/page/144",
	"members.tele2.nl/class-pc",
	"mxweas.com/docs/jailbreakservhack",
	"niya.cc/flash/rick",
	"pottermisleading.ytmnd.com",
	"pspemporium.webs.com/rickdance.html",
	"ravenstorm.byethost15.com",
	"reichroll.com",
	"reichrolled.com",
	"rick-rolld.com",
	"rick-roll.ytmnd.com",
	"rickroll.com",
	"rickroll.net",
	"rickrolled.fr",
	"rickrolling.com",
	"rr.rezbit.com",
	"smouch.net/lol",
	"sprigler.com/steven",
	"stucknut.com/locker/files/jessica.gif",
	"stupidvideos.com/video/video_games/RickRoll_Doom",
	"technocolbert.co.nr",
	"techsmartly.net",
	"tobi-x.com/kate_moss_nude",
	"video.google.com/videoplay?docid=1085396428282145269",
	"video.yahoo.com/watch/2013707/v2138974",
	"video.yahoo.com/watch/804885/3375801",
	"warlocksnerfed.ytmnd.com",
	"wiki.ytmnd.com/File:Rickrolled.gif",
	"wiki.ytmnd.com/Rickroll",
	"yougotrickrolled.com",
	"zideo=6c4971596d513d3d",
	"rickroll.htm",
	"rickroll.php",
        "saxroll.com"
	];
	
	whitelist = [
	"doubleclick.net",
	"facebook.com/extern",
	"facebook.com/plugins",
	"googlesyndication.com",
	"reddit.com/static/button",
	"stumbleupon.com/badge/embed"
	];
}