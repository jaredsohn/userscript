

    Signup
    Login

Userscripts.org

    Scripts
    Tags
    Forums
    People
    Blog

Facebook Auto Comment
By bareetz — Last update Jun 11, 2012 — Installed 214 times.

    About
    Source Code
    Reviews 0
    Discussions 0
    Fans 0
    Issues
    Share

// ==UserScript==
// @name	Facebook Auto Comment
// @namespace	Facebook Auto Comment
// @description	Mengirim banyak pesan di wall dengan pesan
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==

function sendclick(el){
var clickevent=document.createEvent("MouseEvents");
clickevent.initEvent("click", true, true);
el.dispatchEvent(clickevent);}

function spamtastic(){
var ray = ["test"].sort(function() {return 0.5 - Math.random()});

ii=0;
function a(){
var mytxt=ray.pop();
var UIComposer=unsafeWindow["UIComposer"];
for(var i in UIComposer.instances){if(UIComposer.instances[i].root.className.indexOf("UIComposer_STATE_INPUT_DISABLED")==-1){ii++;
UIComposer.instances[i].setMessage(mytxt);UIComposer.instances[i].focusInput();UIComposer.instances[i].post();}}
if(ray.length<=1)
ray = ["testing numpang lewat master permisi"].sort(function() {return 0.5 - Math.random()});
setTimeout(a,500);

}
a();

}

GM_registerMenuCommand("testing",function(){spamtastic()});

Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
