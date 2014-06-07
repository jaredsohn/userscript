// ==UserScript==
// @name			Facebook Auto Like by Donny Gusmawan
// @namespace			Facebook Auto Like by Donny Gusmawan
// @description			http://www.donny-berbagi.blogspot.com/
// @author			Donny Gusmawan
// @authorURL			http://www.facebook.com/donnygg
// @homepage			http://www.donny Berbagi.blogspot.com/
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://sphotos-b.ak.fbcdn.net/hphotos-ak-prn1/943518_667869053242558_416362392_n.jpg
// @version			v2.0
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+83px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><center>Refresh Page</center></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+56px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
   body.appendChild(div);
   unsafeWindow.AutoLike = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HgI"||2[i].3=="??????"||2[i].3=="???!"||2[i].3=="?"||2[i].3=="K"||2[i].3=="???"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'g z \');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|start|autolike|by|Juanda'.split('|'),0,{}))
   };
}

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+35px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="??????? ????????"||prepare[i].getAttribute("title")=="??????????!"||prepare[i].getAttribute("title")=="??? ??"||prepare[i].getAttribute("title")=="??????"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu begen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+8px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a href='http://www.facebook.com/donnygg' target='_blank' style='font-weight:bold;color:#E30505'><blink><center>Donny Gusmawan</center></blink></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="??????? ????????"||prepare[i].getAttribute("title")=="??????????!"||prepare[i].getAttribute("title")=="??? ??"||prepare[i].getAttribute("title")=="??????"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu begen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}