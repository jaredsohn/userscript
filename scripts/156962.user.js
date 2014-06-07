// ==UserScript==
// @name spiegel.de/SPIEGEL ONLINE comment extender
// @author mihau
// @version 1.0
// @description zeigt vollautomatisch alle kommentare und zitate an die vorher benutzerunfreundlich durch html/css/javascript versteckt bzw verdeckt sind
// @include http*://www.spiegel.de/*
// ==/UserScript==

function spiegelde() {

setTimeout("go()", 500);

}

function go(){
document.getElementsByClassName("spCommentsBoxPageToggleComments")[0].click();
keepgoing();
}

function keepgoing() {
setTimeout("quotestoo()",500);
addtrigger();
}

function addtrigger(){
var fwdbutton = document.getElementById("spCommentsBoxPager").getElementsByClassName('spCommentsBoxPageNavNext')[0];
fwdbutton.onclick = function() {  keepgoing(); };
}

function quotestoo(){

var imgs,i;
imgs=document.getElementById("spCommentsBoxPager").getElementsByClassName('spForumQuoteShowLink');


for(i in imgs){
imgs[i].click();
}

imgs = "";
i = "";


}

document.addEventListener("DOMContentLoaded", spiegelde, false);
