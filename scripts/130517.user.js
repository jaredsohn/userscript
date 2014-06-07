// ==UserScript==
// @name           pt-banlist
// @namespace      http://www.test.com
// @description    ~
// @include        https://pt.sjtu.edu.cn/*
// ==/UserScript==
var allElements,element1;
//Banlist is here.Apostrophe bracketed and separated  with comma,case sensitive
var banlist=['lb38','Filter_lb38_by_default@I_will_not_explain'];

allElements=document.getElementsByTagName("img");
for (var i=0;i<allElements.length;i++){
for (var j=0;j<banlist.length;j++){
if (allElements[i].title=="发短讯给"+banlist[j]){
element1=allElements[i].parentNode.parentNode.parentNode.parentNode.parentNode;
if(element1.tagName=="TABLE"){
element1.parentNode.removeChild(element1);
i=i-element1.getElementsByTagName("img").length;
}
}
}
}