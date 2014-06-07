// ==UserScript==
// @name        Anti PubVN
// @namespace   AntiPub
// @include     http://www.pubvn.net/phim/*
// @include     http://www.pubvn.net/movie/detail*
// @installURL  https://userscripts.org/scripts/source/151321.user.js
// @updateURL   https://userscripts.org/scripts/source/151321.meta.js
// @downloadURL https://userscripts.org/scripts/source/151321.user.js
// @version     1.5.1
// ==/UserScript==
function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}
var loc = location.href;
if(loc.indexOf('http://www.pubvn.net/phim/')!=-1){
	var url = $('.detail_btn').attr('href');
	var splitedStr;
	if(url.indexOf('player_forum')!=-1)
	$('#detail_pic').html('<iframe id="player" src="http://www.pubvn.net' + url+ '" style="border: 0;width:800px;height:450px;margin:0 auto;"></iframe>');
	else {
	$.get('http://www.pubvn.net' + url, function(data) {
		splitedStr = data.split('RELPATH = "threads/')[1];
		var tid = splitedStr.split('-')[0];
		$.get('http://www.pubvn.net/bar/dodamde/' + tid, function(data2) {
			splitedStr = data2.split('id="player" src="')[1];
			var iMov = splitedStr.split('"')[0];
				// $.get('http://www.pubvn.net' + iMov, function(data3) {
					// $('#detail_top').html(data3);
				// });
				$('#detail_pic').html('<iframe id="player" src="http://www.pubvn.net' + iMov + '" style="border: 0;width:800px;height:450px;margin:0 auto;"></iframe>');
		});
	});
	}
}