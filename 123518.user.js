// ==UserScript==
// @name           Facebook Otomatis Like By Uchup19
// @namespace      Like Otomatis
// @description    Otomatis Like kiriman yang ada di dinding dengan satu klik
// @include        http://www.facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
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
div.style.width = "80px";
div.style.backgroundColor = "#4EE2EC";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<center><a href='http://www.facebook.com/yusuf.ramdhani' target='blank'><b>KLIK DISINI</b></a></center>"

div2 = document.createElement("div");
div2.setAttribute('id','spoiler');
div2.style.position = "fixed";
div2.style.opacity= 0.90;
div2.style.bottom = "+204px";
div2.style.left = "+6px";
div2.style.backgroundColor = "#FBB917";
div2.style.border = "1px dashed #555";
div2.style.padding = "2px";
div.style.width = "80px";
div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a style='color: #FFFFFF;' onclick='alert(\'Renz Hollyboyz Jempol-Thumbz\');'>Uchup19</a></center></div> "

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++) {
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a title='Renz Hollyboyz Jempol-Thumbz'>:: Jempolers Mania ::</a></center> "
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
div.style.width = "80px";
div.style.opacity= 0.90;
div.style.bottom = "+62px";
div.style.left = "+6px";
div.style.backgroundColor = "#4EE2EC";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'><b>Like All<b></a>"

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
// ==Unlike Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "80px";
div.style.opacity= 0.90;
div.style.bottom = "+42px";
div.style.left = "+6px";
div.style.backgroundColor = "#4EE2EC";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'><b>Unlike All</b></a>"

body.appendChild(div);

unsafeWindow.OtomatisUnlike = function() {
buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("like_link") >= 0)
if(buttons[i].getAttribute("name") == "unlike")
buttons[i].click();
}

};
}


