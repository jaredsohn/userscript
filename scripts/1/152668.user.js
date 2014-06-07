Facebook Auto Like Extreme

Written by Rěįį Vąugħąnįį — Last update Nov 19, 2012


// ==UserScript==
// @name Facebook Auto Like Extreme
// @namespace AutoLike
// @description Automaticly like facebook statuses and comments
// @include http://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+122px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Reii Vaughanii"

body.appendChild(div);
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+102px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Expand comments"

body.appendChild(div);

unsafeWindow.AutoExpand = function() {

buttons = document.getElementsByTagName("input");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
if(buttons[i].getAttribute("name") == "view_all[1]")
buttons[i].click();
}

};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+72px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Like all statuses"

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
div.style.bottom = "+52px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Unlike all statuses"

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
div.style.bottom = "+22px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Like all comments"

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
div.style.bottom = "+2px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "Unlike all comments"

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

Add a comment