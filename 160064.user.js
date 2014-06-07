// ==UserScript==
// @name        PaisaLive by Rajbai.org
// @namespace   http://www.rajbai.org/
// @description Paisa Live Userscript Just Click and Forgot
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include     http://*.paisalive.com/inbox.asp*
// @include     http://paisalive.com/inbox.asp*
// @include     http://*.paisalive.com/inbox.asp
// @grant       unsafeWindow
// @grant       GM_addStyle
// @version     1
// ==/UserScript==
GM_addStyle("body, input{font-family:calibri,arial;} .banner{background-color:black;background:url(http://www.css3maker.com/images/banner.png) repeat scroll 0 0 transparent;bottom:0px;display:block;height:0;position:fixed;width:100%;margin:0 auto;padding:0}.banner_container .close{background:url(http://www.css3maker.com/images/btn_close.png) no-repeat scroll left top transparent;display:block;height:17px;position:absolute;right:0;top:-17px;width:26px}.banner_container{color:#FFF;position:relative;text-align:left;width:950px;margin:0 auto;padding:10px} .banner_container input{display:inline;}");
$(function(){
	$("body").append('<div class="banner" style="height: 40px; width:100px; right:20px; color:white; padding:5px; border-radius:5px; top:3px; overflow:auto; display: block;"><a href="http://www.rajbai.org" target="_blank" id="start">Click Here to Start Checking Mail</a></div>');
	$("#start").click(function(){
		$(this).parent().html("please Reload this Page after 10sec.");
		$("#demo1_table tr td a").each(function(){
			var moneylink = $(this).attr('href');
			var mainlink = moneylink.replace("messages.asp?id=","rd.asp?id=");
			if(mainlink.indexOf("essages.")==-1){
				$.get(mainlink);
			}
			$(this).attr('href',mainlink).attr('target',"_blank").addClass("deleteit");
			console.log(mainlink);
		});
		
		$(".deleteit").click(function(){
			var curr = $(this);
			var boxit = $(curr).parent().parent();
			$(boxit).hide();
			var dellink = $(boxit).find("td:last a").attr('href');
			setTimeout(function(){$.get(dellink);},10000);
		});
	});
});