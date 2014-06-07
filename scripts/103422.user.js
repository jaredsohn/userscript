// ==UserScript==
// @name           mb: ngs/test/classic musicbrainz switcher
// @description    Adds a switch between ngs/test/classic environments on current entity page (see yellow button at top right)
// @version        2011-08-25_1744
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @namespace      http://userscripts.org/scripts/show/103422

// @include        http://musicbrainz.org/artist/*
// @include        http://test.musicbrainz.org/artist/*
// @include        http://classic.musicbrainz.org/artist/*
// @include        http://classic.musicbrainz.org/show/artist/*

// @include        http://musicbrainz.org/release-group/*
// @include        http://test.musicbrainz.org/release-group/*
// @include        http://classic.musicbrainz.org/release-group/*
// @include        http://classic.musicbrainz.org/show/release-group/*

// @include        http://musicbrainz.org/release/*
// @include        http://test.musicbrainz.org/release/*
// @include        http://classic.musicbrainz.org/release/*
// @include        http://classic.musicbrainz.org/show/release/*
// @include        http://classic.musicbrainz.org/album/*
// @include        http://classic.musicbrainz.org/show/album/*

// @include        http://musicbrainz.org/recording/*
// @include        http://test.musicbrainz.org/recording/*
// @include        http://classic.musicbrainz.org/track/*
// @include        http://classic.musicbrainz.org/show/track/*

// @include        http://musicbrainz.org/label/*
// @include        http://test.musicbrainz.org/label/*
// @include        http://classic.musicbrainz.org/label/*
// @include        http://classic.musicbrainz.org/show/label/*

// @include        http://musicbrainz.org/user/*
// @include        http://test.musicbrainz.org/user/*
// @exclude        http://musicbrainz.org/user/*/*
// @include        http://classic.musicbrainz.org/show/user/*

// @include        http://musicbrainz.org/edit/*
// @include        http://test.musicbrainz.org/edit/*
// @include        http://classic.musicbrainz.org/show/edit/*

// @include        http://musicbrainz.org/work/*
// @include        http://test.musicbrainz.org/work/*

// @include        http://musicbrainz.org/
// @include        http://test.musicbrainz.org/
// @include        http://classic.musicbrainz.org/

// @include        http://musicbrainz.org/doc/*
// @include        http://test.musicbrainz.org/doc/*
// @include        http://classic.musicbrainz.org/doc/*

// @include        http://musicbrainz.org/search/edits*
// @include        http://test.musicbrainz.org/search/edits*

// @include        http://www.musicbrainz.org*

// ==/UserScript==

(function () {

/* settings */
/*opacity when no mouse over: "0" invisible; "1" always visible; or ".01"~".99" choose transparency*/
var opacity = "1";
/* end of settings */

var texts = {"ngs":"ngs", "test":"test", "classic":"classic", "separator":"/"};
var ntarget, ttarget, ctarget;
var classic = self.location.href.match(/\/classic\.mu/i);
var test = self.location.href.match(/\/test\.mu/i);
var ngsuser = "http://musicbrainz.org/user/%s";
var classicuser = "http://classic.musicbrainz.org/show/user/?username=%s";
var classicedit = "http://classic.musicbrainz.org/show/edit/?editid=%s";

if (classic) {
	if (self.location.href.match(/\/show\/user\//i)) {
		ntarget = ngsuser.replace(/%s/, document.title.match(/"(.+)"/)[1]);
	}
	else {/*!user*/
		ntarget = self.location.href.replace(/^http:\/\/classic\.(.+)$/i, "http://$1");
	}
} else {/*!classic*/
	var basengs = self.location.href;
	if (test) {
		ntarget = self.location.href.replace(/^http:\/\/test\.(.+)$/i, "http://$1");
		basengs = ntarget;
	}
	if (basengs.match(/\/user\//i)) {
		ctarget = classicuser.replace(/%s/, basengs.split("/").pop());
	}
	else if (basengs.match(/\/edit\//i)) {
		ctarget = classicedit.replace(/%s/, basengs.split("/").pop());
	}
	else if (basengs.match(/\/(work\/|artist\/.+\/works|artist\/.+\/recordings|search\/edits)/i)) {
		/*no classic equivalent*/
		ctarget = null;
	}
	else {
		/*std.entity*/
		ctarget = basengs.replace(/recording/, "track").replace(/^http:\/\/(musicbrainz.org\/[^/]+\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*$/i, "http://classic.$1.html").replace(/^http:\/\/(musicbrainz.org\/.*$)/i, "http://classic.$1");
	}
}
if (!test) {
	ttarget = (classic? ntarget:self.location.href).replace(/^http:\/\/(.+)$/i, "http://test.$1");
}

var div = document.createElement("div");
div.style.position = "fixed";
div.style.top = 0;
div.style.right = 0;
div.style.padding = "0 4px";
div.style.background = "#ff0";
div.style.borderBottom = "2px solid #660";
div.style.borderLeft = "2px dashed #ffc";
div.style.opacity = opacity;
div.addEventListener("mouseover", function(e){ this.style.opacity = "1" }, false);
div.addEventListener("mouseout", function(e){ this.style.opacity = opacity }, false);
div.appendChild(allezhop("ngs", ntarget));
div.appendChild(document.createTextNode(texts["separator"]));
div.appendChild(allezhop("test", ttarget));
div.appendChild(document.createTextNode(texts["separator"]));
div.appendChild(allezhop("classic", ctarget));
document.getElementsByTagName("body")[0].appendChild(div);

function allezhop(env, target) {
	var a;
	if (target != null) {
		a = document.createElement("a");
		a.setAttribute("href", target);
		a.setAttribute("title", "Switch to "+texts[env]+" (same entity)");
	}
	else {/*null*/
		a = document.createElement("span");
		if ((!classic &&!test) && env == "ngs" || test && env == "test" || classic && env == "classic") {
			/*current*/
			a.style.background = "#6f9";
		}
		else {/*unsupported*/
			a.style.color = "#cc0";
		}
	}
	a.appendChild(document.createTextNode(texts[env]));
	return a;
}

})();