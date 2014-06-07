// ==UserScript==
// @name			AutoLike)
// @namespace		*[NEW]* AutoLike  (ONLY)
// @description		*[NEW]* AutoLike  (ONLY) . Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account. autolike and have emoticon Final version 2013 february.new version, work
// @author			Radit aditya
// @authorURL		http://xthemex.uk.ht/
// @homepage		http://xthemex.uk.ht/
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @icon			http://xthemex.uk.ht/logo.png/
// @version			v.2 Final
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
// ======= Author : radit========
// ======= Site : http://www.facebook.com/obloradit =======
// =======================================

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+100px";div.style.right = "+0px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/?ref=tn_tnmn' title='Refresh'><center>Perbarui Beranda</center></a>"
body.appendChild(div);}

if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "186px"; div.style.opacity= 2;div.style.bottom = "+70px";div.style.right = "+15px";div.style.backgroundColor = "#00BFFF";div.style.border = "5px solid #000000";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>L I K E R</center></a></a>"
body.appendChild(div);
   unsafeWindow.Anonymous69 = function(){var B=0;var J=0;var I=document.getElementsByTagName("a");var H=new Array();for(var D=0;D<I.length;D++){if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="Jâ€™aime")){H[J]=I[D];J++}}function E(L){H[L].click();var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";document.getElementById("like2").innerHTML=K}function G(K){window.setTimeout(C,K)}function A(){var M=document.getElementsByTagName("label");var N=false;for(var L=0;L<M.length;L++){var K=M[L].getAttribute("class");if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");N=true}}if(!N){G(500)}}function F(K){window.setTimeout(A,K)}function C(){if(B<H.length){E(B);F(500);B++}};C()}}


