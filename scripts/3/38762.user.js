// ==UserScript==
// @name           Mixi More Friends Diaries
// @namespace      http://exoego.net/
// @description    Display more than 5 new Friends Diaries.
// @include        http://mixi.jp/
// @include        http://mixi.jp/home.pl*
// @include        http://mixi.jp/?display_type=contents*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.3
// ==/UserScript==

$.get("http://mixi.jp/new_friend_diary.pl", function(data){
	$('#newFriendDiary a[href$="new_friend_diary.pl"]').hide();

	var friendDiaryArea = $(data).find(".newFriendDiary");
	var dt = friendDiaryArea.find("dt");
	var dd = friendDiaryArea.find("dd");
	var target = $("#diaryFeed dl");
	var shortDate = /\d+月\d+日/;

	for(var i=5, tmp=[]; i<dt.length; ++i) {
		tmp.push("<dt><span>" + $(dt[i]).html().match(shortDate) + "</span></dt>" +
			"<dd>"+$(dd[i]).html().replace(/<img [^>]+?>/,"")+"</dd>");
	}
	target.append(tmp.join(""))
})