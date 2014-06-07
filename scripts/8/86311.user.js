// ==UserScript==
// @name           nCore reklamszuz
// @namespace      http://userscripts.org/scripts/show/35252
// @description    kikapcsolja az nCore idegesítő bannereit
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// @include        http://ncore.us/*

var divs = document.getElementsByTagName('div');
var i;
var str;
var SCRIPT = {
	name: "nCore reklamszuz by WuXorT",
	url: '',
	version: '20100918.0'
};

function turnoffbaners() {
	for (i=0; i<divs.length;i++) {		
		if (divs[i].className=='recent-article') {
			divs[i].style.display+='none';
		}
		if (divs[i].className=='recent-links') {
			divs[i].style.display+='none';
		}
	}
}

turnoffbaners();

// ==/UserScript==
