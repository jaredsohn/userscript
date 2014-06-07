// ==UserScript==
// @name        Frost-DB to WoWHead Linker
// @namespace   ??
// @include     http://panel.magic-wow.com/frost-db/*
// @include     http://*.wowhead.com/*
// @require     http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

$(document).ready(function() {
	var localURL = new String($(window).attr("location"));
	var otherSite;
	
	if (localURL.match(/wowhead/)){
		otherSite = "Frost-DB";
		localURL = localURL.replace(/http:\/\/.*\.wowhead\.com\//, "http://panel.magic-wow.com/frost-db/?");
	}else{
		otherSite = "WoWHead";
		localURL = localURL.replace(/http:\/\/panel\.magic-wow\.com\/frost-db\/\?/, "http://old.wowhead.com/");
	}
	
	localURL = localURL.replace(/#.*$/, "");
	
	//alert(localURL);
	if ($(".text h1").parent().length > 0)
		$(".text h1").parent().prepend('<a href="'+localURL+'" class="button-red"><em><b><i>'+otherSite+'</i></b><span>'+otherSite+'</span></em></a>');
	
});