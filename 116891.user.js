// ==UserScript==
// @name           google image redirection 
// @namespace      ce.sharif.ir
// @require        http://code.jquery.com/jquery-1.5.1.js
// @include        http://images.google.*/*
// @include        http://www.google.*/images?*
// @include        http://www.google.*/imghp*
// @include        http://www.google.*tbm=isch*
// @include        http://*.google.*/imgres?imgurl=*
// @include        http://t0.gstatic.com/images?q=*
// @include        http://t1.gstatic.com/images?q=*
// @include        http://t2.gstatic.com/images?q=*
// @include        http://t3.gstatic.com/images?q=*
// @include        http://www.google.com/search?*
// @include        https://images.google.*/*
// @include        https://www.google.*/images?*
// @include        https://www.google.*/imghp*
// @include        https://www.google.*tbm=isch*
// @include        https://*.google.*/imgres?imgurl=*
// @include        https://t0.gstatic.com/images?q=*
// @include        https://t1.gstatic.com/images?q=*
// @include        https://t2.gstatic.com/images?q=*
// @include        https://t3.gstatic.com/images?q=*
// @include        https://www.google.com/search?*
// @version        1.0.6
// ==/UserScript==

function changesrc(host,phost){	
$("img[src*='"+host+"']").attr("src", function() {
	return this.src.replace(host,phost);
});
};

function basic(){	
if((/www.google/).test(document.location.href)){
	if ((/q=/).test(document.location.href)) {
		if ((/&sout=0/).test(document.location.href)) {
			window.location.href  = window.location.href.replace("&sout=1","") ;
		}
	}
}
}

//function basic(){	
//if((/www.google/).test(document.location.href)){
//	if ((/q=/).test(document.location.href)) {
//		if (!(/&sout=1/).test(document.location.href)) {
//			window.location = window.location + "&sout=1";
//		}
//	}
//}
//}


function allhostchangesrc(){
	var host = "74.125.230.148";
var host0 = 't0.gstatic.com';
var host1 = 't1.gstatic.com';
var host2 = 't2.gstatic.com';
var host3 = 't3.gstatic.com';
var phost = host2;
var href = document.location.href;
href = href.replace("t0.gstatic.com",phost);
href = href.replace("t1.gstatic.com",phost);
href = href.replace("t3.gstatic.com",phost);
if (href != document.location.href){
	document.location.href = href;
}
$("img[src*='t0.gstatic.com']").css("border", "2px solid red");
$("img[src*='t1.gstatic.com']").css("border", "2px solid green");
$("img[src*='t3.gstatic.com']").css("border", "2px solid blue");
changesrc(host0,phost);
changesrc(host1,phost);
changesrc(host3,phost);
return false;
}

(function () {
//btn = '<td><div class="ds"><div class="lsbb"><input type="button" value="r" class="lsb" name="giredirect" id="giredirect"></div></div></td>';
var smmbtn = '<li class="gbt"><a href="#" class="gbzt" id="giredirect">reload Image</a></li>';
$(".gbtc").append(smmbtn);

$("#giredirect").click(function(){
	allhostchangesrc();
return false;}
);

//basic();
//allhostchangesrc();
}());