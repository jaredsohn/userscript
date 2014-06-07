// ==UserScript==
// @namespace       http://flickr.dwardu.info/
// @name            Flickr photoset RSS feed
// @version         0.15
// @description     Embeds inside a Flickr photoset page a link to an RSS feed of photos in that set.
// @author          Edward Grech (dwardu@dwardu.info)
// @date            2007-10-26
// @include         http://www.flickr.com/photos/*/sets/*
// @exclude         http://www.flickr.com/photos/*/sets/
// @exclude         http://www.flickr.com/photos/*/sets/*/detail*
// @exclude         http://www.flickr.com/photos/*/sets/*/map*
// @exclude         http://www.flickr.com/photos/*/sets/*/comments*
// @include         http://flickr.com/photos/*/sets/*
// @exclude         http://flickr.com/photos/*/sets/
// @exclude         http://flickr.com/photos/*/sets/*/detail*
// @exclude         http://flickr.com/photos/*/sets/*/map*
// @exclude         http://flickr.com/photos/*/sets/*/comments*
// ==/UserScript==
//
// More info on this script at http://www.flickr.com/groups/flickrhacks/discuss/72157600063281311/
// You are very welcome to give feedback!
//
// ----- Version history -----
// 2007-Apr-12	v0.1	Initial version
// 2007-Oct-26	v0.15 	Updated to reflect changes in Flickr set page HTML
//

(function() {
	photoset_id = location.pathname.substring(location.pathname.match(/^\/photos\/[^\/]+\/sets\//i)[0].length).match(/[^\/]+/)[0];
	photoset_title = document.getElementById('title_div'+photoset_id).innerHTML.replace(/^\s*|\s*$/, "");

	// Default Yahoo! Pipes feed URL for this photoset
	pipes_feed_url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=ggi_H7jn2xGoWGzY6UjTQA&_render=rss&set='+photoset_id;
	// Extract custom FeedBurner feed URL embedded in description, if present
	feedburner_feed_url_anchor = document.evaluate("//*[starts-with(@id, 'description_div')]//a[starts-with(@href, 'http://feeds.feedburner.com/')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var feed_url;
	if(feedburner_feed_url_anchor) { // if photoset owner has embedded a FeedBurner link into the set's description...
		feed_url = feedburner_feed_url_anchor.href; // ...use that link as the feed URL...
		feedburner_feed_url_anchor.parentNode.removeChild(feedburner_feed_url_anchor); // ...and remove completely that anchor from the description
	} else { 
		feed_url = pipes_feed_url; // use the default Yahoo! Pipes feed URL
	}

	// "Feeds" div element
	feeds_div = document.createElement('div');
	feeds_div.id = 'Feeds';
	feeds_div.innerHTML = '<div id="AtomRSS">\
			<a href="'+feed_url+'" title="RSS 2.0 feed"><img src="/images/feed-icon-16x16.png" width="16" height="16" alt="Subscribe to a feed of stuff on this page..." class="absmiddle" /></a>\
			<a href="'+feed_url+'" title="RSS 2.0 feed">Feed</a> &ndash; Subscribe to photos from the '+photoset_title+' set\
		</div>\
		<div id="AddToYahoo"><a href="http://us.rd.yahoo.com/my/atm/Flickr/Sets/*http://add.my.yahoo.com/rss?url='+escape(feed_url)+'"><img src="/images/addtomyyahoo6.gif" width="62" height="17" alt="Add to My Yahoo!" /></a></div>';

	// insert the "Feeds" div as the last element inside the div with id 'Main'
	document.getElementById('Main').appendChild(feeds_div);
})();