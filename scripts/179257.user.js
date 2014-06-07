// ==UserScript==
// @name        PaisaLive Auto earner by Sumanth
// @namespace   http://www.hackercracker007.blogspot.in/
// @description Paisa Live script Automatic completes the task within 1 min only.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include     http://*.paisalive.com/inbox.asp*
// @include     http://paisalive.com/inbox.asp*
// @include     http://*.hackercracker007.blogspot.*/*
// @include     http://hackercracker007.blogspot.*/*
// @include     http://*.paisalive.com/inbox.asp
// @grant       unsafeWindow
// @grant       GM_addStyle
// @version     2.1
// ==/UserScript==
GM_addStyle("body, input{font-family:calibri,arial;} .banner{background-color:yellow;background:url(http://i43.tinypic.com/xlk0pd.jpg) repeat scroll 0 0 transparent;bottom:0px;display:block;height:0;position:fixed;width:100%;margin:0 auto;padding:0}.banner_container .close{background:url(http://www.css3maker.com/images/btn_close.png) no-repeat scroll left top transparent;display:block;height:17px;position:absolute;right:0;top:-17px;width:26px}.banner_container{color:#FFF;position:relative;text-align:left;width:950px;margin:0 auto;padding:10px} .banner_container input{display:inline;}");
$(function(){
	$("body").append('<div class="banner" style="height: 40px; width:100px; right:20px; color:black; padding:60px; border-radius:5px; top:15px; overflow:auto; display: block;"><a href="http://hackercracker007.blogspot.in/" target="_blank" id="start">Click Here to Start Checking Mail</a></div>');
	$("#start").click(function(){
		$(this).parent().html("PLEASE RELOAD THIS PAGE AFTER 10SEC.");
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
var url=window.location.href;
var pattern=/^http:\/\/hackercracker007.blogspot.com/g;
var patter=/^http:\/\/hackercracker007.blogspot.com/g;
var patte=/^http:\/\/hackercracker007.blogspot.in/g;
var patt=/^http:\/\/hackercracker007.blogspot.in/g;
if(url.search(pattern)==0||url.search(patter)==0||url.search(patte)==0||url.search(patt)==0)
{
window.location.href = $('a').attr('href');
setInterval(function () {document.getElementById('ch-link-5').click();}, 60000);
}
});