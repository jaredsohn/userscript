// ==UserScript==
// @name           draugiem.lv saites uz viesugraamatu visaa plashajaa webaa
// @namespace      draugiemLvLinki
// @description    ja kaadaa lapaa (iznjemot visus draugiem.lv domeenus) ir saite uz draugiem.lv profilu, skrpits automaatiksi saitei beigaas pieliek veel vienu saiti - uz attieciiga lietotaaja viesu graamatu. spiezhot uz shiis saites, atveras konkreetais profils oranzhajaa portaalaa un atveereejs neraadaas atveertaa profila iipashnieka statistikaa. izlasi veel seshas reizes, ja neko nesaprati no manas superlogjikas!
// @include        *
// @exclude        *draugiem.lv*
// @exclude        *frype.com*
// @exclude        *frype.lt*
// @exclude        *munidraugi.lv*
// @exclude        *freundeweb.net*
// @exclude        *baratikor.com*
// ==/UserScript==

// Add jQuery
if(typeof unsafeWindow.jQuery == 'undefined') {
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { jQry = unsafeWindow.jQuery.noConflict(); letsJQuery(); }
}
GM_wait();

// This is what we call a code... sometimes
function letsJQuery() {
	jQry("a").each(function(i) {
		if (this.href.indexOf("draugiem.lv/friend/?") > -1 || this.href.indexOf("frype.com/friend/?") > -1 || this.href.indexOf("frype.lt/friend/?") > -1 || this.href.indexOf("munidraugi.lv/friend/?") > -1 || this.href.indexOf("freundeweb.net/friend/?") > -1 || this.href.indexOf("baratikor.com/friend/?") > -1) {
			if (this.innerHTML.indexOf("<") == -1 && this.innerHTML.indexOf(">") == -1 && this.innerHTML.length > 0) {
				var domain = "draugiem.lv";
				if (this.href.indexOf("frype.com") > -1) domain = "frype.com";
				if (this.href.indexOf("frype.lt") > -1) domain = "frype.lt";
				if (this.href.indexOf("munidraugi.lv") > -1) domain = "munidraugi.lv";
				if (this.href.indexOf("freundeweb.net") > -1) domain = "freundeweb.net";
				if (this.href.indexOf("baratikor.com") > -1) domain = "baratikor.com";
				var appendAfter = "";
				var parts = this.href.split("?");
				if (parts[1].indexOf("&") > -1) {
					parts2 = parts[1].split("&");
					parts[1] = parts2[0];
				}
				if (parts[1].indexOf("fid=") > -1) parts[1] = parts[1].replace(/fid=/gi, "");
				parts[1] = parseInt(parts[1]);
				if (parts[1] > 0) {
					var title = 'http://www.' + domain + '/friend/?selectedTab=9&opinionTab=0&fid=' + parts[1];
					if (typeof(this.title) != "undefined" && this.title != "") title = this.title;
					appendAfter = '&nbsp;<a href="http://www.' + domain + '/friend/?selectedTab=9&opinionTab=4&fid=' + parts[1] + '" title="' + title + '" target="_blank"><img src="http://img197.imageshack.us/img197/4480/drsupersmall.png" style="border: none; padding: 0 2px;" alt="profils" /></a>';
				}
				if (appendAfter != "") jQry(this).after(appendAfter);
			}
		}
	});
}