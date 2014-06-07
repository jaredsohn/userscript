// ==UserScript==
// @name           Yahoo Mail Fixer
// @namespace      spanishgringo.yahoo
// @description    Removes Ad Bar and optimizes Y! Mail space in new beta
// @include        http://*.mail.yahoo.com/*/launch*
// @author         Michael Freeman (spanishgringo)
// @homepage       http://spanishgringo.blogspot.com
// ==/UserScript==


var x = document.getElementById("theAd");
try{
var y = x.parentNode;
y.removeChild(x);
}catch(e){
unsafeWindow.console.log("line 16 error");
}
try{
x = document.getElementById("slot_LREC");
y = x.parentNode;
y.removeChild(x);
x = document.getElementById("theMNWAd");
y = x.parentNode;
y.removeChild(x);
}catch(e){
unsafeWindow.console.log("line 23 error");
}
try{
x = document.getElementsByClassName("yuhead-logo");
y= x[0].parentNode;
y.removeChild(x[0]);
}catch(e){
unsafeWindow.console.log("line 30 error");
}

try{
x = document.getElementById("main");
x.className = "withoutad";
x.style.top = "72px";
}catch(e){
unsafeWindow.console.log("line 52 error");
}
try{
x = document.getElementById("yUnivHead");
x.style.height = "50px";
}catch(e){
unsafeWindow.console.log("line 58 error");
}

var bod = document.getElementsByTagName('body')[0];
var ymStyle = document.createElement("style");
ymStyle.innerHTML = "<!-- MF Styles --> .nav-bar div.tabs { padding-left:0px !important; } div.nav-bar { top:42px !important; } #paneshell #shellnavigation,  #paneshell #shellcontent { top:107px !important;right:0px !important; }";
bod.insertBefore(ymStyle, bod.firstChild);

try{
x = document.getElementById("yuhead-search");
x.style.zIndex="123";
x.style.position="absolute";
x.style.marginTop="4px";
x.style.top="0px";
x.style.right="174px";
x.style.width="444px";
x = document.getElementsByClassName("yucs-search-field");
x[0].style.width="158px";
}catch(e){
unsafeWindow.console.log("line 39 error");
}
