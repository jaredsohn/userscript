// ==UserScript==
// @name			Pardus Imagepack Enforcer
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Enables imagepack functionality on a few forgotten pages.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/profile.php?id=*
// @include			http*://*.pardus.at/alliance_members.php
// @include			http*://*.pardus.at/alliance.php?id=*
// @include			http*://forum.pardus.at/*
// @include			http*://*.pardus.at/myalliance.php
// @include			http*://*.pardus.at/starbase.php
// @include			http*://www.pardus.at/index.php?section=manual*
// @include			http*://*.pardus.at/index_buildings.php*
// @include			http*://www.pardus.at/index.php?section=account_settings
// @include			http*://*.pardus.at/options.php
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==

// <!-- User variables -->

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Imagepack Enforcer";
var scriptversion = 1;
var imghost = "http://s1135.photobucket.com/albums/m626/TheRealFaziri/";
var datahost = "http://dl.dropbox.com/u/3357590/GM%20Scripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"%20") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

if (location.href.indexOf("/options.php") !== -1) {
	return;
}

if (location.href.indexOf("/index.php?section=account_settings") !== -1) {
	var type = document.getElementById('img_path_type').options[document.getElementById('img_path_type').selectedIndex].value;
	type = type.replace("server","http://").replace("local","file:///");
	var uri = document.getElementById('img_path').getAttribute('value');
	GM_setValue('location',type + uri);
} else {
	var loc = GM_getValue('location',"");
	if (loc !== "") {
		if (loc.match(/^online/) === null) {
			for (var i = 0;i < document.images.length;i++) {
				document.images[i].src = document.images[i].src.replace(/http:\/\/static.pardus.at\/(images|(img\/(stdhq|std)))/,loc);
			}
		}
	} else {
		alert("Please open your Account Settings page or the " + scriptname + " will not work!");
	}
}