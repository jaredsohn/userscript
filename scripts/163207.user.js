// ==UserScript==
// @name        VE
// @namespace   Xuyen tuong
// @include     http://*vietexpert.info/forum/*
// @include     https://www.vietexpert.info/forum/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// ==/UserScript==

var href = location.href;
if(href.indexOf('showthread.')!=-1){
	var tid = href.split('.ve')[1];
	var body = $('body').html();
	if(body.indexOf('Required Ve Tax!')!=-1){
		var script = document.createElement('script'); 
		script.type = "text/javascript"; 
		script.innerHTML = 'location.href = \'http://vietexpert.info/forum/printthread.ve' + tid + '\';';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
}else if(href.indexOf('printthread.')!=-1){
	var body = $('body').html();
	if(body.indexOf('[cc]')!=-1){
		var code = body.split('[cc]')[1];
		var key = code.split('[/cc]')[0];
		$.get('http://vietexpert.info/forum/showcc.ve?key=' + key, function(data) {
			$('body').append(data+'<script language="javascript" src="http://vietexpert.info/forum/t2cc.js"></script>');
		});
	}
}
