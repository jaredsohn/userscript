// ==UserScript==
// @name        hl420addUser
// @namespace   tom
// @include     http://www.hl420.com/regist.asp?upuser=10903
// @version     1
// ==/UserScript==
if(typeof(jQuery) != 'undefined'){
	callback();
}else{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js";
	document.head.appendChild(script);
	script.addEventListener('load', callback);
}

function callback(){
	function route(match, fn) {
		if( window.location.href.indexOf(match) != -1 ) {
			fn();
		};
	}
	
	function charAtTest(n){
		var str = "abcdefghijklmnopqrstuvwxyz"; 
		var s;                                  
		return str.charAt(n - 1);                  
	}
	route("regist.asp", function(){
		var pre = '187';
		var send = Math.random() * 100000000;
		send = pre + Math.round(send);

		var g_random = '';
		var ncnt = Math.round(Math.random() * 3 + 3);
		for(var i=0; i<ncnt; i++){
			var end = Math.random() * 26 + 1;
			g_random += charAtTest(end);
		}
		var rannumber = Math.round(Math.random() * 1000 + 1);
		g_random += rannumber;

		$('#username').val(g_random);
		$('#pw1').val(g_random);
		$('#pw2').val(g_random);
		$('#name').val(g_random);
		$('#name2').val(g_random);
		$('#account').val(g_random);
		$('#adress').val(g_random);
		$('#phone').val(send);
	});
}