// ==UserScript==
// @name           HTicon
// @namespace      firefox-twitter-hashtag-atgeek
// @include        http://twitter.com/*
// @description    This is a script that inserts an icon in hashtags terms in websites
// ==/UserScript==
// version         0.1
// author		   Carlos Adrian Morales (at Twitter)Adriacatl 


var allHTMLTags = new Array();
var moreHTMLTags = new Array();

function getRemoteIcon(hashtag) {
	var final_url = 'http://hticon.com/api/hashtag/' + hashtag;
	var the_icon_to_return;
    GM_xmlhttpRequest({
        method: "GET",
        url: final_url,
        onload: function(xhr) {
			icon_getter = eval('(' + xhr.responseText + ')');
			if(icon_getter.status != 404) {
				the_final_icon = icon_getter.icon_url;
				the_hashtag_pre = hashtag;
				
				setHTicon(the_hashtag_pre, the_final_icon);
			}
		}
    })
	
}

function setHTicon(hashtag, icon) {
	//alert('function called with hashtag: ' + hashtag + ' and icon:  ' + icon);
	var moreHTMLTags=document.getElementsByTagName('a');
	//alert(moreHTMLTags);
	
	for (i = 0; i < moreHTMLTags.length; i++) {
		if (moreHTMLTags[i].className=='tweet-url hashtag') {
			if(moreHTMLTags[i].innerHTML == '#' + hashtag) {
				newHashtagContent = '<img src="' + icon + '" style="vertical-align: middle;" /> #' + hashtag;
				moreHTMLTags[i].innerHTML = newHashtagContent;
				
			}
		}
	}
	
	
}

function getHashtags() {
	var allHTMLTags=document.getElementsByTagName('a');
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className=='tweet-url hashtag') {
			the_HT = allHTMLTags[i].innerHTML.split('#');
			getRemoteIcon(the_HT[1]);
		}
	}
}

getHashtags();