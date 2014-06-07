// ==UserScript== 
// @name	 Facebook Auto Like By K3LviN 
// @namespace	 Auto Like And Confirm (mass) 
// @version	 16/01/2012 
// @copyright	 K3LviN
// @description	 You can mass like and confirm 
// @author	 K3LviN(http://userscripts.org/scripts/edit/123368) 
// @icon	 https://lh4.googleusercontent.com/-2A1Jpr4-1qM/... 
// @include	 https://www.facebook.com/* 
// @include http://www.facebook.com/* 
// @include www.facebook.com 
// @exclude	 htt*://*static*.facebook.com* 
// @exclude	 htt*://*channel*.facebook.com* 
// @exclude	 htt*://developers.facebook.com/* 
// @exclude	 htt*://upload.facebook.com/* 
// @exclude	 htt*://www.facebook.com/common/blank.html 
// @exclude	 htt*://*onnect.facebook.com/* 
// @exclude	 htt*://*acebook.com/connect* 
// @exclude	 htt*://www.facebook.com/plugins/* 
// @exclude	 htt*://www.facebook.com/l.php* 
// @exclude	 htt*://www.facebook.com/ai.php* 
// @exclude	 htt*://www.facebook.com/extern/* 
// @exclude	 htt*://www.facebook.com/pagelet/* 
// @exclude	 htt*://api.facebook.com/static/* 
// @exclude	 htt*://www.facebook.com/contact_importer/* 
// @exclude	 htt*://www.facebook.com/ajax/* 
// @exclude	 htt*://apps.facebook.com/ajax/* 
// @exclude	 htt*://www.facebook.com/advertising/* 
// @exclude	 htt*://www.facebook.com/ads/* 
// @exclude	 htt*://www.facebook.com/sharer/* 
// 
// Copyright (c) 2012, K3LviN 
// Auto Like/Unlike, And Another Function.

// ==/UserScript==

// ==Picture== 
body = document.body; 
if(body != null) { 
div = document.createElement("div"); 
div.setAttribute('id','spoiler'); 
div.style.position = "fixed"; 
div.style.opacity= 0.90; 
div.style.bottom = "+82px"; 
div.style.left = "+6px"; 
div.style.backgroundColor = "#CCD3E3"; 
div.style.border = "1px dashed #555"; 
div.style.padding = "2px"; 
div.style.width = "125px"; 
div.innerHTML = "

<left>« • 

body.appendChild(div); 

unsafeWindow.spoiler = function() { 
var i; 
for(i=1;i<=20;i++)>
var x=document.getElementById('like'+i); 
if (x.style.display=="none") { 
x.style.display="block"; 
div2.innerHTML = "
" 
} 
else { 
x.style.display="none"; 
div2.innerHTML = "
»
" 
} 
} 
}; 
}
// ============== 
// ==Like All== 
body = document.body; 
if(body != null) { 
div = document.createElement("div"); 
div.setAttribute('id','like2'); 
div.style.position = "fixed"; 
div.style.display = "block"; 
div.style.width = "125px"; 
div.style.opacity= 0.90; 
div.style.bottom = "+62px"; 
div.style.left = "+6px"; 
div.style.backgroundColor = "#eceff5"; 
div.style.border = "1px dashed #94a3c4"; 
div.style.padding = "2px"; 
div.innerHTML = "??Like All" 

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
// ==Unlike All== 
body = document.body; 
if(body != null) { 
div = document.createElement("div"); 
div.setAttribute('id','like3'); 
div.style.position = "fixed"; 
div.style.display = "block"; 
div.style.width = "125px"; 
div.style.opacity= 0.90; 
div.style.bottom = "+42px"; 
div.style.left = "+6px"; 
div.style.backgroundColor = "#eceff5"; 
div.style.border = "1px dashed #94a3c4"; 
div.style.padding = "2px"; 
div.innerHTML = "??Unlike All" 

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
// ==Expand All Comments== 
body = document.body; 
if(body != null) { 
div = document.createElement("div"); 
div.setAttribute('id','like4'); 
div.style.position = "fixed"; 
div.style.display = "block"; 
div.style.width = "125px"; 
div.style.opacity= 0.90; 
div.style.bottom = "+22px"; 
div.style.left = "+6px"; 
div.style.backgroundColor = "#eceff5"; 
div.style.border = "1px dashed #94a3c4"; 
div.style.padding = "2px"; 
div.innerHTML = "??Expand Comments" 

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
// ==Confirm All== 
body = document.body; 
if(body != null) { 
div = document.createElement("div"); 
div.setAttribute('id','like7'); 
div.style.position = "fixed"; 
div.style.display = "block"; 
div.style.opacity= 0.90; 
div.style.bottom = "+2px"; 
div.style.left = "+6px"; 
div.style.backgroundColor = "#eceff5"; 
div.style.border = "1px dashed #94a3c4"; 
div.style.padding = "2px"; 
div.innerHTML = "•?All Confirm? •?Unconfirm All" 

body.appendChild(div); 
//buat fungsi tunda 
function tunda(milliSeconds){ 
var startTime = new Date().getTime(); 
while (new Date().getTime() < startTime + milliSeconds); 
} 

unsafeWindow.OtomatisKonfirm = function() { 
var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++)>
}; 


unsafeWindow.OtomatisAbaikan = function() { 
var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++)>
}; 
}