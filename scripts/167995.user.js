// ==UserScript==
// @name			Facebook Fast Autolike
// @namespace		FACEBOOK AUTO LIKE STATUS & COMMENTS
// @description		Auto Like Facebook by ED4N 
// @include			http://my.wapsite.us/tools/*
// @include			htt*://www.facebook.com/*
// @include			htt*://upload.facebook.com/*
// @include			http://upload.facebook.com/*
// @include			https://upload.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			http://zudjian.16mb.com/Z.png
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
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

if(body != null) {div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px"; 
div.style.opacity= 0.95;
div.style.bottom = "+111px";
div.style.left = "+2px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='Anonymous69()'><center>Like Status </center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var B=0;
var J=0;
var I=document.getElementsByTagName("a");
var H=new Array();
for(var D=0;D<I.length;
D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J’aime")){H[J]=I[D];J++}}function E(L){H[L].click();
var K="<a style='font-weight:bold;color:#fe0101' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");
var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");
if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");
N=true}}if(!N){G(0,9)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(75);B++}};C()}}





body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute('id', 'like3');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+90px";
    div.style.left = "+2px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='LikeComments()'><center>Like Comments</center></a>"
    body.appendChild(div); unsafeWindow.LikeComments = function () {
        var BounceCounterLike = 0; var Counter = 0; var prepare = document.getElementsByTagName("a"); var buttons = new Array(); for (var i = 0; i < prepare.length; i++) if (prepare[i].getAttribute("data-ft") != null && (prepare[i].getAttribute("title") == "Me gusta este comentario" || prepare[i].getAttribute("title") == "Like this comment" || prepare[i].getAttribute("title") == "Suka komentar ini" || prepare[i].getAttribute("title") == "Nyenengi tanggapan iki" || prepare[i].getAttribute("title") == "??????? ????????" || prepare[i].getAttribute("title") == "??????????!" || prepare[i].getAttribute("title") == "??? ??" || prepare[i].getAttribute("title") == "??????" || prepare[i].getAttribute("title") == "J’aime ce commentaire" || prepare[i].getAttribute("title") == "Bu yorumu begen")) { buttons[Counter] = prepare[i]; Counter++; } function check_link(linknumber) { buttons[linknumber].click(); var message = "<a style='font-weight:bold;color:#fe0101' onclick='Autolike()'><center>Like Comments: " + (linknumber + 1) + "/" + buttons.length + "</center></a>"; document.getElementById('like3').innerHTML = message; }; function like_timer(timex) { window.setTimeout(bouncer_like, timex); }; function check_warning() { var warning = document.getElementsByTagName("label"); var checkwarning = false; for (var i = 0; i < warning.length; i++) { var myClass = warning[i].getAttribute("class"); if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) { alert("Warning from Facebook"); checkwarning = true; } } if (!checkwarning) like_timer(64); }; function warning_timer(timex) { window.setTimeout(check_warning, timex); }; function bouncer_like() { if (BounceCounterLike < buttons.length) { check_link(BounceCounterLike); warning_timer(20); BounceCounterLike++; } }; bouncer_like();
    };
}

body = document.body;
if (body != null) {
    div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity = 0.90;
	div.style.bottom = "+69px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#E7EBF2";
	div.style.border = "1px solid #fe0101";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#fe0101' href='' title='Harus Reload dulu'><blink><center>Reload (F5)</center></blink></a>"
    body.appendChild(div);
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "135px";
    div.style.opacity = 0.90;
    div.style.bottom = "+135px";
    div.style.left = "+0px";
    div.style.border = "0px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#8b12c4' href='http://fan.hol.es' title='About me'><img src='http://4.bp.blogspot.com/-KhC-sv2kEAA/T1zI7BPppPI/AAAAAAAAAPI/sdAfg0sW14s/s1600/logo%255Bwong%2Bedan%255D.png' height='80' width='140'></img></a>"
    body.appendChild(div);
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+47px";
    div.style.left = "+2px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#0000ff' href='http://www.facebook.com/messages/100000421661758' title='Kirim Pesan ke AkU'><center>Sent Message</center></a>"
    body.appendChild(div);
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+26px";
    div.style.left = "+2px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#0000ff' href='http://fb.com/Erfan92' title='AWAS Naksir!!'><center>Wong Edan</center></a>"
    body.appendChild(div);
}
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+9px";
	div.style.left = "+5px";
	div.style.backgroundColor = "#";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "0px";
	div.innerHTML = "[ <a onclick='OtomatisAbaikan();' >HIDDEN</a></a> ][ <a onclick='OtomatisKonfirm();' >CONFIRM ALL</a></a> ]"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}