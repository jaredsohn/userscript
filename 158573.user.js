// ==UserScript==
// @name           Instagram preview in Twitter
// @namespace      ipit
// @description    Instagram preview feature will be back to Twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author         Vilart
// @version        1.01
// ==/UserScript==

(function(){
	var twitterReady = function(callback) {
		var func = function() {
			var interval;
			var loopTimer = 200;

			var intervalFunc = function() {
				var ok = false;
				if (window.phx) {
			 	    if (callback()) {
			 	    	ok = true;
			 	    }
				}
				if (!ok) interval = setTimeout(intervalFunc, loopTimer);
		 	}
			interval = setTimeout(intervalFunc, loopTimer);
		}
		var funcStr = func.toString();

		var callbackStr = callback.toString();
		if (window.opera) callbackStr = callbackStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");

		var script = document.createElement("script");
		script.innerHTML = "(function(){var callback="+callbackStr+";("+funcStr+")();})();";
		document.body.appendChild(script);
	}

	twitterReady(function(){
		if (!phx.mediaType) return false;

		var Mustache = {
			to_html: function(a,b) {
				var c = a.replace(/\{{2,}/g, "{").replace(/\}{2,}/g, "}");
				return phx.util.supplant(c,b);
			}
		}

		phx.mediaType("Instagram", {
			icon: "photo",
			domain: "http://instagram.com",

			matchers: {
				standardUrl : /^#{protocol}?(?:instagram\.com|instagr\.am)\/p\/([\w-]+)\/?/g
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
				if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.name = "Instagram";
					this.data.src = this.url;
					this.data.photoId = RegExp.$1
					finished();
				}
			},
			
			render: function(dom) {
				var t = '<div class="gm_previewextender instagram"><a class="inline-media-image" data-inline-type="{{name}}" href="{{src}}" target="_blank"><img src="http://instagr.am/p/{{photoId}}/media/?size=l" /></a></div>';
				$(dom).append(Mustache.to_html(t, this.data));
			}
		});
	});
	
})();