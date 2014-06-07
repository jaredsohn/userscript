// ==UserScript==
// @name           cleantibm
// @namespace      http://argszero.appspot.com/userjs
// @description    点击上方的按钮，进入简洁浏览页面
// @include        http://www.ibm.com/developerworks/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){
	var href = window.location.href;
	if(/.*argszero.*/.test(href)){
		href=href.replace('&myname=argszero','');
		href=href.replace('?myname=argszero','');
		$('<input type="button" value="view normal" />').prependTo('body').click(function(){
			window.location.href=href;
		});
	}else{
		$('<input type="button" value="view clean" />').prependTo('body').click(function(){
			if(/.*\?.*/.test(href)){
				window.location.href=href+'&myname=argszero';
			}else{
				window.location.href=href+'?myname=argszero';
			}
		});
		return;
	}
	$('#ibm-masthead').remove();
	$('#ibm-top').css('width','100%').css('padding','0').css('background','#FFFFFF');
	$('div').css('padding','0');
	$('#ibm-content-head').css('width','100%');
	$('#dw-summary-article').css('width','100%');
	$('#ibm-content-body').css('width','100%');
	$('#ibm-content-main').css('width','100%');
	$('#ibm-content-sidebar').remove();
})();
