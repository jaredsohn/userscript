// ==UserScript==
// @name           Fajar Pratama
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/
// ==/UserScript==
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.bottom = "+102px";
 div.style.left = "+6px";
 div.style.backgroundColor = "#3b5998";
 div.style.border = "2px solid #000000";
 div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"http://www.facebook.com/fajar1516o\">[Made By Fajar 8-|]</a>"
  body.appendChild(div);
  unsafeWindow.AutoExpandPosts = function() {
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
 div.style.position = "fixed";
 div.style.bottom = "+72px";
 div.style.left = "+6px";
 div.style.backgroundColor = "#3b5998";
 div.style.border = "2px solid #000000";
 div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:AutoLike()\">[Like All Statuses (y)]</a>"
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
 div.style.backgroundColor = "#3b5998";
 div.style.border = "2px solid #000000";
 div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:AutoUnLike()\">[Unlike All Statuses :*]</a>"
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
