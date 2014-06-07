// ==UserScript==
// @name		Like All Comments - Facebook
// @namespace		Like All Status in Facebook Pro - AIO
// @description		Like All Status, Comments, Photos in Home Page, Pages, Groups
// @version		11.06.13
// @author		Edited by Sang Koi
// ==============
// @include		https://*.facebook.com/*
// @include		https://*.facebook.com/*/*
// @include		http://*.facebook.com/*
// @include		http://*.facebook.com/*/*
// ==/UserScript==
// ==============


var B=0;
var J=0;
var I=document.getElementsByTagName("a");
var H=new Array();
for(var D=0;D<I.length;D++){
	if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Thích bình luận này"||I[D].getAttribute("title")=="Like this comment")){H[J]=I[D];J++}
}

function E(L){
	H[L].click();
	var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
	document.getElementById("like3").innerHTML=K
}

function G(K){window.setTimeout(C,K)}
function A(){
	var M=document.getElementsByTagName("label");
	var N=false;
	for(var L=0;L<M.length;L++){
		var K=M[L].getAttribute("class");
		if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");N=true}
	}
	if(!N){G(1)}
}

function F(K){window.setTimeout(A,K)}
function C(){if(B<H.length){E(B);F(5);B++}}
C();
alert('Như LIKE Thần Chưởng ^o^');