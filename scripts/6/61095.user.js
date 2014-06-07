// ==UserScript==
// @name           Sharecash Ad Skipper
// @author 	   Unreal
// @namespace      Sharecash
// @description    This is a modification to the old Sharecash autodownloader just to make it work.
// @include        http://sharecash.org/download.php?id=*
// @include        http://www.sharecash.org/download.php?id=*
// @include        http://sharecash.org/download.php?file=*
// @include        http://www.sharecash.org/download.php?file=*
// @version 	   3.5.2
// ==/UserScript==

var ShareTimendum = {
	frame: [],
	steps: 0,
	frameCount: 0,
	baseUrl: 'http://www.4realptc.info/s.php',
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
		document.getElementsByTagName('iframe')[ShareTimendum.frameCount].src = ShareTimendum.baseUrl;
		ShareTimendum.frameCount++;
		setTimeout(ShareTimendum.makeStep, 2500);
	},
};
setTimeout(ShareTimendum.init, 2000);