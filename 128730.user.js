// ==UserScript==
// @name Like
// @namespace <3
// @description Automaticly like facebook statuses and comments
// @include http://www.facebook.com
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+102px";
div.style.left = "+3px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "

body.appendChild(div);
}

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+82px";
div.style.left = "+3px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Like Semua Status"

body.appendChild(div);

unsafeWindow.AutoLike = function() {

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
div.style.position = "fixed";
div.style.bottom = "+62px";
div.style.left = "+3px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Unlike Semua Status"

body.appendChild(div);

unsafeWindow.AutoUnLike = function() {

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
div.style.position = "fixed";
div.style.bottom = "+42px";
div.style.left = "+3px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Like Semua Komentar"

body.appendChild(div);

unsafeWindow.AutoLikeComments = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
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
div.style.position = "fixed";
div.style.bottom = "+22px";
div.style.left = "+3px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Unlike Semua Komentar"

body.appendChild(div);

unsafeWindow.AutoUnLikeComments = function() {

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