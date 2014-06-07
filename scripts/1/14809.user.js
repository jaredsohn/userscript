// ==UserScript==
// @name           LDR - Flickr - Enlarge Thumbnail
// @namespace      http://userscripts.org/scripts/show/14809
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

window.addEventListener('load', function(){
	var w = unsafeWindow;
	
	addBefore(w.get_unread.cache, 'set', function(sid, feed){
		if(typeof(feed) == 'object')
			enlarge_thumbnail(feed);
	});
	
	w.register_hook('BEFORE_PRINTFEED', function(feed) {
		enlarge_thumbnail(feed);
	});
	
	var enlarged = {};
	function enlarge_thumbnail(feed){
		var link = feed.channel.link;
		if(enlarged[link] || !feed.channel.link.match('^http://.*?flickr.com/'))
			return;
		
		enlarged[link] = true;
		w.foreach(feed.items, function(i){
			i.body = i.body.replace(/_m\./, '.').replace(/(width|height)=".+?"/g, '');
		})
	}
}, true);

function addBefore(target, name, before) {
	var original = target[name];
	target[name] = function() {
		before.apply(target, arguments);
		return original.apply(target, arguments);
	}
}