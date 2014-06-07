// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ibaidu
// @namespace     http://diveintogreasemonkey.org/download/
// @description   ibaidu
// @include       http://www.baidu.com/
// @include       http://www.baidu.com/*
// ==/UserScript==

function baidu(){
var kw=document.getElementById("kw").value;
kw="http://baike.baidu.com/searchword/?word="+kw+"&pic=1";
//kw="http://zh.wikipedia.org/wiki/Special:Search?search="+kw+"&go=Go";

window.location.href = kw;
}


if(document.getElementById("m")){
var du=document.createElement("a");
var text=document.createTextNode("百 科");
du.appendChild(text);
du.addEventListener("click",baidu,false);
du.href="javascript:void(0)";
document.getElementById("m").appendChild(du);
}



if(document.getElementsByClassName("Tit")){

var du=document.createElement("a");

var text=document.createTextNode("百 科");

du.appendChild(text);

du.addEventListener("click",baidu,false);

du.href="javascript:void(0)";

document.getElementsByClassName("Tit").item(0).appendChild(du);

}