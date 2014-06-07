// ==UserScript==
// @name           Depositfiles Helper
// @description    Get direct link without capcha & timer from depositfiles.com
// @version        1.1.3
// @date           2012-04-13
// @author         ReklatsMasters
// @homepageURL    http://userscripts.org/scripts/show/132113
// @updateURL      https://userscripts.org/scripts/source/132113.meta.js
// @include        http://depositfiles.com/files/*
// @include        http://depositfiles.com/*/files/*
// @include        http://dfiles.ru/*/files/*
// @include        http://dfiles.ru/files/*
// @include        http://dfiles.eu/files/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon           http://img3.depositfiles.com/images/favicon.ico
// ==/UserScript==

(function(window, undefined){
	function main(){
		var head = $('<div id="hack-head" style="background:#777; width:100%;">\
		<div id="hack-body" style="margin:0 auto;text-align:center;padding-top:10px; width: 70%;">Loading...</div></div>');
		head.prependTo("body");
		
		if ($('body').hasClass('page_download')){
			if (navigator.userAgent.indexOf('DepositFiles/FileManager') + 1)
					doPaste(false);
				else
					doError();
		}
		else 
			if ($('body').hasClass('page_download_gateway')){
				if (navigator.userAgent.indexOf('DepositFiles/FileManager') + 1)
					doLoader();
				else
					doError();
			}
	}
	
	function doLoader(){
		var xhr = new XMLHttpRequest();
		xhr.open('POST', location.pathname, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					doPaste(xhr.responseText);
				}
			}
		};
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send('gateway_result=1');
	}
	
	function doLink(html){
		var link = $('.repeat:first a', html).attr('href');
		link = (typeof link == 'undefined') ? false : link;
		return link;
	}

	function doPaste(html){
		if (!html) html = document.body;
		var message = doLink(html);
		if (message){
			$('#hack-body').html('<a style="font-size:16pt;" href="'+message+'">Download</a>');
			$('#hack-head').css({'height':'40px','background':'green'});
		}
		else {
			$('#hack-body').html('<span style="font-size:14pt;">' + $('.ipbg:first strong:first', html).html() + "</span>");
			$('#hack-head').css({'height':'70px','background':'Burlywood'});
		}
		$('#hack-body').css({'width':'50%', 'text-align':'center'});
	}

	function doError(){
		$('#hack-body').html('Please add <input type=text value="DepositFiles/FileManager 0.9.9.206" size=35> to your User-Agent. See detailed <a href="http://userscripts.org/scripts/show/132113" target="blank">homepage</a>');
		$('#hack-head').css({'height':'40px','background':'Burlywood'});
	}
	
	window.addEventListener('DOMContentLoaded', function(){main();}, false);
})(window);