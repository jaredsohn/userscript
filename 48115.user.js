//rorr.im on digg
//Version 1.2
//By Jeremy Satterfield
//I am in no way associated with digg.com for rorr.im.
//Released under
//Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License
//http://creativecommons.org/licenses/by-nc-sa/3.0/

//Adds a button to your Digg pages to save a link
//to the Digg in your Instapaper.com account for
//later review without having to digg it.

// ==UserScript==
// @name           rorr.im on digg
// @namespace      http://jsatt.blogspot.com
// @description    Adds rorr.im link to each story on the digg front page for quick access in case of the Digg-effect.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// @exclude        http://digg.com/*/upcoming/*
// @exclude        http://www.digg.com/*/upcoming/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

if(document.getElementById('diggiFrame')){
	var storyid = document.location.href.substr(document.location.href.indexOf('digg.com/')+9);
  GM_xmlhttpRequest({
    method: "GET",
     url: "http://services.digg.com/story/"+storyid+"?type=json&appkey=http%3A%2F%2Fdigg.com",
     onload: function(xhr) { 
	storyJson=eval('('+xhr.responseText+')');
	if(storyJson.stories && storyJson.stories[0].status=="popular"){
		$(function(){
			$('#t').each(function(){
				var url = $(this).children('.t-main').children('.t-summary').children('.t-comments').attr('href');
				//console.log($(this).siblings("a.t-link"));
				$(this).children('.t-end').children('.t-bury').before(
					$("<li></li>").append(
					$("<a></a>")
					.attr("href","http://rorr.im/digg.com"+url.toLowerCase()+"/?_s=b")
					.attr("target","diggiFrame")
					.html("rorr.im")
					.addClass("t-related")
					).addClass("t-rel")
					.css('z-index',100)
				);
			})

		})
	}
     }
  });
}else{

$(function(){
	$('.news-summary:not(.sponsored)>.news-body').each(function(){
		var url = $(this).children('.news-details').children('a.comments').attr('href');
		var trgt = $(this).children('h3').children('a.offsite').attr('target');
		$("<a></a>")
			.attr("href","http://rorr.im/digg.com"+url.toLowerCase()+"/?_s=b")
			.attr("target",trgt)
			.html("rorr.im")
			.addClass("tool")
			.addClass("faved")
			.prependTo($(this).children("div.news-details"));
	});

	$('.news-full').each(function(){
		var url = document.location.pathname;
		$("<a></a>")
			.attr("href","http://rorr.im/digg.com"+url.toLowerCase()+"/?_s=b")
			.html("rorr.im")
			.addClass("tool")
			.addClass("faved")
			.prependTo($(this).find("div.news-details"));
	});
})

}