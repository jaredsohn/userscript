// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.TinyCategoryColors
// @name           Tiny Tiny RSS: Colors based on category
// @description    Feed entries of same category share the same color.
// @author         kuehlschrank
// @version        2014.3.28
// @include        *://reader.*
// @exclude        *://reader.*prefs.php
// ==/UserScript==

(function() {

	function main() {

		function loadFeedData(cb) {
			var cats = [], feeds = [], items = dijit.byId('feedTree').model.store._arrayOfAllItems;
			for(var i = items.length, item; i-- && (item = items[i]);) {
				if(!item.type || item.type[0] != 'category') continue;
				var cat_id = item.bare_id[0];
				if(cat_id < 1) continue;
				cats.push(cat_id);
				for(var j = item.items.length, feed; j-- && (feed = item.items[j]);) {
					feeds.push({id:feed.bare_id[0], cat_id:cat_id});
				}
			}
			cb(cats.sort(), feeds);
		}

		function createColorMapping(cats, feeds) {
			var css = 'a.hlFeed { background:transparent !important; } span.contentPreview { text-shadow:none !important; } .hl * { color:#444444!important; } .hl.Unread * { color:#000000!important; } ';
			var cat2col = {};
			var hueInterval = 360/cats.length;
			for(var i = cats.length, cat; i-- && (cat = cats[i]);) {
				var h = Math.floor(i * hueInterval);
				var className = 'color-' + i;
				var color     = 'hsl(' + h + ',100%,80%) !important';
				var colorRead = 'hsl(' + h + ',100%,90%) !important';
				cat2col[cat] = className;
				css += '.' + className + ' { background:' + colorRead + '; } .Unread.' + className + ' { background:' + color +'; } ';
			}
			var style = document.createElement('style');
			style.innerHTML = css;
			document.head.appendChild(style);
			var feed2class = {};
			for(var i = feeds.length, feed; i-- && (feed = feeds[i]);) {
				feed2class[feed.id] = cat2col[feed.cat_id];
			}
			return feed2class;
		}

		function colorize(parent, mapping) {
			var list = parent.querySelectorAll('a.hlFeed, span.hlFeed > a');
			for(var i = list.length, a; i-- && (a = list[i]);) {
				var id = parseInt(a.getAttribute('onclick').match(/\d+/)[0]);
				a.parentNode.parentNode.classList.add(mapping[id]);
			}
		}

		function observe(parent, cb) {
			var onMutations = function(muts) {
				for(var i = muts.length, mut; i-- && (mut = muts[i]);) {
					for(var j = mut.addedNodes.length, node; j-- && (node = mut.addedNodes[j]);) {
						if(node.nodeType == 1) cb(node);
					}
				}
			}
			var M = window.MutationObserver || window.WebKitMutationObserver;
			new M(onMutations).observe(parent, {childList:true, subtree:true});
		}

		if(typeof feeds_found != 'number') {
			return window.setTimeout(main, 1000);
		}

		loadFeedData(function(cats, feeds) {
			var mapping = createColorMapping(cats, feeds);
			var frame   = document.getElementById('headlines-frame');
			var handler = function(node) { colorize(node, mapping); };
			handler(frame);
			observe(frame, handler);
		});

	}

	function inject(js)
	{
		var node = document.createElement('script');
		node.setAttribute('type', 'application/javascript');
		node.textContent = '(' + js + ')();';
		document.body.appendChild(node);
	}

	inject(main);

})();
