// ==UserScript==
// @name			LOW Speed AutoLike 
// @namespace			*[Update]* AutoLike + Emoticon Facebook 2013
// @description			*[Update]* AutoLike + Emoticon Facebook 2013 by Juanda Juju Kps. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account. autolike and have emoticon Final version 2013 january.new version, work
// @author			Juanda Juju Kps
// @authorURL			http://www.facebook.com/Juanda.The.Moon
// @homepage			http://www.facebook.com/LBTeam
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://2.gravatar.com/avatar/bec25ffa0afd5ef51cab52b3433a16d8?s=100&r=pg&d=mm
// @version			v.3 Final
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

// ======= Jangan Menghapus Credit =======
// == Nama : Auto Like Facebook v.3 Final ==
// ======= Author : Juanda Juju Kps ========
// ======= Site : http://www.facebook.com/LBTeam =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);}

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+65px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("span");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="Beğen"||prepare[i].innerHTML=="أعجبني"||prepare[i].innerHTML=="いいね！"||prepare[i].innerHTML=="讚"||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="좋아요"||prepare[i].innerHTML=="J’aime")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like2').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+44px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="الإعجاب بالتعليق"||prepare[i].getAttribute("title")=="このコメントはいいね！"||prepare[i].getAttribute("title")=="좋아요 취소"||prepare[i].getAttribute("title")=="說這則留言讚"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beğen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Report Bugs</center></a></a>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://m.facebook.com/juanda.the.moon', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2FJuanda.The.moon&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe>"
body.appendChild(div);}

