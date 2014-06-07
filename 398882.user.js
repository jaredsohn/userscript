// ==UserScript==
// @name       jiukuaiyou get good
// @version    0.1
// @description  enter something useful
// @match      http://ju.jiukuaiyou.com/jump/auth/*
// @copyright  2012+, You
// @downloadURL https://userscripts.org/scripts/source/398882.user.js
// @updateURL https://userscripts.org/scripts/source/398882.meta.js
// ==/UserScript==
window.onload = function() { 
	$.getJSON("http://upload.juancdn.com/upload.php?timeSync=1&callback=?", {},
	function(data) {
		setTimeout(function() {
			window.open("http://ju.jiukuaiyou.com/jump/confirm/15tk61?ques=PArPW%2BApM7eBiz942OHI2Waeh22W8oDdPzKTykVd4M7fUcrrYUVZmLyGsejxquw5F5CRNuUgBWSORJ71afkab2mDUGGntAPeKGY0N9EQc7HIfBel3L65KapjLJ4usKx9CbpkffA1jjr3ovX%2BKkYJyrRBqAxTDGfsiLfF0P4GN0%2BVvy9R%2FWsidFnU%2FMyCQPyQGhcT4HNBI2qZ3FxURKzGWUuUaNGoypOD");
			//window.open("http://ju.jiukuaiyou.com/jump/confirm/15tjyf?ques=PArPW%2BApM7eBiz942OHI2Waeh22W8oDdPzKTykVd4M7fUcrrYUVZmLyGsejxquw5F5CRNuUgBWSORJ71afkab2mDUGGntAPeKGY0N9EQc7HIfBel3L65KapjLJ4usKx9CbpkffA1jjr3ovX%2BKkYJyrRBqAxTDGfsiLfF0P4GN0%2BVvy9R%2FWsidFnU%2FMyCQPyQGhcT4HNBI2qZ3FxURKzGWUuUaNGoypOD");
			//window.open('http://www.baidu.com');
		},
		Math.round(THATDAY.getTime() - data));
	});
};