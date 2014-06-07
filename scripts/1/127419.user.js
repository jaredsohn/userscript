// ==UserScript==
// @name           YouTube Related Ratings
// @version        1.4
// @namespace      vxip
// @author         Julius Mueller
// @grant          none
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==

(function(w, $, vxip, related){
	
	w.vxip = w.vxip || {};
	w.vxip.related = {
		
		isDebug: false,
		exprBase: "div.feed-page a.title,a.video-list-item-link,a.related-video,ol.result-list a.yt-uix-tile-link,ul.gh-single-playlist li a",
		
		init: function(){
			
			var self = this;
			
			// load jQuery
			if (!w.jQuery) {
				var s = document.createElement("script");
				s.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");  
				s.setAttribute("type", "text/javascript");
				document.getElementsByTagName("head")[0].appendChild(s);
			}
			
			// wait for jQuery
			(function wait(){
				if (typeof w.jQuery === "function") {
					$ = w.jQuery;
					self.debug("JQUERY LOADED");
					self.load();
				} else setTimeout(wait, 100);
			})();
		},
		
		load: function() {
			this.debug("YouTube Related Ratings init");
			var self = this;
			$(function(){
				self.addLikes($(self.exprBase));
			});
		},
		
		addLikes: function(s){
			
			this.debug("found", s);
			var self = this;
			
			s.each(function(i,v){
				var ch, tpl, p, $v, id = v.href.replace(/\S*?v=([^&]+)\S*/, "$1");
				$.getJSON("https://gdata.youtube.com/feeds/api/videos?q="+id+"&v=2&alt=jsonc&callback=?", function(e){
					self.debug(e);
					if (typeof e === "object" && e.data.totalItems > 0 && e.data.items[0].rating) {
						$v = $(v);
						p = e.data.items[0].rating * 20;
						tpl = '<div class="video-extras-sparkbars"><div style="width: '+p+'%" class="video-extras-sparkbar-likes"></div><div style="width: '+(100-p)+'%" class="video-extras-sparkbar-dislikes"></div></div>';
						ch = $v.find("span.video-overview");
						if (ch.length) ch.after(tpl);
						else {
							ch = $v.find("span.title");
							if (ch.length) ch.after(tpl);
							else $v.append(tpl);
						}
					} else self.debug("bad response", id, v, e);
					
				});
			});
			
			$("#watch-more-related-button,button.feed-load-more").click(function(){
				(function t(){
					var e = $("#watch-more-related a.related-video");
					if (e.length === 0) setTimeout(t, 500);
					else self.addLikes(e);
				})();
			});
		},
		
		debug: function() {
			if (this.isDebug) console.log.apply(console, arguments);
		}
	};
	
	w.vxip.related.init();
	
})(unsafeWindow || window);
