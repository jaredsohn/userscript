// ==UserScript==
// @name           SSW No Shift+Alt
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Lets you use hotkeys on Secret Society Wars without pressing Shift+Alt
// @include        http://www.secretsocietywars.com/index.php?p=monsters*
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=daily_maze*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest*
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=view_planet
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=land
// ==/UserScript==

var keyremap;
var remaps = new Array();

document.addEventListener("keydown", kp, false);

keyremap = GM_getValue("keyremap");
if(keyremap == undefined) {
	GM_setValue("keyremap", "");
} else {
	var keypairs;
	var re;
	
	keypairs = keyremap.split(",");
	for(var i = 0; i < keypairs.length; i++) {
		if(re = /^\s*(\w)\s*=\s*(\w)\s*$/.exec(keypairs[i])) {
			remaps[String.toUpperCase(re[1])] = String.toUpperCase(re[2]);
			remaps[String.toUpperCase(re[2])] = String.toUpperCase(re[1]);
		}
	}
}

function kp(ev) {
	var c = String.fromCharCode(ev.which);
	var btns;
	var clicked = 0;
	var accesskeys = new Array();
	var a_tags;

	if(document.evaluate('//div[@class="disable_altshift"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
		return;
	}

	btns = document.evaluate('//input[@accesskey]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < btns.snapshotLength; i++) {
		var b = btns.snapshotItem(i);
		if(b.accessKey) {
			accesskeys[String.toUpperCase(b.accessKey)] = b;
			if(String.toUpperCase(b.accessKey) == c) {
				b.click();
				clicked = 1; /* no longer necessary since we're returning */
				return;
			}
		}
	}
	if(!clicked) {
		if(remaps[c] && accesskeys[remaps[c]]) {
			accesskeys[remaps[c]].click();
			clicked = 1; /* also not necessary anymore */
			return;
		}
	}
	a_tags = document.evaluate('//a[@accesskey]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < a_tags.snapshotLength; i++) {
		a = a_tags.snapshotItem(i);
		if(a.accessKey) {
			accesskeys[String.toUpperCase(a.accessKey)] = a;
			if(String.toUpperCase(a.accessKey) == c) {
				window.location.href = a.href;
				clicked = 1;
				return;
			}
		}
	}
	if(!clicked) {
		if(remaps[c] && accesskeys[remaps[c]]) {
			window.location.href = accesskeys[remaps[c]].href;
			clicked = 1;
			return;
		}
	}
}
