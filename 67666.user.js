// ==UserScript==
// @name           Nicovideo - Direct Link from Tag
// @namespace      http://profile.livedoor.com/ronekko/
// @description    ニコニコ動画でURLやsm******が含まれるタグのリンク先を直接開けるリンクに置き換える
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
// ver. 20100131

var videoTags = document.getElementById('video_tags');
var tags = videoTags.getElementsByTagName('a');
var patterns = [{re: /sm\d+/, prefix: 'http://www.nicovideo.jp/watch/'},
				{re: /s?https?:\/\/[\w-.!~*'();/?:@&=+$,%#]+/, prefix: ''}];
var patLen = patterns.length;

for(var i=0, len=tags.length; i<len; ++i){
	var tag = tags[i];
	for(var j=0; j<patLen; ++j){
		var pattern = tag.text.match(patterns[j].re);
		if(pattern){
			tag.href = patterns[j].prefix + pattern[0];
		}
	}	
}