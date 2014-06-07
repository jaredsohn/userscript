// ==UserScript==
// @name        Voyages destinations
// @namespace   VOYAGES
// @description Supprime certains pays des destinations de voyage
// @grant       GM_addStyle
// @include     http*://www.nouvelles-frontieres.fr/*
// @include     http*://*.lastminute.com/*
// @include     http*://*.promovacances.com/*
// @require	http://code.jquery.com/jquery-2.0.3.js
// @version     1
// ==/UserScript==

var blocked =  new Array(
/Maroc/i,
/Tunisie/i,
/Egypte/i,
/Turquie/i,
/Seychelles/i,
/Senegal/i,
/Sénégal/i
);

// URL Decomposer
// Copyleft - Nox
// { domain:"store.monkey.com",
//   sld:"monkey",
//   tld:"com",
//   rootdomain:"monkey.com",
//   path:"app/63942/",
//   args:"l=french",
//   protocol:"http",
//   rooturl:"http://store.monkey.com",
//   base:"http://store.monkey.com/app/63942" }
function decomposeURL(weburl, pgallerycontainer, handler) {//console.log('decomposeURL', weburl, pgallerycontainer, handler);
	var webmatch=weburl.match(/((https?):\/\/([^\/]+))\/?([^\?]*)[\?]?(.*)/);
	var webmatchbase=weburl.match(/(https?:\/\/[^]+)\/[^\/]*/);
	if(!webmatchbase) webmatchbase=webmatch[1]; else webmatchbase=webmatchbase[1];
	if(webmatch) {
		var webmatchd=webmatch[3].split(".");
		return {'domain':webmatch[3], 'sld':webmatchd[webmatchd.length-2], 'tld':webmatchd[webmatchd.length-1], 'rootdomain':webmatchd[webmatchd.length-2]+"."+webmatchd[webmatchd.length-1], 'path':webmatch[4], 'args':webmatch[5], 'protocol':webmatch[2], 'rooturl':webmatch[1], 'base':webmatchbase};
	} else return {};
}

var site = decomposeURL(window.location.href);

console.log(site);

switch(site['rootdomain']) {
	case "nouvelles-frontieres.fr":
		$("h4.caps.bold.noir").each(function( index ) {
			//console.log( index + ": " + $(this).text() );
			pays =  $(this).text();
			for (var j=0, len=blocked.length;j<len;j++) {
				if(pays.match(blocked[j])) {
					//console.log("MATCH!");
					$(this).closest("div.results-prod-impair, div.results-prod-pair").remove();
					}
			}
		});
		break;
	case "lastminute.com":
		$("div.heading > h2").each(function( index ) {
			//console.log( index + ": " + $(this).text() );
			pays =  $(this).text(); // has leading \s's
			for (var j=0, len=blocked.length;j<len;j++) {
				if(pays.match(blocked[j])) {
					//console.log( index + ": " + $(this).text() );
					$(this).closest("div.holder").remove();
					}
			}
		});
		break;
	case "promovacances.com":
		$("div.product-description span.blue.fsize11").each(function( index ) {
			//console.log( index + ": " + $(this).text() );
			pays =  $(this).text(); // has leading \s's
			for (var j=0, len=blocked.length;j<len;j++) {
				if(pays.match(blocked[j])) {
					//console.log( index + ": " + $(this).text() );
					$(this).closest("li").remove();
					}
			}
		});
		break;
}

