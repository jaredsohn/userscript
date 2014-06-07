// ==UserScript==
// @name           auto_click
// @include        *bux3.com/surf.php
// @include        *bux.to/surf.php
// @include        *paid-bux.info/surf.php
// @include        *angelbux.com/surf.php
// ==/UserScript==

var $;
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
GM_JQ.type = "text/javascript";
document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
	clearInterval(checker);
	letsJQuery();
}
},100);


//=================================================================================================================
var t_wait = 45*1000 + Math.round(20*1000*Math.random());
var t_check  = 3*45*1000 + Math.round(20*1000*Math.random());
//=================================================================================================================


function letsJQuery() {
	trace('------')
	/*
	*/
	
	var hostname = location.hostname
	/*
	$.get("/berichte.php",{id:num}, function(data){
											 
		
	})
	*/
	
	var href = $("span a[target='clickwindow']:first").attr('href')
	//trace(_ob(href))
	if(href){
		var buxtoWindow = window.open(href,"clickwindow");
		var t = 55*1000 + Math.round(20*1000*Math.random()); 
		var checker=setInterval(function(){window.location.reload()},t)
	}else{
		var buxtoWindow = window.open('',"clickwindow");
		//var tmp = buxtoWindow;
		//tmp.close();
		var t = 55*2*1000 + Math.round(40*1000*Math.random()); 
		var checker=setInterval(function(){window.location.reload()},t)
	}
	
}
function _ob(pb){
	p  = pb.split("?");
	p1 = p[1].split("=");
	p[1] = p1[0]
	p[2] = p1[1]
	return p;
}
// trace
function trace(val){
	console.info(val)	
}