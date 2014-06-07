// ==UserScript==
// @name        PreventScroll
// @namespace   PreventScrollScr*
// @description Extra scrolling prevention
// @run-at document-end
// @include     http://vk.com/*
// @exclude http://vk.com/im*
// @exclude https://vk.com/im*
// @exclude https://facebook.com/messages/*
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     2
// @grant unsafeWindow
// ==/UserScript==



MaxScrollings = 5;

// 0 — scroll to the top, 1 — logout, 2 — after 4 times logout
Sanction = 2;
ScrollingTimesForLogout = 4;

sH=window.innerHeight;



disableScroll=new Array(
"im",
"friends",
"audio",
"search",
"video",
"settings",
"login"
);

disableScrollFb = new Array(
"messages",
"friends",
"discover-something-new",
"groups",
"search",
"find",
"plugins",
"editaccount"
);

disable=false;
started=false;

i=0;

host=location.hostname;


unsafeWindow.fbFilter = function (raw) {
url=String(raw);

//alert ('Url - '+url);

var interflag;
if (url!="") {
interflag=false;

for (var t in disableScrollFb) {

//alert('Local: '+disableScrollFb[t]);
if (url.indexOf(disableScrollFb[t])!=-1) interflag=true;
}
if (interflag===true) disable=true;

 else
 
disable=false;
};

return 0;
}


unsafeWindow.redefine = function (){

    func = unsafeWindow.nav.go;
    unsafeWindow.nav.go = function(a, b, c) {
if (a!=undefined) {
started=true;
b=String(a);
if (b.indexOf('https')!=-1) offset=15; else offset=14;
c=b.substr(offset);
//alert(c);
temp=true;
for (var u in disableScroll) {
if (c.indexOf(disableScroll[u])!=-1) temp=false;
}
if (temp===false||b=="[object Object]") disable=true; else
disable=false;


}

 return func.apply(null, arguments);
    }
  
  
};


if (host.indexOf("vk.com")!=-1) unsafeWindow.redefine();
else {
if (host.indexOf("facebook.com")!=-1) {
fburl=window.location.href;
unsafeWindow.fbFilter(fburl);
}};



function logout_script () {
if (host.indexOf("vk.com")!=-1) {
logout_link=document.getElementById('logout_link').href;
location.href=logout_link;} else {
if (host.indexOf("facebook.com")!=-1) {logout_form=document.getElementById('logout_form');
logout_form.submit();}}
}

$(document).ready(function(){
if (started===false&&host=="vk.com") unsafeWindow.nav.go('feed', 1, 2);
});

document.onscroll = function (e) {
if (disable===false) {
if (window.pageYOffset - sH/2 >= sH * MaxScrollings)  {
scnt = Sanction;
if (scnt==2) {if (i+1<ScrollingTimesForLogout) scnt=0; else scnt=1;}
if (scnt==0) { window.scrollTo(0,0);
i++;}
if (scnt==1) logout_script();
}
    return false;
  }
  }
  