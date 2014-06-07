// ==UserScript==
// @name		  Autolike Boost
// @namespace		 Autolike Boost by Apiz Pudin
// @description		Auto Like Facebook by Apiz Pudin. Boost Like on all post and comment on your wall.
// @author			Apiz Pudin
// @authorURL		http://www.facebook.com/apiz.pudinii
// @homepage		http://www.facebook.com/*
// @include			http://www.facebook.com/*
// @exclude 		http://apps.facebook.com/*
// @icon			http://i1361.photobucket.com/albums/r663/Black_Eagle96/d7e68850-c31f-4b71-a8bf-c6a1eb82f3df_zps4a4dd052.jpg
// @version			Version 2.0
// @exclude			http://*static*.facebook.com*
// @exclude			http://*channel*.facebook.com*
// @exclude			http://developers.facebook.com/*
// @exclude			http://upload.facebook.com/*
// @exclude			http://www.facebook.com/common/blank.html
// @exclude			http://*connect.facebook.com/*
// @exclude			http://*facebook.com/connect*
// @exclude			http://www.facebook.com/plugins/*
// @exclude			http://www.facebook.com/l.php*
// @exclude			http://www.facebook.com/ai.php*
// @exclude			http://www.facebook.com/extern/*
// @exclude			http://www.facebook.com/pagelet/*
// @exclude			http://api.facebook.com/static/*
// @exclude			http://www.facebook.com/contact_importer/*
// @exclude			http://www.facebook.com/ajax/*
// @exclude			http://www.facebook.com/advertising/*
// @exclude			http://www.facebook.com/ads/*
// @exclude			http://www.facebook.com/sharer/*
// @exclude			http://www.facebook.com/send/*
// @exclude			http://www.facebook.com/mobile/*
// @exclude			http://www.facebook.com/settings/*
// @exclude			http://www.facebook.com/dialog/*
// @exclude			http://www.facebook.com/plugins/*
// @exclude			http://www.facebook.com/bookmarks/*

// ==/UserScript==

// ======= Do Not Remove Credit =======
// == Name : Autolike Boost ==
// ======= Author : Apiz Pudin ========
// ======= Facebook : http://www.facebook.com/apiz.pudinii =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+69px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Boost Like</center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="Jâ€™aime")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");N=true}}if(!N){G(1)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(5);B++}};C()}}
     
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+48px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like Comments</center></a>"
body.appendChild(div);unsafeWindow.AnonymousComments = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="Jâ€™aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";document.getElementById("like3").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");N=true}}if(!N){G(1)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(5);B++}}C()}}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<center><a ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=apiz.pudinii&amp;ref=timeline' href='/messages/apiz.pudinii' role='button' rel='dialog'><span class='uiButtonText'>Message Apiz Pudin</span></a></center>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://www.facebook.com/apiz.pudinii', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<iframe src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Fapiz.pudinii&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe>"
body.appendChild(div);}
