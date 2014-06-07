// ==UserScript==
// @name           Facepunch Avatar
// @namespace      http://facepunch.com
// @description    Die Beiber DIE!
// @include        http://www.facepunch.com/threads/*
// @require	   http://code.jquery.com/jquery-1.5.2.min.js
// ==/UserScript==

var oldAvatar = "http://i.imgur.com/YPF0b.png";



var userDataList = $(".userinfo #userdata a img");
userDataList.each(function(index, domElm) {
	if ($(this).attr("src") == "http://www.facepunch.com/image.php?u=5133&dateline=1298325339") {
		$(this).attr("src", oldAvatar)
	}
});