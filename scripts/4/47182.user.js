// ==UserScript==
// @name          SchuelerVZ - Heaven
// @namespace     http://userstyles.org
// @description	  Simpler Style in Weiss und Hellgrau
// @author        Saiya [edited by Planet]
// @homepage      http://userstyles.org/styles/5172
// @include       http://schuelervz.net/*
// @include       https://schuelervz.net/*
// @include       http://*.schuelervz.net/*
// @include       https://*.schuelervz.net/*
// @include       http://studivz.net/*
// @include       https://studivz.net/*
// @include       http://*.studivz.net/*
// @include       https://*.studivz.net/*
// ==/UserScript==
(function() {
var css = "/* Heaven - Version 2 - 12.02.2008 - (C) Saiya.de */ body, html { background-color:#D9DCF5!important; background-attachment:fixed!important; background-image:url('http://img3.imagebanana.com/img/51yeazcu/heaven.gif')!important; background-position:0px -214px!important; background-repeat:repeat-x!important; } #content { background-color:#FFFFFF!important; } * { color:#000000!important; background-color:transparent!important; border-color:#CDCDCD!important; } #PhotoAlbums_SingleView { background:none!important; } * a { color:#202B82!important; } * a:hover, li:hover, input:hover{ color:#000000!important; background-color:#EEE!important; text-decoration:none!important; } *:focus { background-color:#B3B9EC!important; } .fn-note-text, .fn-note-edit-text { background:white!important; } #topHeader { background:none!important; border-bottom:1px solid #CDCDCD!important; } #Logo { display:none; } #Grid-Page-Center-Top { display:none; } #QuickFormSearch input { background-image:none!important; } #masterLeft { margin-top:55px!important; position:fixed; } .yahoo_leftnav, #yahoo_hotspot_groups, #yahoo_hotspot_websearch, .yahoo_sponsored_links { display:none!important; /*nicht benÃ¶tight zZt*/ } #topAds, #ad770x90, #topAd, #ad160x600 { display:none!important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
