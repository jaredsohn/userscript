// ==UserScript==
// @name          Last.fm - Darker theme
// @namespace     http://userstyles.org
// @description	  This is my first style, and pretty much just for my own personal taste. Feel free to post comments/suggestions though if you like it too.
// @author        projectfallback
// @homepage      http://userstyles.org/styles/37385
// @include       http://last.fm/*
// @include       https://last.fm/*
// @include       http://*.last.fm/*
// @include       https://*.last.fm/*
// @include       http://lastfm.es/*
// @include       https://lastfm.es/*
// @include       http://*.lastfm.es/*
// @include       https://*.lastfm.es/*
// @include       http://lastfm.de/*
// @include       https://lastfm.de/*
// @include       http://*.lastfm.de/*
// @include       https://*.lastfm.de/*
// @include       http://lastfm.fr/*
// @include       https://lastfm.fr/*
// @include       http://*.lastfm.fr/*
// @include       https://*.lastfm.fr/*
// @include       http://lastfm.jp/*
// @include       https://lastfm.jp/*
// @include       http://*.lastfm.jp/*
// @include       https://*.lastfm.jp/*
// @include       http://lastfm.it/*
// @include       https://lastfm.it/*
// @include       http://*.lastfm.it/*
// @include       https://*.lastfm.it/*
// @include       http://lastfm.pl/*
// @include       https://lastfm.pl/*
// @include       http://*.lastfm.pl/*
// @include       https://*.lastfm.pl/*
// @include       http://lastfm.com.br/*
// @include       https://lastfm.com.br/*
// @include       http://*.lastfm.com.br/*
// @include       https://*.lastfm.com.br/*
// @include       http://lastfm.se/*
// @include       https://lastfm.se/*
// @include       http://*.lastfm.se/*
// @include       https://*.lastfm.se/*
// @include       http://lastfm.tr/*
// @include       https://lastfm.tr/*
// @include       http://*.lastfm.tr/*
// @include       https://*.lastfm.tr/*
// @include       http://lastfm.ru/*
// @include       https://lastfm.ru/*
// @include       http://*.lastfm.ru/*
// @include       https://*.lastfm.ru/*
// @include       http://cn.last.fm/*
// @include       https://cn.last.fm/*
// @include       http://*.cn.last.fm/*
// @include       https://*.cn.last.fm/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n  background: #111 !important;\n}\n\n#content {\n  border: 0px solid #111 !important;\n  background: #222 !important;\n  color: #BBB !important;\n}\n\n.home-group-header {\n  background: #222 !important;\n}\n\n.home-group-content {\n  background: #222 !important;\n}\n\na, .lfmMailButton span, .lfmShoutboxButton span {\n  color: #21b0f3 !important;\n}\n\ntable.tracklist tr.odd td, .filterTags, #content .clearit {\n  background-color: #222 !important;\n}\n\n\ntable.chart td.subjectCell a, .location, .subjectCell, .breadcrumb, .breadcrumb span {\n  color: #AAA !important;\n}\n\n\n.buttons a, .tag {\n  color: #000 !important;\n}\n\ntable.chart tr.odd td, .messageWrapper {\n    background-color: #333 !important;\n}\n\ntable.tracklist td.highlight, .matchmeter {\n    border-top: 1px solid #000 !important;\n    background: #111 !important;\n}\n\n.bbcode span, .results {\n    border: 1px solid #000 !important;\n    background: #111 !important;\n}\n\n.globaltag {\n    border: 0px solid #000 !important;\n    border-top: 1px solid #333 !important;\n    background: #111 !important;\n}\n\n.track, .duration, .artist {\n    border: 0px solid #000 !important;\n    border-top: 1px solid #333 !important;\n    border-right: 1px solid #333 !important;\n    background: #111 !important;\n}\n\n.artist {\n    border: 0px solid #000 !important;\n    border-top: 1px solid #333 !important;\n    background: #111 !important;\n}\n\n#footer_content, #footerStuff, .stationbutton,  .settings_icon, .playbutton, .previewbutton, .LastAd, .home-module {\n  display: none !important;\n}\n\n#page h2.heading {\n  border-top: 0px solid #111 !important;\n}\n\n.date, .ontour {\n  color: #666 !important;\n}\n\n.befriended, .profileupdated, .loved, .author, ul.tagList li, .horizontalOptions, ul.artistsWithInfo li, .list-artist-small-vertical li, ul.journalsSmall li, ul.eventsSmall li, ul.groupsSmall li, ul.groupsMedium strong, .newsEntriesSmall li, .latestNewsEntry, .freeTracks li, .topTracks li, ul.usersMedium div.userContainer strong, ul.venuesSmall li, table.eventsSmall td, #eventsMap p.date, table.tracklist th, table.tracklist td, div.leaderboardCentre, div#browsablechart fieldset#typeSelector.withDateSelector, #page ul.lfmDropDownBody li, #footerLinks dt, #justCantGetEnough, .module-footer, .day th, .gig td, #libraryNavigation, .journalsSmall li, .created  {\n  border-bottom: 1px solid #444 !important;\n}\n\n.module-header, .last, .journalsSmall li, .vevent, .groupsSmall li {\n  border-top: 0px solid #000 !important;\n}\n\n.module-footer, .leftColWrapper ul {\n  border-bottom: 0px solid #000 !important;\n}\n\n.first {\n  border-bottom: 0px solid #000 !important;\n}\n\n\n.badgeHead h1, .summary, .h2Wrapper, .catalogueHead h1, h1, h2, h3, strong  {\n  color: #21b0f3 !important;\n}\n\n#secondaryNavigation li a {\n  background: #222 !important;\n  border: 1px solid #111 !important;\n}\n\n#secondaryNavigation ul {\n  border-top: 1px solid #111 !important;\n}\n\n\n.minifeedSmall li.joined, .minifeedSmall li.left {\n  border-bottom: 1px solid #111 !important;\n}\n\n\n.photo {\n  border: 1px solid #21b0f3 !important;\n}\n\n.userImage, .messageBox, .pagination a {\n  border: 0px solid #21b0f3 !important;\n}\n\ndiv.chartbar span, .ontour {\n  color: #000 !important;\n}\n\n.profileOptions {\n  border-top: 1px solid #000 !important;\n}\n\n#pages .page {\n  background: #222 !important;\n}\n\n#tasteCocktail .wrapper {\n    border: 1px solid #111 !important;\n    background: #333 !important;\n    padding: 5px 5px 6px 5px !important;\n}\n\n.horizontalOptions ul li.current, .filterTags a.selected span, #libraryNavigation li.current {\n    background: #111 none !important;\n}\n\n.horizontalOptions ul li.current a, .filterTags a, .filterTags span, #libraryNavigation li, #libraryNavigation li a, .nextlink {\n    background: none !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
