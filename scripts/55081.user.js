// ==UserScript==
// @author        rikuo
// @name          LDR TwitterStyle
// @include       http://reader.livedoor.com/reader/*
// ==/UserScript==

// icon API cf. http://usericons.relucks.org/

var w = unsafeWindow;

GM_addStyle(<><![CDATA[
	div.rko_twitter{
		background-repeat: no-repeat;
		padding-left: 80px;
		min-height: 100px;
		max-width: 40em;
	}
]]></>);

const twitterRE = /^https?:\/\/(search\.)?twitter\.com\//i;
const useridRE = /^https?:\/\/twitter\.com\/(.+?)\/status/i;

w.register_hook('before_printfeed', function(feed) {

	var feed_link = feed.channel.link;
	var id;
	if(!feed_link.match(twitterRE))return;

	var items = feed.items;
	for(var i=0,il=items.length; i<il; ++i){
		var entry_url = items[i].link;
		if(id = entry_url.match(useridRE)){
			items[i].body = '<div class="rko_twitter" style="background-image: url(http://usericons.relucks.org/twitter/' + id[1] + ')">' + items[i].body + '</div>';
		}
	}

});
