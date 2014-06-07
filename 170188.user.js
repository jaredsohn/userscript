// ==UserScript==
// @name Auto Like Facebook By Ciee Wa Maulizar
// @namespace auto_like_facebook
// @description Like Semua Status Facebook Teman Anda Hanya Dengan 1x Klik Maka Ribuan Jempol Akan Melayang Automatis.
// @author Ryory Tenryu Kazuya
// @authorURL http://www.facebook.com/ryory.tk
// @homepage http://www.kazuya.us/
// @homepage http://www.kazuya.us/
// @include htt*://www.facebook.com/*
// @version 12.1.0
// @exclude htt*://*static*.facebook.com*
// @exclude htt*://*channel*.facebook.com*
// @exclude htt*://developers.facebook.com/*
// @exclude htt*://upload.facebook.com/*
// @exclude htt*://www.facebook.com/common/blank.html
// @exclude htt*://*connect.facebook.com/*
// @exclude htt*://*facebook.com/connect*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/l.php*
// @exclude htt*://www.facebook.com/ai.php*
// @exclude htt*://www.facebook.com/extern/*
// @exclude htt*://www.facebook.com/pagelet/*
// @exclude htt*://api.facebook.com/static/*
// @exclude htt*://www.facebook.com/contact_importer/*
// @exclude htt*://www.facebook.com/ajax/*
// @exclude htt*://apps.facebook.com/ajax/*
// @exclude htt*://www.facebook.com/advertising/*
// @exclude htt*://www.facebook.com/ads/*
// @exclude htt*://www.facebook.com/sharer/*
// @exclude htt*://www.facebook.com/send/*
// @exclude htt*://www.facebook.com/mobile/*
// @exclude htt*://www.facebook.com/settings/*
// @exclude htt*://www.facebook.com/dialog/*
// @exclude htt*://www.facebook.com/plugins/*

// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+140px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\” href=\”javascript:AutoLike()\”>    Like All Status    </a>”

body.appendChild(div);

unsafeWindow.AutoLike = function() {

buttons = document.getElementsByTagName(“button”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“like_link”) >= 0)
if(buttons[i].getAttribute(“name”) == “like”)
buttons[i].click();
}

};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+120px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\” href=\”JavaScript:AutoUnLike()\”>  Unlike All Status  </a>”

body.appendChild(div);

unsafeWindow.AutoUnLike = function() {

buttons = document.getElementsByTagName(“button”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“like_link”) >= 0)
if(buttons[i].getAttribute(“name”) == “unlike”)
buttons[i].click();

}

};
}
// ==Expand==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+95px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\” href=\”http://www.facebook.com/ryory.tk\” title=\”Ryory Tenryu Kazuya\”>      RyoryTK       </a>”

body.appendChild(div);

unsafeWindow.AutoExpand = function() {

buttons = document.getElementsByTagName(“input”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“”) >= 0)
if(buttons[i].getAttribute(“name”) == “view_all”)
buttons[i].click();
}

};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+75px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\” href=\”http://www.kazuya.us/2012/05/donasi.html\” target=\”_blank\” title=\”Cyber Kazuya\”>           <blink>Donasi</blink>           </a>”

body.appendChild(div);

unsafeWindow.AutoExpandPosts = function() {

buttons = document.getElementsByTagName(“a”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“lfloat”) >= 0)
if(buttons[i].getAttribute(“onclick”) == “ProfileStream.getInstance().showMore();return false;”)
buttons[i].click();
}

};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+50px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\”>       Versi 12.1.0        </a>”

body.appendChild(div);

unsafeWindow.AutoExpandPosts = function() {

buttons = document.getElementsByTagName(“a”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“lfloat”) >= 0)
if(buttons[i].getAttribute(“onclick”) == “ProfileStream.getInstance().showMore();return false;”)
buttons[i].click();
}

};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement(“div”);
div.style.position = “fixed”;
div.style.bottom = “+30px”;
div.style.left = “+8px”;
div.style.backgroundColor = “#0320FD”;
div.style.border = “2px solid #E27C38″;
div.style.padding = “2px”;
div.innerHTML = “<a style=\”font-weight:bold;color:#3B5998\” href=\”http://www.kazuya.us/?s=Auto+LIKE+Status+FACEBOOK\” target=\”_blank\” title=\”Auto Like\”> Check for Update </a>”

body.appendChild(div);

unsafeWindow.AutoExpandPosts = function() {

buttons = document.getElementsByTagName(“a”);
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute(“class”);
if(myClass != null && myClass.indexOf(“lfloat”) >= 0)
if(buttons[i].getAttribute(“onclick”) == “ProfileStream.getInstance().showMore();return false;”)
buttons[i].click();
}

};
}
// ============