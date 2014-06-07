// ==UserScript==
// @name           Better Twitter on LDR
// @namespace      http://exoego.net/
// @description    Add icon, remove duplication of tweets.
// @include        http://reader.livedoor.com/reader/
// @version        0.2
// ==/UserScript==

(function(win){

GM_addStyle(<><![CDATA[
	.GM_better_twitter {
		display:block;
		background-repeat: no-repeat;
		bakcground-position:top left;
		padding-left: 28px;
		min-height: 24px;
	}
	.GM_better_twitter span { color: blue; }
]]></>);

const regDomain     = /^https?:\/\/(search\.)?twitter\.com\//;
const regSearchFeed = /^https?:\/\/search\./;
const regID         = /^https?:\/\/twitter\.com\/(.+?)\/status/;
const iconAPIurl = "http://img.twitty.jp/user/$id$/s.gif";
//const iconAPIurl = "http://api.dan.co.jp/twicon/$id$/mini";

win.register_hook('before_printfeed', function(feed) {
	if (feed.gm_filtered_by_better_twitter) return;
	feed.gm_filtered_by_better_twitter = true;
	if (!regDomain.test(feed.channel.link)) return;

	var items = feed.items;
	var id, entry, body;
	var i;

	if (regSearchFeed.test(feed.channel.link)) {
		for (i=0,iz=items.length; i<iz; ++i){
			entry = items[i];
			if (id = entry.link.match(regID)) { // get id on every items
				id = id[1];

				if (entry.body.indexOf("<a ") === -1) {
					body = entry.body;
				} else {
					// convert <a> into <span>
					body = entry.body.replace(/<\/a>/g, "</span>")
								.replace(/<a /g, "<span ")
								.replace(/href="([^"]+)"/g,
                                         'onclick="window.open(\'$1\');return false;"');
				}
				entry.title = '<span class="GM_better_twitter" style="background-image: url(' + iconAPIurl.replace("$id$",id) + ')">' + body + '</span>';
				entry.body  = "";
			}
		}
	} else {
		id = items[0].link.match(regID)[1]; // get id first and use repeatedly
		for (i=0,iz=items.length; i<iz; ++i){
			entry = items[i];

			body = linkify(entry.body);

			entry.title = '<span class="GM_better_twitter" style="background-image: url(' + iconAPIurl.replace("$id$",id) + ')">' + body + '</span>';
			entry.body  = "";
		}
	}

	function linkify(str){
		return str.replace(/(?:https?|ftp):\/\/[-_.!~*a-zA-Z0-9;\/?:\@&=+\$,%#]+/,
                           '<span onclick="window.open(\'$&\');return false;">$&</span>')
                  // @username
	              .replace(/(?=[^0-9a-zA-Z_-])@([0-9a-zA-Z_]+)/g,
                           '@<span onclick="window.open(\'http://twitter.com/$1\');return false;">$1</span>')
                  // #hashtag
		          .replace(/(?=[^0-9a-zA-Z_-])#([0-9a-zA-Z_]+)/g,
                           '#<span onclick="window.open(\'http://twitter.com/#search?q=%23$1\');return false;">$1</span>');
	}
});

})(unsafeWindow)