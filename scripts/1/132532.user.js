// ==UserScript==
// @name		mlbHideScores
// @description		mlb-com: Hide scores
// @author		Sven Kalkbrenner
// @email		gm@sven.kalkbrenner.de
// @require		http://code.jquery.com/jquery-1.7.2.min.js
// @namespace		http://gm.svenkalkbrenner.de/mlbhidescore.js
// @updateURL		http://gm.svenkalkbrenner.de/mlbhidescore.js
// @include		http://mlb.mlb.com/index.jsp
// @version		0.1
// @history		0.1	05.05.2012: Hide scores
// ==/UserScript==

var mlb={
	hideScores:function(dom) {
		$(dom).each(function() {
			$(this).html('??');
		});
	}
}


window.setInterval(
	function() {
		mlb.hideScores('.runs');
	},100
);
