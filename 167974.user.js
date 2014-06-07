// ==UserScript==
// @name			Facebook Autolike By.arz
// @namespace			FACE BOOK AUTO LIKE STATUS & COMMENTS
// @description			Auto Like Facebook By.arz 
// @author			B3
// @authorURL			https://www.facebook.com/sonbiaom
// @homepage			https://www.facebook.com/sonbiaom
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://i1195.photobucket.com/albums/aa386/king_of_hell1/fsdfdsf_zps7890947d.png
// @version			Super Fast Like
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

body = document.body;if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.95;div.style.bottom = "+100px";div.style.left = "+0px";
div.style.backgroundColor = "#000000";div.style.border = "1px solid #FF0000";
div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#15FF00' onclick='Anonymous69()'><center>Seneng Kabeh Status </center></a></a>"
body.appendChild(div);unsafeWindow.Anonymous69 = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Megusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J’aime")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#00FFFF' onclick='Autolike()'><blink><center>Seneng Status: "+(L+1)+"/"+H.length+"</center></blink></a>";
document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Cenanangan le ngango tak pancal ndas mu malahen");N=true}}if(!N){G(0,9)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(75);B++}};C()}}

body = document.body;if (body != null) {div = document.createElement("div");div.setAttribute('id', 'like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity = 0.90;div.style.bottom = "+70px";div.style.left = "+0px";div.style.backgroundColor = "#000000";div.style.border = "1px solid #FF0000";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#15FF00' onclick='LikeComments()'><center>Seneng Kabeh Komen</center></a>"
    body.appendChild(div); unsafeWindow.LikeComments = function () {
        var BounceCounterLike = 0; var Counter = 0; var prepare = document.getElementsByTagName("a"); var buttons = new Array(); for (var i = 0; i < prepare.length; i++) if (prepare[i].getAttribute("data-ft") != null && (prepare[i].getAttribute("title") == "Me gusta este comentario" || prepare[i].getAttribute("title") == "Like this comment" || prepare[i].getAttribute("title") == "Suka komentar ini" || prepare[i].getAttribute("title") == "Nyenengi tanggapan iki" || prepare[i].getAttribute("title") == "??????? ????????" || prepare[i].getAttribute("title") == "??????????!" || prepare[i].getAttribute("title") == "??? ??" || prepare[i].getAttribute("title") == "??????" || prepare[i].getAttribute("title") == "J’aime ce commentaire" || prepare[i].getAttribute("title") == "Bu yorumu begen")) { buttons[Counter] = prepare[i]; Counter++; } function check_link(linknumber) { buttons[linknumber].click(); var message = "<a style='font-weight:bold;color:#00FFFF' onclick='Autolike()'><blink><center>Seneng Komen: " + (linknumber + 1) + "/" + buttons.length + "</center></blink></a>"; document.getElementById('like3').innerHTML = message; }; function like_timer(timex) { window.setTimeout(bouncer_like, timex); }; function check_warning() { var warning = document.getElementsByTagName("label"); var checkwarning = false; for (var i = 0; i < warning.length; i++) { var myClass = warning[i].getAttribute("class"); if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) { alert("Cenanangan le ngango tak pancal ndas mu malahen"); checkwarning = true; } } if (!checkwarning) like_timer(64); }; function warning_timer(timex) { window.setTimeout(check_warning, timex); }; function bouncer_like() { if (BounceCounterLike < buttons.length) { check_link(BounceCounterLike); warning_timer(20); BounceCounterLike++; } }; bouncer_like();
    };
}