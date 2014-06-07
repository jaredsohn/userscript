// ==UserScript==
// @name			Auto Like Facebook by Kahfi.19
// @author			Kahfi.19
// @authorURL		        https://www.facebook.com/Kahfi.19
// @include			htt*://www.facebook.com/*
// @version			4
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
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       none

// ==/UserScript==

body=document.body;if(body!=null){div=document.createElement("div");div.setAttribute("id","like2");div.style.position="fixed";div.style.display="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom="+70px";div.style.left="+8px";div.style.backgroundColor="#ffffff";div.style.border="2px solid #ffffff";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#A9D844' onclick='AutoLike()'><center>Auto Like Status</center></a>";body.appendChild(div);unsafeWindow.AutoLike=function(){var b=0;var k=0;var j=document.getElementsByTagName("span");var h=new Array();for(var d=0;d<j.length;d++){if(j[d].getAttribute("id")!=null&&j[d].getAttribute("id").indexOf(".reactRoot")>=0&&(j[d].innerHTML=="Me gusta"||j[d].innerHTML=="Like"||j[d].innerHTML=="Suka"||j[d].innerHTML=="Beğen"||j[d].innerHTML=="أعجبني"||j[d].innerHTML=="Seneng"||j[d].innerHTML=="J’aime")){h[k]=j[d];k++}}function e(l){h[l].click();var i="<a style='font-weight:bold;color:#A9D844' onclick='Autolike()'><center>Like Status..: "+(l+1)+"/"+h.length+"</center></a>";document.getElementById("like2").innerHTML=i}function g(i){window.setTimeout(c,i)}function a(){var n=document.getElementsByTagName("label");var o=false;for(var m=0;m<n.length;m++){var l=n[m].getAttribute("class");if(l!=null&&l.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Cảnh báo kìa cậu ơi!!");o=true}}if(!o){g(0)}}function f(i){window.setTimeout(a,i)}function c(){if(b<h.length){e(b);f(0);b++}}c()}}body=document.body;if(body!=null){div=document.createElement("div");div.setAttribute("id","like3");div.style.position="fixed";div.style.display="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom="+45px";div.style.left="+8px";div.style.backgroundColor="#ffffff";div.style.border="2px solid #ffffff";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#A9D844' onclick='LikeComments()'><center>Auto Like Comments</center></a>";body.appendChild(div);unsafeWindow.LikeComments=function(){var b=0;var k=0;var j=document.getElementsByTagName("a");var h=new Array();for(var d=0;d<j.length;d++){if(j[d].getAttribute("data-ft")!=null&&(j[d].getAttribute("title")=="Me gusta este comentario"||j[d].getAttribute("title")=="Like this comment"||j[d].getAttribute("title")=="Suka komentar ini"||j[d].getAttribute("title")=="Nyenengi tanggapan iki"||j[d].getAttribute("title")=="الإعجاب بالتعليق"||j[d].getAttribute("title")=="J’aime ce commentaire"||j[d].getAttribute("title")=="Bu yorumu beğen")){h[k]=j[d];k++}}function e(l){h[l].click();var i="<a style='font-weight:bold;color:#A9D844' onclick='Autolike()'><center>Like Comments..: "+(l+1)+"/"+h.length+"</center></a>";document.getElementById("like3").innerHTML=i}function g(i){window.setTimeout(c,i)}function a(){var n=document.getElementsByTagName("label");var o=false;for(var m=0;m<n.length;m++){var l=n[m].getAttribute("class");if(l!=null&&l.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Cảnh báo kìa cậu ơi!!");o=true}}if(!o){g(0)}}function f(i){window.setTimeout(a,i)}function c(){if(b<h.length){e(b);f(0);b++}}c();void (0)}}body=document.body;if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.display="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom="+95px";div.style.left="+8px";div.style.backgroundColor="#ffffff";div.style.border="2px solid #ffffff";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#FF0000' href='https://www.facebook.com/Kahfi.19' title='Kahfi.19'><center>Add my Facebook</center></a>";body.appendChild(div)};