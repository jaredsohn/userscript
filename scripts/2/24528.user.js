// ==UserScript==
// @name           twitter hashtags
// @namespace      com.twitter.hashtags
// @description    adds links to hashtags.org, twemes.com or search.twitter.com to tweets on twitter.com
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function TwitterHashtags() {

	var entries = new Array();
	var tagsiteurl = GM_getValue('tagsiteurl');

	if (!tagsiteurl || tagsiteurl == 'undefined' || tagsiteurl == '') tagsiteurl = 'http://www.hashtags.org/tag/$1/';


	var findEntries = function() {
        var timeline = document.getElementById('timeline');
        if (timeline) {
            var el = timeline.getElementsByTagName('span');
            for (var i in el) {
                if (el[i].className && el[i].className.indexOf('entry-content') > -1) {
                    entries.push(el[i]);
                }
            }
		}

        el = document.getElementsByTagName('p');
        for (var i in el) {
            if (el[i].className && el[i].className.indexOf('entry-content') > -1) {
                entries.push(el[i]);
            }
        }

        var permalink = document.getElementById('permalink');
        if (permalink) {
        	try {
				el = permalink.childNodes[1].childNodes[1];
				entries.push(el);
			}
			catch (e) {}
        }
	};

	this.replace = function(str) {
		return str.replace(/#([^.,!\?:; ]+)/g, '#<a href="' + tagsiteurl + '" title="tag: $1" class="hashtaglink">$1</a>');
	};

	this.execute = function() {
		findEntries();

		for (var i in entries) {
			var entry = entries[i];
			entry.innerHTML = this.replace(entry.innerHTML);
		}
	};

	this.useHashtagsOrg = function() {
		GM_setValue('tagsiteurl', 'http://www.hashtags.org/tag/$1/');
		document.location.reload();
	};


	this.useTwemesCom = function() {
		GM_setValue('tagsiteurl', 'http://twemes.com/$1');
		document.location.reload();
	};

	this.useSearchTwitterComWithHash = function() {
		GM_setValue('tagsiteurl', 'http://search.twitter.com/search?q=%23$1');
		document.location.reload();
	};

	this.useSearchTwitterComWithoutHash = function() {
		GM_setValue('tagsiteurl', 'http://search.twitter.com/search?q=$1');
		document.location.reload();
	};

}

(function() {

	window.twitterhashtags = new TwitterHashtags();
	window.twitterhashtags.execute();

	GM_registerMenuCommand('use hashtags.org', window.twitterhashtags.useHashtagsOrg);
	GM_registerMenuCommand('use twemes.com',   window.twitterhashtags.useTwemesCom);
	GM_registerMenuCommand('use search.twitter.com (with hash)',    window.twitterhashtags.useSearchTwitterComWithHash);
	GM_registerMenuCommand('use search.twitter.com (without hash)', window.twitterhashtags.useSearchTwitterComWithoutHash);

})();