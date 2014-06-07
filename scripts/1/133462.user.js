// ==UserScript==
// @name           Facebook Autolike
// @namespace      Facebook AutoLike  v2
// @description    Autolike by Jeff Tesorio
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Add me Up==
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
div.innerHTML = "<center><a href='http://www.facebook.com/CaitlinHart15' target='blank'><b>By: Prototype</b></a></center>"

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
div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hide'>&laquo;</a> &#8226; <a style='color: #FFFFFF;' onclick='alert(\'Made by Jeff Tesorio\');'>Hide Tab</a></center></div> "

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++) {
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a title='Made by Jeff Tesorio'>:: Hide Tab::</a></center> "
}
else {
x.style.display="none";
div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Open'>&raquo;</a></center>"
}
}
};
}







// ==Expand==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like5');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+102px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisBukaKomeng()'><b>Open Comment</b></a>"

body.appendChild(div);

unsafeWindow.OtomatisBukaKomeng = function() {
buttons = document.getElementsByTagName("input");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
if(buttons[i].getAttribute("name") == "view_all")
buttons[i].click();
}

};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like6');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+82px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisBukaKomengPosts()'><b>Open Older Post<b/></a>"

body.appendChild(div);

unsafeWindow.OtomatisBukaKomengPosts = function() {
buttons = document.getElementsByTagName("a");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("lfloat") >= 0)
if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
buttons[i].click();
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
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'><b>Like All Status<b></a>"

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
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+42px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'><b>Unlike All Status</b></a>"

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
// ==============
// ==Comments==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like3');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+22px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaikComments()'><b>Like all comment</b></a>"

body.appendChild(div);

//buat fungsi tunda
function tunda(milliSeconds){
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}



unsafeWindow.OtomatisLaikComments = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("like_link") >= 0)
if(buttons[i].getAttribute("title") == "Like this comment")
buttons[i].click();
}



};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like4');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+2px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlikeComments();'><b>Unlike Comments</b></a>"

body.appendChild(div);
//buat fungsi tunda
function tunda(milliSeconds){
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}

unsafeWindow.OtomatisUnlikeComments = function() {


buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
if(buttons[i].getAttribute("title") == "Unlike this comment")
buttons[i].click();
}

};
}


// ==============





// ==============
// ==Confirm Requests==
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
div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' ><b>Confirm Friend Requests</b></a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' ><b>Ignore Friend Requests</b></a>"

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