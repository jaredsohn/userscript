// ==UserScript==
// @name			*[NEW]* AutoFOllower Facebook 2013 (Hakim TDM JB)
// @namespace		*[NEW]* AutoFollower Facebook 2013 (Hakim TDM HB)
// @description		*[NEW]* AutoLike Facebook 2013 (ONLY) by Hakim TDM JB. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account. autolike and have emoticon Final version 2013 february.new version, work
// @author			Hakim TDM JB
// @authorURL		http://www.facebook.com/siowahkim
// @homepage		http://www.facebook.com/HakimJB31337
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-prn1/1016788_437346609705510_289669534_n.jpg
// @version			v.6 Final
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

// ======= Do Not Remove Credit =======
// == Nama : Auto Like Facebook v.6 Final ==
// ======= Author : Hakim TDM JB ========
// ======= Site : http://www.facebook.com/siowahkim =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+69px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var Q=0;var S=0;var T=document.getElementsByTagName("a");var K=new Array();for(var O=0;O<T.length;O++){if(T[O].getAttribute("class")!=null&&T[O].getAttribute("class").indexOf("UFILikeLink")>=0&&(T[O].innerHTML=="Me gusta"||T[O].innerHTML=="Like"||T[O].innerHTML=="?????"||T[O].innerHTML=="Suka"||T[O].innerHTML=="Begen"||T[O].innerHTML=="??????"||T[O].innerHTML=="???!"||T[O].innerHTML=="?"||T[O].innerHTML=="Seneng"||T[O].innerHTML=="???"||T[O].innerHTML=="J’aime")){K[S]=T[O];S++}}function N(B){K[B].click();var A="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(B+1)+"/"+K.length+"</center></a>";document.getElementById("like2").innerHTML=A}function L(A){window.setTimeout(P,A)}function R(){var A=document.getElementsByTagName("label");var D=false;for(var B=0;B<A.length;B++){var C=A[B].getAttribute("class");if(C!=null&&C.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");D=true}}if(!D){L(2160)}}function M(A){window.setTimeout(R,A)}function P(){if(Q<K.length){N(Q);M(700);Q++}};P()}}
     
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+48px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.AnonymousComments = function(){var Q=0;var S=0;var T=document.getElementsByTagName("a");var K=new Array();for(var O=0;O<T.length;O++){if(T[O].getAttribute("data-ft")!=null&&(T[O].getAttribute("title")=="Me gusta este comentario"||T[O].getAttribute("title")=="Like this comment"||T[O].getAttribute("title")=="???? ?? ??????"||T[O].getAttribute("title")=="Suka komentar ini"||T[O].getAttribute("title")=="Nyenengi tanggapan iki"||T[O].getAttribute("title")=="??????? ????????"||T[O].getAttribute("title")=="??????????!"||T[O].getAttribute("title")=="??? ??"||T[O].getAttribute("title")=="??????"||T[O].getAttribute("title")=="J’aime ce commentaire"||T[O].getAttribute("title")=="Bu yorumu begen")){K[S]=T[O];S++}}function N(B){K[B].click();var A="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(B+1)+"/"+K.length+"</center></a>";document.getElementById("like3").innerHTML=A}function L(A){window.setTimeout(P,A)}function R(){var A=document.getElementsByTagName("label");var D=false;for(var B=0;B<A.length;B++){var C=A[B].getAttribute("class");if(C!=null&&C.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");D=true}}if(!D){L(2160)}}function M(A){window.setTimeout(R,A)}function P(){if(Q<K.length){N(Q);M(700);Q++}}P()}}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<center><a ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100000170714189&amp;ref=timeline' href='/messages/siowahkim' role='button' rel='dialog'><span class='uiButtonText'>Message</span></a></center>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://www.facebook.com/siowahkim', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src="//www.facebook.com/plugins/follow?href=https%3A%2F%2Fwww.facebook.com%2Fsiowahkim&amp;layout=standard&amp;show_faces=true&amp;colorscheme=light&amp;width=450&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"></iframe>"
body.appendChild(div);}