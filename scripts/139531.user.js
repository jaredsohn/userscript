// ==UserScript==
// @name Facebook AutoLike
// @namespace AutoLike
// @description Automaticly like facebook statuses and comments
// @include http://www.facebook.com/*
// ==/UserScript==


// ==Expand==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+102px";
div.style.left = "+4px";
div.style.backgroundColor = "#DEB887";
div.style.border = "1px solid #00008B";
div.style.padding = "1px";
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
div.style.left = "+4px";
div.style.backgroundColor = "#DEB887";
div.style.border = "1px solid #00008B";
div.style.padding = "1px";
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
div.style.left = "+4px";
div.style.backgroundColor = "#DEB887";
div.style.border = "1px solid #00008B";
div.style.padding = 1px";
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

