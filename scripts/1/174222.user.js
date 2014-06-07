// ==UserScript==
// @name			Flike v.1
// @namespace		Flike v.1 Facebook Auto-like
// @description		Automatically liking friend's status, photos, videos, comments, and anything on a Facebook page. Updated with Facebook Warning alert to make you safe using this feature. This bot script is used along Greasemonkey on Mozilla Firefox and it is safe to use as we're not providing spamming scripts.
// @author			Dio Ivanov
// @authorURL		http://www.facebook.com/diospectre
// @homepage		http://www.vektanova.com/2013/07/flike-v1.html
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			http://m.ak.fbcdn.net/profile.ak/hprofile-ak-ash4/373328_173433956027071_1502179934_q.jpg
// @version			v.2
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
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
// @exclude			htt*://www.facebook.com/apps/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

body = document.body;

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "500px";div.style.height = "66px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "345px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='http://vektanova.comuf.com/Scripts/adfb.html' width='680' style='border:none'></iframe>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+94px";div.style.left = "+210px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><center>Refresh <br> Abort Action (F5) </center></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+73px";div.style.left = "+210px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like Status</center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var Q=0;var S=0;var T=document.getElementsByTagName("a");var K=new Array();for(var O=0;O<T.length;O++){if(T[O].getAttribute("class")!=null&&T[O].getAttribute("class").indexOf("UFILikeLink")>=0&&(T[O].innerHTML=="Me gusta"||T[O].innerHTML=="Like"||T[O].innerHTML=="?????"||T[O].innerHTML=="Suka"||T[O].innerHTML=="Begen"||T[O].innerHTML=="??????"||T[O].innerHTML=="Gusta"||T[O].innerHTML=="?"||T[O].innerHTML=="Seneng"||T[O].innerHTML=="???"||T[O].innerHTML=="J’aime")){K[S]=T[O];S++}}function N(B){K[B].click();var A="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(B+1)+"/"+K.length+"</center></a>";document.getElementById("like2").innerHTML=A}function L(A){window.setTimeout(P,A)}function R(){var A=document.getElementsByTagName("label");var D=false;for(var B=0;B<A.length;B++){var C=A[B].getAttribute("class");if(C!=null&&C.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");D=true}}if(!D){L(2160)}}function M(A){window.setTimeout(R,A)}function P(){if(Q<K.length){N(Q);M(700);Q++}};P()}}
     
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+52px";div.style.left = "+210px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like Comments</center></a>"
body.appendChild(div);unsafeWindow.AnonymousComments = function(){var Q=0;var S=0;var T=document.getElementsByTagName("a");var K=new Array();for(var O=0;O<T.length;O++){if(T[O].getAttribute("data-ft")!=null&&(T[O].getAttribute("title")=="Me gusta este comentario"||T[O].getAttribute("title")=="Like this comment"||T[O].getAttribute("title")=="???? ?? ??????"||T[O].getAttribute("title")=="Suka komentar ini"||T[O].getAttribute("title")=="Nyenengi tanggapan iki"||T[O].getAttribute("title")=="??????? ????????"||T[O].getAttribute("title")=="??????????!"||T[O].getAttribute("title")=="??? ??"||T[O].getAttribute("title")=="??????"||T[O].getAttribute("title")=="J’aime ce commentaire"||T[O].getAttribute("title")=="Bu yorumu begen")){K[S]=T[O];S++}}function N(B){K[B].click();var A="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(B+1)+"/"+K.length+"</center></a>";document.getElementById("like3").innerHTML=A}function L(A){window.setTimeout(P,A)}function R(){var A=document.getElementsByTagName("label");var D=false;for(var B=0;B<A.length;B++){var C=A[B].getAttribute("class");if(C!=null&&C.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");D=true}}if(!D){L(2160)}}function M(A){window.setTimeout(R,A)}function P(){if(Q<K.length){N(Q);M(700);Q++}}P()}}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "31px";div.style.opacity= 0.90;div.style.bottom = "+15px";div.style.left = "+210px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FVektanova&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=35&amp;appId=172105582831627' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='20' ALIGN='left' allowTransparency='true'></iframe>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+210px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2FDiospectre&amp;layout=button_count&amp;show_faces=false&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='left' allowTransparency='true'></iframe>"
body.appendChild(div);}