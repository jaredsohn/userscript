// ==UserScript==
// @name           Google News Favicon
// @namespace      Yamamaya
// @include        http://news.google.*/*
// @version        1.0.0
// ==/UserScript==

(function(){
	var DEFAULT_FAVICON = 'data:image/gif;base64,R0lGODlhEAAQAKIAAMXFxf///+/v79/f3/f398zMzObm5v///yH5BAUUAAcALAAAAAAQABAAAANGeFbcPSfGQoK9gQAoSyagIBiBsXUfSIjfeXiqKmDFhH3iGNTvjbM8jy9GCPpSIOMxprwRmxdi0XakUauWYAU7PQwc4MchAQA7';

	var GoogleNews = {
		addFavicon: function(d){
			var self = this;
			var nodes = $X('.//node()[@class="title" or @class="aa-inner"]/a[not(preceding-sibling::img)]',d);
			nodes.forEach(function(node){
				var parentNode = node.parentNode;
				var faviconURL = 'http://'+ node.hostname + '/favicon.ico';
				var favicon = self.createEle(faviconURL);
				parentNode.insertBefore(favicon,node);
				favicon.removeEventListener('error',self.faviconError,false);
				favicon.addEventListener('error',self.faviconError,false);
			});
		},
		createEle: function(url){
			var favicon = document.createElement('img');
			var style = favicon.style;
			favicon.src = url;
			favicon.alt = 'f';
			style.width = '16px';
			style.height = '16px';
			style.border = 'none';
			style.margin = '0px 5px 5px 0px';
			style.verticalAlign = 'middle';
			return favicon;
		},
		faviconError: function(evt){
			this.src = DEFAULT_FAVICON;
		},
		nextPage: function(){
			// http://d.hatena.ne.jp/os0x/20090829/1251556449
			var self = this;
			var boot = function(){
				AutoPagerize.addFilter(function(docs){
					docs.forEach(function(node){
						self.addFavicon(node);
					});
				});
			};
			
			if(window.AutoPagerize){
				boot();
			} 
			else{
				window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
			}
			
			/* autopagerize 0.40 
			document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
				var node = evt.target;
				var requestURL = evt.newValue;
				var parentNode = evt.relatedNode;
				self.addFavicon(node);
			}, false);
			*/
		}
	};

	
	GoogleNews.addFavicon(document);
	GoogleNews.nextPage();
	
	
	// @source http://gist.github.com/29681.txt
	function $X(exp, context, resolver){
		context || (context = document);
		var Doc = context.ownerDocument || context;
		var result = Doc.evaluate(exp, context, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, len = result.snapshotLength, res = []; i < len; i++) {
			res.push(result.snapshotItem(i));
		};
		return res;
	};
	
	function consoleLog(str){
		if(typeof str == 'object'){
			for(k in str){
				console.log(k + ' : ' + str[k]);
			};
		}
		console.log(str);
	};
})();