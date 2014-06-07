// ==UserScript==
// @name           LDR subscriber in FLDR
// @namespace      http://white.s151.xrea.com/
// @include        http://fastladder.com/reader/*
// ==/UserScript==

var w = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
var _onload = w.onload;
w.onload = function() {
	_onload();

	w.channel_widgets.add('ldr_subscriber', function(feed){
		GM_xmlhttpRequest({
		  url:    'http://rpc.reader.livedoor.com/count?feedlink=' + encodeURIComponent(feed.channel.feedlink),
		  method: 'GET',
		  onload: function(res){
			  var num = res.responseText;
			  if(Number(num) < 1) {
//				  w.message('ldr error...(' + num + ')'+ feed.channel.feedlink)
				  return;
				}
			  document.getElementById('ldr_subscriber').innerHTML =
				['<a href="http://reader.livedoor.com/about/' , feed.channel.feedlink, '">', 'LDR:','<span class="num">',num,'</span></a>'].join('')
		  }
		})
		return ['<span id="ldr_subscriber"></span>'].join("");
	});
}
