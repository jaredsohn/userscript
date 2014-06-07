// ==UserScript==
// @name           Facebook Autolike
// @namespace      OtomatisLikeCuy Ver 2.0
// @description    Kita Like Semua OK, special dedicated for jempolers by: FAQIH
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==For My fans==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like7');
div.style.position = "fixed";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+123px";
div.style.left = "+6px";
div.style.width = "125px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<center><a href='http://www.facebook.com/profile.php?id=100000307467456'><b>by.FAQIH</b></a></center>"

div2 = document.createElement("div");
div2.setAttribute('id','spoiler');
div2.style.position = "fixed";
div2.style.opacity= 0.90;
div2.style.bottom = "+204px";
div2.style.left = "+6px";
div2.style.backgroundColor = "#CCD3E3";
div2.style.border = "1px dashed #555";
div2.style.padding = "2px";
div.style.width = "125px";
div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a style='color: #FFFFFF;' onclick='alert(\'Arif-Boysz TulungAgung Jempol-Thumbz\');'>FAQIH SCRIPT</a></center></div> "

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++) {
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a title='BY FAQIH'>ngiks ngoks</a></center> "
}
else {
x.style.display="none";
div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&raquo;</a></center>"
}
}
};
}








// ==============
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like1');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+62px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'><b>senengi status<b></a>"

body.appendChild(div);

unsafeWindow.OtomatisLaik = function() {
buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("like_link") >= 0)
if(buttons[i].getAttribute("name") == "like")
buttons[i].click();
}

};
}




// ==============



// ==============
// ==Confirm Semua==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like8');
div.style.position = "fixed";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+2px";
div.style.left = "+135px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' ><b>KONFIRM ALL</b></a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' ><b>DON'T CONFRIM</b></a>"

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