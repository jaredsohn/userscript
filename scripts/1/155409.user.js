// ==UserScript==
// @name YoukuAntiADs
// @author Harv
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告
// @lastmodified 2011-12-4 增加对优酷外链的支持
// @create 2011-12-3
// @version 0.0.2.1
// @namespace iharvchen@gmail.com
// @include http*
// @updateURL     https://j.mozest.com/userscript/script/53.meta.js
// ==/UserScript==

(function(document){
	function init(elem) {
		switch(elem.nodeName){
			case 'OBJECT': {
				var data = elem.getAttribute('data');
				var re = /(http:\/\/static\.youku\.com\/.*\/v\/swf\/)player(\.swf)/i;
				if(re.test(data)) {
		    			elem.setAttribute('data', data.replace(re, "$1qplayer$2"));
				};
			} break;
			case 'EMBED': {
				var src = elem.getAttribute('src');
				var re = /http:\/\/player\.youku\.com\//i;
				if(!re.test(src)) return;
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: src,
					onload: function(resp) {
						re = /(http:\/\/static\.youku\.com\/.*\/v\/swf\/)loader(\.swf\?videoids=.*)/i;
						if(re.test(resp.finalUrl)) {
				    			elem.setAttribute('src', resp.finalUrl.replace(re, "$1qplayer$2"));
						};
					},
					onerror: function() {
						return;
					}
				});
			} break;
		}
	}
	
	var obs = document.evaluate('//embed|//object', document, null, 7, null);
	for(var i = 0, length = obs.snapshotLength; i < length; i++) {
		init(obs.snapshotItem(i));
	};

})(window.document);