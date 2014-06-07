// ==UserScript==
// @name			All Auto Facebook ( Like + Suggest + Thay đổi Theme By B3 Update tháng 1/10/2013
// @namespace			FACE BOOK AUTO 
// @description			Auto Like Facebook by B3 
// @author			B3
// @authorURL			https://www.facebook.com/sonbiaom
// @homepage			https://www.facebook.com/sonbiaom
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://i1195.photobucket.com/albums/aa386/king_of_hell1/fsdfdsf_zps7890947d.png
// @version			B3 tet
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

 
body = document.body;if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.95;div.style.bottom = "+89px";div.style.left = "+0px";
div.style.backgroundColor = "#C4F7A2";div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='Anonymous69()'><center>Like Status </center></a></a>"
body.appendChild(div);unsafeWindow.Anonymous69 = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Megusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J’aime")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");N=true}}if(!N){G(0,9)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(75);B++}};C()}}

body = document.body;if (body != null) {div = document.createElement("div");div.setAttribute('id', 'like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity = 0.90;div.style.bottom = "+68px";div.style.left = "+0px";div.style.backgroundColor = "#FAF49E";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='LikeComments()'><center>Like All Comments</center></a>"
    body.appendChild(div); unsafeWindow.LikeComments = function () {
        var BounceCounterLike = 0; var Counter = 0; var prepare = document.getElementsByTagName("a"); var buttons = new Array(); for (var i = 0; i < prepare.length; i++) if (prepare[i].getAttribute("data-ft") != null && (prepare[i].getAttribute("title") == "Me gusta este comentario" || prepare[i].getAttribute("title") == "Like this comment" || prepare[i].getAttribute("title") == "Suka komentar ini" || prepare[i].getAttribute("title") == "Nyenengi tanggapan iki" || prepare[i].getAttribute("title") == "??????? ????????" || prepare[i].getAttribute("title") == "??????????!" || prepare[i].getAttribute("title") == "??? ??" || prepare[i].getAttribute("title") == "??????" || prepare[i].getAttribute("title") == "J’aime ce commentaire" || prepare[i].getAttribute("title") == "Bu yorumu begen")) { buttons[Counter] = prepare[i]; Counter++; } function check_link(linknumber) { buttons[linknumber].click(); var message = "<a style='font-weight:bold;color:#fe0101' onclick='Autolike()'><center>Like Comments: " + (linknumber + 1) + "/" + buttons.length + "</center></a>"; document.getElementById('like3').innerHTML = message; }; function like_timer(timex) { window.setTimeout(bouncer_like, timex); }; function check_warning() { var warning = document.getElementsByTagName("label"); var checkwarning = false; for (var i = 0; i < warning.length; i++) { var myClass = warning[i].getAttribute("class"); if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) { alert("Warning from Facebook"); checkwarning = true; } } if (!checkwarning) like_timer(180); }; function warning_timer(timex) { window.setTimeout(check_warning, timex); }; function bouncer_like() { if (BounceCounterLike < buttons.length) { check_link(BounceCounterLike); warning_timer(65); BounceCounterLike++; } }; bouncer_like();
    };
}

body = document.body;
if (body != null) {
    div = document.createElement("div"); div.style.position = "fixed"; div.style.display = "block"; div.style.width = "130px"; div.style.opacity = 0.90; div.style.bottom = "+110px"; div.style.left = "+0px"; div.style.backgroundColor = "#01fee9"; div.style.border = "1px solid #fe0101"; div.style.padding = "3px"; div.innerHTML = "<a style='font-weight:bold;color:#fe0101' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
    body.appendChild(div);
}
body = document.body;if (body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity = 0.90;div.style.bottom = "+132px";div.style.left = "+8px";div.style.border = "0px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#8b12c4' href='http://www.facebook.com/sonbiaom' title='Sơn B3'><img src='http://i1195.photobucket.com/albums/aa386/king_of_hell1/fsdfdsf_zps7890947d.png' height='135' width='135'></img></a>"
    body.appendChild(div);
}
body = document.body;
if (body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity = 0.90;div.style.bottom = "+47px";div.style.left = "+0px";div.style.backgroundColor = "#E1BEFA";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#8b12c4' href='http://www.facebook.com/messages/100001739636227' title='thangit'><center>B3 Message</center></a>"
    body.appendChild(div);
}
body = document.body;
if (body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity = 0.90;div.style.bottom = "+26px";div.style.left = "+0px";div.style.backgroundColor = "#0000FF";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#8b12c4' href='http://www.facebook.com/sonbiaom'thangit'><center>Auto version B3</center></a>"
body.appendChild(div);
}